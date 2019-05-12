import Vue from 'vue';
import store from './store/store';
import router from './router/router';
import './serviceWorker/registerServiceWorker';
import App from './App.vue';
import './assets/scss/_app.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
