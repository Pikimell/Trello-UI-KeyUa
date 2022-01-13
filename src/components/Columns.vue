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
          :state="validationTitleLength">
      </b-form-input>

      <BButton
          class="add--col--elem"
          v-on:click="addColumn({
            title:titleNewColumn,
            state:validationTitleLength
          });titleNewColumn='';"
      >
        Create Column
      </BButton>

    </div>
    <draggable
        class="columns"
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
      <BButton id="footer-btn-left" class="footer--btn" pill v-on:click="scrollToDir('left');" >
        <b-icon icon="arrow-left-circle" font-scale="2"></b-icon>
      </BButton>
      <BButton id="footer-btn-right" class="footer--btn" pill v-on:click="scrollToDir('right');" >
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
      editedColumn: false
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
        animation: 200,
        group: "columns",
        disabled: false,
        ghostClass: "ghost",
        loadingPage: false
      };
    },
    validationTitleLength() {
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
        'pushColumn','loadCards',"loadColumns","indexingColumns",
        "pushIndex","loadColumnIndexes","sortListColumn",'createIndexForCard',
        'loadCardIndexes','setSpinnerState'
    ]),
    async addColumn(props) {
      let myDiv = document.getElementById("add--col")
      if (this.showInputTitle) {
        myDiv.style.maxHeight = "80px";
        if (props.state){
          let col = {
            idColumn: 'id' + (new Date()).getTime(),
            title: props.title
          }
          await this.setSpinnerState(true);
          await this.pushColumn(col)
          await this.pushIndex(col.idColumn)
          await this.createIndexForCard(col.idColumn)
        }
      }else{
        myDiv.style.maxHeight = "140px";
      }
      this.showInputTitle = !this.showInputTitle;
      this.visibleButtonScroll()
    },
    visibleButtonScroll(){
      let con = document.getElementById('columns-container')
      let buttons = document.getElementsByClassName('footer--btn')

      if(con.scrollWidth > con.offsetWidth){
        buttons[0].style.visibility = "visible";
        buttons[1].style.visibility = "visible";
      }else{
        buttons[0].style.visibility = "hidden";
        buttons[1].style.visibility = "hidden";
      }
    }
  },
  async beforeMount() {
    await this.loadColumns()
    await this.loadColumnIndexes()
    await this.loadCards()
    await this.loadCardIndexes();
  },
  async mounted(){
    await this.sortListColumn(this.INDEX_COL)
    if(this.COLUMNS.length == 0){
      await this.setSpinnerState(false);
    }
  },
  beforeUpdate() {
    this.visibleButtonScroll()
  }
}
</script>

<style scoped>

#columns-container{
  margin:0;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
  min-height: 94vh;
}

.columns {
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
  left:90px;
  z-index: 11;
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
  bottom: 20px;
  position: absolute;
  z-index: 10;
}

.footer--btn{
  opacity: 0.3;
  padding: 3px 3px 0 3px ;
}
.footer--btn:hover{
  opacity: 1;
}

#footer-btn-left{
  position: absolute;
  left:30px
}
#footer-btn-right{
  position: absolute;
  right:30px ;
}
</style>