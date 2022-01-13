import { defineComponent, computed, withDirectives, createVNode, createCommentVNode, reactive, ref, onMounted, onBeforeUnmount, watch, onUpdated, nextTick, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, renderSlot, resolveComponent, onUnmounted, inject, watchEffect, resolveDirective, setBlockTracking, withCtx, getCurrentInstance, render as render$8, Teleport, Transition, mergeProps, withModifiers, vShow, unref, pushScopeId, popScopeId, withScopeId, provide } from 'vue';
import { isObject as isObject$1, isFunction, omit, isNumber, isString, EventBus, isArray, isEmpty, unsafeSet, Maybe, unsafeDeleteProperty, map, unsafeGet, truthy, splat, unsafePush, unsafeWhenDevCall, sessionStore, getDateRange, isDeepObjectEqual, useComputed, useState, IO, localStore, unsafeClearPush, unsafeClearAssign, getMaybeValue, Left, Right, either, withParams, defaultPromise, useSync, nextTimeout, unsafeAssign, queryDom, unsafeClearArray, unsafeRemoveItem, getDoNothingIO, unsafeClearObj, addResizeListener, removeResizeListener, enum2Options, stateEq200, falsy, stopPropagation, preventDefault, clearTimer, unsafePerformIO, curryTimeout, setClassByArr, createTag, copyInnerText, curryAddListener, setInnerText, clearInnerHTML, appendToBody, appendChild, showEle, hideEle, curryRemoveListener, clearClassList, loadingDecorator, isHTMLInputElement, amount } from 'chx-utils';
import * as R from 'ramda';
import { clone, omit as omit$1 } from 'ramda';
import dayjs from 'dayjs';
import PinyinMatch from 'pinyin-match';
import Draggable from 'vuedraggable';

var script$e = defineComponent({
    name: 'CxBtn',
    props: {
        size: {
            type: String,
            "default": 'medium',
        },
        level: { type: [String, Number], "default": '2' },
        type: {
            type: String,
            "default": 'primary',
        },
        content: { type: String, "default": '' },
        icon: { type: String, "default": '' },
        loading: { type: Boolean, "default": false },
        disabled: { type: Boolean, "default": false },
        tipOption: { type: Object }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        var renderLoadingEle = function () {
            return createVNode('i', { "class": 'el-icon-loading cx_mr_5' });
        };
        var renderIconEle = function (className) {
            return createVNode('i', { "class": "iconfont icon-" + className }, null, 2 /* CLASS */);
        };
        var renderDisabled = function () {
            return createVNode('i', { onClick: function (e) { return e.stopPropagation(); }, "class": 'cx_mask' });
        };
        var classList = computed(function () {
            var result = ['cx-btn_wrapper'];
            if (props.disabled)
                result.push('cx-btn_disabled');
            result.push("cx-btn_" + props.size);
            result.push("cx-btn_level_" + props.level);
            result.push("cx-btn_" + props.type);
            if (props.loading)
                result.push("cx-btn_loading");
            return result;
        });
        return function (_, cache) {
            return withDirectives(createVNode('button', {
                type: 'button',
                "class": classList.value,
                onClick: cache[0]
                    ? cache[0]
                    : (cache[0] = function (e) {
                        e.preventDefault();
                        if (props.disabled)
                            return false;
                    }),
            }, [
                props.loading ? (cache[1] ? cache[1] : (cache[1] = renderLoadingEle())) : createCommentVNode('v-if', true),
                props.icon ? renderIconEle(props.icon) : createCommentVNode('v-if', true),
                (slots["default"] ? slots["default"]({}) : props.content)
                    ? createVNode('span', { "class": { cx_ml_5: !!props.icon } }, [
                        slots["default"] ? slots["default"]({}) : props.content,
                    ])
                    : createCommentVNode('v-if_content', true),
                props.disabled ? (cache[2] ? cache[2] : (cache[2] = renderDisabled())) : createCommentVNode('v-if', true),
            ], 2 /* CLASS */ | 512 /* NEED_PATCH */), [[props.tipOption ? _CX_UNI_POPPER : {}, Object.assign({
                        placement: 'top',
                    }, props.tipOption)]]);
        };
    },
});
script$e.install = function (app) {
    app.component(script$e.name, script$e);
};
var _CX_BTN = script$e;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce$1(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

//
var script$d = defineComponent({
    name: 'CxTab',
    props: {
        /**
         * tab等级,分1,2,3级,默认1级
         */
        level: { type: [String, Number], "default": '1' },
        modelValue: { type: [Number, String], "default": 0 },
        /**
         * tab项列表,支持只传入数字项与字符创项,它们会自动转化为name+id形式
         */
        options: {
            type: Array,
            "default": function () { return []; }
        },
        disabled: { type: Boolean, "default": false },
        /**
         * badge数据源,对应tab项中的badgeKey
         */
        badgeObj: { type: Object, "default": function () { return ({}); } }
    },
    emits: ['change', 'update:modelValue'],
    setup: function (props, _a) {
        var _this = this;
        var emit = _a.emit, expose = _a.expose;
        var clickHandle = function (id) {
            if (id === props.modelValue)
                return;
            if (props.disabled)
                return;
            emit('update:modelValue', id);
            emit('change', id);
        };
        var tabs = computed(function () {
            return props.options
                .filter(function (item) {
                return isObject$1(item) ? !item.hide : item;
            })
                .map(function (item) {
                return isObject$1(item) ? item : { id: item, name: item };
            });
        });
        var cursorStyle = reactive({ left: 0, width: 0 });
        var updateCursor = function () { return __awaiter(_this, void 0, void 0, function () {
            var id, currentTab, left, width;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nextTick()];
                    case 1:
                        _a.sent();
                        if (!wrapRef.value)
                            return [2 /*return*/];
                        id = props.modelValue;
                        currentTab = wrapRef.value.querySelector(".cx-tab_item[id=\"" + id + "\"]");
                        if (!currentTab)
                            return [2 /*return*/];
                        left = currentTab.offsetLeft + 'px';
                        width = currentTab.offsetWidth + 'px';
                        Object.assign(cursorStyle, { left: left, width: width });
                        return [2 /*return*/];
                }
            });
        }); };
        var wrapRef = ref(null);
        var slotRef = ref(null);
        var getBadgeValue = function (item) {
            var badgeValue = props.badgeObj[item.badgeKey || ''] || 0;
            return badgeValue >= 100 ? '99+' : badgeValue;
        };
        var showArrow = ref(false);
        var slotWidth = ref(0);
        var updateWrapWidth = function () { return __awaiter(_this, void 0, void 0, function () {
            var tabs, wrapWidth, tabsWidth;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, nextTick()];
                    case 1:
                        _b.sent();
                        if (!wrapRef.value)
                            return [2 /*return*/];
                        tabs = wrapRef.value.querySelector('.cx-tabs');
                        if (!tabs)
                            return [2 /*return*/];
                        if (!slotRef.value) return [3 /*break*/, 3];
                        slotWidth.value = (_a = slotRef.value.clientWidth) !== null && _a !== void 0 ? _a : 0;
                        return [4 /*yield*/, nextTick()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        wrapWidth = wrapRef.value.clientWidth;
                        tabsWidth = tabs.clientWidth;
                        showArrow.value = tabsWidth > wrapWidth;
                        return [2 /*return*/];
                }
            });
        }); };
        var forceUpdate = debounce$1(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, updateWrapWidth()];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            updateCursor();
                        }, 200);
                        return [2 /*return*/];
                }
            });
        }); }, 100);
        onMounted(function () {
            window.addEventListener('resize', forceUpdate);
        });
        onBeforeUnmount(function () {
            window.removeEventListener('resize', forceUpdate);
        });
        var arrowClick = function (type) {
            if (!wrapRef.value)
                return;
            var base = 300;
            var offset = base / 10;
            var timer = setInterval(function () {
                if (!wrapRef.value)
                    return;
                var targetPosition = wrapRef.value.scrollLeft + (type === 'left' ? -offset : offset);
                wrapRef.value.scrollTo(targetPosition, 0);
                var stop = type === 'left'
                    ? targetPosition <= 0
                    : targetPosition >= wrapRef.value.scrollWidth - wrapRef.value.clientWidth;
                if (base === 0 || stop) {
                    clearInterval(timer);
                }
                else if (base <= 3) {
                    base = 0;
                }
                else {
                    base -= base / 10;
                    offset = base / 10;
                }
            }, 10);
        };
        watch(tabs, forceUpdate, { deep: true, immediate: true });
        onUpdated(updateCursor);
        expose({
            forceUpdate: forceUpdate
        });
        return {
            clickHandle: clickHandle,
            wrapRef: wrapRef,
            tabs: tabs,
            getBadgeValue: getBadgeValue,
            showArrow: showArrow,
            arrowClick: arrowClick,
            cursorStyle: cursorStyle,
            slotRef: slotRef,
            slotWidth: slotWidth
        };
    }
});

const _hoisted_1$5 = { class: "cx-tabs" };

function render$7(_ctx, _cache) {
  return (openBlock(), createBlock("div", {
    class: ['cx-tab', `level-${_ctx.level}_bottom_line`]
  }, [
    createVNode("div", {
      class: {
        'cx-tab_scroll_wrapper': true,
        cx_flex_center: true,
        cx_justify_between: true,
        [`level-${_ctx.level}_wrapper`]: true,
        'cx-tab_disabled': _ctx.disabled,
        cx_pos_relative: true
      },
      style: {
        maxWidth: `calc(100% - ${_ctx.slotWidth}px)`
      }
    }, [
      createVNode("div", {
        class: {
          'cx-tab_wrapper': true,
          cx_plr_20: _ctx.showArrow,
          cx_border_box: true,
          cx_pos_relative: true
        },
        ref: "wrapRef"
      }, [
        createVNode("div", _hoisted_1$5, [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tabs, (item) => {
            return (openBlock(), createBlock("div", {
              key: item.id,
              onClick: $event => (_ctx.clickHandle(item.id)),
              id: item.id,
              class: {
              clickable: true,
              cx_flex_center: true,
              'cx-tab_item': true,
              'cx-tab_item_active': _ctx.modelValue === item.id,
              cx_pos_relative: true
            }
            }, [
              createTextVNode(toDisplayString(item.name) + " ", 1 /* TEXT */),
              (item.badgeKey)
                ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: `cx-tab_badge_${_ctx.level}`
                  }, toDisplayString(`${_ctx.getBadgeValue(item)}${item.unit || ''}`), 3 /* TEXT, CLASS */))
                : createCommentVNode("v-if", true)
            ], 10 /* CLASS, PROPS */, ["onClick", "id"]))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        (_ctx.level < 3)
          ? (openBlock(), createBlock("i", {
              key: 0,
              class: "cx-tab_cursor",
              style: _ctx.cursorStyle
            }, null, 4 /* STYLE */))
          : createCommentVNode("v-if", true)
      ], 2 /* CLASS */),
      (_ctx.showArrow)
        ? (openBlock(), createBlock(Fragment, { key: 0 }, [
            createVNode("i", {
              class: "cx-tab_left_arrow cx_flex_center iconfont icon-xiangzuo",
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.arrowClick('left')))
            }),
            createVNode("i", {
              class: "cx-tab_right_arrow cx_flex_center iconfont icon-xiangyou",
              onClick: _cache[2] || (_cache[2] = $event => (_ctx.arrowClick('right')))
            })
          ], 64 /* STABLE_FRAGMENT */))
        : createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */),
    createVNode("div", null, [
      (_ctx.$slots.operation)
        ? (openBlock(), createBlock("div", {
            key: 0,
            ref: "slotRef",
            class: "cx_flex_center cx_pos_relative cx_iflex cx_fr",
            style: {
          'margin-top': _ctx.level === 4 ? '-33px' : '-42px',
          'z-index': '200',
          height: _ctx.level === 4 ? '33px' : '42px'
        }
          }, [
            renderSlot(_ctx.$slots, "operation")
          ], 4 /* STYLE */))
        : createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}

script$d.render = render$7;
script$d.__file = "src/lib/cx-tab/cx-tab.vue";

script$d.install = function (app) {
    app.component(script$d.name, script$d);
};
var _CX_TAB = script$d;

var renderComp = function (attrs, slots, Comp) {
    return (openBlock(),
        createBlock(Fragment, null, [
            Comp
                ? isFunction(Comp)
                    ? (function () {
                        var prop = attrs.__prop;
                        return Comp(Object.assign(omit(attrs, ['__closable', '__emit', '__prop']), { prop: prop }));
                    })()
                    : createVNode(Comp, omit(attrs, ['__closable', '__emit', '__prop']), slots, 16 /* FULL_PROPS */)
                : createCommentVNode('v-if_component', true),
        ]));
};
var CxFormRender = /** @class */ (function () {
    function CxFormRender() {
        this.renderComp = renderComp;
    }
    CxFormRender.prototype.renderControl = function (attrs, slots, Comp) {
        return createVNode('div', { style: { position: 'relative' } }, [
            renderComp(attrs, slots, Comp),
            attrs.__closable
                ? createVNode('i', {
                    style: { position: 'absolute', right: '-3px', top: '-3px' },
                    "class": 'iconfont icon-shanchu',
                    onClick: function () {
                        isFunction(attrs.__emit) && attrs.__emit('close', attrs.__prop);
                    },
                })
                : createCommentVNode('v-if_closable', true),
        ]);
    };
    return CxFormRender;
}());
var cxFormRender = (function () {
    var _instance = null;
    return function () {
        if (!_instance) {
            _instance = new CxFormRender();
        }
        return _instance;
    };
})();

var CxFormTemplate = /** @class */ (function () {
    function CxFormTemplate() {
        this.name = '';
        this.slots = {};
        this.attrs = {};
    }
    CxFormTemplate.prototype.init = function () {
        this.propAdaptor();
        return this;
    };
    CxFormTemplate.prototype.propAdaptor = function () {
        throw new Error('请重写propAdaptor方法');
    };
    CxFormTemplate.prototype.addSlots = function (slots) {
        if (typeof slots === 'function') {
            Reflect.set(this.slots, 'default', slots);
        }
        else if (typeof slots === 'object') {
            Object.assign(this.slots, slots);
        }
        return this;
    };
    CxFormTemplate.prototype.renderVNode = function (Comp) {
        return cxFormRender().renderComp(this.attrs, this.slots, Comp);
    };
    CxFormTemplate.prototype.renderControl = function (Comp) {
        return cxFormRender().renderControl(this.attrs, this.slots, Comp);
    };
    CxFormTemplate.prototype.render = function () {
        throw new Error('请重写render方法');
    };
    return CxFormTemplate;
}());

var CxFormError = /** @class */ (function (_super) {
    __extends(CxFormError, _super);
    function CxFormError(msg) {
        return _super.call(this, "CxFormError: " + msg) || this;
    }
    return CxFormError;
}(Error));

var CxFormRenderMap = new Map();
var useCxForm = function () {
    var _instance;
    var _config;
    var register = function (payload) {
        var config = payload.props, ref = payload.ref;
        _instance = ref;
        _config = config;
    };
    var getFormRef = function () {
        return _instance;
    };
    var setFormConfig = function (prop, attr, val) {
        if (!_config)
            throw new CxFormError('can\'t set property before regist');
        var item = _config === null || _config === void 0 ? void 0 : _config.items.find(function (item) { return item.prop === prop; });
        if (!item) {
            return console.warn("[cxForm warn]: prop " + prop + " isn't exist on this form's configList ");
        }
        if (Reflect.has(item, attr)) {
            return Reflect.set(item, attr, val);
        }
        __spreadArray([], __read(CxFormRenderMap.keys())).find(function (type) {
            var typeAttrs = Reflect.get(item, type);
            if (!isObject$1(typeAttrs))
                return;
            if (attr === 'options') {
                if (!Array.isArray(val))
                    throw new CxFormError('can\'t set options with non-array');
                var options = Reflect.get(typeAttrs, 'options');
                Array.isArray(options) ? (options.splice(0), options.push.apply(options, __spreadArray([], __read(val)))) : Reflect.set(typeAttrs, 'options', val);
                Reflect.set(typeAttrs, 'key', Date.now());
            }
            else {
                Reflect.set(typeAttrs, attr, val);
            }
            return true;
        });
    };
    return {
        register: register,
        getFormRef: getFormRef,
        setFormConfig: setFormConfig,
        /**
         * @description 注册组件
         * @param params {comp:组件,type:组件名,configAdaptor:组件配置项适配器,默认直接合并}
         */
        registerRenderer: function (params) {
            var comp = params.comp, type = params.type, adaptor = params.adaptor;
            CxFormRenderMap.set(type, { comp: comp, adaptor: adaptor });
        },
        getRenderer: function (key) {
            return CxFormRenderMap.get(key);
        },
        getRendererKeys: function () {
            return CxFormRenderMap.keys();
        },
    };
};

var CxFormControl = /** @class */ (function (_super) {
    __extends(CxFormControl, _super);
    function CxFormControl(form, controlConfig, rootConfig, emit) {
        var _this = _super.call(this) || this;
        _this.name = 'CxFormControl';
        _this.parse = null;
        _this.attrs = {};
        _this.type = '';
        _this.form = form;
        _this.emit = emit;
        _this.config = controlConfig;
        _this.rootConfig = rootConfig;
        _this.prop = controlConfig.prop;
        _this.init();
        return _this;
    }
    CxFormControl.prototype.init = function () {
        this.propAdaptor().bindModel();
        return this;
    };
    CxFormControl.prototype.addSlots = function (slots) {
        var _this = this;
        var _a, _b, _c;
        if (!isObject$1(slots))
            return this;
        isObject$1((_a = this.config) === null || _a === void 0 ? void 0 : _a.slot) &&
            Object.entries(this.config.slot).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], val = _b[1];
                Reflect.set(_this.slots, key, Reflect.get(slots, val));
            });
        var customSlot = (_c = (_b = this.config) === null || _b === void 0 ? void 0 : _b.custom) === null || _c === void 0 ? void 0 : _c.slot;
        customSlot && Reflect.set(this.slots, customSlot, Reflect.get(slots, customSlot));
        return this;
    };
    CxFormControl.prototype.bindModel = function () {
        var _this = this;
        if (this.prop) {
            Reflect.set(this.attrs, 'modelValue', this.form[this.prop]);
            Reflect.set(this.attrs, 'onUpdate:modelValue', function (val) {
                if (Array.isArray(val)) {
                    val = val.map(function (item) {
                        return _this.parse ? _this.parse(item) : item;
                    });
                }
                else if (val) {
                    val = _this.parse ? _this.parse(val) : val;
                }
                Reflect.set(_this.form, _this.prop, val);
            });
        }
        return this;
    };
    CxFormControl.prototype.propAdaptor = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var _e = useCxForm(), getRendererKeys = _e.getRendererKeys, getRenderer = _e.getRenderer;
        __spreadArray([], __read(getRendererKeys())).find(function (type) {
            var _a;
            if (!isObject$1(Reflect.get(_this.config, type)))
                return;
            var adaptor = ((_a = getRenderer(type)) !== null && _a !== void 0 ? _a : {}).adaptor;
            _this.type = type;
            isFunction(adaptor)
                ? adaptor.apply(_this)
                : Object.assign(_this.attrs, Reflect.get(_this.config, type));
            return true;
        });
        var placeholder = Reflect.get((_a = this.config) !== null && _a !== void 0 ? _a : {}, 'placeholder');
        placeholder && Reflect.set(this.attrs, 'placeholder', placeholder);
        Reflect.set(this.attrs, 'onChange', function (val) {
            var _a, _b;
            var payload = { prop: _this.prop, val: val, form: _this.form };
            if (Array.isArray(_this.attrs.options)) {
                Reflect.set(payload, 'option', _this.attrs.options.find(function (option) { return option.id === val; }));
            }
            isFunction(_this.emit) && _this.emit('change', payload);
            isFunction((_a = _this.config) === null || _a === void 0 ? void 0 : _a.onChange) && ((_b = _this.config) === null || _b === void 0 ? void 0 : _b.onChange(payload));
        });
        !isObject$1((_b = this.attrs) === null || _b === void 0 ? void 0 : _b.style) && Reflect.set(this.attrs, 'style', {});
        this.config.width &&
            isObject$1((_c = this.attrs) === null || _c === void 0 ? void 0 : _c.style) &&
            Reflect.set(this.attrs.style, 'width', this.config.width + "px");
        Reflect.set(this.attrs, '__closable', ((_d = this.rootConfig) === null || _d === void 0 ? void 0 : _d.closable) || this.config.closable);
        Reflect.set(this.attrs, '__emit', this.emit);
        Reflect.set(this.attrs, '__prop', this.prop);
        return this;
    };
    CxFormControl.prototype.render = function () {
        var _a, _b, _c, _d;
        var Control;
        if (this.type === 'custom') {
            Control = Reflect.get(this.slots, (_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.custom) === null || _b === void 0 ? void 0 : _b.slot) !== null && _c !== void 0 ? _c : '');
        }
        else {
            var comp = (_d = useCxForm().getRenderer(this.type)) === null || _d === void 0 ? void 0 : _d.comp;
            Control = isFunction(comp) ? comp() : comp;
        }
        return this.renderControl(Control);
    };
    return CxFormControl;
}(CxFormTemplate));

var form = function () { return ({
    size: 'small',
    labelSuffix: ':',
    // labelWidth: 'auto',
    labelPosition: 'left',
    onSubmit: function (e) { return e.preventDefault(); },
}); };
var cxFormDefaultConfig = {
    form: form
};

var CxForm$1 = /** @class */ (function (_super) {
    __extends(CxForm, _super);
    function CxForm(config) {
        var _this = _super.call(this) || this;
        _this.name = 'CxForm';
        _this.attrs = {};
        _this.ref = ref(null);
        _this.config = config;
        _this.init();
        return _this;
    }
    CxForm.prototype.getFormRef = function () {
        return this.ref;
    };
    CxForm.prototype.propAdaptor = function () {
        var _a, _b, _c, _d;
        Object.assign(this.attrs, cxFormDefaultConfig.form(), omit(this.config, ['items', 'formAttrs']));
        this.config.formAttrs && Object.assign(this.attrs, omit(this.config.formAttrs, ['form', 'inline', 'disabled', 'closable', 'items', 'class']));
        Reflect.set(this.attrs, 'ref', this.ref);
        Reflect.set(this.attrs, 'model', (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.form) !== null && _b !== void 0 ? _b : {});
        Reflect.set(this.attrs, 'rules', (_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d.reduce(function (res, item) {
            item.rule && Reflect.set(res, item.prop, item.rule);
            return res;
        }, {}));
        return this;
    };
    CxForm.prototype.render = function () {
        var _a, _b;
        var form = (_b = (_a = useCxForm().getRenderer('form')) === null || _a === void 0 ? void 0 : _a.comp) !== null && _b !== void 0 ? _b : resolveComponent('ElForm');
        return this.renderVNode(form);
    };
    return CxForm;
}(CxFormTemplate));

var CxFormItem = /** @class */ (function (_super) {
    __extends(CxFormItem, _super);
    function CxFormItem(config) {
        var _this = _super.call(this) || this;
        _this.name = 'CxFormItem';
        _this.attrs = {};
        _this.config = config;
        _this.init();
        return _this;
    }
    CxFormItem.prototype.addSlots = function (slots) {
        var _this = this;
        if (isObject$1(slots)) {
            var itemSlot = { "default": slots["default"] };
            this.config.labelSlot && Reflect.set(itemSlot, 'label', function () { var _a; return (_a = slots[_this.config.labelSlot]) === null || _a === void 0 ? void 0 : _a.call(slots, __assign({}, _this.config)); });
            Object.assign(this.slots, itemSlot);
        }
        return this;
    };
    CxFormItem.prototype.propAdaptor = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        // 以下顺序请勿变更
        isNumber((_a = this.config) === null || _a === void 0 ? void 0 : _a.spacing) && Reflect.set(this.attrs, 'style', { paddingRight: ((_b = this.config) === null || _b === void 0 ? void 0 : _b.spacing) + 'px' });
        Reflect.set(this.attrs, 'key', (_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.prop) !== null && _d !== void 0 ? _d : '');
        Object.assign(this.attrs, (_f = (_e = this.config) === null || _e === void 0 ? void 0 : _e.itemAttrs) !== null && _f !== void 0 ? _f : {});
        ((_g = this.config) === null || _g === void 0 ? void 0 : _g.labelWidth) && Reflect.set(this.attrs, 'labelWidth', this.config.labelWidth + 'px');
        Reflect.set(this.attrs, 'label', (_j = (_h = this.config) === null || _h === void 0 ? void 0 : _h.label) !== null && _j !== void 0 ? _j : '');
        Reflect.set(this.attrs, 'prop', (_l = (_k = this.config) === null || _k === void 0 ? void 0 : _k.prop) !== null && _l !== void 0 ? _l : '');
        return this;
    };
    CxFormItem.prototype.render = function () {
        var _a, _b;
        var formItem = (_b = (_a = useCxForm().getRenderer('formItem')) === null || _a === void 0 ? void 0 : _a.comp) !== null && _b !== void 0 ? _b : resolveComponent('ElFormItem');
        return this.renderVNode(formItem);
    };
    return CxFormItem;
}(CxFormTemplate));

var CxFormProps = {
    form: { type: Object, "default": function () { return ({}); } },
    inline: { type: Boolean, "default": true },
    disabled: { type: Boolean, "default": false },
    closable: { type: Boolean, "default": false },
    items: { type: Array, "default": function () { return []; } },
    "class": { type: [Array, Object, String], "default": function () { return []; } },
    formAttrs: { type: Object },
};

var CxForm = defineComponent({
    props: CxFormProps,
    name: 'CxForm',
    emits: ['change', 'register', 'close'],
    setup: function (props, _a) {
        var slots = _a.slots, emit = _a.emit, expose = _a.expose;
        function renderControl(itemConfig) {
            return new CxFormControl(props.form, itemConfig, props, emit).addSlots(slots).render();
        }
        function renderFormItem(itemConfig) {
            var slot = __assign(__assign({}, slots), { "default": function () { return [renderControl(itemConfig)]; } });
            return new CxFormItem(itemConfig).addSlots(slot).render();
        }
        function renderForm() {
            var slot = function () {
                var _a;
                return (_a = props.items) === null || _a === void 0 ? void 0 : _a.reduce(function (res, itemConfig) {
                    !itemConfig.hide && res.push(renderFormItem(itemConfig));
                    return res;
                }, []);
            };
            var instance = new CxForm$1(props).addSlots(slot);
            emit('register', { props: props, ref: instance.getFormRef() });
            return instance.render();
        }
        expose({
            trigger: function (prop) {
                emit('change', { prop: prop, val: props.form[prop], form: props.form });
            },
        });
        onMounted(function () {
        });
        return function () {
            return createVNode('div', { name: 'cx-form' }, [renderForm()]);
        };
    },
});

var script$c = CxForm;
script$c.install = function (app) {
    app.component(script$c.name, script$c);
};
var _CX_FORM = script$c;

