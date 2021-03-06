import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import BootstrapVue from 'bootstrap-vue'
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueDraggableResizable from 'vue-draggable-resizable'

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
  faLongArrowAltRight,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

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
  faLongArrowAltRight,
  faUser
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

Vue.use(router)
Vue.use(BootstrapVue)
Vue.use(VueTextareaAutosize)

const {
  detect
} = require('detect-browser');
const browser = detect();
if (browser) {
  store.commit('browser', browser.name);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
