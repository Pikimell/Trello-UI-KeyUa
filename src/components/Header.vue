<template>
  <div id="header">
    <UserCard msg="Username"/>
    <b-button variant="outline-primary" class="m-1">LogIn</b-button>
    <b-button variant="outline-primary" class="m-1">logOut</b-button>
  </div>
</template>

<script>
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import UserCard from "../components/UserCard";
import Vue from "vue";
export default {
  name: "Header",
  components:{
    UserCard
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>
  #header{
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-end;
    width: 100%;
    position: relative;
    background: #2c3e50;
  }
</style>