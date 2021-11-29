<template>
  <div id="app" class="bg-light p-3">
    <UserCard msg="Пащенко Володька"/>
    <b-button variant="outline-primary" class="m-1">Войти</b-button>
    <b-button variant="outline-primary">Выйти</b-button>
  </div>
</template>

<script>
import UserCard from './components/UserCard.vue'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


export default {
  name: 'App',
  components: {
    UserCard
  }
}
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
