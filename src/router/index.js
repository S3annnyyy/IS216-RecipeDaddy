import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage/HomeView.vue'

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
      component: () => import('../views/HomePage/AboutView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { hideNavbar: true },
      component: () => import('../views/HomePage/SignUp.vue')
    },
    {
      path: '/mealprep',
      name: 'mealprep',
      component: () => import('../views/MealPreparation/MealPrep.vue')
    },    
    {
      path: '/recipesearch',
      name: 'recipesearch',
      component: () => import('../views/AdHocRecipe/RecipeSearch.vue')
    },
    {
      path: '/recipesearch/:id',
      name: 'recipesearchgenerated',
      component: () => import('../views/AdHocRecipe/Recipe.vue')
    },       
    {
      path: '/mealschedule',
      name: 'mealschedule',
      component: () => import('../views/MealSchedule/MealSchedule.vue')
    },
    {
      path: '/mealschedule/:id',
      name: 'mealschedulegenerated',
      component: () => import('../views/MealSchedule/MealScheduleGenerated.vue')
    },
    {
      path:'/mealschedule/replacement/:id',
      name: 'replacement',
      component: () => import('../views/MealSchedule/MealScheduleReplace.vue')
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/Leaderboard.vue')
    },    
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/Payment.vue'),      
    },
    {
      path: '/payment/receipt',
      name: 'paymentreceipt',
      component: () => import('../views/Receipt.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/HomePage/ContactPage.vue')
    },
    // error 404
    {
      path: '/:catchAll(.*)',
      name: 'error404',
      meta: { hideNavbar: true },
      component: () => import('../views/HomePage/error404.vue')
    }
  ]
})

export default router