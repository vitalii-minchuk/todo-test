<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

function onLogin(): void {
  authStore.login()
  router.push('/todos')
}
function onLogout(): void {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <RouterLink to="/">
      header
    </RouterLink>
    <RouterLink to="/todos">
      todos
    </RouterLink>
    <v-btn v-if="authStore.getIsAuthenticated" @click="onLogout">
      logout
    </v-btn>
    <v-btn v-else @click="onLogin">
      login
    </v-btn>
  </header>
</template>
