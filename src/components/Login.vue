<template>
<div>
  <div class="row">

    <div class="col s12 m5 l5" >
      <h2 style="margin-top: 110px">Inicio de Sesión</h2>
      <div class="card">
        <div class="card-content fondo">
          <form @submit.prevent="iniciarSesion">
              <div class="input-field">
                <i class="material-icons prefix white-text">account_circle</i>
                <input id="usuario" type="text" class="validate" v-model="usuario">
                <label for="usuario">Usuario</label>
              </div>

            <div class="row">
                <button type="submit" class="btn waves-effect waves-light green accent-4">INICIAR SESIÓN<i class="material-icons right">input</i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <div class="col s12 m7 l7"> 
      <img src="../assets/fondo-login.jpg" alt="Imagen" class="responsive-img">
    </div>
    
  </div>

   <!-- Footer de inicio de sesión -->
  <div class="row">
    <div class="col s12 center-align">
      <p class="white-text">.</p>
      <p>© 2023 CriptoFano. Todos los derechos reservados.</p>
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

<style scoped>
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
    color: #002CEB !important;
  }
  /* label underline focus color */
  .input-field input[type=text]:focus {
    border-bottom: 1px solid gainsboro !important;
    box-shadow: 0 1px 0 0 #002CEB !important;
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
    color: #002CEB !important;
  }


.fondo{
  background-color: #f0f2f5;
}

</style>
