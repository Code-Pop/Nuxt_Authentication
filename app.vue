<template>
  <div class="page">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body {
  font-size: 20pt;
  font-family: arial;
  text-align: center;
}

h1 {
  font-size: 36pt;
}

a, a:visited {
  color: lightskyblue;
}

form > div {
  margin-bottom: 10px;
}

input {
  font-size: 16pt;
}

button {
  font-size: 16pt;
  cursor: pointer;
}

.page {
  border: 2px solid #ccc;
  width: 700px;
  margin: 10px auto;
  padding: 20px;
}
</style>
