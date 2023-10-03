import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/mealprep',
      name: 'mealprep',
      component: () => import('../views/MealPrep.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      meta: {hideSidebar:true, hideNavbar:true},
      component: () => import('../views/SignUp.vue')
    },
    // error 404
    {
      path:'/:catchAll(.*)',
      name: 'error404',
      meta: {hideSidebar:true, hideNavbar:true},
      component: () => import('../views/error404.vue')
    }
  ]
})

export default router
