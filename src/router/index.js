import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/Home'], resolve),
      meta: {
        index: 0,
        title: '恩の宝库'
      }
    },
    {
      path: '/allDetail',
      name: 'allDetail',
      component: resolve => require(['@/views/AllDetail'], resolve),
      meta: {
        index: 1,
        title: '全部项目'
      }
    },
    {
      path: '/more',
      name: 'more',
      component: resolve => require(['@/views/More'], resolve),
      meta: {
        index: 2,
        title: '更多菜单'
      }
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: resolve => require(['@/views/Rank'], resolve),
      meta: {
        index: 2,
        title: '集资详情'
      }
    },
    {
      path: '/sweet',
      name: 'sweet',
      component: resolve => require(['@/views/Sweet'], resolve),
      meta: {
        index: 3,
        title: '每日一语'
      }
    },
    {
      path: '/userList/:id',
      name: 'userList',
      component: resolve => require(['@/views/UserList'], resolve),
      meta: {
        index: 3,
        title: '聚聚详情'
      }
    },
    {
      path: '/cardList/:vid',
      name: 'cardList',
      component: resolve => require(['@/views/CardList'], resolve),
      meta: {
        index: 4,
        title: '抽卡详情'
      }
    },
    {
      path: '/koudai',
      name: 'koudai',
      component: resolve => require(['@/views/Koudai'], resolve),
      meta: {
        index: 5,
        title: '口袋敏感词检测'
      }
    }
  ]
})
