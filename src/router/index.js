import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/store'
  },
  {
    path: '/ebook',
    component: () => import('../views/ebook/index.vue'),
    // 动态路由
    children: [
      {
        path: ':fileName',
        component: () => import('../components/ebook/EbookReader.vue')
      }
    ]
  },
  {
    path: '/store',
    component: () => import('../views/store/index.vue'),
    redirect: '/store/home',
    children: [{
      path: 'home',
      component: () => import('../views/store/StoreHome.vue')
    }, {
      path: 'list',
      component: () => import('../views/store/StoreList.vue')
    }, {
      path: 'detail',
      component: () => import('../views/store/StoreDetail.vue')
    }, {
      path: 'category',
      component: () => import('../views/store/StoreCategory.vue')
    },]
  },
  {
    path: '/bookshelf',
    component: () => import('../views/bookshelf/index.vue')
  },
  {
    path: '/my',
    component: () => import('../views/my/index.vue')
  },
  {
    path: '/register',
    component: () => import('../views/register/index.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
