<template>
  <div>
    <Header/>
    <div id="app-body">
      <Columns />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'


import Columns from '../components/Columns'
import Header from "../components/Header";
import {mapActions,mapGetters} from "vuex";
export default {
  name: "MainPage",
  data() {
    return {
      showInputTitle: false
    }
  },
  methods:{
    ...mapActions([
      'refresh'
    ]),

    refreshTokens(){
      this.refresh({username:this.userInfo[0].idToken.payload.email,tokens:this.userInfo[0]});
    }
  },
  components: {
    Columns,Header
  },
  computed:{
    ...mapGetters([
        'userInfo'
    ])
  },
  beforeMount() {
    setInterval(() => this.refreshTokens(), 3500000);
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>
#app-body {
  overflow: scroll;
  min-height: 90vh;
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