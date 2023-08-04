<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <form @submit.prevent="iniciarSesion" class="center-align">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix white-text">account_circle</i>
              <input id="usuario" type="text" class="validate white" v-model="usuario">
              <label for="usuario">Usuario</label>
            </div>
          </div>

          <div class="row">
            <div class="col s12">
              <button type="submit" class="btn waves-effect waves-light green accent-4">INICIAR SESIÓN<i class="material-icons right">input</i></button>
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

.btn {
  background-color: #00796B;
  color: #fff;
  border-radius: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

  /* label color */

   /* label focus color */
   .input-field input[type=text]:focus + label {
     color: #ffffff !important;
   }
   /* label underline focus color */
   .input-field input[type=text]:focus {
     border-bottom: 1px solid gainsboro !important;
     box-shadow: 0 1px 0 0 #ffffff !important;
   }
   /* valid color */
   .input-field input[type=text].valid {
     border-bottom: 1px solid gainsboro !important;
     box-shadow: 0 1px 0 0 #ffffff !important;
   }
   /* invalid color */
   .input-field input[type=text].invalid {
     border-bottom: 1px solid gainsboro !important;
     box-shadow: 0 1px 0 0 #ffffff !important;
   }
   /* icon prefix focus color */
   .input-field .prefix.active {
     color: #ffffff !important;
   }
   
</style>
