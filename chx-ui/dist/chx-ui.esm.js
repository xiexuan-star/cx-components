import { defineComponent, computed, createVNode as createVNode$1, createCommentVNode, ref as ref$1, onMounted as onMounted$1, onBeforeUnmount as onBeforeUnmount$1, watch as watch$1, nextTick as nextTick$1, openBlock, createBlock, Fragment as Fragment$1, resolveComponent, mergeProps as mergeProps$1, withCtx, createElementVNode, renderSlot, createTextVNode as createTextVNode$1, toDisplayString, pushScopeId, popScopeId, useContext, reactive as reactive$1, inject, watchEffect, resolveDirective, withDirectives, setBlockTracking, unref, render as render$5, onUnmounted as onUnmounted$1, createElementBlock, normalizeClass as normalizeClass$1, normalizeStyle as normalizeStyle$1, renderList, provide } from 'vue';
import * as R from 'ramda';
import { clone as clone$1, omit as omit$1 } from 'ramda';
import dayjs from 'dayjs';
import PinyinMatch from 'pinyin-match';

const script$8 = defineComponent({
    name: 'CxBtn',
    props: {
        size: {
            type: String,
            default: 'medium',
        },
        level: { type: [String, Number], default: '2' },
        type: {
            type: String,
            default: 'primary',
        },
        content: { type: String, default: '' },
        icon: { type: String, default: '' },
        loading: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    setup(props, { slots }) {
        const renderLoadingEle = () => {
            return createVNode$1('i', { class: 'el-icon-loading cx_mr_5' });
        };
        const renderIconEle = (className) => {
            return createVNode$1('i', { class: `iconfont icon-` + className }, null, 2 /* CLASS */);
        };
        const renderDisabled = () => {
            return createVNode$1('i', { onClick: (e) => e.stopPropagation(), class: 'cx_mask' });
        };
        const classList = computed(() => {
            const result = ['cx-btn_wrapper'];
            if (props.disabled)
                result.push('cx-btn_disabled');
            result.push(`cx-btn_${props.size}`);
            result.push(`cx-btn_level_${props.level}`);
            result.push(`cx-btn_${props.type}`);
            if (props.loading)
                result.push(`cx-btn_loading`);
            return result;
        });
        return (_, cache) => {
            return createVNode$1('button', {
                type: 'button',
                class: classList.value,
                onClick: cache[0]
                    ? cache[0]
                    : (cache[0] = (e) => {
                        e.preventDefault();
                        if (props.disabled)
                            return false;
                    }),
            }, [
                props.loading ? (cache[1] ? cache[1] : (cache[1] = renderLoadingEle())) : createCommentVNode('v-if', true),
                props.icon ? renderIconEle(props.icon) : createCommentVNode('v-if', true),
                (slots.default ? slots.default({}) : props.content)
                    ? createVNode$1('span', { class: { cx_ml_5: !!props.icon } }, [
                        slots.default ? slots.default({}) : props.content,
                    ])
                    : createCommentVNode('v-if_content', true),
                props.disabled ? (cache[2] ? cache[2] : (cache[2] = renderDisabled())) : createCommentVNode('v-if', true),
            ], 2 /* CLASS */ | 512 /* NEED_PATCH */);
        };
    },
});
script$8.install = (app) => {
    app.component(script$8.name, script$8);
};
const _CX_BTN = script$8;

const toString$1 = Object.prototype.toString;
function is$1(val, type) {
    return toString$1.call(val) === `[object ${type}]`;
}
const isObject$2 = (val) => {
    return val !== null && is$1(val, 'Object');
};
function isNumber$1(val) {
    return is$1(val, 'Number');
}
// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction$2 = (val) => typeof val === 'function';

const script$7 = defineComponent({
    name: 'CxTab',
    props: {
        /**
         * tab等级,分1,2,3级,默认1级
         */
        level: { type: [String, Number], default: '1' },
        modelValue: { type: [Number, String], default: 0 },
        /**
         * tab项列表,支持只传入数字项与字符创项,它们会自动转化为name+id形式
         */
        options: {
            type: Array,
            default: () => [],
        },
        disabled: { type: Boolean, default: false },
        /**
         * badge数据源,对应tab项中的badgeKey
         */
        badgeObj: { type: Object, default: () => ({}) },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, slots }) {
        const clickHandle = (id) => {
            if (id === props.modelValue)
                return;
            if (props.disabled)
                return;
            emit('update:modelValue', id);
            emit('change', id);
        };
        const tabs = computed(() => props.options
            .filter((item) => {
            return isObject$2(item) ? !item.hide : item;
        })
            .map((item) => {
            return isObject$2(item) ? item : { id: item, name: item };
        }));
        const renderItems = () => {
            return tabs.value.map((item) => {
                const classList = ['cx-tab_item', 'clickable', 'cx_flex_center'];
                props.modelValue === item.id && classList.push('cx-tab_item_active');
                let badgeValue = props.badgeObj[item.badgeKey ?? ''] ?? 0;
                const badgeUnit = item.unit ?? '';
                if (badgeValue >= 100)
                    badgeValue = '99+';
                return createVNode$1('div', { onClick: () => clickHandle(item.id), class: classList }, [
                    item.name,
                    badgeValue
                        ? createVNode$1('div', { class: `cx-tab_badge_${props.level}` }, `${badgeValue}${badgeUnit}`, 2 /* CLASS */ | 1 /* TEXT */)
                        : createCommentVNode('v-if_badge', true),
                ], 512 /* NEED_PATCH */ | 2 /* CLASS */);
            });
        };
        const wrapRef = ref$1(null);
        const renderArrow = (type) => {
            const onClick = () => {
                if (!wrapRef.value)
                    return;
                let base = 300;
                let offset = base / 10;
                const timer = setInterval(() => {
                    if (!wrapRef.value)
                        return;
                    const targetPosition = wrapRef.value.scrollLeft + (type === 'left' ? -offset : offset);
                    wrapRef.value.scrollTo(targetPosition, 0);
                    const stop = type === 'left'
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
            const classList = [
                `cx-tab_${type}_arrow`,
                'iconfont',
                'cx_flex_center',
                type === 'left' ? 'icon-xiangzuo' : 'icon-xiangyou',
            ];
            return createVNode$1('div', { onClick, class: classList }, null, 512 /* NEED_PATCH */ | 2 /* CLASS */);
        };
        const isShowArrow = () => {
            if (!wrapRef.value)
                return;
            const tabs = wrapRef.value.querySelector('.cx-tabs');
            if (!tabs)
                return;
            const wrapWidth = wrapRef.value.clientWidth;
            const tabsWidth = tabs.clientWidth;
            return tabsWidth > wrapWidth;
        };
        const showArrow = ref$1(isShowArrow());
        // const MutationObserver = window.MutationObserver;
        // const observer = new MutationObserver(() => {
        // })
        const debounce = (cb, delay) => {
            let timer;
            return () => {
                clearTimeout(timer);
                timer = setTimeout(cb, delay);
            };
        };
        const tabsResize = debounce(() => {
            showArrow.value = isShowArrow();
        }, 100);
        onMounted$1(() => {
            window.addEventListener('resize', tabsResize);
        });
        onBeforeUnmount$1(() => {
            window.removeEventListener('resize', tabsResize);
        });
        watch$1(() => tabs.value, async () => {
            await nextTick$1();
            showArrow.value = isShowArrow();
        }, { deep: true, immediate: true });
        return (_, cache) => {
            const classList = [
                'cx-tab_scroll_wrapper',
                'cx_flex_center',
                'cx_justify_between',
                `level-${props.level}_wrapper`
            ];
            showArrow.value && classList.push('cx_plr_20');
            props.disabled && classList.push('cx-tab_disabled');
            return createVNode$1('div', { class: classList }, [
                createVNode$1('div', { class: 'cx-tab_wrapper', ref: wrapRef }, [createVNode$1('div', { class: 'cx-tabs' }, renderItems())], 512 /* NEED_PATCH */),
                showArrow.value
                    ? cache[0] || (cache[0] = renderArrow('left'))
                    : createCommentVNode('v-if_left_arrow', true),
                showArrow.value
                    ? cache[1] || (cache[1] = renderArrow('right'))
                    : createCommentVNode('v-if_right_arrow', true),
                createVNode$1('div', { class: 'cx-tab_extension' }, [slots.ext && slots.ext()])
            ], 2 /* CLASS */);
        };
    },
});
script$7.install = (app) => {
    app.component(script$7.name, script$7);
};
const _CX_TAB = script$7;

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

const isServer = typeof window === 'undefined';
const resizeHandler = function (entries) {
    for (const entry of entries) {
        const listeners = entry.target.__resizeListeners__ || [];
        if (listeners.length) {
            listeners.forEach((fn) => {
                fn();
            });
        }
    }
};
const addResizeListener = function (element, fn) {
    if (isServer || !element)
        return;
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        element.__ro__ = new index$1(resizeHandler);
        element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
};
const removeResizeListener = function (element, fn) {
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
    return Object.keys(target).reduce((res, key) => {
        if (!keys.includes(key)) {
            Reflect.set(res, key, target[key]);
        }
        return res;
    }, {});
}
function useEnumOptions(obj, name = 'name', id = 'id') {
    const result = [];
    Object.entries(obj).forEach(([key, val]) => {
        if (R.is(Number, val)) {
            result.push({ [name]: key, [id]: val });
        }
    });
    return result;
}
function throttle$1(func, wait = 100, options) {
    let timeout, context, args, result;
    let previous = 0;
    if (!options)
        options = {};
    function later() {
        previous = options?.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null; // 显式地释放内存，防止内存泄漏
    }
    function throttled(...innerArgs) {
        var now = Date.now();
        if (!previous && options?.leading === false)
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
        else if (!timeout && options?.trailing !== false) {
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
    const loading = ref$1(false);
    if (argLoading)
        argLoading.value = false;
    async function call(...args) {
        if (loading.value) {
            return Promise.reject('loading...');
        }
        loading.value = true;
        if (argLoading)
            argLoading.value = true;
        let result = null;
        try {
            result = await fn(...args);
        }
        catch (e) {
            result = Promise.reject(e);
        }
        if (argLoading)
            argLoading.value = false;
        loading.value = false;
        return result;
    }
    return [call, loading];
}
const isDeepObjectEqual = (obj1, obj2) => {
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
    const obj1Props = Object.getOwnPropertyNames(obj1);
    const obj2Props = Object.getOwnPropertyNames(obj2);
    //自身属性长度相等,
    if (obj1Props.length !== obj2Props.length)
        return false;
    //递归调用判断每一个属性值是否相等
    return obj1Props.every(prop => isDeepObjectEqual(obj1[prop], obj2[prop]));
};

const renderComp = (attrs, slots, Comp) => {
    return (openBlock(),
        createBlock(Fragment$1, null, [
            Comp
                ? isFunction$2(Comp)
                    ? (function () {
                        const prop = attrs.__prop;
                        const nodes = Comp(Object.assign(omit(attrs, ['__closable', '__emit', '__prop']), { prop }));
                        // nodes?.forEach?.((node: any) => {
                        //   !node.props && Reflect.set(node, 'props', {});
                        //   Object.assign(node?.props, omit(attrs,['closable']));
                        //   node.PatchFlags = PatchFlags.FULL_PROPS;
                        // });
                        return nodes;
                    })()
                    : createVNode$1(Comp, omit(attrs, ['__closable', '__emit', '__prop']), slots, 16 /* FULL_PROPS */)
                : createCommentVNode('v-if_component', true),
        ]));
};
class CxFormRender {
    constructor() {
        this.renderComp = renderComp;
    }
    renderControl(attrs, slots, Comp) {
        return createVNode$1('div', { style: { position: 'relative' } }, [
            renderComp(attrs, slots, Comp),
            attrs.__closable
                ? createVNode$1('i', {
                    style: { position: 'absolute', right: '-3px', top: '-3px' },
                    class: 'iconfont icon-shanchu',
                    onClick: () => {
                        isFunction$2(attrs.__emit) && attrs.__emit('close', attrs.__prop);
                    },
                })
                : createCommentVNode('v-if_closable', true),
        ]);
    }
}
const cxFormRender = (function () {
    let _instance = null;
    return function () {
        if (!_instance) {
            _instance = new CxFormRender();
        }
        return _instance;
    };
})();

class CxFormTemplate {
    constructor() {
        this.name = '';
        this.slots = {};
        this.attrs = {};
    }
    init() {
        this.propAdaptor();
        return this;
    }
    propAdaptor() {
        throw new Error('请重写propAdaptor方法');
    }
    addSlots(slots) {
        if (typeof slots === 'function') {
            Reflect.set(this.slots, 'default', slots);
        }
        else if (typeof slots === 'object') {
            Object.assign(this.slots, slots);
        }
        return this;
    }
    renderVNode(Comp) {
        return cxFormRender().renderComp(this.attrs, this.slots, Comp);
    }
    renderControl(Comp) {
        return cxFormRender().renderControl(this.attrs, this.slots, Comp);
    }
    render() {
        throw new Error('请重写render方法');
    }
}

class CxFormError extends Error {
    constructor(msg) {
        super(`CxFormError: ${msg}`);
    }
}

const CxFormRenderMap = new Map();
const useCxForm = () => {
    let _instance;
    let _config;
    // let _cache: CxFormCache | undefined;
    const register = (payload) => {
        const { props: config, ref } = payload;
        _instance = ref;
        _config = config;
        // _cache = cache;
    };
    const getFormRef = () => {
        return _instance;
    };
    const setFormConfig = (prop, attr, val) => {
        if (!_config)
            throw new CxFormError("can't set property before regist");
        const item = _config?.items.find((item) => item.prop === prop);
        if (!item) {
            return console.warn(`[cxForm warn]: prop ${prop} isn't exist on this form's configList `);
        }
        if (Reflect.has(item, attr))
            return Reflect.set(item, attr, val);
        [...CxFormRenderMap.keys()].find((type) => {
            const typeAttrs = Reflect.get(item, type);
            if (!isObject$2(typeAttrs))
                return;
            if (attr === 'options') {
                if (!Array.isArray(val))
                    throw new CxFormError("can't set options with non-array");
                const options = Reflect.get(typeAttrs, 'options');
                Array.isArray(options) ? (options.splice(0), options.push(...val)) : Reflect.set(typeAttrs, 'options', val);
                Reflect.set(typeAttrs, 'key', Date.now());
            }
            else {
                Reflect.set(typeAttrs, attr, val);
            }
            return true;
        });
    };
    // const validCache = () => {
    //   if (!_cache) throw new CxFormError("can't use cache before regist");
    // };
    return {
        register,
        getFormRef,
        setFormConfig,
        // getCache: () => {
        //   validCache();
        //   _cache?.getCache();
        // },
        // removeCache: () => {
        //   validCache();
        //   _cache?.removeCache();
        // },
        // setCache: (dataSource?: any) => {
        //   validCache();
        //   _cache?.setCache(dataSource);
        // },
        /**
         * @description 注册组件
         * @param params {comp:组件,type:组件名,configAdaptor:组件配置项适配器,默认直接合并}
         */
        registerRenderer: (params) => {
            const { comp, type, adaptor } = params;
            CxFormRenderMap.set(type, { comp, adaptor });
        },
        getRenderer: (key) => {
            return CxFormRenderMap.get(key);
        },
        getRendererKeys: () => {
            return CxFormRenderMap.keys();
        },
    };
};

class CxFormControl extends CxFormTemplate {
    constructor(form, controlConfig, rootConfig, emit) {
        super();
        this.name = 'CxFormControl';
        this.parse = null;
        this.attrs = {};
        this.type = '';
        this.form = form;
        this.emit = emit;
        this.config = controlConfig;
        this.rootConfig = rootConfig;
        this.prop = controlConfig.prop;
        this.init();
    }
    init() {
        this.propAdaptor().bindModel();
        return this;
    }
    addSlots(slots) {
        if (!isObject$2(slots))
            return this;
        isObject$2(this.config?.slot) &&
            Object.entries(this.config.slot).forEach(([key, val]) => {
                Reflect.set(this.slots, key, Reflect.get(slots, val));
            });
        const customSlot = this.config?.custom?.slot;
        customSlot && Reflect.set(this.slots, customSlot, Reflect.get(slots, customSlot));
        return this;
    }
    bindModel() {
        if (this.prop) {
            Reflect.set(this.attrs, 'modelValue', this.form[this.prop]);
            Reflect.set(this.attrs, 'onUpdate:modelValue', (val) => {
                if (Array.isArray(val)) {
                    val = val.map(item => {
                        return this.parse ? this.parse(item) : item;
                    });
                }
                else if (val) {
                    val = this.parse ? this.parse(val) : val;
                }
                Reflect.set(this.form, this.prop, val);
            });
        }
        return this;
    }
    propAdaptor() {
        const { getRendererKeys, getRenderer } = useCxForm();
        [...getRendererKeys()].find(type => {
            if (!isObject$2(Reflect.get(this.config, type)))
                return;
            const { adaptor } = getRenderer(type) ?? {};
            this.type = type;
            isFunction$2(adaptor)
                ? adaptor.apply(this)
                : Object.assign(this.attrs, Reflect.get(this.config, type));
            return true;
        });
        const placeholder = Reflect.get(this.config ?? {}, 'placeholder');
        placeholder && Reflect.set(this.attrs, 'placeholder', placeholder);
        Reflect.set(this.attrs, 'onChange', (val) => {
            const payload = { prop: this.prop, val, form: this.form };
            if (Array.isArray(this.attrs.options)) {
                Reflect.set(payload, 'option', this.attrs.options.find(option => option.id === val));
            }
            isFunction$2(this.emit) && this.emit('change', payload);
            isFunction$2(this.config?.onChange) && this.config?.onChange(payload);
        });
        !isObject$2(this.attrs?.style) && Reflect.set(this.attrs, 'style', {});
        this.config.width &&
            isObject$2(this.attrs?.style) &&
            Reflect.set(this.attrs.style, 'width', `${this.config.width}px`);
        Reflect.set(this.attrs, '__closable', this.rootConfig?.closable || this.config.closable);
        Reflect.set(this.attrs, '__emit', this.emit);
        Reflect.set(this.attrs, '__prop', this.prop);
        return this;
    }
    render() {
        let Control;
        if (this.type === 'custom') {
            Control = Reflect.get(this.slots, this.config?.custom?.slot ?? '');
        }
        else {
            const comp = useCxForm().getRenderer(this.type)?.comp;
            Control = isFunction$2(comp) ? comp() : comp;
        }
        return this.renderControl(Control);
    }
}

const form = () => ({
    size: 'small',
    labelSuffix: ':',
    // labelWidth: 'auto',
    labelPosition: 'left',
    onSubmit: (e) => e.preventDefault(),
});
const cxFormDefaultConfig = {
    form
};

class CxForm$1 extends CxFormTemplate {
    constructor(config) {
        super();
        this.name = 'CxForm';
        this.attrs = {};
        this.ref = ref$1(null);
        this.config = config;
        this.init();
    }
    getFormRef() {
        return this.ref;
    }
    propAdaptor() {
        Object.assign(this.attrs, cxFormDefaultConfig.form(), omit(this.config, ['items', 'formAttrs']));
        this.config.formAttrs && Object.assign(this.attrs, omit(this.config.formAttrs, ['form', 'inline', 'disabled', 'closable', 'items', 'class']));
        Reflect.set(this.attrs, 'ref', this.ref);
        Reflect.set(this.attrs, 'model', this.config?.form ?? {});
        Reflect.set(this.attrs, 'rules', this.config?.items?.reduce((res, item) => {
            item.rule && Reflect.set(res, item.prop, item.rule);
            return res;
        }, {}));
        return this;
    }
    render() {
        const form = useCxForm().getRenderer('form')?.comp ?? resolveComponent('ElForm');
        return this.renderVNode(form);
    }
}

class CxFormItem extends CxFormTemplate {
    constructor(config) {
        super();
        this.name = 'CxFormItem';
        this.attrs = {};
        this.config = config;
        this.init();
    }
    addSlots(slots) {
        if (isObject$2(slots)) {
            const itemSlot = { default: slots.default };
            this.config.labelSlot && Reflect.set(itemSlot, 'label', () => slots[this.config.labelSlot]?.({ ...this.config }));
            Object.assign(this.slots, itemSlot);
        }
        return this;
    }
    propAdaptor() {
        // 以下顺序请勿变更
        isNumber$1(this.config?.spacing) && Reflect.set(this.attrs, 'style', { paddingRight: this.config?.spacing + 'px' });
        Reflect.set(this.attrs, 'key', this.config?.prop ?? '');
        Object.assign(this.attrs, this.config?.itemAttrs ?? {});
        this.config?.labelWidth && Reflect.set(this.attrs, 'labelWidth', this.config.labelWidth + 'px');
        Reflect.set(this.attrs, 'label', this.config?.label ?? '');
        Reflect.set(this.attrs, 'prop', this.config?.prop ?? '');
        return this;
    }
    render() {
        const formItem = useCxForm().getRenderer('formItem')?.comp ?? resolveComponent('ElFormItem');
        return this.renderVNode(formItem);
    }
}

const CxFormProps = {
    form: { type: Object, default: () => ({}) },
    inline: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    class: { type: [Array, Object, String], default: () => [] },
    formAttrs: { type: Object },
};

var CxForm = defineComponent({
    props: CxFormProps,
    name: 'CxForm',
    emits: ['change', 'register', 'close'],
    setup(props, { slots, emit, expose }) {
        function renderControl(itemConfig) {
            return new CxFormControl(props.form, itemConfig, props, emit).addSlots(slots).render();
        }
        function renderFormItem(itemConfig) {
            const slot = { ...slots, default: () => [renderControl(itemConfig)] };
            return new CxFormItem(itemConfig).addSlots(slot).render();
        }
        function renderForm() {
            const slot = () => props.items?.reduce((res, itemConfig) => {
                !itemConfig.hide && res.push(renderFormItem(itemConfig));
                return res;
            }, []);
            const instance = new CxForm$1(props).addSlots(slot);
            emit('register', { props, ref: instance.getFormRef() });
            return instance.render();
        }
        expose({
            trigger: (prop) => {
                emit('change', { prop, val: props.form[prop], form: props.form });
            },
        });
        return () => {
            return createVNode$1('div', { name: 'cx-form' }, [renderForm()]);
        };
    },
});

const script$6 = CxForm;
script$6.install = (app) => {
    app.component(script$6.name, script$6);
};
const _CX_FORM = script$6;

//
var script$5 = defineComponent({
    name: 'CxDialog',
    props: {
        title: String,
        isFullScreen: {
            type: Boolean,
            default: false,
        },
        cancelText: {
            type: String,
            default: '取消',
        },
        okText: {
            type: String,
            default: '确认',
        },
        disabledOk: { type: Boolean, default: false },
        okLoading: { type: Boolean, default: false },
    },
    emits: ['register', 'cancel', 'ok', 'fullscreen', 'open'],
    setup(props, { emit, expose }) {
        const dialogVisible = ref$1(false);
        const fullscreenRef = ref$1(false);
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
        function openDialog(visible = true) {
            dialogVisible.value = !!visible;
            visible && emit('open');
        }
        expose({
            openDialog,
        });
        const dialogActions = {
            openDialog,
        };
        onMounted$1(() => {
            emit('register', dialogActions);
        });
        const dialogProps = computed(() => {
            return omit(props, ['cancelText', 'isFullScreen', 'okText', 'okLoading', 'disabledOk']);
        });
        return {
            openDialog,
            fullscreenRef,
            dialogVisible,
            handleCancel,
            dialogProps,
            handleFullScreen,
        };
    },
});

const _withScopeId$1 = n => (pushScopeId("data-v-342d80fb"),n=n(),popScopeId(),n);
const _hoisted_1$3 = { class: "basic-dialog_header" };
const _hoisted_2$1 = { class: "basic-dialog_title" };
const _hoisted_3$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("i", { class: "iconfont icon-quanpingsuoxiao" }, null, -1 /* HOISTED */));
const _hoisted_4$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("i", { class: "el-icon-full-screen" }, null, -1 /* HOISTED */));
const _hoisted_5$1 = { class: "basic-dialog_footer" };
const _hoisted_6$1 = { class: "baisc-dialog_prefix" };
const _hoisted_7$1 = { class: "baisc-dialog_btns" };
const _hoisted_8$1 = { class: "basic-dialog_content" };

function render$4(_ctx, _cache) {
  const _component_el_button = resolveComponent("el-button");
  const _component_cx_btn = resolveComponent("cx-btn");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createBlock(_component_el_dialog, mergeProps$1({
    customClass: _ctx.fullscreenRef ? 'basic-dialog basic-dialog_fullscreen' : 'basic-dialog',
    modelValue: _ctx.dialogVisible,
    onClose: _cache[3] || (_cache[3] = $event => (_ctx.openDialog(false))),
    fullscreen: _ctx.fullscreenRef
  }, { ..._ctx.dialogProps, ..._ctx.$attrs }), {
    title: withCtx(() => [
      createElementVNode("div", _hoisted_1$3, [
        createElementVNode("p", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode$1(toDisplayString(_ctx.title), 1 /* TEXT */)
          ])
        ]),
        (_ctx.fullscreenRef)
          ? (openBlock(), createBlock(_component_el_button, {
              key: 0,
              type: "text",
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.handleFullScreen(false)))
            }, {
              default: withCtx(() => [
                _hoisted_3$1
              ]),
              _: 1 /* STABLE */
            }))
          : (openBlock(), createBlock(_component_el_button, {
              key: 1,
              type: "text",
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.handleFullScreen(true)))
            }, {
              default: withCtx(() => [
                _hoisted_4$1
              ]),
              _: 1 /* STABLE */
            }))
      ])
    ]),
    footer: withCtx(() => [
      renderSlot(_ctx.$slots, "footer", {}, () => [
        createElementVNode("div", _hoisted_5$1, [
          createElementVNode("div", _hoisted_6$1, [
            renderSlot(_ctx.$slots, "footerPrefix")
          ]),
          createElementVNode("div", _hoisted_7$1, [
            (_ctx.cancelText)
              ? (openBlock(), createBlock(_component_cx_btn, {
                  key: 0,
                  onClick: _ctx.handleCancel,
                  class: "cx_mr_16"
                }, {
                  default: withCtx(() => [
                    createTextVNode$1(toDisplayString(_ctx.cancelText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick"]))
              : createCommentVNode("v-if", true),
            (_ctx.okText)
              ? (openBlock(), createBlock(_component_cx_btn, {
                  key: 1,
                  level: "1",
                  disabled: _ctx.disabledOk,
                  loading: _ctx.okLoading,
                  onClick: _cache[2] || (_cache[2] = $event => (_ctx.emit('ok', _ctx.handleCancel)))
                }, {
                  default: withCtx(() => [
                    createTextVNode$1(toDisplayString(_ctx.okText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled", "loading"]))
              : createCommentVNode("v-if", true)
          ])
        ])
      ])
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_8$1, [
        renderSlot(_ctx.$slots, "default")
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["customClass", "modelValue", "fullscreen"]))
}

script$5.render = render$4;
script$5.__scopeId = "data-v-342d80fb";
script$5.__file = "src/lib/cx-dialog/component.vue";

script$5.install = (app) => {
    app.component(script$5.name, script$5);
};
const _CX_DIALOG = script$5;

// getDoNothingIO::void->IO<NOOP>
const getDoNothingIO = () => IO.of(R.identity);
const functorWarn = (...msg) => {
    console.warn(`[Functor warn]:`, ...msg);
};
R.tap(console.log);
const withParams = (func, params) => () => func(...params);
const map$1 = R.curry((cb, f) => f.map(cb));
R.curryN(2, (arg, io) => io.unsafePerformIO(arg));
const queryDom = (selector) => document.querySelector(selector);
const getMaybeValue = (maybe) => {
    return maybe.getWithDefault();
};
//  either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = R.curryN(3, function (f, g, e) {
    switch (e.constructor) {
        case Left:
            return f(e.__value);
        case Right:
            return g(e.__value);
    }
});
const unsafePush = R.curryN(2, (item, arr) => {
    arr.push(...item);
    return arr;
});
const unsafeClearPush = R.curryN(2, (items, arr) => (arr.splice(0), arr.push(...items), arr));
const unsafeClearArray = (arr) => (arr.splice(0), arr);
const unsafeSet = R.curryN(3, Reflect.set);
const unsafeGet = R.curryN(2, Reflect.get);
const unsafeDeleteProperty = R.curryN(2, Reflect.deleteProperty);
const unsafeRemoveItem = R.curryN(2, (index, arr) => {
    arr.splice(index, 1);
    return arr;
});
const unsafeClearObj = (target) => {
    R.forEach(unsafeDeleteProperty(target), R.keys(target));
    return target;
};
const unsafeAssign = R.curryN(2, (obj, target) => {
    Object.assign(target, obj);
    return target;
});
const unsafeClearAssign = R.curryN(2, (obj, target) => {
    Object.assign(unsafeClearObj(target), obj);
    return target;
});
const unsafeWhenDevCall = (func) => (...args) => process.env.NODE_ENV === 'development'
    ? Maybe.of(func(...args))
    : Maybe.none();
const splat = (fun) => (args) => fun(...args);
// truthy::any->boolean
const truthy = (val) => !!val;
// falsy::any->boolean
const falsy = (val) => !val;
const propCall = (prop) => R.tap(R.when(R.compose(R.is(Function), R.prop(prop)), R.compose(R.call, R.converge(R.bind, [R.prop(prop), R.identity]))));
const preventDefault = propCall('preventDefault');
const stopPropagation = propCall('stopPropagation');
// stateEq200::object->boolean
const stateEq200 = R.propEq('state', 200);
R.curryN(2, setTimeout);
const nextTimeout = (cb) => (payload) => setTimeout(() => cb(payload), 0);
// successMessage::string->void->IMessageHandle
// export const successMessage = (msg: string) => () => ElMessage.success(msg);
// export const errorMessage = (msg: string) => () => ElMessage.error(msg);
const defaultPromise = (val) => () => Promise.resolve(val);
R.curryN(2, (text, ele) => ((ele.innerText = text), ele));
R.curryN(2, (classList, ele) => (ele.classList.add(...classList), ele));
// setDisplay::string->(a:HTMLElement->a:HTMLElement)
const setDisplay = (val) => R.when(truthy, (ele) => (ele.style.display = val));
setDisplay('none');
setDisplay('block');
R.curryN(2, (child, parent) => (parent.appendChild(child), parent));
R.curryN(3, (eventName, listener, ele) => {
    return ele.addEventListener(eventName, listener), ele;
});
R.curryN(3, (eventName, listener, ele) => {
    return ele.removeEventListener(eventName, listener), ele;
});

class Maybe {
    constructor(__value) {
        this.__value = __value;
    }
    static of(value) {
        return value == undefined ? Maybe.none() : new Maybe(value);
    }
    static none() {
        return new Maybe(null);
    }
    static run(gen) {
        function step(value) {
            const result = gen.next(value);
            if (result.done) {
                return Maybe.of(result.value);
            }
            return result.value.chain(step);
        }
        return step();
    }
    map(f) {
        if (this.__value == undefined) {
            return Maybe.none();
        }
        else {
            return Maybe.of(f(this.__value));
        }
    }
    isNegative() {
        return this.__value == undefined;
    }
    join() {
        return this.isNegative() ? Maybe.none() : this.__value;
    }
    chain(f) {
        return this.map(f).join();
    }
    getWithDefault(defaultValue) {
        return this.isNegative() ? defaultValue : this.__value;
    }
    ap(functor) {
        return (R.is(Function, this.__value) ? functor.map(this.__value) : this);
    }
}
class IO {
    constructor(__value) {
        this.__value = __value;
    }
    static of(value) {
        return new IO(value);
    }
    map(f) {
        return new IO(R.compose(f, this.__value));
    }
    join() {
        return this.unsafePerformIO();
    }
    chain(f) {
        return this.map(f).join();
    }
    unsafePerformIO(arg) {
        return this.__value(arg);
    }
    ap(functor) {
        const res = this.unsafePerformIO(functor.unsafePerformIO());
        return (R.is(Function, res) ? IO.of(res) : IO.of(() => res));
    }
}
class Left {
    constructor(__value) {
        this.__value = __value;
    }
    static of(value) {
        if (value == undefined) {
            functorWarn('Provided value must not be empty');
        }
        return new Left(value);
    }
    map(f) {
        return this;
    }
    ap(functor) {
        return this;
    }
}
class Right {
    constructor(__value) {
        this.__value = __value;
    }
    static of(value) {
        if (value == undefined) {
            functorWarn('Provided Right value must not be empty');
        }
        return new Right(value);
    }
    map(f) {
        return Right.of(f(this.__value));
    }
    ap(functor) {
        return (R.is(Function, this.__value) ? functor.map(this.__value) : this);
    }
}

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

const CX_TABLE_ROW_ID_PREPEND = 'cxrow-';
const CX_TABLE_ROW_KEY = 'row-key-';
const CX_TABLE_COLUMN_ID_PREPEND = 'cxcol-';
const CX_TABLE_COLUMN_KEY = 'col-key-';
const CX_TABLE_ID_PREPEND = 'cxtable-';
const CX_TABLE_SUM_ROW_KEY = 'cxtable-sum';
const CX_TABLE_VISUAL_ROW_KEY = 'cxtable-virtual-row';
const CX_TABLE_EVENT_LIST = [
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
const CX_TABLE_INPUT_TYPE = ['input', 'select', 'search', 'numberInput', 'specification'];
const CX_TABLE_SUM_INDEX = -100;
const CX_TABLE_EMPTY_INDEX = -200;
const CX_TABLE_PER_CHAR_WIDTH = 20;
const CX_TABLE_NOT_HOVER_ID = 'cxrow-not-hover';
const CX_TABLE_DYNAMIC_PROPS = [
    'moduleType',
    'businessType',
    'priceType',
    'modelType'
];
const CX_TABLE_DYNAMIC_CACHE = '__CX_TABLE_DYNAMIC_CACHE__';
const CX_TABLE_CACHE_PENDING = '__CX_TABLE_CACHE_PENDING_';
const CX_TABLE_THROTTLE_DURATION = 0.5;

const toString = Object.prototype.toString;
function is(val, type) {
    return toString.call(val) === `[object ${type}]`;
}
function isEmpty$1(value) {
    return (value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (typeof value === 'object' && Object.keys(value).length === 0));
}
const isObject$1 = (val) => {
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
const isFunction$1 = (val) => typeof val === 'function';
function isBoolean(val) {
    return is(val, 'Boolean');
}
function isArray$1(val) {
    return val && Array.isArray(val);
}

const clipboard = ref$1(null);
const useCopy = (props) => {
    const copy = () => {
        clipboard.value = clone$1(props.tableData);
        return clipboard.value;
    };
    const paste = (payload) => {
        if (!Array.isArray(clipboard.value)) {
            return;
        }
        const { omitProps, onPaste } = payload;
        const rows = clone$1(clipboard.value).map(item => {
            if (Array.isArray(omitProps)) {
                return omit$1(omitProps, item);
            }
            return item;
        });
        props.tableData.push(...(isFunction$1(onPaste) ? onPaste(rows) : rows));
    };
    return { copy, paste };
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

const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
    'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
    'Object,Boolean,String,RegExp,Map,Set,JSON,Intl';
const isGloballyWhitelisted = /*#__PURE__*/ makeMap(GLOBALS_WHITE_LISTED);

function normalizeStyle(value) {
    if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
            const item = value[i];
            const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
            if (normalized) {
                for (const key in normalized) {
                    res[key] = normalized[key];
                }
            }
        }
        return res;
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
            res += normalizeClass(value[i]) + ' ';
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
const toHandlerKey = cacheStringFunction((str) => (str ? `on${capitalize(str)}` : ``));
// compare whether a value has changed, accounting for NaN.
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

const targetMap = new WeakMap();
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'iterate' : '');
const MAP_KEY_ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'Map key iterate' : '');
function isEffect(fn) {
    return fn && fn._isEffect === true;
}
function effect(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
        fn = fn.raw;
    }
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect();
    }
    return effect;
}
function stop(effect) {
    if (effect.active) {
        cleanup(effect);
        if (effect.options.onStop) {
            effect.options.onStop();
        }
        effect.active = false;
    }
}
let uid = 0;
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effect.active) {
            return options.scheduler ? undefined : fn();
        }
        if (!effectStack.includes(effect)) {
            cleanup(effect);
            try {
                enableTracking();
                effectStack.push(effect);
                activeEffect = effect;
                return fn();
            }
            finally {
                effectStack.pop();
                resetTracking();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect.id = uid++;
    effect.allowRecurse = !!options.allowRecurse;
    effect._isEffect = true;
    effect.active = true;
    effect.raw = fn;
    effect.deps = [];
    effect.options = options;
    return effect;
}
function cleanup(effect) {
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
    if (!shouldTrack || activeEffect === undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
        if ((process.env.NODE_ENV !== 'production') && activeEffect.options.onTrack) {
            activeEffect.options.onTrack({
                effect: activeEffect,
                target,
                type,
                key
            });
        }
    }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        // never been tracked
        return;
    }
    const effects = new Set();
    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => {
                if (effect !== activeEffect || effect.allowRecurse) {
                    effects.add(effect);
                }
            });
        }
    };
    if (type === "clear" /* CLEAR */) {
        // collection being cleared
        // trigger all effects for target
        depsMap.forEach(add);
    }
    else if (key === 'length' && isArray(target)) {
        depsMap.forEach((dep, key) => {
            if (key === 'length' || key >= newValue) {
                add(dep);
            }
        });
    }
    else {
        // schedule runs for SET | ADD | DELETE
        if (key !== void 0) {
            add(depsMap.get(key));
        }
        // also run for iteration key on ADD | DELETE | Map.SET
        switch (type) {
            case "add" /* ADD */:
                if (!isArray(target)) {
                    add(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) {
                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                else if (isIntegerKey(key)) {
                    // new index added to array -> length changes
                    add(depsMap.get('length'));
                }
                break;
            case "delete" /* DELETE */:
                if (!isArray(target)) {
                    add(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) {
                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                break;
            case "set" /* SET */:
                if (isMap(target)) {
                    add(depsMap.get(ITERATE_KEY));
                }
                break;
        }
    }
    const run = (effect) => {
        if ((process.env.NODE_ENV !== 'production') && effect.options.onTrigger) {
            effect.options.onTrigger({
                effect,
                target,
                key,
                type,
                newValue,
                oldValue,
                oldTarget
            });
        }
        if (effect.options.scheduler) {
            effect.options.scheduler(effect);
        }
        else {
            effect();
        }
    };
    effects.forEach(run);
}

const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
    .map(key => Symbol[key])
    .filter(isSymbol));
const get = /*#__PURE__*/ createGetter();
const shallowGet = /*#__PURE__*/ createGetter(false, true);
const readonlyGet = /*#__PURE__*/ createGetter(true);
const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
const arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function (...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
            track(arr, "get" /* GET */, i + '');
        }
        // we run the method using the original args first (which may be reactive)
        const res = method.apply(arr, args);
        if (res === -1 || res === false) {
            // if that didn't work, run it again using raw values.
            return method.apply(arr, args.map(toRaw));
        }
        else {
            return res;
        }
    };
});
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function (...args) {
        pauseTracking();
        const res = method.apply(this, args);
        resetTracking();
        return res;
    };
});
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        else if (key === "__v_raw" /* RAW */ &&
            receiver === (isReadonly ? readonlyMap : reactiveMap).get(target)) {
            return target;
        }
        const targetIsArray = isArray(target);
        if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
            return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if (isSymbol(key)
            ? builtInSymbols.has(key)
            : key === `__proto__` || key === `__v_isRef`) {
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
const shallowSet = /*#__PURE__*/ createSetter(true);
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        const oldValue = target[key];
        if (!shallow) {
            value = toRaw(value);
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
extend$1({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
});
// Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.
const shallowReadonlyHandlers = extend$1({}, readonlyHandlers, {
    get: shallowReadonlyGet
});

const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
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
    const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
    if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
    }
    else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
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
    target.add(value);
    if (!hadKey) {
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
        const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
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
        const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
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
const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
iteratorMethods.forEach(method => {
    mutableInstrumentations[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
    shallowInstrumentations[method] = createIterableMethod(method, false, true);
});
function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow
        ? shallowInstrumentations
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
    get: createInstrumentationGetter(false, false)
};
const readonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, false)
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
const readonlyMap = new WeakMap();
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
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers);
}
/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers);
}
/**
 * Returns a reactive-copy of the original object, where only the root level
 * properties are readonly, and does NOT unwrap refs nor recursively convert
 * returned properties.
 * This is used for creating the props proxy object for stateful components.
 */
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, readonlyCollectionHandlers);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers) {
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
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
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
    return ((observed && toRaw(observed["__v_raw" /* RAW */])) || observed);
}

