export function isAbsolutePath(path: string) {
  return /^(https?|tel|mailto)/.test(path);
}

/* 输入最大长度限制为9位 */
export function checkMaxVal(rule: any, value: string, callback: ValidateCallback) {
  if (value.length > 9) {
    callback(new Error('最大只能输入9位数'));
  } else {
    callback();
  }
}

/* 只能输入正整数 */
export function isInteger(rule: any, value: string, callback: ValidateCallback) {
  const reg = /^[0-9]*[1-9][0-9]*$/;

  if (!reg.test(value) && value !== '') {
    callback(new Error('请输入正整数'));
  } else {
    callback();
  }
}

/* 只能输入非零的小数 */
export function notZeroNumber(rule: any, value: string, callback: ValidateCallback) {
  const reg = /^[0-9]+(\.[0-9]{1,3})?$/;

  if (!reg.test(value) && value) {
    callback(new Error('请输入正确的数字格式'));
  } else if (+value === 0) {
    callback(new Error('重量不能为0'));
  } else {
    callback();
  }
}

/* 只能输入范围和小数 */
export function rangNumber(rule: any, value: string, callback: ValidateCallback) {
  // 范围
  const rangReg = /^\d{1,6}([.]\d{1,3})?[~-]\d{1,6}([.]\d{1,3})?/,
    // 小数：整数部位1-6位，小数部位1-3位
    decimalsReg = /^[1-9]\d{0,5}\.\d(\d{0,2})$|0.\d(\d{0,2})$/g,
    // 整数:1-6位
    intReg = /^[1-9][0-9]{0,5}$/;

  function isSame(reg: RegExp, str: string) {
    if (str.indexOf('.') === -1) {
      return false;
    }
    const res = str.match(reg);

    if (Array.isArray(res) && res[0] === str) {
      return true;
    }
    return false;
  }

  if (rangReg.test(value) || isSame(decimalsReg, value) || intReg.test(value) || value === '') {
    callback();
  } else {
    callback(new Error('请检查输入内容，数字小数部分不能超过三位'));
  }
}

/* 只能输入中文以外的字符 */
export function noChinese(rule: AnyObject, value: string, callback: ValidateCallback) {
  const reg = /[u4e00-u9fa5]/g;

  if (value.length > 15) {
    callback(new Error('规格最多只能输入15个字符'));
  } else if (reg.test(value) || value === '') {
    callback();
  } else {
    callback(new Error('不能输入中文'));
  }
}

/**
 * @param msg 代表抛出错误前缀
 * @description 校验必须大于0的情况
 */

export function overZero(msg: string) {
  return (rule: AnyObject, value: string, callback: ValidateCallback) => {
    if (value.toString().trim() === '') {
      return callback(new Error(`请填写${msg}`));
    } else if (+value === 0) {
      return callback(new Error(msg + '必须大于0'));
    } else {
      callback();
    }
  };
}
