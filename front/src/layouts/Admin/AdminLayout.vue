
<template>
  <q-layout view="hhh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-btn flat dense icon="home" label="Back-end" to="/admin"/>
        <q-toolbar-title class="text-center">
          Admin - Blog
        </q-toolbar-title>
        <q-btn flat dense icon="home" label="Front-end" to="/"/>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-btn class="q-mt-lg" flat to="/articles">See all articles</q-btn>
      <q-btn flat to="/generate">Generate an article</q-btn>

    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue';
export default {
  name: "AdminLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    };
  },
};
</script>
