<template>
  <div>
  <nav class="orange darken-1">
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">Logo</a>
      <ul class="right hide-on-med-and-down">
        <li><a class="waves-effect waves-light btn red accent-4" v-if="userLogeado" @click="cerrarSesion">Cerrar Sesión <i class="material-icons right">exit_to_app</i></a></li>
      </ul>
    </div>
  </nav>

    <div>
      <div v-if="!userLogeado">
        <Login @login-exitoso="sesionIniciada"></Login>
      </div>

      <div v-else>
        <h1>Bienvenido, {{ usuario }}!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import { useAuthStore } from './store/auth.js';
import M from 'materialize-css'

export default {
  name: 'App',
  components: {
    Login,
  },
  computed: {
    userLogeado() {
      const authStore = useAuthStore();
      return authStore.userLogeado;
    },
    usuario() {
      const authStore = useAuthStore();
      return authStore.usuario;
    },
  },
  methods: {
    sesionIniciada(usuario) {
      const alphanumericRegex = /^[a-zA-Z0-9]+$/; //https://www.globalnerdy.com/wp-content/uploads/2022/01/regex-fright.jpg

      if (!usuario.trim()) {
        this.mostrarToast('Por favor, ingrese un usuario válido.', 'blue darken-1');
      } else if (!alphanumericRegex.test(usuario)) {
        this.mostrarToast('El usuario debe contener solo letras y números.', 'blue darken-1');
      } else {
        const authStore = useAuthStore();
        authStore.login(usuario);
        this.mostrarToast('¡SESIÓN INICIADA!', 'green accent-4');
        
      }
    },
    cerrarSesion() {
      const authStore = useAuthStore();
      authStore.logout();
      this.mostrarToast('¡SESIÓN CERRADA!', 'red accent-4');
    },
    mostrarToast(mensaje, color) {
      M.Toast.dismissAll();
      M.toast({ html: mensaje, classes: `${color}` });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: right;
}
</style>
