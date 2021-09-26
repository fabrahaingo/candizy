import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: 'Accueil'
      }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
        title: 'Inscription'
      }
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)',
    component: NotFound,
    meta: {
      title: '404 Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to) => {
    document.title = to.meta.title;
  })

export default router
