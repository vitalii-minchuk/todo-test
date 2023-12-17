<script setup lang="ts">
import type { TCreateTodoInput } from '~/api/todo/types'
import { DEFAULT_CREATE_TODO_INPUT, createTodoSuccessMsg, defaultErrorMsg } from '~/constants'
import { EFetchStatus } from '~/enums/fetch-status.enum'

const input = reactive<TCreateTodoInput>({ ...DEFAULT_CREATE_TODO_INPUT })
const fetchStatus = ref<EFetchStatus>(EFetchStatus.SUCCESS)
const modalsStore = useModalsStore()
const userStore = useUserStore()
const todoStore = useTodoStore()
const fieldRules = useFieldRules()
const { notifyError, notifySuccess } = useNotify()

const isLoading = computed<boolean>(() => fetchStatus.value === EFetchStatus.PENDING)
const isError = computed<boolean>(() => fetchStatus.value === EFetchStatus.ERROR)

function onSubmit(): void {
  if (!userStore.getCurrentUser?.id)
    return

  fetchStatus.value = EFetchStatus.PENDING
  todoStore.createTodo({ ...input, userId: userStore.getCurrentUser.id })
    .then(() => {
      notifySuccess(createTodoSuccessMsg)
      fetchStatus.value = EFetchStatus.SUCCESS
    })
    .catch((err: unknown) => {
      let message = defaultErrorMsg
      if (err instanceof Error && err?.message)
        message = err.message

      notifyError(message)
      fetchStatus.value = EFetchStatus.ERROR
    })
}
</script>

<template>
  <v-dialog
    v-model="modalsStore.getCreateTodoModal"
    width="auto"
  >
    <v-card>
      <v-card-text>
        <v-form validate-on="submit lazy" @submit.prevent="onSubmit">
          <v-text-field
            v-model="input.title"
            label="Title:"
            name="title"
            :rules="[fieldRules.required, fieldRules.lengthValue]"
          />
          <v-btn
            :loading="isLoading"
            type="submit"
            block
            class="mt-2"
            text="Submit"
          />
          <p v-if="isError">
            errror
          </p>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="modalsStore.closeModal('createTodoModal')">
          Close Dialog
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
