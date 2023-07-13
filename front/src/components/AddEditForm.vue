<template>
  <div>
    <h4 class="text-center q-mt-md">Register</h4>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md">
      <q-input filled v-model="id" label="ID" />
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
<!--      <q-select-->
<!--        filled-->
<!--        v-model="roles"-->
<!--        multiple-->
<!--        :options="options"-->
<!--        label="Multiple"-->
<!--        style="width: 250px"-->
<!--      />-->
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

    let id = ref(null);
    let firstname = ref(null);
    let lastname = ref(null);
    let email = ref(null);
    let password = ref(null);
    let roles = ref(null);

    const options = ['admin','user'];

    const route = useRoute();
    const router = useRouter();

    const name = route.name;
    const userId = route.params.id;

    let user = null;

    if(userId)
    {
      userStore.getUserById(userId);
      user = userStore.singleUser;
      // console.log(user);
      id = ref(user.id);
      firstname = ref(user.firstname);
      lastname = ref(user.lastname);
      email = ref(user.email);
      console.log(user)

      // user.roles.forEach(role => {
      //   console.log(role);
      // })
      roles = ref(user.roles);
    }

    return {
      id,
      email,
      firstname,
      lastname,
      password,
      roles,
      options,
      isPwd: ref(true),
      onSubmit() {
        const newUser = {
          id: id.value,
          firstname: firstname.value,
          lastname: lastname.value,
          email: email.value,
          password: password.value,
          role: ['user'],
        }

        if(name === 'register') {
          userStore.createUser(newUser);
        }

        router.push({name: 'login'});
      }
    }
  }
}

</script>
