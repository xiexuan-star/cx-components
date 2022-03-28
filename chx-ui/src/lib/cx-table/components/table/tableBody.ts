import { isFunction, isNumber, isObject, isString } from 'chx-utils';
import * as R from 'ramda';
import {
  computed, createBlock, createCommentVNode, createElementBlock, createVNode, CSSProperties, defineComponent, Fragment,
  inject, normalizeClass, normalizeStyle, openBlock, PropType, ref, resolveComponent, toRaw, watchEffect
} from 'vue';
import { CX_TABLE_EMPTY_INDEX, CX_TABLE_SUM_INDEX, CX_TABLE_SUM_ROW_KEY, PATCH_FLAG } from '../../constant';
import { CxBroadcast, useTableId, useTableStyle } from '../../hooks';
import { CxTableBaseObj, CxTableColumnObj, CxTablePropType } from '../../types';
import { getFunctionAttrs, getSums, getTotalSumData } from '../../utils';
import Cell from './cell';
import Expand from './expand';
import TableAddBtn from './tableAddBtn';
import TableRow from './tableRow.vue';

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
    const broadcast = inject<CxBroadcast>('broadcast')!;
    const rootProp = inject<CxTablePropType>('rootProp')!;

    const hoisted_1 = 'cx-table__footer';
    const hoisted_2 = 'cx-table__body';

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
            CxTable.flatColumns.forEach(col => {
              const attrs = getFunctionAttrs(rowData, rowIndex, col.control?.attrs);
              const broadcastRegister = attrs?.broadcastRegister;
              if (broadcastRegister && isFunction(broadcastRegister)) {
                broadcastRegister((prop, cb) => broadcast.registListener(prop, rowData, cb));
              }
            });
            return (
              openBlock(true),
                createBlock(
                  Fragment,
                  null,
                  CxTable.flatColumns.map(
                    col => {
                      return openBlock(),
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
                        ]);
                    }
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
                  (function () {
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
    // 合计行渲染
    const renderTotalSum = () => {
      const getRowData = () => {
        const res = isObject(rootProp.customTotalSum)
          ? Object.assign({}, rootProp.customTotalSum)
          : isObject(CxTable.entireTotalSum)
            ? R.mergeLeft(transferOtherSum(CxTable.flatColumns), CxTable.entireTotalSum)
            : getTotalSumData(CxTable.flatColumns, rootProp.tableData ?? []);
        CxTable.totalSumCache = toRaw(res);
        return res;
      };
      return (openBlock(), createBlock(Fragment, null, [hideTotalSum.value
        ? createCommentVNode('v-if', true)
        : renderRow(getRowData(), CX_TABLE_SUM_INDEX, true)]));
    };

    // 基准style对象,根据不同的元素取出不同的项
    const style = useTableStyle(props, CxTable, 'body');

    const tableStyle = computed(() => {
      const { styleStore } = CxTable;
      const result: CSSProperties = {
        left: style.value.left,
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
      return {
        right: style.value.right,
        bottom: style.value.bottom,
        top: style.value.top,
        height: style.value.height,
        width: style.value.width,
      };
    });

    // 不宜使用computed
    const tableClass = ref('');
    watchEffect(() => {
      tableClass.value = rootProp.stripe ? 'is-stripe' : '';
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
    const CxTableBody = resolveComponent('cx-table-body');
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
                    ? (
                      (openBlock(), createElementBlock(Fragment, null, [
                        (isRenderRight.value)
                          ? (openBlock(), createBlock(CxTableBody, {
                            key: 0,
                            'only-total': true,
                            fixed: 'right',
                            'table-data': props.tableData,
                            style: normalizeStyle({ zIndex: 15, width: rightWidth.value }),
                            class: normalizeClass(['cx-table__fixed__right', { 'cx-table__right__shadow': showRightShadow.value }])
                          }, null, PATCH_FLAG.PROPS, ['table-data', 'style', 'class']))
                          : createCommentVNode('v-if', true),
                        (isRenderLeft.value)
                          ? (openBlock(), createBlock(CxTableBody, {
                            key: 1,
                            'only-total': true,
                            fixed: 'left',
                            'table-data': props.tableData,
                            style: normalizeStyle({ zIndex: 15, width: leftWidth.value }),
                            class: normalizeClass(['cx-table__fixed__left', { 'cx-table__left__shadow': showLeftShadow.value }])
                          }, null, PATCH_FLAG.PROPS, ['table-data', 'style', 'class']))
                          : createCommentVNode('v-if', true)
                      ], PATCH_FLAG.STABLE_FRAGMENT))

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
