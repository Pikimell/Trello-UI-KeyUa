<template>
  <div class="file">
    <div class="header">
      <h5 class="title" v-b-tooltip.hover :title="this.validTitle">
        {{ this.validTitle }}
      </h5>
      <b-icon :icon="this.type" font-scale="1" class="image-type"></b-icon>
    </div>

    <BButton class="download-btn" size="sm"
             @click="this.download"
             variant="outline-primary">
      Download
    </BButton>
    <BButton class="download-btn" size="sm"
             @click="this.deleteFiles"
             variant="outline-primary">
      Delete
    </BButton>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "FileCard",
  props: ['title'],
  methods: {
    ...mapActions([
      'downloadFile','deleteFile','setFileSpinnerState'
    ]),
    download() {
      this.downloadFile(this.title);
    },
    deleteFiles() {
      this.setFileSpinnerState(true);
      this.deleteFile(this.title)
      setTimeout(()=>{
        this.setFileSpinnerState(false);
      },1000);
    },
    getType() {
      this.validTitle = this.title.toString().substr(13)
      let title = this.title.toString();
      let lastDot = title.lastIndexOf('.');

      if (lastDot !== -1) {
        let fileType = title.substr(lastDot + 1);
        for (const [key, value] of Object.entries(this.dataType)) {
          if (value.includes(fileType)) {
            this.type = key.toString().replace('_','-');
            return;
          }
        }
      }

      this.type = 'question-square'
    }
  },
  data() {
    return {
      validTitle: '',
      type: 'text',
      dataType: {
        file_text: ['txt', 'pdf', 'word'],
        file_image: ['png', 'jpeg', 'jpg', 'svg', 'psd'],
        file_music: ['mp3', 'waw'],
        camera_video: ['mp4', 'avi'],
        file_code: ['js', 'cpp', 'py', 'css', 'html', 'json', 'bat', 'cmd'],
        file_zip: ['zip','rar']
      }
    }
  },
  beforeMount() {
    this.getType();
    this.setFileSpinnerState(false);
  }
}
</script>

<style scoped>
.file {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  height: 130px;
  width: 200px;
  margin: 10px;
  border-top:none;
  border-left:solid #0067FFFF 1px;
  border-right:solid #0067FFFF 1px;
  border-bottom:solid #0067FFFF 1px;
  border-radius: 10px 10px 10px 10px;
  padding: 0;
}

.header {
  background: #8ec4e0;
  margin-left: 0;
  margin-right: 0;
  width: 200px;
  height: 30px;
  border-radius: 5px 10px 0 50px;
  padding: 0 20px 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.title {
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 20px 0 20px;
}
.title:hover{
  cursor: pointer;
}

.download-btn {
  width: 170px;
  margin: 10px 10px 0 10px;
}

.image-type:hover {
  cursor: pointer;
  animation: 4s linear 0s infinite move_eye;
}

@keyframes move_eye {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>