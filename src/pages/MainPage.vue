<template>
  <div>
    <Header/>
    <div id="app-body">
      <Spinner v-if="authorized"/>
      <Columns v-if="authorized"/>
      <NonAuth v-if="!authorized"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'


import Columns from '../components/Columns'
import Header from "../components/Header";
import NonAuth from "../components/NonAuthorizedPage";
import Spinner from "../components/Spiner";
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
      'setSpinnerState','refresh'
    ]),

    getDifferenceInTime(start,end){
      return Math.floor((end-start/1000));
    },

    refreshTokens(){
      let userEmail = localStorage.getItem('userEmail');
      let refreshToken = localStorage.getItem('userRefreshToken');
      this.refresh({username: userEmail,refreshToken:refreshToken});
    }
  },
  components: {
    Columns,Header,Spinner,NonAuth
  },
  created() {
    this.setSpinnerState(true);
  },
  computed:{
    ...mapGetters([
        'userInfo'
    ])
  },
  beforeMount() {
    let exp = localStorage.getItem('expTime');
    exp = (exp)?exp:new Date().getTime()/1000;
    let now = new Date().getTime();
    let delay = this.getDifferenceInTime(now,exp);
    delay = (delay>50)?delay:50

    console.log(delay)
    setTimeout(()=>{
      this.refreshTokens()
      setInterval(() => this.refreshTokens(), 3500000);
    }, (delay-240) * 1000)

    if(localStorage.getItem('userIdToken').length > 10){
      this.authorized = true;
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