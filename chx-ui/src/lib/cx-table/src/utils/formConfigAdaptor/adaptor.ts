import {
  CxTableFormAdaptorPlugin,
  CxTableDynamicColumn,
  CxTableFormRegist,
  TeleFormItem
} from '../../types';
import { calcInnerOptions, getOptionsDeps } from '../configAdaptor/adaptorUtils';
import { isObject } from '../is';
import * as R from 'ramda';
import { map, Maybe, unsafeDeleteProperty, unsafeSet } from '@/utils/functor';
import { AnyObject } from '@/types';
import { CxFormItemConfig } from 'src';

const onInits: Array<CxTableFormAdaptorPlugin['onInit']> = [];
const onOutputs: Array<CxTableFormAdaptorPlugin['onOutput']> = [];

export class FormConfigAdaptor {
  static use(plugin: CxTableFormAdaptorPlugin) {
    // push::a->a[]->number
    const push = R.curry(<T>(arr: T[], item: T) => arr.push(item));

    // updateHooks::object a=>a[]->string->object->Maybe b
    const updateHooks = <T>(source: T[], key: keyof CxTableFormAdaptorPlugin) => {
      // map::Maybe->a
      const MaybeMap = map(R.ifElse(R.is(Function), push(source), R.identity));
      return R.compose(MaybeMap, Maybe.of, R.prop<keyof CxTableFormAdaptorPlugin, any>(key));
    };

    updateHooks(onInits, 'onInit')(plugin as Required<CxTableFormAdaptorPlugin>);
    updateHooks(onOutputs, 'onOutput')(plugin as Required<CxTableFormAdaptorPlugin>);
  }
  private __items: TeleFormItem = {
    label: '',
    prop: '',
    closable: true,
    register: []
  };
  get items() {
    return onOutputs.reduce(
      (res, hook) => (R.is(Function, hook) ? hook!(res) : res),
      R.clone(this.__items)
    );
  }
  static of(config: CxTableDynamicColumn) {
    return new FormConfigAdaptor(config).items;
  }
  private constructor(config: CxTableDynamicColumn) {
    const configDuplicate = onInits.reduce(
      (res, hook) => (R.is(Function, hook) ? hook!(res) : res),
      R.clone(config)
    );
    this.adaptor(configDuplicate);
  }
  private adaptor(config: CxTableDynamicColumn) {
    // 静态部分
    (['label', 'prop'] as Extract<
      keyof CxTableDynamicColumn,
      keyof CxFormItemConfig & { register: CxTableFormRegist[] }
    >[]).forEach(key => unsafeSet(this.__items, key, config[key]));

    // 动态部分
    const searchStates = R.prop('searchStates', config)!;
    // options
    Maybe.of(searchStates.dynamicSearchOptions).map(unsafeSet(searchStates, 'searchOptions'));

    const controlConfig: AnyObject = {};
    Reflect.set(this.__items, searchStates.searchType ?? 'input', controlConfig);
    R.equals('input', searchStates.searchType) && unsafeSet(controlConfig, 'searchIcon', false);

    // options::NameWithId a=>object->a[]
    const options = R.curryN(
      2,
      R.compose(R.prepend({ name: '全部', id: -1 }), calcInnerOptions)
    )(searchStates.searchOptions ?? []);

    if (Array.isArray(searchStates.searchOptions)) {
      Reflect.set(controlConfig, 'options', options(searchStates.searchOptions));
    } else if (isObject(searchStates.searchOptions)) {
      Reflect.set(controlConfig, 'options', R.compose(options, R.prop<'form', AnyObject>('form')));
    }
    // options依赖项发生改变时清空该列数据 TODO
    const deps = getOptionsDeps(searchStates.searchOptions ?? []);
    const cb = unsafeDeleteProperty(R.__, this.__items.prop);
    this.__items.register = deps.map(R.compose(unsafeSet(R.__, 'cb', cb), R.objOf('dep')));
  }
}
