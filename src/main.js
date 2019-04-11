// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css';
Vue.config.productionTip = false
// 按需引入组件
import { Button, Input, Icon, Modal, Layout, Header, Footer, Sider, Content, Card, Collapse, Panel, Drawer } from 'iview'
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('Layout', Layout)
Vue.component('Header', Header)
Vue.component('Footer', Footer)
Vue.component('Sider', Sider)
Vue.component('Content', Content)
Vue.component('Card', Card)
Vue.component('Collapse', Collapse)
Vue.component('Panel', Panel)
Vue.component('Drawer', Drawer)

// 全局注册 $Modal 实例
Vue.prototype.$Modal = Modal

// 暴露lib静态数据

import Project from '@/lib/global';
Vue.prototype.$Project = Project

/* eslint-disable no-new */
import store from './store'//引入store

new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})