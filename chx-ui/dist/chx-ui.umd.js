!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["well-bricks"]={},t.Vue)}(this,(function(t,e){"use strict";var n=e.defineComponent({name:"CxBtn",props:{size:{type:String,default:"medium"},level:{type:[String,Number],default:"2"},type:{type:String,default:"primary"},content:{type:String,default:""},icon:{type:String,default:""},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup:function(t,n){var r=n.slots,o=e.computed((function(){var e=["cx-btn_wrapper"];return t.disabled&&e.push("cx-btn_disabled"),e.push("cx-btn_"+t.size),e.push("cx-btn_level_"+t.level),e.push("cx-btn_"+t.type),t.loading&&e.push("cx-btn_loading"),e}));return function(n,i){return e.createVNode("button",{type:"button",class:o.value,onClick:i[0]?i[0]:i[0]=function(e){if(e.preventDefault(),t.disabled)return!1}},[t.loading?i[1]?i[1]:i[1]=e.createVNode("i",{class:"el-icon-loading"}):e.createCommentVNode("v-if",!0),t.icon?(l=t.icon,e.createVNode("i",{class:"iconfont icon-"+l},null,2)):e.createCommentVNode("v-if",!0),r.default?r.default({}):t.content,t.disabled?i[2]?i[2]:i[2]=e.createVNode("i",{onClick:function(t){return t.stopPropagation()},class:"cx_mask"}):e.createCommentVNode("v-if",!0)],514);var l}}});n.install=function(t){t.component(n.name,n)};var r=n,o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};
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
  ***************************************************************************** */function i(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var l=function(){return(l=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function a(t,e,n,r){return new(n||(n=Promise))((function(o,i){function l(t){try{c(r.next(t))}catch(t){i(t)}}function a(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(l,a)}c((r=r.apply(t,e||[])).next())}))}function c(t,e){var n,r,o,i,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,r=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(!(o=l.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){l=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){l.label=i[1];break}if(6===i[0]&&l.label<o[1]){l.label=o[1],o=i;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(i);break}o[2]&&l.ops.pop(),l.trys.pop();continue}i=e.call(t,l)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function s(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)l.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return l}function u(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(s(arguments[e]));return t}var f=Object.prototype.toString;function d(t,e){return f.call(t)==="[object "+e+"]"}var p=function(t){return null!==t&&d(t,"Object")};var v=function(t){return"function"==typeof t},h=e.defineComponent({name:"CxTab",props:{level:{type:[String,Number],default:"1"},modelValue:{type:[Number,String],default:0},options:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},badgeObj:{type:Object,default:function(){return{}}}},emits:["update:modelValue","change"],setup:function(t,n){var r=this,o=n.emit,i=n.slots,l=e.computed((function(){return t.options.filter((function(t){return p(t)?!t.hide:t})).map((function(t){return p(t)?t:{id:t,name:t}}))})),s=function(){return l.value.map((function(n){var r,i,l,a=["cx-tab_item","clickable","cx_flex_center"];t.modelValue===n.id&&a.push("cx-tab_item_active");var c=null!==(i=t.badgeObj[null!==(r=n.badgeKey)&&void 0!==r?r:""])&&void 0!==i?i:0,s=null!==(l=n.unit)&&void 0!==l?l:"";return c>=100&&(c="99+"),e.createVNode("div",{onClick:function(){var e;(e=n.id)!==t.modelValue&&(t.disabled||(o("update:modelValue",e),o("change",e)))},class:a},[n.name,c?e.createVNode("div",{class:"cx-tab_badge_"+t.level},""+c+s,3):e.createCommentVNode("v-if_badge",!0)],514)}))},u=e.ref(null),f=function(t){var n=["cx-tab_"+t+"_arrow","iconfont","cx_flex_center","left"===t?"icon-xiangzuo":"icon-xiangyou"];return e.createVNode("div",{onClick:function(){if(u.value)var e=300,n=e/10,r=setInterval((function(){if(u.value){var o=u.value.scrollLeft+("left"===t?-n:n);u.value.scrollTo(o,0);var i="left"===t?o<=0:o>=u.value.scrollWidth-u.value.clientWidth;0===e||i?clearInterval(r):e<=3?e=0:n=(e-=e/10)/10}}),10)},class:n},null,514)},d=function(){if(u.value){var t=u.value.querySelector(".cx-tabs");if(t){var e=u.value.clientWidth;return t.clientWidth>e}}},v=e.ref(d());return e.watch((function(){return l.value}),(function(){return a(r,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,e.nextTick()];case 1:return t.sent(),v.value=d(),[2]}}))}))}),{deep:!0,immediate:!0}),function(n,r){var o=["cx-tab_scroll_wrapper","cx_flex_center","cx_justify_between","level-"+t.level+"_wrapper"];return v.value&&o.push("cx_plr_20"),t.disabled&&o.push("cx-tab_disabled"),e.createVNode("div",{class:o},[e.createVNode("div",{class:"cx-tab_wrapper",ref:u},[e.createVNode("div",{class:"cx-tabs"},s())],512),v.value?r[0]||(r[0]=f("left")):e.createCommentVNode("v-if_left_arrow",!0),v.value?r[1]||(r[1]=f("right")):e.createCommentVNode("v-if_right_arrow",!0),e.createVNode("div",{class:"cx-tab_extension"},[i.ext&&i.ext()])],2)}}});h.install=function(t){t.component(h.name,h)};var m=h;function y(t,e){return p(t)?Object.keys(t).reduce((function(n,r){return e.includes(r)||Reflect.set(n,r,t[r]),n}),{}):t}var g,b=function(t,n,r){return e.openBlock(),e.createBlock(e.Fragment,null,[r?v(r)?r(y(t,["__closable","__emit","__prop"])):e.createVNode(r,y(t,["__closable","__emit","__prop"]),n,16):e.createCommentVNode("v-if_component",!0)])},_=function(){function t(){this.renderComp=b}return t.prototype.renderControl=function(t,n,r){return e.createVNode("div",{style:{position:"relative"}},[b(t,n,r),t.__closable?e.createVNode("i",{style:{position:"absolute",right:"-3px",top:"-3px"},class:"iconfont icon-shanchu",onClick:function(){v(t.__emit)&&t.__emit("close",t.__prop)}}):e.createCommentVNode("v-if_closable",!0)])},t}(),x=(g=null,function(){return g||(g=new _),g}),R=function(){function t(){this.name="",this.slots={},this.attrs={}}return t.prototype.init=function(){return this.propAdaptor(),this},t.prototype.propAdaptor=function(){throw new Error("请重写propAdaptor方法")},t.prototype.addSlots=function(t){return"function"==typeof t?Reflect.set(this.slots,"default",t):"object"==typeof t&&Object.assign(this.slots,t),this},t.prototype.renderVNode=function(t){return x().renderComp(this.attrs,this.slots,t)},t.prototype.renderControl=function(t){return x().renderControl(this.attrs,this.slots,t)},t.prototype.render=function(){throw new Error("请重写render方法")},t}(),w=function(t){function e(e){return t.call(this,"CxFormError: "+e)||this}return i(e,t),e}(Error),C=new Map,V=function(){var t,e;return{register:function(n){var r=n.props,o=n.ref;t=o,e=r},getFormRef:function(){return t},setFormConfig:function(t,n,r){if(!e)throw new w("can't set property before regist");var o=null==e?void 0:e.items.find((function(e){return e.prop===t}));return o?Reflect.has(o,n)?Reflect.set(o,n,r):void u(C.keys()).find((function(t){var e=Reflect.get(o,t);if(p(e)){if("options"===n){if(!Array.isArray(r))throw new w("can't set options with non-array");var i=Reflect.get(e,"options");Array.isArray(i)?(i.splice(0),i.push.apply(i,u(r))):Reflect.set(e,"options",r),Reflect.set(e,"key",Date.now())}else Reflect.set(e,n,r);return!0}})):console.warn("[cxForm warn]: prop "+t+" isn't exist on this form's configList ")},registerRenderer:function(t){var e=t.comp,n=t.type,r=t.adaptor;C.set(n,{comp:e,adaptor:r})},getRenderer:function(t){return C.get(t)},getRendererKeys:function(){return C.keys()}}},N=function(t){function n(e,n,r){var o=t.call(this)||this;return o.name="CxFormControl",o.parse=null,o.attrs={},o.type="",o.form=e,o.config=n,o.rootConfig=r,o.prop=n.prop,o.init(),o}return i(n,t),n.prototype.init=function(){return this.propAdaptor().bindModel(),this},n.prototype.addSlots=function(t){var e,n,r,o=this;if(!p(t))return this;p(null===(e=this.config)||void 0===e?void 0:e.slot)&&Object.entries(this.config.slot).forEach((function(e){var n=s(e,2),r=n[0],i=n[1];Reflect.set(o.slots,r,Reflect.get(t,i))}));var i=null===(r=null===(n=this.config)||void 0===n?void 0:n.custom)||void 0===r?void 0:r.slot;return i&&Reflect.set(this.slots,i,Reflect.get(t,i)),this},n.prototype.bindModel=function(){var t=this;return this.prop&&(Reflect.set(this.attrs,"modelValue",this.form[this.prop]),Reflect.set(this.attrs,"onUpdate:modelValue",(function(e){Array.isArray(e)?e=e.map((function(e){return t.parse?t.parse(e):e})):e&&(e=t.parse?t.parse(e):e),Reflect.set(t.form,t.prop,e)}))),this},n.prototype.propAdaptor=function(){var t,n,r,o,i=this,l=V(),a=l.getRendererKeys,c=l.getRenderer;u(a()).find((function(t){var e;if(p(Reflect.get(i.config,t))){var n=(null!==(e=c(t))&&void 0!==e?e:{}).adaptor;return i.type=t,v(n)?n.apply(i):Object.assign(i.attrs,Reflect.get(i.config,t)),!0}}));var s=Reflect.get(null!==(t=this.config)&&void 0!==t?t:{},"placeholder");s&&Reflect.set(this.attrs,"placeholder",s);var f=e.useContext().emit;return Reflect.set(this.attrs,"onChange",(function(t){var e,n,r={prop:i.prop,val:t,form:i.form};Array.isArray(i.attrs.options)&&Reflect.set(r,"option",i.attrs.options.find((function(e){return e.id===t}))),v(f)&&f("change",r),v(null===(e=i.config)||void 0===e?void 0:e.onChange)&&(null===(n=i.config)||void 0===n||n.onChange(r))})),!p(null===(n=this.attrs)||void 0===n?void 0:n.style)&&Reflect.set(this.attrs,"style",{}),this.config.width&&p(null===(r=this.attrs)||void 0===r?void 0:r.style)&&Reflect.set(this.attrs.style,"width",this.config.width+"px"),Reflect.set(this.attrs,"__closable",(null===(o=this.rootConfig)||void 0===o?void 0:o.closable)||this.config.closable),Reflect.set(this.attrs,"__emit",f),Reflect.set(this.attrs,"__prop",this.prop),this},n.prototype.render=function(){var t,e,n,r,o;if("custom"===this.type)o=Reflect.get(this.slots,null!==(n=null===(e=null===(t=this.config)||void 0===t?void 0:t.custom)||void 0===e?void 0:e.slot)&&void 0!==n?n:"");else{var i=null===(r=V().getRenderer(this.type))||void 0===r?void 0:r.comp;o=v(i)?i():i}return this.renderControl(o)},n}(R),j=function(){return{size:"small",labelSuffix:":",labelPosition:"left",onSubmit:function(t){return t.preventDefault()}}},O=function(t){function n(n){var r=t.call(this)||this;return r.name="CxForm",r.attrs={},r.ref=e.ref(null),r.config=n,r.init(),r}return i(n,t),n.prototype.getFormRef=function(){return this.ref},n.prototype.propAdaptor=function(){var t,e,n,r;return Object.assign(this.attrs,j(),y(this.config,["items"])),Reflect.set(this.attrs,"ref",this.ref),Reflect.set(this.attrs,"model",null!==(e=null===(t=this.config)||void 0===t?void 0:t.form)&&void 0!==e?e:{}),Reflect.set(this.attrs,"rules",null===(r=null===(n=this.config)||void 0===n?void 0:n.items)||void 0===r?void 0:r.reduce((function(t,e){return e.rule&&Reflect.set(t,e.prop,e.rule),t}),{})),this},n.prototype.render=function(){var t,n,r=null!==(n=null===(t=V().getRenderer("form"))||void 0===t?void 0:t.comp)&&void 0!==n?n:e.resolveComponent("ElForm");return this.renderVNode(r)},n}(R),S=function(t){function n(e){var n=t.call(this)||this;return n.name="CxFormItem",n.attrs={},n.config=e,n.init(),n}return i(n,t),n.prototype.addSlots=function(t){var e=this;if(p(t)){var n={default:t.default};this.config.labelSlot&&Reflect.set(n,"label",(function(){var n;return null===(n=t[e.config.labelSlot])||void 0===n?void 0:n.call(t,l({},e.config))})),Object.assign(this.slots,n)}return this},n.prototype.propAdaptor=function(){var t,e,n,r,o,i,l,a,c,s,u;return d(null===(t=this.config)||void 0===t?void 0:t.spacing,"Number")&&Reflect.set(this.attrs,"style",{paddingRight:(null===(e=this.config)||void 0===e?void 0:e.spacing)+"px"}),Object.assign(this.attrs,null!==(r=null===(n=this.config)||void 0===n?void 0:n.itemAttrs)&&void 0!==r?r:{}),(null===(o=this.config)||void 0===o?void 0:o.labelWidth)&&Reflect.set(this.attrs,"labelWidth",this.config.labelWidth+"px"),Reflect.set(this.attrs,"label",null!==(l=null===(i=this.config)||void 0===i?void 0:i.label)&&void 0!==l?l:""),Reflect.set(this.attrs,"prop",null!==(c=null===(a=this.config)||void 0===a?void 0:a.prop)&&void 0!==c?c:""),Reflect.set(this.attrs,"key",null!==(u=null===(s=this.config)||void 0===s?void 0:s.prop)&&void 0!==u?u:""),this},n.prototype.render=function(){var t,n,r=null!==(n=null===(t=V().getRenderer("formItem"))||void 0===t?void 0:t.comp)&&void 0!==n?n:e.resolveComponent("ElFormItem");return this.renderVNode(r)},n}(R),k={form:{type:Object,default:function(){return{}}},inline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},closable:{type:Boolean,default:!1},items:{type:Array,default:function(){return[]}},class:{type:[Array,Object,String],default:function(){return[]}}},A=e.defineComponent({props:k,name:"CxForm",emits:["change","register","close"],setup:function(t,n){var r=n.slots,o=n.emit;function i(e){return new N(t.form,e,t).addSlots(r).render()}function a(){var e=new O(t).addSlots((function(){var e;return null===(e=t.items)||void 0===e?void 0:e.reduce((function(t,e){return!e.hide&&t.push(function(t){var e=l(l({},r),{default:function(){return[i(t)]}});return new S(t).addSlots(e).render()}(e)),t}),[])}));return o("register",{props:t,ref:e.getFormRef()}),e.render()}return(0,n.expose)({trigger:function(e){o("change",{prop:e,val:t.form[e]})}}),function(){return e.createVNode("div",{name:"cx-form"},[a()])}}});A.install=function(t){t.component(A.name,A)};var F=A,B=Object.freeze({__proto__:null,CxBtn:r,CxTab:m,CxForm:F}),E={install:function(t){Object.values(B).forEach((function(e){t.use(e)}))}},P=B;t.comps=P,t.cxFormRender=x,t.default=E,t.useCxForm=V,Object.defineProperty(t,"__esModule",{value:!0})}));
