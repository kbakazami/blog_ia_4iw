<template>
  <ArticlesList/>
</template>

<script>
import ArticlesList from "components/ArticlesList.vue";
export default {
  name: "HomePage",
  components: {
    ArticlesList,
  },
  setup() {
    return {
      ArticlesList,
    }
  }
};
</script>
