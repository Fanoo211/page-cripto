<template>
  <div>
    <nav>
      <button type="button" class="btn waves-effect waves-light" v-if="userLogeado" @click="cerrarSesion">Cerrar Sesión<i class="material-icons right">exit_to_app</i></button>
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
        alert('Por favor, ingrese un usuario válido.');
      } else if (!alphanumericRegex.test(usuario)) {
        alert('El usuario debe contener solo letras y números.');
      } else {
        const authStore = useAuthStore();
        authStore.login(usuario);
        M.toast({ html: '¡SESIÓN INICIADA!' });
      }
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


</style>
