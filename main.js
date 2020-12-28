import Vue from 'vue'
import App from './App'



import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

// console.log = (function(oriLogFunc){
//   return function(str){
//     if (Config.logDebug){//判断配置文件是否开启日志调试
//       oriLogFunc.call(console, str);
//     }
//   }
// })(console.log);

app.$mount()
