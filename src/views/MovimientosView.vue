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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(movimiento, index) in movimientos" :key="index">
              <td>{{ movimiento.crypto_code.toUpperCase() }}</td>
              <td>{{ movimiento.crypto_amount }}</td>
              <td>ARS {{ movimiento.money }}</td>
              <td>{{ actionTxt(movimiento.action) }}</td>
              <td>
                <a class="waves-effect waves-light btn red" @click="mostrarConfirmacion(movimiento)"><i class="material-icons">delete</i></a>
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

  <div id="modal-confirmacion" class="modal">
    <div class="modal-content">
      <h4>Confirmar eliminación</h4>
      <p>¿Estás seguro de que deseas eliminar esta {{ tipoMovimiento }}?</p>
    </div>
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
      <a class="modal-close waves-effect waves-red btn" @click="eliminarMovimiento">Eliminar</a>
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
    mostrarConfirmacion(movimiento) {
      this.movimientoAEliminar = movimiento;
      this.tipoMovimiento = this.actionTxt(movimiento.action);
      M.Modal.getInstance(document.querySelector('#modal-confirmacion')).open();
    },
    async eliminarMovimiento() {
      M.Modal.getInstance(document.querySelector('#modal-confirmacion')).close();
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
  }
}
</script>