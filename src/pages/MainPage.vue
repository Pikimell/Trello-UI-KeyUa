<template>
  <div id="app-body">
    <Columns />
  </div>
</template>

<script>
import Vue from 'vue'
import {} from 'vuex'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'


import Columns from '../components/Columns'

export default {
  name: "MainPage",
  data() {
    return {
      showInputTitle: false
    }
  },
  components: {
    Columns
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>
#app-body {
  overflow: scroll;
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