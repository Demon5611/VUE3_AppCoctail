import { createRouter, createWebHistory } from 'vue-router'
import Coctail from '../features/coctail/components/pages/Coctail.vue'
import CoctailRandom from '../features/coctail/components/pages/CoctailRandom.vue'
import Home from '../features/home/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/coctail/:id',
      name: 'coctail',
      component: Coctail
    },
    {
      path: '/random',
      name: 'coctailRandom',
      component: CoctailRandom
    },
    
  ]
})

export default router
