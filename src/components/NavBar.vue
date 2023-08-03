<template>
  <nav class="nav-bar">
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo center">Logo</a>
      <ul class="right hide-on-med-and-down">
        <li><a class="waves-effect waves-light btn red accent-4" v-if="userLogeado" @click="cerrarSesion">Cerrar Sesión <i class="material-icons right">exit_to_app</i></a></li>
      </ul>
      <ul v-if="userLogeado" class="left hide-on-med-and-down">
        <li><router-link :to="{name: 'HomeView'}" class="valign-wrapper">Inicio<span class="material-symbols-outlined right icon-spacing">home</span></router-link></li>
        <li><DropdownMenu /></li>
        <li><router-link :to="{name: 'MovimientosView'}" class="valign-wrapper">Movimientos<span class="material-symbols-outlined right icon-spacing">swap_horiz</span></router-link></li>
        <li><router-link :to="{name: 'EstadoActualView'}" class="valign-wrapper">Estado Actual<span class="material-symbols-outlined right icon-spacing">info</span></router-link></li>
      </ul>
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
  background-color: #E92D1D; /*Pomegranate*/
}

.icon-spacing {
  margin-left: 12px;
}
</style>