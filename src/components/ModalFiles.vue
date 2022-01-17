<template>
  <div>
    <b-form-file
        v-model="file1"
        :state="Boolean(file1)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
    ></b-form-file>

    <BButton
        @click="this.download"
        variant="outline-primary">
      DOWNLOAD
    </BButton>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ModalFiles",
  props: ['idCard'],
  data() {
    return {
      file1: null
    }
  },
  methods: {
    ...mapActions([
      'downloadFile'
    ]),
    download(){
      let uri = 'https://volodka-trello-files.s3.us-east-2.amazonaws.com/2197420.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZWKDUOQJEKQTCXE6%2F20220117%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220117T144616Z&X-Amz-Expires=900&X-Amz-Signature=642746c9e687ea86d5308f6af193c5c6f52ab8e91b3944b1f0b297bee436a659&X-Amz-SignedHeaders=host';
      this.downloadFile(uri);
    }
  },

}
</script>

<style scoped>

</style>