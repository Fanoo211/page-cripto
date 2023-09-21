<template>
  <nav class="nav-bar">
    <div class="nav-wrapper">
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons" v-if="userLogeado">menu</i></a>

      <div class="sideNavbar">
        <ul class="sidenav" id="mobile-demo">
          <li><router-link :to="{name: 'HomeView'}" @click="cerrarSidenav">Inicio</router-link></li>
          <li><router-link :to="{name: 'CompraView'}" @click="cerrarSidenav">Comprar</router-link></li>
          <li><router-link :to="{name: 'VentaView'}" @click="cerrarSidenav">Vender</router-link></li>
          <li><router-link :to="{name: 'MovimientosView'}" @click="cerrarSidenav">Movimientos</router-link></li>
          <li><router-link :to="{name: 'EstadoActualView'}" @click="cerrarSidenav">Estado Actual</router-link></li>
          <li><router-link :to="{name: 'AnalisisDeInversionesView'}" @click="cerrarSidenav">Análisis De Inversiones</router-link></li>
          <li v-if="userLogeado">
            <a class="waves-effect waves-light btn red white-text accent-4" @click="cerrarSesion">
              Cerrar Sesión <i class="material-icons right">exit_to_app</i>
            </a>
          </li>
        </ul>
      </div>

      <div class="botonesNavbar">
        <div class="logoutNavbar">
          <ul class="right hide-on-med-and-down">
            <li v-if="userLogeado">
              <a class="waves-effect waves-light btn red white-text accent-4" @click="cerrarSesion">
                Cerrar Sesión <i class="material-icons right">exit_to_app</i>
              </a>
            </li>
          </ul>
        </div>


        <router-link :to="{name: 'HomeView'}" class="brand-logo center" title="Inicio">
          CriptoFano
          <img src="../assets/logoPage.png" alt="logoPage" class="logo-page left">
        </router-link>

        <div class="viewsNavbar">
          <ul class="left hide-on-med-and-down" v-if="userLogeado">
            <li><DropdownMenu /></li>
            <li><router-link :to="{name: 'MovimientosView'}" class="valign-wrapper" >Movimientos<span class="material-symbols-outlined right icon-spacing">swap_horiz</span></router-link></li>
            <li><router-link :to="{name: 'EstadoActualView'}" class="valign-wrapper" >Estado Actual<span class="material-symbols-outlined right icon-spacing">info</span></router-link></li>
            <li><router-link :to="{name: 'AnalisisDeInversionesView'}" class="valign-wrapper" >Inveriones<span class="material-symbols-outlined right icon-spacing">trending_up</span></router-link></li>
          </ul>
        </div>

      </div>

    </div>
  </nav>
</template>

<script>
import DropdownMenu from '../components/DropdownMenu.vue';
import { useUserStore } from '../store/user.js';
import M from 'materialize-css';

export default{
  name: 'NavBar',
  components: {
    DropdownMenu
  },
  computed: {
    userLogeado() {
      const userStore = useUserStore();
      return userStore.userLogeado;
    },
  },
  mounted(){
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
  },
  methods: {
    cerrarSesion() {
      const userStore = useUserStore();
      userStore.logout();
      this.mostrarToast('¡SESIÓN CERRADA!', 'red accent-4');
      this.cerrarSidenav();
    },
    mostrarToast(mensaje, color) {
      M.Toast.dismissAll();
      M.toast({ html: mensaje, classes: `${color}` });
    },
    cerrarSidenav(){
      M.Sidenav.getInstance(document.querySelector('.sidenav')).close();
    },
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: #002CEB; /*Dark Blue*/
}

.page-views {
  color: white;
  /*text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;*/
}

.icon-spacing {
  margin-left: 12px;
}

.brand-logo {
font-family: 'Dancing Script', cursive;
}

.logo-page {
width: 60px;
height: 60px;
}

.sidenav{
  background-color: #002CEB;
}

.sidenav a {
  color: white;
}
</style>