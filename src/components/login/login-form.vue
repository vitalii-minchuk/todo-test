<script setup lang="ts">
import { DEFAULT_LOGIN_USER_INPUT, defaultErrorMsg, loginSuccessMsg } from '~/constants'
import { EFetchStatus } from '~/enums/fetch-status.enum'
import type { ILoginUserInput } from '~/types/login'

const input = reactive<ILoginUserInput>({ ...DEFAULT_LOGIN_USER_INPUT })
const fetchStatus = ref<EFetchStatus>(EFetchStatus.SUCCESS)
const { checkCredentials } = useCheckUserCredentials()
const userStore = useUserStore()
const authStore = useAuthStore()
const { notifyError, notifySuccess } = useNotify()
const router = useRouter()

const isLoading = computed<boolean>(() => fetchStatus.value === EFetchStatus.PENDING)
const isError = computed<boolean>(() => fetchStatus.value === EFetchStatus.ERROR)

function handleLoginSuccess() {
  authStore.setIsAuthenticated(true)
  notifySuccess(loginSuccessMsg)
  fetchStatus.value = EFetchStatus.SUCCESS
  router.push('/todos')
}

function handleLoginError(err: unknown) {
  let message = defaultErrorMsg
  if (err instanceof Error && err?.message)
    message = err.message

  notifyError(message)
  fetchStatus.value = EFetchStatus.ERROR
}

function onSubmit(): void {
  fetchStatus.value = EFetchStatus.PENDING
  checkCredentials(input)
    .then((res) => {
      if (res) {
        userStore.setCurrentUser(res.id)
        handleLoginSuccess()
      }
      else {
        fetchStatus.value = EFetchStatus.ERROR
      }
    })
    .catch((err: unknown) => handleLoginError(err))
}

function onSubmitWithoutCredentials() {
  fetchStatus.value = EFetchStatus.PENDING
  userStore.initUserStoreData()
    .then(() => handleLoginSuccess())
    .catch(err => handleLoginError(err))
}
</script>

<template>
  <v-form validate-on="submit lazy" @submit.prevent="onSubmit">
    <v-text-field
      v-model="input.userName"
      label="User name"
      name="userName"
    />
    <v-text-field
      v-model="input.phone"
      label="User name"
      name="phone"
    />
    <v-btn
      :loading="isLoading"
      type="submit"
      block
      class="mt-2"
      text="Submit"
    />
    <p v-if="isError">
      errror
    </p>
  </v-form>
  <v-btn @click="onSubmitWithoutCredentials">
    auto-submit
  </v-btn>
</template>
