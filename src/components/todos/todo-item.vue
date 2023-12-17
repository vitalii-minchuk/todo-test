<script setup lang="ts">
import type { ITodo } from '~/api/todo/types'

const props = defineProps<{
  todo: ITodo
}>()

const todoStore = useTodoStore()

function onUpdate(val: boolean) {
  todoStore.updateTodo({
    id: props.todo.id,
    completed: val,
  })
}
</script>

<template>
  <div>{{ props.todo.title }}</div>
  <v-checkbox v-model="props.todo.completed" @update:model-value="onUpdate" />
</template>
