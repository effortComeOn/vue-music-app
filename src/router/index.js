import Vue from 'vue'
import Router from 'vue-router'

import rank from '@/components/rank/index.vue'
import recommend from '@/components/recommend/index.vue'
import search from '@/components/search/index.vue'
import singer from '@/components/singer/index.vue'
import singerDetail from '@/components/singer-detail/index.vue'
import Disc from '@/components/disc/index.vue'
import topList from '@/components/top-list/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      name: 'rank',
      path: '/rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: topList
        }
      ]
    },
    {
      name: 'recommend',
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      name: 'search',
      path: '/search',
      component: search
    },
    {
      name: 'singer',
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]

    }
  ]
})
