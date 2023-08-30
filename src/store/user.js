import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userLogeado: false,
    usuario: null,
  }),
  actions: {
    login(usuario) {
      this.userLogeado = true;
      this.usuario = usuario;
    },
    logout() {
      this.userLogeado = false;
      this.usuario = null;
    },
  },
});
