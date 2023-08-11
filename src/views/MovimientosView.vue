<template>
<div>
  <div class="title">
    <h1>Movimientos</h1>
  </div>

    <div class="row">
    <div class="col m12">
      <table class="table bordered striped">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Precio Total</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movimiento, index) in movimientos" :key="index">
            <td>{{ movimiento.crypto_code }}</td>
            <td>{{ movimiento.crypto_amount }}</td>
            <td>ARS {{ movimiento.money }}</td>
            <td>{{ movimiento.user_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../store/auth.js';

export default{
  name: 'MovimientosView',
  data(){
    return{
      movimientos: [],
    }
  },
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.usuario;
    }
  },
  mounted(){
    this.mostrarMovimientos();
  },
  methods: {
    async mostrarMovimientos(){
      let user_id = this.usuario

      try {
        const response = await axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "${user_id}"}`, {
        headers: {
          'x-apikey': '60eb09146661365596af552f',
          'Content-Type': 'application/json'
        }
      });
        this.movimientos = response.data;

      }
      catch(error) {
        console.error('Error al obtener las transacciones:', error);
      }
    }
  }
}
</script>