(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/views/t-pay-way/ti-pay-way"],{2052:function(t,n,e){},"255d":function(t,n,e){"use strict";e.r(n);var u=e("7065"),o=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=o.a},"3b3e":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return u}));var u={tuiBottomPopup:function(){return e.e("components/thorui/tui-bottom-popup/tui-bottom-popup").then(e.bind(null,"8510"))},tuiListCell:function(){return e.e("components/thorui/tui-list-cell/tui-list-cell").then(e.bind(null,"0a03"))},tuiButton:function(){return e.e("components/thorui/tui-button/tui-button").then(e.bind(null,"03d1"))}},o=function(){var t=this,n=t.$createElement;t._self._c},i=[]},"3d15":function(t,n,e){"use strict";var u=e("2052"),o=e.n(u);o.a},7065:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"tPayWay",props:{show:{type:Boolean,default:!1},page:{type:Number,default:1}},data:function(){return{}},methods:{close:function(){this.$emit("close",{})},btnPay:function(){console.log(233),t.redirectTo({url:"/pages/mall/paySuccess/paySuccess"}),this.close()}}};n.default=e}).call(this,e("543d")["default"])},e4e4:function(t,n,e){"use strict";e.r(n);var u=e("3b3e"),o=e("255d");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("3d15");var c,a=e("f0c5"),r=Object(a["a"])(o["default"],u["b"],u["c"],!1,null,"428a1bfc",null,!1,u["a"],c);n["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/views/t-pay-way/ti-pay-way-create-component',
    {
        'components/views/t-pay-way/ti-pay-way-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e4e4"))
        })
    },
    [['components/views/t-pay-way/ti-pay-way-create-component']]
]);
