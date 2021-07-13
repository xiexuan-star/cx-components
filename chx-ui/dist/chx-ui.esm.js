import{defineComponent as t,computed as e,createVNode as n,createCommentVNode as r,ref as i,watch as o,nextTick as s,openBlock as u,createBlock as a,Fragment as l,useContext as c,resolveComponent as f}from"vue";var d=t({name:"CxBtn",props:{size:{type:String,default:"medium"},level:{type:[String,Number],default:"2"},type:{type:String,default:"primary"},content:{type:String,default:""},icon:{type:String,default:""},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup:function(t,i){var o=i.slots,s=e((function(){var e=["cx-btn_wrapper"];return t.disabled&&e.push("cx-btn_disabled"),e.push("cx-btn_"+t.size),e.push("cx-btn_level_"+t.level),e.push("cx-btn_"+t.type),t.loading&&e.push("cx-btn_loading"),e}));return function(e,i){return n("button",{type:"button",class:s.value,onClick:i[0]?i[0]:i[0]=function(e){if(e.preventDefault(),t.disabled)return!1}},[t.loading?i[1]?i[1]:i[1]=n("i",{class:"el-icon-loading"}):r("v-if",!0),t.icon?(u=t.icon,n("i",{class:"iconfont icon-"+u},null,2)):r("v-if",!0),o.default?o.default({}):t.content,t.disabled?i[2]?i[2]:i[2]=n("i",{onClick:function(t){return t.stopPropagation()},class:"cx_mask"}):r("v-if",!0)],514);var u}}});d.install=function(t){t.component(d.name,d)};var p=d,h=function(t,e){return(h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};
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
***************************************************************************** */function v(t,e){function n(){this.constructor=t}h(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var y=function(){return(y=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function g(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{a(r.next(t))}catch(t){o(t)}}function u(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,u)}a((r=r.apply(t,e||[])).next())}))}function m(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}function b(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)s.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s}function $(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(b(arguments[e]));return t}var w=Object.prototype.toString;function _(t,e){return w.call(t)==="[object "+e+"]"}var x=function(t){return null!==t&&_(t,"Object")};var S=function(t){return"function"==typeof t},M=t({name:"CxTab",props:{level:{type:[String,Number],default:"1"},modelValue:{type:[Number,String],default:0},options:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},badgeObj:{type:Object,default:function(){return{}}}},emits:["update:modelValue","change"],setup:function(t,u){var a=this,l=u.emit,c=u.slots,f=e((function(){return t.options.filter((function(t){return x(t)?!t.hide:t})).map((function(t){return x(t)?t:{id:t,name:t}}))})),d=function(){return f.value.map((function(e){var i,o,s,u=["cx-tab_item","clickable","cx_flex_center"];t.modelValue===e.id&&u.push("cx-tab_item_active");var a=null!==(o=t.badgeObj[null!==(i=e.badgeKey)&&void 0!==i?i:""])&&void 0!==o?o:0,c=null!==(s=e.unit)&&void 0!==s?s:"";return a>=100&&(a="99+"),n("div",{onClick:function(){var n;(n=e.id)!==t.modelValue&&(t.disabled||(l("update:modelValue",n),l("change",n)))},class:u},[e.name,a?n("div",{class:"cx-tab_badge_"+t.level},""+a+c,3):r("v-if_badge",!0)],514)}))},p=i(null),h=function(t){return n("div",{onClick:function(){if(p.value)var e=300,n=e/10,r=setInterval((function(){if(p.value){var i=p.value.scrollLeft+("left"===t?-n:n);p.value.scrollTo(i,0);var o="left"===t?i<=0:i>=p.value.scrollWidth-p.value.clientWidth;0===e||o?clearInterval(r):e<=3?e=0:n=(e-=e/10)/10}}),10)},class:["cx-tab_"+t+"_arrow","iconfont","cx_flex_center","left"===t?"icon-xiangzuo":"icon-xiangyou"]},null,514)},v=function(){if(p.value){var t=p.value.querySelector(".cx-tabs");if(t){var e=p.value.clientWidth;return t.clientWidth>e}}},y=i(v());return o((function(){return f.value}),(function(){return g(a,void 0,void 0,(function(){return m(this,(function(t){switch(t.label){case 0:return[4,s()];case 1:return t.sent(),y.value=v(),[2]}}))}))}),{deep:!0,immediate:!0}),function(){var e=["cx-tab_scroll_wrapper","cx_flex_center","cx_justify_between","level-"+t.level+"_wrapper"];return y.value&&e.push("cx_plr_20"),t.disabled&&e.push("cx-tab_disabled"),n("div",{class:e},[y.value?h("left"):r("v-if_left_arrow",!0),n("div",{class:"cx-tab_wrapper",ref:p},[n("div",{class:"cx-tabs"},d())],512),y.value?h("right"):r("v-if_right_arrow",!0),n("div",{class:"cx-tab_extension"},[c.ext&&c.ext()])],2)}}});M.install=function(t){t.component(M.name,M)};var O,R=M;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;(function(t,e){t.exports=function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",o="minute",s="hour",u="day",a="week",l="month",c="quarter",f="year",d="date",p="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},g=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},m={s:g,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+g(r,2,"0")+":"+g(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,l),o=n-i<0,s=e.clone().add(r+(o?-1:1),l);return+(-(r+(n-i)/(o?i-s:s-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:f,w:a,d:u,D:d,h:s,m:o,s:i,ms:r,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},b="en",$={};$[b]=y;var w=function(t){return t instanceof M},_=function(t,e,n){var r;if(!t)return b;if("string"==typeof t)$[t]&&(r=t),e&&($[t]=e,r=t);else{var i=t.name;$[i]=t,r=i}return!n&&r&&(b=r),r||!n&&b},x=function(t,e){if(w(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new M(n)},S=m;S.l=_,S.i=w,S.w=function(t,e){return x(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var M=function(){function y(t){this.$L=_(t.locale,null,!0),this.parse(t)}var g=y.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,o=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return S},g.isValid=function(){return!(this.$d.toString()===p)},g.isSame=function(t,e){var n=x(t);return this.startOf(e)<=n&&n<=this.endOf(e)},g.isAfter=function(t,e){return x(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<x(t)},g.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var n=this,r=!!S.u(e)||e,c=S.p(t),p=function(t,e){var i=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(u)},h=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,y=this.$M,g=this.$D,m="set"+(this.$u?"UTC":"");switch(c){case f:return r?p(1,0):p(31,11);case l:return r?p(1,y):p(0,y+1);case a:var b=this.$locale().weekStart||0,$=(v<b?v+7:v)-b;return p(r?g-$:g+(6-$),y);case u:case d:return h(m+"Hours",0);case s:return h(m+"Minutes",1);case o:return h(m+"Seconds",2);case i:return h(m+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var n,a=S.p(t),c="set"+(this.$u?"UTC":""),p=(n={},n[u]=c+"Date",n[d]=c+"Date",n[l]=c+"Month",n[f]=c+"FullYear",n[s]=c+"Hours",n[o]=c+"Minutes",n[i]=c+"Seconds",n[r]=c+"Milliseconds",n)[a],h=a===u?this.$D+(e-this.$W):e;if(a===l||a===f){var v=this.clone().set(d,1);v.$d[p](h),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[S.p(t)]()},g.add=function(r,c){var d,p=this;r=Number(r);var h=S.p(c),v=function(t){var e=x(p);return S.w(e.date(e.date()+Math.round(t*r)),p)};if(h===l)return this.set(l,this.$M+r);if(h===f)return this.set(f,this.$y+r);if(h===u)return v(1);if(h===a)return v(7);var y=(d={},d[o]=e,d[s]=n,d[i]=t,d)[h]||1,g=this.$d.getTime()+r*y;return S.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=S.z(this),o=this.$H,s=this.$m,u=this.$M,a=n.weekdays,l=n.months,c=function(t,n,i,o){return t&&(t[n]||t(e,r))||i[n].substr(0,o)},f=function(t){return S.s(o%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:S.s(u+1,2,"0"),MMM:c(n.monthsShort,u,l,3),MMMM:c(l,u),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,a,2),ddd:c(n.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(o),HH:S.s(o,2,"0"),h:f(1),hh:f(2),a:d(o,s,!0),A:d(o,s,!1),m:String(s),mm:S.s(s,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:i};return r.replace(v,(function(t,e){return e||h[t]||i.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(r,d,p){var h,v=S.p(d),y=x(r),g=(y.utcOffset()-this.utcOffset())*e,m=this-y,b=S.m(this,y);return b=(h={},h[f]=b/12,h[l]=b,h[c]=b/3,h[a]=(m-g)/6048e5,h[u]=(m-g)/864e5,h[s]=m/n,h[o]=m/e,h[i]=m/t,h)[v]||m,p?b:S.a(b)},g.daysInMonth=function(){return this.endOf(l).$D},g.$locale=function(){return $[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=_(t,e,!0);return r&&(n.$L=r),n},g.clone=function(){return S.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},y}(),O=M.prototype;return x.prototype=O,[["$ms",r],["$s",i],["$m",o],["$H",s],["$W",u],["$M",l],["$y",f],["$D",d]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),x.extend=function(t,e){return t.$i||(t(e,M,x),t.$i=!0),x},x.locale=_,x.isDayjs=w,x.unix=function(t){return x(1e3*t)},x.en=$[b],x.Ls=$,x.p={},x}()})(O={exports:{}},O.exports);var D,C=function(){function t(){}return t.prototype.renderComp=function(t,e,i){return u(),a(l,null,[i?S(i)?i(t):n(i,t,e,16):r("v-if_component",!0)])},t}(),j=(D=null,function(){return D||(D=new C),D}),A=function(){function t(){this.name="",this.slots={},this.attrs={}}return t.prototype.init=function(){return this.propAdaptor(),this},t.prototype.propAdaptor=function(){throw new Error("请重写propAdaptor方法")},t.prototype.addSlots=function(t){return"function"==typeof t?Reflect.set(this.slots,"default",t):"object"==typeof t&&Object.assign(this.slots,t),this},t.prototype.renderVNode=function(t){return j().renderComp(this.attrs,this.slots,t)},t.prototype.render=function(){throw new Error("请重写render方法")},t}(),k=function(t){function e(e){return t.call(this,"CxFormError: "+e)||this}return v(e,t),e}(Error),T=new Map,F=function(){var t,e;return{register:function(n){var r=n.props,i=n.ref;t=i,e=r},getFormRef:function(){return t},setFormConfig:function(t,n,r){if(!e)throw new k("can't set property before regist");var i=null==e?void 0:e.items.find((function(e){return e.prop===t}));return i?Reflect.has(i,n)?Reflect.set(i,n,r):void $(T.keys()).find((function(t){var e=Reflect.get(i,t);if(x(e)){if("options"===n){if(!Array.isArray(r))throw new k("can't set options with non-array");var o=Reflect.get(e,"options");Array.isArray(o)?(o.splice(0),o.push.apply(o,$(r))):Reflect.set(e,"options",r)}else Reflect.set(e,n,r);return!0}})):console.warn("[cxForm warn]: prop "+t+" isn't exist on this form's configList ")},registerRenderer:function(t){var e=t.comp,n=t.type,r=t.adaptor;T.set(n,{comp:e,adaptor:r})},getRenderer:function(t){return T.get(t)},getRendererKeys:function(){return T.keys()}}},W=function(t){function e(e,n){var r=t.call(this)||this;return r.name="CxFormControl",r.parse=null,r.attrs={},r.type="",r.form=e,r.config=n,r.prop=n.prop,r.init(),r}return v(e,t),e.prototype.init=function(){return this.propAdaptor().bindModel(),this},e.prototype.addSlots=function(t){var e,n,r,i=this;if(!x(t))return this;x(null===(e=this.config)||void 0===e?void 0:e.slot)&&Object.entries(this.config.slot).forEach((function(e){var n=b(e,2),r=n[0],o=n[1];Reflect.set(i.slots,r,Reflect.get(t,o))}));var o=null===(r=null===(n=this.config)||void 0===n?void 0:n.custom)||void 0===r?void 0:r.slot;return o&&Reflect.set(this.slots,o,Reflect.get(t,o)),this},e.prototype.bindModel=function(){var t=this;return this.prop&&(Reflect.set(this.attrs,"modelValue",this.form[this.prop]),Reflect.set(this.attrs,"onUpdate:modelValue",(function(e){Array.isArray(e)?e=e.map((function(e){return t.parse?t.parse(e):e})):e&&(e=t.parse?t.parse(e):e),Reflect.set(t.form,t.prop,e)}))),this},e.prototype.propAdaptor=function(){var t,e,n,r=this,i=F(),o=i.getRendererKeys,s=i.getRenderer;Reflect.set(this.attrs,"prop",this.prop),$(o()).find((function(t){var e;if(x(Reflect.get(r.config,t))){var n=(null!==(e=s(t))&&void 0!==e?e:{}).adaptor;return r.type=t,S(n)?n.apply(r):Object.assign(r.attrs,Reflect.get(r.config,t)),!0}}));var u=Reflect.get(null!==(t=this.config)&&void 0!==t?t:{},"placeholder");u&&Reflect.set(this.attrs,"placeholder",u);var a=c().emit;return Reflect.set(this.attrs,"onChange",(function(t){var e,n,i={prop:r.prop,val:t,form:r.form};Array.isArray(r.attrs.options)&&Reflect.set(i,"option",r.attrs.options.find((function(e){return e.id===t}))),S(a)&&a("change",i),S(null===(e=r.config)||void 0===e?void 0:e.onChange)&&(null===(n=r.config)||void 0===n||n.onChange(i))})),!x(null===(e=this.attrs)||void 0===e?void 0:e.style)&&Reflect.set(this.attrs,"style",{}),this.config.width&&x(null===(n=this.attrs)||void 0===n?void 0:n.style)&&Reflect.set(this.attrs.style,"width",this.config.width+"px"),this},e.prototype.render=function(){var t,e,n,r,i;if("custom"===this.type)i=Reflect.get(this.slots,null!==(n=null===(e=null===(t=this.config)||void 0===t?void 0:t.custom)||void 0===e?void 0:e.slot)&&void 0!==n?n:"");else{var o=null===(r=F().getRenderer(this.type))||void 0===r?void 0:r.comp;i=S(o)?o():o}return this.renderVNode(i)},e}(A),V=function(){return{size:"small",labelSuffix:":",labelPosition:"left",onSubmit:function(t){return t.preventDefault()}}},N=function(t){function e(e){var n=t.call(this)||this;return n.name="CxForm",n.attrs={},n.ref=i(null),n.config=e,n.init(),n}return v(e,t),e.prototype.getFormRef=function(){return this.ref},e.prototype.propAdaptor=function(){var t,e,n,r,i,o;return Object.assign(this.attrs,V(),(i=this.config,o=["items"],x(i)?Object.keys(i).reduce((function(t,e){return o.includes(e)||Reflect.set(t,e,i[e]),t}),{}):i)),Reflect.set(this.attrs,"ref",this.ref),Reflect.set(this.attrs,"model",null!==(e=null===(t=this.config)||void 0===t?void 0:t.form)&&void 0!==e?e:{}),Reflect.set(this.attrs,"rules",null===(r=null===(n=this.config)||void 0===n?void 0:n.items)||void 0===r?void 0:r.reduce((function(t,e){return e.rule&&Reflect.set(t,e.prop,e.rule),t}),{})),this},e.prototype.render=function(){return this.renderVNode(f("ElForm"))},e}(A),Y=function(t){function e(e){var n=t.call(this)||this;return n.name="CxFormItem",n.attrs={},n.config=e,n.init(),n}return v(e,t),e.prototype.addSlots=function(t){var e=this;if(x(t)){var n={default:t.default};this.config.labelSlot&&Reflect.set(n,"label",(function(){var n;return null===(n=t[e.config.labelSlot])||void 0===n?void 0:n.call(t,y({},e.config))})),Object.assign(this.slots,n)}return this},e.prototype.propAdaptor=function(){var t,e,n,r,i,o,s,u,a;return _(null===(t=this.config)||void 0===t?void 0:t.spacing,"Number")&&Reflect.set(this.attrs,"style",{paddingRight:(null===(e=this.config)||void 0===e?void 0:e.spacing)+"px"}),Object.assign(this.attrs,null!==(r=null===(n=this.config)||void 0===n?void 0:n.itemAttrs)&&void 0!==r?r:{}),(null===(i=this.config)||void 0===i?void 0:i.labelWidth)&&Reflect.set(this.attrs,"labelWidth",this.config.labelWidth+"px"),Reflect.set(this.attrs,"label",null!==(s=null===(o=this.config)||void 0===o?void 0:o.label)&&void 0!==s?s:""),Reflect.set(this.attrs,"prop",null!==(a=null===(u=this.config)||void 0===u?void 0:u.prop)&&void 0!==a?a:""),this},e.prototype.render=function(){return this.renderVNode(f("ElFormItem"))},e}(A),H=t({props:{form:{type:Object,default:function(){return{}}},inline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},items:{type:Array,default:function(){return[]}},class:{type:[Array,Object,String],default:function(){return[]}}},name:"CxForm",emits:["change","register"],setup:function(t,e){var r=e.slots,i=e.emit;function o(e){return new W(t.form,e).addSlots(r).render()}function s(){var e=new N(t).addSlots((function(){var e;return null===(e=t.items)||void 0===e?void 0:e.reduce((function(t,e){return!e.hide&&t.push(function(t){var e=y(y({},r),{default:function(){return[o(t)]}});return new Y(t).addSlots(e).render()}(e)),t}),[])}));return i("register",{props:t,ref:e.getFormRef()}),e.render()}return(0,e.expose)({trigger:function(e){i("change",{prop:e,val:t.form[e]})}}),function(){return n("div",{name:"cx-form"},[s()])}}});H.install=function(t){t.component(H.name,H)};var E=H,I=Object.freeze({__proto__:null,CxBtn:p,CxTab:R,CxForm:E}),L={install:function(t){Object.values(I).forEach((function(e){t.use(e)}))}},z=I;export default L;export{z as comps,j as cxFormRender,F as useCxForm};
