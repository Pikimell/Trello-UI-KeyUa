<template>
  <div id="header">
    <h1 class="site-title">My Trello</h1>
    <UserCard msg="Username" v-bind:authorized="this.authorized"/>
    <b-button variant="outline-primary" class="m-1" @click="logOut">{{ (authorized) ? 'LogOut' : 'LogIn' }}</b-button>
  </div>
</template>

<script>
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import UserCard from "../components/UserCard";
import Vue from "vue";
import router from "../router";
//import {api} from "../axios";
import {mapGetters} from "vuex";
//import {PATH} from "../store/consts";

export default {
  name: "Header",
  data() {
    return {
      authorized: true
    }
  },
  components: {
    UserCard
  }, computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    logOut() {
      /*api.post(PATH + '/signOut', {
        email: localStorage.getItem('userEmail')
      })*/
      localStorage.setItem('userIdToken', '')
      localStorage.setItem('userRefreshToken', '')
      localStorage.setItem('expTime', 0)
      localStorage.setItem('userEmail', '')
      router.push('sign-in')
    }
  },
  beforeMount() {
    if (localStorage.getItem('userIdToken').length > 10) {
      this.authorized = true;
    } else {
      this.authorized = false;
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