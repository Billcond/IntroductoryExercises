import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Vuex from 'vuex'
import Vuex from '../node_modules/vuex'


import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.use(ElementUI)
Vue.use(Vuex)//Vuex插件机制  最后没有用到vuex 因为它会刷新丢数据  
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,//注入 挂载实例
  render: h => h(App)
}).$mount('#app')
