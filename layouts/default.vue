<template>
  <div>
    <div class="nav">
      <NuxtLink href="/">Home</NuxtLink>
      <NuxtLink href="/dashboard">Dashboard</NuxtLink>
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
