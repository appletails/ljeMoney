import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Rank from '@/views/Rank'
import Sweet from '@/views/Sweet'
import AllDetail from '@/views/AllDetail'
import Koudai from '@/views/Koudai'
import UserList from '@/views/UserList'
import CardList from '@/views/CardList'
import More from '@/views/More'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        index:0,
        title: '恩の金库'
      }
    },
    {
      path: '/allDetail',
      name: 'allDetail',
      component: AllDetail,
      meta:{
        index:1,
        title: '全部项目'
      }
    },
    {
      path: '/more',
      name: 'more',
      component: More,
      meta:{
        index:2,
        title: '更多菜单'
      }
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: Rank,
      meta:{
        index:2,
        title: '集资详情'
      }
    },
    {
      path: '/sweet',
      name: 'sweet',
      component: Sweet,
      meta:{
        index:3,
        title: '每日一语'
      }
    },
    {
      path: '/userList/:id',
      name: 'userList',
      component: UserList,
      meta:{
        index:3,
        title: '聚聚详情'
      }
    },
    {
      path: '/cardList/:vid',
      name: 'cardList',
      component: CardList,
      meta:{
        index:4,
        title: '抽卡详情'
      }
    },
    {
      path: '/koudai',
      name: 'koudai',
      component: Koudai,
      meta:{
        index:5,
        title: '口袋敏感词检测'
      }
    }
  ]
})
