(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/myCoupon/myCoupon"],{"12f2":function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return o}));var o={tuiTabs:function(){return e.e("components/thorui/tui-tabs/tui-tabs").then(e.bind(null,"0534"))},tuiButton:function(){return e.e("components/thorui/tui-button/tui-button").then(e.bind(null,"03d1"))},tuiLoadmore:function(){return e.e("components/thorui/tui-loadmore/tui-loadmore").then(e.bind(null,"d7a7"))},tuiNomore:function(){return e.e("components/thorui/tui-nomore/tui-nomore").then(e.bind(null,"e673"))}},a=function(){var n=this,t=n.$createElement,e=(n._self._c,n.__map(n.couponList,(function(t,e){var o=n.__get_orig(t),a=e>0?n.getSignUrl(e):null,r=n.__map(t.data,(function(t,e){var o=n.__get_orig(t),a=t.value.toString();return{$orig:o,g0:a}}));return{$orig:o,m0:a,l0:r}})));n.$mp.data=Object.assign({},{$root:{l1:e}})},r=[]},3580:function(n,t,e){"use strict";e.r(t);var o=e("a190"),a=e.n(o);for(var r in o)"default"!==r&&function(n){e.d(t,n,(function(){return o[n]}))}(r);t["default"]=a.a},"562c":function(n,t,e){"use strict";e.r(t);var o=e("12f2"),a=e("3580");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);e("5a71");var i,u=e("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=c.exports},"5a71":function(n,t,e){"use strict";var o=e("9569"),a=e.n(o);a.a},9569:function(n,t,e){},a190:function(n,t,e){"use strict";(function(n){function e(n){return i(n)||r(n)||a(n)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(n,t){if(n){if("string"===typeof n)return u(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?u(n,t):void 0}}function r(n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}function i(n){if(Array.isArray(n))return u(n)}function u(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,o=new Array(t);e<t;e++)o[e]=n[e];return o}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c={data:function(){return{tabs:[{name:"未使用"},{name:"已使用"},{name:"已过期"}],currentTab:0,scrollTop:0,couponList:[{loading:!1,pullUpOn:!0,pageIndex:1,noData:!1,data:[]},{loading:!1,pullUpOn:!0,pageIndex:1,noData:!1,data:[]},{loading:!1,pullUpOn:!0,pageIndex:1,noData:!1,data:[]}],requestData:[{type:1,range:"拼团券",rangeDesc:"限拼团可用",condition:"满38元可用",value:9},{type:1,range:"全场券",rangeDesc:"全部商品可用",condition:"满200元可用",value:5},{type:2,range:"全场券",rangeDesc:"全部商品可用",condition:"满200元可用",value:100},{type:2,range:"品牌券",rangeDesc:"指定品牌可用",condition:"满200元可用",value:200},{type:2,range:"品类券",rangeDesc:"指定品类可用",condition:"满8000元可用",value:1e4},{type:1,range:"拼团券",rangeDesc:"限拼团可用",condition:"满100元可用",value:9},{type:1,range:"全场券",rangeDesc:"全部商品可用",condition:"满800元可用",value:8},{type:2,range:"全场券",rangeDesc:"全部商品可用",condition:"满200元可用",value:30},{type:2,range:"品牌券",rangeDesc:"指定品牌可用",condition:"满100元可用",value:20},{type:2,range:"品类券",rangeDesc:"指定品类可用",condition:"满500元可用",value:100}],webURL:"https://www.thorui.cn/wx"}},onLoad:function(){this.getCouponList(this.currentTab)},methods:{getSignUrl:function(n){var t="";return 1==n?t="/static/images/mall/coupon/img_coupon_beused_3x.png":2==n&&(t="/static/images/mall/coupon/img_coupon_failure_3x.png"),t},change:function(n){this.currentTab=n.index,1==this.couponList[this.currentTab].pageIndex&&this.getCouponList(this.currentTab)},getCouponList:function(t,o){var a=this,r=this.couponList[t];r.pageIndex;o||(r.loading=!0),setTimeout((function(){o&&n.stopPullDownRefresh();var t=e(a.requestData);1==r.pageIndex?r.data=t:r.data=r.data.concat(t),r.pageIndex>2&&(r.pullUpOn=!1),r.pageIndex++,r.loading=!1}),400)}},onPullDownRefresh:function(){var n=this.currentTab,t=this.couponList[n];t.pageIndex=1,t.loading=!1,t.pullUpOn=!0,t.noData=!1,this.getCouponList(n,!0)},onReachBottom:function(){var n=this.currentTab;this.couponList[n].pullUpOn&&this.getCouponList(n)},onPageScroll:function(n){this.scrollTop=n.scrollTop}};t.default=c}).call(this,e("543d")["default"])},f899:function(n,t,e){"use strict";(function(n){e("ff5b");o(e("66fd"));var t=o(e("562c"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])}},[["f899","common/runtime","common/vendor"]]]);