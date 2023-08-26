<template>
  <footer class="page-footer">
    <div class="container">
      <div class="row">
        <div class="col l5 s12">
          <h5 class="white-text">Nosotros</h5>
          <h6>"Somos una cartera de criptomonedas ubicada en Freyre. Nuestro objetivo es brindar a nuestros usuarios una experiencia segura y eficiente para gestionar sus activos digitales. Con un enfoque en la innovación y la seguridad, trabajamos constantemente para ofrecer soluciones que permitan a nuestros clientes explorar y aprovechar el emocionante mundo de las criptomonedas. Ya sea que estés dando tus primeros pasos en este universo financiero o seas un entusiasta experimentado, estamos aquí para respaldarte en cada paso del camino."</h6>
        </div>

        <div class="col l4 offset-l2 s12">
          <h5 class="white-text">Nuestras Redes Sociales</h5>
          <ul class="iconos-redes">
            <li><a class="grey-text text-lighten-3" href="https://www.facebook.com/stefanoandrea.ternavasio" target="_blank"><font-awesome-icon icon="fa-brands fa-facebook" style="color: #0a5ae6;" /></a></li>
            <li><a class="grey-text text-lighten-3" href="https://twitter.com/STernavasio" target="_blank"><font-awesome-icon icon="fa-brands fa-twitter" style="color: #0084ff;" /></a></li>
            <li><a class="grey-text text-lighten-3" href="https://www.instagram.com/fanoternavasio1/" target="_blank"><font-awesome-icon icon="fa-brands fa-instagram" style="color: #ffffff;" /></a></li>
            <li><a class="grey-text text-lighten-3" href="https://wa.me/3564360965" target="_blank"><font-awesome-icon icon="fa-brands fa-whatsapp" style="color: #00ff4c;" /></a></li>
          </ul>
          <ul class="nombres-redes">
            <li><a class="white-text btn-redes" href="https://www.facebook.com/stefanoandrea.ternavasio" target="_blank">Facebook</a></li>
            <li><a class="white-text btn-redes" href="https://twitter.com/STernavasio" target="_blank">Twitter</a></li>
            <li><a class="white-text btn-redes" href="https://www.instagram.com/fanoternavasio1/" target="_blank">Instagram</a></li>
            <li><a class="white-text btn-redes" href="https://wa.me/3564360965" target="_blank">WhatsApp</a></li>
          </ul>

<div class="contacto">
            <h5 class="white-text">Contacto</h5>
            <div class="contacto-info">
              <div class="correo-icono">
                <a href="mailto:ternavasiofano@gmail.com">
                  <font-awesome-icon icon="fa-solid fa-envelope" style="color: #ffffff;" />
                </a>
              </div>
              <p class="white-text correo-texto">
                <a class="white-text btn-redes" href="mailto:ternavasiofano@gmail.com">Correo</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      © 2023 CriptoFano. Todos los derechos reservados.
      <router-link class="grey-text text-lighten-4 right btn-redes" :to="{name: 'PoliticasView'}">Políticas y Privacidad</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default{
  name: 'FooterPage'
}
</script>

<style scoped>
.page-footer{
  background-color: #2D2E34;
  font-size: 18px;
  color: white;
  /*text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;*/
}

.btn-redes:hover {
  text-decoration: underline;
}
.iconos-redes {
  display: inline-block;
  vertical-align: top;
  margin-right: 15px;
}
.nombres-redes {
  display: inline-block;
  vertical-align: top;
}

.correo-icono {
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
}
.correo-texto {
  display: inline-block;
  vertical-align: middle;
}
</style>