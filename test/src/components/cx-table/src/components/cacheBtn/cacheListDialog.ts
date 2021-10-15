import {
  createBlock,
  createVNode,
  defineComponent,
  Fragment,
  inject,
  openBlock,
  reactive,
  resolveDirective,
  watch,
  withDirectives
} from 'vue';
import { CxTableBaseObj, CxTablePropType, DYNAMIC_CONFIG, ParamsItem } from '../../types';
import * as R from 'ramda';
import CxTable from '../../..';
import { useCxTableCompose } from '../../hooks/useCxTableCompose';
import { CxConfigAdaptor, debounce, EventBus, getColumnSelectText } from '../../utils';
import { PATCH_FLAG, TypeOption } from '../../constant/enum';
import { decimalFixed } from '../../utils/configAdaptor/adaptorUtils';
import Empty from '../empty.vue';

import Ellipsis from '../ellipsis/index.vue';
import { CacheRule, useCxTable } from '../../hooks/useCxTable';
import { useCxDialog } from '../../../../cx-dialog/useCxDialog';
import { useComputed, useState } from '../../../../../hooks/state';
import { useEnumOptions } from '../../../../../utils';
import _CX_DIALOG from '../../../../cx-dialog';
import {
  falsy,
  getMaybeValue,
  IO,
  map,
  Maybe,
  preventDefault,
  stateEq200,
  stopPropagation,
  truthy,
  unsafeClearArray,
  unsafeClearObj,
  unsafeClearPush,
  unsafePush,
  unsafeRemoveItem
} from '../../../../../utils/functor';
import { CxFormItemConfig } from '@/components/cx-form/types';
import { CxForm, CxTab } from '@/components';

const DEFAULT_CAPACITY = 10;

