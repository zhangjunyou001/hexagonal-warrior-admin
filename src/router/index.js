import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'SCSA Admin', icon: 'dashboard' }
    }]
  }]
/**
 * 动态路由
 */
export const asyncRoutes = [

  // 讲师管理
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: 'Teamcher Management',
    meta: { title: 'Teacher Management', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Teacher List',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: 'Teacher List', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Add Teacher',  
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: 'Add Teacher', icon: 'tree' }
      },
      // {
      //   path: 'edit/:id',   
      //   name: 'EduTeacherEdit',
      //   component: () => import('@/views/edu/teacher/edit'),
      //   meta: { title: 'Edit Teacher', noCache: true },
      //   hidden: true
      // }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Module Management',
    meta: { title: 'Module Management', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Module List',
        component: () => import('@/views/edu/course/list'),
        meta: { title: 'Module List', icon: 'table' }
      },
      {
        path: 'info',
        name: 'Add Module',  
        component: () => import('@/views/edu/course/info'),
        meta: { title: 'Add Module', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: { title: 'Edit Module', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: 'Edit Module Summary', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: 'Release Modue', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: 'Access Management',
    meta: { title: 'Access Management', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: 'User Management',
        component: () => import('@/views/acl/user/list'),
        meta: { title: 'User Management' }
      },
      {
        path: 'role/list',
        name: 'Role Management',
        component: () => import('@/views/acl/role/list'),
        meta: { title: 'Role Management' }
      },
      {
        path: 'role/form',
        name: 'Add Role',
        component: () => import('@/views/acl/role/form'),
        meta: { title: 'Add Role' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: 'Edit Role',
        component: () => import('@/views/acl/role/form'),
        meta: { title: 'Edit Role' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: 'Role Permission',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: 'Role Permission' },
        hidden: true
      },
      // {
      //   path: 'menu/list',
      //   name: '菜单管理',
      //   component: () => import('@/views/acl/menu/list'),
      //   meta: { title: '菜单管理' }
      // },
      {
        path: 'user/add',
        name: 'User Add',
        component: () => import('@/views/acl/user/form'),
        meta: { title: 'Add User' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: 'User Edit',
        component: () => import('@/views/acl/user/form'),
        meta: { title: 'User Edit' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: 'User Role',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: 'User Role' },
        hidden: true
      }

    ]
  },

  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export default router
