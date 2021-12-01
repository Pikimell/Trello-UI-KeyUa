import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import router from './router/index'
import store from './store/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),router
}).$mount('#app')
