<template>
  <div id="app">
    <Header/>
    <Columns :columns="cols"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import Header from "../components/Header";
import Columns from '../components/Columns'

export default {
  name: "MainPage",
  data(){
    return {
      cols: ['first','second','col3','col4','col5','col6','col7','col']
    }
  },
  components: {
    Columns,
    Header
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>

</style>