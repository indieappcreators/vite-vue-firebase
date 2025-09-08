import { createWebHistory, createRouter } from 'vue-router'
import { auth } from './firebase/init'
import { checkAuthentication, signOut} from './firebase/auth'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Todos from './views/Todos.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/sign-in/confirm', component: Login },
  { 
    path: '/todos', 
    component: Todos,
    meta: { requiresAuth: true } // Add this meta to the todo route to protect it
  },
  {
    path: '/logout',
    component: Login,
    beforeEnter: (_to: any, _from: any, next: any) => {
      signOut()
      next('/login')
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const {isAuthenticated} = await checkAuthentication()
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next(); // No auth required, allow access
  }
});

export { router }