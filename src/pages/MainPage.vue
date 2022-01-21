<template>
  <div>
    <Header v-bind:authorized="authorized"/>
    <b-overlay :show="this.spinnerState" rounded="sm" id="app-body">
      <Columns v-if="authorized"/>
      <NonAuth v-if="!authorized"/>
    </b-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import router from "../router";

import Columns from '../components/Column/Columns'
import Header from "../components/Header/Header";
import NonAuth from "../components/Auth/NonAuthorizedPage";
import {mapActions,mapGetters} from "vuex";
export default {
  name: "MainPage",
  data() {
    return {
      showInputTitle: false,
      authorized: false
    }
  },
  methods:{
    ...mapActions([
      'setSpinnerState','refresh','loadFiles'
    ]),

    getDifferenceInTime(start,end){
      return Math.floor((end-start/1000));
    },

    refreshTokens(){
      let refreshToken = localStorage.getItem('userRefreshToken');
      this.refresh({username: '',refreshToken:refreshToken});
    }
  },
  components: {
    Columns,Header,NonAuth
  },
  created() {
    let refreshToken = localStorage.getItem('userRefreshToken');
    if(refreshToken !== null && refreshToken.toString().length > 10)
      this.setSpinnerState(true);
  },
  computed:{
    ...mapGetters([
        'userInfo','spinnerState'
    ])
  },
  beforeMount() {
    try{
      if(localStorage.getItem('userRefreshToken').length > 10){
        this.authorized = true;
        this.loadFiles();
      }
      let exp = localStorage.getItem('expTime');
      exp = (exp)?exp:new Date().getTime()/1000;
      let now = new Date().getTime();
      let delay = this.getDifferenceInTime(now,exp);
      delay = (delay>300)?delay:0

      this.refreshTokens()
      setTimeout(()=>{
        this.refreshTokens()
        setInterval(() => this.refreshTokens(), 3500000);
      }, delay * 1000)
    }catch (err){
      console.log(err);
      router.push('sign-in');
    }
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>
#app-body {
  overflow: scroll;
  min-height: 94.1vh;
}

#app-body::-webkit-scrollbar {
  width: 0;
  height: 0;
}

::-webkit-scrollbar {
  height: 10px;
  border-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: silver;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>