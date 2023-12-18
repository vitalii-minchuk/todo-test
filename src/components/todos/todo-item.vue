<script setup lang="ts">
import type { ITodoWithLikes } from '~/api/todo/types'
import { defaultErrorMsg, updateTodoSuccessMsg } from '~/constants'
import { EFetchStatus } from '~/enums/fetch-status-enum'

const props = defineProps<{
  todo: ITodoWithLikes
}>()

const todoStore = useTodoStore()
const fetchStatus = ref<EFetchStatus>(EFetchStatus.SUCCESS)
const { notifyError, notifySuccess } = useNotify()
const completed = ref(props.todo.completed)
const isFavorite = ref(props.todo.isFavorite)
const showTooltip = ref(false)

const isLoading = computed<boolean>(() => fetchStatus.value === EFetchStatus.PENDING)

function onUpdate(): void {
  fetchStatus.value = EFetchStatus.PENDING
  todoStore.updateTodo({
    id: props.todo.id,
    completed: completed.value,
  })
    .then(() => {
      notifySuccess(updateTodoSuccessMsg)
    })
    .catch(() => notifyError(defaultErrorMsg))
    .finally(() => fetchStatus.value = EFetchStatus.SUCCESS)
}

function toggleIsFavorite(): void {
  isFavorite.value ? todoStore.likeTodo(props.todo.id) : todoStore.dislikeTodo(props.todo.id)
  props.todo.userId && todoStore.loadUsersTodos(props.todo.userId)
}
</script>

<template>
  <v-card width="200" height="100">
    <v-tooltip
      v-model="showTooltip"
      location="top"
    >
      <span>{{ props.todo.title }}</span>
    </v-tooltip>

    <template #subtitle>
      <p @on-hover="showTooltip = true">
        {{ props.todo.title }}
      </p>
    </template>

    <template #text>
      <v-checkbox v-model="completed" label="Completed" :disabled="isLoading" @update:model-value="onUpdate" />

      <v-checkbox v-model="isFavorite" true-icon="mdi-heart" :disabled="isLoading" @update:model-value="toggleIsFavorite" />
    </template>
  </v-card>
</template>