var ARROW_KEY;
(function (ARROW_KEY) {
    ARROW_KEY["L"] = "ArrowLeft";
    ARROW_KEY["R"] = "ArrowRight";
    ARROW_KEY["U"] = "ArrowUp";
    ARROW_KEY["D"] = "ArrowDown";
})(ARROW_KEY || (ARROW_KEY = {}));
var COLUMN_FLAG;
(function (COLUMN_FLAG) {
    COLUMN_FLAG[COLUMN_FLAG["TEXT_COLUMN"] = 1] = "TEXT_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["CONTROL_COLUMN"] = 2] = "CONTROL_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["SLOT_COLUMN"] = 4] = "SLOT_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["FIX_COLUMN"] = 8] = "FIX_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["CALC_COLUMN"] = 16] = "CALC_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["ADD_SUM_COLUMN"] = 32] = "ADD_SUM_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["CUSTOM_SUM_COLUMN"] = 64] = "CUSTOM_SUM_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["TEXT_SUM_COLUMN"] = 128] = "TEXT_SUM_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["VALIDATE_COLUMN"] = 256] = "VALIDATE_COLUMN";
    COLUMN_FLAG[COLUMN_FLAG["ARRAY_CHILDREN"] = 512] = "ARRAY_CHILDREN";
})(COLUMN_FLAG || (COLUMN_FLAG = {}));
var CX_STYLE_SETTING;
(function (CX_STYLE_SETTING) {
    CX_STYLE_SETTING["width"] = "CX_TABLE_MIN_WIDTH";
    CX_STYLE_SETTING["height"] = "CX_TABLE_HEIGHT";
    CX_STYLE_SETTING["cache"] = "CX_VISUAL_CACHE";
    CX_STYLE_SETTING["padding"] = "CX_TABLE_PADDING";
})(CX_STYLE_SETTING || (CX_STYLE_SETTING = {}));
var CX_SPAN_METHOD_TYPE;
(function (CX_SPAN_METHOD_TYPE) {
    CX_SPAN_METHOD_TYPE[CX_SPAN_METHOD_TYPE["MISSING"] = 1] = "MISSING";
    CX_SPAN_METHOD_TYPE[CX_SPAN_METHOD_TYPE["EXTEND"] = 2] = "EXTEND";
})(CX_SPAN_METHOD_TYPE || (CX_SPAN_METHOD_TYPE = {}));
var CX_SORT_STATUS;
(function (CX_SORT_STATUS) {
    CX_SORT_STATUS[CX_SORT_STATUS["REVERSE"] = 0] = "REVERSE";
    CX_SORT_STATUS[CX_SORT_STATUS["POSITIVE"] = 1] = "POSITIVE";
    CX_SORT_STATUS[CX_SORT_STATUS["NONE"] = 2] = "NONE";
})(CX_SORT_STATUS || (CX_SORT_STATUS = {}));
var PATCH_FLAG;
(function (PATCH_FLAG) {
    PATCH_FLAG[PATCH_FLAG["TEXT"] = 1] = "TEXT";
    PATCH_FLAG[PATCH_FLAG["CLASS"] = 2] = "CLASS";
    PATCH_FLAG[PATCH_FLAG["STYLE"] = 4] = "STYLE";
    PATCH_FLAG[PATCH_FLAG["PROPS"] = 8] = "PROPS";
    PATCH_FLAG[PATCH_FLAG["FULL_PROPS"] = 16] = "FULL_PROPS";
    PATCH_FLAG[PATCH_FLAG["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
    PATCH_FLAG[PATCH_FLAG["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
    PATCH_FLAG[PATCH_FLAG["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
    PATCH_FLAG[PATCH_FLAG["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
    PATCH_FLAG[PATCH_FLAG["NEED_PATCH"] = 512] = "NEED_PATCH";
    PATCH_FLAG[PATCH_FLAG["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
    PATCH_FLAG[PATCH_FLAG["HOISTED"] = -1] = "HOISTED";
    PATCH_FLAG[PATCH_FLAG["BAIL"] = -2] = "BAIL";
})(PATCH_FLAG || (PATCH_FLAG = {}));
var CX_ADAPTOR_PRECISION_TYPE;
(function (CX_ADAPTOR_PRECISION_TYPE) {
    CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["GOLD"] = 1] = "GOLD";
    CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["STONE"] = 2] = "STONE";
    CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["PRICE"] = 3] = "PRICE";
    CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["INT"] = 4] = "INT";
    CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["LOSS"] = 5] = "LOSS";
})(CX_ADAPTOR_PRECISION_TYPE || (CX_ADAPTOR_PRECISION_TYPE = {}));
var TypeOption;
(function (TypeOption) {
    TypeOption[TypeOption["\u672A\u63D0\u4EA4"] = 0] = "\u672A\u63D0\u4EA4";
    TypeOption[TypeOption["\u5DF2\u9A73\u56DE"] = 1] = "\u5DF2\u9A73\u56DE";
    TypeOption[TypeOption["\u5DF2\u53CD\u5BA1"] = 2] = "\u5DF2\u53CD\u5BA1";
})(TypeOption || (TypeOption = {}));

var CX_TABLE_ROW_ID_PREPEND = 'cxrow-';
var CX_TABLE_ROW_KEY = 'row-key-';
var CX_TABLE_COLUMN_ID_PREPEND = 'cxcol-';
var CX_TABLE_COLUMN_KEY = 'col-key-';
var CX_TABLE_ID_PREPEND = 'cxtable-';
var CX_TABLE_SUM_ROW_KEY = 'cxtable-sum';
var CX_TABLE_VISUAL_ROW_KEY = 'cxtable-virtual-row';
var CX_TABLE_EVENT_LIST = [
    'register',
    'radioChange',
    'selectChange',
    'paging',
    'addNewRow',
    'tdFocus',
    'expandCheck',
    'broadcast',
    'dynamicUpdate',
    'columnUpdate',
    'dynamicSetting',
    'cached'
];
var CX_TABLE_INPUT_TYPE = ['input', 'select', 'search', 'numberInput', 'specification'];
var CX_TABLE_SUM_INDEX = -100;
var CX_TABLE_EMPTY_INDEX = -200;
var CX_TABLE_PER_CHAR_WIDTH = 20;
var CX_TABLE_NOT_HOVER_ID = 'cxrow-not-hover';
var CX_TABLE_DYNAMIC_PROPS = [
    'moduleType',
    'businessType',
    'priceType',
    'modelType'
];
var CX_TABLE_DYNAMIC_CACHE = '__CX_TABLE_DYNAMIC_CACHE__';
var CX_TABLE_CACHE_PENDING = '__CX_TABLE_CACHE_PENDING_';
var CX_TABLE_THROTTLE_DURATION = 0.5;

var createCxTableConfig = function () {
    return reactive({
        wrapperEle: null,
        hoveringRowid: CX_TABLE_NOT_HOVER_ID,
        cacheItemRemove: null,
        entireTotalSum: null,
        editStore: {
            actived: {
                rowData: null,
                column: null
            },
            activedControl: false,
            activedCell: null
        },
        priorityColumnMap: new Map(),
        columns: [],
        flatColumns: [],
        columnStore: {
            centerColumns: [],
            leftFixedColumns: [],
            rightFixedColumns: [],
            pxColumns: [],
            percentColumns: [],
            noWidthColumns: [],
            pxMinColumns: [],
            percentMinColumns: []
        },
        scrollStore: {
            showBottomShadow: false,
            showLeftShadow: false,
            showRightShadow: false,
            showTopShadow: false,
            scrollLeft: 0,
            scrollTop: 0,
            leftFixedWidth: 0,
            rightFixedWidth: 0,
            topFixedHeight: 0,
            bottomScrollBar: false,
            rightScrollBar: false,
            clientHeight: 0,
            clientWidth: 0,
            renderTotalWidth: 0
        },
        virtualStore: {
            renderPaddingTop: 0,
            renderPaddingBottom: 0,
            renderStartIndex: 0,
            renderLength: 9999,
            renderEndIndex: 9999,
            rowSpanMap: []
        },
        styleStore: {
            CX_TABLE_MIN_WIDTH: 110,
            CX_TABLE_HEIGHT: 40,
            CX_TABLE_SCROLL_BAR: 8,
            CX_TABLE_PADDING: 8,
            CX_VISUAL_CACHE: 5
        }
    });
};

var useColumnValidity = function ($CxTable) {
    var flatColumns = $CxTable.flatColumns;
    var keys = new Map();
    flatColumns.forEach(function (item) {
        var key = item.label + item.prop;
        if (keys.get(key)) {
            throw new Error("config\u4E2D\u4F20\u9012\u4E86\u91CD\u590D\u7684key: label=>" + item.label + ",prop=>" + item.prop);
        }
        else {
            keys.set(key, 1);
        }
    });
};
var useRowDataValidity = function (props) {
    var tableData = props.tableData;
    var rows = new Map();
    tableData === null || tableData === void 0 ? void 0 : tableData.forEach(function (rowData) {
        if (rows.get(rowData)) {
            throw new Error("tableData\u4E2D\u4F20\u9012\u4E86\u91CD\u590D\u7684rowData\u5F15\u7528:" + JSON.stringify(rowData));
        }
        else {
            rows.set(rowData, 1);
        }
    });
};

function includeArr(arr) {
    return function (label) { return arr.some(function (item) { return label === null || label === void 0 ? void 0 : label.includes(item); }); };
}
function equal(target) {
    return function (label) { return label === target; };
}
var CxTableWidthMap = new Map([
    ['序号', { width: 60, rule: equal('序号'), static: true }],
    // special
    ['金', { width: 140, rule: equal('金Au (g)') }],
    ['收藏', { width: 100, rule: function (label) { return label === null || label === void 0 ? void 0 : label.includes('收藏'); }, static: true }],
    ['手寸', { width: 80, rule: equal('手寸') }],
    ['导入', { width: 255, rule: equal('失败原因') }],
    ['cc不给号', { width: 250, rule: function (label) { return ['石号', '证书号'].includes(label); } }],
    ['名称', { width: 180, rule: equal('名称') }],
    ['款型', { width: 80, rule: equal('款型') }],
    ['刻字', { width: 180, rule: equal('刻字') }],
    ['计价方式', { width: 200, rule: equal('计价方式') }],
    ['下单', { width: 180, rule: includeArr(['责任方', '维修内容']) }],
    ['石单价(元/ct或元/颗)', { width: 180, rule: equal('石单价(元/ct或元/颗)'), important: true }],
    ['业务类型', { width: 240, rule: equal('业务类型') }],
    ['结料材质', { width: 100, rule: equal('结料材质') }],
    ['计量单位', { width: 100, rule: equal('计量单位') }],
    ['款型', { width: 100, rule: equal('款型') }],
    ['颜色', { width: 130, rule: equal('颜色') }],
    ['净度', { width: 90, rule: equal('净度') }],
    ['形状', { width: 130, rule: equal('形状') }],
    ['特殊工艺', { width: 180, rule: equal('特殊工艺') }],
    ['规格', { width: 120, rule: equal('规格') }],
    ['品名', { width: 180, rule: equal('品名') }],
    ['订单编号', { width: 140, rule: equal('订单编号') }],
    ['客来石编号', { width: 180, rule: equal('客来石编号') }],
    ['生产单号', { width: 120, rule: function (label) { return ['生产单号', '销售单号'].includes(label); } }],
    ['选择', { width: 60, rule: equal('选择'), static: true }],
    ['货号', { width: 60, rule: equal('货号'), static: true }],
    ['空', { width: 50, rule: equal('') }],
    ['时间', { width: 140, rule: includeArr(['时间', '日期']) }],
    ['姓名', { width: 110, rule: includeArr(['提交人', '审核人', '客户名', '工人']) }],
    [
        '商户类',
        {
            width: 240,
            rule: function (label) {
                return ((['采购单位', '销售对象', '结算对象', '业务对象'].includes(label) ||
                    includeArr(['商户', '供应商'])(label)) &&
                    !(label === null || label === void 0 ? void 0 : label.includes('单号')));
            }
        }
    ],
    ['仓位', { width: 100, rule: function (label) { return ['调入仓', '调出仓'].includes(label); } }],
    [
        '手输单号',
        { width: 140, rule: function (label) { return ['关联业务单号', '商户单号', '关联订单'].includes(label); } }
    ],
    ['批号', { width: 130, rule: function (label) { return label === null || label === void 0 ? void 0 : label.includes('批号'); } }],
    ['纯度', { width: 100, rule: function (label) { return label === null || label === void 0 ? void 0 : label.includes('纯度'); } }],
    ['重量', { width: 100, rule: includeArr(['重量', '(g)', '（ct）']) }],
    ['金额', { width: 120, rule: includeArr(['金额', '元', '价']) }],
    [
        '数量',
        {
            width: 80,
            rule: function (label) {
                return includeArr(['数'])(label) ||
                    [
                        '已指派',
                        '已完成',
                        '当前未完成',
                        '未生产',
                        '分件',
                        '手镶',
                        '执模',
                        '抛光',
                        '维修抛光',
                        '微镶',
                        '抛镶口',
                        '维修执模'
                    ].includes(label);
            }
        }
    ],
    ['率', { width: 120, rule: includeArr(['率', '损耗']) }],
    ['备注', { width: 180, rule: function (label) { return label === null || label === void 0 ? void 0 : label.includes('备注'); } }],
    ['状态', { width: 100, rule: function (label) { return label === null || label === void 0 ? void 0 : label.includes('状态'); }, static: true }],
    ['图片', { width: 80, rule: function (label) { return (label === null || label === void 0 ? void 0 : label.includes('图')) && label !== '审图'; }, static: true }],
    ['操作', { width: 100, rule: equal('操作'), static: true }],
    ['默认', { width: 120, rule: function () { return true; } }]
]);

var selectType = ['search', 'select', 'optionSelect', 'sourceSelect'];
// 表格内容区字符宽度(基准宽度)
var contentWidthAdaptor = function (column, props) {
    var _a;
    return Math.max.apply(Math, __spreadArray([], __read((_a = props.tableData) === null || _a === void 0 ? void 0 : _a.map(function (rowData) {
        var _a, _b;
        var content = rowData[column.prop], append = 0;
        var type = (_a = column === null || column === void 0 ? void 0 : column.control) === null || _a === void 0 ? void 0 : _a.type;
        // 当处于特殊字段时,直接取最大宽度
        if (['备注'].includes(column.label) && ((_b = column === null || column === void 0 ? void 0 : column.control) === null || _b === void 0 ? void 0 : _b.type) === 'input') {
            return +Infinity;
        }
        else if (type === 'input') {
            append = 40;
        }
        else if (type === 'select' || type === 'search') {
            content = rowData[getColumnSelectText(column)];
            append = 55;
        }
        else if (['nativeCheckbox', 'nativeRadio'].includes(type)) {
            return 60;
        }
        else if (['nativeDelete'].includes(type)) {
            return 60;
        }
        else if (type === 'inscription') {
            // 当处于多选框情况,直接取最大宽度
            return +Infinity;
        }
        else if (['status', 'tag'].includes(type)) {
            content = getStatusAttrs(rowData, column).content;
        }
        else if (column.renderText) {
            content = rowData[getColumnSelectText(column)];
        }
        if (column.accuracy) {
            content = decimalFixed(content, column.accuracy, true);
        }
        var contentWidth = getStringWidth(content !== null && content !== void 0 ? content : '');
        if (column.slot) {
            var textContentWidth = getStringWidth(rowData[getColumnSelectText(column)]);
            var nameContentWidth = getStringWidth(rowData[getColumnSelectText(column, 'Name')]);
            contentWidth = Math.max(contentWidth, textContentWidth, nameContentWidth);
            if (selectType.includes(column.slotType)) {
                contentWidth += 55;
            }
            else if (['input'].includes(column.slotType)) {
                contentWidth += 40;
            }
        }
        return contentWidth + append + 16;
    }))));
};
// 表头字符宽度(最小宽度)
var headWidthAdaptor = function (_a) {
    var label = _a.label, required = _a.required, icon = _a.icon, control = _a.control, slot = _a.slot, headSlot = _a.headSlot, configWidth = _a.configWidth, configMinWidth = _a.configMinWidth, slotType = _a.slotType, headTip = _a.headTip;
    var type = control === null || control === void 0 ? void 0 : control.type;
    if (['nativeCheckbox', 'nativeRadio'].includes(type)) {
        return 60;
    }
    else if (['nativeDelete', 'expandSwitch'].includes(type)) {
        return 60;
    }
    // 对于插槽的情况, 无法判断具体长度, 故单独处理(取配置项当中的值)
    else if ((slot || headSlot) && (configWidth || configMinWidth)) {
        return (configWidth !== null && configWidth !== void 0 ? configWidth : configMinWidth);
    }
    var width = getStringWidth(label) + 16 + +!!required * 16 + +!!icon * 20;
    if ((slot || headSlot) && ['search', 'select'].includes(slotType)) {
        width += 55;
    }
    else if (['input'].includes(slotType)) {
        width += 40;
    }
    if (headTip) {
        width += 20;
    }
    return width;
};
// 表头映射宽度(最大宽度)
var widthMapAdaptor = function (_a) {
    var label = _a.label, slot = _a.slot, headSlot = _a.headSlot, slotType = _a.slotType, configWidth = _a.configWidth, configMinWidth = _a.configMinWidth;
    var targetItem = __spreadArray([], __read(CxTableWidthMap.values())).find(function (item) { return item.rule(label); });
    var width = targetItem.width, isStatic = targetItem.static;
    // 对于插槽的情况, 无法判断具体长度, 故单独处理(取配置项当中的值)
    if (slot || headSlot) {
        if (configWidth || configMinWidth) {
            width = (configWidth !== null && configWidth !== void 0 ? configWidth : configMinWidth);
            isStatic = !!configWidth;
        }
        if (selectType.includes(slotType)) {
            width += 55;
        }
        else if (['input'].includes(slotType)) {
            width += 40;
        }
    }
    var result = __assign(__assign({}, targetItem), { width: width, 
        // 是否允许拉伸
        isMin: !isStatic });
    return result;
};
/**
 * 宽度优先级:
 * 由低到高排序为
 * 一级: widthMap映射-------------------- 最大宽度1
 * 二级: widthMap中带important关键字------ 最大宽度2 (L_MAX)
 * 三级: 表头字符长度--------------------- 最小宽度 (L_MIN)
 * 四级: 表格内容区宽度  ------------------ 一般情况 (L_CONTENT)
 * 五级: 通过setConfig设置的宽度----------- 特殊情况(高优先级)
 * 六级: 通过动态表头设置的宽度
 *
 * 在需求变动后, 前三级得到的结果作为最大宽度使用(L_MAX), 内容区宽度即作为通常宽度,五级,六级为特殊情况处理的宽度,优先级高于前四级
 * 特殊情况: 带有控件的列宽度为'一般情况'宽度加上控件所必须的宽度
 * 存在的问题: 插槽无法通过组件控制, 只能通过setConfig,动态表头配置等方式覆盖
 */
var getColumnWidth = function ($CxTable, column, props) {
    var _a, _b;
    !isString(column.label) && cxTableWarn("invalid cxTable config => " + column.label + " label");
    var priority = (_a = $CxTable.priorityColumnMap.get(column.prop)) !== null && _a !== void 0 ? _a : {};
    var result = { isMin: false, width: 0 };
    if (column.importantWidth) {
        // 六级
        var width = +column.importantWidth;
        isNaN(width) && cxTableWarn("invalid cxTable config => " + column.prop + " importantWidth");
        result.width = width || 0;
        result.isMin = !!column.autoWidth;
        return result;
    }
    else if (priority.width) {
        // 五级
        var width = +priority.width;
        isNaN(width) && cxTableWarn("invalid cxTable config => " + column.prop + " priorityWidth");
        result.width = width || 0;
    }
    // 二级(一级)
    var _c = (_b = widthMapAdaptor(column)) !== null && _b !== void 0 ? _b : {}, L_MAX = _c.width, isMin = _c.isMin;
    // 是否使用适配器中的宽度可通过widthAdaptor开关关闭(不影响最高优先级的importantWidth与setConfig中的宽度)
    if (!props.widthAdaptor) {
        Reflect.set(result, 'width', column.configWidth);
    }
    else if (!result.width) {
        // 四级
        var L_CONTENT = contentWidthAdaptor(column, props);
        // 三级
        var L_MIN = headWidthAdaptor(column);
        result.width = L_CONTENT < L_MIN ? L_MIN : L_CONTENT > L_MAX ? L_MAX : L_CONTENT;
    }
    result.isMin = isMin;
    return result;
};

var useAutoWidth = function ($CxTable) {
    var wrapperEle = $CxTable.wrapperEle;
    if (!wrapperEle)
        return;
    var columnStore = $CxTable.columnStore, styleStore = $CxTable.styleStore;
    var pxColumns = columnStore.pxColumns, pxMinColumns = columnStore.pxMinColumns, percentColumns = columnStore.percentColumns, percentMinColumns = columnStore.percentMinColumns, noWidthColumns = columnStore.noWidthColumns;
    var wrapperWidth = wrapperEle.clientWidth;
    var remainWidth = wrapperWidth;
    var meanWidth = wrapperWidth / 100;
    var tableWidth = 0;
    pxColumns.forEach(function (col) {
        var pxWidth = parseInt(col.width + '');
        tableWidth += pxWidth;
        col.renderWidth = pxWidth;
    });
    pxMinColumns.forEach(function (col) {
        var pxWidth = parseInt(col.minWidth + '');
        tableWidth += pxWidth;
        col.renderWidth = pxWidth;
    });
    percentColumns.forEach(function (col) {
        var scaleWidth = Math.floor(parseInt(col.width + '') * meanWidth);
        tableWidth += scaleWidth;
        col.renderWidth = scaleWidth;
    });
    percentMinColumns.forEach(function (col) {
        var scaleWidth = Math.floor(parseInt(col.minWidth + '') * meanWidth);
        tableWidth += scaleWidth;
        col.renderWidth = scaleWidth;
    });
    noWidthColumns.forEach(function (col) {
        var width = styleStore.CX_TABLE_MIN_WIDTH;
        tableWidth += width;
        col.renderWidth = width;
    });
    remainWidth -= tableWidth;
    meanWidth =
        remainWidth > 0
            ? Math.floor(remainWidth / (percentMinColumns.length + pxMinColumns.length + noWidthColumns.length))
            : 0;
    if (remainWidth > 0) {
        if (remainWidth > 0) {
            percentMinColumns
                .concat(pxMinColumns)
                .concat(noWidthColumns)
                .forEach(function (col) {
                tableWidth += meanWidth;
                col.renderWidth += meanWidth;
            });
        }
    }
    var dynamicList = percentMinColumns.concat(pxMinColumns).concat(noWidthColumns);
    var dynamicSize = dynamicList.length - 1;
    if (dynamicSize > 0) {
        var offsetWidth = wrapperWidth - tableWidth;
        if (offsetWidth > 0) {
            while (offsetWidth > 0 && dynamicSize >= 0) {
                offsetWidth--;
                dynamicList[dynamicSize--].renderWidth++;
            }
            tableWidth = wrapperWidth;
        }
    }
    $CxTable.scrollStore.renderTotalWidth = tableWidth;
};
var updateCxTableWidth = function ($CxTable, props, prop) { return __awaiter(void 0, void 0, void 0, function () {
    var targetColumn, parentColumn, idProp_1, widthState, width, isMin, parentWidth;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        targetColumn = (_a = $CxTable.flatColumns) === null || _a === void 0 ? void 0 : _a.find(function (column) { return column.prop === prop; });
        parentColumn = getParentColumn($CxTable.columns, prop);
        /**
         * 由于在select,search,slot等情况下, 存在只有text变化而id不变化的情况, 难以通过列prop(xxxId)监听到全部的表格内容变化
         * 故需要由xxxText反推id列prop
         */
        if (!targetColumn) {
            if (/.+Text/.test(prop)) {
                idProp_1 = prop.replace(/Text$/, 'Id');
                targetColumn = (_b = $CxTable.flatColumns) === null || _b === void 0 ? void 0 : _b.find(function (column) { return column.prop === idProp_1; });
            }
        }
        if (!targetColumn) {
            targetColumn = (_c = $CxTable.flatColumns) === null || _c === void 0 ? void 0 : _c.find(function (column) { var _a; return ((_a = column.control) === null || _a === void 0 ? void 0 : _a.selectText) === prop; });
        }
        if (!targetColumn)
            return [2 /*return*/];
        widthState = getColumnWidth($CxTable, targetColumn, props);
        width = widthState.width;
        isMin = widthState.isMin;
        // 处理只有一个子项的情况
        if (((_d = parentColumn === null || parentColumn === void 0 ? void 0 : parentColumn.children) === null || _d === void 0 ? void 0 : _d.length) === 1) {
            parentWidth = getColumnWidth($CxTable, parentColumn, props).width;
            width = Math.max(parentWidth, width);
        }
        // 当处于最后一列且配置了configurable,需要增加40px
        if (prop === $CxTable.flatColumns[$CxTable.flatColumns.length - 1].prop && props.configurable) {
            width += 40;
        }
        Reflect.set(targetColumn, isMin ? 'minWidth' : 'width', width),
            Reflect.deleteProperty(targetColumn, isMin ? 'width' : 'minWidth');
        return [2 /*return*/];
    });
}); };

var CxBroadcast = /** @class */ (function () {
    function CxBroadcast() {
        this.deps = new Map();
        this.entireDep = [];
    }
    CxBroadcast.prototype.trigger = function (key, rowData, payload) {
        var dep = this.getDep(key, rowData);
        // 发送局部广播
        dep.forEach(function (cb) { return isFunction(cb) && cb(payload); });
        // 发送全局广播
        this.entireDep.forEach(function (cb) { return isFunction(cb) && cb(payload); });
    };
    CxBroadcast.prototype.registEntireListener = function (cb) {
        !this.entireDep.includes(cb) && this.entireDep.push(cb);
    };
    CxBroadcast.prototype.registListener = function (key, rowData, cb) {
        var dep = this.getDep(key, rowData);
        if (dep.every(function (f) { return f.toString() !== cb.toString(); })) {
            dep.push(cb);
        }
    };
    CxBroadcast.prototype.getDep = function (key, rowData) {
        var result = [];
        var rowsDep = this.deps.get(key);
        if (!rowsDep) {
            rowsDep = new WeakMap();
            rowsDep.set(rowData, result);
            this.deps.set(key, rowsDep);
        }
        else {
            var deps = rowsDep.get(rowData);
            if (deps) {
                result = deps;
            }
            else {
                rowsDep.set(rowData, result);
            }
        }
        return result;
    };
    return CxBroadcast;
}());
var useBroadcast = function () {
    return {
        broadcast: new CxBroadcast()
    };
};

var useCxTableEvent = function ($CxTable, props, emit) {
    var bus = new EventBus();
    bus.on('addNewRow', function (content) {
        if (props.disabled)
            return;
        var emptyRow = $CxTable.flatColumns.reduce(function (res, column) {
            Reflect.set(res, column.prop, '');
            return res;
        }, {});
        emit(content, emptyRow);
    });
    bus.on('expandCheck', function (params) {
        emit('expandCheck', params);
    });
    bus.on('tdFocus', function (params) { return emit('tdFocus', params); });
    bus.on('deleteRow', function (rowIndex) {
        var tableData = props.tableData;
        tableData === null || tableData === void 0 ? void 0 : tableData.splice(rowIndex, 1);
    });
    return { bus: bus };
};

var useCSSVariable = function ($CxTable) {
    return {
        cssVariable: computed(function () {
            return {
                '--padding': $CxTable.styleStore.CX_TABLE_PADDING,
                '--cellHeight': $CxTable.styleStore.CX_TABLE_HEIGHT,
                '--scrollWidth': $CxTable.styleStore.CX_TABLE_SCROLL_BAR
            };
        })
    };
};

var useCalcSpanMethod = function ($CxTable, props) {
    var _a, _b, _c;
    var virtualStore = $CxTable.virtualStore, flatColumns = $CxTable.flatColumns;
    var rowSpanMap = virtualStore.rowSpanMap;
    rowSpanMap.length = (_b = (_a = props.tableData) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    rowSpanMap.fill(0);
    (_c = props.tableData) === null || _c === void 0 ? void 0 : _c.forEach(function (rowData, rowIndex) {
        flatColumns.some(function (column) {
            var _a, _b;
            var result = (_b = (_a = props.spanMethod) === null || _a === void 0 ? void 0 : _a.call(props, { rowData: rowData, column: column, rowIndex: rowIndex })) !== null && _b !== void 0 ? _b : {};
            if (isArray(result)) {
                result = { rowspan: result[0], colspan: result[1] };
            }
            if (result.rowspan === 0) {
                rowSpanMap[rowIndex] |= CX_SPAN_METHOD_TYPE.MISSING;
            }
            else if (result.rowspan > 1) {
                rowSpanMap[rowIndex] |= CX_SPAN_METHOD_TYPE.EXTEND;
            }
        });
    });
};

function assignStyle(current, assign, payload) {
    Object.assign(current, isFunction(assign) ? assign(payload) : assign);
}
function useStyle(col, props) {
    return function (params, type, rowData, rowIndex) {
        var result = { textAlign: col.align === 'center' ? 'center' : 'left' };
        if (type === 'body') {
            props.cellStyle && assignStyle(result, props.cellStyle, { column: col, rowData: rowData, rowIndex: rowIndex });
            col.cellStyle && assignStyle(result, col.cellStyle, { column: col, rowData: rowData, rowIndex: rowIndex });
        }
        if (type === 'head') {
            props.headCellStyle && assignStyle(result, props.headCellStyle, { column: col });
            col.headCellStyle && assignStyle(result, col.headCellStyle, { column: col });
        }
        if (isNumber(params === null || params === void 0 ? void 0 : params.height)) {
            result.height = formatWidth(params === null || params === void 0 ? void 0 : params.height);
        }
        return result;
    };
}

var colid = 0, rowid = 0, tid = 0;
var rowIdMap = new WeakMap();
var colIdMap = new Map();
var useTableId = function () {
    var generateColId = function (col) {
        var key = col.label + col.prop;
        var result = colIdMap.get(key);
        if (!result) {
            result = CX_TABLE_COLUMN_ID_PREPEND + colid++;
            colIdMap.set(key, result);
        }
        return result;
    };
    var generateRowId = function () {
        return CX_TABLE_COLUMN_ID_PREPEND + rowid++;
    };
    var generateTableId = function () {
        return CX_TABLE_ID_PREPEND + tid++;
    };
    var getRowIdFromMap = function (key) {
        var result = rowIdMap.get(key);
        if (!result) {
            result = generateRowId();
            setRowIdToMap(key, result);
        }
        return result;
    };
    var setRowIdToMap = function (key, value) {
        rowIdMap.set(key, value);
        return value;
    };
    return { generateColId: generateColId, generateRowId: generateRowId, generateTableId: generateTableId, getRowIdFromMap: getRowIdFromMap, setRowIdToMap: setRowIdToMap };
};

function getColumnFlag(col) {
    var _a;
    var result = 0;
    if (col.slot) {
        result |= COLUMN_FLAG.SLOT_COLUMN;
    }
    else if (col.control) {
        result |= COLUMN_FLAG.CONTROL_COLUMN;
    }
    else if (col.calculate) {
        result |= COLUMN_FLAG.CALC_COLUMN;
    }
    else {
        result |= COLUMN_FLAG.TEXT_COLUMN;
    }
    if (col.fixed) {
        result |= COLUMN_FLAG.FIX_COLUMN;
    }
    if ((_a = col.children) === null || _a === void 0 ? void 0 : _a.length) {
        result |= COLUMN_FLAG.ARRAY_CHILDREN;
    }
    if (col.sum === 'add') {
        result |= COLUMN_FLAG.ADD_SUM_COLUMN;
    }
    else if (isFunction(col.sum)) {
        result |= COLUMN_FLAG.CUSTOM_SUM_COLUMN;
    }
    else if (col.sum === 'text') {
        result |= COLUMN_FLAG.TEXT_SUM_COLUMN;
    }
    if (col.validator || col.required) {
        result |= COLUMN_FLAG.VALIDATE_COLUMN;
    }
    return result;
}
function normalizeColumn(col, $CxTable, props, parent, uniqueChildren) {
    var _a, _b, _c;
    var priority = (_a = $CxTable.priorityColumnMap.get(col.prop)) !== null && _a !== void 0 ? _a : {};
    var column = deepMerge(deepMerge({}, col), priority);
    var result = __assign(__assign({}, column), { configWidth: column.width, configMinWidth: column.minWidth, columnFlag: getColumnFlag(column), getStyle: useStyle(column, props), renderWidth: 0, children: undefined, _colid: useTableId().generateColId(column) });
    var widthState = getColumnWidth($CxTable, result, props);
    var width = widthState.width;
    var isMin = widthState.isMin;
    // 处理只有一个子项的情况
    if (uniqueChildren && parent) {
        var parentWidth = getColumnWidth($CxTable, parent, props).width;
        width = Math.max(parentWidth, width);
    }
    Reflect.set(result, isMin ? 'minWidth' : 'width', width),
        Reflect.deleteProperty(result, isMin ? 'width' : 'minWidth');
    result.children = (_c = (_b = column.children) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return !item.hide; })) === null || _c === void 0 ? void 0 : _c.map(function (column) { var _a; return normalizeColumn(column, $CxTable, props, result, ((_a = col.children) === null || _a === void 0 ? void 0 : _a.length) === 1); });
    return result;
}
function useColumn($CxTable, columnProxy, props) {
    var cols = columnProxy.value;
    var columns = cols
        .filter(function (col) { return !col.hide; })
        .map(function (col) { return normalizeColumn(col, $CxTable, props); });
    var leftFixedColumns = columns.filter(function (col) { return col.fixed === 'left'; });
    $CxTable.columnStore.leftFixedColumns = leftFixedColumns;
    var rightFixedColumns = columns.filter(function (col) { return col.fixed === 'right'; });
    $CxTable.columnStore.rightFixedColumns = rightFixedColumns;
    var middenColumns = columns.filter(function (column) { return !column.fixed; });
    $CxTable.columnStore.centerColumns = arrFlat(middenColumns);
    $CxTable.columns = [].concat($CxTable.columnStore.leftFixedColumns, middenColumns, $CxTable.columnStore.rightFixedColumns);
    $CxTable.flatColumns = arrFlat($CxTable.columns);
    classifyColumn($CxTable, $CxTable.flatColumns);
}
function classifyColumn($CxTable, columns) {
    var pxColumns = columns.filter(function (col) {
        if (!isEmpty(col.minWidth))
            return false;
        return isNumber(col.width) || (isString(col.width) && col.width.endsWith('px'));
    });
    $CxTable.columnStore.pxColumns = pxColumns;
    var percentColumns = columns.filter(function (col) {
        if (!isEmpty(col.minWidth))
            return false;
        return isString(col.width) && col.width.endsWith('%');
    });
    $CxTable.columnStore.percentColumns = percentColumns;
    var pxMinColumns = columns.filter(function (col) {
        return isNumber(col.minWidth) || (isString(col.minWidth) && col.minWidth.endsWith('px'));
    });
    $CxTable.columnStore.pxMinColumns = pxMinColumns;
    var percentMinColumns = columns.filter(function (col) {
        return isString(col.minWidth) && col.minWidth.endsWith('%');
    });
    $CxTable.columnStore.percentMinColumns = percentMinColumns;
    var noWidthColumns = columns.filter(function (col) {
        return isEmpty(col.width) && isEmpty(col.minWidth);
    });
    $CxTable.columnStore.noWidthColumns = noWidthColumns;
}

var clipboard = ref(null);
var useCopy = function (props) {
    var copy = function () {
        clipboard.value = clone(props.tableData);
        return clipboard.value;
    };
    var paste = function (payload) {
        var _a;
        if (!Array.isArray(clipboard.value)) {
            return;
        }
        var omitProps = payload.omitProps, onPaste = payload.onPaste;
        var rows = clone(clipboard.value).map(function (item) {
            if (Array.isArray(omitProps)) {
                return omit$1(omitProps, item);
            }
            return item;
        });
        (_a = props.tableData).push.apply(_a, __spreadArray([], __read((isFunction(onPaste) ? onPaste(rows) : rows))));
    };
    return { copy: copy, paste: paste };
};

function useCxPagination() {
    return reactive({
        currentPage: 1,
        pageCapacity: 10,
        pageSizes: [10, 20, 50],
        total: 0
    });
}

var useCxSort = function (props) {
    var sortProp = ref('');
    var sortStatus = ref(CX_SORT_STATUS.NONE);
    var sort = ref(false);
    // const sortedData = computed(() => {
    //   if (unref(sortStatus) === CX_SORT_STATUS.NONE) {
    //     return props.tableData;
    //   } else if (unref(sort)) {
    //     let sortFun;
    //     if (isFunction(unref(sort))) {
    //       sortFun = (a: AnyObject, b: AnyObject) => {
    //         const fun = unref(sort) as CxTableSortFun;
    //         return unref(sortStatus) === CX_SORT_STATUS.POSITIVE
    //           ? fun(a[unref(sortProp)], b[unref(sortProp)])
    //           : fun(b[unref(sortProp)], a[unref(sortProp)]);
    //       };
    //     } else {
    //       sortFun = (a: AnyObject, b: AnyObject) => {
    //         return unref(sortStatus) === CX_SORT_STATUS.POSITIVE
    //           ? a[unref(sortProp)] - b[unref(sortProp)]
    //           : b[unref(sortProp)] - a[unref(sortProp)];
    //       };
    //     }
    //     return copySort(props.tableData, sortFun);
    //   } else {
    //     return props.tableData;
    //   }
    // });
    return {
        tableDataVisitor: new Proxy({}, {
            get: function (target, key) {
                if (key === 'sortedData')
                    return props.tableData;
                if (key === 'sortProp')
                    return sortProp.value;
                if (key === 'sortStatus')
                    return sortStatus.value;
            },
            set: function (target, key, val) {
                switch (key) {
                    case 'sortProp':
                        sortProp.value = val;
                        break;
                    case 'sort':
                        sort.value = val;
                    case 'sortStatus':
                        sortStatus.value = val;
                }
                return true;
            }
        })
    };
};

var CxTableRendererMap = new Map();
var CxTableActiveControl = new Set();
var createCxTableContext = function () {
    return {
        contextScopeId: 'defaultScope',
        messageInstance: {
            success: function () { return undefined; },
            warning: function () { return undefined; },
            info: function () { return undefined; },
            error: function () { return undefined; }
        },
        dynamicRequestInstance: null,
        dynamicInject: new Set(),
        dynamicFormContext: { requestApiMap: {} },
        dynamicCacheContext: {
            requestApiMap: {},
            removeApiMap: {},
            cacheTypeTab: function () { return false; },
            requestInstance: {},
            cacheLabelConfig: []
        },
        dynamicType: {
            DYNAMIC_MODULE_TYPE: {},
            DYNAMIC_BUSINESS_TYPE: {},
            DYNAMIC_MODEL_TYPE: {},
            DYNAMIC_PRICE_TYPE: {}
        },
        precision: {}
    };
};
var context = createCxTableContext();
var readOnlyContext = new Proxy(context, {
    get: function (target, key) {
        return target[key];
    },
    set: function () {
        return false;
    }
});
var useCxTable = function () {
    var getContext = function () { return readOnlyContext; };
    var instance = ref({});
    var instanceProps = ref({});
    var copyHandler = ref({});
    var registCxTable = function (payload) {
        instance.value = payload.registerTarget;
        instanceProps.value = payload.props;
        copyHandler.value = useCopy(payload.props);
        return cxTableManager;
    };
    var registCxRenderer = function (params) {
        var render = null;
        if (isFunction(params.payload)) {
            render = params.payload;
        }
        else if (params.payload) {
            render = params.payload.render;
            params.payload.active && CxTableActiveControl.add(params.type);
        }
        render && CxTableRendererMap.set(params.type, render);
        return cxTableManager;
    };
    var setCxTableScopeId = function (id) {
        context.contextScopeId = id;
        return cxTableManager;
    };
    var setMessageInstance = function (instance) {
        context.messageInstance = instance;
        return cxTableManager;
    };
    var setDynamicFormSearchApi = function (moduleType, rules) {
        context.dynamicFormContext.requestApiMap[moduleType] = rules;
        return cxTableManager;
    };
    var setDynamicCacheContext = function (key, val) {
        context.dynamicCacheContext[key] = val;
        return cxTableManager;
    };
    var setDynamicRequestInstance = function (instance) {
        context.dynamicRequestInstance = instance;
        return cxTableManager;
    };
    var setDynamicType = function (types) {
        Object.keys(context.dynamicType).forEach(function (dynamicKey) {
            if (isObject$1(types[dynamicKey])) {
                context.dynamicType[dynamicKey] = types[dynamicKey];
            }
        });
        return cxTableManager;
    };
    var setPrecision = function (precision) {
        Object.assign(context.precision, precision);
        return cxTableManager;
    };
    var use = function (plugin) {
        if (isFunction(plugin.dynamicInject)) {
            context.dynamicInject.add(plugin.dynamicInject);
        }
        return cxTableManager;
    };
    var cxTableManager = {
        registCxTable: registCxTable,
        setPrecision: setPrecision,
        setCxTableScopeId: setCxTableScopeId,
        setMessageInstance: setMessageInstance,
        setDynamicType: setDynamicType,
        setDynamicFormSearchApi: setDynamicFormSearchApi,
        setDynamicRequestInstance: setDynamicRequestInstance,
        setDynamicCacheContext: setDynamicCacheContext,
        getContext: getContext,
        use: use,
        instance: instance,
        registCxRenderer: registCxRenderer,
        copyHandler: copyHandler
    };
    return cxTableManager;
};

var staticConfigList = [
    'label',
    'prop',
    'slot',
    'icon',
    'required',
    'number',
    'defaultValue',
    'accuracy',
    'fixed',
    'align',
    'importantWidth',
    'autoWidth',
    'sortable',
    'slotType',
    'renderText',
    'searchStates',
    'sortable',
    'headTip',
    'jsonData'
];
var CX_ADAPTOR_LOSS_PRECISION = 2;
var CX_ADAPTOR_INT_PRECISION = 0;

/**
 * 保留几位小数
 * @param {String | Number} num
 * @param {Number} fixed
 * @return {Number | "-"}
 */
function decimals(num, fixed) {
    if (fixed === void 0) { fixed = 3; }
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
function decimalFixed(value, precision, force) {
    var _a;
    if (force === void 0) { force = false; }
    if (value === '' || isNaN(+value) || precision === undefined) {
        return value;
    }
    if (precision < 0 || precision !== parseInt(precision + '', 10)) {
        cxTableWarn("\u7CBE\u5EA6\u9519\u8BEF => " + precision);
        return value;
    }
    var num = +(+value).toPrecision(12);
    if (force) {
        return (+decimals(+num, precision)).toFixed(precision);
    }
    var len = ((_a = num.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    return (+decimals(+num, Math.max(precision, len))).toFixed(Math.max(precision, len));
}
var getPrecision = function (state) {
    var _a = useCxTable().getContext().precision, goldAccuracy = _a.goldAccuracy, stoneAccuracy = _a.stoneAccuracy, priceAccuracy = _a.priceAccuracy;
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
var calcInvoker = function (calc, column) {
    return function (rowData) {
        var result = calcInnerFormula(calc, rowData);
        result = decimalFixed(result, column.accuracy, true);
        Reflect.set(rowData, column.prop, result);
        return result;
    };
};
var getTemplateResult = function (str, data) {
    var _a;
    return ((_a = str === null || str === void 0 ? void 0 : str.replace(/\{\{.+\}\}/g, function (p) {
        return data[p.replace(/\{\{(.+)\}\}/, '$1')];
    })) !== null && _a !== void 0 ? _a : str);
};
Reflect.set(window, 'getTemplateResult', getTemplateResult);
var getInFactVal = function (val) {
    if (isString(val))
        return val.match(/[^\d^.]+/) ? "'" + val + "'" : val;
    if (!isNumber(val))
        return 'null';
    return val + '';
};
// 获取字符公式结果
var getEvalResult = function (formula, data, withCalc) {
    if (withCalc === void 0) { withCalc = false; }
    var getToken = function () {
        return formula.replace(/[a-zA-Z]+/g, function (prop) {
            if (prop === 'undefined') {
                return prop;
            }
            return withCalc ? (function () {
                var res = +data[prop] || 0;
                return res < 0 ? " " + res : res;
            })() + '' : getInFactVal(data[prop]);
        });
    };
    try {
        var token = getToken();
        var res = eval(token);
        if (isNaN(res)) {
            withCalc = true;
            res = eval(token);
        }
        return res;
    }
    catch (err) {
        if (!withCalc) {
            withCalc = true;
            try {
                return eval(getToken());
            }
            catch (innerErr) {
                cxTableWarn("\u5339\u914D\u516C\u5F0F\u65F6\u53D1\u751F\u9519\u8BEF==>" + formula);
            }
        }
        cxTableWarn("\u5339\u914D\u516C\u5F0F\u65F6\u53D1\u751F\u9519\u8BEF==>" + formula);
        return null;
    }
};
// 获取options依赖的props
var getOptionsDeps = function (options) {
    if (Array.isArray(options)) {
        return [];
    }
    var result = [];
    function search(obj) {
        Object.entries(obj).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], val = _b[1];
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
var calcInnerOptions = function (options, data) {
    return calcInnerItem(options, data, Array.isArray, [], function (result) { return result; });
};
// 获取计算后的校验规则
var calcInnerValidator = function (validator, data) {
    return calcInnerItem(validator, data, Array.isArray, {}, function (result) { return result; });
};
// 获取计算后的公式值
var calcInnerFormula = function (formula, data) {
    return calcInnerItem(formula, data, isString, 0, getEvalResult);
};
// 获取嵌套对象中的值
var calcInnerItem = function (formula, data, finder, defaultValue, getResult) {
    if (finder(formula)) {
        return getResult(formula, data);
    }
    else if (typeof formula === 'object') {
        var result_1 = defaultValue;
        Object.entries(formula).some(function (_a) {
            var _b = __read(_a, 2), key = _b[0], val = _b[1];
            if (typeof val === 'object') {
                Object.entries(val).some(function (_a) {
                    var _b = __read(_a, 2), innerKey = _b[0], innerVal = _b[1];
                    if (+data[key] === +innerKey || val === '*') {
                        if (finder(innerVal)) {
                            result_1 = getResult(innerVal, data);
                        }
                        else if (typeof innerVal === 'object') {
                            result_1 = calcInnerItem(innerVal, data, finder, defaultValue, getResult);
                        }
                        return true;
                    }
                });
            }
        });
        return result_1;
    }
    return defaultValue;
};
var getStringDepends = function (formula) {
    if (!isString(formula))
        return [];
    return formula.match(/[a-zA-Z]+/g);
};

var CxControlConfig = /** @class */ (function () {
    function CxControlConfig(config) {
        var _a, _b;
        this.type = '';
        this.attrs = {};
        Reflect.set(this, 'type', (_b = (_a = config.control) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : '');
        switch (this.type) {
            case 'input':
                this.inputConfigAdaptor(config);
                Reflect.set(this.attrs, 'placeholder', "\u8BF7\u8F93\u5165" + config.label);
                break;
            case 'inscription':
            case 'search':
            case 'select':
                this.selectConfigAdaptor(config);
                Reflect.set(this.attrs, 'placeholder', "\u8BF7\u9009\u62E9" + config.label);
                break;
            case 'status':
            case 'tag':
                this.tagConfigAdaptor(config);
                break;
        }
    }
    CxControlConfig.prototype.tagConfigAdaptor = function (config) {
        var _a, _b;
        var statusMap = Object.entries((_b = (_a = config.control) === null || _a === void 0 ? void 0 : _a.statusMap) !== null && _b !== void 0 ? _b : {}).reduce(function (res, _a) {
            var _b = __read(_a, 2), key = _b[0], val = _b[1];
            res[key] = __assign({}, val);
            return res;
        }, {});
        Reflect.set(this, 'statusMap', statusMap);
    };
    // 文本输入框配置项
    CxControlConfig.prototype.inputConfigAdaptor = function (config) {
        var _this = this;
        var control = config.control, influenced = config.influenced, sideEffect = config.sideEffect, prop = config.prop;
        if (!control)
            return;
        isNumber(control.maxLength) && Reflect.set(this.attrs, 'maxlength', control.maxLength);
        control.showWordLimit && Reflect.set(this.attrs, 'showWordLimit', control.showWordLimit);
        influenced &&
            (this.attrs.broadcastRegister = function (register) {
                _this.influencedRegister(register, config);
            });
        sideEffect &&
            Reflect.set(this.attrs, 'onChange', function (val, rowData) {
                _this.sideEffectHandle(prop, rowData, sideEffect);
            });
    };
    // 单选框配置项
    CxControlConfig.prototype.selectConfigAdaptor = function (config) {
        var _this = this;
        var prop = config.prop, control = config.control, influenced = config.influenced, sideEffect = config.sideEffect;
        if (!control)
            return;
        control.showWordLimit && Reflect.set(this.attrs, 'showWordLimit', control.showWordLimit);
        control.source && Reflect.set(this.attrs, 'source', control.source);
        control.sourceColumnId && Reflect.set(this.attrs, 'sourceColumnId', control.sourceColumnId);
        control.sourceColumnProp && Reflect.set(this.attrs, 'sourceColumnProp', control.sourceColumnProp);
        control.sourceColumnListId && Reflect.set(this.attrs, 'sourceColumnListId', control.sourceColumnListId);
        var currentOption = [];
        if (Array.isArray(control.options)) {
            Reflect.set(this, 'options', (currentOption = control.options));
        }
        else if (isObject$1(control.options)) {
            Reflect.set(this, 'options', function (_a) {
                var _b;
                var rowData = _a.rowData;
                return (currentOption = calcInnerOptions((_b = control === null || control === void 0 ? void 0 : control.options) !== null && _b !== void 0 ? _b : [], rowData));
            });
        }
        else if (isFunction(control.options)) {
            Reflect.set(this, 'options', function (params) {
                return (currentOption = control.options(params));
            });
        }
        // 选项唯一
        if (control.exclusion) {
            var oldValMap_1 = new WeakMap();
            // 将特定逻辑注册至广播接收器
            this.attrs.broadcastRegister = function (register) {
                var _a;
                // 删除事件的广播
                register('nativeDelete', function (params) {
                    var option = currentOption.find(function (item) { return item.id === params.rowData[prop]; });
                    option && Reflect.set(option, 'disabled', false);
                });
                // options依赖项发生改变时清空该列数据
                var deps = getOptionsDeps((_a = control === null || control === void 0 ? void 0 : control.options) !== null && _a !== void 0 ? _a : []);
                var cb = function (params) {
                    Reflect.set(params.rowData, prop, '');
                    Reflect.set(params.rowData, prop + 'Text', '');
                };
                deps.forEach(function (dep) { return register(dep, cb); });
                // 注册influenced
                influenced && _this.influencedRegister(register, config);
            };
            Reflect.set(this.attrs, 'onChange', function (val, rowData) {
                var oldVal = oldValMap_1.get(rowData);
                var oldItem = currentOption.find(function (item) { return item.id === oldVal; });
                oldItem && Reflect.set(oldItem, 'disabled', false);
                oldValMap_1.set(rowData, val);
                var currentItem = currentOption.find(function (item) { return item.id === val; });
                currentItem && Reflect.set(currentItem, 'disabled', true);
                sideEffect && _this.sideEffectHandle(prop, rowData, sideEffect);
            });
        }
        else {
            sideEffect &&
                Reflect.set(this.attrs, 'onChange', function (val, rowData) {
                    sideEffect && _this.sideEffectHandle(prop, rowData, sideEffect);
                });
        }
    };
    // 将influenced中的项注册至广播接收器
    CxControlConfig.prototype.influencedRegister = function (register, config) {
        if (typeof config.influenced === 'object') {
            var _a = config.influenced, rule_1 = _a.rule, type_1 = _a.type;
            if (!rule_1 || !type_1)
                return;
            var depends = getStringDepends(rule_1);
            depends.forEach(function (prop) {
                if (type_1 === 'equal') {
                    register(prop, function (params) {
                        Reflect.set(params.rowData, config.prop, getEvalResult(rule_1, params.rowData, true));
                    });
                }
            });
        }
    };
    // 副作用处理
    CxControlConfig.prototype.sideEffectHandle = function (prop, rowData, sideEffect) {
        if (typeof sideEffect !== 'object')
            return;
        Object.entries(sideEffect).forEach(function (_a) {
            var _b = __read(_a, 2); _b[0]; _b[1];
        });
    };
    return CxControlConfig;
}());

var onInits$1 = [];
var onOutputs$1 = [];
var CxConfigAdaptor = /** @class */ (function () {
    function CxConfigAdaptor(config) {
        this.basicColumn = { prop: '', label: '' };
        var configDuplicate = onInits$1.reduce(function (res, hook) { return (isFunction(hook) ? hook(res) : res); }, R.clone(config));
        this.staticConfigAdaptor(configDuplicate)
            .dynamicConfigAdaptor(configDuplicate)
            .controlAdaptor(configDuplicate)
            .childrenAdaptor(configDuplicate);
    }
    CxConfigAdaptor.use = function (plugin) {
        var onInit = plugin.onInit, onOutput = plugin.onOutput;
        isFunction(onInit) && onInits$1.push(onInit);
        isFunction(onOutput) && onOutputs$1.push(onOutput);
        return this;
    };
    CxConfigAdaptor.prototype.getColumn = function () {
        if (onOutputs$1.length === 0)
            return this.basicColumn;
        return onOutputs$1.reduce(function (res, hook) { return (isFunction(hook) ? hook(res) : res); }, R.clone(this.basicColumn));
    };
    CxConfigAdaptor.of = function (config) {
        return new CxConfigAdaptor(config).getColumn();
    };
    // children处理
    CxConfigAdaptor.prototype.childrenAdaptor = function (config) {
        var _a;
        if ((_a = config.children) === null || _a === void 0 ? void 0 : _a.length) {
            this.basicColumn.children = config.children.map(CxConfigAdaptor.of);
        }
        return this;
    };
    // 静态部分
    CxConfigAdaptor.prototype.staticConfigAdaptor = function (config) {
        var _this = this;
        staticConfigList.forEach(function (key) { return Reflect.set(_this.basicColumn, key, config[key]); });
        return this;
    };
    // 动态部分
    CxConfigAdaptor.prototype.dynamicConfigAdaptor = function (config) {
        var _this = this;
        var _a;
        if (config.calculate) {
            this.basicColumn.calculate = function (rowData) {
                var result = calcInvoker(config.calculate, _this.basicColumn)(rowData);
                return isNumber(config.accuracy) ? decimalFixed(result, config.accuracy, true) : result;
            };
        }
        if (config.sum) {
            var sumMap = { 1: 'add' };
            Reflect.set(this.basicColumn, 'sum', (_a = sumMap[config.sum]) !== null && _a !== void 0 ? _a : config.sum);
        }
        if (Array.isArray(config.validator)) {
            this.basicColumn.validator = function (params) {
                var _a;
                var result;
                (_a = config.validator) === null || _a === void 0 ? void 0 : _a.some(function (validator) {
                    var validates = validator.rule && validator.msg
                        ? [validator]
                        : calcInnerValidator(validator, params.rowData);
                    if (!(validates === null || validates === void 0 ? void 0 : validates.length))
                        return;
                    validates.some(function (valid) {
                        var _a;
                        if (!getEvalResult(valid.rule, params.rowData)) {
                            return (result = getTemplateResult((_a = valid === null || valid === void 0 ? void 0 : valid.msg) !== null && _a !== void 0 ? _a : '', params.rowData));
                        }
                    });
                });
                return result;
            };
        }
        return this;
    };
    // 控件部分
    CxConfigAdaptor.prototype.controlAdaptor = function (config) {
        config.control && Reflect.set(this.basicColumn, 'control', new CxControlConfig(config));
        return this;
    };
    return CxConfigAdaptor;
}());

var onInits = [];
var onOutputs = [];
var FormConfigAdaptor$1 = /** @class */ (function () {
    function FormConfigAdaptor(config) {
        this.__items = {
            label: '',
            prop: '',
            closable: true,
            register: []
        };
        var configDuplicate = onInits.reduce(function (res, hook) { return (R.is(Function, hook) ? hook(res) : res); }, R.clone(config));
        this.adaptor(configDuplicate);
    }
    FormConfigAdaptor.use = function (plugin) {
        // push::a->a[]->number
        var push = R.curry(function (arr, item) { return arr.push(item); });
        // updateHooks::object a=>a[]->string->object->Maybe b
        var updateHooks = function (source, key) {
            // map::Maybe->a
            var MaybeMap = map(R.ifElse(R.is(Function), push(source), R.identity));
            return R.compose(MaybeMap, Maybe.of, R.prop(key));
        };
        updateHooks(onInits, 'onInit')(plugin);
        updateHooks(onOutputs, 'onOutput')(plugin);
    };
    FormConfigAdaptor.prototype.getItems = function () {
        return onOutputs.reduce(function (res, hook) { return (R.is(Function, hook) ? hook(res) : res); }, R.clone(this.__items));
    };
    FormConfigAdaptor.of = function (config) {
        return new FormConfigAdaptor(config).getItems();
    };
    FormConfigAdaptor.prototype.adaptor = function (config) {
        var _this = this;
        var _a, _b, _c;
        // 静态部分
        ['label', 'prop'].forEach(function (key) { return unsafeSet(_this.__items, key, config[key]); });
        // 动态部分
        var searchStates = R.prop('searchStates', config);
        // options
        Maybe.of(searchStates.dynamicSearchOptions).map(unsafeSet(searchStates, 'searchOptions'));
        var controlConfig = {};
        Reflect.set(this.__items, (_a = searchStates.searchType) !== null && _a !== void 0 ? _a : 'input', controlConfig);
        R.equals('input', searchStates.searchType) && unsafeSet(controlConfig, 'searchIcon', false);
        // options::NameWithId a=>object->a[]
        var options = R.curryN(2, R.compose(R.prepend({ name: '全部', id: -1 }), calcInnerOptions))((_b = searchStates.searchOptions) !== null && _b !== void 0 ? _b : []);
        if (Array.isArray(searchStates.searchOptions)) {
            Reflect.set(controlConfig, 'options', options(searchStates.searchOptions));
        }
        else if (isObject$1(searchStates.searchOptions)) {
            Reflect.set(controlConfig, 'options', R.compose(options, R.prop('form')));
        }
        else if (isFunction(searchStates.searchOptions)) {
            Reflect.set(controlConfig, 'options', function (payload) { return searchStates.searchOptions(payload); });
        }
        searchStates.searchSourceId &&
            (Reflect.set(controlConfig, 'sourceId', searchStates.searchSourceId),
                Reflect.set(controlConfig, 'useCache', true));
        searchStates.searchColumnProp && Reflect.set(controlConfig, 'relyProp', searchStates.searchColumnProp);
        searchStates.searchColumnListId && Reflect.set(controlConfig, 'relyOn', searchStates.searchColumnListId);
        // options依赖项发生改变时清空该列数据 TODO
        var deps = getOptionsDeps((_c = searchStates.searchOptions) !== null && _c !== void 0 ? _c : []);
        var cb = unsafeDeleteProperty(R.__, this.__items.prop);
        this.__items.register = deps.map(R.compose(unsafeSet(R.__, 'cb', cb), R.objOf('dep')));
    };
    return FormConfigAdaptor;
}());

//格式化条码
function formatBarcode(str) {
    var code = str;
    if (code.length >= 12) {
        code = Number(code.substr(0, code.length - 1));
        if (!isNaN(code)) {
            return code.toString();
        }
    }
    return str;
}
var dataInitPlugin = {
    onOutput: function (config) {
        if (config.label === '生产单号') {
            config.onChange = function (_a) {
                var prop = _a.prop, form = _a.form;
                form[prop] = formatBarcode(form[prop]);
            };
        }
        return config;
    }
};

FormConfigAdaptor$1.use(dataInitPlugin);
var FormConfigAdaptor = FormConfigAdaptor$1;

var useCxTableCompose = function () {
    // getAllSearchableColumn::CxTableDynamicColumn a=>a[]->a[]
    var getAllSearchableColumn = R.compose(R.filter(R.compose(R.is(Object), unsafeGet(R.__, 'searchStates'))), arrFlat);
    var getDefaultFormItem = R.compose(R.map(R.prop('prop')), R.filter(R.compose(truthy, R.path(['jsonData', 'defaultFormItem']))), getAllSearchableColumn);
    // getSearchableFormConfig::CxTableDynamicColumn[]->CxFormItemConfig[]
    var getSearchableFormConfig = R.compose(R.map(FormConfigAdaptor.of), getAllSearchableColumn);
    // column2NameWithId::CxTableDynamicColumn[]->NameWithId[]
    var column2NameWithId = R.compose(R.zipObj(['id', 'name']), R.props(['prop', 'label']));
    // search2sourceSelect
    var search2sourceSelect = R.compose(R.dissoc('search'), R.converge(R.assoc('sourceSelect'), [R.prop('search'), R.identity]));
    // getOptionListFromColumn::CxTableDynamicColumn[]->Option[]
    var getOptionListFromColumn = R.compose(R.map(column2NameWithId), getAllSearchableColumn);
    // getCurrentFormConfig::CxTableDynamicColumn[]->string[]->CxFormItemConfig[]
    var getCurrentFormConfig = function (columns, currentItems) {
        var itemList = getSearchableFormConfig(columns);
        return R.compose(R.append({ label: '', prop: 'add', custom: { slot: 'add' } }), R.reduce(function (res, prop) {
            return R.compose(R.ifElse(R.isNil, R.always(res), R.compose(R.flip(R.append)(res))), search2sourceSelect, R.find(R.propEq('prop', prop)))(itemList);
        }, []))(currentItems);
    };
    // isEmptyValue::a->boolean
    var isEmptyValue = R.anyPass([
        R.isNil,
        R.equals(-1),
        R.equals(''),
        R.ifElse(R.is(Array), R.compose(R.equals(0), R.length), R.F)
    ]);
    // isRenderInTeleport::object->boolean
    var isRenderInTeleport = R.allPass([R.prop('formTeleport')]);
    // formValueFormat::a->object
    var formValueFormat = R.ifElse(Array.isArray, R.compose(R.zipObj(['val1', 'val2']), R.props(['0', '1'])), R.objOf('value'));
    // arrayIsNotEmpty::array a=>a->boolean
    var arrayIsNotEmpty = R.compose(R.gt(R.__, 0), R.length);
    // isPositive::number->boolean
    var isPositive = R.gte(R.__, 0);
    // getDynamicKeyPair::Object a=>a->{DynamicKey,any}[]
    var getDynamicKeyPair = R.compose(R.toPairs, R.omit(['config', 'api', 'requestInstance']));
    // splatEq::a->b->boolean
    var splatEq = splat(R.equals);
    // statesProp::CxDynamicItem a->Object|undefined
    var statesProp = R.prop('searchStates');
    // statesDefault::CxDynamicItem a->string|undefined
    var statesDefault = R.compose(R.prop('searchDefault'), statesProp);
    // getTargetColumnDefault::CxTableDynamicColumn a->Maybe any
    var getTargetColumnDefault = R.ifElse(R.compose(truthy, statesDefault), R.compose(Maybe.of, R.converge(formatFormDefaultValue, [
        statesDefault,
        R.compose(R.prop('searchType'), statesProp)
    ])), Maybe.none);
    // getParamsItems::Object->string[]->ParamsItem[]
    var getParamsItems = function (form, currentFormItems) {
        if (!form || !currentFormItems)
            return [];
        return currentFormItems.reduce(function (res, prop) {
            return Maybe.of(form[prop])
                .map(R.ifElse(R.compose(R.not, isEmptyValue), R.compose(unsafePush(R.__, res), R.of, R.mergeRight(R.objOf('prop', R.replace(/Text|Name$/, 'Id', prop))), formValueFormat), R.always(res)))
                .getWithDefault(res);
        }, []);
    };
    // innerBracket::string->string
    var innerBracket = R.compose(R.join(''), R.prepend('('), R.append(')'), R.of);
    var multiRuleWarn = R.curryN(2, unsafeWhenDevCall(function (rules, dynamic) {
        if (rules.length > 1) {
            cxTableWarn("matched " + R.length(rules) + " rule ", rules, "  by config ", changeDynamicIdToText(dynamic), "");
        }
    }));
    var getConfigByDynamicConfig = function (dynamic, rules) {
        return Maybe.run((function () {
            var ruleList, compareDynamicProp, fitCurrentDynamic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Maybe.of(rules)];
                    case 1:
                        ruleList = _a.sent();
                        compareDynamicProp = R.compose(splatEq, R.adjust(0, R.prop(R.__, dynamic)));
                        fitCurrentDynamic = R.compose(R.all(compareDynamicProp), getDynamicKeyPair);
                        return [2 /*return*/, R.compose(R.head, R.tap(multiRuleWarn(R.__, dynamic)), R.filter(fitCurrentDynamic))(ruleList)];
                }
            });
        })());
    };
    // arrNotEmpty::a[]->boolean
    var arrNotEmpty = R.compose(truthy, R.length);
    return {
        arrNotEmpty: arrNotEmpty,
        multiRuleWarn: multiRuleWarn,
        getConfigByDynamicConfig: getConfigByDynamicConfig,
        search2sourceSelect: search2sourceSelect,
        getDefaultFormItem: getDefaultFormItem,
        innerBracket: innerBracket,
        getAllSearchableColumn: getAllSearchableColumn,
        getTargetColumnDefault: getTargetColumnDefault,
        getDynamicKeyPair: getDynamicKeyPair,
        getSearchableFormConfig: getSearchableFormConfig,
        column2NameWithId: column2NameWithId,
        isEmptyValue: isEmptyValue,
        isPositive: isPositive,
        splatEq: splatEq,
        arrayIsNotEmpty: arrayIsNotEmpty,
        formValueFormat: formValueFormat,
        getOptionListFromColumn: getOptionListFromColumn,
        getCurrentFormConfig: getCurrentFormConfig,
        isRenderInTeleport: isRenderInTeleport,
        getParamsItems: getParamsItems
    };
};

var registResponsive = function (wrapper, callbacks) {
    onMounted(function () {
        if (observer) {
            observer.observe(document, {
                attributes: true,
                subtree: true,
                childList: true,
                characterData: true
            });
        }
        else {
            window.addEventListener('resize', updateWidth);
        }
    });
    onBeforeUnmount(function () {
        if (observer) {
            observer.disconnect();
        }
        else {
            window.removeEventListener('resize', updateWidth);
        }
    });
    var recordOldWidth = '0';
    var updateWidth = debounce$1(function () { return __awaiter(void 0, void 0, void 0, function () {
        var width;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nextTick()];
                case 1:
                    _a.sent();
                    if (!wrapper.value)
                        return [2 /*return*/];
                    width = getComputedStyle(wrapper.value).getPropertyValue('width');
                    if (width === recordOldWidth)
                        return [2 /*return*/];
                    recordOldWidth = width;
                    callbacks.forEach(function (cb) { return cb(); });
                    return [2 /*return*/];
            }
        });
    }); }, 100);
    var MutationObserver = window.MutationObserver;
    var supportMutation = typeof MutationObserver !== undefined;
    var observer = null;
    if (supportMutation) {
        observer = new MutationObserver(updateWidth);
    }
};
var scrollUpdateVisualScroll = function ($CxTable, props) {
    if (props.virtualScroll) {
        var wrapperEle = $CxTable.wrapperEle;
        if (!wrapperEle)
            return;
        var virtualStore = $CxTable.virtualStore, styleStore = $CxTable.styleStore;
        var scrollTop = wrapperEle.scrollTop, clientHeight = wrapperEle.clientHeight;
        var CX_TABLE_HEIGHT = styleStore.CX_TABLE_HEIGHT, CX_VISUAL_CACHE = styleStore.CX_VISUAL_CACHE;
        var appendNum = +!!props.showTotalSum;
        var rowNum = props.tableData.length + appendNum;
        var renderStartIndex = Math.max(0, Math.floor(scrollTop / CX_TABLE_HEIGHT) - CX_VISUAL_CACHE);
        var topRowSpanPrepend = 0;
        if (props.spanMethod) {
            while (renderStartIndex > 0 &&
                virtualStore.rowSpanMap[renderStartIndex] & CX_SPAN_METHOD_TYPE.MISSING) {
                topRowSpanPrepend++;
                renderStartIndex--;
            }
        }
        var renderLength = Math.ceil(clientHeight / CX_TABLE_HEIGHT) + CX_VISUAL_CACHE * 2 + topRowSpanPrepend;
        if (props.spanMethod) {
            var startBrokenFlag = virtualStore.rowSpanMap[renderStartIndex + renderLength] & CX_SPAN_METHOD_TYPE.EXTEND;
            if (startBrokenFlag && renderStartIndex + renderLength < rowNum)
                renderLength++;
            while (renderStartIndex + renderLength < rowNum &&
                virtualStore.rowSpanMap[renderStartIndex + renderLength] & CX_SPAN_METHOD_TYPE.MISSING) {
                renderLength++;
            }
        }
        virtualStore.renderLength = renderLength;
        virtualStore.renderStartIndex = renderStartIndex;
        virtualStore.renderEndIndex = Math.min(rowNum, renderStartIndex + renderLength);
        virtualStore.renderPaddingTop = renderStartIndex * CX_TABLE_HEIGHT;
        virtualStore.renderPaddingBottom = (rowNum - virtualStore.renderEndIndex) * CX_TABLE_HEIGHT;
    }
};
var scrollUpdateShadow = function ($CxTable) {
    var wrapperEle = $CxTable.wrapperEle, scrollStore = $CxTable.scrollStore;
    if (!wrapperEle)
        return;
    var scrollLeft = wrapperEle.scrollLeft, scrollWidth = wrapperEle.scrollWidth, scrollHeight = wrapperEle.scrollHeight, scrollTop = wrapperEle.scrollTop, clientWidth = wrapperEle.clientWidth, clientHeight = wrapperEle.clientHeight;
    scrollStore.scrollLeft = scrollLeft;
    scrollStore.scrollTop = scrollTop;
    scrollStore.showLeftShadow = scrollLeft !== 0;
    scrollStore.showTopShadow = scrollTop !== 0;
    // 当屏幕缩放比不是整十数时,会出现scrollLeft为小数的情况,此时如果以严格等于0去计算样式会出现问题
    scrollStore.showRightShadow = scrollWidth - clientWidth - scrollLeft >= 1;
    scrollStore.showBottomShadow = scrollHeight - clientHeight - scrollTop >= 1;
};
var wrapperScrollEventHandle = function ($CxTable, props) {
    var throttleVisual = throttle(scrollUpdateVisualScroll, 100, { leading: true, trailing: true });
    var throttleShadow = throttle(scrollUpdateShadow, 20, { leading: true, trailing: true });
    throttleShadow($CxTable);
    throttleVisual($CxTable, props);
};
var registScrollEvent = function ($CxTable, props) {
    onMounted(function () {
        var wrapperEle = $CxTable.wrapperEle;
        if (!wrapperEle)
            return;
        wrapperEle.onscroll = function () { return wrapperScrollEventHandle($CxTable, props); };
        setTimeout(function () { return wrapperScrollEventHandle($CxTable, props); });
    });
};
var registCellEvent = function ($CxTable, props) {
    var onClick = function (event) {
        var _a, _b, _c, _d;
        var td = event.currentTarget;
        var ele = event.target;
        if (ele.nodeName === 'INPUT')
            return true;
        // 兼容el-checkbox的写法
        if (ele.classList.contains('el-checkbox__inner'))
            return true;
        var editStore = $CxTable.editStore, scrollStore = $CxTable.scrollStore, wrapperEle = $CxTable.wrapperEle, columnStore = $CxTable.columnStore;
        var actived = editStore.actived;
        var centerColumns = columnStore.centerColumns;
        actived.column = props.column;
        actived.rowData = props.rowData;
        editStore.activedCell = td;
        editStore.activedControl = null;
        var targetTd = td;
        if (((_a = props.column) === null || _a === void 0 ? void 0 : _a.fixed) === 'left') {
            targetTd = (_b = domShare.getCell($CxTable, centerColumns[0], actived.rowData)) !== null && _b !== void 0 ? _b : td;
        }
        else if (((_c = props.column) === null || _c === void 0 ? void 0 : _c.fixed) === 'right') {
            targetTd =
                (_d = domShare.getCell($CxTable, centerColumns[centerColumns.length - 1], actived.rowData)) !== null && _d !== void 0 ? _d : td;
        }
        domShare.scrollToTd(targetTd, wrapperEle, scrollStore.leftFixedWidth, scrollStore.rightFixedWidth, scrollStore.topFixedHeight);
    };
    return { onClick: onClick };
};
var registMouseEvent = function ($CxTable) {
    onMounted(function () {
        var wrapperEle = $CxTable.wrapperEle;
        if (!wrapperEle)
            return;
        wrapperEle.onmousemove = throttle(function (event) {
            var target = domShare.getAncestor(event.target, 'TR');
            if (target) {
                var tid = target.getAttribute('rowid');
                if ($CxTable.hoveringRowid !== tid) {
                    $CxTable.hoveringRowid = tid ? tid : CX_TABLE_NOT_HOVER_ID;
                }
            }
        }, 100, { leading: true, trailing: true });
        wrapperEle.onmouseleave = function () {
            $CxTable.hoveringRowid = CX_TABLE_NOT_HOVER_ID;
        };
    });
};
var registKeyboardEvent = function ($CxTable, props, tableDataVisitor, bus, tid) {
    var isTableActived = false;
    var editStore = $CxTable.editStore, scrollStore = $CxTable.scrollStore;
    var updateActivedCell = function (oldTd) {
        var _a, _b, _c, _d;
        var centerColumns = $CxTable.columnStore.centerColumns;
        var actived = editStore.actived;
        var getCell = domShare.getCell, scrollToTd = domShare.scrollToTd;
        var td = getCell($CxTable, actived.column, actived.rowData) || oldTd;
        editStore.activedCell = td;
        var targetTd = td;
        if (((_a = actived.column) === null || _a === void 0 ? void 0 : _a.fixed) === 'left') {
            targetTd = (_b = getCell($CxTable, centerColumns[0], actived.rowData)) !== null && _b !== void 0 ? _b : td;
        }
        else if (((_c = actived.column) === null || _c === void 0 ? void 0 : _c.fixed) === 'right') {
            targetTd = (_d = getCell($CxTable, centerColumns[centerColumns.length - 1], actived.rowData)) !== null && _d !== void 0 ? _d : td;
        }
        scrollToTd(targetTd, $CxTable.wrapperEle, scrollStore.leftFixedWidth, scrollStore.rightFixedWidth, scrollStore.topFixedHeight);
    };
    var dblclickHandle = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(''); }); })];
                case 1:
                    _a.sent();
                    keydownHandle({ key: ' ', preventDefault: function () { return ({}); } });
                    return [2 /*return*/];
            }
        });
    }); };
    var isEleSelectItem = function (ele) {
        return (ele === null || ele === void 0 ? void 0 : ele.nodeName) === 'LI' && ele.classList.contains('el-select-dropdown__item');
    };
    var clickHandle = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var eventTarget, parentTarget, currentId;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(''); }); })];
                case 1:
                    _b.sent();
                    eventTarget = event.target;
                    parentTarget = eventTarget === null || eventTarget === void 0 ? void 0 : eventTarget.parentElement;
                    // 此逻辑是为了避免element下拉框点击退出的问题
                    if (isEleSelectItem(eventTarget) || isEleSelectItem(parentTarget)) {
                        return [2 /*return*/];
                    }
                    while ((eventTarget = (_a = eventTarget === null || eventTarget === void 0 ? void 0 : eventTarget.parentElement) !== null && _a !== void 0 ? _a : null)) {
                        currentId = eventTarget === null || eventTarget === void 0 ? void 0 : eventTarget.getAttribute('tid');
                        if (currentId && currentId !== tid) {
                            isTableActived = false;
                            break;
                        }
                        isTableActived = currentId === tid;
                        if (isTableActived)
                            break;
                    }
                    if (!isTableActived) {
                        editStore.actived.column = null;
                        editStore.actived.rowData = null;
                        editStore.activedCell = null;
                        editStore.activedControl = null;
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var bindEscapeEvent = function (inputEle, td) {
        inputEle.addEventListener('keydown', function (event) {
            var key = event.key;
            if (key === 'Escape' && event.target) {
                editStore.activedControl = null;
                editStore.activedCell = td !== null && td !== void 0 ? td : null;
            }
        });
    };
    var inputActiveHandle = function (inputEle, td) {
        var _a, _b;
        inputEle.focus();
        if (inputEle.type === 'checkbox') {
            var parent_1 = inputEle.parentNode;
            if ((_a = parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.classList) === null || _a === void 0 ? void 0 : _a.contains('is-checked')) {
                (_b = parent_1.click) === null || _b === void 0 ? void 0 : _b.call(parent_1);
            }
        }
        else {
            inputEle.click();
        }
        bindEscapeEvent(inputEle, td);
    };
    var isSilentCell = function () {
        var _a, _b, _c;
        return (!CxTableActiveControl.has((_b = (_a = $CxTable.editStore.actived.column) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.type) &&
            !((_c = $CxTable.editStore.actived.column) === null || _c === void 0 ? void 0 : _c.slot));
    };
    var keydownEventHandle = throttle(function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var actived, activedCell, flatColumns, key, ctrlKey, target, isTd, isInput, range, selection, column, rowData, prop, control, actived_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isTableActived)
                        return [2 /*return*/];
                    actived = editStore.actived, activedCell = editStore.activedCell;
                    if (!activedCell)
                        return [2 /*return*/];
                    flatColumns = $CxTable.flatColumns;
                    key = event.key, ctrlKey = event.ctrlKey;
                    target = activedCell;
                    isTd = target.nodeName === 'TD';
                    isInput = target.nodeName === 'INPUT';
                    if (!(key === 'Tab')) return [3 /*break*/, 2];
                    if (actived.rowData === tableDataVisitor.sortedData[tableDataVisitor.sortedData.length - 1]) {
                        bus.emit('addNewRow', 'addNewRow');
                    }
                    return [4 /*yield*/, nextTick()];
                case 1:
                    _a.sent();
                    editStore.activedControl = null;
                    actived.rowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'next');
                    updateActivedCell(target);
                    return [2 /*return*/];
                case 2:
                    if (isTd) {
                        if (ctrlKey) {
                            if (key === 'c') {
                                range = document.createRange();
                                range.selectNodeContents(activedCell);
                                selection = window.getSelection();
                                selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                                selection === null || selection === void 0 ? void 0 : selection.addRange(range);
                                document.execCommand('copy');
                            }
                            return [2 /*return*/];
                        }
                        if (key === 'Delete') {
                            if (props.disabled)
                                return [2 /*return*/];
                            column = actived.column, rowData = actived.rowData;
                            if (!column || !rowData)
                                return [2 /*return*/];
                            prop = column.prop, control = column.control;
                            if (!(control === null || control === void 0 ? void 0 : control.type))
                                return [2 /*return*/];
                            if (['search', 'select'].includes(control === null || control === void 0 ? void 0 : control.type)) {
                                Reflect.set(rowData, prop, '');
                                if (control.selectText) {
                                    Reflect.set(rowData, control.selectText, '');
                                }
                                else {
                                    Reflect.set(rowData, getColumnSelectText(column), '');
                                }
                            }
                            if (['input', 'numberInput'].includes(control === null || control === void 0 ? void 0 : control.type)) {
                                Reflect.set(rowData, prop, '');
                            }
                        }
                        else if (key === ARROW_KEY.L) {
                            editStore.activedControl = null;
                            actived.column = getPreOrNextItem(flatColumns, actived.column, 'pre', '_colid');
                            updateActivedCell(target);
                        }
                        else if (key === ARROW_KEY.R) {
                            editStore.activedControl = null;
                            actived.column = getPreOrNextItem(flatColumns, actived.column, 'next', '_colid');
                            updateActivedCell(target);
                        }
                        else if (key === ARROW_KEY.U) {
                            editStore.activedControl = null;
                            actived.rowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'pre');
                            updateActivedCell(target);
                        }
                        else if (key === ARROW_KEY.D) {
                            editStore.activedControl = null;
                            actived.rowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'next');
                            updateActivedCell(target);
                        }
                        else if ((key === ' ' || /[0-9A-Za-z]/.test(key)) && !['Escape', 'Enter'].includes(key)) {
                            if (isSilentCell()) {
                                return [2 /*return*/];
                            }
                            editStore.activedControl = true;
                            setTimeout(function () {
                                var inputEle = domShare.getEle(target, 'input');
                                if (inputEle) {
                                    editStore.activedControl = inputEle;
                                    editStore.activedCell = inputEle;
                                    inputEle.select();
                                    inputActiveHandle(inputEle, target);
                                }
                                else {
                                    editStore.activedControl = null;
                                }
                            });
                        }
                    }
                    else if (isInput) {
                        if (key === 'Escape') {
                            editStore.activedControl = null;
                            actived_1 = $CxTable.editStore.actived;
                            if (actived_1.column && actived_1.rowData) {
                                editStore.activedCell = domShare.getCell($CxTable, actived_1.column, actived_1.rowData);
                            }
                        }
                    }
                    if (key === 'Enter') {
                        requestAnimationFrame(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var nextColumn, nextRowData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        nextColumn = getPreOrNextItem(flatColumns, actived.column, 'next', '_colid');
                                        if (nextColumn === actived.column) {
                                            nextRowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'next');
                                            if (nextRowData === actived.rowData) {
                                                return [2 /*return*/];
                                            }
                                            else {
                                                actived.rowData = nextRowData;
                                                actived.column = flatColumns[0];
                                            }
                                        }
                                        else {
                                            actived.column = nextColumn;
                                        }
                                        updateActivedCell(target);
                                        if (isSilentCell()) {
                                            return [2 /*return*/, (editStore.activedControl = false)];
                                        }
                                        editStore.activedControl = true;
                                        return [4 /*yield*/, nextTick()];
                                    case 1:
                                        _a.sent();
                                        setTimeout(function () {
                                            if (!editStore.activedCell)
                                                return;
                                            var inputEle = domShare.getEle(editStore.activedCell, 'input');
                                            if (inputEle) {
                                                var td = editStore.activedCell;
                                                editStore.activedControl = inputEle;
                                                editStore.activedCell = inputEle;
                                                inputActiveHandle(inputEle, td);
                                            }
                                            else {
                                                editStore.activedControl = false;
                                            }
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, 50, { trailing: true, leading: true });
    var keydownHandle = function (event) {
        var _a;
        var key = event.key;
        var activedCell = editStore.activedCell;
        var isTd = (activedCell === null || activedCell === void 0 ? void 0 : activedCell.nodeName) === 'TD';
        if (isTableActived) {
            if (key === 'Tab' ||
                key === 'Enter' ||
                (key === ' ' && Reflect.get((_a = event.target) !== null && _a !== void 0 ? _a : {}, 'nodeName') !== 'INPUT')) {
                event.preventDefault();
            }
        }
        if (isTd) {
            if (Object.values(ARROW_KEY).includes(key)) {
                event.preventDefault();
            }
        }
        keydownEventHandle(event);
    };
    document.addEventListener('keydown', keydownHandle, true);
    // 以下两个事件顺序不可颠倒,由于需求变化双击事件也修改成了单击事件
    document.addEventListener('click', clickHandle, true);
    document.addEventListener('click', dblclickHandle, true);
    onUnmounted(function () {
        document.removeEventListener('keydown', keydownHandle, true);
        document.removeEventListener('click', clickHandle, true);
        document.removeEventListener('click', dblclickHandle, true);
    });
};
// 全选联动处理
var onSelectItemChange = function (config) {
    if (config.selectItem.length === 0) {
        config.actualAll = config.selectAll = false;
        config.indeterminate = false;
    }
    else {
        if (config.selectItem.every(function (item) { return item; })) {
            config.actualAll = config.selectAll = true;
            config.indeterminate = false;
        }
        else {
            config.actualAll = config.selectAll = false;
            config.indeterminate = config.selectItem.some(function (item) { return item; });
        }
    }
};

var useScrollState = function ($CxTable) {
    var wrapperEle = $CxTable.wrapperEle, scrollStore = $CxTable.scrollStore;
    if (!wrapperEle)
        return;
    setTimeout(function () {
        var clientHeight = wrapperEle.clientHeight, scrollHeight = wrapperEle.scrollHeight, clientWidth = wrapperEle.clientWidth, scrollWidth = wrapperEle.scrollWidth;
        scrollStore.clientHeight = clientHeight;
        scrollStore.clientWidth = clientWidth;
        scrollStore.rightScrollBar = clientHeight < scrollHeight;
        scrollStore.bottomScrollBar = clientWidth < scrollWidth;
    });
};

var useUpdateState = function (props, $CxTable) {
    var updateState = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (props.spanMethod && props.virtualScroll) {
                        useCalcSpanMethod($CxTable, props);
                    }
                    $CxTable.flatColumns.forEach(function (column) {
                        updateCxTableWidth($CxTable, props, column.prop);
                    });
                    useAutoWidth($CxTable);
                    return [4 /*yield*/, nextTick()];
                case 1:
                    _a.sent();
                    scrollUpdateShadow($CxTable);
                    if ($CxTable.wrapperEle) {
                        wrapperScrollEventHandle($CxTable, props);
                        useScrollState($CxTable);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return { updateState: updateState };
};

var cacheMap = {};
var resolveColumns = function (cols, props) { return __awaiter(void 0, void 0, void 0, function () {
    var context, result;
    return __generator(this, function (_a) {
        context = useCxTable().getContext();
        result = __spreadArray(__spreadArray([], __read(context.dynamicInject)), [props.dynamicInject]).reduce(function (res, inject, index) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!isFunction(inject)) return [3 /*break*/, 2];
                        _b = inject;
                        return [4 /*yield*/, res];
                    case 1:
                        _a = _b.apply(void 0, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = res;
                        _c.label = 3;
                    case 3: return [2 /*return*/, _a];
                }
            });
        }); }, Promise.resolve(cols));
        return [2 /*return*/, result];
    });
}); };
var getCxDynamicHead = function (dynamic) { return __awaiter(void 0, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        url = '/header/dynamic';
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var _a, _b;
                var key = JSON.stringify(dynamic);
                var data = sessionStore.get(key, CX_TABLE_DYNAMIC_CACHE);
                if (data === CX_TABLE_CACHE_PENDING) {
                    new Promise(function (innerResolve) {
                        !cacheMap[key] && Reflect.set(cacheMap, key, []);
                        cacheMap[key].push(innerResolve);
                    })
                        .then(resolve)["catch"](reject);
                }
                else if (data) {
                    resolve({ data: data, state: 200, message: '' });
                }
                else {
                    sessionStore.set(key, CX_TABLE_CACHE_PENDING, CX_TABLE_THROTTLE_DURATION, CX_TABLE_DYNAMIC_CACHE);
                    var invalidIndex = CX_TABLE_DYNAMIC_PROPS.findIndex(function (key) {
                        if (!isNumber(Reflect.get(dynamic, key))) {
                            cxTableWarn("dynamic\u53C2\u6570\u4F20\u9012\u9519\u8BEF:" + key + " is not a number");
                            return true;
                        }
                    });
                    if (invalidIndex >= 0) {
                        return reject();
                    }
                    (_b = (_a = useCxTable()) === null || _a === void 0 ? void 0 : _a.getContext()) === null || _b === void 0 ? void 0 : _b.dynamicRequestInstance.get(url, __assign(__assign({}, dynamic), { random: Math.random() })).then(resolve)["catch"](reject);
                }
            })];
    });
}); };
var filterOnlyFormItem = function (cols) {
    return cols.filter(function (col) {
        var _a;
        if (Array.isArray(col.children)) {
            col.children = filterOnlyFormItem(col.children);
        }
        return !((_a = col.jsonData) === null || _a === void 0 ? void 0 : _a.onlyForm);
    });
};
var useDynamicConfig = function (props, $CxTable, emit) {
    var columnProxy = ref([]);
    var dynamicColumn = ref([]);
    var loading = ref(false);
    var updateState = useUpdateState(props, $CxTable).updateState;
    var forceUpdate = debounce$1(function (isDynamicChange) {
        if (isDynamicChange === void 0) { isDynamicChange = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            var key_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isObject$1(props.dynamic)) return [3 /*break*/, 1];
                        loading.value = true;
                        key_1 = JSON.stringify(props.dynamic);
                        getCxDynamicHead(props.dynamic)
                            .then(function (_a) {
                            var data = _a.data;
                            return __awaiter(void 0, void 0, void 0, function () {
                                var duplicate_1, tableItems, copy;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!Array.isArray(data)) return [3 /*break*/, 2];
                                            sessionStore.set(key_1, data, CX_TABLE_THROTTLE_DURATION, CX_TABLE_DYNAMIC_CACHE);
                                            if (Array.isArray(cacheMap[key_1])) {
                                                duplicate_1 = R.clone(data);
                                                cacheMap[key_1].forEach(function (resolve) {
                                                    resolve({ data: duplicate_1, state: 200, message: '' });
                                                });
                                                Reflect.deleteProperty(cacheMap, key_1);
                                            }
                                            tableItems = data.map(CxConfigAdaptor.of);
                                            copy = R.clone(tableItems);
                                            return [4 /*yield*/, resolveColumns(tableItems, props)];
                                        case 1:
                                            tableItems = _b.sent();
                                            dynamicColumn.value = copy;
                                            columnProxy.value = filterOnlyFormItem(tableItems);
                                            useColumn($CxTable, columnProxy, props);
                                            useColumnValidity($CxTable);
                                            updateState();
                                            _b.label = 2;
                                        case 2: return [4 /*yield*/, nextTick()];
                                        case 3:
                                            _b.sent();
                                            emit('columnUpdate');
                                            isDynamicChange && emit('dynamicUpdate');
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })["finally"](function () {
                            loading.value = false;
                            var data = sessionStore.get(key_1, CX_TABLE_DYNAMIC_CACHE);
                            if (data === CX_TABLE_CACHE_PENDING) {
                                sessionStore.remove(key_1, CX_TABLE_DYNAMIC_CACHE);
                            }
                            if (Array.isArray(cacheMap[key_1])) {
                                cacheMap[key_1].forEach(function (resolve) {
                                    resolve({ data: R.clone(data), state: 200, message: '' });
                                });
                            }
                            Reflect.deleteProperty(cacheMap, key_1);
                        });
                        return [3 /*break*/, 3];
                    case 1:
                        _a = columnProxy;
                        return [4 /*yield*/, resolveColumns(R.clone(props.tableConfig.items), props)];
                    case 2:
                        _a.value = _b.sent();
                        useColumn($CxTable, columnProxy, props);
                        useColumnValidity($CxTable);
                        updateState();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }, 300);
    if (isObject$1(props.dynamic)) {
        watch(function () { return props.dynamic; }, R.converge(forceUpdate, [R.T]), { deep: true, immediate: true });
    }
    else {
        watch(function () { return props.tableConfig.items; }, R.converge(forceUpdate, [R.F]), {
            deep: true,
            immediate: true
        });
    }
    return { columnProxy: columnProxy, loading: loading, forceUpdate: forceUpdate, dynamicColumn: dynamicColumn };
};

var useExpandConfig = function () {
    var expandConfig = reactive([]);
    var clearExpand = function () {
        expandConfig.splice(0);
    };
    var setExpand = function (index, val) {
        Reflect.set(expandConfig, index, val);
    };
    return { expandConfig: expandConfig, clearExpand: clearExpand, setExpand: setExpand };
};

var useLazyLoad = function (ele, tableVisible) {
    if (!IntersectionObserver) {
        tableVisible.value = true;
    }
    var observer = new IntersectionObserver(function (entries) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (tableVisible.value)
                        return [2 /*return*/];
                    return [4 /*yield*/, nextTick()];
                case 1:
                    _b.sent();
                    tableVisible.value = Reflect.get((_a = entries === null || entries === void 0 ? void 0 : entries[0]) !== null && _a !== void 0 ? _a : { isIntersecting: true }, 'isIntersecting');
                    return [2 /*return*/];
            }
        });
    }); });
    observer.observe(ele);
    onUnmounted(function () {
        observer.disconnect();
    });
};

