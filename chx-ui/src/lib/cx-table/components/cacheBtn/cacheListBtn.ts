import { IO, map, Maybe, useState } from 'chx-utils';
import * as R from 'ramda';
import { createVNode, defineComponent, inject, PropType } from 'vue';
import { CxDialogActions } from '../../../cx-dialog/types';
import { PATCH_FLAG } from '../../constant';
import { CxTableDynamicColumn, CxTablePropType, TableDataVisitor } from '../../types';
import cacheListDialog from './cacheListDialog';
import TeleportBtn from './teleportBtn';

export default defineComponent({
  name: 'CacheListBtn',
  props: {
    dynamicColumn: { type: Array as PropType<CxTableDynamicColumn[]>, required: true },
    tableDataVisitor: { type: Object as PropType<TableDataVisitor>, required: true }
  },
  setup(props) {
    const rootProp = inject<CxTablePropType>('rootProp')!;

    const [dialogRef, setDialogRef] = useState<CxDialogActions | null>(null);

    const dialogRefIO = IO.of(dialogRef);
    const setCacheIO = dialogRefIO.map(
      R.compose(
        map(R.compose(R.when(R.is(Function), R.call), R.prop<string, any>('openDialog'))),
        Maybe.of
      )
    );

    return () => [
      createVNode(
        TeleportBtn,
        {
          dynamicColumn: props.dynamicColumn,
          clickHandler: setCacheIO.unsafePerformIO.bind(setCacheIO),
          selector: rootProp.cacheListBtn,
          content: '暂存列表'
        },
        null,
        PATCH_FLAG.PROPS,
        R.pair('selector', 'dynamicColumn')
      ),
      createVNode(cacheListDialog, { ref: setDialogRef as any }, null, PATCH_FLAG.NEED_PATCH)
    ];
  }
});
