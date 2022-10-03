import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/home-view.vue'
import Login from '../views/login-view.vue'
import Register from '../views/register-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bungalows',
      name: 'bungalows',
      component: () => import('../views/bungalows-view.vue'),
    },
    {
      path: '/bungalows/:bungalowId',
      name: 'bungalow',
      component: () => import('../views/bungalow-detail-view.vue'),
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: () => import('../views/bookings-view.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter(to, from, next) {
        if (store.state.user) return next('/')
        return next()
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        if (store.state.user) return next('/')
        return next()
      },
    },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: Bookings,
    //   beforeEnter(to, from, next) {
    //     if (!store.state.user) return next('/login')
    //     return next()
    //   },
    // },
  ],
})

export default router
