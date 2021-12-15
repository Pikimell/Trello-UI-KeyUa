<template>
  <div class="columns-container">
    <draggable
        class="--columns"
        v-bind="dragOptions"
        @end="moveCol">
      <Column
          v-for="col in this.COLUMNS"
          v-bind:idColumn="col.idColumn"
          v-bind:title="col.title"
          v-bind:key="col.idColumn"
      />
      <div
          id="add--col"
          slot="footer"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example"
          key="footer" v-bind:draggable="false">
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
    </draggable>
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
        group: "columns",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    nameState() {
      return this.titleNewColumn.length > 2
    }
  },
  methods:{
    moveCol(data){
      let props = {
        idColumn: this.idColumn,
        oldIndex: data.oldIndex,
        newIndex: data.newIndex
      }
      console.log(props.oldIndex,"---",props.newIndex)
      this.indexingColumns(props)
    },
    ...mapActions([
      'pushColumn','loadCards',"loadColumns","indexingColumns"
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

.columns-container{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  overflow-x: auto;
  margin:0;
  padding:0;
  background-color: rgba(155, 155, 155, 0.3);
  width: 100%;
}

.--columns {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  height: 100%;
  min-height: 239px;
  min-width: 1280px;
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


.ghost {
  opacity: 0.1;
  background-color: rgba(150,255,150,50%);
}

.add--col--elem {
  margin-top: 10px;
}
</style>