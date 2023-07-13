<template>
  <h4 class="text-center q-mt-md">Login</h4>
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md">
      <q-input filled v-model="email" label="Email" />
      <q-input filled v-model="password" label="Password" />
      <q-btn label="Login" type="submit" color="primary" no-caps/>
    </q-form>
  </div>
</template>
<script>
import { useUserStore } from "src/stores/user";
import { ref } from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "src/stores/auth";
export default {
  setup() {
    const authStore = useAuthStore();

    const email = ref(null);
    const password = ref(null);

    const router = useRouter();

    // const isLoggedIn = userStore.isLoggedIn();


    return {
      email,
      password,

      onSubmit() {

        //TODO: Check if user exist + check if password match
        if (authStore.login(email.value, password.value))
        {

          router.push({name: 'home'})
            .then(() => { router.go(); });
        }
      }
    }
  }
}

</script>
