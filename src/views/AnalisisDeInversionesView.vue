<template>
  <div>
    <h1>Análisis de Inversiones</h1>

    <div class="container z-depth-2" v-if="tamañoMovimientos">
      <table class="highlight centered responsive-table" v-if="!cargando">
        <thead class="colorThead white-text">
          <tr>
            <th>Criptomoneda</th>
            <th>Inversion (ARS)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(total, criptoCode) in totales" :key="criptoCode">
            <td>{{ criptoCode.toUpperCase() }}</td>
            <td :class="total.dinero < 0 ? 'texto-rojo' : 'texto-verde'"> {{ numeroConSeparadorDecimales(total.dinero) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container" v-else>
      <p v-if="!cargando">Todavía no ha realizado ningún movimiento!</p>
    </div>

    <div v-if="cargando" class="center-align">
      <p class="animate__animated animate__fadeIn animate__repeat-3">Cargando...</p>
    </div>

  </div>
</template>

<script>
import { useUserStore } from '../store/user.js';
import axios from 'axios';
import apiClient from '../conexionAPI';

export default {
  name: 'AnalisisDeInversionesView',
  data() {
    return {
      movimientos: [],
      totales: {},
      cargando: false,
      criptos: ['btc' , 'dai' , 'eth' , 'usdt'],
    }
  },
  computed: {
    usuario() {
      const userStore = useUserStore();
      return userStore.usuario;
    },
    tamañoMovimientos(){
      return this.movimientos.length > 0;
    },    
  },
  mounted(){
    this.obtenerMovimientos();
  },
  methods: {
    async obtenerMovimientos() {
      let user_id = this.usuario;

      try {
        this.cargando = true;
        const response = await apiClient.get(`/transactions?q={"user_id": "${user_id}"}`)

        this.movimientos = response.data;
        await this.calcularTotales();
      } catch (error) {
        console.error('Error al obtener los movimientos:', error);
      } finally {
        this.cargando = false;
      }
    },
    async obtenerPrecioEnARS(cripto) {
      try {
        const response = await axios.get(`https://criptoya.com/api/argenbtc/${cripto}/ars`);

        return response.data.totalBid;
      } catch (error) {
        console.error('Error al obtener el precio en ARS:', error);
        return 0;
      }
    },
    async calcularTotales() {
      this.totales = {};
      for(const cripto of this.criptos){
        const precioEnARS = await this.obtenerPrecioEnARS(cripto);
        let sumaCantidad = 0;
        let sumaDinero = 0;

        for(const movimiento of this.movimientos){
          if(movimiento.crypto_code == cripto){
            if(movimiento.action == 'purchase'){
              sumaCantidad += parseFloat(movimiento.crypto_amount);
              sumaDinero += parseFloat(movimiento.money);
              if(cripto == 'btc'){
                console.log('COMPRA: ',movimiento.money)
              }
              
            }
            else if(movimiento.action == 'sale'){
              sumaCantidad -= parseFloat(movimiento.crypto_amount);
              sumaDinero -= parseFloat(movimiento.money);
              if(cripto == 'btc'){
                console.log('VENTA: ',movimiento.money)
              }
            }
          }
        }

        //console.log(cripto, sumaCantidad);
        const precioActual = sumaCantidad * precioEnARS;

        if (!this.totales[cripto]) {
          //console.log(precioActual, sumaDinero)
          this.totales[cripto] = { dinero: precioActual - sumaDinero };
        }

        sumaCantidad = 0;
        sumaDinero = 0;
      
      }

    },
    numeroConSeparadorDecimales(numero) {
      const opciones = { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 };
      const numeroFormateado = numero.toLocaleString('es-AR', opciones);
      return numeroFormateado.toLocaleString();
    },
  }
}
</script>

<style scoped>
.colorThead {
  background-color: #002CEB;
}
.texto-rojo {
  color: red;
}

.texto-verde {
  color: green;
}

</style>