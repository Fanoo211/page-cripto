<template>
  <div class="container">
    <h1 class="white-text">Compra</h1>
    <div class="container">  
      <div class="row">
        <div class="input-field s6">  
          <h7 class="white-text">Comprar:</h7> 
          <select class="btn" v-model="compraSeleccionada">
            <option value="" disabled="" selected="">Seleccione</option>
            <option v-for="(opcion, index) in opcionesCompra" :key="index" :value="opcion">{{ opcion }}</option>
          </select>
        </div>
        <div class="input-field s6">
          <h7 class="white-text">Cantidad:</h7>
          <input type="number" v-model="cantidad" min="1" step="1" class="validate white">
        </div>
      </div>
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Precio en ARS</span>
          <p>{{ precioARS }}</p>
        </div>
      </div>



    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'CompraView',
  data() {
    return {
      opcionesCompra: ['BTC' , 'DAI' , 'ETH' , 'USDT'],
      compraSeleccionada: '',
      cantidad: 0,
      precioARS: 0,
    };
  },
  watch: {
    compraSeleccionada: 'obtenerPrecioEnARS',
    cantidad: 'obtenerPrecioEnARS',
  },
  methods: {
    async obtenerPrecioEnARS() {
      try {
        if (this.compraSeleccionada && this.cantidad > 0) {
          const response = await axios.get(`https://criptoya.com/api/argenbtc/${this.compraSeleccionada}/ars`);
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
