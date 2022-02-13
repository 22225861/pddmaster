import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LyTab from 'ly-tab'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/common/css/style.css'

Vue.config.productionTip = false
Vue.use(LyTab);
Vue.use(MintUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
