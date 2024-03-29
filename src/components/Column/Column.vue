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
      <FormInput
          @change-title="changeTitle"
          v-if="showBtnAdd" :focused="focused"
          class="inp--new-card"
          placeholder="Enter title for new Card"
          :state="validationTitleLenth"
          @change-focus="changeStateFocus"
      />
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import draggable from 'vuedraggable'
import Card from "../Card/Card";
import FormInput from "../Helper/FormInput";

export default {
  name: "Column",
  props: ['idColumn', 'title'],
  components: {
    FormInput,
    Card, draggable
  },
  methods: {
    ...mapActions([
      'pushCard', 'delColumn', 'editTitleCol', 'delCard', 'delIndexes', 'delCardIndexes', 'pushCardIndex', 'rewriteIndex', 'updateCard', 'setSpinnerState', 'deleteFile'
    ]),
    changeTitle(title) {
      this.titleForNewCard = title;
    },
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
        if (this.title !== this.editedTitleColumn && this.editedTitleColumn.length > 2)
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
    async delCol() {
      try {

        this.setSpinnerState(true)
        let cardsCol = this.CARDS_COL(this.idColumn)
        cardsCol.forEach(x => {
          for (let objFile of this.FILES.filter(file => file.idCard === x.idCard)) {
            this.deleteFile(objFile.id_file);
          }
          this.delCard(x.idCard)
        });
        await this.delColumn(this.idColumn)
        await this.delIndexes(this.idColumn)
        await this.delCardIndexes(this.idColumn)

        this.visibleButtonScroll()
      } catch (err) {
        console.log(err)

      }
    },
    async newCard() {
      if (this.validationTitleLenth) {
        this.setSpinnerState(true)
        let card = {
          idColumn: this.idColumn,
          idCard: 'id' + (new Date()).getTime(),
          title: this.titleForNewCard,
          description: ''
        }

        await this.pushCard(card).then(() => {
          this.pushCardIndex(card)
          this.getListCard()
        })

        let container = this.$el.querySelector('#col--body')
        container.scrollTop = container.scrollHeight;
        this.titleForNewCard = '';
        this.setSpinnerState(false)
      }
      this.showBtnAdd = !this.showBtnAdd;
    },
    getListCard() {
      try {
        this.listCards = this.SORTED_CARDS_COL({idCol: this.idColumn, indexCards: this.INDEX_CARDS})
      } catch (err) {
        console.log(err)
      }
    },
    changeStateFocus(state) {
      this.focused = state;
    }
  },
  data() {
    return {
      showBtnAdd: false,
      titleForNewCard: '',
      edited: false,
      dataBtn: '✎',
      editedTitleColumn: this.title,
      listCards: [],
      focused: true
    }
  },
  computed: {
    ...mapGetters([
      'CARDS_COL', 'INDEX_CARDS', 'SORTED_CARDS_COL', 'FILES'
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
    this.setSpinnerState(false)
  },
  destroyed() {
    this.setSpinnerState(false)
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
  -webkit-box-shadow: 0 5px 9px 2px rgba(74, 84, 92, 0.7);
  -moz-box-shadow: 0 5px 9px 2px rgba(74, 84, 92, 0.7);
  box-shadow: 0 5px 9px 2px rgba(74, 84, 92, 0.7);
}

.ghost {
  background-color: rgba(255, 150, 150, 30%);
}

#col-header {
  background-color: #333333;
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
  overflow-y: auto;
  overflow-x: hidden;
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

#out-title:hover{
  cursor: pointer;
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