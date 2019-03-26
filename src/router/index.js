import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Reports from '@/components/Reports'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    }
  ]
})
