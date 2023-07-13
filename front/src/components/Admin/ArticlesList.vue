<template>
  <div>
    <q-table
      title="Articles"
      :rows="articles"
      :columns="columns"
      row-key="name"
      :filter="filter"
      id="admin-articles"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <div id="search-export">
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search" class="search-input">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to JSON"
            no-caps
            @click="exportTableToJson"
            class="btn-export"
          />
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" class="table-tr">
          <q-td key="id" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">ID</span>
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Title</span>
            {{ props.row.title }}
          </q-td>
          <q-td key="content" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Content</span>
            <span class="content">{{ truncate(props.row.content, 100) }}</span>
          </q-td>
          <q-td key="author" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Author</span>
            {{ props.row.author }}
          </q-td>
          <q-td key="createdAt" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Created At</span>
            {{ props.row.createdAt }}
          </q-td>
          <q-td key="isPublished" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Publish</span>
            <q-btn class="col-2" @click="changeVisibility(props.row.id)" :icon="props.row.isPublished === false ? 'visibility_off' : 'visibility'"/>
          </q-td>
          <q-td key="actions" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Actions</span>
            <router-link :to="{name: 'edit', params: {id: props.row.id}}">
              <q-btn  icon="edit" class="col-2"/>
            </router-link>

            <q-btn name="delete" icon='delete' @click="deleteArticle(props.row.id)"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>

import { useArticlesStore } from "src/stores/articles";
import { exportFile, useQuasar } from 'quasar'
import { ref } from 'vue';

export default {
  name: "Admin",
  setup() {
    const articlesStore = useArticlesStore();
    const articles = articlesStore.articles;
    const $q = useQuasar()

    const initialPagination = {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 50
    };

    const columns = [
      { name: 'id', required: true, label: 'ID', align: 'left', field: articles => articles.id, sortable: true },
      { name: 'name', required: true, label: 'Title', align: 'left', field: articles => articles.title, sortable: true },
      { name: 'content', required: true, label: 'Content', align: 'left', field: '', sortable: true },
      { name: 'author', required: true, label: 'Author', align: 'left', field: articles => articles.author, sortable: true },
      { name: 'createdAt', required: true, label: 'Created At', align: 'left', field: articles => articles.createdAt, sortable: true },
      { name: 'isPublished', required: true, label: 'Published', align: 'left', field: articles => articles.isPublished, sortable: true},
      { name: 'actions', required: true, label: 'Actions', align: 'left', field: 'Actions' },
    ]

    return {
      articles,
      columns,
      filter: ref(''),
      initialPagination,
      truncate(value, length) {
        if (value.length > length) {
          return value.substring(0, length) + "...";
        } else {
          return value;
        }
      },
      changeVisibility(articleId)
      {
        articlesStore.changeVisibility(articleId);
      },
      deleteArticle(articleId)
      {
        articlesStore.deleteArticle(articleId);
      },
      exportTableToJson () {
        const content = JSON.stringify(articles, null, " ");

        const status = exportFile(
          'json-content-table.json',
          content,
          'text/plain');

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      },
    };
  },
};
</script>
