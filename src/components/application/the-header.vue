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
    <v-container>
      <v-row align="center">
        <v-col v-if="authStore.getIsAuthenticated">
          <RouterLink to="/" class="mr-4">
            home
          </RouterLink>
          <RouterLink to="/todos">
            todos
          </RouterLink>
        </v-col>
        <v-col class="d-flex flex-row-reverse items-center">
          <v-btn v-if="authStore.getIsAuthenticated" @click="onLogout">
            <v-icon>mdi-export</v-icon>
          </v-btn>
          <a
            rel="noreferrer"
            href="https://github.com/vitalii-minchuk/todo-test"
            target="_blank"
            title="GitHub"
          >
            <v-btn @click="onLogout">
              <v-icon>mdi-git</v-icon>
            </v-btn>
          </a>
          <TheThemeBtn />
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>
