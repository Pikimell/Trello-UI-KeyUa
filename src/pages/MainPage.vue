<template>
  <div>
    <Header/>
    <div id="app-body">
      <Spinner/>
      <Columns />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapActions} from 'vuex'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'


import Columns from '../components/Columns'
import Header from "../components/Header";
import Spinner from "../components/Spiner";
export default {
  name: "MainPage",
  data() {
    return {
      showInputTitle: false
    }
  },
  methods:{
    ...mapActions([
      'setSpinnerState'
    ])
  },
  components: {
    Columns,Header,Spinner
  },
  created() {
    this.setSpinnerState(true);
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