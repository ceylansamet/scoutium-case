import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout/layout'
import TeamCreate from '@/components/pages/TeamCreate'
import TeamView from '@/components/pages/TeamView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/team-create',
      component: layout,
      children: [
        {
          path: 'team-create',
          name: 'team-create',
          component: TeamCreate
        },
        {
          path: 'team-view',
          name: 'team-view',
          component: TeamView
        }
      ]
    }
  ]
})
