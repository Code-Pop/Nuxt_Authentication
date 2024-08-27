<script setup lang="ts">
const inputs = reactive({
  username: '',
  password: ''
})

const submit = async () => {
  const { error } = await $fetch('/api/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: inputs.username,
      password: inputs.password
    })
  })
  if (error === null) {
    window.location.href = '/dashboard'
  } else {
    alert(error)
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <div>username: <input type="text" v-model="inputs.username" /></div>
      <div>password: <input type="password" v-model="inputs.password" /></div>
      <button type="submit">Submit</button>
    </form>
    <p>
      New user? <NuxtLink href="/signup">Sign up here</NuxtLink>.
    </p>
  </div>
</template>
