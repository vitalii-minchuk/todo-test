<script setup lang="ts">
import { ETodosFilter } from '~/enums'

const todoStore = useTodoStore()
const text = ref('')
const todoFilter = ref(todoStore.getTodosFilter)

// set text filter to show only todos, which have matches in titles
function onChangeText(value: string): void {
  todoStore.setTextFilter(value)
}

// set filter to show only todos, which have appropriate property
function onSelectTodoFilter(value: ETodosFilter): void {
  todoStore.setTodosFilter(value)
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-select
        v-model="todoFilter"
        label="Todos filter:"
        variant="outlined"
        :items="Object.values(ETodosFilter)"
        @update:model-value="onSelectTodoFilter"
      />
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        v-model="text"
        label="Search"
        variant="outlined"
        name="textFilter"
        @update:model-value="onChangeText"
      />
    </v-col>
  </v-row>
</template>
