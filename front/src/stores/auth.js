import { defineStore } from "pinia";
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
    async login(credentials){
      try {
        const response = await axios.post(`${API_URL}/signin`, credentials);

        localStorage.setItem('user', JSON.stringify(response.data));

        return true;
      } catch (error) {
        console.log("Couldn't login : ", error);
      }


    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
  }
})