var usePriorityConfig = function (_a) {
    var priorityColumnMap = _a.priorityColumnMap;
    var onSetConfig = [];
    var flushDone = debounce$1(function () {
        onSetConfig.forEach(function (cb) { return cb(); });
    }, 0);
    var setConfig = function (prop, config) {
        var _a;
        if (!config || !isObject$1(config))
            throw new TypeError('config must be a object');
        var old = (_a = priorityColumnMap.get(prop)) !== null && _a !== void 0 ? _a : {};
        deepMerge(old, config);
        priorityColumnMap.set(prop, old);
        flushDone();
    };
    var clearConfig = function () {
        priorityColumnMap.clear();
    };
    var removeConfig = function (prop) {
        priorityColumnMap["delete"](prop);
    };
    return { setConfig: setConfig, removeConfig: removeConfig, clearConfig: clearConfig, onSetConfig: onSetConfig };
};

var useRadioConfig = function (emit) {
    var radioValue = ref(-1);
    watch(function () { return radioValue.value; }, function (val) {
        emit('radioChange', val);
    });
    var removeRadio = function () {
        radioValue.value = -1;
    };
    var setRadio = function (val) {
        radioValue.value = val;
    };
    var getRadio = function () {
        return radioValue.value;
    };
    return { radioValue: radioValue, removeRadio: removeRadio, setRadio: setRadio, getRadio: getRadio };
};