const convert = (val) => isObject(val) ? reactive(val) : val;
function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
}
function ref(value) {
    return createRef(value);
}
class RefImpl {
    constructor(_rawValue, _shallow = false) {
        this._rawValue = _rawValue;
        this._shallow = _shallow;
        this.__v_isRef = true;
        this._value = _shallow ? _rawValue : convert(_rawValue);
    }
    get value() {
        track(toRaw(this), "get" /* GET */, 'value');
        return this._value;
    }
    set value(newVal) {
        if (hasChanged(toRaw(newVal), this._rawValue)) {
            this._rawValue = newVal;
            this._value = this._shallow ? newVal : convert(newVal);
            trigger(toRaw(this), "set" /* SET */, 'value', newVal);
        }
    }
}
function createRef(rawValue, shallow = false) {
    if (isRef(rawValue)) {
        return rawValue;
    }
    return new RefImpl(rawValue, shallow);
}

const CxTableRendererMap = new Map();
const CxTableActiveControl = new Set();
const createCxTableContext = () => {
    return {
        contextScopeId: 'defaultScope',
        messageInstance: {
            success: () => undefined,
            warning: () => undefined,
            info: () => undefined,
            error: () => undefined
        },
        dynamicRequestInstance: null,
        dynamicInject: new Set(),
        dynamicFormContext: { requestApiMap: {} },
        dynamicCacheContext: {
            requestApiMap: {},
            removeApiMap: {},
            cacheTypeTab: () => false,
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
const context = createCxTableContext();
const readOnlyContext = new Proxy(context, {
    get(target, key) {
        return target[key];
    },
    set() {
        return false;
    }
});
const useCxTable = () => {
    const getContext = () => readOnlyContext;
    const instance = ref({});
    const instanceProps = ref({});
    const copyHandler = ref({});
    const registCxTable = (payload) => {
        instance.value = payload.registerTarget;
        instanceProps.value = payload.props;
        copyHandler.value = useCopy(payload.props);
    };
    const registCxRenderer = (params) => {
        let render = null;
        if (isFunction$1(params.payload)) {
            render = params.payload;
        }
        else if (params.payload) {
            render = params.payload.render;
            params.payload.active && CxTableActiveControl.add(params.type);
        }
        render && CxTableRendererMap.set(params.type, render);
    };
    const setCxTableScopeId = (id) => {
        context.contextScopeId = id;
    };
    const setMessageInstance = (instance) => {
        context.messageInstance = instance;
    };
    const setDynamicFormSearchApi = (moduleType, rules) => {
        context.dynamicFormContext.requestApiMap[moduleType] = rules;
    };
    const setDynamicCacheContext = (key, val) => {
        context.dynamicCacheContext[key] = val;
    };
    const setDynamicRequestInstance = (instance) => {
        context.dynamicRequestInstance = instance;
    };
    const setDynamicType = (types) => {
        Object.keys(context.dynamicType).forEach(dynamicKey => {
            if (isObject$1(types[dynamicKey])) {
                context.dynamicType[dynamicKey] = types[dynamicKey];
            }
        });
    };
    const setPrecision = (precision) => {
        Object.assign(context.precision, precision);
    };
    const use = (plugin) => {
        if (isFunction$1(plugin.dynamicInject)) {
            context.dynamicInject.add(plugin.dynamicInject);
        }
    };
    return {
        registCxTable,
        setPrecision,
        setCxTableScopeId,
        setMessageInstance,
        setDynamicType,
        setDynamicFormSearchApi,
        setDynamicRequestInstance,
        setDynamicCacheContext,
        getContext,
        use,
        instance,
        registCxRenderer,
        copyHandler: copyHandler
    };
};

class EventBus {
    constructor() {
        this.eventDep = {};
    }
    on(eventName, func) {
        if (this.eventDep[eventName]) {
            this.eventDep[eventName]?.push(func);
        }
        else {
            this.eventDep[eventName] = [func];
        }
    }
    emit(eventName, ...args) {
        if (this.eventDep[eventName]) {
            this.eventDep[eventName]?.forEach(func => func(...args));
        }
    }
    off(eventName) {
        this.eventDep[eventName] = null;
    }
    clear() {
        this.eventDep = {};
    }
}
function EventBusCreator() {
    return new EventBus();
}
const eventBus = EventBusCreator();

let colid = 0, rowid = 0, tid = 0;
const rowIdMap = new WeakMap();
const colIdMap = new Map();
const useTableId = () => {
    const generateColId = (col) => {
        const key = col.label + col.prop;
        let result = colIdMap.get(key);
        if (!result) {
            result = CX_TABLE_COLUMN_ID_PREPEND + colid++;
            colIdMap.set(key, result);
        }
        return result;
    };
    const generateRowId = () => {
        return CX_TABLE_COLUMN_ID_PREPEND + rowid++;
    };
    const generateTableId = () => {
        return CX_TABLE_ID_PREPEND + tid++;
    };
    const getRowIdFromMap = (key) => {
        let result = rowIdMap.get(key);
        if (!result) {
            result = generateRowId();
            setRowIdToMap(key, result);
        }
        return result;
    };
    const setRowIdToMap = (key, value) => {
        rowIdMap.set(key, value);
        return value;
    };
    return { generateColId, generateRowId, generateTableId, getRowIdFromMap, setRowIdToMap };
};

const domShare = {
    getEle(container, selector) {
        return container.querySelector(selector);
    },
    getCell($CxTable, column, rowData) {
        const wrapperEle = $CxTable.wrapperEle;
        return wrapperEle.querySelector(`.cx-table_wrapper tr[rowid=${useTableId().getRowIdFromMap(rowData)}] td[colid=${column._colid}]`);
    },
    getAncestor(ele, nodeName = 'TD', limited = 5) {
        let result = ele;
        while (result && limited > 0) {
            if (result.nodeName === nodeName)
                break;
            result = result.parentElement;
            limited--;
        }
        return result;
    },
    scrollTo($CxTable, targetPosition) {
        $CxTable.wrapperEle?.scrollTo({ top: targetPosition });
    },
    scrollToTd(td, container, fixLeft, fixRight, fixTop) {
        if (!td || !container)
            return;
        const { offsetLeft: tdLeft, offsetTop: tdTop, clientWidth: tdWidth, clientHeight: tdHeight } = td;
        const { scrollLeft: containerLeft, scrollTop: containerTop, clientWidth: containerWidth, clientHeight: containerHeight } = container;
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

const useColumnValidity = ($CxTable) => {
    const { flatColumns } = $CxTable;
    const keys = new Map();
    flatColumns.forEach(item => {
        const key = item.label + item.prop;
        if (keys.get(key)) {
            throw new Error(`config中传递了重复的key: label=>${item.label},prop=>${item.prop}`);
        }
        else {
            keys.set(key, 1);
        }
    });
};
const useRowDataValidity = (props) => {
    const { tableData } = props;
    const rows = new Map();
    tableData?.forEach(rowData => {
        if (rows.get(rowData)) {
            throw new Error(`tableData中传递了重复的rowData引用:${JSON.stringify(rowData)}`);
        }
        else {
            rows.set(rowData, 1);
        }
    });
};

function includeArr(arr) {
    return (label) => arr.some(item => label?.includes(item));
}
function equal(target) {
    return (label) => label === target;
}
const CxTableWidthMap = new Map([
    ['序号', { width: 60, rule: equal('序号'), static: true }],
    // special
    ['金', { width: 140, rule: equal('金Au (g)') }],
    ['收藏', { width: 100, rule: label => label?.includes('收藏'), static: true }],
    ['手寸', { width: 80, rule: equal('手寸') }],
    ['导入', { width: 255, rule: equal('失败原因') }],
    ['cc不给号', { width: 250, rule: label => ['石号', '证书号'].includes(label) }],
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
    ['生产单号', { width: 120, rule: label => ['生产单号', '销售单号'].includes(label) }],
    ['选择', { width: 60, rule: equal('选择'), static: true }],
    ['货号', { width: 60, rule: equal('货号'), static: true }],
    ['空', { width: 50, rule: equal('') }],
    ['时间', { width: 140, rule: includeArr(['时间', '日期']) }],
    ['姓名', { width: 110, rule: includeArr(['提交人', '审核人', '客户名', '工人']) }],
    [
        '商户类',
        {
            width: 240,
            rule: label => {
                return ((['采购单位', '销售对象', '结算对象', '业务对象'].includes(label) ||
                    includeArr(['商户', '供应商'])(label)) &&
                    !label?.includes('单号'));
            }
        }
    ],
    ['仓位', { width: 100, rule: label => ['调入仓', '调出仓'].includes(label) }],
    [
        '手输单号',
        { width: 140, rule: label => ['关联业务单号', '商户单号', '关联订单'].includes(label) }
    ],
    ['批号', { width: 130, rule: label => label?.includes('批号') }],
    ['纯度', { width: 100, rule: label => label?.includes('纯度') }],
    ['重量', { width: 100, rule: includeArr(['重量', '(g)', '（ct）']) }],
    ['金额', { width: 120, rule: includeArr(['金额', '元', '价']) }],
    [
        '数量',
        {
            width: 80,
            rule: label => includeArr(['数'])(label) ||
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
                ].includes(label)
        }
    ],
    ['率', { width: 120, rule: includeArr(['率', '损耗']) }],
    ['备注', { width: 180, rule: label => label?.includes('备注') }],
    ['状态', { width: 100, rule: label => label?.includes('状态'), static: true }],
    ['图片', { width: 80, rule: label => label?.includes('图') && label !== '审图', static: true }],
    ['操作', { width: 100, rule: equal('操作'), static: true }],
    ['默认', { width: 120, rule: () => true }]
]);

// 表格内容区字符宽度(基准宽度)
const contentWidthAdaptor = (column, props) => {
    return Math.max(...props.tableData?.map(rowData => {
        let content = rowData[column.prop], append = 0;
        const type = column?.control?.type;
        // 当处于特殊字段时,直接取最大宽度
        if (['备注'].includes(column.label) && column?.control?.type === 'input') {
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
        let contentWidth = getStringWidth(content ?? '');
        if (column.slot) {
            const textContentWidth = getStringWidth(rowData[getColumnSelectText(column)]);
            const nameContentWidth = getStringWidth(rowData[getColumnSelectText(column, 'Name')]);
            contentWidth = Math.max(contentWidth, textContentWidth, nameContentWidth);
            if (['search', 'select'].includes(column.slotType)) {
                contentWidth += 55;
            }
            else if (['input'].includes(column.slotType)) {
                contentWidth += 40;
            }
        }
        return contentWidth + append + 16;
    }));
};
// 表头字符宽度(最小宽度)
const headWidthAdaptor = ({ label, required, icon, control, slot, headSlot, configWidth, configMinWidth, slotType, headTip }) => {
    const type = control?.type;
    if (['nativeCheckbox', 'nativeRadio'].includes(type)) {
        return 60;
    }
    else if (['nativeDelete', 'expandSwitch'].includes(type)) {
        return 60;
    }
    // 对于插槽的情况, 无法判断具体长度, 故单独处理(取配置项当中的值)
    else if ((slot || headSlot) && (configWidth || configMinWidth)) {
        return (configWidth ?? configMinWidth);
    }
    let width = getStringWidth(label) + 16 + +!!required * 16 + +!!icon * 20;
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
const widthMapAdaptor = ({ label, slot, headSlot, slotType, configWidth, configMinWidth }) => {
    const targetItem = [...CxTableWidthMap.values()].find(item => item.rule(label));
    let { width, static: isStatic } = targetItem;
    // 对于插槽的情况, 无法判断具体长度, 故单独处理(取配置项当中的值)
    if (slot || headSlot) {
        if (configWidth || configMinWidth) {
            width = (configWidth ?? configMinWidth);
            isStatic = !!configWidth;
        }
        if (['search', 'select'].includes(slotType)) {
            width += 55;
        }
        else if (['input'].includes(slotType)) {
            width += 40;
        }
    }
    const result = {
        ...targetItem,
        width,
        // 是否允许拉伸
        isMin: !isStatic
    };
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
const getColumnWidth = ($CxTable, column, props) => {
    !isString$1(column.label) && cxTableWarn(`invalid cxTable config => ${column.label} label`);
    const priority = $CxTable.priorityColumnMap.get(column.prop) ?? {};
    const result = { isMin: false, width: 0 };
    if (column.importantWidth) {
        // 六级
        const width = +column.importantWidth;
        isNaN(width) && cxTableWarn(`invalid cxTable config => ${column.prop} importantWidth`);
        result.width = width || 0;
        result.isMin = !!column.autoWidth;
        return result;
    }
    else if (priority.width) {
        // 五级
        const width = +priority.width;
        isNaN(width) && cxTableWarn(`invalid cxTable config => ${column.prop} priorityWidth`);
        result.width = width || 0;
    }
    // 二级(一级)
    const { width: L_MAX, isMin } = widthMapAdaptor(column) ?? {};
    // 是否使用适配器中的宽度可通过widthAdaptor开关关闭(不影响最高优先级的importantWidth与setConfig中的宽度)
    if (!props.widthAdaptor) {
        Reflect.set(result, 'width', column.configWidth);
    }
    else if (!result.width) {
        // 四级
        const L_CONTENT = contentWidthAdaptor(column, props);
        // 三级
        const L_MIN = headWidthAdaptor(column);
        result.width = L_CONTENT < L_MIN ? L_MIN : L_CONTENT > L_MAX ? L_MAX : L_CONTENT;
    }
    result.isMin = isMin;
    return result;
};

const useAutoWidth = ($CxTable) => {
    const { wrapperEle } = $CxTable;
    if (!wrapperEle)
        return;
    const { columnStore, styleStore } = $CxTable;
    const { pxColumns, pxMinColumns, percentColumns, percentMinColumns, noWidthColumns } = columnStore;
    const wrapperWidth = wrapperEle.clientWidth;
    let remainWidth = wrapperWidth;
    let meanWidth = wrapperWidth / 100;
    let tableWidth = 0;
    pxColumns.forEach(col => {
        const pxWidth = parseInt(col.width + '');
        tableWidth += pxWidth;
        col.renderWidth = pxWidth;
    });
    pxMinColumns.forEach(col => {
        const pxWidth = parseInt(col.minWidth + '');
        tableWidth += pxWidth;
        col.renderWidth = pxWidth;
    });
    percentColumns.forEach(col => {
        const scaleWidth = Math.floor(parseInt(col.width + '') * meanWidth);
        tableWidth += scaleWidth;
        col.renderWidth = scaleWidth;
    });
    percentMinColumns.forEach(col => {
        const scaleWidth = Math.floor(parseInt(col.minWidth + '') * meanWidth);
        tableWidth += scaleWidth;
        col.renderWidth = scaleWidth;
    });
    noWidthColumns.forEach(col => {
        const width = styleStore.CX_TABLE_MIN_WIDTH;
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
                .forEach((col) => {
                tableWidth += meanWidth;
                col.renderWidth += meanWidth;
            });
        }
    }
    const dynamicList = percentMinColumns.concat(pxMinColumns).concat(noWidthColumns);
    let dynamicSize = dynamicList.length - 1;
    if (dynamicSize > 0) {
        let offsetWidth = wrapperWidth - tableWidth;
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
const updateCxTableWidth = async ($CxTable, props, prop) => {
    let targetColumn = $CxTable.flatColumns?.find(column => column.prop === prop);
    const parentColumn = getParentColumn($CxTable.columns, prop);
    /**
     * 由于在select,search,slot等情况下, 存在只有text变化而id不变化的情况, 难以通过列prop(xxxId)监听到全部的表格内容变化
     * 故需要由xxxText反推id列prop
     */
    if (!targetColumn) {
        if (/.+Text/.test(prop)) {
            const idProp = prop.replace(/Text$/, 'Id');
            targetColumn = $CxTable.flatColumns?.find(column => column.prop === idProp);
        }
    }
    if (!targetColumn) {
        targetColumn = $CxTable.flatColumns?.find(column => column.control?.selectText === prop);
    }
    if (!targetColumn)
        return;
    const widthState = getColumnWidth($CxTable, targetColumn, props);
    let { width } = widthState;
    const { isMin } = widthState;
    // 处理只有一个子项的情况
    if (parentColumn?.children?.length === 1) {
        const { width: parentWidth } = getColumnWidth($CxTable, parentColumn, props);
        width = Math.max(parentWidth, width);
    }
    // 当处于最后一列且配置了configurable,需要增加40px
    if (prop === $CxTable.flatColumns[$CxTable.flatColumns.length - 1].prop && props.configurable) {
        width += 40;
    }
    Reflect.set(targetColumn, isMin ? 'minWidth' : 'width', width),
        Reflect.deleteProperty(targetColumn, isMin ? 'width' : 'minWidth');
};

class CxBroadcast {
    constructor() {
        this.deps = new Map();
        this.entireDep = [];
    }
    trigger(key, rowData, payload) {
        const dep = this.getDep(key, rowData);
        // 发送局部广播
        dep.forEach(cb => isFunction$1(cb) && cb(payload));
        // 发送全局广播
        this.entireDep.forEach(cb => isFunction$1(cb) && cb(payload));
    }
    registEntireListener(cb) {
        !this.entireDep.includes(cb) && this.entireDep.push(cb);
    }
    registListener(key, rowData, cb) {
        const dep = this.getDep(key, rowData);
        !dep.includes(cb) && dep.push(cb);
    }
    getDep(key, rowData) {
        let result = [];
        let rowsDep = this.deps.get(key);
        if (!rowsDep) {
            rowsDep = new WeakMap();
            rowsDep.set(rowData, result);
            this.deps.set(key, rowsDep);
        }
        else {
            const deps = rowsDep.get(rowData);
            if (deps) {
                result = deps;
            }
            else {
                rowsDep.set(rowData, result);
            }
        }
        return result;
    }
}
const useBroadcast = () => {
    return {
        broadcast: new CxBroadcast()
    };
};

const useBus = ($CxTable, props) => {
    const bus = new EventBus();
    const { emit } = useContext();
    bus.on('addNewRow', (content) => {
        if (props.disabled)
            return;
        const emptyRow = $CxTable.flatColumns.reduce((res, column) => {
            Reflect.set(res, column.prop, '');
            return res;
        }, {});
        emit(content, emptyRow);
    });
    bus.on('expandCheck', (params) => {
        emit('expandCheck', params);
    });
    bus.on('tdFocus', (params) => emit('tdFocus', params));
    bus.on('deleteRow', (rowIndex) => {
        const { tableData } = props;
        tableData?.splice(rowIndex, 1);
    });
    return { bus };
};

const useCSSVariable = ($CxTable) => {
    return {
        cssVariable: computed(() => {
            return {
                '--padding': $CxTable.styleStore.CX_TABLE_PADDING,
                '--cellHeight': $CxTable.styleStore.CX_TABLE_HEIGHT,
                '--scrollWidth': $CxTable.styleStore.CX_TABLE_SCROLL_BAR
            };
        })
    };
};

const useCalcSpanMethod = ($CxTable, props) => {
    const { virtualStore, flatColumns } = $CxTable;
    const { rowSpanMap } = virtualStore;
    rowSpanMap.length = props.tableData?.length ?? 0;
    rowSpanMap.fill(0);
    props.tableData?.forEach((rowData, rowIndex) => {
        flatColumns.some(column => {
            let result = props.spanMethod?.({ rowData, column, rowIndex }) ?? {};
            if (isArray$1(result)) {
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
    Object.assign(current, isFunction$1(assign) ? assign(payload) : assign);
}
function useStyle(col, props) {
    return (params, type, rowData, rowIndex) => {
        const result = { textAlign: col.align === 'center' ? 'center' : 'left' };
        if (type === 'body') {
            props.cellStyle && assignStyle(result, props.cellStyle, { column: col, rowData, rowIndex });
            col.cellStyle && assignStyle(result, col.cellStyle, { column: col, rowData, rowIndex });
        }
        if (type === 'head') {
            props.headCellStyle && assignStyle(result, props.headCellStyle, { column: col });
            col.headCellStyle && assignStyle(result, col.headCellStyle, { column: col });
        }
        if (isNumber(params?.height)) {
            result.height = formatWidth(params?.height);
        }
        return result;
    };
}

function getColumnFlag(col) {
    let result = 0;
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
    if (col.children?.length) {
        result |= COLUMN_FLAG.ARRAY_CHILDREN;
    }
    if (col.sum === 'add') {
        result |= COLUMN_FLAG.ADD_SUM_COLUMN;
    }
    else if (isFunction$1(col.sum)) {
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
    const priority = $CxTable.priorityColumnMap.get(col.prop) ?? {};
    const column = deepMerge(deepMerge({}, col), priority);
    const result = {
        ...column,
        configWidth: column.width,
        configMinWidth: column.minWidth,
        columnFlag: getColumnFlag(column),
        getStyle: useStyle(column, props),
        renderWidth: 0,
        children: undefined,
        _colid: useTableId().generateColId(column)
    };
    const widthState = getColumnWidth($CxTable, result, props);
    let { width } = widthState;
    const { isMin } = widthState;
    // 处理只有一个子项的情况
    if (uniqueChildren && parent) {
        const { width: parentWidth } = getColumnWidth($CxTable, parent, props);
        width = Math.max(parentWidth, width);
    }
    Reflect.set(result, isMin ? 'minWidth' : 'width', width),
        Reflect.deleteProperty(result, isMin ? 'width' : 'minWidth');
    result.children = column.children
        ?.filter(item => !item.hide)
        ?.map(column => normalizeColumn(column, $CxTable, props, result, col.children?.length === 1));
    return result;
}
function useColumn($CxTable, columnProxy, props) {
    const cols = columnProxy.value;
    const columns = cols
        .filter(col => !col.hide)
        .map(col => normalizeColumn(col, $CxTable, props));
    const leftFixedColumns = columns.filter(col => col.fixed === 'left');
    $CxTable.columnStore.leftFixedColumns = leftFixedColumns;
    const rightFixedColumns = columns.filter(col => col.fixed === 'right');
    $CxTable.columnStore.rightFixedColumns = rightFixedColumns;
    const middenColumns = columns.filter(column => !column.fixed);
    $CxTable.columnStore.centerColumns = arrFlat(middenColumns);
    $CxTable.columns = [].concat($CxTable.columnStore.leftFixedColumns, middenColumns, $CxTable.columnStore.rightFixedColumns);
    $CxTable.flatColumns = arrFlat($CxTable.columns);
    classifyColumn($CxTable, $CxTable.flatColumns);
}
function classifyColumn($CxTable, columns) {
    const pxColumns = columns.filter(col => {
        if (!isEmpty$1(col.minWidth))
            return false;
        return isNumber(col.width) || (isString$1(col.width) && col.width.endsWith('px'));
    });
    $CxTable.columnStore.pxColumns = pxColumns;
    const percentColumns = columns.filter(col => {
        if (!isEmpty$1(col.minWidth))
            return false;
        return isString$1(col.width) && col.width.endsWith('%');
    });
    $CxTable.columnStore.percentColumns = percentColumns;
    const pxMinColumns = columns.filter(col => {
        return isNumber(col.minWidth) || (isString$1(col.minWidth) && col.minWidth.endsWith('px'));
    });
    $CxTable.columnStore.pxMinColumns = pxMinColumns;
    const percentMinColumns = columns.filter(col => {
        return isString$1(col.minWidth) && col.minWidth.endsWith('%');
    });
    $CxTable.columnStore.percentMinColumns = percentMinColumns;
    const noWidthColumns = columns.filter(col => {
        return isEmpty$1(col.width) && isEmpty$1(col.minWidth);
    });
    $CxTable.columnStore.noWidthColumns = noWidthColumns;
}

function useCxPagination() {
    return reactive$1({
        currentPage: 1,
        pageCapacity: 10,
        pageSizes: [10, 20, 50],
        total: 0
    });
}

const useCxSort = (props) => {
    const sortProp = ref('');
    const sortStatus = ref(CX_SORT_STATUS.NONE);
    const sort = ref(false);
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
            get(target, key) {
                if (key === 'sortedData')
                    return props.tableData;
                if (key === 'sortProp')
                    return sortProp.value;
                if (key === 'sortStatus')
                    return sortStatus.value;
            },
            set(target, key, val) {
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

const onInits$1 = [];
const onOutputs$1 = [];
class FormConfigAdaptor$1 {
    constructor(config) {
        this.__items = {
            label: '',
            prop: '',
            closable: true,
            register: []
        };
        const configDuplicate = onInits$1.reduce((res, hook) => (R.is(Function, hook) ? hook(res) : res), R.clone(config));
        this.adaptor(configDuplicate);
    }
    static use(plugin) {
        // push::a->a[]->number
        const push = R.curry((arr, item) => arr.push(item));
        // updateHooks::object a=>a[]->string->object->Maybe b
        const updateHooks = (source, key) => {
            // map::Maybe->a
            const MaybeMap = map$1(R.ifElse(R.is(Function), push(source), R.identity));
            return R.compose(MaybeMap, Maybe.of, R.prop(key));
        };
        updateHooks(onInits$1, 'onInit')(plugin);
        updateHooks(onOutputs$1, 'onOutput')(plugin);
    }
    get items() {
        return onOutputs$1.reduce((res, hook) => (R.is(Function, hook) ? hook(res) : res), R.clone(this.__items));
    }
    static of(config) {
        return new FormConfigAdaptor$1(config).items;
    }
    adaptor(config) {
        // 静态部分
        ['label', 'prop'].forEach(key => unsafeSet(this.__items, key, config[key]));
        // 动态部分
        const searchStates = R.prop('searchStates', config);
        // options
        Maybe.of(searchStates.dynamicSearchOptions).map(unsafeSet(searchStates, 'searchOptions'));
        const controlConfig = {};
        Reflect.set(this.__items, searchStates.searchType ?? 'input', controlConfig);
        R.equals('input', searchStates.searchType) && unsafeSet(controlConfig, 'searchIcon', false);
        // options::NameWithId a=>object->a[]
        const options = R.curryN(2, R.compose(R.prepend({ name: '全部', id: -1 }), calcInnerOptions))(searchStates.searchOptions ?? []);
        if (Array.isArray(searchStates.searchOptions)) {
            Reflect.set(controlConfig, 'options', options(searchStates.searchOptions));
        }
        else if (isObject$1(searchStates.searchOptions)) {
            Reflect.set(controlConfig, 'options', R.compose(options, R.prop('form')));
        }
        // options依赖项发生改变时清空该列数据 TODO
        const deps = getOptionsDeps(searchStates.searchOptions ?? []);
        const cb = unsafeDeleteProperty(R.__, this.__items.prop);
        this.__items.register = deps.map(R.compose(unsafeSet(R.__, 'cb', cb), R.objOf('dep')));
    }
}

//格式化条码
function formatBarcode(str) {
    let code = str;
    if (code.length >= 12) {
        code = Number(code.substr(0, code.length - 1));
        if (!isNaN(code)) {
            return code.toString();
        }
    }
    return str;
}
const dataInitPlugin$1 = {
    onOutput: config => {
        if (config.label === '生产单号') {
            config.onChange = ({ prop, form }) => {
                form[prop] = formatBarcode(form[prop]);
            };
        }
        return config;
    }
};

FormConfigAdaptor$1.use(dataInitPlugin$1);
const FormConfigAdaptor = FormConfigAdaptor$1;

const useCxTableCompose = () => {
    // getAllSearchableColumn::CxTableDynamicColumn a=>a[]->a[]
    const getAllSearchableColumn = R.compose(R.filter(R.compose(R.is(Object), unsafeGet(R.__, 'searchStates'))), arrFlat);
    // getSearchableFormConfig::CxTableDynamicColumn[]->CxFormItemConfig[]
    const getSearchableFormConfig = R.compose(R.map(FormConfigAdaptor.of), getAllSearchableColumn);
    // column2NameWithId::CxTableDynamicColumn[]->NameWithId[]
    const column2NameWithId = R.compose(R.zipObj(['id', 'name']), R.props(['prop', 'label']));
    // getOptionListFromColumn::CxTableDynamicColumn[]->Option[]
    const getOptionListFromColumn = R.compose(R.map(column2NameWithId), getAllSearchableColumn);
    // getCurrentFormConfig::CxTableDynamicColumn[]->string[]->CxFormItemConfig[]
    const getCurrentFormConfig = (columns, currentItems) => {
        const itemList = getSearchableFormConfig(columns);
        return R.compose(R.append({ label: '', prop: 'add', custom: { slot: 'add' } }), R.reduce((res, prop) => {
            return R.compose(R.ifElse(R.isNil, R.always(res), R.flip(R.append)(res)), R.find(R.propEq('prop', prop)))(itemList);
        }, []))(currentItems);
    };
    // isEmptyValue::a->boolean
    const isEmptyValue = R.anyPass([
        R.isNil,
        R.equals(-1),
        R.equals(''),
        R.ifElse(R.is(Array), R.compose(R.equals(0), R.length), R.F)
    ]);
    // isRenderInTeleport::object->boolean
    const isRenderInTeleport = R.allPass([R.prop('formTeleport')]);
    // formValueFormat::a->object
    const formValueFormat = R.ifElse(Array.isArray, R.compose(R.zipObj(['val1', 'val2']), R.props(['0', '1'])), R.objOf('value'));
    // arrayIsNotEmpty::array a=>a->boolean
    const arrayIsNotEmpty = R.compose(R.gt(R.__, 0), R.length);
    // isPositive::number->boolean
    const isPositive = R.gte(R.__, 0);
    // getDynamicKeyPair::Object a=>a->{DynamicKey,any}[]
    const getDynamicKeyPair = R.compose(R.toPairs, R.omit(['config', 'api', 'requestInstance']));
    // splatEq::a->b->boolean
    const splatEq = splat(R.equals);
    // statesProp::CxDynamicItem a->Object|undefined
    const statesProp = R.prop('searchStates');
    // statesDefault::CxDynamicItem a->string|undefined
    const statesDefault = R.compose(R.prop('searchDefault'), statesProp);
    // getTargetColumnDefault::CxTableDynamicColumn a->Maybe any
    const getTargetColumnDefault = R.ifElse(R.compose(truthy, statesDefault), R.compose(Maybe.of, R.converge(formatFormDefaultValue, [
        statesDefault,
        R.compose(R.prop('searchType'), statesProp)
    ])), Maybe.none);
    // getParamsItems::Object->string[]->ParamsItem[]
    const getParamsItems = (form, currentFormItems) => {
        if (!form || !currentFormItems)
            return [];
        return currentFormItems.reduce((res, prop) => {
            return Maybe.of(form[prop])
                .map(R.ifElse(R.compose(R.not, isEmptyValue), R.compose(unsafePush(R.__, res), R.of, R.mergeRight(R.objOf('prop', R.replace(/Text|Name$/, 'Id', prop))), formValueFormat), R.always(res)))
                .getWithDefault(res);
        }, []);
    };
    // innerBracket::string->string
    const innerBracket = R.compose(R.join(''), R.prepend('('), R.append(')'), R.of);
    const multiRuleWarn = R.curryN(2, unsafeWhenDevCall((rules, dynamic) => {
        if (rules.length > 1) {
            cxTableWarn(`matched ${R.length(rules)} rule `, rules, `  by config `, changeDynamicIdToText(dynamic), ``);
        }
    }));
    const getConfigByDynamicConfig = (dynamic, rules) => {
        return Maybe.run((function* () {
            const ruleList = yield Maybe.of(rules);
            const compareDynamicProp = R.compose(splatEq, R.adjust(0, R.prop(R.__, dynamic)));
            const fitCurrentDynamic = R.compose(R.all(compareDynamicProp), getDynamicKeyPair);
            return R.compose(R.head, R.tap(multiRuleWarn(R.__, dynamic)), R.filter(fitCurrentDynamic))(ruleList);
        })());
    };
    // arrNotEmpty::a[]->boolean
    const arrNotEmpty = R.compose(truthy, R.length);
    return {
        arrNotEmpty,
        multiRuleWarn,
        getConfigByDynamicConfig,
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

var t=function(t){return "function"==typeof t},e=function(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)},r=function(t){return "_"+t+"_"},n=function(e,r){return r.reduce((function(e,r){return t(r)?r(e):e}),e)},o=function(t){return e(t)||Array.isArray(t)?(Object.entries(t).forEach((function(e){var r=e[0],n=e[1];try{var i=JSON.parse(n);Reflect.set(t,r,o(i));}catch(t){}})),t):t},i=function(){function o(t){if(this.onSet=[],this.onGet=[],!["session","local"].includes(t))throw new TypeError("can't init store with type: "+t);this.instance="session"===t?sessionStorage:localStorage;}return o.prototype.set=function(t,e,o,i){void 0===o&&(o=99999999),void 0===i&&(i="global");var c=n(e,this.onSet);try{var s=this.getModule(i);return Reflect.set(s,t,{expire:1e3*o,val:c,time:Date.now()}),this.instance.setItem(r(i),JSON.stringify(s)),!0}catch(r){return console.error("failed to set storage: { key:"+t+",val:"+e+" }"),!1}},o.prototype.get=function(t,e){void 0===e&&(e="global");var r=this.getModule(e);try{var o=Reflect.get(r,t);if(!o)return;var i=o.time,c=o.expire,s=o.val;return +i+ +c<=Date.now()?void this.remove(t,e):n(s,this.onGet)}catch(e){return void console.error("failed to getItem with key : "+t)}},o.prototype.remove=function(t,e){void 0===e&&(e="global");try{var n=this.getModule(e);return Reflect.deleteProperty(n,t),this.instance.setItem(r(e),JSON.stringify(n)),!0}catch(t){return !1}},o.prototype.getModule=function(t){var e;try{return JSON.parse(null!==(e=this.instance.getItem(r(t)))&&void 0!==e?e:"{}")}catch(t){return {}}},o.prototype.use=function(r){if(e(r)){var n=r.onSet,o=r.onGet;t(n)&&this.onSet.push(n),t(o)&&this.onGet.push(o);}},o}(),c={onSet:function(t){if(e(t)){var r=(o=t,JSON.parse(JSON.stringify(o))),n=function(t){Object.entries(t).forEach((function(r){var o=r[0],i=r[1];null==i?Reflect.deleteProperty(t,o):e(i)&&n(i);}));};return n(r),r}var o;return t},onGet:o};

const session = new i('session');
session.use(c);
const sessionStore = session;
const local = new i('local');
local.use(c);
const localStore = local;

const cacheMap = {};
const resolveColumns = (cols, props) => {
    const context = useCxTable().getContext();
    return [...context.dynamicInject, props.dynamicInject].reduce((res, inject) => {
        return isFunction$1(inject) ? inject(res) : res;
    }, cols);
};
const getCxDynamicHead = async (dynamic) => {
    const url = '/header/dynamic';
    return new Promise((resolve, reject) => {
        const key = JSON.stringify(dynamic);
        const data = sessionStore.get(key, CX_TABLE_DYNAMIC_CACHE);
        if (data === CX_TABLE_CACHE_PENDING) {
            new Promise(innerResolve => {
                !cacheMap[key] && Reflect.set(cacheMap, key, []);
                cacheMap[key].push(innerResolve);
            })
                .then(resolve)
                .catch(reject);
        }
        else if (data) {
            resolve({ data, state: 200, message: '' });
        }
        else {
            sessionStore.set(key, CX_TABLE_CACHE_PENDING, CX_TABLE_THROTTLE_DURATION, CX_TABLE_DYNAMIC_CACHE);
            const invalidIndex = CX_TABLE_DYNAMIC_PROPS.findIndex(key => {
                if (!isNumber(Reflect.get(dynamic, key))) {
                    cxTableWarn(`dynamic参数传递错误:${key} is not a number`);
                    return true;
                }
            });
            if (invalidIndex >= 0) {
                return reject();
            }
            useCxTable()?.getContext()?.dynamicRequestInstance
                .get(url, { ...dynamic, random: Math.random() })
                .then(resolve)
                .catch(reject);
        }
    });
};
const useDynamicConfig = (props) => {
    const columnProxy = ref$1([]);
    const dynamicColumn = ref$1([]);
    const loading = ref$1(false);
    const { emit } = useContext();
    const forceUpdate = debounce((isDynamicChange = false) => {
        if (isObject$1(props.dynamic)) {
            loading.value = true;
            const key = JSON.stringify(props.dynamic);
            getCxDynamicHead(props.dynamic)
                .then(async ({ data }) => {
                if (Array.isArray(data)) {
                    const duplicate = R.clone(data);
                    dynamicColumn.value = duplicate;
                    sessionStore.set(key, data, CX_TABLE_THROTTLE_DURATION, CX_TABLE_DYNAMIC_CACHE);
                    data = data.map(item => new CxConfigAdaptor(item).column);
                    data = resolveColumns(data, props);
                    columnProxy.value = data;
                    if (Array.isArray(cacheMap[key])) {
                        cacheMap[key].forEach(resolve => {
                            resolve({ data: duplicate, state: 200, message: '' });
                        });
                        Reflect.deleteProperty(cacheMap, key);
                    }
                }
                await nextTick$1();
                isDynamicChange && emit('dynamicUpdate');
            })
                .finally(() => {
                loading.value = false;
                const data = sessionStore.get(key, CX_TABLE_DYNAMIC_CACHE);
                if (data === CX_TABLE_CACHE_PENDING) {
                    sessionStore.remove(key, CX_TABLE_DYNAMIC_CACHE);
                }
                if (Array.isArray(cacheMap[key])) {
                    cacheMap[key].forEach(resolve => {
                        resolve({ data: R.clone(data), state: 200, message: '' });
                    });
                }
                Reflect.deleteProperty(cacheMap, key);
            });
        }
        else {
            columnProxy.value = resolveColumns(R.clone(props.tableConfig.items), props);
        }
    }, 300);
    if (isObject$1(props.dynamic)) {
        watch$1(() => props.dynamic, R.converge(forceUpdate, [R.T]), { deep: true, immediate: true });
    }
    else {
        watch$1(() => props.tableConfig.items, R.converge(forceUpdate, [R.F]), { deep: true, immediate: true });
    }
    return { columnProxy, loading, forceUpdate, dynamicColumn };
};

const useExpandConfig = () => {
    const expandConfig = reactive([]);
    const clearExpand = () => {
        expandConfig.splice(0);
    };
    const setExpand = (index, val) => {
        Reflect.set(expandConfig, index, val);
    };
    return { expandConfig, clearExpand, setExpand };
};

const useLazyLoad = (ele, tableVisible) => {
    if (!IntersectionObserver) {
        tableVisible.value = true;
    }
    const observer = new IntersectionObserver(async (entries) => {
        if (tableVisible.value)
            return;
        await nextTick$1();
        tableVisible.value = Reflect.get(entries?.[0] ?? { isIntersecting: true }, 'isIntersecting');
    });
    observer.observe(ele);
};

const usePriorityConfig = ({ priorityColumnMap }) => {
    const onSetConfig = [];
    const setConfig = (prop, config) => {
        if (!config || !isObject$1(config))
            throw new TypeError('config must be a object');
        const old = priorityColumnMap.get(prop) ?? {};
        deepMerge(old, config);
        priorityColumnMap.set(prop, old);
        onSetConfig.forEach(cb => cb());
    };
    const clearConfig = () => {
        priorityColumnMap.clear();
    };
    const removeConfig = (prop) => {
        priorityColumnMap.delete(prop);
    };
    return { setConfig, removeConfig, clearConfig, onSetConfig };
};

const useRadioConfig = () => {
    const radioValue = ref$1(-1);
    const { emit } = useContext();
    watch$1(() => radioValue.value, val => {
        emit('radioChange', val);
    });
    const removeRadio = () => {
        radioValue.value = -1;
    };
    const setRadio = (val) => {
        radioValue.value = val;
    };
    const getRadio = () => {
        return radioValue.value;
    };
    return { radioValue, removeRadio, setRadio, getRadio };
};

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
        queue.push(job);
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
            if ((process.env.NODE_ENV !== 'production')) {
                checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex]);
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
            if ((process.env.NODE_ENV !== 'production')) {
                checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex]);
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
    try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            if (job) {
                if ((process.env.NODE_ENV !== 'production')) {
                    checkRecursiveUpdates(seen, job);
                }
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
        if (queue.length || pendingPostFlushCbs.length) {
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
            throw new Error(`Maximum recursive updates exceeded. ` +
                `This means you have a reactive effect that is mutating its own ` +
                `dependencies and thus recursively triggering itself. Possible sources ` +
                `include component template, render function, updated hook or ` +
                `watcher source function.`);
        }
        else {
            seen.set(fn, count + 1);
        }
    }
}
const hmrDirtyComponents = new Set();
// Expose the HMR runtime on the global object
// This makes it entirely tree-shakable without polluting the exports and makes
// it easier to be used in toolings like vue-loader
// Note: for a component to be eligible for HMR it also needs the __hmrId option
// to be set so that its instances can be registered / removed.
if ((process.env.NODE_ENV !== 'production')) {
    const globalObject = typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
            ? self
            : typeof window !== 'undefined'
                ? window
                : {};
    globalObject.__VUE_HMR_RUNTIME__ = {
        createRecord: tryWrap(createRecord),
        rerender: tryWrap(rerender),
        reload: tryWrap(reload)
    };
}
const map = new Map();
function createRecord(id, component) {
    if (!component) {
        warn(`HMR API usage is out of date.\n` +
            `Please upgrade vue-loader/vite/rollup-plugin-vue or other relevant ` +
            `depdendency that handles Vue SFC compilation.`);
        component = {};
    }
    if (map.has(id)) {
        return false;
    }
    map.set(id, {
        component: isClassComponent(component) ? component.__vccOpts : component,
        instances: new Set()
    });
    return true;
}
function rerender(id, newRender) {
    const record = map.get(id);
    if (!record)
        return;
    if (newRender)
        record.component.render = newRender;
    // Array.from creates a snapshot which avoids the set being mutated during
    // updates
    Array.from(record.instances).forEach(instance => {
        if (newRender) {
            instance.render = newRender;
        }
        instance.renderCache = [];
        instance.update();
    });
}
function reload(id, newComp) {
    const record = map.get(id);
    if (!record)
        return;
    // Array.from creates a snapshot which avoids the set being mutated during
    // updates
    const { component, instances } = record;
    if (!hmrDirtyComponents.has(component)) {
        // 1. Update existing comp definition to match new one
        newComp = isClassComponent(newComp) ? newComp.__vccOpts : newComp;
        extend$1(component, newComp);
        for (const key in component) {
            if (!(key in newComp)) {
                delete component[key];
            }
        }
        // 2. Mark component dirty. This forces the renderer to replace the component
        // on patch.
        hmrDirtyComponents.add(component);
        // 3. Make sure to unmark the component after the reload.
        queuePostFlushCb(() => {
            hmrDirtyComponents.delete(component);
        });
    }
    Array.from(instances).forEach(instance => {
        if (instance.parent) {
            // 4. Force the parent instance to re-render. This will cause all updated
            // components to be unmounted and re-mounted. Queue the update so that we
            // don't end up forcing the same parent to re-render multiple times.
            queueJob(instance.parent.update);
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
    });
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
function markAttrsAccessed() {
}
function filterSingleRoot(children) {
    let singleRoot;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isVNode(child)) {
            // ignore user comment
            if (child.type !== Comment || child.children === 'v-if') {
                if (singleRoot) {
                    // has more than 1 non-comment child, return now
                    return;
                }
                else {
                    singleRoot = child;
                }
            }
        }
        else {
            return;
        }
    }
    return singleRoot;
}

const isSuspense = (type) => type.__isSuspense;
function normalizeSuspenseChildren(vnode) {
    const { shapeFlag, children } = vnode;
    let content;
    let fallback;
    if (shapeFlag & 32 /* SLOTS_CHILDREN */) {
        content = normalizeSuspenseSlot(children.default);
        fallback = normalizeSuspenseSlot(children.fallback);
    }
    else {
        content = normalizeSuspenseSlot(children);
        fallback = normalizeVNode(null);
    }
    return {
        content,
        fallback
    };
}
function normalizeSuspenseSlot(s) {
    if (isFunction(s)) {
        s = s();
    }
    if (isArray(s)) {
        const singleChild = filterSingleRoot(s);
        if ((process.env.NODE_ENV !== 'production') && !singleChild) {
            warn(`<Suspense> slots expect a single root node.`);
        }
        s = singleChild;
    }
    return normalizeVNode(s);
}
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

let isRenderingCompiledSlot = 0;
const setCompiledSlotRendering = (n) => (isRenderingCompiledSlot += n);

// SFC scoped style ID management.
let currentScopeId = null;

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
                setCurrentInstance(null);
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
            ( ` If you are using async setup(), make sure to register lifecycle ` +
                    `hooks before the first await statement.`
                ));
    }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => 
// post-create lifecycle registrations are noops during SSR
injectHook(lifecycle, hook, target);
const onMounted = createHook("m" /* MOUNTED */);
const onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
const onUnmounted = createHook("um" /* UNMOUNTED */);
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
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ, instance = currentInstance) {
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
    let getter;
    let forceTrigger = false;
    if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = !!source._shallow;
    }
    else if (isReactive(source)) {
        getter = () => source;
        deep = true;
    }
    else if (isArray(source)) {
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
                return callWithErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
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
    const onInvalidate = (fn) => {
        cleanup = runner.options.onStop = () => {
            callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
        };
    };
    let oldValue = isArray(source) ? [] : INITIAL_WATCHER_VALUE;
    const job = () => {
        if (!runner.active) {
            return;
        }
        if (cb) {
            // watch(source, cb)
            const newValue = runner();
            if (deep || forceTrigger || hasChanged(newValue, oldValue)) {
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
            runner();
        }
    };
    // important: mark the job as a watcher callback so that scheduler knows
    // it is allowed to self-trigger (#1727)
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === 'sync') {
        scheduler = job;
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
    const runner = effect(getter, {
        lazy: true,
        onTrack,
        onTrigger,
        scheduler
    });
    recordInstanceBoundEffect(runner, instance);
    // initial run
    if (cb) {
        if (immediate) {
            job();
        }
        else {
            oldValue = runner();
        }
    }
    else if (flush === 'post') {
        queuePostRenderEffect(runner, instance && instance.suspense);
    }
    else {
        runner();
    }
    return () => {
        stop(runner);
        if (instance) {
            remove(instance.effects, runner);
        }
    };
}
// this.$watch
function instanceWatch(source, cb, options) {
    const publicThis = this.proxy;
    const getter = isString(source)
        ? () => publicThis[source]
        : source.bind(publicThis);
    return doWatch(getter, cb.bind(publicThis), options, this);
}
function traverse(value, seen = new Set()) {
    if (!isObject(value) || seen.has(value)) {
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
    else {
        for (const key in value) {
            traverse(value[key], seen);
        }
    }
    return value;
}
const queuePostRenderEffect =  queueEffectWithSuspense
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
const createVNode = ((process.env.NODE_ENV !== 'production')
    ? createVNodeWithArgsTransform
    : _createVNode);
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
        if (isProxy(props) || InternalObjectKey in props) {
            props = extend$1({}, props);
        }
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
        :  isSuspense(type)
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
    const vnode = {
        __v_isVNode: true,
        ["__v_skip" /* SKIP */]: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        children: null,
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
    // validate key
    if ((process.env.NODE_ENV !== 'production') && vnode.key !== vnode.key) {
        warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    normalizeChildren(vnode, children);
    // normalize suspense children
    if ( shapeFlag & 128 /* SUSPENSE */) {
        const { content, fallback } = normalizeSuspenseChildren(vnode);
        vnode.ssContent = content;
        vnode.ssFallback = fallback;
    }
    if (// avoid a block node from tracking itself
        !isBlockNode &&
        // has current parent block
        currentBlock &&
        // presence of a patch flag indicates this node needs patching on updates.
        // component nodes also should always be patched, because even if the
        // component doesn't need to update, it needs to persist the instance on to
        // the next vnode so that it can be properly unmounted later.
        (patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
        // the EVENTS flag is only for hydration and if it is the only flag, the
        // vnode should not be considered dynamic due to handler caching.
        patchFlag !== 32 /* HYDRATE_EVENTS */) {
        currentBlock.push(vnode);
    }
    return vnode;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
    // This is intentionally NOT using spread or extend to avoid the runtime
    // key enumeration cost.
    const { props, ref, patchFlag } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    return {
        __v_isVNode: true,
        ["__v_skip" /* SKIP */]: true,
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
        children: vnode.children,
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
}
/**
 * @private
 */
function createTextVNode(text = ' ', flag = 0) {
    return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
    if (child == null || typeof child === 'boolean') {
        // empty placeholder
        return createVNode(Comment);
    }
    else if (isArray(child)) {
        // fragment
        return createVNode(Fragment, null, child);
    }
    else if (typeof child === 'object') {
        // already vnode, this should be the most common since compiled templates
        // always produce all-vnode children arrays
        return child.el === null ? child : cloneVNode(child);
    }
    else {
        // strings and numbers
        return createVNode(Text, null, String(child));
    }
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
        if (shapeFlag & 1 /* ELEMENT */ || shapeFlag & 64 /* TELEPORT */) {
            // Normalize slot to plain children for plain element and Teleport
            const slot = children.default;
            if (slot) {
                // _c marker is added by withCtx() indicating this is a compiled slot
                slot._c && setCompiledSlotRendering(1);
                normalizeChildren(vnode, slot());
                slot._c && setCompiledSlotRendering(-1);
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
                if (currentRenderingInstance.vnode.patchFlag & 1024 /* DYNAMIC_SLOTS */) {
                    children._ = 2 /* DYNAMIC */;
                    vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
                }
                else {
                    children._ = 1 /* STABLE */;
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
    const ret = extend$1({}, args[0]);
    for (let i = 1; i < args.length; i++) {
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
                        ? [].concat(existing, toMerge[key])
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
let isInBeforeCreate = false;
function resolveMergedOptions(instance) {
    const raw = instance.type;
    const { __merged, mixins, extends: extendsOptions } = raw;
    if (__merged)
        return __merged;
    const globalMixins = instance.appContext.mixins;
    if (!globalMixins.length && !mixins && !extendsOptions)
        return raw;
    const options = {};
    globalMixins.forEach(m => mergeOptions(options, m, instance));
    mergeOptions(options, raw, instance);
    return (raw.__merged = options);
}
function mergeOptions(to, from, instance) {
    const strats = instance.appContext.config.optionMergeStrategies;
    const { mixins, extends: extendsOptions } = from;
    extendsOptions && mergeOptions(to, extendsOptions, instance);
    mixins &&
        mixins.forEach((m) => mergeOptions(to, m, instance));
    for (const key in from) {
        if (strats && hasOwn(strats, key)) {
            to[key] = strats[key](to[key], from[key], instance.proxy, key);
        }
        else {
            to[key] = from[key];
        }
    }
}

/**
 * #2437 In Vue 3, functional components do not have a public instance proxy but
 * they exist in the internal parent chain. For code that relies on traversing
 * public $parent chains, skip functional ones and go to the parent instead.
 */
const getPublicInstance = (i) => i && (i.proxy ? i.proxy : getPublicInstance(i.parent));
const publicPropertiesMap = extend$1(Object.create(null), {
    $: i => i,
    $el: i => i.vnode.el,
    $data: i => i.data,
    $props: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.props) : i.props),
    $attrs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.attrs) : i.attrs),
    $slots: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.slots) : i.slots),
    $refs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.refs) : i.refs),
    $parent: i => getPublicInstance(i.parent),
    $root: i => i.root && i.root.proxy,
    $emit: i => i.emit,
    $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
    $forceUpdate: i => () => queueJob(i.update),
    $nextTick: i => nextTick.bind(i.proxy),
    $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP)
});
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
        // let @vue/reactivity know it should never observe Vue public instances.
        if (key === "__v_skip" /* SKIP */) {
            return true;
        }
        // for internal formatters to know that this is a Vue instance
        if ((process.env.NODE_ENV !== 'production') && key === '__isVue') {
            return true;
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
            else if (!__VUE_OPTIONS_API__ || !isInBeforeCreate) {
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
            return globalProperties[key];
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
            else {
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
        else if (key in instance.props) {
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
extend$1({}, PublicInstanceProxyHandlers, {
    get(target, key) {
        // fast path for unscopables when using `with` block
        if (key === Symbol.unscopables) {
            return;
        }
        return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has(_, key) {
        const has = key[0] !== '_' && !isGloballyWhitelisted(key);
        if ((process.env.NODE_ENV !== 'production') && !has && PublicInstanceProxyHandlers.has(_, key)) {
            warn(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
        }
        return has;
    }
});
let currentInstance = null;
const setCurrentInstance = (instance) => {
    currentInstance = instance;
};
// record effects created during a component's setup() so that they can be
// stopped when the component unmounts
function recordInstanceBoundEffect(effect, instance = currentInstance) {
    if (instance) {
        (instance.effects || (instance.effects = [])).push(effect);
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

Symbol((process.env.NODE_ENV !== 'production') ? `ssrContext` : ``);

const registResponsive = (wrapper, callbacks) => {
    let recordOldWidth = '0';
    const updateWidth = debounce(async () => {
        await nextTick();
        if (!wrapper.value)
            return;
        const width = getComputedStyle(wrapper.value).getPropertyValue('width');
        if (width === recordOldWidth)
            return;
        recordOldWidth = width;
        callbacks.forEach(cb => cb());
    }, 100);
    const MutationObserver = window.MutationObserver;
    const supportMutation = typeof MutationObserver !== undefined;
    let observer = null;
    if (supportMutation) {
        observer = new MutationObserver(updateWidth);
    }
    onMounted(() => {
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
    onBeforeUnmount(() => {
        if (observer) {
            observer.disconnect();
        }
        else {
            window.removeEventListener('resize', updateWidth);
        }
    });
};
const scrollUpdateVisualScroll = ($CxTable, props) => {
    if (props.virtualScroll) {
        const { wrapperEle } = $CxTable;
        if (!wrapperEle)
            return;
        const { virtualStore, styleStore } = $CxTable;
        const { scrollTop, clientHeight } = wrapperEle;
        const { CX_TABLE_HEIGHT, CX_VISUAL_CACHE } = styleStore;
        const appendNum = +!!props.showTotalSum;
        const rowNum = props.tableData.length + appendNum;
        let renderStartIndex = Math.max(0, Math.floor(scrollTop / CX_TABLE_HEIGHT) - CX_VISUAL_CACHE);
        let topRowSpanPrepend = 0;
        if (props.spanMethod) {
            while (renderStartIndex > 0 &&
                virtualStore.rowSpanMap[renderStartIndex] & CX_SPAN_METHOD_TYPE.MISSING) {
                topRowSpanPrepend++;
                renderStartIndex--;
            }
        }
        let renderLength = Math.ceil(clientHeight / CX_TABLE_HEIGHT) + CX_VISUAL_CACHE * 2 + topRowSpanPrepend;
        if (props.spanMethod) {
            const startBrokenFlag = virtualStore.rowSpanMap[renderStartIndex + renderLength] & CX_SPAN_METHOD_TYPE.EXTEND;
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
const scrollUpdateShadow = ($CxTable) => {
    const { wrapperEle, scrollStore } = $CxTable;
    if (!wrapperEle)
        return;
    const { scrollLeft, scrollWidth, scrollHeight, scrollTop, clientWidth, clientHeight } = wrapperEle;
    scrollStore.scrollLeft = scrollLeft;
    scrollStore.scrollTop = scrollTop;
    scrollStore.showLeftShadow = scrollLeft !== 0;
    scrollStore.showTopShadow = scrollTop !== 0;
    // 当屏幕缩放比不是整十数时,会出现scrollLeft为小数的情况,此时如果以严格等于0去计算样式会出现问题
    scrollStore.showRightShadow = scrollWidth - clientWidth - scrollLeft >= 1;
    scrollStore.showBottomShadow = scrollHeight - clientHeight - scrollTop >= 1;
};
const wrapperScrollEventHandle = ($CxTable, props) => {
    const throttleVisual = throttle$1(scrollUpdateVisualScroll, 100, { leading: true, trailing: true });
    const throttleShadow = throttle$1(scrollUpdateShadow, 20, { leading: true, trailing: true });
    throttleShadow($CxTable);
    throttleVisual($CxTable, props);
};
const registScrollEvent = ($CxTable, props) => {
    onMounted(() => {
        const { wrapperEle } = $CxTable;
        if (!wrapperEle)
            return;
        wrapperEle.onscroll = () => wrapperScrollEventHandle($CxTable, props);
        setTimeout(() => wrapperScrollEventHandle($CxTable, props));
    });
};
const registCellEvent = ($CxTable, props) => {
    const onClick = (event) => {
        const td = event.currentTarget;
        const ele = event.target;
        if (ele.nodeName === 'INPUT')
            return true;
        // 兼容el-checkbox的写法
        if (ele.classList.contains('el-checkbox__inner'))
            return true;
        const { editStore, scrollStore, wrapperEle, columnStore } = $CxTable;
        const { actived } = editStore;
        const { centerColumns } = columnStore;
        actived.column = props.column;
        actived.rowData = props.rowData;
        editStore.activedCell = td;
        editStore.activedControl = null;
        let targetTd = td;
        if (props.column?.fixed === 'left') {
            targetTd = domShare.getCell($CxTable, centerColumns[0], actived.rowData) ?? td;
        }
        else if (props.column?.fixed === 'right') {
            targetTd =
                domShare.getCell($CxTable, centerColumns[centerColumns.length - 1], actived.rowData) ?? td;
        }
        domShare.scrollToTd(targetTd, wrapperEle, scrollStore.leftFixedWidth, scrollStore.rightFixedWidth, scrollStore.topFixedHeight);
    };
    return { onClick };
};
const registMouseEvent = ($CxTable) => {
    onMounted(() => {
        const { wrapperEle } = $CxTable;
        if (!wrapperEle)
            return;
        wrapperEle.onmousemove = throttle$1((event) => {
            const target = domShare.getAncestor(event.target, 'TR');
            if (target) {
                const tid = target.getAttribute('rowid');
                if ($CxTable.hoveringRowid !== tid) {
                    $CxTable.hoveringRowid = tid ? tid : CX_TABLE_NOT_HOVER_ID;
                }
            }
        }, 100, { leading: true, trailing: true });
        wrapperEle.onmouseleave = () => {
            $CxTable.hoveringRowid = CX_TABLE_NOT_HOVER_ID;
        };
    });
};
const registKeyboardEvent = ($CxTable, props, tableDataVisitor, bus, tid) => {
    let isTableActived = false;
    const { editStore, scrollStore } = $CxTable;
    const updateActivedCell = (oldTd) => {
        const { centerColumns } = $CxTable.columnStore;
        const { actived } = editStore;
        const { getCell, scrollToTd } = domShare;
        const td = getCell($CxTable, actived.column, actived.rowData) || oldTd;
        editStore.activedCell = td;
        let targetTd = td;
        if (actived.column?.fixed === 'left') {
            targetTd = getCell($CxTable, centerColumns[0], actived.rowData) ?? td;
        }
        else if (actived.column?.fixed === 'right') {
            targetTd = getCell($CxTable, centerColumns[centerColumns.length - 1], actived.rowData) ?? td;
        }
        scrollToTd(targetTd, $CxTable.wrapperEle, scrollStore.leftFixedWidth, scrollStore.rightFixedWidth, scrollStore.topFixedHeight);
    };
    const dblclickHandle = async () => {
        await new Promise(resolve => setTimeout(() => resolve('')));
        keydownHandle({ key: ' ', preventDefault: () => ({}) });
    };
    const isEleSelectItem = (ele) => {
        return ele?.nodeName === 'LI' && ele.classList.contains('el-select-dropdown__item');
    };
    const clickHandle = async (event) => {
        await new Promise(resolve => setTimeout(() => resolve('')));
        let eventTarget = event.target;
        const parentTarget = eventTarget?.parentElement;
        // 此逻辑是为了避免element下拉框点击退出的问题
        if (isEleSelectItem(eventTarget) || isEleSelectItem(parentTarget)) {
            return;
        }
        while ((eventTarget = eventTarget?.parentElement ?? null)) {
            const currentId = eventTarget?.getAttribute('tid');
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
    };
    const bindEscapeEvent = (inputEle, td) => {
        inputEle.addEventListener('keydown', (event) => {
            const { key } = event;
            if (key === 'Escape' && event.target) {
                editStore.activedControl = null;
                editStore.activedCell = td ?? null;
            }
        });
    };
    const inputActiveHandle = (inputEle, td) => {
        inputEle.focus();
        if (inputEle.type === 'checkbox') {
            const parent = inputEle.parentNode;
            if (parent?.classList?.contains('is-checked')) {
                parent.click?.();
            }
        }
        else {
            inputEle.click();
        }
        bindEscapeEvent(inputEle, td);
    };
    const isSilentCell = () => {
        return (!CxTableActiveControl.has($CxTable.editStore.actived.column?.control?.type) &&
            !$CxTable.editStore.actived.column?.slot);
    };
    const keydownEventHandle = throttle$1(async (event) => {
        if (!isTableActived)
            return;
        const { actived, activedCell } = editStore;
        if (!activedCell)
            return;
        const { flatColumns } = $CxTable;
        const { key, ctrlKey } = event;
        const target = activedCell;
        const isTd = target.nodeName === 'TD';
        const isInput = target.nodeName === 'INPUT';
        if (key === 'Tab') {
            if (actived.rowData === tableDataVisitor.sortedData[tableDataVisitor.sortedData.length - 1]) {
                bus.emit('addNewRow', 'addNewRow');
            }
            await nextTick();
            editStore.activedControl = null;
            actived.rowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'next');
            updateActivedCell(target);
            return;
        }
        if (isTd) {
            if (ctrlKey) {
                if (key === 'c') {
                    const range = document.createRange();
                    range.selectNodeContents(activedCell);
                    const selection = window.getSelection();
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                    document.execCommand('copy');
                }
                return;
            }
            if (key === 'Delete') {
                if (props.disabled)
                    return;
                const { column, rowData } = actived;
                if (!column || !rowData)
                    return;
                const { prop, control } = column;
                if (!control?.type)
                    return;
                if (['search', 'select'].includes(control?.type)) {
                    Reflect.set(rowData, prop, '');
                    if (control.selectText) {
                        Reflect.set(rowData, control.selectText, '');
                    }
                    else {
                        Reflect.set(rowData, getColumnSelectText(column), '');
                    }
                }
                if (['input', 'numberInput'].includes(control?.type)) {
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
                    return;
                }
                editStore.activedControl = true;
                setTimeout(() => {
                    const inputEle = domShare.getEle(target, 'input');
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
                const { actived } = $CxTable.editStore;
                if (actived.column && actived.rowData) {
                    editStore.activedCell = domShare.getCell($CxTable, actived.column, actived.rowData);
                }
            }
        }
        if (key === 'Enter') {
            requestAnimationFrame(async () => {
                const nextColumn = getPreOrNextItem(flatColumns, actived.column, 'next', '_colid');
                if (nextColumn === actived.column) {
                    const nextRowData = getPreOrNextItem(tableDataVisitor.sortedData, actived.rowData, 'next');
                    if (nextRowData === actived.rowData) {
                        return;
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
                    return (editStore.activedControl = false);
                }
                editStore.activedControl = true;
                await nextTick();
                setTimeout(() => {
                    if (!editStore.activedCell)
                        return;
                    const inputEle = domShare.getEle(editStore.activedCell, 'input');
                    if (inputEle) {
                        const td = editStore.activedCell;
                        editStore.activedControl = inputEle;
                        editStore.activedCell = inputEle;
                        inputActiveHandle(inputEle, td);
                    }
                    else {
                        editStore.activedControl = false;
                    }
                });
            });
        }
    }, 50, { trailing: true, leading: true });
    const keydownHandle = (event) => {
        const { key } = event;
        const { activedCell } = editStore;
        const isTd = activedCell?.nodeName === 'TD';
        if (isTableActived) {
            if (key === 'Tab' ||
                key === 'Enter' ||
                (key === ' ' && Reflect.get(event.target ?? {}, 'nodeName') !== 'INPUT')) {
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
    onUnmounted(() => {
        document.removeEventListener('keydown', keydownHandle, true);
        document.removeEventListener('click', clickHandle, true);
        document.removeEventListener('click', dblclickHandle, true);
    });
};
// 全选联动处理
const onSelectItemChange = (config) => {
    if (config.selectItem.length === 0) {
        config.actualAll = config.selectAll = false;
        config.indeterminate = false;
    }
    else {
        if (config.selectItem.every(item => item)) {
            config.actualAll = config.selectAll = true;
            config.indeterminate = false;
        }
        else {
            config.actualAll = config.selectAll = false;
            config.indeterminate = config.selectItem.some(item => item);
        }
    }
};

const useScrollState = ($CxTable) => {
    const { wrapperEle, scrollStore } = $CxTable;
    if (!wrapperEle)
        return;
    setTimeout(() => {
        const { clientHeight, scrollHeight, clientWidth, scrollWidth } = wrapperEle;
        scrollStore.clientHeight = clientHeight;
        scrollStore.clientWidth = clientWidth;
        scrollStore.rightScrollBar = clientHeight < scrollHeight;
        scrollStore.bottomScrollBar = clientWidth < scrollWidth;
    });
};

const useRegister = ($CxTable, props, tableDataVisitor, tableWrapper, bus, tid) => {
    registScrollEvent($CxTable, props);
    props.keyboard && registKeyboardEvent($CxTable, props, tableDataVisitor, bus, tid);
    registResponsive(tableWrapper, [
        async () => {
            await nextTick$1();
            useAutoWidth($CxTable);
            await nextTick$1();
            wrapperScrollEventHandle($CxTable, props);
            await nextTick$1();
            useScrollState($CxTable);
        }
    ]);
    registMouseEvent($CxTable);
};

const useSelectConfig = (tableDataVisitor) => {
    const selectConfig = reactive$1({
        selectAll: false,
        actualAll: false,
        indeterminate: false,
        selectItem: [],
        disabled: false,
        checkSelect: void 0,
        disabledItem: []
    });
    const { emit } = useContext();
    watch$1(() => tableDataVisitor.sortedData.length, async () => {
        selectConfig.selectItem.length = tableDataVisitor.sortedData.length;
        selectConfig.actualAll = false;
        tableDataVisitor.sortedData?.forEach((row, index) => {
            selectConfig.selectItem[index] = !!selectConfig.selectItem[index];
        });
        await nextTick$1();
        selectConfig.disabledItem.length = 0;
        tableDataVisitor.sortedData?.forEach((row) => {
            selectConfig.disabledItem.push(isFunction$1(selectConfig.checkSelect) && !!selectConfig.checkSelect?.(row));
        });
    }, { immediate: true });
    const updateSelectAllStatus = () => {
        selectConfig.selectAll = selectConfig.selectItem.every(item => item);
        selectConfig.indeterminate =
            !selectConfig.selectAll && selectConfig.selectItem.some(item => item);
    };
    const updateSelectConfig = () => {
        const checkedList = [];
        const unCheckList = [];
        selectConfig.selectItem.forEach((item, index) => {
            if (!tableDataVisitor.sortedData[index])
                return;
            (item ? checkedList : unCheckList).push({ index, row: tableDataVisitor.sortedData[index] });
        });
        onSelectItemChange(selectConfig);
        emit('selectChange', { checkedList, unCheckList });
    };
    watch$1(() => selectConfig.selectItem, updateSelectConfig, { deep: true, immediate: false });
    const clearSelection = () => {
        toggleAllSelection(false);
    };
    const toggleRowSelection = (index, state) => {
        const { disabledItem } = selectConfig;
        selectConfig.actualAll = !selectConfig.selectItem.some((selectVal, index) => !disabledItem[index] && selectVal);
        selectConfig.selectItem[index] = state ?? !selectConfig.selectItem[index];
        updateSelectAllStatus();
    };
    const toggleAllSelection = (state) => {
        if (state && !selectConfig.actualAll) {
            selectConfig.actualAll = true;
        }
        else if (selectConfig.actualAll && state) {
            selectConfig.actualAll = state = false;
        }
        else if (!state) {
            selectConfig.actualAll = false;
        }
        const items = [...selectConfig.selectItem];
        selectConfig.selectItem = selectConfig.disabledItem.map((bool, index) => bool ? items[index] : state);
        updateSelectAllStatus();
    };
    const getSelectValue = () => {
        return selectConfig.selectItem;
    };
    const setSelectDisabled = (val) => {
        selectConfig.disabled = val;
    };
    const getSelectAllValue = () => {
        return selectConfig.selectAll;
    };
    const setCheckSelect = (cb) => {
        selectConfig.checkSelect = cb;
    };
    return {
        selectConfig,
        setCheckSelect,
        updateSelectConfig,
        clearSelection,
        setSelectDisabled,
        toggleRowSelection,
        toggleAllSelection,
        getSelectValue,
        getSelectAllValue
    };
};

const useTableClass = (props, CxTable) => {
    return computed(() => {
        const result = [];
        if (props.fixed) {
            const { scrollStore } = CxTable;
            const { showLeftShadow, showRightShadow, showTopShadow, showBottomShadow } = scrollStore;
            result.push(`cx-table_fixed_${props.fixed}`);
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

const useTableStyle = (props, CxTable, type) => {
    const { scrollStore, styleStore, columnStore } = CxTable;
    const { CX_TABLE_SCROLL_BAR, CX_TABLE_HEIGHT } = styleStore;
    if (type === 'head') {
        return computed(() => {
            const result = {};
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
        return computed(() => {
            const result = {};
            if (props.fixed) {
                if (props.fixed === 'left') {
                    const { topFixedHeight, bottomScrollBar, clientHeight } = scrollStore;
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
                    const { topFixedHeight, rightScrollBar, bottomScrollBar, clientHeight } = scrollStore;
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
                    const { bottomScrollBar } = scrollStore;
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
        return computed(() => {
            const result = {};
            const fixedHeight = invokeLayeredRow(CxTable.columns).length * CX_TABLE_HEIGHT;
            scrollStore.topFixedHeight = fixedHeight;
            if (props.fixed === 'left') {
                const width = getSums(columnStore.leftFixedColumns);
                result.width = width + 'px';
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                scrollStore.leftFixedWidth = width;
            }
            else if (props.fixed === 'right') {
                const width = getSums(columnStore.rightFixedColumns);
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

const useValidator = ($CxTable, props) => {
    const validate = (params, dataSource) => {
        const invalidCells = [];
        const hasTargetProp = isString$1(params?.prop);
        const hasTargetRow = isNumber(params?.rowIndex);
        $CxTable.flatColumns.forEach((column, colIndex) => {
            if (hasTargetProp && params?.prop !== column.prop)
                return;
            const handle = (rowData, rowIndex, column) => {
                let errMsg = '';
                errMsg =
                    column.validator?.({
                        rowData,
                        column,
                        value: rowData[column.prop],
                        rowIndex
                    }) ?? '';
                if (!errMsg && column.required && isEmpty(rowData[column.prop])) {
                    errMsg = column.label + '不能为空';
                }
                if (errMsg)
                    invalidCells.push({ rowIndex, rowData, colIndex, errMsg, column });
            };
            if (!isFunction$1(column.validator) && !column.required)
                return;
            (isArray$1(dataSource) ? dataSource : props.tableData).forEach((rowData, rowIndex) => {
                if (hasTargetRow && params?.rowIndex !== rowIndex)
                    return;
                handle(rowData, rowIndex, column);
            });
        });
        if (invalidCells.length) {
            setTimeout(() => {
                const { column, rowData } = invalidCells[0];
                const td = domShare.getCell($CxTable, column, rowData);
                td?.click();
            });
        }
        return invalidCells;
    };
    return { validate };
};

const useWatch = (props, $CxTable, columnProxy, tableWrapper, expandConfig, tableVisible) => {
    const updateVisible = async () => {
        await nextTick();
        useScrollState($CxTable);
        wrapperScrollEventHandle($CxTable, props);
    };
    watch(() => tableVisible.value, updateVisible);
    const updateTableState = debounce(async () => {
        if (props.spanMethod && props.virtualScroll) {
            useCalcSpanMethod($CxTable, props);
        }
        $CxTable.flatColumns.forEach(column => {
            updateCxTableWidth($CxTable, props, column.prop);
        });
        useAutoWidth($CxTable);
        await nextTick();
        scrollUpdateShadow($CxTable);
        if (tableWrapper.value) {
            wrapperScrollEventHandle($CxTable, props);
            useScrollState($CxTable);
        }
    }, 50);
    const updateColumn = async () => {
        useColumn($CxTable, columnProxy, props);
        useColumnValidity($CxTable);
        updateTableState();
    };
    // 当表头变化时,需要更新column对象以及重新计算宽度,触发一些样式计算
    watch(() => columnProxy.value, updateColumn, { immediate: true, deep: true });
    const updateData = async () => {
        useRowDataValidity(props);
        updateTableState();
    };
    watch([() => props.tableData.length, () => props.emptyLimit], updateData);
    watch(() => props.tableData, updateTableState, { deep: true });
    const updateExpand = async () => {
        setTimeout(() => {
            useScrollState($CxTable);
        });
    };
    watch(() => expandConfig, updateExpand, { deep: true, immediate: true });
    const updateStyleSetting = () => {
        Object.entries(props.styleSetting ?? {}).forEach(([key, val]) => {
            const settingKey = Reflect.get(CX_STYLE_SETTING, key);
            settingKey && isNumber(val) && Reflect.set($CxTable.styleStore, settingKey, val);
        });
    };
    watch(() => props.styleSetting, updateStyleSetting, { immediate: true, deep: true });
    return {
        updateVisible,
        updateColumn,
        updateData,
        updateExpand,
        updateTableState,
        updateStyleSetting
    };
};

const staticConfigList = [
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
const CX_ADAPTOR_LOSS_PRECISION = 2;
const CX_ADAPTOR_INT_PRECISION = 0;

/**
 * 保留几位小数
 * @param {String | Number} num
 * @param {Number} fixed
 * @return {Number | "-"}
 */
function decimals(num, fixed = 3) {
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
function decimalFixed(value, precision, force = false) {
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
const getPrecision = (state) => {
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
const calcInvoker = (calc, column) => {
    return rowData => {
        let result = calcInnerFormula(calc, rowData);
        result = decimalFixed(result, column.accuracy, true);
        Reflect.set(rowData, column.prop, result);
        return result;
    };
};
const getTemplateResult = (str, data) => {
    return (str?.replace(/\{\{.+\}\}/g, p => {
        return data[p.replace(/\{\{(.+)\}\}/, '$1')];
    }) ?? str);
};
Reflect.set(window, 'getTemplateResult', getTemplateResult);
const getInFactVal = (val) => {
    if (isString$1(val))
        return val.match(/[^\d^.]+/) ? `'${val}'` : val;
    if (!isNumber(val))
        return 'null';
    return val + '';
};
// 获取字符公式结果
const getEvalResult = (formula, data, withCalc = false) => {
    const getToken = () => formula.replace(/[a-zA-Z]+/g, (prop) => {
        if (prop === 'undefined')
            return prop;
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
    }
    catch (err) {
        if (!withCalc) {
            withCalc = true;
            try {
                return eval(getToken());
            }
            catch (innerErr) {
                cxTableWarn(`匹配公式时发生错误==>${formula}`);
            }
        }
        cxTableWarn(`匹配公式时发生错误==>${formula}`);
        return null;
    }
};
// 获取options依赖的props
const getOptionsDeps = (options) => {
    if (Array.isArray(options)) {
        return [];
    }
    const result = [];
    function search(obj) {
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
const calcInnerOptions = (options, data) => {
    return calcInnerItem(options, data, Array.isArray, [], (result) => result);
};
// 获取计算后的校验规则
const calcInnerValidator = (validator, data) => {
    return calcInnerItem(validator, data, Array.isArray, {}, (result) => result);
};
// 获取计算后的公式值
const calcInnerFormula = (formula, data) => {
    return calcInnerItem(formula, data, isString$1, 0, getEvalResult);
};
// 获取嵌套对象中的值
const calcInnerItem = (formula, data, finder, defaultValue, getResult) => {
    if (finder(formula)) {
        return getResult(formula, data);
    }
    else if (typeof formula === 'object') {
        let result = defaultValue;
        Object.entries(formula).some(([key, val]) => {
            if (typeof val === 'object') {
                Object.entries(val).some(([innerKey, innerVal]) => {
                    if (+data[key] === +innerKey) {
                        if (finder(innerVal)) {
                            result = getResult(innerVal, data);
                        }
                        else if (typeof innerVal === 'object') {
                            result = calcInnerItem(innerVal, data, finder, defaultValue, getResult);
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
const getStringDepends = (formula) => {
    if (!isString$1(formula))
        return [];
    return formula.match(/[a-zA-Z]+/g);
};

class CxControlConfig {
    constructor(config) {
        this.type = '';
        this.attrs = {};
        Reflect.set(this, 'type', config.control?.type ?? '');
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
    tagConfigAdaptor(config) {
        const statusMap = Object.entries(config.control?.statusMap ?? {}).reduce((res, [key, val]) => {
            res[key] = { ...val, prop: config.prop };
            return res;
        }, {});
        Reflect.set(this, 'statusMap', statusMap);
    }
    // 文本输入框配置项
    inputConfigAdaptor(config) {
        const { control, influenced, sideEffect, prop } = config;
        if (!control)
            return;
        isNumber(control.maxLength) && Reflect.set(this.attrs, 'maxlength', control.maxLength);
        isNumber(control.minLength) && Reflect.set(this.attrs, 'minlength', control.minLength);
        control.showWordLimit && Reflect.set(this.attrs, 'showWordLimit', true);
        influenced &&
            (this.attrs.broadcastRegister = register => {
                this.influencedRegister(register, config);
            });
        sideEffect &&
            Reflect.set(this.attrs, 'onChange', (val, rowData) => {
                this.sideEffectHandle(prop, rowData, sideEffect);
            });
    }
    // 单选框配置项
    selectConfigAdaptor(config) {
        const { prop, control, influenced, sideEffect } = config;
        if (!control)
            return;
        let currentOption = [];
        if (Array.isArray(control.options)) {
            Reflect.set(this, 'options', (currentOption = control.options));
        }
        else if (isObject$1(control.options)) {
            Reflect.set(this, 'options', ({ rowData }) => {
                return (currentOption = calcInnerOptions(control?.options ?? [], rowData));
            });
        }
        // 选项唯一
        if (control.exclusion) {
            const oldValMap = new WeakMap();
            // 将特定逻辑注册至广播接收器
            this.attrs.broadcastRegister = register => {
                // 删除事件的广播
                register('nativeDelete', params => {
                    const option = currentOption.find(item => item.id === params.rowData[prop]);
                    option && Reflect.set(option, 'disabled', false);
                });
                // options依赖项发生改变时清空该列数据
                const deps = getOptionsDeps(control?.options ?? []);
                const cb = params => {
                    Reflect.set(params.rowData, prop, '');
                    Reflect.set(params.rowData, prop + 'Text', '');
                };
                deps.forEach(dep => register(dep, cb));
                // 注册influenced
                influenced && this.influencedRegister(register, config);
            };
            Reflect.set(this.attrs, 'onChange', (val, rowData) => {
                const oldVal = oldValMap.get(rowData);
                const oldItem = currentOption.find(item => item.id === oldVal);
                oldItem && Reflect.set(oldItem, 'disabled', false);
                oldValMap.set(rowData, val);
                const currentItem = currentOption.find(item => item.id === val);
                currentItem && Reflect.set(currentItem, 'disabled', true);
                sideEffect && this.sideEffectHandle(prop, rowData, sideEffect);
            });
        }
        else {
            sideEffect &&
                Reflect.set(this.attrs, 'onChange', (val, rowData) => {
                    sideEffect && this.sideEffectHandle(prop, rowData, sideEffect);
                });
        }
    }
    // 将influenced中的项注册至广播接收器
    influencedRegister(register, config) {
        if (typeof config.influenced === 'object') {
            const { rule, type } = config.influenced;
            if (!rule || !type)
                return;
            const depends = getStringDepends(rule);
            depends.forEach(prop => {
                if (type === 'equal') {
                    register(prop, params => {
                        Reflect.set(params.rowData, config.prop, getEvalResult(rule, params.rowData, true));
                    });
                }
            });
        }
    }
    // 副作用处理
    sideEffectHandle(prop, rowData, sideEffect) {
        if (typeof sideEffect !== 'object')
            return;
        Object.entries(sideEffect).forEach(([key, val]) => {
        });
    }
}

const onInits = [];
const onOutputs = [];
class CxConfigAdaptor$1 {
    constructor(config) {
        this.basicColumn = { prop: '', label: '' };
        const configDuplicate = onInits.reduce((res, hook) => (isFunction$1(hook) ? hook(res) : res), R.clone(config));
        this.staticConfigAdaptor(configDuplicate)
            .dynamicConfigAdaptor(configDuplicate)
            .controlAdaptor(configDuplicate)
            .childrenAdaptor(configDuplicate);
    }
    static use(plugin) {
        const { onInit, onOutput } = plugin;
        isFunction$1(onInit) && onInits.push(onInit);
        isFunction$1(onOutput) && onOutputs.push(onOutput);
    }
    get column() {
        if (onOutputs.length === 0)
            return this.basicColumn;
        const columnDuplicate = onOutputs.reduce((res, hook) => (isFunction$1(hook) ? hook(res) : res), R.clone(this.basicColumn));
        return columnDuplicate;
    }
    static of(config) {
        return new CxConfigAdaptor$1(config).column;
    }
    // children处理
    childrenAdaptor(config) {
        if (config.children?.length) {
            this.basicColumn.children = config.children.map(child => new CxConfigAdaptor$1(child).column);
        }
        return this;
    }
    // 静态部分
    staticConfigAdaptor(config) {
        staticConfigList.forEach(key => Reflect.set(this.basicColumn, key, config[key]));
        return this;
    }
    // 动态部分
    dynamicConfigAdaptor(config) {
        if (config.calculate) {
            this.basicColumn.calculate = rowData => {
                const result = calcInvoker(config.calculate, this.basicColumn)(rowData);
                return isNumber(config.accuracy) ? decimalFixed(result, config.accuracy, true) : result;
            };
        }
        if (config.sum) {
            const sumMap = { 1: 'add' };
            Reflect.set(this.basicColumn, 'sum', sumMap[config.sum] ?? config.sum);
        }
        if (Array.isArray(config.validator)) {
            this.basicColumn.validator = params => {
                let result;
                config.validator?.some(validator => {
                    const validates = validator.rule && validator.msg
                        ? [validator]
                        : calcInnerValidator(validator, params.rowData);
                    if (!validates?.length)
                        return;
                    validates.some((valid) => {
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
    controlAdaptor(config) {
        config.control && Reflect.set(this.basicColumn, 'control', new CxControlConfig(config));
        return this;
    }
}

const dataInitPlugin = {
    onInit: config => {
        // 处理dynamic
        config.dynamicCalculate && Reflect.set(config, 'calculate', config.dynamicCalculate);
        config.dynamicValidator && Reflect.set(config, 'validator', config.dynamicValidator);
        config?.control?.dynamicOptions &&
            Reflect.set(config.control, 'options', config.control.dynamicOptions);
        // 处理index
        (config.index || config.prop === 'index') &&
            !config.control?.type &&
            Reflect.set(config, 'control', { type: 'index' });
        // 处理特殊的align
        ((config.children?.length ?? 0) > 0 ||
            ['nativeCheckbox', 'nativeCheckRadio', 'index'].includes(config.control?.type)) &&
            Reflect.set(config, 'align', 'center');
        // 处理特殊宽度
        ['nativeCheckbox'].includes(config.control?.type) && Reflect.set(config, 'width', 50);
        // 处理number-input
        config.input && Reflect.set(config, 'number', config.input);
        isNumber(config.number?.decimal) &&
            Reflect.set(config.number, 'decimal', getPrecision(config.number?.decimal));
        // 处理accuracy
        isNumber(config.accuracy) && Reflect.set(config, 'accuracy', getPrecision(config.accuracy));
        // 处理宽度,将动态表头的宽度设置为最高优先级的宽度
        config.width && Reflect.set(config, 'importantWidth', config.width);
        // 处理fixed,原则上顶级表头的所有子项都应该是相同的fixed
        function setFixed(config, fixed) {
            Reflect.set(config, 'fixed', fixed);
            Array.isArray(config.children) && config.children.forEach(child => setFixed(child, fixed));
        }
        setFixed(config, config.fixed);
        // 特殊处理, 所有的select强制转换为search
        config.control?.type === 'select' && Reflect.set(config.control, 'type', 'search');
        // 特殊处理,部分单号相关的列都修改为orderText组件
        if (['订单编号', '商户单号', '生产单号', '销售单号'].includes(config.label) &&
            !config.control) {
            config.control = { type: 'orderText' };
        }
        return config;
    }
};

const businessPlugin = {
    onOutput: column => {
        // TODO 处理特殊业务组件
        return column;
    }
};

// 加载插件, 先添加业务组件插件, 再添加字段处理插件, 顺序请勿变更
CxConfigAdaptor$1.use(businessPlugin);
CxConfigAdaptor$1.use(dataInitPlugin);
const CxConfigAdaptor = CxConfigAdaptor$1;

function getDateRange(num = 1, type, { isInt = false, isDate = false } = {}) {
    const currentDate = new Date();
    let start = new Date();
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
    let end = new Date();
    if (isInt) {
        start = new Date(start.setDate(1));
        if (num)
            end = new Date(new Date().setDate(0));
    }
    if (isDate)
        return start;
    return [start, end];
}
const getFunctionAttrs = (rowData, attrs) => {
    if (isFunction$1(attrs)) {
        const result = attrs({ rowData });
        return isObject$1(result) ? result : void 0;
    }
    return attrs;
};
const { DYNAMIC_BUSINESS_TYPE, DYNAMIC_MODULE_TYPE, DYNAMIC_MODEL_TYPE, DYNAMIC_PRICE_TYPE } = useCxTable().getContext().dynamicType;
const changeDynamicIdToText = (dynamic) => {
    return {
        businessType: DYNAMIC_BUSINESS_TYPE[dynamic.businessType],
        moduleType: DYNAMIC_MODULE_TYPE[dynamic.moduleType],
        modelType: DYNAMIC_MODEL_TYPE[dynamic.modelType],
        priceType: DYNAMIC_PRICE_TYPE[dynamic.priceType]
    };
};
const debounce = (cb, duration = 100) => {
    let timer = null;
    return (...args) => {
        timer && clearTimeout(timer);
        timer = setTimeout(async () => {
            await cb(...args);
        }, duration);
    };
};
const getParentColumn = (columns, prop) => {
    let result;
    function find(cols) {
        if (!Array.isArray(cols))
            return;
        cols.some(col => {
            if (Array.isArray(col.children)) {
                const target = col.children.some(child => {
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
    let result;
    cols.find(col => {
        if (col.prop === prop) {
            return (result = col);
        }
        return (result = getTargetColumn(prop, col.children));
    });
    return result;
}
function deepMerge(src, target) {
    let key;
    for (key in target) {
        src[key] =
            src[key] && isObject$1(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}
const format = (val) => dayjs(val).format('YYYY-MM-DD');
const formatDate = R.ifElse(R.is(Array), R.map(format), format);
const format2 = (val) => dayjs(val).format('YYYY-MM-DD HH-mm-ss');
const formatTime = R.ifElse(R.is(Array), R.map(format2), format2);
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
function pick(object, props = []) {
    const res = {};
    const arr = Array.isArray(props) ? props : [props];
    Object.keys(object).forEach((key) => {
        if (arr.includes(key)) {
            res[key] =
                typeof object[key] === 'object' && object[key] !== null
                    ? R.clone(object[key])
                    : object[key];
        }
    });
    return res;
}
const getColumnSelectText = (column, replaceProp = 'Text') => {
    return column.control?.selectText || `${column.prop.replace(/Id$/, '')}${replaceProp}`;
};
function cxTableWarn(...msgs) {
    console.warn(`[cxTable warn]:`, ...msgs);
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
    return [...str].reduce((width, char) => {
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
    return [...arr].sort(sortFun);
}
const getTotalSumData = (cols, data) => {
    const result = {};
    cols.forEach(col => {
        if (col.columnFlag & COLUMN_FLAG.TEXT_SUM_COLUMN) {
            result[col.prop] = '总计';
        }
        else if (col.columnFlag & COLUMN_FLAG.ADD_SUM_COLUMN) {
            if (col.columnFlag & COLUMN_FLAG.CALC_COLUMN) {
                data.forEach(rowData => {
                    rowData[col.prop] = col.calculate?.(rowData) ?? rowData[col.prop];
                });
            }
            result[col.prop] = getSums(data, col.prop);
        }
        else if (col.columnFlag & COLUMN_FLAG.CUSTOM_SUM_COLUMN) {
            result[col.prop] = isFunction$1(col.sum) ? col.sum(data) : null;
        }
    });
    return result;
};
const findAncestor = (inputEle, className, searchLimit = 6) => {
    let result = null;
    let parent = inputEle.parentNode;
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
const toggleArrState = (arr, index) => {
    Reflect.set(arr, index, !arr[index]);
};
// items数组扁平化
const arrFlat = (items, childProp = 'children') => {
    const result = [];
    const getItems = (item) => {
        if (item[childProp]?.length) {
            item[childProp].forEach((child) => {
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
const formatWidth = (width) => {
    if (!width)
        return;
    const duplicate = width + '';
    if (duplicate.includes('%') || duplicate.includes('px'))
        return duplicate;
    return `${parseFloat(duplicate)}px`;
};
/**
 * @param {Object} target 被覆盖对象
 * @param {Object} attr 覆盖对象
 * @description 合并元素属性,对class,style属性进行特殊合并
 */
const assignAttrs = (target = {}, attr = {}) => {
    const style = Object.assign({}, target.style, attr.style);
    const classDup = `${target.class || ''} ${attr.class || ''}`;
    return Object.assign({}, target, attr, { style, class: classDup });
};
/**
 * @description 转换为分层表头列表
 * @param columns 表头参数列表
 */
const invokeLayeredRow = (columns) => {
    const result = [];
    const getHeaders = (columns, level) => {
        if (!result[level])
            result[level] = [];
        columns.forEach((item) => {
            if (!item.hide) {
                result[level].push(item);
            }
            if (item.children?.length) {
                getHeaders(item.children, level + 1);
            }
        });
    };
    getHeaders(columns, 0);
    return result;
};
const getSums = (arr, prop = 'renderWidth') => {
    let result = 0;
    function sums(arr) {
        arr.forEach(item => {
            if (item?.children?.length) {
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
const getPreOrNextItem = (arr, item, direction, prop) => {
    const index = arr.findIndex((arrItem) => {
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
const getStatusAttrs = (rowData, column) => {
    const { statusMap } = column.control ?? {};
    // statusMap分2种情况, Array => string[] / Object => { [k:string]:{content?:string,prop?:string,type?:string} }
    const { content, prop, type } = Array.isArray(statusMap)
        ? { content: statusMap[rowData[column.prop]], prop: undefined, type: undefined }
        : statusMap?.[rowData[column.prop]] ?? statusMap?.default ?? {};
    return {
        content: content ? content : prop ? rowData[prop] : rowData[prop + 'Text'] ?? '',
        type
    };
};

const createCxTableConfig = () => {
    return reactive$1({
        __wrapperEle: null,
        get wrapperEle() {
            if (!this.__wrapperEle) ;
            return this.__wrapperEle;
        },
        set wrapperEle(val) {
            this.__wrapperEle = val;
        },
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

var HeadCell = defineComponent({
    name: 'CxTableHeadCell',
    props: {
        layeredLevel: { type: Number, default: 1 },
        column: { type: Object, default: () => ({}) }
    },
    setup(props) {
        const rootSlots = inject('rootSlots', {});
        const selectConfig = inject('selectConfig');
        const CxTable = inject('CxTable');
        const tableDataVisitor = inject('tableDataVisitor');
        const bus = inject('bus');
        // 单元格内盒宽度
        const cellWidth = ref$1(0);
        watchEffect(() => {
            const arrChildren = props.column.columnFlag & COLUMN_FLAG.ARRAY_CHILDREN;
            cellWidth.value = arrChildren
                ? getSums(props.column.children ?? [])
                : props.column.renderWidth;
        });
        // 单元格属性
        const thAttrs = computed(() => {
            const { column, layeredLevel } = props;
            const arrChildren = column.columnFlag & COLUMN_FLAG.ARRAY_CHILDREN;
            const styleParams = {};
            if (!arrChildren) {
                styleParams.height = CxTable.styleStore.CX_TABLE_HEIGHT * layeredLevel;
            }
            return {
                colspan: props.column.children?.length ?? 1,
                rowspan: props.column.children?.length ? 1 : props.layeredLevel,
                style: column.getStyle(styleParams, 'head')
            };
        });
        const hoisted_1 = 'cx-table_cell';
        // const hoisted_2 = 'iconfont';
        const hoisted_3 = 'color:red';
        const hoisted_4 = 'cx_w_10';
        const hoisted_5 = 'cx-table_sort';
        const hoisted_6 = 'cx-table_sort_positive';
        const hoisted_7 = 'cx-table_sort_reverse';
        return (_, cache) => {
            const { column } = props;
            return createVNode$1('th', thAttrs.value, [
                (openBlock(),
                    createBlock('div', { class: hoisted_1, style: { width: formatWidth(cellWidth.value) } }, [
                        column.headTip
                            ? createVNode$1(resolveComponent('ElTooltip'), { content: column.headTip, placement: 'top-start', key: -1 }, [cache[5] || (cache[5] = createVNode$1('i', { class: 'iconfont icon-bangzhu' }))], PATCH_FLAG.PROPS, ['content'])
                            : createCommentVNode('c-if_tip', true),
                        column.headSlot && rootSlots?.[column.headSlot]
                            ? createVNode$1(rootSlots?.[column.headSlot], { column })
                            : column.control?.type === 'nativeCheckbox'
                                ? createVNode$1(resolveComponent('ElCheckbox'), {
                                    key: 0,
                                    modelValue: selectConfig.selectAll,
                                    'onUpdate:modelValue': cache[0] || (cache[0] = (val) => (selectConfig.selectAll = val)),
                                    indeterminate: selectConfig.indeterminate,
                                    disabled: selectConfig.disabled,
                                    onChange: cache[1] ||
                                        (cache[1] = () => bus.emit('toggleAllSelection', selectConfig.selectAll))
                                }, null, PATCH_FLAG.FULL_PROPS | PATCH_FLAG.NEED_PATCH)
                                : (openBlock(),
                                    createBlock(Fragment$1, null, [
                                        (openBlock(),
                                            createBlock(Fragment$1, null, [
                                                column.required
                                                    ? cache[2] ||
                                                        (cache[2] = createVNode$1('i', { style: hoisted_3, key: 1 }, '*'))
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
                                        createVNode$1('span', { key: 3 }, column.label, PATCH_FLAG.TEXT),
                                        column.sortable
                                            ? cache[3] || (cache[3] = createVNode$1('i', { class: hoisted_4, key: 4 }))
                                            : createCommentVNode('v-if_sortable_space', true),
                                        column.sortable
                                            ? createVNode$1('i', {
                                                key: 5,
                                                onClick: cache[4] ||
                                                    (cache[4] = () => {
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
                                                class: [
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
    props: { fixed: { type: String, default: '' }, left: { type: Number, default: 0 } },
    components: { HeadCell },
    setup(props) {
        const CxTable = inject('CxTable');
        const style = useTableStyle(props, CxTable, 'head');
        // 分层表头
        const layeredHeadItems = computed(() => {
            return invokeLayeredRow(CxTable.columns);
        });
        const hoisted_1 = ['top', 'height', 'width', 'right'];
        const hoisted_2 = 'cx-table_head';
        return () => createVNode$1('div', { class: hoisted_2, style: pick(style.value, hoisted_1) }, [
            createVNode$1('table', { style: pick(style.value, ['left']) }, [
                (openBlock(),
                    createBlock(Fragment$1, null, layeredHeadItems.value.map((headers, index) => {
                        return (openBlock(),
                            createBlock('tr', null, [
                                (openBlock(true),
                                    createBlock(Fragment$1, null, headers.map(col => {
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
    }
});

const renderDefaultNode = (params) => {
    const defaultRenderer = CxTableRendererMap.get('default');
    return isFunction$1(defaultRenderer)
        ? defaultRenderer(params)
        : createVNode$1('div', null, params.rowData[params.column.prop]);
};
const renderCellContent = (props, isActived, rowIndex, sum = false, rootSlots, selectConfig, radioValue, disabled, bus, expandConfig, broadcast, pagination, ignoreControl, forceControl) => {
    const params = {
        ...props,
        expandConfig,
        rowIndex,
        selectConfig,
        radioValue,
        bus,
        pagination,
        broadcast,
    };
    return (openBlock(),
        createBlock(Fragment$1, null, [
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
const renderCellSum = (params, rootSlots) => {
    return (openBlock(),
        createBlock(Fragment$1, null, [
            params.column.sumSlot
                ? rootSlots?.[params.column.sumSlot]
                    ? rootSlots?.[params.column.sumSlot](params)
                    : null
                : params.column.control?.type === 'index' || (isString$1(params.column.sum) && params.column.sum !== 'add')
                    ? createTextVNode$1(params.column.sum ?? '总计')
                    : renderDefaultNode(params),
        ]));
};
const renderCellSlot = (params, isActived, disabled, rootSlots, ignoreControl, forceControl) => {
    if (isFunction$1(params.column.slot)) {
        return params.column.slot({
            ...params,
            isActived,
            disabled,
            prop: params.column.prop,
            ignore: ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false,
            force: forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false,
        });
    }
    return rootSlots?.[params.column.slot]
        ? rootSlots?.[params.column.slot]({
            ...params,
            isActived,
            disabled,
            prop: params.column.prop,
            ignore: ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false,
            force: forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false,
        })
        : null;
};
const renderCalcCell = (params) => {
    const { column, rowData } = params;
    return (openBlock(),
        createBlock(Fragment$1, null, [
            isFunction$1(column.calculate)
                ? createVNode$1('span', null, column.calculate(rowData), PATCH_FLAG.TEXT)
                : createCommentVNode('v-if', true),
        ]));
};
const renderCustomCell = (params, isActived, disabled, ignoreControl, forceControl) => {
    const { type } = params.column.control ?? {};
    const renderer = CxTableRendererMap.get(type);
    if (isFunction$1(renderer)) {
        const ignore = ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false;
        const force = forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false;
        return renderer({ ...params, isActived, disabled, prop: params.column.prop, ignore, force });
    }
    const defaultRenderer = CxTableRendererMap.get('default');
    return isFunction$1(defaultRenderer)
        ? defaultRenderer({ ...params, isActived, disabled, prop: params.column.prop, ignore: true, force: false })
        : createVNode$1('div', null, params.rowData[params.column.prop]);
};

var Cell = defineComponent({
    name: 'CxTableCell',
    props: {
        column: { type: Object, default: () => ({}) },
        rowData: { type: Object, default: () => ({}) },
        rowIndex: { type: Number, default: -1 },
        sum: { type: Boolean, default: false },
        empty: { type: Boolean, default: false }
    },
    setup(props) {
        const rootSlots = inject('rootSlots', {});
        const selectConfig = inject('selectConfig');
        const CxTable = inject('CxTable');
        const radioValue = inject('radioValue');
        const expandConfig = inject('expandConfig');
        const rootProp = inject('rootProp');
        const broadcast = inject('broadcast');
        const bus = inject('bus');
        const _hoisted_direction_1 = resolveDirective('uni-popper');
        const handles = rootProp.keyboard ? registCellEvent(CxTable, props) : {};
        // 如果设置了validate,则计算其校验结果
        const invalidContent = computed(() => {
            if (!(props.column.columnFlag & COLUMN_FLAG.VALIDATE_COLUMN))
                return;
            CxTable.editStore.actived;
            props.rowData[props.column.prop];
            let result = isFunction$1(props.column.validator)
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
        const isActived = ref$1(false);
        watchEffect(() => {
            const result = props.column._colid === CxTable.editStore.actived.column?._colid &&
                props.rowData === CxTable.editStore.actived.rowData;
            isActived.value = result;
        });
        // 聚焦提交tdFocus事件
        watch$1(() => isActived.value, () => {
            if (isActived.value) {
                const { rowIndex, rowData, column } = props;
                bus.emit('tdFocus', { rowIndex, rowData, column });
            }
        });
        // 如果设置了spanMethod,则计算其colspan/rowspan
        const mergeSpan = computed(() => {
            if (!isFunction$1(rootProp.spanMethod) || props.sum)
                return {};
            let result = rootProp.spanMethod?.({
                rowData: props.rowData,
                column: props.column,
                rowIndex: props.rowIndex
            }) ?? {};
            if (isArray$1(result)) {
                result = { rowspan: result[0], colspan: result[1] };
            }
            return result;
        });
        // 单元格是否显示控件
        const isControl = computed(() => {
            return isActived.value && !!CxTable.editStore.activedControl;
        });
        const errorVisible = computed(() => {
            return !!(invalidContent.value && isControl.value);
        });
        const directionOption = reactive$1({
            visible: false,
            classList: ['fold-table_wrong_msg', 'cx_mtb_8'],
            text: invalidContent.value,
            controlType: 'handle',
            placement: 'top-start',
            key: 'errorMsg'
        });
        watch$1(invalidContent, val => {
            directionOption.text = val;
        });
        watch$1(errorVisible, val => {
            directionOption.visible = val;
        });
        // 单元格内容
        const renderContent = () => {
            if (props.empty)
                return;
            const renderInnerContent = () => renderCellContent(props, isControl.value, props.rowIndex, props.sum, rootSlots, selectConfig, radioValue, !!rootProp.disabled, bus, expandConfig, broadcast, rootProp.pagination, rootProp.ignoreControl, rootProp.forceControl);
            invalidContent.value;
            if (props.column.columnFlag & COLUMN_FLAG.VALIDATE_COLUMN && !props.sum) {
                return withDirectives(createVNode$1('div', null, [renderInnerContent()]), [
                    [_hoisted_direction_1 ?? {}, directionOption]
                ]);
            }
            else {
                return renderInnerContent();
            }
        };
        // 单元格样式
        const tdStyle = ref$1({});
        watchEffect(() => {
            const params = {};
            if (mergeSpan.value?.rowspan > 1) {
                params.height = mergeSpan.value?.rowspan * CxTable.styleStore.CX_TABLE_HEIGHT;
            }
            const result = props.column.getStyle(params, 'body', props.rowData, props.rowIndex);
            if (!isDeepObjectEqual(tdStyle.value, result)) {
                tdStyle.value = result;
            }
        });
        const key = CX_TABLE_COLUMN_KEY + props.column._colid;
        watch$1(() => mergeSpan.value.rowspan, (val, oldVal) => {
            if (val === oldVal)
                return;
            if (rootProp.virtualScroll) {
                const { rowSpanMap } = CxTable.virtualStore;
                if (mergeSpan.value.rowspan > 1) {
                    rowSpanMap[props.rowIndex] |= CX_SPAN_METHOD_TYPE.EXTEND;
                }
                if (mergeSpan.value.rowspan === 0) {
                    rowSpanMap[props.rowIndex] |= CX_SPAN_METHOD_TYPE.MISSING;
                }
            }
        }, { immediate: true });
        // 此写法可避免render函数收集到无用依赖,此处请勿使用computed
        const cellActived = ref$1(false);
        watchEffect(() => {
            if (cellActived.value === (isActived.value && !CxTable.editStore.activedControl))
                return;
            cellActived.value = isActived.value && !CxTable.editStore.activedControl;
        });
        // 当值发生改变时发送一个广播
        watch$1(() => props.rowData[props.column.prop], () => {
            broadcast?.trigger(props.column.prop, props.rowData, {
                prop: props.column.prop,
                rowData: props.rowData
            });
        });
        // 当column为select/search时,由于text的存在,不能仅仅监听id变化,text值也会对渲染有影响,同时,插槽内容的变化也难以监听
        if (['search', 'select'].includes(props.column.control?.type) || props.column.slot) {
            const textKey = getColumnSelectText(props.column);
            watch$1(() => props.rowData[textKey], () => {
                broadcast?.trigger(textKey, props.rowData, {
                    prop: textKey,
                    rowData: props.rowData
                });
            });
        }
        return () => {
            // 广播注册,每次重新渲染时需要重新注册,否则会出现行数据错误的问题(虚拟滚动)
            const attrs = getFunctionAttrs(props.rowData, props.column.control?.attrs);
            const broadcastRegister = attrs?.broadcastRegister;
            if (broadcastRegister && isFunction$1(broadcastRegister)) {
                broadcastRegister((prop, cb) => broadcast.registListener(prop, props.rowData, cb));
            }
            if (mergeSpan.value && (mergeSpan.value?.rowspan === 0 || mergeSpan.value?.colspan === 0)) {
                return;
            }
            return createVNode$1('td', {
                key,
                ...handles,
                ...mergeSpan.value,
                style: tdStyle.value,
                colid: props.column._colid,
                class: { actived: cellActived.value }
            }, [
                createVNode$1('div', {
                    class: 'cx-table_cell',
                    style: { width: props.column.renderWidth + 'px' }
                }, [renderContent()], PATCH_FLAG.CLASS | PATCH_FLAG.STYLE)
            ], PATCH_FLAG.FULL_PROPS);
        };
    }
});

var TableRow = defineComponent({
    name: 'CxTableRow',
    props: {
        rowData: { type: Object, default: () => ({}) },
        rowIndex: { type: Number, default: -1 },
        activedRow: { type: Array, default: () => [] },
        sum: { type: Boolean, default: false },
        rowid: { type: [String, Number], default: '' }
    },
    setup(props, { slots }) {
        const selectConfig = inject('selectConfig', { selectItem: [] });
        const radioValue = inject('radioValue', ref$1(-1));
        const CxTable = inject('CxTable');
        const isHover = ref$1(false);
        watchEffect(() => {
            isHover.value = props.rowid === CxTable.hoveringRowid;
        });
        const isActive = ref$1(false);
        watchEffect(() => {
            isActive.value =
                selectConfig.selectItem?.[props.rowIndex] ||
                    radioValue.value === props.rowIndex ||
                    props.activedRow?.includes(props.rowIndex);
        });
        const trAttrs = computed(() => {
            const result = { rowid: props.rowid, class: [] };
            if (isActive.value) {
                result.class.push('active');
            }
            if (isHover.value) {
                result.class.push('cx-table_row_hover');
            }
            return result;
        });
        return () => {
            return createVNode$1('tr', trAttrs.value, slots, PATCH_FLAG.PROPS | PATCH_FLAG.CLASS, [
                'rowid'
            ]);
        };
    }
});

var FixedBottom = defineComponent({
    name: 'CxTableFixedBottom',
    props: {
        tableData: { type: Array, default: () => [] }
    },
    setup(props) {
        const CxTable = inject('CxTable');
        const component = CxTableBody;
        return () => {
            return [
                CxTable.columnStore.rightFixedColumns.length
                    ? createVNode$1(component, {
                        tableData: props.tableData,
                        style: {
                            width: getSums(CxTable.columnStore.rightFixedColumns) + 'px',
                            zIndex: 15
                        },
                        fixed: 'right',
                        class: {
                            'cx-table_fixed_right': true,
                            'cx-table_right_shadow': CxTable.scrollStore.showRightShadow,
                            'cx-bt': true
                        },
                        onlyTotal: true
                    })
                    : null,
                CxTable.columnStore.leftFixedColumns.length
                    ? createVNode$1(component, {
                        tableData: props.tableData,
                        style: {
                            width: getSums(CxTable.columnStore.leftFixedColumns) + 'px',
                            zIndex: 15
                        },
                        fixed: 'left',
                        class: {
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
        fixed: { type: String, default: '' },
        tableData: { type: Array, default: () => [] }
    },
    setup(props) {
        const rootProp = inject('rootProp');
        const CxTable = inject('CxTable');
        const bus = inject('bus');
        const hoisted_1 = 'cx_opacity_0';
        const classList = computed(() => {
            return [
                'cx-table_add_btn',
                'cx_mlr_10',
                props.tableData.length ? 'cx_h_80' : 'cx_h_160',
                props.fixed ? hoisted_1 : null
            ];
        });
        const realShow = computed(() => {
            return !rootProp.showAddBtn || props.fixed === 'top' || props.fixed === 'bottom';
        });
        return (_, cache) => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    realShow.value
                        ? createCommentVNode('v-if_add_btn', true)
                        : createVNode$1('tr', null, [
                            createVNode$1('td', { class: props.fixed ? hoisted_1 : null, colspan: CxTable.flatColumns.length }, [
                                createVNode$1('div', {
                                    onClick: cache[0] || (cache[0] = () => bus.emit('addNewRow', 'addNewRow')),
                                    class: classList.value
                                }, rootProp.showAddBtn, PATCH_FLAG.CLASS | PATCH_FLAG.NEED_PATCH | PATCH_FLAG.TEXT)
                            ], PATCH_FLAG.CLASS | PATCH_FLAG.PROPS, ['colspan'])
                        ])
                ], PATCH_FLAG.STABLE_FRAGMENT));
        };
    }
});

var Expand = defineComponent({
    name: 'CxTableExpand',
    props: {
        fixed: { type: String, default: '' },
        rowData: { type: Object, default: () => ({}) },
        rowIndex: { type: Number, default: -1 }
    },
    setup(props) {
        const CxTable = inject('CxTable');
        const rootProp = inject('rootProp');
        const expandConfig = inject('expandConfig', []);
        const rootSlots = inject('rootSlots', {});
        const classList = computed(() => {
            const result = [];
            props.fixed && result.push('cx_opacity_0');
            return result;
        });
        const colspan = computed(() => {
            return props.fixed === 'left'
                ? CxTable.columnStore.leftFixedColumns?.length
                : props.fixed === 'right'
                    ? CxTable.columnStore.rightFixedColumns?.length
                    : CxTable.flatColumns?.length;
        });
        const slotName = computed(() => {
            let result = '';
            if (isString$1(rootProp.expand) && rootProp.expand) {
                result = rootProp.expand;
            }
            else if (isFunction$1(rootProp.expand)) {
                const expandSlot = rootProp.expand(props.rowData, props.rowIndex);
                expandSlot && (result = expandSlot);
            }
            return result;
        });
        const hoisted_1 = 'cx-table_expand';
        return () => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    slotName.value && expandConfig[props.rowIndex] && rootSlots[slotName.value]
                        ? createVNode$1('tr', { class: classList.value }, [
                            createVNode$1('td', { colspan: colspan.value }, [
                                createVNode$1('div', {
                                    class: `${hoisted_1}`,
                                    style: (function () {
                                        const result = {};
                                        if (props.fixed) {
                                            const { width } = useTableStyle(props, CxTable, 'table').value;
                                            if (width) {
                                                Reflect.set(result, 'width', width);
                                                Reflect.set(result, 'overflow', 'hidden');
                                            }
                                        }
                                        return result;
                                    })()
                                }, [
                                    createVNode$1('div', { style: { width: CxTable.scrollStore.renderTotalWidth + 'px' } }, [
                                        createVNode$1(rootSlots[slotName.value], { rowIndex: props.rowIndex, rowData: props.rowData }, null, PATCH_FLAG.FULL_PROPS)
                                    ], PATCH_FLAG.STYLE)
                                ], PATCH_FLAG.STYLE)
                            ], PATCH_FLAG.PROPS, ['colspan'])
                        ], PATCH_FLAG.CLASS)
                        : createCommentVNode('v-if_expand', true)
                ]));
        };
    }
});

var CxTableBody = defineComponent({
    name: 'CxTableBody',
    props: {
        fixed: { type: String, default: '' },
        onlyTotal: { type: Boolean, default: false },
        tableData: { type: Array, default: () => [] },
        float: { type: Boolean, default: false }
    },
    setup(props) {
        const CxTable = inject('CxTable');
        const rootProp = inject('rootProp');
        const hoisted_1 = 'cx-table_footer';
        const hoisted_2 = 'cx-table_body';
        const { getRowIdFromMap } = useTableId();
        // 行渲染
        const renderRow = (rowData, rowIndex, sum = false, empty = false) => {
            let rowid;
            if (sum) {
                rowid = CX_TABLE_SUM_ROW_KEY;
            }
            else {
                rowid = getRowIdFromMap(rowData);
            }
            return createVNode$1(TableRow, {
                sum,
                class: sum ? hoisted_1 : '',
                rowData,
                rowIndex,
                activedRow: rootProp.activeRows,
                rowid,
                key: rowid
            }, {
                default: () => {
                    return (openBlock(true),
                        createBlock(Fragment$1, null, CxTable.flatColumns.map(col => (openBlock(),
                            createBlock(Fragment$1, null, [
                                props.fixed && props.fixed !== 'bottom' && col.fixed !== props.fixed
                                    ? createCommentVNode('v-if', true)
                                    : (openBlock(),
                                        createBlock(Cell, { rowData, rowIndex, column: col, sum, empty, key: col._colid }, null, PATCH_FLAG.PROPS, ['rowData', 'rowIndex', 'column', 'sum', 'empty']))
                            ]))), PATCH_FLAG.KEYED_FRAGMENT));
                }
            }, PATCH_FLAG.PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.DYNAMIC_SLOTS, ['rowData', 'rowIndex', 'activedRow', 'rowid', 'key']);
        };
        // body主体内容渲染
        const renderContent = () => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    props.fixed === 'bottom' || props.onlyTotal
                        ? createCommentVNode('v-if', true)
                        : (openBlock(true),
                            createBlock(Fragment$1, null, (function () {
                                const result = [];
                                let data;
                                let indexPrepend = 0;
                                if (rootProp.virtualScroll) {
                                    const { virtualStore } = CxTable;
                                    data = props.tableData.slice(virtualStore.renderStartIndex, virtualStore.renderEndIndex);
                                    indexPrepend = virtualStore.renderStartIndex;
                                }
                                else {
                                    data = props.tableData;
                                }
                                data.forEach((rowData, rowIndex) => {
                                    result.push(renderRow(rowData, rowIndex + indexPrepend));
                                    if (rootProp.expand) {
                                        result.push(createVNode$1(Expand, { rowData, rowIndex: rowIndex + indexPrepend, fixed: props.fixed }, null, PATCH_FLAG.FULL_PROPS));
                                    }
                                });
                                if (isNumber(rootProp.emptyLimit) &&
                                    rootProp.emptyLimit > props.tableData.length) {
                                    Array(rootProp.emptyLimit - props.tableData.length)
                                        .fill('')
                                        .forEach(() => {
                                        result.push(renderRow({}, CX_TABLE_EMPTY_INDEX, false, true));
                                    });
                                }
                                return result;
                            })(), PATCH_FLAG.KEYED_FRAGMENT))
                ]));
        };
        // 添加按钮渲染
        const renderAddBtn = () => {
            return createVNode$1(TableAddBtn, { fixed: props.fixed, tableData: props.tableData }, null, PATCH_FLAG.PROPS, ['fixed', 'tableData']);
        };
        const hideTotalSum = ref$1(false);
        watchEffect(() => {
            hideTotalSum.value =
                (rootProp.virtualScroll &&
                    props.fixed !== 'bottom' &&
                    !props.onlyTotal &&
                    CxTable.virtualStore.renderEndIndex < rootProp.tableData.length) ||
                    (((!rootProp.showTotalSum && !rootProp.showForm) || props.tableData?.length <= 0) &&
                        !rootProp.showAddBtn &&
                        !props.float);
        });
        const transferOtherSum = (columns) => {
            const result = {};
            columns.forEach(({ prop, sum }) => {
                if (sum === 'add' || !isString$1(sum))
                    return;
                result[prop] = sum;
            });
            return result;
        };
        // 合计行渲染
        const renderTotalSum = () => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    hideTotalSum.value
                        ? createCommentVNode('v-if', true)
                        : isObject$1(rootProp.customTotalSum)
                            ? renderRow(Object.assign({}, rootProp.customTotalSum), CX_TABLE_SUM_INDEX, true)
                            : isObject$1(CxTable.entireTotalSum)
                                ? renderRow(R.mergeLeft(transferOtherSum(CxTable.flatColumns), CxTable.entireTotalSum), CX_TABLE_SUM_INDEX, true)
                                : renderRow(getTotalSumData(CxTable.flatColumns, rootProp.tableData ?? []), CX_TABLE_SUM_INDEX, true)
                ]));
        };
        // 基准style对象,根据不同的元素取出不同的项
        const style = useTableStyle(props, CxTable, 'body');
        const tableStyle = computed(() => {
            const { styleStore } = CxTable;
            const result = {
                ...pick(style.value, ['left']),
                top: props.fixed === 'bottom' || props.onlyTotal ? 0 : -CxTable.scrollStore.scrollTop + 'px'
            };
            if (rootProp.virtualScroll && props.fixed !== 'bottom' && !props.onlyTotal) {
                result.paddingTop = CxTable.virtualStore.renderPaddingTop + 'px';
                result.paddingBottom = CxTable.virtualStore.renderPaddingBottom + 'px';
                result.height =
                    (props.tableData.length + +!!rootProp.showTotalSum) * styleStore.CX_TABLE_HEIGHT + 'px';
            }
            return result;
        });
        const bodyWrapperStyle = computed(() => {
            return pick(style.value, ['right', 'bottom', 'top', 'height', 'width']);
        });
        // 不宜使用computed
        const tableClass = ref$1('');
        watchEffect(() => {
            tableClass.value = rootProp.stripe || rootProp.showForm ? 'stripe' : '';
        });
        return () => (openBlock(),
            createBlock('div', { class: hoisted_2, style: bodyWrapperStyle.value }, [
                createVNode$1('table', { style: tableStyle.value, class: tableClass.value }, [createVNode$1('tbody', null, [renderContent(), renderAddBtn(), renderTotalSum()])], PATCH_FLAG.STYLE),
                (openBlock(),
                    createBlock(Fragment$1, null, [
                        props.fixed === 'bottom'
                            ? createVNode$1(FixedBottom, { tableData: props.tableData }, null, PATCH_FLAG.PROPS | PATCH_FLAG.NEED_PATCH, ['tableData'])
                            : createCommentVNode('v-if_fixed_bottom', true)
                    ], PATCH_FLAG.STABLE_FRAGMENT))
            ], PATCH_FLAG.CLASS | PATCH_FLAG.STYLE));
    }
});

var CxTableContent = defineComponent({
    name: 'CxTableContent',
    props: {
        fixed: { type: String, default: '' },
        tableData: { type: Array, default: () => [] }
    },
    setup(props) {
        const CxTable = inject('CxTable');
        const style = useTableStyle(props, CxTable, 'table');
        const classList = useTableClass(props, CxTable);
        return () => {
            const { fixed } = props;
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    [
                        (openBlock(),
                            createBlock(Fragment$1, null, [
                                fixed !== 'bottom'
                                    ? createVNode$1(CxTableHead, { class: classList.value, style: style.value, fixed }, null, PATCH_FLAG.FULL_PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.STYLE)
                                    : createCommentVNode('v-if_table_bottom', true)
                            ], PATCH_FLAG.STABLE_FRAGMENT)),
                        (openBlock(),
                            createBlock(Fragment$1, null, [
                                fixed !== 'top'
                                    ? createVNode$1(CxTableBody, {
                                        tableData: props.tableData,
                                        class: classList.value,
                                        style: style.value,
                                        fixed
                                    }, null, PATCH_FLAG.FULL_PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.STYLE)
                                    : createCommentVNode('v-if_table_top', true)
                            ], PATCH_FLAG.STABLE_FRAGMENT))
                    ]
                ]));
        };
    }
});

var CxTableEmpty = defineComponent({
    name: 'CxTableEmpty',
    setup() {
        const CxTable = inject('CxTable');
        const hoisted_1 = { style: { height: '150px' } };
        const hoisted_2 = { class: 'cx-table_empty' };
        return () => {
            const rowspan = CxTable.flatColumns.length;
            return (openBlock(),
                createBlock('div', hoisted_1, [
                    createVNode$1('table', hoisted_2, [
                        createVNode$1('tbody', null, [
                            createVNode$1('tr', null, [
                                createVNode$1('td', { rowspan }, [
                                    (function () {
                                        setBlockTracking(-1);
                                        const node = createVNode$1('div', { class: 'cx_align_center' }, [
                                            createVNode$1('embed', {
                                                src: require('../../assets/tableEmpty.svg'),
                                                class: 'cx_h_100'
                                            }),
                                            createVNode$1('p', null, '暂无数据')
                                        ]);
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

var Pagination = defineComponent({
    name: 'CxTablePagination',
    props: { pagination: { type: Object, default: () => ({}) } },
    setup(props, { emit }) {
        const handleSizeChange = (size) => {
            const { pagination } = props;
            pagination.currentPage = 1;
            pagination.pageCapacity = size;
            emit('paging');
        };
        const handleCurrentChange = (currentPage) => {
            const { pagination } = props;
            pagination.currentPage = currentPage;
            emit('paging');
        };
        const hoisted_1 = 'total, sizes, prev, pager, next, jumper';
        const Pagination = resolveComponent('ElPagination');
        return () => {
            return createVNode$1(Pagination, {
                class: 'cx_align_right cx_p_20',
                background: true,
                currentPage: props.pagination.currentPage,
                pageSizes: props.pagination.pageSizes,
                pageSize: props.pagination.pageCapacity,
                layout: hoisted_1,
                total: props.pagination.total,
                onSizeChange: handleSizeChange,
                onCurrentChange: handleCurrentChange
            }, null, PATCH_FLAG.FULL_PROPS);
        };
    }
});

const DynamicFormCacheModule = 'dynamicForm';
const DynamicFormVisibleCacheModule = 'dynamicFormVisible';

const useDynamicFormCache = (rootProps) => {
    const getCacheKey = (dynamic) => {
        return !dynamic
            ? ''
            : `u_${useCxTable().getContext().contextScopeId}_m1_${dynamic.moduleType}_b_${dynamic.businessType}_m2_${dynamic.modelType}_p_${dynamic.priceType}`;
    };
    const getCache = (module = DynamicFormCacheModule) => {
        return () => localStore.get(getCacheKey(rootProps.dynamic), module);
    };
    const getFormCacheIO = IO.of(getCache());
    const getVisibleCacheIO = IO.of(getCache(DynamicFormVisibleCacheModule));
    const setCache = (module = DynamicFormCacheModule) => {
        return (val) => {
            try {
                localStore.set(getCacheKey(rootProps.dynamic), val, void 0, module);
            }
            catch {
                cxTableWarn(`can't set dynamic form cache from dynamicConfig:`, rootProps.dynamic);
            }
        };
    };
    const setFormCacheIO = IO.of(setCache());
    const setVisibleCacheIO = IO.of(setCache(DynamicFormVisibleCacheModule));
    return { getFormCacheIO, getVisibleCacheIO, setFormCacheIO, setVisibleCacheIO };
};

const useDynamicFormSearch = () => {
    const { getParamsItems, getConfigByDynamicConfig, arrNotEmpty } = useCxTableCompose();
    const context = useCxTable().getContext();
    const devTip = R.tap(unsafeWhenDevCall((dynamic) => console.info(`[CxTable]:dynamic form auto fetchData by config `, changeDynamicIdToText(dynamic))));
    const errorDevTip = unsafeWhenDevCall((dynamic) => {
        cxTableWarn(`can't match api by config `, changeDynamicIdToText(dynamic));
    });
    const initRequestParams = (rootProp, form, currentFormItems, tableDataVisitor) => {
        const setItems = R.set(R.lensProp('items'), getParamsItems(form, currentFormItems));
        const mergeSort = R.mergeLeft(R.zipObj(['sortDirection', 'sortProp'], [tableDataVisitor.sortStatus, tableDataVisitor.sortProp]));
        const mergePagination = R.mergeLeft(R.pick(['currentPage', 'pageCapacity'], R.prop('pagination', rootProp)));
        return R.compose(setItems, mergeSort, mergePagination, R.prop('dynamic'))(rootProp);
    };
    const updateTableData = R.curryN(2, (data, rootProp) => {
        const { rows, total } = data;
        isNumber(total) && Maybe.of(rootProp.pagination).map(unsafeSet(R.__, 'total', total));
        if (!Array.isArray(rows))
            return;
        if (R.isEmpty(rows) && R.gt(R.defaultTo(0, rootProp.pagination?.currentPage), 1)) {
            rootProp.pagination.currentPage--;
        }
        else {
            R.compose(R.when(R.is(Array), unsafeClearPush(R.__, rootProp.tableData)), R.ifElse(R.is(Function), (cb) => cb(rows, data), R.always(rows)))(rootProp.hooks?.onSearch);
        }
    });
    const updateTotal = R.useWith(unsafeClearAssign, [
        R.identity,
        R.prop('entireTotalSum')
    ]);
    const checkDynamic = (dynamic) => {
        if (!dynamic) {
            throw cxTableWarn(`can't fetch data if dynamic `, dynamic, ` is invalid`);
        }
    };
    const matchedRule = R.compose(getMaybeValue, R.converge(getConfigByDynamicConfig, [
        R.identity,
        R.compose(R.prop(R.__, context.dynamicFormContext.requestApiMap), R.prop('moduleType'))
    ]));
    const search = async (rootProp, form, currentFormItems, tableDataVisitor) => {
        const { dynamic } = rootProp;
        checkDynamic(dynamic);
        const matchedRuleEither = R.compose(R.ifElse(R.isNil, Left.of, Right.of), matchedRule);
        return await either(withParams(errorDevTip, [dynamic]), async (rule) => {
            devTip(dynamic);
            const rulePropVal = R.prop(R.__, rule);
            const stateEq200 = R.propEq('state', 200);
            R.when(stateEq200, R.compose(updateTableData(R.__, rootProp), R.prop('data')))(await rulePropVal('requestInstance').postJSON(rulePropVal('api'), initRequestParams(rootProp, form, currentFormItems, tableDataVisitor)));
        }, matchedRuleEither(dynamic));
    };
    const searchTotal = async (rootProp, form, currentFormItems, tableDataVisitor, CxTable) => {
        const { dynamic } = rootProp;
        checkDynamic(dynamic);
        const matchedRuleEither = R.compose(R.ifElse(R.isNil, Left.of, Right.of), matchedRule);
        return await either(R.converge(errorDevTip, [R.always(dynamic)]), async (rule) => {
            const rulePropVal = R.prop(R.__, rule);
            const stateEq200 = R.propEq('state', 200);
            const requestInstance = rulePropVal('requestInstance');
            const getTotals = R.compose(getMaybeValue, map$1(R.objOf('totals')), map$1(R.map(R.prop('prop'))), map$1(R.filter(R.compose(truthy, R.prop('sum')))), map$1(R.prop('flatColumns')), Maybe.of);
            R.when(stateEq200, R.compose(R.curryN(3, R.call)(updateTotal, R.__, CxTable), R.prop('data')))(await R.compose(R.ifElse(R.compose(arrNotEmpty, R.prop('totals')), R.compose(R.converge(requestInstance.postJSON.bind(requestInstance), [
                R.always('/header/total'),
                R.identity
            ]), R.mergeLeft(initRequestParams(rootProp, form, currentFormItems, tableDataVisitor))), defaultPromise({})), getTotals)(CxTable));
        }, matchedRuleEither(dynamic));
    };
    return { initRequestParams, updateTableData, search, searchTotal };
};

var TeleFormInstance = defineComponent({
    name: 'TeleFormInstance',
    emits: ['change', 'close'],
    props: {
        form: { type: Object, required: true },
        items: { type: Array, required: true },
        states: { type: Object, required: true }
    },
    setup(props, { emit, slots }) {
        const curryEmit = R.curryN(2, emit);
        return (_, cache) => {
            return createVNode$1('div', { style: { display: props.states?.visible ?? true ? 'block' : 'none' } }, [
                createVNode$1(_CX_FORM, {
                    form: props.form,
                    items: props.items,
                    formAttrs: { labelPosition: 'top', labelSuffix: '' },
                    onChange: cache[0] || (cache[0] = curryEmit('change')),
                    onClose: cache[1] || (cache[1] = curryEmit('close'))
                }, { add: () => [slots.add?.() ?? ''] }, PATCH_FLAG.PROPS, ['form', 'items'])
            ], PATCH_FLAG.STYLE);
        };
    }
});

function useState(initValue) {
    const state = ref$1(initValue);
    const getState = ((isRef) => (isRef ? state : unref(state)));
    return [getState, (val) => (state.value = val)];
}
function isWritableComputedOptions(arg) {
    return typeof arg === 'object' && Reflect.has(arg || {}, 'set');
}
function useComputed(arg) {
    const data = isWritableComputedOptions(arg) ? computed(arg) : computed(arg);
    const getData = (isRef) => (isRef ? data : data.value);
    if (!isWritableComputedOptions(arg)) {
        return getData;
    }
    return [getData, (val) => (data.value = val)];
}
function useSync(props, emit, arr = []) {
    if (!arr.length)
        return [];
    return arr.reduce((p, c) => {
        const option = computed({
            get: () => props[c],
            set: value => emit(`update:${c}`, value)
        });
        p.push(option);
        return p;
    }, []);
}

var DynamicFormAdd = defineComponent({
    name: 'DynamicFormAdd',
    props: {
        options: { type: Array, default: () => [] },
        modelValue: { type: Array, required: true }
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const [modelProxy, setModelProxy] = useComputed({
            get() {
                return props.modelValue ?? [];
            },
            set(val) {
                emit('update:modelValue', val);
                setVisible(false);
            }
        });
        const [visible, setVisible] = useState(false);
        const toggleVisible = R.compose(setVisible, R.not, visible);
        const addItem = (id) => {
            R.compose(setModelProxy, R.uniq, R.append(id), modelProxy)();
        };
        const matchPinyinSearch = (str) => {
            return R.ifElse(R.isEmpty, R.T, R.curryN(2, PinyinMatch.match)(str))(searchContent());
        };
        const currentOptions = useComputed(() => {
            return R.filter(R.allPass([
                R.compose(R.not, R.includes(R.__, modelProxy()), R.prop('id')),
                R.compose(matchPinyinSearch, R.prop('name'))
            ]))(props.options);
        });
        const [searchContent, setSearchContent] = useState('');
        const _hoisted_component_1 = resolveComponent('ElPopover');
        const _hoisted_component_2 = resolveComponent('CxBtn');
        const _hoisted_component_3 = resolveComponent('ElInput');
        const _hoisted_class_1 = 'cx_mb_5';
        const _hoisted_class_2 = 'hover-highlight cx_ptb_8 cx_plr_12';
        const _hoisted_class_3 = 'cx_plr_7';
        const _hoisted_class_4 = 'cx_flex_center cx_justify_center cx_mt_8';
        const _hoisted_attrs_1 = {
            style: {
                maxHeight: '245px',
                overflowY: 'auto',
                margin: '0 -12px -10px'
            }
        };
        return (_, cache) => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    createVNode$1(_hoisted_component_1, {
                        visible: visible(),
                        'onUpdate:visible': setVisible,
                        placement: 'right-start',
                        width: 240,
                        showArrow: false
                    }, {
                        reference: () => {
                            return createVNode$1(_hoisted_component_2, {
                                onClick: toggleVisible,
                                icon: 'tianjia',
                                class: _hoisted_class_3,
                                style: {
                                    marginTop: props.modelValue.length ? '32px' : 0,
                                    backgroundColor: '#f0f5ff'
                                }
                            }, null, PATCH_FLAG.STYLE);
                        },
                        default: () => {
                            return (openBlock(),
                                createBlock(Fragment$1, null, [
                                    createVNode$1(_hoisted_component_3, {
                                        size: 'mini',
                                        class: _hoisted_class_1,
                                        suffixIcon: 'iconfont icon-sousuo',
                                        modelValue: searchContent(),
                                        'onUpdate:modelValue': setSearchContent,
                                        placeholder: '搜索过滤条件'
                                    }, null, PATCH_FLAG.PROPS, ['modelValue']),
                                    [
                                        (openBlock(),
                                            createBlock(Fragment$1, null, [
                                                currentOptions().length
                                                    ? createVNode$1('div', _hoisted_attrs_1, [
                                                        (openBlock(),
                                                            createBlock(Fragment$1, null, currentOptions().map(option => {
                                                                return createVNode$1('div', {
                                                                    key: option.id,
                                                                    class: _hoisted_class_2,
                                                                    onClick: R.useWith(addItem, [R.always(option.id)])
                                                                }, option.name, PATCH_FLAG.PROPS, ['key']);
                                                            }), PATCH_FLAG.KEYED_FRAGMENT))
                                                    ])
                                                    : cache[0] ||
                                                        (cache[0] = createVNode$1('div', { class: _hoisted_class_4 }, '暂无数据'))
                                            ]))
                                    ]
                                ]));
                        }
                    }, PATCH_FLAG.PROPS, ['visible'])
                ]));
        };
    }
});

var DynamicFilterBtn = defineComponent({
    name: 'DynamicFilterBtn',
    props: { states: { type: Object, required: true } },
    emits: ['click'],
    setup(props, { emit }) {
        const color = computed(() => {
            return props.states?.visible ? '#0084ff' : 'rgba(0,0,0,.85)';
        });
        return (_, cache) => {
            return createVNode$1(_CX_BTN, {
                onClick: cache[0] || (cache[0] = () => emit('click')),
                icon: 'filtershaixuan',
                content: '筛选',
                style: { color: color.value, borderColor: color.value }
            }, null, PATCH_FLAG.STYLE | PATCH_FLAG.FULL_PROPS);
        };
    }
});

var TeleForm = defineComponent({
    name: 'TeleForm',
    props: {
        dynamicColumn: { type: Array, required: true },
        tableDataVisitor: { type: Object, required: true },
        loading: { type: Boolean }
    },
    emit: ['update:loading'],
    setup(props, { emit }) {
        const _hoisted_direction = resolveDirective('loading');
        const rootProp = inject('rootProp');
        const bus = inject('bus');
        const CxTable = inject('CxTable');
        const cache = useDynamicFormCache(rootProp);
        const { getOptionListFromColumn, getCurrentFormConfig, isRenderInTeleport, isEmptyValue, isPositive, arrayIsNotEmpty, getTargetColumnDefault } = useCxTableCompose();
        const { search, searchTotal } = useDynamicFormSearch();
        // 当前展示的表单项
        const currentFormItems = reactive$1(R.defaultTo([], cache.getFormCacheIO.unsafePerformIO()));
        const getCurrentFormItems = R.always(currentFormItems);
        const oldCurrentFormItems = [...currentFormItems];
        watch$1(getCurrentFormItems, () => {
            const defaultNotEmpty = R.find(R.compose(R.not, R.isNil, R.path(['searchStates', 'searchDefault']), R.flip(R.find)(props.dynamicColumn), R.curryN(2, R.pathEq)(['prop'])));
            R.when(R.allPass([arrayIsNotEmpty, defaultNotEmpty]), R.compose(fetchAllData, R.forEach(setDefaultValueByProp)))(R.difference(currentFormItems, oldCurrentFormItems));
            unsafeClearPush(currentFormItems, oldCurrentFormItems);
        }, { deep: true });
        // 表单
        const form = reactive$1({});
        const initForm = (form) => {
            unsafeClearObj(form);
            currentFormItems.forEach(setDefaultValueByProp);
        };
        const getDefaultValueByProp = R.compose(getTargetColumnDefault, R.converge(getTargetColumn, [R.identical, () => props.dynamicColumn]));
        const setDefaultValueByProp = (prop) => {
            getDefaultValueByProp(prop).map(unsafeSet(form, prop));
        };
        // 表格体loading
        const [loading] = useSync(props, emit, ['loading']);
        const setLoading = (val) => (loading.value = val);
        // 表单loading
        const [formLoading, setFormLoading] = useState(false);
        // 当使用teleportForm时的承载容器
        const [container, setContainer] = useState(null);
        const formConfig = reactive$1([]);
        // 允许的表单项{id,name}[]
        const searchableOptionList = reactive$1([]);
        const setSearchableOptionList = unsafeClearPush(R.__, searchableOptionList);
        const unsafeUpdateConfig = () => unsafeClearPush(getCurrentFormConfig(props.dynamicColumn, currentFormItems), formConfig);
        watch$1(getCurrentFormItems, R.compose(unsafeUpdateConfig, (val) => {
            cache.setFormCacheIO.unsafePerformIO(val);
        }), { deep: true });
        const fetchTableData = debounce(() => {
            setLoading(true);
            unsafeClearArray(rootProp.tableData);
            search(rootProp, form, currentFormItems, props.tableDataVisitor).finally(() => {
                setLoading(false);
            });
        }, 100);
        const fetchAllData = debounce(async () => {
            fetchTableData();
            await nextTick$1();
            CxTable.entireTotalSum = {};
            R.when(R.prop('showForm'), R.converge(searchTotal, [
                R.always(rootProp),
                R.always(form),
                R.always(currentFormItems),
                R.always(props.tableDataVisitor),
                R.always(CxTable)
            ]))(rootProp);
        }, 50);
        const onSearch = nextTimeout((payload) => {
            // 处理states
            R.when(R.compose(R.not, R.prop('visible')), toggleVisibleStates)(states);
            // 处理payload
            R.when(R.is(Object), R.compose(unsafePush(R.__, currentFormItems), R.flip(R.difference)(currentFormItems), R.keys, R.tap(unsafeAssign(R.__, form)), R.pick(R.map(R.prop('id'), getOptionListFromColumn(props.dynamicColumn)))))(payload);
            fetchAllData();
        });
        bus.on('search', onSearch);
        const onClose = (prop) => {
            R.compose(R.when(isPositive, unsafeRemoveItem(R.__, currentFormItems)), R.findIndex(R.equals(prop)))(currentFormItems);
            const value = form[prop];
            const removeItemFromConfig = unsafeRemoveItem(R.__, formConfig);
            const removePropFromForm = () => Reflect.deleteProperty(form, prop);
            const reFetchData = R.compose(R.unless(isEmptyValue, fetchAllData), R.always(value));
            const initForm = R.compose(removePropFromForm, removeItemFromConfig);
            R.compose(R.when(isPositive, R.compose(reFetchData, initForm)), R.findIndex(R.pathEq(['prop'], prop)))(formConfig);
        };
        const renderDynamicFormAdd = () => {
            return createVNode$1(DynamicFormAdd, {
                options: searchableOptionList,
                modelValue: currentFormItems,
                'onUpdate:modelValue': unsafeClearPush(R.__, currentFormItems)
            }, null, PATCH_FLAG.FULL_PROPS);
        };
        const states = reactive$1(cache.getVisibleCacheIO.map(R.compose(R.objOf('visible'), truthy)).unsafePerformIO());
        const toggleVisibleStates = () => (states.visible = !states.visible);
        watch$1(() => states.visible, cache.setVisibleCacheIO.unsafePerformIO.bind(cache.setVisibleCacheIO));
        const _hoisted_attrs_1 = { class: 'cx_dp_flex cx_justify_end cx_mb_16' };
        const _hoisted_attrs_2 = { class: 'cx_line cx_mb_12 cx_mlr_0 cx_w_100p' };
        const _hoisted_attrs_3 = { class: 'cx_dp_flex' };
        const _hoisted_node_1 = createVNode$1('div', _hoisted_attrs_2);
        const renderForm = () => createVNode$1('div', { class: 'cx-table_tele_form' }, [
            createVNode$1('div', _hoisted_attrs_1, [
                createVNode$1(DynamicFilterBtn, {
                    onClick: toggleVisibleStates,
                    states
                })
            ]),
            _hoisted_node_1,
            createVNode$1('div', _hoisted_attrs_3, [
                withDirectives(createVNode$1(TeleFormInstance, { states, form, items: formConfig, onChange: fetchAllData, onClose }, { add: renderDynamicFormAdd }, PATCH_FLAG.FULL_PROPS), [[_hoisted_direction ?? {}, formLoading()]])
            ])
        ]);
        // unsafeClearDom::void->string
        const unsafeClearEle = R.compose(map$1(unsafeSet(R.__, 'innerHTML', '')), Maybe.of);
        // renderVNodeToDom::HTMLElement->void
        const renderVNodeToDom = R.compose(R.converge(render$5, [renderForm, R.identity]), R.tap(unsafeClearEle), R.tap(unsafeDeleteProperty(R.__, '_vnode')));
        const unsafeWarn = () => cxTableWarn(`can't find container element by selector`, rootProp.formTeleport);
        // 组件更新IO
        const updateComponentIO = IO.of(queryDom).map(R.ifElse(R.isNil, R.compose(unsafeWarn, unsafeClearEle, container), R.compose(map$1(renderVNodeToDom), Maybe.of, setContainer)));
        watch$1(() => props.dynamicColumn, async () => {
            await nextTick$1();
            unsafeUpdateConfig();
            cache.getFormCacheIO
                .map(R.compose(unsafeClearPush(R.__, currentFormItems), R.defaultTo([])))
                .unsafePerformIO();
            initForm(form);
            setSearchableOptionList(getOptionListFromColumn(props.dynamicColumn));
            setFormLoading(false);
            fetchAllData();
            R.ifElse(isRenderInTeleport, R.always(updateComponentIO), getDoNothingIO)(rootProp).unsafePerformIO(rootProp.formTeleport);
        });
        watch$1(() => rootProp.dynamic, () => {
            setFormLoading(true);
            cache.getVisibleCacheIO
                .map(R.compose(unsafeSet(states, 'visible'), truthy))
                .unsafePerformIO();
        });
        watch$1([() => rootProp.pagination?.currentPage, () => rootProp.pagination?.pageCapacity], fetchTableData);
        return withParams(R.ifElse(isRenderInTeleport, R.always(''), renderForm), [rootProp]);
    }
});

const script$4 = defineComponent({ name: 'EmptyData' });
const render$3 = () => createVNode$1('embed', { src: require('../../assets/tableEmpty.svg') });
script$4.render = render$3;

//
var script$3 = defineComponent({
    name: 'Ellipsis',
    props: {
        content: { type: [String, Number], default: '' },
        activeBgColor: { type: String, default: '#fff' },
        placement: {
            type: String,
            default: 'left'
        }
    },
    setup(props, { expose }) {
        const refOneEllipsis = ref$1();
        const refContent = ref$1();
        const tipVisible = ref$1(false);
        const paddingRight = ref$1('0');
        async function calcContentWidth() {
            const el = refContent.value;
            if (!el || !refOneEllipsis.value)
                return;
            const pW = el?.clientWidth;
            const wrapW = refOneEllipsis.value?.clientWidth || 80;
            const pdLeft = parseFloat(getComputedStyle(refOneEllipsis.value).paddingLeft);
            const pdRight = parseFloat(getComputedStyle(refOneEllipsis.value).paddingRight);
            paddingRight.value = pdRight + 'px';
            const realWidth = wrapW - pdLeft - pdRight;
            tipVisible.value = pW > realWidth;
        }
        const resizeFn = () => calcContentWidth();
        onMounted$1(() => {
            const conentP = refContent.value;
            calcContentWidth();
            addResizeListener(conentP, resizeFn);
            onUnmounted$1(() => {
                removeResizeListener(conentP, resizeFn);
            });
        });
        expose({
            calcContentWidth
        });
        const popperConfig = reactive$1({
            text: props.content,
            visible: tipVisible.value,
            controlType: 'mouse',
            placement: props.placement
        });
        watch$1([() => props.content, () => props.placement, tipVisible], ([content, placement, tipVisible]) => {
            popperConfig.text = content;
            popperConfig.placement = placement;
            popperConfig.visible = tipVisible;
        });
        return {
            popperConfig,
            refOneEllipsis,
            tipVisible,
            paddingRight,
            refContent
        };
    }
});

const _hoisted_1$2 = { style: {"overflow":"hidden"} };

function render$2(_ctx, _cache) {
  const _directive_uni_popper = resolveDirective("uni-popper");

  return withDirectives((openBlock(), createElementBlock("div", {
    ref: "refOneEllipsis",
    class: normalizeClass$1(["one-ellipsis", { ellipsis: _ctx.tipVisible }]),
    style: normalizeStyle$1({ '--paddingRight': _ctx.paddingRight, '--bgColor': _ctx.activeBgColor })
  }, [
    createElementVNode("div", _hoisted_1$2, [
      createElementVNode("p", {
        ref: "refContent",
        class: "note-tooltip"
      }, toDisplayString(_ctx.content), 513 /* TEXT, NEED_PATCH */)
    ])
  ], 6 /* CLASS, STYLE */)), [
    [_directive_uni_popper, _ctx.popperConfig]
  ])
}

script$3.render = render$2;
script$3.__scopeId = "data-v-395547cc";
script$3.__file = "src/lib/cx-table/src/components/ellipsis/index.vue";

function useCxDialog() {
    const dialogRef = ref$1(null);
    function register(instance) {
        onUnmounted$1(() => {
            dialogRef.value = null;
        });
        dialogRef.value = instance;
    }
    function getDialogInstance() {
        const dialog = unref(dialogRef);
        if (!dialog) {
            throw new Error('dialog is undefined!');
        }
        return dialog;
    }
    const methods = {
        openDialog: (visible = true) => {
            getDialogInstance().openDialog(visible);
        }
    };
    return [register, methods];
}

const DEFAULT_CAPACITY = 10;
var cacheListDialog = defineComponent({
    name: 'CacheListDialog',
    setup(_, { expose }) {
        const rootProp = inject('rootProp');
        const rootSlots = inject('rootSlots');
        const $CxTable = inject('CxTable');
        const bus = inject('bus');
        const { getParamsItems, getConfigByDynamicConfig, arrNotEmpty } = useCxTableCompose();
        const context = useCxTable().getContext();
        const getDefaultRequestInstance = (() => R.path(['dynamicCacheContext', 'requestInstance', 'default'], context));
        const getRequestApiMap = (() => R.path(['dynamicCacheContext', 'requestApiMap'], context));
        const getRemoveApiMap = (() => R.path(['dynamicCacheContext', 'removeApiMap'], context));
        const getLabelConfig = (() => R.path(['dynamicCacheContext', 'cacheLabelConfig'], context));
        const getTabCondition = (() => R.path(['dynamicCacheContext', 'cacheTypeTab'], context));
        const getMessageInstance = (() => R.path(['messageInstance'], context));
        const needTypeTab = R.ifElse(R.is(Function), (condition) => condition(rootProp), R.T);
        const [register, dialogExpose] = useCxDialog();
        const openDialog = () => {
            resetForm();
            resetPage();
            setCurrentType(TypeOption.未提交);
            dialogExpose.openDialog();
        };
        expose({
            openDialog
        });
        const [currentType, setCurrentType] = useState(TypeOption.未提交);
        const typeOptionList = useEnumOptions(TypeOption);
        const resetPage = () => {
            setActiveItem(null);
            unsafeClearArray(orderList());
            setHasDone(false);
        };
        // ------------------------------ 表单 ------------------------------
        const form = reactive$1({ gmtCreate: [] });
        const resetForm = () => {
            unsafeClearObj(form);
            form.gmtCreate = [];
        };
        const items = [{ label: '提交日期', prop: 'gmtCreate', dateRange: {} }];
        // ------------------------------ 数据源 ------------------------------
        // 左侧列表相关
        const [activeItem, setActiveItem] = useState(null);
        const [hasDone, setHasDone] = useState(false);
        const [orderList] = useState([]);
        // 右侧明细相关
        const tableData = useComputed(R.compose(R.prop('rows'), R.prop('content'), R.defaultTo({}), activeItem));
        const tableConfig = reactive$1({ items: [] });
        const setTableConfig = unsafeClearPush(R.__, tableConfig.items);
        const [globalConfig, setGlobalConfig] = useState([]);
        const getGlobalConfig = R.nAry(0, globalConfig);
        const initTableConfig = R.ifElse(R.is(Array), R.map(CxConfigAdaptor.of), R.always([]));
        const initAndSetConfig = R.compose(setTableConfig, initTableConfig);
        watch$1(() => activeItem(), R.compose(R.ifElse(arrNotEmpty, initAndSetConfig, R.converge(initAndSetConfig, [getGlobalConfig])), R.prop('table'), R.defaultTo({})));
        // ------------------------------ api ------------------------------
        // paramsGenerator::DYNAMIC_CONFIG|undefined->AnyObject->Params
        const paramsGenerator = (dynamic, form) => {
            const getItemObj = R.compose(R.objOf('items'), R.converge(getParamsItems, [R.identity, R.always(R.of('gmtCreate'))]));
            const mergeDynamic = R.mergeLeft(R.defaultTo({}, dynamic));
            const mergePage = R.mergeLeft(R.zipObj(['queryIndex', 'pageCapacity'], [R.length(orderList()), DEFAULT_CAPACITY]));
            const mergeOrderType = R.when(R.compose(truthy, R.nAry(0, currentType)), R.mergeLeft(R.objOf('orderType', currentType())));
            return R.compose(Maybe.of, mergeOrderType, mergeDynamic, mergePage, getItemObj)(form);
        };
        const getInnerTable = R.path(['data']);
        const moduleTypePath = R.path(['dynamic', 'moduleType']);
        const getSpecialAxios = R.compose(R.defaultTo(getDefaultRequestInstance()), R.prop(R.__, context.dynamicCacheContext.requestInstance));
        const sendRequestIO = IO.of(() => Maybe.run((function* () {
            const api = yield Maybe.of(R.prop(currentType(), getRequestApiMap()));
            const params = yield paramsGenerator(rootProp.dynamic, form);
            const instance = yield R.compose(Maybe.of, R.ifElse(isDraft, getDefaultRequestInstance, R.compose(getSpecialAxios, R.converge(moduleTypePath, [R.always(rootProp)]))))(currentType());
            return R.andThen(R.compose(Maybe.of, R.ifElse(stateEq200, getInnerTable, R.always(void 0))), instance.postJSON(api, params));
        })()));
        const maybePropTotal = R.compose(Maybe.of, R.prop('total'));
        const maybePropRows = R.compose(Maybe.of, R.prop('rows'));
        const maybePropTable = R.compose(Maybe.of, R.prop('table'));
        const getOrderList = R.nAry(0, orderList);
        const isHasDone = R.converge(R.gte, [R.compose(R.length, getOrderList), R.identity]);
        const pushInOrderList = R.converge(unsafePush, [R.identity, getOrderList]);
        const fetchHandleIO = sendRequestIO.map(map$1(R.andThen(map$1(R.compose(R.tap(R.compose(map$1(setGlobalConfig), maybePropTable)), R.tap(R.compose(map$1(R.compose(setHasDone, isHasDone)), maybePropTotal)), R.tap(R.compose(map$1(pushInOrderList), maybePropRows)), R.pick(['total', 'rows', 'table']))))));
        const setDefaultActive = R.converge(R.when(R.compose(R.isNil, R.nAry(0, activeItem)), R.converge(setActiveItem, [R.compose(R.head, getOrderList)])), [R.F]);
        const fetchData = R.converge(R.ifElse(R.complement(hasDone), fetchHandleIO.unsafePerformIO.bind(fetchHandleIO), Maybe.none), [R.F]);
        const scrollFetchRequest = R.compose(map$1(R.andThen(setDefaultActive)), fetchData);
        const scrollFetch = debounce(scrollFetchRequest, 50);
        const conditionChangeFetch = R.compose(scrollFetch, resetPage);
        watch$1(currentType, conditionChangeFetch);
        let lock = false;
        const getLock = () => lock;
        const setLock = (val = true) => (lock = val);
        const removeFetch = R.ifElse(getLock, R.identity, R.compose(R.compose(map$1(R.andThen(R.converge(setLock, [R.F]))), scrollFetchRequest), setLock, R.T));
        // ------------------------------ 删除 ------------------------------
        const isDraft = R.equals(TypeOption.未提交);
        const getQueryCompose = (dynamic) => {
            return R.ifElse(R.compose(R.not, isDraft, R.prop('type')), R.always(dynamic), R.empty);
        };
        const getSendRequestWithId = (requestType) => {
            return (params) => sendRequestWithId(requestType, params);
        };
        function* sendRequestWithId(requestType, params) {
            const { id, api } = params;
            const paramId = yield Maybe.of(id);
            const url = yield Maybe.of(api);
            const urlWithId = yield Maybe.of(R.concat(url, R.toString(paramId)));
            const query = getQueryCompose(rootProp.dynamic)(params);
            const instance = yield Maybe.of(getDefaultRequestInstance()?.[requestType]);
            return instance(urlWithId, query);
        }
        const removeItemIO = IO.of(R.compose(Maybe.run, getSendRequestWithId('delete')));
        const doRemove = (id) => {
            const index = R.findIndex(R.pathEq(['form', 'id'], id), orderList());
            R.when(R.lte(0), unsafeRemoveItem(R.__, orderList()))(index);
            R.when(R.pathEq(['form', 'id'], id), R.converge(setActiveItem, [R.always(null)]))(activeItem());
            R.when(R.compose(R.gte(10), R.length), removeFetch)(orderList());
        };
        const removeItem = (id) => {
            removeItemIO
                .map(map$1(R.andThen(R.when(stateEq200, R.converge(doRemove, [R.always(id)])))))
                .unsafePerformIO({ id, api: getRemoveApiMap()?.[currentType()] });
        };
        const setBusOn = (params) => {
            bus.on('removeCacheItem', () => {
                removeItemIO.unsafePerformIO(R.assoc('api', getRemoveApiMap()?.[currentType()], params));
                setBusOff();
            });
        };
        const setBusOff = () => {
            bus.off('removeCacheItem');
        };
        // 使用数组绑定会出现异常触发的情况
        watch$1(() => rootProp.dynamic.businessType, setBusOff);
        watch$1(() => rootProp.dynamic.modelType, setBusOff);
        // ------------------------------ 提交 ------------------------------
        const getOmitRows = R.curryN(3, (rows, mainTableConfig, currentTableConfig) => {
            const mapProp = R.map(R.prop('prop'));
            const diffProp = R.difference(mapProp(mainTableConfig), mapProp(currentTableConfig));
            return R.map(R.omit(diffProp), rows);
        });
        function* mergeCacheData() {
            const content = yield Maybe.of(R.path(['content'], activeItem()));
            const rows = yield Maybe.of(R.path(['rows'], content));
            const getEditRows = getOmitRows(R.__, tableConfig.items, $CxTable.flatColumns);
            unsafeClearPush(getEditRows(rows), rootProp.tableData);
            dialogExpose.openDialog(false);
            setBusOff();
            setBusOn({ id: getId(activeItem()), type: currentType() });
            const callHook = R.converge(R.call, [
                R.always(yield Maybe.of(R.path(['hooks', 'onGetCache'], rootProp))),
                R.always(R.clone(yield Maybe.of(R.path(['cache'], content)))),
                R.nAry(0, currentType),
                R.always(getEditRows(rows)),
                R.always(R.clone(yield Maybe.of(R.path(['form'], activeItem()))))
            ]);
            // 目前暂不清楚为何在同步调用的情况下会出现弹窗无法正确关闭的问题,故使用setTimeout
            setTimeout(callHook);
        }
        const continueEdit = R.compose(Maybe.run, mergeCacheData);
        // ------------------------------ 判断是否存在 ------------------------------
        const existApiMap = {
            [TypeOption.未提交]: '/draft/manager/draft/exist/',
            [TypeOption.已驳回]: '/draft/manager/order/exist/',
            [TypeOption.已反审]: '/draft/manager/order/exist/'
        };
        const orderIsExist = R.compose(Maybe.run, getSendRequestWithId('get'));
        const dataIsFalsy = R.allPass([stateEq200, R.compose(falsy, R.prop('data'))]);
        const notExistToast = R.converge(getMessageInstance().warning, [
            R.always('此数据已被删除,请重新打开暂存弹窗!')
        ]);
        // ------------------------------ 组合exist与submit ------------------------------
        const onOk = R.compose(map$1(R.andThen(R.ifElse(dataIsFalsy, continueEdit, notExistToast))), R.converge(orderIsExist, [
            R.converge(R.zipObj, [
                R.always(['id', 'api']),
                R.converge(R.pair, [
                    R.converge(R.path(['form', 'id']), [R.nAry(0, activeItem)]),
                    R.converge(R.prop, [R.nAry(0, currentType), R.always(existApiMap)])
                ])
            ])
        ]));
        // ------------------------------ 渲染函数 ------------------------------
        const _hoisted_direction_1 = resolveDirective('infinite-scroll');
        const _hoisted_class_1 = 'cx_secondary_title cx_pl_16 cx_ptb_12';
        const _hoisted_class_2 = 'cx_pl_16 cx_cursor_pointer cx_position_re hover_show_container';
        const _hoisted_class_3 = 'cx_of_auto cx_h_500';
        const _hoisted_class_4 = 'cx_ml_5 cx_mr_16';
        const _hoisted_class_5 = 'cx_flex_center cx_ptb_12 cx_plr_16 cx_bb';
        const _hoisted_class_6 = 'cx_p_16 cx_flex_center cx_justify_between';
        const _hoisted_class_7 = 'cx_dp_flex cx_bt cx_w_100p';
        const _hoisted_class_8 = 'cx_w_200 cx_br';
        const _hoisted_class_9 = 'cx_bb cx_ptb_16';
        const _hoisted_class_10 = 'cx_mb_12 cx_fs_14';
        const _hoisted_attrs_1 = {
            class: 'iconfont icon-shanchu cx_position_ab hover_high_light_red hover_show',
            style: 'right:16px;bottom:16px'
        };
        const _hoisted_attrs_2 = { class: _hoisted_class_3 };
        const _hoisted_attrs_3 = { style: { width: 'calc(100% - 200px)' } };
        const _hoisted_attrs_4 = { style: 'color: rgba(0, 0, 0, 0.45)' };
        const _hoisted_attrs_5 = { class: 'cx_flex_center cx_justify_center', ..._hoisted_attrs_3 };
        const renderTitle = (content) => {
            return createVNode$1('div', { class: _hoisted_class_1 }, content, PATCH_FLAG.TEXT);
        };
        // getBaseInfo::object a,object b=>a->b
        const getBaseInfo = R.converge(R.mergeRight, [
            R.compose(R.defaultTo({}), R.path(['content', 'cache'])),
            R.compose(R.defaultTo({}), R.path(['form']))
        ]);
        // getId::object->number
        const getId = R.path(['form', 'id']);
        // titlePath Object a,Object b::a->b
        const titlePath = R.path(['config', 'listTitle']);
        // defaultTitle
        const defaultTitle = R.defaultTo('新建暂存数据');
        const renderListItem = R.curryN(2, (item, currentItem) => {
            const maybeConfig = getConfigByDynamicConfig(rootProp.dynamic, getLabelConfig());
            const getItemValByPath = R.converge(R.path, [R.identity, R.always(getBaseInfo(item))]);
            return createVNode$1('li', {
                class: _hoisted_class_2,
                key: getId(item),
                style: R.compose(R.objOf('backgroundColor'), R.ifElse(R.pathEq(['form', 'id'], getId(currentItem)), R.always('#F0F5FF'), R.always('transparent')))(item),
                onClick: R.compose(setActiveItem, R.always(item))
            }, [
                createVNode$1('div', { class: _hoisted_class_9 }, [
                    createVNode$1('div', { class: _hoisted_class_10 }, R.compose(defaultTitle, getMaybeValue, map$1(R.compose(getItemValByPath)), map$1(R.compose(R.of)), map$1(R.compose(R.prop('prop'), titlePath)))(maybeConfig), PATCH_FLAG.TEXT),
                    createVNode$1('div', _hoisted_attrs_4, R.path(['form', 'gmtCreate'], item), PATCH_FLAG.TEXT),
                    createVNode$1('i', {
                        ..._hoisted_attrs_1,
                        onClick: R.compose(R.converge(removeItem, [R.always(getId(item))]), stopPropagation, preventDefault)
                    })
                ])
            ], PATCH_FLAG.FULL_PROPS);
        });
        const renderList = (list) => {
            return withDirectives(createVNode$1('ul', _hoisted_attrs_2, [
                (openBlock(),
                    createBlock(Fragment$1, null, R.map(renderListItem(R.__, activeItem()), list), PATCH_FLAG.KEYED_FRAGMENT))
            ]), [[_hoisted_direction_1 ?? {}, scrollFetch]]);
        };
        // infoPath Object a,Object b::a->b[]
        const infoPath = R.path(['config', 'tableInfo']);
        const labelItemList = useComputed(() => {
            const maybeConfig = getConfigByDynamicConfig(rootProp.dynamic, getLabelConfig());
            return R.compose(R.defaultTo([]), getMaybeValue, map$1(infoPath))(maybeConfig);
        });
        const renderOrderInfoItem = (state, item) => {
            const render = (content) => {
                return [
                    createVNode$1('label', null, `${state[`label_${currentType()}`] ?? state.label}:`),
                    createVNode$1('div', { class: _hoisted_class_4 }, content ?? state.defaultValue, PATCH_FLAG.TEXT)
                ];
            };
            return R.compose(R.ifElse(truthy, render, R.always(null)), R.defaultTo(state.defaultValue), R.path([state.prop]))(item);
        };
        const renderOrderInfo = (item) => {
            return createVNode$1('article', { class: _hoisted_class_5 }, R.compose(R.map(R.converge(renderOrderInfoItem, [R.identity, R.converge(getBaseInfo, [R.always(item)])])), labelItemList)());
        };
        const invokerWithChildren = (cb) => {
            return R.compose(cb, R.when(R.compose(R.is(Array), R.prop('children')), R.converge(R.set(R.lensProp('children')), [
                R.compose(R.map(cb), R.prop('children')),
                R.identity
            ])));
        };
        const labelContainer = (label) => {
            return R.compose(truthy, R.find(R.includes(R.__, label)))(['操作', '选择', '多选']);
        };
        const noRequired = invokerWithChildren(R.omit(['required']));
        const setImgsType = R.compose(R.when(R.compose(R.equals('款型图'), R.prop('label')), R.compose(R.set(R.lensProp('control'), R.objOf('type', 'imgs')), R.omit(['slot']))));
        const setDefaultSlot = R.compose(R.when(R.compose(R.all(falsy), R.props(['slot', 'calculate', 'dynamicCalculate'])), R.assoc('slot', 'renderWithText')));
        const imgsTypeInvoker = invokerWithChildren(setImgsType);
        const slotInvoker = invokerWithChildren(setDefaultSlot);
        const labelNotShow = R.compose(R.not, R.propSatisfies(labelContainer, 'label'));
        const dynamicInject = R.compose(R.map(R.compose(imgsTypeInvoker, slotInvoker, noRequired)), R.filter(labelNotShow), R.when(R.converge(R.is(Function), [R.always(rootProp.dynamicInject)]), rootProp.dynamicInject));
        const renderOrderTable = (config, dataList) => {
            return createVNode$1(_CX_TABLE, {
                dynamicInject,
                ...R.pick(['ignoreControl'], rootProp),
                tableConfig: config,
                disabled: true,
                keyboard: false,
                height: 427,
                class: 'cx_m_16',
                tableData: dataList,
                configurable: false
            }, {
                ...rootSlots,
                renderWithText: ({ rowData, column }) => {
                    const prop = column.prop ?? '';
                    let content = prop.endsWith('Id')
                        ? rowData[getColumnSelectText(column)] ?? rowData[getColumnSelectText(column, 'Name')]
                        : rowData[prop + 'Text'] ?? rowData[prop + 'Name'] ?? rowData[prop];
                    if (R.is(Number, column.accuracy)) {
                        content = decimalFixed(content, column.accuracy, true);
                    }
                    return [createVNode$1(script$3, { content }, null, PATCH_FLAG.PROPS, ['content'])];
                }
            }, PATCH_FLAG.PROPS, R.pair('dynamic', 'tableData'));
        };
        return (_, cache) => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    createVNode$1(_CX_DIALOG, {
                        title: TypeOption[currentType()],
                        appendToBody: true,
                        okText: '编辑',
                        width: '1524px',
                        top: '50px',
                        destroyOnClose: true,
                        onRegister: register,
                        onOk,
                        disabledOk: R.isNil(activeItem())
                    }, {
                        default() {
                            return [
                                // 顶部
                                createVNode$1('section', { class: _hoisted_class_6 }, [
                                    // tab切换
                                    (openBlock(),
                                        createBlock(Fragment$1, null, [
                                            R.compose(needTypeTab, getTabCondition)()
                                                ? createVNode$1(_CX_TAB, {
                                                    level: 3,
                                                    options: typeOptionList,
                                                    modelValue: currentType(),
                                                    'onUpdate:modelValue': setCurrentType
                                                }, null, PATCH_FLAG.PROPS, R.of('modelValue'))
                                                : cache[2] || (cache[2] = createVNode$1('div', null, '未提交'))
                                        ])),
                                    // 搜索项
                                    createVNode$1(_CX_FORM, { form, items, onChange: conditionChangeFetch, style: 'margin-bottom:-18px' }, null, PATCH_FLAG.PROPS, R.of('form'))
                                ]),
                                // 内容区
                                createVNode$1('section', { class: _hoisted_class_7 }, [
                                    // 订单列表
                                    createVNode$1('div', { class: _hoisted_class_8 }, [
                                        cache[0] || (cache[0] = renderTitle('订单列表')),
                                        R.compose(renderList, orderList)()
                                    ]),
                                    // 明细列表
                                    (openBlock(),
                                        createBlock(Fragment$1, null, [
                                            activeItem()
                                                ? createVNode$1('div', _hoisted_attrs_3, [
                                                    cache[1] || (cache[1] = renderTitle('明细列表')),
                                                    renderOrderInfo(activeItem()),
                                                    renderOrderTable(tableConfig, tableData())
                                                ])
                                                : createVNode$1('div', _hoisted_attrs_5, [createVNode$1(script$4)])
                                        ]))
                                ])
                            ];
                        }
                    }, PATCH_FLAG.PROPS, R.pair('title', 'disabledOk'))
                ]));
        };
    }
});

const renderInnerBtn = ({ $attrs, $slots }) => {
    return createVNode$1(_CX_BTN, {
        ...$attrs,
        level: $attrs.level ?? 2,
        loading: $attrs.loadingState?.loading,
        disabled: $attrs.disabledState?.disabled
    }, $slots, PATCH_FLAG.FULL_PROPS);
};
const innerBtn = defineComponent({});
innerBtn.render = renderInnerBtn;
var TeleportBtn = defineComponent({
    name: 'TeleportBtn',
    props: {
        dynamicColumn: { type: Array, required: true },
        selector: { type: String, required: true },
        clickHandler: { type: Function },
        disabledState: { type: Object, default: () => ({ disabled: false }) }
    },
    setup(props, { attrs, slots }) {
        const [container, setContainer] = useState(null);
        const unsafeWarn = () => cxTableWarn(`can't find container element by selector`, props.selector);
        // unsafeClearDom::void->string
        const unsafeClearEle = R.compose(map$1(unsafeSet(R.__, 'innerHTML', '')), Maybe.of);
        const onClick = async () => {
            setLoadingStates(true);
            try {
                await props.clickHandler?.();
                setLoadingStates(false);
            }
            catch {
                setLoadingStates(false);
            }
        };
        const loadingState = reactive$1({ loading: false });
        const setLoadingStates = unsafeSet(loadingState, 'loading');
        const renderBtn = () => createVNode$1(innerBtn, { ...attrs, disabledState: props.disabledState, loadingState, onClick }, slots, PATCH_FLAG.FULL_PROPS);
        // renderVNodeToDom::HTMLElement->void
        const renderVNodeToDom = R.compose(R.converge(render$5, [renderBtn, R.identity]), R.tap(unsafeClearEle), R.tap(unsafeDeleteProperty(R.__, '_vnode')));
        // 组件更新IO
        const updateComponentIO = IO.of(queryDom).map(R.ifElse(R.isNil, R.compose(unsafeWarn, unsafeClearEle, container), R.compose(map$1(renderVNodeToDom), Maybe.of, setContainer)));
        watch$1(() => props.dynamicColumn, async () => {
            await nextTick$1();
            updateComponentIO.unsafePerformIO(props.selector);
        });
        return R.always(null);
    }
});

var CacheListBtn = defineComponent({
    name: 'CacheListBtn',
    props: {
        dynamicColumn: { type: Array, required: true },
        tableDataVisitor: { type: Object, required: true }
    },
    setup(props) {
        const rootProp = inject('rootProp');
        const [dialogRef, setDialogRef] = useState(null);
        const dialogRefIO = IO.of(dialogRef);
        const setCacheIO = dialogRefIO.map(R.compose(map$1(R.compose(R.when(R.is(Function), R.call), R.prop('openDialog'))), Maybe.of));
        return () => [
            createVNode$1(TeleportBtn, {
                dynamicColumn: props.dynamicColumn,
                clickHandler: setCacheIO.unsafePerformIO.bind(setCacheIO),
                selector: rootProp.cacheListBtn,
                content: '暂存列表'
            }, null, PATCH_FLAG.PROPS, R.pair('selector', 'dynamicColumn')),
            createVNode$1(cacheListDialog, { ref: setDialogRef }, null, PATCH_FLAG.NEED_PATCH)
        ];
    }
});

var SetCacheBtn = defineComponent({
    name: 'SetCacheBtn',
    props: {
        dynamicColumn: { type: Array, required: true },
        tableDataVisitor: { type: Object, required: true }
    },
    setup(props) {
        const rootProp = inject('rootProp');
        const bus = inject('bus');
        const context = useCxTable().getContext();
        const getDefaultRequestInstance = (() => R.path(['dynamicCacheContext', 'requestInstance', 'default'], context));
        const getMessageInstance = (() => R.path(['messageInstance'], context));
        const { innerBracket } = useCxTableCompose();
        const getCacheData = async (tableProps) => {
            return new Promise((resolve, reject) => {
                const next = R.ifElse(truthy, resolve, reject);
                const handle = R.ifElse(R.is(Function), (cb) => R.call(cb, next), resolve);
                IO.of(R.path(['hooks', 'onSetCache']))
                    .map(handle)
                    .unsafePerformIO(tableProps);
            });
        };
        const paramsGenerator = async (innerProp, tableProps) => {
            const cache = R.objOf('cache', await getCacheData(tableProps));
            return IO.of(R.path(['tableDataVisitor', 'sortedData']))
                .map(R.objOf('rows'))
                .map(R.mergeLeft(cache))
                .map(R.objOf('content'))
                .map(R.mergeLeft(R.defaultTo({}, tableProps.dynamic)))
                .unsafePerformIO(innerProp);
        };
        const [disabledTime, setDisabledTime] = useState(0);
        const disabledState = reactive$1(R.objOf('disabled', false));
        const setDisabledState = unsafeSet(disabledState, 'disabled');
        watch$1(disabledTime, R.compose(setDisabledState, R.not, R.gte(0)));
        const decrease = R.compose(setDisabledTime, R.dec, disabledTime);
        const setTimer = () => {
            const timer = setInterval(R.compose(R.when(R.gte(0), R.converge(clearInterval, [() => timer])), decrease), 1000);
        };
        const content = useComputed(R.compose(R.concat('暂存'), R.ifElse(R.gte(0), R.always(''), R.compose(innerBracket, R.toString)), disabledTime));
        const handleResult = R.when(stateEq200, R.converge(getMessageInstance().success, [R.always('暂存成功')]));
        const sendRequest = R.converge(getDefaultRequestInstance().postJSON.bind(getDefaultRequestInstance()), [
            R.always('/draft/manager/save'),
            R.identity
        ]);
        const getParams = R.converge(paramsGenerator, [R.always(props), R.always(rootProp)]);
        const afterSetCacheIO = IO.of(R.compose(Maybe.of, R.path(['hooks', 'afterSetCache'])));
        const setCache = R.compose(R.andThen(() => afterSetCacheIO.map(map$1(R.call)).unsafePerformIO(rootProp)), R.andThen(() => bus.emit('removeCacheItem')), R.andThen(R.compose(setTimer, R.converge(setDisabledTime, [R.always(10)]))), R.andThen(handleResult), R.andThen(sendRequest), getParams);
        return () => createVNode$1(TeleportBtn, {
            clickHandler: setCache,
            dynamicColumn: props.dynamicColumn,
            selector: rootProp.setCacheBtn,
            disabledState
        }, R.objOf('default', R.nAry(0, content)), PATCH_FLAG.PROPS, ['selector', 'dynamicColumn']);
    }
});

var CxTableTitle = defineComponent({
    name: 'CxTableTitle',
    setup() {
        const rootProp = inject('rootProp');
        const hoisted_1 = { class: 'cx_secondary_title cx_ptb_16' };
        return () => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    rootProp.title
                        ? createVNode$1('h3', hoisted_1, rootProp.title, PATCH_FLAG.TEXT)
                        : createCommentVNode('v-if_title', true)
                ], PATCH_FLAG.STABLE_FRAGMENT));
        };
    }
});

const useDynamicConfigDialog = () => {
    const context = useCxTable().getContext();
    const getMessageInstance = (() => R.path(['messageInstance'], context));
    const totalList = ref$1([]);
    const departmentMap = computed(() => {
        return totalList.value.reduce((res, item) => {
            const tag = item.tag ?? '基本信息';
            if (Array.isArray(res[tag])) {
                res[tag].push(item);
            }
            else {
                res[tag] = [item];
            }
            return res;
        }, {});
    });
    const getDefaultData = () => ({
        居左固定字段: [],
        非固定字段: [],
        居右固定字段: []
    });
    const listMap = reactive$1(getDefaultData());
    const getDisabledKey = (item) => {
        if (!item)
            return '';
        const key = Object.keys(listMap).find(key => {
            return listMap[key].find(innerItem => innerItem.id === item.id);
        });
        if (key?.includes('居')) {
            return key;
        }
        else {
            return '';
        }
    };
    const checkedList = computed(() => {
        return Object.values(listMap).reduce((res, val) => {
            res.push(...val.map(item => item.id));
            return res;
        }, []);
    });
    const updateCheckedList = (val, id) => {
        if (val) {
            const item = totalList.value.find(item => item.id === id);
            item && listMap['非固定字段'].push(item);
        }
        else {
            Object.values(listMap).some(list => {
                const index = list.findIndex(item => item.id === id);
                if (index >= 0) {
                    list.splice(index, 1);
                    return true;
                }
            });
        }
    };
    const getData = async (dynamicConfig) => {
        if (!dynamicConfig)
            return console.warn('[dynamicConfigDialog]: invalid dynamicConfig');
        const { data } = await context.dynamicRequestInstance.get('/table/settings/get', dynamicConfig);
        totalList.value = data?.itemList ?? [];
        Object.assign(listMap, getDefaultData());
        data?.displayList?.forEach((item) => {
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
    };
    const submit = async (dynamicConfig) => {
        if (!dynamicConfig)
            return console.warn('[dynamicConfigDialog]: invalid dynamicConfig');
        const columnList = Object.entries(listMap).reduce((res, [key, val]) => {
            res.push(...val.map(item => ({
                id: item.id,
                fixed: key.includes('左') ? 'left' : key.includes('右') ? 'right' : undefined
            })));
            return res;
        }, []);
        const { state } = await context.dynamicRequestInstance.putJSON('/table/settings/save', {
            ...dynamicConfig,
            columnList
        });
        if (state !== 200)
            return Promise.reject();
        getMessageInstance().success('修改成功');
    };
    return {
        totalList,
        getDisabledKey,
        departmentMap,
        listMap,
        checkedList,
        updateCheckedList,
        getData,
        submit
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
var script$2 = defineComponent({
    name: 'ColumnSettingDialog',
    components: { Draggable },
    props: { dynamicList: { type: Array, required: true } },
    emits: ['submit'],
    install(app) {
        app.component('columnSettingDialog', this);
    },
    setup(props, { emit, expose }) {
        const [register, { openDialog }] = useCxDialog();
        const { DYNAMIC_BUSINESS_TYPE } = useCxTable().getContext().dynamicType;
        const { totalList, departmentMap, listMap, checkedList, updateCheckedList, getData, submit, getDisabledKey } = useDynamicConfigDialog();
        const activeTab = ref$1(0);
        const activeDynamicConfig = computed(() => {
            return props.dynamicList[activeTab.value];
        });
        const tabOptionList = computed(() => {
            return props.dynamicList?.map((config, index) => {
                return {
                    id: index,
                    name: DYNAMIC_BUSINESS_TYPE[config?.businessType ?? '']
                };
            });
        });
        const [open, openLoading] = useLoading(async () => {
            activeTab.value = 0;
            await fetchList();
        });
        const fetchList = async () => {
            if (!activeDynamicConfig.value)
                return;
            await getData(activeDynamicConfig.value);
            openDialog();
        };
        watch$1(activeTab, fetchList);
        expose({ open });
        const [submitData, submitLoading] = useLoading(async () => {
            if (!activeDynamicConfig.value)
                return;
            await submit(activeDynamicConfig.value);
            if (props.dynamicList?.length < 2) {
                openDialog(false);
            }
            emit('submit', activeDynamicConfig.value);
        });
        const header = computed(() => {
            return `设置${DYNAMIC_BUSINESS_TYPE[activeDynamicConfig.value?.dataType] ?? ''}显示字段`;
        });
        const onMove = (e) => {
            const { relatedContext, draggedContext } = e;
            const targetItem = relatedContext?.element;
            const currentItem = draggedContext?.element;
            const targetItemKey = getDisabledKey(targetItem);
            const currentItemKey = getDisabledKey(currentItem);
            return (!targetItemKey || targetItemKey === currentItemKey || listMap[targetItemKey]?.length < 3);
        };
        return {
            totalList,
            checkedList,
            updateCheckedList,
            listMap,
            tabOptionList,
            departmentMap,
            register,
            submitData,
            activeTab,
            submitLoading,
            open,
            openLoading,
            header,
            onMove
        };
    }
});

const _withScopeId = n => (pushScopeId("data-v-58476a20"),n=n(),popScopeId(),n);
const _hoisted_1$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("div", null, [
  /*#__PURE__*/createElementVNode("div", { class: "cx_flex_center cx_justify_between" }, [
    /*#__PURE__*/createElementVNode("div", { class: "cx_ptb_12 cx_pl_16 cx_flex_1" }, "可选属性"),
    /*#__PURE__*/createElementVNode("div", { class: "cx_ptb_12 cx_w_250" }, "已选属性")
  ]),
  /*#__PURE__*/createElementVNode("div", { class: "cx_line cx_w_100p cx_m_0" })
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
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("div", { class: "cx_line cx_m_0 cx_w_100p cx_mtb_6" }, null, -1 /* HOISTED */));
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
const _hoisted_10 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("i", { class: "iconfont icon-tuodong1 cx_mr_8" }, null, -1 /* HOISTED */));

function render$1(_ctx, _cache) {
  const _component_CxTab = resolveComponent("CxTab");
  const _component_ElCheckbox = resolveComponent("ElCheckbox");
  const _component_Draggable = resolveComponent("Draggable");
  const _component_BasicDialog = resolveComponent("BasicDialog");
  const _directive_loading = resolveDirective("loading");

  return (openBlock(), createBlock(_component_BasicDialog, {
    okLoading: _ctx.submitLoading,
    width: "1020px",
    onRegister: _ctx.register,
    top: "50px",
    title: _ctx.header,
    onOk: _ctx.submitData
  }, {
    default: withCtx(() => [
      (_ctx.tabOptionList?.length > 1)
        ? (openBlock(), createBlock(_component_CxTab, {
            key: 0,
            class: "cx_plr_16",
            level: "2",
            options: _ctx.tabOptionList,
            modelValue: _ctx.activeTab,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.activeTab) = $event))
          }, null, 8 /* PROPS */, ["options", "modelValue"]))
        : createCommentVNode("v-if", true),
      _hoisted_1$1,
      withDirectives(createElementVNode("div", _hoisted_2, [
        createElementVNode("section", _hoisted_3, [
          (openBlock(true), createElementBlock(Fragment$1, null, renderList(_ctx.departmentMap, (item, key) => {
            return (openBlock(), createElementBlock("div", {
              key: key,
              class: "cx_mtb_5"
            }, [
              createElementVNode("h3", _hoisted_4, toDisplayString(key), 1 /* TEXT */),
              (openBlock(true), createElementBlock(Fragment$1, null, renderList(item, (option) => {
                return (openBlock(), createElementBlock("div", {
                  key: option.id,
                  class: "cx_dp_ib cx_mtb_16 cx_w_130 cx_pl_12"
                }, [
                  createVNode$1(_component_ElCheckbox, {
                    "model-value": _ctx.checkedList?.includes(option.id),
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
        createElementVNode("section", _hoisted_6, [
          (openBlock(true), createElementBlock(Fragment$1, null, renderList(_ctx.listMap, (_, key, index) => {
            return (openBlock(), createElementBlock("div", { key: key }, [
              (index !== 0)
                ? (openBlock(), createElementBlock("div", _hoisted_7))
                : createCommentVNode("v-if", true),
              createElementVNode("h3", _hoisted_8, toDisplayString(key), 1 /* TEXT */),
              createVNode$1(_component_Draggable, {
                modelValue: _ctx.listMap[key],
                "onUpdate:modelValue": $event => ((_ctx.listMap[key]) = $event),
                "item-key": "id",
                group: "list",
                tag: "transition-group",
                "component-data": { tag: 'ul', name: 'flip-list', type: 'transition' },
                ghostClass: "cx_opacity_20",
                move: _ctx.onMove
              }, {
                item: withCtx(({ element }) => [
                  createElementVNode("li", _hoisted_9, [
                    _hoisted_10,
                    createTextVNode$1(toDisplayString(element.label), 1 /* TEXT */)
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
var script$1 = defineComponent({
    name: 'DynamicConfigSettings',
    components: { ColumnSettingDialog: script$2 },
    props: { dynamicConfig: { type: Object, requred: true } },
    emits: ['submit'],
    setup(_, { emit }) {
        const dialogRef = ref$1(null);
        const [open, openLoading] = useLoading(async () => {
            await dialogRef.value?.open?.();
        });
        const CxTable = inject('CxTable');
        const right = computed(() => {
            if (!CxTable)
                return 0;
            return CxTable.scrollStore.rightScrollBar ? CxTable.styleStore.CX_TABLE_SCROLL_BAR + 'px' : 0;
        });
        return {
            open,
            openLoading,
            submit: () => {
                emit('submit');
            },
            dialogRef,
            right
        };
    }
});

const _hoisted_1 = { class: "setting_btn cx_flex_center cx_justify_center" };

function render(_ctx, _cache) {
  const _component_CxBtn = resolveComponent("CxBtn");
  const _component_ElTooltip = resolveComponent("ElTooltip");
  const _component_ColumnSettingDialog = resolveComponent("ColumnSettingDialog");

  return (openBlock(), createElementBlock(Fragment$1, null, [
    createElementVNode("div", {
      style: normalizeStyle$1({ position: 'absolute', right: _ctx.right, top: 0, zIndex: 1500 })
    }, [
      createElementVNode("div", _hoisted_1, [
        createVNode$1(_component_ElTooltip, {
          effect: "dark",
          placement: "left-start",
          content: "设置表头字段"
        }, {
          default: withCtx(() => [
            createVNode$1(_component_CxBtn, {
              class: "cx_p_0",
              icon: "shezhi1",
              onClick: _ctx.open,
              loading: _ctx.openLoading
            }, null, 8 /* PROPS */, ["onClick", "loading"])
          ]),
          _: 1 /* STABLE */
        })
      ])
    ], 4 /* STYLE */),
    createVNode$1(_component_ColumnSettingDialog, {
      ref: "dialogRef",
      onSubmit: _ctx.submit,
      dynamicList: [_ctx.dynamicConfig]
    }, null, 8 /* PROPS */, ["onSubmit", "dynamicList"])
  ], 64 /* STABLE_FRAGMENT */))
}

script$1.render = render;
script$1.__scopeId = "data-v-7a79bc2a";
script$1.__file = "src/lib/cx-table/src/components/dynamicConfigSetting/index.vue";

var CxTableProp = {
    tableConfig: { type: Object, default: () => ({ items: [] }) },
    tableData: { type: Array, default: () => [] },
    /**
     * @description 显示底部总计
     */
    showTotalSum: { type: Boolean, default: false },
    /**
     * @description 显示悬浮底部总计
     */
    floatTotalSum: { type: Boolean, default: false },
    /**
     * @description 固定底部总计
     */
    fixTotalSum: { type: Boolean, default: false },
    /**
     * @description 集成分页器, 传入分页器参数对象即可开启, 可使用useCxPagination获得, 分页参数更新,将抛出paging事件
     */
    pagination: { type: Object, default: null },
    /**
     * @description 自定义总计行数据源, 将完全采用该对象作为合计行数据渲染
     */
    customTotalSum: { type: Object, default: null },
    /**
     * @description 最大高度,传入后将固定头部,可以是数字(将被自动格式化为px高度),也可以是任意描述高度的字符串,如 calc(100vh - 100px)
     */
    height: { type: [Number, String], default: '' },
    /**
     * @description 禁用所有输入类控件, 无法直接影响插槽, 可使用插槽scope中的disable属性判断
     */
    disabled: { type: Boolean, default: false },
    /**
     * @description 空行补位, 补位的空行没有键盘事件响应也无法聚焦
     */
    emptyLimit: { type: Number, default: 0 },
    /**
     * @description 控制colspan/rowspan, 函数类型, 入参为column,rowIndex,rowData, 返回{colspan:number,rowspan:number}对象或[rowspan,colspan]数组
     */
    spanMethod: { type: Function, default: null },
    /**
     * @description 显示添加按钮(特定需求使用,点击该按钮将抛出addNewRow事件)
     */
    showAddBtn: { type: String, default: '' },
    /**
     * @description 开启虚拟滚动, 表格行数较小不建议开启, 会消耗一定的额外性能, 且当其与spanMethod同时使用时,性能开销较大(但仍远小于长列表渲染),渲染前预计算spanMethod 10000行*20列约300ms
     */
    virtualScroll: { type: Boolean, default: false },
    /**
     * @description 表现为激活状态行的index列表, 该属性主要用于自定义行多选,行单选的情况,激活行默认表现为浅蓝色(可与集成单选/多选同时使用)
     */
    activeRows: { type: Array, default: () => [] },
    /**
     * @description 目标行/列隐藏控件, 无法直接影响插槽, 插槽可通过scope中的ignore属性自定义设置
     */
    ignoreControl: { type: Function, default: () => false },
    /**
     * @description 目标行/列强制显示控件,无法直接影响插槽, 插槽可通过scope中的isControl属性自定义设置
     */
    forceControl: { type: Function, default: () => false },
    /**
     * @description 默认样式配置,{width:默认单元格宽度,height:默认单元格高度,padding:单元格内左右padding,cache:虚拟滚动视口外缓冲行数}
     */
    styleSetting: { type: Object, default: () => ({}) },
    /**
     * @description 是否启用键盘事件,关闭后单元格将无法聚焦
     */
    keyboard: { type: Boolean, default: true },
    /**
     * @description 拓展行,可以是插槽名或一个返回插槽名的函数,入参为column,rowData,rowIndex,如果返回值为空,那么便不渲染,该功能可针对特定的某行开启拓展行.
     */
    expand: { type: [String, Function], default: '' },
    /**
     * @description 表格title, 聊胜于无的功能
     */
    title: { type: String, default: '' },
    /**
     * @description 是否开启懒加载, 默认为开启
     */
    lazy: { type: Boolean, default: true },
    /**
     * @description 是否使用宽度适配器提供的宽度,默认开启
     */
    widthAdaptor: { type: Boolean, default: true },
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
    configurable: { type: Boolean, default: true },
    /**
     * @description 是否显示表单控件
     */
    showForm: { type: Boolean, default: false },
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
    stripe: { type: Boolean, default: false }
};

var script = defineComponent({
    name: 'CxTable',
    props: CxTableProp,
    components: { Pagination },
    emits: CX_TABLE_EVENT_LIST,
    setup(props, { slots, emit, expose }) {
        // 根对象
        const $CxTable = createCxTableConfig();
        const { columnProxy, dynamicColumn, loading, forceUpdate } = useDynamicConfig(props);
        const searchLoading = ref$1(false);
        const { bus } = useBus($CxTable, props);
        const tid = useTableId().generateTableId();
        const { tableDataVisitor } = useCxSort(props);
        // 集成多选
        const { selectConfig, setCheckSelect, clearSelection, toggleRowSelection, toggleAllSelection, getSelectValue, getSelectAllValue, setSelectDisabled, updateSelectConfig } = useSelectConfig(tableDataVisitor);
        setCheckSelect(props.checkSelect);
        bus.on('toggleAllSelection', toggleAllSelection);
        bus.on('toggleRowSelection', toggleRowSelection);
        // 集成单选
        const { radioValue, removeRadio, setRadio, getRadio } = useRadioConfig();
        // 集成展开行
        const { expandConfig, setExpand, clearExpand } = useExpandConfig();
        // 表单校验
        const { validate } = useValidator($CxTable, props);
        const { setConfig, removeConfig, clearConfig, onSetConfig } = usePriorityConfig($CxTable);
        // 缓存
        // const { removeCache, setCache, getCache } = useCache(props);
        const { broadcast } = useBroadcast();
        const updateWidth = debounce(async () => {
            useAutoWidth($CxTable);
            await nextTick$1();
            scrollUpdateShadow($CxTable);
        }, 50);
        broadcast.registEntireListener(async (payload) => {
            const { prop } = payload;
            await nextTick$1();
            updateCxTableWidth($CxTable, props, prop);
            updateWidth();
            emit('broadcast', payload);
        });
        const exposeMethods = {
            // radio
            removeRadio,
            setRadio,
            getRadio,
            // checkbox
            clearSelection,
            toggleRowSelection,
            toggleAllSelection,
            getSelectValue,
            getSelectAllValue,
            setSelectDisabled,
            updateSelectConfig,
            // expand
            setExpand,
            clearExpand,
            // config
            setConfig,
            removeConfig,
            clearConfig,
            // validate
            validate,
            // update
            forceUpdate,
            // event
            triggerBroadcast: (prop, rowData) => {
                broadcast.trigger(prop, rowData, { prop, rowData });
            },
            focusCell: async ({ prop, rowData, rowIndex }) => {
                if (!prop)
                    return;
                if (!rowData && rowIndex == undefined)
                    return;
                if (props.virtualScroll) {
                    rowIndex = rowIndex ?? props.tableData.findIndex(data => data === rowData);
                    if (!isNumber(rowIndex) || !$CxTable.wrapperEle)
                        return;
                    const rowHeight = $CxTable.styleStore.CX_TABLE_HEIGHT;
                    $CxTable.wrapperEle.scrollTop = rowHeight * rowIndex;
                    await nextTick$1();
                }
                rowData = rowData ?? props.tableData[rowIndex];
                const column = $CxTable.flatColumns?.find(col => col.prop === prop);
                if (!column)
                    return;
                const cell = domShare.getCell($CxTable, column, rowData);
                setTimeout(() => {
                    cell?.click();
                });
            },
            // setCache,
            // getCache,
            // removeCache,
            removeCacheItem() {
                bus.emit('removeCacheItem');
            },
            search(payload) {
                bus.emit('search', payload);
            }
        };
        expose(exposeMethods);
        emit('register', { registerTarget: exposeMethods, props });
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
        const tableWrapper = ref$1(null);
        const tableVisible = ref$1(!props.lazy);
        onMounted$1(() => {
            if (!tableWrapper.value)
                return;
            $CxTable.wrapperEle = tableWrapper.value;
            const { updateColumn, updateData } = useWatch(props, $CxTable, columnProxy, tableWrapper, expandConfig, tableVisible);
            onSetConfig.push(updateColumn);
            onSetConfig.push(updateData);
            props.lazy && useLazyLoad(tableWrapper.value, tableVisible);
        });
        useRegister($CxTable, props, tableDataVisitor, tableWrapper, bus, tid);
        const _hoisted_1_class = 'cx-table_wrapper';
        const _hoisted_2_class = 'cx-table_scrollWrapper';
        const _hoisted_3_class = 'cx-table_border_line';
        const _hoisted_directive = resolveDirective('loading');
        const renderContent = (fixed) => {
            return createVNode$1(CxTableContent, { tableData: tableDataVisitor.sortedData, fixed }, null, PATCH_FLAG.PROPS, ['tableData']);
        };
        const renderTables = () => {
            const result = [];
            const { leftFixedColumns, rightFixedColumns } = $CxTable.columnStore;
            const { rightScrollBar, bottomScrollBar } = $CxTable.scrollStore;
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
        const renderBorderLine = () => {
            return createVNode$1('div', { class: _hoisted_3_class });
        };
        const renderEmpty = () => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    tableDataVisitor.sortedData.length || props.emptyLimit > 0 || props.showAddBtn
                        ? createCommentVNode('v-if_empty', true)
                        : createVNode$1(CxTableEmpty)
                ]));
        };
        const renderDynamicConfigSetting = () => {
            return (openBlock(),
                createBlock(Fragment$1, null, [
                    props.configurable && props.dynamic
                        ? createVNode$1(script$1, {
                            dynamicConfig: props.dynamic,
                            onSubmit: () => {
                                forceUpdate();
                                emit('dynamicSetting');
                            }
                        }, null, PATCH_FLAG.PROPS | PATCH_FLAG.NEED_PATCH, ['dynamicConfig'])
                        : createCommentVNode('v-if_dynamic_config', true)
                ]));
        };
        const renderTeleBtn = (comp) => {
            return createVNode$1(comp, { dynamicColumn: dynamicColumn.value, tableDataVisitor }, null, PATCH_FLAG.PROPS, ['dynamicColumn', 'tableDataVisitor']);
        };
        const placeHolderAttrs = computed(() => {
            const dataHeight = (props.tableData.length +
                +!!props.showTotalSum +
                invokeLayeredRow($CxTable.columns).length) *
                $CxTable.styleStore.CX_TABLE_HEIGHT;
            const height = formatWidth(props.height ? Math.min(dataHeight, isNaN(+props.height) ? 400 : +props.height) : dataHeight);
            return { style: { height } };
        });
        const innerStyle = computed(() => {
            return { maxHeight: isNumber(props.height) ? props.height + 'px' : props.height };
        });
        const { cssVariable } = useCSSVariable($CxTable);
        return (_, cache) => {
            return createVNode$1('div', { style: cssVariable.value, class: 'cx-table_container' }, [
                createVNode$1(CxTableTitle),
                (openBlock(),
                    createBlock(Fragment$1, null, [
                        props.setCacheBtn
                            ? renderTeleBtn(SetCacheBtn)
                            : createCommentVNode('v-if_set_cache_btn', true),
                        props.cacheListBtn
                            ? renderTeleBtn(CacheListBtn)
                            : createCommentVNode('v-if_cache_list_btn', true)
                    ])),
                (openBlock(),
                    createBlock(Fragment$1, null, [
                        props.showForm
                            ? createVNode$1(TeleForm, {
                                dynamicColumn: dynamicColumn.value,
                                tableDataVisitor,
                                loading: searchLoading.value,
                                'onUpdate:loading': (val) => (searchLoading.value = val)
                            }, null, PATCH_FLAG.PROPS, ['dynamicColumn', 'tableDataVisitor', 'loading'])
                            : createCommentVNode('v-if_form', true)
                    ])),
                createVNode$1('div', { tid, class: _hoisted_1_class }, [
                    withDirectives(createVNode$1('div', { class: _hoisted_2_class, style: innerStyle.value, ref: tableWrapper }, [
                        (openBlock(),
                            createBlock(Fragment$1, null, tableVisible.value
                                ? [
                                    renderTables(),
                                    renderEmpty(),
                                    cache[0] || (cache[0] = renderBorderLine()),
                                    renderDynamicConfigSetting()
                                ]
                                : [createVNode$1('div', placeHolderAttrs.value)]))
                    ], PATCH_FLAG.STYLE | PATCH_FLAG.NEED_PATCH), [[_hoisted_directive ?? {}, loading.value || searchLoading.value]])
                ], PATCH_FLAG.STYLE),
                (openBlock(),
                    createBlock(Fragment$1, null, [
                        props.floatTotalSum
                            ? createVNode$1('div', { class: _hoisted_1_class }, [
                                createVNode$1('div', { class: `${_hoisted_2_class} cx_of_hidden` }, [
                                    createVNode$1(CxTableBody, {
                                        tableData: tableDataVisitor.sortedData,
                                        onlyTotal: true,
                                        float: true,
                                        class: 'cx_mt_20',
                                        style: {
                                            right: `${$CxTable.scrollStore.scrollLeft + ''}px`,
                                            position: 'relative'
                                        }
                                    }, null, PATCH_FLAG.FULL_PROPS)
                                ])
                            ])
                            : createCommentVNode('v-if_float_total_sum', true)
                    ])),
                (openBlock(),
                    createBlock(Fragment$1, null, [
                        isObject$1(props.pagination)
                            ? createVNode$1(Pagination, {
                                pagination: props.pagination,
                                onPaging: cache[1] || (cache[1] = () => emit('paging'))
                            }, null, PATCH_FLAG.PROPS, ['pagination'])
                            : createCommentVNode('v-if_pagination', true)
                    ]))
            ], PATCH_FLAG.STYLE);
        };
    }
});

script.install = (app) => {
    app.component(script.name, script);
};
const _CX_TABLE = script;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CxBtn: _CX_BTN,
  CxTab: _CX_TAB,
  CxForm: _CX_FORM,
  CxDialog: _CX_DIALOG,
  CxTable: _CX_TABLE
});

// import '@babel/polyfill'
const CxUI = {
    install: app => {
        Object.values(components).forEach(component => {
            app.use(component);
        });
    }
};

export default CxUI;
export { ARROW_KEY, COLUMN_FLAG, CX_ADAPTOR_PRECISION_TYPE, CX_SORT_STATUS, CX_SPAN_METHOD_TYPE, CX_STYLE_SETTING, CX_TABLE_CACHE_PENDING, CX_TABLE_COLUMN_ID_PREPEND, CX_TABLE_COLUMN_KEY, CX_TABLE_DYNAMIC_CACHE, CX_TABLE_DYNAMIC_PROPS, CX_TABLE_EMPTY_INDEX, CX_TABLE_EVENT_LIST, CX_TABLE_ID_PREPEND, CX_TABLE_INPUT_TYPE, CX_TABLE_NOT_HOVER_ID, CX_TABLE_PER_CHAR_WIDTH, CX_TABLE_ROW_ID_PREPEND, CX_TABLE_ROW_KEY, CX_TABLE_SUM_INDEX, CX_TABLE_SUM_ROW_KEY, CX_TABLE_THROTTLE_DURATION, CX_TABLE_VISUAL_ROW_KEY, CxBroadcast, _CX_BTN as CxBtn, CxConfigAdaptor, _CX_DIALOG as CxDialog, _CX_FORM as CxForm, _CX_TAB as CxTab, _CX_TABLE as CxTable, CxTableActiveControl, CxTableRendererMap, EventBus, EventBusCreator, PATCH_FLAG, TypeOption, arrFlat, assignAttrs, changeDynamicIdToText, copySort, cxFormRender, cxTableWarn, debounce, deepMerge, domShare, eventBus, findAncestor, formatDate, formatFormDefaultValue, formatTime, formatWidth, getColumnSelectText, getCxDynamicHead, getDateRange, getFunctionAttrs, getParentColumn, getPreOrNextItem, getStatusAttrs, getStringWidth, getSums, getTargetColumn, getTotalSumData, invokeLayeredRow, is, isArray$1 as isArray, isBoolean, isDate, isEmpty, isFunction$1 as isFunction, isNull, isNumber, isObject$1 as isObject, isString$1 as isString, pick, toggleArrState, updateCxTableWidth, useAutoWidth, useBroadcast, useBus, useCSSVariable, useCalcSpanMethod, useColumn, useColumnValidity, useCopy, useCxDialog, useCxForm, useCxPagination, useCxSort, useCxTable, useCxTableCompose, useDynamicConfig, useExpandConfig, useLazyLoad, usePriorityConfig, useRadioConfig, useRegister, useRowDataValidity, useScrollState, useSelectConfig, useStyle, useTableClass, useTableId, useTableStyle, useValidator, useWatch };
