import { ref } from 'vue';
import { computed, reactive } from 'vue';
import { useCxTable } from '../../hooks/useCxTable';
import * as R from 'ramda';

export const useDynamicConfigDialog = () => {
  const context = useCxTable().getContext();
  const getMessageInstance = (() => R.path(['messageInstance'], context)) as () => any;

  const totalList = ref<AnyObject[]>([]);

  const departmentMap = computed(() => {
    return totalList.value.reduce((res, item) => {
      const tag = item.tag ?? '基本信息';
      if (Array.isArray(res[tag])) {
        res[tag].push(item);
      } else {
        res[tag] = [item];
      }
      return res;
    }, {} as Record<string, AnyObject[]>);
  });

  const getDefaultData = () => ({
    居左固定字段: [],
    非固定字段: [],
    居右固定字段: []
  });
  const listMap = reactive<Record<string, AnyObject[]>>(getDefaultData());

  const getDisabledKey = (item?: AnyObject) => {
    if (!item) return '';
    const key = Object.keys(listMap).find(key => {
      return listMap[key].find(innerItem => innerItem.id === item.id);
    });
    if (key?.includes('居')) {
      return key;
    } else {
      return '';
    }
  };

  const checkedList = computed(() => {
    return Object.values(listMap).reduce((res, val) => {
      res.push(...val.map(item => item.id));
      return res;
    }, [] as number[]);
  });

  const updateCheckedList = (val: boolean, id: number) => {
    if (val) {
      const item = totalList.value.find(item => item.id === id);
      item && listMap['非固定字段'].push(item);
    } else {
      Object.values(listMap).some(list => {
        const index = list.findIndex(item => item.id === id);
        if (index >= 0) {
          list.splice(index, 1);
          return true;
        }
      });
    }
  };

  const getData = async (dynamicConfig?: AnyObject) => {
    if (!dynamicConfig) return console.warn('[dynamicConfigDialog]: invalid dynamicConfig');
    const { data } = await context.dynamicRequestInstance.get('/table/settings/get', dynamicConfig);
    totalList.value = data?.itemList ?? [];
    Object.assign(listMap, getDefaultData());
    data?.displayList?.forEach((item: AnyObject) => {
      switch (item.fixed) {
        case 'left':
          listMap['居左固定字段'].push(item);
          break;
        case 'right':
          listMap['居右固定字段'].push(item);
          break;
        default:
          listMap['非固定字段'].push(item);
      }
    });
  };

  const submit = async (dynamicConfig?: AnyObject) => {
    if (!dynamicConfig) return console.warn('[dynamicConfigDialog]: invalid dynamicConfig');
    const columnList = Object.entries(listMap).reduce((res, [key, val]) => {
      res.push(
        ...val.map(item => ({
          id: item.id,
          fixed: key.includes('左') ? 'left' : key.includes('右') ? 'right' : undefined
        }))
      );
      return res;
    }, [] as AnyObject[]);
    const { state } = await context.dynamicRequestInstance.putJSON('/table/settings/save', {
      ...dynamicConfig,
      columnList
    });
    if (state !== 200) return Promise.reject();
    getMessageInstance().success('修改成功');
  };

  return {
    totalList,
    getDisabledKey,
    departmentMap,
    listMap,
    checkedList,
    updateCheckedList,
    getData,
    submit
  };
};
