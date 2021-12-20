<template>
  <div class="col--card">
    <div id="title">
      <h4 v-if="!edited">{{ card.title }}</h4>
      <b-form-input
          v-model="newTitle"
          v-if="edited"
          id="inp-title"
          placeholder="Enter new title"
      />
      <div>
        <b-button size="sm" class="-but"
                  @click="editCard"
                  variant="outline-secondary">
          {{ dataBut }}
        </b-button>

        <b-button size="sm" class="-but"
                  @click="deleteCard"
                  variant="outline-secondary">
          ✕
        </b-button>
      </div>


    </div>
    <div id="card--body">
      <p v-if="!edited && this.card.description.length > 0">{{ card.description }}</p>
      <b-form-textarea
          v-if="edited" id="inp-desc"
          v-model="newDescription"/>
      <b-button
          v-if="this.card.description.length === 0 && !edited"
          @click="addDecs"
          variant="outline-primary">
        Add Description to this Card
      </b-button>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import {mapActions} from "vuex";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

export default {
  name: "Card",
  props: ['card'],
  computed: {},
  methods: {
    ...mapActions([
      'updateCard', 'delCard', 'pushCardIndex', 'removeIndexCard', 'updateCardIndex'
    ]),
    addDecs() {
      let card = {
        idCard: this.card.idCard,
        title: this.card.title,
        idColumn: this.card.idColumn,
        desc: 'Default description'
      }
      this.updateCard(card)
    },
    async deleteCard() {
      let card = {
        idCard: this.card.idCard,
        idColumn: this.card.idColumn,
      }
      this.delCard(card.idCard)
      this.removeIndexCard(card)
      this.updateCardIndex(card.idColumn)

      this.$emit('updateView')
    },
    editCard() {
      if (this.edited) {
        this.dataBut = '✎';

        this.updateCard({
          idCard: this.card.idCard,
          title: this.newTitle,
          desc: this.newDescription,
          idColumn: this.card.idColumn
        })

      } else {
        this.dataBut = '✔';
        this.newTitle = this.card.title;
        this.newDescription = this.card.description;
      }
      this.edited = !this.edited;
    }
  },
  data() {
    return {
      edited: false,
      dataBut: '✎',
      newTitle: '',
      newDescription: ''
    }
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>
.col--card {
  min-height: 100px;
  width: 90%;
  margin: 5%;
  background-color: #fff;
  border-radius: 5px;
}

#card--body {
  max-height: 600px;
  overflow: auto;
  padding-bottom: 10px;
}

#title {
  display: flex;
  text-align: left;
  padding: 10px;
  word-wrap: break-word;
  margin: 0;
  justify-content: space-between;
}

#inp-title {
  margin-right: 10px;
  height: 32px;
  font-size: 20px;
  max-width: 180px;
}

#inp-desc {
  width: 248px;
  margin-left: 10px;
  min-height: 100px;
}

.-but {
  max-height: 32px;
  margin-left: 5px;
  padding: 0 5px 0 5px;
}

p {
  text-align: left;
  padding: 0 10px 0 10px;
  word-wrap: break-word;
}

h4 {
  text-overflow: ellipsis;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
}
</style>