<template>
<span class="--column">
  <span id="title"><h4>{{title}}</h4></span>
</span>
</template>

<script>
export default {
  name: "Column",
  props: {
    title: String
  }
}
</script>

<style scoped>
.--column{
  margin: 1%;
  display: flex;
  width: 300px;
  height: 500px;
  background-color: silver;
  overflow:auto;

  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  border-radius: 10px;
}

#title{
  background-color: #fff;
}
</style>