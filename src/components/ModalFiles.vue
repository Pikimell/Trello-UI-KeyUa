<template>
  <div>

    <div class="file-box">
      <FileCard v-for="file in listFile" v-bind:title="file.id_file" v-bind:key="file.id_file" @update="updateList"/>
    </div>

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
      'uploadFile'
    ]),
    updateList() {
      this.listFile = this.FILES.filter(x => x.idCard === this.idCard)
    },
    uploadFiles() {
      let file = {
        file: this.file1,
        id_file: this.file1.name,
        idCard: this.idCard
      }
      this.uploadFile(file);
      this.updateList()
    },
    selectFile(e) {
      if (e.target.files.length > 0)
        this.file1 = e.target.files[0];
    }
  },
  computed: {
    ...mapGetters([
      'FILES'
    ])
  },
  beforeMount() {
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
}


.footer {
  display: flex;
}

.flex-item {
  margin: 10px;
}
</style>