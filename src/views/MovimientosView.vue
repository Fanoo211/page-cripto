<template>
<div>
  <div class="title">
    <h1>Movimientos</h1>
  </div>

  <div class="row">
    <div class="col m12">
      <div class="container" v-if="tamañoMovimientos">
        <table class="table bordered striped">
          <thead>
            <tr>
              <th>Criptomoneda</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
              <th>Acción</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(movimiento, index) in movimientos" :key="index">
              <td>{{ movimiento.crypto_code.toUpperCase() }}</td>
              <td>{{ movimiento.crypto_amount }}</td>
              <td>ARS {{ movimiento.money }}</td>
              <td>{{ actionTxt(movimiento.action) }}</td>
              <td>{{ movimiento.datetime }}</td>
              <td>
                <a class="waves-effect waves-light btn red" @click="mostrarEliminar(movimiento)"><i class="material-icons">delete</i></a>
              </td>
              <td>
                <a class="waves-effect waves-light btn lightblue" @click="mostrarModificar(movimiento.crypto_code.toUpperCase(), movimiento.crypto_amount)"><i class="material-icons">create</i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container" v-else>
        <p v-if="!cargando">Todavía no ha realizado ningún movimiento!</p>
      </div>
      <div v-if="cargando> 0" class="center-align">
        <p class="animate__animated animate__fadeIn animate__repeat-3">Cargando...</p>
      </div>
    </div>
  </div>

  <div id="modal-eliminar" class="modal">
    <div class="modal-content">
      <h4>Confirmar eliminación</h4>
      <p>¿Estás seguro de que deseas eliminar esta {{ tipoMovimiento }}?</p>
    </div>
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
      <a class="modal-close waves-effect waves-red btn" @click="eliminarMovimiento">Eliminar</a>
    </div>
  </div>

  <div id="modal-modificar" class="modal">
    <div class="container modal-content">
      <div class="row">
        <div class="input-field s6">
          <h4>Modificar</h4>
          <p class="black-text">Cripto:</p> 
          <select class="browser-default custom-select" v-model="criptoSeleccionada">
            <option value="" disabled="" selected="">Seleccione</option>
            <option v-for="(opcion, index) in opcionesCripto" :key="index" :value="opcion">{{ opcion }}</option>
          </select>
        </div>
        <div class="input-field s6">
          <p class="black-text">Cantidad:</p>
          <input type="number" v-model="cantidad" min="1" step="1" class="browser-default" style="width: 540px;"/>
        </div>
      </div>
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Precio en ARS</span>
          <p>ARS {{ precioARS }}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
      <a class="modal-close waves-effect waves-red btn">Modificar</a>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../store/auth.js';
import M from 'materialize-css';

export default{
  name: 'MovimientosView',
  data(){
    return{
      movimientos: [],
      cargando: false,
      movimientoAEliminar: null,
      tipoMovimiento: '',
      opcionesCripto: ['BTC' , 'DAI' , 'ETH' , 'USDT'],
      criptoSeleccionada: '',
      cantidad: 0,
      precioARS: 0,
    }
  },
  computed: {
    usuario() {
      const authStore = useAuthStore();
      return authStore.usuario;
    },
    tamañoMovimientos(){
      return this.movimientos.length > 0;
    },
  },
  watch: {
    criptoSeleccionada: 'obtenerPrecioEnARS',
    cantidad: 'obtenerPrecioEnARS',
  },
  mounted(){
    this.mostrarMovimientos();
    M.Modal.init(document.querySelectorAll('.modal'), {});
  },
  methods: {
    async mostrarMovimientos(){
      let user_id = this.usuario

      try {
        this.cargando = true;
        const response = await axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "${user_id}"}`, {
        headers: {
          'x-apikey': '60eb09146661365596af552f',
          'Content-Type': 'application/json'
        }
      });
        this.movimientos = response.data;
        this.tamañoMovimientos = this.movimientos.length;
        console.log(this.movimientos);
      } catch(error) {
        console.error('Error al obtener las transacciones:', error);
      } finally{
        this.cargando = false;
      }
    },
    actionTxt(action){
      if(action === 'purchase'){
        return 'Compra'
      }else if(action === 'sale'){
        return 'Venta'
      }
    },
    mostrarEliminar(movimiento) {
      this.movimientoAEliminar = movimiento;
      this.tipoMovimiento = this.actionTxt(movimiento.action);
      M.Modal.getInstance(document.querySelector('#modal-eliminar')).open();
    },
    async eliminarMovimiento() {
      M.Modal.getInstance(document.querySelector('#modal-eliminar')).close();
      try {
        const response = await axios.delete(`https://laboratorio3-f36a.restdb.io/rest/transactions/${this.movimientoAEliminar._id}`, {
          headers: {
            'x-apikey': '60eb09146661365596af552f',
            'Content-Type': 'application/json',
          },
        });

        const index = this.movimientos.indexOf(this.movimientoAEliminar);
        if (index !== -1) {
          this.movimientos.splice(index, 1);
        }
        
        console.log(response.data);
      } catch (error) {
        console.error('Error al eliminar el movimiento:', error);
      } finally {
        this.movimientoAEliminar = null;
      }
    },
    mostrarModificar(cripto, cantidad) {
      M.Modal.getInstance(document.querySelector('#modal-modificar')).open();
      this.criptoSeleccionada = cripto;
      this.cantidad = cantidad;
    },
    async obtenerPrecioEnARS() {
      try {
        if (this.criptoSeleccionada && this.cantidad > 0) {
          const response = await axios.get(`https://criptoya.com/api/argenbtc/${this.criptoSeleccionada}/ars`);
          this.precioARS = response.data.ask * this.cantidad;
        } else {
          this.precioARS = 0;
        }
      } catch (error) {
        console.error('Error al obtener el precio en ARS:', error);
        this.precioARS = 0;
      }
    },
  }
}
</script>

<style scoped>

</style>