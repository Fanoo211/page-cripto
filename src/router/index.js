import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompraView from '../views/CompraView.vue'
import VentaView from '../views/VentaView.vue'


const routes = [
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/CompraView',
    name: 'CompraView',
    component: CompraView,
  },
  {
    path: '/VentaView',
    name: 'VentaView',
    component: VentaView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
