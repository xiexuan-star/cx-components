import { cxTableWarn } from '..';
import { CX_ADAPTOR_PRECISION_TYPE } from '../../constant';
import { useCxTable } from '../../hooks';
import { CalculateFun, CxTableItem } from '../../types';
import { isString, isNumber } from 'chx-utils';

import { CX_ADAPTOR_INT_PRECISION, CX_ADAPTOR_LOSS_PRECISION } from './const';

/**
 * 保留几位小数
 * @param {String | Number} num
 * @param {Number} fixed
 * @return {Number | "-"}
 */
export function decimals(num: string | number, fixed = 3) {
  num = parseFloat(num + '');
  if (!isNaN(num)) {
    num = Math.round(num * Math.pow(10, 6)) / Math.pow(10, 6 - fixed);
    return Math.round(num) / Math.pow(10, fixed);
  }
  return 0;
}

/**
 * 数字补位
 * @param precision 精度
 * @param force 是否强制修正
 */
export function decimalFixed<T extends unknown>(
  value: T,
  precision: number | undefined,
  force = false
): T | string {
  if (value === '' || isNaN(+value) || precision === undefined) {
    return value;
  }

  if (precision < 0 || precision !== parseInt(precision + '', 10)) {
    cxTableWarn(`精度错误 => ${precision}`);
    return value;
  }

  const num = +(+value).toPrecision(12);
  if (force) {
    return (+decimals(+num, precision)).toFixed(precision);
  }

  const len = num.toString().split('.')[1]?.length || 0;
  return (+decimals(+num, Math.max(precision, len))).toFixed(Math.max(precision, len));
}

export const getPrecision = (state?: number) => {
  const { goldAccuracy, stoneAccuracy, priceAccuracy } = useCxTable().getContext().precision;
  switch (state) {
    case CX_ADAPTOR_PRECISION_TYPE.GOLD:
      return goldAccuracy;
    case CX_ADAPTOR_PRECISION_TYPE.STONE:
      return stoneAccuracy;
    case CX_ADAPTOR_PRECISION_TYPE.PRICE:
      return priceAccuracy;
    case CX_ADAPTOR_PRECISION_TYPE.INT:
      return CX_ADAPTOR_INT_PRECISION;
    case CX_ADAPTOR_PRECISION_TYPE.LOSS:
      return CX_ADAPTOR_LOSS_PRECISION;
    default:
      return;
  }
};

export const calcInvoker = (calc: string | AnyObject, column: CxTableItem): CalculateFun => {
  return rowData => {
    let result = calcInnerFormula(calc, rowData);
    result = decimalFixed(result, column.accuracy, true);
    Reflect.set(rowData, column.prop, result);
    return result;
  };
};

export const getTemplateResult = (str: string, data: AnyObject) => {
  return (
    str?.replace(/\{\{.+\}\}/g, p => {
      return data[p.replace(/\{\{(.+)\}\}/, '$1')];
    }) ?? str
  );
};

Reflect.set(window, 'getTemplateResult', getTemplateResult);

const getInFactVal = (val: any) => {
  if (isString(val)) return val.match(/[^\d^.]+/) ? `'${val}'` : val;
  if (!isNumber(val)) return 'null';
  return val + '';
};
// 获取字符公式结果
export const getEvalResult = (formula: string, data: AnyObject, withCalc = false): any => {
  const getToken = () =>
    formula.replace(/[a-zA-Z]+/g, (prop: string) => {
      if (prop === 'undefined') return prop;
      return withCalc ? (+data[prop] || 0) + '' : getInFactVal(data[prop]);
    });
  try {
    const token = getToken();
    let res = eval(token);
    if (isNaN(res)) {
      withCalc = true;
      res = eval(token);
    }
    return res;
  } catch (err) {
    if (!withCalc) {
      withCalc = true;
      try {
        return eval(getToken());
      } catch (innerErr) {
        cxTableWarn(`匹配公式时发生错误==>${formula}`);
      }
    }
    cxTableWarn(`匹配公式时发生错误==>${formula}`);
    return null;
  }
};

// 获取options依赖的props
export const getOptionsDeps = (options: AnyObject) => {
  if (Array.isArray(options)) {
    return [];
  }
  const result: string[] = [];

  function search(obj: AnyObject) {
    Object.entries(obj).forEach(([key, val]) => {
      result.push(key);
      if (typeof val === 'object') {
        search(val);
      }
    });
  }
  if (typeof options === 'object') {
    search(options);
  }

  return result;
};

// 获取计算后的options
export const calcInnerOptions = (options: AnyObject, data: AnyObject) => {
  return calcInnerItem(options, data, Array.isArray, [], (result: any) => result);
};

// 获取计算后的校验规则
export const calcInnerValidator = (validator: AnyObject, data: AnyObject) => {
  return calcInnerItem(validator, data, Array.isArray, {}, (result: any) => result);
};

// 获取计算后的公式值
export const calcInnerFormula = (formula: string | AnyObject, data: AnyObject) => {
  return calcInnerItem(formula, data, isString, 0, getEvalResult);
};

// 获取嵌套对象中的值
export const calcInnerItem = (
  formula: string | AnyObject,
  data: AnyObject,
  finder: Func<any>,
  defaultValue: any,
  getResult: Func<any>
) => {
  if (finder(formula)) {
    return getResult(formula, data);
  } else if (typeof formula === 'object') {
    let result = defaultValue;
    Object.entries(formula).some(([key, val]) => {
      if (typeof val === 'object') {
        Object.entries(val).some(([innerKey, innerVal]) => {
          if (+data[key] === +innerKey) {
            if (finder(innerVal)) {
              result = getResult(innerVal, data);
            } else if (typeof innerVal === 'object') {
              result = calcInnerItem(innerVal!, data, finder, defaultValue, getResult);
            }
            return true;
          }
        });
      }
    });
    return result;
  }
  return defaultValue;
};

export const getStringDepends = (formula: string) => {
  if (!isString(formula)) return [];
  return formula.match(/[a-zA-Z]+/g) as string[];
};