var useRegister = function ($CxTable, props, tableDataVisitor, tableWrapper, bus, tid) {
    registMouseEvent($CxTable);
    registScrollEvent($CxTable, props);
    props.keyboard && registKeyboardEvent($CxTable, props, tableDataVisitor, bus, tid);
    registResponsive(tableWrapper, [
        function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nextTick()];
                    case 1:
                        _a.sent();
                        useAutoWidth($CxTable);
                        return [4 /*yield*/, nextTick()];
                    case 2:
                        _a.sent();
                        wrapperScrollEventHandle($CxTable, props);
                        return [4 /*yield*/, nextTick()];
                    case 3:
                        _a.sent();
                        useScrollState($CxTable);
                        return [2 /*return*/];
                }
            });
        }); }
    ]);
};

var useSelectConfig = function (tableDataVisitor, emit) {
    var selectConfig = reactive({
        selectAll: false,
        actualAll: false,
        indeterminate: false,
        selectItem: [],
        disabled: false,
        checkSelect: void 0,
        disabledItem: []
    });
    watch(function () { return tableDataVisitor.sortedData.length; }, function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    selectConfig.selectItem.length = tableDataVisitor.sortedData.length;
                    selectConfig.actualAll = false;
                    (_a = tableDataVisitor.sortedData) === null || _a === void 0 ? void 0 : _a.forEach(function (row, index) {
                        selectConfig.selectItem[index] = !!selectConfig.selectItem[index];
                    });
                    return [4 /*yield*/, nextTick()];
                case 1:
                    _c.sent();
                    selectConfig.disabledItem.length = 0;
                    (_b = tableDataVisitor.sortedData) === null || _b === void 0 ? void 0 : _b.forEach(function (row) {
                        var _a;
                        selectConfig.disabledItem.push(isFunction(selectConfig.checkSelect) && !!((_a = selectConfig.checkSelect) === null || _a === void 0 ? void 0 : _a.call(selectConfig, row)));
                    });
                    return [2 /*return*/];
            }
        });
    }); }, { immediate: true });
    var updateSelectAllStatus = function () {
        selectConfig.selectAll = selectConfig.selectItem.every(function (item) { return item; });
        selectConfig.indeterminate =
            !selectConfig.selectAll && selectConfig.selectItem.some(function (item) { return item; });
    };
    var updateSelectConfig = function () {
        var checkedList = [];
        var unCheckList = [];
        selectConfig.selectItem.forEach(function (item, index) {
            if (!tableDataVisitor.sortedData[index])
                return;
            (item ? checkedList : unCheckList).push({ index: index, row: tableDataVisitor.sortedData[index] });
        });
        onSelectItemChange(selectConfig);
        emit('selectChange', { checkedList: checkedList, unCheckList: unCheckList });
    };
    watch(function () { return selectConfig.selectItem; }, updateSelectConfig, { deep: true, immediate: false });
    var clearSelection = function () {
        toggleAllSelection(false);
    };
    var toggleRowSelection = function (index, state) {
        var disabledItem = selectConfig.disabledItem;
        selectConfig.actualAll = !selectConfig.selectItem.some(function (selectVal, index) { return !disabledItem[index] && selectVal; });
        selectConfig.selectItem[index] = state !== null && state !== void 0 ? state : !selectConfig.selectItem[index];
        updateSelectAllStatus();
    };
    var toggleAllSelection = function (state) {
        if (state && !selectConfig.actualAll) {
            selectConfig.actualAll = true;
        }
        else if (selectConfig.actualAll && state) {
            selectConfig.actualAll = state = false;
        }
        else if (!state) {
            selectConfig.actualAll = false;
        }
        var items = __spreadArray([], __read(selectConfig.selectItem));
        selectConfig.selectItem = selectConfig.disabledItem.map(function (bool, index) {
            return bool ? items[index] : state;
        });
        updateSelectAllStatus();
    };
    var getSelectValue = function () {
        return selectConfig.selectItem;
    };
    var setSelectDisabled = function (val) {
        selectConfig.disabled = val;
    };
    var getSelectAllValue = function () {
        return selectConfig.selectAll;
    };
    var setCheckSelect = function (cb) {
        selectConfig.checkSelect = cb;
    };
    return {
        selectConfig: selectConfig,
        setCheckSelect: setCheckSelect,
        updateSelectConfig: updateSelectConfig,
        clearSelection: clearSelection,
        setSelectDisabled: setSelectDisabled,
        toggleRowSelection: toggleRowSelection,
        toggleAllSelection: toggleAllSelection,
        getSelectValue: getSelectValue,
        getSelectAllValue: getSelectAllValue
    };
};

var useTableClass = function (props, CxTable) {
    return computed(function () {
        var result = [];
        if (props.fixed) {
            var scrollStore = CxTable.scrollStore;
            var showLeftShadow = scrollStore.showLeftShadow, showRightShadow = scrollStore.showRightShadow, showTopShadow = scrollStore.showTopShadow, showBottomShadow = scrollStore.showBottomShadow;
            result.push("cx-table_fixed_" + props.fixed);
            if (showLeftShadow && props.fixed === 'left') {
                result.push('cx-table_left_shadow');
            }
            else if (showRightShadow && props.fixed === 'right') {
                result.push('cx-table_right_shadow');
            }
            else if (showTopShadow && props.fixed === 'top') {
                result.push('cx-table_top_shadow');
            }
            else if (showBottomShadow && props.fixed === 'bottom') {
                result.push('cx-table_bottom_shadow');
            }
        }
        return result;
    });
};

var useTableStyle = function (props, CxTable, type) {
    var scrollStore = CxTable.scrollStore, styleStore = CxTable.styleStore, columnStore = CxTable.columnStore;
    var CX_TABLE_SCROLL_BAR = styleStore.CX_TABLE_SCROLL_BAR, CX_TABLE_HEIGHT = styleStore.CX_TABLE_HEIGHT;
    if (type === 'head') {
        return computed(function () {
            var result = {};
            if (props.fixed) {
                result.height = scrollStore.topFixedHeight + 'px';
                if (props.fixed === 'top') {
                    result.top = 0;
                    result.left = -scrollStore.scrollLeft + 'px';
                    result.width = scrollStore.clientWidth + 'px';
                }
                if (props.fixed === 'left') {
                    result.left = 0;
                }
                if (props.fixed === 'right') {
                    result.right = scrollStore.rightScrollBar ? CX_TABLE_SCROLL_BAR + 'px' : 0;
                }
            }
            return result;
        });
    }
    else if (type === 'body') {
        return computed(function () {
            var result = {};
            if (props.fixed) {
                if (props.fixed === 'left') {
                    var topFixedHeight = scrollStore.topFixedHeight, bottomScrollBar = scrollStore.bottomScrollBar, clientHeight = scrollStore.clientHeight;
                    result.left = 0;
                    result.top = props.onlyTotal ? 0 : topFixedHeight + 'px';
                    if (props.onlyTotal) {
                        result.height = CX_TABLE_HEIGHT + 'px';
                    }
                    else {
                        result.height = bottomScrollBar ? clientHeight - topFixedHeight + 'px' : 0;
                    }
                }
                if (props.fixed === 'right') {
                    var topFixedHeight = scrollStore.topFixedHeight, rightScrollBar = scrollStore.rightScrollBar, bottomScrollBar = scrollStore.bottomScrollBar, clientHeight = scrollStore.clientHeight;
                    result.right = rightScrollBar && !props.onlyTotal ? CX_TABLE_SCROLL_BAR + 'px' : 0;
                    result.top = props.onlyTotal ? 0 : topFixedHeight + 'px';
                    if (props.onlyTotal) {
                        result.height = CX_TABLE_HEIGHT + 'px';
                    }
                    else {
                        result.height = bottomScrollBar ? clientHeight - topFixedHeight + 'px' : 0;
                    }
                }
                if (props.fixed === 'bottom') {
                    var bottomScrollBar = scrollStore.bottomScrollBar;
                    result.left = 0;
                    result.bottom = bottomScrollBar ? CX_TABLE_SCROLL_BAR + 'px' : 0;
                    result.width = scrollStore.clientWidth + 'px';
                    result.height = CX_TABLE_HEIGHT + 'px';
                    result.left = -scrollStore.scrollLeft + 'px';
                }
            }
            return result;
        });
    }
    else {
        return computed(function () {
            var result = {};
            var fixedHeight = invokeLayeredRow(CxTable.columns).length * CX_TABLE_HEIGHT;
            scrollStore.topFixedHeight = fixedHeight;
            if (props.fixed === 'left') {
                var width = getSums(columnStore.leftFixedColumns);
                result.width = width + 'px';
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                scrollStore.leftFixedWidth = width;
            }
            else if (props.fixed === 'right') {
                var width = getSums(columnStore.rightFixedColumns);
                result.width = width + 'px';
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                scrollStore.rightFixedWidth = width;
            }
            else if (props.fixed === 'top') {
                result.height = fixedHeight + 'px';
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            }
            else if (props.fixed === 'bottom') {
                result.height = CX_TABLE_HEIGHT + 'px';
            }
            return result;
        });
    }
};

var useValidator = function ($CxTable, props) {
    var validate = function (params, dataSource) {
        var invalidCells = [];
        var hasTargetProp = isString(params === null || params === void 0 ? void 0 : params.prop);
        var hasTargetRow = isNumber(params === null || params === void 0 ? void 0 : params.rowIndex);
        $CxTable.flatColumns.forEach(function (column, colIndex) {
            if (hasTargetProp && (params === null || params === void 0 ? void 0 : params.prop) !== column.prop)
                return;
            var handle = function (rowData, rowIndex, column) {
                var _a, _b;
                var errMsg = '';
                errMsg =
                    (_b = (_a = column.validator) === null || _a === void 0 ? void 0 : _a.call(column, {
                        rowData: rowData,
                        column: column,
                        value: rowData[column.prop],
                        rowIndex: rowIndex
                    })) !== null && _b !== void 0 ? _b : '';
                if (!errMsg && column.required && isEmpty(rowData[column.prop])) {
                    errMsg = column.label + '不能为空';
                }
                if (errMsg)
                    invalidCells.push({ rowIndex: rowIndex, rowData: rowData, colIndex: colIndex, errMsg: errMsg, column: column });
            };
            if (!isFunction(column.validator) && !column.required)
                return;
            (isArray(dataSource) ? dataSource : props.tableData).forEach(function (rowData, rowIndex) {
                if (hasTargetRow && (params === null || params === void 0 ? void 0 : params.rowIndex) !== rowIndex)
                    return;
                handle(rowData, rowIndex, column);
            });
        });
        if (invalidCells.length) {
            setTimeout(function () {
                var _a = invalidCells[0], column = _a.column, rowData = _a.rowData;
                var td = domShare.getCell($CxTable, column, rowData);
                td === null || td === void 0 ? void 0 : td.click();
            });
        }
        return invalidCells;
    };
    return { validate: validate };
};

var useWatch = function (props, $CxTable, columnProxy, tableWrapper, expandConfig, tableVisible) {
    var updateVisible = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nextTick()];
                case 1:
                    _a.sent();
                    useScrollState($CxTable);
                    wrapperScrollEventHandle($CxTable, props);
                    return [2 /*return*/];
            }
        });
    }); };
    watch(function () { return tableVisible.value; }, updateVisible);
    var updateState = useUpdateState(props, $CxTable).updateState;
    var updateTableState = debounce$1(updateState, 50);
    var updateColumn = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            useColumn($CxTable, columnProxy, props);
            useColumnValidity($CxTable);
            updateTableState();
            return [2 /*return*/];
        });
    }); };
    var updateData = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            useRowDataValidity(props);
            updateTableState();
            return [2 /*return*/];
        });
    }); };
    watch([function () { return props.tableData.length; }, function () { return props.emptyLimit; }], updateData);
    var updateExpand = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nextTick()];
                case 1:
                    _a.sent();
                    useScrollState($CxTable);
                    return [2 /*return*/];
            }
        });
    }); };
    watch(function () { return expandConfig; }, updateExpand, { deep: true, immediate: true });
    var updateStyleSetting = function () {
        var _a;
        Object.entries((_a = props.styleSetting) !== null && _a !== void 0 ? _a : {}).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], val = _b[1];
            var settingKey = Reflect.get(CX_STYLE_SETTING, key);
            settingKey && isNumber(val) && Reflect.set($CxTable.styleStore, settingKey, val);
        });
    };
    watch(function () { return props.styleSetting; }, updateStyleSetting, { immediate: true, deep: true });
    return {
        updateVisible: updateVisible,
        updateColumn: updateColumn,
        updateData: updateData,
        updateExpand: updateExpand,
        updateTableState: updateTableState,
        updateStyleSetting: updateStyleSetting
    };
};

var domShare = {
    getEle: function (container, selector) {
        return container.querySelector(selector);
    },
    getCell: function ($CxTable, column, rowData) {
        var wrapperEle = $CxTable.wrapperEle;
        return wrapperEle.querySelector(".cx-table_wrapper tr[rowid=" + useTableId().getRowIdFromMap(rowData) + "] td[colid=" + column._colid + "]");
    },
    getAncestor: function (ele, nodeName, limited) {
        if (nodeName === void 0) { nodeName = 'TD'; }
        if (limited === void 0) { limited = 5; }
        var result = ele;
        while (result && limited > 0) {
            if (result.nodeName === nodeName)
                break;
            result = result.parentElement;
            limited--;
        }
        return result;
    },
    scrollTo: function ($CxTable, targetPosition) {
        var _a;
        (_a = $CxTable.wrapperEle) === null || _a === void 0 ? void 0 : _a.scrollTo({ top: targetPosition });
    },
    scrollToTd: function (td, container, fixLeft, fixRight, fixTop) {
        if (!td || !container)
            return;
        var tdLeft = td.offsetLeft, tdTop = td.offsetTop, tdWidth = td.clientWidth, tdHeight = td.clientHeight;
        var containerLeft = container.scrollLeft, containerTop = container.scrollTop, containerWidth = container.clientWidth, containerHeight = container.clientHeight;
        if (tdLeft < containerLeft + fixLeft) {
            // 说明td被卷入了左侧
            container.scrollLeft = tdLeft - fixLeft;
        }
        if (tdLeft + tdWidth > containerLeft + containerWidth - fixRight) {
            // 说明td被卷入了右侧
            container.scrollLeft = tdLeft + tdWidth - containerWidth + fixRight;
        }
        if (tdTop < containerTop) {
            // 说明td被卷入了上侧
            container.scrollTop = tdTop;
        }
        if (tdTop + tdHeight > containerTop + containerHeight - fixTop) {
            // 说明td被卷入了下侧
            container.scrollTop = tdTop - containerHeight + tdHeight + fixTop;
        }
    }
};

