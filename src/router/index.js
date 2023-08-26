import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompraView from '../views/CompraView.vue'
import VentaView from '../views/VentaView.vue'
import MovimientosView from '../views/MovimientosView.vue'
import EstadoActualView from '../views/EstadoActualView.vue'
import PoliticasView from '../views/PoliticasView.vue'

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
  {
    path: '/MovimientosView',
    name: 'MovimientosView',
    component: MovimientosView,
  },
  {
    path: '/EstadoActualView',
    name: 'EstadoActualView',
    component: EstadoActualView,
  },
  {
    path: '/PoliticasView',
    name: 'PoliticasView',
    component: PoliticasView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
