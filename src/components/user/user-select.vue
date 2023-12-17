<script setup lang="ts">
import { defaultErrorMsg } from '~/constants'
import { getFormattedUserNameWithID } from '~/utils/format'

const userStore = useUserStore()
const todoStore = useTodoStore()
const { notifyError } = useNotify()
const selectedUserId = ref(userStore.getCurrentUser?.id)

function onSelectUser() {
  if (!selectedUserId.value)
    return

  userStore.setCurrentUser(selectedUserId.value)
  todoStore.loadUsersTodos(selectedUserId.value).catch((err: unknown) => {
    let message = defaultErrorMsg
    if (err instanceof Error && err?.message)
      message = err.message

    notifyError(message)
  })
}
</script>

<template>
  <v-select
    v-model="selectedUserId"
    label="User:"
    item-value="id"
    :item-title="$event => getFormattedUserNameWithID($event)"
    :items="userStore.getAllUsers"
    @update:model-value="onSelectUser"
  />
</template>
