// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import DefaultLayout from '@/layouts/default.vue'
import '@/modules/utils'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('default-layout', DefaultLayout)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
  beforeCreate () {
    if (this.$store.getters['user/auth']) {
      this.$store.dispatch('user/data')
    }
  }
})
