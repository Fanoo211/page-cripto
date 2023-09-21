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
    
  <Footer v-if="userLogeado" />

  </div>
</template>

<script>
import Login from './components/Login.vue';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { useUserStore } from './store/user.js';
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
      const userStore = useUserStore();
      return userStore.userLogeado;
    },
    usuario() {
      const userStore = useUserStore();
      return userStore.usuario;
    },
  },
  methods: {
    sesionIniciada(usuario) {
      if (!usuario.trim()) {
        this.mostrarToast('Por favor, ingrese un usuario válido.', 'blue darken-1');
      } else {
        let tieneLetras = false;
        let tieneNumeros = false;

        for (let i = 0; i < usuario.length; i++) {
          const char = usuario.charAt(i);
          if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            tieneLetras = true;
          } else if (char >= '0' && char <= '9') {
            tieneNumeros = true;
          }
        }

        if (tieneLetras && tieneNumeros) {
          const userStore = useUserStore();
          userStore.login(usuario);
          this.mostrarToast('¡SESIÓN INICIADA!', 'green accent-4');
          this.$router.push({ name: 'HomeView' });
        } else {
          this.mostrarToast('El usuario debe contener al menos una letra y un número.', 'blue darken-1');
        }
      }
    },
    cerrarSesion() {
      const userStore = useUserStore();
      userStore.logout();
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


</style>
