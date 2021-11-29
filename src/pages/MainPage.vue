<template>
  <div id="app" class="bg-light p-3">
    <UserCard msg="Username"/>
    <b-button variant="outline-primary" class="m-1">LogIn</b-button>
    <b-button variant="outline-primary">logOut</b-button>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

export default {
  name: "MainPage",
  components: {
    UserCard
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>

</style>