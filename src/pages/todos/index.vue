<script setup lang="ts">
const modalsStore = useModalsStore()
</script>

<template>
  <div>
    <TodoFilters />
    <UserSelect />
    <UserInfo />
    <TodoList />
    <v-btn prepend-icon="mdi-plus" @click="modalsStore.openModal('createTodoModal')">
      add new
    </v-btn>
    <CreateTodoModal />
  </div>
</template>
