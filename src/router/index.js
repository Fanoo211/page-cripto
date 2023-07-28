import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompraVentaView from '../views/CompraVentaView.vue';


const routes = [
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/CompraVentaView',
    name: 'CompraVentaView',
    component: CompraVentaView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
