import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import BootstrapVue from 'bootstrap-vue'
import VueTextareaAutosize from 'vue-textarea-autosize'

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,
  faExclamationTriangle,
  faChevronRight,
  faChevronLeft,
  faCommentDots,
  faPlay,
  faStream,
  faStop,
  faKey,
  faUserLock,
  faSignInAlt,
  faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(
  faCheck,
  faExclamationTriangle,
  faChevronRight,
  faChevronLeft,
  faCommentDots,
  faPlay,
  faStream,
  faStop,
  faKey,
  faUserLock,
  faSignInAlt,
  faLongArrowAltRight
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueTextareaAutosize)

const {
  detect
} = require('detect-browser');
const browser = detect();
if (browser) {
  console.log(browser.name);
  store.commit('browser', browser.name);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
