import { Ref, ref, computed } from 'vue';
import * as R from 'ramda';
import { useCxTable } from '../../hooks';

export const useDynamicConfigDialog = () => {
  const context = useCxTable().getContext();
  const getMessageInstance = (() => R.path(['messageInstance'], context)) as () => any;

  const totalItemMap = ref<Record<string, AnyObject[]>>({});

  const rawList = ref<AnyObject[]>([]);
  const checkedList = computed(() => {
    return rawList.value.filter(item => item.checked);
  });

  const getDefaultData = (): Record<string, AnyObject[]> => ({
    '居左固定字段(最多3个)': [],
    非固定字段: [],
    '居右固定字段(最多3个)': []
  });

  const updateCheckedList = (val: boolean, id: number) => {
    Object.values(totalItemMap.value).some(list => {
      const index = list.findIndex(item => item.id === id);
      if (index >= 0) {
        list.splice(index, 1);
        return true;
      }
    });
  };

  let onlyFormItemCache = [] as any[];
  let onlyFormItemMap = {} as Record<string, boolean>;

  const filterOnlyForm = (cols: any[]) => {
    onlyFormItemMap = {};
    return cols.reduce(
      (res, col) => {
        if (col.jsonData?.onlyForm) {
          res.onlyFormItem.push(col);
          onlyFormItemMap[col.prop] = true;
        } else {
          res.normalItem.push(col);
        }
        return res;
      },
      { onlyFormItem: [] as any[], normalItem: [] as any[] }
    );
  };

  function itemListGrouper(itemList: AnyObject[], displayList: AnyObject[]) {
    const displayMap = new Map<number, AnyObject>(displayList.map(item => [item.id, item]));
    const itemMap = new Map<number, AnyObject>(itemList.map((item: AnyObject) => [item.id, item]));
    itemList.forEach((item: AnyObject) => {
      const displayItem = displayMap.get(item.id);
      if (displayItem) {
        item.checked = true;
      }
      if (item.parentId) {
        const parentItem = itemMap.get(item.parentId);
        if (parentItem) {
          parentItem.children = parentItem.children || [];
          parentItem.children.push(item);
        }
      }
    });
    const result = getDefaultData();
    itemList.forEach((item: AnyObject) => {
      const displayItem = displayMap.get(item.id);
      if (item.parentId) return;
      switch (displayItem?.fixed) {
        case 'left':
          result['居左固定字段(最多3个)'].push(item);
          break;
        case 'right':
          result['居右固定字段(最多3个)'].push(item);
          break;
        default:
          result['非固定字段'].push(item);
      }
    });
    return result;
  }

  const getData = async (dynamicConfig?: AnyObject) => {
    if (!dynamicConfig) return console.warn('[DynamicConfigDialog]: invalid dynamicConfig');
    const { data } = await context.dynamicRequestInstance.get('/table/settings/get', dynamicConfig);
    const { normalItem, onlyFormItem } = filterOnlyForm(data?.itemList ?? []);
    rawList.value = normalItem;
    totalItemMap.value = itemListGrouper(normalItem, data.displayList || []);
    onlyFormItemCache = onlyFormItem;
  };

  const submit = async (dynamicConfig?: AnyObject) => {
    if (!dynamicConfig) return console.warn('[dynamicConfigDialog]: invalid dynamicConfig');
    const columnList = Object.entries(totalItemMap.value).reduce((res, [key, val]) => {
      const items: AnyObject[] = val.reduce((_res: AnyObject[], item: AnyObject) => {
        _res.push({
          id: item.id,
          checked: item.checked,
          name: item.label,
          fixed: key.includes('左') ? 'left' : key.includes('右') ? 'right' : undefined
        });
        if (item.children) {
          _res.push(
            ...item.children.map((child: AnyObject) => ({
              id: child.id,
              name: child.label,
              checked:child.checked,
              fixed: key.includes('左') ? 'left' : key.includes('右') ? 'right' : undefined
            }))
          );
        }
        return _res;
      }, [] as AnyObject[]) as AnyObject[];
      res.push(...items);
      return res;
    }, [] as AnyObject[]);
    columnList.push(...onlyFormItemCache);
    const { state } = await context.dynamicRequestInstance.putJSON('/table/settings/save', {
      ...dynamicConfig,
      columnList
    });
    if (state !== 200) return Promise.reject();
    getMessageInstance().success('修改成功');
  };

  return {
    totalItemMap,
    rawList,
    checkedList,
    updateCheckedList,
    getData,
    submit
  };
};
export const useDynamicDrag = (totalItemMap: Ref<Record<string, AnyObject[]>>) => {
  const childAreaDragStart = (e: AnyObject) => {
    e.item.classList.add('active');
  };
  const childAreaDragEnd = (e: AnyObject) => {
    e.item.classList.remove('active');
  };
  const getDisabledKey = (item?: AnyObject) => {
    if (!item) return '';
    const key = Object.keys(totalItemMap.value).find(key => {
      return totalItemMap.value[key].find(innerItem => innerItem.id === item.id);
    });
    if (key?.includes('居')) {
      return key;
    } else {
      return '';
    }
  };
  const onMove = (e: AnyObject) => {
    const { relatedContext, draggedContext } = e;
    const targetItem = relatedContext?.element;
    const currentItem = draggedContext?.element;

    const targetItemKey = getDisabledKey(targetItem);
    const currentItemKey = getDisabledKey(currentItem);
    return (
      !targetItemKey ||
      targetItemKey === currentItemKey ||
      totalItemMap.value[targetItemKey]?.length < 3
    );
  };

  function onDragOver(e: any) {
    e.target.classList.add('cx_opacity_0');
  }

  function onDragLeave(e: any) {
    e.target.classList.remove('cx_opacity_0');
  }

  return {
    childAreaDragStart,
    childAreaDragEnd,
    onMove,
    onDragOver,
    onDragLeave
  };
};
