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
  <div>
    <TodoItem v-for="todo in todoStore.getUsersTodos" :key="todo.id" :todo="todo" />
  </div>
</template>
