<template>
<span class="--column">

  <div id="col-header" v-on:click:="console.log('OK')">
    <h5 class="col-title">{{ title }}</h5>

    <div>
      <BButton v-on:click="delColumn"
               pill class="col-del"
               size="sm"
               variant="outline-secondary">✎</BButton>
      <BButton v-on:click="editColumn"
               pill class="col-del"
               size="sm"
               variant="outline-secondary">✕</BButton>
    </div>

  </div>

  <div id="col--body">
    <Card v-for="card of cards"
          v-bind:card="card"
          :key="card.idCard"/>
  </div>

  <div>
    <BButton class="but--new-card" v-on:click="newCard">Add Card</BButton>
    <b-form-input
        v-if="showAdd"
        v-model="titleForNewCard"
        class="inp--new-card"
        placeholder="Enter title for new Card"
        :state="nameState1"
    />
  </div>

</span>
</template>

<script>
import Card from "./Card";

export default {
  name: "Column",
  props: {
    idColumn: String,
    title: String,
    cards: Array
  },
  components: {
    Card
  },
  methods: {
    newCard() {
      //AddCard
      if (this.nameState1) {
        this.cards.push({
          idColumn: "",
          idCard: 'id' + (new Date()).getTime(),
          title: this.titleForNewCard,
          description: ''
        });
        this.titleForNewCard = '';
        //Scroll
        let container = this.$el.querySelector('#col--body')
        container.scrollTop = container.scrollHeight;

      }
      this.showAdd = !this.showAdd;
    },
    editColumn(){

    },
    delColumn(){

    }
  },
  data() {
    return {
      showAdd: false,
      titleForNewCard: '',
      cardDescription: ''
    }
  }, computed: {
    nameState1() {
      let len = this.titleForNewCard.length
      return len > 2
    }
  },
}


</script>


<style scoped>
.--column {
  margin: 1%;
  display: flex;
  width: 300px;
  height: 93%;
  background-color: silver;
  min-width: 300px;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  border-radius: 10px;
  border: 1px solid grey;
}

#col-header {
  background-color: #222a41;
  text-align: left;
  padding-left: 10px;
  word-wrap: break-word;
  color: silver;
  border-radius: 10px 10px 0 0;
  border: 1px solid grey;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

#col--body {
  min-height: 115px;
  max-height: 700px;
  overflow: auto;
}

.col-del{
  width: 20px;
  height: 20px;
  max-height: 20px;
  max-width: 20px;
  padding: 0;
  font-size: 10px;
  margin: 10px;
}

.but--new-card {
  margin: 10px;
  height: 30px;
  width: 276px;
  font-size: 14px;
}

.inp--new-card {
  margin: 0 10px 10px 10px;
  height: 30px;
  width: 276px;
  font-size: 14px;
}

.col-title{
  margin:10px
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