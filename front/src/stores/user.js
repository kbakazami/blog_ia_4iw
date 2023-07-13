import { defineStore } from "pinia";
import Admin from "pages/Admin/Admin.vue";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [
      {
        id:1,
        firstname:"Sofia",
        lastname: "Aifos",
        email: 'sofia@mail.fr',
        password: 'secret!',
        role: 'Admin',
      },
      {
        id:2,
        firstname:"John",
        lastname: "Doe",
        email: 'johndoe@mail.fr',
        password: 'secret!2',
        role:'User'
      }
    ],
    singleUser: null,
  }),
  actions: {
    async createUser(newUser) {
      this.users.push(newUser);
    },
    async getAllUsers() {

    },
    async getUserById(userId) {
      const index = this.users.findIndex((user) => user.id === parseInt(userId));

      if(index !== -1) {
        this.singleUser = this.users[index];
      }
    },
    async getUserByEmail(userEmail) {
      const index = this.users.findIndex((user) => user.email === userEmail);

      if(index !== -1) {
        this.singleUser = this.users[index];
      }
    },
    async updateUser(updatedUser){
      const index = this.users.findIndex((user) => user.email === updatedUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser);
      }
    },
    async deleteUser(userEmail){
      const index = this.users.findIndex((user) => user.email === userEmail);

      if(index !== -1) {
        this.users.splice(index, 1);
      }
    }
  }
})
