<template>
  <div>

    <FileBox
      v-bind:files="this.FILES.filter(x => x.idCard === this.idCard)"
      v-bind:list-length="listFile.length" v-bind:id-card="this.idCard"
    />

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
import FileBox from "./FileBox";

export default {
  name: "ModalFiles",
  props: ['idCard'],
  components: {FileBox},
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
      setTimeout(()=>{
        this.updateList();
      },10000)
      this.file1 = null;
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
  },
  destroyed() {
    this.updateList();
  }
}
</script>

<style scoped>

.footer {
  display: flex;
}

.flex-item {
  margin: 10px;
}
</style>