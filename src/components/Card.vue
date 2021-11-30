<template>
  <div class="col--card">
    <div id="title"><h5>{{card.title}}</h5></div>
    <p>{{card.description}}</p>
  </div>
</template>

<script>
import Vue from "vue";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

export default {
  name: "Card",
  props: ['card']
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>
.col--card{
  min-height: 100px;
  width: 90%;
  margin:5%;
  background-color: #fff;
  border-radius: 5px;
}

#title{
  text-align: left;
  padding-left: 10px;
  padding-top: 10px;
  word-wrap: break-word;
}

p{
  text-align: left;
  padding: 10px;
  word-wrap: break-word;
}
</style>