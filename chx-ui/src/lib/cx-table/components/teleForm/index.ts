import {
  getDoNothingIO, IO, map, Maybe, nextTimeout, queryDom, unsafeAssign, unsafeClearArray, unsafeClearObj,
  unsafeClearPush, unsafeDeleteProperty, unsafePush, unsafeRemoveItem, unsafeSet, useState, useSync, withParams,EventBus
} from 'chx-utils';
import { debounce } from 'lodash-es';
import * as R from 'ramda';
import {
  createVNode, defineComponent, getCurrentInstance, inject, nextTick, PropType, reactive, render, resolveDirective,
  watch, withDirectives
} from 'vue';
import { CxFormItemConfig } from '../../../..';
import { PATCH_FLAG } from '../../constant';
import { useCxTableCompose } from '../../hooks';
import { CxTableBaseObj, CxTableDynamicColumn, CxTablePropType, Nullable, TableDataVisitor } from '../../types';
import { cxTableWarn, getTargetColumn } from '../../utils';
import DynamicFilterBtn from './dynamicFilterBtn';
import DynamicFormAdd from './dynamicFormAdd';
import TeleFormInstance from './formInstance';
import { useDynamicFormCache } from './useDynamicFormCache';
import { useDynamicFormSearch } from './useDynamicFormSearch';

