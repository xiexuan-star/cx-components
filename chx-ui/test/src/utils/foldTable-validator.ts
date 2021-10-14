import { ValidatorFun } from '@/components/global/FoldTable';
import { isSame } from './is';

/* 输入最大长度限制为9位 */
export function foldCheckMaxVal(len = 9): ValidatorFun {
  return ({ value }) => {
    if (value.length > len) {
      return `最大只能输入${len}位数`;
    }
  };
}

/* 只能输入正整数 */
export const foldIsInteger: ValidatorFun = ({ value }) => {
  const reg = /^[0-9]*[1-9][0-9]*$/;

  if (!reg.test(value) && value !== '') {
    return '请输入正整数';
  }
};

/* 只能输入非零的小数 */
export const foldNotZeroNumber: ValidatorFun = ({ value }) => {
  const reg = /^[0-9]+(\.[0-9]{1,3})?$/;

  if (!reg.test(value) && value) {
    return '请输入正确的数字格式';
  } else if (+value === 0) {
    return '重量不能为0';
  }
};

/* 只能输入范围和小数 */
export const foldRangNumber: ValidatorFun = ({ value }) => {
  // 范围
  const rangReg = /^\d{1,6}([.]\d{1,3})?[~-]\d{1,6}([.]\d{1,3})?/,
    // 小数：整数部位1-6位，小数部位1-3位
    decimalsReg = /^[1-9]\d{0,5}\.\d(\d{0,2})$|0.\d(\d{0,2})$/g,
    // 整数:1-6位
    intReg = /^[1-9][0-9]{0,5}$/;

  if (rangReg.test(value) || isSame(decimalsReg, value) || intReg.test(value) || value === '') {
    return;
  } else {
    return '请检查输入内容，数字小数部分不能超过三位';
  }
};

/* 只能输入中文以外的字符 */
export const foldNoChinese: ValidatorFun = ({ value }) => {
  const reg = /[u4e00-u9fa5]/g;

  if (value.length > 15) {
    return '规格最多只能输入15个字符';
  } else if (reg.test(value) || value === '') {
    return;
  } else {
    return '不能输入中文';
  }
};

/**
 * @param msg 代表抛出错误前缀
 * @description 校验必须大于0的情况
 */

export function foldOverZero(msg: string): ValidatorFun {
  return ({ value }) => {
    if (value.toString().trim() === '') {
      return `请填写${msg}`;
    } else if (+value === 0) {
      return msg + '必须大于0';
    }
  };
}
