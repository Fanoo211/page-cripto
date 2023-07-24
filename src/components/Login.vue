<template>
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="iniciarSesion">

        <div class="row">
          <div class="col m3">
            <label>Usuario</label>
            <input type="text" v-model="usuario">
          </div>
        </div>

        <div class="row">
          <div class="col m3">
            <button type="submit" class="btn">INICIAR SESIÓN<i class="material-icons right">security</i></button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
    export default{
        name: 'LoginView',
        data(){
          return{
            usuario: ''
          }
        },
        methods: {
          async iniciarSesion(){
            this.$emit('login-success', this.usuario);
          }
        }
    }
</script>