// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'
import ApiService from '@/core/api.service'

// eslint-disable-next-line
import styles from './assets/style/style.css'

Vue.config.productionTip = false

ApiService.init()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
