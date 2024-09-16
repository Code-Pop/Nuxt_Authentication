<script setup lang="ts">
const { user } = useUserSession()
const { data: posts, refresh } = await useFetch('/api/posts')

const inputContent = ref('')

const submit = async () => {
  const { error } = await $fetch('/api/posts', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: inputContent.value
    })
  })
  if (error === null) {
    inputContent.value = ''
    refresh()
  } else {
    alert(error)
  }
}
</script>

<template>
  <div v-if="user">
    <h1>Dashboard for {{ user.username }}</h1>
    <form @submit.prevent="submit">
      New Post: <input type="text" v-model="inputContent" />
      <button type="submit">Create</button>
    </form>
    <p v-for="post in posts">
      {{ post.content }}
    </p>
  </div>
</template>

<style scoped>
p {
  background-color: #eeeeee;
  padding: 10px;
  font-style: italic;
}
</style>
