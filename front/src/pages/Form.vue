<template>
  <div>
    <AuthenticationForm v-if="name === 'register'"/>
    <LoginForm v-if="name === 'login'"/>
  </div>
</template>

<script>
import AuthenticationForm from "components/AddEditForm.vue";
import LoginForm from "components/LoginForm.vue";
import {useRoute} from "vue-router";

export default {
  components: {
    LoginForm,
    AuthenticationForm,
  },
  setup() {
    const route = useRoute();
    const name = route.name;

    return {
      AuthenticationForm,
      LoginForm,
      name
    }
  }
}

</script>
