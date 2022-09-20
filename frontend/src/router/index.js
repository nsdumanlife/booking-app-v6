import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about-view.vue'),
    },
    {
      path: '/bungalows',
      name: 'bungalows',
      component: () => import('../views/bungalows-view.vue'),
    },
    {
      path: '/bungalows/:bungalowId',
      component: () => import('../views/bungalow-detail-view.vue'),
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: () => import('../views/bookings-view.vue'),
    },
  ],
})

export default router
