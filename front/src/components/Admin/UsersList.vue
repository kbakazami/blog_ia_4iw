<template>
  <div>
    <q-table
      title="Users"
      :rows="users"
      :columns="columns"
      row-key="name"
      :filter="filter"
      id="admin-users"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" class="table-tr">
          <q-td key="id" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">ID</span>
            {{ props.row.id }}
          </q-td>
          <q-td key="firstname" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Firstname</span>
            {{ props.row.firstname }}
          </q-td>
          <q-td key="lastname" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Lastname</span>
            {{props.row.lastname }}
          </q-td>
          <q-td key="email" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Email</span>
            {{ props.row.email }}
          </q-td>
          <q-td key="role" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Role(s)</span>
            {{ props.row.role }}
          </q-td>
          <q-td key="actions" :props="props" class="table-wrapper-td">
            <span class="table-label-mobile">Actions</span>
<!--            <router-link :to="{name: 'editUser', params: {id: props.row.id}}">-->
<!--              <q-btn  icon="edit" class="col-2"/>-->
<!--            </router-link>-->

            <q-btn name="delete" icon='delete' @click="deleteArticle(props.row.id)"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>

import { exportFile, useQuasar } from 'quasar'
import { ref } from 'vue';
import {useUserStore} from "src/stores/user";

export default {
  name: "Admin",
  setup() {
    const usersStore = useUserStore();
    const users = usersStore.users;
    const $q = useQuasar()

    const initialPagination = {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 50
    };

    const columns = [
      { name: 'id', required: true, label: 'ID', align: 'left', field: user => user.id, sortable: true },
      { name: 'firstname', required: true, label: 'Firstname', align: 'left', field: user => user.firstname, sortable: true },
      { name: 'lastname', required: true, label: 'Lastname', align: 'left', field: user => user.lastname, sortable: true },
      { name: 'email', required: true, label: 'Email', align: 'left', field: user => user.email, sortable: true },
      { name: 'role', required: true, label: 'Role(s)', align: 'left', field: user => user.role, sortable: true, format: (val, row) => val.join(', ') },
      { name: 'actions', required: true, label: 'Actions', align: 'left', field: 'Actions' },
    ]

    return {
      users,
      columns,
      filter: ref(''),
      initialPagination,
      deleteArticle(articleId)
      {
        //TODO: Delete User
      },
    };
  },
};
</script>
