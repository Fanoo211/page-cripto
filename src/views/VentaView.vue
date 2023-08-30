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

<div class="input-field s6 right">
  <TablaCriptomonedas />
</div>

</template>

<script>
import TablaCriptomonedas from '../components/TablaCriptomonedas.vue';
import { useUserStore } from '@/store/user';
import { useTotalesStore } from '../store/totales.js';
import axios from 'axios';
import M from 'materialize-css';

export default {
  name: 'VentaView',
  components: {
    TablaCriptomonedas,
  },
  computed: {
    usuario() {
      const userStore = useUserStore();
      return userStore.usuario;
    },
    totales() {
      const totalesStore = useTotalesStore();
      return totalesStore.totales;
    },
  },
  data() {
    return {
      opcionesVenta: ['BTC' , 'DAI' , 'ETH' , 'USDT'],
      ventaSeleccionada: '',
      cantidad: 0,
      precioARS: 0,
      movimientos: [],
      sumaCantidadVenta: 0,
    };
  },
  mounted(){
    M.FormSelect.init(document.querySelectorAll('select'), {});

    this.obtenerMovimientos();
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
      for(let movimiento of this.movimientos) {
        if(movimiento.crypto_code === this.ventaSeleccionada.toLowerCase() && movimiento.action === 'purchase'){
          this.sumaCantidadVenta += parseFloat(movimiento.crypto_amount);
        }
        if(movimiento.crypto_code === this.ventaSeleccionada.toLowerCase() && movimiento.action === 'sale'){
          this.sumaCantidadVenta -= parseFloat(movimiento.crypto_amount);
        }
      }

      if (this.cantidad > 0 && this.precioARS > 0) {
        if(this.cantidad <= this.sumaCantidadVenta){
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
            const response = await axios.post('https://laboratorio3-5459.restdb.io/rest/transactions', datos, {
              headers: {
                'x-apikey':'64a57c2b86d8c50fe6ed8fa5',
                'Content-Type': 'application/json'
              },
            })

            if(response.status === 201){
              this.mostrarToast('Venta guardada correctamente!', 'green accent-4');
              this.sumaCantidadVenta = 0;
            }
              
          } catch (error) {
            this.mostrarToast('Error en la solicitud a la API', 'red accent-4');
            console.error(error);
          }        
        } else {
          this.mostrarToast('Fondos insuficientes para la venta', 'red accent-4');
          this.sumaCantidadVenta = 0;
        }

      } else {
        this.mostrarToast('Seleccione criptomoneda y cantidad', 'red accent-4');
      }
    },
    async obtenerMovimientos() {
      let user_id = this.usuario

      try {
        const response = await axios.get(`https://laboratorio3-5459.restdb.io/rest/transactions?q={"user_id": "${user_id}"}`, {
        headers: {
          'x-apikey': '64a57c2b86d8c50fe6ed8fa5',
          'Content-Type': 'application/json'
        }
      });
        this.movimientos = response.data;
      } catch(error) {
        console.error('Error al obtener los movimientos:', error);
      }   
    }
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
