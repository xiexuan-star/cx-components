import { CxTableDynamicColumn, DYNAMIC_CONFIG, ParamsItem } from '../types';
import { FormConfigAdaptor } from '../utils/formConfigAdaptor';
import * as R from 'ramda';
import { arrFlat, changeDynamicIdToText, cxTableWarn, formatFormDefaultValue } from '../utils';
import { CxFormItemConfig } from '../../..';
import { unsafeGet, splat, truthy, Maybe, unsafePush, unsafeWhenDevCall } from '../../../utils/functor';

export const useCxTableCompose = () => {
  // getAllSearchableColumn::CxTableDynamicColumn a=>a[]->a[]
  const getAllSearchableColumn = R.compose(
    R.filter(R.compose(R.is(Object), unsafeGet(R.__, 'searchStates'))),
    arrFlat as (a: CxTableDynamicColumn[]) => CxTableDynamicColumn[]
  );

  const getDefaultFormItem = R.compose(
    R.map(R.prop('prop')),
    R.filter(
      R.compose(
        truthy,
        R.path(['jsonData', 'defaultFormItem']))) as (a: CxTableDynamicColumn[]) => CxTableDynamicColumn[],
    getAllSearchableColumn);

  // getSearchableFormConfig::CxTableDynamicColumn[]->CxFormItemConfig[]
  const getSearchableFormConfig = R.compose(R.map(FormConfigAdaptor.of), getAllSearchableColumn);

  // column2NameWithId::CxTableDynamicColumn[]->NameWithId[]
  const column2NameWithId = R.compose(
    R.zipObj(['id', 'name']),
    R.props<string, any>(['prop', 'label'])
  );

  // getOptionListFromColumn::CxTableDynamicColumn[]->Option[]
  const getOptionListFromColumn = R.compose(R.map(column2NameWithId), getAllSearchableColumn);

  // getCurrentFormConfig::CxTableDynamicColumn[]->string[]->CxFormItemConfig[]
  const getCurrentFormConfig = (columns: CxTableDynamicColumn[], currentItems: string[]) => {
    const itemList = getSearchableFormConfig(columns);

    return R.compose(
      R.append({ label: '', prop: 'add', custom: { slot: 'add' } }),
      R.reduce((res, prop) => {
        return R.compose(
          R.ifElse(R.isNil, R.always(res), R.flip(R.append)(res)),
          R.find(R.propEq('prop', prop))
        )(itemList);
      }, [] as CxFormItemConfig[])
    )(currentItems);
  };

  // isEmptyValue::a->boolean
  const isEmptyValue = R.anyPass([
    R.isNil,
    R.equals<any>(-1),
    R.equals<any>(''),
    R.ifElse(R.is(Array), R.compose(R.equals(0), R.length as any), R.F)
  ]);

  // isRenderInTeleport::object->boolean
  const isRenderInTeleport = R.allPass([R.prop('formTeleport')]);

  // formValueFormat::a->object
  const formValueFormat = R.ifElse(
    Array.isArray,
    R.compose(
      R.zipObj(['val1', 'val2']),
      R.props<string, string>(['0', '1'])
    ),
    R.objOf('value')
  );

  // arrayIsNotEmpty::array a=>a->boolean
  const arrayIsNotEmpty = R.compose(R.gt(R.__, 0), R.length as (a: any[]) => number);

  // isPositive::number->boolean
  const isPositive = R.gte(R.__, 0);

  // getDynamicKeyPair::Object a=>a->{DynamicKey,any}[]
  const getDynamicKeyPair = R.compose(R.toPairs, R.omit(['config', 'api', 'requestInstance'])) as (
    a: AnyObject
  ) => [keyof DYNAMIC_CONFIG, any][];

  // splatEq::a->b->boolean
  const splatEq = splat(R.equals as (a: any, b: any) => boolean) as (a: [any, any]) => boolean;

  // statesProp::CxDynamicItem a->Object|undefined
  const statesProp = R.prop<string, any>('searchStates');

  // statesDefault::CxDynamicItem a->string|undefined
  const statesDefault = R.compose(R.prop<string, string>('searchDefault'), statesProp);

  // getTargetColumnDefault::CxTableDynamicColumn a->Maybe any
  const getTargetColumnDefault = R.ifElse(
    R.compose(truthy, statesDefault),
    R.compose(
      Maybe.of,
      R.converge(formatFormDefaultValue, [
        statesDefault,
        R.compose(R.prop<string, string>('searchType'), statesProp)
      ])
    ),
    Maybe.none
  ) as (a: CxTableDynamicColumn) => Maybe<any>;

  // getParamsItems::Object->string[]->ParamsItem[]
  const getParamsItems = (form: AnyObject, currentFormItems: string[]) => {
    if (!form || !currentFormItems) return [];
    return currentFormItems.reduce((res, prop) => {
      return Maybe.of(form[prop])
        .map(
          R.ifElse(
            R.compose(R.not, isEmptyValue),
            R.compose(
              unsafePush(R.__, res),
              R.of,
              R.mergeRight(R.objOf('prop', R.replace(/Text|Name$/, 'Id', prop))),
              formValueFormat
            ),
            R.always(res)
          )
        )
        .getWithDefault(res)!;
    }, [] as ParamsItem[]);
  };

  // innerBracket::string->string
  const innerBracket = R.compose(
    R.join(''),
    R.prepend('('),
    R.append(')'),
    R.of as (a: string) => string[]
  );

  const multiRuleWarn = R.curryN(
    2,
    unsafeWhenDevCall((rules: AnyObject[], dynamic: DYNAMIC_CONFIG) => {
      if (rules.length > 1) {
        cxTableWarn(
          `matched ${ R.length(rules) } rule `,
          rules,
          `  by config `,
          changeDynamicIdToText(dynamic),
          ``
        );
      }
    })
  );

  const getConfigByDynamicConfig = <T extends AnyObject>(dynamic: DYNAMIC_CONFIG, rules: T[]) => {
    return Maybe.run<T>(
      (function* (): any {
        const ruleList: T[] = yield Maybe.of(rules);
        const compareDynamicProp = R.compose(
          splatEq,
          R.adjust(0, R.prop<any, any>(R.__, dynamic)) as any
        );
        const fitCurrentDynamic = R.compose(R.all(compareDynamicProp), getDynamicKeyPair);
        return R.compose(
          R.head,
          R.tap(multiRuleWarn(R.__, dynamic)),
          R.filter(fitCurrentDynamic) as (a: T[]) => T[]
        )(ruleList);
      })()
    );
  };

  // arrNotEmpty::a[]->boolean
  const arrNotEmpty = R.compose(truthy, R.length) as (a: any[]) => boolean;

  return {
    arrNotEmpty,
    multiRuleWarn,
    getConfigByDynamicConfig,
    getDefaultFormItem,
    innerBracket,
    getAllSearchableColumn,
    getTargetColumnDefault,
    getDynamicKeyPair,
    getSearchableFormConfig,
    column2NameWithId,
    isEmptyValue,
    isPositive,
    splatEq,
    arrayIsNotEmpty,
    formValueFormat,
    getOptionListFromColumn,
    getCurrentFormConfig,
    isRenderInTeleport,
    getParamsItems
  };
};
