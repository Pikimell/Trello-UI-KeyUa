<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

export default {
  name: 'App'
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
  background: linear-gradient(90deg, rgba(68,67,73,1) 0%, rgba(135,135,168,1) 46%, rgba(191,231,255,1) 100%);
}
</style>
