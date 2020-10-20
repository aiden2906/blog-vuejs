import Vue from 'vue';
import App from './App.vue';
import router from './routes/index.js';
import ElementUI from 'element-ui';
import { store } from './store/index.js';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
