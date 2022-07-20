import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

import moment from "common/utils/moment.js";
import "moment/locale/zh-cn";

Vue.use(moment);

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
