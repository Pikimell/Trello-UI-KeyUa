<template>
  <div v-if="this.spinnerState" class="spinner-border text-secondary">
    <span class="sr-only">Loading...</span>
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

</style>