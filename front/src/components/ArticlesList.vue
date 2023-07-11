<template>
  <div>
    <q-table
      title="Articles"
      :rows="articles"
      row-key="title"
      grid
      hide-header
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
          <q-card bordered flat>
            <q-card-section>
              <q-item-label> {{ props.row.title }} </q-item-label>
              <q-item-label> {{ props.row.createdAt }} </q-item-label>
              <q-item-label> {{ props.row.author }} </q-item-label>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-item-label> {{ props.row.content }} </q-item-label>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useArticlesStore } from "src/router/articles";
import { ref } from 'vue';

export default {
  setup() {
    const articlesStore = useArticlesStore();

    articlesStore.getAllPublishedArticles();

    const articles = articlesStore.articles;

    return {
      filter: ref(''),
      articles,
    };
  },
};
</script>
