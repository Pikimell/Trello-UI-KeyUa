<template>
  <div>
    <b-overlay class="file-box" :show="this.fileSpinnerState" rounded="sm" id="app-body" v-if="this.listLength>0">
      <FileCard
          v-for="file in this.files.filter(x => x.idCard === this.idCard)"
          v-bind:title="file.id_file"
          v-bind:key="file.id_file"/>
    </b-overlay>

    <b-overlay :show="this.fileSpinnerState" rounded="sm" class="empty-block" v-if="this.listLength === 0">
      <h1 class="empty-text">Empty</h1>
    </b-overlay>
  </div>
</template>

<script>
import FileCard from "./FileCard";
import {mapGetters} from "vuex";

export default {
  name: "FileBox",
  props: ['files', 'listLength', 'idCard'],
  components: {FileCard},
  computed: {
    ...mapGetters([
      'fileSpinnerState'
    ])
  },
}
</script>

<style scoped>
.file-box {
  max-width: 766px;
  display: flex;
  max-height: 400px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 150px;
}

.empty-block{
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 150px;
}

.empty-text{
  color: #888888;
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