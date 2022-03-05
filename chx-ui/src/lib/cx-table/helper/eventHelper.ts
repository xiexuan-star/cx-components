import { EventBus } from 'chx-utils';
import { debounce, throttle } from 'lodash-es';
import { nextTick, onBeforeUnmount, onMounted, onUnmounted, Ref } from 'vue';
import {
  ARROW_KEY,
  CX_SPAN_METHOD_TYPE,
  CX_TABLE_INPUT_TYPE,
  CX_TABLE_NOT_HOVER_ID,
  CX_TABLE_SELECT_TYPE
} from '../constant';
import { CxTableActiveControl } from '../hooks';
import {
  CxCellProp,
  CxTableBaseObj,
  CxTablePropType,
  Nullable,
  SelectConfig,
  TableDataVisitor
} from '../types';
import { domShare, getColumnSelectText, getPreOrNextItem } from '../utils';

export const registResponsive = (wrapper: Ref<Nullable<HTMLElement>>, callbacks: Func<any>[]) => {
  onMounted(() => {
    if (observer) {
      observer.observe(document, {
        attributes: true,
        subtree: true,
        childList: true,
        characterData: true
      });
    } else {
      window.addEventListener('resize', updateWidth);
    }
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    } else {
      window.removeEventListener('resize', updateWidth);
    }
  });

  let recordOldWidth = '0';

  const updateWidth = debounce(async () => {
    await nextTick();
    if (!wrapper.value) return;
    const width = getComputedStyle(wrapper.value).getPropertyValue('width');

    if (width === recordOldWidth) return;
    recordOldWidth = width;
    callbacks.forEach(cb => cb());
  }, 100);

  const MutationObserver = window.MutationObserver;
  const supportMutation = typeof MutationObserver !== undefined;

  let observer: Nullable<MutationObserver> = null;

  if (supportMutation) {
    observer = new MutationObserver(updateWidth);
  }
};

const scrollUpdateVisualScroll = ($CxTable: CxTableBaseObj, props: CxTablePropType) => {
  if (props.virtualScroll) {
    const { wrapperEle } = $CxTable;
    if (!wrapperEle) return;
    const { virtualStore, styleStore } = $CxTable;
    const { scrollTop, clientHeight } = wrapperEle;
    const { CX_TABLE_HEIGHT, CX_VISUAL_CACHE } = styleStore;
    const appendNum = +!!props.showTotalSum;
    const rowNum = props.tableData.length + appendNum;
    let renderStartIndex = Math.max(0, Math.floor(scrollTop / CX_TABLE_HEIGHT) - CX_VISUAL_CACHE);
    let topRowSpanPrepend = 0;
    if (props.spanMethod) {
      while (
        renderStartIndex > 0 &&
        virtualStore.rowSpanMap[renderStartIndex] & CX_SPAN_METHOD_TYPE.MISSING
      ) {
        topRowSpanPrepend++;
        renderStartIndex--;
      }
    }
    let renderLength =
      Math.ceil(clientHeight / CX_TABLE_HEIGHT) + CX_VISUAL_CACHE * 2 + topRowSpanPrepend;

    if (props.spanMethod) {
      const startBrokenFlag =
        virtualStore.rowSpanMap[renderStartIndex + renderLength] & CX_SPAN_METHOD_TYPE.EXTEND;
      if (startBrokenFlag && renderStartIndex + renderLength < rowNum) renderLength++;
      while (
        renderStartIndex + renderLength < rowNum &&
        virtualStore.rowSpanMap[renderStartIndex + renderLength] & CX_SPAN_METHOD_TYPE.MISSING
      ) {
        renderLength++;
      }
    }

    virtualStore.renderLength = renderLength;
    virtualStore.renderStartIndex = renderStartIndex;
    virtualStore.renderEndIndex = Math.min(rowNum, renderStartIndex + renderLength);
    virtualStore.renderPaddingTop = renderStartIndex * CX_TABLE_HEIGHT;
    virtualStore.renderPaddingBottom = (rowNum - virtualStore.renderEndIndex) * CX_TABLE_HEIGHT;
  }
};

export const scrollUpdateShadow = ($CxTable: CxTableBaseObj) => {
  const { wrapperEle, scrollStore } = $CxTable;
  if (!wrapperEle) return;
  const { scrollLeft, scrollWidth, scrollHeight, scrollTop, clientWidth, clientHeight } =
    wrapperEle;

  scrollStore.scrollLeft = scrollLeft;
  scrollStore.scrollTop = scrollTop;
  scrollStore.showLeftShadow = scrollLeft !== 0;
  scrollStore.showTopShadow = scrollTop !== 0;
  // 当屏幕缩放比不是整十数时,会出现scrollLeft为小数的情况,此时如果以严格等于0去计算样式会出现问题
  scrollStore.showRightShadow = scrollWidth - clientWidth - scrollLeft >= 1;
  scrollStore.showBottomShadow = scrollHeight - clientHeight - scrollTop >= 1;
};

