import Vue from 'vue'
import './global.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = true;
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
}).$mount('#app');
