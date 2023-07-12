<template>
<!--  {{ idtest ?? 'no id found'}}-->
  <q-form
    @submit="onSubmit"
    class="q-gutter-md">

    <q-input
      filled
      v-model="id"
      label="ID"
      lazy-rules
    />

    <q-input
      filled
      v-model="title"
      label="Title"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please enter a title']"
    />

    <div v-if="!article">
      <q-btn label="Generate" color="primary" @click="generateContent()"/>
      <div class="q-mt-lg">{{ response }}</div>
    </div>

    <q-input
      filled
      v-model="response"
      label="Response"
      type="textarea"
      lazy-rules
      v-if="article"
      :rules="[ val => val && val.length > 0 || 'Please enter a title']"
    />

    <q-toggle
      v-model="isPublished"
      checked-icon="check"
      color="green"
      unchecked-icon="clear"
      class="q-ml-none"
      :label="isPublished === false ? 'Don\'t publish' : 'Publish'"
    />

    <q-btn label="Save" type="submit" color="primary"/>
  </q-form>
</template>

<script>
import { ref } from "vue";
import {useArticlesStore} from "src/stores/articles";
import {useRoute, useRouter} from "vue-router";
export default {
  setup() {
    let id = ref(null);
    let title = ref(null);
    let isPublished = ref(false);
    let response = ref('The answer will be displayed here');

    const articleStore = useArticlesStore();

    const route = useRoute();
    const router = useRouter();
    const articleId = route.params.id;
    let article = null;

    if(articleId)
    {
      articleStore.getArticle(articleId);
      article = articleStore.singleArticle;

      title = ref(article.title);
      id = ref(article.id);
      response = ref(article.content);
      isPublished = ref(article.isPublished);
    }

    return {
      onSubmit() {
        const newArticle = {
          id: id.value,
          title: title.value,
          content: response.value,
          author: 'sofia',
          createdAt: new Date(),
          isPublished: isPublished.value,
        }

        if(!article)
        {
          articleStore.createArticle(newArticle);
        } else {
          articleStore.updateArticle(newArticle);
        }

        router.push({name: 'articles'});

      },
      generateContent() {
        response.value = 'This is the response !';
      },
      id,
      title,
      response,
      article,
      isPublished
    }
  }
}
</script>
