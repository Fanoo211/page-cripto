<template>
  <div>
    <a class="dropdown-trigger valign-wrapper" href="#" data-target="dropdown1" style="font-size: 16px">Transacciones <span class="material-symbols-outlined right icon-spacing">currency_exchange</span></a>
    <ul id="dropdown1" class="dropdown-content">
      <li>
        <router-link :to="{ name: 'CompraView' }" class="valign-wrapper titles">
          Compra
          <span class="material-symbols-outlined right icon-spacing">attach_money</span> <!-- shopping_cart !-->
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'VentaView' }" class="valign-wrapper titles">
          Venta
          <span class="material-symbols-outlined right icon-spacing">sell</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  mounted() {
    // Inicializar el menú desplegable después de que se renderiza el componente
    const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elemsDropdown);
  }
};
</script>

<style scoped>
.icon-spacing {
  margin-left: 12px;
}

.dropdown-content{
  background-color: #002CEB;
}

.titles{
  color: white;
}
</style>