import { nextTick, onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import { CxTableBaseObj, CxTablePropType, SelectConfig } from '../types';
import Sortable from 'sortablejs';

export const useSortable = ($CxTable: CxTableBaseObj, props: CxTablePropType, radio: Ref<number>, selectConfig: SelectConfig, visible: Ref<boolean>, emit: Func<any>) => {
  let sortableInstance: null | Sortable = null;
  const updateInstance = ref(false);
  watch([() => $CxTable.flatColumns, visible], () => {
    updateInstance.value = (!!$CxTable.flatColumns.find(item => (item.control?.type === 'draggable'))) && visible.value;
  });
  let cancelWatch: Func<any> | null = null;
  onMounted(() => {
    const container = $CxTable.wrapperEle;
    cancelWatch = watch(updateInstance, async v => {
      await nextTick();
      v ? createInstance(container.querySelector('.cx-table__body>table>tbody')) : destroyInstance();
    });
  });
  onUnmounted(() => {
    destroyInstance();
    cancelWatch?.();
  });

  function destroyInstance() {
    sortableInstance && sortableInstance.destroy();
  }

  function createInstance(bindEle: HTMLElement) {
    destroyInstance();
    if (!bindEle) return;
    sortableInstance = Sortable.create(bindEle, {
      handle: '.icon-tuodong1',
      animation: 100,
      onEnd({ newIndex, oldIndex }) {
        if (newIndex === undefined || oldIndex === undefined) return;
        if (newIndex === oldIndex) return;
        const old = props.tableData[oldIndex];
        if (!old) return;
        if (newIndex < oldIndex) {
          props.tableData.splice(newIndex, 0, old);
          props.tableData.splice(oldIndex + 1, 1);
        } else {
          props.tableData.splice(newIndex + 1, 0, old);
          props.tableData.splice(oldIndex, 1);
        }
        if (radio.value === oldIndex) {
          radio.value = newIndex;
        }
        const { selectItem } = selectConfig;
        const oldCheck = selectItem[oldIndex];
        if (newIndex < oldIndex) {
          selectItem.splice(newIndex, 0, oldCheck);
          selectItem.splice(oldIndex + 1, 1);
        } else {
          selectItem.splice(newIndex + 1, 0, oldCheck);
          selectItem.splice(oldIndex, 1);
        }
        emit('dragSort');
      }
    });
  }
};
