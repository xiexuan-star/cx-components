import { createVNode, defineComponent, inject, PropType } from 'vue';
import { CxTableDynamicColumn, CxTablePropType, TableDataVisitor } from '../../types';
import cacheListDialog from './cacheListDialog';
import TeleportBtn from './teleportBtn';
import * as R from 'ramda';
import { PATCH_FLAG } from '../../constant/enum';
import { useState } from '../../../../../hooks/state';
import { CxDialogActions } from '../../../../cx-dialog/types';
import { IO, map, Maybe } from '../../../../../utils/functor';

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
