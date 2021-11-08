import { createVNode, defineComponent, inject, PropType, reactive, watch } from 'vue';
import { CxTableDynamicColumn, CxTablePropType, TableDataVisitor } from '../../types';
import { IO, map, Maybe, stateEq200, truthy, unsafeSet, useComputed, useState } from 'chx-utils';
import TeleportBtn from './teleportBtn';
import * as R from 'ramda';
import { PATCH_FLAG } from '../../constant';
import { useCxTableCompose } from '../../hooks';
import { EventBus } from '../../utils';
import { useCxTable } from '../../hooks';

export default defineComponent({
  name: 'SetCacheBtn',
  props: {
    dynamicColumn: { type: Array as PropType<CxTableDynamicColumn[]>, required: true },
    tableDataVisitor: { type: Object as PropType<TableDataVisitor>, required: true }
  },
  setup(props) {
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const bus = inject<EventBus>('bus')!;

    const context = useCxTable().getContext();
    const getDefaultRequestInstance = (() =>
      R.path(['dynamicCacheContext', 'requestInstance', 'default'], context)) as () => any;
    const getMessageInstance = (() => R.path(['messageInstance'], context)) as () => any;


    const { innerBracket } = useCxTableCompose();

    const getCacheData = async (tableProps: CxTablePropType) => {
      return new Promise((resolve, reject) => {
        const next = R.ifElse(truthy, resolve, reject);
        const handle = R.ifElse(R.is(Function), (cb: any) => R.call(cb, next), resolve);
        IO.of(
          R.path<Func<any>>(['hooks', 'onSetCache'])
        )
          .map(handle)
          .unsafePerformIO(tableProps);
      });
    };

    const paramsGenerator = async (innerProp: AnyObject, tableProps: CxTablePropType) => {
      const cache = R.objOf('cache', await getCacheData(tableProps));
      return IO.of(R.path(['tableDataVisitor', 'sortedData']))
        .map(R.objOf('rows'))
        .map(R.mergeLeft(cache))
        .map(R.objOf('content'))
        .map(R.mergeLeft(R.defaultTo({}, tableProps.dynamic)))
        .unsafePerformIO(innerProp);
    };

    const [disabledTime, setDisabledTime] = useState(0);
    const disabledState = reactive(R.objOf('disabled', false));
    const setDisabledState = unsafeSet(disabledState, 'disabled');
    watch(disabledTime, R.compose(setDisabledState, R.not, R.gte(0)));
    const decrease = R.compose(setDisabledTime, R.dec, disabledTime);
    const setTimer = () => {
      const timer: any = setInterval(
        R.compose(R.when(R.gte(0), R.converge(clearInterval, [() => timer])), decrease),
        1000
      );
    };

    const content = useComputed<string>(
      R.compose(
        R.concat('暂存'),
        R.ifElse(R.gte(0), R.always(''), R.compose(innerBracket, R.toString)),
        disabledTime
      )
    );

    const handleResult = R.when(stateEq200, R.converge(getMessageInstance().success, [R.always('暂存成功')]));
    const sendRequest = R.converge(getDefaultRequestInstance().postJSON.bind(getDefaultRequestInstance()), [
      R.always('/draft/manager/save'),
      R.identity
    ]);
    const getParams = R.converge(paramsGenerator, [R.always(props), R.always(rootProp)]);
    const afterSetCacheIO = IO.of(
      R.compose(
        Maybe.of,
        R.path<Func<any>>(['hooks', 'afterSetCache'])
      )
    );
    const setCache = R.compose(
      R.andThen(() => afterSetCacheIO.map(map(R.call)).unsafePerformIO(rootProp)),
      R.andThen(() => bus.emit('removeCacheItem')),
      R.andThen(R.compose(setTimer, R.converge(setDisabledTime, [R.always(10)]))),
      R.andThen(handleResult),
      R.andThen(sendRequest),
      getParams
    );

    return () =>
      createVNode(
        TeleportBtn,
        {
          clickHandler: setCache,
          dynamicColumn: props.dynamicColumn,
          selector: rootProp.setCacheBtn,
          disabledState
        },
        R.objOf('default', R.nAry(0, content)),
        PATCH_FLAG.PROPS,
        ['selector', 'dynamicColumn']
      );
  }
});
