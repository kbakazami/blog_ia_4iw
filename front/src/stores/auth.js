import { defineStore } from "pinia";
import {useUserStore} from "src/stores/user";
import { useRouter } from "vue-router";
import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

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
    async login(email, password){
      try {
        const response = await axios.post(`${API_URL}/signin`, {
          email: email,
          password: password
        });

        const userStore = useUserStore().users;
        const index = userStore.findIndex((user) => user.email === email && user.password === password);

        if(index === -1)
        {
          return false;
        }

        this.user = userStore[index];

        localStorage.setItem('user', JSON.stringify(this.user));

        return true;
      } catch (error) {
        console.log("Couldn't login : ", error);
      }


    },
    logout() {
      const router = useRouter();

      this.user = null;
      localStorage.removeItem('user');
    },
  }
})
