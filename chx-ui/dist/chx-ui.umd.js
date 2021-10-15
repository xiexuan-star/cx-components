(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('ramda'), require('dayjs'), require('pinyin-match')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'ramda', 'dayjs', 'pinyin-match'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['well-bricks'] = {}, global.Vue, global.R, global.dayjs, global.PinyinMatch));
}(this, (function (exports, vue, R, dayjs, PinyinMatch) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var R__namespace = /*#__PURE__*/_interopNamespace(R);
  var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
  var PinyinMatch__default = /*#__PURE__*/_interopDefaultLegacy(PinyinMatch);

  var script$8 = vue.defineComponent({
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
      },
      setup: function (props, _a) {
          var slots = _a.slots;
          var renderLoadingEle = function () {
              return vue.createVNode('i', { "class": 'el-icon-loading cx_mr_5' });
          };
          var renderIconEle = function (className) {
              return vue.createVNode('i', { "class": "iconfont icon-" + className }, null, 2 /* CLASS */);
          };
          var renderDisabled = function () {
              return vue.createVNode('i', { onClick: function (e) { return e.stopPropagation(); }, "class": 'cx_mask' });
          };
          var classList = vue.computed(function () {
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
              return vue.createVNode('button', {
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
                  props.loading ? (cache[1] ? cache[1] : (cache[1] = renderLoadingEle())) : vue.createCommentVNode('v-if', true),
                  props.icon ? renderIconEle(props.icon) : vue.createCommentVNode('v-if', true),
                  (slots["default"] ? slots["default"]({}) : props.content)
                      ? vue.createVNode('span', { "class": { cx_ml_5: !!props.icon } }, [
                          slots["default"] ? slots["default"]({}) : props.content,
                      ])
                      : vue.createCommentVNode('v-if_content', true),
                  props.disabled ? (cache[2] ? cache[2] : (cache[2] = renderDisabled())) : vue.createCommentVNode('v-if', true),
              ], 2 /* CLASS */ | 512 /* NEED_PATCH */);
          };
      },
  });
  script$8.install = function (app) {
      app.component(script$8.name, script$8);
  };
  var _CX_BTN = script$8;

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

  function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

  var toString$1 = Object.prototype.toString;
  function is$1(val, type) {
      return toString$1.call(val) === "[object " + type + "]";
  }
  var isObject$2 = function (val) {
      return val !== null && is$1(val, 'Object');
  };
  function isNumber$1(val) {
      return is$1(val, 'Number');
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  var isFunction$2 = function (val) { return typeof val === 'function'; };

  var script$7 = vue.defineComponent({
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
              "default": function () { return []; },
          },
          disabled: { type: Boolean, "default": false },
          /**
           * badge数据源,对应tab项中的badgeKey
           */
          badgeObj: { type: Object, "default": function () { return ({}); } },
      },
      emits: ['update:modelValue', 'change'],
      setup: function (props, _a) {
          var _this = this;
          var emit = _a.emit, slots = _a.slots;
          var clickHandle = function (id) {
              if (id === props.modelValue)
                  return;
              if (props.disabled)
                  return;
              emit('update:modelValue', id);
              emit('change', id);
          };
          var tabs = vue.computed(function () {
              return props.options
                  .filter(function (item) {
                  return isObject$2(item) ? !item.hide : item;
              })
                  .map(function (item) {
                  return isObject$2(item) ? item : { id: item, name: item };
              });
          });
          var renderItems = function () {
              return tabs.value.map(function (item) {
                  var _a, _b, _c;
                  var classList = ['cx-tab_item', 'clickable', 'cx_flex_center'];
                  props.modelValue === item.id && classList.push('cx-tab_item_active');
                  var badgeValue = (_b = props.badgeObj[(_a = item.badgeKey) !== null && _a !== void 0 ? _a : '']) !== null && _b !== void 0 ? _b : 0;
                  var badgeUnit = (_c = item.unit) !== null && _c !== void 0 ? _c : '';
                  if (badgeValue >= 100)
                      badgeValue = '99+';
                  return vue.createVNode('div', { onClick: function () { return clickHandle(item.id); }, "class": classList }, [
                      item.name,
                      badgeValue
                          ? vue.createVNode('div', { "class": "cx-tab_badge_" + props.level }, "" + badgeValue + badgeUnit, 2 /* CLASS */ | 1 /* TEXT */)
                          : vue.createCommentVNode('v-if_badge', true),
                  ], 512 /* NEED_PATCH */ | 2 /* CLASS */);
              });
          };
          var wrapRef = vue.ref(null);
          var renderArrow = function (type) {
              var onClick = function () {
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
                      if (base === 0 || stop)
                          clearInterval(timer);
                      else if (base <= 3)
                          base = 0;
                      else {
                          base -= base / 10;
                          offset = base / 10;
                      }
                  }, 10);
              };
              var classList = [
                  "cx-tab_" + type + "_arrow",
                  'iconfont',
                  'cx_flex_center',
                  type === 'left' ? 'icon-xiangzuo' : 'icon-xiangyou',
              ];
              return vue.createVNode('div', { onClick: onClick, "class": classList }, null, 512 /* NEED_PATCH */ | 2 /* CLASS */);
          };
          var isShowArrow = function () {
              if (!wrapRef.value)
                  return;
              var tabs = wrapRef.value.querySelector('.cx-tabs');
              if (!tabs)
                  return;
              var wrapWidth = wrapRef.value.clientWidth;
              var tabsWidth = tabs.clientWidth;
              return tabsWidth > wrapWidth;
          };
          var showArrow = vue.ref(isShowArrow());
          // const MutationObserver = window.MutationObserver;
          // const observer = new MutationObserver(() => {
          // })
          var debounce = function (cb, delay) {
              var timer;
              return function () {
                  clearTimeout(timer);
                  timer = setTimeout(cb, delay);
              };
          };
          var tabsResize = debounce(function () {
              showArrow.value = isShowArrow();
          }, 100);
          vue.onMounted(function () {
              window.addEventListener('resize', tabsResize);
          });
          vue.onBeforeUnmount(function () {
              window.removeEventListener('resize', tabsResize);
          });
          vue.watch(function () { return tabs.value; }, function () { return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, vue.nextTick()];
                      case 1:
                          _a.sent();
                          showArrow.value = isShowArrow();
                          return [2 /*return*/];
                  }
              });
          }); }, { deep: true, immediate: true });
          return function (_, cache) {
              var classList = [
                  'cx-tab_scroll_wrapper',
                  'cx_flex_center',
                  'cx_justify_between',
                  "level-" + props.level + "_wrapper"
              ];
              showArrow.value && classList.push('cx_plr_20');
              props.disabled && classList.push('cx-tab_disabled');
              return vue.createVNode('div', { "class": classList }, [
                  vue.createVNode('div', { "class": 'cx-tab_wrapper', ref: wrapRef }, [vue.createVNode('div', { "class": 'cx-tabs' }, renderItems())], 512 /* NEED_PATCH */),
                  showArrow.value
                      ? cache[0] || (cache[0] = renderArrow('left'))
                      : vue.createCommentVNode('v-if_left_arrow', true),
                  showArrow.value
                      ? cache[1] || (cache[1] = renderArrow('right'))
                      : vue.createCommentVNode('v-if_right_arrow', true),
                  vue.createVNode('div', { "class": 'cx-tab_extension' }, [slots.ext && slots.ext()])
              ], 2 /* CLASS */);
          };
      },
  });
  script$7.install = function (app) {
      app.component(script$7.name, script$7);
  };
  var _CX_TAB = script$7;

  /**
   * A collection of shims that provide minimal functionality of the ES6 collections.
   *
   * These implementations are not meant to be used outside of the ResizeObserver
   * modules as they cover only a limited range of use cases.
   */
  /* eslint-disable require-jsdoc, valid-jsdoc */
  var MapShim = (function () {
      if (typeof Map !== 'undefined') {
          return Map;
      }
      /**
       * Returns index in provided array that matches the specified key.
       *
       * @param {Array<Array>} arr
       * @param {*} key
       * @returns {number}
       */
      function getIndex(arr, key) {
          var result = -1;
          arr.some(function (entry, index) {
              if (entry[0] === key) {
                  result = index;
                  return true;
              }
              return false;
          });
          return result;
      }
      return /** @class */ (function () {
          function class_1() {
              this.__entries__ = [];
          }
          Object.defineProperty(class_1.prototype, "size", {
              /**
               * @returns {boolean}
               */
              get: function () {
                  return this.__entries__.length;
              },
              enumerable: true,
              configurable: true
          });
          /**
           * @param {*} key
           * @returns {*}
           */
          class_1.prototype.get = function (key) {
              var index = getIndex(this.__entries__, key);
              var entry = this.__entries__[index];
              return entry && entry[1];
          };
          /**
           * @param {*} key
           * @param {*} value
           * @returns {void}
           */
          class_1.prototype.set = function (key, value) {
              var index = getIndex(this.__entries__, key);
              if (~index) {
                  this.__entries__[index][1] = value;
              }
              else {
                  this.__entries__.push([key, value]);
              }
          };
          /**
           * @param {*} key
           * @returns {void}
           */
          class_1.prototype.delete = function (key) {
              var entries = this.__entries__;
              var index = getIndex(entries, key);
              if (~index) {
                  entries.splice(index, 1);
              }
          };
          /**
           * @param {*} key
           * @returns {void}
           */
          class_1.prototype.has = function (key) {
              return !!~getIndex(this.__entries__, key);
          };
          /**
           * @returns {void}
           */
          class_1.prototype.clear = function () {
              this.__entries__.splice(0);
          };
          /**
           * @param {Function} callback
           * @param {*} [ctx=null]
           * @returns {void}
           */
          class_1.prototype.forEach = function (callback, ctx) {
              if (ctx === void 0) { ctx = null; }
              for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                  var entry = _a[_i];
                  callback.call(ctx, entry[1], entry[0]);
              }
          };
          return class_1;
      }());
  })();

  /**
   * Detects whether window and document objects are available in current environment.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

  // Returns global object of a current environment.
  var global$1 = (function () {
      if (typeof global !== 'undefined' && global.Math === Math) {
          return global;
      }
      if (typeof self !== 'undefined' && self.Math === Math) {
          return self;
      }
      if (typeof window !== 'undefined' && window.Math === Math) {
          return window;
      }
      // eslint-disable-next-line no-new-func
      return Function('return this')();
  })();

  /**
   * A shim for the requestAnimationFrame which falls back to the setTimeout if
   * first one is not supported.
   *
   * @returns {number} Requests' identifier.
   */
  var requestAnimationFrame$1 = (function () {
      if (typeof requestAnimationFrame === 'function') {
          // It's required to use a bounded function because IE sometimes throws
          // an "Invalid calling object" error if rAF is invoked without the global
          // object on the left hand side.
          return requestAnimationFrame.bind(global$1);
      }
      return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
  })();

  // Defines minimum timeout before adding a trailing call.
  var trailingTimeout = 2;
  /**
   * Creates a wrapper function which ensures that provided callback will be
   * invoked only once during the specified delay period.
   *
   * @param {Function} callback - Function to be invoked after the delay period.
   * @param {number} delay - Delay after which to invoke callback.
   * @returns {Function}
   */
  function throttle$2 (callback, delay) {
      var leadingCall = false, trailingCall = false, lastCallTime = 0;
      /**
       * Invokes the original callback function and schedules new invocation if
       * the "proxy" was called during current request.
       *
       * @returns {void}
       */
      function resolvePending() {
          if (leadingCall) {
              leadingCall = false;
              callback();
          }
          if (trailingCall) {
              proxy();
          }
      }
      /**
       * Callback invoked after the specified delay. It will further postpone
       * invocation of the original function delegating it to the
       * requestAnimationFrame.
       *
       * @returns {void}
       */
      function timeoutCallback() {
          requestAnimationFrame$1(resolvePending);
      }
      /**
       * Schedules invocation of the original function.
       *
       * @returns {void}
       */
      function proxy() {
          var timeStamp = Date.now();
          if (leadingCall) {
              // Reject immediately following calls.
              if (timeStamp - lastCallTime < trailingTimeout) {
                  return;
              }
              // Schedule new call to be in invoked when the pending one is resolved.
              // This is important for "transitions" which never actually start
              // immediately so there is a chance that we might miss one if change
              // happens amids the pending invocation.
              trailingCall = true;
          }
          else {
              leadingCall = true;
              trailingCall = false;
              setTimeout(timeoutCallback, delay);
          }
          lastCallTime = timeStamp;
      }
      return proxy;
  }

  // Minimum delay before invoking the update of observers.
  var REFRESH_DELAY = 20;
  // A list of substrings of CSS properties used to find transition events that
  // might affect dimensions of observed elements.
  var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
  // Check if MutationObserver is available.
  var mutationObserverSupported = typeof MutationObserver !== 'undefined';
  /**
   * Singleton controller class which handles updates of ResizeObserver instances.
   */
  var ResizeObserverController = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserverController.
       *
       * @private
       */
      function ResizeObserverController() {
          /**
           * Indicates whether DOM listeners have been added.
           *
           * @private {boolean}
           */
          this.connected_ = false;
          /**
           * Tells that controller has subscribed for Mutation Events.
           *
           * @private {boolean}
           */
          this.mutationEventsAdded_ = false;
          /**
           * Keeps reference to the instance of MutationObserver.
           *
           * @private {MutationObserver}
           */
          this.mutationsObserver_ = null;
          /**
           * A list of connected observers.
           *
           * @private {Array<ResizeObserverSPI>}
           */
          this.observers_ = [];
          this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
          this.refresh = throttle$2(this.refresh.bind(this), REFRESH_DELAY);
      }
      /**
       * Adds observer to observers list.
       *
       * @param {ResizeObserverSPI} observer - Observer to be added.
       * @returns {void}
       */
      ResizeObserverController.prototype.addObserver = function (observer) {
          if (!~this.observers_.indexOf(observer)) {
              this.observers_.push(observer);
          }
          // Add listeners if they haven't been added yet.
          if (!this.connected_) {
              this.connect_();
          }
      };
      /**
       * Removes observer from observers list.
       *
       * @param {ResizeObserverSPI} observer - Observer to be removed.
       * @returns {void}
       */
      ResizeObserverController.prototype.removeObserver = function (observer) {
          var observers = this.observers_;
          var index = observers.indexOf(observer);
          // Remove observer if it's present in registry.
          if (~index) {
              observers.splice(index, 1);
          }
          // Remove listeners if controller has no connected observers.
          if (!observers.length && this.connected_) {
              this.disconnect_();
          }
      };
      /**
       * Invokes the update of observers. It will continue running updates insofar
       * it detects changes.
       *
       * @returns {void}
       */
      ResizeObserverController.prototype.refresh = function () {
          var changesDetected = this.updateObservers_();
          // Continue running updates if changes have been detected as there might
          // be future ones caused by CSS transitions.
          if (changesDetected) {
              this.refresh();
          }
      };
      /**
       * Updates every observer from observers list and notifies them of queued
       * entries.
       *
       * @private
       * @returns {boolean} Returns "true" if any observer has detected changes in
       *      dimensions of it's elements.
       */
      ResizeObserverController.prototype.updateObservers_ = function () {
          // Collect observers that have active observations.
          var activeObservers = this.observers_.filter(function (observer) {
              return observer.gatherActive(), observer.hasActive();
          });
          // Deliver notifications in a separate cycle in order to avoid any
          // collisions between observers, e.g. when multiple instances of
          // ResizeObserver are tracking the same element and the callback of one
          // of them changes content dimensions of the observed target. Sometimes
          // this may result in notifications being blocked for the rest of observers.
          activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
          return activeObservers.length > 0;
      };
      /**
       * Initializes DOM listeners.
       *
       * @private
       * @returns {void}
       */
      ResizeObserverController.prototype.connect_ = function () {
          // Do nothing if running in a non-browser environment or if listeners
          // have been already added.
          if (!isBrowser || this.connected_) {
              return;
          }
          // Subscription to the "Transitionend" event is used as a workaround for
          // delayed transitions. This way it's possible to capture at least the
          // final state of an element.
          document.addEventListener('transitionend', this.onTransitionEnd_);
          window.addEventListener('resize', this.refresh);
          if (mutationObserverSupported) {
              this.mutationsObserver_ = new MutationObserver(this.refresh);
              this.mutationsObserver_.observe(document, {
                  attributes: true,
                  childList: true,
                  characterData: true,
                  subtree: true
              });
          }
          else {
              document.addEventListener('DOMSubtreeModified', this.refresh);
              this.mutationEventsAdded_ = true;
          }
          this.connected_ = true;
      };
      /**
       * Removes DOM listeners.
       *
       * @private
       * @returns {void}
       */
      ResizeObserverController.prototype.disconnect_ = function () {
          // Do nothing if running in a non-browser environment or if listeners
          // have been already removed.
          if (!isBrowser || !this.connected_) {
              return;
          }
          document.removeEventListener('transitionend', this.onTransitionEnd_);
          window.removeEventListener('resize', this.refresh);
          if (this.mutationsObserver_) {
              this.mutationsObserver_.disconnect();
          }
          if (this.mutationEventsAdded_) {
              document.removeEventListener('DOMSubtreeModified', this.refresh);
          }
          this.mutationsObserver_ = null;
          this.mutationEventsAdded_ = false;
          this.connected_ = false;
      };
      /**
       * "Transitionend" event handler.
       *
       * @private
       * @param {TransitionEvent} event
       * @returns {void}
       */
      ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
          var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
          // Detect whether transition may affect dimensions of an element.
          var isReflowProperty = transitionKeys.some(function (key) {
              return !!~propertyName.indexOf(key);
          });
          if (isReflowProperty) {
              this.refresh();
          }
      };
      /**
       * Returns instance of the ResizeObserverController.
       *
       * @returns {ResizeObserverController}
       */
      ResizeObserverController.getInstance = function () {
          if (!this.instance_) {
              this.instance_ = new ResizeObserverController();
          }
          return this.instance_;
      };
      /**
       * Holds reference to the controller's instance.
       *
       * @private {ResizeObserverController}
       */
      ResizeObserverController.instance_ = null;
      return ResizeObserverController;
  }());

  /**
   * Defines non-writable/enumerable properties of the provided target object.
   *
   * @param {Object} target - Object for which to define properties.
   * @param {Object} props - Properties to be defined.
   * @returns {Object} Target object.
   */
  var defineConfigurable = (function (target, props) {
      for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
          var key = _a[_i];
          Object.defineProperty(target, key, {
              value: props[key],
              enumerable: false,
              writable: false,
              configurable: true
          });
      }
      return target;
  });

  /**
   * Returns the global object associated with provided element.
   *
   * @param {Object} target
   * @returns {Object}
   */
  var getWindowOf = (function (target) {
      // Assume that the element is an instance of Node, which means that it
      // has the "ownerDocument" property from which we can retrieve a
      // corresponding global object.
      var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
      // Return the local global object if it's not possible extract one from
      // provided element.
      return ownerGlobal || global$1;
  });

  // Placeholder of an empty content rectangle.
  var emptyRect = createRectInit(0, 0, 0, 0);
  /**
   * Converts provided string to a number.
   *
   * @param {number|string} value
   * @returns {number}
   */
  function toFloat(value) {
      return parseFloat(value) || 0;
  }
  /**
   * Extracts borders size from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @param {...string} positions - Borders positions (top, right, ...)
   * @returns {number}
   */
  function getBordersSize(styles) {
      var positions = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          positions[_i - 1] = arguments[_i];
      }
      return positions.reduce(function (size, position) {
          var value = styles['border-' + position + '-width'];
          return size + toFloat(value);
      }, 0);
  }
  /**
   * Extracts paddings sizes from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @returns {Object} Paddings box.
   */
  function getPaddings(styles) {
      var positions = ['top', 'right', 'bottom', 'left'];
      var paddings = {};
      for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
          var position = positions_1[_i];
          var value = styles['padding-' + position];
          paddings[position] = toFloat(value);
      }
      return paddings;
  }
  /**
   * Calculates content rectangle of provided SVG element.
   *
   * @param {SVGGraphicsElement} target - Element content rectangle of which needs
   *      to be calculated.
   * @returns {DOMRectInit}
   */
  function getSVGContentRect(target) {
      var bbox = target.getBBox();
      return createRectInit(0, 0, bbox.width, bbox.height);
  }
  /**
   * Calculates content rectangle of provided HTMLElement.
   *
   * @param {HTMLElement} target - Element for which to calculate the content rectangle.
   * @returns {DOMRectInit}
   */
  function getHTMLElementContentRect(target) {
      // Client width & height properties can't be
      // used exclusively as they provide rounded values.
      var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
      // By this condition we can catch all non-replaced inline, hidden and
      // detached elements. Though elements with width & height properties less
      // than 0.5 will be discarded as well.
      //
      // Without it we would need to implement separate methods for each of
      // those cases and it's not possible to perform a precise and performance
      // effective test for hidden elements. E.g. even jQuery's ':visible' filter
      // gives wrong results for elements with width & height less than 0.5.
      if (!clientWidth && !clientHeight) {
          return emptyRect;
      }
      var styles = getWindowOf(target).getComputedStyle(target);
      var paddings = getPaddings(styles);
      var horizPad = paddings.left + paddings.right;
      var vertPad = paddings.top + paddings.bottom;
      // Computed styles of width & height are being used because they are the
      // only dimensions available to JS that contain non-rounded values. It could
      // be possible to utilize the getBoundingClientRect if only it's data wasn't
      // affected by CSS transformations let alone paddings, borders and scroll bars.
      var width = toFloat(styles.width), height = toFloat(styles.height);
      // Width & height include paddings and borders when the 'border-box' box
      // model is applied (except for IE).
      if (styles.boxSizing === 'border-box') {
          // Following conditions are required to handle Internet Explorer which
          // doesn't include paddings and borders to computed CSS dimensions.
          //
          // We can say that if CSS dimensions + paddings are equal to the "client"
          // properties then it's either IE, and thus we don't need to subtract
          // anything, or an element merely doesn't have paddings/borders styles.
          if (Math.round(width + horizPad) !== clientWidth) {
              width -= getBordersSize(styles, 'left', 'right') + horizPad;
          }
          if (Math.round(height + vertPad) !== clientHeight) {
              height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
          }
      }
      // Following steps can't be applied to the document's root element as its
      // client[Width/Height] properties represent viewport area of the window.
      // Besides, it's as well not necessary as the <html> itself neither has
      // rendered scroll bars nor it can be clipped.
      if (!isDocumentElement(target)) {
          // In some browsers (only in Firefox, actually) CSS width & height
          // include scroll bars size which can be removed at this step as scroll
          // bars are the only difference between rounded dimensions + paddings
          // and "client" properties, though that is not always true in Chrome.
          var vertScrollbar = Math.round(width + horizPad) - clientWidth;
          var horizScrollbar = Math.round(height + vertPad) - clientHeight;
          // Chrome has a rather weird rounding of "client" properties.
          // E.g. for an element with content width of 314.2px it sometimes gives
          // the client width of 315px and for the width of 314.7px it may give
          // 314px. And it doesn't happen all the time. So just ignore this delta
          // as a non-relevant.
          if (Math.abs(vertScrollbar) !== 1) {
              width -= vertScrollbar;
          }
          if (Math.abs(horizScrollbar) !== 1) {
              height -= horizScrollbar;
          }
      }
      return createRectInit(paddings.left, paddings.top, width, height);
  }
  /**
   * Checks whether provided element is an instance of the SVGGraphicsElement.
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  var isSVGGraphicsElement = (function () {
      // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
      // interface.
      if (typeof SVGGraphicsElement !== 'undefined') {
          return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
      }
      // If it's so, then check that element is at least an instance of the
      // SVGElement and that it has the "getBBox" method.
      // eslint-disable-next-line no-extra-parens
      return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
          typeof target.getBBox === 'function'); };
  })();
  /**
   * Checks whether provided element is a document element (<html>).
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  function isDocumentElement(target) {
      return target === getWindowOf(target).document.documentElement;
  }
  /**
   * Calculates an appropriate content rectangle for provided html or svg element.
   *
   * @param {Element} target - Element content rectangle of which needs to be calculated.
   * @returns {DOMRectInit}
   */
  function getContentRect(target) {
      if (!isBrowser) {
          return emptyRect;
      }
      if (isSVGGraphicsElement(target)) {
          return getSVGContentRect(target);
      }
      return getHTMLElementContentRect(target);
  }
  /**
   * Creates rectangle with an interface of the DOMRectReadOnly.
   * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
   *
   * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
   * @returns {DOMRectReadOnly}
   */
  function createReadOnlyRect(_a) {
      var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
      // If DOMRectReadOnly is available use it as a prototype for the rectangle.
      var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
      var rect = Object.create(Constr.prototype);
      // Rectangle's properties are not writable and non-enumerable.
      defineConfigurable(rect, {
          x: x, y: y, width: width, height: height,
          top: y,
          right: x + width,
          bottom: height + y,
          left: x
      });
      return rect;
  }
  /**
   * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
   * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} width - Rectangle's width.
   * @param {number} height - Rectangle's height.
   * @returns {DOMRectInit}
   */
  function createRectInit(x, y, width, height) {
      return { x: x, y: y, width: width, height: height };
  }

  /**
   * Class that is responsible for computations of the content rectangle of
   * provided DOM element and for keeping track of it's changes.
   */
  var ResizeObservation = /** @class */ (function () {
      /**
       * Creates an instance of ResizeObservation.
       *
       * @param {Element} target - Element to be observed.
       */
      function ResizeObservation(target) {
          /**
           * Broadcasted width of content rectangle.
           *
           * @type {number}
           */
          this.broadcastWidth = 0;
          /**
           * Broadcasted height of content rectangle.
           *
           * @type {number}
           */
          this.broadcastHeight = 0;
          /**
           * Reference to the last observed content rectangle.
           *
           * @private {DOMRectInit}
           */
          this.contentRect_ = createRectInit(0, 0, 0, 0);
          this.target = target;
      }
      /**
       * Updates content rectangle and tells whether it's width or height properties
       * have changed since the last broadcast.
       *
       * @returns {boolean}
       */
      ResizeObservation.prototype.isActive = function () {
          var rect = getContentRect(this.target);
          this.contentRect_ = rect;
          return (rect.width !== this.broadcastWidth ||
              rect.height !== this.broadcastHeight);
      };
      /**
       * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
       * from the corresponding properties of the last observed content rectangle.
       *
       * @returns {DOMRectInit} Last observed content rectangle.
       */
      ResizeObservation.prototype.broadcastRect = function () {
          var rect = this.contentRect_;
          this.broadcastWidth = rect.width;
          this.broadcastHeight = rect.height;
          return rect;
      };
      return ResizeObservation;
  }());

  var ResizeObserverEntry = /** @class */ (function () {
      /**
       * Creates an instance of ResizeObserverEntry.
       *
       * @param {Element} target - Element that is being observed.
       * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
       */
      function ResizeObserverEntry(target, rectInit) {
          var contentRect = createReadOnlyRect(rectInit);
          // According to the specification following properties are not writable
          // and are also not enumerable in the native implementation.
          //
          // Property accessors are not being used as they'd require to define a
          // private WeakMap storage which may cause memory leaks in browsers that
          // don't support this type of collections.
          defineConfigurable(this, { target: target, contentRect: contentRect });
      }
      return ResizeObserverEntry;
  }());

  var ResizeObserverSPI = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserver.
       *
       * @param {ResizeObserverCallback} callback - Callback function that is invoked
       *      when one of the observed elements changes it's content dimensions.
       * @param {ResizeObserverController} controller - Controller instance which
       *      is responsible for the updates of observer.
       * @param {ResizeObserver} callbackCtx - Reference to the public
       *      ResizeObserver instance which will be passed to callback function.
       */
      function ResizeObserverSPI(callback, controller, callbackCtx) {
          /**
           * Collection of resize observations that have detected changes in dimensions
           * of elements.
           *
           * @private {Array<ResizeObservation>}
           */
          this.activeObservations_ = [];
          /**
           * Registry of the ResizeObservation instances.
           *
           * @private {Map<Element, ResizeObservation>}
           */
          this.observations_ = new MapShim();
          if (typeof callback !== 'function') {
              throw new TypeError('The callback provided as parameter 1 is not a function.');
          }
          this.callback_ = callback;
          this.controller_ = controller;
          this.callbackCtx_ = callbackCtx;
      }
      /**
       * Starts observing provided element.
       *
       * @param {Element} target - Element to be observed.
       * @returns {void}
       */
      ResizeObserverSPI.prototype.observe = function (target) {
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          // Do nothing if current environment doesn't have the Element interface.
          if (typeof Element === 'undefined' || !(Element instanceof Object)) {
              return;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          var observations = this.observations_;
          // Do nothing if element is already being observed.
          if (observations.has(target)) {
              return;
          }
          observations.set(target, new ResizeObservation(target));
          this.controller_.addObserver(this);
          // Force the update of observations.
          this.controller_.refresh();
      };
      /**
       * Stops observing provided element.
       *
       * @param {Element} target - Element to stop observing.
       * @returns {void}
       */
      ResizeObserverSPI.prototype.unobserve = function (target) {
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          // Do nothing if current environment doesn't have the Element interface.
          if (typeof Element === 'undefined' || !(Element instanceof Object)) {
              return;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          var observations = this.observations_;
          // Do nothing if element is not being observed.
          if (!observations.has(target)) {
              return;
          }
          observations.delete(target);
          if (!observations.size) {
              this.controller_.removeObserver(this);
          }
      };
      /**
       * Stops observing all elements.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.disconnect = function () {
          this.clearActive();
          this.observations_.clear();
          this.controller_.removeObserver(this);
      };
      /**
       * Collects observation instances the associated element of which has changed
       * it's content rectangle.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.gatherActive = function () {
          var _this = this;
          this.clearActive();
          this.observations_.forEach(function (observation) {
              if (observation.isActive()) {
                  _this.activeObservations_.push(observation);
              }
          });
      };
      /**
       * Invokes initial callback function with a list of ResizeObserverEntry
       * instances collected from active resize observations.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.broadcastActive = function () {
          // Do nothing if observer doesn't have active observations.
          if (!this.hasActive()) {
              return;
          }
          var ctx = this.callbackCtx_;
          // Create ResizeObserverEntry instance for every active observation.
          var entries = this.activeObservations_.map(function (observation) {
              return new ResizeObserverEntry(observation.target, observation.broadcastRect());
          });
          this.callback_.call(ctx, entries, ctx);
          this.clearActive();
      };
      /**
       * Clears the collection of active observations.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.clearActive = function () {
          this.activeObservations_.splice(0);
      };
      /**
       * Tells whether observer has active observations.
       *
       * @returns {boolean}
       */
      ResizeObserverSPI.prototype.hasActive = function () {
          return this.activeObservations_.length > 0;
      };
      return ResizeObserverSPI;
  }());

  // Registry of internal observers. If WeakMap is not available use current shim
  // for the Map collection as it has all required methods and because WeakMap
  // can't be fully polyfilled anyway.
  var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
  /**
   * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
   * exposing only those methods and properties that are defined in the spec.
   */
  var ResizeObserver = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserver.
       *
       * @param {ResizeObserverCallback} callback - Callback that is invoked when
       *      dimensions of the observed elements change.
       */
      function ResizeObserver(callback) {
          if (!(this instanceof ResizeObserver)) {
              throw new TypeError('Cannot call a class as a function.');
          }
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          var controller = ResizeObserverController.getInstance();
          var observer = new ResizeObserverSPI(callback, controller, this);
          observers.set(this, observer);
      }
      return ResizeObserver;
  }());
  // Expose public methods of ResizeObserver.
  [
      'observe',
      'unobserve',
      'disconnect'
  ].forEach(function (method) {
      ResizeObserver.prototype[method] = function () {
          var _a;
          return (_a = observers.get(this))[method].apply(_a, arguments);
      };
  });

  var index$1 = (function () {
      // Export existing implementation if available.
      if (typeof global$1.ResizeObserver !== 'undefined') {
          return global$1.ResizeObserver;
      }
      return ResizeObserver;
  })();

  var isServer = typeof window === 'undefined';
  var resizeHandler = function (entries) {
      var e_1, _a;
      try {
          for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
              var entry = entries_1_1.value;
              var listeners = entry.target.__resizeListeners__ || [];
              if (listeners.length) {
                  listeners.forEach(function (fn) {
                      fn();
                  });
              }
          }
      }
      catch (e_1_1) { e_1 = { error: e_1_1 }; }
      finally {
          try {
              if (entries_1_1 && !entries_1_1.done && (_a = entries_1["return"])) _a.call(entries_1);
          }
          finally { if (e_1) throw e_1.error; }
      }
  };
  var addResizeListener = function (element, fn) {
      if (isServer || !element)
          return;
      if (!element.__resizeListeners__) {
          element.__resizeListeners__ = [];
          element.__ro__ = new index$1(resizeHandler);
          element.__ro__.observe(element);
      }
      element.__resizeListeners__.push(fn);
  };
  var removeResizeListener = function (element, fn) {
      if (!element || !element.__resizeListeners__)
          return;
      element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
      if (!element.__resizeListeners__.length) {
          element.__ro__.disconnect();
      }
  };

  function omit(target, keys) {
      if (!isObject$2(target))
          return target;
      return Object.keys(target).reduce(function (res, key) {
          if (!keys.includes(key)) {
              Reflect.set(res, key, target[key]);
          }
          return res;
      }, {});
  }
  function useEnumOptions(obj, name, id) {
      if (name === void 0) { name = 'name'; }
      if (id === void 0) { id = 'id'; }
      var result = [];
      Object.entries(obj).forEach(function (_a) {
          var _b;
          var _c = __read(_a, 2), key = _c[0], val = _c[1];
          if (R__namespace.is(Number, val)) {
              result.push((_b = {}, _b[name] = key, _b[id] = val, _b));
          }
      });
      return result;
  }
  function throttle$1(func, wait, options) {
      if (wait === void 0) { wait = 100; }
      var timeout, context, args, result;
      var previous = 0;
      if (!options)
          options = {};
      function later() {
          previous = (options === null || options === void 0 ? void 0 : options.leading) === false ? 0 : Date.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout)
              context = args = null; // 显式地释放内存，防止内存泄漏
      }
      function throttled() {
          var innerArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i] = arguments[_i];
          }
          var now = Date.now();
          if (!previous && (options === null || options === void 0 ? void 0 : options.leading) === false)
              previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = innerArgs;
          if (remaining <= 0 || remaining > wait) {
              if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
              }
              previous = now;
              result = func.apply(context, innerArgs);
              if (!timeout)
                  context = args = null;
          }
          else if (!timeout && (options === null || options === void 0 ? void 0 : options.trailing) !== false) {
              timeout = setTimeout(later, remaining);
          }
          return result;
      }
      return throttled;
  }
  /**
   * 为函数添加状态改变
   */
  function useLoading(fn, argLoading) {
      var loading = vue.ref(false);
      if (argLoading)
          argLoading.value = false;
      function call() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          return __awaiter(this, void 0, void 0, function () {
              var result, e_1;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (loading.value) {
                              return [2 /*return*/, Promise.reject('loading...')];
                          }
                          loading.value = true;
                          if (argLoading)
                              argLoading.value = true;
                          result = null;
                          _a.label = 1;
                      case 1:
                          _a.trys.push([1, 3, , 4]);
                          return [4 /*yield*/, fn.apply(void 0, __spreadArray([], __read(args)))];
                      case 2:
                          result = _a.sent();
                          return [3 /*break*/, 4];
                      case 3:
                          e_1 = _a.sent();
                          result = Promise.reject(e_1);
                          return [3 /*break*/, 4];
                      case 4:
                          if (argLoading)
                              argLoading.value = false;
                          loading.value = false;
                          return [2 /*return*/, result];
                  }
              });
          });
      }
      return [call, loading];
  }
  var isDeepObjectEqual = function (obj1, obj2) {
      //1.如果是比较对象===，返回true
      if (obj1 === obj2)
          return true;
      //2.如果比较的是两个方法，转成字符串比较
      if (typeof obj1 === 'function' && typeof obj2 === 'function')
          return obj1.toString() === obj2.toString();
      //3如果obj1和obj2都是Date实例，获取毫秒值比较
      if (obj1 instanceof Date && obj2 instanceof Date)
          return obj1.getTime() === obj2.getTime();
      //4如果比较是两个类型不一致,无须比较直接返回false
      if (Object.prototype.toString.call(obj1) !== Object.prototype.toString.call(obj2) ||
          typeof obj1 !== 'object')
          return false;
      //5.获取对象所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性
      var obj1Props = Object.getOwnPropertyNames(obj1);
      var obj2Props = Object.getOwnPropertyNames(obj2);
      //自身属性长度相等,
      if (obj1Props.length !== obj2Props.length)
          return false;
      //递归调用判断每一个属性值是否相等
      return obj1Props.every(function (prop) { return isDeepObjectEqual(obj1[prop], obj2[prop]); });
  };

  var renderComp = function (attrs, slots, Comp) {
      return (vue.openBlock(),
          vue.createBlock(vue.Fragment, null, [
              Comp
                  ? isFunction$2(Comp)
                      ? (function () {
                          var prop = attrs.__prop;
                          return Comp(Object.assign(omit(attrs, ['__closable', '__emit', '__prop']), { prop: prop }));
                      })()
                      : vue.createVNode(Comp, omit(attrs, ['__closable', '__emit', '__prop']), slots, 16 /* FULL_PROPS */)
                  : vue.createCommentVNode('v-if_component', true),
          ]));
  };
  var CxFormRender = /** @class */ (function () {
      function CxFormRender() {
          this.renderComp = renderComp;
      }
      CxFormRender.prototype.renderControl = function (attrs, slots, Comp) {
          return vue.createVNode('div', { style: { position: 'relative' } }, [
              renderComp(attrs, slots, Comp),
              attrs.__closable
                  ? vue.createVNode('i', {
                      style: { position: 'absolute', right: '-3px', top: '-3px' },
                      "class": 'iconfont icon-shanchu',
                      onClick: function () {
                          isFunction$2(attrs.__emit) && attrs.__emit('close', attrs.__prop);
                      },
                  })
                  : vue.createCommentVNode('v-if_closable', true),
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
              throw new CxFormError("can't set property before regist");
          var item = _config === null || _config === void 0 ? void 0 : _config.items.find(function (item) { return item.prop === prop; });
          if (!item) {
              return console.warn("[cxForm warn]: prop " + prop + " isn't exist on this form's configList ");
          }
          if (Reflect.has(item, attr))
              return Reflect.set(item, attr, val);
          __spreadArray([], __read(CxFormRenderMap.keys())).find(function (type) {
              var typeAttrs = Reflect.get(item, type);
              if (!isObject$2(typeAttrs))
                  return;
              if (attr === 'options') {
                  if (!Array.isArray(val))
                      throw new CxFormError("can't set options with non-array");
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
          if (!isObject$2(slots))
              return this;
          isObject$2((_a = this.config) === null || _a === void 0 ? void 0 : _a.slot) &&
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
              if (!isObject$2(Reflect.get(_this.config, type)))
                  return;
              var adaptor = ((_a = getRenderer(type)) !== null && _a !== void 0 ? _a : {}).adaptor;
              _this.type = type;
              isFunction$2(adaptor)
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
              isFunction$2(_this.emit) && _this.emit('change', payload);
              isFunction$2((_a = _this.config) === null || _a === void 0 ? void 0 : _a.onChange) && ((_b = _this.config) === null || _b === void 0 ? void 0 : _b.onChange(payload));
          });
          !isObject$2((_b = this.attrs) === null || _b === void 0 ? void 0 : _b.style) && Reflect.set(this.attrs, 'style', {});
          this.config.width &&
              isObject$2((_c = this.attrs) === null || _c === void 0 ? void 0 : _c.style) &&
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
              Control = isFunction$2(comp) ? comp() : comp;
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
          _this.ref = vue.ref(null);
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
          var form = (_b = (_a = useCxForm().getRenderer('form')) === null || _a === void 0 ? void 0 : _a.comp) !== null && _b !== void 0 ? _b : vue.resolveComponent('ElForm');
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
          if (isObject$2(slots)) {
              var itemSlot = { "default": slots["default"] };
              this.config.labelSlot && Reflect.set(itemSlot, 'label', function () { var _a; return (_a = slots[_this.config.labelSlot]) === null || _a === void 0 ? void 0 : _a.call(slots, __assign({}, _this.config)); });
              Object.assign(this.slots, itemSlot);
          }
          return this;
      };
      CxFormItem.prototype.propAdaptor = function () {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
          // 以下顺序请勿变更
          isNumber$1((_a = this.config) === null || _a === void 0 ? void 0 : _a.spacing) && Reflect.set(this.attrs, 'style', { paddingRight: ((_b = this.config) === null || _b === void 0 ? void 0 : _b.spacing) + 'px' });
          Reflect.set(this.attrs, 'key', (_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.prop) !== null && _d !== void 0 ? _d : '');
          Object.assign(this.attrs, (_f = (_e = this.config) === null || _e === void 0 ? void 0 : _e.itemAttrs) !== null && _f !== void 0 ? _f : {});
          ((_g = this.config) === null || _g === void 0 ? void 0 : _g.labelWidth) && Reflect.set(this.attrs, 'labelWidth', this.config.labelWidth + 'px');
          Reflect.set(this.attrs, 'label', (_j = (_h = this.config) === null || _h === void 0 ? void 0 : _h.label) !== null && _j !== void 0 ? _j : '');
          Reflect.set(this.attrs, 'prop', (_l = (_k = this.config) === null || _k === void 0 ? void 0 : _k.prop) !== null && _l !== void 0 ? _l : '');
          return this;
      };
      CxFormItem.prototype.render = function () {
          var _a, _b;
          var formItem = (_b = (_a = useCxForm().getRenderer('formItem')) === null || _a === void 0 ? void 0 : _a.comp) !== null && _b !== void 0 ? _b : vue.resolveComponent('ElFormItem');
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

  var CxForm = vue.defineComponent({
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
          return function () {
              return vue.createVNode('div', { name: 'cx-form' }, [renderForm()]);
          };
      },
  });

  var script$6 = CxForm;
  script$6.install = function (app) {
      app.component(script$6.name, script$6);
  };
  var _CX_FORM = script$6;

  //
  var script$5 = vue.defineComponent({
      name: 'CxDialog',
      props: {
          title: String,
          isFullScreen: {
              type: Boolean,
              "default": false,
          },
          cancelText: {
              type: String,
              "default": '取消',
          },
          okText: {
              type: String,
              "default": '确认',
          },
          disabledOk: { type: Boolean, "default": false },
          okLoading: { type: Boolean, "default": false },
      },
      emits: ['register', 'cancel', 'ok', 'fullscreen', 'open'],
      setup: function (props, _a) {
          var emit = _a.emit, expose = _a.expose;
          var dialogVisible = vue.ref(false);
          var fullscreenRef = vue.ref(false);
          // 取消按钮回调
          function handleCancel() {
              dialogVisible.value = false;
              emit('cancel');
          }
          // 进入全屏
          function handleFullScreen(val) {
              fullscreenRef.value = val;
              emit('fullscreen', val);
          }
          function openDialog(visible) {
              if (visible === void 0) { visible = true; }
              dialogVisible.value = !!visible;
              visible && emit('open');
          }
          expose({
              openDialog: openDialog,
          });
          var dialogActions = {
              openDialog: openDialog,
          };
          vue.onMounted(function () {
              emit('register', dialogActions);
          });
          var dialogProps = vue.computed(function () {
              return omit(props, ['cancelText', 'isFullScreen', 'okText', 'okLoading', 'disabledOk']);
          });
          return {
              openDialog: openDialog,
              fullscreenRef: fullscreenRef,
              dialogVisible: dialogVisible,
              handleCancel: handleCancel,
              dialogProps: dialogProps,
              handleFullScreen: handleFullScreen,
          };
      },
  });

  const _withScopeId$1 = n => (vue.pushScopeId("data-v-342d80fb"),n=n(),vue.popScopeId(),n);
  const _hoisted_1$4 = { class: "basic-dialog_header" };
  const _hoisted_2$2 = { class: "basic-dialog_title" };
  const _hoisted_3$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/vue.createElementVNode("i", { class: "iconfont icon-quanpingsuoxiao" }, null, -1 /* HOISTED */));
  const _hoisted_4$2 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/vue.createElementVNode("i", { class: "el-icon-full-screen" }, null, -1 /* HOISTED */));
  const _hoisted_5$1 = { class: "basic-dialog_footer" };
  const _hoisted_6$1 = { class: "baisc-dialog_prefix" };
  const _hoisted_7$1 = { class: "baisc-dialog_btns" };
  const _hoisted_8$1 = { class: "basic-dialog_content" };

  function render$4(_ctx, _cache) {
    const _component_el_button = vue.resolveComponent("el-button");
    const _component_cx_btn = vue.resolveComponent("cx-btn");
    const _component_el_dialog = vue.resolveComponent("el-dialog");

    return (vue.openBlock(), vue.createBlock(_component_el_dialog, vue.mergeProps({
      customClass: _ctx.fullscreenRef ? 'basic-dialog basic-dialog_fullscreen' : 'basic-dialog',
      modelValue: _ctx.dialogVisible,
      onClose: _cache[3] || (_cache[3] = $event => (_ctx.openDialog(false))),
      fullscreen: _ctx.fullscreenRef
    }, { ..._ctx.dialogProps, ..._ctx.$attrs }), {
      title: vue.withCtx(() => [
        vue.createElementVNode("div", _hoisted_1$4, [
          vue.createElementVNode("p", _hoisted_2$2, [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.title), 1 /* TEXT */)
            ])
          ]),
          (_ctx.fullscreenRef)
            ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 0,
                type: "text",
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.handleFullScreen(false)))
              }, {
                default: vue.withCtx(() => [
                  _hoisted_3$1
                ]),
                _: 1 /* STABLE */
              }))
            : (vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 1,
                type: "text",
                onClick: _cache[1] || (_cache[1] = $event => (_ctx.handleFullScreen(true)))
              }, {
                default: vue.withCtx(() => [
                  _hoisted_4$2
                ]),
                _: 1 /* STABLE */
              }))
        ])
      ]),
      footer: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "footer", {}, () => [
          vue.createElementVNode("div", _hoisted_5$1, [
            vue.createElementVNode("div", _hoisted_6$1, [
              vue.renderSlot(_ctx.$slots, "footerPrefix")
            ]),
            vue.createElementVNode("div", _hoisted_7$1, [
              (_ctx.cancelText)
                ? (vue.openBlock(), vue.createBlock(_component_cx_btn, {
                    key: 0,
                    onClick: _ctx.handleCancel,
                    class: "cx_mr_16"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(_ctx.cancelText), 1 /* TEXT */)
                    ]),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["onClick"]))
                : vue.createCommentVNode("v-if", true),
              (_ctx.okText)
                ? (vue.openBlock(), vue.createBlock(_component_cx_btn, {
                    key: 1,
                    level: "1",
                    disabled: _ctx.disabledOk,
                    loading: _ctx.okLoading,
                    onClick: _cache[2] || (_cache[2] = $event => (_ctx.emit('ok', _ctx.handleCancel)))
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(_ctx.okText), 1 /* TEXT */)
                    ]),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["disabled", "loading"]))
                : vue.createCommentVNode("v-if", true)
            ])
          ])
        ])
      ]),
      default: vue.withCtx(() => [
        vue.createElementVNode("div", _hoisted_8$1, [
          vue.renderSlot(_ctx.$slots, "default")
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["customClass", "modelValue", "fullscreen"]))
  }

  script$5.render = render$4;
  script$5.__scopeId = "data-v-342d80fb";
  script$5.__file = "src/lib/cx-dialog/component.vue";

  script$5.install = function (app) {
      app.component(script$5.name, script$5);
  };
  var _CX_DIALOG = script$5;

  exports.ARROW_KEY = void 0;
  (function (ARROW_KEY) {
      ARROW_KEY["L"] = "ArrowLeft";
      ARROW_KEY["R"] = "ArrowRight";
      ARROW_KEY["U"] = "ArrowUp";
      ARROW_KEY["D"] = "ArrowDown";
  })(exports.ARROW_KEY || (exports.ARROW_KEY = {}));
  exports.COLUMN_FLAG = void 0;
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
  })(exports.COLUMN_FLAG || (exports.COLUMN_FLAG = {}));
  exports.CX_STYLE_SETTING = void 0;
  (function (CX_STYLE_SETTING) {
      CX_STYLE_SETTING["width"] = "CX_TABLE_MIN_WIDTH";
      CX_STYLE_SETTING["height"] = "CX_TABLE_HEIGHT";
      CX_STYLE_SETTING["cache"] = "CX_VISUAL_CACHE";
      CX_STYLE_SETTING["padding"] = "CX_TABLE_PADDING";
  })(exports.CX_STYLE_SETTING || (exports.CX_STYLE_SETTING = {}));
  exports.CX_SPAN_METHOD_TYPE = void 0;
  (function (CX_SPAN_METHOD_TYPE) {
      CX_SPAN_METHOD_TYPE[CX_SPAN_METHOD_TYPE["MISSING"] = 1] = "MISSING";
      CX_SPAN_METHOD_TYPE[CX_SPAN_METHOD_TYPE["EXTEND"] = 2] = "EXTEND";
  })(exports.CX_SPAN_METHOD_TYPE || (exports.CX_SPAN_METHOD_TYPE = {}));
  exports.CX_SORT_STATUS = void 0;
  (function (CX_SORT_STATUS) {
      CX_SORT_STATUS[CX_SORT_STATUS["REVERSE"] = 0] = "REVERSE";
      CX_SORT_STATUS[CX_SORT_STATUS["POSITIVE"] = 1] = "POSITIVE";
      CX_SORT_STATUS[CX_SORT_STATUS["NONE"] = 2] = "NONE";
  })(exports.CX_SORT_STATUS || (exports.CX_SORT_STATUS = {}));
  exports.PATCH_FLAG = void 0;
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
  })(exports.PATCH_FLAG || (exports.PATCH_FLAG = {}));
  exports.CX_ADAPTOR_PRECISION_TYPE = void 0;
  (function (CX_ADAPTOR_PRECISION_TYPE) {
      CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["GOLD"] = 1] = "GOLD";
      CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["STONE"] = 2] = "STONE";
      CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["PRICE"] = 3] = "PRICE";
      CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["INT"] = 4] = "INT";
      CX_ADAPTOR_PRECISION_TYPE[CX_ADAPTOR_PRECISION_TYPE["LOSS"] = 5] = "LOSS";
  })(exports.CX_ADAPTOR_PRECISION_TYPE || (exports.CX_ADAPTOR_PRECISION_TYPE = {}));
  exports.TypeOption = void 0;
  (function (TypeOption) {
      TypeOption[TypeOption["\u672A\u63D0\u4EA4"] = 0] = "\u672A\u63D0\u4EA4";
      TypeOption[TypeOption["\u5DF2\u9A73\u56DE"] = 1] = "\u5DF2\u9A73\u56DE";
      TypeOption[TypeOption["\u5DF2\u53CD\u5BA1"] = 2] = "\u5DF2\u53CD\u5BA1";
  })(exports.TypeOption || (exports.TypeOption = {}));

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
      return vue.reactive({
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

  var toString = Object.prototype.toString;
  function is(val, type) {
      return toString.call(val) === "[object " + type + "]";
  }
  function isEmpty$1(value) {
      return (value === undefined ||
          value === null ||
          (typeof value === 'string' && value.trim() === '') ||
          (typeof value === 'object' && Object.keys(value).length === 0));
  }
  var isObject$1 = function (val) {
      return val !== null && is(val, 'Object');
  };
  function isDate(val) {
      return is(val, 'Date');
  }
  function isNull(val) {
      return val === null;
  }
  function isNumber(val) {
      return is(val, 'Number');
  }
  function isString$1(val) {
      return is(val, 'String');
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  var isFunction$1 = function (val) { return typeof val === 'function'; };
  function isBoolean(val) {
      return is(val, 'Boolean');
  }
  function isArray$1(val) {
      return val && Array.isArray(val);
  }

  var clipboard = vue.ref(null);
  var useCopy = function (props) {
      var copy = function () {
          clipboard.value = R.clone(props.tableData);
          return clipboard.value;
      };
      var paste = function (payload) {
          var _a;
          if (!Array.isArray(clipboard.value)) {
              return;
          }
          var omitProps = payload.omitProps, onPaste = payload.onPaste;
          var rows = R.clone(clipboard.value).map(function (item) {
              if (Array.isArray(omitProps)) {
                  return R.omit(omitProps, item);
              }
              return item;
          });
          (_a = props.tableData).push.apply(_a, __spreadArray([], __read((isFunction$1(onPaste) ? onPaste(rows) : rows))));
      };
      return { copy: copy, paste: paste };
  };

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   * IMPORTANT: all calls of this function must be prefixed with
   * \/\*#\_\_PURE\_\_\*\/
   * So that rollup can tree-shake them if necessary.
   */
  function makeMap(str, expectsLowerCase) {
      const map = Object.create(null);
      const list = str.split(',');
      for (let i = 0; i < list.length; i++) {
          map[list[i]] = true;
      }
      return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
  }

  function normalizeStyle(value) {
      if (isArray(value)) {
          const res = {};
          for (let i = 0; i < value.length; i++) {
              const item = value[i];
              const normalized = isString(item)
                  ? parseStringStyle(item)
                  : normalizeStyle(item);
              if (normalized) {
                  for (const key in normalized) {
                      res[key] = normalized[key];
                  }
              }
          }
          return res;
      }
      else if (isString(value)) {
          return value;
      }
      else if (isObject(value)) {
          return value;
      }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:(.+)/;
  function parseStringStyle(cssText) {
      const ret = {};
      cssText.split(listDelimiterRE).forEach(item => {
          if (item) {
              const tmp = item.split(propertyDelimiterRE);
              tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
          }
      });
      return ret;
  }
  function normalizeClass(value) {
      let res = '';
      if (isString(value)) {
          res = value;
      }
      else if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
              const normalized = normalizeClass(value[i]);
              if (normalized) {
                  res += normalized + ' ';
              }
          }
      }
      else if (isObject(value)) {
          for (const name in value) {
              if (value[name]) {
                  res += name + ' ';
              }
          }
      }
      return res.trim();
  }

  const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
      ? Object.freeze({})
      : {};
  (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
  const NOOP = () => { };
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const extend$1 = Object.assign;
  const remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
          arr.splice(i, 1);
      }
  };
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === '[object Map]';
  const isSet = (val) => toTypeString(val) === '[object Set]';
  const isFunction = (val) => typeof val === 'function';
  const isString = (val) => typeof val === 'string';
  const isSymbol = (val) => typeof val === 'symbol';
  const isObject = (val) => val !== null && typeof val === 'object';
  const isPromise = (val) => {
      return isObject(val) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
      // extract "RawType" from strings like "[object RawType]"
      return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === '[object Object]';
  const isIntegerKey = (key) => isString(key) &&
      key !== 'NaN' &&
      key[0] !== '-' &&
      '' + parseInt(key, 10) === key;
  const cacheStringFunction = (fn) => {
      const cache = Object.create(null);
      return ((str) => {
          const hit = cache[str];
          return hit || (cache[str] = fn(str));
      });
  };
  /**
   * @private
   */
  const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  /**
   * @private
   */
  const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  // compare whether a value has changed, accounting for NaN.
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const def = (obj, key, value) => {
      Object.defineProperty(obj, key, {
          configurable: true,
          enumerable: false,
          value
      });
  };
  let _globalThis;
  const getGlobalThis = () => {
      return (_globalThis ||
          (_globalThis =
              typeof globalThis !== 'undefined'
                  ? globalThis
                  : typeof self !== 'undefined'
                      ? self
                      : typeof window !== 'undefined'
                          ? window
                          : typeof global !== 'undefined'
                              ? global
                              : {}));
  };

  let activeEffectScope;
  function recordEffectScope(effect, scope) {
      scope = scope || activeEffectScope;
      if (scope && scope.active) {
          scope.effects.push(effect);
      }
  }

  const createDep = (effects) => {
      const dep = new Set(effects);
      dep.w = 0;
      dep.n = 0;
      return dep;
  };
  const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  const newTracked = (dep) => (dep.n & trackOpBit) > 0;
  const initDepMarkers = ({ deps }) => {
      if (deps.length) {
          for (let i = 0; i < deps.length; i++) {
              deps[i].w |= trackOpBit; // set was tracked
          }
      }
  };
  const finalizeDepMarkers = (effect) => {
      const { deps } = effect;
      if (deps.length) {
          let ptr = 0;
          for (let i = 0; i < deps.length; i++) {
              const dep = deps[i];
              if (wasTracked(dep) && !newTracked(dep)) {
                  dep.delete(effect);
              }
              else {
                  deps[ptr++] = dep;
              }
              // clear bits
              dep.w &= ~trackOpBit;
              dep.n &= ~trackOpBit;
          }
          deps.length = ptr;
      }
  };

  const targetMap = new WeakMap();
  // The number of effects currently being tracked recursively.
  let effectTrackDepth = 0;
  let trackOpBit = 1;
  /**
   * The bitwise track markers support at most 30 levels op recursion.
   * This value is chosen to enable modern JS engines to use a SMI on all platforms.
   * When recursion depth is greater, fall back to using a full cleanup.
   */
  const maxMarkerBits = 30;
  const effectStack = [];
  let activeEffect;
  const ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'iterate' : '');
  const MAP_KEY_ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'Map key iterate' : '');
  class ReactiveEffect {
      constructor(fn, scheduler = null, scope) {
          this.fn = fn;
          this.scheduler = scheduler;
          this.active = true;
          this.deps = [];
          recordEffectScope(this, scope);
      }
      run() {
          if (!this.active) {
              return this.fn();
          }
          if (!effectStack.includes(this)) {
              try {
                  effectStack.push((activeEffect = this));
                  enableTracking();
                  trackOpBit = 1 << ++effectTrackDepth;
                  if (effectTrackDepth <= maxMarkerBits) {
                      initDepMarkers(this);
                  }
                  else {
                      cleanupEffect(this);
                  }
                  return this.fn();
              }
              finally {
                  if (effectTrackDepth <= maxMarkerBits) {
                      finalizeDepMarkers(this);
                  }
                  trackOpBit = 1 << --effectTrackDepth;
                  resetTracking();
                  effectStack.pop();
                  const n = effectStack.length;
                  activeEffect = n > 0 ? effectStack[n - 1] : undefined;
              }
          }
      }
      stop() {
          if (this.active) {
              cleanupEffect(this);
              if (this.onStop) {
                  this.onStop();
              }
              this.active = false;
          }
      }
  }
  function cleanupEffect(effect) {
      const { deps } = effect;
      if (deps.length) {
          for (let i = 0; i < deps.length; i++) {
              deps[i].delete(effect);
          }
          deps.length = 0;
      }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
  }
  function enableTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = true;
  }
  function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === undefined ? true : last;
  }
  function track(target, type, key) {
      if (!isTracking()) {
          return;
      }
      let depsMap = targetMap.get(target);
      if (!depsMap) {
          targetMap.set(target, (depsMap = new Map()));
      }
      let dep = depsMap.get(key);
      if (!dep) {
          depsMap.set(key, (dep = createDep()));
      }
      const eventInfo = (process.env.NODE_ENV !== 'production')
          ? { effect: activeEffect, target, type, key }
          : undefined;
      trackEffects(dep, eventInfo);
  }
  function isTracking() {
      return shouldTrack && activeEffect !== undefined;
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
      let shouldTrack = false;
      if (effectTrackDepth <= maxMarkerBits) {
          if (!newTracked(dep)) {
              dep.n |= trackOpBit; // set newly tracked
              shouldTrack = !wasTracked(dep);
          }
      }
      else {
          // Full cleanup mode.
          shouldTrack = !dep.has(activeEffect);
      }
      if (shouldTrack) {
          dep.add(activeEffect);
          activeEffect.deps.push(dep);
          if ((process.env.NODE_ENV !== 'production') && activeEffect.onTrack) {
              activeEffect.onTrack(Object.assign({
                  effect: activeEffect
              }, debuggerEventExtraInfo));
          }
      }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
          // never been tracked
          return;
      }
      let deps = [];
      if (type === "clear" /* CLEAR */) {
          // collection being cleared
          // trigger all effects for target
          deps = [...depsMap.values()];
      }
      else if (key === 'length' && isArray(target)) {
          depsMap.forEach((dep, key) => {
              if (key === 'length' || key >= newValue) {
                  deps.push(dep);
              }
          });
      }
      else {
          // schedule runs for SET | ADD | DELETE
          if (key !== void 0) {
              deps.push(depsMap.get(key));
          }
          // also run for iteration key on ADD | DELETE | Map.SET
          switch (type) {
              case "add" /* ADD */:
                  if (!isArray(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                      if (isMap(target)) {
                          deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                      }
                  }
                  else if (isIntegerKey(key)) {
                      // new index added to array -> length changes
                      deps.push(depsMap.get('length'));
                  }
                  break;
              case "delete" /* DELETE */:
                  if (!isArray(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                      if (isMap(target)) {
                          deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                      }
                  }
                  break;
              case "set" /* SET */:
                  if (isMap(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                  }
                  break;
          }
      }
      const eventInfo = (process.env.NODE_ENV !== 'production')
          ? { target, type, key, newValue, oldValue, oldTarget }
          : undefined;
      if (deps.length === 1) {
          if (deps[0]) {
              if ((process.env.NODE_ENV !== 'production')) {
                  triggerEffects(deps[0], eventInfo);
              }
              else {
                  triggerEffects(deps[0]);
              }
          }
      }
      else {
          const effects = [];
          for (const dep of deps) {
              if (dep) {
                  effects.push(...dep);
              }
          }
          if ((process.env.NODE_ENV !== 'production')) {
              triggerEffects(createDep(effects), eventInfo);
          }
          else {
              triggerEffects(createDep(effects));
          }
      }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
      // spread into array for stabilization
      for (const effect of isArray(dep) ? dep : [...dep]) {
          if (effect !== activeEffect || effect.allowRecurse) {
              if ((process.env.NODE_ENV !== 'production') && effect.onTrigger) {
                  effect.onTrigger(extend$1({ effect }, debuggerEventExtraInfo));
              }
              if (effect.scheduler) {
                  effect.scheduler();
              }
              else {
                  effect.run();
              }
          }
      }
  }

  const isNonTrackableKeys = /*#__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
      .map(key => Symbol[key])
      .filter(isSymbol));
  const get = /*#__PURE__*/ createGetter();
  const readonlyGet = /*#__PURE__*/ createGetter(true);
  const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
  const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations();
  function createArrayInstrumentations() {
      const instrumentations = {};
      ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
          instrumentations[key] = function (...args) {
              const arr = toRaw(this);
              for (let i = 0, l = this.length; i < l; i++) {
                  track(arr, "get" /* GET */, i + '');
              }
              // we run the method using the original args first (which may be reactive)
              const res = arr[key](...args);
              if (res === -1 || res === false) {
                  // if that didn't work, run it again using raw values.
                  return arr[key](...args.map(toRaw));
              }
              else {
                  return res;
              }
          };
      });
      ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
          instrumentations[key] = function (...args) {
              pauseTracking();
              const res = toRaw(this)[key].apply(this, args);
              resetTracking();
              return res;
          };
      });
      return instrumentations;
  }
  function createGetter(isReadonly = false, shallow = false) {
      return function get(target, key, receiver) {
          if (key === "__v_isReactive" /* IS_REACTIVE */) {
              return !isReadonly;
          }
          else if (key === "__v_isReadonly" /* IS_READONLY */) {
              return isReadonly;
          }
          else if (key === "__v_raw" /* RAW */ &&
              receiver ===
                  (isReadonly
                      ? shallow
                          ? shallowReadonlyMap
                          : readonlyMap
                      : shallow
                          ? shallowReactiveMap
                          : reactiveMap).get(target)) {
              return target;
          }
          const targetIsArray = isArray(target);
          if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
              return Reflect.get(arrayInstrumentations, key, receiver);
          }
          const res = Reflect.get(target, key, receiver);
          if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
              return res;
          }
          if (!isReadonly) {
              track(target, "get" /* GET */, key);
          }
          if (shallow) {
              return res;
          }
          if (isRef(res)) {
              // ref unwrapping - does not apply for Array + integer key.
              const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
              return shouldUnwrap ? res.value : res;
          }
          if (isObject(res)) {
              // Convert returned value into a proxy as well. we do the isObject check
              // here to avoid invalid value warning. Also need to lazy access readonly
              // and reactive here to avoid circular dependency.
              return isReadonly ? readonly(res) : reactive(res);
          }
          return res;
      };
  }
  const set = /*#__PURE__*/ createSetter();
  function createSetter(shallow = false) {
      return function set(target, key, value, receiver) {
          let oldValue = target[key];
          if (!shallow) {
              value = toRaw(value);
              oldValue = toRaw(oldValue);
              if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                  oldValue.value = value;
                  return true;
              }
          }
          const hadKey = isArray(target) && isIntegerKey(key)
              ? Number(key) < target.length
              : hasOwn(target, key);
          const result = Reflect.set(target, key, value, receiver);
          // don't trigger if target is something up in the prototype chain of original
          if (target === toRaw(receiver)) {
              if (!hadKey) {
                  trigger(target, "add" /* ADD */, key, value);
              }
              else if (hasChanged(value, oldValue)) {
                  trigger(target, "set" /* SET */, key, value, oldValue);
              }
          }
          return result;
      };
  }
  function deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
          trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
      }
      return result;
  }
  function has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
          track(target, "has" /* HAS */, key);
      }
      return result;
  }
  function ownKeys(target) {
      track(target, "iterate" /* ITERATE */, isArray(target) ? 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
  }
  const mutableHandlers = {
      get,
      set,
      deleteProperty,
      has,
      ownKeys
  };
  const readonlyHandlers = {
      get: readonlyGet,
      set(target, key) {
          if ((process.env.NODE_ENV !== 'production')) {
              console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
          }
          return true;
      },
      deleteProperty(target, key) {
          if ((process.env.NODE_ENV !== 'production')) {
              console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
          }
          return true;
      }
  };
  // Props handlers are special in the sense that it should not unwrap top-level
  // refs (in order to allow refs to be explicitly passed down), but should
  // retain the reactivity of the normal readonly object.
  const shallowReadonlyHandlers = /*#__PURE__*/ extend$1({}, readonlyHandlers, {
      get: shallowReadonlyGet
  });

  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
      // #1772: readonly(reactive(Map)) should return readonly + reactive version
      // of the value
      target = target["__v_raw" /* RAW */];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (key !== rawKey) {
          !isReadonly && track(rawTarget, "get" /* GET */, key);
      }
      !isReadonly && track(rawTarget, "get" /* GET */, rawKey);
      const { has } = getProto(rawTarget);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
      }
      else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
      }
      else if (target !== rawTarget) {
          // #3602 readonly(reactive(Map))
          // ensure that the nested reactive `Map` can do tracking for itself
          target.get(key);
      }
  }
  function has$1(key, isReadonly = false) {
      const target = this["__v_raw" /* RAW */];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (key !== rawKey) {
          !isReadonly && track(rawTarget, "has" /* HAS */, key);
      }
      !isReadonly && track(rawTarget, "has" /* HAS */, rawKey);
      return key === rawKey
          ? target.has(key)
          : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
      target = target["__v_raw" /* RAW */];
      !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
      return Reflect.get(target, 'size', target);
  }
  function add(value) {
      value = toRaw(value);
      const target = toRaw(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
          target.add(value);
          trigger(target, "add" /* ADD */, value, value);
      }
      return this;
  }
  function set$1(key, value) {
      value = toRaw(value);
      const target = toRaw(this);
      const { has, get } = getProto(target);
      let hadKey = has.call(target, key);
      if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          checkIdentityKeys(target, has, key);
      }
      const oldValue = get.call(target, key);
      target.set(key, value);
      if (!hadKey) {
          trigger(target, "add" /* ADD */, key, value);
      }
      else if (hasChanged(value, oldValue)) {
          trigger(target, "set" /* SET */, key, value, oldValue);
      }
      return this;
  }
  function deleteEntry(key) {
      const target = toRaw(this);
      const { has, get } = getProto(target);
      let hadKey = has.call(target, key);
      if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          checkIdentityKeys(target, has, key);
      }
      const oldValue = get ? get.call(target, key) : undefined;
      // forward the operation before queueing reactions
      const result = target.delete(key);
      if (hadKey) {
          trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
      }
      return result;
  }
  function clear() {
      const target = toRaw(this);
      const hadItems = target.size !== 0;
      const oldTarget = (process.env.NODE_ENV !== 'production')
          ? isMap(target)
              ? new Map(target)
              : new Set(target)
          : undefined;
      // forward the operation before queueing reactions
      const result = target.clear();
      if (hadItems) {
          trigger(target, "clear" /* CLEAR */, undefined, undefined, oldTarget);
      }
      return result;
  }
  function createForEach(isReadonly, isShallow) {
      return function forEach(callback, thisArg) {
          const observed = this;
          const target = observed["__v_raw" /* RAW */];
          const rawTarget = toRaw(target);
          const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
          !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
          return target.forEach((value, key) => {
              // important: make sure the callback is
              // 1. invoked with the reactive map as `this` and 3rd arg
              // 2. the value received should be a corresponding reactive/readonly.
              return callback.call(thisArg, wrap(value), wrap(key), observed);
          });
      };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
      return function (...args) {
          const target = this["__v_raw" /* RAW */];
          const rawTarget = toRaw(target);
          const targetIsMap = isMap(rawTarget);
          const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
          const isKeyOnly = method === 'keys' && targetIsMap;
          const innerIterator = target[method](...args);
          const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
          !isReadonly &&
              track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
          // return a wrapped iterator which returns observed versions of the
          // values emitted from the real iterator
          return {
              // iterator protocol
              next() {
                  const { value, done } = innerIterator.next();
                  return done
                      ? { value, done }
                      : {
                          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                          done
                      };
              },
              // iterable protocol
              [Symbol.iterator]() {
                  return this;
              }
          };
      };
  }
  function createReadonlyMethod(type) {
      return function (...args) {
          if ((process.env.NODE_ENV !== 'production')) {
              const key = args[0] ? `on key "${args[0]}" ` : ``;
              console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
          }
          return type === "delete" /* DELETE */ ? false : this;
      };
  }
  function createInstrumentations() {
      const mutableInstrumentations = {
          get(key) {
              return get$1(this, key);
          },
          get size() {
              return size(this);
          },
          has: has$1,
          add,
          set: set$1,
          delete: deleteEntry,
          clear,
          forEach: createForEach(false, false)
      };
      const shallowInstrumentations = {
          get(key) {
              return get$1(this, key, false, true);
          },
          get size() {
              return size(this);
          },
          has: has$1,
          add,
          set: set$1,
          delete: deleteEntry,
          clear,
          forEach: createForEach(false, true)
      };
      const readonlyInstrumentations = {
          get(key) {
              return get$1(this, key, true);
          },
          get size() {
              return size(this, true);
          },
          has(key) {
              return has$1.call(this, key, true);
          },
          add: createReadonlyMethod("add" /* ADD */),
          set: createReadonlyMethod("set" /* SET */),
          delete: createReadonlyMethod("delete" /* DELETE */),
          clear: createReadonlyMethod("clear" /* CLEAR */),
          forEach: createForEach(true, false)
      };
      const shallowReadonlyInstrumentations = {
          get(key) {
              return get$1(this, key, true, true);
          },
          get size() {
              return size(this, true);
          },
          has(key) {
              return has$1.call(this, key, true);
          },
          add: createReadonlyMethod("add" /* ADD */),
          set: createReadonlyMethod("set" /* SET */),
          delete: createReadonlyMethod("delete" /* DELETE */),
          clear: createReadonlyMethod("clear" /* CLEAR */),
          forEach: createForEach(true, true)
      };
      const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
      iteratorMethods.forEach(method => {
          mutableInstrumentations[method] = createIterableMethod(method, false, false);
          readonlyInstrumentations[method] = createIterableMethod(method, true, false);
          shallowInstrumentations[method] = createIterableMethod(method, false, true);
          shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
      });
      return [
          mutableInstrumentations,
          readonlyInstrumentations,
          shallowInstrumentations,
          shallowReadonlyInstrumentations
      ];
  }
  const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* #__PURE__*/ createInstrumentations();
  function createInstrumentationGetter(isReadonly, shallow) {
      const instrumentations = shallow
          ? isReadonly
              ? shallowReadonlyInstrumentations
              : shallowInstrumentations
          : isReadonly
              ? readonlyInstrumentations
              : mutableInstrumentations;
      return (target, key, receiver) => {
          if (key === "__v_isReactive" /* IS_REACTIVE */) {
              return !isReadonly;
          }
          else if (key === "__v_isReadonly" /* IS_READONLY */) {
              return isReadonly;
          }
          else if (key === "__v_raw" /* RAW */) {
              return target;
          }
          return Reflect.get(hasOwn(instrumentations, key) && key in target
              ? instrumentations
              : target, key, receiver);
      };
  }
  const mutableCollectionHandlers = {
      get: /*#__PURE__*/ createInstrumentationGetter(false, false)
  };
  const readonlyCollectionHandlers = {
      get: /*#__PURE__*/ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
      get: /*#__PURE__*/ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has, key) {
      const rawKey = toRaw(key);
      if (rawKey !== key && has.call(target, rawKey)) {
          const type = toRawType(target);
          console.warn(`Reactive ${type} contains both the raw and reactive ` +
              `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
              `which can lead to inconsistencies. ` +
              `Avoid differentiating between the raw and reactive versions ` +
              `of an object and only use the reactive version if possible.`);
      }
  }

  const reactiveMap = new WeakMap();
  const shallowReactiveMap = new WeakMap();
  const readonlyMap = new WeakMap();
  const shallowReadonlyMap = new WeakMap();
  function targetTypeMap(rawType) {
      switch (rawType) {
          case 'Object':
          case 'Array':
              return 1 /* COMMON */;
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
              return 2 /* COLLECTION */;
          default:
              return 0 /* INVALID */;
      }
  }
  function getTargetType(value) {
      return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
          ? 0 /* INVALID */
          : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
      // if trying to observe a readonly proxy, return the readonly version.
      if (target && target["__v_isReadonly" /* IS_READONLY */]) {
          return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  /**
   * Creates a readonly copy of the original object. Note the returned copy is not
   * made reactive, but `readonly` can be called on an already reactive object.
   */
  function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  /**
   * Returns a reactive-copy of the original object, where only the root level
   * properties are readonly, and does NOT unwrap refs nor recursively convert
   * returned properties.
   * This is used for creating the props proxy object for stateful components.
   */
  function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
      if (!isObject(target)) {
          if ((process.env.NODE_ENV !== 'production')) {
              console.warn(`value cannot be made reactive: ${String(target)}`);
          }
          return target;
      }
      // target is already a Proxy, return it.
      // exception: calling readonly() on a reactive object
      if (target["__v_raw" /* RAW */] &&
          !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
          return target;
      }
      // target already has corresponding Proxy
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
          return existingProxy;
      }
      // only a whitelist of value types can be observed.
      const targetType = getTargetType(target);
      if (targetType === 0 /* INVALID */) {
          return target;
      }
      const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
  }
  function isReactive(value) {
      if (isReadonly(value)) {
          return isReactive(value["__v_raw" /* RAW */]);
      }
      return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
  }
  function isReadonly(value) {
      return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
  }
  function isProxy(value) {
      return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
      const raw = observed && observed["__v_raw" /* RAW */];
      return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
      def(value, "__v_skip" /* SKIP */, true);
      return value;
  }
  const toReactive = (value) => isObject(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject(value) ? readonly(value) : value;

  function trackRefValue(ref) {
      if (isTracking()) {
          ref = toRaw(ref);
          if (!ref.dep) {
              ref.dep = createDep();
          }
          if ((process.env.NODE_ENV !== 'production')) {
              trackEffects(ref.dep, {
                  target: ref,
                  type: "get" /* GET */,
                  key: 'value'
              });
          }
          else {
              trackEffects(ref.dep);
          }
      }
  }
  function triggerRefValue(ref, newVal) {
      ref = toRaw(ref);
      if (ref.dep) {
          if ((process.env.NODE_ENV !== 'production')) {
              triggerEffects(ref.dep, {
                  target: ref,
                  type: "set" /* SET */,
                  key: 'value',
                  newValue: newVal
              });
          }
          else {
              triggerEffects(ref.dep);
          }
      }
  }
  function isRef(r) {
      return Boolean(r && r.__v_isRef === true);
  }
  function ref(value) {
      return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
          return rawValue;
      }
      return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
      constructor(value, _shallow) {
          this._shallow = _shallow;
          this.dep = undefined;
          this.__v_isRef = true;
          this._rawValue = _shallow ? value : toRaw(value);
          this._value = _shallow ? value : toReactive(value);
      }
      get value() {
          trackRefValue(this);
          return this._value;
      }
      set value(newVal) {
          newVal = this._shallow ? newVal : toRaw(newVal);
          if (hasChanged(newVal, this._rawValue)) {
              this._rawValue = newVal;
              this._value = this._shallow ? newVal : toReactive(newVal);
              triggerRefValue(this, newVal);
          }
      }
  }
  function unref(ref) {
      return isRef(ref) ? ref.value : ref;
  }
  const shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
          const oldValue = target[key];
          if (isRef(oldValue) && !isRef(value)) {
              oldValue.value = value;
              return true;
          }
          else {
              return Reflect.set(target, key, value, receiver);
          }
      }
  };
  function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs)
          ? objectWithRefs
          : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  Promise.resolve();

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
      };
      var registCxRenderer = function (params) {
          var render = null;
          if (isFunction$1(params.payload)) {
              render = params.payload;
          }
          else if (params.payload) {
              render = params.payload.render;
              params.payload.active && CxTableActiveControl.add(params.type);
          }
          render && CxTableRendererMap.set(params.type, render);
      };
      var setCxTableScopeId = function (id) {
          context.contextScopeId = id;
      };
      var setMessageInstance = function (instance) {
          context.messageInstance = instance;
      };
      var setDynamicFormSearchApi = function (moduleType, rules) {
          context.dynamicFormContext.requestApiMap[moduleType] = rules;
      };
      var setDynamicCacheContext = function (key, val) {
          context.dynamicCacheContext[key] = val;
      };
      var setDynamicRequestInstance = function (instance) {
          context.dynamicRequestInstance = instance;
      };
      var setDynamicType = function (types) {
          Object.keys(context.dynamicType).forEach(function (dynamicKey) {
              if (isObject$1(types[dynamicKey])) {
                  context.dynamicType[dynamicKey] = types[dynamicKey];
              }
          });
      };
      var setPrecision = function (precision) {
          Object.assign(context.precision, precision);
      };
      var use = function (plugin) {
          if (isFunction$1(plugin.dynamicInject)) {
              context.dynamicInject.add(plugin.dynamicInject);
          }
      };
      return {
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
  };

  var EventBus = /** @class */ (function () {
      function EventBus() {
          this.eventDep = {};
      }
      EventBus.prototype.on = function (eventName, func) {
          var _a;
          if (this.eventDep[eventName]) {
              (_a = this.eventDep[eventName]) === null || _a === void 0 ? void 0 : _a.push(func);
          }
          else {
              this.eventDep[eventName] = [func];
          }
      };
      EventBus.prototype.emit = function (eventName) {
          var _a;
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
          }
          if (this.eventDep[eventName]) {
              (_a = this.eventDep[eventName]) === null || _a === void 0 ? void 0 : _a.forEach(function (func) { return func.apply(void 0, __spreadArray([], __read(args))); });
          }
      };
      EventBus.prototype.off = function (eventName) {
          this.eventDep[eventName] = null;
      };
      EventBus.prototype.clear = function () {
          this.eventDep = {};
      };
      return EventBus;
  }());
  function EventBusCreator() {
      return new EventBus();
  }
  var eventBus = EventBusCreator();

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
              if (['search', 'select'].includes(column.slotType)) {
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
          if (['search', 'select'].includes(slotType)) {
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
      !isString$1(column.label) && cxTableWarn("invalid cxTable config => " + column.label + " label");
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
          dep.forEach(function (cb) { return isFunction$1(cb) && cb(payload); });
          // 发送全局广播
          this.entireDep.forEach(function (cb) { return isFunction$1(cb) && cb(payload); });
      };
      CxBroadcast.prototype.registEntireListener = function (cb) {
          !this.entireDep.includes(cb) && this.entireDep.push(cb);
      };
      CxBroadcast.prototype.registListener = function (key, rowData, cb) {
          var dep = this.getDep(key, rowData);
          !dep.includes(cb) && dep.push(cb);
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

  var useBus = function ($CxTable, props, emit) {
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
          cssVariable: vue.computed(function () {
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
              if (isArray$1(result)) {
                  result = { rowspan: result[0], colspan: result[1] };
              }
              if (result.rowspan === 0) {
                  rowSpanMap[rowIndex] |= exports.CX_SPAN_METHOD_TYPE.MISSING;
              }
              else if (result.rowspan > 1) {
                  rowSpanMap[rowIndex] |= exports.CX_SPAN_METHOD_TYPE.EXTEND;
              }
          });
      });
  };

  function assignStyle(current, assign, payload) {
      Object.assign(current, isFunction$1(assign) ? assign(payload) : assign);
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

  function getColumnFlag(col) {
      var _a;
      var result = 0;
      if (col.slot) {
          result |= exports.COLUMN_FLAG.SLOT_COLUMN;
      }
      else if (col.control) {
          result |= exports.COLUMN_FLAG.CONTROL_COLUMN;
      }
      else if (col.calculate) {
          result |= exports.COLUMN_FLAG.CALC_COLUMN;
      }
      else {
          result |= exports.COLUMN_FLAG.TEXT_COLUMN;
      }
      if (col.fixed) {
          result |= exports.COLUMN_FLAG.FIX_COLUMN;
      }
      if ((_a = col.children) === null || _a === void 0 ? void 0 : _a.length) {
          result |= exports.COLUMN_FLAG.ARRAY_CHILDREN;
      }
      if (col.sum === 'add') {
          result |= exports.COLUMN_FLAG.ADD_SUM_COLUMN;
      }
      else if (isFunction$1(col.sum)) {
          result |= exports.COLUMN_FLAG.CUSTOM_SUM_COLUMN;
      }
      else if (col.sum === 'text') {
          result |= exports.COLUMN_FLAG.TEXT_SUM_COLUMN;
      }
      if (col.validator || col.required) {
          result |= exports.COLUMN_FLAG.VALIDATE_COLUMN;
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
          if (!isEmpty$1(col.minWidth))
              return false;
          return isNumber(col.width) || (isString$1(col.width) && col.width.endsWith('px'));
      });
      $CxTable.columnStore.pxColumns = pxColumns;
      var percentColumns = columns.filter(function (col) {
          if (!isEmpty$1(col.minWidth))
              return false;
          return isString$1(col.width) && col.width.endsWith('%');
      });
      $CxTable.columnStore.percentColumns = percentColumns;
      var pxMinColumns = columns.filter(function (col) {
          return isNumber(col.minWidth) || (isString$1(col.minWidth) && col.minWidth.endsWith('px'));
      });
      $CxTable.columnStore.pxMinColumns = pxMinColumns;
      var percentMinColumns = columns.filter(function (col) {
          return isString$1(col.minWidth) && col.minWidth.endsWith('%');
      });
      $CxTable.columnStore.percentMinColumns = percentMinColumns;
      var noWidthColumns = columns.filter(function (col) {
          return isEmpty$1(col.width) && isEmpty$1(col.minWidth);
      });
      $CxTable.columnStore.noWidthColumns = noWidthColumns;
  }

  function useCxPagination() {
      return vue.reactive({
          currentPage: 1,
          pageCapacity: 10,
          pageSizes: [10, 20, 50],
          total: 0
      });
  }

  var useCxSort = function (props) {
      var sortProp = ref('');
      var sortStatus = ref(exports.CX_SORT_STATUS.NONE);
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

  // getDoNothingIO::void->IO<NOOP>
  var getDoNothingIO = function () { return IO.of(R__namespace.identity); };
  var functorWarn = function () {
      var msg = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          msg[_i] = arguments[_i];
      }
      console.warn.apply(console, __spreadArray(["[Functor warn]:"], __read(msg)));
  };
  R__namespace.tap(console.log);
  var withParams = function (func, params) { return function () {
      return func.apply(void 0, __spreadArray([], __read(params)));
  }; };
  var map$1 = R__namespace.curry(function (cb, f) { return f.map(cb); });
  R__namespace.curryN(2, function (arg, io) { return io.unsafePerformIO(arg); });
  var queryDom = function (selector) { return document.querySelector(selector); };
  var getMaybeValue = function (maybe) {
      return maybe.getWithDefault();
  };
  //  either :: (a -> c) -> (b -> c) -> Either a b -> c
  var either = R__namespace.curryN(3, function (f, g, e) {
      switch (e.constructor) {
          case Left:
              return f(e.__value);
          case Right:
              return g(e.__value);
      }
  });
  var unsafePush = R__namespace.curryN(2, function (item, arr) {
      arr.push.apply(arr, __spreadArray([], __read(item)));
      return arr;
  });
  var unsafeClearPush = R__namespace.curryN(2, function (items, arr) { return (arr.splice(0), arr.push.apply(arr, __spreadArray([], __read(items))), arr); });
  var unsafeClearArray = function (arr) { return (arr.splice(0), arr); };
  var unsafeSet = R__namespace.curryN(3, Reflect.set);
  var unsafeGet = R__namespace.curryN(2, Reflect.get);
  var unsafeDeleteProperty = R__namespace.curryN(2, Reflect.deleteProperty);
  var unsafeRemoveItem = R__namespace.curryN(2, function (index, arr) {
      arr.splice(index, 1);
      return arr;
  });
  var unsafeClearObj = function (target) {
      R__namespace.forEach(unsafeDeleteProperty(target), R__namespace.keys(target));
      return target;
  };
  var unsafeAssign = R__namespace.curryN(2, function (obj, target) {
      Object.assign(target, obj);
      return target;
  });
  var unsafeClearAssign = R__namespace.curryN(2, function (obj, target) {
      Object.assign(unsafeClearObj(target), obj);
      return target;
  });
  var unsafeWhenDevCall = function (func) { return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return process.env.NODE_ENV === 'development'
          ? Maybe.of(func.apply(void 0, __spreadArray([], __read(args))))
          : Maybe.none();
  }; };
  var splat = function (fun) { return function (args) { return fun.apply(void 0, __spreadArray([], __read(args))); }; };
  // truthy::any->boolean
  var truthy = function (val) { return !!val; };
  // falsy::any->boolean
  var falsy = function (val) { return !val; };
  var propCall = function (prop) {
      return R__namespace.tap(R__namespace.when(R__namespace.compose(R__namespace.is(Function), R__namespace.prop(prop)), R__namespace.compose(R__namespace.call, R__namespace.converge(R__namespace.bind, [R__namespace.prop(prop), R__namespace.identity]))));
  };
  var preventDefault = propCall('preventDefault');
  var stopPropagation = propCall('stopPropagation');
  // stateEq200::object->boolean
  var stateEq200 = R__namespace.propEq('state', 200);
  R__namespace.curryN(2, setTimeout);
  var nextTimeout = function (cb) { return function (payload) {
      return setTimeout(function () { return cb(payload); }, 0);
  }; };
  // successMessage::string->void->IMessageHandle
  // export const successMessage = (msg: string) => () => ElMessage.success(msg);
  // export const errorMessage = (msg: string) => () => ElMessage.error(msg);
  var defaultPromise = function (val) { return function () { return Promise.resolve(val); }; };
  R__namespace.curryN(2, function (text, ele) { return ((ele.innerText = text), ele); });
  R__namespace.curryN(2, function (classList, ele) {
      var _a;
      return ((_a = ele.classList).add.apply(_a, __spreadArray([], __read(classList))), ele);
  });
  // setDisplay::string->(a:HTMLElement->a:HTMLElement)
  var setDisplay = function (val) {
      return R__namespace.when(truthy, function (ele) { return (ele.style.display = val); });
  };
  setDisplay('none');
  setDisplay('block');
  R__namespace.curryN(2, function (child, parent) { return (parent.appendChild(child), parent); });
  R__namespace.curryN(3, function (eventName, listener, ele) {
      return ele.addEventListener(eventName, listener), ele;
  });
  R__namespace.curryN(3, function (eventName, listener, ele) {
      return ele.removeEventListener(eventName, listener), ele;
  });

  var Maybe = /** @class */ (function () {
      function Maybe(__value) {
          this.__value = __value;
      }
      Maybe.of = function (value) {
          return value == undefined ? Maybe.none() : new Maybe(value);
      };
      Maybe.none = function () {
          return new Maybe(null);
      };
      Maybe.run = function (gen) {
          function step(value) {
              var result = gen.next(value);
              if (result.done) {
                  return Maybe.of(result.value);
              }
              return result.value.chain(step);
          }
          return step();
      };
      Maybe.prototype.map = function (f) {
          if (this.__value == undefined) {
              return Maybe.none();
          }
          else {
              return Maybe.of(f(this.__value));
          }
      };
      Maybe.prototype.isNegative = function () {
          return this.__value == undefined;
      };
      Maybe.prototype.join = function () {
          return this.isNegative() ? Maybe.none() : this.__value;
      };
      Maybe.prototype.chain = function (f) {
          return this.map(f).join();
      };
      Maybe.prototype.getWithDefault = function (defaultValue) {
          return this.isNegative() ? defaultValue : this.__value;
      };
      Maybe.prototype.ap = function (functor) {
          return (R__namespace.is(Function, this.__value) ? functor.map(this.__value) : this);
      };
      return Maybe;
  }());
  var IO = /** @class */ (function () {
      function IO(__value) {
          this.__value = __value;
      }
      IO.of = function (value) {
          return new IO(value);
      };
      IO.prototype.map = function (f) {
          return new IO(R__namespace.compose(f, this.__value));
      };
      IO.prototype.join = function () {
          return this.unsafePerformIO();
      };
      IO.prototype.chain = function (f) {
          return this.map(f).join();
      };
      IO.prototype.unsafePerformIO = function (arg) {
          return this.__value(arg);
      };
      IO.prototype.ap = function (functor) {
          var res = this.unsafePerformIO(functor.unsafePerformIO());
          return (R__namespace.is(Function, res) ? IO.of(res) : IO.of(function () { return res; }));
      };
      return IO;
  }());
  var Left = /** @class */ (function () {
      function Left(__value) {
          this.__value = __value;
      }
      Left.of = function (value) {
          if (value == undefined) {
              functorWarn('Provided value must not be empty');
          }
          return new Left(value);
      };
      Left.prototype.map = function (f) {
          return this;
      };
      Left.prototype.ap = function (functor) {
          return this;
      };
      return Left;
  }());
  var Right = /** @class */ (function () {
      function Right(__value) {
          this.__value = __value;
      }
      Right.of = function (value) {
          if (value == undefined) {
              functorWarn('Provided Right value must not be empty');
          }
          return new Right(value);
      };
      Right.prototype.map = function (f) {
          return Right.of(f(this.__value));
      };
      Right.prototype.ap = function (functor) {
          return (R__namespace.is(Function, this.__value) ? functor.map(this.__value) : this);
      };
      return Right;
  }());

  var onInits$1 = [];
  var onOutputs$1 = [];
  var FormConfigAdaptor$1 = /** @class */ (function () {
      function FormConfigAdaptor(config) {
          this.__items = {
              label: '',
              prop: '',
              closable: true,
              register: []
          };
          var configDuplicate = onInits$1.reduce(function (res, hook) { return (R__namespace.is(Function, hook) ? hook(res) : res); }, R__namespace.clone(config));
          this.adaptor(configDuplicate);
      }
      FormConfigAdaptor.use = function (plugin) {
          // push::a->a[]->number
          var push = R__namespace.curry(function (arr, item) { return arr.push(item); });
          // updateHooks::object a=>a[]->string->object->Maybe b
          var updateHooks = function (source, key) {
              // map::Maybe->a
              var MaybeMap = map$1(R__namespace.ifElse(R__namespace.is(Function), push(source), R__namespace.identity));
              return R__namespace.compose(MaybeMap, Maybe.of, R__namespace.prop(key));
          };
          updateHooks(onInits$1, 'onInit')(plugin);
          updateHooks(onOutputs$1, 'onOutput')(plugin);
      };
      FormConfigAdaptor.prototype.getItems = function () {
          return onOutputs$1.reduce(function (res, hook) { return (R__namespace.is(Function, hook) ? hook(res) : res); }, R__namespace.clone(this.__items));
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
          var searchStates = R__namespace.prop('searchStates', config);
          // options
          Maybe.of(searchStates.dynamicSearchOptions).map(unsafeSet(searchStates, 'searchOptions'));
          var controlConfig = {};
          Reflect.set(this.__items, (_a = searchStates.searchType) !== null && _a !== void 0 ? _a : 'input', controlConfig);
          R__namespace.equals('input', searchStates.searchType) && unsafeSet(controlConfig, 'searchIcon', false);
          // options::NameWithId a=>object->a[]
          var options = R__namespace.curryN(2, R__namespace.compose(R__namespace.prepend({ name: '全部', id: -1 }), calcInnerOptions))((_b = searchStates.searchOptions) !== null && _b !== void 0 ? _b : []);
          if (Array.isArray(searchStates.searchOptions)) {
              Reflect.set(controlConfig, 'options', options(searchStates.searchOptions));
          }
          else if (isObject$1(searchStates.searchOptions)) {
              Reflect.set(controlConfig, 'options', R__namespace.compose(options, R__namespace.prop('form')));
          }
          // options依赖项发生改变时清空该列数据 TODO
          var deps = getOptionsDeps((_c = searchStates.searchOptions) !== null && _c !== void 0 ? _c : []);
          var cb = unsafeDeleteProperty(R__namespace.__, this.__items.prop);
          this.__items.register = deps.map(R__namespace.compose(unsafeSet(R__namespace.__, 'cb', cb), R__namespace.objOf('dep')));
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
  var dataInitPlugin$1 = {
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

  FormConfigAdaptor$1.use(dataInitPlugin$1);
  var FormConfigAdaptor = FormConfigAdaptor$1;

  var useCxTableCompose = function () {
      // getAllSearchableColumn::CxTableDynamicColumn a=>a[]->a[]
      var getAllSearchableColumn = R__namespace.compose(R__namespace.filter(R__namespace.compose(R__namespace.is(Object), unsafeGet(R__namespace.__, 'searchStates'))), arrFlat);
      // getSearchableFormConfig::CxTableDynamicColumn[]->CxFormItemConfig[]
      var getSearchableFormConfig = R__namespace.compose(R__namespace.map(FormConfigAdaptor.of), getAllSearchableColumn);
      // column2NameWithId::CxTableDynamicColumn[]->NameWithId[]
      var column2NameWithId = R__namespace.compose(R__namespace.zipObj(['id', 'name']), R__namespace.props(['prop', 'label']));
      // getOptionListFromColumn::CxTableDynamicColumn[]->Option[]
      var getOptionListFromColumn = R__namespace.compose(R__namespace.map(column2NameWithId), getAllSearchableColumn);
      // getCurrentFormConfig::CxTableDynamicColumn[]->string[]->CxFormItemConfig[]
      var getCurrentFormConfig = function (columns, currentItems) {
          var itemList = getSearchableFormConfig(columns);
          return R__namespace.compose(R__namespace.append({ label: '', prop: 'add', custom: { slot: 'add' } }), R__namespace.reduce(function (res, prop) {
              return R__namespace.compose(R__namespace.ifElse(R__namespace.isNil, R__namespace.always(res), R__namespace.flip(R__namespace.append)(res)), R__namespace.find(R__namespace.propEq('prop', prop)))(itemList);
          }, []))(currentItems);
      };
      // isEmptyValue::a->boolean
      var isEmptyValue = R__namespace.anyPass([
          R__namespace.isNil,
          R__namespace.equals(-1),
          R__namespace.equals(''),
          R__namespace.ifElse(R__namespace.is(Array), R__namespace.compose(R__namespace.equals(0), R__namespace.length), R__namespace.F)
      ]);
      // isRenderInTeleport::object->boolean
      var isRenderInTeleport = R__namespace.allPass([R__namespace.prop('formTeleport')]);
      // formValueFormat::a->object
      var formValueFormat = R__namespace.ifElse(Array.isArray, R__namespace.compose(R__namespace.zipObj(['val1', 'val2']), R__namespace.props(['0', '1'])), R__namespace.objOf('value'));
      // arrayIsNotEmpty::array a=>a->boolean
      var arrayIsNotEmpty = R__namespace.compose(R__namespace.gt(R__namespace.__, 0), R__namespace.length);
      // isPositive::number->boolean
      var isPositive = R__namespace.gte(R__namespace.__, 0);
      // getDynamicKeyPair::Object a=>a->{DynamicKey,any}[]
      var getDynamicKeyPair = R__namespace.compose(R__namespace.toPairs, R__namespace.omit(['config', 'api', 'requestInstance']));
      // splatEq::a->b->boolean
      var splatEq = splat(R__namespace.equals);
      // statesProp::CxDynamicItem a->Object|undefined
      var statesProp = R__namespace.prop('searchStates');
      // statesDefault::CxDynamicItem a->string|undefined
      var statesDefault = R__namespace.compose(R__namespace.prop('searchDefault'), statesProp);
      // getTargetColumnDefault::CxTableDynamicColumn a->Maybe any
      var getTargetColumnDefault = R__namespace.ifElse(R__namespace.compose(truthy, statesDefault), R__namespace.compose(Maybe.of, R__namespace.converge(formatFormDefaultValue, [
          statesDefault,
          R__namespace.compose(R__namespace.prop('searchType'), statesProp)
      ])), Maybe.none);
      // getParamsItems::Object->string[]->ParamsItem[]
      var getParamsItems = function (form, currentFormItems) {
          if (!form || !currentFormItems)
              return [];
          return currentFormItems.reduce(function (res, prop) {
              return Maybe.of(form[prop])
                  .map(R__namespace.ifElse(R__namespace.compose(R__namespace.not, isEmptyValue), R__namespace.compose(unsafePush(R__namespace.__, res), R__namespace.of, R__namespace.mergeRight(R__namespace.objOf('prop', R__namespace.replace(/Text|Name$/, 'Id', prop))), formValueFormat), R__namespace.always(res)))
                  .getWithDefault(res);
          }, []);
      };
      // innerBracket::string->string
      var innerBracket = R__namespace.compose(R__namespace.join(''), R__namespace.prepend('('), R__namespace.append(')'), R__namespace.of);
      var multiRuleWarn = R__namespace.curryN(2, unsafeWhenDevCall(function (rules, dynamic) {
          if (rules.length > 1) {
              cxTableWarn("matched " + R__namespace.length(rules) + " rule ", rules, "  by config ", changeDynamicIdToText(dynamic), "");
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
                          compareDynamicProp = R__namespace.compose(splatEq, R__namespace.adjust(0, R__namespace.prop(R__namespace.__, dynamic)));
                          fitCurrentDynamic = R__namespace.compose(R__namespace.all(compareDynamicProp), getDynamicKeyPair);
                          return [2 /*return*/, R__namespace.compose(R__namespace.head, R__namespace.tap(multiRuleWarn(R__namespace.__, dynamic)), R__namespace.filter(fitCurrentDynamic))(ruleList)];
                  }
              });
          })());
      };
      // arrNotEmpty::a[]->boolean
      var arrNotEmpty = R__namespace.compose(truthy, R__namespace.length);
      return {
          arrNotEmpty: arrNotEmpty,
          multiRuleWarn: multiRuleWarn,
          getConfigByDynamicConfig: getConfigByDynamicConfig,
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

  var t=function(t){return "function"==typeof t},e=function(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)},r=function(t){return "_"+t+"_"},n=function(e,r){return r.reduce((function(e,r){return t(r)?r(e):e}),e)},o=function(t){return e(t)||Array.isArray(t)?(Object.entries(t).forEach((function(e){var r=e[0],n=e[1];try{var i=JSON.parse(n);Reflect.set(t,r,o(i));}catch(t){}})),t):t},i=function(){function o(t){if(this.onSet=[],this.onGet=[],!["session","local"].includes(t))throw new TypeError("can't init store with type: "+t);this.instance="session"===t?sessionStorage:localStorage;}return o.prototype.set=function(t,e,o,i){void 0===o&&(o=99999999),void 0===i&&(i="global");var c=n(e,this.onSet);try{var s=this.getModule(i);return Reflect.set(s,t,{expire:1e3*o,val:c,time:Date.now()}),this.instance.setItem(r(i),JSON.stringify(s)),!0}catch(r){return console.error("failed to set storage: { key:"+t+",val:"+e+" }"),!1}},o.prototype.get=function(t,e){void 0===e&&(e="global");var r=this.getModule(e);try{var o=Reflect.get(r,t);if(!o)return;var i=o.time,c=o.expire,s=o.val;return +i+ +c<=Date.now()?void this.remove(t,e):n(s,this.onGet)}catch(e){return void console.error("failed to getItem with key : "+t)}},o.prototype.remove=function(t,e){void 0===e&&(e="global");try{var n=this.getModule(e);return Reflect.deleteProperty(n,t),this.instance.setItem(r(e),JSON.stringify(n)),!0}catch(t){return !1}},o.prototype.getModule=function(t){var e;try{return JSON.parse(null!==(e=this.instance.getItem(r(t)))&&void 0!==e?e:"{}")}catch(t){return {}}},o.prototype.use=function(r){if(e(r)){var n=r.onSet,o=r.onGet;t(n)&&this.onSet.push(n),t(o)&&this.onGet.push(o);}},o}(),c={onSet:function(t){if(e(t)){var r=(o=t,JSON.parse(JSON.stringify(o))),n=function(t){Object.entries(t).forEach((function(r){var o=r[0],i=r[1];null==i?Reflect.deleteProperty(t,o):e(i)&&n(i);}));};return n(r),r}var o;return t},onGet:o};

  var session = new i('session');
  session.use(c);
  var sessionStore = session;
  var local = new i('local');
  local.use(c);
  var localStore = local;

  var cacheMap = {};
  var resolveColumns = function (cols, props) {
      var context = useCxTable().getContext();
      return __spreadArray(__spreadArray([], __read(context.dynamicInject)), [props.dynamicInject]).reduce(function (res, inject) {
          return isFunction$1(inject) ? inject(res) : res;
      }, cols);
  };
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
  var useDynamicConfig = function (props, emit) {
      var columnProxy = vue.ref([]);
      var dynamicColumn = vue.ref([]);
      var loading = vue.ref(false);
      var forceUpdate = debounce(function (isDynamicChange) {
          if (isDynamicChange === void 0) { isDynamicChange = false; }
          if (isObject$1(props.dynamic)) {
              loading.value = true;
              var key_1 = JSON.stringify(props.dynamic);
              getCxDynamicHead(props.dynamic)
                  .then(function (_a) {
                  var data = _a.data;
                  return __awaiter(void 0, void 0, void 0, function () {
                      var duplicate_1;
                      return __generator(this, function (_b) {
                          switch (_b.label) {
                              case 0:
                                  if (Array.isArray(data)) {
                                      duplicate_1 = R__namespace.clone(data);
                                      dynamicColumn.value = duplicate_1;
                                      sessionStore.set(key_1, data, CX_TABLE_THROTTLE_DURATION, CX_TABLE_DYNAMIC_CACHE);
                                      data = data.map(CxConfigAdaptor.of);
                                      data = resolveColumns(data, props);
                                      columnProxy.value = data;
                                      if (Array.isArray(cacheMap[key_1])) {
                                          cacheMap[key_1].forEach(function (resolve) {
                                              resolve({ data: duplicate_1, state: 200, message: '' });
                                          });
                                          Reflect.deleteProperty(cacheMap, key_1);
                                      }
                                  }
                                  return [4 /*yield*/, vue.nextTick()];
                              case 1:
                                  _b.sent();
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
                          resolve({ data: R__namespace.clone(data), state: 200, message: '' });
                      });
                  }
                  Reflect.deleteProperty(cacheMap, key_1);
              });
          }
          else {
              columnProxy.value = resolveColumns(R__namespace.clone(props.tableConfig.items), props);
          }
      }, 300);
      if (isObject$1(props.dynamic)) {
          vue.watch(function () { return props.dynamic; }, R__namespace.converge(forceUpdate, [R__namespace.T]), { deep: true, immediate: true });
      }
      else {
          vue.watch(function () { return props.tableConfig.items; }, R__namespace.converge(forceUpdate, [R__namespace.F]), {
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
                      return [4 /*yield*/, vue.nextTick()];
                  case 1:
                      _b.sent();
                      tableVisible.value = Reflect.get((_a = entries === null || entries === void 0 ? void 0 : entries[0]) !== null && _a !== void 0 ? _a : { isIntersecting: true }, 'isIntersecting');
                      return [2 /*return*/];
              }
          });
      }); });
      observer.observe(ele);
  };

  var usePriorityConfig = function (_a) {
      var priorityColumnMap = _a.priorityColumnMap;
      var onSetConfig = [];
      var setConfig = function (prop, config) {
          var _a;
          if (!config || !isObject$1(config))
              throw new TypeError('config must be a object');
          var old = (_a = priorityColumnMap.get(prop)) !== null && _a !== void 0 ? _a : {};
          deepMerge(old, config);
          priorityColumnMap.set(prop, old);
          onSetConfig.forEach(function (cb) { return cb(); });
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
      var radioValue = vue.ref(-1);
      vue.watch(function () { return radioValue.value; }, function (val) {
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

  const hmrDirtyComponents = new Set();
  // Expose the HMR runtime on the global object
  // This makes it entirely tree-shakable without polluting the exports and makes
  // it easier to be used in toolings like vue-loader
  // Note: for a component to be eligible for HMR it also needs the __hmrId option
  // to be set so that its instances can be registered / removed.
  if ((process.env.NODE_ENV !== 'production')) {
      getGlobalThis().__VUE_HMR_RUNTIME__ = {
          createRecord: tryWrap(createRecord),
          rerender: tryWrap(rerender),
          reload: tryWrap(reload)
      };
  }
  const map = new Map();
  function createRecord(id, initialDef) {
      if (map.has(id)) {
          return false;
      }
      map.set(id, {
          initialDef: normalizeClassComponent(initialDef),
          instances: new Set()
      });
      return true;
  }
  function normalizeClassComponent(component) {
      return isClassComponent(component) ? component.__vccOpts : component;
  }
  function rerender(id, newRender) {
      const record = map.get(id);
      if (!record) {
          return;
      }
      // update initial record (for not-yet-rendered component)
      record.initialDef.render = newRender;
      [...record.instances].forEach(instance => {
          if (newRender) {
              instance.render = newRender;
              normalizeClassComponent(instance.type).render = newRender;
          }
          instance.renderCache = [];
          instance.update();
      });
  }
  function reload(id, newComp) {
      const record = map.get(id);
      if (!record)
          return;
      newComp = normalizeClassComponent(newComp);
      // update initial def (for not-yet-rendered components)
      updateComponentDef(record.initialDef, newComp);
      // create a snapshot which avoids the set being mutated during updates
      const instances = [...record.instances];
      for (const instance of instances) {
          const oldComp = normalizeClassComponent(instance.type);
          if (!hmrDirtyComponents.has(oldComp)) {
              // 1. Update existing comp definition to match new one
              if (oldComp !== record.initialDef) {
                  updateComponentDef(oldComp, newComp);
              }
              // 2. mark definition dirty. This forces the renderer to replace the
              // component on patch.
              hmrDirtyComponents.add(oldComp);
          }
          // 3. invalidate options resolution cache
          instance.appContext.optionsCache.delete(instance.type);
          // 4. actually update
          if (instance.ceReload) {
              // custom element
              hmrDirtyComponents.add(oldComp);
              instance.ceReload(newComp.styles);
              hmrDirtyComponents.delete(oldComp);
          }
          else if (instance.parent) {
              // 4. Force the parent instance to re-render. This will cause all updated
              // components to be unmounted and re-mounted. Queue the update so that we
              // don't end up forcing the same parent to re-render multiple times.
              queueJob(instance.parent.update);
              // instance is the inner component of an async custom element
              // invoke to reset styles
              if (instance.parent.type.__asyncLoader &&
                  instance.parent.ceReload) {
                  instance.parent.ceReload(newComp.styles);
              }
          }
          else if (instance.appContext.reload) {
              // root instance mounted via createApp() has a reload method
              instance.appContext.reload();
          }
          else if (typeof window !== 'undefined') {
              // root instance inside tree created via raw render(). Force reload.
              window.location.reload();
          }
          else {
              console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
          }
      }
      // 5. make sure to cleanup dirty hmr components after update
      queuePostFlushCb(() => {
          for (const instance of instances) {
              hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
          }
      });
  }
  function updateComponentDef(oldComp, newComp) {
      extend$1(oldComp, newComp);
      for (const key in oldComp) {
          if (key !== '__file' && !(key in newComp)) {
              delete oldComp[key];
          }
      }
  }
  function tryWrap(fn) {
      return (id, arg) => {
          try {
              return fn(id, arg);
          }
          catch (e) {
              console.error(e);
              console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` +
                  `Full reload required.`);
          }
      };
  }

  /**
   * mark the current rendering instance for asset resolution (e.g.
   * resolveComponent, resolveDirective) during render
   */
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function markAttrsAccessed() {
  }

  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
      if (suspense && suspense.pendingBranch) {
          if (isArray(fn)) {
              suspense.effects.push(...fn);
          }
          else {
              suspense.effects.push(fn);
          }
      }
      else {
          queuePostFlushCb(fn);
      }
  }

  function injectHook(type, hook, target = currentInstance, prepend = false) {
      if (target) {
          const hooks = target[type] || (target[type] = []);
          // cache the error handling wrapper for injected hooks so the same hook
          // can be properly deduped by the scheduler. "__weh" stands for "with error
          // handling".
          const wrappedHook = hook.__weh ||
              (hook.__weh = (...args) => {
                  if (target.isUnmounted) {
                      return;
                  }
                  // disable tracking inside all lifecycle hooks
                  // since they can potentially be called inside effects.
                  pauseTracking();
                  // Set currentInstance during hook invocation.
                  // This assumes the hook does not synchronously trigger other hooks, which
                  // can only be false when the user does something really funky.
                  setCurrentInstance(target);
                  const res = callWithAsyncErrorHandling(hook, target, type, args);
                  unsetCurrentInstance();
                  resetTracking();
                  return res;
              });
          if (prepend) {
              hooks.unshift(wrappedHook);
          }
          else {
              hooks.push(wrappedHook);
          }
          return wrappedHook;
      }
      else if ((process.env.NODE_ENV !== 'production')) {
          const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''));
          warn(`${apiName} is called when there is no active component instance to be ` +
              `associated with. ` +
              `Lifecycle injection APIs can only be used during execution of setup().` +
              (` If you are using async setup(), make sure to register lifecycle ` +
                      `hooks before the first await statement.`
                  ));
      }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => 
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  injectHook(lifecycle, hook, target);
  const onMounted = createHook("m" /* MOUNTED */);
  const onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
  const onUnmounted = createHook("um" /* UNMOUNTED */);
  let shouldCacheAccess = true;
  /**
   * Resolve merged options and cache it on the component.
   * This is done only once per-component since the merging does not involve
   * instances.
   */
  function resolveMergedOptions(instance) {
      const base = instance.type;
      const { mixins, extends: extendsOptions } = base;
      const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
      const cached = cache.get(base);
      let resolved;
      if (cached) {
          resolved = cached;
      }
      else if (!globalMixins.length && !mixins && !extendsOptions) {
          {
              resolved = base;
          }
      }
      else {
          resolved = {};
          if (globalMixins.length) {
              globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
          }
          mergeOptions(resolved, base, optionMergeStrategies);
      }
      cache.set(base, resolved);
      return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
      const { mixins, extends: extendsOptions } = from;
      if (extendsOptions) {
          mergeOptions(to, extendsOptions, strats, true);
      }
      if (mixins) {
          mixins.forEach((m) => mergeOptions(to, m, strats, true));
      }
      for (const key in from) {
          if (asMixin && key === 'expose') {
              (process.env.NODE_ENV !== 'production') &&
                  warn(`"expose" option is ignored when declared in mixins or extends. ` +
                      `It should only be declared in the base component itself.`);
          }
          else {
              const strat = internalOptionMergeStrats[key] || (strats && strats[key]);
              to[key] = strat ? strat(to[key], from[key]) : from[key];
          }
      }
      return to;
  }
  const internalOptionMergeStrats = {
      data: mergeDataFn,
      props: mergeObjectOptions,
      emits: mergeObjectOptions,
      // objects
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      // lifecycle
      beforeCreate: mergeAsArray,
      created: mergeAsArray,
      beforeMount: mergeAsArray,
      mounted: mergeAsArray,
      beforeUpdate: mergeAsArray,
      updated: mergeAsArray,
      beforeDestroy: mergeAsArray,
      beforeUnmount: mergeAsArray,
      destroyed: mergeAsArray,
      unmounted: mergeAsArray,
      activated: mergeAsArray,
      deactivated: mergeAsArray,
      errorCaptured: mergeAsArray,
      serverPrefetch: mergeAsArray,
      // assets
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      // watch
      watch: mergeWatchOptions,
      // provide / inject
      provide: mergeDataFn,
      inject: mergeInject
  };
  function mergeDataFn(to, from) {
      if (!from) {
          return to;
      }
      if (!to) {
          return from;
      }
      return function mergedDataFn() {
          return (extend$1)(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
      };
  }
  function mergeInject(to, from) {
      return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
      if (isArray(raw)) {
          const res = {};
          for (let i = 0; i < raw.length; i++) {
              res[raw[i]] = raw[i];
          }
          return res;
      }
      return raw;
  }
  function mergeAsArray(to, from) {
      return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
      return to ? extend$1(extend$1(Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
      if (!to)
          return from;
      if (!from)
          return to;
      const merged = extend$1(Object.create(null), to);
      for (const key in from) {
          merged[key] = mergeAsArray(to[key], from[key]);
      }
      return merged;
  }

  const queuePostRenderEffect = queueEffectWithSuspense
      ;

  const isTeleport = (type) => type.__isTeleport;
  const NULL_DYNAMIC_COMPONENT = Symbol();

  const Fragment = Symbol((process.env.NODE_ENV !== 'production') ? 'Fragment' : undefined);
  const Text = Symbol((process.env.NODE_ENV !== 'production') ? 'Text' : undefined);
  const Comment = Symbol((process.env.NODE_ENV !== 'production') ? 'Comment' : undefined);
  Symbol((process.env.NODE_ENV !== 'production') ? 'Static' : undefined);
  let currentBlock = null;
  function isVNode(value) {
      return value ? value.__v_isVNode === true : false;
  }
  const createVNodeWithArgsTransform = (...args) => {
      return _createVNode(...(args));
  };
  const InternalObjectKey = `__vInternal`;
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({ ref }) => {
      return (ref != null
          ? isString(ref) || isRef(ref) || isFunction(ref)
              ? { i: currentRenderingInstance, r: ref }
              : ref
          : null);
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1 /* ELEMENT */, isBlockNode = false, needFullChildrenNormalization = false) {
      const vnode = {
          __v_isVNode: true,
          __v_skip: true,
          type,
          props,
          key: props && normalizeKey(props),
          ref: props && normalizeRef(props),
          scopeId: currentScopeId,
          slotScopeIds: null,
          children,
          component: null,
          suspense: null,
          ssContent: null,
          ssFallback: null,
          dirs: null,
          transition: null,
          el: null,
          anchor: null,
          target: null,
          targetAnchor: null,
          staticCount: 0,
          shapeFlag,
          patchFlag,
          dynamicProps,
          dynamicChildren: null,
          appContext: null
      };
      if (needFullChildrenNormalization) {
          normalizeChildren(vnode, children);
          // normalize suspense children
          if (shapeFlag & 128 /* SUSPENSE */) {
              type.normalize(vnode);
          }
      }
      else if (children) {
          // compiled element vnode - if children is passed, only possible types are
          // string or Array.
          vnode.shapeFlag |= isString(children)
              ? 8 /* TEXT_CHILDREN */
              : 16 /* ARRAY_CHILDREN */;
      }
      // validate key
      if ((process.env.NODE_ENV !== 'production') && vnode.key !== vnode.key) {
          warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
      }
      // track vnode for block tree
      if (// avoid a block node from tracking itself
          !isBlockNode &&
          // has current parent block
          currentBlock &&
          // presence of a patch flag indicates this node needs patching on updates.
          // component nodes also should always be patched, because even if the
          // component doesn't need to update, it needs to persist the instance on to
          // the next vnode so that it can be properly unmounted later.
          (vnode.patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
          // the EVENTS flag is only for hydration and if it is the only flag, the
          // vnode should not be considered dynamic due to handler caching.
          vnode.patchFlag !== 32 /* HYDRATE_EVENTS */) {
          currentBlock.push(vnode);
      }
      return vnode;
  }
  const createVNode = ((process.env.NODE_ENV !== 'production') ? createVNodeWithArgsTransform : _createVNode);
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
      if (!type || type === NULL_DYNAMIC_COMPONENT) {
          if ((process.env.NODE_ENV !== 'production') && !type) {
              warn(`Invalid vnode type when creating vnode: ${type}.`);
          }
          type = Comment;
      }
      if (isVNode(type)) {
          // createVNode receiving an existing vnode. This happens in cases like
          // <component :is="vnode"/>
          // #2078 make sure to merge refs during the clone instead of overwriting it
          const cloned = cloneVNode(type, props, true /* mergeRef: true */);
          if (children) {
              normalizeChildren(cloned, children);
          }
          return cloned;
      }
      // class component normalization.
      if (isClassComponent(type)) {
          type = type.__vccOpts;
      }
      // class & style normalization.
      if (props) {
          // for reactive or proxy objects, we need to clone it to enable mutation.
          props = guardReactiveProps(props);
          let { class: klass, style } = props;
          if (klass && !isString(klass)) {
              props.class = normalizeClass(klass);
          }
          if (isObject(style)) {
              // reactive state objects need to be cloned since they are likely to be
              // mutated
              if (isProxy(style) && !isArray(style)) {
                  style = extend$1({}, style);
              }
              props.style = normalizeStyle(style);
          }
      }
      // encode the vnode type information into a bitmap
      const shapeFlag = isString(type)
          ? 1 /* ELEMENT */
          : isSuspense(type)
              ? 128 /* SUSPENSE */
              : isTeleport(type)
                  ? 64 /* TELEPORT */
                  : isObject(type)
                      ? 4 /* STATEFUL_COMPONENT */
                      : isFunction(type)
                          ? 2 /* FUNCTIONAL_COMPONENT */
                          : 0;
      if ((process.env.NODE_ENV !== 'production') && shapeFlag & 4 /* STATEFUL_COMPONENT */ && isProxy(type)) {
          type = toRaw(type);
          warn(`Vue received a Component which was made a reactive object. This can ` +
              `lead to unnecessary performance overhead, and should be avoided by ` +
              `marking the component with \`markRaw\` or using \`shallowRef\` ` +
              `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
      }
      return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
      if (!props)
          return null;
      return isProxy(props) || InternalObjectKey in props
          ? extend$1({}, props)
          : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
      // This is intentionally NOT using spread or extend to avoid the runtime
      // key enumeration cost.
      const { props, ref, patchFlag, children } = vnode;
      const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
      const cloned = {
          __v_isVNode: true,
          __v_skip: true,
          type: vnode.type,
          props: mergedProps,
          key: mergedProps && normalizeKey(mergedProps),
          ref: extraProps && extraProps.ref
              ? // #2078 in the case of <component :is="vnode" ref="extra"/>
                  // if the vnode itself already has a ref, cloneVNode will need to merge
                  // the refs so the single vnode can be set on multiple refs
                  mergeRef && ref
                      ? isArray(ref)
                          ? ref.concat(normalizeRef(extraProps))
                          : [ref, normalizeRef(extraProps)]
                      : normalizeRef(extraProps)
              : ref,
          scopeId: vnode.scopeId,
          slotScopeIds: vnode.slotScopeIds,
          children: (process.env.NODE_ENV !== 'production') && patchFlag === -1 /* HOISTED */ && isArray(children)
              ? children.map(deepCloneVNode)
              : children,
          target: vnode.target,
          targetAnchor: vnode.targetAnchor,
          staticCount: vnode.staticCount,
          shapeFlag: vnode.shapeFlag,
          // if the vnode is cloned with extra props, we can no longer assume its
          // existing patch flag to be reliable and need to add the FULL_PROPS flag.
          // note: perserve flag for fragments since they use the flag for children
          // fast paths only.
          patchFlag: extraProps && vnode.type !== Fragment
              ? patchFlag === -1 // hoisted node
                  ? 16 /* FULL_PROPS */
                  : patchFlag | 16 /* FULL_PROPS */
              : patchFlag,
          dynamicProps: vnode.dynamicProps,
          dynamicChildren: vnode.dynamicChildren,
          appContext: vnode.appContext,
          dirs: vnode.dirs,
          transition: vnode.transition,
          // These should technically only be non-null on mounted VNodes. However,
          // they *should* be copied for kept-alive vnodes. So we just always copy
          // them since them being non-null during a mount doesn't affect the logic as
          // they will simply be overwritten.
          component: vnode.component,
          suspense: vnode.suspense,
          ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
          ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
          el: vnode.el,
          anchor: vnode.anchor
      };
      return cloned;
  }
  /**
   * Dev only, for HMR of hoisted vnodes reused in v-for
   * https://github.com/vitejs/vite/issues/2022
   */
  function deepCloneVNode(vnode) {
      const cloned = cloneVNode(vnode);
      if (isArray(vnode.children)) {
          cloned.children = vnode.children.map(deepCloneVNode);
      }
      return cloned;
  }
  /**
   * @private
   */
  function createTextVNode(text = ' ', flag = 0) {
      return createVNode(Text, null, text, flag);
  }
  function normalizeChildren(vnode, children) {
      let type = 0;
      const { shapeFlag } = vnode;
      if (children == null) {
          children = null;
      }
      else if (isArray(children)) {
          type = 16 /* ARRAY_CHILDREN */;
      }
      else if (typeof children === 'object') {
          if (shapeFlag & (1 /* ELEMENT */ | 64 /* TELEPORT */)) {
              // Normalize slot to plain children for plain element and Teleport
              const slot = children.default;
              if (slot) {
                  // _c marker is added by withCtx() indicating this is a compiled slot
                  slot._c && (slot._d = false);
                  normalizeChildren(vnode, slot());
                  slot._c && (slot._d = true);
              }
              return;
          }
          else {
              type = 32 /* SLOTS_CHILDREN */;
              const slotFlag = children._;
              if (!slotFlag && !(InternalObjectKey in children)) {
                  children._ctx = currentRenderingInstance;
              }
              else if (slotFlag === 3 /* FORWARDED */ && currentRenderingInstance) {
                  // a child component receives forwarded slots from the parent.
                  // its slot type is determined by its parent's slot type.
                  if (currentRenderingInstance.slots._ === 1 /* STABLE */) {
                      children._ = 1 /* STABLE */;
                  }
                  else {
                      children._ = 2 /* DYNAMIC */;
                      vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
                  }
              }
          }
      }
      else if (isFunction(children)) {
          children = { default: children, _ctx: currentRenderingInstance };
          type = 32 /* SLOTS_CHILDREN */;
      }
      else {
          children = String(children);
          // force teleport children to array so it can be moved around
          if (shapeFlag & 64 /* TELEPORT */) {
              type = 16 /* ARRAY_CHILDREN */;
              children = [createTextVNode(children)];
          }
          else {
              type = 8 /* TEXT_CHILDREN */;
          }
      }
      vnode.children = children;
      vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
      const ret = {};
      for (let i = 0; i < args.length; i++) {
          const toMerge = args[i];
          for (const key in toMerge) {
              if (key === 'class') {
                  if (ret.class !== toMerge.class) {
                      ret.class = normalizeClass([ret.class, toMerge.class]);
                  }
              }
              else if (key === 'style') {
                  ret.style = normalizeStyle([ret.style, toMerge.style]);
              }
              else if (isOn(key)) {
                  const existing = ret[key];
                  const incoming = toMerge[key];
                  if (existing !== incoming) {
                      ret[key] = existing
                          ? [].concat(existing, incoming)
                          : incoming;
                  }
              }
              else if (key !== '') {
                  ret[key] = toMerge[key];
              }
          }
      }
      return ret;
  }

  /**
   * #2437 In Vue 3, functional components do not have a public instance proxy but
   * they exist in the internal parent chain. For code that relies on traversing
   * public $parent chains, skip functional ones and go to the parent instead.
   */
  const getPublicInstance = (i) => {
      if (!i)
          return null;
      if (isStatefulComponent(i))
          return getExposeProxy(i) || i.proxy;
      return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = extend$1(Object.create(null), {
      $: i => i,
      $el: i => i.vnode.el,
      $data: i => i.data,
      $props: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.props) : i.props),
      $attrs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.attrs) : i.attrs),
      $slots: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.slots) : i.slots),
      $refs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.refs) : i.refs),
      $parent: i => getPublicInstance(i.parent),
      $root: i => getPublicInstance(i.root),
      $emit: i => i.emit,
      $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
      $forceUpdate: i => () => queueJob(i.update),
      $nextTick: i => nextTick.bind(i.proxy),
      $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP)
  });
  const PublicInstanceProxyHandlers = {
      get({ _: instance }, key) {
          const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
          // for internal formatters to know that this is a Vue instance
          if ((process.env.NODE_ENV !== 'production') && key === '__isVue') {
              return true;
          }
          // prioritize <script setup> bindings during dev.
          // this allows even properties that start with _ or $ to be used - so that
          // it aligns with the production behavior where the render fn is inlined and
          // indeed has access to all declared variables.
          if ((process.env.NODE_ENV !== 'production') &&
              setupState !== EMPTY_OBJ &&
              setupState.__isScriptSetup &&
              hasOwn(setupState, key)) {
              return setupState[key];
          }
          // data / props / ctx
          // This getter gets called for every property access on the render context
          // during render and is a major hotspot. The most expensive part of this
          // is the multiple hasOwn() calls. It's much faster to do a simple property
          // access on a plain object, so we use an accessCache object (with null
          // prototype) to memoize what access type a key corresponds to.
          let normalizedProps;
          if (key[0] !== '$') {
              const n = accessCache[key];
              if (n !== undefined) {
                  switch (n) {
                      case 0 /* SETUP */:
                          return setupState[key];
                      case 1 /* DATA */:
                          return data[key];
                      case 3 /* CONTEXT */:
                          return ctx[key];
                      case 2 /* PROPS */:
                          return props[key];
                      // default: just fallthrough
                  }
              }
              else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
                  accessCache[key] = 0 /* SETUP */;
                  return setupState[key];
              }
              else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                  accessCache[key] = 1 /* DATA */;
                  return data[key];
              }
              else if (
              // only cache other properties when instance has declared (thus stable)
              // props
              (normalizedProps = instance.propsOptions[0]) &&
                  hasOwn(normalizedProps, key)) {
                  accessCache[key] = 2 /* PROPS */;
                  return props[key];
              }
              else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                  accessCache[key] = 3 /* CONTEXT */;
                  return ctx[key];
              }
              else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
                  accessCache[key] = 4 /* OTHER */;
              }
          }
          const publicGetter = publicPropertiesMap[key];
          let cssModule, globalProperties;
          // public $xxx properties
          if (publicGetter) {
              if (key === '$attrs') {
                  track(instance, "get" /* GET */, key);
                  (process.env.NODE_ENV !== 'production') && markAttrsAccessed();
              }
              return publicGetter(instance);
          }
          else if (
          // css module (injected by vue-loader)
          (cssModule = type.__cssModules) &&
              (cssModule = cssModule[key])) {
              return cssModule;
          }
          else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
              // user may set custom properties to `this` that start with `$`
              accessCache[key] = 3 /* CONTEXT */;
              return ctx[key];
          }
          else if (
          // global properties
          ((globalProperties = appContext.config.globalProperties),
              hasOwn(globalProperties, key))) {
              {
                  return globalProperties[key];
              }
          }
          else if ((process.env.NODE_ENV !== 'production') &&
              currentRenderingInstance &&
              (!isString(key) ||
                  // #1091 avoid internal isRef/isVNode checks on component instance leading
                  // to infinite warning loop
                  key.indexOf('__v') !== 0)) {
              if (data !== EMPTY_OBJ &&
                  (key[0] === '$' || key[0] === '_') &&
                  hasOwn(data, key)) {
                  warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` +
                      `character ("$" or "_") and is not proxied on the render context.`);
              }
              else if (instance === currentRenderingInstance) {
                  warn(`Property ${JSON.stringify(key)} was accessed during render ` +
                      `but is not defined on instance.`);
              }
          }
      },
      set({ _: instance }, key, value) {
          const { data, setupState, ctx } = instance;
          if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
              setupState[key] = value;
          }
          else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
              data[key] = value;
          }
          else if (hasOwn(instance.props, key)) {
              (process.env.NODE_ENV !== 'production') &&
                  warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
              return false;
          }
          if (key[0] === '$' && key.slice(1) in instance) {
              (process.env.NODE_ENV !== 'production') &&
                  warn(`Attempting to mutate public property "${key}". ` +
                      `Properties starting with $ are reserved and readonly.`, instance);
              return false;
          }
          else {
              if ((process.env.NODE_ENV !== 'production') && key in instance.appContext.config.globalProperties) {
                  Object.defineProperty(ctx, key, {
                      enumerable: true,
                      configurable: true,
                      value
                  });
              }
              else {
                  ctx[key] = value;
              }
          }
          return true;
      },
      has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
          let normalizedProps;
          return (accessCache[key] !== undefined ||
              (data !== EMPTY_OBJ && hasOwn(data, key)) ||
              (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) ||
              ((normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key)) ||
              hasOwn(ctx, key) ||
              hasOwn(publicPropertiesMap, key) ||
              hasOwn(appContext.config.globalProperties, key));
      }
  };
  if ((process.env.NODE_ENV !== 'production') && !false) {
      PublicInstanceProxyHandlers.ownKeys = (target) => {
          warn(`Avoid app logic that relies on enumerating keys on a component instance. ` +
              `The keys will be empty in production mode to avoid performance overhead.`);
          return Reflect.ownKeys(target);
      };
  }
  let currentInstance = null;
  const setCurrentInstance = (instance) => {
      currentInstance = instance;
      instance.scope.on();
  };
  const unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off();
      currentInstance = null;
  };
  function isStatefulComponent(instance) {
      return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
  }
  function getExposeProxy(instance) {
      if (instance.exposed) {
          return (instance.exposeProxy ||
              (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
                  get(target, key) {
                      if (key in target) {
                          return target[key];
                      }
                      else if (key in publicPropertiesMap) {
                          return publicPropertiesMap[key](instance);
                      }
                  }
              })));
      }
  }
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
  function getComponentName(Component) {
      return isFunction(Component)
          ? Component.displayName || Component.name
          : Component.name;
  }
  /* istanbul ignore next */
  function formatComponentName(instance, Component, isRoot = false) {
      let name = getComponentName(Component);
      if (!name && Component.__file) {
          const match = Component.__file.match(/([^/\\]+)\.\w+$/);
          if (match) {
              name = match[1];
          }
      }
      if (!name && instance && instance.parent) {
          // try to infer the name based on reverse resolution
          const inferFromRegistry = (registry) => {
              for (const key in registry) {
                  if (registry[key] === Component) {
                      return key;
                  }
              }
          };
          name =
              inferFromRegistry(instance.components ||
                  instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
      }
      return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
      return isFunction(value) && '__vccOpts' in value;
  }

  const stack = [];
  function pushWarningContext(vnode) {
      stack.push(vnode);
  }
  function popWarningContext() {
      stack.pop();
  }
  function warn(msg, ...args) {
      // avoid props formatting or warn handler tracking deps that might be mutated
      // during patch, leading to infinite recursion.
      pauseTracking();
      const instance = stack.length ? stack[stack.length - 1].component : null;
      const appWarnHandler = instance && instance.appContext.config.warnHandler;
      const trace = getComponentTrace();
      if (appWarnHandler) {
          callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
              msg + args.join(''),
              instance && instance.proxy,
              trace
                  .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
                  .join('\n'),
              trace
          ]);
      }
      else {
          const warnArgs = [`[Vue warn]: ${msg}`, ...args];
          /* istanbul ignore if */
          if (trace.length &&
              // avoid spamming console during tests
              !false) {
              warnArgs.push(`\n`, ...formatTrace(trace));
          }
          console.warn(...warnArgs);
      }
      resetTracking();
  }
  function getComponentTrace() {
      let currentVNode = stack[stack.length - 1];
      if (!currentVNode) {
          return [];
      }
      // we can't just use the stack because it will be incomplete during updates
      // that did not start from the root. Re-construct the parent chain using
      // instance parent pointers.
      const normalizedStack = [];
      while (currentVNode) {
          const last = normalizedStack[0];
          if (last && last.vnode === currentVNode) {
              last.recurseCount++;
          }
          else {
              normalizedStack.push({
                  vnode: currentVNode,
                  recurseCount: 0
              });
          }
          const parentInstance = currentVNode.component && currentVNode.component.parent;
          currentVNode = parentInstance && parentInstance.vnode;
      }
      return normalizedStack;
  }
  /* istanbul ignore next */
  function formatTrace(trace) {
      const logs = [];
      trace.forEach((entry, i) => {
          logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
      });
      return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
      const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
      const isRoot = vnode.component ? vnode.component.parent == null : false;
      const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
      const close = `>` + postfix;
      return vnode.props
          ? [open, ...formatProps(vnode.props), close]
          : [open + close];
  }
  /* istanbul ignore next */
  function formatProps(props) {
      const res = [];
      const keys = Object.keys(props);
      keys.slice(0, 3).forEach(key => {
          res.push(...formatProp(key, props[key]));
      });
      if (keys.length > 3) {
          res.push(` ...`);
      }
      return res;
  }
  /* istanbul ignore next */
  function formatProp(key, value, raw) {
      if (isString(value)) {
          value = JSON.stringify(value);
          return raw ? value : [`${key}=${value}`];
      }
      else if (typeof value === 'number' ||
          typeof value === 'boolean' ||
          value == null) {
          return raw ? value : [`${key}=${value}`];
      }
      else if (isRef(value)) {
          value = formatProp(key, toRaw(value.value), true);
          return raw ? value : [`${key}=Ref<`, value, `>`];
      }
      else if (isFunction(value)) {
          return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
      }
      else {
          value = toRaw(value);
          return raw ? value : [`${key}=`, value];
      }
  }

  const ErrorTypeStrings = {
      ["sp" /* SERVER_PREFETCH */]: 'serverPrefetch hook',
      ["bc" /* BEFORE_CREATE */]: 'beforeCreate hook',
      ["c" /* CREATED */]: 'created hook',
      ["bm" /* BEFORE_MOUNT */]: 'beforeMount hook',
      ["m" /* MOUNTED */]: 'mounted hook',
      ["bu" /* BEFORE_UPDATE */]: 'beforeUpdate hook',
      ["u" /* UPDATED */]: 'updated',
      ["bum" /* BEFORE_UNMOUNT */]: 'beforeUnmount hook',
      ["um" /* UNMOUNTED */]: 'unmounted hook',
      ["a" /* ACTIVATED */]: 'activated hook',
      ["da" /* DEACTIVATED */]: 'deactivated hook',
      ["ec" /* ERROR_CAPTURED */]: 'errorCaptured hook',
      ["rtc" /* RENDER_TRACKED */]: 'renderTracked hook',
      ["rtg" /* RENDER_TRIGGERED */]: 'renderTriggered hook',
      [0 /* SETUP_FUNCTION */]: 'setup function',
      [1 /* RENDER_FUNCTION */]: 'render function',
      [2 /* WATCH_GETTER */]: 'watcher getter',
      [3 /* WATCH_CALLBACK */]: 'watcher callback',
      [4 /* WATCH_CLEANUP */]: 'watcher cleanup function',
      [5 /* NATIVE_EVENT_HANDLER */]: 'native event handler',
      [6 /* COMPONENT_EVENT_HANDLER */]: 'component event handler',
      [7 /* VNODE_HOOK */]: 'vnode hook',
      [8 /* DIRECTIVE_HOOK */]: 'directive hook',
      [9 /* TRANSITION_HOOK */]: 'transition hook',
      [10 /* APP_ERROR_HANDLER */]: 'app errorHandler',
      [11 /* APP_WARN_HANDLER */]: 'app warnHandler',
      [12 /* FUNCTION_REF */]: 'ref function',
      [13 /* ASYNC_COMPONENT_LOADER */]: 'async component loader',
      [14 /* SCHEDULER */]: 'scheduler flush. This is likely a Vue internals bug. ' +
          'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'
  };
  function callWithErrorHandling(fn, instance, type, args) {
      let res;
      try {
          res = args ? fn(...args) : fn();
      }
      catch (err) {
          handleError(err, instance, type);
      }
      return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
      if (isFunction(fn)) {
          const res = callWithErrorHandling(fn, instance, type, args);
          if (res && isPromise(res)) {
              res.catch(err => {
                  handleError(err, instance, type);
              });
          }
          return res;
      }
      const values = [];
      for (let i = 0; i < fn.length; i++) {
          values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
      const contextVNode = instance ? instance.vnode : null;
      if (instance) {
          let cur = instance.parent;
          // the exposed instance is the render proxy to keep it consistent with 2.x
          const exposedInstance = instance.proxy;
          // in production the hook receives only the error code
          const errorInfo = (process.env.NODE_ENV !== 'production') ? ErrorTypeStrings[type] : type;
          while (cur) {
              const errorCapturedHooks = cur.ec;
              if (errorCapturedHooks) {
                  for (let i = 0; i < errorCapturedHooks.length; i++) {
                      if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                          return;
                      }
                  }
              }
              cur = cur.parent;
          }
          // app-level handling
          const appErrorHandler = instance.appContext.config.errorHandler;
          if (appErrorHandler) {
              callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
              return;
          }
      }
      logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
      if ((process.env.NODE_ENV !== 'production')) {
          const info = ErrorTypeStrings[type];
          if (contextVNode) {
              pushWarningContext(contextVNode);
          }
          warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
          if (contextVNode) {
              popWarningContext();
          }
          // crash in dev by default so it's more noticeable
          if (throwInDev) {
              throw err;
          }
          else {
              console.error(err);
          }
      }
      else {
          // recover in prod to reduce the impact on end-user
          console.error(err);
      }
  }

  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPreFlushCbs = [];
  let activePreFlushCbs = null;
  let preFlushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = Promise.resolve();
  let currentFlushPromise = null;
  let currentPreFlushParentJob = null;
  const RECURSION_LIMIT = 100;
  function nextTick(fn) {
      const p = currentFlushPromise || resolvedPromise;
      return fn ? p.then(this ? fn.bind(this) : fn) : p;
  }
  // #2768
  // Use binary-search to find a suitable position in the queue,
  // so that the queue maintains the increasing order of job's id,
  // which can prevent the job from being skipped and also can avoid repeated patching.
  function findInsertionIndex(id) {
      // the start index should be `flushIndex + 1`
      let start = flushIndex + 1;
      let end = queue.length;
      while (start < end) {
          const middle = (start + end) >>> 1;
          const middleJobId = getId(queue[middle]);
          middleJobId < id ? (start = middle + 1) : (end = middle);
      }
      return start;
  }
  function queueJob(job) {
      // the dedupe search uses the startIndex argument of Array.includes()
      // by default the search index includes the current job that is being run
      // so it cannot recursively trigger itself again.
      // if the job is a watch() callback, the search will start with a +1 index to
      // allow it recursively trigger itself - it is the user's responsibility to
      // ensure it doesn't end up in an infinite loop.
      if ((!queue.length ||
          !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
          job !== currentPreFlushParentJob) {
          if (job.id == null) {
              queue.push(job);
          }
          else {
              queue.splice(findInsertionIndex(job.id), 0, job);
          }
          queueFlush();
      }
  }
  function queueFlush() {
      if (!isFlushing && !isFlushPending) {
          isFlushPending = true;
          currentFlushPromise = resolvedPromise.then(flushJobs);
      }
  }
  function queueCb(cb, activeQueue, pendingQueue, index) {
      if (!isArray(cb)) {
          if (!activeQueue ||
              !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
              pendingQueue.push(cb);
          }
      }
      else {
          // if cb is an array, it is a component lifecycle hook which can only be
          // triggered by a job, which is already deduped in the main queue, so
          // we can skip duplicate check here to improve perf
          pendingQueue.push(...cb);
      }
      queueFlush();
  }
  function queuePreFlushCb(cb) {
      queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
  }
  function queuePostFlushCb(cb) {
      queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
  }
  function flushPreFlushCbs(seen, parentJob = null) {
      if (pendingPreFlushCbs.length) {
          currentPreFlushParentJob = parentJob;
          activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
          pendingPreFlushCbs.length = 0;
          if ((process.env.NODE_ENV !== 'production')) {
              seen = seen || new Map();
          }
          for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
              if ((process.env.NODE_ENV !== 'production') &&
                  checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
                  continue;
              }
              activePreFlushCbs[preFlushIndex]();
          }
          activePreFlushCbs = null;
          preFlushIndex = 0;
          currentPreFlushParentJob = null;
          // recursively flush until it drains
          flushPreFlushCbs(seen, parentJob);
      }
  }
  function flushPostFlushCbs(seen) {
      if (pendingPostFlushCbs.length) {
          const deduped = [...new Set(pendingPostFlushCbs)];
          pendingPostFlushCbs.length = 0;
          // #1947 already has active queue, nested flushPostFlushCbs call
          if (activePostFlushCbs) {
              activePostFlushCbs.push(...deduped);
              return;
          }
          activePostFlushCbs = deduped;
          if ((process.env.NODE_ENV !== 'production')) {
              seen = seen || new Map();
          }
          activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
          for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
              if ((process.env.NODE_ENV !== 'production') &&
                  checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
                  continue;
              }
              activePostFlushCbs[postFlushIndex]();
          }
          activePostFlushCbs = null;
          postFlushIndex = 0;
      }
  }
  const getId = (job) => job.id == null ? Infinity : job.id;
  function flushJobs(seen) {
      isFlushPending = false;
      isFlushing = true;
      if ((process.env.NODE_ENV !== 'production')) {
          seen = seen || new Map();
      }
      flushPreFlushCbs(seen);
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child so its render effect will have smaller
      //    priority number)
      // 2. If a component is unmounted during a parent component's update,
      //    its update can be skipped.
      queue.sort((a, b) => getId(a) - getId(b));
      // conditional usage of checkRecursiveUpdate must be determined out of
      // try ... catch block since Rollup by default de-optimizes treeshaking
      // inside try-catch. This can leave all warning code unshaked. Although
      // they would get eventually shaken by a minifier like terser, some minifiers
      // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
      const check = (process.env.NODE_ENV !== 'production')
          ? (job) => checkRecursiveUpdates(seen, job)
          : NOOP;
      try {
          for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
              const job = queue[flushIndex];
              if (job && job.active !== false) {
                  if ((process.env.NODE_ENV !== 'production') && check(job)) {
                      continue;
                  }
                  // console.log(`running:`, job.id)
                  callWithErrorHandling(job, null, 14 /* SCHEDULER */);
              }
          }
      }
      finally {
          flushIndex = 0;
          queue.length = 0;
          flushPostFlushCbs(seen);
          isFlushing = false;
          currentFlushPromise = null;
          // some postFlushCb queued jobs!
          // keep flushing until it drains.
          if (queue.length ||
              pendingPreFlushCbs.length ||
              pendingPostFlushCbs.length) {
              flushJobs(seen);
          }
      }
  }
  function checkRecursiveUpdates(seen, fn) {
      if (!seen.has(fn)) {
          seen.set(fn, 1);
      }
      else {
          const count = seen.get(fn);
          if (count > RECURSION_LIMIT) {
              const instance = fn.ownerInstance;
              const componentName = instance && getComponentName(instance.type);
              warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` +
                  `This means you have a reactive effect that is mutating its own ` +
                  `dependencies and thus recursively triggering itself. Possible sources ` +
                  `include component template, render function, updated hook or ` +
                  `watcher source function.`);
              return true;
          }
          else {
              seen.set(fn, count + 1);
          }
      }
  }
  // initial value for watchers to trigger on undefined initial values
  const INITIAL_WATCHER_VALUE = {};
  // implementation
  function watch(source, cb, options) {
      if ((process.env.NODE_ENV !== 'production') && !isFunction(cb)) {
          warn(`\`watch(fn, options?)\` signature has been moved to a separate API. ` +
              `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
              `supports \`watch(source, cb, options?) signature.`);
      }
      return doWatch(source, cb, options);
  }
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
      if ((process.env.NODE_ENV !== 'production') && !cb) {
          if (immediate !== undefined) {
              warn(`watch() "immediate" option is only respected when using the ` +
                  `watch(source, callback, options?) signature.`);
          }
          if (deep !== undefined) {
              warn(`watch() "deep" option is only respected when using the ` +
                  `watch(source, callback, options?) signature.`);
          }
      }
      const warnInvalidSource = (s) => {
          warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` +
              `a reactive object, or an array of these types.`);
      };
      const instance = currentInstance;
      let getter;
      let forceTrigger = false;
      let isMultiSource = false;
      if (isRef(source)) {
          getter = () => source.value;
          forceTrigger = !!source._shallow;
      }
      else if (isReactive(source)) {
          getter = () => source;
          deep = true;
      }
      else if (isArray(source)) {
          isMultiSource = true;
          forceTrigger = source.some(isReactive);
          getter = () => source.map(s => {
              if (isRef(s)) {
                  return s.value;
              }
              else if (isReactive(s)) {
                  return traverse(s);
              }
              else if (isFunction(s)) {
                  return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */);
              }
              else {
                  (process.env.NODE_ENV !== 'production') && warnInvalidSource(s);
              }
          });
      }
      else if (isFunction(source)) {
          if (cb) {
              // getter with cb
              getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */);
          }
          else {
              // no cb -> simple effect
              getter = () => {
                  if (instance && instance.isUnmounted) {
                      return;
                  }
                  if (cleanup) {
                      cleanup();
                  }
                  return callWithAsyncErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
              };
          }
      }
      else {
          getter = NOOP;
          (process.env.NODE_ENV !== 'production') && warnInvalidSource(source);
      }
      if (cb && deep) {
          const baseGetter = getter;
          getter = () => traverse(baseGetter());
      }
      let cleanup;
      let onInvalidate = (fn) => {
          cleanup = effect.onStop = () => {
              callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
          };
      };
      let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
      const job = () => {
          if (!effect.active) {
              return;
          }
          if (cb) {
              // watch(source, cb)
              const newValue = effect.run();
              if (deep ||
                  forceTrigger ||
                  (isMultiSource
                      ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
                      : hasChanged(newValue, oldValue)) ||
                  (false  )) {
                  // cleanup before running cb again
                  if (cleanup) {
                      cleanup();
                  }
                  callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                      newValue,
                      // pass undefined as the old value when it's changed for the first time
                      oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                      onInvalidate
                  ]);
                  oldValue = newValue;
              }
          }
          else {
              // watchEffect
              effect.run();
          }
      };
      // important: mark the job as a watcher callback so that scheduler knows
      // it is allowed to self-trigger (#1727)
      job.allowRecurse = !!cb;
      let scheduler;
      if (flush === 'sync') {
          scheduler = job; // the scheduler function gets called directly
      }
      else if (flush === 'post') {
          scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
      }
      else {
          // default: 'pre'
          scheduler = () => {
              if (!instance || instance.isMounted) {
                  queuePreFlushCb(job);
              }
              else {
                  // with 'pre' option, the first call must happen before
                  // the component is mounted so it is called synchronously.
                  job();
              }
          };
      }
      const effect = new ReactiveEffect(getter, scheduler);
      if ((process.env.NODE_ENV !== 'production')) {
          effect.onTrack = onTrack;
          effect.onTrigger = onTrigger;
      }
      // initial run
      if (cb) {
          if (immediate) {
              job();
          }
          else {
              oldValue = effect.run();
          }
      }
      else if (flush === 'post') {
          queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
      }
      else {
          effect.run();
      }
      return () => {
          effect.stop();
          if (instance && instance.scope) {
              remove(instance.scope.effects, effect);
          }
      };
  }
  // this.$watch
  function instanceWatch(source, value, options) {
      const publicThis = this.proxy;
      const getter = isString(source)
          ? source.includes('.')
              ? createPathGetter(publicThis, source)
              : () => publicThis[source]
          : source.bind(publicThis, publicThis);
      let cb;
      if (isFunction(value)) {
          cb = value;
      }
      else {
          cb = value.handler;
          options = value;
      }
      const cur = currentInstance;
      setCurrentInstance(this);
      const res = doWatch(getter, cb.bind(publicThis), options);
      if (cur) {
          setCurrentInstance(cur);
      }
      else {
          unsetCurrentInstance();
      }
      return res;
  }
  function createPathGetter(ctx, path) {
      const segments = path.split('.');
      return () => {
          let cur = ctx;
          for (let i = 0; i < segments.length && cur; i++) {
              cur = cur[segments[i]];
          }
          return cur;
      };
  }
  function traverse(value, seen) {
      if (!isObject(value) || value["__v_skip" /* SKIP */]) {
          return value;
      }
      seen = seen || new Set();
      if (seen.has(value)) {
          return value;
      }
      seen.add(value);
      if (isRef(value)) {
          traverse(value.value, seen);
      }
      else if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
              traverse(value[i], seen);
          }
      }
      else if (isSet(value) || isMap(value)) {
          value.forEach((v) => {
              traverse(v, seen);
          });
      }
      else if (isPlainObject(value)) {
          for (const key in value) {
              traverse(value[key], seen);
          }
      }
      return value;
  }

  Symbol((process.env.NODE_ENV !== 'production') ? `ssrContext` : ``);

  var registResponsive = function (wrapper, callbacks) {
      var recordOldWidth = '0';
      var updateWidth = debounce(function () { return __awaiter(void 0, void 0, void 0, function () {
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
                  virtualStore.rowSpanMap[renderStartIndex] & exports.CX_SPAN_METHOD_TYPE.MISSING) {
                  topRowSpanPrepend++;
                  renderStartIndex--;
              }
          }
          var renderLength = Math.ceil(clientHeight / CX_TABLE_HEIGHT) + CX_VISUAL_CACHE * 2 + topRowSpanPrepend;
          if (props.spanMethod) {
              var startBrokenFlag = virtualStore.rowSpanMap[renderStartIndex + renderLength] & exports.CX_SPAN_METHOD_TYPE.EXTEND;
              if (startBrokenFlag && renderStartIndex + renderLength < rowNum)
                  renderLength++;
              while (renderStartIndex + renderLength < rowNum &&
                  virtualStore.rowSpanMap[renderStartIndex + renderLength] & exports.CX_SPAN_METHOD_TYPE.MISSING) {
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
      var throttleVisual = throttle$1(scrollUpdateVisualScroll, 100, { leading: true, trailing: true });
      var throttleShadow = throttle$1(scrollUpdateShadow, 20, { leading: true, trailing: true });
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
          wrapperEle.onmousemove = throttle$1(function (event) {
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
      var keydownEventHandle = throttle$1(function (event) { return __awaiter(void 0, void 0, void 0, function () {
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
                          else if (key === exports.ARROW_KEY.L) {
                              editStore.activedControl = null;
                              actived.column = getPreOrNextItem(flatColumns, actived.column, 'pre', '_colid');
                              updateActivedCell(target);
                          }
                          else if (key === exports.ARROW_KEY.R) {
                              editStore.activedControl = null;
                              actived.column = getPreOrNextItem(flatColumns, actived.column, 'next', '_colid');
                              updateActivedCell(target);
                          }
                          else if (key === exports.ARROW_KEY.U) {
                              editStore.activedControl = null;
                              actived.rowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'pre');
                              updateActivedCell(target);
                          }
                          else if (key === exports.ARROW_KEY.D) {
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
              if (Object.values(exports.ARROW_KEY).includes(key)) {
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

  var useRegister = function ($CxTable, props, tableDataVisitor, tableWrapper, bus, tid) {
      registScrollEvent($CxTable, props);
      props.keyboard && registKeyboardEvent($CxTable, props, tableDataVisitor, bus, tid);
      registResponsive(tableWrapper, [
          function () { return __awaiter(void 0, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, vue.nextTick()];
                      case 1:
                          _a.sent();
                          useAutoWidth($CxTable);
                          return [4 /*yield*/, vue.nextTick()];
                      case 2:
                          _a.sent();
                          wrapperScrollEventHandle($CxTable, props);
                          return [4 /*yield*/, vue.nextTick()];
                      case 3:
                          _a.sent();
                          useScrollState($CxTable);
                          return [2 /*return*/];
                  }
              });
          }); }
      ]);
      registMouseEvent($CxTable);
  };

  var useSelectConfig = function (tableDataVisitor, emit) {
      var selectConfig = vue.reactive({
          selectAll: false,
          actualAll: false,
          indeterminate: false,
          selectItem: [],
          disabled: false,
          checkSelect: void 0,
          disabledItem: []
      });
      vue.watch(function () { return tableDataVisitor.sortedData.length; }, function () { return __awaiter(void 0, void 0, void 0, function () {
          var _a, _b;
          return __generator(this, function (_c) {
              switch (_c.label) {
                  case 0:
                      selectConfig.selectItem.length = tableDataVisitor.sortedData.length;
                      selectConfig.actualAll = false;
                      (_a = tableDataVisitor.sortedData) === null || _a === void 0 ? void 0 : _a.forEach(function (row, index) {
                          selectConfig.selectItem[index] = !!selectConfig.selectItem[index];
                      });
                      return [4 /*yield*/, vue.nextTick()];
                  case 1:
                      _c.sent();
                      selectConfig.disabledItem.length = 0;
                      (_b = tableDataVisitor.sortedData) === null || _b === void 0 ? void 0 : _b.forEach(function (row) {
                          var _a;
                          selectConfig.disabledItem.push(isFunction$1(selectConfig.checkSelect) && !!((_a = selectConfig.checkSelect) === null || _a === void 0 ? void 0 : _a.call(selectConfig, row)));
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
      vue.watch(function () { return selectConfig.selectItem; }, updateSelectConfig, { deep: true, immediate: false });
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
      return vue.computed(function () {
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
          return vue.computed(function () {
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
          return vue.computed(function () {
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
          return vue.computed(function () {
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
          var hasTargetProp = isString$1(params === null || params === void 0 ? void 0 : params.prop);
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
              if (!isFunction$1(column.validator) && !column.required)
                  return;
              (isArray$1(dataSource) ? dataSource : props.tableData).forEach(function (rowData, rowIndex) {
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
      var updateTableState = debounce(function () { return __awaiter(void 0, void 0, void 0, function () {
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
                      if (tableWrapper.value) {
                          wrapperScrollEventHandle($CxTable, props);
                          useScrollState($CxTable);
                      }
                      return [2 /*return*/];
              }
          });
      }); }, 50);
      var updateColumn = function () { return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
              useColumn($CxTable, columnProxy, props);
              useColumnValidity($CxTable);
              updateTableState();
              return [2 /*return*/];
          });
      }); };
      // 当表头变化时,需要更新column对象以及重新计算宽度,触发一些样式计算
      watch(function () { return columnProxy.value; }, updateColumn, { immediate: true, deep: true });
      var updateData = function () { return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
              useRowDataValidity(props);
              updateTableState();
              return [2 /*return*/];
          });
      }); };
      watch([function () { return props.tableData.length; }, function () { return props.emptyLimit; }], updateData);
      watch(function () { return props.tableData; }, updateTableState, { deep: true });
      var updateExpand = function () { return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
              setTimeout(function () {
                  useScrollState($CxTable);
              });
              return [2 /*return*/];
          });
      }); };
      watch(function () { return expandConfig; }, updateExpand, { deep: true, immediate: true });
      var updateStyleSetting = function () {
          var _a;
          Object.entries((_a = props.styleSetting) !== null && _a !== void 0 ? _a : {}).forEach(function (_a) {
              var _b = __read(_a, 2), key = _b[0], val = _b[1];
              var settingKey = Reflect.get(exports.CX_STYLE_SETTING, key);
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
      'headTip'
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
          case exports.CX_ADAPTOR_PRECISION_TYPE.GOLD:
              return goldAccuracy;
          case exports.CX_ADAPTOR_PRECISION_TYPE.STONE:
              return stoneAccuracy;
          case exports.CX_ADAPTOR_PRECISION_TYPE.PRICE:
              return priceAccuracy;
          case exports.CX_ADAPTOR_PRECISION_TYPE.INT:
              return CX_ADAPTOR_INT_PRECISION;
          case exports.CX_ADAPTOR_PRECISION_TYPE.LOSS:
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
      if (isString$1(val))
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
              if (prop === 'undefined')
                  return prop;
              return withCalc ? (+data[prop] || 0) + '' : getInFactVal(data[prop]);
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
      return calcInnerItem(formula, data, isString$1, 0, getEvalResult);
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
                      if (+data[key] === +innerKey) {
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
      if (!isString$1(formula))
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
                  break;
              case 'inscription':
              case 'search':
              case 'select':
                  this.selectConfigAdaptor(config);
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
              res[key] = __assign(__assign({}, val), { prop: config.prop });
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
          isNumber(control.minLength) && Reflect.set(this.attrs, 'minlength', control.minLength);
          control.showWordLimit && Reflect.set(this.attrs, 'showWordLimit', true);
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

  var onInits = [];
  var onOutputs = [];
  var CxConfigAdaptor$1 = /** @class */ (function () {
      function CxConfigAdaptor(config) {
          this.basicColumn = { prop: '', label: '' };
          var configDuplicate = onInits.reduce(function (res, hook) { return (isFunction$1(hook) ? hook(res) : res); }, R__namespace.clone(config));
          this.staticConfigAdaptor(configDuplicate)
              .dynamicConfigAdaptor(configDuplicate)
              .controlAdaptor(configDuplicate)
              .childrenAdaptor(configDuplicate);
      }
      CxConfigAdaptor.use = function (plugin) {
          var onInit = plugin.onInit, onOutput = plugin.onOutput;
          isFunction$1(onInit) && onInits.push(onInit);
          isFunction$1(onOutput) && onOutputs.push(onOutput);
      };
      CxConfigAdaptor.prototype.getColumn = function () {
          if (onOutputs.length === 0)
              return this.basicColumn;
          var columnDuplicate = onOutputs.reduce(function (res, hook) { return (isFunction$1(hook) ? hook(res) : res); }, R__namespace.clone(this.basicColumn));
          return columnDuplicate;
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

  var dataInitPlugin = {
      onInit: function (config) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j;
          // 处理dynamic
          config.dynamicCalculate && Reflect.set(config, 'calculate', config.dynamicCalculate);
          config.dynamicValidator && Reflect.set(config, 'validator', config.dynamicValidator);
          ((_a = config === null || config === void 0 ? void 0 : config.control) === null || _a === void 0 ? void 0 : _a.dynamicOptions) &&
              Reflect.set(config.control, 'options', config.control.dynamicOptions);
          // 处理index
          (config.index || config.prop === 'index') &&
              !((_b = config.control) === null || _b === void 0 ? void 0 : _b.type) &&
              Reflect.set(config, 'control', { type: 'index' });
          // 处理特殊的align
          (((_d = (_c = config.children) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0 ||
              ['nativeCheckbox', 'nativeCheckRadio', 'index'].includes((_e = config.control) === null || _e === void 0 ? void 0 : _e.type)) &&
              Reflect.set(config, 'align', 'center');
          // 处理特殊宽度
          ['nativeCheckbox'].includes((_f = config.control) === null || _f === void 0 ? void 0 : _f.type) && Reflect.set(config, 'width', 50);
          // 处理number-input
          config.input && Reflect.set(config, 'number', config.input);
          isNumber((_g = config.number) === null || _g === void 0 ? void 0 : _g.decimal) &&
              Reflect.set(config.number, 'decimal', getPrecision((_h = config.number) === null || _h === void 0 ? void 0 : _h.decimal));
          // 处理accuracy
          isNumber(config.accuracy) && Reflect.set(config, 'accuracy', getPrecision(config.accuracy));
          // 处理宽度,将动态表头的宽度设置为最高优先级的宽度
          config.width && Reflect.set(config, 'importantWidth', config.width);
          // 处理fixed,原则上顶级表头的所有子项都应该是相同的fixed
          function setFixed(config, fixed) {
              Reflect.set(config, 'fixed', fixed);
              Array.isArray(config.children) && config.children.forEach(function (child) { return setFixed(child, fixed); });
          }
          setFixed(config, config.fixed);
          // 特殊处理, 所有的select强制转换为search
          ((_j = config.control) === null || _j === void 0 ? void 0 : _j.type) === 'select' && Reflect.set(config.control, 'type', 'search');
          // 特殊处理,部分单号相关的列都修改为orderText组件
          if (['订单编号', '商户单号', '生产单号', '销售单号'].includes(config.label) &&
              !config.control) {
              config.control = { type: 'orderText' };
          }
          return config;
      }
  };

  var businessPlugin = {
      onOutput: function (column) {
          // TODO 处理特殊业务组件
          return column;
      }
  };

  // 加载插件, 先添加业务组件插件, 再添加字段处理插件, 顺序请勿变更
  CxConfigAdaptor$1.use(businessPlugin);
  CxConfigAdaptor$1.use(dataInitPlugin);
  var CxConfigAdaptor = CxConfigAdaptor$1;

  function getDateRange(num, type, _a) {
      if (num === void 0) { num = 1; }
      var _b = _a === void 0 ? {} : _a, _c = _b.isInt, isInt = _c === void 0 ? false : _c, _d = _b.isDate, isDate = _d === void 0 ? false : _d;
      var currentDate = new Date();
      var start = new Date();
      switch (type) {
          case 'year':
              start = new Date(start.setFullYear(currentDate.getFullYear() - num));
              break;
          case 'month':
              start = new Date(start.setMonth(currentDate.getMonth() - num));
              break;
          case 'day':
              start = new Date(start.setDate(currentDate.getDate() - num));
              break;
          case 'hour':
              start = new Date(start.setHours(currentDate.getHours() - num));
              break;
          case 'minute':
              start = new Date(start.setMinutes(currentDate.getMinutes() - num));
              break;
          case 'second':
              start = new Date(start.setSeconds(currentDate.getSeconds() - num));
      }
      var end = new Date();
      if (isInt) {
          start = new Date(start.setDate(1));
          if (num)
              end = new Date(new Date().setDate(0));
      }
      if (isDate)
          return start;
      return [start, end];
  }
  var getFunctionAttrs = function (rowData, attrs) {
      if (isFunction$1(attrs)) {
          var result = attrs({ rowData: rowData });
          return isObject$1(result) ? result : void 0;
      }
      return attrs;
  };
  var _a = useCxTable().getContext().dynamicType, DYNAMIC_BUSINESS_TYPE = _a.DYNAMIC_BUSINESS_TYPE, DYNAMIC_MODULE_TYPE = _a.DYNAMIC_MODULE_TYPE, DYNAMIC_MODEL_TYPE = _a.DYNAMIC_MODEL_TYPE, DYNAMIC_PRICE_TYPE = _a.DYNAMIC_PRICE_TYPE;
  var changeDynamicIdToText = function (dynamic) {
      return {
          businessType: DYNAMIC_BUSINESS_TYPE[dynamic.businessType],
          moduleType: DYNAMIC_MODULE_TYPE[dynamic.moduleType],
          modelType: DYNAMIC_MODEL_TYPE[dynamic.modelType],
          priceType: DYNAMIC_PRICE_TYPE[dynamic.priceType]
      };
  };
  var debounce = function (cb, duration) {
      if (duration === void 0) { duration = 100; }
      var timer = null;
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          timer && clearTimeout(timer);
          timer = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, cb.apply(void 0, __spreadArray([], __read(args)))];
                      case 1:
                          _a.sent();
                          return [2 /*return*/];
                  }
              });
          }); }, duration);
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
  var format = function (val) { return dayjs__default['default'](val).format('YYYY-MM-DD'); };
  var formatDate = R__namespace.ifElse(R__namespace.is(Array), R__namespace.map(format), format);
  var format2 = function (val) { return dayjs__default['default'](val).format('YYYY-MM-DD HH-mm-ss'); };
  var formatTime = R__namespace.ifElse(R__namespace.is(Array), R__namespace.map(format2), format2);
  function formatFormDefaultValue(defaultEnum, searchType) {
      switch (defaultEnum) {
          case 'all':
              return -1;
          case 'week':
              return formatDate(getDateRange(7, 'day'));
          case 'today':
              return searchType === 'dateRange'
                  ? formatDate(getDateRange(1, 'day'))
                  : formatDate(Date.now());
          case 'mouth':
              return searchType === 'dateRange'
                  ? formatDate(getDateRange(0, 'month', { isInt: true }))
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
                      ? R__namespace.clone(object[key])
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
  function isEmpty(val) {
      return !val && val !== 0;
  }
  Reflect.set(window, 'getStringWidth', getStringWidth);
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
          if (col.columnFlag & exports.COLUMN_FLAG.TEXT_SUM_COLUMN) {
              result[col.prop] = '总计';
          }
          else if (col.columnFlag & exports.COLUMN_FLAG.ADD_SUM_COLUMN) {
              if (col.columnFlag & exports.COLUMN_FLAG.CALC_COLUMN) {
                  data.forEach(function (rowData) {
                      var _a, _b;
                      rowData[col.prop] = (_b = (_a = col.calculate) === null || _a === void 0 ? void 0 : _a.call(col, rowData)) !== null && _b !== void 0 ? _b : rowData[col.prop];
                  });
              }
              result[col.prop] = getSums(data, col.prop);
          }
          else if (col.columnFlag & exports.COLUMN_FLAG.CUSTOM_SUM_COLUMN) {
              result[col.prop] = isFunction$1(col.sum) ? col.sum(data) : null;
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
      var index = arr.findIndex(function (arrItem) {
          return prop ? arrItem[prop] === item[prop] : arrItem === item;
      });
      if (index < 0)
          return item;
      if (direction === 'pre') {
          if (index === 0)
              return item;
          return arr[index - 1];
      }
      else {
          if (arr[index + 1]) {
              return arr[index + 1];
          }
          return item;
      }
  };
  var getStatusAttrs = function (rowData, column) {
      var _a, _b, _c, _d;
      var statusMap = ((_a = column.control) !== null && _a !== void 0 ? _a : {}).statusMap;
      // statusMap分2种情况, Array => string[] / Object => { [k:string]:{content?:string,prop?:string,type?:string} }
      var _e = Array.isArray(statusMap)
          ? { content: statusMap[rowData[column.prop]], prop: undefined, type: undefined }
          : (_c = (_b = statusMap === null || statusMap === void 0 ? void 0 : statusMap[rowData[column.prop]]) !== null && _b !== void 0 ? _b : statusMap === null || statusMap === void 0 ? void 0 : statusMap["default"]) !== null && _c !== void 0 ? _c : {}, content = _e.content, prop = _e.prop, type = _e.type;
      return {
          content: content ? content : prop ? rowData[prop] : (_d = rowData[prop + 'Text']) !== null && _d !== void 0 ? _d : '',
          type: type
      };
  };

  var HeadCell = vue.defineComponent({
      name: 'CxTableHeadCell',
      props: {
          layeredLevel: { type: Number, "default": 1 },
          column: { type: Object, "default": function () { return ({}); } }
      },
      setup: function (props) {
          var rootSlots = vue.inject('rootSlots', {});
          var selectConfig = vue.inject('selectConfig');
          var CxTable = vue.inject('CxTable');
          var tableDataVisitor = vue.inject('tableDataVisitor');
          var bus = vue.inject('bus');
          // 单元格内盒宽度
          var cellWidth = vue.ref(0);
          vue.watchEffect(function () {
              var _a;
              var arrChildren = props.column.columnFlag & exports.COLUMN_FLAG.ARRAY_CHILDREN;
              cellWidth.value = arrChildren
                  ? getSums((_a = props.column.children) !== null && _a !== void 0 ? _a : [])
                  : props.column.renderWidth;
          });
          // 单元格属性
          var thAttrs = vue.computed(function () {
              var _a, _b, _c;
              var column = props.column, layeredLevel = props.layeredLevel;
              var arrChildren = column.columnFlag & exports.COLUMN_FLAG.ARRAY_CHILDREN;
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
              return vue.createVNode('th', thAttrs.value, [
                  (vue.openBlock(),
                      vue.createBlock('div', { "class": hoisted_1, style: { width: formatWidth(cellWidth.value) } }, [
                          column.headTip
                              ? vue.createVNode(vue.resolveComponent('ElTooltip'), { content: column.headTip, placement: 'top-start', key: -1 }, [cache[5] || (cache[5] = vue.createVNode('i', { "class": 'iconfont icon-bangzhu' }))], exports.PATCH_FLAG.PROPS, ['content'])
                              : vue.createCommentVNode('c-if_tip', true),
                          column.headSlot && (rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[column.headSlot])
                              ? vue.createVNode(rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[column.headSlot], { column: column })
                              : ((_a = column.control) === null || _a === void 0 ? void 0 : _a.type) === 'nativeCheckbox'
                                  ? vue.createVNode(vue.resolveComponent('ElCheckbox'), {
                                      key: 0,
                                      modelValue: selectConfig.selectAll,
                                      'onUpdate:modelValue': cache[0] || (cache[0] = function (val) { return (selectConfig.selectAll = val); }),
                                      indeterminate: selectConfig.indeterminate,
                                      disabled: selectConfig.disabled,
                                      onChange: cache[1] ||
                                          (cache[1] = function () { return bus.emit('toggleAllSelection', selectConfig.selectAll); })
                                  }, null, exports.PATCH_FLAG.FULL_PROPS | exports.PATCH_FLAG.NEED_PATCH)
                                  : (vue.openBlock(),
                                      vue.createBlock(vue.Fragment, null, [
                                          (vue.openBlock(),
                                              vue.createBlock(vue.Fragment, null, [
                                                  column.required
                                                      ? cache[2] ||
                                                          (cache[2] = vue.createVNode('i', { style: hoisted_3, key: 1 }, '*'))
                                                      : vue.createCommentVNode('v-if_required', true)
                                              ])),
                                          // column.icon
                                          //   ? createVNode(
                                          //       'i',
                                          //       { class: [hoisted_2, 'icon-' + column.icon], key: 2 },
                                          //       null,
                                          //       PATCH_FLAG.CLASS
                                          //     )
                                          //   : createCommentVNode('v-if_icon', true),
                                          vue.createVNode('span', { key: 3 }, column.label, exports.PATCH_FLAG.TEXT),
                                          column.sortable
                                              ? cache[3] || (cache[3] = vue.createVNode('i', { "class": hoisted_4, key: 4 }))
                                              : vue.createCommentVNode('v-if_sortable_space', true),
                                          column.sortable
                                              ? vue.createVNode('i', {
                                                  key: 5,
                                                  onClick: cache[4] ||
                                                      (cache[4] = function () {
                                                          tableDataVisitor.sort = column.sortable;
                                                          tableDataVisitor.sortProp = column.prop;
                                                          switch (tableDataVisitor.sortStatus) {
                                                              case exports.CX_SORT_STATUS.NONE:
                                                                  tableDataVisitor.sortStatus = exports.CX_SORT_STATUS.POSITIVE;
                                                                  break;
                                                              case exports.CX_SORT_STATUS.POSITIVE:
                                                                  tableDataVisitor.sortStatus = exports.CX_SORT_STATUS.REVERSE;
                                                                  break;
                                                              case exports.CX_SORT_STATUS.REVERSE:
                                                                  tableDataVisitor.sortStatus = exports.CX_SORT_STATUS.NONE;
                                                          }
                                                      }),
                                                  "class": [
                                                      hoisted_5,
                                                      tableDataVisitor.sortProp === column.prop
                                                          ? tableDataVisitor.sortStatus === exports.CX_SORT_STATUS.POSITIVE
                                                              ? hoisted_6
                                                              : tableDataVisitor.sortStatus === exports.CX_SORT_STATUS.REVERSE
                                                                  ? hoisted_7
                                                                  : null
                                                          : null
                                                  ]
                                              }, null, exports.PATCH_FLAG.CLASS)
                                              : vue.createCommentVNode('v-if_sortable', true)
                                      ], exports.PATCH_FLAG.KEYED_FRAGMENT | exports.PATCH_FLAG.STABLE_FRAGMENT))
                      ], exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.STYLE))
              ], exports.PATCH_FLAG.PROPS | exports.PATCH_FLAG.STYLE, ['colspan', 'rowspan']);
          };
      }
  });

  var CxTableHead = vue.defineComponent({
      name: 'CxTableHead',
      props: { fixed: { type: String, "default": '' }, left: { type: Number, "default": 0 } },
      components: { HeadCell: HeadCell },
      setup: function (props) {
          var CxTable = vue.inject('CxTable');
          var style = useTableStyle(props, CxTable, 'head');
          // 分层表头
          var layeredHeadItems = vue.computed(function () {
              return invokeLayeredRow(CxTable.columns);
          });
          var hoisted_1 = ['top', 'height', 'width', 'right'];
          var hoisted_2 = 'cx-table_head';
          return function () {
              return vue.createVNode('div', { "class": hoisted_2, style: pick(style.value, hoisted_1) }, [
                  vue.createVNode('table', { style: pick(style.value, ['left']) }, [
                      (vue.openBlock(),
                          vue.createBlock(vue.Fragment, null, layeredHeadItems.value.map(function (headers, index) {
                              return (vue.openBlock(),
                                  vue.createBlock('tr', null, [
                                      (vue.openBlock(true),
                                          vue.createBlock(vue.Fragment, null, headers.map(function (col) {
                                              return props.fixed && props.fixed !== 'top' && col.fixed !== props.fixed
                                                  ? vue.createCommentVNode('v-if_table_head', true)
                                                  : (vue.openBlock(),
                                                      vue.createBlock(HeadCell, {
                                                          column: col,
                                                          layeredLevel: layeredHeadItems.value.length - index
                                                      }, null, exports.PATCH_FLAG.PROPS, ['column', 'layeredLevel']));
                                          }), exports.PATCH_FLAG.UNKEYED_FRAGMENT))
                                  ]));
                          }, exports.PATCH_FLAG.UNKEYED_FRAGMENT)))
                  ], exports.PATCH_FLAG.STYLE)
              ], exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.STYLE);
          };
      }
  });

  var renderDefaultNode = function (params) {
      var defaultRenderer = CxTableRendererMap.get('default');
      return isFunction$1(defaultRenderer)
          ? defaultRenderer(params)
          : vue.createVNode('div', null, params.rowData[params.column.prop]);
  };
  var renderCellContent = function (props, isActived, rowIndex, sum, rootSlots, selectConfig, radioValue, disabled, bus, expandConfig, broadcast, pagination, ignoreControl, forceControl) {
      if (sum === void 0) { sum = false; }
      var params = __assign(__assign({}, props), { expandConfig: expandConfig, rowIndex: rowIndex, selectConfig: selectConfig, radioValue: radioValue, bus: bus, pagination: pagination, broadcast: broadcast });
      return (vue.openBlock(),
          vue.createBlock(vue.Fragment, null, [
              sum
                  ? renderCellSum(params, rootSlots)
                  : props.column.columnFlag & exports.COLUMN_FLAG.SLOT_COLUMN
                      ? renderCellSlot(params, isActived, disabled, rootSlots, ignoreControl, forceControl)
                      : props.column.columnFlag & exports.COLUMN_FLAG.CONTROL_COLUMN
                          ? renderCustomCell(params, isActived, disabled, ignoreControl, forceControl)
                          : props.column.columnFlag & exports.COLUMN_FLAG.CALC_COLUMN
                              ? renderCalcCell(params)
                              : renderDefaultNode(params),
          ]));
  };
  var renderCellSum = function (params, rootSlots) {
      var _a, _b;
      return (vue.openBlock(),
          vue.createBlock(vue.Fragment, null, [
              params.column.sumSlot
                  ? (rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[params.column.sumSlot])
                      ? rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[params.column.sumSlot](params)
                      : null
                  : ((_a = params.column.control) === null || _a === void 0 ? void 0 : _a.type) === 'index' || (isString$1(params.column.sum) && params.column.sum !== 'add')
                      ? vue.createTextVNode((_b = params.column.sum) !== null && _b !== void 0 ? _b : '总计')
                      : renderDefaultNode(params),
          ]));
  };
  var renderCellSlot = function (params, isActived, disabled, rootSlots, ignoreControl, forceControl) {
      if (isFunction$1(params.column.slot)) {
          return params.column.slot(__assign(__assign({}, params), { isActived: isActived, disabled: disabled, prop: params.column.prop, ignore: ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false, force: forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false }));
      }
      return (rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[params.column.slot])
          ? rootSlots === null || rootSlots === void 0 ? void 0 : rootSlots[params.column.slot](__assign(__assign({}, params), { isActived: isActived, disabled: disabled, prop: params.column.prop, ignore: ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false, force: forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false }))
          : null;
  };
  var renderCalcCell = function (params) {
      var column = params.column, rowData = params.rowData;
      return (vue.openBlock(),
          vue.createBlock(vue.Fragment, null, [
              isFunction$1(column.calculate)
                  ? vue.createVNode('span', null, column.calculate(rowData), exports.PATCH_FLAG.TEXT)
                  : vue.createCommentVNode('v-if', true),
          ]));
  };
  var renderCustomCell = function (params, isActived, disabled, ignoreControl, forceControl) {
      var _a;
      var type = ((_a = params.column.control) !== null && _a !== void 0 ? _a : {}).type;
      var renderer = CxTableRendererMap.get(type);
      if (isFunction$1(renderer)) {
          var ignore = ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false;
          var force = forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false;
          return renderer(__assign(__assign({}, params), { isActived: isActived, disabled: disabled, prop: params.column.prop, ignore: ignore, force: force }));
      }
      var defaultRenderer = CxTableRendererMap.get('default');
      return isFunction$1(defaultRenderer)
          ? defaultRenderer(__assign(__assign({}, params), { isActived: isActived, disabled: disabled, prop: params.column.prop, ignore: true, force: false }))
          : vue.createVNode('div', null, params.rowData[params.column.prop]);
  };

  var Cell = vue.defineComponent({
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
          var rootSlots = vue.inject('rootSlots', {});
          var selectConfig = vue.inject('selectConfig');
          var CxTable = vue.inject('CxTable');
          var radioValue = vue.inject('radioValue');
          var expandConfig = vue.inject('expandConfig');
          var rootProp = vue.inject('rootProp');
          var broadcast = vue.inject('broadcast');
          var bus = vue.inject('bus');
          var _hoisted_direction_1 = vue.resolveDirective('uni-popper');
          var handles = rootProp.keyboard ? registCellEvent(CxTable, props) : {};
          // 如果设置了validate,则计算其校验结果
          var invalidContent = vue.computed(function () {
              if (!(props.column.columnFlag & exports.COLUMN_FLAG.VALIDATE_COLUMN))
                  return;
              CxTable.editStore.actived;
              props.rowData[props.column.prop];
              var result = isFunction$1(props.column.validator)
                  ? props.column.validator({
                      column: props.column,
                      value: props.rowData[props.column.prop],
                      rowIndex: props.rowIndex,
                      rowData: props.rowData
                  })
                  : null;
              if (!result && props.column.required) {
                  result = isEmpty(props.rowData[props.column.prop]) ? props.column.label + '为必填' : null;
              }
              return result;
          });
          // 聚焦,此写法可避免render函数收集到无用依赖,此处请勿使用computed
          var isActived = vue.ref(false);
          vue.watchEffect(function () {
              var _a;
              var result = props.column._colid === ((_a = CxTable.editStore.actived.column) === null || _a === void 0 ? void 0 : _a._colid) &&
                  props.rowData === CxTable.editStore.actived.rowData;
              isActived.value = result;
          });
          // 聚焦提交tdFocus事件
          vue.watch(function () { return isActived.value; }, function () {
              if (isActived.value) {
                  var rowIndex = props.rowIndex, rowData = props.rowData, column = props.column;
                  bus.emit('tdFocus', { rowIndex: rowIndex, rowData: rowData, column: column });
              }
          });
          // 如果设置了spanMethod,则计算其colspan/rowspan
          var mergeSpan = vue.computed(function () {
              var _a, _b;
              if (!isFunction$1(rootProp.spanMethod) || props.sum)
                  return {};
              var result = (_b = (_a = rootProp.spanMethod) === null || _a === void 0 ? void 0 : _a.call(rootProp, {
                  rowData: props.rowData,
                  column: props.column,
                  rowIndex: props.rowIndex
              })) !== null && _b !== void 0 ? _b : {};
              if (isArray$1(result)) {
                  result = { rowspan: result[0], colspan: result[1] };
              }
              return result;
          });
          // 单元格是否显示控件
          var isControl = vue.computed(function () {
              return isActived.value && !!CxTable.editStore.activedControl;
          });
          var errorVisible = vue.computed(function () {
              return !!(invalidContent.value && isControl.value);
          });
          var directionOption = vue.reactive({
              visible: false,
              classList: ['fold-table_wrong_msg', 'cx_mtb_8'],
              text: invalidContent.value,
              controlType: 'handle',
              placement: 'top-start',
              key: 'errorMsg'
          });
          vue.watch(invalidContent, function (val) {
              directionOption.text = val;
          });
          vue.watch(errorVisible, function (val) {
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
              if (props.column.columnFlag & exports.COLUMN_FLAG.VALIDATE_COLUMN && !props.sum) {
                  return vue.withDirectives(vue.createVNode('div', null, [renderInnerContent()]), [
                      [_hoisted_direction_1 !== null && _hoisted_direction_1 !== void 0 ? _hoisted_direction_1 : {}, directionOption]
                  ]);
              }
              else {
                  return renderInnerContent();
              }
          };
          // 单元格样式
          var tdStyle = vue.ref({});
          vue.watchEffect(function () {
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
          vue.watch(function () { return mergeSpan.value.rowspan; }, function (val, oldVal) {
              if (val === oldVal)
                  return;
              if (rootProp.virtualScroll) {
                  var rowSpanMap = CxTable.virtualStore.rowSpanMap;
                  if (mergeSpan.value.rowspan > 1) {
                      rowSpanMap[props.rowIndex] |= exports.CX_SPAN_METHOD_TYPE.EXTEND;
                  }
                  if (mergeSpan.value.rowspan === 0) {
                      rowSpanMap[props.rowIndex] |= exports.CX_SPAN_METHOD_TYPE.MISSING;
                  }
              }
          }, { immediate: true });
          // 此写法可避免render函数收集到无用依赖,此处请勿使用computed
          var cellActived = vue.ref(false);
          vue.watchEffect(function () {
              if (cellActived.value === (isActived.value && !CxTable.editStore.activedControl))
                  return;
              cellActived.value = isActived.value && !CxTable.editStore.activedControl;
          });
          // 当值发生改变时发送一个广播
          vue.watch(function () { return props.rowData[props.column.prop]; }, function () {
              broadcast === null || broadcast === void 0 ? void 0 : broadcast.trigger(props.column.prop, props.rowData, {
                  prop: props.column.prop,
                  rowData: props.rowData
              });
          });
          // 当column为select/search时,由于text的存在,不能仅仅监听id变化,text值也会对渲染有影响,同时,插槽内容的变化也难以监听
          if (['search', 'select'].includes((_a = props.column.control) === null || _a === void 0 ? void 0 : _a.type) || props.column.slot) {
              var textKey_1 = getColumnSelectText(props.column);
              vue.watch(function () { return props.rowData[textKey_1]; }, function () {
                  broadcast === null || broadcast === void 0 ? void 0 : broadcast.trigger(textKey_1, props.rowData, {
                      prop: textKey_1,
                      rowData: props.rowData
                  });
              });
          }
          return function () {
              var _a, _b, _c;
              // 广播注册,每次重新渲染时需要重新注册,否则会出现行数据错误的问题(虚拟滚动)
              var attrs = getFunctionAttrs(props.rowData, (_a = props.column.control) === null || _a === void 0 ? void 0 : _a.attrs);
              var broadcastRegister = attrs === null || attrs === void 0 ? void 0 : attrs.broadcastRegister;
              if (broadcastRegister && isFunction$1(broadcastRegister)) {
                  broadcastRegister(function (prop, cb) { return broadcast.registListener(prop, props.rowData, cb); });
              }
              if (mergeSpan.value && (((_b = mergeSpan.value) === null || _b === void 0 ? void 0 : _b.rowspan) === 0 || ((_c = mergeSpan.value) === null || _c === void 0 ? void 0 : _c.colspan) === 0)) {
                  return;
              }
              return vue.createVNode('td', __assign(__assign(__assign({ key: key }, handles), mergeSpan.value), { style: tdStyle.value, colid: props.column._colid, "class": { actived: cellActived.value } }), [
                  vue.createVNode('div', {
                      "class": 'cx-table_cell',
                      style: { width: props.column.renderWidth + 'px' }
                  }, [renderContent()], exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.STYLE)
              ], exports.PATCH_FLAG.FULL_PROPS);
          };
      }
  });

  var TableRow = vue.defineComponent({
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
          var selectConfig = vue.inject('selectConfig', { selectItem: [] });
          var radioValue = vue.inject('radioValue', vue.ref(-1));
          var CxTable = vue.inject('CxTable');
          var isHover = vue.ref(false);
          vue.watchEffect(function () {
              isHover.value = props.rowid === CxTable.hoveringRowid;
          });
          var isActive = vue.ref(false);
          vue.watchEffect(function () {
              var _a, _b;
              isActive.value =
                  ((_a = selectConfig.selectItem) === null || _a === void 0 ? void 0 : _a[props.rowIndex]) ||
                      radioValue.value === props.rowIndex ||
                      ((_b = props.activedRow) === null || _b === void 0 ? void 0 : _b.includes(props.rowIndex));
          });
          var trAttrs = vue.computed(function () {
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
              return vue.createVNode('tr', trAttrs.value, slots, exports.PATCH_FLAG.PROPS | exports.PATCH_FLAG.CLASS, [
                  'rowid'
              ]);
          };
      }
  });

  var FixedBottom = vue.defineComponent({
      name: 'CxTableFixedBottom',
      props: {
          tableData: { type: Array, "default": function () { return []; } }
      },
      setup: function (props) {
          var CxTable = vue.inject('CxTable');
          var component = CxTableBody;
          return function () {
              return [
                  CxTable.columnStore.rightFixedColumns.length
                      ? vue.createVNode(component, {
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
                      ? vue.createVNode(component, {
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

  var TableAddBtn = vue.defineComponent({
      name: 'CxTableAddBtn',
      props: {
          fixed: { type: String, "default": '' },
          tableData: { type: Array, "default": function () { return []; } }
      },
      setup: function (props) {
          var rootProp = vue.inject('rootProp');
          var CxTable = vue.inject('CxTable');
          var bus = vue.inject('bus');
          var hoisted_1 = 'cx_opacity_0';
          var classList = vue.computed(function () {
              return [
                  'cx-table_add_btn',
                  'cx_mlr_10',
                  props.tableData.length ? 'cx_h_80' : 'cx_h_160',
                  props.fixed ? hoisted_1 : null
              ];
          });
          var realShow = vue.computed(function () {
              return !rootProp.showAddBtn || props.fixed === 'top' || props.fixed === 'bottom';
          });
          return function (_, cache) {
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      realShow.value
                          ? vue.createCommentVNode('v-if_add_btn', true)
                          : vue.createVNode('tr', null, [
                              vue.createVNode('td', { "class": props.fixed ? hoisted_1 : null, colspan: CxTable.flatColumns.length }, [
                                  vue.createVNode('div', {
                                      onClick: cache[0] || (cache[0] = function () { return bus.emit('addNewRow', 'addNewRow'); }),
                                      "class": classList.value
                                  }, rootProp.showAddBtn, exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.NEED_PATCH | exports.PATCH_FLAG.TEXT)
                              ], exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.PROPS, ['colspan'])
                          ])
                  ], exports.PATCH_FLAG.STABLE_FRAGMENT));
          };
      }
  });

  var Expand = vue.defineComponent({
      name: 'CxTableExpand',
      props: {
          fixed: { type: String, "default": '' },
          rowData: { type: Object, "default": function () { return ({}); } },
          rowIndex: { type: Number, "default": -1 }
      },
      setup: function (props) {
          var CxTable = vue.inject('CxTable');
          var rootProp = vue.inject('rootProp');
          var expandConfig = vue.inject('expandConfig', []);
          var rootSlots = vue.inject('rootSlots', {});
          var classList = vue.computed(function () {
              var result = [];
              props.fixed && result.push('cx_opacity_0');
              return result;
          });
          var colspan = vue.computed(function () {
              var _a, _b, _c;
              return props.fixed === 'left'
                  ? (_a = CxTable.columnStore.leftFixedColumns) === null || _a === void 0 ? void 0 : _a.length
                  : props.fixed === 'right'
                      ? (_b = CxTable.columnStore.rightFixedColumns) === null || _b === void 0 ? void 0 : _b.length
                      : (_c = CxTable.flatColumns) === null || _c === void 0 ? void 0 : _c.length;
          });
          var slotName = vue.computed(function () {
              var result = '';
              if (isString$1(rootProp.expand) && rootProp.expand) {
                  result = rootProp.expand;
              }
              else if (isFunction$1(rootProp.expand)) {
                  var expandSlot = rootProp.expand(props.rowData, props.rowIndex);
                  expandSlot && (result = expandSlot);
              }
              return result;
          });
          var hoisted_1 = 'cx-table_expand';
          return function () {
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      slotName.value && expandConfig[props.rowIndex] && rootSlots[slotName.value]
                          ? vue.createVNode('tr', { "class": classList.value }, [
                              vue.createVNode('td', { colspan: colspan.value }, [
                                  vue.createVNode('div', {
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
                                      vue.createVNode('div', { style: { width: CxTable.scrollStore.renderTotalWidth + 'px' } }, [
                                          vue.createVNode(rootSlots[slotName.value], { rowIndex: props.rowIndex, rowData: props.rowData }, null, exports.PATCH_FLAG.FULL_PROPS)
                                      ], exports.PATCH_FLAG.STYLE)
                                  ], exports.PATCH_FLAG.STYLE)
                              ], exports.PATCH_FLAG.PROPS, ['colspan'])
                          ], exports.PATCH_FLAG.CLASS)
                          : vue.createCommentVNode('v-if_expand', true)
                  ]));
          };
      }
  });

  var CxTableBody = vue.defineComponent({
      name: 'CxTableBody',
      props: {
          fixed: { type: String, "default": '' },
          onlyTotal: { type: Boolean, "default": false },
          tableData: { type: Array, "default": function () { return []; } },
          float: { type: Boolean, "default": false }
      },
      setup: function (props) {
          var CxTable = vue.inject('CxTable');
          var rootProp = vue.inject('rootProp');
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
              return vue.createVNode(TableRow, {
                  sum: sum,
                  "class": sum ? hoisted_1 : '',
                  rowData: rowData,
                  rowIndex: rowIndex,
                  activedRow: rootProp.activeRows,
                  rowid: rowid,
                  key: rowid
              }, {
                  "default": function () {
                      return (vue.openBlock(true),
                          vue.createBlock(vue.Fragment, null, CxTable.flatColumns.map(function (col) { return (vue.openBlock(),
                              vue.createBlock(vue.Fragment, null, [
                                  props.fixed && props.fixed !== 'bottom' && col.fixed !== props.fixed
                                      ? vue.createCommentVNode('v-if', true)
                                      : (vue.openBlock(),
                                          vue.createBlock(Cell, { rowData: rowData, rowIndex: rowIndex, column: col, sum: sum, empty: empty, key: col._colid }, null, exports.PATCH_FLAG.PROPS, ['rowData', 'rowIndex', 'column', 'sum', 'empty']))
                              ])); }), exports.PATCH_FLAG.KEYED_FRAGMENT));
                  }
              }, exports.PATCH_FLAG.PROPS | exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.DYNAMIC_SLOTS, ['rowData', 'rowIndex', 'activedRow', 'rowid', 'key']);
          };
          // body主体内容渲染
          var renderContent = function () {
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      props.fixed === 'bottom' || props.onlyTotal
                          ? vue.createCommentVNode('v-if', true)
                          : (vue.openBlock(true),
                              vue.createBlock(vue.Fragment, null, (function () {
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
                                          result.push(vue.createVNode(Expand, { rowData: rowData, rowIndex: rowIndex + indexPrepend, fixed: props.fixed }, null, exports.PATCH_FLAG.FULL_PROPS));
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
                              })(), exports.PATCH_FLAG.KEYED_FRAGMENT))
                  ]));
          };
          // 添加按钮渲染
          var renderAddBtn = function () {
              return vue.createVNode(TableAddBtn, { fixed: props.fixed, tableData: props.tableData }, null, exports.PATCH_FLAG.PROPS, ['fixed', 'tableData']);
          };
          var hideTotalSum = vue.ref(false);
          vue.watchEffect(function () {
              var _a;
              hideTotalSum.value =
                  (rootProp.virtualScroll &&
                      props.fixed !== 'bottom' &&
                      !props.onlyTotal &&
                      CxTable.virtualStore.renderEndIndex < rootProp.tableData.length) ||
                      (((!rootProp.showTotalSum && !rootProp.showForm) || ((_a = props.tableData) === null || _a === void 0 ? void 0 : _a.length) <= 0) &&
                          !rootProp.showAddBtn &&
                          !props.float);
          });
          var transferOtherSum = function (columns) {
              var result = {};
              columns.forEach(function (_a) {
                  var prop = _a.prop, sum = _a.sum;
                  if (sum === 'add' || !isString$1(sum))
                      return;
                  result[prop] = sum;
              });
              return result;
          };
          // 合计行渲染
          var renderTotalSum = function () {
              var _a;
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      hideTotalSum.value
                          ? vue.createCommentVNode('v-if', true)
                          : isObject$1(rootProp.customTotalSum)
                              ? renderRow(Object.assign({}, rootProp.customTotalSum), CX_TABLE_SUM_INDEX, true)
                              : isObject$1(CxTable.entireTotalSum)
                                  ? renderRow(R__namespace.mergeLeft(transferOtherSum(CxTable.flatColumns), CxTable.entireTotalSum), CX_TABLE_SUM_INDEX, true)
                                  : renderRow(getTotalSumData(CxTable.flatColumns, (_a = rootProp.tableData) !== null && _a !== void 0 ? _a : []), CX_TABLE_SUM_INDEX, true)
                  ]));
          };
          // 基准style对象,根据不同的元素取出不同的项
          var style = useTableStyle(props, CxTable, 'body');
          var tableStyle = vue.computed(function () {
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
          var bodyWrapperStyle = vue.computed(function () {
              return pick(style.value, ['right', 'bottom', 'top', 'height', 'width']);
          });
          // 不宜使用computed
          var tableClass = vue.ref('');
          vue.watchEffect(function () {
              tableClass.value = rootProp.stripe || rootProp.showForm ? 'stripe' : '';
          });
          return function () { return (vue.openBlock(),
              vue.createBlock('div', { "class": hoisted_2, style: bodyWrapperStyle.value }, [
                  vue.createVNode('table', { style: tableStyle.value, "class": tableClass.value }, [vue.createVNode('tbody', null, [renderContent(), renderAddBtn(), renderTotalSum()])], exports.PATCH_FLAG.STYLE),
                  (vue.openBlock(),
                      vue.createBlock(vue.Fragment, null, [
                          props.fixed === 'bottom'
                              ? vue.createVNode(FixedBottom, { tableData: props.tableData }, null, exports.PATCH_FLAG.PROPS | exports.PATCH_FLAG.NEED_PATCH, ['tableData'])
                              : vue.createCommentVNode('v-if_fixed_bottom', true)
                      ], exports.PATCH_FLAG.STABLE_FRAGMENT))
              ], exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.STYLE)); };
      }
  });

  var CxTableContent = vue.defineComponent({
      name: 'CxTableContent',
      props: {
          fixed: { type: String, "default": '' },
          tableData: { type: Array, "default": function () { return []; } }
      },
      setup: function (props) {
          var CxTable = vue.inject('CxTable');
          var style = useTableStyle(props, CxTable, 'table');
          var classList = useTableClass(props, CxTable);
          return function () {
              var fixed = props.fixed;
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      [
                          (vue.openBlock(),
                              vue.createBlock(vue.Fragment, null, [
                                  fixed !== 'bottom'
                                      ? vue.createVNode(CxTableHead, { "class": classList.value, style: style.value, fixed: fixed }, null, exports.PATCH_FLAG.FULL_PROPS | exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.STYLE)
                                      : vue.createCommentVNode('v-if_table_bottom', true)
                              ], exports.PATCH_FLAG.STABLE_FRAGMENT)),
                          (vue.openBlock(),
                              vue.createBlock(vue.Fragment, null, [
                                  fixed !== 'top'
                                      ? vue.createVNode(CxTableBody, {
                                          tableData: props.tableData,
                                          "class": classList.value,
                                          style: style.value,
                                          fixed: fixed
                                      }, null, exports.PATCH_FLAG.FULL_PROPS | exports.PATCH_FLAG.CLASS | exports.PATCH_FLAG.STYLE)
                                      : vue.createCommentVNode('v-if_table_top', true)
                              ], exports.PATCH_FLAG.STABLE_FRAGMENT))
                      ]
                  ]));
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
  var script$4 = {
      name: 'Empty',
  };

  const _hoisted_1$3 = { class: "cx_flex_center cx_flex_d_column cx_justify_center" };
  const _hoisted_2$1 = /*#__PURE__*/vue.createStaticVNode("<div class=\"cx_h_100\"><svg width=\"120\" height=\"100\" viewBox=\"0 0 184 152\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(24 31.67)\"><ellipse fill-opacity=\".8\" fill=\"#F5F5F7\" cx=\"67.797\" cy=\"106.89\" rx=\"67.797\" ry=\"12.668\"></ellipse><path d=\"M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z\" fill=\"#AEB8C2\"></path><path d=\"M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z\" fill=\"url(#linearGradient-1)\" transform=\"translate(13.56)\"></path><path d=\"M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z\" fill=\"#F5F5F7\"></path><path d=\"M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z\" fill=\"#DCE0E6\"></path></g><path d=\"M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z\" fill=\"#DCE0E6\"></path><g transform=\"translate(149.65 15.383)\" fill=\"#FFF\"><ellipse cx=\"20.654\" cy=\"3.167\" rx=\"2.849\" ry=\"2.815\"></ellipse><path d=\"M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z\"></path></g></g></svg></div><p>暂无数据</p>", 2);
  const _hoisted_4$1 = [
    _hoisted_2$1
  ];

  function render$3(_ctx, _cache) {
    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, _hoisted_4$1))
  }

  script$4.render = render$3;
  script$4.__file = "src/lib/cx-table/src/components/empty.vue";

  var CxTableEmpty = vue.defineComponent({
      name: 'CxTableEmpty',
      setup: function () {
          var CxTable = vue.inject('CxTable');
          var hoisted_1 = { style: { height: '150px' } };
          var hoisted_2 = { "class": 'cx-table_empty' };
          return function () {
              var rowspan = CxTable.flatColumns.length;
              return (vue.openBlock(),
                  vue.createBlock('div', hoisted_1, [
                      vue.createVNode('table', hoisted_2, [
                          vue.createVNode('tbody', null, [
                              vue.createVNode('tr', null, [
                                  vue.createVNode('td', { rowspan: rowspan }, [
                                      (function () {
                                          vue.setBlockTracking(-1);
                                          var node = vue.createVNode(script$4);
                                          vue.setBlockTracking(1);
                                          return node;
                                      })()
                                  ], exports.PATCH_FLAG.PROPS, ['rowspan'])
                              ])
                          ])
                      ])
                  ]));
          };
      }
  });

  var Pagination = vue.defineComponent({
      name: 'CxTablePagination',
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
          var Pagination = vue.resolveComponent('ElPagination');
          return function () {
              return vue.createVNode(Pagination, {
                  "class": 'cx_align_right cx_p_20',
                  background: true,
                  currentPage: props.pagination.currentPage,
                  pageSizes: props.pagination.pageSizes,
                  pageSize: props.pagination.pageCapacity,
                  layout: hoisted_1,
                  total: props.pagination.total,
                  onSizeChange: handleSizeChange,
                  onCurrentChange: handleCurrentChange
              }, null, exports.PATCH_FLAG.FULL_PROPS);
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
      var devTip = R__namespace.tap(unsafeWhenDevCall(function (dynamic) {
          return console.info("[CxTable]:dynamic form auto fetchData by config ", changeDynamicIdToText(dynamic));
      }));
      var errorDevTip = unsafeWhenDevCall(function (dynamic) {
          cxTableWarn("can't match api by config ", changeDynamicIdToText(dynamic));
      });
      var initRequestParams = function (rootProp, form, currentFormItems, tableDataVisitor) {
          var setItems = R__namespace.set(R__namespace.lensProp('items'), getParamsItems(form, currentFormItems));
          var mergeSort = R__namespace.mergeLeft(R__namespace.zipObj(['sortDirection', 'sortProp'], [tableDataVisitor.sortStatus, tableDataVisitor.sortProp]));
          var mergePagination = R__namespace.mergeLeft(R__namespace.pick(['currentPage', 'pageCapacity'], R__namespace.prop('pagination', rootProp)));
          return R__namespace.compose(setItems, mergeSort, mergePagination, R__namespace.prop('dynamic'))(rootProp);
      };
      var updateTableData = R__namespace.curryN(2, function (data, rootProp) {
          var _a, _b;
          var rows = data.rows, total = data.total;
          isNumber(total) && Maybe.of(rootProp.pagination).map(unsafeSet(R__namespace.__, 'total', total));
          if (!Array.isArray(rows))
              return;
          if (R__namespace.isEmpty(rows) && R__namespace.gt(R__namespace.defaultTo(0, (_a = rootProp.pagination) === null || _a === void 0 ? void 0 : _a.currentPage), 1)) {
              rootProp.pagination.currentPage--;
          }
          else {
              R__namespace.compose(R__namespace.when(R__namespace.is(Array), unsafeClearPush(R__namespace.__, rootProp.tableData)), R__namespace.ifElse(R__namespace.is(Function), function (cb) { return cb(rows, data); }, R__namespace.always(rows)))((_b = rootProp.hooks) === null || _b === void 0 ? void 0 : _b.onSearch);
          }
      });
      var updateTotal = R__namespace.useWith(unsafeClearAssign, [
          R__namespace.identity,
          R__namespace.prop('entireTotalSum')
      ]);
      var checkDynamic = function (dynamic) {
          if (!dynamic) {
              throw cxTableWarn("can't fetch data if dynamic ", dynamic, " is invalid");
          }
      };
      var matchedRule = R__namespace.compose(getMaybeValue, R__namespace.converge(getConfigByDynamicConfig, [
          R__namespace.identity,
          R__namespace.compose(R__namespace.prop(R__namespace.__, context.dynamicFormContext.requestApiMap), R__namespace.prop('moduleType'))
      ]));
      var search = function (rootProp, form, currentFormItems, tableDataVisitor) { return __awaiter(void 0, void 0, void 0, function () {
          var dynamic, matchedRuleEither;
          return __generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      dynamic = rootProp.dynamic;
                      checkDynamic(dynamic);
                      matchedRuleEither = R__namespace.compose(R__namespace.ifElse(R__namespace.isNil, Left.of, Right.of), matchedRule);
                      return [4 /*yield*/, either(withParams(errorDevTip, [dynamic]), function (rule) { return __awaiter(void 0, void 0, void 0, function () {
                              var rulePropVal, stateEq200, _a;
                              return __generator(this, function (_b) {
                                  switch (_b.label) {
                                      case 0:
                                          devTip(dynamic);
                                          rulePropVal = R__namespace.prop(R__namespace.__, rule);
                                          stateEq200 = R__namespace.propEq('state', 200);
                                          _a = R__namespace.when(stateEq200, R__namespace.compose(updateTableData(R__namespace.__, rootProp), R__namespace.prop('data')));
                                          return [4 /*yield*/, rulePropVal('requestInstance').postJSON(rulePropVal('api'), initRequestParams(rootProp, form, currentFormItems, tableDataVisitor))];
                                      case 1:
                                          _a.apply(void 0, [_b.sent()]);
                                          return [2 /*return*/];
                                  }
                              });
                          }); }, matchedRuleEither(dynamic))];
                  case 1: return [2 /*return*/, _a.sent()];
              }
          });
      }); };
      var searchTotal = function (rootProp, form, currentFormItems, tableDataVisitor, CxTable) { return __awaiter(void 0, void 0, void 0, function () {
          var dynamic, matchedRuleEither;
          return __generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      dynamic = rootProp.dynamic;
                      checkDynamic(dynamic);
                      matchedRuleEither = R__namespace.compose(R__namespace.ifElse(R__namespace.isNil, Left.of, Right.of), matchedRule);
                      return [4 /*yield*/, either(R__namespace.converge(errorDevTip, [R__namespace.always(dynamic)]), function (rule) { return __awaiter(void 0, void 0, void 0, function () {
                              var rulePropVal, stateEq200, requestInstance, getTotals, _a;
                              return __generator(this, function (_b) {
                                  switch (_b.label) {
                                      case 0:
                                          rulePropVal = R__namespace.prop(R__namespace.__, rule);
                                          stateEq200 = R__namespace.propEq('state', 200);
                                          requestInstance = rulePropVal('requestInstance');
                                          getTotals = R__namespace.compose(getMaybeValue, map$1(R__namespace.objOf('totals')), map$1(R__namespace.map(R__namespace.prop('prop'))), map$1(R__namespace.filter(R__namespace.compose(truthy, R__namespace.prop('sum')))), map$1(R__namespace.prop('flatColumns')), Maybe.of);
                                          _a = R__namespace.when(stateEq200, R__namespace.compose(R__namespace.curryN(3, R__namespace.call)(updateTotal, R__namespace.__, CxTable), R__namespace.prop('data')));
                                          return [4 /*yield*/, R__namespace.compose(R__namespace.ifElse(R__namespace.compose(arrNotEmpty, R__namespace.prop('totals')), R__namespace.compose(R__namespace.converge(requestInstance.postJSON.bind(requestInstance), [
                                                  R__namespace.always('/header/total'),
                                                  R__namespace.identity
                                              ]), R__namespace.mergeLeft(initRequestParams(rootProp, form, currentFormItems, tableDataVisitor))), defaultPromise({})), getTotals)(CxTable)];
                                      case 1:
                                          _a.apply(void 0, [_b.sent()]);
                                          return [2 /*return*/];
                                  }
                              });
                          }); }, matchedRuleEither(dynamic))];
                  case 1: return [2 /*return*/, _a.sent()];
              }
          });
      }); };
      return { initRequestParams: initRequestParams, updateTableData: updateTableData, search: search, searchTotal: searchTotal };
  };

  var TeleFormInstance = vue.defineComponent({
      name: 'TeleFormInstance',
      emits: ['change', 'close'],
      props: {
          form: { type: Object, required: true },
          items: { type: Array, required: true },
          states: { type: Object, required: true }
      },
      setup: function (props, _a) {
          var emit = _a.emit, slots = _a.slots;
          var curryEmit = R__namespace.curryN(2, emit);
          return function (_, cache) {
              var _a, _b;
              return vue.createVNode('div', { style: { display: ((_b = (_a = props.states) === null || _a === void 0 ? void 0 : _a.visible) !== null && _b !== void 0 ? _b : true) ? 'block' : 'none' } }, [
                  vue.createVNode(_CX_FORM, {
                      form: props.form,
                      items: props.items,
                      formAttrs: { labelPosition: 'top', labelSuffix: '' },
                      onChange: cache[0] || (cache[0] = curryEmit('change')),
                      onClose: cache[1] || (cache[1] = curryEmit('close'))
                  }, { add: function () { var _a, _b; return [(_b = (_a = slots.add) === null || _a === void 0 ? void 0 : _a.call(slots)) !== null && _b !== void 0 ? _b : '']; } }, exports.PATCH_FLAG.PROPS, ['form', 'items'])
              ], exports.PATCH_FLAG.STYLE);
          };
      }
  });

  function useState(initValue) {
      var state = vue.ref(initValue);
      var getState = (function (isRef) { return (isRef ? state : vue.unref(state)); });
      return [getState, function (val) { return (state.value = val); }];
  }
  function isWritableComputedOptions(arg) {
      return typeof arg === 'object' && Reflect.has(arg || {}, 'set');
  }
  function useComputed(arg) {
      var data = isWritableComputedOptions(arg) ? vue.computed(arg) : vue.computed(arg);
      var getData = function (isRef) { return (isRef ? data : data.value); };
      if (!isWritableComputedOptions(arg)) {
          return getData;
      }
      return [getData, function (val) { return (data.value = val); }];
  }
  function useSync(props, emit, arr) {
      if (arr === void 0) { arr = []; }
      if (!arr.length)
          return [];
      return arr.reduce(function (p, c) {
          var option = vue.computed({
              get: function () { return props[c]; },
              set: function (value) { return emit("update:" + c, value); }
          });
          p.push(option);
          return p;
      }, []);
  }

  var DynamicFormAdd = vue.defineComponent({
      name: 'DynamicFormAdd',
      props: {
          options: { type: Array, "default": function () { return []; } },
          modelValue: { type: Array, required: true }
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
          var toggleVisible = R__namespace.compose(setVisible, R__namespace.not, visible);
          var addItem = function (id) {
              R__namespace.compose(setModelProxy, R__namespace.uniq, R__namespace.append(id), modelProxy)();
          };
          var matchPinyinSearch = function (str) {
              return R__namespace.ifElse(R__namespace.isEmpty, R__namespace.T, R__namespace.curryN(2, PinyinMatch__default['default'].match)(str))(searchContent());
          };
          var currentOptions = useComputed(function () {
              return R__namespace.filter(R__namespace.allPass([
                  R__namespace.compose(R__namespace.not, R__namespace.includes(R__namespace.__, modelProxy()), R__namespace.prop('id')),
                  R__namespace.compose(matchPinyinSearch, R__namespace.prop('name'))
              ]))(props.options);
          });
          var _d = __read(useState(''), 2), searchContent = _d[0], setSearchContent = _d[1];
          var _hoisted_component_1 = vue.resolveComponent('ElPopover');
          var _hoisted_component_2 = vue.resolveComponent('CxBtn');
          var _hoisted_component_3 = vue.resolveComponent('ElInput');
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
          return function (_, cache) {
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      vue.createVNode(_hoisted_component_1, {
                          visible: visible(),
                          'onUpdate:visible': setVisible,
                          placement: 'right-start',
                          width: 240,
                          showArrow: false
                      }, {
                          reference: function () {
                              return vue.createVNode(_hoisted_component_2, {
                                  onClick: toggleVisible,
                                  icon: 'tianjia',
                                  "class": _hoisted_class_3,
                                  style: {
                                      marginTop: props.modelValue.length ? '32px' : 0,
                                      backgroundColor: '#f0f5ff'
                                  }
                              }, null, exports.PATCH_FLAG.STYLE);
                          },
                          "default": function () {
                              return (vue.openBlock(),
                                  vue.createBlock(vue.Fragment, null, [
                                      vue.createVNode(_hoisted_component_3, {
                                          size: 'mini',
                                          "class": _hoisted_class_1,
                                          suffixIcon: 'iconfont icon-sousuo',
                                          modelValue: searchContent(),
                                          'onUpdate:modelValue': setSearchContent,
                                          placeholder: '搜索过滤条件'
                                      }, null, exports.PATCH_FLAG.PROPS, ['modelValue']),
                                      [
                                          (vue.openBlock(),
                                              vue.createBlock(vue.Fragment, null, [
                                                  currentOptions().length
                                                      ? vue.createVNode('div', _hoisted_attrs_1, [
                                                          (vue.openBlock(),
                                                              vue.createBlock(vue.Fragment, null, currentOptions().map(function (option) {
                                                                  return vue.createVNode('div', {
                                                                      key: option.id,
                                                                      "class": _hoisted_class_2,
                                                                      onClick: R__namespace.useWith(addItem, [R__namespace.always(option.id)])
                                                                  }, option.name, exports.PATCH_FLAG.PROPS, ['key']);
                                                              }), exports.PATCH_FLAG.KEYED_FRAGMENT))
                                                      ])
                                                      : cache[0] ||
                                                          (cache[0] = vue.createVNode('div', { "class": _hoisted_class_4 }, '暂无数据'))
                                              ]))
                                      ]
                                  ]));
                          }
                      }, exports.PATCH_FLAG.PROPS, ['visible'])
                  ]));
          };
      }
  });

  var DynamicFilterBtn = vue.defineComponent({
      name: 'DynamicFilterBtn',
      props: { states: { type: Object, required: true } },
      emits: ['click'],
      setup: function (props, _a) {
          var emit = _a.emit;
          var color = vue.computed(function () {
              var _a;
              return ((_a = props.states) === null || _a === void 0 ? void 0 : _a.visible) ? '#0084ff' : 'rgba(0,0,0,.85)';
          });
          return function (_, cache) {
              return vue.createVNode(_CX_BTN, {
                  onClick: cache[0] || (cache[0] = function () { return emit('click'); }),
                  icon: 'filtershaixuan',
                  content: '筛选',
                  style: { color: color.value, borderColor: color.value }
              }, null, exports.PATCH_FLAG.STYLE | exports.PATCH_FLAG.FULL_PROPS);
          };
      }
  });

  var TeleForm = vue.defineComponent({
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
          var _hoisted_direction = vue.resolveDirective('loading');
          var rootProp = vue.inject('rootProp');
          var bus = vue.inject('bus');
          var CxTable = vue.inject('CxTable');
          var cache = useDynamicFormCache(rootProp);
          var _b = useCxTableCompose(), getOptionListFromColumn = _b.getOptionListFromColumn, getCurrentFormConfig = _b.getCurrentFormConfig, isRenderInTeleport = _b.isRenderInTeleport, isEmptyValue = _b.isEmptyValue, isPositive = _b.isPositive, arrayIsNotEmpty = _b.arrayIsNotEmpty, getTargetColumnDefault = _b.getTargetColumnDefault;
          var _c = useDynamicFormSearch(), search = _c.search, searchTotal = _c.searchTotal;
          // 当前展示的表单项
          var currentFormItems = vue.reactive(R__namespace.defaultTo([], cache.getFormCacheIO.unsafePerformIO()));
          var getCurrentFormItems = R__namespace.always(currentFormItems);
          var oldCurrentFormItems = __spreadArray([], __read(currentFormItems));
          vue.watch(getCurrentFormItems, function () {
              var defaultNotEmpty = R__namespace.find(R__namespace.compose(R__namespace.not, R__namespace.isNil, R__namespace.path(['searchStates', 'searchDefault']), R__namespace.flip(R__namespace.find)(props.dynamicColumn), R__namespace.curryN(2, R__namespace.pathEq)(['prop'])));
              R__namespace.when(R__namespace.allPass([arrayIsNotEmpty, defaultNotEmpty]), R__namespace.compose(fetchAllData, R__namespace.forEach(setDefaultValueByProp)))(R__namespace.difference(currentFormItems, oldCurrentFormItems));
              unsafeClearPush(currentFormItems, oldCurrentFormItems);
          }, { deep: true });
          // 表单
          var form = vue.reactive({});
          var initForm = function (form) {
              unsafeClearObj(form);
              currentFormItems.forEach(setDefaultValueByProp);
          };
          var getDefaultValueByProp = R__namespace.compose(getTargetColumnDefault, R__namespace.converge(getTargetColumn, [R__namespace.identical, function () { return props.dynamicColumn; }]));
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
          var formConfig = vue.reactive([]);
          // 允许的表单项{id,name}[]
          var searchableOptionList = vue.reactive([]);
          var setSearchableOptionList = unsafeClearPush(R__namespace.__, searchableOptionList);
          var unsafeUpdateConfig = function () {
              return unsafeClearPush(getCurrentFormConfig(props.dynamicColumn, currentFormItems), formConfig);
          };
          vue.watch(getCurrentFormItems, R__namespace.compose(unsafeUpdateConfig, function (val) {
              cache.setFormCacheIO.unsafePerformIO(val);
          }), { deep: true });
          var fetchTableData = debounce(function () {
              setLoading(true);
              unsafeClearArray(rootProp.tableData);
              search(rootProp, form, currentFormItems, props.tableDataVisitor)["finally"](function () {
                  setLoading(false);
              });
          }, 100);
          var fetchAllData = debounce(function () { return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          fetchTableData();
                          return [4 /*yield*/, vue.nextTick()];
                      case 1:
                          _a.sent();
                          CxTable.entireTotalSum = {};
                          R__namespace.when(R__namespace.prop('showForm'), R__namespace.converge(searchTotal, [
                              R__namespace.always(rootProp),
                              R__namespace.always(form),
                              R__namespace.always(currentFormItems),
                              R__namespace.always(props.tableDataVisitor),
                              R__namespace.always(CxTable)
                          ]))(rootProp);
                          return [2 /*return*/];
                  }
              });
          }); }, 50);
          var onSearch = nextTimeout(function (payload) {
              // 处理states
              R__namespace.when(R__namespace.compose(R__namespace.not, R__namespace.prop('visible')), toggleVisibleStates)(states);
              // 处理payload
              R__namespace.when(R__namespace.is(Object), R__namespace.compose(unsafePush(R__namespace.__, currentFormItems), R__namespace.flip(R__namespace.difference)(currentFormItems), R__namespace.keys, R__namespace.tap(unsafeAssign(R__namespace.__, form)), R__namespace.pick(R__namespace.map(R__namespace.prop('id'), getOptionListFromColumn(props.dynamicColumn)))))(payload);
              fetchAllData();
          });
          bus.on('search', onSearch);
          var onClose = function (prop) {
              R__namespace.compose(R__namespace.when(isPositive, unsafeRemoveItem(R__namespace.__, currentFormItems)), R__namespace.findIndex(R__namespace.equals(prop)))(currentFormItems);
              var value = form[prop];
              var removeItemFromConfig = unsafeRemoveItem(R__namespace.__, formConfig);
              var removePropFromForm = function () { return Reflect.deleteProperty(form, prop); };
              var reFetchData = R__namespace.compose(R__namespace.unless(isEmptyValue, fetchAllData), R__namespace.always(value));
              var initForm = R__namespace.compose(removePropFromForm, removeItemFromConfig);
              R__namespace.compose(R__namespace.when(isPositive, R__namespace.compose(reFetchData, initForm)), R__namespace.findIndex(R__namespace.pathEq(['prop'], prop)))(formConfig);
          };
          var renderDynamicFormAdd = function () {
              return vue.createVNode(DynamicFormAdd, {
                  options: searchableOptionList,
                  modelValue: currentFormItems,
                  'onUpdate:modelValue': unsafeClearPush(R__namespace.__, currentFormItems)
              }, null, exports.PATCH_FLAG.FULL_PROPS);
          };
          var states = vue.reactive(cache.getVisibleCacheIO.map(R__namespace.compose(R__namespace.objOf('visible'), truthy)).unsafePerformIO());
          var toggleVisibleStates = function () { return (states.visible = !states.visible); };
          vue.watch(function () { return states.visible; }, cache.setVisibleCacheIO.unsafePerformIO.bind(cache.setVisibleCacheIO));
          var _hoisted_attrs_1 = { "class": 'cx_dp_flex cx_justify_end cx_mb_16' };
          var _hoisted_attrs_2 = { "class": 'cx_line cx_mb_12 cx_mlr_0 cx_w_100p' };
          var _hoisted_attrs_3 = { "class": 'cx_dp_flex' };
          var _hoisted_node_1 = vue.createVNode('div', _hoisted_attrs_2);
          var renderForm = function () {
              return vue.createVNode('div', { "class": 'cx-table_tele_form' }, [
                  vue.createVNode('div', _hoisted_attrs_1, [
                      vue.createVNode(DynamicFilterBtn, {
                          onClick: toggleVisibleStates,
                          states: states
                      })
                  ]),
                  _hoisted_node_1,
                  vue.createVNode('div', _hoisted_attrs_3, [
                      vue.withDirectives(vue.createVNode(TeleFormInstance, { states: states, form: form, items: formConfig, onChange: fetchAllData, onClose: onClose }, { add: renderDynamicFormAdd }, exports.PATCH_FLAG.FULL_PROPS), [[_hoisted_direction !== null && _hoisted_direction !== void 0 ? _hoisted_direction : {}, formLoading()]])
                  ])
              ]);
          };
          // unsafeClearDom::void->string
          var unsafeClearEle = R__namespace.compose(map$1(unsafeSet(R__namespace.__, 'innerHTML', '')), Maybe.of);
          // renderVNodeToDom::HTMLElement->void
          var renderVNodeToDom = R__namespace.compose(R__namespace.converge(vue.render, [renderForm, R__namespace.identity]), R__namespace.tap(unsafeClearEle), R__namespace.tap(unsafeDeleteProperty(R__namespace.__, '_vnode')));
          var unsafeWarn = function () {
              return cxTableWarn("can't find container element by selector", rootProp.formTeleport);
          };
          // 组件更新IO
          var updateComponentIO = IO.of(queryDom).map(R__namespace.ifElse(R__namespace.isNil, R__namespace.compose(unsafeWarn, unsafeClearEle, container), R__namespace.compose(map$1(renderVNodeToDom), Maybe.of, setContainer)));
          vue.watch(function () { return props.dynamicColumn; }, function () { return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, vue.nextTick()];
                      case 1:
                          _a.sent();
                          unsafeUpdateConfig();
                          cache.getFormCacheIO
                              .map(R__namespace.compose(unsafeClearPush(R__namespace.__, currentFormItems), R__namespace.defaultTo([])))
                              .unsafePerformIO();
                          initForm(form);
                          setSearchableOptionList(getOptionListFromColumn(props.dynamicColumn));
                          setFormLoading(false);
                          fetchAllData();
                          R__namespace.ifElse(isRenderInTeleport, R__namespace.always(updateComponentIO), getDoNothingIO)(rootProp).unsafePerformIO(rootProp.formTeleport);
                          return [2 /*return*/];
                  }
              });
          }); });
          vue.watch(function () { return rootProp.dynamic; }, function () {
              setFormLoading(true);
              cache.getVisibleCacheIO
                  .map(R__namespace.compose(unsafeSet(states, 'visible'), truthy))
                  .unsafePerformIO();
          });
          vue.watch([function () { var _a; return (_a = rootProp.pagination) === null || _a === void 0 ? void 0 : _a.currentPage; }, function () { var _a; return (_a = rootProp.pagination) === null || _a === void 0 ? void 0 : _a.pageCapacity; }], fetchTableData);
          return withParams(R__namespace.ifElse(isRenderInTeleport, R__namespace.always(''), renderForm), [rootProp]);
      }
  });

  //
  var script$3 = vue.defineComponent({
      name: 'Ellipsis',
      props: {
          content: { type: [String, Number], "default": '' },
          activeBgColor: { type: String, "default": '#fff' },
          placement: {
              type: String,
              "default": 'left'
          }
      },
      setup: function (props, _a) {
          var expose = _a.expose;
          var refOneEllipsis = vue.ref();
          var refContent = vue.ref();
          var tipVisible = vue.ref(false);
          var paddingRight = vue.ref('0');
          function calcContentWidth() {
              var _a;
              return __awaiter(this, void 0, void 0, function () {
                  var el, pW, wrapW, pdLeft, pdRight, realWidth;
                  return __generator(this, function (_b) {
                      el = refContent.value;
                      if (!el || !refOneEllipsis.value)
                          return [2 /*return*/];
                      pW = el === null || el === void 0 ? void 0 : el.clientWidth;
                      wrapW = ((_a = refOneEllipsis.value) === null || _a === void 0 ? void 0 : _a.clientWidth) || 80;
                      pdLeft = parseFloat(getComputedStyle(refOneEllipsis.value).paddingLeft);
                      pdRight = parseFloat(getComputedStyle(refOneEllipsis.value).paddingRight);
                      paddingRight.value = pdRight + 'px';
                      realWidth = wrapW - pdLeft - pdRight;
                      tipVisible.value = pW > realWidth;
                      return [2 /*return*/];
                  });
              });
          }
          var resizeFn = function () { return calcContentWidth(); };
          vue.onMounted(function () {
              var conentP = refContent.value;
              calcContentWidth();
              addResizeListener(conentP, resizeFn);
              vue.onUnmounted(function () {
                  removeResizeListener(conentP, resizeFn);
              });
          });
          expose({
              calcContentWidth: calcContentWidth
          });
          var popperConfig = vue.reactive({
              text: props.content,
              visible: tipVisible.value,
              controlType: 'mouse',
              placement: props.placement
          });
          vue.watch([function () { return props.content; }, function () { return props.placement; }, tipVisible], function (_a) {
              var _b = __read(_a, 3), content = _b[0], placement = _b[1], tipVisible = _b[2];
              popperConfig.text = content;
              popperConfig.placement = placement;
              popperConfig.visible = tipVisible;
          });
          return {
              popperConfig: popperConfig,
              refOneEllipsis: refOneEllipsis,
              tipVisible: tipVisible,
              paddingRight: paddingRight,
              refContent: refContent
          };
      }
  });

  const _hoisted_1$2 = { style: {"overflow":"hidden"} };

  function render$2(_ctx, _cache) {
    const _directive_uni_popper = vue.resolveDirective("uni-popper");

    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      ref: "refOneEllipsis",
      class: vue.normalizeClass(["one-ellipsis", { ellipsis: _ctx.tipVisible }]),
      style: vue.normalizeStyle({ '--paddingRight': _ctx.paddingRight, '--bgColor': _ctx.activeBgColor })
    }, [
      vue.createElementVNode("div", _hoisted_1$2, [
        vue.createElementVNode("p", {
          ref: "refContent",
          class: "note-tooltip"
        }, vue.toDisplayString(_ctx.content), 513 /* TEXT, NEED_PATCH */)
      ])
    ], 6 /* CLASS, STYLE */)), [
      [_directive_uni_popper, _ctx.popperConfig]
    ])
  }

  script$3.render = render$2;
  script$3.__scopeId = "data-v-395547cc";
  script$3.__file = "src/lib/cx-table/src/components/ellipsis/index.vue";

  function useCxDialog() {
      var dialogRef = vue.ref(null);
      function register(instance) {
          vue.onUnmounted(function () {
              dialogRef.value = null;
          });
          dialogRef.value = instance;
      }
      function getDialogInstance() {
          var dialog = vue.unref(dialogRef);
          if (!dialog) {
              throw new Error('dialog is undefined!');
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

  var DEFAULT_CAPACITY = 10;
  var cacheListDialog = vue.defineComponent({
      name: 'CacheListDialog',
      setup: function (_, _a) {
          var _b;
          var expose = _a.expose;
          var rootProp = vue.inject('rootProp');
          var rootSlots = vue.inject('rootSlots');
          var $CxTable = vue.inject('CxTable');
          var bus = vue.inject('bus');
          var _c = useCxTableCompose(), getParamsItems = _c.getParamsItems, getConfigByDynamicConfig = _c.getConfigByDynamicConfig, arrNotEmpty = _c.arrNotEmpty;
          var context = useCxTable().getContext();
          var getDefaultRequestInstance = (function () {
              return R__namespace.path(['dynamicCacheContext', 'requestInstance', 'default'], context);
          });
          var getRequestApiMap = (function () {
              return R__namespace.path(['dynamicCacheContext', 'requestApiMap'], context);
          });
          var getRemoveApiMap = (function () {
              return R__namespace.path(['dynamicCacheContext', 'removeApiMap'], context);
          });
          var getLabelConfig = (function () {
              return R__namespace.path(['dynamicCacheContext', 'cacheLabelConfig'], context);
          });
          var getTabCondition = (function () {
              return R__namespace.path(['dynamicCacheContext', 'cacheTypeTab'], context);
          });
          var getMessageInstance = (function () { return R__namespace.path(['messageInstance'], context); });
          var needTypeTab = R__namespace.ifElse(R__namespace.is(Function), function (condition) { return condition(rootProp); }, R__namespace.T);
          var _d = __read(useCxDialog(), 2), register = _d[0], dialogExpose = _d[1];
          var openDialog = function () {
              resetForm();
              resetPage();
              setCurrentType(exports.TypeOption.未提交);
              dialogExpose.openDialog();
          };
          expose({
              openDialog: openDialog
          });
          var _e = __read(useState(exports.TypeOption.未提交), 2), currentType = _e[0], setCurrentType = _e[1];
          var typeOptionList = useEnumOptions(exports.TypeOption);
          var resetPage = function () {
              setActiveItem(null);
              unsafeClearArray(orderList());
              setHasDone(false);
          };
          // ------------------------------ 表单 ------------------------------
          var form = vue.reactive({ gmtCreate: [] });
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
          var tableData = useComputed(R__namespace.compose(R__namespace.prop('rows'), R__namespace.prop('content'), R__namespace.defaultTo({}), activeItem));
          var tableConfig = vue.reactive({ items: [] });
          var setTableConfig = unsafeClearPush(R__namespace.__, tableConfig.items);
          var _j = __read(useState([]), 2), globalConfig = _j[0], setGlobalConfig = _j[1];
          var getGlobalConfig = R__namespace.nAry(0, globalConfig);
          var initTableConfig = R__namespace.ifElse(R__namespace.is(Array), R__namespace.map(CxConfigAdaptor.of), R__namespace.always([]));
          var initAndSetConfig = R__namespace.compose(setTableConfig, initTableConfig);
          vue.watch(function () { return activeItem(); }, R__namespace.compose(R__namespace.ifElse(arrNotEmpty, initAndSetConfig, R__namespace.converge(initAndSetConfig, [getGlobalConfig])), R__namespace.prop('table'), R__namespace.defaultTo({})));
          // ------------------------------ api ------------------------------
          // paramsGenerator::DYNAMIC_CONFIG|undefined->AnyObject->Params
          var paramsGenerator = function (dynamic, form) {
              var getItemObj = R__namespace.compose(R__namespace.objOf('items'), R__namespace.converge(getParamsItems, [R__namespace.identity, R__namespace.always(R__namespace.of('gmtCreate'))]));
              var mergeDynamic = R__namespace.mergeLeft(R__namespace.defaultTo({}, dynamic));
              var mergePage = R__namespace.mergeLeft(R__namespace.zipObj(['queryIndex', 'pageCapacity'], [R__namespace.length(orderList()), DEFAULT_CAPACITY]));
              var mergeOrderType = R__namespace.when(R__namespace.compose(truthy, R__namespace.nAry(0, currentType)), R__namespace.mergeLeft(R__namespace.objOf('orderType', currentType())));
              return R__namespace.compose(Maybe.of, mergeOrderType, mergeDynamic, mergePage, getItemObj)(form);
          };
          var getInnerTable = R__namespace.path(['data']);
          var moduleTypePath = R__namespace.path(['dynamic', 'moduleType']);
          var getSpecialAxios = R__namespace.compose(R__namespace.defaultTo(getDefaultRequestInstance()), R__namespace.prop(R__namespace.__, context.dynamicCacheContext.requestInstance));
          var sendRequestIO = IO.of(function () {
              return Maybe.run((function () {
                  var api, params, instance;
                  return __generator(this, function (_a) {
                      switch (_a.label) {
                          case 0: return [4 /*yield*/, Maybe.of(R__namespace.prop(currentType(), getRequestApiMap()))];
                          case 1:
                              api = _a.sent();
                              return [4 /*yield*/, paramsGenerator(rootProp.dynamic, form)];
                          case 2:
                              params = _a.sent();
                              return [4 /*yield*/, R__namespace.compose(Maybe.of, R__namespace.ifElse(isDraft, getDefaultRequestInstance, R__namespace.compose(getSpecialAxios, R__namespace.converge(moduleTypePath, [R__namespace.always(rootProp)]))))(currentType())];
                          case 3:
                              instance = _a.sent();
                              return [2 /*return*/, R__namespace.andThen(R__namespace.compose(Maybe.of, R__namespace.ifElse(stateEq200, getInnerTable, R__namespace.always(void 0))), instance.postJSON(api, params))];
                      }
                  });
              })());
          });
          var maybePropTotal = R__namespace.compose(Maybe.of, R__namespace.prop('total'));
          var maybePropRows = R__namespace.compose(Maybe.of, R__namespace.prop('rows'));
          var maybePropTable = R__namespace.compose(Maybe.of, R__namespace.prop('table'));
          var getOrderList = R__namespace.nAry(0, orderList);
          var isHasDone = R__namespace.converge(R__namespace.gte, [R__namespace.compose(R__namespace.length, getOrderList), R__namespace.identity]);
          var pushInOrderList = R__namespace.converge(unsafePush, [R__namespace.identity, getOrderList]);
          var fetchHandleIO = sendRequestIO.map(map$1(R__namespace.andThen(map$1(R__namespace.compose(R__namespace.tap(R__namespace.compose(map$1(setGlobalConfig), maybePropTable)), R__namespace.tap(R__namespace.compose(map$1(R__namespace.compose(setHasDone, isHasDone)), maybePropTotal)), R__namespace.tap(R__namespace.compose(map$1(pushInOrderList), maybePropRows)), R__namespace.pick(['total', 'rows', 'table']))))));
          var setDefaultActive = R__namespace.converge(R__namespace.when(R__namespace.compose(R__namespace.isNil, R__namespace.nAry(0, activeItem)), R__namespace.converge(setActiveItem, [R__namespace.compose(R__namespace.head, getOrderList)])), [R__namespace.F]);
          var fetchData = R__namespace.converge(R__namespace.ifElse(R__namespace.complement(hasDone), fetchHandleIO.unsafePerformIO.bind(fetchHandleIO), Maybe.none), [R__namespace.F]);
          var scrollFetchRequest = R__namespace.compose(map$1(R__namespace.andThen(setDefaultActive)), fetchData);
          var scrollFetch = debounce(scrollFetchRequest, 50);
          var conditionChangeFetch = R__namespace.compose(scrollFetch, resetPage);
          vue.watch(currentType, conditionChangeFetch);
          var lock = false;
          var getLock = function () { return lock; };
          var setLock = function (val) {
              if (val === void 0) { val = true; }
              return (lock = val);
          };
          var removeFetch = R__namespace.ifElse(getLock, R__namespace.identity, R__namespace.compose(R__namespace.compose(map$1(R__namespace.andThen(R__namespace.converge(setLock, [R__namespace.F]))), scrollFetchRequest), setLock, R__namespace.T));
          // ------------------------------ 删除 ------------------------------
          var isDraft = R__namespace.equals(exports.TypeOption.未提交);
          var getQueryCompose = function (dynamic) {
              return R__namespace.ifElse(R__namespace.compose(R__namespace.not, isDraft, R__namespace.prop('type')), R__namespace.always(dynamic), R__namespace.empty);
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
                          return [4 /*yield*/, Maybe.of(R__namespace.concat(url, R__namespace.toString(paramId)))];
                      case 3:
                          urlWithId = _b.sent();
                          query = getQueryCompose(rootProp.dynamic)(params);
                          return [4 /*yield*/, Maybe.of((_a = getDefaultRequestInstance()) === null || _a === void 0 ? void 0 : _a[requestType])];
                      case 4:
                          instance = _b.sent();
                          return [2 /*return*/, instance(urlWithId, query)];
                  }
              });
          }
          var removeItemIO = IO.of(R__namespace.compose(Maybe.run, getSendRequestWithId('delete')));
          var doRemove = function (id) {
              var index = R__namespace.findIndex(R__namespace.pathEq(['form', 'id'], id), orderList());
              R__namespace.when(R__namespace.lte(0), unsafeRemoveItem(R__namespace.__, orderList()))(index);
              R__namespace.when(R__namespace.pathEq(['form', 'id'], id), R__namespace.converge(setActiveItem, [R__namespace.always(null)]))(activeItem());
              R__namespace.when(R__namespace.compose(R__namespace.gte(10), R__namespace.length), removeFetch)(orderList());
          };
          var removeItem = function (id) {
              var _a;
              removeItemIO
                  .map(map$1(R__namespace.andThen(R__namespace.when(stateEq200, R__namespace.converge(doRemove, [R__namespace.always(id)])))))
                  .unsafePerformIO({ id: id, api: (_a = getRemoveApiMap()) === null || _a === void 0 ? void 0 : _a[currentType()] });
          };
          var setBusOn = function (params) {
              bus.on('removeCacheItem', function () {
                  var _a;
                  removeItemIO.unsafePerformIO(R__namespace.assoc('api', (_a = getRemoveApiMap()) === null || _a === void 0 ? void 0 : _a[currentType()], params));
                  setBusOff();
              });
          };
          var setBusOff = function () {
              bus.off('removeCacheItem');
          };
          // 使用数组绑定会出现异常触发的情况
          vue.watch(function () { return rootProp.dynamic.businessType; }, setBusOff);
          vue.watch(function () { return rootProp.dynamic.modelType; }, setBusOff);
          // ------------------------------ 提交 ------------------------------
          var getOmitRows = R__namespace.curryN(3, function (rows, mainTableConfig, currentTableConfig) {
              var mapProp = R__namespace.map(R__namespace.prop('prop'));
              var diffProp = R__namespace.difference(mapProp(mainTableConfig), mapProp(currentTableConfig));
              return R__namespace.map(R__namespace.omit(diffProp), rows);
          });
          function mergeCacheData() {
              var content, rows, getEditRows, callHook, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
              return __generator(this, function (_q) {
                  switch (_q.label) {
                      case 0: return [4 /*yield*/, Maybe.of(R__namespace.path(['content'], activeItem()))];
                      case 1:
                          content = _q.sent();
                          return [4 /*yield*/, Maybe.of(R__namespace.path(['rows'], content))];
                      case 2:
                          rows = _q.sent();
                          getEditRows = getOmitRows(R__namespace.__, tableConfig.items, $CxTable.flatColumns);
                          unsafeClearPush(getEditRows(rows), rootProp.tableData);
                          dialogExpose.openDialog(false);
                          setBusOff();
                          setBusOn({ id: getId(activeItem()), type: currentType() });
                          _b = (_a = R__namespace).converge;
                          _c = [R__namespace.call];
                          _e = (_d = R__namespace).always;
                          return [4 /*yield*/, Maybe.of(R__namespace.path(['hooks', 'onGetCache'], rootProp))];
                      case 3:
                          _f = [
                              _e.apply(_d, [_q.sent()])
                          ];
                          _h = (_g = R__namespace).always;
                          _k = (_j = R__namespace).clone;
                          return [4 /*yield*/, Maybe.of(R__namespace.path(['cache'], content))];
                      case 4:
                          _f = _f.concat([
                              _h.apply(_g, [_k.apply(_j, [_q.sent()])]),
                              R__namespace.nAry(0, currentType),
                              R__namespace.always(getEditRows(rows))
                          ]);
                          _m = (_l = R__namespace).always;
                          _p = (_o = R__namespace).clone;
                          return [4 /*yield*/, Maybe.of(R__namespace.path(['form'], activeItem()))];
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
          var continueEdit = R__namespace.compose(Maybe.run, mergeCacheData);
          // ------------------------------ 判断是否存在 ------------------------------
          var existApiMap = (_b = {},
              _b[exports.TypeOption.未提交] = '/draft/manager/draft/exist/',
              _b[exports.TypeOption.已驳回] = '/draft/manager/order/exist/',
              _b[exports.TypeOption.已反审] = '/draft/manager/order/exist/',
              _b);
          var orderIsExist = R__namespace.compose(Maybe.run, getSendRequestWithId('get'));
          var dataIsFalsy = R__namespace.allPass([stateEq200, R__namespace.compose(falsy, R__namespace.prop('data'))]);
          var notExistToast = R__namespace.converge(getMessageInstance().warning, [
              R__namespace.always('此数据已被删除,请重新打开暂存弹窗!')
          ]);
          // ------------------------------ 组合exist与submit ------------------------------
          var onOk = R__namespace.compose(map$1(R__namespace.andThen(R__namespace.ifElse(dataIsFalsy, continueEdit, notExistToast))), R__namespace.converge(orderIsExist, [
              R__namespace.converge(R__namespace.zipObj, [
                  R__namespace.always(['id', 'api']),
                  R__namespace.converge(R__namespace.pair, [
                      R__namespace.converge(R__namespace.path(['form', 'id']), [R__namespace.nAry(0, activeItem)]),
                      R__namespace.converge(R__namespace.prop, [R__namespace.nAry(0, currentType), R__namespace.always(existApiMap)])
                  ])
              ])
          ]));
          // ------------------------------ 渲染函数 ------------------------------
          var _hoisted_direction_1 = vue.resolveDirective('infinite-scroll');
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
              return vue.createVNode('div', { "class": _hoisted_class_1 }, content, exports.PATCH_FLAG.TEXT);
          };
          // getBaseInfo::object a,object b=>a->b
          var getBaseInfo = R__namespace.converge(R__namespace.mergeRight, [
              R__namespace.compose(R__namespace.defaultTo({}), R__namespace.path(['content', 'cache'])),
              R__namespace.compose(R__namespace.defaultTo({}), R__namespace.path(['form']))
          ]);
          // getId::object->number
          var getId = R__namespace.path(['form', 'id']);
          // titlePath Object a,Object b::a->b
          var titlePath = R__namespace.path(['config', 'listTitle']);
          // defaultTitle
          var defaultTitle = R__namespace.defaultTo('新建暂存数据');
          var renderListItem = R__namespace.curryN(2, function (item, currentItem) {
              var maybeConfig = getConfigByDynamicConfig(rootProp.dynamic, getLabelConfig());
              var getItemValByPath = R__namespace.converge(R__namespace.path, [R__namespace.identity, R__namespace.always(getBaseInfo(item))]);
              return vue.createVNode('li', {
                  "class": _hoisted_class_2,
                  key: getId(item),
                  style: R__namespace.compose(R__namespace.objOf('backgroundColor'), R__namespace.ifElse(R__namespace.pathEq(['form', 'id'], getId(currentItem)), R__namespace.always('#F0F5FF'), R__namespace.always('transparent')))(item),
                  onClick: R__namespace.compose(setActiveItem, R__namespace.always(item))
              }, [
                  vue.createVNode('div', { "class": _hoisted_class_9 }, [
                      vue.createVNode('div', { "class": _hoisted_class_10 }, R__namespace.compose(defaultTitle, getMaybeValue, map$1(R__namespace.compose(getItemValByPath)), map$1(R__namespace.compose(R__namespace.of)), map$1(R__namespace.compose(R__namespace.prop('prop'), titlePath)))(maybeConfig), exports.PATCH_FLAG.TEXT),
                      vue.createVNode('div', _hoisted_attrs_4, R__namespace.path(['form', 'gmtCreate'], item), exports.PATCH_FLAG.TEXT),
                      vue.createVNode('i', __assign(__assign({}, _hoisted_attrs_1), { onClick: R__namespace.compose(R__namespace.converge(removeItem, [R__namespace.always(getId(item))]), stopPropagation, preventDefault) }))
                  ])
              ], exports.PATCH_FLAG.FULL_PROPS);
          });
          var renderList = function (list) {
              return vue.withDirectives(vue.createVNode('ul', _hoisted_attrs_2, [
                  (vue.openBlock(),
                      vue.createBlock(vue.Fragment, null, R__namespace.map(renderListItem(R__namespace.__, activeItem()), list), exports.PATCH_FLAG.KEYED_FRAGMENT))
              ]), [[_hoisted_direction_1 !== null && _hoisted_direction_1 !== void 0 ? _hoisted_direction_1 : {}, scrollFetch]]);
          };
          // infoPath Object a,Object b::a->b[]
          var infoPath = R__namespace.path(['config', 'tableInfo']);
          var labelItemList = useComputed(function () {
              var maybeConfig = getConfigByDynamicConfig(rootProp.dynamic, getLabelConfig());
              return R__namespace.compose(R__namespace.defaultTo([]), getMaybeValue, map$1(infoPath))(maybeConfig);
          });
          var renderOrderInfoItem = function (state, item) {
              var render = function (content) {
                  var _a;
                  return [
                      vue.createVNode('label', null, ((_a = state["label_" + currentType()]) !== null && _a !== void 0 ? _a : state.label) + ":"),
                      vue.createVNode('div', { "class": _hoisted_class_4 }, content !== null && content !== void 0 ? content : state.defaultValue, exports.PATCH_FLAG.TEXT)
                  ];
              };
              return R__namespace.compose(R__namespace.ifElse(truthy, render, R__namespace.always(null)), R__namespace.defaultTo(state.defaultValue), R__namespace.path([state.prop]))(item);
          };
          var renderOrderInfo = function (item) {
              return vue.createVNode('article', { "class": _hoisted_class_5 }, R__namespace.compose(R__namespace.map(R__namespace.converge(renderOrderInfoItem, [R__namespace.identity, R__namespace.converge(getBaseInfo, [R__namespace.always(item)])])), labelItemList)());
          };
          var invokerWithChildren = function (cb) {
              return R__namespace.compose(cb, R__namespace.when(R__namespace.compose(R__namespace.is(Array), R__namespace.prop('children')), R__namespace.converge(R__namespace.set(R__namespace.lensProp('children')), [
                  R__namespace.compose(R__namespace.map(cb), R__namespace.prop('children')),
                  R__namespace.identity
              ])));
          };
          var labelContainer = function (label) {
              return R__namespace.compose(truthy, R__namespace.find(R__namespace.includes(R__namespace.__, label)))(['操作', '选择', '多选']);
          };
          var noRequired = invokerWithChildren(R__namespace.omit(['required']));
          var setImgsType = R__namespace.compose(R__namespace.when(R__namespace.compose(R__namespace.equals('款型图'), R__namespace.prop('label')), R__namespace.compose(R__namespace.set(R__namespace.lensProp('control'), R__namespace.objOf('type', 'imgs')), R__namespace.omit(['slot']))));
          var setDefaultSlot = R__namespace.compose(R__namespace.when(R__namespace.compose(R__namespace.all(falsy), R__namespace.props(['slot', 'calculate', 'dynamicCalculate'])), R__namespace.assoc('slot', 'renderWithText')));
          var imgsTypeInvoker = invokerWithChildren(setImgsType);
          var slotInvoker = invokerWithChildren(setDefaultSlot);
          var labelNotShow = R__namespace.compose(R__namespace.not, R__namespace.propSatisfies(labelContainer, 'label'));
          var dynamicInject = R__namespace.compose(R__namespace.map(R__namespace.compose(imgsTypeInvoker, slotInvoker, noRequired)), R__namespace.filter(labelNotShow), R__namespace.when(R__namespace.converge(R__namespace.is(Function), [R__namespace.always(rootProp.dynamicInject)]), rootProp.dynamicInject));
          var renderOrderTable = function (config, dataList) {
              return vue.createVNode(_CX_TABLE, __assign(__assign({ dynamicInject: dynamicInject }, R__namespace.pick(['ignoreControl'], rootProp)), { tableConfig: config, disabled: true, keyboard: false, height: 427, "class": 'cx_m_16', tableData: dataList, configurable: false }), __assign(__assign({}, rootSlots), { renderWithText: function (_a) {
                      var _b, _c, _d, _e;
                      var rowData = _a.rowData, column = _a.column;
                      var prop = (_b = column.prop) !== null && _b !== void 0 ? _b : '';
                      var content = prop.endsWith('Id')
                          ? (_c = rowData[getColumnSelectText(column)]) !== null && _c !== void 0 ? _c : rowData[getColumnSelectText(column, 'Name')]
                          : (_e = (_d = rowData[prop + 'Text']) !== null && _d !== void 0 ? _d : rowData[prop + 'Name']) !== null && _e !== void 0 ? _e : rowData[prop];
                      if (R__namespace.is(Number, column.accuracy)) {
                          content = decimalFixed(content, column.accuracy, true);
                      }
                      return [vue.createVNode(script$3, { content: content }, null, exports.PATCH_FLAG.PROPS, ['content'])];
                  } }), exports.PATCH_FLAG.PROPS, R__namespace.pair('dynamic', 'tableData'));
          };
          return function (_, cache) {
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      vue.createVNode(_CX_DIALOG, {
                          title: exports.TypeOption[currentType()],
                          appendToBody: true,
                          okText: '编辑',
                          width: '1524px',
                          top: '50px',
                          destroyOnClose: true,
                          onRegister: register,
                          onOk: onOk,
                          disabledOk: R__namespace.isNil(activeItem())
                      }, {
                          "default": function () {
                              return [
                                  // 顶部
                                  vue.createVNode('section', { "class": _hoisted_class_6 }, [
                                      // tab切换
                                      (vue.openBlock(),
                                          vue.createBlock(vue.Fragment, null, [
                                              R__namespace.compose(needTypeTab, getTabCondition)()
                                                  ? vue.createVNode(_CX_TAB, {
                                                      level: 3,
                                                      options: typeOptionList,
                                                      modelValue: currentType(),
                                                      'onUpdate:modelValue': setCurrentType
                                                  }, null, exports.PATCH_FLAG.PROPS, R__namespace.of('modelValue'))
                                                  : cache[2] || (cache[2] = vue.createVNode('div', null, '未提交'))
                                          ])),
                                      // 搜索项
                                      vue.createVNode(_CX_FORM, { form: form, items: items, onChange: conditionChangeFetch, style: 'margin-bottom:-18px' }, null, exports.PATCH_FLAG.PROPS, R__namespace.of('form'))
                                  ]),
                                  // 内容区
                                  vue.createVNode('section', { "class": _hoisted_class_7 }, [
                                      // 订单列表
                                      vue.createVNode('div', { "class": _hoisted_class_8 }, [
                                          cache[0] || (cache[0] = renderTitle('订单列表')),
                                          R__namespace.compose(renderList, orderList)()
                                      ]),
                                      // 明细列表
                                      (vue.openBlock(),
                                          vue.createBlock(vue.Fragment, null, [
                                              activeItem()
                                                  ? vue.createVNode('div', _hoisted_attrs_3, [
                                                      cache[1] || (cache[1] = renderTitle('明细列表')),
                                                      renderOrderInfo(activeItem()),
                                                      renderOrderTable(tableConfig, tableData())
                                                  ])
                                                  : vue.createVNode('div', _hoisted_attrs_5, [vue.createVNode(script$4)])
                                          ]))
                                  ])
                              ];
                          }
                      }, exports.PATCH_FLAG.PROPS, R__namespace.pair('title', 'disabledOk'))
                  ]));
          };
      }
  });

  var renderInnerBtn = function (_a) {
      var _b, _c, _d;
      var $attrs = _a.$attrs, $slots = _a.$slots;
      return vue.createVNode(_CX_BTN, __assign(__assign({}, $attrs), { level: (_b = $attrs.level) !== null && _b !== void 0 ? _b : 2, loading: (_c = $attrs.loadingState) === null || _c === void 0 ? void 0 : _c.loading, disabled: (_d = $attrs.disabledState) === null || _d === void 0 ? void 0 : _d.disabled }), $slots, exports.PATCH_FLAG.FULL_PROPS);
  };
  var innerBtn = vue.defineComponent({});
  innerBtn.render = renderInnerBtn;
  var TeleportBtn = vue.defineComponent({
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
          var unsafeClearEle = R__namespace.compose(map$1(unsafeSet(R__namespace.__, 'innerHTML', '')), Maybe.of);
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
          var loadingState = vue.reactive({ loading: false });
          var setLoadingStates = unsafeSet(loadingState, 'loading');
          var renderBtn = function () {
              return vue.createVNode(innerBtn, __assign(__assign({}, attrs), { disabledState: props.disabledState, loadingState: loadingState, onClick: onClick }), slots, exports.PATCH_FLAG.FULL_PROPS);
          };
          // renderVNodeToDom::HTMLElement->void
          var renderVNodeToDom = R__namespace.compose(R__namespace.converge(vue.render, [renderBtn, R__namespace.identity]), R__namespace.tap(unsafeClearEle), R__namespace.tap(unsafeDeleteProperty(R__namespace.__, '_vnode')));
          // 组件更新IO
          var updateComponentIO = IO.of(queryDom).map(R__namespace.ifElse(R__namespace.isNil, R__namespace.compose(unsafeWarn, unsafeClearEle, container), R__namespace.compose(map$1(renderVNodeToDom), Maybe.of, setContainer)));
          vue.watch(function () { return props.dynamicColumn; }, function () { return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, vue.nextTick()];
                      case 1:
                          _a.sent();
                          updateComponentIO.unsafePerformIO(props.selector);
                          return [2 /*return*/];
                  }
              });
          }); });
          return R__namespace.always(null);
      }
  });

  var CacheListBtn = vue.defineComponent({
      name: 'CacheListBtn',
      props: {
          dynamicColumn: { type: Array, required: true },
          tableDataVisitor: { type: Object, required: true }
      },
      setup: function (props) {
          var rootProp = vue.inject('rootProp');
          var _a = __read(useState(null), 2), dialogRef = _a[0], setDialogRef = _a[1];
          var dialogRefIO = IO.of(dialogRef);
          var setCacheIO = dialogRefIO.map(R__namespace.compose(map$1(R__namespace.compose(R__namespace.when(R__namespace.is(Function), R__namespace.call), R__namespace.prop('openDialog'))), Maybe.of));
          return function () { return [
              vue.createVNode(TeleportBtn, {
                  dynamicColumn: props.dynamicColumn,
                  clickHandler: setCacheIO.unsafePerformIO.bind(setCacheIO),
                  selector: rootProp.cacheListBtn,
                  content: '暂存列表'
              }, null, exports.PATCH_FLAG.PROPS, R__namespace.pair('selector', 'dynamicColumn')),
              vue.createVNode(cacheListDialog, { ref: setDialogRef }, null, exports.PATCH_FLAG.NEED_PATCH)
          ]; };
      }
  });

  var SetCacheBtn = vue.defineComponent({
      name: 'SetCacheBtn',
      props: {
          dynamicColumn: { type: Array, required: true },
          tableDataVisitor: { type: Object, required: true }
      },
      setup: function (props) {
          var _this = this;
          var rootProp = vue.inject('rootProp');
          var bus = vue.inject('bus');
          var context = useCxTable().getContext();
          var getDefaultRequestInstance = (function () {
              return R__namespace.path(['dynamicCacheContext', 'requestInstance', 'default'], context);
          });
          var getMessageInstance = (function () { return R__namespace.path(['messageInstance'], context); });
          var innerBracket = useCxTableCompose().innerBracket;
          var getCacheData = function (tableProps) { return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 /*return*/, new Promise(function (resolve, reject) {
                          var next = R__namespace.ifElse(truthy, resolve, reject);
                          var handle = R__namespace.ifElse(R__namespace.is(Function), function (cb) { return R__namespace.call(cb, next); }, resolve);
                          IO.of(R__namespace.path(['hooks', 'onSetCache']))
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
                          _b = (_a = R__namespace).objOf;
                          _c = ['cache'];
                          return [4 /*yield*/, getCacheData(tableProps)];
                      case 1:
                          cache = _b.apply(_a, _c.concat([_d.sent()]));
                          return [2 /*return*/, IO.of(R__namespace.path(['tableDataVisitor', 'sortedData']))
                                  .map(R__namespace.objOf('rows'))
                                  .map(R__namespace.mergeLeft(cache))
                                  .map(R__namespace.objOf('content'))
                                  .map(R__namespace.mergeLeft(R__namespace.defaultTo({}, tableProps.dynamic)))
                                  .unsafePerformIO(innerProp)];
                  }
              });
          }); };
          var _a = __read(useState(0), 2), disabledTime = _a[0], setDisabledTime = _a[1];
          var disabledState = vue.reactive(R__namespace.objOf('disabled', false));
          var setDisabledState = unsafeSet(disabledState, 'disabled');
          vue.watch(disabledTime, R__namespace.compose(setDisabledState, R__namespace.not, R__namespace.gte(0)));
          var decrease = R__namespace.compose(setDisabledTime, R__namespace.dec, disabledTime);
          var setTimer = function () {
              var timer = setInterval(R__namespace.compose(R__namespace.when(R__namespace.gte(0), R__namespace.converge(clearInterval, [function () { return timer; }])), decrease), 1000);
          };
          var content = useComputed(R__namespace.compose(R__namespace.concat('暂存'), R__namespace.ifElse(R__namespace.gte(0), R__namespace.always(''), R__namespace.compose(innerBracket, R__namespace.toString)), disabledTime));
          var handleResult = R__namespace.when(stateEq200, R__namespace.converge(getMessageInstance().success, [R__namespace.always('暂存成功')]));
          var sendRequest = R__namespace.converge(getDefaultRequestInstance().postJSON.bind(getDefaultRequestInstance()), [
              R__namespace.always('/draft/manager/save'),
              R__namespace.identity
          ]);
          var getParams = R__namespace.converge(paramsGenerator, [R__namespace.always(props), R__namespace.always(rootProp)]);
          var afterSetCacheIO = IO.of(R__namespace.compose(Maybe.of, R__namespace.path(['hooks', 'afterSetCache'])));
          var setCache = R__namespace.compose(R__namespace.andThen(function () { return afterSetCacheIO.map(map$1(R__namespace.call)).unsafePerformIO(rootProp); }), R__namespace.andThen(function () { return bus.emit('removeCacheItem'); }), R__namespace.andThen(R__namespace.compose(setTimer, R__namespace.converge(setDisabledTime, [R__namespace.always(10)]))), R__namespace.andThen(handleResult), R__namespace.andThen(sendRequest), getParams);
          return function () {
              return vue.createVNode(TeleportBtn, {
                  clickHandler: setCache,
                  dynamicColumn: props.dynamicColumn,
                  selector: rootProp.setCacheBtn,
                  disabledState: disabledState
              }, R__namespace.objOf('default', R__namespace.nAry(0, content)), exports.PATCH_FLAG.PROPS, ['selector', 'dynamicColumn']);
          };
      }
  });

  var CxTableTitle = vue.defineComponent({
      name: 'CxTableTitle',
      setup: function () {
          var rootProp = vue.inject('rootProp');
          var hoisted_1 = { "class": 'cx_secondary_title cx_ptb_16' };
          return function () {
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      rootProp.title
                          ? vue.createVNode('h3', hoisted_1, rootProp.title, exports.PATCH_FLAG.TEXT)
                          : vue.createCommentVNode('v-if_title', true)
                  ], exports.PATCH_FLAG.STABLE_FRAGMENT));
          };
      }
  });

  var useDynamicConfigDialog = function () {
      var context = useCxTable().getContext();
      var getMessageInstance = (function () { return R__namespace.path(['messageInstance'], context); });
      var totalList = vue.ref([]);
      var departmentMap = vue.computed(function () {
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
      var listMap = vue.reactive(getDefaultData());
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
      var checkedList = vue.computed(function () {
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
      var getData = function (dynamicConfig) { return __awaiter(void 0, void 0, void 0, function () {
          var data;
          var _a, _b;
          return __generator(this, function (_c) {
              switch (_c.label) {
                  case 0:
                      if (!dynamicConfig)
                          return [2 /*return*/, console.warn('[dynamicConfigDialog]: invalid dynamicConfig')];
                      return [4 /*yield*/, context.dynamicRequestInstance.get('/table/settings/get', dynamicConfig)];
                  case 1:
                      data = (_c.sent()).data;
                      totalList.value = (_a = data === null || data === void 0 ? void 0 : data.itemList) !== null && _a !== void 0 ? _a : [];
                      Object.assign(listMap, getDefaultData());
                      (_b = data === null || data === void 0 ? void 0 : data.displayList) === null || _b === void 0 ? void 0 : _b.forEach(function (item) {
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /**!
   * Sortable 1.10.2
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var version = "1.10.2";

  function userAgent(pattern) {
    if (typeof window !== 'undefined' && window.navigator) {
      return !!
      /*@__PURE__*/
      navigator.userAgent.match(pattern);
    }
  }

  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

  var captureMode = {
    capture: false,
    passive: false
  };

  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function matches(
  /**HTMLElement*/
  el,
  /**String*/
  selector) {
    if (!selector) return;
    selector[0] === '>' && (selector = selector.substring(1));

    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }

    return false;
  }

  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }

  function closest(
  /**HTMLElement*/
  el,
  /**String*/
  selector,
  /**HTMLElement*/
  ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;

      do {
        if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }

        if (el === ctx) break;
        /* jshint boss:true */
      } while (el = getParentOrHost(el));
    }

    return null;
  }

  var R_SPACE = /\s+/g;

  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? 'add' : 'remove'](name);
      } else {
        var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
        el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
      }
    }
  }

  function css(el, prop, val) {
    var style = el && el.style;

    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, '');
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }

        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf('webkit') === -1) {
          prop = '-webkit-' + prop;
        }

        style[prop] = val + (typeof val === 'string' ? '' : 'px');
      }
    }
  }

  function matrix(el, selfOnly) {
    var appliedTransforms = '';

    if (typeof el === 'string') {
      appliedTransforms = el;
    } else {
      do {
        var transform = css(el, 'transform');

        if (transform && transform !== 'none') {
          appliedTransforms = transform + ' ' + appliedTransforms;
        }
        /* jshint boss:true */

      } while (!selfOnly && (el = el.parentNode));
    }

    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    /*jshint -W056 */

    return matrixFn && new matrixFn(appliedTransforms);
  }

  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName),
          i = 0,
          n = list.length;

      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }

      return list;
    }

    return [];
  }

  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;

    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  /**
   * Returns the "bounding client rect" of given element
   * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
   * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
   * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
   * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
   * @param  {[HTMLElement]} container              The parent the element will be placed in
   * @return {Object}                               The boundingClientRect of el, with specified adjustments
   */


  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window) return;
    var elRect, top, left, bottom, right, height, width;

    if (el !== window && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }

    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      // Adjust for translate()
      container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
      // Not needed on <= IE11

      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
            var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

            top -= containerRect.top + parseInt(css(container, 'border-top-width'));
            left -= containerRect.left + parseInt(css(container, 'border-left-width'));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
          /* jshint boss:true */

        } while (container = container.parentNode);
      }
    }

    if (undoScale && el !== window) {
      // Adjust for scale()
      var elMatrix = matrix(container || el),
          scaleX = elMatrix && elMatrix.a,
          scaleY = elMatrix && elMatrix.d;

      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }

    return {
      top: top,
      left: left,
      bottom: bottom,
      right: right,
      width: width,
      height: height
    };
  }
  /**
   * Checks if a side of an element is scrolled past a side of its parents
   * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
   * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
   * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
   * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
   */


  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true),
        elSideVal = getRect(el)[elSide];
    /* jshint boss:true */

    while (parent) {
      var parentSideVal = getRect(parent)[parentSide],
          visible = void 0;

      if (parentSide === 'top' || parentSide === 'left') {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }

      if (!visible) return parent;
      if (parent === getWindowScrollingElement()) break;
      parent = getParentAutoScrollElement(parent, false);
    }

    return false;
  }
  /**
   * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
   * and non-draggable elements
   * @param  {HTMLElement} el       The parent element
   * @param  {Number} childNum      The index of the child
   * @param  {Object} options       Parent Sortable's options
   * @return {HTMLElement}          The child at index childNum, or null if not found
   */


  function getChild(el, childNum, options) {
    var currentChild = 0,
        i = 0,
        children = el.children;

    while (i < children.length) {
      if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i];
        }

        currentChild++;
      }

      i++;
    }

    return null;
  }
  /**
   * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
   * @param  {HTMLElement} el       Parent element
   * @param  {selector} selector    Any other elements that should be ignored
   * @return {HTMLElement}          The last child, ignoring ghostEl
   */


  function lastChild(el, selector) {
    var last = el.lastElementChild;

    while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }

    return last || null;
  }
  /**
   * Returns the index of an element within its parent for a selected set of
   * elements
   * @param  {HTMLElement} el
   * @param  {selector} selector
   * @return {number}
   */


  function index(el, selector) {
    var index = 0;

    if (!el || !el.parentNode) {
      return -1;
    }
    /* jshint boss:true */


    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index++;
      }
    }

    return index;
  }
  /**
   * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
   * The value is returned in real pixels.
   * @param  {HTMLElement} el
   * @return {Array}             Offsets in the format of [left, top]
   */


  function getRelativeScrollOffset(el) {
    var offsetLeft = 0,
        offsetTop = 0,
        winScroller = getWindowScrollingElement();

    if (el) {
      do {
        var elMatrix = matrix(el),
            scaleX = elMatrix.a,
            scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }

    return [offsetLeft, offsetTop];
  }
  /**
   * Returns the index of the object within the given array
   * @param  {Array} arr   Array that may or may not hold the object
   * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
   * @return {Number}      The index of the object in the array, or -1
   */


  function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i)) continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
      }
    }

    return -1;
  }

  function getParentAutoScrollElement(el, includeSelf) {
    // skip to window
    if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;

    do {
      // we don't need to get elem css if it isn't even overflowing in the first place (performance)
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css(elem);

        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
          if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
          if (gotSelf || includeSelf) return elem;
          gotSelf = true;
        }
      }
      /* jshint boss:true */

    } while (elem = elem.parentNode);

    return getWindowScrollingElement();
  }

  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }

    return dst;
  }

  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }

  var _throttleTimeout;

  function throttle(callback, ms) {
    return function () {
      if (!_throttleTimeout) {
        var args = arguments,
            _this = this;

        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }

        _throttleTimeout = setTimeout(function () {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }

  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }

  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }

  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;

    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }

  var expando = 'Sortable' + new Date().getTime();

  function AnimationStateManager() {
    var animationStates = [],
        animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation) return;
        var children = [].slice.call(this.el.children);
        children.forEach(function (child) {
          if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });

          var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);

            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }

          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target: target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;

        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === 'function') callback();
          return;
        }

        var animating = false,
            animationTime = 0;
        animationStates.forEach(function (state) {
          var time = 0,
              target = state.target,
              fromRect = target.fromRect,
              toRect = getRect(target),
              prevFromRect = target.prevFromRect,
              prevToRect = target.prevToRect,
              animatingRect = state.rect,
              targetMatrix = matrix(target, true);

          if (targetMatrix) {
            // Compensate for current animation
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }

          target.toRect = toRect;

          if (target.thisAnimationDuration) {
            // Could also check if animatingRect is between fromRect and toRect
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
            (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              // If returning to same place as started from animation and on same axis
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          } // if fromRect != toRect: animate


          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;

            if (!time) {
              time = _this.options.animation;
            }

            _this.animate(target, animatingRect, toRect, time);
          }

          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function () {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);

        if (!animating) {
          if (typeof callback === 'function') callback();
        } else {
          animationCallbackId = setTimeout(function () {
            if (typeof callback === 'function') callback();
          }, animationTime);
        }

        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, 'transition', '');
          css(target, 'transform', '');
          var elMatrix = matrix(this.el),
              scaleX = elMatrix && elMatrix.a,
              scaleY = elMatrix && elMatrix.d,
              translateX = (currentRect.left - toRect.left) / (scaleX || 1),
              translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
          repaint(target); // repaint

          css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
          css(target, 'transform', 'translate3d(0,0,0)');
          typeof target.animated === 'number' && clearTimeout(target.animated);
          target.animated = setTimeout(function () {
            css(target, 'transition', '');
            css(target, 'transform', '');
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }

  function repaint(target) {
    return target.offsetWidth;
  }

  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }

  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      // Set default static properties
      for (var option in defaults) {
        if (defaults.hasOwnProperty(option) && !(option in plugin)) {
          plugin[option] = defaults[option];
        }
      }

      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent(eventName, sortable, evt) {
      var _this = this;

      this.eventCanceled = false;

      evt.cancel = function () {
        _this.eventCanceled = true;
      };

      var eventNameGlobal = eventName + 'Global';
      plugins.forEach(function (plugin) {
        if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
            sortable: sortable
          }, evt));
        } // Only fire plugin event if plugin is enabled in this sortable,
        // and plugin has event defined


        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
          sortable[plugin.pluginName][eventName](_objectSpread({
            sortable: sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults, options) {
      plugins.forEach(function (plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized; // Add default options from plugin

        _extends(defaults, initialized.defaults);
      });

      for (var option in sortable.options) {
        if (!sortable.options.hasOwnProperty(option)) continue;
        var modified = this.modifyOption(sortable, option, sortable.options[option]);

        if (typeof modified !== 'undefined') {
          sortable.options[option] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function (plugin) {
        if (typeof plugin.eventProperties !== 'function') return;

        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function (plugin) {
        // Plugin must exist on the Sortable
        if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

        if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };

  function dispatchEvent(_ref) {
    var sortable = _ref.sortable,
        rootEl = _ref.rootEl,
        name = _ref.name,
        targetEl = _ref.targetEl,
        cloneEl = _ref.cloneEl,
        toEl = _ref.toEl,
        fromEl = _ref.fromEl,
        oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex,
        oldDraggableIndex = _ref.oldDraggableIndex,
        newDraggableIndex = _ref.newDraggableIndex,
        originalEvent = _ref.originalEvent,
        putSortable = _ref.putSortable,
        extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl && rootEl[expando];
    if (!sortable) return;
    var evt,
        options = sortable.options,
        onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent('Event');
      evt.initEvent(name, true, true);
    }

    evt.to = toEl || rootEl;
    evt.from = fromEl || rootEl;
    evt.item = targetEl || rootEl;
    evt.clone = cloneEl;
    evt.oldIndex = oldIndex;
    evt.newIndex = newIndex;
    evt.oldDraggableIndex = oldDraggableIndex;
    evt.newDraggableIndex = newDraggableIndex;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

    var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));

    for (var option in allEventProperties) {
      evt[option] = allEventProperties[option];
    }

    if (rootEl) {
      rootEl.dispatchEvent(evt);
    }

    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }

  var pluginEvent = function pluginEvent(eventName, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        originalEvent = _ref.evt,
        data = _objectWithoutProperties(_ref, ["evt"]);

    PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
      dragEl: dragEl,
      parentEl: parentEl,
      ghostEl: ghostEl,
      rootEl: rootEl,
      nextEl: nextEl,
      lastDownEl: lastDownEl,
      cloneEl: cloneEl,
      cloneHidden: cloneHidden,
      dragStarted: moved,
      putSortable: putSortable,
      activeSortable: Sortable.active,
      originalEvent: originalEvent,
      oldIndex: oldIndex,
      oldDraggableIndex: oldDraggableIndex,
      newIndex: newIndex,
      newDraggableIndex: newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable: sortable,
          name: name,
          originalEvent: originalEvent
        });
      }
    }, data));
  };

  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread({
      putSortable: putSortable,
      cloneEl: cloneEl,
      targetEl: dragEl,
      rootEl: rootEl,
      oldIndex: oldIndex,
      oldDraggableIndex: oldDraggableIndex,
      newIndex: newIndex,
      newDraggableIndex: newDraggableIndex
    }, info));
  }

  var dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      oldIndex,
      newIndex,
      oldDraggableIndex,
      newDraggableIndex,
      activeGroup,
      putSortable,
      awaitingDragStarted = false,
      ignoreNextClick = false,
      sortables = [],
      tapEvt,
      touchEvt,
      lastDx,
      lastDy,
      tapDistanceLeft,
      tapDistanceTop,
      moved,
      lastTarget,
      lastDirection,
      pastFirstInvertThresh = false,
      isCircumstantialInvert = false,
      targetMoveDistance,
      // For positioning ghost absolutely
  ghostRelativeParent,
      ghostRelativeParentInitialScroll = [],
      // (left, top)
  _silent = false,
      savedInputChecked = [];
  /** @const */

  var documentExists = typeof document !== 'undefined',
      PositionGhostAbsolutely = IOS,
      CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
      // This will not pass for IE9, because IE9 DnD only works on anchors
  supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
      supportCssPointerEvents = function () {
    if (!documentExists) return; // false when <= IE11

    if (IE11OrLess) {
      return false;
    }

    var el = document.createElement('x');
    el.style.cssText = 'pointer-events:auto';
    return el.style.pointerEvents === 'auto';
  }(),
      _detectDirection = function _detectDirection(el, options) {
    var elCSS = css(el),
        elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
        child1 = getChild(el, 0, options),
        child2 = getChild(el, 1, options),
        firstChildCSS = child1 && css(child1),
        secondChildCSS = child2 && css(child2),
        firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
        secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

    if (elCSS.display === 'flex') {
      return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
    }

    if (elCSS.display === 'grid') {
      return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
    }

    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
      var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
      return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
    }

    return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
  },
      _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
        dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
        dragElOppLength = vertical ? dragRect.width : dragRect.height,
        targetS1Opp = vertical ? targetRect.left : targetRect.top,
        targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
        targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  },

  /**
   * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
   * @param  {Number} x      X position
   * @param  {Number} y      Y position
   * @return {HTMLElement}   Element of the first found nearest Sortable
   */
  _detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
    var ret;
    sortables.some(function (sortable) {
      if (lastChild(sortable)) return;
      var rect = getRect(sortable),
          threshold = sortable[expando].options.emptyInsertThreshold,
          insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
          insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

      if (threshold && insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  },
      _prepareGroup = function _prepareGroup(options) {
    function toFn(value, pull) {
      return function (to, from, dragEl, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

        if (value == null && (pull || sameGroup)) {
          // Default pull value
          // Default pull and put value if same group
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === 'clone') {
          return value;
        } else if (typeof value === 'function') {
          return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }

    var group = {};
    var originalGroup = options.group;

    if (!originalGroup || _typeof(originalGroup) != 'object') {
      originalGroup = {
        name: originalGroup
      };
    }

    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  },
      _hideGhostForTarget = function _hideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', 'none');
    }
  },
      _unhideGhostForTarget = function _unhideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', '');
    }
  }; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


  if (documentExists) {
    document.addEventListener('click', function (evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }

  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;

      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

      if (nearest) {
        // Create imitation event
        var event = {};

        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }

        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;

        nearest[expando]._onDragOver(event);
      }
    }
  };

  var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  /**
   * @class  Sortable
   * @param  {HTMLElement}  el
   * @param  {Object}       [options]
   */


  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }

    this.el = el; // root element

    this.options = options = _extends({}, options); // Export instance

    el[expando] = this;
    var defaults = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
      swapThreshold: 1,
      // percentage; 0 <= x <= 1
      invertSwap: false,
      // invert always
      invertedSwapThreshold: null,
      // will be set to same as swapThreshold if default
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      ignore: 'a, img',
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl) {
        dataTransfer.setData('Text', dragEl.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: 'data-id',
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: 'sortable-fallback',
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults); // Set default options

    for (var name in defaults) {
      !(name in options) && (options[name] = defaults[name]);
    }

    _prepareGroup(options); // Bind all private methods


    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    } // Setup drag mode


    this.nativeDraggable = options.forceFallback ? false : supportDraggable;

    if (this.nativeDraggable) {
      // Touch start threshold cannot be greater than the native dragstart threshold
      this.options.touchStartThreshold = 1;
    } // Bind events


    if (options.supportPointer) {
      on(el, 'pointerdown', this._onTapStart);
    } else {
      on(el, 'mousedown', this._onTapStart);
      on(el, 'touchstart', this._onTapStart);
    }

    if (this.nativeDraggable) {
      on(el, 'dragover', this);
      on(el, 'dragenter', this);
    }

    sortables.push(this.el); // Restore sorting

    options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

    _extends(this, AnimationStateManager());
  }

  Sortable.prototype =
  /** @lends Sortable.prototype */
  {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(
    /** Event|TouchEvent */
    evt) {
      if (!evt.cancelable) return;

      var _this = this,
          el = this.el,
          options = this.options,
          preventOnFilter = options.preventOnFilter,
          type = evt.type,
          touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
          target = (touch || evt).target,
          originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
          filter = options.filter;

      _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


      if (dragEl) {
        return;
      }

      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return; // only left button and enabled
      } // cancel dnd if original target is content editable


      if (originalTarget.isContentEditable) {
        return;
      }

      target = closest(target, options.draggable, el, false);

      if (target && target.animated) {
        return;
      }

      if (lastDownEl === target) {
        // Ignoring duplicate `down`
        return;
      } // Get the index of the dragged element within its parent


      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable); // Check filter

      if (typeof filter === 'function') {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: 'filter',
            targetEl: target,
            toEl: el,
            fromEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      } else if (filter) {
        filter = filter.split(',').some(function (criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);

          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: 'filter',
              targetEl: target,
              fromEl: el,
              toEl: el
            });

            pluginEvent('filter', _this, {
              evt: evt
            });
            return true;
          }
        });

        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      }

      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      } // Prepare `dragstart`


      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(
    /** Event */
    evt,
    /** Touch */
    touch,
    /** HTMLElement */
    target) {
      var _this = this,
          el = _this.el,
          options = _this.options,
          ownerDocument = el.ownerDocument,
          dragStartFn;

      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style['will-change'] = 'all';

        dragStartFn = function dragStartFn() {
          pluginEvent('delayEnded', _this, {
            evt: evt
          });

          if (Sortable.eventCanceled) {
            _this._onDrop();

            return;
          } // Delayed drag has been triggered
          // we can re-enable the events: touchmove/mousemove


          _this._disableDelayedDragEvents();

          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          } // Bind the events: dragstart/dragend


          _this._triggerDragStart(evt, touch); // Drag start event


          _dispatchEvent({
            sortable: _this,
            name: 'choose',
            originalEvent: evt
          }); // Chosen item


          toggleClass(dragEl, options.chosenClass, true);
        }; // Disable "draggable"


        options.ignore.split(',').forEach(function (criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'mouseup', _this._onDrop);
        on(ownerDocument, 'touchend', _this._onDrop);
        on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }

        pluginEvent('delayStart', this, {
          evt: evt
        }); // Delay is impossible for native DnD in Edge or IE

        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();

            return;
          } // If the user moves the pointer or let go the click or touch
          // before the delay has been reached:
          // disable the delayed drag


          on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
          on(ownerDocument, 'touchend', _this._disableDelayedDrag);
          on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
          on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
          on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
    /** TouchEvent|PointerEvent **/
    e) {
      var touch = e.touches ? e.touches[0] : e;

      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);

      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, 'mouseup', this._disableDelayedDrag);
      off(ownerDocument, 'touchend', this._disableDelayedDrag);
      off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
      off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
      off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
      off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(
    /** Event */
    evt,
    /** Touch */
    touch) {
      touch = touch || evt.pointerType == 'touch' && evt;

      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._onTouchMove);
        } else if (touch) {
          on(document, 'touchmove', this._onTouchMove);
        } else {
          on(document, 'mousemove', this._onTouchMove);
        }
      } else {
        on(dragEl, 'dragend', this);
        on(rootEl, 'dragstart', this._onDragStart);
      }

      try {
        if (document.selection) {
          // Timeout neccessary for IE9
          _nextTick(function () {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {}
    },
    _dragStarted: function _dragStarted(fallback, evt) {

      awaitingDragStarted = false;

      if (rootEl && dragEl) {
        pluginEvent('dragStarted', this, {
          evt: evt
        });

        if (this.nativeDraggable) {
          on(document, 'dragover', _checkOutsideTargetEl);
        }

        var options = this.options; // Apply effect

        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost(); // Drag start event

        _dispatchEvent({
          sortable: this,
          name: 'start',
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;

        _hideGhostForTarget();

        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;

        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent) break;
          parent = target;
        }

        dragEl.parentNode[expando]._isOutsideThisEl(target);

        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target: target,
                rootEl: parent
              });

              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }

            target = parent; // store last element
          }
          /* jshint boss:true */
          while (parent = parent.parentNode);
        }

        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(
    /**TouchEvent*/
    evt) {
      if (tapEvt) {
        var options = this.options,
            fallbackTolerance = options.fallbackTolerance,
            fallbackOffset = options.fallbackOffset,
            touch = evt.touches ? evt.touches[0] : evt,
            ghostMatrix = ghostEl && matrix(ghostEl, true),
            scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
            scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
            relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
            dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
            dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }

          this._onDragStart(evt, true);
        }

        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }

          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css(ghostEl, 'webkitTransform', cssMatrix);
          css(ghostEl, 'mozTransform', cssMatrix);
          css(ghostEl, 'msTransform', cssMatrix);
          css(ghostEl, 'transform', cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }

        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      // Bug if using scale(): https://stackoverflow.com/questions/2637058
      // Not being adjusted for
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl,
            rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
            options = this.options; // Position absolutely

        if (PositionGhostAbsolutely) {
          // Get relatively positioned parent
          ghostRelativeParent = container;

          while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }

          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }

          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }

        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, 'transition', '');
        css(ghostEl, 'transform', '');
        css(ghostEl, 'box-sizing', 'border-box');
        css(ghostEl, 'margin', 0);
        css(ghostEl, 'top', rect.top);
        css(ghostEl, 'left', rect.left);
        css(ghostEl, 'width', rect.width);
        css(ghostEl, 'height', rect.height);
        css(ghostEl, 'opacity', '0.8');
        css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
        css(ghostEl, 'zIndex', '100000');
        css(ghostEl, 'pointerEvents', 'none');
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl); // Set transform-origin

        css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
      }
    },
    _onDragStart: function _onDragStart(
    /**Event*/
    evt,
    /**boolean*/
    fallback) {
      var _this = this;

      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent('dragStart', this, {
        evt: evt
      });

      if (Sortable.eventCanceled) {
        this._onDrop();

        return;
      }

      pluginEvent('setupClone', this);

      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.draggable = false;
        cloneEl.style['will-change'] = '';

        this._hideClone();

        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      } // #1143: IFrame support workaround


      _this.cloneId = _nextTick(function () {
        pluginEvent('clone', _this);
        if (Sortable.eventCanceled) return;

        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }

        _this._hideClone();

        _dispatchEvent({
          sortable: _this,
          name: 'clone'
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        // Undo what was set in _prepareDragStart before drag started
        off(document, 'mouseup', _this._onDrop);
        off(document, 'touchend', _this._onDrop);
        off(document, 'touchcancel', _this._onDrop);

        if (dataTransfer) {
          dataTransfer.effectAllowed = 'move';
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }

        on(document, 'drop', _this); // #1276 fix:

        css(dragEl, 'transform', 'translateZ(0)');
      }

      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, 'selectstart', _this);
      moved = true;

      if (Safari) {
        css(document.body, 'user-select', 'none');
      }
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function _onDragOver(
    /**Event*/
    evt) {
      var el = this.el,
          target = evt.target,
          dragRect,
          targetRect,
          revert,
          options = this.options,
          group = options.group,
          activeSortable = Sortable.active,
          isOwner = activeGroup === group,
          canSort = options.sort,
          fromSortable = putSortable || activeSortable,
          vertical,
          _this = this,
          completedFired = false;

      if (_silent) return;

      function dragOverEvent(name, extra) {
        pluginEvent(name, _this, _objectSpread({
          evt: evt,
          isOwner: isOwner,
          axis: vertical ? 'vertical' : 'horizontal',
          revert: revert,
          dragRect: dragRect,
          targetRect: targetRect,
          canSort: canSort,
          fromSortable: fromSortable,
          target: target,
          completed: completed,
          onMove: function onMove(target, after) {
            return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
          },
          changed: changed
        }, extra));
      } // Capture animation state


      function capture() {
        dragOverEvent('dragOverAnimationCapture');

        _this.captureAnimationState();

        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      } // Return invocation when dragEl is inserted (or completed)


      function completed(insertion) {
        dragOverEvent('dragOverCompleted', {
          insertion: insertion
        });

        if (insertion) {
          // Clones must be hidden before folding animation to capture dragRectAbsolute properly
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }

          if (_this !== fromSortable) {
            // Set ghost class to new sortable's ghost class
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }

          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          } // Animation


          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }

          _this.animateAll(function () {
            dragOverEvent('dragOverAnimationComplete');
            _this._ignoreWhileAnimating = null;
          });

          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        } // Null lastTarget if it is not inside a previously swapped element


        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        } // no bubbling and not fallback


        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


          !insertion && nearestEmptyInsertDetectEvent(evt);
        }

        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      } // Call when dragEl has been inserted


      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);

        _dispatchEvent({
          sortable: _this,
          name: 'change',
          toEl: el,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex,
          originalEvent: evt
        });
      }

      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }

      target = closest(target, options.draggable, el, true);
      dragOverEvent('dragOver');
      if (Sortable.eventCanceled) return completedFired;

      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }

      ignoreNextClick = false;

      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
      : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === 'vertical';
        dragRect = getRect(dragEl);
        dragOverEvent('dragOverValid');
        if (Sortable.eventCanceled) return completedFired;

        if (revert) {
          parentEl = rootEl; // actualization

          capture();

          this._hideClone();

          dragOverEvent('revert');

          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }

          return completed(true);
        }

        var elLastChild = lastChild(el, options.draggable);

        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          // If already at end of list: Do not insert
          if (elLastChild === dragEl) {
            return completed(false);
          } // assign target only if condition is true


          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }

          if (target) {
            targetRect = getRect(target);
          }

          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();
            el.appendChild(dragEl);
            parentEl = el; // actualization

            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0,
              targetBeforeFirstSwap,
              differentLevel = dragEl.parentNode !== el,
              differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
              side1 = vertical ? 'top' : 'left',
              scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
              scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }

          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;

          if (direction !== 0) {
            // Check if target is beside dragEl in respective direction (ignoring hidden elements)
            var dragIndex = index(dragEl);

            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
          } // If dragEl is already beside target: Do not insert


          if (direction === 0 || sibling === target) {
            return completed(false);
          }

          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling,
              after = false;
          after = direction === 1;

          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }

            _silent = true;
            setTimeout(_unsilent, 30);
            capture();

            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            } // Undo chrome's scroll adjustment (has no effect on other browsers)


            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }

            parentEl = dragEl.parentNode; // actualization
            // must be done before animation

            if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }

            changed();
            return completed(true);
          }
        }

        if (el.contains(dragEl)) {
          return completed(false);
        }
      }

      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, 'mousemove', this._onTouchMove);
      off(document, 'touchmove', this._onTouchMove);
      off(document, 'pointermove', this._onTouchMove);
      off(document, 'dragover', nearestEmptyInsertDetectEvent);
      off(document, 'mousemove', nearestEmptyInsertDetectEvent);
      off(document, 'touchmove', nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, 'mouseup', this._onDrop);
      off(ownerDocument, 'touchend', this._onDrop);
      off(ownerDocument, 'pointerup', this._onDrop);
      off(ownerDocument, 'touchcancel', this._onDrop);
      off(document, 'selectstart', this);
    },
    _onDrop: function _onDrop(
    /**Event*/
    evt) {
      var el = this.el,
          options = this.options; // Get the index of the dragged element within its parent

      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent('drop', this, {
        evt: evt
      });
      parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      if (Sortable.eventCanceled) {
        this._nulling();

        return;
      }

      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);

      _cancelNextTick(this.cloneId);

      _cancelNextTick(this._dragStartId); // Unbind events


      if (this.nativeDraggable) {
        off(document, 'drop', this);
        off(el, 'dragstart', this._onDragStart);
      }

      this._offMoveEvents();

      this._offUpEvents();

      if (Safari) {
        css(document.body, 'user-select', '');
      }

      css(dragEl, 'transform', '');

      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }

        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
          // Remove clone(s)
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }

        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, 'dragend', this);
          }

          _disableDraggable(dragEl);

          dragEl.style['will-change'] = ''; // Remove classes
          // ghostClass is added in dragStarted

          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }

          toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

          _dispatchEvent({
            sortable: this,
            name: 'unchoose',
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });

          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              // Add event
              _dispatchEvent({
                rootEl: parentEl,
                name: 'add',
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              }); // Remove event


              _dispatchEvent({
                sortable: this,
                name: 'remove',
                toEl: parentEl,
                originalEvent: evt
              }); // drag from one list and drop into another


              _dispatchEvent({
                rootEl: parentEl,
                name: 'sort',
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }

            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                // drag & drop within the same list
                _dispatchEvent({
                  sortable: this,
                  name: 'update',
                  toEl: parentEl,
                  originalEvent: evt
                });

                _dispatchEvent({
                  sortable: this,
                  name: 'sort',
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }

          if (Sortable.active) {
            /* jshint eqnull:true */
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }

            _dispatchEvent({
              sortable: this,
              name: 'end',
              toEl: parentEl,
              originalEvent: evt
            }); // Save sorting


            this.save();
          }
        }
      }

      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent('nulling', this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function (el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(
    /**Event*/
    evt) {
      switch (evt.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(evt);

          break;

        case 'dragenter':
        case 'dragover':
          if (dragEl) {
            this._onDragOver(evt);

            _globalDragOver(evt);
          }

          break;

        case 'selectstart':
          evt.preventDefault();
          break;
      }
    },

    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function toArray() {
      var order = [],
          el,
          children = this.el.children,
          i = 0,
          n = children.length,
          options = this.options;

      for (; i < n; i++) {
        el = children[i];

        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }

      return order;
    },

    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function sort(order) {
      var items = {},
          rootEl = this.el;
      this.toArray().forEach(function (id, i) {
        var el = rootEl.children[i];

        if (closest(el, this.options.draggable, rootEl, false)) {
          items[id] = el;
        }
      }, this);
      order.forEach(function (id) {
        if (items[id]) {
          rootEl.removeChild(items[id]);
          rootEl.appendChild(items[id]);
        }
      });
    },

    /**
     * Save the current sorting
     */
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },

    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },

    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function option(name, value) {
      var options = this.options;

      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);

        if (typeof modifiedValue !== 'undefined') {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }

        if (name === 'group') {
          _prepareGroup(options);
        }
      }
    },

    /**
     * Destroy
     */
    destroy: function destroy() {
      pluginEvent('destroy', this);
      var el = this.el;
      el[expando] = null;
      off(el, 'mousedown', this._onTapStart);
      off(el, 'touchstart', this._onTapStart);
      off(el, 'pointerdown', this._onTapStart);

      if (this.nativeDraggable) {
        off(el, 'dragover', this);
        off(el, 'dragenter', this);
      } // Remove draggable attributes


      Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
        el.removeAttribute('draggable');
      });

      this._onDrop();

      this._disableDelayedDragEvents();

      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent('hideClone', this);
        if (Sortable.eventCanceled) return;
        css(cloneEl, 'display', 'none');

        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }

        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable) {
      if (putSortable.lastPutMode !== 'clone') {
        this._hideClone();

        return;
      }

      if (cloneHidden) {
        pluginEvent('showClone', this);
        if (Sortable.eventCanceled) return; // show clone at dragEl or original position

        if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }

        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }

        css(cloneEl, 'display', '');
        cloneHidden = false;
      }
    }
  };

  function _globalDragOver(
  /**Event*/
  evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'move';
    }

    evt.cancelable && evt.preventDefault();
  }

  function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt,
        sortable = fromEl[expando],
        onMoveFn = sortable.options.onMove,
        retVal; // Support for new CustomEvent feature

    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent('move', {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent('Event');
      evt.initEvent('move', true, true);
    }

    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);

    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }

    return retVal;
  }

  function _disableDraggable(el) {
    el.draggable = false;
  }

  function _unsilent() {
    _silent = false;
  }

  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }

  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
        targetLength = vertical ? targetRect.height : targetRect.width,
        targetS1 = vertical ? targetRect.top : targetRect.left,
        targetS2 = vertical ? targetRect.bottom : targetRect.right,
        invert = false;

    if (!invertSwap) {
      // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
        // check if past first invert threshold on side opposite of lastDirection
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          // past first invert threshold, do not restrict inverted threshold to dragEl shadow
          pastFirstInvertThresh = true;
        }

        if (!pastFirstInvertThresh) {
          // dragEl shadow (target move distance shadow)
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
          : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        // Regular
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }

    invert = invert || invertSwap;

    if (invert) {
      // Invert of regular
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }

    return 0;
  }
  /**
   * Gets the direction dragEl must be swapped relative to target in order to make it
   * seem that dragEl has been "inserted" into that element's position
   * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
   * @return {Number}                   Direction dragEl must be swapped
   */


  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  /**
   * Generate id
   * @param   {HTMLElement} el
   * @returns {String}
   * @private
   */


  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent,
        i = str.length,
        sum = 0;

    while (i--) {
      sum += str.charCodeAt(i);
    }

    return sum.toString(36);
  }

  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName('input');
    var idx = inputs.length;

    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }

  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }

  function _cancelNextTick(id) {
    return clearTimeout(id);
  } // Fixed #973:


  if (documentExists) {
    on(document, 'touchmove', function (evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  } // Export utils


  Sortable.utils = {
    on: on,
    off: off,
    css: css,
    find: find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend: extend,
    throttle: throttle,
    closest: closest,
    toggleClass: toggleClass,
    clone: clone,
    index: index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild: getChild
  };
  /**
   * Get the Sortable instance of an element
   * @param  {HTMLElement} element The element
   * @return {Sortable|undefined}         The instance of Sortable
   */

  Sortable.get = function (element) {
    return element[expando];
  };
  /**
   * Mount a plugin to Sortable
   * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
   */


  Sortable.mount = function () {
    for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }

    if (plugins[0].constructor === Array) plugins = plugins[0];
    plugins.forEach(function (plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }

      if (plugin.utils) Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  /**
   * Create sortable instance
   * @param {HTMLElement}  el
   * @param {Object}      [options]
   */


  Sortable.create = function (el, options) {
    return new Sortable(el, options);
  }; // Export


  Sortable.version = version;

  var autoScrolls = [],
      scrollEl,
      scrollRootEl,
      scrolling = false,
      lastAutoScrollX,
      lastAutoScrollY,
      touchEvt$1,
      pointerElemChangedInterval;

  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      }; // Bind all private methods

      for (var fn in this) {
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
          this[fn] = this[fn].bind(this);
        }
      }
    }

    AutoScroll.prototype = {
      dragStarted: function dragStarted(_ref) {
        var originalEvent = _ref.originalEvent;

        if (this.sortable.nativeDraggable) {
          on(document, 'dragover', this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, 'pointermove', this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, 'touchmove', this._handleFallbackAutoScroll);
          } else {
            on(document, 'mousemove', this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent;

        // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop() {
        if (this.sortable.nativeDraggable) {
          off(document, 'dragover', this._handleAutoScroll);
        } else {
          off(document, 'pointermove', this._handleFallbackAutoScroll);
          off(document, 'touchmove', this._handleFallbackAutoScroll);
          off(document, 'mousemove', this._handleFallbackAutoScroll);
        }

        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;

        var x = (evt.touches ? evt.touches[0] : evt).clientX,
            y = (evt.touches ? evt.touches[0] : evt).clientY,
            elem = document.elementFromPoint(x, y);
        touchEvt$1 = evt; // IE does not seem to have native autoscroll,
        // Edge's autoscroll seems too conditional,
        // MACOS Safari does not have autoscroll,
        // Firefox and Chrome are good

        if (fallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

          var ogElemScroller = getParentAutoScrollElement(elem, true);

          if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

            pointerElemChangedInterval = setInterval(function () {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }

              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x;
            lastAutoScrollY = y;
          }
        } else {
          // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }

          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: 'scroll',
      initializeByDefault: true
    });
  }

  function clearAutoScrolls() {
    autoScrolls.forEach(function (autoScroll) {
      clearInterval(autoScroll.pid);
    });
    autoScrolls = [];
  }

  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }

  var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
    // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
    if (!options.scroll) return;
    var x = (evt.touches ? evt.touches[0] : evt).clientX,
        y = (evt.touches ? evt.touches[0] : evt).clientY,
        sens = options.scrollSensitivity,
        speed = options.scrollSpeed,
        winScroller = getWindowScrollingElement();
    var scrollThisInstance = false,
        scrollCustomFn; // New scroll root, set scrollEl

    if (scrollRootEl !== rootEl) {
      scrollRootEl = rootEl;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;

      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl, true);
      }
    }

    var layersOut = 0;
    var currentParent = scrollEl;

    do {
      var el = currentParent,
          rect = getRect(el),
          top = rect.top,
          bottom = rect.bottom,
          left = rect.left,
          right = rect.right,
          width = rect.width,
          height = rect.height,
          canScrollX = void 0,
          canScrollY = void 0,
          scrollWidth = el.scrollWidth,
          scrollHeight = el.scrollHeight,
          elCSS = css(el),
          scrollPosX = el.scrollLeft,
          scrollPosY = el.scrollTop;

      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
        canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
        canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
      }

      var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

      if (!autoScrolls[layersOut]) {
        for (var i = 0; i <= layersOut; i++) {
          if (!autoScrolls[i]) {
            autoScrolls[i] = {};
          }
        }
      }

      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);

        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          /* jshint loopfunc:true */

          autoScrolls[layersOut].pid = setInterval(function () {
            // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

            }

            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

            if (typeof scrollCustomFn === 'function') {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
                return;
              }
            }

            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }.bind({
            layer: layersOut
          }), 24);
        }
      }

      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

    scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
  }, 30);

  var drop = function drop(_ref) {
    var originalEvent = _ref.originalEvent,
        putSortable = _ref.putSortable,
        dragEl = _ref.dragEl,
        activeSortable = _ref.activeSortable,
        dispatchSortableEvent = _ref.dispatchSortableEvent,
        hideGhostForTarget = _ref.hideGhostForTarget,
        unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent) return;
    var toSortable = putSortable || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();

    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent('spill');
      this.onSpill({
        dragEl: dragEl,
        putSortable: putSortable
      });
    }
  };

  function Revert() {}

  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl = _ref3.dragEl,
          putSortable = _ref3.putSortable;
      this.sortable.captureAnimationState();

      if (putSortable) {
        putSortable.captureAnimationState();
      }

      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl);
      }

      this.sortable.animateAll();

      if (putSortable) {
        putSortable.animateAll();
      }
    },
    drop: drop
  };

  _extends(Revert, {
    pluginName: 'revertOnSpill'
  });

  function Remove() {}

  Remove.prototype = {
    onSpill: function onSpill(_ref4) {
      var dragEl = _ref4.dragEl,
          putSortable = _ref4.putSortable;
      var parentSortable = putSortable || this.sortable;
      parentSortable.captureAnimationState();
      dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
      parentSortable.animateAll();
    },
    drop: drop
  };

  _extends(Remove, {
    pluginName: 'removeOnSpill'
  });

  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);

  var vuedraggable_umd = createCommonjsModule(function (module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
  	module.exports = factory(Sortable);
  })((typeof self !== 'undefined' ? self : commonjsGlobal), function(__WEBPACK_EXTERNAL_MODULE_a352__) {
  return /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
  /******/ 		if(mode & 1) value = __webpack_require__(value);
  /******/ 		if(mode & 8) return value;
  /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  /******/ 		var ns = Object.create(null);
  /******/ 		__webpack_require__.r(ns);
  /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  /******/ 		return ns;
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
  /******/ })
  /************************************************************************/
  /******/ ({

  /***/ "01f9":
  /***/ (function(module, exports, __webpack_require__) {

  var LIBRARY = __webpack_require__("2d00");
  var $export = __webpack_require__("5ca1");
  var redefine = __webpack_require__("2aba");
  var hide = __webpack_require__("32e9");
  var Iterators = __webpack_require__("84f2");
  var $iterCreate = __webpack_require__("41a0");
  var setToStringTag = __webpack_require__("7f20");
  var getPrototypeOf = __webpack_require__("38fd");
  var ITERATOR = __webpack_require__("2b4c")('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    // Plug for library
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) redefine(proto, key, methods[key]);
      } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };


  /***/ }),

  /***/ "02f4":
  /***/ (function(module, exports, __webpack_require__) {

  var toInteger = __webpack_require__("4588");
  var defined = __webpack_require__("be13");
  // true  -> String#at
  // false -> String#codePointAt
  module.exports = function (TO_STRING) {
    return function (that, pos) {
      var s = String(defined(that));
      var i = toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };


  /***/ }),

  /***/ "0390":
  /***/ (function(module, exports, __webpack_require__) {

  var at = __webpack_require__("02f4")(true);

   // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  module.exports = function (S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };


  /***/ }),

  /***/ "0bfb":
  /***/ (function(module, exports, __webpack_require__) {

  // 21.2.5.3 get RegExp.prototype.flags
  var anObject = __webpack_require__("cb7c");
  module.exports = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };


  /***/ }),

  /***/ "0d58":
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  var $keys = __webpack_require__("ce10");
  var enumBugKeys = __webpack_require__("e11e");

  module.exports = Object.keys || function keys(O) {
    return $keys(O, enumBugKeys);
  };


  /***/ }),

  /***/ "1495":
  /***/ (function(module, exports, __webpack_require__) {

  var dP = __webpack_require__("86cc");
  var anObject = __webpack_require__("cb7c");
  var getKeys = __webpack_require__("0d58");

  module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = getKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) dP.f(O, P = keys[i++], Properties[P]);
    return O;
  };


  /***/ }),

  /***/ "214f":
  /***/ (function(module, exports, __webpack_require__) {

  __webpack_require__("b0c5");
  var redefine = __webpack_require__("2aba");
  var hide = __webpack_require__("32e9");
  var fails = __webpack_require__("79e5");
  var defined = __webpack_require__("be13");
  var wks = __webpack_require__("2b4c");
  var regexpExec = __webpack_require__("520a");

  var SPECIES = wks('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
  })();

  module.exports = function (KEY, length, exec) {
    var SYMBOL = wks(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      re.exec = function () { execCalled = true; return null; };
      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () { return re; };
      }
      re[SYMBOL]('');
      return !execCalled;
    }) : undefined;

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(
        defined,
        SYMBOL,
        ''[KEY],
        function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        }
      );
      var strfn = fns[0];
      var rxfn = fns[1];

      redefine(String.prototype, KEY, strfn);
      hide(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return rxfn.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return rxfn.call(string, this); }
      );
    }
  };


  /***/ }),

  /***/ "230e":
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__("d3f4");
  var document = __webpack_require__("7726").document;
  // typeof document.createElement is 'object' in old IE
  var is = isObject(document) && isObject(document.createElement);
  module.exports = function (it) {
    return is ? document.createElement(it) : {};
  };


  /***/ }),

  /***/ "23c6":
  /***/ (function(module, exports, __webpack_require__) {

  // getting tag from 19.1.3.6 Object.prototype.toString()
  var cof = __webpack_require__("2d95");
  var TAG = __webpack_require__("2b4c")('toStringTag');
  // ES3 wrong here
  var ARG = cof(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  module.exports = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
      // builtinTag case
      : ARG ? cof(O)
      // ES3 arguments fallback
      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };


  /***/ }),

  /***/ "2621":
  /***/ (function(module, exports) {

  exports.f = Object.getOwnPropertySymbols;


  /***/ }),

  /***/ "2aba":
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__("7726");
  var hide = __webpack_require__("32e9");
  var has = __webpack_require__("69a8");
  var SRC = __webpack_require__("ca5a")('src');
  var $toString = __webpack_require__("fa5b");
  var TO_STRING = 'toString';
  var TPL = ('' + $toString).split(TO_STRING);

  __webpack_require__("8378").inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) has(val, 'name') || hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === global) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      hide(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      hide(O, key, val);
    }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });


  /***/ }),

  /***/ "2aeb":
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  var anObject = __webpack_require__("cb7c");
  var dPs = __webpack_require__("1495");
  var enumBugKeys = __webpack_require__("e11e");
  var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = __webpack_require__("230e")('iframe');
    var i = enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    __webpack_require__("fab2").appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
    return createDict();
  };

  module.exports = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : dPs(result, Properties);
  };


  /***/ }),

  /***/ "2b4c":
  /***/ (function(module, exports, __webpack_require__) {

  var store = __webpack_require__("5537")('wks');
  var uid = __webpack_require__("ca5a");
  var Symbol = __webpack_require__("7726").Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
  };

  $exports.store = store;


  /***/ }),

  /***/ "2d00":
  /***/ (function(module, exports) {

  module.exports = false;


  /***/ }),

  /***/ "2d95":
  /***/ (function(module, exports) {

  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };


  /***/ }),

  /***/ "2fdb":
  /***/ (function(module, exports, __webpack_require__) {
  // 21.1.3.7 String.prototype.includes(searchString, position = 0)

  var $export = __webpack_require__("5ca1");
  var context = __webpack_require__("d2c8");
  var INCLUDES = 'includes';

  $export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~context(this, searchString, INCLUDES)
        .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
    }
  });


  /***/ }),

  /***/ "32e9":
  /***/ (function(module, exports, __webpack_require__) {

  var dP = __webpack_require__("86cc");
  var createDesc = __webpack_require__("4630");
  module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
    return dP.f(object, key, createDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };


  /***/ }),

  /***/ "38fd":
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  var has = __webpack_require__("69a8");
  var toObject = __webpack_require__("4bf8");
  var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
  var ObjectProto = Object.prototype;

  module.exports = Object.getPrototypeOf || function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  };


  /***/ }),

  /***/ "41a0":
  /***/ (function(module, exports, __webpack_require__) {

  var create = __webpack_require__("2aeb");
  var descriptor = __webpack_require__("4630");
  var setToStringTag = __webpack_require__("7f20");
  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  __webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

  module.exports = function (Constructor, NAME, next) {
    Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
    setToStringTag(Constructor, NAME + ' Iterator');
  };


  /***/ }),

  /***/ "456d":
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.14 Object.keys(O)
  var toObject = __webpack_require__("4bf8");
  var $keys = __webpack_require__("0d58");

  __webpack_require__("5eda")('keys', function () {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });


  /***/ }),

  /***/ "4588":
  /***/ (function(module, exports) {

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  module.exports = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };


  /***/ }),

  /***/ "4630":
  /***/ (function(module, exports) {

  module.exports = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };


  /***/ }),

  /***/ "4bf8":
  /***/ (function(module, exports, __webpack_require__) {

  // 7.1.13 ToObject(argument)
  var defined = __webpack_require__("be13");
  module.exports = function (it) {
    return Object(defined(it));
  };


  /***/ }),

  /***/ "5147":
  /***/ (function(module, exports, __webpack_require__) {

  var MATCH = __webpack_require__("2b4c")('match');
  module.exports = function (KEY) {
    var re = /./;
    try {
      '/./'[KEY](re);
    } catch (e) {
      try {
        re[MATCH] = false;
        return !'/./'[KEY](re);
      } catch (f) { /* empty */ }
    } return true;
  };


  /***/ }),

  /***/ "520a":
  /***/ (function(module, exports, __webpack_require__) {


  var regexpFlags = __webpack_require__("0bfb");

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var LAST_INDEX = 'lastIndex';

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/,
        re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  module.exports = patchedExec;


  /***/ }),

  /***/ "52a7":
  /***/ (function(module, exports) {

  exports.f = {}.propertyIsEnumerable;


  /***/ }),

  /***/ "5537":
  /***/ (function(module, exports, __webpack_require__) {

  var core = __webpack_require__("8378");
  var global = __webpack_require__("7726");
  var SHARED = '__core-js_shared__';
  var store = global[SHARED] || (global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: core.version,
    mode: __webpack_require__("2d00") ? 'pure' : 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });


  /***/ }),

  /***/ "5ca1":
  /***/ (function(module, exports, __webpack_require__) {

  var global = __webpack_require__("7726");
  var core = __webpack_require__("8378");
  var hide = __webpack_require__("32e9");
  var redefine = __webpack_require__("2aba");
  var ctx = __webpack_require__("9b43");
  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
    var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      // extend global
      if (target) redefine(target, key, out, type & $export.U);
      // export
      if (exports[key] != out) hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  global.core = core;
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  module.exports = $export;


  /***/ }),

  /***/ "5eda":
  /***/ (function(module, exports, __webpack_require__) {

  // most Object methods by ES6 should accept primitives
  var $export = __webpack_require__("5ca1");
  var core = __webpack_require__("8378");
  var fails = __webpack_require__("79e5");
  module.exports = function (KEY, exec) {
    var fn = (core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
  };


  /***/ }),

  /***/ "5f1b":
  /***/ (function(module, exports, __webpack_require__) {


  var classof = __webpack_require__("23c6");
  var builtinExec = RegExp.prototype.exec;

   // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  module.exports = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw new TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }
    if (classof(R) !== 'RegExp') {
      throw new TypeError('RegExp#exec called on incompatible receiver');
    }
    return builtinExec.call(R, S);
  };


  /***/ }),

  /***/ "613b":
  /***/ (function(module, exports, __webpack_require__) {

  var shared = __webpack_require__("5537")('keys');
  var uid = __webpack_require__("ca5a");
  module.exports = function (key) {
    return shared[key] || (shared[key] = uid(key));
  };


  /***/ }),

  /***/ "626a":
  /***/ (function(module, exports, __webpack_require__) {

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var cof = __webpack_require__("2d95");
  // eslint-disable-next-line no-prototype-builtins
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };


  /***/ }),

  /***/ "6762":
  /***/ (function(module, exports, __webpack_require__) {

  // https://github.com/tc39/Array.prototype.includes
  var $export = __webpack_require__("5ca1");
  var $includes = __webpack_require__("c366")(true);

  $export($export.P, 'Array', {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  __webpack_require__("9c6c")('includes');


  /***/ }),

  /***/ "6821":
  /***/ (function(module, exports, __webpack_require__) {

  // to indexed object, toObject with fallback for non-array-like ES3 strings
  var IObject = __webpack_require__("626a");
  var defined = __webpack_require__("be13");
  module.exports = function (it) {
    return IObject(defined(it));
  };


  /***/ }),

  /***/ "69a8":
  /***/ (function(module, exports) {

  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function (it, key) {
    return hasOwnProperty.call(it, key);
  };


  /***/ }),

  /***/ "6a99":
  /***/ (function(module, exports, __webpack_require__) {

  // 7.1.1 ToPrimitive(input [, PreferredType])
  var isObject = __webpack_require__("d3f4");
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  module.exports = function (it, S) {
    if (!isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };


  /***/ }),

  /***/ "7333":
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.2.1 Object.assign(target, source, ...)
  var getKeys = __webpack_require__("0d58");
  var gOPS = __webpack_require__("2621");
  var pIE = __webpack_require__("52a7");
  var toObject = __webpack_require__("4bf8");
  var IObject = __webpack_require__("626a");
  var $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  module.exports = !$assign || __webpack_require__("79e5")(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) { B[k] = k; });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = gOPS.f;
    var isEnum = pIE.f;
    while (aLen > index) {
      var S = IObject(arguments[index++]);
      var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    } return T;
  } : $assign;


  /***/ }),

  /***/ "7726":
  /***/ (function(module, exports) {

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


  /***/ }),

  /***/ "77f1":
  /***/ (function(module, exports, __webpack_require__) {

  var toInteger = __webpack_require__("4588");
  var max = Math.max;
  var min = Math.min;
  module.exports = function (index, length) {
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  };


  /***/ }),

  /***/ "79e5":
  /***/ (function(module, exports) {

  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };


  /***/ }),

  /***/ "7f20":
  /***/ (function(module, exports, __webpack_require__) {

  var def = __webpack_require__("86cc").f;
  var has = __webpack_require__("69a8");
  var TAG = __webpack_require__("2b4c")('toStringTag');

  module.exports = function (it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };


  /***/ }),

  /***/ "8378":
  /***/ (function(module, exports) {

  var core = module.exports = { version: '2.6.5' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


  /***/ }),

  /***/ "84f2":
  /***/ (function(module, exports) {

  module.exports = {};


  /***/ }),

  /***/ "86cc":
  /***/ (function(module, exports, __webpack_require__) {

  var anObject = __webpack_require__("cb7c");
  var IE8_DOM_DEFINE = __webpack_require__("c69a");
  var toPrimitive = __webpack_require__("6a99");
  var dP = Object.defineProperty;

  exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };


  /***/ }),

  /***/ "9b43":
  /***/ (function(module, exports, __webpack_require__) {

  // optional / simple context binding
  var aFunction = __webpack_require__("d8e8");
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };


  /***/ }),

  /***/ "9c6c":
  /***/ (function(module, exports, __webpack_require__) {

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
  var ArrayProto = Array.prototype;
  if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
  module.exports = function (key) {
    ArrayProto[UNSCOPABLES][key] = true;
  };


  /***/ }),

  /***/ "9def":
  /***/ (function(module, exports, __webpack_require__) {

  // 7.1.15 ToLength
  var toInteger = __webpack_require__("4588");
  var min = Math.min;
  module.exports = function (it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };


  /***/ }),

  /***/ "9e1e":
  /***/ (function(module, exports, __webpack_require__) {

  // Thank's IE8 for his funny defineProperty
  module.exports = !__webpack_require__("79e5")(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });


  /***/ }),

  /***/ "a352":
  /***/ (function(module, exports) {

  module.exports = __WEBPACK_EXTERNAL_MODULE_a352__;

  /***/ }),

  /***/ "a481":
  /***/ (function(module, exports, __webpack_require__) {


  var anObject = __webpack_require__("cb7c");
  var toObject = __webpack_require__("4bf8");
  var toLength = __webpack_require__("9def");
  var toInteger = __webpack_require__("4588");
  var advanceStringIndex = __webpack_require__("0390");
  var regExpExec = __webpack_require__("5f1b");
  var max = Math.max;
  var min = Math.min;
  var floor = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  __webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined
          ? fn.call(searchValue, O, replaceValue)
          : $replace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative($replace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);
        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;
          results.push(result);
          if (!global) break;
          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }
        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position = max(min(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

      // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return $replace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  });


  /***/ }),

  /***/ "aae3":
  /***/ (function(module, exports, __webpack_require__) {

  // 7.2.8 IsRegExp(argument)
  var isObject = __webpack_require__("d3f4");
  var cof = __webpack_require__("2d95");
  var MATCH = __webpack_require__("2b4c")('match');
  module.exports = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
  };


  /***/ }),

  /***/ "ac6a":
  /***/ (function(module, exports, __webpack_require__) {

  var $iterators = __webpack_require__("cadf");
  var getKeys = __webpack_require__("0d58");
  var redefine = __webpack_require__("2aba");
  var global = __webpack_require__("7726");
  var hide = __webpack_require__("32e9");
  var Iterators = __webpack_require__("84f2");
  var wks = __webpack_require__("2b4c");
  var ITERATOR = wks('iterator');
  var TO_STRING_TAG = wks('toStringTag');
  var ArrayValues = Iterators.Array;

  var DOMIterables = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
    var NAME = collections[i];
    var explicit = DOMIterables[NAME];
    var Collection = global[NAME];
    var proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
      if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
      Iterators[NAME] = ArrayValues;
      if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }


  /***/ }),

  /***/ "b0c5":
  /***/ (function(module, exports, __webpack_require__) {

  var regexpExec = __webpack_require__("520a");
  __webpack_require__("5ca1")({
    target: 'RegExp',
    proto: true,
    forced: regexpExec !== /./.exec
  }, {
    exec: regexpExec
  });


  /***/ }),

  /***/ "be13":
  /***/ (function(module, exports) {

  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };


  /***/ }),

  /***/ "c366":
  /***/ (function(module, exports, __webpack_require__) {

  // false -> Array#indexOf
  // true  -> Array#includes
  var toIObject = __webpack_require__("6821");
  var toLength = __webpack_require__("9def");
  var toAbsoluteIndex = __webpack_require__("77f1");
  module.exports = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };


  /***/ }),

  /***/ "c649":
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  /* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return insertNodeAt; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return camelize; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return console; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeNode; });
  /* harmony import */ __webpack_require__("a481");


  function getConsole() {
    if (typeof window !== "undefined") {
      return window.console;
    }

    return global.console;
  }

  var console = getConsole();

  function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }

  var regex = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(regex, function (_, c) {
      return c ? c.toUpperCase() : "";
    });
  });

  function removeNode(node) {
    if (node.parentElement !== null) {
      node.parentElement.removeChild(node);
    }
  }

  function insertNodeAt(fatherNode, node, position) {
    var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
    fatherNode.insertBefore(node, refNode);
  }


  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")));

  /***/ }),

  /***/ "c69a":
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
    return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
  });


  /***/ }),

  /***/ "c8ba":
  /***/ (function(module, exports) {

  var g;

  // This works in non-strict mode
  g = (function() {
  	return this;
  })();

  try {
  	// This works if eval is allowed (see CSP)
  	g = g || new Function("return this")();
  } catch (e) {
  	// This works if the window reference is available
  	if (typeof window === "object") g = window;
  }

  // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}

  module.exports = g;


  /***/ }),

  /***/ "ca5a":
  /***/ (function(module, exports) {

  var id = 0;
  var px = Math.random();
  module.exports = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };


  /***/ }),

  /***/ "cadf":
  /***/ (function(module, exports, __webpack_require__) {

  var addToUnscopables = __webpack_require__("9c6c");
  var step = __webpack_require__("d53b");
  var Iterators = __webpack_require__("84f2");
  var toIObject = __webpack_require__("6821");

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
    this._t = toIObject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys') return step(0, index);
    if (kind == 'values') return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators.Arguments = Iterators.Array;

  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');


  /***/ }),

  /***/ "cb7c":
  /***/ (function(module, exports, __webpack_require__) {

  var isObject = __webpack_require__("d3f4");
  module.exports = function (it) {
    if (!isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };


  /***/ }),

  /***/ "ce10":
  /***/ (function(module, exports, __webpack_require__) {

  var has = __webpack_require__("69a8");
  var toIObject = __webpack_require__("6821");
  var arrayIndexOf = __webpack_require__("c366")(false);
  var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

  module.exports = function (object, names) {
    var O = toIObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };


  /***/ }),

  /***/ "d2c8":
  /***/ (function(module, exports, __webpack_require__) {

  // helper for String#{startsWith, endsWith, includes}
  var isRegExp = __webpack_require__("aae3");
  var defined = __webpack_require__("be13");

  module.exports = function (that, searchString, NAME) {
    if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
    return String(defined(that));
  };


  /***/ }),

  /***/ "d3f4":
  /***/ (function(module, exports) {

  module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };


  /***/ }),

  /***/ "d53b":
  /***/ (function(module, exports) {

  module.exports = function (done, value) {
    return { value: value, done: !!done };
  };


  /***/ }),

  /***/ "d8e8":
  /***/ (function(module, exports) {

  module.exports = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };


  /***/ }),

  /***/ "e11e":
  /***/ (function(module, exports) {

  // IE 8- don't enum bug keys
  module.exports = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');


  /***/ }),

  /***/ "f559":
  /***/ (function(module, exports, __webpack_require__) {
  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])

  var $export = __webpack_require__("5ca1");
  var toLength = __webpack_require__("9def");
  var context = __webpack_require__("d2c8");
  var STARTS_WITH = 'startsWith';
  var $startsWith = ''[STARTS_WITH];

  $export($export.P + $export.F * __webpack_require__("5147")(STARTS_WITH), 'String', {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = context(this, searchString, STARTS_WITH);
      var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return $startsWith
        ? $startsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search;
    }
  });


  /***/ }),

  /***/ "f6fd":
  /***/ (function(module, exports) {

  // document.currentScript polyfill by Adam Miller

  // MIT license

  (function(document){
    var currentScript = "currentScript",
        scripts = document.getElementsByTagName('script'); // Live NodeList collection

    // If browser needs currentScript polyfill, add get currentScript() to the document object
    if (!(currentScript in document)) {
      Object.defineProperty(document, currentScript, {
        get: function(){

          // IE 6-10 supports script readyState
          // IE 10+ support stack trace
          try { throw new Error(); }
          catch (err) {

            // Find the second match for the "at" string to get file src url from stack.
            // Specifically works with the format of stack traces in IE.
            var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

            // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
            for(i in scripts){
              if(scripts[i].src == res || scripts[i].readyState == "interactive"){
                return scripts[i];
              }
            }

            // If no match, return null
            return null;
          }
        }
      });
    }
  })(document);


  /***/ }),

  /***/ "f751":
  /***/ (function(module, exports, __webpack_require__) {

  // 19.1.3.1 Object.assign(target, source)
  var $export = __webpack_require__("5ca1");

  $export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


  /***/ }),

  /***/ "fa5b":
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


  /***/ }),

  /***/ "fab2":
  /***/ (function(module, exports, __webpack_require__) {

  var document = __webpack_require__("7726").document;
  module.exports = document && document.documentElement;


  /***/ }),

  /***/ "fb15":
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  // ESM COMPAT FLAG
  __webpack_require__.r(__webpack_exports__);

  // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
  // This file is imported into lib/wc client bundles.

  if (typeof window !== 'undefined') {
    {
      __webpack_require__("f6fd");
    }

    var setPublicPath_i;
    if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
      __webpack_require__.p = setPublicPath_i[1]; // eslint-disable-line
    }
  }

  // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
  __webpack_require__("f751");

  // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
  __webpack_require__("f559");

  // EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
  __webpack_require__("ac6a");

  // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
  __webpack_require__("cadf");

  // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
  __webpack_require__("456d");

  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }
  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  // EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
  __webpack_require__("6762");

  // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
  __webpack_require__("2fdb");

  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }
  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  // EXTERNAL MODULE: external {"commonjs":"sortablejs","commonjs2":"sortablejs","amd":"sortablejs","root":"Sortable"}
  var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
  var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);

  // EXTERNAL MODULE: ./src/util/helper.js
  var helper = __webpack_require__("c649");

  // CONCATENATED MODULE: ./src/vuedraggable.js












  function buildAttribute(object, propName, value) {
    if (value === undefined) {
      return object;
    }

    object = object || {};
    object[propName] = value;
    return object;
  }

  function computeVmIndex(vnodes, element) {
    return vnodes.map(function (elt) {
      return elt.elm;
    }).indexOf(element);
  }

  function _computeIndexes(slots, children, isTransition, footerOffset) {
    if (!slots) {
      return [];
    }

    var elmFromNodes = slots.map(function (elt) {
      return elt.elm;
    });
    var footerIndex = children.length - footerOffset;

    var rawIndexes = _toConsumableArray(children).map(function (elt, idx) {
      return idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt);
    });

    return isTransition ? rawIndexes.filter(function (ind) {
      return ind !== -1;
    }) : rawIndexes;
  }

  function emit(evtName, evtData) {
    var _this = this;

    this.$nextTick(function () {
      return _this.$emit(evtName.toLowerCase(), evtData);
    });
  }

  function delegateAndEmit(evtName) {
    var _this2 = this;

    return function (evtData) {
      if (_this2.realList !== null) {
        _this2["onDrag" + evtName](evtData);
      }

      emit.call(_this2, evtName, evtData);
    };
  }

  function isTransitionName(name) {
    return ["transition-group", "TransitionGroup"].includes(name);
  }

  function vuedraggable_isTransition(slots) {
    if (!slots || slots.length !== 1) {
      return false;
    }

    var _slots = _slicedToArray(slots, 1),
        componentOptions = _slots[0].componentOptions;

    if (!componentOptions) {
      return false;
    }

    return isTransitionName(componentOptions.tag);
  }

  function getSlot(slot, scopedSlot, key) {
    return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : undefined);
  }

  function computeChildrenAndOffsets(children, slot, scopedSlot) {
    var headerOffset = 0;
    var footerOffset = 0;
    var header = getSlot(slot, scopedSlot, "header");

    if (header) {
      headerOffset = header.length;
      children = children ? [].concat(_toConsumableArray(header), _toConsumableArray(children)) : _toConsumableArray(header);
    }

    var footer = getSlot(slot, scopedSlot, "footer");

    if (footer) {
      footerOffset = footer.length;
      children = children ? [].concat(_toConsumableArray(children), _toConsumableArray(footer)) : _toConsumableArray(footer);
    }

    return {
      children: children,
      headerOffset: headerOffset,
      footerOffset: footerOffset
    };
  }

  function getComponentAttributes($attrs, componentData) {
    var attributes = null;

    var update = function update(name, value) {
      attributes = buildAttribute(attributes, name, value);
    };

    var attrs = Object.keys($attrs).filter(function (key) {
      return key === "id" || key.startsWith("data-");
    }).reduce(function (res, key) {
      res[key] = $attrs[key];
      return res;
    }, {});
    update("attrs", attrs);

    if (!componentData) {
      return attributes;
    }

    var on = componentData.on,
        props = componentData.props,
        componentDataAttrs = componentData.attrs;
    update("on", on);
    update("props", props);
    Object.assign(attributes.attrs, componentDataAttrs);
    return attributes;
  }

  var eventsListened = ["Start", "Add", "Remove", "Update", "End"];
  var eventsToEmit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
  var readonlyProperties = ["Move"].concat(eventsListened, eventsToEmit).map(function (evt) {
    return "on" + evt;
  });
  var draggingElement = null;
  var props = {
    options: Object,
    list: {
      type: Array,
      required: false,
      default: null
    },
    value: {
      type: Array,
      required: false,
      default: null
    },
    noTransitionOnDrag: {
      type: Boolean,
      default: false
    },
    clone: {
      type: Function,
      default: function _default(original) {
        return original;
      }
    },
    element: {
      type: String,
      default: "div"
    },
    tag: {
      type: String,
      default: null
    },
    move: {
      type: Function,
      default: null
    },
    componentData: {
      type: Object,
      required: false,
      default: null
    }
  };
  var draggableComponent = {
    name: "draggable",
    inheritAttrs: false,
    props: props,
    data: function data() {
      return {
        transitionMode: false,
        noneFunctionalComponentMode: false
      };
    },
    render: function render(h) {
      var slots = this.$slots.default;
      this.transitionMode = vuedraggable_isTransition(slots);

      var _computeChildrenAndOf = computeChildrenAndOffsets(slots, this.$slots, this.$scopedSlots),
          children = _computeChildrenAndOf.children,
          headerOffset = _computeChildrenAndOf.headerOffset,
          footerOffset = _computeChildrenAndOf.footerOffset;

      this.headerOffset = headerOffset;
      this.footerOffset = footerOffset;
      var attributes = getComponentAttributes(this.$attrs, this.componentData);
      return h(this.getTag(), attributes, children);
    },
    created: function created() {
      if (this.list !== null && this.value !== null) {
        helper["b" /* console */].error("Value and list props are mutually exclusive! Please set one or another.");
      }

      if (this.element !== "div") {
        helper["b" /* console */].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props");
      }

      if (this.options !== undefined) {
        helper["b" /* console */].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
      }
    },
    mounted: function mounted() {
      var _this3 = this;

      this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() && !this.getIsFunctional();

      if (this.noneFunctionalComponentMode && this.transitionMode) {
        throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
      }

      var optionsAdded = {};
      eventsListened.forEach(function (elt) {
        optionsAdded["on" + elt] = delegateAndEmit.call(_this3, elt);
      });
      eventsToEmit.forEach(function (elt) {
        optionsAdded["on" + elt] = emit.bind(_this3, elt);
      });
      var attributes = Object.keys(this.$attrs).reduce(function (res, key) {
        res[Object(helper["a" /* camelize */])(key)] = _this3.$attrs[key];
        return res;
      }, {});
      var options = Object.assign({}, this.options, attributes, optionsAdded, {
        onMove: function onMove(evt, originalEvent) {
          return _this3.onDragMove(evt, originalEvent);
        }
      });
      !("draggable" in options) && (options.draggable = ">*");
      this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(this.rootContainer, options);
      this.computeIndexes();
    },
    beforeDestroy: function beforeDestroy() {
      if (this._sortable !== undefined) this._sortable.destroy();
    },
    computed: {
      rootContainer: function rootContainer() {
        return this.transitionMode ? this.$el.children[0] : this.$el;
      },
      realList: function realList() {
        return this.list ? this.list : this.value;
      }
    },
    watch: {
      options: {
        handler: function handler(newOptionValue) {
          this.updateOptions(newOptionValue);
        },
        deep: true
      },
      $attrs: {
        handler: function handler(newOptionValue) {
          this.updateOptions(newOptionValue);
        },
        deep: true
      },
      realList: function realList() {
        this.computeIndexes();
      }
    },
    methods: {
      getIsFunctional: function getIsFunctional() {
        var fnOptions = this._vnode.fnOptions;
        return fnOptions && fnOptions.functional;
      },
      getTag: function getTag() {
        return this.tag || this.element;
      },
      updateOptions: function updateOptions(newOptionValue) {
        for (var property in newOptionValue) {
          var value = Object(helper["a" /* camelize */])(property);

          if (readonlyProperties.indexOf(value) === -1) {
            this._sortable.option(value, newOptionValue[property]);
          }
        }
      },
      getChildrenNodes: function getChildrenNodes() {
        if (this.noneFunctionalComponentMode) {
          return this.$children[0].$slots.default;
        }

        var rawNodes = this.$slots.default;
        return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
      },
      computeIndexes: function computeIndexes() {
        var _this4 = this;

        this.$nextTick(function () {
          _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode, _this4.footerOffset);
        });
      },
      getUnderlyingVm: function getUnderlyingVm(htmlElt) {
        var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);

        if (index === -1) {
          //Edge case during move callback: related element might be
          //an element different from collection
          return null;
        }

        var element = this.realList[index];
        return {
          index: index,
          element: element
        };
      },
      getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
        var vue = _ref.__vue__;

        if (!vue || !vue.$options || !isTransitionName(vue.$options._componentTag)) {
          if (!("realList" in vue) && vue.$children.length === 1 && "realList" in vue.$children[0]) return vue.$children[0];
          return vue;
        }

        return vue.$parent;
      },
      emitChanges: function emitChanges(evt) {
        var _this5 = this;

        this.$nextTick(function () {
          _this5.$emit("change", evt);
        });
      },
      alterList: function alterList(onList) {
        if (this.list) {
          onList(this.list);
          return;
        }

        var newList = _toConsumableArray(this.value);

        onList(newList);
        this.$emit("input", newList);
      },
      spliceList: function spliceList() {
        var _arguments = arguments;

        var spliceList = function spliceList(list) {
          return list.splice.apply(list, _toConsumableArray(_arguments));
        };

        this.alterList(spliceList);
      },
      updatePosition: function updatePosition(oldIndex, newIndex) {
        var updatePosition = function updatePosition(list) {
          return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
        };

        this.alterList(updatePosition);
      },
      getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
        var to = _ref2.to,
            related = _ref2.related;
        var component = this.getUnderlyingPotencialDraggableComponent(to);

        if (!component) {
          return {
            component: component
          };
        }

        var list = component.realList;
        var context = {
          list: list,
          component: component
        };

        if (to !== related && list && component.getUnderlyingVm) {
          var destination = component.getUnderlyingVm(related);

          if (destination) {
            return Object.assign(destination, context);
          }
        }

        return context;
      },
      getVmIndex: function getVmIndex(domIndex) {
        var indexes = this.visibleIndexes;
        var numberIndexes = indexes.length;
        return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
      },
      getComponent: function getComponent() {
        return this.$slots.default[0].componentInstance;
      },
      resetTransitionData: function resetTransitionData(index) {
        if (!this.noTransitionOnDrag || !this.transitionMode) {
          return;
        }

        var nodes = this.getChildrenNodes();
        nodes[index].data = null;
        var transitionContainer = this.getComponent();
        transitionContainer.children = [];
        transitionContainer.kept = undefined;
      },
      onDragStart: function onDragStart(evt) {
        this.context = this.getUnderlyingVm(evt.item);
        evt.item._underlying_vm_ = this.clone(this.context.element);
        draggingElement = evt.item;
      },
      onDragAdd: function onDragAdd(evt) {
        var element = evt.item._underlying_vm_;

        if (element === undefined) {
          return;
        }

        Object(helper["d" /* removeNode */])(evt.item);
        var newIndex = this.getVmIndex(evt.newIndex);
        this.spliceList(newIndex, 0, element);
        this.computeIndexes();
        var added = {
          element: element,
          newIndex: newIndex
        };
        this.emitChanges({
          added: added
        });
      },
      onDragRemove: function onDragRemove(evt) {
        Object(helper["c" /* insertNodeAt */])(this.rootContainer, evt.item, evt.oldIndex);

        if (evt.pullMode === "clone") {
          Object(helper["d" /* removeNode */])(evt.clone);
          return;
        }

        var oldIndex = this.context.index;
        this.spliceList(oldIndex, 1);
        var removed = {
          element: this.context.element,
          oldIndex: oldIndex
        };
        this.resetTransitionData(oldIndex);
        this.emitChanges({
          removed: removed
        });
      },
      onDragUpdate: function onDragUpdate(evt) {
        Object(helper["d" /* removeNode */])(evt.item);
        Object(helper["c" /* insertNodeAt */])(evt.from, evt.item, evt.oldIndex);
        var oldIndex = this.context.index;
        var newIndex = this.getVmIndex(evt.newIndex);
        this.updatePosition(oldIndex, newIndex);
        var moved = {
          element: this.context.element,
          oldIndex: oldIndex,
          newIndex: newIndex
        };
        this.emitChanges({
          moved: moved
        });
      },
      updateProperty: function updateProperty(evt, propertyName) {
        evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
      },
      computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
        if (!relatedContext.element) {
          return 0;
        }

        var domChildren = _toConsumableArray(evt.to.children).filter(function (el) {
          return el.style["display"] !== "none";
        });

        var currentDOMIndex = domChildren.indexOf(evt.related);
        var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
        var draggedInList = domChildren.indexOf(draggingElement) !== -1;
        return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
      },
      onDragMove: function onDragMove(evt, originalEvent) {
        var onMove = this.move;

        if (!onMove || !this.realList) {
          return true;
        }

        var relatedContext = this.getRelatedContextFromMoveEvent(evt);
        var draggedContext = this.context;
        var futureIndex = this.computeFutureIndex(relatedContext, evt);
        Object.assign(draggedContext, {
          futureIndex: futureIndex
        });
        var sendEvt = Object.assign({}, evt, {
          relatedContext: relatedContext,
          draggedContext: draggedContext
        });
        return onMove(sendEvt, originalEvent);
      },
      onDragEnd: function onDragEnd() {
        this.computeIndexes();
        draggingElement = null;
      }
    }
  };

  if (typeof window !== "undefined" && "Vue" in window) {
    window.Vue.component("draggable", draggableComponent);
  }

  /* harmony default export */ var vuedraggable = (draggableComponent);
  // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


  /* harmony default export */ __webpack_exports__["default"] = (vuedraggable);



  /***/ })

  /******/ })["default"];
  });

  });

  var Draggable = unwrapExports(vuedraggable_umd);

  //
  var script$2 = vue.defineComponent({
      name: 'ColumnSettingDialog',
      components: { Draggable: Draggable },
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
          var activeTab = vue.ref(0);
          var activeDynamicConfig = vue.computed(function () {
              return props.dynamicList[activeTab.value];
          });
          var tabOptionList = vue.computed(function () {
              var _a;
              return (_a = props.dynamicList) === null || _a === void 0 ? void 0 : _a.map(function (config, index) {
                  var _a;
                  return {
                      id: index,
                      name: DYNAMIC_BUSINESS_TYPE[(_a = config === null || config === void 0 ? void 0 : config.businessType) !== null && _a !== void 0 ? _a : '']
                  };
              });
          });
          var _d = __read(useLoading(function () { return __awaiter(_this, void 0, void 0, function () {
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
          vue.watch(activeTab, fetchList);
          expose({ open: open });
          var _e = __read(useLoading(function () { return __awaiter(_this, void 0, void 0, function () {
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
          var header = vue.computed(function () {
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

  const _withScopeId = n => (vue.pushScopeId("data-v-58476a20"),n=n(),vue.popScopeId(),n);
  const _hoisted_1$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("div", null, [
    /*#__PURE__*/vue.createElementVNode("div", { class: "cx_flex_center cx_justify_between" }, [
      /*#__PURE__*/vue.createElementVNode("div", { class: "cx_ptb_12 cx_pl_16 cx_flex_1" }, "可选属性"),
      /*#__PURE__*/vue.createElementVNode("div", { class: "cx_ptb_12 cx_w_250" }, "已选属性")
    ]),
    /*#__PURE__*/vue.createElementVNode("div", { class: "cx_line cx_w_100p cx_m_0" })
  ], -1 /* HOISTED */));
  const _hoisted_2 = { class: "cx_dp_flex cx_justify_between" };
  const _hoisted_3 = {
    class: "cx_flex_1 cx_br cx_p_16 cx_h_500",
    style: {"overflow":"auto","position":"relative"}
  };
  const _hoisted_4 = {
    class: "cx_fs_16 cx_pl_12 cx_ptb_8",
    style: {"font-weight":"500"}
  };
  const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("div", { class: "cx_line cx_m_0 cx_w_100p cx_mtb_6" }, null, -1 /* HOISTED */));
  const _hoisted_6 = {
    class: "cx_w_230 cx_p_16 cx_h_500",
    style: {"overflow":"auto"}
  };
  const _hoisted_7 = {
    key: 0,
    class: "cx_line cx_mb_10 cx_mt_14"
  };
  const _hoisted_8 = { class: "cx_mb_8 cx_fs_14" };
  const _hoisted_9 = { class: "cx_fs_14 cx_ptb_9 hover_active cx_cursor_move" };
  const _hoisted_10 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("i", { class: "iconfont icon-tuodong1 cx_mr_8" }, null, -1 /* HOISTED */));

  function render$1(_ctx, _cache) {
    const _component_CxTab = vue.resolveComponent("CxTab");
    const _component_ElCheckbox = vue.resolveComponent("ElCheckbox");
    const _component_Draggable = vue.resolveComponent("Draggable");
    const _component_BasicDialog = vue.resolveComponent("BasicDialog");
    const _directive_loading = vue.resolveDirective("loading");

    return (vue.openBlock(), vue.createBlock(_component_BasicDialog, {
      okLoading: _ctx.submitLoading,
      width: "1020px",
      onRegister: _ctx.register,
      top: "50px",
      title: _ctx.header,
      onOk: _ctx.submitData
    }, {
      default: vue.withCtx(() => [
        (_ctx.tabOptionList&&_ctx.tabOptionList.length > 1)
          ? (vue.openBlock(), vue.createBlock(_component_CxTab, {
              key: 0,
              class: "cx_plr_16",
              level: "2",
              options: _ctx.tabOptionList,
              modelValue: _ctx.activeTab,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.activeTab) = $event))
            }, null, 8 /* PROPS */, ["options", "modelValue"]))
          : vue.createCommentVNode("v-if", true),
        _hoisted_1$1,
        vue.withDirectives(vue.createElementVNode("div", _hoisted_2, [
          vue.createElementVNode("section", _hoisted_3, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.departmentMap, (item, key) => {
              return (vue.openBlock(), vue.createElementBlock("div", {
                key: key,
                class: "cx_mtb_5"
              }, [
                vue.createElementVNode("h3", _hoisted_4, vue.toDisplayString(key), 1 /* TEXT */),
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item, (option) => {
                  return (vue.openBlock(), vue.createElementBlock("div", {
                    key: option.id,
                    class: "cx_dp_ib cx_mtb_16 cx_w_130 cx_pl_12"
                  }, [
                    vue.createVNode(_component_ElCheckbox, {
                      "model-value": _ctx.checkedList.includes(option.id),
                      "onUpdate:modelValue": val => _ctx.updateCheckedList(val, option.id),
                      disabled: option.irrevocable,
                      label: option.label,
                      value: option.id
                    }, null, 8 /* PROPS */, ["model-value", "onUpdate:modelValue", "disabled", "label", "value"])
                  ]))
                }), 128 /* KEYED_FRAGMENT */)),
                _hoisted_5
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ]),
          vue.createElementVNode("section", _hoisted_6, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.listMap, (_, key, index) => {
              return (vue.openBlock(), vue.createElementBlock("div", { key: key }, [
                (index !== 0)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7))
                  : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("h3", _hoisted_8, vue.toDisplayString(key), 1 /* TEXT */),
                vue.createVNode(_component_Draggable, {
                  modelValue: _ctx.listMap[key],
                  "onUpdate:modelValue": $event => ((_ctx.listMap[key]) = $event),
                  "item-key": "id",
                  group: "list",
                  tag: "transition-group",
                  "component-data": { tag: 'ul', name: 'flip-list', type: 'transition' },
                  ghostClass: "cx_opacity_20",
                  move: _ctx.onMove
                }, {
                  item: vue.withCtx(({ element }) => [
                    vue.createElementVNode("li", _hoisted_9, [
                      _hoisted_10,
                      vue.createTextVNode(vue.toDisplayString(element.label), 1 /* TEXT */)
                    ])
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "onUpdate:modelValue", "move"])
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ], 512 /* NEED_PATCH */), [
          [_directive_loading, _ctx.openLoading]
        ])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["okLoading", "onRegister", "title", "onOk"]))
  }

  script$2.render = render$1;
  script$2.__scopeId = "data-v-58476a20";
  script$2.__file = "src/lib/cx-table/src/components/dynamicConfigSetting/dialog.vue";

  //
  var script$1 = vue.defineComponent({
      name: 'DynamicConfigSettings',
      components: { ColumnSettingDialog: script$2 },
      props: { dynamicConfig: { type: Object, requred: true } },
      emits: ['submit'],
      setup: function (_, _a) {
          var _this = this;
          var emit = _a.emit;
          var dialogRef = vue.ref(null);
          var _b = __read(useLoading(function () { return __awaiter(_this, void 0, void 0, function () {
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
          var CxTable = vue.inject('CxTable');
          var right = vue.computed(function () {
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

  const _hoisted_1 = { class: "setting_btn cx_flex_center cx_justify_center" };

  function render(_ctx, _cache) {
    const _component_CxBtn = vue.resolveComponent("CxBtn");
    const _component_ElTooltip = vue.resolveComponent("ElTooltip");
    const _component_ColumnSettingDialog = vue.resolveComponent("ColumnSettingDialog");

    return (vue.openBlock(), vue.createElementBlock("div", {
      style: vue.normalizeStyle({ position: 'absolute', right: _ctx.right, top: 0, zIndex: 1500 })
    }, [
      vue.createElementVNode("div", _hoisted_1, [
        vue.createVNode(_component_ElTooltip, {
          effect: "dark",
          placement: "left-start",
          content: "设置表头字段"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_CxBtn, {
              class: "cx_p_0",
              icon: "shezhi1",
              onClick: _ctx.open,
              loading: _ctx.openLoading
            }, null, 8 /* PROPS */, ["onClick", "loading"])
          ]),
          _: 1 /* STABLE */
        })
      ]),
      vue.createVNode(_component_ColumnSettingDialog, {
        ref: "dialogRef",
        onSubmit: _ctx.submit,
        dynamicList: [_ctx.dynamicConfig]
      }, null, 8 /* PROPS */, ["onSubmit", "dynamicList"])
    ], 4 /* STYLE */))
  }

  script$1.render = render;
  script$1.__scopeId = "data-v-7a79bc2a";
  script$1.__file = "src/lib/cx-table/src/components/dynamicConfigSetting/index.vue";

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

  var script = vue.defineComponent({
      name: 'CxTable',
      props: CxTableProp,
      components: { Pagination: Pagination },
      emits: CX_TABLE_EVENT_LIST,
      setup: function (props, _a) {
          var _this = this;
          var slots = _a.slots, emit = _a.emit, expose = _a.expose;
          // 根对象
          var $CxTable = createCxTableConfig();
          var _b = useDynamicConfig(props, emit), columnProxy = _b.columnProxy, dynamicColumn = _b.dynamicColumn, loading = _b.loading, forceUpdate = _b.forceUpdate;
          var searchLoading = vue.ref(false);
          var bus = useBus($CxTable, props, emit).bus;
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
          var updateWidth = debounce(function () { return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          useAutoWidth($CxTable);
                          return [4 /*yield*/, vue.nextTick()];
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
                          return [4 /*yield*/, vue.nextTick()];
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
                                  return [4 /*yield*/, vue.nextTick()];
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
          vue.provide('broadcast', broadcast);
          vue.provide('tableDataVisitor', tableDataVisitor);
          vue.provide('CxTable', $CxTable);
          vue.provide('rootProp', props);
          vue.provide('rootSlots', slots);
          vue.provide('bus', bus);
          vue.provide('loading', loading);
          vue.provide('selectConfig', selectConfig);
          vue.provide('radioValue', radioValue);
          vue.provide('expandConfig', expandConfig);
          vue.provide('tid', tid);
          vue.provide('dynamicColumn', dynamicColumn);
          var tableWrapper = vue.ref(null);
          var tableVisible = vue.ref(!props.lazy);
          vue.onMounted(function () {
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
          var _hoisted_directive = vue.resolveDirective('loading');
          var renderContent = function (fixed) {
              return vue.createVNode(CxTableContent, { tableData: tableDataVisitor.sortedData, fixed: fixed }, null, exports.PATCH_FLAG.PROPS, ['tableData']);
          };
          var renderTables = function () {
              var result = [];
              var _a = $CxTable.columnStore, leftFixedColumns = _a.leftFixedColumns, rightFixedColumns = _a.rightFixedColumns;
              var _b = $CxTable.scrollStore, rightScrollBar = _b.rightScrollBar, bottomScrollBar = _b.bottomScrollBar;
              result.push(renderContent());
              if (leftFixedColumns.length && bottomScrollBar) {
                  result.push(renderContent('left'));
              }
              if (rightFixedColumns.length && bottomScrollBar) {
                  result.push(renderContent('right'));
              }
              if (props.height && rightScrollBar) {
                  result.push(renderContent('top'));
              }
              if (props.fixTotalSum && props.showTotalSum && rightScrollBar) {
                  result.push(renderContent('bottom'));
              }
              return result;
          };
          var renderBorderLine = function () {
              return vue.createVNode('div', { "class": _hoisted_3_class });
          };
          var renderEmpty = function () {
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      tableDataVisitor.sortedData.length || props.emptyLimit > 0 || props.showAddBtn
                          ? vue.createCommentVNode('v-if_empty', true)
                          : vue.createVNode(CxTableEmpty)
                  ]));
          };
          var renderDynamicConfigSetting = function () {
              return (vue.openBlock(),
                  vue.createBlock(vue.Fragment, null, [
                      props.configurable && props.dynamic
                          ? vue.createVNode(script$1, {
                              dynamicConfig: props.dynamic,
                              onSubmit: function () {
                                  forceUpdate();
                                  emit('dynamicSetting');
                              }
                          }, null, exports.PATCH_FLAG.PROPS | exports.PATCH_FLAG.NEED_PATCH, ['dynamicConfig'])
                          : vue.createCommentVNode('v-if_dynamic_config', true)
                  ]));
          };
          var renderTeleBtn = function (comp) {
              return vue.createVNode(comp, { dynamicColumn: dynamicColumn.value, tableDataVisitor: tableDataVisitor }, null, exports.PATCH_FLAG.PROPS, ['dynamicColumn', 'tableDataVisitor']);
          };
          var placeHolderAttrs = vue.computed(function () {
              var dataHeight = (props.tableData.length +
                  +!!props.showTotalSum +
                  invokeLayeredRow($CxTable.columns).length) *
                  $CxTable.styleStore.CX_TABLE_HEIGHT;
              var height = formatWidth(props.height ? Math.min(dataHeight, isNaN(+props.height) ? 400 : +props.height) : dataHeight);
              return { style: { height: height } };
          });
          var innerStyle = vue.computed(function () {
              return { maxHeight: isNumber(props.height) ? props.height + 'px' : props.height };
          });
          var cssVariable = useCSSVariable($CxTable).cssVariable;
          return function (_, cache) {
              return vue.createVNode('div', { style: cssVariable.value, "class": 'cx-table_container' }, [
                  vue.createVNode(CxTableTitle),
                  (vue.openBlock(),
                      vue.createBlock(vue.Fragment, null, [
                          props.setCacheBtn
                              ? renderTeleBtn(SetCacheBtn)
                              : vue.createCommentVNode('v-if_set_cache_btn', true),
                          props.cacheListBtn
                              ? renderTeleBtn(CacheListBtn)
                              : vue.createCommentVNode('v-if_cache_list_btn', true)
                      ])),
                  (vue.openBlock(),
                      vue.createBlock(vue.Fragment, null, [
                          props.showForm
                              ? vue.createVNode(TeleForm, {
                                  dynamicColumn: dynamicColumn.value,
                                  tableDataVisitor: tableDataVisitor,
                                  loading: searchLoading.value,
                                  'onUpdate:loading': function (val) { return (searchLoading.value = val); }
                              }, null, exports.PATCH_FLAG.PROPS, ['dynamicColumn', 'tableDataVisitor', 'loading'])
                              : vue.createCommentVNode('v-if_form', true)
                      ])),
                  vue.createVNode('div', { tid: tid, "class": _hoisted_1_class }, [
                      vue.withDirectives(vue.createVNode('div', { "class": _hoisted_2_class, style: innerStyle.value, ref: tableWrapper }, [
                          (vue.openBlock(),
                              vue.createBlock(vue.Fragment, null, tableVisible.value
                                  ? [
                                      renderTables(),
                                      renderEmpty(),
                                      cache[0] || (cache[0] = renderBorderLine()),
                                      renderDynamicConfigSetting()
                                  ]
                                  : [vue.createVNode('div', placeHolderAttrs.value)]))
                      ], exports.PATCH_FLAG.STYLE | exports.PATCH_FLAG.NEED_PATCH), [[_hoisted_directive !== null && _hoisted_directive !== void 0 ? _hoisted_directive : {}, loading.value || searchLoading.value]])
                  ], exports.PATCH_FLAG.STYLE),
                  (vue.openBlock(),
                      vue.createBlock(vue.Fragment, null, [
                          props.floatTotalSum
                              ? vue.createVNode('div', { "class": _hoisted_1_class }, [
                                  vue.createVNode('div', { "class": _hoisted_2_class + " cx_of_hidden" }, [
                                      vue.createVNode(CxTableBody, {
                                          tableData: tableDataVisitor.sortedData,
                                          onlyTotal: true,
                                          float: true,
                                          "class": 'cx_mt_20',
                                          style: {
                                              right: $CxTable.scrollStore.scrollLeft + '' + "px",
                                              position: 'relative'
                                          }
                                      }, null, exports.PATCH_FLAG.FULL_PROPS)
                                  ])
                              ])
                              : vue.createCommentVNode('v-if_float_total_sum', true)
                      ])),
                  (vue.openBlock(),
                      vue.createBlock(vue.Fragment, null, [
                          isObject$1(props.pagination)
                              ? vue.createVNode(Pagination, {
                                  pagination: props.pagination,
                                  onPaging: cache[1] || (cache[1] = function () { return emit('paging'); })
                              }, null, exports.PATCH_FLAG.PROPS, ['pagination'])
                              : vue.createCommentVNode('v-if_pagination', true)
                      ]))
              ], exports.PATCH_FLAG.STYLE);
          };
      }
  });

  script.install = function (app) {
      app.component(script.name, script);
  };
  var _CX_TABLE = script;

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CxBtn: _CX_BTN,
    CxTab: _CX_TAB,
    CxForm: _CX_FORM,
    CxDialog: _CX_DIALOG,
    CxTable: _CX_TABLE
  });

  // import '@babel/polyfill'
  var CxUI = {
      install: function (app) {
          Object.values(components).forEach(function (component) {
              app.use(component);
          });
      }
  };

  exports.CX_TABLE_CACHE_PENDING = CX_TABLE_CACHE_PENDING;
  exports.CX_TABLE_COLUMN_ID_PREPEND = CX_TABLE_COLUMN_ID_PREPEND;
  exports.CX_TABLE_COLUMN_KEY = CX_TABLE_COLUMN_KEY;
  exports.CX_TABLE_DYNAMIC_CACHE = CX_TABLE_DYNAMIC_CACHE;
  exports.CX_TABLE_DYNAMIC_PROPS = CX_TABLE_DYNAMIC_PROPS;
  exports.CX_TABLE_EMPTY_INDEX = CX_TABLE_EMPTY_INDEX;
  exports.CX_TABLE_EVENT_LIST = CX_TABLE_EVENT_LIST;
  exports.CX_TABLE_ID_PREPEND = CX_TABLE_ID_PREPEND;
  exports.CX_TABLE_INPUT_TYPE = CX_TABLE_INPUT_TYPE;
  exports.CX_TABLE_NOT_HOVER_ID = CX_TABLE_NOT_HOVER_ID;
  exports.CX_TABLE_PER_CHAR_WIDTH = CX_TABLE_PER_CHAR_WIDTH;
  exports.CX_TABLE_ROW_ID_PREPEND = CX_TABLE_ROW_ID_PREPEND;
  exports.CX_TABLE_ROW_KEY = CX_TABLE_ROW_KEY;
  exports.CX_TABLE_SUM_INDEX = CX_TABLE_SUM_INDEX;
  exports.CX_TABLE_SUM_ROW_KEY = CX_TABLE_SUM_ROW_KEY;
  exports.CX_TABLE_THROTTLE_DURATION = CX_TABLE_THROTTLE_DURATION;
  exports.CX_TABLE_VISUAL_ROW_KEY = CX_TABLE_VISUAL_ROW_KEY;
  exports.CxBroadcast = CxBroadcast;
  exports.CxBtn = _CX_BTN;
  exports.CxConfigAdaptor = CxConfigAdaptor;
  exports.CxDialog = _CX_DIALOG;
  exports.CxForm = _CX_FORM;
  exports.CxTab = _CX_TAB;
  exports.CxTable = _CX_TABLE;
  exports.CxTableActiveControl = CxTableActiveControl;
  exports.CxTableRendererMap = CxTableRendererMap;
  exports.EventBus = EventBus;
  exports.EventBusCreator = EventBusCreator;
  exports.arrFlat = arrFlat;
  exports.assignAttrs = assignAttrs;
  exports.changeDynamicIdToText = changeDynamicIdToText;
  exports.copySort = copySort;
  exports.cxFormRender = cxFormRender;
  exports.cxTableWarn = cxTableWarn;
  exports.debounce = debounce;
  exports.deepMerge = deepMerge;
  exports.default = CxUI;
  exports.domShare = domShare;
  exports.eventBus = eventBus;
  exports.findAncestor = findAncestor;
  exports.formatDate = formatDate;
  exports.formatFormDefaultValue = formatFormDefaultValue;
  exports.formatTime = formatTime;
  exports.formatWidth = formatWidth;
  exports.getColumnSelectText = getColumnSelectText;
  exports.getCxDynamicHead = getCxDynamicHead;
  exports.getDateRange = getDateRange;
  exports.getFunctionAttrs = getFunctionAttrs;
  exports.getParentColumn = getParentColumn;
  exports.getPreOrNextItem = getPreOrNextItem;
  exports.getStatusAttrs = getStatusAttrs;
  exports.getStringWidth = getStringWidth;
  exports.getSums = getSums;
  exports.getTargetColumn = getTargetColumn;
  exports.getTotalSumData = getTotalSumData;
  exports.invokeLayeredRow = invokeLayeredRow;
  exports.is = is;
  exports.isArray = isArray$1;
  exports.isBoolean = isBoolean;
  exports.isDate = isDate;
  exports.isEmpty = isEmpty;
  exports.isFunction = isFunction$1;
  exports.isNull = isNull;
  exports.isNumber = isNumber;
  exports.isObject = isObject$1;
  exports.isString = isString$1;
  exports.pick = pick;
  exports.toggleArrState = toggleArrState;
  exports.updateCxTableWidth = updateCxTableWidth;
  exports.useAutoWidth = useAutoWidth;
  exports.useBroadcast = useBroadcast;
  exports.useBus = useBus;
  exports.useCSSVariable = useCSSVariable;
  exports.useCalcSpanMethod = useCalcSpanMethod;
  exports.useColumn = useColumn;
  exports.useColumnValidity = useColumnValidity;
  exports.useCopy = useCopy;
  exports.useCxDialog = useCxDialog;
  exports.useCxForm = useCxForm;
  exports.useCxPagination = useCxPagination;
  exports.useCxSort = useCxSort;
  exports.useCxTable = useCxTable;
  exports.useCxTableCompose = useCxTableCompose;
  exports.useDynamicConfig = useDynamicConfig;
  exports.useExpandConfig = useExpandConfig;
  exports.useLazyLoad = useLazyLoad;
  exports.usePriorityConfig = usePriorityConfig;
  exports.useRadioConfig = useRadioConfig;
  exports.useRegister = useRegister;
  exports.useRowDataValidity = useRowDataValidity;
  exports.useScrollState = useScrollState;
  exports.useSelectConfig = useSelectConfig;
  exports.useStyle = useStyle;
  exports.useTableClass = useTableClass;
  exports.useTableId = useTableId;
  exports.useTableStyle = useTableStyle;
  exports.useValidator = useValidator;
  exports.useWatch = useWatch;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
