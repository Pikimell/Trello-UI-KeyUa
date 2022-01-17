<template>
  <div class="col--card">
    <div id="title">
      <h4 v-if="!isEditedCard">{{ card.title }}</h4>
      <b-form-input
          v-model="newTitle"
          v-if="isEditedCard"
          id="inp-title"
          placeholder="Enter new title"
      />
      <div>
        <BButton size="sm" class="btn"
                  @click="editCard"
                  variant="outline-secondary">
          {{ dataBtn }}
        </BButton>

        <BButton size="sm" class="btn"
                  @click="deleteCard"
                  variant="outline-secondary">
          ✕
        </BButton>
      </div>


    </div>
    <div id="card--body">
      <p v-if="!isEditedCard && this.card.description.length > 0">{{ card.description }}</p>
      <b-form-textarea
          v-if="isEditedCard" id="inp-desc"
          v-model="newDescription"/>
      <BButton
          v-if="this.card.description.length === 0 && !isEditedCard"
          @click="addDesc"
          variant="outline-primary">
        Add Description to this Card
      </BButton>
      <b-form-file
          v-model="file1"
          :state="Boolean(file1)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
      ></b-form-file>
      <BButton
          @click="download"
          variant="outline-primary">
      </BButton>

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
    download(){
      alert('awd');
    },
    addDesc() {
      console.log(this.file1);
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
      if (this.isEditedCard) {
        this.dataBtn = '✎';

        this.updateCard({
          idCard: this.card.idCard,
          title: this.newTitle,
          desc: this.newDescription,
          idColumn: this.card.idColumn
        })

      } else {
        this.dataBtn = '✔';
        this.newTitle = this.card.title;
        this.newDescription = this.card.description;
      }
      this.isEditedCard = !this.isEditedCard;
    }
  },
  data() {
    return {
      isEditedCard: false,
      dataBtn: '✎',
      newTitle: '',
      newDescription: '',
      file1: null
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

.btn {
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