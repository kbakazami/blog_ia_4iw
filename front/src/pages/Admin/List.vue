<template>
  <ArticlesList v-if="name === 'articles'"/>
  <UsersList v-if="name === 'users'"/>
</template>

<script>
import ArticlesList from "components/Admin/ArticlesList.vue";
import UsersList from "components/Admin/UsersList.vue";
import {useRoute} from "vue-router";
export default {
  components: {
    ArticlesList,
    UsersList,
  },
  setup() {
    const route = useRoute();
    const name = route.name;

    return {
      ArticlesList,
      UsersList,
      name
    }
  }
}
</script>
