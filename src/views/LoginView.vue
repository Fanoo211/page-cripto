<template>
<div>
  <div class="row">

    <div class="col s12 m5 l5" >
      <h2 style="margin-top: 110px">Inicio de Sesión</h2>
      <div class="card">
        <div class="card-content fondo">
          <form>
              <div class="input-field">
                <i class="material-icons prefix white-text">account_circle</i>
                <input id="usuario" type="text" class="validate" v-model="usuario">
                <label for="usuario">Usuario</label>
              </div>

            <div class="row">
                <button type="submit" class="btn waves-effect waves-light green accent-4" @click="sesionIniciada(usuario)">INICIAR SESIÓN<i class="material-icons right">input</i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <div class="col s12 m7 l7"> 
      <img src="../assets/fondo-login.jpg" alt="Imagen" class="responsive-img">
    </div>
    
  </div>

  <div class="row">
    <div class="col s12 center-align">
      <p class="white-text">.</p>
      <p>© 2023 CriptoFano. Todos los derechos reservados.</p>
    </div>
  </div>
</div>
</template>

<script>
import { useUserStore } from '../store/user.js';
import M from 'materialize-css';

export default {
  name: 'LoginView',
  beforeRouteEnter(to, from, next) {
    // Accede a la tienda de usuario y cierra la sesión si está abierta
    const userStore = useUserStore();
    if (userStore.userLogeado) {
      userStore.logout();
    }
    next();
  },
  methods: {
    sesionIniciada(usuario) {
      if (!usuario.trim()) {
        this.mostrarToast('Por favor, ingrese un usuario válido.', 'blue darken-1');
      } else if (usuario.includes(" ")) {
        this.mostrarToast('El usuario no debe contener espacios en blanco.', 'blue darken-1');
      } else {
        let tieneLetras = false;
        let tieneNumeros = false;

        for (let i = 0; i < usuario.length; i++) {
          const char = usuario.charAt(i);
          if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            tieneLetras = true;
          } else if (char >= '0' && char <= '9') {
            tieneNumeros = true;
          }
        }

        if (tieneLetras && tieneNumeros) {
          const userStore = useUserStore();
          userStore.login(usuario);
          this.mostrarToast('¡SESIÓN INICIADA!', 'green accent-4');
          this.$router.push({ name: 'HomeView' });
        } else {
          this.mostrarToast('El usuario debe contener al menos una letra y un número.', 'blue darken-1');
        }
      }
    },
    mostrarToast(mensaje, color) {
      M.Toast.dismissAll();
      M.toast({ html: mensaje, classes: `${color}` });
    },
  },
};
</script>