var getFunctionAttrs = function (rowData, rowIndex, attrs) {
    if (isFunction(attrs)) {
        var result = attrs({ rowData: rowData, rowIndex: rowIndex });
        return isObject$1(result) ? result : void 0;
    }
    return attrs;
};
var changeDynamicIdToText = function (dynamic) {
    var _a = useCxTable().getContext().dynamicType, DYNAMIC_BUSINESS_TYPE = _a.DYNAMIC_BUSINESS_TYPE, DYNAMIC_MODULE_TYPE = _a.DYNAMIC_MODULE_TYPE, DYNAMIC_MODEL_TYPE = _a.DYNAMIC_MODEL_TYPE, DYNAMIC_PRICE_TYPE = _a.DYNAMIC_PRICE_TYPE;
    return {
        businessType: DYNAMIC_BUSINESS_TYPE[dynamic.businessType],
        moduleType: DYNAMIC_MODULE_TYPE[dynamic.moduleType],
        modelType: DYNAMIC_MODEL_TYPE[dynamic.modelType],
        priceType: DYNAMIC_PRICE_TYPE[dynamic.priceType]
    };
};
var getParentColumn = function (columns, prop) {
    var result;
    function find(cols) {
        if (!Array.isArray(cols))
            return;
        cols.some(function (col) {
            if (Array.isArray(col.children)) {
                var target = col.children.some(function (child) {
                    find(child.children);
                    return child.prop === prop;
                });
                if (target) {
                    return (result = col);
                }
            }
        });
    }
    find(columns);
    return result;
};
function getTargetColumn(prop, cols) {
    if (!Array.isArray(cols))
        return;
    var result;
    cols.find(function (col) {
        if (col.prop === prop) {
            return (result = col);
        }
        return (result = getTargetColumn(prop, col.children));
    });
    return result;
}
function deepMerge(src, target) {
    var key;
    for (key in target) {
        src[key] =
            src[key] && isObject$1(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}
var format$1 = function (val) { return dayjs(val).format('YYYY-MM-DD'); };
var formatDate = R.ifElse(R.is(Array), R.map(format$1), format$1);
var format2 = function (val) { return dayjs(val).format('YYYY-MM-DD HH-mm-ss'); };
var formatTime = R.ifElse(R.is(Array), R.map(format2), format2);
function formatFormDefaultValue(defaultEnum, searchType) {
    switch (defaultEnum) {
        case 'all':
            return -1;
        case 'week':
            return formatDate(getDateRange(7, 'date'));
        case 'today':
            return searchType === 'dateRange'
                ? formatDate(getDateRange(1, 'date'))
                : formatDate(Date.now());
        case 'mouth':
            return searchType === 'dateRange'
                ? formatDate(getDateRange(0, 'month', true))
                : formatDate(Date.now());
        case 'now':
            return formatTime(Date.now());
        default:
            return +defaultEnum || defaultEnum;
    }
}
/**
 * 选择对象属性
 * @param object 需要copy属性的对象
 * @param props 需要copy的属性列表
 */
function pick(object, props) {
    if (props === void 0) { props = []; }
    var res = {};
    var arr = Array.isArray(props) ? props : [props];
    Object.keys(object).forEach(function (key) {
        if (arr.includes(key)) {
            res[key] =
                typeof object[key] === 'object' && object[key] !== null
                    ? R.clone(object[key])
                    : object[key];
        }
    });
    return res;
}
var getColumnSelectText = function (column, replaceProp) {
    var _a;
    if (replaceProp === void 0) { replaceProp = 'Text'; }
    return ((_a = column.control) === null || _a === void 0 ? void 0 : _a.selectText) || "" + column.prop.replace(/Id$/, '') + replaceProp;
};
function cxTableWarn() {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    console.warn.apply(console, __spreadArray(["[cxTable warn]:"], __read(msgs)));
}
function getStringWidth(str) {
    if (!str)
        return 0;
    if (isNumber(str)) {
        str = str + '';
    }
    if (str === true) {
        return 64;
    }
    return __spreadArray([], __read(str)).reduce(function (width, char) {
        if (/[a-zA-Z]/.test(char)) {
            return width + 13;
        }
        if (/\d/.test(char)) {
            return width + 9;
        }
        if (/\./.test(char)) {
            return width + 4;
        }
        if (/[\u4e00-\u9fa5]/.test(char)) {
            return width + 16;
        }
        if (/-/.test(char)) {
            return width + 4;
        }
        if (/（|）/.test(char)) {
            return width + 14;
        }
        if (/\(|\)/.test(char)) {
            return width + 5;
        }
        if (/-/.test(char)) {
            return width + 10;
        }
        if (/%/.test(char)) {
            return width + 14;
        }
        if (/‰/.test(char)) {
            return width + 16;
        }
        return width + 6;
    }, 0);
}
function copySort(arr, sortFun) {
    return __spreadArray([], __read(arr)).sort(sortFun);
}
var getTotalSumData = function (cols, data) {
    var result = {};
    cols.forEach(function (col) {
        if (col.columnFlag & COLUMN_FLAG.TEXT_SUM_COLUMN) {
            result[col.prop] = '总计';
        }
        else if (col.columnFlag & COLUMN_FLAG.ADD_SUM_COLUMN) {
            if (col.columnFlag & COLUMN_FLAG.CALC_COLUMN) {
                data.forEach(function (rowData) {
                    var _a, _b;
                    rowData[col.prop] = (_b = (_a = col.calculate) === null || _a === void 0 ? void 0 : _a.call(col, rowData)) !== null && _b !== void 0 ? _b : rowData[col.prop];
                });
            }
            result[col.prop] = isNumber(col.accuracy) ? decimalFixed(getSums(data, col.prop), col.accuracy, true) : getSums(data, col.prop);
        }
        else if (col.columnFlag & COLUMN_FLAG.CUSTOM_SUM_COLUMN) {
            result[col.prop] = isFunction(col.sum) ? col.sum(data) : null;
        }
    });
    return result;
};
var findAncestor = function (inputEle, className, searchLimit) {
    if (searchLimit === void 0) { searchLimit = 6; }
    var result = null;
    var parent = inputEle.parentNode;
    do {
        if (parent.nodeName === 'TD')
            break;
        if (parent.classList.contains(className)) {
            result = parent;
            break;
        }
        parent = parent.parentNode;
    } while (searchLimit--);
    return result;
};
/**
 * @param {boolean[]} arr 数据源
 * @param {number} index 索引
 * @description 更新boolean数组状态
 */
var toggleArrState = function (arr, index) {
    Reflect.set(arr, index, !arr[index]);
};
// items数组扁平化
var arrFlat = function (items, childProp) {
    if (childProp === void 0) { childProp = 'children'; }
    var result = [];
    var getItems = function (item) {
        var _a;
        if ((_a = item[childProp]) === null || _a === void 0 ? void 0 : _a.length) {
            item[childProp].forEach(function (child) {
                getItems(child);
            });
        }
        else {
            result.push(item);
        }
    };
    items.forEach(getItems);
    return result;
};
/**
 * @param {string | number | undefined} width 数据源
 * @description 宽度字符格式化
 */
var formatWidth = function (width) {
    if (!width)
        return;
    var duplicate = width + '';
    if (duplicate.includes('%') || duplicate.includes('px'))
        return duplicate;
    return parseFloat(duplicate) + "px";
};
/**
 * @param {Object} target 被覆盖对象
 * @param {Object} attr 覆盖对象
 * @description 合并元素属性,对class,style属性进行特殊合并
 */
var assignAttrs = function (target, attr) {
    if (target === void 0) { target = {}; }
    if (attr === void 0) { attr = {}; }
    var style = Object.assign({}, target.style, attr.style);
    var classDup = (target["class"] || '') + " " + (attr["class"] || '');
    return Object.assign({}, target, attr, { style: style, "class": classDup });
};
/**
 * @description 转换为分层表头列表
 * @param columns 表头参数列表
 */
var invokeLayeredRow = function (columns) {
    var result = [];
    var getHeaders = function (columns, level) {
        if (!result[level])
            result[level] = [];
        columns.forEach(function (item) {
            var _a;
            if (!item.hide) {
                result[level].push(item);
            }
            if ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) {
                getHeaders(item.children, level + 1);
            }
        });
    };
    getHeaders(columns, 0);
    return result;
};
var getSums = function (arr, prop) {
    if (prop === void 0) { prop = 'renderWidth'; }
    var result = 0;
    function sums(arr) {
        arr.forEach(function (item) {
            var _a;
            if ((_a = item === null || item === void 0 ? void 0 : item.children) === null || _a === void 0 ? void 0 : _a.length) {
                sums(item.children);
            }
            else {
                result += +item[prop] || 0;
            }
        });
    }
    sums(arr);
    return result;
};
var getPreOrNextItem = function (arr, item, direction, prop) {
    var _a;
    var index = arr.findIndex(function (arrItem) {
        return prop ? arrItem[prop] === item[prop] : arrItem === item;
    });
    if (index < 0)
        return item;
    return (_a = arr[index + (direction === 'pre' ? -1 : 1)]) !== null && _a !== void 0 ? _a : item;
};
var getStatusAttrs = function (rowData, column) {
    var _a, _b, _c, _d, _e;
    var statusMap = ((_a = column.control) !== null && _a !== void 0 ? _a : {}).statusMap;
    // statusMap分2种情况, Array => string[] / Object => { [k:string]:{content?:string,prop?:string,type?:string} }
    var _f = Array.isArray(statusMap)
        ? { content: statusMap[rowData[column.prop]], prop: undefined, type: undefined }
        : (_d = (_c = (_b = statusMap === null || statusMap === void 0 ? void 0 : statusMap[rowData[column.prop]]) !== null && _b !== void 0 ? _b : statusMap === null || statusMap === void 0 ? void 0 : statusMap['*']) !== null && _c !== void 0 ? _c : statusMap === null || statusMap === void 0 ? void 0 : statusMap["default"]) !== null && _d !== void 0 ? _d : {}, content = _f.content, prop = _f.prop, type = _f.type;
    return {
        content: content ? content : prop ? rowData[prop] : (_e = rowData[column.prop + 'Text']) !== null && _e !== void 0 ? _e : '',
        type: type
    };
};

var HeadCell = defineComponent({
    name: 'CxTableHeadCell',
    props: {
        layeredLevel: { type: Number, "default": 1 },
        column: { type: Object, "default": function () { return ({}); } }
    },
    setup: function (props) {
        var rootSlots = inject('rootSlots', {});
        var selectConfig = inject('selectConfig');
        var CxTable = inject('CxTable');
        var tableDataVisitor = inject('tableDataVisitor');
        var bus = inject('bus');
        // 单元格内盒宽度
        var cellWidth = ref(0);
        watchEffect(function () {
            var _a;
            var arrChildren = props.column.columnFlag & COLUMN_FLAG.ARRAY_CHILDREN;
            cellWidth.value = arrChildren
                ? getSums((_a = props.column.children) !== null && _a !== void 0 ? _a : [])
                : props.column.renderWidth;
        });
        // 单元格属性
        var thAttrs = computed(function () {
            var _a, _b, _c;
            var column = props.column, layeredLevel = props.layeredLevel;
            var arrChildren = column.columnFlag & COLUMN_FLAG.ARRAY_CHILDREN;
            var styleParams = {};
            if (!arrChildren) {
                styleParams.height = CxTable.styleStore.CX_TABLE_HEIGHT * layeredLevel;
            }
            return {
                colspan: (_b = (_a = props.column.children) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 1,
                rowspan: ((_c = props.column.children) === null || _c === void 0 ? void 0 : _c.length) ? 1 : props.layeredLevel,
                style: column.getStyle(styleParams, 'head')
            };
        });
        var hoisted_1 = 'cx-table_cell';
        // const hoisted_2 = 'iconfont';
        var hoisted_3 = 'color:red';
        var hoisted_4 = 'cx_w_10';
        var hoisted_5 = 'cx-table_sort';
        var hoisted_6 = 'cx-table_sort_positive';
        var hoisted_7 = 'cx-table_sort_reverse';
        return function (_, cache) {
            var _a;
            var column = props.column;
            return createVNode('th', thAttrs.value, [
                (openBlock(),
                    createBlock('div', { "class": hoisted_1, style: { width: formatWidth(cellWidth.value) } }, [
                        column.headTip
                            ? createVNode(resolveComponent('ElTooltip'), { content: column.headTip, placement: 'top-start', key: -1 }, {
                                "default": function () {
                                    return [
                                        cache[5] ||
                                            (cache[5] = createVNode('i', { "class": 'iconfont icon-bangzhu' }))
                                    ];
                                }
                            }, PATCH_FLAG.PROPS, ['content'])
                            : createCommentVNode('c-if_tip', true),
                        column.headSlot && (rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[column.headSlot])
                            ? createVNode(rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[column.headSlot], { column: column })
                            : ((_a = column.control) === null || _a === void 0 ? void 0 : _a.type) === 'nativeCheckbox'
                                ? createVNode(resolveComponent('ElCheckbox'), {
                                    key: 0,
                                    modelValue: selectConfig.selectAll,
                                    'onUpdate:modelValue': cache[0] || (cache[0] = function (val) { return (selectConfig.selectAll = val); }),
                                    indeterminate: selectConfig.indeterminate,
                                    disabled: selectConfig.disabled,
                                    onChange: cache[1] ||
                                        (cache[1] = function () { return bus.emit('toggleAllSelection', selectConfig.selectAll); })
                                }, null, PATCH_FLAG.FULL_PROPS | PATCH_FLAG.NEED_PATCH)
                                : (openBlock(),
                                    createBlock(Fragment, null, [
                                        (openBlock(),
                                            createBlock(Fragment, null, [
                                                column.required
                                                    ? cache[2] ||
                                                        (cache[2] = createVNode('i', { style: hoisted_3, key: 1 }, '*'))
                                                    : createCommentVNode('v-if_required', true)
                                            ])),
                                        // column.icon
                                        //   ? createVNode(
                                        //       'i',
                                        //       { class: [hoisted_2, 'icon-' + column.icon], key: 2 },
                                        //       null,
                                        //       PATCH_FLAG.CLASS
                                        //     )
                                        //   : createCommentVNode('v-if_icon', true),
                                        createVNode('span', { key: 3 }, column.label, PATCH_FLAG.TEXT),
                                        column.sortable
                                            ? cache[3] || (cache[3] = createVNode('i', { "class": hoisted_4, key: 4 }))
                                            : createCommentVNode('v-if_sortable_space', true),
                                        column.sortable
                                            ? createVNode('i', {
                                                key: 5,
                                                onClick: cache[4] ||
                                                    (cache[4] = function () {
                                                        tableDataVisitor.sort = column.sortable;
                                                        tableDataVisitor.sortProp = column.prop;
                                                        switch (tableDataVisitor.sortStatus) {
                                                            case CX_SORT_STATUS.NONE:
                                                                tableDataVisitor.sortStatus = CX_SORT_STATUS.POSITIVE;
                                                                break;
                                                            case CX_SORT_STATUS.POSITIVE:
                                                                tableDataVisitor.sortStatus = CX_SORT_STATUS.REVERSE;
                                                                break;
                                                            case CX_SORT_STATUS.REVERSE:
                                                                tableDataVisitor.sortStatus = CX_SORT_STATUS.NONE;
                                                        }
                                                    }),
                                                "class": [
                                                    hoisted_5,
                                                    tableDataVisitor.sortProp === column.prop
                                                        ? tableDataVisitor.sortStatus === CX_SORT_STATUS.POSITIVE
                                                            ? hoisted_6
                                                            : tableDataVisitor.sortStatus === CX_SORT_STATUS.REVERSE
                                                                ? hoisted_7
                                                                : null
                                                        : null
                                                ]
                                            }, null, PATCH_FLAG.CLASS)
                                            : createCommentVNode('v-if_sortable', true)
                                    ], PATCH_FLAG.KEYED_FRAGMENT | PATCH_FLAG.STABLE_FRAGMENT))
                    ], PATCH_FLAG.CLASS | PATCH_FLAG.STYLE))
            ], PATCH_FLAG.PROPS | PATCH_FLAG.STYLE, ['colspan', 'rowspan']);
        };
    }
});

var CxTableHead = defineComponent({
    name: 'CxTableHead',
    props: { fixed: { type: String, "default": '' }, left: { type: Number, "default": 0 } },
    components: { HeadCell: HeadCell },
    setup: function (props) {
        var CxTable = inject('CxTable');
        var style = useTableStyle(props, CxTable, 'head');
        // 分层表头
        var layeredHeadItems = computed(function () {
            return invokeLayeredRow(CxTable.columns);
        });
        var hoisted_1 = ['top', 'height', 'width', 'right'];
        var hoisted_2 = 'cx-table_head';
        return function () {
            return createVNode('div', { "class": hoisted_2, style: pick(style.value, hoisted_1) }, [
                createVNode('table', { style: pick(style.value, ['left']) }, [
                    (openBlock(),
                        createBlock(Fragment, null, layeredHeadItems.value.map(function (headers, index) {
                            return (openBlock(),
                                createBlock('tr', null, [
                                    (openBlock(true),
                                        createBlock(Fragment, null, headers.map(function (col) {
                                            return props.fixed && props.fixed !== 'top' && col.fixed !== props.fixed
                                                ? createCommentVNode('v-if_table_head', true)
                                                : (openBlock(),
                                                    createBlock(HeadCell, {
                                                        column: col,
                                                        layeredLevel: layeredHeadItems.value.length - index
                                                    }, null, PATCH_FLAG.PROPS, ['column', 'layeredLevel']));
                                        }), PATCH_FLAG.UNKEYED_FRAGMENT))
                                ]));
                        }, PATCH_FLAG.UNKEYED_FRAGMENT)))
                ], PATCH_FLAG.STYLE)
            ], PATCH_FLAG.CLASS | PATCH_FLAG.STYLE);
        };
    }
});

var renderDefaultNode = function (params) {
    var withDefault = function (v) { return v !== null && v !== void 0 ? v : params.column.defaultValue; };
    return createVNode(_CX_ELLIPSIS, {
        content: params.column.renderText
            ? withDefault(params.rowData[getColumnSelectText(params.column)])
            : isNumber(params.column.accuracy)
                ? decimalFixed(withDefault(params.rowData[params.column.prop]), params.column.accuracy, true)
                : withDefault(params.rowData[params.column.prop])
    }, null, PATCH_FLAG.PROPS, ['content']);
};
var renderCellContent = function (props, isActived, rowIndex, sum, rootSlots, selectConfig, radioValue, disabled, bus, expandConfig, broadcast, pagination, ignoreControl, forceControl) {
    if (sum === void 0) { sum = false; }
    var params = __assign(__assign({}, props), { expandConfig: expandConfig, rowIndex: rowIndex, selectConfig: selectConfig, radioValue: radioValue, bus: bus, pagination: pagination, broadcast: broadcast });
    return (openBlock(),
        createBlock(Fragment, null, [
            sum
                ? renderCellSum(params, rootSlots)
                : props.column.columnFlag & COLUMN_FLAG.SLOT_COLUMN
                    ? renderCellSlot(params, isActived, disabled, rootSlots, ignoreControl, forceControl)
                    : props.column.columnFlag & COLUMN_FLAG.CONTROL_COLUMN
                        ? renderCustomCell(params, isActived, disabled, ignoreControl, forceControl)
                        : props.column.columnFlag & COLUMN_FLAG.CALC_COLUMN
                            ? renderCalcCell(params)
                            : renderDefaultNode(params),
        ]));
};
var renderCellSum = function (params, rootSlots) {
    var _a, _b;
    return (openBlock(),
        createBlock(Fragment, null, [
            params.column.sumSlot
                ? (rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[params.column.sumSlot])
                    ? rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[params.column.sumSlot](params)
                    : null
                : ((_a = params.column.control) === null || _a === void 0 ? void 0 : _a.type) === 'index' || (isString(params.column.sum) && params.column.sum !== 'add')
                    ? createTextVNode((_b = params.column.sum) !== null && _b !== void 0 ? _b : '总计')
                    : renderDefaultNode(params),
        ]));
};
var renderCellSlot = function (params, isActived, disabled, rootSlots, ignoreControl, forceControl) {
    if (isFunction(params.column.slot)) {
        return params.column.slot(__assign(__assign({}, params), { isActived: isActived, disabled: disabled, prop: params.column.prop, ignore: ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false, force: forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false }));
    }
    return (rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[params.column.slot])
        ? rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[params.column.slot](__assign(__assign({}, params), { isActived: isActived, disabled: disabled, prop: params.column.prop, ignore: ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false, force: forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false }))
        : null;
};
var renderCalcCell = function (params) {
    var column = params.column, rowData = params.rowData;
    return (openBlock(),
        createBlock(Fragment, null, [
            isFunction(column.calculate)
                ? createVNode(_CX_ELLIPSIS, { content: column.calculate(rowData) }, null, PATCH_FLAG.PROPS, ['content'])
                : createCommentVNode('v-if', true),
        ]));
};
var renderCustomCell = function (params, isActived, disabled, ignoreControl, forceControl) {
    var _a;
    var type = ((_a = params.column.control) !== null && _a !== void 0 ? _a : {}).type;
    var renderer = CxTableRendererMap.get(type);
    if (isFunction(renderer)) {
        var ignore = ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false;
        var force = forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false;
        return renderer(__assign(__assign({}, params), { isActived: isActived, disabled: disabled, prop: params.column.prop, ignore: ignore, force: force }));
    }
    return renderDefaultNode(params);
};

var Cell = defineComponent({
    name: 'CxTableCell',
    props: {
        column: { type: Object, "default": function () { return ({}); } },
        rowData: { type: Object, "default": function () { return ({}); } },
        rowIndex: { type: Number, "default": -1 },
        sum: { type: Boolean, "default": false },
        empty: { type: Boolean, "default": false }
    },
    setup: function (props) {
        var _a;
        var rootSlots = inject('rootSlots', {});
        var selectConfig = inject('selectConfig');
        var CxTable = inject('CxTable');
        var radioValue = inject('radioValue');
        var expandConfig = inject('expandConfig');
        var rootProp = inject('rootProp');
        var broadcast = inject('broadcast');
        var bus = inject('bus');
        var _hoisted_direction_1 = resolveDirective('uni-popper');
        var handles = rootProp.keyboard ? registCellEvent(CxTable, props) : {};
        // 如果设置了validate,则计算其校验结果
        var invalidContent = ref('');
        watchEffect(function () {
            if (!(props.column.columnFlag & COLUMN_FLAG.VALIDATE_COLUMN))
                return invalidContent.value = '';
            CxTable.editStore.actived;
            props.rowData[props.column.prop];
            var result = isFunction(props.column.validator)
                ? props.column.validator({
                    column: props.column,
                    value: props.rowData[props.column.prop],
                    rowIndex: props.rowIndex,
                    rowData: props.rowData
                })
                : null;
            if (!result && props.column.required) {
                result = isEmpty(props.rowData[props.column.prop]) ? '请填写' + props.column.label : null;
            }
            return invalidContent.value = result;
        });
        var isActived = ref(false);
        watchEffect(function () {
            var _a;
            isActived.value =
                props.column._colid === ((_a = CxTable.editStore.actived.column) === null || _a === void 0 ? void 0 : _a._colid) &&
                    props.rowData === CxTable.editStore.actived.rowData;
        });
        // 聚焦提交tdFocus事件
        watch(function () { return isActived.value; }, function () {
            if (isActived.value) {
                var rowIndex = props.rowIndex, rowData = props.rowData, column = props.column;
                bus.emit('tdFocus', { rowIndex: rowIndex, rowData: rowData, column: column });
            }
        });
        // 如果设置了spanMethod,则计算其colspan/rowspan
        var mergeSpan = computed(function () {
            var _a, _b;
            if (!isFunction(rootProp.spanMethod) || props.sum)
                return {};
            var result = (_b = (_a = rootProp.spanMethod) === null || _a === void 0 ? void 0 : _a.call(rootProp, {
                rowData: props.rowData,
                column: props.column,
                rowIndex: props.rowIndex
            })) !== null && _b !== void 0 ? _b : {};
            if (isArray(result)) {
                result = { rowspan: result[0], colspan: result[1] };
            }
            return result;
        });
        // 单元格是否显示控件
        var isControl = ref(false);
        watchEffect(function () {
            isControl.value = isActived.value && !!CxTable.editStore.activedControl;
        });
        var errorVisible = ref(false);
        watchEffect(function () {
            errorVisible.value = !!(invalidContent.value && isControl.value);
        });
        var directionOption = reactive({
            visible: false,
            classList: ['cx-table_wrong_msg', 'cx_mtb_8'],
            text: invalidContent.value,
            controlType: 'handle',
            placement: 'top-start',
            key: 'errorMsg'
        });
        watch(invalidContent, function (val) {
            directionOption.text = val;
        });
        watch(errorVisible, function (val) {
            directionOption.visible = val;
        });
        // 单元格内容
        var renderContent = function () {
            if (props.empty)
                return;
            var renderInnerContent = function () {
                return renderCellContent(props, isControl.value, props.rowIndex, props.sum, rootSlots, selectConfig, radioValue, !!rootProp.disabled, bus, expandConfig, broadcast, rootProp.pagination, rootProp.ignoreControl, rootProp.forceControl);
            };
            invalidContent.value;
            if (props.column.columnFlag & COLUMN_FLAG.VALIDATE_COLUMN && !props.sum) {
                return withDirectives(createVNode('div', null, [renderInnerContent()]), [
                    [_hoisted_direction_1 !== null && _hoisted_direction_1 !== void 0 ? _hoisted_direction_1 : {}, directionOption]
                ]);
            }
            else {
                return renderInnerContent();
            }
        };
        // 单元格样式
        var tdStyle = ref({});
        watchEffect(function () {
            var _a, _b;
            var params = {};
            if (((_a = mergeSpan.value) === null || _a === void 0 ? void 0 : _a.rowspan) > 1) {
                params.height = ((_b = mergeSpan.value) === null || _b === void 0 ? void 0 : _b.rowspan) * CxTable.styleStore.CX_TABLE_HEIGHT;
            }
            var result = props.column.getStyle(params, 'body', props.rowData, props.rowIndex);
            if (!isDeepObjectEqual(tdStyle.value, result)) {
                tdStyle.value = result;
            }
        });
        var key = CX_TABLE_COLUMN_KEY + props.column._colid;
        watch(function () { return mergeSpan.value.rowspan; }, function (val, oldVal) {
            if (val === oldVal)
                return;
            if (rootProp.virtualScroll) {
                var rowSpanMap = CxTable.virtualStore.rowSpanMap;
                if (mergeSpan.value.rowspan > 1) {
                    rowSpanMap[props.rowIndex] |= CX_SPAN_METHOD_TYPE.EXTEND;
                }
                if (mergeSpan.value.rowspan === 0) {
                    rowSpanMap[props.rowIndex] |= CX_SPAN_METHOD_TYPE.MISSING;
                }
            }
        }, { immediate: true });
        // 当值发生改变时发送一个广播
        watch(function () { return props.rowData[props.column.prop]; }, function () {
            broadcast === null || broadcast === void 0 ? void 0 : broadcast.trigger(props.column.prop, props.rowData, {
                prop: props.column.prop,
                rowData: props.rowData
            });
        });
        // 当column为select/search时,由于text的存在,不能仅仅监听id变化,text值也会对渲染有影响,同时,插槽内容的变化也难以监听
        if (['search', 'select', 'optionSelect'].includes((_a = props.column.control) === null || _a === void 0 ? void 0 : _a.type) || props.column.slot) {
            var textKey_1 = getColumnSelectText(props.column);
            watch(function () { return props.rowData[textKey_1]; }, function () {
                broadcast === null || broadcast === void 0 ? void 0 : broadcast.trigger(textKey_1, props.rowData, {
                    prop: textKey_1,
                    rowData: props.rowData
                });
            });
        }
        return function () {
            var _a, _b;
            if (mergeSpan.value && (((_a = mergeSpan.value) === null || _a === void 0 ? void 0 : _a.rowspan) === 0 || ((_b = mergeSpan.value) === null || _b === void 0 ? void 0 : _b.colspan) === 0)) {
                return;
            }
            return createVNode('td', __assign(__assign(__assign({ key: key }, handles), mergeSpan.value), { style: tdStyle.value, colid: props.column._colid, "class": { actived: isActived.value } }), [
                createVNode('div', {
                    "class": 'cx-table_cell',
                    style: { width: props.column.renderWidth + 'px' }
                }, [renderContent()], PATCH_FLAG.CLASS | PATCH_FLAG.STYLE)
            ], PATCH_FLAG.FULL_PROPS);
        };
    }
});

var Expand = defineComponent({
    name: 'CxTableExpand',
    props: {
        fixed: { type: String, "default": '' },
        rowData: { type: Object, "default": function () { return ({}); } },
        rowIndex: { type: Number, "default": -1 }
    },
    setup: function (props) {
        var CxTable = inject('CxTable');
        var rootProp = inject('rootProp');
        var expandConfig = inject('expandConfig', []);
        var rootSlots = inject('rootSlots', {});
        var classList = computed(function () {
            var result = [];
            props.fixed && result.push('cx_opacity_0');
            return result;
        });
        var colspan = computed(function () {
            var _a, _b, _c;
            return props.fixed === 'left'
                ? (_a = CxTable.columnStore.leftFixedColumns) === null || _a === void 0 ? void 0 : _a.length
                : props.fixed === 'right'
                    ? (_b = CxTable.columnStore.rightFixedColumns) === null || _b === void 0 ? void 0 : _b.length
                    : (_c = CxTable.flatColumns) === null || _c === void 0 ? void 0 : _c.length;
        });
        var slotName = computed(function () {
            var result = '';
            if (isString(rootProp.expand) && rootProp.expand) {
                result = rootProp.expand;
            }
            else if (isFunction(rootProp.expand)) {
                var expandSlot = rootProp.expand(props.rowData, props.rowIndex);
                expandSlot && (result = expandSlot);
            }
            return result;
        });
        var hoisted_1 = 'cx-table_expand';
        return function () {
            return (openBlock(),
                createBlock(Fragment, null, [
                    slotName.value && expandConfig[props.rowIndex] && rootSlots[slotName.value]
                        ? createVNode('tr', { "class": classList.value }, [
                            createVNode('td', { colspan: colspan.value }, [
                                createVNode('div', {
                                    "class": "" + hoisted_1,
                                    style: (function () {
                                        var result = {};
                                        if (props.fixed) {
                                            var width = useTableStyle(props, CxTable, 'table').value.width;
                                            if (width) {
                                                Reflect.set(result, 'width', width);
                                                Reflect.set(result, 'overflow', 'hidden');
                                            }
                                        }
                                        return result;
                                    })()
                                }, [
                                    createVNode('div', { style: { width: CxTable.scrollStore.renderTotalWidth + 'px' } }, [
                                        createVNode(rootSlots[slotName.value], { rowIndex: props.rowIndex, rowData: props.rowData }, null, PATCH_FLAG.FULL_PROPS)
                                    ], PATCH_FLAG.STYLE)
                                ], PATCH_FLAG.STYLE)
                            ], PATCH_FLAG.PROPS, ['colspan'])
                        ], PATCH_FLAG.CLASS)
                        : createCommentVNode('v-if_expand', true)
                ]));
        };
    }
});

var FixedBottom = defineComponent({
    name: 'CxTableFixedBottom',
    props: {
        tableData: { type: Array, "default": function () { return []; } }
    },
    setup: function (props) {
        var CxTable = inject('CxTable');
        var component = CxTableBody;
        return function () {
            return [
                CxTable.columnStore.rightFixedColumns.length
                    ? createVNode(component, {
                        tableData: props.tableData,
                        style: {
                            width: getSums(CxTable.columnStore.rightFixedColumns) + 'px',
                            zIndex: 15
                        },
                        fixed: 'right',
                        "class": {
                            'cx-table_fixed_right': true,
                            'cx-table_right_shadow': CxTable.scrollStore.showRightShadow,
                            'cx-bt': true
                        },
                        onlyTotal: true
                    })
                    : null,
                CxTable.columnStore.leftFixedColumns.length
                    ? createVNode(component, {
                        tableData: props.tableData,
                        style: {
                            width: getSums(CxTable.columnStore.leftFixedColumns) + 'px',
                            zIndex: 15
                        },
                        fixed: 'left',
                        "class": {
                            'cx-table_fixed_left': true,
                            'cx-table_left_shadow': CxTable.scrollStore.showLeftShadow,
                            'cx-bt': true
                        },
                        onlyTotal: true
                    })
                    : null
            ];
        };
    }
});

var TableAddBtn = defineComponent({
    name: 'CxTableAddBtn',
    props: {
        fixed: { type: String, "default": '' },
        tableData: { type: Array, "default": function () { return []; } }
    },
    setup: function (props) {
        var rootProp = inject('rootProp');
        var CxTable = inject('CxTable');
        var bus = inject('bus');
        var hoisted_1 = 'cx_opacity_0';
        var classList = computed(function () {
            return [
                'cx-table_add_btn',
                'cx_mlr_10',
                props.tableData.length ? 'cx_h_80' : 'cx_h_160',
                props.fixed ? hoisted_1 : null
            ];
        });
        var realShow = computed(function () {
            return !rootProp.showAddBtn || props.fixed === 'top' || props.fixed === 'bottom';
        });
        return function (_, cache) {
            return (openBlock(),
                createBlock(Fragment, null, [
                    realShow.value
                        ? createCommentVNode('v-if_add_btn', true)
                        : createVNode('tr', null, [
                            createVNode('td', { "class": props.fixed ? hoisted_1 : null, colspan: CxTable.flatColumns.length }, [
                                createVNode('div', {
                                    onClick: cache[0] || (cache[0] = function () { return bus.emit('addNewRow', 'addNewRow'); }),
                                    "class": classList.value
                                }, rootProp.showAddBtn, PATCH_FLAG.CLASS | PATCH_FLAG.NEED_PATCH | PATCH_FLAG.TEXT)
                            ], PATCH_FLAG.CLASS | PATCH_FLAG.PROPS, ['colspan'])
                        ])
                ], PATCH_FLAG.STABLE_FRAGMENT));
        };
    }
});

var TableRow = defineComponent({
    name: 'CxTableRow',
    props: {
        rowData: { type: Object, "default": function () { return ({}); } },
        rowIndex: { type: Number, "default": -1 },
        activedRow: { type: Array, "default": function () { return []; } },
        sum: { type: Boolean, "default": false },
        rowid: { type: [String, Number], "default": '' }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        var selectConfig = inject('selectConfig', { selectItem: [] });
        var radioValue = inject('radioValue', ref(-1));
        var CxTable = inject('CxTable');
        var isHover = ref(false);
        watchEffect(function () {
            isHover.value = props.rowid === CxTable.hoveringRowid;
        });
        var isActive = ref(false);
        watchEffect(function () {
            var _a, _b;
            isActive.value =
                ((_a = selectConfig.selectItem) === null || _a === void 0 ? void 0 : _a[props.rowIndex]) ||
                    radioValue.value === props.rowIndex ||
                    ((_b = props.activedRow) === null || _b === void 0 ? void 0 : _b.includes(props.rowIndex));
        });
        var trAttrs = computed(function () {
            var result = { rowid: props.rowid, "class": [] };
            if (isActive.value) {
                result["class"].push('active');
            }
            if (isHover.value) {
                result["class"].push('cx-table_row_hover');
            }
            return result;
        });
        return function () {
            return createVNode('tr', trAttrs.value, slots, PATCH_FLAG.PROPS | PATCH_FLAG.CLASS, [
                'rowid'
            ]);
        };
    }
});

var CxTableBody = defineComponent({
    name: 'CxTableBody',
    props: {
        fixed: { type: String, "default": '' },
        onlyTotal: { type: Boolean, "default": false },
        tableData: { type: Array, "default": function () { return []; } },
        float: { type: Boolean, "default": false }
    },
    setup: function (props) {
        var CxTable = inject('CxTable');
        var broadcast = inject('broadcast');
        var rootProp = inject('rootProp');
        var hoisted_1 = 'cx-table_footer';
        var hoisted_2 = 'cx-table_body';
        var getRowIdFromMap = useTableId().getRowIdFromMap;
        // 行渲染
        var renderRow = function (rowData, rowIndex, sum, empty) {
            if (sum === void 0) { sum = false; }
            if (empty === void 0) { empty = false; }
            var rowid;
            if (sum) {
                rowid = CX_TABLE_SUM_ROW_KEY;
            }
            else {
                rowid = getRowIdFromMap(rowData);
            }
            return createVNode(TableRow, {
                sum: sum,
                "class": sum ? hoisted_1 : '',
                rowData: rowData,
                rowIndex: rowIndex,
                activedRow: rootProp.activeRows,
                rowid: rowid,
                key: rowid
            }, {
                "default": function () {
                    CxTable.flatColumns.forEach(function (col) {
                        var _a;
                        var attrs = getFunctionAttrs(rowData, rowIndex, (_a = col.control) === null || _a === void 0 ? void 0 : _a.attrs);
                        var broadcastRegister = attrs === null || attrs === void 0 ? void 0 : attrs.broadcastRegister;
                        if (broadcastRegister && isFunction(broadcastRegister)) {
                            broadcastRegister(function (prop, cb) { return broadcast.registListener(prop, rowData, cb); });
                        }
                    });
                    return (openBlock(true),
                        createBlock(Fragment, null, CxTable.flatColumns.map(function (col) {
                            return openBlock(),
                                createBlock(Fragment, null, [
                                    props.fixed && props.fixed !== 'bottom' && col.fixed !== props.fixed
                                        ? createCommentVNode('v-if', true)
                                        : (openBlock(),
                                            createBlock(Cell, { rowData: rowData, rowIndex: rowIndex, column: col, sum: sum, empty: empty, key: col._colid }, null, PATCH_FLAG.PROPS, ['rowData', 'rowIndex', 'column', 'sum', 'empty']))
                                ]);
                        }), PATCH_FLAG.KEYED_FRAGMENT));
                }
            }, PATCH_FLAG.PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.DYNAMIC_SLOTS, ['rowData', 'rowIndex', 'activedRow', 'rowid', 'key']);
        };
        // body主体内容渲染
        var renderContent = function () {
            return (openBlock(),
                createBlock(Fragment, null, [
                    props.fixed === 'bottom' || props.onlyTotal
                        ? createCommentVNode('v-if', true)
                        : (openBlock(true),
                            createBlock(Fragment, null, (function () {
                                var result = [];
                                var data;
                                var indexPrepend = 0;
                                if (rootProp.virtualScroll) {
                                    var virtualStore = CxTable.virtualStore;
                                    data = props.tableData.slice(virtualStore.renderStartIndex, virtualStore.renderEndIndex);
                                    indexPrepend = virtualStore.renderStartIndex;
                                }
                                else {
                                    data = props.tableData;
                                }
                                data.forEach(function (rowData, rowIndex) {
                                    result.push(renderRow(rowData, rowIndex + indexPrepend));
                                    if (rootProp.expand) {
                                        result.push(createVNode(Expand, { rowData: rowData, rowIndex: rowIndex + indexPrepend, fixed: props.fixed }, null, PATCH_FLAG.FULL_PROPS));
                                    }
                                });
                                if (isNumber(rootProp.emptyLimit) &&
                                    rootProp.emptyLimit > props.tableData.length) {
                                    Array(rootProp.emptyLimit - props.tableData.length)
                                        .fill('')
                                        .forEach(function () {
                                        result.push(renderRow({}, CX_TABLE_EMPTY_INDEX, false, true));
                                    });
                                }
                                return result;
                            })(), PATCH_FLAG.KEYED_FRAGMENT))
                ]));
        };
        // 添加按钮渲染
        var renderAddBtn = function () {
            return createVNode(TableAddBtn, { fixed: props.fixed, tableData: props.tableData }, null, PATCH_FLAG.PROPS, ['fixed', 'tableData']);
        };
        var hideTotalSum = ref(false);
        watchEffect(function () {
            var _a;
            hideTotalSum.value =
                (rootProp.virtualScroll && props.fixed !== 'bottom' && !props.onlyTotal && CxTable.virtualStore.renderEndIndex < rootProp.tableData.length)
                    || (((!rootProp.showTotalSum && !(rootProp.showForm && CxTable.flatColumns.some(function (col) { return !!col.sum; }))) || ((_a = props.tableData) === null || _a === void 0 ? void 0 : _a.length) <= 0) &&
                        !rootProp.showAddBtn &&
                        !props.float);
        });
        var transferOtherSum = function (columns) {
            var result = {};
            columns.forEach(function (_a) {
                var prop = _a.prop, sum = _a.sum;
                if (sum === 'add' || !isString(sum))
                    return;
                result[prop] = sum;
            });
            return result;
        };
        // 合计行渲染
        var renderTotalSum = function () {
            var _a;
            return (openBlock(),
                createBlock(Fragment, null, [
                    hideTotalSum.value
                        ? createCommentVNode('v-if', true)
                        : isObject$1(rootProp.customTotalSum)
                            ? renderRow(Object.assign({}, rootProp.customTotalSum), CX_TABLE_SUM_INDEX, true)
                            : isObject$1(CxTable.entireTotalSum)
                                ? renderRow(R.mergeLeft(transferOtherSum(CxTable.flatColumns), CxTable.entireTotalSum), CX_TABLE_SUM_INDEX, true)
                                : renderRow(getTotalSumData(CxTable.flatColumns, (_a = rootProp.tableData) !== null && _a !== void 0 ? _a : []), CX_TABLE_SUM_INDEX, true)
                ]));
        };
        // 基准style对象,根据不同的元素取出不同的项
        var style = useTableStyle(props, CxTable, 'body');
        var tableStyle = computed(function () {
            var styleStore = CxTable.styleStore;
            var result = __assign(__assign({}, pick(style.value, ['left'])), { top: props.fixed === 'bottom' || props.onlyTotal ? 0 : -CxTable.scrollStore.scrollTop + 'px' });
            if (rootProp.virtualScroll && props.fixed !== 'bottom' && !props.onlyTotal) {
                result.paddingTop = CxTable.virtualStore.renderPaddingTop + 'px';
                result.paddingBottom = CxTable.virtualStore.renderPaddingBottom + 'px';
                result.height =
                    (props.tableData.length + +!!rootProp.showTotalSum) * styleStore.CX_TABLE_HEIGHT + 'px';
            }
            return result;
        });
        var bodyWrapperStyle = computed(function () {
            return pick(style.value, ['right', 'bottom', 'top', 'height', 'width']);
        });
        // 不宜使用computed
        var tableClass = ref('');
        watchEffect(function () {
            tableClass.value = rootProp.stripe || rootProp.showForm ? 'stripe' : '';
        });
        return function () { return (openBlock(),
            createBlock('div', { "class": hoisted_2, style: bodyWrapperStyle.value }, [
                createVNode('table', { style: tableStyle.value, "class": tableClass.value }, [createVNode('tbody', null, [renderContent(), renderAddBtn(), renderTotalSum()])], PATCH_FLAG.STYLE),
                (openBlock(),
                    createBlock(Fragment, null, [
                        props.fixed === 'bottom'
                            ? createVNode(FixedBottom, { tableData: props.tableData }, null, PATCH_FLAG.PROPS | PATCH_FLAG.NEED_PATCH, ['tableData'])
                            : createCommentVNode('v-if_fixed_bottom', true)
                    ], PATCH_FLAG.STABLE_FRAGMENT))
            ], PATCH_FLAG.CLASS | PATCH_FLAG.STYLE)); };
    }
});

var CxTableContent = defineComponent({
    name: 'CxTableContent',
    props: {
        fixed: { type: String, "default": '' },
        tableData: { type: Array, "default": function () { return []; } }
    },
    setup: function (props) {
        var CxTable = inject('CxTable');
        var style = useTableStyle(props, CxTable, 'table');
        var classList = useTableClass(props, CxTable);
        return function () {
            var fixed = props.fixed;
            return [
                openBlock(),
                createBlock(Fragment, null, [
                    [
                        (openBlock(),
                            createBlock(Fragment, null, [
                                fixed !== 'bottom'
                                    ? createVNode(CxTableHead, { "class": classList.value, style: style.value, fixed: fixed }, null, PATCH_FLAG.FULL_PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.STYLE)
                                    : createCommentVNode('v-if_table_bottom', true)
                            ], PATCH_FLAG.STABLE_FRAGMENT)),
                        (openBlock(),
                            createBlock(Fragment, null, [
                                fixed !== 'top'
                                    ? createVNode(CxTableBody, {
                                        tableData: props.tableData,
                                        "class": classList.value,
                                        style: style.value,
                                        fixed: fixed
                                    }, null, PATCH_FLAG.FULL_PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.STYLE)
                                    : createCommentVNode('v-if_table_top', true)
                            ], PATCH_FLAG.STABLE_FRAGMENT))
                    ]
                ])
            ];
        };
    }
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$b = {
    name: 'Empty',
};

const _hoisted_1$4 = { class: "cx_flex_center cx_flex_d_column cx_justify_center" };
const _hoisted_2$2 = /*#__PURE__*/createVNode("div", { class: "cx_h_100" }, [
  /*#__PURE__*/createVNode("svg", {
    width: "120",
    height: "100",
    viewBox: "0 0 184 152",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /*#__PURE__*/createVNode("g", {
      fill: "none",
      "fill-rule": "evenodd"
    }, [
      /*#__PURE__*/createVNode("g", { transform: "translate(24 31.67)" }, [
        /*#__PURE__*/createVNode("ellipse", {
          "fill-opacity": ".8",
          fill: "#F5F5F7",
          cx: "67.797",
          cy: "106.89",
          rx: "67.797",
          ry: "12.668"
        }),
        /*#__PURE__*/createVNode("path", {
          d: "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z",
          fill: "#AEB8C2"
        }),
        /*#__PURE__*/createVNode("path", {
          d: "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
          fill: "url(#linearGradient-1)",
          transform: "translate(13.56)"
        }),
        /*#__PURE__*/createVNode("path", {
          d: "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z",
          fill: "#F5F5F7"
        }),
        /*#__PURE__*/createVNode("path", {
          d: "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z",
          fill: "#DCE0E6"
        })
      ]),
      /*#__PURE__*/createVNode("path", {
        d: "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z",
        fill: "#DCE0E6"
      }),
      /*#__PURE__*/createVNode("g", {
        transform: "translate(149.65 15.383)",
        fill: "#FFF"
      }, [
        /*#__PURE__*/createVNode("ellipse", {
          cx: "20.654",
          cy: "3.167",
          rx: "2.849",
          ry: "2.815"
        }),
        /*#__PURE__*/createVNode("path", { d: "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" })
      ])
    ])
  ])
], -1 /* HOISTED */);
const _hoisted_3$2 = /*#__PURE__*/createVNode("p", null, "暂无数据", -1 /* HOISTED */);

function render$6(_ctx, _cache) {
  return (openBlock(), createBlock("div", _hoisted_1$4, [
    _hoisted_2$2,
    _hoisted_3$2
  ]))
}

script$b.render = render$6;
script$b.__file = "src/lib/cx-table/components/empty.vue";

var CxTableEmpty = defineComponent({
    name: 'CxTableEmpty',
    setup: function () {
        var CxTable = inject('CxTable');
        var hoisted_1 = { style: { height: '150px' } };
        var hoisted_2 = { "class": 'cx-table_empty' };
        return function () {
            var rowspan = CxTable.flatColumns.length;
            return (openBlock(),
                createBlock('div', hoisted_1, [
                    createVNode('table', hoisted_2, [
                        createVNode('tbody', null, [
                            createVNode('tr', null, [
                                createVNode('td', { rowspan: rowspan }, [
                                    (function () {
                                        setBlockTracking(-1);
                                        var node = createVNode(script$b);
                                        setBlockTracking(1);
                                        return node;
                                    })()
                                ], PATCH_FLAG.PROPS, ['rowspan'])
                            ])
                        ])
                    ])
                ]));
        };
    }
});

var DynamicFormAdd = defineComponent({
    name: 'DynamicFormAdd',
    props: {
        options: { type: Array, "default": function () { return []; } },
        modelValue: { type: Array, required: true },
        currentInstance: { type: Object }
    },
    emits: ['update:modelValue', 'change'],
    setup: function (props, _a) {
        var emit = _a.emit;
        var _b = __read(useComputed({
            get: function () {
                var _a;
                return (_a = props.modelValue) !== null && _a !== void 0 ? _a : [];
            },
            set: function (val) {
                emit('update:modelValue', val);
                setVisible(false);
            }
        }), 2), modelProxy = _b[0], setModelProxy = _b[1];
        var _c = __read(useState(false), 2), visible = _c[0], setVisible = _c[1];
        var toggleVisible = R.compose(setVisible, R.not, visible);
        var addItem = function (id) {
            R.compose(setModelProxy, R.uniq, R.append(id), modelProxy)();
        };
        var matchPinyinSearch = function (str) {
            return R.ifElse(R.isEmpty, R.T, R.curryN(2, PinyinMatch.match)(str))(searchContent());
        };
        var currentOptions = useComputed(function () {
            return R.filter(R.allPass([
                R.compose(R.not, R.includes(R.__, modelProxy()), R.prop('id')),
                R.compose(matchPinyinSearch, R.prop('name'))
            ]))(props.options);
        });
        var _d = __read(useState(''), 2), searchContent = _d[0], setSearchContent = _d[1];
        var _hoisted_class_1 = 'cx_mb_5';
        var _hoisted_class_2 = 'hover-highlight cx_ptb_8 cx_plr_12';
        var _hoisted_class_3 = 'cx_plr_7';
        var _hoisted_class_4 = 'cx_flex_center cx_justify_center cx_mt_8';
        var _hoisted_attrs_1 = {
            style: {
                maxHeight: '245px',
                overflowY: 'auto',
                margin: '0 -12px -10px'
            }
        };
        return withCtx(function (_, cache) {
            var _hoisted_component_1 = resolveComponent('ElPopover');
            var _hoisted_component_2 = resolveComponent('CxBtn');
            var _hoisted_component_3 = resolveComponent('ElInput');
            return [
                (openBlock(),
                    createBlock(Fragment, null, [
                        createVNode(_hoisted_component_1, {
                            visible: visible(),
                            'onUpdate:visible': setVisible,
                            placement: 'right-start',
                            width: 240,
                            showArrow: false
                        }, {
                            reference: function () {
                                return createVNode(_hoisted_component_2, {
                                    onClick: toggleVisible,
                                    icon: 'tianjia',
                                    "class": _hoisted_class_3,
                                    style: {
                                        marginTop: props.modelValue.length ? '32px' : 0,
                                        backgroundColor: '#f0f5ff'
                                    }
                                }, null, PATCH_FLAG.STYLE);
                            },
                            "default": function () {
                                return (openBlock(),
                                    createBlock(Fragment, null, [
                                        createVNode(_hoisted_component_3, {
                                            size: 'mini',
                                            "class": _hoisted_class_1,
                                            modelValue: searchContent(),
                                            'onUpdate:modelValue': setSearchContent,
                                            placeholder: '搜索过滤条件'
                                        }, null, PATCH_FLAG.PROPS, ['modelValue']),
                                        [
                                            (openBlock(),
                                                createBlock(Fragment, null, [
                                                    currentOptions().length
                                                        ? createVNode('div', _hoisted_attrs_1, [
                                                            (openBlock(),
                                                                createBlock(Fragment, null, currentOptions().map(function (option) {
                                                                    return createVNode('div', {
                                                                        key: option.id,
                                                                        "class": _hoisted_class_2,
                                                                        onClick: R.useWith(addItem, [R.always(option.id)])
                                                                    }, option.name, PATCH_FLAG.PROPS, ['key']);
                                                                }), PATCH_FLAG.KEYED_FRAGMENT))
                                                        ])
                                                        : cache[0] ||
                                                            (cache[0] = createVNode('div', { "class": _hoisted_class_4 }, '暂无数据'))
                                                ]))
                                        ]
                                    ]));
                            }
                        }, PATCH_FLAG.PROPS, ['visible'])
                    ]))
            ];
        }, props.currentInstance);
    }
});

var TeleFormInstance = defineComponent({
    name: 'TeleFormInstance',
    emits: ['change', 'close'],
    props: {
        form: { type: Object, required: true },
        items: { type: Array, required: true },
        states: { type: Object, required: true }
    },
    setup: function (props, _a) {
        var emit = _a.emit, slots = _a.slots;
        var curryEmit = R.curryN(2, emit);
        return function (_, cache) {
            var _a, _b;
            return createVNode('div', { style: { display: ((_b = (_a = props.states) === null || _a === void 0 ? void 0 : _a.visible) !== null && _b !== void 0 ? _b : true) ? 'block' : 'none' } }, [
                createVNode(_CX_FORM, {
                    form: props.form,
                    items: props.items,
                    formAttrs: { labelPosition: 'top', labelSuffix: '' },
                    onChange: cache[0] || (cache[0] = curryEmit('change')),
                    onClose: cache[1] || (cache[1] = curryEmit('close'))
                }, { add: function () { var _a, _b; return [(_b = (_a = slots.add) === null || _a === void 0 ? void 0 : _a.call(slots)) !== null && _b !== void 0 ? _b : '']; } }, PATCH_FLAG.PROPS, ['form', 'items'])
            ], PATCH_FLAG.STYLE);
        };
    }
});

var DynamicFormCacheModule = 'dynamicForm';
var DynamicFormVisibleCacheModule = 'dynamicFormVisible';

var useDynamicFormCache = function (rootProps) {
    var getCacheKey = function (dynamic) {
        return !dynamic
            ? ''
            : "u_" + useCxTable().getContext().contextScopeId + "_m1_" + dynamic.moduleType + "_b_" + dynamic.businessType + "_m2_" + dynamic.modelType + "_p_" + dynamic.priceType;
    };
    var getCache = function (module) {
        if (module === void 0) { module = DynamicFormCacheModule; }
        return function () { return localStore.get(getCacheKey(rootProps.dynamic), module); };
    };
    var getFormCacheIO = IO.of(getCache());
    var getVisibleCacheIO = IO.of(getCache(DynamicFormVisibleCacheModule));
    var setCache = function (module) {
        if (module === void 0) { module = DynamicFormCacheModule; }
        return function (val) {
            try {
                localStore.set(getCacheKey(rootProps.dynamic), val, void 0, module);
            }
            catch (_a) {
                cxTableWarn("can't set dynamic form cache from dynamicConfig:", rootProps.dynamic);
            }
        };
    };
    var setFormCacheIO = IO.of(setCache());
    var setVisibleCacheIO = IO.of(setCache(DynamicFormVisibleCacheModule));
    return { getFormCacheIO: getFormCacheIO, getVisibleCacheIO: getVisibleCacheIO, setFormCacheIO: setFormCacheIO, setVisibleCacheIO: setVisibleCacheIO };
};

var useDynamicFormSearch = function () {
    var _a = useCxTableCompose(), getParamsItems = _a.getParamsItems, getConfigByDynamicConfig = _a.getConfigByDynamicConfig, arrNotEmpty = _a.arrNotEmpty;
    var context = useCxTable().getContext();
    var devTip = R.tap(unsafeWhenDevCall(function (dynamic) {
        return console.info("[CxTable]:dynamic form auto fetchData by config ", changeDynamicIdToText(dynamic));
    }));
    var errorDevTip = unsafeWhenDevCall(function (dynamic) {
        cxTableWarn("can't match api by config ", changeDynamicIdToText(dynamic));
    });
    var initRequestParams = function (rootProp, form, currentFormItems, tableDataVisitor) {
        var _a;
        var setItems = R.set(R.lensProp('items'), getParamsItems(form, currentFormItems));
        var mergeSort = R.mergeLeft(R.zipObj(['sortDirection', 'sortProp'], [tableDataVisitor.sortStatus, tableDataVisitor.sortProp]));
        var mergePagination = R.mergeLeft(R.pick(['currentPage', 'pageCapacity'], R.prop('pagination', rootProp)));
        var beforeSearchIsExist = function () { var _a; return truthy((_a = rootProp.hooks) === null || _a === void 0 ? void 0 : _a.beforeSearch); };
        return R.compose(R.when(beforeSearchIsExist, (_a = rootProp.hooks) === null || _a === void 0 ? void 0 : _a.beforeSearch), setItems, mergeSort, mergePagination, R.prop('dynamic'))(rootProp);
    };
    var updateTableData = R.curryN(2, function (data, rootProp) {
        var _a, _b;
        var rows = data.rows, total = data.total;
        isNumber(total) && Maybe.of(rootProp.pagination).map(unsafeSet(R.__, 'total', total));
        if (!Array.isArray(rows))
            return;
        if (R.isEmpty(rows) && R.gt(R.defaultTo(0, (_a = rootProp.pagination) === null || _a === void 0 ? void 0 : _a.currentPage), 1)) {
            rootProp.pagination.currentPage--;
        }
        else {
            R.compose(R.when(R.is(Array), unsafeClearPush(R.__, rootProp.tableData)), R.ifElse(R.is(Function), function (cb) { return cb(rows, data); }, R.always(rows)))((_b = rootProp.hooks) === null || _b === void 0 ? void 0 : _b.onSearch);
        }
    });
    var updateTotal = R.useWith(unsafeClearAssign, [
        R.identity,
        R.prop('entireTotalSum')
    ]);
    var checkDynamic = function (dynamic) {
        if (!dynamic) {
            cxTableWarn("can't fetch data if dynamic ", dynamic, " is invalid");
            throw 'invalid dynamic';
        }
    };
    var matchedRule = R.compose(getMaybeValue, R.converge(getConfigByDynamicConfig, [
        R.identity,
        R.compose(R.prop(R.__, context.dynamicFormContext.requestApiMap), R.prop('moduleType'))
    ]));
    var search = function (rootProp, form, currentFormItems, tableDataVisitor) { return __awaiter(void 0, void 0, void 0, function () {
        var dynamic, matchedRuleEither;
        return __generator(this, function (_a) {
            dynamic = rootProp.dynamic;
            checkDynamic(dynamic);
            matchedRuleEither = R.compose(R.ifElse(R.isNil, Left.of, Right.of), matchedRule);
            return [2 /*return*/, either(withParams(errorDevTip, [dynamic]), function (rule) { return __awaiter(void 0, void 0, void 0, function () {
                    var rulePropVal, stateEq200, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                devTip(dynamic);
                                rulePropVal = R.prop(R.__, rule);
                                stateEq200 = R.propEq('state', 200);
                                _a = R.when(stateEq200, R.compose(updateTableData(R.__, rootProp), R.prop('data')));
                                return [4 /*yield*/, rulePropVal('requestInstance').postJSON(rulePropVal('api'), initRequestParams(rootProp, form, currentFormItems, tableDataVisitor))];
                            case 1:
                                _a.apply(void 0, [_b.sent()]);
                                return [2 /*return*/];
                        }
                    });
                }); }, matchedRuleEither(dynamic))];
        });
    }); };
    var searchTotal = function (rootProp, form, currentFormItems, tableDataVisitor, CxTable) { return __awaiter(void 0, void 0, void 0, function () {
        var dynamic, matchedRuleEither;
        return __generator(this, function (_a) {
            dynamic = rootProp.dynamic;
            checkDynamic(dynamic);
            matchedRuleEither = R.compose(R.ifElse(R.isNil, Left.of, Right.of), matchedRule);
            return [2 /*return*/, either(R.converge(errorDevTip, [R.always(dynamic)]), function (rule) { return __awaiter(void 0, void 0, void 0, function () {
                    var rulePropVal, stateEq200, requestInstance, getTotals, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                rulePropVal = R.prop(R.__, rule);
                                stateEq200 = R.propEq('state', 200);
                                requestInstance = rulePropVal('requestInstance');
                                getTotals = R.compose(getMaybeValue, map(R.objOf('totals')), map(R.map(R.prop('prop'))), map(R.filter(R.compose(truthy, R.prop('sum')))), map(R.prop('flatColumns')), Maybe.of);
                                _a = R.when(stateEq200, R.compose(R.curryN(3, R.call)(updateTotal, R.__, CxTable), R.prop('data')));
                                return [4 /*yield*/, R.compose(R.ifElse(R.compose(arrNotEmpty, R.prop('totals')), R.compose(R.converge(requestInstance.postJSON.bind(requestInstance), [
                                        R.always('/header/total'),
                                        R.identity
                                    ]), R.mergeLeft(initRequestParams(rootProp, form, currentFormItems, tableDataVisitor))), defaultPromise({})), getTotals)(CxTable)];
                            case 1:
                                _a.apply(void 0, [_b.sent()]);
                                return [2 /*return*/];
                        }
                    });
                }); }, matchedRuleEither(dynamic))];
        });
    }); };
    return { initRequestParams: initRequestParams, updateTableData: updateTableData, search: search, searchTotal: searchTotal };
};

