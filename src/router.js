import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('./views/Video.vue')
    }, 
    {
      path: '/stream',
      name: 'stream',
      component: () => import('./views/Stream.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/User.vue')
    },
    {
      path: '/chat/:subject',
      name: 'chat',
      component: () => import('./views/Chat.vue')
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('./views/NotFound.vue')
    }
  ]
})
