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
    component: HomeView,
    meta: { scrollY: 0 },
  },
  {
    path: '/CompraView',
    name: 'CompraView',
    component: CompraView,
    meta: { scrollY: 0 },
  },
  {
    path: '/VentaView',
    name: 'VentaView',
    component: VentaView,
    meta: { scrollY: 0 },
  },
  {
    path: '/MovimientosView',
    name: 'MovimientosView',
    component: MovimientosView,
    meta: { scrollY: 0 },
  },
  {
    path: '/EstadoActualView',
    name: 'EstadoActualView',
    component: EstadoActualView,
    meta: { scrollY: 0 },
  },
  {
    path: '/PoliticasView',
    name: 'PoliticasView',
    component: PoliticasView,
    meta: { scrollY: 0 },
  },
]

const validRoutes = routes.map(route => route.name);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.meta.scrollY) {
      return { top: to.meta.scrollY };
    } else {
      return { top: 0 };
    }
  },
});

router.afterEach((to, from) => {
  if (from.meta && validRoutes.includes(from.name)) {
    from.meta.scrollY = window.scrollY;
  }
});

export default router;
