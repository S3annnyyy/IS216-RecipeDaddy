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
      path: '/mealprep/search/:id',
      name: 'mealprepsearch',
      component: () => import('../views/MealPrepSearch.vue')
    },
    {
      path: '/recipesearch',
      name: 'recipesearch',
      component: () => import('../views/RecipeSearch.vue')
    },
    {
      path: '/recipesearch/:id',
      name: 'recipesearchgenerated',
      component: () => import('../components/AdHocRecipe.vue')
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: () => import('../views/Preferences.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { hideNavbar: true },
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/mealschedule',
      name: 'mealschedule',
      component: () => import('../views/MealSchedule.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/Payment.vue'),
    },
    // error 404
    {
      path: '/:catchAll(.*)',
      name: 'error404',
      meta: { hideNavbar: true },
      component: () => import('../views/error404.vue')
    }
  ]
})

export default router
