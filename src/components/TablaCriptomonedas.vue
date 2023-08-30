<template>
    <div>
      <table class="striped centered responsive-table">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Valor Unitario</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(opcion, index) in opcionesCripto" :key="index">
            <td>{{ opcion }}</td>
            <td>{{ valorCripto[index] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TablaCriptomonedas',
  data(){
    return{
      opcionesCripto: ['btc' , 'dai' , 'eth' , 'usdt'],
      valorCripto: [],
    }
  },
  mounted(){
    this.obtenerPrecioEnARS();
  },
  methods: {
    async obtenerPrecioEnARS() {
      try {
        for(let opcion of this.opcionesCripto){
          const response = await axios.get(`https://criptoya.com/api/argenbtc/${opcion}/ars`);
          this.valorCripto.push(response.data.ask);
        }
      } catch (error) {
        console.error('Error al obtener el precio en ARS:', error);
        this.precioARS = 0;
      }
    },
  }
}
</script>