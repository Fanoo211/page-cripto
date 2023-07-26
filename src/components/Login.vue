<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <form @submit.prevent="iniciarSesion" class="center-align">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input id="usuario" type="text" class="validate" v-model="usuario">
              <label for="usuario">Usuario</label>
            </div>
          </div>

          <div class="row">
            <div class="col s12">
              <button type="submit" class="btn waves-effect waves-light">INICIAR SESIÓN<i class="material-icons right">input</i></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
//import M from 'materialize-css'
export default{
    name: 'LoginForm',
    data(){
      return{
        usuario: '',
        toastInstance: null
      }
    },
    methods: {
      async iniciarSesion(){
        this.$emit('login-exitoso', this.usuario);
      }
    }
}
</script>

<style>
/* Personalización del formulario */
.input-field {
  margin-bottom: 20px;
}

/* Personalización del botón de iniciar sesión */
.btn {
  background-color: #00796B;
  color: #fff;
  border-radius: 5px;
}
</style>
