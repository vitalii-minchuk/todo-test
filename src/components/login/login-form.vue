<script setup lang="ts">
import { defaultErrorMsg } from '~/constants'
import { EFetchStatus } from '~/enums/fetch-status.enum'

const userName = $ref('')
const phone = $ref('')
const fetchStatus = ref<EFetchStatus>(EFetchStatus.SUCCESS)
const { checkCredentials } = useCheckUserCredentials()
const userStore = useUserStore()
const authStore = useAuthStore()
const { notifyError, notifySuccess } = useNotify()
const router = useRouter()

const isLoading = computed(() => fetchStatus.value === EFetchStatus.PENDING)
const isError = computed(() => fetchStatus.value === EFetchStatus.ERROR)

function handleLoginSuccess() {
  authStore.setIsAuthenticated(true)
  notifySuccess('tttrrt')
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
  const input = { userName, phone }

  checkCredentials(input).then((res) => {
    if (res) {
      userStore.setCurrentUser(res.id)
      handleLoginSuccess()
    }
    else {
      fetchStatus.value = EFetchStatus.ERROR
    }
  }).catch((err: unknown) => {
    handleLoginError(err)
  })
}

function onSubmitWithoutCredentials() {
  fetchStatus.value = EFetchStatus.PENDING
  userStore.initUserStoreData().then(() => {
    handleLoginSuccess()
  }).catch((err) => {
    handleLoginError(err)
  })
}
</script>

<template>
  <v-form validate-on="submit lazy" @submit.prevent="onSubmit">
    <v-text-field
      v-model="userName"
      label="User name"
      @input="event => userName = event.target.value"
    />
    <v-text-field
      v-model="phone"
      label="User name"
      @input="event => phone = event.target.value"
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
