<script setup lang="ts">
import { getAllUsers, getUserById } from '~/api/user'

const { notifySuccess } = useNotify()
const text = ref('')
getAllUsers().then((res) => {
  console.log(res)
  notifySuccess('test')
})
getUserById(2).then((res) => {
  console.log(res.data.address.geo.lng)
  text.value = res?.data?.address?.geo?.lng ?? 'N/A'
})
</script>

<template>
  <div>
    home page {{ text }}
  </div>
</template>