var TeleForm = defineComponent({
    name: 'TeleForm',
    props: {
        dynamicColumn: { type: Array, required: true },
        tableDataVisitor: { type: Object, required: true },
        loading: { type: Boolean }
    },
    emit: ['update:loading'],
    setup: function (props, _a) {
        var _this = this;
        var emit = _a.emit;
        var _hoisted_direction = resolveDirective('loading');
        var rootProp = inject('rootProp');
        var bus = inject('bus');
        var CxTable = inject('CxTable');
        var cache = useDynamicFormCache(rootProp);
        var _b = useCxTableCompose(), getOptionListFromColumn = _b.getOptionListFromColumn, getDefaultFormItem = _b.getDefaultFormItem, getCurrentFormConfig = _b.getCurrentFormConfig, isRenderInTeleport = _b.isRenderInTeleport, isEmptyValue = _b.isEmptyValue, isPositive = _b.isPositive, arrayIsNotEmpty = _b.arrayIsNotEmpty, getTargetColumnDefault = _b.getTargetColumnDefault;
        var _c = useDynamicFormSearch(), search = _c.search, searchTotal = _c.searchTotal;
        // 当前展示的表单项
        var currentFormItems = reactive(R.defaultTo([], cache.getFormCacheIO.unsafePerformIO()));
        var getCurrentFormItems = R.always(currentFormItems);
        var oldCurrentFormItems = __spreadArray([], __read(currentFormItems));
        watch(getCurrentFormItems, function () {
            var defaultNotEmpty = R.find(R.compose(R.not, R.isNil, R.path(['searchStates', 'searchDefault']), R.flip(R.find)(props.dynamicColumn), R.curryN(2, R.pathEq)(['prop'])));
            R.when(R.allPass([arrayIsNotEmpty, defaultNotEmpty]), R.compose(fetchAllData, R.forEach(setDefaultValueByProp)))(R.difference(currentFormItems, oldCurrentFormItems));
            unsafeClearPush(currentFormItems, oldCurrentFormItems);
        }, { deep: true });
        // 表单
        var form = reactive({});
        var initForm = function (form) {
            unsafeClearObj(form);
            currentFormItems.forEach(setDefaultValueByProp);
        };
        var getDefaultValueByProp = R.compose(getTargetColumnDefault, R.converge(getTargetColumn, [R.identical, function () { return props.dynamicColumn; }]));
        var setDefaultValueByProp = function (prop) {
            getDefaultValueByProp(prop).map(unsafeSet(form, prop));
        };
        // 表格体loading
        var _d = __read(useSync(props, emit, ['loading']), 1), loading = _d[0];
        var setLoading = function (val) { return (loading.value = val); };
        // 表单loading
        var _e = __read(useState(false), 2), formLoading = _e[0], setFormLoading = _e[1];
        // 当使用teleportForm时的承载容器
        var _f = __read(useState(null), 2), container = _f[0], setContainer = _f[1];
        var formConfig = reactive([]);
        // 允许的表单项{id,name}[]
        var searchableOptionList = reactive([]);
        var setSearchableOptionList = unsafeClearPush(R.__, searchableOptionList);
        var unsafeUpdateConfig = function () {
            return unsafeClearPush(getCurrentFormConfig(props.dynamicColumn, currentFormItems), formConfig);
        };
        watch(getCurrentFormItems, R.compose(unsafeUpdateConfig, function (val) {
            cache.setFormCacheIO.unsafePerformIO(val);
        }), { deep: true });
        var fetchTableData = debounce$1(function () {
            setLoading(true);
            unsafeClearArray(rootProp.tableData);
            search(rootProp, form, currentFormItems, props.tableDataVisitor)["finally"](function () {
                setLoading(false);
            });
        }, 100);
        var fetchAllData = debounce$1(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fetchTableData();
                        return [4 /*yield*/, nextTick()];
                    case 1:
                        _a.sent();
                        CxTable.entireTotalSum = {};
                        R.when(R.prop('showForm'), R.converge(searchTotal, [
                            R.always(rootProp),
                            R.always(form),
                            R.always(currentFormItems),
                            R.always(props.tableDataVisitor),
                            R.always(CxTable)
                        ]))(rootProp);
                        return [2 /*return*/];
                }
            });
        }); }, 50);
        var onSearch = nextTimeout(function (payload) {
            // 处理states
            // R.when(R.compose(R.not, R.prop<string, boolean>('visible')), toggleVisibleStates)(states);
            // 处理payload
            R.when(R.is(Object), R.compose(unsafePush(R.__, currentFormItems), R.flip(R.difference)(currentFormItems), R.keys, R.tap(unsafeAssign(R.__, form)), R.pick(R.map(R.prop('id'), getOptionListFromColumn(props.dynamicColumn)))))(payload);
            fetchAllData();
        });
        bus.on('search', onSearch);
        var onClose = function (prop) {
            R.compose(R.when(isPositive, unsafeRemoveItem(R.__, currentFormItems)), R.findIndex(R.equals(prop)))(currentFormItems);
            var value = form[prop];
            var removeItemFromConfig = unsafeRemoveItem(R.__, formConfig);
            var removePropFromForm = function () { return Reflect.deleteProperty(form, prop); };
            var reFetchData = R.compose(R.unless(isEmptyValue, fetchAllData), R.always(value));
            var initForm = R.compose(removePropFromForm, removeItemFromConfig);
            R.compose(R.when(isPositive, R.compose(reFetchData, initForm)), R.findIndex(R.pathEq(['prop'], prop)))(formConfig);
        };
        var currentInstance = getCurrentInstance();
        var renderDynamicFormAdd = function () {
            return [createVNode(DynamicFormAdd, {
                    currentInstance: currentInstance,
                    options: searchableOptionList,
                    modelValue: currentFormItems,
                    'onUpdate:modelValue': unsafeClearPush(R.__, currentFormItems)
                }, null, PATCH_FLAG.FULL_PROPS)];
        };
        // const states = reactive(
        //   cache.getVisibleCacheIO.map(R.compose(R.objOf('visible'), R.ifElse(R.isNil, R.T, R.identity))).unsafePerformIO()
        // );
        var states = reactive({ visible: true });
        // const toggleVisibleStates = () => (states.visible = !states.visible);
        // watch(
        //   () => states.visible,
        //   cache.setVisibleCacheIO.unsafePerformIO.bind(cache.setVisibleCacheIO)
        // );
        // const _hoisted_attrs_1 = { class: 'cx_dp_flex cx_justify_end cx_mb_16' };
        // const _hoisted_attrs_2 = { class: 'cx_line cx_mb_12 cx_mlr_0 cx_w_100p' };
        var _hoisted_attrs_3 = { "class": 'cx_dp_flex' };
        // const _hoisted_node_1 = createVNode('div', _hoisted_attrs_2);
        var renderForm = function () {
            return createVNode('div', { "class": 'cx-table_tele_form' }, [
                // createVNode('div', _hoisted_attrs_1, [
                //   createVNode(DynamicFilterBtn, {
                //     onClick: toggleVisibleStates,
                //     states
                //   })
                // ]),
                // _hoisted_node_1,
                createVNode('div', _hoisted_attrs_3, [
                    withDirectives(createVNode(TeleFormInstance, { states: states, form: form, items: formConfig, onChange: fetchAllData, onClose: onClose }, { add: renderDynamicFormAdd }, PATCH_FLAG.FULL_PROPS), [[_hoisted_direction !== null && _hoisted_direction !== void 0 ? _hoisted_direction : {}, formLoading()]])
                ])
            ]);
        };
        // unsafeClearDom::void->string
        var unsafeClearEle = R.compose(map(unsafeSet(R.__, 'innerHTML', '')), Maybe.of);
        // renderVNodeToDom::HTMLElement->void
        var renderVNodeToDom = R.compose(R.converge(render$8, [renderForm, R.identity]), R.tap(unsafeClearEle), R.tap(unsafeDeleteProperty(R.__, '_vnode')));
        var unsafeWarn = function () {
            return cxTableWarn("can't find container element by selector", rootProp.formTeleport);
        };
        // 组件更新IO
        var updateComponentIO = IO.of(queryDom).map(R.ifElse(R.isNil, R.compose(unsafeWarn, unsafeClearEle, container), R.compose(map(renderVNodeToDom), Maybe.of, setContainer)));
        watch(function () { return props.dynamicColumn; }, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nextTick()];
                    case 1:
                        _a.sent();
                        unsafeUpdateConfig();
                        cache.getFormCacheIO
                            .map(R.compose(unsafeClearPush(R.__, currentFormItems), R.defaultTo(getDefaultFormItem(props.dynamicColumn))))
                            .unsafePerformIO();
                        initForm(form);
                        setSearchableOptionList(getOptionListFromColumn(props.dynamicColumn));
                        setFormLoading(false);
                        fetchAllData();
                        R.ifElse(isRenderInTeleport, R.always(updateComponentIO), getDoNothingIO)(rootProp).unsafePerformIO(rootProp.formTeleport);
                        return [2 /*return*/];
                }
            });
        }); });
        watch(function () { return rootProp.dynamic; }, function () {
            setFormLoading(true);
            cache.getVisibleCacheIO
                .map(R.compose(unsafeSet(states, 'visible'), R.ifElse(R.isNil, R.T, R.identity)))
                .unsafePerformIO();
        });
        watch([function () { var _a; return (_a = rootProp.pagination) === null || _a === void 0 ? void 0 : _a.currentPage; }, function () { var _a; return (_a = rootProp.pagination) === null || _a === void 0 ? void 0 : _a.pageCapacity; }], fetchTableData);
        return withParams(R.ifElse(isRenderInTeleport, R.always(''), renderForm), [rootProp]);
    }
});

//
var zIndex = 1500;
var script$a = defineComponent({
    name: 'CxOverlay',
    props: { disabled: { type: Boolean, "default": false }, lockScroll: { type: Boolean, "default": false } },
    setup: function () {
        return { zIndex: zIndex++ };
    }
});

function render$5(_ctx, _cache) {
  return (openBlock(), createBlock("div", {
    onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('click'))),
    style: {'--zIndex':_ctx.zIndex},
    class: {'cx-overlay':true ,'cx-overlay__disabled':_ctx.disabled,'cx_of_auto':!_ctx.lockScroll}
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 6 /* CLASS, STYLE */))
}

script$a.render = render$5;
script$a.__file = "src/lib/cx-overlay/cx-overlay.vue";

//
var script$9 = defineComponent({
    name: 'CxDialog',
    components: { CxOverlay: script$a },
    emits: ['register', 'close', 'closed', 'open', 'opened', 'ok', 'cancel'],
    props: {
        cancelText: { type: String, "default": '取消', },
        okText: { type: String, "default": '确认', },
        disabledOk: { type: Boolean, "default": false },
        okLoading: { type: Boolean, "default": false },
        title: { type: String },
        width: { type: [String, Number], "default": '50%' },
        top: { type: [String, Number], "default": '50px' },
        showFullScreen: { type: Boolean, "default": true, },
        openDelay: { type: Number, "default": 0 },
        closeDelay: { type: Number, "default": 0 },
        closeOnClickModal: { type: Boolean, "default": false },
        closeOnPressEscape: { type: Boolean, "default": true },
        showClose: { type: Boolean, "default": true },
        beforeClose: { type: Function },
        destroyOnClose: { type: Boolean, "default": false },
        appendToBody: { type: Boolean, "default": false },
        modal: { type: Boolean, "default": true },
        lockScroll: { type: Boolean, "default": false },
        bodyStyle: { type: Object, "default": function () { return ({}); } }
    },
    setup: function (props, _a) {
        var expose = _a.expose, emit = _a.emit;
        var visible = ref(false);
        var bodyExist = ref(false);
        var isFullscreen = ref(false);
        var setVisible = function (v) {
            if (v === void 0) { v = true; }
            if (v) {
                visible.value = v;
                bodyExist.value = true;
                emit('open');
            }
            else {
                visible.value = v;
            }
        };
        var openDialog = function (v) {
            if (v === void 0) { v = true; }
            props[v ? 'openDelay' : 'closeDelay'] > 0 ? setTimeout(function () { return setVisible(v); }, props.openDelay) : setVisible(v);
        };
        function afterEnter() {
            emit('opened');
        }
        function afterLeave() {
            emit('closed');
            bodyExist.value = !props.destroyOnClose;
        }
        function beforeLeave() {
            emit('close');
        }
        var actions = {
            openDialog: function (v) {
                if (v === void 0) { v = true; }
                if (!v) {
                    props.beforeClose ? props.beforeClose(function () {
                        openDialog(v);
                    }) : openDialog(v);
                }
                openDialog(v);
            }
        };
        var keydownEvent = function (e) {
            (e.key === 'Escape' && visible.value && props.closeOnPressEscape) && openDialog(false);
        };
        onMounted(function () {
            emit('register', actions);
            document.body.addEventListener('keydown', keydownEvent, true);
        });
        onUnmounted(function () {
            document.body.removeEventListener('keydown', keydownEvent, true);
        });
        expose(actions);
        return { visible: visible, isFullscreen: isFullscreen, openDialog: openDialog, afterEnter: afterEnter, afterLeave: afterLeave, beforeLeave: beforeLeave, bodyExist: bodyExist };
    }
});

const _hoisted_1$3 = { class: "cx-overlay-dialog" };
const _hoisted_2$1 = { class: "cx-dialog__header" };
const _hoisted_3$1 = { class: "cx-dialog__title cx_fs_18" };
const _hoisted_4$1 = /*#__PURE__*/createVNode("div", { class: "cx_line cx_mlr_0 cx_w_100p" }, null, -1 /* HOISTED */);
const _hoisted_5$1 = /*#__PURE__*/createVNode("div", { class: "cx_line cx_mlr_0 cx_w_100p" }, null, -1 /* HOISTED */);
const _hoisted_6$1 = { class: "cx-dialog__footer" };
const _hoisted_7$1 = { class: "cx_flex_center cx_justify_end" };

function render$4(_ctx, _cache) {
  const _component_cx_btn = resolveComponent("cx-btn");
  const _component_cx_overlay = resolveComponent("cx-overlay");

  return (openBlock(), createBlock(Teleport, {
    to: "body",
    disabled: !_ctx.appendToBody
  }, [
    createVNode(Transition, {
      name: "dialog-fade",
      onAfterEnter: _ctx.afterEnter,
      onAfterLeave: _ctx.afterLeave,
      onBeforeLeave: _ctx.beforeLeave
    }, {
      default: withCtx(() => [
        withDirectives(createVNode(_component_cx_overlay, {
          disabled: !_ctx.modal,
          lockScroll: _ctx.lockScroll,
          onClick: _cache[6] || (_cache[6] = $event => (_ctx.closeOnClickModal && _ctx.openDialog(false)))
        }, {
          default: withCtx(() => [
            createVNode("div", _hoisted_1$3, [
              createVNode("div", mergeProps({
                class: ["cx-dialog", {'is-fullscreen':_ctx.isFullscreen,'cx-dialog__border':!_ctx.modal}],
                style: {'--width':_ctx.width,'--top':_ctx.top}
              }, _ctx.$attrs, {
                onClick: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"]))
              }), [
                createVNode("header", _hoisted_2$1, [
                  createVNode("h2", _hoisted_3$1, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(_ctx.title), 1 /* TEXT */)
                    ])
                  ]),
                  createVNode("div", null, [
                    (_ctx.showFullScreen)
                      ? (openBlock(), createBlock("i", {
                          key: 0,
                          class: `iconfont icon-${_ctx.isFullscreen?'fullscreen-shrink':'fullscreen-expand'}`,
                          onClick: _cache[1] || (_cache[1] = $event => (_ctx.isFullscreen=!_ctx.isFullscreen)),
                          title: _ctx.isFullscreen?'退出全屏':'全屏'
                        }, null, 10 /* CLASS, PROPS */, ["title"]))
                      : createCommentVNode("v-if", true),
                    (_ctx.showClose)
                      ? (openBlock(), createBlock("i", {
                          key: 1,
                          class: "iconfont icon-close",
                          onClick: _cache[2] || (_cache[2] = $event => (_ctx.openDialog(false))),
                          title: "关闭弹窗"
                        }))
                      : createCommentVNode("v-if", true)
                  ])
                ]),
                _hoisted_4$1,
                (_ctx.bodyExist)
                  ? (openBlock(), createBlock("section", {
                      key: 0,
                      class: "cx-dialog__body",
                      style: _ctx.bodyStyle
                    }, [
                      renderSlot(_ctx.$slots, "default", { isFullscreen: _ctx.isFullscreen })
                    ], 4 /* STYLE */))
                  : createCommentVNode("v-if", true),
                _hoisted_5$1,
                createVNode("footer", _hoisted_6$1, [
                  renderSlot(_ctx.$slots, "footer", {}, () => [
                    createVNode("div", _hoisted_7$1, [
                      (_ctx.cancelText)
                        ? (openBlock(), createBlock(_component_cx_btn, {
                            key: 0,
                            onClick: _cache[3] || (_cache[3] = $event => (_ctx.openDialog(false),_ctx.$emit('cancel')))
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.cancelText), 1 /* TEXT */)
                            ]),
                            _: 1 /* STABLE */
                          }))
                        : createCommentVNode("v-if", true),
                      (_ctx.okText)
                        ? (openBlock(), createBlock(_component_cx_btn, {
                            key: 1,
                            level: "1",
                            class: "cx_ml_16",
                            loading: _ctx.okLoading,
                            disabled: _ctx.disabledOk,
                            onClick: _cache[4] || (_cache[4] = $event => (_ctx.$emit('ok')))
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.okText), 1 /* TEXT */)
                            ]),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["loading", "disabled"]))
                        : createCommentVNode("v-if", true)
                    ])
                  ])
                ])
              ], 16 /* FULL_PROPS */)
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["disabled", "lockScroll"]), [
          [vShow, _ctx.visible]
        ])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
  ], 8 /* PROPS */, ["disabled"]))
}

script$9.render = render$4;
script$9.__file = "src/lib/cx-dialog/cx-dialog.vue";

script$9.install = function (app) {
    app.component(script$9.name, script$9);
};
var _CX_DIALOG = script$9;

function useCxDialog() {
    var dialogRef = ref(null);
    function register(instance) {
        onUnmounted(function () {
            dialogRef.value = null;
        });
        dialogRef.value = instance;
    }
    function getDialogInstance() {
        var dialog = unref(dialogRef);
        if (!dialog) {
            throw new Error("can't get dialog's instance before register");
        }
        return dialog;
    }
    var methods = {
        openDialog: function (visible) {
            if (visible === void 0) { visible = true; }
            getDialogInstance().openDialog(visible);
        }
    };
    return [register, methods];
}

//
var script$8 = defineComponent({
    name: 'CxEllipsis',
    props: {
        content: { "default": '' },
        activeBgColor: { type: String, "default": '#fff' },
        placement: { type: String, "default": 'left' }
    },
    setup: function (props) {
        var containerRef = ref(null);
        var contentRef = ref(null);
        var tipVisible = ref(false);
        var paddingRight = ref('0');
        function calcContentWidth() {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var el, pW, wrapW, pdLeft, pdRight, realWidth;
                return __generator(this, function (_b) {
                    el = contentRef.value;
                    if (!el || !containerRef.value)
                        return [2 /*return*/];
                    pW = el === null || el === void 0 ? void 0 : el.clientWidth;
                    wrapW = ((_a = containerRef.value) === null || _a === void 0 ? void 0 : _a.clientWidth) || 80;
                    pdLeft = parseFloat(getComputedStyle(containerRef.value).paddingLeft);
                    pdRight = parseFloat(getComputedStyle(containerRef.value).paddingRight);
                    paddingRight.value = pdRight + 'px';
                    realWidth = wrapW - pdLeft - pdRight;
                    tipVisible.value = pW > realWidth;
                    return [2 /*return*/];
                });
            });
        }
        var resizeFn = function () { return calcContentWidth(); };
        onMounted(function () {
            calcContentWidth();
            addResizeListener(contentRef.value, resizeFn);
        });
        onUnmounted(function () {
            removeResizeListener(contentRef.value, resizeFn);
        });
        var renderContent = computed(function () {
            if (isString(props.content) || isNumber(props.content)) {
                return props.content;
            }
            if (isArray(props.content)) {
                return props.content.join(',');
            }
            if (isObject$1(props.content)) {
                return JSON.stringify(props.content);
            }
            return props.content;
        });
        var popperConfig = reactive({
            text: props.content,
            visible: tipVisible.value,
            controlType: 'mouse',
            placement: props.placement
        });
        watch([function () { return props.content; }, function () { return props.placement; }, tipVisible], function (_a) {
            var _b = __read(_a, 3), content = _b[0], placement = _b[1], tipVisible = _b[2];
            popperConfig.text = content;
            popperConfig.placement = placement;
            popperConfig.visible = tipVisible;
        });
        return {
            popperConfig: popperConfig,
            renderContent: renderContent,
            containerRef: containerRef,
            tipVisible: tipVisible,
            paddingRight: paddingRight,
            contentRef: contentRef
        };
    }
});

const _withId$2 = /*#__PURE__*/withScopeId("data-v-506ab1f0");

pushScopeId("data-v-506ab1f0");
const _hoisted_1$2 = { style: {"overflow":"hidden"} };
popScopeId();

const render$3 = /*#__PURE__*/_withId$2((_ctx, _cache) => {
  const _directive_uni_popper = resolveDirective("uni-popper");

  return withDirectives((openBlock(), createBlock("div", {
    ref: "containerRef",
    class: ["cx-ellipsis", { ellipsis: _ctx.tipVisible }],
    style: { '--paddingRight': _ctx.paddingRight, '--bgColor': _ctx.activeBgColor }
  }, [
    createVNode("div", _hoisted_1$2, [
      createVNode("p", {
        ref: "contentRef",
        class: "tips"
      }, toDisplayString(_ctx.renderContent), 513 /* TEXT, NEED_PATCH */)
    ])
  ], 6 /* CLASS, STYLE */)), [
    [_directive_uni_popper, _ctx.popperConfig]
  ])
});

script$8.render = render$3;
script$8.__scopeId = "data-v-506ab1f0";
script$8.__file = "src/lib/cx-ellipsis/cx-ellipsis.vue";

script$8.install = function (app) {
    app.component(script$8.name, script$8);
};
var _CX_ELLIPSIS = script$8;

