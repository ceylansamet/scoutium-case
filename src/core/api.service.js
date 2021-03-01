import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = 'https://api.scoutium.com/api'
  },
  get (resource) {
    return Vue.axios.get(`${resource}`)
  }
}
export default ApiService
