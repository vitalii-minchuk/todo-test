<script setup lang="ts">
const userStore = useUserStore()
</script>

<template>
  <v-card>
    <v-card-text>
      <p><strong>Name:</strong> {{ userStore.getCurrentUser?.name ?? '_' }}</p>
      <p><strong>ID:</strong> {{ userStore.getCurrentUser?.id ?? '_' }}</p>
      <p><strong>User name:</strong> {{ userStore.getCurrentUser?.username ?? '_' }}</p>
      <p><strong>Email:</strong> {{ userStore.getCurrentUser?.email ?? '_' }}</p>
      <p><strong>Phone:</strong> {{ userStore.getCurrentUser?.phone ?? '_' }}</p>
      <p><strong>Website:</strong> {{ userStore.getCurrentUser?.website ?? '_' }}</p>
      <p><strong>Company:</strong> {{ userStore.getCurrentUser?.company.name ?? '_' }}</p>
    </v-card-text>
  </v-card>
</template>
