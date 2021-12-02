<template>
  <div class="--columns">
    <Column
        v-for="col of this.COLUMNS.values()"
        v-bind:title="col.title"
        v-bind:idColumn="col.idColumn"
        :key="col.idColumn"/>

    <div id="add--col">
      <b-form-input
          v-if="showInputTitle"
          v-model="titleNewColumn"
          class="add--col--elem"
          placeholder="Enter title for new column"
          :state="nameState">
      </b-form-input>

      <BButton
          class="add--col--elem"
          v-on:click="addColumn({
            title:titleNewColumn,
            state:nameState
          });titleNewColumn='';"
      >
        Create Column
      </BButton>

    </div>

  </div>
</template>

<script>
import Column from "./Column";
import {mapGetters,mapActions} from "vuex";

export default {
  name: "Columns",
  components: {
    Column
  },
  data() {
    return {
      titleNewColumn: '',
      showInputTitle: false
    }
  },
  computed: {
    ...mapGetters([
      'COLUMNS'
    ]),
    nameState() {
      return this.titleNewColumn.length > 2
    }
  },
  methods:{
    ...mapActions([
      'pushColumn'
    ]),
    addColumn(props) {
      if (this.showInputTitle) {
        if (props.state)
          this.pushColumn({
            idColumn: 'id' + (new Date()).getTime(),
            title: props.title
          })
      }
      this.showInputTitle = !this.showInputTitle;
    }
  }
}
</script>

<style scoped>
.--columns {
  position: relative;
  height: 100%;
  background-color: rgba(155, 155, 155, 0.3);
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  overflow-x: auto;
}

#add--col {
  height: 100%;
  width: 300px;
  margin: 1%;
  display: flex;
  flex-direction: column;
  padding: 1%;
  background: rgba(50, 50, 50, 0.3);
  border-radius: 10px;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 300px;
}

.add--col--elem {
  margin-top: 10px;
}
</style>