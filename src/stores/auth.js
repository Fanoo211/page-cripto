import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userLogeado: false,
    usuario: null,
  }),
  actions: {
    login(usuario) {
      // Lógica de inicio de sesión aquí
      // Puedes autenticar al usuario y cambiar el estado del store
      this.userLogeado = true;
      this.usuario = usuario;
      console.log('Hola');
    },
    logout() {
      // Lógica de cierre de sesión aquí
      // Puedes cerrar la sesión y restablecer el estado del store
      this.userLogeado = false;
      this.usuario = null;
    },
  },
});
