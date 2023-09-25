<template>
    <div>
      <table class="striped centered tabla z-depth-2" v-if="!cargando">
        <thead class="theadColor">
          <tr>
            <th>Criptomoneda</th>
            <th>Valor de Compra (ARS)</th>
            <th>Valor de Venta (ARS)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(opcion, index) in opcionesCripto" :key="index">
            <td>{{ opcion.toUpperCase() }}</td>
            <td v-if="typeof valorCompra[index] === 'number'"> {{ numeroConSeparadorDecimales(valorCompra[index]) }}</td>
            <td v-if="typeof valorVenta[index] === 'number'"> {{ numeroConSeparadorDecimales(valorVenta[index]) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="cargando" class="center-align">
      <p class="animate__animated animate__fadeIn animate__repeat-3">Cargando...</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TablaCriptomonedas',
  data(){
    return{
      opcionesCripto: ['btc' , 'dai' , 'eth' , 'usdt'],
      valorCompra: [],
      valorVenta: [],
      cargando: false,
    }
  },
  mounted(){
    this.obtenerPrecioEnARS();
  },
  methods: {
    async obtenerPrecioEnARS() {
      try {
        this.cargando = true;
        for(let opcion of this.opcionesCripto){
          const response = await axios.get(`https://criptoya.com/api/argenbtc/${opcion}/ars`);
          this.valorCompra.push(response.data.totalAsk);
          this.valorVenta.push(response.data.totalBid);
        }
      } catch (error) {
        console.error('Error al obtener el precio en ARS:', error);
      } finally {
        this.cargando = false;
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
.tabla {
  background-color: #3F4240;
  color: white;
}
.theadColor {
  background-color: black;
}
</style>