export default defineComponent({
  name: 'CacheListDialog',
  setup(_, { expose }) {
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const rootSlots = inject<AnyObject>('rootSlots')!;
    const $CxTable = inject<CxTableBaseObj>('CxTable')!;
    const bus = inject<EventBus>('bus')!;
    const { getParamsItems, getConfigByDynamicConfig, arrNotEmpty } = useCxTableCompose();
    const context = useCxTable().getContext();
    const getDefaultRequestInstance = (() =>
      R.path(['dynamicCacheContext', 'requestInstance', 'default'], context)) as () => any;
    const getRequestApiMap = (() =>
      R.path(['dynamicCacheContext', 'requestApiMap'], context)) as () => string;
    const getRemoveApiMap = (() =>
      R.path(['dynamicCacheContext', 'removeApiMap'], context)) as () => string;
    const getLabelConfig = (() =>
      R.path(['dynamicCacheContext', 'cacheLabelConfig'], context)) as () => CacheRule[];
    const getTabCondition = (() =>
      R.path(['dynamicCacheContext', 'cacheTypeTab'], context)) as () => Func<any>;
    const getMessageInstance = (() => R.path(['messageInstance'], context)) as () => any;

    const needTypeTab = R.ifElse(
      R.is(Function),
      (condition: Func<any>) => condition(rootProp),
      R.T
    );
    const [register, dialogExpose] = useCxDialog();
    const openDialog = () => {
      resetForm();
      resetPage();
      setCurrentType(TypeOption.未提交);
      dialogExpose.openDialog();
    };
    expose({
      openDialog
    });

    const [currentType, setCurrentType] = useState(TypeOption.未提交);
    const typeOptionList = useEnumOptions(TypeOption);

    const resetPage = () => {
      setActiveItem(null);
      unsafeClearArray(orderList());
      setHasDone(false);
    };

    // ------------------------------ 表单 ------------------------------
    const form = reactive({ gmtCreate: [] });
    const resetForm = () => {
      unsafeClearObj(form);
      form.gmtCreate = [];
    };
    const items: CxFormItemConfig[] = [{ label: '提交日期', prop: 'gmtCreate', dateRange: {} }];

    // ------------------------------ 数据源 ------------------------------
    // 左侧列表相关
    const [activeItem, setActiveItem] = useState<AnyObject | null>(null);
    const [hasDone, setHasDone] = useState(false);

    const [orderList] = useState<AnyObject[]>([]);
    // 右侧明细相关
    const tableData = useComputed(
      R.compose(
        R.prop<'rows', AnyObject[]>('rows'),
        R.prop<any, any>('content'),
        R.defaultTo({}),
        activeItem
      )
    );
    const tableConfig = reactive({ items: [] });
    const setTableConfig = unsafeClearPush(R.__, tableConfig.items);

    const [globalConfig, setGlobalConfig] = useState<AnyObject[]>([]);
    const getGlobalConfig = R.nAry(0, globalConfig);

    const initTableConfig = R.ifElse(R.is(Array), R.map(CxConfigAdaptor.of), R.always([]));
    const initAndSetConfig = R.compose(setTableConfig, initTableConfig);

    watch(
      () => activeItem(),
      R.compose(
        R.ifElse(arrNotEmpty, initAndSetConfig, R.converge(initAndSetConfig, [getGlobalConfig])),
        R.prop<string, AnyObject[]>('table'),
        R.defaultTo({}) as (a: any) => AnyObject
      )
    );

    // ------------------------------ api ------------------------------
    // paramsGenerator::DYNAMIC_CONFIG|undefined->AnyObject->Params
    const paramsGenerator = (dynamic: DYNAMIC_CONFIG | undefined, form: AnyObject) => {
      const getItemObj = R.compose(
        R.objOf('items'),
        R.converge(getParamsItems, [R.identity, R.always(R.of('gmtCreate'))]) as (
          a: AnyObject
        ) => ParamsItem[]
      );
      const mergeDynamic = R.mergeLeft(R.defaultTo({}, dynamic)) as Func<AnyObject>;
      const mergePage = R.mergeLeft(
        R.zipObj(['queryIndex', 'pageCapacity'], [R.length(orderList()), DEFAULT_CAPACITY])
      );
      const mergeOrderType = R.when(
        R.compose(truthy, R.nAry(0, currentType)),
        R.mergeLeft(R.objOf('orderType', currentType())) as Func<AnyObject>
      );
      return R.compose(Maybe.of, mergeOrderType, mergeDynamic, mergePage, getItemObj)(form);
    };

    const getInnerTable = R.path(['data']);
    const moduleTypePath = R.path(['dynamic', 'moduleType']) as (a: CxTablePropType) => number;
    const getSpecialAxios = R.compose(
      R.defaultTo(getDefaultRequestInstance()),
      R.prop(R.__, context.dynamicCacheContext.requestInstance) as (a: number) => any
    );
    const sendRequestIO = IO.of(() =>
      Maybe.run<Promise<AnyObject>>(
        (function* (): any {
          const api = yield Maybe.of(R.prop(currentType(), getRequestApiMap()));
          const params = yield paramsGenerator(rootProp.dynamic, form);
          const instance = yield R.compose(
            Maybe.of,
            R.ifElse(
              isDraft,
              getDefaultRequestInstance,
              R.compose(getSpecialAxios, R.converge(moduleTypePath, [R.always(rootProp)]))
            )
          )(currentType());
          return R.andThen(
            R.compose(Maybe.of, R.ifElse(stateEq200, getInnerTable, R.always(void 0))),
            instance.postJSON(api, params)
          );
        })()
      )
    );

    const maybePropTotal = R.compose(Maybe.of, R.prop<string, any>('total'));
    const maybePropRows = R.compose(Maybe.of, R.prop<string, any>('rows'));
    const maybePropTable = R.compose(Maybe.of, R.prop<string, any>('table'));
    const getOrderList = R.nAry(0, orderList);
    const isHasDone = R.converge(R.gte, [R.compose(R.length, getOrderList), R.identity]);
    const pushInOrderList = R.converge(unsafePush, [R.identity, getOrderList]);
    const fetchHandleIO = sendRequestIO.map(
      map(
        R.andThen(
          map(
            R.compose(
              R.tap(R.compose(map(setGlobalConfig), maybePropTable)),
              R.tap(R.compose(map(R.compose(setHasDone, isHasDone)), maybePropTotal)),
              R.tap(R.compose(map(pushInOrderList), maybePropRows)),
              R.pick(['total', 'rows', 'table']) as Func<any>
            )
          )
        )
      )
    );
    const setDefaultActive = R.converge(
      R.when(
        R.compose(R.isNil, R.nAry(0, activeItem)),
        R.converge(setActiveItem, [R.compose(R.head, getOrderList)])
      ),
      [R.F]
    );
    const fetchData = R.converge(
      R.ifElse(
        R.complement(hasDone),
        fetchHandleIO.unsafePerformIO.bind(fetchHandleIO),
        Maybe.none
      ),
      [R.F]
    );

    const scrollFetchRequest = R.compose(
      map(R.andThen(setDefaultActive)) as (a: Maybe<any>) => Maybe<Promise<any>>,
      fetchData
    );
    const scrollFetch = debounce(scrollFetchRequest, 50);
    const conditionChangeFetch = R.compose(scrollFetch, resetPage);

    watch(currentType, conditionChangeFetch);

    let lock = false;
    const getLock = () => lock;
    const setLock = (val = true) => (lock = val);
    const removeFetch = R.ifElse(
      getLock,
      R.identity,
      R.compose(
        R.compose(map(R.andThen(R.converge(setLock, [R.F]))), scrollFetchRequest),
        setLock,
        R.T
      )
    );

    // ------------------------------ 删除 ------------------------------
    const isDraft = R.equals(TypeOption.未提交);
    const getQueryCompose = (dynamic?: DYNAMIC_CONFIG) => {
      return R.ifElse(
        R.compose(R.not, isDraft, R.prop<string, any>('type')),
        R.always(dynamic),
        R.empty
      );
    };

    const getSendRequestWithId = (requestType: 'get' | 'delete') => {
      return (params: { id: number; api: string }) => sendRequestWithId(requestType, params);
    };

    function* sendRequestWithId(
      requestType: 'get' | 'delete',
      params: { id: number; api: string }
    ): any {
      const { id, api } = params;
      const paramId = yield Maybe.of(id);
      const url = yield Maybe.of(api);
      const urlWithId = yield Maybe.of(R.concat(url, R.toString(paramId)));
      const query = getQueryCompose(rootProp.dynamic)(params);
      const instance = yield Maybe.of(getDefaultRequestInstance()?.[requestType]);
      return instance(urlWithId, query);
    }
    const removeItemIO = IO.of(R.compose(Maybe.run, getSendRequestWithId('delete')));

    const doRemove = (id: number) => {
      const index = R.findIndex(R.pathEq(['form', 'id'], id), orderList());
      R.when(R.lte(0), unsafeRemoveItem(R.__, orderList()))(index);
      R.when(
        R.pathEq(['form', 'id'], id),
        R.converge(setActiveItem, [R.always(null)])
      )(activeItem());
      R.when(R.compose(R.gte(10), R.length), removeFetch)(orderList());
    };
    const removeItem = (id: number) => {
      removeItemIO
        .map(map(R.andThen(R.when(stateEq200, R.converge(doRemove, [R.always(id)])))))
        .unsafePerformIO({ id, api: getRemoveApiMap()?.[currentType()] });
    };

    const setBusOn = (params: { id: number; type: TypeOption }) => {
      bus.on('removeCacheItem', () => {
        removeItemIO.unsafePerformIO(R.assoc('api', getRemoveApiMap()?.[currentType()], params));
        setBusOff();
      });
    };
    const setBusOff = () => {
      bus.off('removeCacheItem');
    };

    // 使用数组绑定会出现异常触发的情况
    watch(() => rootProp.dynamic!.businessType, setBusOff);
    watch(() => rootProp.dynamic!.modelType, setBusOff);

    // ------------------------------ 提交 ------------------------------
    const getOmitRows = R.curryN(
      3,
      (rows: AnyObject[], mainTableConfig: AnyObject[], currentTableConfig: AnyObject[]) => {
        const mapProp = R.map(R.prop<string, string>('prop')) as (a: AnyObject[]) => string[];
        const diffProp = R.difference<string>(
          mapProp(mainTableConfig),
          mapProp(currentTableConfig)
        );
        return R.map(R.omit(diffProp), rows);
      }
    );

    function* mergeCacheData(): any {
      const content = yield Maybe.of(R.path(['content'], activeItem()));
      const rows = yield Maybe.of(R.path(['rows'], content));
      const getEditRows = getOmitRows(R.__, tableConfig.items, $CxTable.flatColumns);
      unsafeClearPush(getEditRows(rows), rootProp.tableData);
      dialogExpose.openDialog(false);

      setBusOff();
      setBusOn({ id: getId(activeItem())!, type: currentType() });
      const callHook = R.converge(R.call, [
        R.always(yield Maybe.of(R.path(['hooks', 'onGetCache'], rootProp))),
        R.always(R.clone(yield Maybe.of(R.path(['cache'], content)))),
        R.nAry(0, currentType),
        R.always(getEditRows(rows)),
        R.always(R.clone(yield Maybe.of(R.path(['form'], activeItem()))))
      ]);
      // 目前暂不清楚为何在同步调用的情况下会出现弹窗无法正确关闭的问题,故使用setTimeout
      setTimeout(callHook);
    }
    const continueEdit = R.compose(Maybe.run, mergeCacheData);

    // ------------------------------ 判断是否存在 ------------------------------
    const existApiMap: Record<TypeOption, string> = {
      [TypeOption.未提交]: '/draft/manager/draft/exist/',
      [TypeOption.已驳回]: '/draft/manager/order/exist/',
      [TypeOption.已反审]: '/draft/manager/order/exist/'
    };
    const orderIsExist = R.compose(Maybe.run, getSendRequestWithId('get'));

    const dataIsFalsy = R.allPass([stateEq200, R.compose(falsy, R.prop<string, string>('data'))]);
    const notExistToast = R.converge(getMessageInstance().warning, [
      R.always('此数据已被删除,请重新打开暂存弹窗!')
    ]);

    // ------------------------------ 组合exist与submit ------------------------------
    const onOk = R.compose(
      map(R.andThen(R.ifElse(dataIsFalsy, continueEdit, notExistToast))),
      R.converge(orderIsExist, [
        R.converge(R.zipObj, [
          R.always(['id', 'api']),
          R.converge(R.pair, [
            R.converge(R.path(['form', 'id']), [R.nAry(0, activeItem)]),
            R.converge(R.prop, [R.nAry(0, currentType), R.always(existApiMap)])
          ])
        ])
      ])
    );
    // ------------------------------ 渲染函数 ------------------------------
    const _hoisted_direction_1 = resolveDirective('infinite-scroll');

    const _hoisted_class_1 = 'cx_secondary_title cx_pl_16 cx_ptb_12';
    const _hoisted_class_2 = 'cx_pl_16 cx_cursor_pointer cx_position_re hover_show_container';
    const _hoisted_class_3 = 'cx_of_auto cx_h_500';
    const _hoisted_class_4 = 'cx_ml_5 cx_mr_16';
    const _hoisted_class_5 = 'cx_flex_center cx_ptb_12 cx_plr_16 cx_bb';
    const _hoisted_class_6 = 'cx_p_16 cx_flex_center cx_justify_between';
    const _hoisted_class_7 = 'cx_dp_flex cx_bt cx_w_100p';
    const _hoisted_class_8 = 'cx_w_200 cx_br';
    const _hoisted_class_9 = 'cx_bb cx_ptb_16';
    const _hoisted_class_10 = 'cx_mb_12 cx_fs_14';

    const _hoisted_attrs_1 = {
      class: 'iconfont icon-shanchu cx_position_ab hover_high_light_red hover_show',
      style: 'right:16px;bottom:16px'
    };
    const _hoisted_attrs_2 = { class: _hoisted_class_3 };
    const _hoisted_attrs_3 = { style: { width: 'calc(100% - 200px)' } };
    const _hoisted_attrs_4 = { style: 'color: rgba(0, 0, 0, 0.45)' };
    const _hoisted_attrs_5 = { class: 'cx_flex_center cx_justify_center', ..._hoisted_attrs_3 };

    const renderTitle = (content: string) => {
      return createVNode('div', { class: _hoisted_class_1 }, content, PATCH_FLAG.TEXT);
    };

    // getBaseInfo::object a,object b=>a->b
    const getBaseInfo = R.converge(R.mergeRight, [
      R.compose(R.defaultTo({}), R.path(['content', 'cache'])),
      R.compose(R.defaultTo({}), R.path(['form']))
    ]);
    // getId::object->number
    const getId = R.path<number>(['form', 'id']);
    // titlePath Object a,Object b::a->b
    const titlePath = R.path(['config', 'listTitle']) as (a: AnyObject) => AnyObject;
    // defaultTitle
    const defaultTitle = R.defaultTo('新建暂存数据') as (a: any) => string;
    const renderListItem = R.curryN(2, (item: AnyObject, currentItem: AnyObject | null) => {
      const maybeConfig = getConfigByDynamicConfig(rootProp.dynamic!, getLabelConfig());
      const getItemValByPath = R.converge(R.path, [R.identity, R.always(getBaseInfo(item))]);
      return createVNode(
        'li',
        {
          class: _hoisted_class_2,
          key: getId(item),
          style: R.compose(
            R.objOf('backgroundColor'),
            R.ifElse(
              R.pathEq(['form', 'id'], getId(currentItem)),
              R.always('#F0F5FF'),
              R.always('transparent')
            )
          )(item),
          onClick: R.compose(setActiveItem, R.always(item))
        },
        [
          createVNode('div', { class: _hoisted_class_9 }, [
            createVNode(
              'div',
              { class: _hoisted_class_10 },
              R.compose(
                defaultTitle,
                getMaybeValue,
                map(R.compose(getItemValByPath)) as (a: Maybe<AnyObject>) => Maybe<string>,
                map(R.compose(R.of)),
                map(R.compose(R.prop<string, string>('prop'), titlePath)) as (
                  a: Maybe<CacheRule>
                ) => Maybe<string>
              )(maybeConfig),
              PATCH_FLAG.TEXT
            ),
            createVNode(
              'div',
              _hoisted_attrs_4,
              R.path(['form', 'gmtCreate'], item),
              PATCH_FLAG.TEXT
            ),
            createVNode('i', {
              ..._hoisted_attrs_1,
              onClick: R.compose(
                R.converge(removeItem, [R.always(getId(item))]),
                stopPropagation,
                preventDefault
              )
            })
          ])
        ],
        PATCH_FLAG.FULL_PROPS
      );
    });

    const renderList = (list: AnyObject[]) => {
      return withDirectives(
        createVNode('ul', _hoisted_attrs_2, [
          (openBlock(),
          createBlock(
            Fragment,
            null,
            R.map(renderListItem(R.__, activeItem() as any), list),
            PATCH_FLAG.KEYED_FRAGMENT
          ))
        ]),
        [[_hoisted_direction_1 ?? {}, scrollFetch]]
      );
    };

    // infoPath Object a,Object b::a->b[]
    const infoPath = R.path(['config', 'tableInfo']) as (a: AnyObject) => AnyObject;
    const labelItemList = useComputed(() => {
      const maybeConfig = getConfigByDynamicConfig(rootProp.dynamic!, getLabelConfig());
      return R.compose(
        R.defaultTo([]) as (a: any) => any[],
        getMaybeValue,
        map(infoPath) as (a: Maybe<CacheRule>) => Maybe<string>
      )(maybeConfig);
    });
    const renderOrderInfoItem = (state: Record<string, string>, item: AnyObject | null) => {
      const render = (content: string) => {
        return [
          createVNode('label', null, `${state[`label_${currentType()}`] ?? state.label}:`),
          createVNode(
            'div',
            { class: _hoisted_class_4 },
            content ?? state.defaultValue,
            PATCH_FLAG.TEXT
          )
        ];
      };
      return R.compose(
        R.ifElse(truthy, render, R.always(null)),
        R.defaultTo(state.defaultValue),
        R.path([state.prop])
      )(item);
    };
    const renderOrderInfo = (item: AnyObject | null) => {
      return createVNode(
        'article',
        { class: _hoisted_class_5 },
        R.compose(
          R.map(
            R.converge(renderOrderInfoItem, [R.identity, R.converge(getBaseInfo, [R.always(item)])])
          ),
          labelItemList
        )()
      );
    };

    const invokerWithChildren = (cb: Func<any>) => {
      return R.compose(
        cb,
        R.when(
          R.compose(R.is(Array), R.prop<string, any[]>('children')),
          R.converge(R.set(R.lensProp('children')), [
            R.compose(R.map(cb), R.prop<string, AnyObject[]>('children')),
            R.identity
          ])
        )
      );
    };
    const labelContainer = (label: string) => {
      return R.compose(truthy, R.find(R.includes(R.__, label)))(['操作', '选择', '多选']);
    };
    const noRequired = invokerWithChildren(R.omit(['required']));
    const setImgsType = R.compose(
      R.when(
        R.compose(R.equals('款型图'), R.prop<string, any>('label')),
        R.compose(
          R.set(R.lensProp<any>('control'), R.objOf('type', 'imgs')),
          R.omit(['slot']) as (a: AnyObject) => AnyObject
        )
      )
    ) as (a: AnyObject) => AnyObject;
    const setDefaultSlot = R.compose(
      R.when(
        R.compose(R.all(falsy), R.props<string, string>(['slot', 'calculate', 'dynamicCalculate'])),
        R.assoc('slot', 'renderWithText')
      )
    );
    const imgsTypeInvoker = invokerWithChildren(setImgsType);
    const slotInvoker = invokerWithChildren(setDefaultSlot);
    const labelNotShow = R.compose(R.not, R.propSatisfies(labelContainer, 'label'));
    const dynamicInject = R.compose(
      R.map<AnyObject, AnyObject>(R.compose(imgsTypeInvoker, slotInvoker, noRequired)),
      R.filter(labelNotShow) as (a: AnyObject[]) => AnyObject[],
      R.when(
        R.converge(R.is(Function), [R.always(rootProp.dynamicInject)]),
        rootProp.dynamicInject!
      )
    );
    const renderOrderTable = (config: { items: AnyObject[] }, dataList: AnyObject[]) => {
      return createVNode(
        CxTable,
        {
          dynamicInject,
          ...R.pick(['ignoreControl'], rootProp),
          tableConfig: config,
          disabled: true,
          keyboard: false,
          height: 427,
          class: 'cx_m_16',
          tableData: dataList,
          configurable: false
        },
        {
          ...rootSlots,
          renderWithText: ({ rowData, column }: AnyObject) => {
            const prop = column.prop ?? '';
            let content: any = prop.endsWith('Id')
              ? rowData[getColumnSelectText(column)] ?? rowData[getColumnSelectText(column, 'Name')]
              : rowData[prop + 'Text'] ?? rowData[prop + 'Name'] ?? rowData[prop];
            if (R.is(Number, column.accuracy)) {
              content = decimalFixed(content, column.accuracy, true);
            }
            return [createVNode(Ellipsis, { content }, null, PATCH_FLAG.PROPS, ['content'])];
          }
        },
        PATCH_FLAG.PROPS,
        R.pair('dynamic', 'tableData')
      );
    };

    return (_: any, cache: any[]) => {
      return (
        openBlock(),
        createBlock(Fragment, null, [
          createVNode(
            _CX_DIALOG,
            {
              title: TypeOption[currentType()],
              appendToBody: true,
              okText: '编辑',
              width: '1524px',
              top: '50px',
              destroyOnClose: true,
              onRegister: register,
              onOk,
              disabledOk: R.isNil(activeItem())
            },
            {
              default() {
                return [
                  // 顶部
                  createVNode('section', { class: _hoisted_class_6 }, [
                    // tab切换
                    (openBlock(),
                    createBlock(Fragment, null, [
                      R.compose(needTypeTab, getTabCondition)()
                        ? createVNode(
                            CxTab,
                            {
                              level: 3,
                              options: typeOptionList,
                              modelValue: currentType(),
                              'onUpdate:modelValue': setCurrentType
                            },
                            null,
                            PATCH_FLAG.PROPS,
                            R.of('modelValue')
                          )
                        : cache[2] || (cache[2] = createVNode('div', null, '未提交'))
                    ])),
                    // 搜索项
                    createVNode(
                      CxForm,
                      { form, items, onChange: conditionChangeFetch, style: 'margin-bottom:-18px' },
                      null,
                      PATCH_FLAG.PROPS,
                      R.of('form')
                    )
                  ]),
                  // 内容区
                  createVNode('section', { class: _hoisted_class_7 }, [
                    // 订单列表
                    createVNode('div', { class: _hoisted_class_8 }, [
                      cache[0] || (cache[0] = renderTitle('订单列表')),
                      R.compose(renderList, orderList as () => AnyObject[])()
                    ]),
                    // 明细列表
                    (openBlock(),
                    createBlock(Fragment, null, [
                      activeItem()
                        ? createVNode('div', _hoisted_attrs_3, [
                            cache[1] || (cache[1] = renderTitle('明细列表')),
                            renderOrderInfo(activeItem()),
                            renderOrderTable(tableConfig, tableData())
                          ])
                        : createVNode('div', _hoisted_attrs_5, [createVNode(Empty)])
                    ]))
                  ])
                ];
              }
            },
            PATCH_FLAG.PROPS,
            R.pair('title', 'disabledOk')
          )
        ])
      );
    };
  }
});
