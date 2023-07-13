<template>
  <div>
    <h4 class="text-center q-mt-md">Register</h4>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md">
      <q-input filled v-model="firstname" label="Firstname" />
      <q-input filled v-model="lastname" label="Lastname" />
      <q-input filled v-model="email" label="Email" />
      <q-input v-model="password" label="Password" filled :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn label="Save" type="submit" color="primary"/>
    </q-form>
  </div>
</template>
<script>
import { useUserStore } from "src/stores/user";
import { ref } from "vue";
import {useRoute, useRouter} from "vue-router";
export default {
  setup() {
    const userStore = useUserStore();

    let firstname = ref(null);
    let lastname = ref(null);
    let email = ref(null);
    let password = ref(null);

    const router = useRouter();
    const route = useRoute();
    const name = route.name;

    //Code to edit user - not working
    //
    // const options = ['admin','user'];
    //
    // const userId = route.params.id;
    //
    // let user = null;
    //
    //
    // if(userId)
    // {
    //   userStore.getUserById(userId);
    //   user = userStore.singleUser;
    //
    //   firstname = ref(user.firstname);
    //   lastname = ref(user.lastname);
    //   email = ref(user.email);
    // }

    return {
      email,
      firstname,
      lastname,
      password,
      isPwd: ref(true),
      onSubmit() {
        const newUser = {
          lastName: lastname.value,
          firstName: firstname.value,
          email: email.value,
          password: password.value,
          role: ['user'],
        }
        if(name === 'register') {
          userStore.createUser(newUser);

        }
        // router.push({name: 'login'}).then(() => {
        //   router.go()
        // });

      }
    }
  }
}

</script>
