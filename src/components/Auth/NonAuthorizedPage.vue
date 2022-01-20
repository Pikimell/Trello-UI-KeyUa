<template>
  <div class="block">
    <img src="https://raw.githubusercontent.com/damienbod/angular-auth-oidc-client/main/.github/angular-auth-logo.png"
         alt="logo">
    <h1>You are not authorized!</h1>
  </div>
</template>

<script>
export default {
  name: "NonAuthorizedPage"
}
</script>

<style scoped>

.block {
  padding-top: 100px;
}

img {
  width: 500px;
  height: 500px;
  margin-bottom: 100px;
}

h1{
  font-family: aakar;
  -webkit-text-stroke: 1px black;
  transform: scale(1.5);
  box-shadow: #212529;
}

</style>