<template>
<div class="container">
  <div class="container rounded white">
    <h3 class="center-align">Ejemplo con MaterializeCSS</h3>
    <div class="row">
      <div class="input-field col s6">
        <select class="browser-default" v-model="opcionSeleccionada">
          <option value="" disabled>Seleccione una opción</option>
          <option v-for="(opcion, index) in opciones" :key="index" :value="opcion">{{ opcion }}</option>
        </select>


        <input type="text" v-model="textoInput">
      </div>

    <div class="row center-align">
      <div class="col s12">
        <button class="waves-effect waves-light btn" @click="hacerAlgo">Hacer algo</button>
      </div>
    </div>
  </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'EstadoActualView',
  data() {
    return {
      opciones: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'],
      opcionSeleccionada: '',
      textoInput: '',
    };
  },
  methods: {
    hacerAlgo() {
      // Aquí puedes agregar la lógica para realizar alguna acción con los datos seleccionados
      console.log('Opción seleccionada:', this.opcionSeleccionada);
      console.log('Texto de entrada:', this.textoInput);
    },
  },
};
</script>

<style>
.container.rounded {
  border-radius: 10px; /* Ajusta el valor para controlar el radio de las esquinas */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Agrega una sombra suave para mejorar la apariencia */
  padding: 20px; /* Opcional: Añade un espacio interno para separar el contenido del borde */
}
</style>


