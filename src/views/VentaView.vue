<template>
<div class="container">
  <h1 class="white-text">Venta</h1>
  <div class="container">  
    <div class="row">
      <div class="input-field s6">    
        <h7 class="white-text">Vender:</h7>  
        <select class="browser-default" v-model="ventaSeleccionada">
          <option value="">Seleccione</option>
          <option v-for="(opcion, index) in opcionesVenta" :key="index" :value="opcion">{{ opcion }}</option>
        </select>
      </div>
      <div class="input-field s6">
        <h7 class="white-text">Cantidad:</h7>
        <input type="number" v-model="cantidad" min="1" step="1" class="validate white">
      </div>
    </div>
      <div class="row indigo darken-3">
        <div class="input-field s6">
          <h7 class="white-text">Precio en ARS:</h7>
          <p class="white-text">{{ precioARS }}</p>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VentaView',
  data() {
    return {
      opcionesVenta: ['BTC' , 'DAI' , 'ETH' , 'USDT'],
      ventaSeleccionada: '',
      cantidad: 0,
      precioARS: 0,
    };
  },
  watch: {
    ventaSeleccionada: 'obtenerPrecioEnARS',
    cantidad: 'obtenerPrecioEnARS',
  },
  methods: {
    async obtenerPrecioEnARS() {
      try {
        if (this.ventaSeleccionada && this.cantidad > 0) {
          const response = await axios.get(`https://criptoya.com/api/argenbtc/${this.ventaSeleccionada}/ars`);
          this.precioARS = response.data.ask * this.cantidad;
        } else {
          this.precioARS = 0;
        }
      } catch (error) {
        console.error('Error al obtener el precio en ARS:', error);
        this.precioARS = 0;
      }
    },
  },
};
</script>

<style>
.input-field input[type="number"] {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}
</style>
