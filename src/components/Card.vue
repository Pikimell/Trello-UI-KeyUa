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

      <div>
        <BButton v-b-modal.modal-1 variant="outline-primary">
          Files
        </BButton>

        <b-modal id="modal-1" title="Files">
          <ModalFiles v-bind:idCard="this.card.idCard"/>
        </b-modal>
      </div>


    </div>

  </div>
</template>

<script>
import Vue from "vue";
import {mapActions} from "vuex";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import ModalFiles from "./ModalFiles";

export default {
  name: "Card",
  props: ['card'],
  components: {
    ModalFiles
  },
  methods: {
    ...mapActions([
      'updateCard', 'delCard', 'pushCardIndex', 'removeIndexCard', 'updateCardIndex', 'downloadFile'
    ]),
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
      downloadURL: 'https://volodka-trello-files.s3.us-east-2.amazonaws.com/2197420.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZWKDUOQJEKQTCXE6%2F20220117%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220117T104544Z&X-Amz-Expires=900&X-Amz-Signature=06a082a4bffe90daefee8587c839446b92d0fc8617b08c7790c7564e6965a951&X-Amz-SignedHeaders=hosts',
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