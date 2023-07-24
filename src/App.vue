<template>
  <div>
    <div>
      <div v-if="!isLoggedIn">
        <login @login-success="handleLoginSuccess" />
      </div>

      <div v-else>
        <h1>Bienvenido, {{ usuario }}!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    Login,
  },
  data() {
    return {
      isLoggedIn: false,
      usuario: ''
    };
  },
  methods: {
    handleLoginSuccess(usuario) {
      this.isLoggedIn = true;
      this.usuario = usuario;
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
