<template>
  <div>
    <h1>Compra y Venta</h1>
    <div>
      <label for="compraSelect">Comprar:</label>
      <select id="compraSelect" v-model="compraSeleccionada">
        <option v-for="(opcion, index) in opcionesCompra" :key="index" :value="opcion">{{ opcion }}</option>
      </select>
    </div>
    <div>
      <label for="ventaSelect">Vender:</label>
      <select id="ventaSelect" v-model="ventaSeleccionada">
        <option v-for="(opcion, index) in opcionesVenta" :key="index" :value="opcion">{{ opcion }}</option>
      </select>
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
      compraSeleccionada: null,
      ventaSeleccionada: null,
    };
  },
};
</script>
