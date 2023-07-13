import { defineStore } from "pinia";
import axios from 'axios';
import { useRouter } from "vue-router";

const API_URL = "http://localhost:8000/api/user";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [
      {
        id:99,
        firstname:"Sofia",
        lastname: "Aifos",
        email: 'soso@mail.fr',
        password: 'secret!',
        role: 'Admin',
      },
    ],
    singleUser: null,
  }),
  actions: {
    async createUser(newUser) {
      const router = useRouter();
      try {
        const response = await axios.post('http://localhost:8000/api/auth/signup', newUser);
        this.users.push(response.data);
        router.push({name: 'login'}).then(() => {
          router.go();
        });
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
        const index = this.users.findIndex((user) => user.id === parseInt(userId));

        if(index !== -1) {
          this.singleUser = response.data;
        }
      }catch (error) {
        console.error("Can't get the user by id :", error);
      }

    },
    // async getUserByEmail(userEmail) {
    //
    //   const index = this.users.findIndex((user) => user.email === userEmail);
    //
    //   if(index !== -1) {
    //     this.singleUser = this.users[index];
    //   }
    // },
    // async updateUser(updatedUser){
    //   try {
    //     const index = this.users.findIndex((user) => user.email === updatedUser.id);
    //     if (index !== -1) {
    //       this.users.splice(index, 1, updatedUser);
    //     }
    //   }catch (error) {
    //     console.error("Can't update the user :", error);
    //   }
    // },
    async deleteUser(userId){
      try {
        await axios.delete(`${API_URL}/${userId}`);
        const index = this.users.findIndex((user) => user.id === userId);

        if(index !== -1) {
          this.users.splice(index, 1);
        }
      }catch (error) {
        console.error("Couldn't delete the user :", error);
      }

    }
  }
})
