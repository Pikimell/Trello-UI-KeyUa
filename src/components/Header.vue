<template>
  <div id="header">
    <UserCard msg="Username" v-bind:authorized="this.authorized"/>
    <b-button variant="outline-primary" class="m-1" @click="logOut">{{ (authorized)?'LogOut':'LogIn' }}</b-button>
  </div>
</template>

<script>
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import UserCard from "../components/UserCard";
import Vue from "vue";
import router from "../router";
export default {
  name: "Header",
  data() {
    return {
      authorized: true
    }
  },
  components:{
    UserCard
  },
  methods:{
    logOut(){
      localStorage.setItem('userIdToken', '')
      router.push('sign-in')
    }
  },
  beforeMount() {
    if(localStorage.getItem('userIdToken').length > 10){
      this.authorized = true;
    }else{
      this.authorized = false;
    }
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
    background: #282828;
  }
</style>