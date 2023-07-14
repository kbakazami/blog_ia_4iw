<template>
  <div>
    <q-table
      title="Articles"
      :rows="articlesStore.articles"
      row-key="title"
      grid
      hide-header
      :filter="filter"
      v-model:pagination="pagination"
      hide-pagination
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-sm col-12 col-md-6 col-lg-4 grid-style-transition card-articles">
          <q-card bordered flat>
            <q-card-section>
              <div class="date-title q-mb-sm">
                <q-item-label class="title"> {{ props.row.title }} </q-item-label>
                <q-item-label class="date"> {{ props.row.createdAt }} </q-item-label>
              </div>
              <q-item-label class="author">By {{ props.row.author }} </q-item-label>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-item-label> {{ props.row.content }} </q-item-label>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<script>
import { useArticlesStore } from "src/stores/articles";
import {computed, ref} from 'vue';

export default {
  setup() {
    const articlesStore = useArticlesStore();

    articlesStore.getAllPublishedArticles();

    const articles = articlesStore.articles;

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 12,
    });

    const pagesNumber = computed(() => Math.ceil(articles.length / pagination.value.rowsPerPage));

    return {
      filter: ref(''),
      pagination,
      pagesNumber,
      articlesStore,
    };
  },
};
</script>
