<template>
  <div class="--columns">
    <Column v-for="col of columns" v-bind:title="col" :key="col.title"/>
    <div id="add--col">
      <b-form-input v-model="titleNewColumn" class="add--col--elem" placeholder="Enter title for new column"></b-form-input>
      <BButton class="add--col--elem" v-on:click="$emit('newColumn', titleNewColumn)">Create Column</BButton>
    </div>

  </div>
</template>

<script>
import Column from "./Column";
export default {
  name: "Columns",
  props:['columns'],
  components:{
    Column
  },
  data(){
    return {
      titleNewColumn: ''
    }
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
#add--col{
  height: 100%;
  width:300px;
  margin: 1%;
  display: flex;
  flex-direction: column;
  padding: 1%;
  background: rgba(50,50,50,0.3);
  border-radius: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.add--col--elem{
  margin-top: 10px;
}
</style>