var DEFAULT_CAPACITY = 10;
var cacheListDialog = defineComponent({
    name: 'CacheListDialog',
    setup: function (_, _a) {
        var _b;
        var expose = _a.expose;
        var rootProp = inject('rootProp');
        var rootSlots = inject('rootSlots');
        var $CxTable = inject('CxTable');
        var bus = inject('bus');
        var _c = useCxTableCompose(), getParamsItems = _c.getParamsItems, getConfigByDynamicConfig = _c.getConfigByDynamicConfig, arrNotEmpty = _c.arrNotEmpty;
        var context = useCxTable().getContext();
        var getDefaultRequestInstance = (function () {
            return R.path(['dynamicCacheContext', 'requestInstance', 'default'], context);
        });
        var getRequestApiMap = (function () {
            return R.path(['dynamicCacheContext', 'requestApiMap'], context);
        });
        var getRemoveApiMap = (function () {
            return R.path(['dynamicCacheContext', 'removeApiMap'], context);
        });
        var getLabelConfig = (function () {
            return R.path(['dynamicCacheContext', 'cacheLabelConfig'], context);
        });
        var getTabCondition = (function () {
            return R.path(['dynamicCacheContext', 'cacheTypeTab'], context);
        });
        var getMessageInstance = (function () { return R.path(['messageInstance'], context); });
        var needTypeTab = R.ifElse(R.is(Function), function (condition) { return condition(rootProp); }, R.T);
        var _d = __read(useCxDialog(), 2), register = _d[0], dialogExpose = _d[1];
        var openDialog = function () {
            resetForm();
            resetPage();
            setCurrentType(TypeOption.未提交);
            dialogExpose.openDialog();
        };
        expose({
            openDialog: openDialog
        });
        var _e = __read(useState(TypeOption.未提交), 2), currentType = _e[0], setCurrentType = _e[1];
        var typeOptionList = enum2Options(TypeOption);
        var resetPage = function () {
            setActiveItem(null);
            unsafeClearArray(orderList());
            setHasDone(false);
        };
        // ------------------------------ 表单 ------------------------------
        var form = reactive({ gmtCreate: [] });
        var resetForm = function () {
            unsafeClearObj(form);
            form.gmtCreate = [];
        };
        var items = [{ label: '提交日期', prop: 'gmtCreate', dateRange: {} }];
        // ------------------------------ 数据源 ------------------------------
        // 左侧列表相关
        var _f = __read(useState(null), 2), activeItem = _f[0], setActiveItem = _f[1];
        var _g = __read(useState(false), 2), hasDone = _g[0], setHasDone = _g[1];
        var _h = __read(useState([]), 1), orderList = _h[0];
        // 右侧明细相关
        var tableData = useComputed(R.compose(R.prop('rows'), R.prop('content'), R.defaultTo({}), activeItem));
        var tableConfig = reactive({ items: [] });
        var setTableConfig = unsafeClearPush(R.__, tableConfig.items);
        var _j = __read(useState([]), 2), globalConfig = _j[0], setGlobalConfig = _j[1];
        var getGlobalConfig = R.nAry(0, globalConfig);
        var initTableConfig = R.ifElse(R.is(Array), R.map(CxConfigAdaptor.of), R.always([]));
        var initAndSetConfig = R.compose(setTableConfig, initTableConfig);
        watch(function () { return activeItem(); }, nextTimeout(R.compose(R.ifElse(arrNotEmpty, initAndSetConfig, R.converge(initAndSetConfig, [getGlobalConfig])), R.prop('table'), R.defaultTo({}))));
        // ------------------------------ api ------------------------------
        // paramsGenerator::DYNAMIC_CONFIG|undefined->AnyObject->Params
        var paramsGenerator = function (dynamic, form) {
            var getItemObj = R.compose(R.objOf('items'), R.converge(getParamsItems, [R.identity, R.always(R.of('gmtCreate'))]));
            var mergeDynamic = R.mergeLeft(R.defaultTo({}, dynamic));
            var mergePage = R.mergeLeft(R.zipObj(['queryIndex', 'pageCapacity'], [R.length(orderList()), DEFAULT_CAPACITY]));
            var mergeOrderType = R.when(R.compose(truthy, R.nAry(0, currentType)), R.mergeLeft(R.objOf('orderType', currentType())));
            return R.compose(Maybe.of, mergeOrderType, mergeDynamic, mergePage, getItemObj)(form);
        };
        var getInnerTable = R.path(['data']);
        var moduleTypePath = R.path(['dynamic', 'moduleType']);
        var getSpecialAxios = R.compose(R.defaultTo(getDefaultRequestInstance()), R.prop(R.__, context.dynamicCacheContext.requestInstance));
        var sendRequestIO = IO.of(function () {
            return Maybe.run((function () {
                var api, params, instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Maybe.of(R.prop(currentType(), getRequestApiMap()))];
                        case 1:
                            api = _a.sent();
                            return [4 /*yield*/, paramsGenerator(rootProp.dynamic, form)];
                        case 2:
                            params = _a.sent();
                            return [4 /*yield*/, R.compose(Maybe.of, R.ifElse(isDraft, getDefaultRequestInstance, R.compose(getSpecialAxios, R.converge(moduleTypePath, [R.always(rootProp)]))))(currentType())];
                        case 3:
                            instance = _a.sent();
                            return [2 /*return*/, R.andThen(R.compose(Maybe.of, R.ifElse(stateEq200, getInnerTable, R.always(void 0))), instance.postJSON(api, params))];
                    }
                });
            })());
        });
        var maybePropTotal = R.compose(Maybe.of, R.prop('total'));
        var maybePropRows = R.compose(Maybe.of, R.prop('rows'));
        var maybePropTable = R.compose(Maybe.of, R.prop('table'));
        var getOrderList = function () { return orderList(); };
        var isHasDone = R.converge(R.gte, [R.compose(R.length, getOrderList), R.identity]);
        var pushInOrderList = R.converge(unsafePush, [R.identity, getOrderList]);
        var fetchHandleIO = sendRequestIO.map(map(R.andThen(map(R.compose(R.tap(R.compose(map(setGlobalConfig), maybePropTable)), R.tap(R.compose(map(R.compose(setHasDone, isHasDone)), maybePropTotal)), R.tap(R.compose(map(pushInOrderList), maybePropRows)), R.pick(['total', 'rows', 'table']))))));
        var setDefaultActive = R.converge(R.when(R.compose(R.isNil, R.nAry(0, activeItem)), R.converge(setActiveItem, [R.compose(R.head, getOrderList)])), [R.F]);
        var fetchData = R.converge(R.ifElse(R.complement(hasDone), fetchHandleIO.unsafePerformIO.bind(fetchHandleIO), Maybe.none), [R.F]);
        var scrollFetchRequest = R.compose(map(R.andThen(setDefaultActive)), fetchData);
        var scrollFetch = debounce$1(scrollFetchRequest, 50);
        var conditionChangeFetch = R.compose(scrollFetch, resetPage);
        watch(currentType, conditionChangeFetch);
        var lock = false;
        var getLock = function () { return lock; };
        var setLock = function (val) {
            if (val === void 0) { val = true; }
            return (lock = val);
        };
        var removeFetch = R.ifElse(getLock, R.identity, R.compose(R.compose(map(R.andThen(R.converge(setLock, [R.F]))), scrollFetchRequest), setLock, R.T));
        // ------------------------------ 删除 ------------------------------
        var isDraft = R.equals(TypeOption.未提交);
        var getQueryCompose = function (dynamic) {
            return R.ifElse(R.compose(R.not, isDraft, R.prop('type')), R.always(dynamic), R.empty);
        };
        var getSendRequestWithId = function (requestType) {
            return function (params) { return sendRequestWithId(requestType, params); };
        };
        function sendRequestWithId(requestType, params) {
            var id, api, paramId, url, urlWithId, query, instance;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = params.id, api = params.api;
                        return [4 /*yield*/, Maybe.of(id)];
                    case 1:
                        paramId = _b.sent();
                        return [4 /*yield*/, Maybe.of(api)];
                    case 2:
                        url = _b.sent();
                        return [4 /*yield*/, Maybe.of(R.concat(url, R.toString(paramId)))];
                    case 3:
                        urlWithId = _b.sent();
                        query = getQueryCompose(rootProp.dynamic)(params);
                        return [4 /*yield*/, Maybe.of((_a = getDefaultRequestInstance()) === null || _a === void 0 ? void 0 : _a[requestType])];
                    case 4:
                        instance = _b.sent();
                        return [2 /*return*/, instance.bind(getDefaultRequestInstance())(urlWithId, query)];
                }
            });
        }
        var removeItemIO = IO.of(R.compose(Maybe.run, getSendRequestWithId('delete')));
        var doRemove = function (id) {
            var index = R.findIndex(R.pathEq(['form', 'id'], id), orderList());
            R.when(R.lte(0), unsafeRemoveItem(R.__, orderList()))(index);
            R.when(R.pathEq(['form', 'id'], id), R.converge(setActiveItem, [R.always(null)]))(activeItem());
            R.when(R.compose(R.gte(10), R.length), removeFetch)(orderList());
        };
        var removeItem = function (id) {
            var _a;
            removeItemIO
                .map(map(R.andThen(R.when(stateEq200, R.converge(doRemove, [R.always(id)])))))
                .unsafePerformIO({ id: id, api: (_a = getRemoveApiMap()) === null || _a === void 0 ? void 0 : _a[currentType()] });
        };
        var setBusOn = function (params) {
            bus.on('removeCacheItem', function () {
                var _a;
                removeItemIO.unsafePerformIO(R.assoc('api', (_a = getRemoveApiMap()) === null || _a === void 0 ? void 0 : _a[currentType()], params));
                setBusOff();
            });
        };
        var setBusOff = function () {
            bus.off('removeCacheItem');
        };
        // 使用数组绑定会出现异常触发的情况
        watch(function () { return rootProp.dynamic.businessType; }, setBusOff);
        watch(function () { return rootProp.dynamic.modelType; }, setBusOff);
        // ------------------------------ 提交 ------------------------------
        var getOmitRows = R.curryN(3, function (rows, mainTableConfig, currentTableConfig) {
            var mapProp = R.map(R.prop('prop'));
            var diffProp = R.difference(mapProp(mainTableConfig), mapProp(currentTableConfig));
            return R.map(R.omit(diffProp), rows);
        });
        function mergeCacheData() {
            var content, rows, getEditRows, callHook, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0: return [4 /*yield*/, Maybe.of(R.path(['content'], activeItem()))];
                    case 1:
                        content = _q.sent();
                        return [4 /*yield*/, Maybe.of(R.path(['rows'], content))];
                    case 2:
                        rows = _q.sent();
                        getEditRows = getOmitRows(R.__, tableConfig.items, $CxTable.flatColumns);
                        unsafeClearPush(getEditRows(rows), rootProp.tableData);
                        dialogExpose.openDialog(false);
                        setBusOff();
                        setBusOn({ id: getId(activeItem()), type: currentType() });
                        _b = (_a = R).converge;
                        _c = [R.call];
                        _e = (_d = R).always;
                        return [4 /*yield*/, Maybe.of(R.path(['hooks', 'onGetCache'], rootProp))];
                    case 3:
                        _f = [
                            _e.apply(_d, [_q.sent()])
                        ];
                        _h = (_g = R).always;
                        _k = (_j = R).clone;
                        return [4 /*yield*/, Maybe.of(R.path(['cache'], content))];
                    case 4:
                        _f = _f.concat([
                            _h.apply(_g, [_k.apply(_j, [_q.sent()])]),
                            R.nAry(0, currentType),
                            R.always(getEditRows(rows))
                        ]);
                        _m = (_l = R).always;
                        _p = (_o = R).clone;
                        return [4 /*yield*/, Maybe.of(R.path(['form'], activeItem()))];
                    case 5:
                        callHook = _b.apply(_a, _c.concat([_f.concat([
                                _m.apply(_l, [_p.apply(_o, [_q.sent()])])
                            ])]));
                        // 目前暂不清楚为何在同步调用的情况下会出现弹窗无法正确关闭的问题,故使用setTimeout
                        setTimeout(callHook);
                        return [2 /*return*/];
                }
            });
        }
        var continueEdit = R.compose(Maybe.run, mergeCacheData);
        // ------------------------------ 判断是否存在 ------------------------------
        var existApiMap = (_b = {},
            _b[TypeOption.未提交] = '/draft/manager/draft/exist/',
            _b[TypeOption.已驳回] = '/draft/manager/order/exist/',
            _b[TypeOption.已反审] = '/draft/manager/order/exist/',
            _b);
        var orderIsExist = R.compose(Maybe.run, getSendRequestWithId('get'));
        var dataIsFalsy = R.allPass([stateEq200, R.compose(falsy, R.prop('data'))]);
        var notExistToast = R.converge(getMessageInstance().warning, [
            R.always('此数据已被删除,请重新打开暂存弹窗!')
        ]);
        // ------------------------------ 组合exist与submit ------------------------------
        var onOk = R.compose(map(R.andThen(R.ifElse(dataIsFalsy, continueEdit, notExistToast))), R.converge(orderIsExist, [
            R.converge(R.zipObj, [
                R.always(['id', 'api']),
                R.converge(R.pair, [
                    R.converge(R.path(['form', 'id']), [R.nAry(0, activeItem)]),
                    R.converge(R.prop, [R.nAry(0, currentType), R.always(existApiMap)])
                ])
            ])
        ]));
        // ------------------------------ 渲染函数 ------------------------------
        var _hoisted_direction_1 = resolveDirective('infinite-scroll');
        var _hoisted_class_1 = 'cx_secondary_title cx_pl_16 cx_ptb_12';
        var _hoisted_class_2 = 'cx_pl_16 cx_cursor_pointer cx_position_re hover_show_container';
        var _hoisted_class_3 = 'cx_of_auto cx_h_500';
        var _hoisted_class_4 = 'cx_ml_5 cx_mr_16';
        var _hoisted_class_5 = 'cx_flex_center cx_ptb_12 cx_plr_16 cx_bb';
        var _hoisted_class_6 = 'cx_p_16 cx_flex_center cx_justify_between';
        var _hoisted_class_7 = 'cx_dp_flex cx_bt cx_w_100p';
        var _hoisted_class_8 = 'cx_w_200 cx_br';
        var _hoisted_class_9 = 'cx_bb cx_ptb_16';
        var _hoisted_class_10 = 'cx_mb_12 cx_fs_14';
        var _hoisted_attrs_1 = {
            "class": 'iconfont icon-shanchu cx_position_ab hover_high_light_red hover_show',
            style: 'right:16px;bottom:16px'
        };
        var _hoisted_attrs_2 = { "class": _hoisted_class_3 };
        var _hoisted_attrs_3 = { style: { width: 'calc(100% - 200px)' } };
        var _hoisted_attrs_4 = { style: 'color: rgba(0, 0, 0, 0.45)' };
        var _hoisted_attrs_5 = __assign({ "class": 'cx_flex_center cx_justify_center' }, _hoisted_attrs_3);
        var renderTitle = function (content) {
            return createVNode('div', { "class": _hoisted_class_1 }, content, PATCH_FLAG.TEXT);
        };
        // getBaseInfo::object a,object b=>a->b
        var getBaseInfo = R.converge(R.mergeRight, [
            R.compose(R.defaultTo({}), R.path(['content', 'cache'])),
            R.compose(R.defaultTo({}), R.path(['form']))
        ]);
        // getId::object->number
        var getId = R.path(['form', 'id']);
        // titlePath Object a,Object b::a->b
        var titlePath = R.path(['config', 'listTitle']);
        // defaultTitle
        var defaultTitle = R.defaultTo('新建暂存数据');
        var renderListItem = R.curryN(2, function (item, currentItem) {
            var maybeConfig = getConfigByDynamicConfig(rootProp.dynamic, getLabelConfig());
            var getItemValByPath = R.converge(R.path, [R.identity, R.always(getBaseInfo(item))]);
            return createVNode('li', {
                "class": _hoisted_class_2,
                key: getId(item),
                style: R.compose(R.objOf('backgroundColor'), R.ifElse(R.pathEq(['form', 'id'], getId(currentItem)), R.always('#F0F5FF'), R.always('transparent')))(item),
                onClick: R.compose(setActiveItem, R.always(item))
            }, [
                createVNode('div', { "class": _hoisted_class_9 }, [
                    createVNode('div', { "class": _hoisted_class_10 }, R.compose(defaultTitle, getMaybeValue, map(R.compose(getItemValByPath)), map(R.compose(R.of)), map(R.compose(R.prop('prop'), titlePath)))(maybeConfig), PATCH_FLAG.TEXT),
                    createVNode('div', _hoisted_attrs_4, R.path(['form', 'gmtCreate'], item), PATCH_FLAG.TEXT),
                    createVNode('i', __assign(__assign({}, _hoisted_attrs_1), { onClick: R.compose(R.converge(removeItem, [R.always(getId(item))]), stopPropagation, preventDefault) }))
                ])
            ], PATCH_FLAG.FULL_PROPS);
        });
        var renderList = function (list) {
            return withDirectives(createVNode('ul', _hoisted_attrs_2, [
                (openBlock(),
                    createBlock(Fragment, null, R.map(renderListItem(R.__, activeItem()), list), PATCH_FLAG.KEYED_FRAGMENT))
            ]), [[_hoisted_direction_1 !== null && _hoisted_direction_1 !== void 0 ? _hoisted_direction_1 : {}, scrollFetch]]);
        };
        // infoPath Object a,Object b::a->b[]
        var infoPath = R.path(['config', 'tableInfo']);
        var labelItemList = useComputed(function () {
            var maybeConfig = getConfigByDynamicConfig(rootProp.dynamic, getLabelConfig());
            return R.compose(R.defaultTo([]), getMaybeValue, map(infoPath))(maybeConfig);
        });
        var renderOrderInfoItem = function (state, item) {
            var render = function (content) {
                var _a;
                return [
                    createVNode('label', null, ((_a = state["label_" + currentType()]) !== null && _a !== void 0 ? _a : state.label) + ":"),
                    createVNode('div', { "class": _hoisted_class_4 }, content !== null && content !== void 0 ? content : state.defaultValue, PATCH_FLAG.TEXT)
                ];
            };
            return R.compose(R.ifElse(truthy, render, R.always(null)), R.defaultTo(state.defaultValue), R.path([state.prop]))(item);
        };
        var renderOrderInfo = function (item) {
            return createVNode('article', { "class": _hoisted_class_5 }, R.compose(R.map(R.converge(renderOrderInfoItem, [R.identity, R.converge(getBaseInfo, [R.always(item)])])), labelItemList)());
        };
        var invokerWithChildren = function (cb) {
            return R.compose(cb, R.when(R.compose(R.is(Array), R.prop('children')), R.converge(R.set(R.lensProp('children')), [
                R.compose(R.map(cb), R.prop('children')),
                R.identity
            ])));
        };
        var labelContainer = (function (label) {
            return R.compose(truthy, R.find(R.includes(R.__, label)))(['操作', '选择', '多选']);
        });
        var noRequired = invokerWithChildren(R.omit(['required']));
        var setImgsType = R.compose(R.when(R.compose(R.includes(R.__, ['款型图', '蜡版图', 'CAD版图']), R.prop('label')), R.compose(R.set(R.lensProp('control'), R.objOf('type', 'imgs')), R.omit(['slot']))));
        var setDefaultSlot = R.compose(R.when(R.compose(R.all(falsy), R.props(['slot', 'calculate', 'dynamicCalculate'])), R.assoc('slot', 'renderWithText')));
        var imgsTypeInvoker = invokerWithChildren(setImgsType);
        var slotInvoker = invokerWithChildren(setDefaultSlot);
        var labelNotShow = R.compose(R.not, R.propSatisfies(labelContainer, 'label'));
        var colsParserProcess = R.compose(R.map(R.compose(imgsTypeInvoker, slotInvoker, noRequired)), R.filter(labelNotShow));
        var dynamicInject = R.compose(R.ifElse(R.is(Promise), R.andThen(colsParserProcess), colsParserProcess), R.when(R.converge(R.is(Function), [R.always(rootProp.dynamicInject)]), function (cols) { return rootProp.dynamicInject(cols); }));
        var renderOrderTable = function (config, dataList) {
            return createVNode(_CX_TABLE, __assign(__assign({ dynamicInject: dynamicInject }, R.pick(['ignoreControl'], rootProp)), { tableConfig: config, disabled: true, keyboard: false, height: 427, "class": 'cx_m_16', tableData: dataList, configurable: false }), __assign(__assign({}, rootSlots), { renderWithText: function (_a) {
                    var _b, _c, _d, _e;
                    var rowData = _a.rowData, column = _a.column;
                    var prop = (_b = column.prop) !== null && _b !== void 0 ? _b : '';
                    var content = prop.endsWith('Id')
                        ? (_c = rowData[getColumnSelectText(column)]) !== null && _c !== void 0 ? _c : rowData[getColumnSelectText(column, 'Name')]
                        : (_e = (_d = rowData[prop + 'Text']) !== null && _d !== void 0 ? _d : rowData[prop + 'Name']) !== null && _e !== void 0 ? _e : rowData[prop];
                    if (R.is(Number, column.accuracy)) {
                        content = decimalFixed(content, column.accuracy, true);
                    }
                    return [createVNode(_CX_ELLIPSIS, { content: content }, null, PATCH_FLAG.PROPS, ['content'])];
                } }), PATCH_FLAG.PROPS, R.pair('dynamic', 'tableData'));
        };
        return function (_, cache) {
            return (openBlock(),
                createBlock(Fragment, null, [
                    createVNode(_CX_DIALOG, {
                        title: '暂存列表',
                        appendToBody: true,
                        okText: '编辑',
                        width: '1524px',
                        top: '50px',
                        destroyOnClose: true,
                        onRegister: register,
                        onOk: onOk,
                        disabledOk: R.isNil(activeItem())
                    }, {
                        "default": function () {
                            return [
                                // 顶部
                                createVNode('section', { "class": _hoisted_class_6 }, [
                                    // tab切换
                                    (openBlock(),
                                        createBlock(Fragment, null, [
                                            R.compose(needTypeTab, getTabCondition)()
                                                ? createVNode(_CX_TAB, {
                                                    level: 3,
                                                    options: typeOptionList,
                                                    modelValue: currentType(),
                                                    'onUpdate:modelValue': setCurrentType
                                                }, null, PATCH_FLAG.PROPS, R.of('modelValue'))
                                                : cache[2] || (cache[2] = createVNode('div', null, '未提交'))
                                        ])),
                                    // 搜索项
                                    createVNode(_CX_FORM, { form: form, items: items, onChange: conditionChangeFetch, style: 'margin-bottom:-18px' }, null, PATCH_FLAG.PROPS, R.of('form'))
                                ]),
                                // 内容区
                                createVNode('section', { "class": _hoisted_class_7 }, [
                                    // 订单列表
                                    createVNode('div', { "class": _hoisted_class_8 }, [
                                        cache[0] || (cache[0] = renderTitle('订单列表')),
                                        R.compose(renderList, orderList)()
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
                                                : createVNode('div', _hoisted_attrs_5, [createVNode(script$b)])
                                        ]))
                                ])
                            ];
                        }
                    }, PATCH_FLAG.PROPS, R.pair('title', 'disabledOk'))
                ]));
        };
    }
});

var renderInnerBtn = function (_a) {
    var _b, _c, _d;
    var $attrs = _a.$attrs, $slots = _a.$slots;
    return createVNode(_CX_BTN, __assign(__assign({}, $attrs), { level: (_b = $attrs.level) !== null && _b !== void 0 ? _b : 2, loading: (_c = $attrs.loadingState) === null || _c === void 0 ? void 0 : _c.loading, disabled: (_d = $attrs.disabledState) === null || _d === void 0 ? void 0 : _d.disabled }), $slots, PATCH_FLAG.FULL_PROPS);
};
var innerBtn = defineComponent({});
innerBtn.render = renderInnerBtn;
var TeleportBtn = defineComponent({
    name: 'TeleportBtn',
    props: {
        dynamicColumn: { type: Array, required: true },
        selector: { type: String, required: true },
        clickHandler: { type: Function },
        disabledState: { type: Object, "default": function () { return ({ disabled: false }); } }
    },
    setup: function (props, _a) {
        var _this = this;
        var attrs = _a.attrs, slots = _a.slots;
        var _b = __read(useState(null), 2), container = _b[0], setContainer = _b[1];
        var unsafeWarn = function () {
            return cxTableWarn("can't find container element by selector", props.selector);
        };
        // unsafeClearDom::void->string
        var unsafeClearEle = R.compose(map(unsafeSet(R.__, 'innerHTML', '')), Maybe.of);
        var onClick = function () { return __awaiter(_this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        setLoadingStates(true);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ((_b = props.clickHandler) === null || _b === void 0 ? void 0 : _b.call(props))];
                    case 2:
                        _c.sent();
                        setLoadingStates(false);
                        return [3 /*break*/, 4];
                    case 3:
                        _c.sent();
                        setLoadingStates(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var loadingState = reactive({ loading: false });
        var setLoadingStates = unsafeSet(loadingState, 'loading');
        var renderBtn = function () {
            return createVNode(innerBtn, __assign(__assign({}, attrs), { disabledState: props.disabledState, loadingState: loadingState, onClick: onClick }), slots, PATCH_FLAG.FULL_PROPS);
        };
        // renderVNodeToDom::HTMLElement->void
        var renderVNodeToDom = R.compose(R.converge(render$8, [renderBtn, R.identity]), R.tap(unsafeClearEle), R.tap(unsafeDeleteProperty(R.__, '_vnode')));
        // 组件更新IO
        var updateComponentIO = IO.of(queryDom).map(R.ifElse(R.isNil, R.compose(unsafeWarn, unsafeClearEle, container), R.compose(map(renderVNodeToDom), Maybe.of, setContainer)));
        watch(function () { return props.dynamicColumn; }, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nextTick()];
                    case 1:
                        _a.sent();
                        updateComponentIO.unsafePerformIO(props.selector);
                        return [2 /*return*/];
                }
            });
        }); });
        return R.always(null);
    }
});

var CacheListBtn = defineComponent({
    name: 'CacheListBtn',
    props: {
        dynamicColumn: { type: Array, required: true },
        tableDataVisitor: { type: Object, required: true }
    },
    setup: function (props) {
        var rootProp = inject('rootProp');
        var _a = __read(useState(null), 2), dialogRef = _a[0], setDialogRef = _a[1];
        var dialogRefIO = IO.of(dialogRef);
        var setCacheIO = dialogRefIO.map(R.compose(map(R.compose(R.when(R.is(Function), R.call), R.prop('openDialog'))), Maybe.of));
        return function () { return [
            createVNode(TeleportBtn, {
                dynamicColumn: props.dynamicColumn,
                clickHandler: setCacheIO.unsafePerformIO.bind(setCacheIO),
                selector: rootProp.cacheListBtn,
                content: '暂存列表'
            }, null, PATCH_FLAG.PROPS, R.pair('selector', 'dynamicColumn')),
            createVNode(cacheListDialog, { ref: setDialogRef }, null, PATCH_FLAG.NEED_PATCH)
        ]; };
    }
});

var SetCacheBtn = defineComponent({
    name: 'SetCacheBtn',
    props: {
        dynamicColumn: { type: Array, required: true },
        tableDataVisitor: { type: Object, required: true }
    },
    setup: function (props) {
        var _this = this;
        var rootProp = inject('rootProp');
        var bus = inject('bus');
        var context = useCxTable().getContext();
        var getDefaultRequestInstance = (function () {
            return R.path(['dynamicCacheContext', 'requestInstance', 'default'], context);
        });
        var getMessageInstance = (function () { return R.path(['messageInstance'], context); });
        var innerBracket = useCxTableCompose().innerBracket;
        var getCacheData = function (tableProps) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var next = R.ifElse(truthy, resolve, reject);
                        var handle = R.ifElse(R.is(Function), function (cb) { return R.call(cb, next); }, resolve);
                        IO.of(R.path(['hooks', 'onSetCache']))
                            .map(handle)
                            .unsafePerformIO(tableProps);
                    })];
            });
        }); };
        var paramsGenerator = function (innerProp, tableProps) { return __awaiter(_this, void 0, void 0, function () {
            var cache, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = R).objOf;
                        _c = ['cache'];
                        return [4 /*yield*/, getCacheData(tableProps)];
                    case 1:
                        cache = _b.apply(_a, _c.concat([_d.sent()]));
                        return [2 /*return*/, IO.of(R.path(['tableDataVisitor', 'sortedData']))
                                .map(R.objOf('rows'))
                                .map(R.mergeLeft(cache))
                                .map(R.objOf('content'))
                                .map(R.mergeLeft(R.defaultTo({}, tableProps.dynamic)))
                                .unsafePerformIO(innerProp)];
                }
            });
        }); };
        var _a = __read(useState(0), 2), disabledTime = _a[0], setDisabledTime = _a[1];
        var disabledState = reactive(R.objOf('disabled', false));
        var setDisabledState = unsafeSet(disabledState, 'disabled');
        watch(disabledTime, R.compose(setDisabledState, R.not, R.gte(0)));
        var decrease = R.compose(setDisabledTime, R.dec, disabledTime);
        var setTimer = function () {
            var timer = setInterval(R.compose(R.when(R.gte(0), R.converge(clearInterval, [function () { return timer; }])), decrease), 1000);
        };
        var content = useComputed(R.compose(R.concat('暂存'), R.ifElse(R.gte(0), R.always(''), R.compose(innerBracket, R.toString)), disabledTime));
        var handleResult = R.when(stateEq200, R.converge(getMessageInstance().success, [R.always('暂存成功')]));
        var sendRequest = R.converge(getDefaultRequestInstance().postJSON.bind(getDefaultRequestInstance()), [
            R.always('/draft/manager/save'),
            R.identity
        ]);
        var getParams = R.converge(paramsGenerator, [R.always(props), R.always(rootProp)]);
        var afterSetCacheIO = IO.of(R.compose(Maybe.of, R.path(['hooks', 'afterSetCache'])));
        var setCache = R.compose(R.andThen(function () { return afterSetCacheIO.map(map(R.call)).unsafePerformIO(rootProp); }), R.andThen(function () { return bus.emit('removeCacheItem'); }), R.andThen(R.compose(setTimer, R.converge(setDisabledTime, [R.always(10)]))), R.andThen(handleResult), R.andThen(sendRequest), getParams);
        return function () {
            return createVNode(TeleportBtn, {
                clickHandler: setCache,
                dynamicColumn: props.dynamicColumn,
                selector: rootProp.setCacheBtn,
                disabledState: disabledState
            }, R.objOf('default', R.nAry(0, content)), PATCH_FLAG.PROPS, ['selector', 'dynamicColumn']);
        };
    }
});

var CxTableTitle = defineComponent({
    name: 'CxTableTitle',
    setup: function () {
        var rootProp = inject('rootProp');
        var hoisted_1 = { "class": 'cx_secondary_title cx_ptb_16' };
        return function () {
            return (openBlock(),
                createBlock(Fragment, null, [
                    rootProp.title
                        ? createVNode('h3', hoisted_1, rootProp.title, PATCH_FLAG.TEXT)
                        : createCommentVNode('v-if_title', true)
                ], PATCH_FLAG.STABLE_FRAGMENT));
        };
    }
});

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

// import { isHTMLElement } from './instanceOf';
function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
includeScale) {

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1; // FIXME:
  // `offsetWidth` returns an integer while `getBoundingClientRect`
  // returns a float. This results in `scaleX` or `scaleY` being
  // non-1 when it should be for elements that aren't a full pixel in
  // width or height.
  // if (isHTMLElement(element) && includeScale) {
  //   const offsetHeight = element.offsetHeight;
  //   const offsetWidth = element.offsetWidth;
  //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
  //   // Fallback to 1 in case both values are `0`
  //   if (offsetWidth > 0) {
  //     scaleX = rect.width / offsetWidth || 1;
  //   }
  //   if (offsetHeight > 0) {
  //     scaleY = rect.height / offsetHeight || 1;
  //   }
  // }

  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle$1(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (process.env.NODE_ENV !== "production") {
    var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle$1(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;

    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
    var max$1 = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = rect.width / element.offsetWidth || 1;
  var scaleY = rect.height / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);

          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = getComputedStyle$1(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

// ------------------------------ timer ------------------------------
var timer;
var getTimer = function () { return timer; };
var setTimer = function (timeout) { return (timer = timeout); };
var removeTimerIO = IO.of(getTimer).map(clearTimer);
var unsafeDoRemoveTimer = R.compose(unsafePerformIO(void 0), R.always(removeTimerIO));
// ------------------------------ popperInstance ------------------------------
var popperMap = {};
window.popperMap = popperMap;
var usePopper = function (key) {
    return {
        getPopper: function () { return popperMap[key]; },
        setPopper: function (instance) { return (popperMap[key] = instance); }
    };
};
var popperIO = IO.of(function (key) { return usePopper(key).getPopper(); });
// unload::Instance a=>a->number
var unload = R.compose(curryTimeout(R.__, 20), R.converge(R.bind, [R.prop('destroy'), R.identity]));
var unloadIO = popperIO.map(R.compose(map(setTimer), map(unload), Maybe.of));
var unsafeDoUnload = function (key) {
    var popper = usePopper(key).getPopper();
    popper && unload(popper);
};
var alienateInstance = function (popper, key) {
    if (!popper)
        return popper;
    var getPopEle = usePopEle(key).getPopEle;
    var update = popper.update, destroy = popper.destroy;
    popper.update = function () {
        showEle(getPopEle());
        return update.call(popper);
    };
    popper.destroy = function () {
        hideEle(getPopEle());
        return destroy.call(popper);
    };
    return popper;
};
// ------------------------------ popElement ------------------------------
var popEleMap = {};
var usePopEle = function (key) {
    return {
        getPopEle: function () { return popEleMap[key]; },
        setPopEle: function (ele) { return (popEleMap[key] = ele); }
    };
};
var bindBaseAttr = R.compose(setClassByArr(['cx_b_radius_4', 'cx_uni_popper']));
var createPopperEle = R.compose(bindBaseAttr, R.converge(createTag, [R.always('div')]));
var getPopOption = R.compose(R.objOf('placement'), R.defaultTo('right-start'));
var mountPopperEle = function (options) {
    var hasClass = function () { return R.is(Array, R.prop('classList', options)); };
    var isMouseType = function () { return R.equals('mouse', R.prop('controlType', options)); };
    var _a = R.compose(usePopEle, R.prop('key'))(options), getPopEle = _a.getPopEle, setPopEle = _a.setPopEle;
    var bindKey = function (ele) { return (ele.setAttribute('pop-key', options.key), ele); };
    var unloadPopper = function () {
        unsafeDoUnload(options.key);
    };
    var bindMouseEvent = R.compose(curryAddListener('mouseenter', unsafeDoRemoveTimer), curryAddListener('mouseleave', unloadPopper));
    var releaseMouseEvent = R.compose(curryRemoveListener('mouseenter', unsafeDoRemoveTimer), curryRemoveListener('mouseleave', unloadPopper));
    var initPopperEle = R.compose(bindBaseAttr, clearClassList, releaseMouseEvent);
    return R.compose(R.when(hasClass, setClassByArr(R.prop('classList', options))), R.converge(R.ifElse(truthy, R.compose(R.when(isMouseType, bindMouseEvent), initPopperEle), R.compose(appendToBody, setPopEle, R.when(isMouseType, bindMouseEvent), bindKey, createPopperEle)), [getPopEle]))();
};
var getPopInstance = function (ele, key, placement, classList, controlType) {
    var element = createPopper(ele, mountPopperEle({ classList: classList, controlType: controlType, key: key }), getPopOption(placement));
    return alienateInstance(element, key);
};
// ------------------------------ patchEle ------------------------------
var currentEle = null;
var getCurrentEle = function () { return currentEle; };
var setCurrentEle = function (ele) { return (currentEle = ele); };
var currentEleIsExist = R.compose(truthy, getCurrentEle);
var renderListItem = function (item) {
    var hasIcon = function () { return truthy(item.icon); };
    var hasText = function () { return truthy(item.text); };
    var createWrapper = function () {
        return setClassByArr([
            'cx_fc_white',
            'hover_bg_black_75',
            'cx_b_radius_4',
            'cx_plr_8',
            'cx_fs_12',
            'cx_h_30',
            'cx_flex_center',
            'cx_cursor_pointer'
        ], createTag('div'));
    };
    var appendIcon = function (wrapper) {
        return appendChild(setClassByArr(['iconfont', "icon-" + item.icon, 'cx_mr_9', 'cx_fs_12'], createTag('i')))(wrapper);
    };
    var appendText = function (wrapper) {
        return appendChild(setInnerText(item.text, createTag('span')))(wrapper);
    };
    return R.compose(R.when(hasText, appendText), R.when(hasIcon, appendIcon), createWrapper)();
};
var bindClickEvent = R.curryN(2, function (ele, item) {
    var type = item.type, callback = item.callback;
    var isCopyType = function () { return R.equals(type, 'copy'); };
    var isJumpType = function () { return R.equals(type, 'jump'); };
    var cbIsFunction = function () { return R.is(Function, callback); };
    var copyHandle = R.compose(copyInnerText, getCurrentEle);
    var jumpHandle = R.when(cbIsFunction, function () { return (callback(item, currentEle), currentEle); });
    return curryAddListener('click', R.when(currentEleIsExist, R.compose(R.tap(R.when(isCopyType, copyHandle)), R.tap(R.when(isJumpType, jumpHandle)))), ele);
});
var patchListEle = function (list, container) {
    list.forEach(R.compose(appendChild(R.__, container), R.converge(bindClickEvent, [renderListItem, R.identity])));
};
var renderTextItem = R.compose(setClassByArr(['cx_p_12', 'cx_fc_white', 'cx_fs_12']), R.converge(setInnerText, [R.identity, R.converge(createTag, [R.always('div')])]));
var patchTextEle = function (text, container) {
    return R.compose(appendChild(R.__, container), renderTextItem)(text);
};
var setCancelWatcher = function (cancel) { return (cancel); };
// updatePopInstance::Instance->Func
var updatePopInstance = R.converge(R.bind, [R.prop('update'), R.identity]);
var EleKeyMap = new WeakMap();
var script$7 = {
    name: 'uniPopper',
    mounted: function (el, _a) {
        var value = _a.value;
        var bindEle = function () { return setCurrentEle(el); };
        var getKey = function () { return R.compose(R.defaultTo('default'), R.prop('key'))(value); };
        EleKeyMap.set(el, getKey());
        var getPopEle = usePopEle(getKey()).getPopEle;
        var setPopper = usePopper(getKey()).setPopper;
        var getList = function () { return R.prop('list')(value); };
        var getText = function () { return R.prop('text')(value); };
        var getPlacement = function () { return R.prop('placement')(value); };
        var getClassList = function () { return R.prop('classList')(value); };
        var getVisible = function () { return R.prop('visible')(value); };
        var visibleIsExist = function () { return getVisible() != undefined; };
        var getControlType = function () { return R.defaultTo('mouse', R.prop('controlType', value)); };
        var listIsExist = R.compose(truthy, getList);
        var patchListToPop = R.converge(patchListEle, [getList, getPopEle]);
        var textIsExist = R.compose(truthy, getText);
        var patchTextToPop = R.converge(patchTextEle, [getText, getPopEle]);
        var show = R.compose(R.converge(R.compose(map(R.when(textIsExist, patchTextToPop)), map(R.when(listIsExist, patchListToPop)), map(setPopper), map(R.tap(R.compose(R.call, updatePopInstance))), map(R.tap(R.compose(clearInnerHTML, getPopEle))), Maybe.of), [
            R.converge(getPopInstance, [
                R.always(el),
                getKey,
                getPlacement,
                getClassList,
                getControlType
            ])
        ]), unsafeDoRemoveTimer, bindEle);
        var hide = R.compose(unsafePerformIO(getKey()), R.always(unloadIO));
        var isHandleType = R.equals('handle');
        var bindHandle = R.compose(setCancelWatcher, R.converge(watch, [R.always(getVisible), R.always(R.compose(R.ifElse(truthy, show, hide)))]));
        var isMouseType = R.equals('mouse');
        var bindMouse = R.compose(curryAddListener('mouseleave', hide), curryAddListener('mouseenter', R.ifElse(visibleIsExist, R.when(getVisible, show), show)));
        R.compose(R.tap(R.when(isHandleType, bindHandle)), R.tap(R.when(isMouseType, R.converge(bindMouse, [R.always(el)]))), getControlType)();
    },
    unmounted: function (el) {
        var key = EleKeyMap.get(el);
        key && unsafeDoUnload(key);
    }
};

var useDynamicConfigDialog = function () {
    var context = useCxTable().getContext();
    var getMessageInstance = (function () { return R.path(['messageInstance'], context); });
    var totalList = ref([]);
    var departmentMap = computed(function () {
        return totalList.value.reduce(function (res, item) {
            var _a;
            var tag = (_a = item.tag) !== null && _a !== void 0 ? _a : '基本信息';
            if (Array.isArray(res[tag])) {
                res[tag].push(item);
            }
            else {
                res[tag] = [item];
            }
            return res;
        }, {});
    });
    var getDefaultData = function () { return ({
        居左固定字段: [],
        非固定字段: [],
        居右固定字段: []
    }); };
    var listMap = reactive(getDefaultData());
    var getDisabledKey = function (item) {
        if (!item)
            return '';
        var key = Object.keys(listMap).find(function (key) {
            return listMap[key].find(function (innerItem) { return innerItem.id === item.id; });
        });
        if (key === null || key === void 0 ? void 0 : key.includes('居')) {
            return key;
        }
        else {
            return '';
        }
    };
    var checkedList = computed(function () {
        return Object.values(listMap).reduce(function (res, val) {
            res.push.apply(res, __spreadArray([], __read(val.map(function (item) { return item.id; }))));
            return res;
        }, []);
    });
    var updateCheckedList = function (val, id) {
        if (val) {
            var item = totalList.value.find(function (item) { return item.id === id; });
            item && listMap['非固定字段'].push(item);
        }
        else {
            Object.values(listMap).some(function (list) {
                var index = list.findIndex(function (item) { return item.id === id; });
                if (index >= 0) {
                    list.splice(index, 1);
                    return true;
                }
            });
        }
    };
    var onlyFormItemCache = [];
    var onlyFormItemMap = {};
    var filterOnlyForm = function (cols) {
        onlyFormItemMap = {};
        return cols.reduce(function (res, col) {
            var _a;
            if ((_a = col.jsonData) === null || _a === void 0 ? void 0 : _a.onlyForm) {
                res.onlyFormItem.push(col);
                onlyFormItemMap[col.label] = true;
            }
            else {
                res.normalItem.push(col);
            }
            return res;
        }, { onlyFormItem: [], normalItem: [] });
    };
    var getData = function (dynamicConfig) { return __awaiter(void 0, void 0, void 0, function () {
        var data, _a, normalItem, onlyFormItem;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!dynamicConfig)
                        return [2 /*return*/, console.warn('[dynamicConfigDialog]: invalid dynamicConfig')];
                    return [4 /*yield*/, context.dynamicRequestInstance.get('/table/settings/get', dynamicConfig)];
                case 1:
                    data = (_d.sent()).data;
                    _a = filterOnlyForm((_b = data === null || data === void 0 ? void 0 : data.itemList) !== null && _b !== void 0 ? _b : []), normalItem = _a.normalItem, onlyFormItem = _a.onlyFormItem;
                    totalList.value = normalItem;
                    onlyFormItemCache = onlyFormItem;
                    Object.assign(listMap, getDefaultData());
                    (_c = data === null || data === void 0 ? void 0 : data.displayList) === null || _c === void 0 ? void 0 : _c.forEach(function (item) {
                        if (onlyFormItemMap[item.label])
                            return;
                        switch (item.fixed) {
                            case 'left':
                                listMap['居左固定字段'].push(item);
                                break;
                            case 'right':
                                listMap['居右固定字段'].push(item);
                                break;
                            default:
                                listMap['非固定字段'].push(item);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var submit = function (dynamicConfig) { return __awaiter(void 0, void 0, void 0, function () {
        var columnList, state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dynamicConfig)
                        return [2 /*return*/, console.warn('[dynamicConfigDialog]: invalid dynamicConfig')];
                    columnList = Object.entries(listMap).reduce(function (res, _a) {
                        var _b = __read(_a, 2), key = _b[0], val = _b[1];
                        res.push.apply(res, __spreadArray([], __read(val.map(function (item) { return ({
                            id: item.id,
                            fixed: key.includes('左') ? 'left' : key.includes('右') ? 'right' : undefined
                        }); }))));
                        return res;
                    }, []);
                    columnList.push.apply(columnList, __spreadArray([], __read(onlyFormItemCache)));
                    return [4 /*yield*/, context.dynamicRequestInstance.putJSON('/table/settings/save', __assign(__assign({}, dynamicConfig), { columnList: columnList }))];
                case 1:
                    state = (_a.sent()).state;
                    if (state !== 200)
                        return [2 /*return*/, Promise.reject()];
                    getMessageInstance().success('修改成功');
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        totalList: totalList,
        getDisabledKey: getDisabledKey,
        departmentMap: departmentMap,
        listMap: listMap,
        checkedList: checkedList,
        updateCheckedList: updateCheckedList,
        getData: getData,
        submit: submit
    };
};

//
var script$6 = defineComponent({
    name: 'ColumnSettingDialog',
    components: { CxEllipsis: script$8, Draggable: Draggable, CxDialog: _CX_DIALOG },
    props: { dynamicList: { type: Array, required: true } },
    emits: ['submit'],
    install: function (app) {
        app.component('columnSettingDialog', this);
    },
    setup: function (props, _a) {
        var _this = this;
        var emit = _a.emit, expose = _a.expose;
        var _b = __read(useCxDialog(), 2), register = _b[0], openDialog = _b[1].openDialog;
        var DYNAMIC_BUSINESS_TYPE = useCxTable().getContext().dynamicType.DYNAMIC_BUSINESS_TYPE;
        var _c = useDynamicConfigDialog(), totalList = _c.totalList, departmentMap = _c.departmentMap, listMap = _c.listMap, checkedList = _c.checkedList, updateCheckedList = _c.updateCheckedList, getData = _c.getData, submit = _c.submit, getDisabledKey = _c.getDisabledKey;
        var activeTab = ref(0);
        var activeDynamicConfig = computed(function () {
            return props.dynamicList[activeTab.value];
        });
        var tabOptionList = computed(function () {
            var _a;
            return (_a = props.dynamicList) === null || _a === void 0 ? void 0 : _a.map(function (config, index) {
                var _a;
                return {
                    id: index,
                    name: DYNAMIC_BUSINESS_TYPE[(_a = config === null || config === void 0 ? void 0 : config.businessType) !== null && _a !== void 0 ? _a : '']
                };
            });
        });
        var _d = __read(loadingDecorator(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        activeTab.value = 0;
                        return [4 /*yield*/, fetchList()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }), 2), open = _d[0], openLoading = _d[1];
        var fetchList = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!activeDynamicConfig.value)
                            return [2 /*return*/];
                        return [4 /*yield*/, getData(activeDynamicConfig.value)];
                    case 1:
                        _a.sent();
                        openDialog();
                        return [2 /*return*/];
                }
            });
        }); };
        watch(activeTab, fetchList);
        expose({ open: open });
        var _e = __read(loadingDecorator(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!activeDynamicConfig.value)
                            return [2 /*return*/];
                        return [4 /*yield*/, submit(activeDynamicConfig.value)];
                    case 1:
                        _b.sent();
                        if (((_a = props.dynamicList) === null || _a === void 0 ? void 0 : _a.length) < 2) {
                            openDialog(false);
                        }
                        emit('submit', activeDynamicConfig.value);
                        return [2 /*return*/];
                }
            });
        }); }), 2), submitData = _e[0], submitLoading = _e[1];
        var header = computed(function () {
            var _a, _b;
            return "\u8BBE\u7F6E" + ((_b = DYNAMIC_BUSINESS_TYPE[(_a = activeDynamicConfig.value) === null || _a === void 0 ? void 0 : _a.dataType]) !== null && _b !== void 0 ? _b : '') + "\u663E\u793A\u5B57\u6BB5";
        });
        var onMove = function (e) {
            var _a;
            var relatedContext = e.relatedContext, draggedContext = e.draggedContext;
            var targetItem = relatedContext === null || relatedContext === void 0 ? void 0 : relatedContext.element;
            var currentItem = draggedContext === null || draggedContext === void 0 ? void 0 : draggedContext.element;
            var targetItemKey = getDisabledKey(targetItem);
            var currentItemKey = getDisabledKey(currentItem);
            return (!targetItemKey || targetItemKey === currentItemKey || ((_a = listMap[targetItemKey]) === null || _a === void 0 ? void 0 : _a.length) < 3);
        };
        return {
            totalList: totalList,
            checkedList: checkedList,
            updateCheckedList: updateCheckedList,
            listMap: listMap,
            tabOptionList: tabOptionList,
            departmentMap: departmentMap,
            register: register,
            submitData: submitData,
            activeTab: activeTab,
            submitLoading: submitLoading,
            open: open,
            openLoading: openLoading,
            header: header,
            onMove: onMove
        };
    }
});

