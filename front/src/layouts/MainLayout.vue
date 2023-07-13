<template>
  <div>
    <q-layout
      view="hhh LpR fFf">
      <q-header elevated class="bg-cyan">
        <q-toolbar>
          <q-btn flat dense to="/" icon="home" label="home" />
          <q-toolbar-title class="text-center">
            Blog
          </q-toolbar-title>
          <q-btn @click="this.$route.go()" class="q-pa-sm q-px-lg" dense no-caps  label="Login" to="/login" v-if="!user"/>
          <q-btn @click="this.$route.go()" class="q-pa-sm q-px-lg q-ml-sm" dense no-caps  label="Register" to="/register" v-if="!user"/>
          <q-btn flat round dense to="/admin" icon="lock" v-if="user && user.role === 'Admin'" />
          <q-btn class="q-pa-sm q-px-lg" dense no-caps label="Logout" @click="logout" v-if="user"/>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "MainLayout",
  setup() {
    //TODO: Check if user is logged in so he can access to admin and check role
    const authStore = useAuthStore();
    const user = authStore.user ?? null;
    const router = useRouter();
    if(user)
    {
      console.log('logged in');
    }
    else {
      console.log('not logged in');
    }

    return {
      user,
      logout() {
        authStore.logout();
        router.push({ name: 'home' })
          .then(() => { router.go(); });
      }
    };
  },
};
</script>
