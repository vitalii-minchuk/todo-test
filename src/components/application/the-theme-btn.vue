<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <v-btn
    @click="toggleTheme()"
  >
    <v-icon size="large">
      {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
    </v-icon>
  </v-btn>
</template>