export default defineComponent({
  name: 'TeleForm',
  props: {
    dynamicColumn: { type: Array as PropType<CxTableDynamicColumn[]>, required: true },
    tableDataVisitor: { type: Object as PropType<TableDataVisitor>, required: true },
    loading: { type: Boolean }
  },
  emit: ['update:loading'],
  setup(props, { emit }) {
    const _hoisted_direction = resolveDirective('loading');
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const bus = inject<EventBus>('bus')!;
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const cache = useDynamicFormCache(rootProp);
    const {
      getOptionListFromColumn,
      getDefaultFormItem,
      getCurrentFormConfig,
      isRenderInTeleport,
      isEmptyValue,
      isPositive,
      arrayIsNotEmpty,
      getTargetColumnDefault
    } = useCxTableCompose();
    const { search, searchTotal } = useDynamicFormSearch();

    // 当前展示的表单项
    const currentFormItems = reactive<string[]>(
      R.defaultTo([], cache.getFormCacheIO.unsafePerformIO())
    );
    const getCurrentFormItems = R.always(currentFormItems);
    const oldCurrentFormItems: string[] = [...currentFormItems];
    watch(
      getCurrentFormItems,
      () => {
        const defaultNotEmpty = R.find(
          R.compose(
            R.not,
            R.isNil,
            R.path(['searchStates', 'searchDefault']),
            R.flip(R.find)(props.dynamicColumn),
            R.curryN(2, R.pathEq)(['prop']) as any
          )
        ) as (a: any[]) => boolean;
        R.when(
          R.allPass([arrayIsNotEmpty, defaultNotEmpty]),
          R.compose(fetchAllData, R.forEach(setDefaultValueByProp))
        )(R.difference(currentFormItems, oldCurrentFormItems));
        unsafeClearPush(currentFormItems, oldCurrentFormItems);
      },
      { deep: true }
    );

    // 表单
    const form = reactive<AnyObject>({});
    const initForm = (form: AnyObject) => {
      unsafeClearObj(form);
      currentFormItems.forEach(setDefaultValueByProp);
    };

    const getDefaultValueByProp = R.compose(
      getTargetColumnDefault,
      R.converge(getTargetColumn, [R.identical, () => props.dynamicColumn]) as (
        a: string
      ) => CxTableDynamicColumn
    );
    const setDefaultValueByProp = (prop: string) => {
      getDefaultValueByProp(prop).map(unsafeSet(form, prop));
    };
    // 表格体loading
    const [loading] = useSync(props, emit, ['loading']);

    const setLoading = (val: boolean) => (loading.value = val);
    // 表单loading
    const [formLoading, setFormLoading] = useState(false);

    // 当使用teleportForm时的承载容器
    const [container, setContainer] = useState<HTMLElement | null>(null);

    const formConfig = reactive<CxFormItemConfig[]>([]);

    // 允许的表单项{id,name}[]
    const searchableOptionList = reactive<Record<'name' | 'id', string>[]>([]);
    const setSearchableOptionList = unsafeClearPush(R.__, searchableOptionList);

    const unsafeUpdateConfig = () =>
      unsafeClearPush(getCurrentFormConfig(props.dynamicColumn, currentFormItems), formConfig);

    watch(
      getCurrentFormItems,
      R.compose(unsafeUpdateConfig as any, (val: string[]) => {
        cache.setFormCacheIO.unsafePerformIO(val);
      }),
      { deep: true }
    );

    const fetchTableData = debounce(() => {
      setLoading(true);
      unsafeClearArray(rootProp.tableData);
      search(rootProp, form, currentFormItems, props.tableDataVisitor).finally(() => {
        setLoading(false);
      });
    }, 100);

    const fetchAllData = debounce(async () => {
      fetchTableData();

      await nextTick();

      CxTable.entireTotalSum = {};
      R.when(
        R.prop<string, any>('showForm'),
        R.converge(searchTotal, [
          R.always(rootProp),
          R.always(form),
          R.always(currentFormItems),
          R.always(props.tableDataVisitor),
          R.always(CxTable)
        ])
      )(rootProp);
    }, 50);

    const onSearch = nextTimeout((payload?: AnyObject) => {
      // 处理states
      R.when(R.compose(R.not, R.prop<string, boolean>('visible')), toggleVisibleStates)(states);
      // 处理payload
      R.when(
        R.is(Object),
        R.compose(
          unsafePush(R.__, currentFormItems),
          R.flip(R.difference)(currentFormItems),
          R.keys,
          R.tap(unsafeAssign(R.__, form)),
          R.pick(R.map(R.prop<string, any>('id'), getOptionListFromColumn(props.dynamicColumn)))
        )
      )(payload);
      fetchAllData();
    });
    bus.on('search', onSearch);

    const onClose = (prop: string) => {
      R.compose(
        R.when(isPositive, unsafeRemoveItem(R.__, currentFormItems)),
        R.findIndex(R.equals(prop))
      )(currentFormItems);

      const value = form[prop];
      const removeItemFromConfig = unsafeRemoveItem(R.__, formConfig);
      const removePropFromForm = () => Reflect.deleteProperty(form, prop);
      const reFetchData = R.compose(R.unless(isEmptyValue, fetchAllData), R.always(value));
      const initForm = R.compose(removePropFromForm, removeItemFromConfig);
      R.compose(
        R.when(isPositive, R.compose(reFetchData, initForm)),
        R.findIndex(R.pathEq(['prop'], prop))
      )(formConfig);
    };

    const currentInstance = getCurrentInstance();

    const renderDynamicFormAdd = () => {
      return [createVNode(
        DynamicFormAdd,
        {
          currentInstance,
          options: searchableOptionList,
          modelValue: currentFormItems,
          'onUpdate:modelValue': unsafeClearPush(R.__, currentFormItems)
        },
        null,
        PATCH_FLAG.FULL_PROPS
      )];
    };

    const states = reactive(
      cache.getVisibleCacheIO.map(R.compose(R.objOf('visible'), R.ifElse(R.isNil, R.T, R.identity))).unsafePerformIO()
    );
    const toggleVisibleStates = () => (states.visible = !states.visible);
    watch(
      () => states.visible,
      cache.setVisibleCacheIO.unsafePerformIO.bind(cache.setVisibleCacheIO)
    );

    const _hoisted_attrs_1 = { class: 'cx_dp_flex cx_justify_end cx_mb_16' };
    const _hoisted_attrs_2 = { class: 'cx_line cx_mb_12 cx_mlr_0 cx_w_100p' };
    const _hoisted_attrs_3 = { class: 'cx_dp_flex' };

    const _hoisted_node_1 = createVNode('div', _hoisted_attrs_2);

    const renderForm = () =>
      createVNode('div', { class: 'cx-table_tele_form' }, [
        createVNode('div', _hoisted_attrs_1, [
          createVNode(DynamicFilterBtn, {
            onClick: toggleVisibleStates,
            states
          })
        ]),
        _hoisted_node_1,
        createVNode('div', _hoisted_attrs_3, [
          withDirectives(
            createVNode(
              TeleFormInstance,
              { states, form, items: formConfig, onChange: fetchAllData, onClose },
              { add: renderDynamicFormAdd },
              PATCH_FLAG.FULL_PROPS
            ),
            [[_hoisted_direction ?? {}, formLoading()]]
          )
        ])
      ]);

    // unsafeClearDom::void->string
    const unsafeClearEle = R.compose(map(unsafeSet(R.__, 'innerHTML', '')), Maybe.of) as (
      a: Nullable<HTMLElement>
    ) => Maybe<Nullable<HTMLElement>>;

    // renderVNodeToDom::HTMLElement->void
    const renderVNodeToDom = R.compose(
      R.converge(render, [renderForm, R.identity]),
      R.tap(unsafeClearEle),
      R.tap(unsafeDeleteProperty(R.__, '_vnode'))
    );

    const unsafeWarn = () =>
      cxTableWarn(`can't find container element by selector`, rootProp.formTeleport);

    // 组件更新IO
    const updateComponentIO = IO.of<Nullable<HTMLElement>, string>(queryDom).map(
      R.ifElse(
        R.isNil,
        R.compose(unsafeWarn, unsafeClearEle, container),
        R.compose(map(renderVNodeToDom), Maybe.of, setContainer)
      )
    );

    watch(
      () => props.dynamicColumn,
      async () => {
        await nextTick();
        unsafeUpdateConfig();

        cache.getFormCacheIO
          .map(R.compose(
            unsafeClearPush(R.__, currentFormItems),
            R.defaultTo(getDefaultFormItem(props.dynamicColumn))))
          .unsafePerformIO();
        initForm(form);
        setSearchableOptionList(getOptionListFromColumn(props.dynamicColumn));
        setFormLoading(false);
        fetchAllData();
        R.ifElse(
          isRenderInTeleport,
          R.always(updateComponentIO),
          getDoNothingIO
        )(rootProp).unsafePerformIO(rootProp.formTeleport);
      }
    );

    watch(
      () => rootProp.dynamic,
      () => {
        setFormLoading(true);
        cache.getVisibleCacheIO
          .map(R.compose(unsafeSet(states, 'visible'), R.ifElse(R.isNil, R.T, R.identity)))
          .unsafePerformIO();
      }
    );

    watch(
      [() => rootProp.pagination?.currentPage, () => rootProp.pagination?.pageCapacity],
      fetchTableData
    );

    return withParams(R.ifElse(isRenderInTeleport, R.always(''), renderForm), [rootProp]);
  }
});
