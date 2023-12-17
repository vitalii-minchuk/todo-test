<script setup lang="ts">
import { getAllUsers, getUserById } from '~/api/user'

getAllUsers().then((res) => {
  console.log(res)
})
getUserById(2).then((res) => {
  console.log(res)
})
</script>

<template>
  <div>
    home page
  </div>
</template>
