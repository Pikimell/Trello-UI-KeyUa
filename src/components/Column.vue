<template>
  <div class="body-column">
    <div id="col-header">
      <b-form-input class="col-title" id="inp-title"
                    v-if="this.edited"
                    v-model="editedTitleColumn"/>
      <h5 class="col-title" id="out-title"
          v-else>{{ editedTitleColumn }}</h5>

      <div>
        <BButton @click="this.editTitleColumn"
                 pill class="col-del"
                 size="sm"
                 variant="outline-secondary">{{ dataBtn }}
        </BButton>
        <BButton @click="this.delCol"
                 pill class="col-del"
                 size="sm"
                 variant="outline-secondary">✕
        </BButton>
      </div>

    </div>

    <draggable id="col--body"
               v-bind="dragOptions"
               :list="this.listCards"
               @change="moveCard">
      <Card v-for="card of this.listCards"
            v-bind:card="card" @updateView="getListCard"
            :key="card.idCard"/>
    </draggable>

    <div>
      <BButton class="but--new-card" v-on:click="newCard">Add Card</BButton>
      <b-form-input
          v-if="showBtnAdd"
          v-model="titleForNewCard"
          class="inp--new-card"
          placeholder="Enter title for new Card"
          :state="validationTitleLenth"
      />
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import draggable from 'vuedraggable'
import Card from "./Card";

export default {
  name: "Column",
  props: ['idColumn', 'title'],
  components: {
    Card, draggable
  },
  methods: {
    ...mapActions([
      'pushCard', 'delColumn', 'editTitleCol', 'delCard', 'delIndexes', 'delCardIndexes', 'pushCardIndex', 'rewriteIndex', 'updateCard'
    ]),
    moveCard(data) {

      let card = Object.values(data)[0].element;

      if (this.idColumn !== card.idColumn) {
        this.updateCard({
          idCard: card.idCard,
          title: card.title,
          desc: card.description,
          idColumn: this.idColumn
        })
      }
      this.rewriteIndex({idColumn: this.idColumn, cards: this.listCards});
    }
    ,
    visibleButtonScroll() {
      let con = document.getElementById('columns-container')
      let buts = document.getElementsByClassName('fotter--but')

      if (con.scrollWidth > con.offsetWidth) {
        buts[0].style.visibility = "visible";
        buts[1].style.visibility = "visible";
      } else {
        buts[0].style.visibility = "hidden";
        buts[1].style.visibility = "hidden";
      }
    },
    editTitleColumn() {

      if (this.edited) {
        this.dataBtn = '✎';
        if (this.title !== this.editedTitleColumn)
          this.editTitleCol({
            idColumn: this.idColumn,
            title: this.editedTitleColumn
          })
      } else {
        this.dataBtn = '✔';
        this.newTitle = this.editedTitleColumn;
      }
      this.edited = !this.edited;
    },
    delCol() {
      let cardsCol = this.CARDS_COL(this.idColumn)
      cardsCol.forEach(x => {
        this.delCard(x.idCard)
      })

      this.delColumn(this.idColumn)
      this.delIndexes(this.idColumn)
      this.delCardIndexes(this.idColumn)
      this.visibleButtonScroll()
    },
    async newCard() {
      if (this.validationTitleLenth) {
        let card = {
          idColumn: this.idColumn,
          idCard: 'id' + (new Date()).getTime(),
          title: this.titleForNewCard,
          description: ''
        }

        this.pushCard(card).then(()=>{
          this.pushCardIndex(card)
          this.getListCard()
        })

        let container = this.$el.querySelector('#col--body')
        container.scrollTop = container.scrollHeight;
        this.titleForNewCard = '';
      }
      this.showBtnAdd = !this.showBtnAdd;
    },


    getListCard() {
      this.listCards = this.SORTED_CARDS_COL({idCol: this.idColumn, indexCards: this.INDEX_CARDS})
    }
  },
  data() {
    return {
      showBtnAdd: false,
      titleForNewCard: '',
      edited: false,
      dataBtn: '✎',
      editedTitleColumn: this.title,
      listCards: []
    }
  }, computed: {
    ...mapGetters([
      'CARDS_COL', 'INDEX_CARDS', 'SORTED_CARDS_COL'
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: "cards",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    validationTitleLenth() {
      let len = this.titleForNewCard.length
      return len > 2
    }
  },
  beforeMount() {
    this.getListCard()
  },
  watch: {
    INDEX_CARDS() {
      this.getListCard()
    }
  }
}


</script>


<style scoped>
.body-column {
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
  margin: 1%;
}

.ghost {
  background-color: rgba(255, 150, 150, 30%);
}

#col-header {
  background-color: #222a41;
  text-align: left;
  padding-left: 10px;
  color: silver;
  border-radius: 10px 10px 0 0;
  border: 1px solid grey;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

#col--body {
  min-height: 115px;
  max-height: 530px;
  overflow: auto;
}

#inp-title {
  margin: 7px 0 7px 0;
  width: 200px;
  height: 30px;
  color: azure;
  font-size: 20px;
  padding-left: 10px;
  background-color: rgba(35, 42, 65, 0.99);
}

#out-title {
  word-wrap: break-word;
  text-overflow: ellipsis;
  max-width: 185px;
  white-space: nowrap;
  overflow: hidden;
}

.col-del {
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

.col-title {
  margin: 10px;
  max-width: 200px;
  max-height: 30px;
  text-overflow: ellipsis;
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