<template>
  <div>
    <input :placeholder="placeholder"
           type="text" v-on:keyup="changeTitleCard"
           class="inputBox" v-on:change="changeTitleCard" v-model="textInput"
           v-bind:class="{validate: isValidate, invalidate:!isValidate}"
           @focus="focused = true" @blur="focused = false"
    >
    <div id="result">
      <div v-for="card in listCardsTitle()" v-bind:key="card.idCard" v-bind:class="{helper: !focused}" class="items">
        {{card.title}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "FormInput",
  props: ['value', 'placeholder'],
  data() {
    return {
      textInput: '',
      isValidate: false,
      focused: false
    }
  },
  computed: {
    ...mapGetters([
      'CARDS'
    ])
  },
  methods: {
    changeTitleCard() {
      this.isValidate = this.textInput.length > 3;
      this.$emit('change-title', event.target.value)
    },
    listCardsTitle() {
      return this.CARDS.filter(cardX => cardX.title.indexOf(this.textInput) === 0)
    },
    doFilter:()=>{
      console.log('awd')
    }
  }
}
</script>

<style scoped>

.inputBox {
  border-radius: 5px;
  width: 275px;
}



#result {
  max-height: 150px;
  overflow-y: auto;
}

.helper{
  display: none;
}
.items{
  background: #ffffff;
  text-align: left;
  padding: 5px;
  font-size: 20px;
}
.items:hover{
  cursor: pointer;
}
items:active{
  background-color: red;
}



.invalidate:focus-visible {
  outline: #dc3545 solid 1px;
}

.validate:focus-visible {
  outline: #28a745 solid 1px;
}

.invalidate {
  border: #dc3545 solid 1px;
}

.validate {
  border: #28a745 solid 1px;
}


::-webkit-scrollbar {
  width: 5px;
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