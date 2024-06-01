import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/login/LoginPage.vue'
import HomePage from '../components/home/HomePage.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' }, // Redirige la ruta raíz a '/login'
    { path: '/login', component: LoginPage },
    { path: '/home', component: HomePage}

  ]
})

export default router