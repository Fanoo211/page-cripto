<template>
<div class="container white left custom-container">
  <div class="row">
    <div class="input-field s6">
      <h1>Compra</h1>  
      
      <select class="browser-default custom-select" v-model="compraSeleccionada">
        <option value="" disabled="" selected="">Seleccione</option>
        <option v-for="(opcion, index) in opcionesCompra" :key="index" :value="opcion">{{ opcion }}</option>
      </select>
    </div>
    <div class="input-field s6">
      
      <input type="number" v-model="cantidad" min="1" step="1" class="browser-default">
    </div>
  </div>
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">Precio en ARS</span>
      <p>${{ precioARS }}</p>
    </div>
  </div>
  <button class="waves-effect waves-light btn yellow darken-3" @click="comprar">Comprar</button>
</div>
</template>


<script>
import { useAuthStore } from '../store/auth.js';
import axios from '../conexionAPI.js';
import M from 'materialize-css';

export default {
  name: 'CompraView',
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.usuario;
    }
  },
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
    async comprar() {
      if (this.cantidad > 0 && this.precioARS > 0) {
        const datetime = new Date().toISOString();

        const datos = {
          user_id: this.usuario,
          action: 'purchase',
          crypto_code: this.compraSeleccionada.toLowerCase(),
          crypto_amount: this.cantidad.toString(),
          money: this.precioARS.toString(),
          datetime: datetime,
        };

        try {
          const response = await axios.post('https://laboratorio3-f36a.restdb.io/rest/transactions', datos);
          

          if (response.data.success) {
            M.toast({ html: '¡Compra guardada correctamente!', classes: 'green accent-4' });
          } else {
            M.toast({ html: 'Error al guardar la compra', classes: 'red accent-4' });
            console.log(datos);
          }
        } catch (error) {
          M.toast({ html: 'Error en la solicitud a la API', classes: 'red accent-4' });
          console.error(error);
        }
      } else {
        M.toast({ html: 'La cantidad de criptomoneda y el dinero gastado deben ser mayores a 0', classes: 'red accent-4' });
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


.browser-default{
  background-color: #FFB70C;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.custom-container {
  max-width: 600px;
  margin-left: 10px;
  margin-top: 50px;
  padding: 20px;
  padding-top: 0px;
  border-radius: 5px;
}

.custom-select{
  font-family: Avenir, Helvetica, Arial, sans-serif;;
}

</style>
