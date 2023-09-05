<template>
  <div>
    <h1>Estado Actual de Criptomonedas</h1>

    <div class="container" v-if="tamañoMovimientos">
      <table class="highlight centered responsive-table">
        <thead class="colorThead white-text">
          <tr>
            <th>Criptomoneda</th>
            <th>Total Criptomonedas</th>
            <th>Total Dinero (ARS)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(total, criptoCode) in totales" :key="criptoCode">
            <td>{{ criptoCode }}</td>
            <td>{{ total.cantidad }}</td>
            <td> {{ numeroConSeparadorDecimales(total.dinero) }}</td>
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
import axios from 'axios';
import { useUserStore } from '../store/user.js';

export default {
  name: 'EstadoActualView',
  data() {
    return {
      movimientos: [],
      totales: {},
      cargando: false,
    };
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
  mounted() {
    this.mostrarMovimientos();
  },
  methods: {
    async mostrarMovimientos() {
      let user_id = this.usuario;

      try {
        this.cargando = true;
        const response = await axios.get(`https://laboratorio3-5459.restdb.io/rest/transactions?q={"user_id": "${user_id}"}`, {
          headers: {
            'x-apikey': '64a57c2b86d8c50fe6ed8fa5',
            'Content-Type': 'application/json'
          }
        });

        this.movimientos = response.data;
        await this.calcularTotales();
      } catch (error) {
        console.error('Error al obtener los movimientos:', error);
      } finally {
        this.cargando = false;
      }
    },
    async obtenerPrecioEnARS(opcion) {
      try {
        const response = await axios.get(`https://criptoya.com/api/argenbtc/${opcion}/ars`);
        return response.data.ask;
      } catch (error) {
        console.error('Error al obtener el precio en ARS:', error);
        return 0;
      }
    },
    async calcularTotales() {
      this.totales = {};
      for (const movimiento of this.movimientos) {
        const criptoCode = movimiento.crypto_code.toUpperCase();
        const cantidad = parseFloat(movimiento.crypto_amount);

        const precioEnARS = await this.obtenerPrecioEnARS(criptoCode);

        if (!this.totales[criptoCode]) {
          this.totales[criptoCode] = { cantidad: 0, dinero: 0 };
        }
        if (movimiento.action === 'purchase') {
          this.totales[criptoCode].cantidad += cantidad;
          this.totales[criptoCode].dinero += cantidad * precioEnARS;
        } else if (movimiento.action === 'sale') {
          this.totales[criptoCode].cantidad -= cantidad;
          this.totales[criptoCode].dinero -= cantidad * precioEnARS;
        }
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
.colorThead {
  background-color: #002CEB;
}
</style>


