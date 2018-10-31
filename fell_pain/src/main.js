// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'mint-ui/lib/style.css';
import Vconsole from 'vconsole';

import {Loadmore} from 'mint-ui';
import MintUI from 'mint-ui';
import {Button} from 'mint-ui';
let vconsole = new Vconsole();
Vue.config.productionTip = false;
Vue.use(MintUI);

Vue.component(Button.name, Button);
Vue.component(Loadmore.name, Loadmore);
console.log(Loadmore.name);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});
