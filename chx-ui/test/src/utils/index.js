export * from './utils';
import dayjs from 'dayjs';
import { isEmpty } from './is';

/**
 *
 * @param {*} param0
 * @returns
 */
export const removeIndexFromArr = (arr, indexArr) => {
  indexArr = indexArr.sort((a, b) => b - a);
  const result = [];

  for (let i = indexArr.length; i >= 0; i--) {
    if (indexArr[i] < 0) continue;
    arr.splice(indexArr[i], 1);
  }
  return result;
};

/**
 *{
 *    min: number,  最小值
 *    max: number,  最大值
 *    maxLen: number, 最大长度
 *    decimal: number 保留最大小数点位数
 * }
 * @param {Object}
 */
export function amount({ val, min, max, maxLen, decimal }) {
  val = (val + '').trim();
  if (val === '') return '';
  if (min >= 0) val = val.replace(/-/g, '');
  const regStrs = [
    [/[^\-\d.]/g, ''], // 去掉除负号小数点数字以外的字符
    [/\.{2,}/g, '.'], // 去掉两个以上小数点
    [/-{2,}/g, '-'], // 去掉两个以上负号
    [/(?!(\B-))-/g, ''], // 去掉两个以上负号
    [/^\./g, '0.'], // 直接输入小数点默认为0.
    [/(\d+\.\d+)\./, '$1'] // 屏蔽如1.1.1类似的情况
  ];
  regStrs.forEach(reg => (val = val.replace(reg[0], reg[1])));

  const arr = val.split('.');
  decimal = parseInt(decimal) || 0;
  if (arr.length > 1 && arr[1] && decimal && arr[1].length > decimal) {
    arr[1] = arr[1].slice(0, decimal);
  }

  let sign = '';
  maxLen = parseInt(maxLen) || 0;
  if (/^-/.test(arr[0])) {
    arr[0] = arr[0].replace(/-/g, '');
    sign = '-';
    maxLen++;
  }
  if (maxLen && arr[0].length > maxLen) arr[0] = arr[0].slice(0, maxLen);
  if (arr[0]) arr[0] = Number(arr[0].toString());
  if (sign) arr[0] = sign + arr[0];
  val = arr.join('.');
  if (!decimal && val !== '-') val = Number(val);

  max = parseFloat(max);
  min = parseFloat(min);
  if (!isNaN(min) && parseFloat(val) < min) val = min;
  if (!isNaN(max) && parseFloat(val) > max) val = max;

  return val;
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat, defaultValue = '--') {
  if (arguments.length === 0) {
    return null;
  }
  if (!time) {
    return defaultValue;
  }
  const format = cFormat || 'YYYY-MM-DD HH:mm';

  let date;

  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (time.includes('1970-01-01')) return defaultValue;
      if (/^[0-9]+$/.test(time)) time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  return dayjs(time).format(format);
}

export function parseDate(time) {
  return parseTime(time, 'YYYY-MM-DD')
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (String(time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = Number(time);
  }
  const d = new Date(time),
    now = Date.now(),
    diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  }
  return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1),
    obj = {},
    reg = /([^?&=]+)=([^?&=]*)/g;

  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);

    let val = decodeURIComponent($2);

    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;

  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);

    if (code > 0x7f && code <= 0x7ff) {
      s++;
    } else if (code > 0x7ff && code <= 0xffff) {
      s += 2;
    }
    if (code >= 0xdc00 && code <= 0xdfff) {
      i--;
    }
  }
  return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];

  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) {
    return '';
  }
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) {
        return '';
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
  ).join('&');
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1];

  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/[=]/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  );
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div');

  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];

    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);

  if (nameIndex === -1) {
    classString += String(className);
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  }
  return new Date(new Date().toDateString());
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = Number(new Date()) - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = Number(new Date());
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时

    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Any} target
 * @param {WeakMap} hash
 * @returns {Object}
 */
export const deepClone = (target, hash = new WeakMap()) => {
  // 对于传入参数处理
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  // 哈希表中存在直接返回
  if (hash.has(target)) return hash.get(target);

  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);

  // 针对Symbol属性
  const symKeys = Object.getOwnPropertySymbols(target);
  if (symKeys.length) {
    symKeys.forEach(symKey => {
      if (typeof target[symKey] === 'object' && target[symKey] !== null) {
        cloneTarget[symKey] = deepClone(target[symKey]);
      } else {
        cloneTarget[symKey] = target[symKey];
      }
    });
  }

  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      cloneTarget[i] =
        typeof target[i] === 'object' && target[i] !== null
          ? deepClone(target[i], hash)
          : target[i];
    }
  }
  return cloneTarget;
};

/**
 * 利用JSON序列化复制对象
 * @param {Object | Array} obj
 */

export function copyObj(obj, arr) {
  return JSON.parse(JSON.stringify(obj, arr));
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = String(Number(new Date())),
    randomNum = String(parseInt((1 + Math.random()) * 65536));

  return Number(randomNum + timestamp).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return Boolean(ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');

    ele.className = ele.className.replace(reg, ' ');
  }
}

