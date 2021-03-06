import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModCategoria from '../components/ModCategoria.vue'
import ModArticulo from '../components/ModArticulo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: ModCategoria
  },
  {
    path: '/articulo',
    name: 'articulo',
    component: ModArticulo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
