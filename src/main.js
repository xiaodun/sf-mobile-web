// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "mint-ui/lib/style.css";
import vueTouch from "vue-touch";
import "@/Localize-UI/Localize-UI.js";
import { Loadmore } from "mint-ui";
import MintUI from "mint-ui";
import { Button } from "mint-ui";
import store from "@/vuex/store.js";
Vue.config.productionTip = false;
Vue.use(MintUI);
vueTouch.registerCustomEvent("doubletap", {
  type: "tap",
  taps: 2
});
Vue.use(vueTouch, { name: "vue-touch" });
Vue.component(Button.name, Button);
Vue.component(Loadmore.name, Loadmore);
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
