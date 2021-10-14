import { clone, omit } from 'ramda';
import { ref } from 'vue';
import { CopyOptions, CxTablePropType } from '../types';
import { isFunction } from '../utils';

const clipboard = ref<null | AnyObject[]>(null);
export const useCopy = (props: CxTablePropType) => {
  const copy = () => {
    clipboard.value = clone(props.tableData);
    return clipboard.value;
  };

  const paste = (payload: CopyOptions) => {
    if (!Array.isArray(clipboard.value)) {
      return;
    }
    const { omitProps, onPaste } = payload;
    const rows = clone(clipboard.value).map(item => {
      if (Array.isArray(omitProps)) {
        return omit(omitProps, item);
      }
      return item;
    });
    props.tableData.push(...(isFunction(onPaste) ? onPaste(rows) : rows));
  };

  return { copy, paste };
};
