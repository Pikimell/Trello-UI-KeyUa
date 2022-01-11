<template>
  <div id="spinner-block">
    <div v-if="this.spinnerState" class="spinner-border text-secondary">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MySpinner",
  computed: {
    ...mapGetters([
      'spinnerState'
    ])
  }
}
</script>

<style scoped>
#spinner-block{
  position: absolute;
  margin:auto;
  left: 0;
  right: 0;
  top: 400px;

  text-align: center;
}
</style>