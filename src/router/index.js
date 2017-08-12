import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import Dos from 'components/dos/dos'

Vue.use(Router)

export default new Router({
  // base: '/webDos/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login,
      children: [
        {
          path: ':id',
          component: Dos
        }
      ]
    }
  ]
})
