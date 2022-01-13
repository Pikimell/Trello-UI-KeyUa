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
import axios from "axios";
import {mapGetters} from "vuex";
import {PATH} from "../store/consts";
export default {
  name: "Header",
  data() {
    return {
      authorized: true
    }
  },
  components:{
    UserCard
  }, computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods:{
    logOut(){
      router.push('sign-in')
      localStorage.setItem('userIdToken', {idToken:{payload:{email:""}}})
      axios.post(PATH + '/signOut',{
        email: this.userInfo[0].idToken.payload.email
      })
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