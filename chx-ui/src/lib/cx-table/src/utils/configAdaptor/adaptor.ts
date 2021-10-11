import {
  calcInnerValidator,
  calcInvoker,
  decimalFixed,
  getEvalResult,
  getTemplateResult
} from './adaptorUtils';
import { CxTableAdaptorPlugin, CxTableDynamicColumn, CxTableItem } from '../../types';
import { staticConfigList } from './const';
import { CxControlConfig } from './controlConfig';
import { isFunction, isNumber } from '../is';
import * as R from 'ramda';

const onInits: Array<CxTableAdaptorPlugin['onInit']> = [];
const onOutputs: Array<CxTableAdaptorPlugin['onOutput']> = [];
export class CxConfigAdaptor {
  static use(plugin: CxTableAdaptorPlugin) {
    const { onInit, onOutput } = plugin;
    isFunction(onInit) && onInits.push(onInit);
    isFunction(onOutput) && onOutputs.push(onOutput);
  }
  basicColumn: CxTableItem = { prop: '', label: '' };
  get column() {
    if (onOutputs.length === 0) return this.basicColumn;
    const columnDuplicate = onOutputs.reduce(
      (res, hook) => (isFunction(hook) ? hook(res) : res),
      R.clone(this.basicColumn)
    );
    return columnDuplicate;
  }
  static of(config: CxTableDynamicColumn) {
    return new CxConfigAdaptor(config).column;
  }
  constructor(config: CxTableDynamicColumn) {
    const configDuplicate = onInits.reduce(
      (res, hook) => (isFunction(hook) ? hook(res) : res),
      R.clone(config)
    );
    this.staticConfigAdaptor(configDuplicate)
      .dynamicConfigAdaptor(configDuplicate)
      .controlAdaptor(configDuplicate)
      .childrenAdaptor(configDuplicate);
  }
  // children处理
  private childrenAdaptor(config: CxTableDynamicColumn) {
    if (config.children?.length) {
      this.basicColumn.children = config.children.map(child => new CxConfigAdaptor(child).column);
    }
    return this;
  }
  // 静态部分
  private staticConfigAdaptor(config: CxTableDynamicColumn) {
    staticConfigList.forEach(key => Reflect.set(this.basicColumn, key, config[key]));
    return this;
  }
  // 动态部分
  private dynamicConfigAdaptor(config: CxTableDynamicColumn) {
    if (config.calculate) {
      this.basicColumn.calculate = rowData => {
        const result = calcInvoker(config.calculate!, this.basicColumn)(rowData);
        return isNumber(config.accuracy) ? decimalFixed(result, config.accuracy, true) : result;
      };
    }
    if (config.sum) {
      const sumMap: AnyObject = { 1: 'add' };
      Reflect.set(this.basicColumn, 'sum', sumMap[config.sum] ?? config.sum);
    }
    if (Array.isArray(config.validator)) {
      this.basicColumn.validator = params => {
        let result;
        config.validator?.some(validator => {
          const validates =
            validator.rule && validator.msg
              ? [validator]
              : calcInnerValidator(validator, params.rowData);
          if (!validates?.length) return;
          validates.some((valid: AnyObject) => {
            if (!getEvalResult(valid.rule, params.rowData)) {
              return (result = getTemplateResult(valid?.msg ?? '', params.rowData));
            }
          });
        });
        return result;
      };
    }
    return this;
  }
  // 控件部分
  private controlAdaptor(config: CxTableDynamicColumn) {
    config.control && Reflect.set(this.basicColumn, 'control', new CxControlConfig(config));
    return this;
  }
}
