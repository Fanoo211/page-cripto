<template>
<div>
  <div class="title">
    <h1>Movimientos</h1>
  </div>
  
  <div>
    <ul>
      <li v-for="(movimiento, index) in movimientos" :key="index">
        <p>Criptomoneda: {{ movimiento.crypto_code }}</p>
        <p>Cantidad: {{ movimiento.crypto_amount }}</p>
        <p>Precio Total: {{ movimiento.money }}</p>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from '../conexionAPI.js';
import { useAuthStore } from '../store/auth.js';

export default{
  name: 'MovimientosView',
  data(){
    return{
      movimientos: [],
    }
  },
  computed(){
    const authStore = useAuthStore();
    return authStore.usuario;
  },
  watch: {
    movimientos: 'mostrarMovimientos'
  },
  methods: {
    async mostrarMovimientos(){
      try {
        const response = await axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "${this.usuario}"}`);
        this.movimientos = response.data;
      }
      catch(error) {
        console.error('Error al obtener las transacciones:', error);
      }
    }
  }
}
</script>