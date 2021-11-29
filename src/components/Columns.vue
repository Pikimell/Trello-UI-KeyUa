<template>
  <div class="--columns">
    <Column v-for="col of columns" v-bind:title="col" :key="col.title"/>
  </div>
</template>

<script>
import Column from "./Column";
export default {
  name: "Columns",
  props:['columns'],
  components:{
    Column
  }
}
</script>

<style scoped>
.--columns{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: grey;
  display: flex;
  flex-wrap: wrap;
  flex-direction:row;
  flex: 200px;
}
</style>