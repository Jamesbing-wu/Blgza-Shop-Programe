(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/thorui/tui-tag/tui-tag"],{"2f44":function(t,e,a){},"772d":function(t,e,a){"use strict";a.r(e);var n=a("818a"),i=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,(function(){return n[t]}))}(u);e["default"]=i.a},"818a":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"tuiTag",props:{type:{type:String,default:"primary"},padding:{type:String,default:"16rpx 26rpx"},margin:{type:String,default:"0"},size:{type:String,default:"28rpx"},shape:{type:String,default:"square"},plain:{type:Boolean,default:!1},hover:{type:Boolean,default:!1},scaleMultiple:{type:Number,default:1},originLeft:{type:Boolean,default:!1},originRight:{type:Boolean,default:!1},index:{type:Number,default:0}},methods:{handleClick:function(){this.$emit("click",{index:this.index})},getTypeClass:function(t,e){return e?"tui-"+t+"-outline":"tui-"+t},getClassName:function(t,e){var a=e?"tui-tag-outline ":"";return"square"!=t&&("circle"==t?a+=e?"tui-tag-outline-fillet":"tui-tag-fillet":"circleLeft"==t?a+="tui-tag-fillet-left":"circleRight"==t&&(a+="tui-tag-fillet-right")),a}}};e.default=n},a871:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return u})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=(t._self._c,t.getClassName(t.shape,t.plain)),n=t.getTypeClass(t.type,t.plain);t.$mp.data=Object.assign({},{$root:{m0:a,m1:n}})},u=[]},cf5a:function(t,e,a){"use strict";var n=a("2f44"),i=a.n(n);i.a},d5dd:function(t,e,a){"use strict";a.r(e);var n=a("a871"),i=a("772d");for(var u in i)"default"!==u&&function(t){a.d(e,t,(function(){return i[t]}))}(u);a("cf5a");var r,l=a("f0c5"),f=Object(l["a"])(i["default"],n["b"],n["c"],!1,null,"51e50994",null,!1,n["a"],r);e["default"]=f.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/thorui/tui-tag/tui-tag-create-component',
    {
        'components/thorui/tui-tag/tui-tag-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d5dd"))
        })
    },
    [['components/thorui/tui-tag/tui-tag-create-component']]
]);