export const wrapperScrollEventHandle = ($CxTable: CxTableBaseObj, props: CxTablePropType) => {
  const throttleVisual = throttle(scrollUpdateVisualScroll, 100, { leading: true, trailing: true });

  const throttleShadow = throttle(scrollUpdateShadow, 20, { leading: true, trailing: true });
  throttleShadow($CxTable);
  throttleVisual($CxTable, props);
};

export const registScrollEvent = ($CxTable: CxTableBaseObj, props: CxTablePropType) => {
  onMounted(() => {
    const { wrapperEle } = $CxTable;
    if (!wrapperEle) return;
    wrapperEle!.onscroll = () => wrapperScrollEventHandle($CxTable, props);
    setTimeout(() => wrapperScrollEventHandle($CxTable, props));
  });
};

export const registCellEvent = ($CxTable: CxTableBaseObj, props: CxCellProp) => {
  const onClick = (event: MouseEvent) => {
    const td = event.currentTarget as HTMLElement;
    const ele = event.target as HTMLElement;
    if (ele.nodeName === 'INPUT') return true;
    // 兼容el-checkbox的写法
    if (ele.classList.contains('el-checkbox__inner')) return true;
    const { editStore, scrollStore, wrapperEle, columnStore } = $CxTable;
    const { actived } = editStore;
    const { centerColumns } = columnStore;
    actived.column = props.column;
    actived.rowData = props.rowData;
    editStore.activedCell = td as HTMLElement;
    editStore.activedControl = null;
    let targetTd = td;
    if (props.column?.fixed === 'left') {
      targetTd = domShare.getCell($CxTable, centerColumns[0], actived.rowData!) ?? td;
    } else if (props.column?.fixed === 'right') {
      targetTd =
        domShare.getCell($CxTable, centerColumns[centerColumns.length - 1], actived.rowData!) ?? td;
    }
    domShare.scrollToTd(
      targetTd,
      wrapperEle,
      scrollStore.leftFixedWidth,
      scrollStore.rightFixedWidth,
      scrollStore.topFixedHeight
    );
  };

  return { onClick };
};

export const registMouseEvent = ($CxTable: CxTableBaseObj) => {
  onMounted(() => {
    const { wrapperEle } = $CxTable;
    if (!wrapperEle) return;
    wrapperEle!.onmousemove = throttle(
      (event: MouseEvent) => {
        const target = domShare.getAncestor(event.target as HTMLElement, 'TR') as HTMLElement;
        if (target) {
          const tid = target.getAttribute('rowid');
          if ($CxTable.hoveringRowid !== tid) {
            $CxTable.hoveringRowid = tid ? tid : CX_TABLE_NOT_HOVER_ID;
          }
        }
      },
      100,
      { leading: true, trailing: true }
    );
    wrapperEle!.onmouseleave = () => {
      $CxTable.hoveringRowid = CX_TABLE_NOT_HOVER_ID;
    };
  });
};

