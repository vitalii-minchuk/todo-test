<script setup lang="ts">
import type { TCreateTodoInput } from '~/api/todo/types'
import {
  DEFAULT_CREATE_TODO_INPUT,
  createTodoSuccessMsg,
  defaultErrorMsg,
  invalidCredentialsMsg,
} from '~/constants'
import { EFetchStatus } from '~/enums'

const input = reactive<TCreateTodoInput>({ ...DEFAULT_CREATE_TODO_INPUT })
const fetchStatus = ref<EFetchStatus>(EFetchStatus.SUCCESS)
const modalsStore = useModalsStore()
const userStore = useUserStore()
const todoStore = useTodoStore()
const fieldRules = useFieldRules()
const { notifyError, notifySuccess } = useNotify()

const isLoading = computed<boolean>(() => fetchStatus.value === EFetchStatus.PENDING)
const isError = computed<boolean>(() => fetchStatus.value === EFetchStatus.ERROR)

// return when no title value or current user id
// show loader, add user id to input
// in positive case show success notification,
// set fetch status to success (default)
// close modal
// in case of error
// check weather error has message, if so show it, otherwise use default error message
// show error notification,
// set fetch status to error in order to show error text
function onSubmit(): void {
  if (!userStore.getCurrentUser?.id || !input.title)
    return

  fetchStatus.value = EFetchStatus.PENDING
  todoStore.createTodo({ ...input, userId: userStore.getCurrentUser.id })
    .then(() => {
      notifySuccess(createTodoSuccessMsg)
      fetchStatus.value = EFetchStatus.SUCCESS
      modalsStore.closeModal('createTodoModal')
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
    :model-value="modalsStore.getCreateTodoModal"
    width="320"
    persistent
  >
    <v-card>
      <v-card-text>
        <v-form validate-on="input" @submit.prevent="onSubmit">
          <v-text-field
            v-model="input.title"
            label="Title:"
            name="title"
            variant="outlined"
            :rules="[fieldRules.required]"
          />
          <v-btn
            :loading="isLoading"
            type="submit"
            block
            class="mt-2"
            text="Submit"
          />
          <p v-if="isError">
            {{ invalidCredentialsMsg }}
          </p>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="isLoading"
          block
          @click="modalsStore.closeModal('createTodoModal')"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
~/enums/fetch-status-enum
