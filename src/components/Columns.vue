<template>
  <div class="--columns">
    <draggable
        class="drag" :list="this.COLUMNS" group="tasks"
        v-bind="dragOptions">
      <Column
          v-for="col of this.COLUMNS"
          v-bind:title="col.title"
          v-bind:idColumn="col.idColumn"
          :key="col.idColumn"/>
    </draggable>

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
import draggable from 'vuedraggable'

export default {
  name: "Columns",
  data() {
    return {
      titleNewColumn: '',
      showInputTitle: false,
      editable: false
    }
  },
  components: {
    Column,draggable
  },
  computed: {
    ...mapGetters([
        'COLUMNS'
    ]),
    dragOptions() {
      return {
        animation: 0,
        group: "cards",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    nameState() {
      return this.titleNewColumn.length > 2
    }
  },
  methods:{
    ...mapActions([
      'pushColumn','loadCards',"loadColumns"
    ]),
    addColumn(props) {
      let col = this.COLUMNS;
      let len = col.length;
      let ind = (len>0)?col[len-1].index+1:0;
      if (this.showInputTitle) {
        if (props.state)
          this.pushColumn({
            idColumn: 'id' + (new Date()).getTime(),
            title: props.title,
            index: ind
          })
      }
      this.showInputTitle = !this.showInputTitle;
    }
  },
  beforeMount() {
    this.loadColumns()
    this.loadCards()
  }
}
</script>

<style scoped>
.--columns {
  
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

.drag{
  display: flex;
  margin-right: 10px;
}

.ghost {
  opacity: 0.5;
  background-color: #000;
}

.add--col--elem {
  margin-top: 10px;
}
</style>