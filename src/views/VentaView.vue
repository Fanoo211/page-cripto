<template>
<div class="container left custom-container">
  <div class="row">
    <div class="input-field s6">
      <h1>Venta</h1>  
      <p class="black-text">Cripto:</p> 
      <select class="input-field col s12 custom-select" v-model="ventaSeleccionada">
        <option value="" disabled="" selected="">Seleccione</option>
        <option v-for="(opcion, index) in opcionesVenta" :key="index" :value="opcion">{{ opcion }}</option>
      </select>
    </div>
    <div class="input-field s6">
      <p class="black-text">Cantidad:</p>
      <input type="number" v-model="cantidad" min="1" step="1" class="input-field col s12">
    </div>
  </div>
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">Precio en ARS</span>
      <p>ARS {{ precioARS.toFixed(2) }}</p>
    </div>
  </div>
  <button class="waves-effect waves-light btn yellow darken-3" @click="vender">Vender</button>
</div>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import M from 'materialize-css';

export default {
  name: 'VentaView',
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.usuario;
    }
  },
  data() {
    return {
      opcionesVenta: ['BTC' , 'DAI' , 'ETH' , 'USDT'],
      ventaSeleccionada: '',
      cantidad: 0,
      precioARS: 0,
    };
  },
  mounted(){
    M.FormSelect.init(document.querySelectorAll('select'), {});
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
    mostrarToast(mensaje, color) {
      M.Toast.dismissAll();
      M.toast({ html: mensaje, classes: `${color}` });
    },
    async vender() {
      if (this.cantidad > 0 && this.precioARS > 0) {
        const datetime = new Date().toISOString();

        const datos = {
          user_id: this.usuario,
          action: 'sale',
          crypto_code: this.ventaSeleccionada.toLowerCase(),
          crypto_amount: this.cantidad.toString(),
          money: this.precioARS.toFixed(2),
          datetime: datetime,
        };

        try {
          const response = await axios.post('https://laboratorio3-f36a.restdb.io/rest/transactions', datos, {
            headers: {
              'x-apikey':'60eb09146661365596af552f',
              'Content-Type': 'application/json'
            },
          })

          if(response.status === 201){
            this.mostrarToast('Venta guardada correctamente!', 'green accent-4');
            console.log(datos);
          }
            
        } catch (error) {
          this.mostrarToast('Error en la solicitud a la API', 'red accent-4');
          console.error(error);
        }
      } else {
        this.mostrarToast('Seleccione criptomoneda y cantidad', 'red accent-4');
      }
    },
  },
};
</script>

<style scoped>
.input-field input[type="number"] {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.browser-default {
  background-color: #ffb70c;
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
  background-color: orangered;
}

.custom-select {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
