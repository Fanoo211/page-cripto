<template>
  <div>
    <h1>Bienvenido, {{ usuario }}!</h1>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth.js';

export default {
  name: 'HomeView',
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.usuario;
    }
  },
}
</script>
