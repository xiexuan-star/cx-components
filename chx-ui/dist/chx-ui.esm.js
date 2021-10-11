import { defineComponent, computed, createVNode, createCommentVNode, ref, onMounted, onBeforeUnmount, watch, nextTick, openBlock, createBlock, Fragment, resolveComponent, createElementBlock } from 'vue';

var script$4 = defineComponent({
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
            return createVNode('button', {
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
            ], 2 /* CLASS */ | 512 /* NEED_PATCH */);
        };
    },
});
script$4.install = function (app) {
    app.component(script$4.name, script$4);
};
var _CX_BTN = script$4;

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

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var toString = Object.prototype.toString;
function is(val, type) {
    return toString.call(val) === "[object " + type + "]";
}
var isObject = function (val) {
    return val !== null && is(val, 'Object');
};
function isNumber(val) {
    return is(val, 'Number');
}
// eslint-disable-next-line @typescript-eslint/ban-types
var isFunction = function (val) { return typeof val === 'function'; };

var script$3 = defineComponent({
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
        var tabs = computed(function () {
            return props.options
                .filter(function (item) {
                return isObject(item) ? !item.hide : item;
            })
                .map(function (item) {
                return isObject(item) ? item : { id: item, name: item };
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
                return createVNode('div', { onClick: function () { return clickHandle(item.id); }, "class": classList }, [
                    item.name,
                    badgeValue
                        ? createVNode('div', { "class": "cx-tab_badge_" + props.level }, "" + badgeValue + badgeUnit, 2 /* CLASS */ | 1 /* TEXT */)
                        : createCommentVNode('v-if_badge', true),
                ], 512 /* NEED_PATCH */ | 2 /* CLASS */);
            });
        };
        var wrapRef = ref(null);
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
            return createVNode('div', { onClick: onClick, "class": classList }, null, 512 /* NEED_PATCH */ | 2 /* CLASS */);
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
        var showArrow = ref(isShowArrow());
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
        onMounted(function () {
            window.addEventListener('resize', tabsResize);
        });
        onBeforeUnmount(function () {
            window.removeEventListener('resize', tabsResize);
        });
        watch(function () { return tabs.value; }, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nextTick()];
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
            return createVNode('div', { "class": classList }, [
                createVNode('div', { "class": 'cx-tab_wrapper', ref: wrapRef }, [createVNode('div', { "class": 'cx-tabs' }, renderItems())], 512 /* NEED_PATCH */),
                showArrow.value
                    ? cache[0] || (cache[0] = renderArrow('left'))
                    : createCommentVNode('v-if_left_arrow', true),
                showArrow.value
                    ? cache[1] || (cache[1] = renderArrow('right'))
                    : createCommentVNode('v-if_right_arrow', true),
                createVNode('div', { "class": 'cx-tab_extension' }, [slots.ext && slots.ext()])
            ], 2 /* CLASS */);
        };
    },
});
script$3.install = function (app) {
    app.component(script$3.name, script$3);
};
var _CX_TAB = script$3;

function omit(target, keys) {
    if (!isObject(target))
        return target;
    return Object.keys(target).reduce(function (res, key) {
        if (!keys.includes(key)) {
            Reflect.set(res, key, target[key]);
        }
        return res;
    }, {});
}

var renderComp = function (attrs, slots, Comp) {
    return (openBlock(),
        createBlock(Fragment, null, [
            Comp
                ? isFunction(Comp)
                    ? (function () {
                        var prop = attrs.__prop;
                        var nodes = Comp(Object.assign(omit(attrs, ['__closable', '__emit', '__prop']), { prop: prop }));
                        // nodes?.forEach?.((node: any) => {
                        //   !node.props && Reflect.set(node, 'props', {});
                        //   Object.assign(node?.props, omit(attrs,['closable']));
                        //   node.PatchFlags = PatchFlags.FULL_PROPS;
                        // });
                        return nodes;
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
    // let _cache: CxFormCache | undefined;
    var register = function (payload) {
        var config = payload.props, ref = payload.ref;
        _instance = ref;
        _config = config;
        // _cache = cache;
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
        __spread(CxFormRenderMap.keys()).find(function (type) {
            var typeAttrs = Reflect.get(item, type);
            if (!isObject(typeAttrs))
                return;
            if (attr === 'options') {
                if (!Array.isArray(val))
                    throw new CxFormError("can't set options with non-array");
                var options = Reflect.get(typeAttrs, 'options');
                Array.isArray(options) ? (options.splice(0), options.push.apply(options, __spread(val))) : Reflect.set(typeAttrs, 'options', val);
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
        register: register,
        getFormRef: getFormRef,
        setFormConfig: setFormConfig,
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
        if (!isObject(slots))
            return this;
        isObject((_a = this.config) === null || _a === void 0 ? void 0 : _a.slot) &&
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
        __spread(getRendererKeys()).find(function (type) {
            var _a;
            if (!isObject(Reflect.get(_this.config, type)))
                return;
            var adaptor = ((_a = getRenderer(type)) !== null && _a !== void 0 ? _a : {}).adaptor;
            _this.type = type;
            isFunction(adaptor) ? adaptor.apply(_this) : Object.assign(_this.attrs, Reflect.get(_this.config, type));
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
        !isObject((_b = this.attrs) === null || _b === void 0 ? void 0 : _b.style) && Reflect.set(this.attrs, 'style', {});
        this.config.width && isObject((_c = this.attrs) === null || _c === void 0 ? void 0 : _c.style) && Reflect.set(this.attrs.style, 'width', this.config.width + "px");
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
        if (isObject(slots)) {
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
            var slot = function () { var _a; return (_a = props.items) === null || _a === void 0 ? void 0 : _a.reduce(function (res, itemConfig) {
                !itemConfig.hide && res.push(renderFormItem(itemConfig));
                return res;
            }, []); };
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
            return createVNode('div', { name: 'cx-form' }, [renderForm()]);
        };
    },
});

var script$2 = CxForm;
script$2.install = function (app) {
    app.component(script$2.name, script$2);
};
var _CX_FORM = script$2;

//

var script$1 = defineComponent({
  setup() {
    return {}
  },
});

function render(_ctx, _cache) {
  return (openBlock(), createElementBlock("div"))
}

script$1.render = render;
script$1.__file = "src/lib/temp/component.vue";

var script = defineComponent({
    name: 'Temp',
    setup: function (props, _a) {
        _a.slots;
        return openBlock(), createBlock(script$1);
    }
});
script.install = function (app) {
    app.component(script.name, script);
};
var _CX_TEMP = script;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CxBtn: _CX_BTN,
  CxTab: _CX_TAB,
  CxForm: _CX_FORM,
  Temp: _CX_TEMP
});

var CxUI = {
    install: function (app) {
        Object.values(components).forEach(function (component) {
            app.use(component);
        });
    },
};

export default CxUI;
export { _CX_BTN as CxBtn, _CX_FORM as CxForm, _CX_TAB as CxTab, _CX_TEMP as Temp, cxFormRender, useCxForm };
