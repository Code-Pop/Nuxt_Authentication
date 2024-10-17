<script setup lang="ts">
const { loggedIn } = useUserSession()

const logout = async () => {
  const { csrfToken } = await $fetch('/api/csrf-token')
  await $fetch('/api/_auth/session', {
    method: 'DELETE',     
    body: JSON.stringify({
      csrfToken
    })
  })
  window.location.href = '/login'
}
</script>

<template>
  <div>
    <div class="nav">
      <NuxtLink href="/">Home</NuxtLink>
      <NuxtLink v-if="loggedIn" href="/dashboard">Dashboard</NuxtLink>
      <NuxtLink v-if="loggedIn" @click="logout">Logout</NuxtLink>
      <NuxtLink v-else href="/login">Login</NuxtLink>
    </div>
    <slot />
  </div>
</template>

<style>
.nav > a {
  cursor: pointer;
  text-decoration: none;
  margin-right: 25px;
}

.nav > a:last-child {
  margin-right: 0;
}

.nav > a:hover, .nav > a.router-link-active {
  text-decoration: underline;
}
</style>
