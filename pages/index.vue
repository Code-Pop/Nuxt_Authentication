<template>
  <div>
    <h1>Home</h1>
    <AuthState v-slot="{ user }">
      <p v-if="user">Hi, {{ user.username }}.</p>
    </AuthState>
    <p>This is the Home page.</p>
  </div>
</template>
