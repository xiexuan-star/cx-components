import {
  computed,
  createBlock,
  createCommentVNode,
  createVNode,
  CSSProperties,
  defineComponent,
  Fragment,
  inject,
  openBlock,
  PropType,
  ref,
  watchEffect
} from 'vue';
import { useTableStyle } from '../../hooks/useTableStyle';
import { CxTableBaseObj, CxTableColumnObj, CxTablePropType } from '../../types';
import { getTotalSumData, isNumber, isObject, isString, pick } from '../../utils';
import Cell from './cell';
import TableRow from './tableRow';
import FixedBottom from './fixedBottom';
import TableAddBtn from './tableAddBtn';
import Expand from './expand';
import { CX_TABLE_SUM_INDEX, CX_TABLE_SUM_ROW_KEY, CX_TABLE_EMPTY_INDEX } from '../../constant';
import { useTableId } from '../../hooks/useTableId';
import { PATCH_FLAG } from '../../constant/enum';
import * as R from 'ramda';

export default defineComponent({
  name: 'CxTableBody',
  props: {
    fixed: { type: String, default: '' },
    onlyTotal: { type: Boolean, default: false },
    tableData: { type: Array as PropType<AnyObject[]>, default: () => [] },
    float: { type: Boolean, default: false }
  },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const rootProp = inject<CxTablePropType>('rootProp')!;

    const hoisted_1 = 'cx-table_footer';
    const hoisted_2 = 'cx-table_body';

    const { getRowIdFromMap } = useTableId();

    // 行渲染
    const renderRow = (rowData: AnyObject, rowIndex: number, sum = false, empty = false) => {
      let rowid;
      if (sum) {
        rowid = CX_TABLE_SUM_ROW_KEY;
      } else {
        rowid = getRowIdFromMap(rowData);
      }
      return createVNode(
        TableRow,
        {
          sum,
          class: sum ? hoisted_1 : '',
          rowData,
          rowIndex,
          activedRow: rootProp.activeRows,
          rowid,
          key: rowid
        },
        {
          default: () => {
            return (
              openBlock(true),
              createBlock(
                Fragment,
                null,
                CxTable.flatColumns.map(
                  col => (
                    openBlock(),
                    createBlock(Fragment, null, [
                      props.fixed && props.fixed !== 'bottom' && col.fixed !== props.fixed
                        ? createCommentVNode('v-if', true)
                        : (openBlock(),
                          createBlock(
                            Cell,
                            { rowData, rowIndex, column: col, sum, empty, key: col._colid },
                            null,
                            PATCH_FLAG.PROPS,
                            ['rowData', 'rowIndex', 'column', 'sum', 'empty']
                          ))
                    ])
                  )
                ),
                PATCH_FLAG.KEYED_FRAGMENT
              )
            );
          }
        },
        PATCH_FLAG.PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.DYNAMIC_SLOTS,
        ['rowData', 'rowIndex', 'activedRow', 'rowid', 'key']
      );
    };

    // body主体内容渲染
    const renderContent = () => {
      return (
        openBlock(),
        createBlock(Fragment, null, [
          props.fixed === 'bottom' || props.onlyTotal
            ? createCommentVNode('v-if', true)
            : (openBlock(true),
              createBlock(
                Fragment,
                null,
                (function() {
                  const result: JSX.Element[] = [];
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
                  data.forEach((rowData: AnyObject, rowIndex: number) => {
                    result.push(renderRow(rowData, rowIndex + indexPrepend));
                    if (rootProp.expand) {
                      result.push(
                        createVNode(
                          Expand,
                          { rowData, rowIndex: rowIndex + indexPrepend, fixed: props.fixed },
                          null,
                          PATCH_FLAG.FULL_PROPS
                        )
                      );
                    }
                  });

                  if (
                    isNumber(rootProp.emptyLimit) &&
                    rootProp.emptyLimit > props.tableData.length
                  ) {
                    Array(rootProp.emptyLimit - props.tableData.length)
                      .fill('')
                      .forEach(() => {
                        result.push(renderRow({}, CX_TABLE_EMPTY_INDEX, false, true));
                      });
                  }
                  return result;
                })(),
                PATCH_FLAG.KEYED_FRAGMENT
              ))
        ])
      );
    };

    // 添加按钮渲染
    const renderAddBtn = () => {
      return createVNode(
        TableAddBtn,
        { fixed: props.fixed, tableData: props.tableData },
        null,
        PATCH_FLAG.PROPS,
        ['fixed', 'tableData']
      );
    };

    const hideTotalSum = ref(false);
    watchEffect(() => {
      hideTotalSum.value =
        (rootProp.virtualScroll &&
          props.fixed !== 'bottom' &&
          !props.onlyTotal &&
          CxTable.virtualStore.renderEndIndex < rootProp.tableData.length) ||
        (((!rootProp.showTotalSum && !rootProp.showForm) || props.tableData?.length <= 0) &&
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
    // 合计行渲染
    const renderTotalSum = () => {
      return (
        openBlock(),
        createBlock(Fragment, null, [
          hideTotalSum.value
            ? createCommentVNode('v-if', true)
            : isObject(rootProp.customTotalSum)
            ? renderRow(Object.assign({}, rootProp.customTotalSum), CX_TABLE_SUM_INDEX, true)
            : isObject(CxTable.entireTotalSum)
            ? renderRow(
                R.mergeLeft(transferOtherSum(CxTable.flatColumns), CxTable.entireTotalSum),
                CX_TABLE_SUM_INDEX,
                true
              )
            : renderRow(
                getTotalSumData(CxTable.flatColumns, rootProp.tableData ?? []),
                CX_TABLE_SUM_INDEX,
                true
              )
        ])
      );
    };

    // 基准style对象,根据不同的元素取出不同的项
    const style = useTableStyle(props, CxTable, 'body');

    const tableStyle = computed(() => {
      const { styleStore } = CxTable;
      const result: CSSProperties = {
        ...pick(style.value, ['left']),
        top: props.fixed === 'bottom' || props.onlyTotal ? 0 : -CxTable.scrollStore.scrollTop + 'px'
      };

      if (rootProp.virtualScroll && props.fixed !== 'bottom' && !props.onlyTotal) {
        result.paddingTop = CxTable.virtualStore.renderPaddingTop + 'px';
        result.paddingBottom = CxTable.virtualStore.renderPaddingBottom + 'px';
        result.height =
          (props.tableData.length + +!!rootProp.showTotalSum) * styleStore.CX_TABLE_HEIGHT + 'px';
      }
      return result;
    });

    const bodyWrapperStyle = computed(() => {
      return pick(style.value, ['right', 'bottom', 'top', 'height', 'width']);
    });

    // 不宜使用computed
    const tableClass = ref('');
    watchEffect(() => {
      tableClass.value = rootProp.stripe || rootProp.showForm ? 'stripe' : '';
    });

    return () => (
      openBlock(),
      createBlock(
        'div',
        { class: hoisted_2, style: bodyWrapperStyle.value },
        [
          createVNode(
            'table',
            { style: tableStyle.value, class: tableClass.value },
            [createVNode('tbody', null, [renderContent(), renderAddBtn(), renderTotalSum()])],
            PATCH_FLAG.STYLE
          ),
          (openBlock(),
          createBlock(
            Fragment,
            null,
            [
              props.fixed === 'bottom'
                ? createVNode(
                    FixedBottom,
                    { tableData: props.tableData },
                    null,
                    PATCH_FLAG.PROPS | PATCH_FLAG.NEED_PATCH,
                    ['tableData']
                  )
                : createCommentVNode('v-if_fixed_bottom', true)
            ],
            PATCH_FLAG.STABLE_FRAGMENT
          ))
        ],
        PATCH_FLAG.CLASS | PATCH_FLAG.STYLE
      )
    );
  }
});
