<script setup lang="ts">
const todoStore = useTodoStore()
const userStore = useUserStore()

onMounted(() => {
  if (!userStore.getCurrentUser?.id)
    return

  // check if todos already exist to avoid extra requests
  if (todoStore.checkExistingUsersTodos(userStore.getCurrentUser.id))
    return

  // load users todos
  todoStore.loadUsersTodos(userStore.getCurrentUser.id)
})
</script>

<template>
  <div class="todos-wrapper">
    <TodoItem v-for="todo in todoStore.getFilteredTodos" :key="todo.id" :todo="todo" />
  </div>
</template>

<style lang="scss">
.todos-wrapper {
  margin-top: -24px;
  margin-left: -12px;
  margin-right: -12px;
  display: flex;
  flex-wrap: wrap;
}
</style>