/**
 * Remove class from element
 * @param {Number} num
 * @param {Number} min
 * @param {Number} max
 * @param {Boolean} bool
 */
export function compareNum(num, min, max, bool = true) {
  if (bool) {
    if (num >= min && num <= max) {
      return true;
    }
    return false;
  }
  if (num > min && num < max) {
    return true;
  }
  return false;
}

/**
 * 保留几位小数
 * @param {String | Number} num
 * @param {Number} fixed
 * @return {Number | "-"}
 */
export function decimals(num, fixed = 3) {
  num = parseFloat(num);
  if (!isNaN(num)) {
    num = Math.round(num * Math.pow(10, 6)) / Math.pow(10, 6 - fixed);
    return Math.round(num) / Math.pow(10, fixed);
  }
  return 0;
}

export function parseJSON(text) {
  try {
    return JSON.parse(text.replace(/(\d+):/g, '"$1":'));
  } catch (err) {
    return '';
  }
}

export function getType(v) {
  return v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
}

//格式化条码
export function formatBarcode(str) {
  let code = String(str);
  if (code.length >= 12) {
    code = Number(code.substr(0, code.length - 1));
    if (!isNaN(code)) {
      return code.toString();
    }
  }
  return str;
}

/**
 * 给指定对象赋值
 * @param {Object} target
 * @param {Object} obj
 * @return {Object}
 */
export function assignToObj(target, obj, { arr = [], keyObj = [] } = {}) {
  if (getType(target) !== 'object' && obj) {
    return obj;
  }
  const keys = Object.keys(target);

  if (!keys.length) {
    return {};
  }
  keys.forEach(key => {
    if (isEmpty(obj[key])) {
      if (arr.includes(key)) target[key] = [];
      if (keyObj.includes(key)) target[key] = {};
    } else {
      if (obj[key] == undefined) return;
      target[key] = obj[key];
    }
  });
  return target;
}

/**
 * 金钱格式化，三位加逗号
 * @param {string | number} num
 */
export function numSeparator(num, fixed = 2) {
  let newNum = parseFloat(num) || 0;
  newNum = toFix(newNum, fixed);
  return newNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 过滤小数点补位
 * @param {string | number} value
 * @param {number} fixed
 */
export function toFix(value, fixed = 0) {
  const v = parseFloat(value);
  if (isNaN(v)) return value;
  const point = v.toString().split('.')[1]?.length ?? 0;
  const maxFix = Math.max(point, fixed);
  return v.toFixed(maxFix);
}

/**
 * 提取对象中arr键值，对象
 * @param {*} form
 * @param {*} arr
 * @param {*} flag
 */
export function drawForm(form, arr, flag) {
  if (isEmpty(form)) {
    return {};
  }
  return Object.entries(form).reduce(
    (acc, [key, value]) => (
      (flag ? !arr.includes(key) : arr.includes(key)) && (acc[key] = value), acc
    ),
    {}
  );
}

/**
 *
 * @param {*} arr
 * @param {*} searchId
 * @param {*} param2
 */
export function idToText(arr, searchId, { key = 'id', value = 'name' } = {}) {
  if (!arr || !arr.length) {
    return '';
  }
  const index = arr.findIndex(item => item[key] === searchId);

  if (index < 0) {
    return '';
  }
  return arr[index][value];
}

/**
 *
 * @param {Object} row
 */

export function formatRow(row) {
  const copyRow = JSON.parse(JSON.stringify(row));

  if (!copyRow.status) {
    [
      'acceptAllStoneSuttle',
      'acceptAllPartSuttle',
      'acceptSuttle',
      'diffSuttle',
      'recoverySuttle'
    ].forEach(key => (copyRow[key] = '/'));
  }
  return copyRow;
}

// 判断是否是移动端
export function isPc() {
  let userAgentInfo = navigator.userAgent,
    // var Agents = ["Android", "iPhone",
    //    "SymbianOS", "Windows Phone",
    //    "iPad", "iPod"];
    Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone'],
    flag = true;

  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

export function none(...args) {
  //
}

export async function async(promise) {
  try {
    const res = await promise;
    return [null, res];
  } catch (e) {
    return [e, {}];
  }
}

export function asyncLockFun(fn) {
  let lock = false;
  return async function(...args) {
    if (lock) return;

    lock = true;

    try {
      await fn.apply(this, args).finally(() => {
        lock = false;
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function asyncLockMethods(methods, funName) {
  const lockFun = {};

  if (Array.isArray(funName)) {
    funName.forEach(item => {
      lockFun.item = asyncLockFun(methods[item]);
    });
  } else if (typeof funName === 'string') {
    lockFun.funName = asyncLockFun(methods[funName]);
  }

  const result = {
    ...methods,
    ...lockFun
  };

  return result;
}

export const flatProp = (arr) => {
  return arr.map(item => item.prop).join()
}

