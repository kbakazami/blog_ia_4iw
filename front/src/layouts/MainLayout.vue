<template>
  <div>
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 100vh"
      class="shadow-2"
    >
      <q-header class="bg-cyan">
        <q-toolbar>
          <q-btn flat round dense to="/" icon="home" />

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
export default {
  name: "MainLayout",
  setup() {
    return {};
  },
};
</script>
