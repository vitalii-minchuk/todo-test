<script setup lang="ts">
const todoStore = useTodoStore()
const userStore = useUserStore()

// immediate return without user id
// check if todos already exist to avoid extra requests
// load users todos
onMounted(() => {
  if (!userStore.getCurrentUser?.id)
    return

  if (todoStore.checkExistingUsersTodos(userStore.getCurrentUser.id))
    return

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
