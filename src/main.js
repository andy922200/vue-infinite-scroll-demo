import Vue from 'vue'
import App from './App.vue'
import ScrollView from 'vue-scrollview'
Vue.use(ScrollView)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
