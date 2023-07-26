<template>
  <div>
    <nav></nav>

    <div>
      <div v-if="!userLogeado">
        <Login @login-exitoso="sesionIniciada"></Login>
      </div>

      <div v-else>
        <h1>Bienvenido, {{ usuario }}!</h1>
        <button type="button" @click="cerrarSesion">Cerrar Sesión</button>
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
      const authStore = useAuthStore();
      authStore.login(usuario);
    },
  cerrarSesion() {
      const authStore = useAuthStore();
      authStore.logout();
      M.toast({html: '¡SESIÓN CERRADA!'});
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

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
