<template>
  <h4 class="text-center q-mt-md">Login</h4>
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md">
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
      <q-btn label="Login" type="submit" color="primary" no-caps/>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "src/stores/auth";
export default {
  setup() {
    const authStore = useAuthStore();

    const email = ref(null);
    const password = ref(null);

    const router = useRouter();

    return {
      email,
      password,
      isPwd: ref(true),
      onSubmit() {

        const credentials = {
          email: email.value,
          password: password.value
        };

        if (authStore.login(credentials))
        {
          router.push({name: 'home'})
            .then(() => { router.go(); });
        }
      }
    }
  }
}

</script>
