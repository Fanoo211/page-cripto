<template>
<div>
  <div class="title">
    <h1>Movimientos</h1>
  </div>

  <div class="row">
    <div class="col m12">
      <div class="container z-depth-2" v-if="tamañoMovimientos">
        <table class="highlight centered responsive-table">
          <thead>
            <tr class="colorThead white-text">
              <th>Criptomoneda</th>
              <th>Acción</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(movimiento, index) in movimientos" :key="index">
              <td>{{ movimiento.crypto_code.toUpperCase() }}</td>
              <td>{{ actionTxt(movimiento.action) }}</td>
              <td>{{ formatearFecha(movimiento.datetime) }}</td>
              <td>
                <a class="waves-effect waves-light btn yellow botones" @click="mostrarInfo(movimiento)"><i class="material-icons">info_outline</i></a>
                <a class="waves-effect waves-light btn lightblue botones" @click="mostrarModificar(movimiento)"><i class="material-icons">create</i></a>
                <a class="waves-effect waves-light btn red botones" @click="mostrarEliminar(movimiento)"><i class="material-icons">delete</i></a>
              </td>
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
      <div class="input-field custom-container">
        <h1 class="black-text">Modificar</h1>
        <p class="balck-text">Cripto:</p> 
        <select class="input-field" v-model="criptoSeleccionada">
          <option value="" disabled="" selected="">Seleccione</option>
          <option v-for="(opcion, index) in opcionesCripto" :key="index" :value="opcion">{{ opcion }}</option>
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
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
      <a class="modal-close waves-effect waves-red btn" @click="modificarMovimiento()">Modificar</a>
    </div>
  </div>

  <div id="modal-info" class="modal">
    <div class="container modal-content">
      <div v-if="movimientoAMostrar != null">
        <h1>{{ actionTxt(movimientoAMostrar.action) }}</h1>
        <p>Usuario: {{ movimientoAMostrar.user_id }}</p>
        <p>Criptomoneda: {{ movimientoAMostrar.crypto_code.toUpperCase() }}</p>
        <p>Cantidad: {{ parseFloat(movimientoAMostrar.crypto_amount) % 1 === 0 ? parseFloat(movimientoAMostrar.crypto_amount) : parseFloat(movimientoAMostrar.crypto_amount).toFixed(1) }}</p>
        <p>Precio Total (ARS): {{ numeroConSeparadorDecimales(parseFloat(movimientoAMostrar.money)) }}</p>
        <p>Fecha: {{ formatearFecha(movimientoAMostrar.datetime) }}</p>
      </div>
    </div>
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
    </div>
  </div>

</div>
</template>

<script>
import { useUserStore } from '../store/user.js';
import axios from 'axios';
import apiClient from '../conexionAPI';
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
      movimientoAModificar: null,
      movimientoAMostrar: null,
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
  watch: {
    criptoSeleccionada: 'obtenerPrecioEnARS',
    cantidad: 'obtenerPrecioEnARS',
  },
  mounted(){
    this.obtenerMovimientos();
    M.Modal.init(document.querySelectorAll('.modal'), {});
    M.FormSelect.init(document.querySelectorAll('select'), {});
  },
  methods: {
    async obtenerMovimientos(){
      let user_id = this.usuario

      try {
        this.cargando = true;
        const response = await apiClient.get(`/transactions?q={"user_id": "${user_id}"}`)

        this.movimientos = response.data;
        //this.tamañoMovimientos = this.movimientos.length;
        
      } catch(error) {
        console.error('Error al obtener los movimientos:', error);
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
    mostrarToast(mensaje, color) {
      M.Toast.dismissAll();
      M.toast({ html: mensaje, classes: `${color}` });
    },
    mostrarEliminar(movimiento) {
      if (this.cargando) {
        this.mostrarToast('Espere un momento.', 'red accent-4');
        return;
      }

      this.movimientoAEliminar = movimiento;
      this.tipoMovimiento = this.actionTxt(movimiento.action);
      M.Modal.getInstance(document.querySelector('#modal-eliminar')).open();
    },
    async eliminarMovimiento() {
      M.Modal.getInstance(document.querySelector('#modal-eliminar')).close();
      try {
        this.cargando = true;
        const response = await apiClient.delete(`/transactions/${this.movimientoAEliminar._id}`)

       await this.obtenerMovimientos();
       this.mostrarToast('Registro eliminado correctamente!', 'green accent-4');

        console.log(response.data);
      } catch (error) {
        console.error('Error al eliminar el movimiento:', error);
        this.mostrarToast('Error al eliminar el movimiento.', 'red accent-4');
      } finally {
        this.cargando = false;
        this.movimientoAEliminar = null;
      }
    },
    async obtenerPrecioEnARS() {
      try {
        if (this.criptoSeleccionada && this.cantidad > 0) {
          const response = await axios.get(`https://criptoya.com/api/argenbtc/${this.criptoSeleccionada}/ars`);

          if (this.movimientoAModificar && this.movimientoAModificar.action === 'purchase') {
            this.precioARS = response.data.totalAsk * this.cantidad;
          } else if (this.movimientoAModificar && this.movimientoAModificar.action === 'sale') {
            this.precioARS = response.data.totalBid * this.cantidad;
          } else {
            this.precioARS = 0;
          }

        } else {
          this.precioARS = 0;
        }
      } catch (error) {
        console.error('Error al obtener el precio en ARS:', error);
        this.precioARS = 0;
      }
    },
    mostrarModificar(movimiento) {
      this.movimientoAModificar = movimiento;
      M.Modal.getInstance(document.querySelector('#modal-modificar')).open();
      this.criptoSeleccionada = movimiento.crypto_code.toUpperCase();
      this.cantidad = movimiento.crypto_amount;
    },
    async modificarMovimiento(){
      M.Modal.getInstance(document.querySelector('#modal-modificar')).close();
        const datosNuevos = {
        crypto_code: this.criptoSeleccionada.toLowerCase(),
        crypto_amount: this.cantidad.toString(),
        money: this.precioARS.toFixed(2),
      };

      console.log(datosNuevos);

      try {
        await apiClient.patch(`/transactions/${this.movimientoAModificar._id}`, datosNuevos)

        this.obtenerMovimientos();
        this.mostrarToast('Registro modificado correctamente!', 'green accent-4');

      } catch(error) {
        console.error('Error al modificar el movimientos:', error);
        this.mostrarToast('Error al modificar el movimiento.', 'red accent-4');
      } finally {
        this.movimientoAModificar = null;
      }
    },
    mostrarInfo(movimiento){
      if (this.cargando) {
        this.mostrarToast('Espere un momento.', 'red accent-4');
        return;
      }

      this.movimientoAMostrar = movimiento;
      M.Modal.getInstance(document.querySelector('#modal-info')).open();
    },
    formatearFecha(fechaISO){
      const fecha = new Date(fechaISO);

      const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      const formato = new Intl.DateTimeFormat('es-ES', opciones);
      const fechaFormateada = formato.format(fecha);

      return fechaFormateada + "hs";
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
.botones{
  margin: 5%;
  margin-right: 10px;
}
.custom-container {
  max-width: 600px;
  margin-left: 0px;
  margin-top: 25px;
  padding: 20px;
  padding-top: 1px;
  border-radius: 5px;
  background-color: #f0f2f5;
}
.card{
  background-color: #002CEB;
}
</style>