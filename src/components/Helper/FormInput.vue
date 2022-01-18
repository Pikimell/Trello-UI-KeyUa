<template>
  <div>
    <input id="inputBox"
           :placeholder="placeholder"
           type="text"
           class="static"
           v-bind:class="{validate: isValidate,devalidate:!isValidate}"
    >
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: ['placeholder','isValidate'],
  data() {
    return {

    }
  }

}
</script>

<style scoped>
#inputBox {

}



.devalidate:focus-visible{
  outline: #dc3545 solid 1px;
}
.validate:focus-visible{
  outline: #28a745 solid 1px;
}
.devalidate{
  border: #dc3545 solid 1px;
}
.validate{
  border: #28a745 solid 1px;
}
</style>