export const registKeyboardEvent = (
  $CxTable: CxTableBaseObj,
  props: AnyObject,
  tableDataVisitor: TableDataVisitor,
  bus: EventBus,
  tid: string
) => {
  let isTableActived = false;

  const { editStore, scrollStore } = $CxTable;

  const updateActivedCell = (oldTd: HTMLElement) => {
    const { centerColumns } = $CxTable.columnStore;
    const { actived } = editStore;
    const { getCell, scrollToTd } = domShare;
    const td = getCell($CxTable, actived.column!, actived.rowData!) || oldTd;
    editStore.activedCell = td;
    let targetTd = td;
    if (actived.column?.fixed === 'left') {
      targetTd = getCell($CxTable, centerColumns[0], actived.rowData!) ?? td;
    } else if (actived.column?.fixed === 'right') {
      targetTd = getCell($CxTable, centerColumns[centerColumns.length - 1], actived.rowData!) ?? td;
    }
    scrollToTd(
      targetTd,
      $CxTable.wrapperEle,
      scrollStore.leftFixedWidth,
      scrollStore.rightFixedWidth,
      scrollStore.topFixedHeight
    );
  };

  const dblclickHandle = async () => {
    await new Promise(resolve => setTimeout(() => resolve('')));
    keydownHandle({ key: ' ', preventDefault: () => ({}) } as unknown as KeyboardEvent);
  };

  const isEleSelectItem = (ele?: HTMLElement | null) => {
    return ele?.nodeName === 'LI' && ele.classList.contains('el-select-dropdown__item');
  };

  const clickHandle = async (event: MouseEvent) => {
    await new Promise(resolve => setTimeout(() => resolve('')));
    let eventTarget = event.target as HTMLElement | undefined | null;
    const parentTarget = eventTarget?.parentElement;
    // 此逻辑是为了避免element下拉框点击退出的问题
    if (isEleSelectItem(eventTarget) || isEleSelectItem(parentTarget)) {
      return;
    }

    while ((eventTarget = eventTarget?.parentElement ?? null)) {
      const currentId = eventTarget?.getAttribute('tid');
      if (currentId && currentId !== tid) {
        isTableActived = false;
        break;
      }
      isTableActived = currentId === tid;
      if (isTableActived) break;
    }
    if (!isTableActived) {
      editStore.actived.column = null;
      editStore.actived.rowData = null;
      editStore.activedCell = null;
      editStore.activedControl = null;
    }
  };

  const bindEscapeEvent = (inputEle: HTMLInputElement, td: HTMLElement) => {
    inputEle.addEventListener('keydown', (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Escape' && event.target) {
        editStore.activedControl = null;
        editStore.activedCell = td ?? null;
      }
    });
  };

  const inputActiveHandle = (inputEle: HTMLInputElement, td: HTMLElement) => {
    inputEle.focus();
    if (inputEle.type === 'checkbox') {
      const parent = inputEle.parentNode as HTMLElement;
      if (parent?.classList?.contains('is-checked')) {
        parent.click?.();
      }
    } else {
      inputEle.click();
    }
    bindEscapeEvent(inputEle, td);
  };

  const isSilentCell = () => {
    return (
      !CxTableActiveControl.has($CxTable.editStore.actived.column?.control?.type as any) &&
      !$CxTable.editStore.actived.column?.slot
    );
  };

  const isArrowKey = (key: string): key is ARROW_KEY => {
    return [ARROW_KEY.U, ARROW_KEY.D, ARROW_KEY.L, ARROW_KEY.R].includes(key as any);
  };
  const triggerTdMoveEvent = (td: HTMLElement, key: ARROW_KEY) => {
    if (!isArrowKey(key)) return;
    const { actived } = editStore;
    const { flatColumns } = $CxTable;
    editStore.activedControl = null;
    switch (key) {
      case ARROW_KEY.L:
        actived.column = getPreOrNextItem(flatColumns, actived.column, 'pre', '_colid');
        break;
      case ARROW_KEY.R:
        actived.column = getPreOrNextItem(flatColumns, actived.column, 'next', '_colid');
        break;
      case ARROW_KEY.U:
        actived.rowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'pre');
        break;
      case ARROW_KEY.D:
        actived.rowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'next');
        break;
    }
    updateActivedCell(td);
  };
  const triggerFocusTd = () => {
    editStore.activedControl = null;

    const { actived } = $CxTable.editStore;

    if (actived.column && actived.rowData) {
      editStore.activedCell = domShare.getCell($CxTable, actived.column, actived.rowData);
    }
  };
  const triggerFocusInput = async () => {
    const { activedCell } = editStore;
    editStore.activedControl = true;
    await nextTick();
    setTimeout(() => {
      if (!editStore.activedCell) return;
      const inputEle = domShare.getEle(activedCell, 'input') as HTMLInputElement;
      if (inputEle) {
        const td = editStore.activedCell;
        editStore.activedControl = inputEle;
        editStore.activedCell = inputEle;
        inputEle.select();
        inputActiveHandle(inputEle as HTMLInputElement, td);
      } else {
        editStore.activedControl = false;
      }
    });
  };

  const keydownEventHandle = throttle(
    async (event: KeyboardEvent) => {
      if (!isTableActived) return;
      const { actived, activedCell } = editStore;
      if (!activedCell) return;
      const { flatColumns } = $CxTable;
      const { key, ctrlKey } = event;
      const target = activedCell;
      const isTd = target.nodeName === 'TD';
      const isInput = target.nodeName === 'INPUT';

      if (key === 'Tab') {
        if (
          actived.rowData === tableDataVisitor.sortedData[tableDataVisitor.sortedData.length - 1]
        ) {
          bus.emit('addNewRow');
        }
        await nextTick();
        editStore.activedControl = null;
        actived.rowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'next');
        updateActivedCell(target);
        return;
      }

      if (isTd) {
        if (ctrlKey) {
          if (key === 'c') {
            const range = document.createRange();
            range.selectNodeContents(activedCell);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
            document.execCommand('copy');
          }
          return;
        }
        if (key === 'Delete') {
          if (props.disabled) return;
          const { column, rowData } = actived;
          if (!column || !rowData) return;
          const { prop, control } = column;
          if (!control?.type) return;
          if (['search', 'select'].includes(control?.type)) {
            Reflect.set(rowData, prop, '');
            if (control.selectText) {
              Reflect.set(rowData, control.selectText, '');
            } else {
              Reflect.set(rowData, getColumnSelectText(column), '');
            }
          }
          if (['input', 'numberInput'].includes(control?.type)) {
            Reflect.set(rowData, prop, '');
          }
        } else if (isArrowKey(key)) {
          triggerTdMoveEvent(target, key as ARROW_KEY);
        } else if ((key === ' ' || /[0-9A-Za-z]/.test(key)) && !['Escape', 'Enter'].includes(key)) {
          if (isSilentCell()) {
            return;
          }
          await triggerFocusInput();
        } else if (key === 'Enter') {
          let control;
          if ((control = domShare.getEle(target, 'a'))) {
            control.click();
          } else if ((control = domShare.getEle(target, 'button'))) {
            control.click();
          } else if (((control = domShare.getEle(target, 'input')), control?.type === 'checkbox')) {
            control.click();
          } else {
            await triggerFocusInput();
          }
        }
      } else if (isInput) {
        if (key === 'Enter') {
          requestAnimationFrame(async () => {
            if (CX_TABLE_SELECT_TYPE.includes(actived.column.control?.type)) {
              await triggerFocusTd();
            } else {
              const nextColumn = getPreOrNextItem(flatColumns, actived.column, 'next', '_colid');
              if (nextColumn === actived.column) {
                const nextRowData = getPreOrNextItem(
                  tableDataVisitor.sortedData,
                  actived.rowData,
                  'next'
                );
                if (nextRowData === actived.rowData) {
                  return;
                } else {
                  actived.rowData = nextRowData;
                  actived.column = flatColumns[0];
                }
              } else {
                actived.column = nextColumn;
              }
              updateActivedCell(target);
              if (isSilentCell()) {
                return (editStore.activedControl = false);
              }
              await triggerFocusInput();
            }
          });
        } else if (key === 'Escape') {
          triggerFocusTd();
        } else if (
          isArrowKey(key) &&
          (CX_TABLE_INPUT_TYPE.includes(actived.column.control?.type) ||
            ['input'].includes(actived.column?.slotType))
        ) {
          const inputEle = target as HTMLInputElement;
          const inputValue = inputEle.value;
          const pointer = inputEle.selectionStart;
          if (
            [ARROW_KEY.U, ARROW_KEY.D].includes(key) ||
            (pointer === 0 && key === ARROW_KEY.L) ||
            (pointer === inputValue.length && key === ARROW_KEY.R)
          ) {
            const td = domShare.getCell($CxTable, actived.column, actived.rowData);
            event.preventDefault();
            triggerTdMoveEvent(td, key);
          }
        }
      }
    },
    50,
    { trailing: true, leading: true }
  );
  const keydownHandle = (event: KeyboardEvent) => {
    const { key } = event;
    const { activedCell } = editStore;
    const isTd = activedCell?.nodeName === 'TD';

    if (isTableActived) {
      if (
        key === 'Tab' ||
        key === 'Enter' ||
        (key === ' ' && Reflect.get(event.target ?? {}, 'nodeName') !== 'INPUT')
      ) {
        event.preventDefault();
      }
    }

    if (isTd) {
      if (Object.values(ARROW_KEY).includes(key as any)) {
        event.preventDefault();
      }
    }

    keydownEventHandle(event);
  };

  document.addEventListener('keydown', keydownHandle, true);
  // 以下两个事件顺序不可颠倒,由于需求变化双击事件也修改成了单击事件
  document.addEventListener('click', clickHandle, true);
  document.addEventListener('click', dblclickHandle, true);

  onUnmounted(() => {
    document.removeEventListener('keydown', keydownHandle, true);
    document.removeEventListener('click', clickHandle, true);
    document.removeEventListener('click', dblclickHandle, true);
  });
};

// 全选联动处理
export const onSelectItemChange = (config: SelectConfig) => {
  if (config.selectItem.length === 0) {
    config.actualAll = config.selectAll = false;
    config.indeterminate = false;
  } else {
    if (config.selectItem.every(item => item)) {
      config.actualAll = config.selectAll = true;
      config.indeterminate = false;
    } else {
      config.actualAll = config.selectAll = false;
      config.indeterminate = config.selectItem.some(item => item);
    }
  }
};

export const onSelectAllChange = (config: SelectConfig, value: boolean) => {
  config.indeterminate = false;
  config.selectItem.fill(value);
};
