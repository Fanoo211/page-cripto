<template>
  <div>
    <div class="row">

      <div class="col s12 m8 l8 "> <!-- Note that "m4 l3" was added -->
        <div class="text-bienvenida">
          <h1 style="font-size: 80px">{{ textoMostrar }}</h1>
        </div>

        <div class="text-home">
          <h4>En el emocionante mundo de las criptomonedas, ¡somos tu puerta de entrada para comprar y vender con confianza!</h4>
          <h4>Ya seas un entusiasta experimentado o estés dando tus primeros pasos en el universo digital de las monedas, en CriptoFano te acompañamos en cada paso del camino.</h4>

                  <div class="imagen-criptos">
          <img src="../assets/cripto-images/btc.png" alt="btc" class="btc">
          <img src="../assets/cripto-images/eth.png" alt="eth" class="eth">
          <img src="../assets/cripto-images/dai.png" alt="dai" class="dai">
          <img src="../assets/cripto-images/usdt.png" alt="usdt" class="usdt">
        </div>
        </div>
      </div>

      <div class="col s12 m4 l4 "> <!-- Note that "m8 l9" was added -->
        <div class="imagen-home">
          <img src="../assets/homeFondo.png" alt="home" class="imagen">
        </div>
      </div>

      <div class="col s12 m12 l12 ">

      </div>

    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/user.js';

export default {
  name: 'HomeView',
  data() {
    return{
      textoMostrar: "",
    };
  },
  mounted() {
    this.mostrarLetraPorLetra();
  },
  computed: {
    usuario() {
      const authStore = useUserStore();
      return authStore.usuario;
    }
  },
  methods: {
    mostrarLetraPorLetra() {
      let textoBienvenida = `Bienvenido, ${this.usuario}!`;
      let index = 0;
      const interval = setInterval(() => {
        if(index === textoBienvenida.length) {
          clearInterval(interval);
          return;
        }
        this.textoMostrar += textoBienvenida[index];
        index++;
      }, 100);
    },
  }
}
</script>

<style scoped>
.imagen {
  width: 400px;
  height: 450px;
}

.btc {
  width: 200px;
  height: 100px;
}
.eth {
  width: 200px;
  height: 130px;
}
.dai {
  width: 200px;
  height: 100px;
  padding-bottom: 20px;
}
.usdt {
  width: 160px;
  height: 85px;
  padding-bottom: 35px;
  padding-left: 10px;
}

.text-bienvenida {
  font-family: 'Markazi Text', serif;
}
</style>


