<template>
  <div id="app">
    <Header/>
    <Columns :columns="cols" v-on:newColumn="addColumn"/>
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
      cols: []
    }
  },
  components: {
    Columns,
    Header
  },
  methods:{
    addColumn(title){
      this.cols.push(title)
    }
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>

</style>