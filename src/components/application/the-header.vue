<script setup lang="ts">
const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

function onLogout(): void {
  authStore.logout()
  userStore.resetUserState()
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
    <TheThemeBtn />
  </header>
</template>
