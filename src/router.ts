import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/sign-in/confirm', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router }