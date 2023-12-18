<script setup lang="ts">
import type { ITodoWithLikes } from '~/api/todo/types'
import { defaultErrorMsg, updateTodoSuccessMsg } from '~/constants'
import { EFetchStatus } from '~/enums'

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

// show loader and update current todo (only completed property can be changed)
// in cases of success and error show appropriate notification
// use "finally" to se fetch state to success state (default)
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

// like or dislike todo and refetch data to keep consistency
function toggleIsFavorite(): void {
  isFavorite.value ? todoStore.likeTodo(props.todo.id) : todoStore.dislikeTodo(props.todo.id)
  props.todo.userId && todoStore.loadUsersTodos(props.todo.userId)
}
</script>

<template>
  <v-col cols="12" md="6">
    <v-card height="100" :loading="isLoading">
      <template #subtitle>
        <p @on-hover="showTooltip = true">
          {{ props.todo.title }}
        </p>
      </template>

      <template #text>
        <div class="d-flex justify-between items-center">
          <v-checkbox
            v-model="completed"
            label="Completed"
            :disabled="isLoading"
            @update:model-value="onUpdate"
          />
          <v-checkbox
            v-model="isFavorite"
            true-icon="mdi-thumb-up"
            false-icon="mdi-thumb-up-outline"
            :disabled="isLoading"
            @update:model-value="toggleIsFavorite"
          />
        </div>
      </template>
    </v-card>
  </v-col>
</template>