const _withId$1 = /*#__PURE__*/withScopeId("data-v-0b829fd6");

pushScopeId("data-v-0b829fd6");
const _hoisted_1$1 = /*#__PURE__*/createVNode("div", null, [
  /*#__PURE__*/createVNode("div", { class: "cx_flex_center cx_justify_between" }, [
    /*#__PURE__*/createVNode("div", { class: "cx_ptb_12 cx_pl_16 cx_flex_1" }, "可选属性"),
    /*#__PURE__*/createVNode("div", { class: "cx_ptb_12 cx_w_250" }, "已选属性")
  ]),
  /*#__PURE__*/createVNode("div", { class: "cx_line cx_w_100p cx_m_0" })
], -1 /* HOISTED */);
const _hoisted_2 = { class: "cx_dp_flex cx_justify_between" };
const _hoisted_3 = {
  class: "cx_fs_16 cx_pl_12 cx_ptb_8",
  style: {"font-weight":"500"}
};
const _hoisted_4 = /*#__PURE__*/createVNode("div", { class: "cx_line cx_m_0 cx_w_100p cx_mtb_6" }, null, -1 /* HOISTED */);
const _hoisted_5 = {
  key: 0,
  class: "cx_line cx_mb_10 cx_mt_14"
};
const _hoisted_6 = { class: "cx_mb_8 cx_fs_14" };
const _hoisted_7 = { class: "cx_fs_14 cx_ptb_9 hover_active cx_cursor_move" };
const _hoisted_8 = /*#__PURE__*/createVNode("i", { class: "iconfont icon-tuodong1 cx_mr_8" }, null, -1 /* HOISTED */);
popScopeId();

const render$2 = /*#__PURE__*/_withId$1((_ctx, _cache) => {
  const _component_cx_tab = resolveComponent("cx-tab");
  const _component_cx_ellipsis = resolveComponent("cx-ellipsis");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_Draggable = resolveComponent("Draggable");
  const _component_cx_dialog = resolveComponent("cx-dialog");
  const _directive_loading = resolveDirective("loading");

  return (openBlock(), createBlock(_component_cx_dialog, {
    okLoading: _ctx.submitLoading,
    width: "1020px",
    onRegister: _ctx.register,
    top: "50px",
    title: _ctx.header,
    onOk: _ctx.submitData,
    "append-to-body": ""
  }, {
    default: _withId$1(({isFullscreen}) => [
      (_ctx.tabOptionList && _ctx.tabOptionList.length > 1)
        ? (openBlock(), createBlock(_component_cx_tab, {
            key: 0,
            class: "cx_plr_16",
            level: "2",
            options: _ctx.tabOptionList,
            modelValue: _ctx.activeTab,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.activeTab = $event))
          }, null, 8 /* PROPS */, ["options", "modelValue"]))
        : createCommentVNode("v-if", true),
      _hoisted_1$1,
      withDirectives(createVNode("div", _hoisted_2, [
        createVNode("section", {
          class: "cx_flex_1 cx_br cx_p_16",
          style: {overflow: 'auto', position: 'relative',height:isFullscreen?'calc(100vh - 181px)':'500px'}
        }, [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.departmentMap, (item, key) => {
            return (openBlock(), createBlock("div", {
              key: key,
              class: "cx_mtb_5"
            }, [
              createVNode("h3", _hoisted_3, toDisplayString(key), 1 /* TEXT */),
              (openBlock(true), createBlock(Fragment, null, renderList(item, (option) => {
                return (openBlock(), createBlock("div", {
                  key: option.id,
                  class: "cx_dp_ib cx_mtb_16 cx_w_130 cx_pl_12"
                }, [
                  createVNode(_component_el_checkbox, {
                    class: "cx_w_100p",
                    "model-value": _ctx.checkedList.includes(option.id),
                    "onUpdate:modelValue": val => _ctx.updateCheckedList(val, option.id),
                    disabled: option.irrevocable,
                    label: option.label,
                    value: option.id
                  }, {
                    default: _withId$1(() => [
                      createVNode(_component_cx_ellipsis, {
                        style: {"width":"108px"},
                        content: option.label
                      }, null, 8 /* PROPS */, ["content"])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["model-value", "onUpdate:modelValue", "disabled", "label", "value"])
                ]))
              }), 128 /* KEYED_FRAGMENT */)),
              _hoisted_4
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ], 4 /* STYLE */),
        createVNode("section", {
          class: "cx_w_230 cx_p_16",
          style: {overflow: 'auto',height:isFullscreen?'calc(100vh - 181px)':'500px'}
        }, [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.listMap, (_, key, index) => {
            return (openBlock(), createBlock("div", { key: key }, [
              (index !== 0)
                ? (openBlock(), createBlock("div", _hoisted_5))
                : createCommentVNode("v-if", true),
              createVNode("h3", _hoisted_6, toDisplayString(key), 1 /* TEXT */),
              createVNode(_component_Draggable, {
                modelValue: _ctx.listMap[key],
                "onUpdate:modelValue": $event => (_ctx.listMap[key] = $event),
                "item-key": "id",
                group: "list",
                tag: "transition-group",
                "component-data": { tag: 'ul', name: 'flip-list', type: 'transition' },
                ghostClass: "cx_opacity_20",
                move: _ctx.onMove
              }, {
                item: _withId$1(({ element }) => [
                  createVNode("li", _hoisted_7, [
                    _hoisted_8,
                    createTextVNode(toDisplayString(element.label), 1 /* TEXT */)
                  ])
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "onUpdate:modelValue", "move"])
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ], 4 /* STYLE */)
      ], 512 /* NEED_PATCH */), [
        [_directive_loading, _ctx.openLoading]
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["okLoading", "onRegister", "title", "onOk"]))
});

script$6.render = render$2;
script$6.__scopeId = "data-v-0b829fd6";
script$6.__file = "src/lib/cx-table/components/dynamicConfigSetting/dialog.vue";

//
var script$5 = defineComponent({
    name: 'DynamicConfigSettings',
    components: { ColumnSettingDialog: script$6 },
    props: { dynamicConfig: { type: Object, requred: true } },
    directives: { uniPopper: script$7 },
    emits: ['submit'],
    setup: function (_, _a) {
        var _this = this;
        var emit = _a.emit;
        var dialogRef = ref(null);
        var _b = __read(loadingDecorator(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, ((_b = (_a = dialogRef.value) === null || _a === void 0 ? void 0 : _a.open) === null || _b === void 0 ? void 0 : _b.call(_a))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); }), 2), open = _b[0], openLoading = _b[1];
        var CxTable = inject('CxTable');
        var right = computed(function () {
            if (!CxTable)
                return 0;
            return CxTable.scrollStore.rightScrollBar ? CxTable.styleStore.CX_TABLE_SCROLL_BAR + 'px' : 0;
        });
        return {
            open: open,
            openLoading: openLoading,
            submit: function () {
                emit('submit');
            },
            dialogRef: dialogRef,
            right: right
        };
    }
});

const _withId = /*#__PURE__*/withScopeId("data-v-df9138d6");

pushScopeId("data-v-df9138d6");
const _hoisted_1 = { class: "setting_btn cx_flex_center cx_justify_center" };
popScopeId();

const render$1 = /*#__PURE__*/_withId((_ctx, _cache) => {
  const _component_cx_btn = resolveComponent("cx-btn");
  const _component_ColumnSettingDialog = resolveComponent("ColumnSettingDialog");
  const _directive_uni_popper = resolveDirective("uni-popper");

  return (openBlock(), createBlock("div", {
    style: { position: 'absolute', right: _ctx.right, top: 0, zIndex: 1500 }
  }, [
    createVNode("div", _hoisted_1, [
      withDirectives(createVNode(_component_cx_btn, {
        class: "cx_p_0",
        icon: "shezhi1",
        onClick: _ctx.open,
        loading: _ctx.openLoading
      }, null, 8 /* PROPS */, ["onClick", "loading"]), [
        [_directive_uni_popper, {placement:'left-start',text:'设置表头字段'}]
      ])
    ]),
    createVNode(_component_ColumnSettingDialog, {
      ref: "dialogRef",
      onSubmit: _ctx.submit,
      dynamicList: [_ctx.dynamicConfig]
    }, null, 8 /* PROPS */, ["onSubmit", "dynamicList"])
  ], 4 /* STYLE */))
});

script$5.render = render$1;
script$5.__scopeId = "data-v-df9138d6";
script$5.__file = "src/lib/cx-table/components/dynamicConfigSetting/index.vue";

var CxTableProp = {
    tableConfig: { type: Object, "default": function () { return ({ items: [] }); } },
    tableData: { type: Array, "default": function () { return []; } },
    /**
     * @description 显示底部总计
     */
    showTotalSum: { type: Boolean, "default": false },
    /**
     * @description 显示悬浮底部总计
     */
    floatTotalSum: { type: Boolean, "default": false },
    /**
     * @description 固定底部总计
     */
    fixTotalSum: { type: Boolean, "default": false },
    /**
     * @description 集成分页器, 传入分页器参数对象即可开启, 可使用useCxPagination获得, 分页参数更新,将抛出paging事件
     */
    pagination: { type: Object, "default": null },
    /**
     * @description 自定义总计行数据源, 将完全采用该对象作为合计行数据渲染
     */
    customTotalSum: { type: Object, "default": null },
    /**
     * @description 最大高度,传入后将固定头部,可以是数字(将被自动格式化为px高度),也可以是任意描述高度的字符串,如 calc(100vh - 100px)
     */
    height: { type: [Number, String], "default": '' },
    /**
     * @description 禁用所有输入类控件, 无法直接影响插槽, 可使用插槽scope中的disable属性判断
     */
    disabled: { type: Boolean, "default": false },
    /**
     * @description 空行补位, 补位的空行没有键盘事件响应也无法聚焦
     */
    emptyLimit: { type: Number, "default": 0 },
    /**
     * @description 控制colspan/rowspan, 函数类型, 入参为column,rowIndex,rowData, 返回{colspan:number,rowspan:number}对象或[rowspan,colspan]数组
     */
    spanMethod: { type: Function, "default": null },
    /**
     * @description 显示添加按钮(特定需求使用,点击该按钮将抛出addNewRow事件)
     */
    showAddBtn: { type: String, "default": '' },
    /**
     * @description 开启虚拟滚动, 表格行数较小不建议开启, 会消耗一定的额外性能, 且当其与spanMethod同时使用时,性能开销较大(但仍远小于长列表渲染),渲染前预计算spanMethod 10000行*20列约300ms
     */
    virtualScroll: { type: Boolean, "default": false },
    /**
     * @description 表现为激活状态行的index列表, 该属性主要用于自定义行多选,行单选的情况,激活行默认表现为浅蓝色(可与集成单选/多选同时使用)
     */
    activeRows: { type: Array, "default": function () { return []; } },
    /**
     * @description 目标行/列隐藏控件, 无法直接影响插槽, 插槽可通过scope中的ignore属性自定义设置
     */
    ignoreControl: { type: Function, "default": function () { return false; } },
    /**
     * @description 目标行/列强制显示控件,无法直接影响插槽, 插槽可通过scope中的isControl属性自定义设置
     */
    forceControl: { type: Function, "default": function () { return false; } },
    /**
     * @description 默认样式配置,{width:默认单元格宽度,height:默认单元格高度,padding:单元格内左右padding,cache:虚拟滚动视口外缓冲行数}
     */
    styleSetting: { type: Object, "default": function () { return ({}); } },
    /**
     * @description 是否启用键盘事件,关闭后单元格将无法聚焦
     */
    keyboard: { type: Boolean, "default": true },
    /**
     * @description 拓展行,可以是插槽名或一个返回插槽名的函数,入参为column,rowData,rowIndex,如果返回值为空,那么便不渲染,该功能可针对特定的某行开启拓展行.
     */
    expand: { type: [String, Function], "default": '' },
    /**
     * @description 表格title, 聊胜于无的功能
     */
    title: { type: String, "default": '' },
    /**
     * @description 是否开启懒加载, 默认为开启
     */
    lazy: { type: Boolean, "default": true },
    /**
     * @description 是否使用宽度适配器提供的宽度,默认开启
     */
    widthAdaptor: { type: Boolean, "default": true },
    /**
     * @description 动态表头加载参数,一旦传入该属性,则表格的tableConfig属性将失效
     */
    dynamic: { type: Object },
    /**
     * @description 行样式
     */
    cellStyle: {
        type: [Function, Object]
    },
    /**
     * @description 表头样式
     */
    headCellStyle: {
        type: [Function, Object]
    },
    /**
     * @description 设置nativeCheckbox多选禁用状态
     */
    checkSelect: { type: Function },
    /**
     * @description dynamic表头模式下用于手动添加或修改表头
     */
    dynamicInject: { type: Function },
    /**
     * @description 是否缓存表格数据,传入值为缓存key值或一个返回key值的函数(返回空值则不缓存)
     * 在不同的路由下 不 允许使用相同的key值, 这通常会导致缓存读取错误
     */
    cache: { type: [String, Function] },
    /**
     * @description 在dynamic状态下, 是否开启配置弹窗
     */
    configurable: { type: Boolean, "default": true },
    /**
     * @description 是否显示表单控件
     */
    showForm: { type: Boolean, "default": false },
    /**
     * @description 渲染表单时,是否渲染至其他容器,值为容器的选择器
     */
    formTeleport: { type: String },
    /**
     * @description 钩子
     */
    hooks: { type: Object },
    /**
     * @description 暂存列表按钮容器的选择器
     */
    cacheListBtn: { type: String },
    /**
     * @description 暂存按钮容器的选择器
     */
    setCacheBtn: { type: String },
    /**
     * @description 斑马纹
     */
    stripe: { type: Boolean, "default": false }
};

var script$4 = defineComponent({
    name: 'CxTable',
    props: CxTableProp,
    emits: CX_TABLE_EVENT_LIST,
    setup: function (props, _a) {
        var _this = this;
        var slots = _a.slots, emit = _a.emit, expose = _a.expose;
        // 根对象
        var $CxTable = createCxTableConfig();
        var _b = useDynamicConfig(props, $CxTable, emit), columnProxy = _b.columnProxy, dynamicColumn = _b.dynamicColumn, loading = _b.loading, forceUpdate = _b.forceUpdate;
        var searchLoading = ref(false);
        var bus = useCxTableEvent($CxTable, props, emit).bus;
        var tid = useTableId().generateTableId();
        var tableDataVisitor = useCxSort(props).tableDataVisitor;
        // 集成多选
        var _c = useSelectConfig(tableDataVisitor, emit), selectConfig = _c.selectConfig, setCheckSelect = _c.setCheckSelect, clearSelection = _c.clearSelection, toggleRowSelection = _c.toggleRowSelection, toggleAllSelection = _c.toggleAllSelection, getSelectValue = _c.getSelectValue, getSelectAllValue = _c.getSelectAllValue, setSelectDisabled = _c.setSelectDisabled, updateSelectConfig = _c.updateSelectConfig;
        setCheckSelect(props.checkSelect);
        bus.on('toggleAllSelection', toggleAllSelection);
        bus.on('toggleRowSelection', toggleRowSelection);
        // 集成单选
        var _d = useRadioConfig(emit), radioValue = _d.radioValue, removeRadio = _d.removeRadio, setRadio = _d.setRadio, getRadio = _d.getRadio;
        // 集成展开行
        var _e = useExpandConfig(), expandConfig = _e.expandConfig, setExpand = _e.setExpand, clearExpand = _e.clearExpand;
        // 表单校验
        var validate = useValidator($CxTable, props).validate;
        var _f = usePriorityConfig($CxTable), setConfig = _f.setConfig, removeConfig = _f.removeConfig, clearConfig = _f.clearConfig, onSetConfig = _f.onSetConfig;
        // 缓存
        // const { removeCache, setCache, getCache } = useCache(props);
        var broadcast = useBroadcast().broadcast;
        var updateWidth = debounce$1(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        useAutoWidth($CxTable);
                        return [4 /*yield*/, nextTick()];
                    case 1:
                        _a.sent();
                        scrollUpdateShadow($CxTable);
                        return [2 /*return*/];
                }
            });
        }); }, 50);
        broadcast.registEntireListener(function (payload) { return __awaiter(_this, void 0, void 0, function () {
            var prop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prop = payload.prop;
                        return [4 /*yield*/, nextTick()];
                    case 1:
                        _a.sent();
                        updateCxTableWidth($CxTable, props, prop);
                        updateWidth();
                        emit('broadcast', payload);
                        return [2 /*return*/];
                }
            });
        }); });
        var exposeMethods = {
            // radio
            removeRadio: removeRadio,
            setRadio: setRadio,
            getRadio: getRadio,
            // checkbox
            clearSelection: clearSelection,
            toggleRowSelection: toggleRowSelection,
            toggleAllSelection: toggleAllSelection,
            getSelectValue: getSelectValue,
            getSelectAllValue: getSelectAllValue,
            setSelectDisabled: setSelectDisabled,
            updateSelectConfig: updateSelectConfig,
            // expand
            setExpand: setExpand,
            clearExpand: clearExpand,
            // config
            setConfig: setConfig,
            removeConfig: removeConfig,
            clearConfig: clearConfig,
            // validate
            validate: validate,
            // update
            forceUpdate: forceUpdate,
            // event
            triggerBroadcast: function (prop, rowData) {
                broadcast.trigger(prop, rowData, { prop: prop, rowData: rowData });
            },
            focusCell: function (_a) {
                var prop = _a.prop, rowData = _a.rowData, rowIndex = _a.rowIndex;
                return __awaiter(_this, void 0, void 0, function () {
                    var rowHeight, column, cell;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!prop)
                                    return [2 /*return*/];
                                if (!rowData && rowIndex == undefined)
                                    return [2 /*return*/];
                                if (!props.virtualScroll) return [3 /*break*/, 2];
                                rowIndex = rowIndex !== null && rowIndex !== void 0 ? rowIndex : props.tableData.findIndex(function (data) { return data === rowData; });
                                if (!isNumber(rowIndex) || !$CxTable.wrapperEle)
                                    return [2 /*return*/];
                                rowHeight = $CxTable.styleStore.CX_TABLE_HEIGHT;
                                $CxTable.wrapperEle.scrollTop = rowHeight * rowIndex;
                                return [4 /*yield*/, nextTick()];
                            case 1:
                                _c.sent();
                                _c.label = 2;
                            case 2:
                                rowData = rowData !== null && rowData !== void 0 ? rowData : props.tableData[rowIndex];
                                column = (_b = $CxTable.flatColumns) === null || _b === void 0 ? void 0 : _b.find(function (col) { return col.prop === prop; });
                                if (!column)
                                    return [2 /*return*/];
                                cell = domShare.getCell($CxTable, column, rowData);
                                setTimeout(function () {
                                    cell === null || cell === void 0 ? void 0 : cell.click();
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            },
            // setCache,
            // getCache,
            // removeCache,
            removeCacheItem: function () {
                bus.emit('removeCacheItem');
            },
            search: function (payload) {
                bus.emit('search', payload);
            }
        };
        expose(exposeMethods);
        emit('register', { registerTarget: exposeMethods, props: props });
        provide('broadcast', broadcast);
        provide('tableDataVisitor', tableDataVisitor);
        provide('CxTable', $CxTable);
        provide('rootProp', props);
        provide('rootSlots', slots);
        provide('bus', bus);
        provide('loading', loading);
        provide('selectConfig', selectConfig);
        provide('radioValue', radioValue);
        provide('expandConfig', expandConfig);
        provide('tid', tid);
        provide('dynamicColumn', dynamicColumn);
        var tableWrapper = ref(null);
        var tableVisible = ref(!props.lazy);
        onMounted(function () {
            if (!tableWrapper.value)
                return;
            $CxTable.wrapperEle = tableWrapper.value;
            var _a = useWatch(props, $CxTable, columnProxy, tableWrapper, expandConfig, tableVisible), updateColumn = _a.updateColumn, updateData = _a.updateData;
            onSetConfig.push(updateColumn);
            onSetConfig.push(updateData);
            props.lazy && useLazyLoad(tableWrapper.value, tableVisible);
        });
        useRegister($CxTable, props, tableDataVisitor, tableWrapper, bus, tid);
        var _hoisted_1_class = 'cx-table_wrapper';
        var _hoisted_2_class = 'cx-table_scrollWrapper';
        var _hoisted_3_class = 'cx-table_border_line';
        var _hoisted_directive = resolveDirective('loading');
        var renderContent = function (fixed) {
            return createVNode(CxTableContent, { tableData: tableDataVisitor.sortedData, fixed: fixed }, null, PATCH_FLAG.PROPS, ['tableData']);
        };
        var renderTables = function () {
            var _a = $CxTable.columnStore, leftFixedColumns = _a.leftFixedColumns, rightFixedColumns = _a.rightFixedColumns;
            var _b = $CxTable.scrollStore, rightScrollBar = _b.rightScrollBar, bottomScrollBar = _b.bottomScrollBar;
            return [
                renderContent(),
                (openBlock(), createBlock(Fragment, null, [
                    leftFixedColumns.length && bottomScrollBar ? renderContent('left') : createCommentVNode('v-if_left', true)
                ])),
                (openBlock(), createBlock(Fragment, null, [
                    rightFixedColumns.length && bottomScrollBar ? renderContent('right') : createCommentVNode('v-if_right', true)
                ])),
                (openBlock(), createBlock(Fragment, null, [
                    props.height && rightScrollBar ? renderContent('top') : createCommentVNode('v-if_top', true)
                ])),
                (openBlock(), createBlock(Fragment, null, [
                    props.fixTotalSum && props.showTotalSum && rightScrollBar ? renderContent('bottom') : createCommentVNode('v-if_bottom', true)
                ]))
            ];
        };
        var renderBorderLine = function () {
            return createVNode('div', { "class": _hoisted_3_class });
        };
        var renderEmpty = function () {
            return (openBlock(),
                createBlock(Fragment, null, [
                    tableDataVisitor.sortedData.length || props.emptyLimit > 0 || props.showAddBtn
                        ? createCommentVNode('v-if_empty', true)
                        : createVNode(CxTableEmpty)
                ]));
        };
        var renderDynamicConfigSetting = function () {
            return (openBlock(),
                createBlock(Fragment, null, [
                    props.configurable && props.dynamic
                        ? createVNode(script$5, {
                            dynamicConfig: props.dynamic,
                            onSubmit: function () {
                                forceUpdate();
                                emit('dynamicSetting');
                            }
                        }, null, PATCH_FLAG.PROPS | PATCH_FLAG.NEED_PATCH, ['dynamicConfig'])
                        : createCommentVNode('v-if_dynamic_config', true)
                ]));
        };
        var renderTeleBtn = function (comp) {
            return createVNode(comp, { dynamicColumn: dynamicColumn.value, tableDataVisitor: tableDataVisitor }, null, PATCH_FLAG.PROPS, ['dynamicColumn', 'tableDataVisitor']);
        };
        var placeHolderAttrs = computed(function () {
            var dataHeight = (props.tableData.length +
                +!!props.showTotalSum +
                invokeLayeredRow($CxTable.columns).length) *
                $CxTable.styleStore.CX_TABLE_HEIGHT;
            var height = formatWidth(props.height ? Math.min(dataHeight, isNaN(+props.height) ? 400 : +props.height) : dataHeight);
            return { style: { height: height } };
        });
        var innerStyle = computed(function () {
            return { maxHeight: isNumber(props.height) ? props.height + 'px' : props.height };
        });
        var cssVariable = useCSSVariable($CxTable).cssVariable;
        return function (_, cache) {
            return createVNode('div', { style: cssVariable.value, "class": 'cx-table_container' }, [
                createVNode(CxTableTitle),
                (openBlock(),
                    createBlock(Fragment, null, [
                        props.setCacheBtn
                            ? renderTeleBtn(SetCacheBtn)
                            : createCommentVNode('v-if_set_cache_btn', true),
                        props.cacheListBtn
                            ? renderTeleBtn(CacheListBtn)
                            : createCommentVNode('v-if_cache_list_btn', true)
                    ])),
                (openBlock(),
                    createBlock(Fragment, null, [
                        props.showForm
                            ? createVNode(TeleForm, {
                                dynamicColumn: dynamicColumn.value,
                                tableDataVisitor: tableDataVisitor,
                                loading: searchLoading.value,
                                'onUpdate:loading': function (val) { return (searchLoading.value = val); }
                            }, null, PATCH_FLAG.PROPS, ['dynamicColumn', 'tableDataVisitor', 'loading'])
                            : createCommentVNode('v-if_form', true)
                    ])),
                createVNode('div', { tid: tid, "class": _hoisted_1_class }, [
                    withDirectives(createVNode('div', { "class": _hoisted_2_class, style: innerStyle.value, ref: tableWrapper }, [
                        (openBlock(),
                            createBlock(Fragment, null, tableVisible.value
                                ? [
                                    renderTables(),
                                    renderEmpty(),
                                    cache[0] || (cache[0] = renderBorderLine()),
                                    renderDynamicConfigSetting()
                                ]
                                : [createVNode('div', placeHolderAttrs.value)]))
                    ], PATCH_FLAG.STYLE | PATCH_FLAG.NEED_PATCH), [[_hoisted_directive !== null && _hoisted_directive !== void 0 ? _hoisted_directive : {}, loading.value || searchLoading.value]])
                ], PATCH_FLAG.STYLE),
                (openBlock(),
                    createBlock(Fragment, null, [
                        props.floatTotalSum
                            ? createVNode('div', { "class": _hoisted_1_class }, [
                                createVNode('div', { "class": _hoisted_2_class + " cx_of_hidden" }, [
                                    createVNode(CxTableBody, {
                                        tableData: tableDataVisitor.sortedData,
                                        onlyTotal: true,
                                        float: true,
                                        "class": 'cx_mt_20',
                                        style: {
                                            right: $CxTable.scrollStore.scrollLeft + '' + "px",
                                            position: 'relative'
                                        }
                                    }, null, PATCH_FLAG.FULL_PROPS)
                                ])
                            ])
                            : createCommentVNode('v-if_float_total_sum', true)
                    ])),
                (openBlock(),
                    createBlock(Fragment, null, [
                        isObject$1(props.pagination)
                            ? createVNode(_CX_PAGINATION, {
                                pagination: props.pagination,
                                onPaging: cache[1] || (cache[1] = function () { return emit('paging'); })
                            }, null, PATCH_FLAG.PROPS, ['pagination'])
                            : createCommentVNode('v-if_pagination', true)
                    ]))
            ], PATCH_FLAG.STYLE);
        };
    }
});

script$4.install = function (app) {
    app.component(script$4.name, script$4);
};
var _CX_TABLE = script$4;

var _CX_UNI_POPPER = script$7;
_CX_UNI_POPPER.install = function (app) {
    app.directive(script$7.name, script$7);
};

// 正数
function integer(value) {
    return Number(value.replace(/[^\d]/g, ''));
}
function onInput(el, ele, binding, vnode) {
    function handle() {
        var _a;
        var oldValue = ele.value;
        var val = ele.value.trim();
        if (val !== '' && typeof binding.value === 'object') {
            var close_2 = binding.value.close;
            if (close_2)
                return;
            val = amount(__assign({ val: val }, binding.value)) + '';
        }
        else if (val !== '' && typeof binding.value === 'undefined') {
            val = integer(val) + '';
        }
        ele.value = val;
        if (val !== oldValue) {
            var el_1 = vnode.el;
            if (isHTMLInputElement(el_1)) {
                el_1.value = val;
            }
            (_a = vnode.component) === null || _a === void 0 ? void 0 : _a.emit('input', ele.value);
        }
    }
    return handle;
}
var script$3 = {
    name: 'numberInput',
    beforeMount: function (el, binding, vnode) {
        var ele = isHTMLInputElement(el) ? el : el.querySelector('input');
        ele && (ele.numberInput = onInput(el, ele, binding, vnode));
        ele === null || ele === void 0 ? void 0 : ele.addEventListener('input', ele.numberInput, true);
    },
    updated: function (el, binding, vnode) {
        var oldValue = binding.oldValue, value = binding.value;
        var ele = isHTMLInputElement(el) ? el : el.querySelector('input');
        if (!isDeepObjectEqual(oldValue, value)) {
            ele === null || ele === void 0 ? void 0 : ele.removeEventListener('input', ele.numberInput, true);
            ele && (ele.numberInput = onInput(el, ele, binding, vnode));
            ele === null || ele === void 0 ? void 0 : ele.addEventListener('input', ele.numberInput, true);
        }
    }
};

var _CX_NUMBER_INPUT = script$3;
_CX_NUMBER_INPUT.install = function (app) {
    app.directive(script$3.name, script$3);
};

script$a.install = function (app) {
    app.component(script$a.name, script$a);
};
var _CX_OVERLAY = script$a;

//
var script$2 = defineComponent({
    name: 'CxTag',
    props: {
        type: {
            type: String,
            "default": 'parimary'
        },
        text: { type: String },
        size: { type: String, "default": 'mini' }
    }
});

function render(_ctx, _cache) {
  return (openBlock(), createBlock("span", {
    class: ["cx-tag", ['cx-tag--' + _ctx.type, 'cx-tag--' + _ctx.size]]
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createTextVNode(toDisplayString(_ctx.text), 1 /* TEXT */)
    ])
  ], 2 /* CLASS */))
}

script$2.render = render;
script$2.__file = "src/lib/cx-tag/cx-tag.vue";

var script$1 = script$2;
script$1.install = function (app) {
    app.component(script$1.name, script$1);
};
var _CX_TAG = script$1;

var script = defineComponent({
    name: 'CxPagination',
    props: { pagination: { type: Object, "default": function () { return ({}); } } },
    setup: function (props, _a) {
        var emit = _a.emit;
        var handleSizeChange = function (size) {
            var pagination = props.pagination;
            pagination.currentPage = 1;
            pagination.pageCapacity = size;
            emit('paging');
        };
        var handleCurrentChange = function (currentPage) {
            var pagination = props.pagination;
            pagination.currentPage = currentPage;
            emit('paging');
        };
        var hoisted_1 = 'total, sizes, prev, pager, next, jumper';
        var Pagination = resolveComponent('ElPagination');
        return function () {
            return createVNode(Pagination, {
                "class": 'cx_align_right cx_p_20',
                background: true,
                currentPage: props.pagination.currentPage,
                pageSizes: props.pagination.pageSizes,
                pageSize: props.pagination.pageCapacity,
                layout: hoisted_1,
                total: props.pagination.total,
                onSizeChange: handleSizeChange,
                onCurrentChange: handleCurrentChange
            }, null, 16 /* FULL_PROPS */);
        };
    }
});

script.install = function (app) {
    app.component(script.name, script);
};
var _CX_PAGINATION = script;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CxNumberInput: _CX_NUMBER_INPUT,
  CXPagination: _CX_PAGINATION,
  CxEllipsis: _CX_ELLIPSIS,
  CxBtn: _CX_BTN,
  CxOverlay: _CX_OVERLAY,
  CxTab: _CX_TAB,
  CxForm: _CX_FORM,
  CxDialog: _CX_DIALOG,
  CxTable: _CX_TABLE,
  CxUniPopper: _CX_UNI_POPPER,
  CxTag: _CX_TAG
});

var CxUI = {
    install: function (app) {
        Object.values(components).forEach(function (component) {
            app.use(component);
        });
    }
};

export default CxUI;
export { ARROW_KEY, COLUMN_FLAG, _CX_PAGINATION as CXPagination, CX_ADAPTOR_INT_PRECISION, CX_ADAPTOR_LOSS_PRECISION, CX_ADAPTOR_PRECISION_TYPE, CX_SORT_STATUS, CX_SPAN_METHOD_TYPE, CX_STYLE_SETTING, CX_TABLE_CACHE_PENDING, CX_TABLE_COLUMN_ID_PREPEND, CX_TABLE_COLUMN_KEY, CX_TABLE_DYNAMIC_CACHE, CX_TABLE_DYNAMIC_PROPS, CX_TABLE_EMPTY_INDEX, CX_TABLE_EVENT_LIST, CX_TABLE_ID_PREPEND, CX_TABLE_INPUT_TYPE, CX_TABLE_NOT_HOVER_ID, CX_TABLE_PER_CHAR_WIDTH, CX_TABLE_ROW_ID_PREPEND, CX_TABLE_ROW_KEY, CX_TABLE_SUM_INDEX, CX_TABLE_SUM_ROW_KEY, CX_TABLE_THROTTLE_DURATION, CX_TABLE_VISUAL_ROW_KEY, CxBroadcast, _CX_BTN as CxBtn, CxConfigAdaptor, CxControlConfig, _CX_DIALOG as CxDialog, _CX_ELLIPSIS as CxEllipsis, _CX_FORM as CxForm, _CX_NUMBER_INPUT as CxNumberInput, _CX_OVERLAY as CxOverlay, _CX_TAB as CxTab, _CX_TABLE as CxTable, CxTableActiveControl, CxTableRendererMap, _CX_TAG as CxTag, _CX_UNI_POPPER as CxUniPopper, PATCH_FLAG, TypeOption, arrFlat, assignAttrs, calcInnerFormula, calcInnerItem, calcInnerOptions, calcInnerValidator, calcInvoker, changeDynamicIdToText, copySort, cxFormRender, cxTableWarn, decimalFixed, decimals, deepMerge, domShare, filterOnlyFormItem, findAncestor, formatDate, formatFormDefaultValue, formatTime, formatWidth, getColumnSelectText, getCxDynamicHead, getEvalResult, getFunctionAttrs, getOptionsDeps, getParentColumn, getPreOrNextItem, getPrecision, getStatusAttrs, getStringDepends, getStringWidth, getSums, getTargetColumn, getTemplateResult, getTotalSumData, invokeLayeredRow, pick, staticConfigList, toggleArrState, updateCxTableWidth, useAutoWidth, useBroadcast, useCSSVariable, useCalcSpanMethod, useColumn, useColumnValidity, useCopy, useCxDialog, useCxForm, useCxPagination, useCxSort, useCxTable, useCxTableCompose, useCxTableEvent, useDynamicConfig, useExpandConfig, useLazyLoad, usePriorityConfig, useRadioConfig, useRegister, useRowDataValidity, useScrollState, useSelectConfig, useStyle, useTableClass, useTableId, useTableStyle, useValidator, useWatch };
