import { defineStore } from "pinia";
import {useUserStore} from "src/stores/user";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state:() => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null,
  }),
  getters: {
    isLoggedIn(state) {
      return state.user != null;
    },
  },
  actions: {
    login(email, password){
      const userStore = useUserStore().users;
      const index = userStore.findIndex((user) => user.email === email && user.password === password);

      if(index === -1)
      {
        return false;
      }

      this.user = userStore[index];

      localStorage.setItem('user', JSON.stringify(this.user));

      return true;

    },
    logout() {
      const router = useRouter();

      this.user = null;
      localStorage.removeItem('user');
    },
  }
})
