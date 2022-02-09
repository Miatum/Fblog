import Vue from 'vue'
import Router from 'vue-router'
import Featured from '@/components/Featured'
import BlogDetail from '../components/BlogDetail'
import TypeBlog from '../components/TypeBlog'
import FiltBlog from '../components/FiltBlog'
Vue.use(Router)
/*
解决点击相同路由报错
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: Featured
    },
    {
      path: '/BlogDetail',
      component: BlogDetail,
      name: 'BlogDetail'
    },
    {
      path: '/TypeBlog/:typeId',
      component: TypeBlog,
      name: 'TypeBlog'
    },
    {
      path: '/FiltBlog',
      component: FiltBlog,
      name: 'FiltBlog'
    }
  ]
})
