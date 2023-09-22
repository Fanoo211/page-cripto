<template>
<div class="container">
  <div class="row">
    <div class="col s12 m6 l6">
      <div class="input-field custom-container z-depth-2">
        <h1 class="black-text">Compra</h1>
        <p class="balck-text">Cripto:</p> 
        <select class="input-field" v-model="compraSeleccionada">
          <option value="" disabled="" selected="">Seleccione</option>
          <option v-for="(opcion, index) in opcionesCompra" :key="index" :value="opcion">{{ opcion }}</option>
        </select>
        <div>
          <p class="black-text">Cantidad:</p>
          <input type="number" v-model="cantidad" min="1" step="1" class="input-field"/>
        </div>
        <div class="card z-depth-2">
          <div class="card-content white-text">
            <span class="card-title">Precio en ARS</span>
            <p> {{ numeroConSeparadorDecimales(precioARS) }}</p>
          </div>
        </div>
        <button class="waves-effect waves-light btn yellow darken-3" @click="comprar">Comprar</button>
      </div>
    </div>
    <div class="col s12 m6 l6 tabla">
      <TablaCriptomonedas />
    </div>
  </div>
</div>
</template>


<script>
import TablaCriptomonedas from '../components/TablaCriptomonedas.vue';
import { useUserStore } from '../store/user.js';
import axios from "axios";
import apiClient from '../conexionAPI';
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
          this.precioARS = response.data.totalAsk * this.cantidad;
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
          const response = await apiClient.post("/transactions", datos)

          if(response.status === 201){
            this.mostrarToast('¡Compra guardada correctamente!', 'green accent-4');
            //console.log(datos);
          }
            
        } catch (error) {
          this.mostrarToast('Error en la solicitud a la API', 'red accent-4');
          console.error(error);
        }
      } else {
        this.mostrarToast('Seleccione criptomoneda y cantidad', 'red accent-4');
      }
    },
    numeroConSeparadorDecimales(numero) {
      const opciones = { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 };
      const numeroFormateado = numero.toLocaleString('es-AR', opciones);
      return numeroFormateado.toLocaleString();
    },
  },
};

</script>


<style scoped>
.custom-container {
  max-width: 600px;
  margin-left: 0px;
  margin-top: 25px;
  padding: 20px;
  padding-top: 1px;
  border-radius: 5px;
  background-color: #f0f2f5;
}

.tabla {
  margin-top: 25px;
}

.card{
  background-color: #002CEB;
}
</style>
