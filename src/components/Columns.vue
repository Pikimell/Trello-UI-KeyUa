<template>
  <div id="columns-container">
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
    <draggable
        class="--columns"
        v-bind="dragOptions"
        :list="SORT_COLUMNS"
        @end="moveCol">
      <Column
          v-for="col in this.SORT_COLUMNS"
          v-bind:idColumn="col.idColumn"
          v-bind:title="col.title"
          v-bind:key="col.idColumn"
      />
    </draggable>

    <div class="foot">
      <BButton id="foot-but-left" class="fotter--but" pill v-on:click="scrollToDir('left');" >
        <b-icon icon="arrow-left-circle" font-scale="2"></b-icon>
      </BButton>
      <BButton id="foot-but-right" class="fotter--but" pill v-on:click="scrollToDir('right');" >
        <b-icon icon="arrow-right-circle" font-scale="2"></b-icon>
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
        'SORT_COLUMNS'
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
    scrollToDir(dir){
      let container = document.getElementById('columns-container')
      if(dir==="left"){
        container.scrollLeft = 0;
      }else{
        container.scrollLeft = container.scrollWidth;
      }
    },
    moveCol(){
      console.log(this.SORT_COLUMNS)
      let columnsList = this.SORT_COLUMNS;
      this.indexingColumns(columnsList)
    },
    ...mapActions([
      'pushColumn','loadCards',"loadColumns","indexingColumns"
    ]),
    addColumn(props) {
      console.log(props)
      let myDiv = document.getElementById("add--col")
      if (this.showInputTitle) {
        myDiv.style.maxHeight = "80px";
        if (props.state)
          this.pushColumn({
            idColumn: 'id' + (new Date()).getTime(),
            title: props.title
          })
      }else{
        myDiv.style.maxHeight = "140px";
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

#columns-container{
  margin:0;
  background-color: rgba(155, 155, 155, 0.3);
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
}

.--columns {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: row;
  height: 100%;
  min-height: 239px;
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
  max-height: 80px;
  position:absolute;
  bottom: 0;
}


.ghost {
  opacity: 0.1;
  background-color: rgba(150,255,150,50%);
}

.add--col--elem {
  margin-top: 10px;
  max-height: 40px;
}

.foot{
  width:100%;
  height: 50px;
  display: flex;
}

.fotter--but{
  opacity: 0.3;
  padding: 3px 3px 0 3px ;
}
.fotter--but:hover{
  opacity: 1;
}

#foot-but-left{
  position: absolute;
  left:30px
}
#foot-but-right{
  position: absolute;
  right:30px ;
}
</style>