<template>
  <div class="containerCompra">
    <h1>Compra y Venta</h1>

      <div class="col m4">
        <div class="row">
          <div>
            <select class="browser-default" v-model="compraSeleccionada">
              <option v-for="(opcion, index) in opcionesCompra" :key="index" :value="opcion">{{ opcion }}</option>
            </select>
            <label>Comprar:</label>
          </div>
          <div>
            <select class="browser-default" v-model="ventaSeleccionada">
              <option v-for="(opcion, index) in opcionesVenta" :key="index" :value="opcion">{{ opcion }}</option>
            </select>
            <label>Vender:</label>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      opcionesCompra: ['BTC', 'ETH', 'USDT', 'ADA'],
      opcionesVenta: ['BTC', 'ETH', 'USDT', 'ADA'],
      compraSeleccionada: null,
      ventaSeleccionada: null,
    };
  },
};
</script>
