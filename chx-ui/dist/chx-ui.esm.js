import{defineComponent as t,computed as n,createVNode as e}from"vue";var l=t({name:"CxBtn",props:{size:{type:String,default:"medium"},level:{type:[String,Number],default:"2"},type:{type:String,default:"primary"},content:{type:String,default:""},icon:{type:String,default:""},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup:function(t,l){var a=l.slots,o=n((function(){var n=["cx-btn_wrapper"];return t.disabled&&n.push("cx-btn_disabled"),n.push("cx-btn_"+t.size),n.push("cx-btn_level_"+t.level),n.push("cx-btn_"+t.type),t.loading&&n.push("cx-btn_loading"),n}));return function(n,l){return e("button",{type:"button",class:o.value,onClick:l[0]?l[0]:l[0]=function(n){if(n.preventDefault(),t.disabled)return!1}},[t.loading?e("i",{class:"el-icon-loading"}):null,t.icon?(i=t.icon,e("i",{class:"iconfont icon-"+i})):null,a.default?a.default({}):t.content,t.disabled?e("i",{onClick:function(t){return t.stopPropagation()},class:"cx_mask"}):null],2);var i}}});l.install=function(t){t.component(l.name,l)};var a=l,o=Object.freeze({__proto__:null,CxBtn:a}),i={install:function(t){Object.values(o).forEach((function(n){t.use(n)}))}},u=o;export default i;export{u as comps};
