import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index.js'

import moment from 'common/utils/moment.js'
import 'moment/locale/zh-cn'

Vue.use(moment)
Vue.use(toast)
// 解决移动端300毫秒的延迟
FastClick.attach(document.body)
// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
