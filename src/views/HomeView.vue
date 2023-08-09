<template>
  <div>
    <h1 class="text">Bienvenido, {{ usuario }}!</h1>
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


<style scoped>
@font-face {
  font-family: 'Vercetti Regular';
  src: url('~@/assets/fonts/Vercetti-Regular.otf') format('otf'), /* Ruta relativa al archivo de tipografía */
       /* Agrega más formatos si es necesario */
}

.text{
  font-family: 'Vercetti Regular';
  font-size: 100px;
}
</style>
