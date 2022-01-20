<template>
  <div>
    <p>{{this.card.description}}</p>
    <hr>
    <FileBox
        v-bind:files="this.FILES.filter(x => x.idCard === this.card.idCard)"
        v-bind:list-length="listFile.length" v-bind:id-card="this.card.idCard"
    />
  </div>
</template>

<script>
import FileBox from "../ModalFiles/FileBox";
import {mapGetters} from "vuex";

export default {
  name: "CardDetails",
  props: ['card'],
  components: {FileBox},
  computed: {
    ...mapGetters([
      'FILES'
    ])
  },
  methods:{
    updateList(){
      this.listFile = this.FILES.filter(x => x.idCard === this.card.idCard);
    }
  },
  data(){
    return {
      listFile: []
    }
  },
  beforeMount() {
    this.updateList();
  }
}
</script>

<style scoped>
p{
  max-height: 350px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
}
::-webkit-scrollbar-track {
  background: rgba(192, 192, 192, 0.93);
}
::-webkit-scrollbar-thumb {
  background: rgba(136, 136, 136, 0.6);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(85, 85, 85, 0.58);
}
</style>