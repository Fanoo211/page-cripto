import { createApp } from 'vue'
import { createPinia } from 'pinia';

import App from './App.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'animate.css'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTwitter, faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
/*import {  } from '@fortawesome/free-regular-svg-icons'*/

/* add icons to the library */
library.add(faTwitter, faFacebook, faInstagram, faWhatsapp, faEnvelope)

const pinia = createPinia();

createApp(App).use(store).use(router).use(VueAxios, axios).use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
