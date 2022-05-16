<template>
  <div class='cx-table__body' :style="bodyWrapperStyle">
    <table :style="tableStyle" :class="tableClass">
      <tbody>
      <template :key="getRowDataKey(rowData)" v-for="(rowData,rowIndex) in renderDataInfo.data">
        <template v-if="!onlyTotal&&!(fixed ==='bottom')">
          <cx-table-row
            :fixed="fixed" :row-data="rowData"
            :row-index="rowIndex+renderDataInfo.indexPrepend"
            :actived-row="rootProp.activeRows" :rowid="getRowDataKey(rowData)"
          />
          <cx-table-expand v-if="rootProp.expand"  :row-data="rowData" :row-index="rowIndex+renderDataInfo.indexPrepend" :fixed="fixed"/>
        </template>
      </template>
      <cx-table-row :fixed="fixed" :rowid="getRowDataKey(col)"
                    v-for="col in emptyRows" :key="getRowDataKey(col)"
                    :row-data="{}" :empty="true"
                    :row-index="CX_TABLE_EMPTY_INDEX"></cx-table-row>
      <cx-table-row :fixed="fixed" class="cx-table__footer"
                    :key="CX_TABLE_SUM_ROW_KEY" v-if="!hideTotalSum"
                    :row-data="sumData"
                    :row-index="CX_TABLE_SUM_INDEX"
                    :sum="true"
                    :rowid="CX_TABLE_SUM_ROW_KEY"/>
      </tbody>
    </table>
    <template v-if="fixed==='bottom'">
      <cx-table-body v-if="isRenderLeft" :key="0" :only-total="true" fixed="left" :table-data="tableData"
                     :style="{zIndex:15,width:leftWidth}"
                     :class="['cx-table__fixed__left',{'cx-table__left__shadow':showLeftShadow}]"/>
      <cx-table-body v-if="isRenderRight" :key="0" :only-total="true" fixed="right" :table-data="tableData"
                     :style="{zIndex:15,width:rightWidth}"
                     :class="['cx-table__fixed__right',{'cx-table__right__shadow':showRightShadow}]"/>
    </template>
  </div>
</template>
<script lang="ts">
import { isObject, isString } from 'chx-utils';
import * as R from 'ramda';
import { computed, CSSProperties, defineComponent, inject, PropType, ref, toRaw, watchEffect } from 'vue';
import { CX_TABLE_EMPTY_INDEX, CX_TABLE_SUM_INDEX, CX_TABLE_SUM_ROW_KEY } from '../../constant';
import { useTableId, useTableStyle } from '../../hooks';
import { CxTableBaseObj, CxTableColumnObj, CxTablePropType } from '../../types';
import { getSums, getTotalSumData } from '../../utils';
import CxTableCell from './cell';
import CxTableExpand from './expand';
import CxTableRow from './tableRow.vue';

