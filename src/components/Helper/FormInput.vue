<template>
  <div>
    <input :placeholder="placeholder"
           type="text" autocomplete="on" v-on:keyup="changeTitleCard"
           class="inputBox" v-on:change="changeTitleCard"
           v-bind:class="{validate: isValidate,devalidate:!isValidate}"
    >
    <div id="result"></div>
  </div>
</template>

<script>
import { mapGetters} from "vuex";

export default {
  name: "FormInput",
  props: ['placeholder', 'isValidate'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'CARDS'
    ])
  },
  methods: {
    changeTitleCard() {
      console.log('awd')
      this.$emit('changeTitle')
    },
    updateAutocomplate(){
      let items = document.getElementsByClassName('inputBox');
      let inputBox = items[0]
      console.log(inputBox.autocomplete)
    }
  },
  beforeMount() {
    this.updateAutocomplate();
  }
}
</script>

<style scoped>
.inputBox {

}


.devalidate:focus-visible {
  outline: #dc3545 solid 1px;
}

.validate:focus-visible {
  outline: #28a745 solid 1px;
}

.devalidate {
  border: #dc3545 solid 1px;
}

.validate {
  border: #28a745 solid 1px;
}
</style>