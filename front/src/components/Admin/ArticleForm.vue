<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md">

    <q-input
      filled
      v-model="title"
      label="Title"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please enter a title']"
    />

    <div v-if="!articleId">
      <q-btn label="Generate" color="primary" @click="generateContent()"/>
      <div class="q-mt-lg">{{ response }}</div>
    </div>

    <q-input
      filled
      v-model="response"
      label="Response"
      type="textarea"
      lazy-rules
      v-if="article && articleId"
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
import {onBeforeMount, reactive, ref} from "vue";
import {useArticlesStore} from "src/stores/articles";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "src/stores/auth";

export default {
  setup() {
    //Values to create a new article
    let title = ref(null);
    let isPublished = ref(false);
    let response = ref('The answer will be displayed here');

    const articleStore = useArticlesStore();

    const authStore = useAuthStore();
    const user = authStore.user;

    //Get the id in the url
    const route = useRoute();
    const router = useRouter();
    const articleId = route.params.id;

    //Reactive because we need to access the value inside the onBeforeMount
    let article = reactive([]);

    //Get the data before it's mounted or else we can't have them because they are loaded after
    onBeforeMount(async () => {
        if(articleId)
        {
          await articleStore.getArticle(articleId)
          article = articleStore.singleArticle;

          title.value = article.title;
          response.value = article.content;
          isPublished.value = article.isPublished;
        }
    })

    return {
      onSubmit() {
        if(!articleId)
        {
          const newArticle = {
            title: title.value,
            content: response.value,
            author: user.firstName,
            isPublished: isPublished.value,
          }
          articleStore.createArticle(newArticle);
        } else {

          const newArticle = {
            _id: articleId,
            title: title.value,
            content: response.value,
            author: user.firstName,
            isPublished: isPublished.value,
          }
          articleStore.updateArticle(newArticle);
        }

        //Redirect + reload
        router.push({name: 'articles'}).then(() => {
          router.go();
        });

      },
      generateContent() {
        response.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis facilisis cursus. Donec nec sagittis odio. Cras dapibus diam ac malesuada sagittis. Donec pulvinar massa lectus, vel varius urna efficitur non. Vestibulum sollicitudin sapien nec risus mattis, vel molestie neque varius. In hendrerit et lacus sagittis sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis tristique quis dolor non convallis. Aenean quis tempus felis. Vestibulum tempor quam commodo neque venenatis, a scelerisque ante tempor. Nulla facilisi. Sed in placerat mi. Praesent mollis a est eu consectetur. Proin et elit fermentum, luctus lorem vitae, faucibus velit. Donec rhoncus est at est posuere, congue commodo elit varius. Phasellus gravida, nunc vitae gravida feugiat, dolor diam aliquet odio, id ullamcorper lectus nisi at leo. Donec laoreet massa sit amet diam tincidunt, at gravida magna laoreet.';
      },
      title,
      response,
      article,
      isPublished,
      articleId
    }
  }
}
</script>
