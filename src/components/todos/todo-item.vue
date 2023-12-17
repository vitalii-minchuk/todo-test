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
  <div>{{ props.todo.title }}</div>
  <v-checkbox v-model="completed" :disabled="isLoading" @update:model-value="onUpdate" />
  <v-checkbox v-model="isFavorite" :disabled="isLoading" @update:model-value="toggleIsFavorite" />
</template>
~/enums/fetch-status-enum
