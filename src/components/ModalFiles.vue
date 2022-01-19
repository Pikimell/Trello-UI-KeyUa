<template>
  <div>

    <b-overlay class="file-box" :show="this.fileSpinnerState" rounded="sm" id="app-body" v-if="listFile.length>0">
      <FileCard
          v-for="file in this.FILES.filter(x => x.idCard === this.idCard)"
          v-bind:title="file.id_file"
          v-bind:key="file.id_file"/>
    </b-overlay>

    <b-overlay :show="this.fileSpinnerState" rounded="sm" class="empty-block" v-if="listFile.length === 0">
      <h1 class="empty-text">Empty</h1>
    </b-overlay>

    <div class="footer">
      <b-form-file
          class="flex-item"
          v-model="file1" v-on:change="selectFile"
          :state="Boolean(file1)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
      ></b-form-file>

      <BButton class="flex-item"
               v-if="Boolean(file1)"
               variant="success" v-on:click="uploadFiles">Upload
      </BButton>
    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import FileCard from "./FileCard";

export default {
  name: "ModalFiles",
  props: ['idCard'],
  components: {FileCard},
  data() {
    return {
      file1: null,
      listFile: []
    }
  },
  methods: {
    ...mapActions([
      'uploadFile','setFileSpinnerState'
    ]),
    updateList() {
      this.listFile = this.FILES.filter(x => x.idCard === this.idCard)
      this.$emit('update-count');
    },
    async uploadFiles() {
      let file = {
        file: this.file1,
        id_file: this.file1.name,
        idCard: this.idCard
      }
      this.setFileSpinnerState(true);
      await this.uploadFile(file);
      this.file1 = null;
    },
    selectFile(e) {
      if (e.target.files.length > 0)
        this.file1 = e.target.files[0];
    }
  },
  computed: {
    ...mapGetters([
      'FILES','fileSpinnerState'
    ])
  },
  beforeMount() {
    this.updateList();
  },
  destroyed() {
    this.updateList();
  }
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
  min-height: 300px;
}


.footer {
  display: flex;
}

.flex-item {
  margin: 10px;
}

.empty-block{
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.empty-text{
  color: #888888;
}
</style>