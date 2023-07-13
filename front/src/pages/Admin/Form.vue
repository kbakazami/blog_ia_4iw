<template>
  <div>
    <div v-if="name === 'generate'">
      <h2 class="q-mt-none q-mb-none" >Generate an article</h2>
      <p class="q-mt-sm" style="font-style: italic; font-size: 18px" v-if="name === 'generate'">Because openAI need a subscription to use it as an API we couldn't generate real content for the article so it'll only be lorem ipsum for the moment</p>
      <ArticleForm/>
    </div>
    <div v-if="name === 'editArticle'">
      <h2 class="q-mt-none">Edit an article</h2>
      <ArticleForm />
    </div>

  </div>
</template>

<script>
import ArticleForm from "components/Admin/ArticleForm.vue";
import {useRoute} from "vue-router";

export default {
  components: {
    ArticleForm,
  },
  setup() {
    const route = useRoute();
    const name = route.name;

    return {
      ArticleForm,
      name
    }
  }
}
</script>
