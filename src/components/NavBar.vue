<template>
  <nav class="nav-bar">
    <div class="nav-wrapper">
      <div>
<a href="#!" class="brand-logo center">Logo</a>
      </div>

      <div>
        <ul class="right hide-on-med-and-down">
        <li><a class="waves-effect waves-light btn white red-text accent-4" v-if="userLogeado" @click="cerrarSesion">Cerrar Sesión <i class="material-icons right">exit_to_app</i></a></li>
      </ul>
      </div>

      <div class="page-views">
        <ul v-if="userLogeado" class="left hide-on-med-and-down">
        <li><router-link :to="{name: 'HomeView'}" class="valign-wrapper" style="font-size: 18px">Inicio<span class="material-symbols-outlined right icon-spacing">home</span></router-link></li>
        <li><DropdownMenu /></li>
        <li><router-link :to="{name: 'MovimientosView'}" class="valign-wrapper" style="font-size: 18px">Movimientos<span class="material-symbols-outlined right icon-spacing">swap_horiz</span></router-link></li>
        <li><router-link :to="{name: 'EstadoActualView'}" class="valign-wrapper" style="font-size: 18px">Estado Actual<span class="material-symbols-outlined right icon-spacing">info</span></router-link></li>
      </ul>
      </div>
      
      
      
    </div>
  </nav>
</template>

<script>
import DropdownMenu from '../components/DropdownMenu.vue';
import { useAuthStore } from '../store/auth.js';
import M from 'materialize-css';

export default{
  components: {
    DropdownMenu
  },
  computed: {
    userLogeado() {
      const authStore = useAuthStore();
      return authStore.userLogeado;
    },
  },
  methods: {
    cerrarSesion() {
      const authStore = useAuthStore();
      authStore.logout();
      this.mostrarToast('¡SESIÓN CERRADA!', 'red accent-4');
    },
    mostrarToast(mensaje, color) {
      M.Toast.dismissAll();
      M.toast({ html: mensaje, classes: `${color}` });
    },
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: #F8BA00; 
}

.page-views {
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}

.icon-spacing {
  margin-left: 12px;
}
</style>