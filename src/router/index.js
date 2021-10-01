import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Space from '../views/Space.vue'
import Login from '../views/Login.vue'
import store from '../store/index'

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
        path: '/space',
        name: 'Space',
        component: Space,
        meta: {
            title: 'Mon Espace'
        },
        beforeEnter: (to, from, next) => {
            if (store.state.user.id == -1){
                next('/login')
            } else {
                next()
            }
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Connexion'
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
