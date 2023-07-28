<template>
  <div class="container">
    <h1>Compra y Venta</h1>
    <div class="container">  
      <div class="row">
        <div class="input-field s6">  
          <h7>Comprar:</h7>    
          <select class="browser-default waves-effect waves-light btn" v-model="compraSeleccionada">
            <option value="" disabled="" selected="">Seleccione</option>
            <option v-for="(opcion, index) in opcionesCompra" :key="index" :value="opcion">{{ opcion }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="container">  
      <div class="row">
        <div class="input-field s6">    
          <h7>Vender:</h7>  
          <select class="browser-default waves-effect waves-light btn" v-model="ventaSeleccionada">
            <option value="">Seleccione</option>
            <option v-for="(opcion, index) in opcionesVenta" :key="index" :value="opcion">{{ opcion }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompraVentaView',
  data() {
    return {
      opcionesCompra: ['BTC', 'ETH', 'USDT', 'ADA'],
      opcionesVenta: ['BTC', 'ETH', 'USDT', 'ADA'],
      compraSeleccionada: '',
      ventaSeleccionada: '',
    };
  },
};
</script>
