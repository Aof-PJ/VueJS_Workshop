import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Toolbar',
    component: () => import('../components/Toolbar.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Store.vue')
      },
      {
        path: '/productDetail',
        name: 'productdetail',
        component: () => import('../views/productDetail.vue')
      },
      {
        path: '/userManagement',
        name: 'usermanagement',
        component: () => import('../views/UserManagement.vue')
      },
      {
        path: '/productsManagement',
        name: 'productsmanagement',
        component: () => import('../views/ProductsManagement.vue')
      },
      {
        path: '/viewOrders',
        name: 'vieworders',
        component: () => import('../views/ViewOrders.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/profile',
    name: 'myProfile',
    component: () => import('../views/myProfile.vue')
  },
  {
    path: '/grade_calculator',
    name: 'grade calculator',
    component: () => import('../views/GradeCal.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
