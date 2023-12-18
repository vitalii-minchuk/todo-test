<script setup lang="ts">
const modalsStore = useModalsStore()
</script>

<template>
  <v-container>
    <v-row>
      <TodoFilters />
      <UserSelect />
      <UserInfo />
      <TodoList />
      <v-btn prepend-icon="mdi-plus" @click="modalsStore.openModal('createTodoModal')">
        add new
      </v-btn>
    </v-row>
    <v-row />
    <CreateTodoModal v-if="modalsStore.getCreateTodoModal" />
  </v-container>
</template>
