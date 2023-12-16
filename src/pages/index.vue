<script setup lang="ts">
const modals = useModalsStore()
const { x } = useMouse()
</script>

<template>
  <div>
    <v-btn prepend-icon="mdi-plus" @click="modals.openModal('test')">
      ok
    </v-btn>
    {{ modals.test }} {{ x }}
  </div>
</template>
