<template>
  <div>
    <p>{{ displayedText }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullText: "Hola, este es un ejemplo.",
      displayedText: ""
    };
  },
  mounted() {
    this.showTextLetterByLetter();
  },
  methods: {
    showTextLetterByLetter() {
      let index = 0;
      const interval = setInterval(() => {
        if (index === this.fullText.length) {
          clearInterval(interval);
          return;
        }
        this.displayedText += this.fullText[index];
        index++;
      }, 100); // Cambia el valor del intervalo según tus preferencias
    }
  }
};
</script>

<style>
.container.rounded {
  border-radius: 10px; /* Ajusta el valor para controlar el radio de las esquinas */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Agrega una sombra suave para mejorar la apariencia */
  padding: 20px; /* Opcional: Añade un espacio interno para separar el contenido del borde */
}
</style>