export default defineComponent({
  name: 'CxTableBody',
  components: { CxTableExpand, CxTableCell, CxTableRow },
  props: {
    fixed: { type: String, default: '' },
    onlyTotal: { type: Boolean, default: false },
    tableData: { type: Array as PropType<AnyObject[]>, default: () => [] },
    float: { type: Boolean, default: false }
  },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const { getRowIdFromMap } = useTableId();

    const style = useTableStyle(props, CxTable, 'body');

    const bodyWrapperStyle = computed(() => {
      return {
        right: style.value.right,
        bottom: style.value.bottom,
        top: style.value.top,
        height: style.value.height,
        width: style.value.width,
      };
    });
    const tableStyle = computed(() => {
      const { styleStore } = CxTable;
      const result: CSSProperties = {
        left: style.value.left,
        top: props.fixed === 'bottom' || !props.fixed || props.onlyTotal ? 0 : -CxTable.scrollStore.scrollTop + 'px'
      };

      if (rootProp.virtualScroll && props.fixed !== 'bottom' && !props.onlyTotal) {
        result.paddingTop = CxTable.virtualStore.renderPaddingTop + 'px';
        result.paddingBottom = CxTable.virtualStore.renderPaddingBottom + 'px';
        result.height =
          (props.tableData.length + +!!rootProp.showTotalSum) * styleStore.CX_TABLE_HEIGHT + 'px';
      }
      return result;
    });
    // 不宜使用computed
    const tableClass = ref('');
    watchEffect(() => {
      tableClass.value = rootProp.stripe ? 'is-stripe' : '';
    });

    const renderDataInfo = computed(() => {
      let data;
      let indexPrepend = 0;
      if (rootProp.virtualScroll) {
        const { virtualStore } = CxTable;
        data = props.tableData.slice(
          virtualStore.renderStartIndex,
          virtualStore.renderEndIndex
        );
        indexPrepend = virtualStore.renderStartIndex;
      } else {
        data = props.tableData;
      }
      return { data, indexPrepend };
    });

    const getRowDataKey = (rowData: AnyObject) => {
      return getRowIdFromMap(rowData);
    };
    const emptyRows = computed(() => {
      const diff = rootProp.emptyLimit - props.tableData.length;
      return Array.from({ length: diff > 0 ? diff : 0 }).fill('').map(() => ({}));
    });
    const hideTotalSum = ref(false);
    watchEffect(() => {
      hideTotalSum.value =
        (rootProp.virtualScroll && props.fixed !== 'bottom' && !props.onlyTotal && CxTable.virtualStore.renderEndIndex < rootProp.tableData.length)
        || (((!rootProp.showTotalSum && !(rootProp.showForm && CxTable.flatColumns.some(col => !!col.sum))) || props.tableData?.length <= 0) &&
            !rootProp.showAddBtn &&
            !props.float);
    });
    const transferOtherSum = (columns: CxTableColumnObj[]) => {
      const result: AnyObject = {};
      columns.forEach(({ prop, sum }) => {
        if (sum === 'add' || !isString(sum)) return;
        result[prop] = sum;
      });
      return result;
    };
    const getSumData = () => {
      const res = isObject(rootProp.customTotalSum)
        ? Object.assign({}, rootProp.customTotalSum)
        : isObject(CxTable.entireTotalSum)
          ? R.mergeLeft(transferOtherSum(CxTable.flatColumns), CxTable.entireTotalSum)
          : getTotalSumData(CxTable.flatColumns, rootProp.tableData ?? []);
      CxTable.totalSumCache = toRaw(res);
      return res;
    };
    const sumData = computed(() => {
      return hideTotalSum.value ? {} : getSumData();
    });
    const isRenderLeft = computed(() => {
      return !!CxTable.columnStore.leftFixedColumns.length;
    });
    const isRenderRight = computed(() => {
      return !!CxTable.columnStore.rightFixedColumns.length;
    });
    const rightWidth = computed(() => {
      return getSums(CxTable.columnStore.rightFixedColumns) + 'px';
    });
    const leftWidth = computed(() => {
      return getSums(CxTable.columnStore.leftFixedColumns) + 'px';
    });
    const showRightShadow = computed(() => {
      return CxTable.scrollStore.showRightShadow;
    });
    const showLeftShadow = computed(() => {
      return CxTable.scrollStore.showLeftShadow;
    });
    return {
      bodyWrapperStyle,
      CxTable,
      emptyRows,
      CX_TABLE_EMPTY_INDEX,
      hideTotalSum,
      sumData,
      CX_TABLE_SUM_INDEX,
      CX_TABLE_SUM_ROW_KEY,
      tableStyle,
      tableClass,
      renderDataInfo,
      getRowDataKey,
      rootProp,
      isRenderLeft,
      isRenderRight,
      rightWidth,
      leftWidth,
      showRightShadow,
      showLeftShadow
    };
  }
});
</script>
