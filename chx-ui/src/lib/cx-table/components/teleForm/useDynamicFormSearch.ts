import {
  CxDynamicProps,
  CxTableBaseObj,
  CxTablePropType,
  DYNAMIC_CONFIG,
  DYNAMIC_FORM_REQUEST_PARAMS,
  PaginationModel,
  TableDataVisitor
} from '../../types';
import { changeDynamicIdToText, cxTableWarn } from '../../utils';
import { Rule, useCxTable, useCxTableCompose } from '../../hooks';
import * as R from 'ramda';
import {
  either,
  getMaybeValue,
  Left,
  map,
  Maybe,
  Right,
  truthy,
  unsafeClearAssign,
  unsafeClearPush,
  unsafeSet,
  unsafeWhenDevCall,
  withParams,
  isNumber
} from 'chx-utils';

export const useDynamicFormSearch = () => {
  const { getParamsItems, getConfigByDynamicConfig } = useCxTableCompose();
  const context = useCxTable().getContext();

  const devTip = R.tap(
    unsafeWhenDevCall((dynamic: CxDynamicProps) =>
      console.info(
        `[CxTable]:dynamic form auto fetchData by config `,
        changeDynamicIdToText(dynamic)
      )
    )
  );
  const errorDevTip = unsafeWhenDevCall((dynamic: CxDynamicProps) => {
    cxTableWarn(`can't match api by config `, changeDynamicIdToText(dynamic));
  });

  const updateTotal = R.useWith(unsafeClearAssign, [
    R.identity,
    R.prop<string, any>('entireTotalSum')
  ]);

  const initRequestParams = (
    rootProp: CxTablePropType,
    form: AnyObject,
    currentFormItems: string[],
    tableDataVisitor: TableDataVisitor
  ) => {
    const setItems = R.set<DYNAMIC_FORM_REQUEST_PARAMS, any>(
      R.lensProp('items'),
      getParamsItems(form, currentFormItems)
    );
    const mergeSort = R.mergeLeft<Partial<DYNAMIC_FORM_REQUEST_PARAMS>>(
      R.zipObj(
        ['sortDirection', 'sortProp'],
        [tableDataVisitor.sortStatus, tableDataVisitor.sortProp]
      ) as Partial<DYNAMIC_FORM_REQUEST_PARAMS>
    );
    const mergePagination = R.mergeLeft<Partial<PaginationModel>>(
      R.pick(['currentPage', 'pageCapacity'], R.prop('pagination', rootProp))
    ) as (a: DYNAMIC_FORM_REQUEST_PARAMS) => DYNAMIC_FORM_REQUEST_PARAMS;

    const beforeSearchIsExist = () => truthy(rootProp.hooks?.beforeSearch);
    return R.compose(
      R.when(beforeSearchIsExist, rootProp.hooks?.beforeSearch),
      setItems as any,
      mergeSort,
      mergePagination,
      R.prop<'dynamic', DYNAMIC_FORM_REQUEST_PARAMS>('dynamic')
    )(rootProp as Required<CxTablePropType>);
  };

  const updateTableData = R.curryN(3, (data: AnyObject, rootProp: CxTablePropType, CxTable: CxTableBaseObj) => {
    const { rows, total, summary } = data;
    isNumber(total) && Maybe.of(rootProp.pagination).map(unsafeSet(R.__, 'total', total));
    if (!Array.isArray(rows)) return;
    if (R.isEmpty(rows) && R.gt(R.defaultTo(0, rootProp.pagination?.currentPage), 1)) {
      rootProp.pagination!.currentPage--;
    } else {
      R.compose(
        R.when(R.is(Array), unsafeClearPush(R.__, rootProp.tableData)),
        R.ifElse(R.is(Function), (cb: Func<any>) => cb(rows, data), R.always(rows))
      )(rootProp.hooks?.onSearch);
    }
    if (!!summary) {
      updateTotal(summary, CxTable);
    }
  });

  const checkDynamic = (dynamic?: DYNAMIC_CONFIG) => {
    if (!dynamic) {
      cxTableWarn(`can't fetch data if dynamic `, dynamic, ` is invalid`);
      throw 'invalid dynamic';
    }
  };

  const matchedRule = R.compose(
    getMaybeValue,
    R.converge(getConfigByDynamicConfig, [
      R.identity,
      R.compose(
        R.prop(R.__, context.dynamicFormContext.requestApiMap),
        R.prop<string, any>('moduleType')
      )
    ]) as (a: DYNAMIC_CONFIG) => Maybe<Rule>
  );

  const search = async (
    rootProp: CxTablePropType,
    form: AnyObject,
    currentFormItems: string[],
    tableDataVisitor: TableDataVisitor,
    CxTable: CxTableBaseObj,
    withTotal?: boolean
  ) => {
    const { dynamic } = rootProp;
    checkDynamic(dynamic);
    const matchedRuleEither = R.compose(R.ifElse(R.isNil, Left.of, Right.of), matchedRule);
    const needTotals = () => !!withTotal;
    const getTotals = R.compose(
      getMaybeValue,
      map(R.objOf('totals')) as (a: AnyObject) => Maybe<any>,
      map(R.map(R.prop<string, any>('prop'))),
      map(R.filter(R.compose(truthy, R.prop<string, any>('sum')))),
      map(R.prop<string, any>('flatColumns')),
      Maybe.of
    ) as (a: CxTableBaseObj) => { totals: string[] };
    return either(
      withParams(errorDevTip, [dynamic]),
      async (rule: Rule) => {
        devTip(dynamic!);
        const rulePropVal = R.prop(R.__, rule);
        const stateEq200 = R.propEq('state', 200);
        R.when(
          stateEq200,
          R.compose(updateTableData(R.__, rootProp, CxTable), R.prop<string, any>('data'))
        )(
          await rulePropVal('requestInstance').postJSON(
            rulePropVal('api'),
            R.when(
              needTotals,
              R.converge(R.mergeRight, [() => getTotals(CxTable), R.identity])
            )(initRequestParams(rootProp, form, currentFormItems, tableDataVisitor))
          )
        );
      },
      matchedRuleEither(dynamic!)
    );
  };

  // const searchTotal = async (
  //   rootProp: CxTablePropType,
  //   form: AnyObject,
  //   currentFormItems: string[],
  //   tableDataVisitor: TableDataVisitor,
  //   CxTable: CxTableBaseObj
  // ) => {
  //   const { dynamic } = rootProp;
  //   checkDynamic(dynamic);
  //   const matchedRuleEither = R.compose(R.ifElse(R.isNil, Left.of, Right.of), matchedRule);
  //   return either(
  //     R.converge(errorDevTip, [R.always(dynamic)]),
  //     async (rule: Rule) => {
  //       const rulePropVal = R.prop(R.__, rule);
  //       const stateEq200 = R.propEq('state', 200);
  //       const requestInstance = rulePropVal('requestInstance');
  //       const getTotals = R.compose(
  //         getMaybeValue,
  //         map(R.objOf('totals')) as (a: AnyObject) => Maybe<any>,
  //         map(R.map(R.prop<string, any>('prop'))),
  //         map(R.filter(R.compose(truthy, R.prop<string, any>('sum')))),
  //         map(R.prop<string, any>('flatColumns')),
  //         Maybe.of
  //       ) as (a: CxTableBaseObj) => { totals: string[] };
  //
  //       R.when(
  //         stateEq200,
  //         R.compose(R.curryN(3, R.call)(updateTotal, R.__, CxTable), R.prop<string, any>('data'))
  //       )(
  //         await R.compose(
  //           R.ifElse(
  //             R.compose(arrNotEmpty, R.prop<string, any>('totals')),
  //             R.compose(
  //               R.converge(requestInstance.postJSON.bind(requestInstance), [
  //                 R.always('/header/total'),
  //                 R.identity
  //               ]),
  //               R.mergeLeft(initRequestParams(rootProp, form, currentFormItems, tableDataVisitor))
  //             ),
  //             defaultPromise({})
  //           ),
  //           getTotals
  //         )(CxTable)
  //       );
  //     },
  //     matchedRuleEither(dynamic!)
  //   );
  // };

  return { initRequestParams, updateTableData, search };
};
