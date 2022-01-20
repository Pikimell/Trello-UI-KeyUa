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
      <div class="desc" @click="showDetailsCard">
        <p v-if="!isEditedCard && this.card.description.length > 0">{{ card.description }}</p>
      </div>
      <b-form-textarea
          v-if="isEditedCard" id="inp-desc"
          v-model="newDescription"/>
      <BButton
          v-if="this.card.description.length === 0 && !isEditedCard"
          @click="addDesc" class="card-btn"
          variant="outline-primary">
        Add Description to this Card
      </BButton>

      <div>
        <BButton class="card-btn" v-b-modal="this.card.idCard" variant="outline-primary">
          Files {{ (fileCount > 0) ? '(' + fileCount + ')' : '' }}
        </BButton>

        <b-modal :id="this.card.idCard" title="Files" size="lg" hide-footer centered>
          <ModalFiles v-bind:idCard="this.card.idCard" @update-count="updateCount"/>
        </b-modal>
      </div>
    </div>

    <b-modal :id="'Details'+this.card.idCard" centered hide-footer :title="this.card.title" v-model="showDetails" >
      <CardDetails v-bind:card="this.card"/>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import {mapActions, mapGetters} from "vuex";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import ModalFiles from "../ModalFiles/ModalFiles";
import CardDetails from "./CardDetails";

export default {
  name: "Card",
  props: ['card'],
  components: {
    ModalFiles, CardDetails
  },
  methods: {
    ...mapActions([
      'updateCard', 'delCard', 'pushCardIndex', 'removeIndexCard', 'updateCardIndex', 'downloadFile', 'deleteFile'
    ]),
    updateCount() {
      this.getCount();
    },
    addDesc() {
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

      for (let objFile of this.FILES.filter(file => file.idCard === card.idCard)) {
        this.deleteFile(objFile.id_file);
      }

      this.$emit('updateView')
    },
    editCard() {
      if (this.isEditedCard) {
        this.dataBtn = '✎';
        if (this.newTitle.length > 2) {
          this.updateCard({
            idCard: this.card.idCard,
            title: this.newTitle,
            desc: this.newDescription,
            idColumn: this.card.idColumn
          })
        } else {
          this.newTitle = this.card.title;
        }
      } else {
        this.dataBtn = '✔';
        this.newTitle = this.card.title;
        this.newDescription = this.card.description;
      }
      this.isEditedCard = !this.isEditedCard;
    },
    getCount() {
      let listFile = this.FILES.filter(file => file.idCard === this.card.idCard)
      this.fileCount = listFile.length;
    },
    showDetailsCard() {
      this.showDetails = true;
    }
  },
  computed: {
    ...mapGetters(['FILES'])
  },
  data() {
    return {
      isEditedCard: false,
      dataBtn: '✎',
      newTitle: '',
      newDescription: '',
      fileCount: 0,
      showDetails: false
    }
  }, beforeMount() {
    this.getCount();
  }, updated() {
    this.getCount();
  }
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
</script>

<style scoped>
.col--card {
  min-height: 100px;
  min-width: 268px;
  width: 90%;
  margin: 5%;
  background-color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 5px 5px 10px -4px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 5px 5px 10px -4px rgba(34, 60, 80, 0.2);
  box-shadow: 5px 5px 10px -4px rgba(34, 60, 80, 0.2);
}

#card--body {
  max-height: 300px;
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

h4:hover, #card--body:hover {
  cursor: pointer;
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

.card-btn {
  margin: 5px 5px 0 5px;
  width: 250px;
}

.desc {
  max-height: 200px;
  overflow-y: auto;
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

::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(192, 192, 192, 0.93);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(136, 136, 136, 0.6);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(85, 85, 85, 0.58);
}
</style>