import { createWebHistory, createRouter } from 'vue-router'
import { auth } from './firebase/init'
import { onAuthStateChanged } from 'firebase/auth'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Todo from './views/Todo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/sign-in/confirm', component: Login },
  { 
    path: '/todos', 
    component: Todo,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    // Check if user is authenticated
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          next(); // User is authenticated, allow access
        } else {
          next('/login'); // User is not authenticated, redirect to login
        }
        resolve();
      });
    });
  } else {
    next(); // No auth required, allow access
  }
});

export { router }