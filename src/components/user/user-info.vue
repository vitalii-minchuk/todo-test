<script setup lang="ts">
import { getFormattedUserNameWithID } from '~/utils/format'

const userStore = useUserStore()
</script>

<template>
  <div>{{ getFormattedUserNameWithID(userStore.getCurrentUser) }}</div>
</template>
