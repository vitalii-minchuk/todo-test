<script setup lang="ts">
import { DEFAULT_LOGIN_USER_INPUT, defaultErrorMsg, invalidCredentialsMsg, loginSuccessMsg } from '~/constants'
import { EFetchStatus } from '~/enums'
import type { ILoginUserInput } from '~/types/login'

const input = reactive<ILoginUserInput>({ ...DEFAULT_LOGIN_USER_INPUT })
const fetchStatus = ref<EFetchStatus>(EFetchStatus.SUCCESS)
const { checkCredentials } = useCheckUserCredentials()
const userStore = useUserStore()
const authStore = useAuthStore()
const fieldRules = useFieldRules()
const { notifyError, notifySuccess } = useNotify()
const router = useRouter()

const isLoading = computed<boolean>(() => fetchStatus.value === EFetchStatus.PENDING)
const isError = computed<boolean>(() => fetchStatus.value === EFetchStatus.ERROR)

// in case of successful "login"
// set is auth, show success notification,
// set fetch status to success (default)
// redirect user to todos page
function handleLoginSuccess() {
  authStore.setIsAuthenticated(true)
  notifySuccess(loginSuccessMsg)
  fetchStatus.value = EFetchStatus.SUCCESS
  router.push('/todos')
}

// in case of error
// check weather error has message, if so show it, otherwise use default error message
// show error notification,
// set fetch status to error in order to show error text
function handleLoginError(err: unknown) {
  let message = defaultErrorMsg
  if (err instanceof Error && err?.message)
    message = err.message

  notifyError(message)
  fetchStatus.value = EFetchStatus.ERROR
}

// set loading state and check users credentials
// if data is incorrect show error text
// also handle request errors
// in case of success set current user according to credentials
// use success handler function
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

// an easy way to login
// show loading state
// fetch all the users and set the first one as current user
// handle positive and negative cases
function onSubmitWithoutCredentials() {
  fetchStatus.value = EFetchStatus.PENDING
  userStore.initUserStoreData()
    .then(() => handleLoginSuccess())
    .catch(err => handleLoginError(err))
}
</script>

<template>
  <v-card class="mx-auto py-4" max-width="500">
    <v-form validate-on="input lazy" @submit.prevent="onSubmit">
      <v-col class="d-flex flex-column">
        <v-text-field
          v-model="input.userName"
          label="User name"
          variant="outlined"
          name="userName"
          class="mb-4"
          :rules="[fieldRules.required, fieldRules.onlyLetters, fieldRules.lengthValue]"
        />
        <v-text-field
          v-model="input.phone"
          label="Phone"
          variant="outlined"
          name="phone"
          class="mb-4"
          :rules="[fieldRules.required, fieldRules.isPhone]"
        />
        <v-btn
          :loading="isLoading"
          type="submit"
          block
          class="mb-4"
          text="Register"
        />

        <v-btn
          v-if="!isLoading"
          variant="plain"
          block
          text="auto-submit *(without credentials)"
          type="button"
          @click="onSubmitWithoutCredentials"
        />
      </v-col>
    </v-form>
    <p v-if="isError" class="text-red text-center">
      {{ invalidCredentialsMsg }}
    </p>
  </v-card>
</template>
