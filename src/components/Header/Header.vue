<template>
  <div id="header">
    <h1 class="site-title">My Trello</h1>
    <UserCard msg="Username" v-bind:authorized="this.authorized"/>
    <b-button variant="outline-primary" class="m-1" @click="logOut">{{ (authorized) ? 'LogOut' : 'LogIn' }}</b-button>
  </div>
</template>

<script>
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import UserCard from "./UserCard";
import Vue from "vue";
import router from "../../router";
import {mapGetters} from "vuex";

export default {
  name: "Header",
  props: ['authorized'],
  components: {
    UserCard
  }, computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    logOut() {
      localStorage.setItem('userIdToken', '')
      localStorage.setItem('userRefreshToken', '')
      localStorage.setItem('expTime', 0)
      localStorage.setItem('userEmail', '')
      router.push('sign-in')
    }
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto+Slab|PT+Sans+Caption&subset=latin,cyrillic);

#header {
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  background: #282828;
}

.site-title{
  position: absolute;
  left: 50px;
  top: 5px;
  color: #cfedff;
  font-family: "Roboto Slab","PT Sans Caption","Montserrat Black",Roboto,serif;
}

</style>