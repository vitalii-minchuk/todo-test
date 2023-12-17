<script setup lang="ts">
import { getFormattedUserNameWithID } from '~/utils/format'

const userStore = useUserStore()
const modelValue = ref(userStore.getCurrentUser?.id)

function onSelectUser() {
  if (!modelValue.value)
    return

  userStore.setCurrentUser(modelValue.value)
}
</script>

<template>
  <v-select
    v-model="modelValue"
    label="User:"
    item-value="id"
    :item-title="$event => getFormattedUserNameWithID($event)"
    :items="userStore.getAllUsers"
    @update:model-value="onSelectUser"
  />
</template>
