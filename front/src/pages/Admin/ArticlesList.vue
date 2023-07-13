<template>
  <ArticlesList/>
</template>
<script>
import ArticlesList from "components/Admin/ArticlesList.vue";
export default {
  components: {
    ArticlesList,
  },
  setup() {
    return {
      ArticlesList,
    }
  }
}
</script>
