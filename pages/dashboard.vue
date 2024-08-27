<script setup lang="ts">
const { user } = useUserSession()
const { data } = await useFetch('/api/private-data')
</script>

<template>
  <div v-if="user">
    <h1>Dashboard for {{ user.username }}</h1>
    <p>This is the Dashboard page.</p>
    <p v-if="data">{{ data.content }}</p>
  </div>
</template>
