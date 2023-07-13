import { defineStore } from "pinia";
import axios from 'axios';

const API_URL = "http://localhost:8000/api/user";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
    singleUser: null,
  }),
  actions: {
    async createUser(newUser) {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/signup', newUser);
        this.users.push(response.data);
      } catch (error) {
        console.log("Couldn't create the user : ", error);
      }
    },
    async getAllUsers() {
      try {
        const response = await axios.get(`${API_URL}/`);
        this.users = response.data;
      } catch (error) {
        console.error("Can't get the users :", error);
      }
    },
    async getUserById(userId) {
      try {
        const response = await axios.get(`${API_URL}/${userId}`);
        const index = this.users.findIndex((user) => user._id === parseInt(userId));

        if(index !== -1) {
          this.singleUser = response.data;
        }
      }catch (error) {
        console.error("Can't get the user by id :", error);
      }

    },
    async deleteUser(userId){
      try {
        await axios.delete(`${API_URL}/${userId}`);

        const index = this.users.findIndex((user) => user._id === userId);

        if(index !== -1) {
          this.users.splice(index, 1);
        }
      }catch (error) {
        console.error("Couldn't delete the user :", error);
      }

    }
  }
})
