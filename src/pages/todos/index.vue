<script setup lang="ts">
const modalsStore = useModalsStore()
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <UserSelect />
        <UserInfo />
        <v-btn class="mt-4" prepend-icon="mdi-plus" @click="modalsStore.openModal('createTodoModal')">
          add new todo
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-row>
          <v-col cols="12">
            <TodoFilters />
          </v-col>
          <v-col cols="12">
            <TodoList />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <CreateTodoModal v-if="modalsStore.getCreateTodoModal" />
  </v-container>
</template>
