<template>
  <div>

    <NavBar />

  <main style="min-height: calc(100vh - 130px);">
    <div>
      <div v-if="!userLogeado">
        <Login @login-exitoso="sesionIniciada"></Login>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </div>
  </main>
    
  <Footer />

  </div>
</template>

<script>
import Login from './components/Login.vue';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { useAuthStore } from './store/auth.js';
import M from 'materialize-css';

export default {
  name: 'App',
  components: {
    Login,
    NavBar,
    Footer
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

/* Estilos para el cuerpo de la página */
body {
  /* Ajusta la imagen de fondo con el siguiente formato: */
  background-image: url('../src/assets/fondo4.jpg');
  /* Ajusta la forma en que se muestra la imagen */
  background-size: cover; /* La imagen cubrirá todo el contenedor */
  background-position: center; /* Centra la imagen vertical y horizontalmente */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

</style>
