<script setup lang="ts">
import { ETodosFilter } from '~/enums'

const todoStore = useTodoStore()
const text = ref('')
const todoFilter = ref(todoStore.getTodosFilter)

function onChangeText(value: string): void {
  todoStore.setTextFilter(value)
}
function onSelectTodoFilter(value: ETodosFilter): void {
  todoStore.setTodosFilter(value)
}
</script>

<template>
  <v-select
    v-model="todoFilter"
    label="Todos filter:"
    :items="Object.values(ETodosFilter)"
    @update:model-value="onSelectTodoFilter"
  />
  <v-text-field
    v-model="text"
    label="Search"
    name="textFilter"
    @update:model-value="onChangeText"
  />
</template>
