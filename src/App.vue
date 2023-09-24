<template>
  <div>

    <NavBar />

  <main style="min-height: calc(100vh - 130px);">
      <div v-if="!userLogeado">
        <router-view :to="{name: 'LoginView'}"></router-view>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
  </main>
    
  <Footer v-if="userLogeado" />

  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { useUserStore } from './store/user.js';
import router from './router';

export default {
  name: 'App',
  components: {
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
    watch: {
    $route(to) {
      // Verifica si la sesión se ha cerrado y redirige a LoginView
      if (!this.userLogeado && to.name !== 'LoginView') {
        router.push({ name: 'LoginView' });
      }
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
