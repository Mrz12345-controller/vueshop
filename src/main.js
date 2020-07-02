// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import myBread from '@/components/custom/myBread.vue';
import '@/assets/css/reset.css';
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'
// import axios from 'axios';
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MyHttpServer)

//全局过滤器
Vue.filter("fiter", (v) => {
  return moment(v).format("YYYY-MM-DD")
})
//全局自定义组件
Vue.component(myBread.name, myBread)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
