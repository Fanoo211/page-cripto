<template>
<div class="container left custom-container">
  <div class="row">
    <div class="input-field s6">
      <h1>Compra</h1>
      <p class="black-text">Cripto:</p> 
      <div class="white">
        <select class="input-field col s12 custom-select black-text" v-model="compraSeleccionada">
          <option value="" disabled="" selected="">Seleccione</option>
          <option v-for="(opcion, index) in opcionesCompra" :key="index" :value="opcion">{{ opcion }}</option>
        </select>
      </div>
    </div>
    <p class="black-text">Cantidad:</p>
    <div class="input-field s6 white">
      <input type="number" v-model="cantidad" min="1" step="1" class="input-field col s12 white"/>
    </div>
  </div>
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">Precio en ARS</span>
      <p>ARS {{ precioARS.toFixed(2) }}</p>
    </div>
  </div>
  <button class="waves-effect waves-light btn yellow darken-3" @click="comprar">Comprar</button>
</div>

<div class="input-field s6 right">
  <TablaCriptomonedas />
</div>
</template>


<script>
import TablaCriptomonedas from '../components/TablaCriptomonedas.vue';
import { useUserStore } from '../store/user.js';
import axios from 'axios';
import M from 'materialize-css';

export default {
  name: 'CompraView',
  components: {
    TablaCriptomonedas,
  },
  computed: {
    usuario() {
      const userStore = useUserStore();
      return userStore.usuario;
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
  mounted(){
    M.FormSelect.init(document.querySelectorAll('select'), {});
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
    mostrarToast(mensaje, color) {
      M.Toast.dismissAll();
      M.toast({ html: mensaje, classes: `${color}` });
    },
    async comprar() {
      if (this.cantidad > 0 && this.precioARS > 0) {
        const datetime = new Date().toISOString();

        const datos = {
          user_id: this.usuario,
          action: 'purchase',
          crypto_code: this.compraSeleccionada.toLowerCase(),
          crypto_amount: this.cantidad.toString(),
          money: this.precioARS.toFixed(2),
          datetime: datetime,
        };

        try {
          const response = await axios.post('https://laboratorio3-5459.restdb.io/rest/transactions', datos, {
            headers: {
              'x-apikey':'64a57c2b86d8c50fe6ed8fa5',
              'Content-Type': 'application/json'
            },
          })

          if(response.status === 201){
            this.mostrarToast('¡Compra guardada correctamente!', 'green accent-4');
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

.custom-container {
  max-width: 600px;
  margin-left: 10px;
  margin-top: 30px;
  padding: 20px;
  padding-top: 0px;
  border-radius: 5px;
  background-color: #353132;
}

.custom-select {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
