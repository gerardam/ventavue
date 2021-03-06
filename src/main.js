import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL='https://localhost:44301/'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
