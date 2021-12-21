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
        :list="this.COLUMNS"
        @end="moveCol">
      <Column
          v-for="col in this.COLUMNS"
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
        'COLUMNS','INDEX_COL'
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
      this.indexingColumns(this.COLUMNS)
      this.sortListColumn(this.INDEX_COL);
    },
    ...mapActions([
      'pushColumn','loadCards',"loadColumns","indexingColumns","pushIndex","loadColumnIndexes","sortListColumn"
    ]),
    addColumn(props) {
      let myDiv = document.getElementById("add--col")
      if (this.showInputTitle) {
        myDiv.style.maxHeight = "80px";
        if (props.state){
          let col = {
            idColumn: 'id' + (new Date()).getTime(),
            title: props.title
          }
          this.pushColumn(col) // PUSH COLUMN
          this.pushIndex(col.idColumn) // PUSH INDEX
        }
      }else{
        myDiv.style.maxHeight = "140px";
      }
      this.showInputTitle = !this.showInputTitle;
      this.visibleButtonScroll()
    },
    visibleButtonScroll(){
      let con = document.getElementById('columns-container')
      let buts = document.getElementsByClassName('fotter--but')

      if(con.scrollWidth > con.offsetWidth){
        buts[0].style.visibility = "visible";
        buts[1].style.visibility = "visible";
      }else{
        buts[0].style.visibility = "hidden";
        buts[1].style.visibility = "hidden";
      }
    }
  },
  beforeMount() {
    this.loadColumns()
    this.loadColumnIndexes()
    this.loadCards()
  },
  mounted(){
    this.sortListColumn(this.INDEX_COL)
  },
  beforeUpdate() {
    this.visibleButtonScroll()
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