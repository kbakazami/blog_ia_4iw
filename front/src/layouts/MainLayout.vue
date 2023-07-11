<template>
  <div>
    <q-layout
      view="hhh LpR fFf">
      <q-header elevated class="bg-cyan">
        <q-toolbar>
          <q-btn flat round dense to="/" icon="home" />
          <q-btn flat round dense to="/admin" icon="lock" />

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
