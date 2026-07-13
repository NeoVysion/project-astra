import { defineStore } from 'pinia';
import { isEmpty, not } from 'ramda';
import { toastMessage } from '@/utils/tools';
import db from '@/db';

export default defineStore('login', {
  persist: true,
  state: () => ({
    user: {},
    loggedIn: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getProfile: (state) => state.user.PLEVEL,
    isAuthenticated: (state) => state.loggedIn && !isEmpty(state.user),
    isAdmin: (state) => state.user.PLEVEL === 5,
    isOperative: (state) => state.user.PLEVEL >= 4,
  },
  actions: {
    async init() {
      console.log('Inizializzazione del loginStore');
    },
    async login({ username, credential } = {}) {
      if (not(username) || not(credential)) {
        toastMessage('Username o Password non compilate', 'error');
        return false;
      }

      try {
        const user = await db.login.authenticate({ username, credential });

        this.$patch({
          user,
          loggedIn: true,
        });

        return true;
      } catch (err) {
        toastMessage(err.message, 'error');
        return false;
      }
    },
    async logout() {
      this.$reset();
    },
  },
});