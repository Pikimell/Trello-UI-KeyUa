<template>
  <span>
    <b-avatar v-if="this.authorized" class="m-1" src="https://source.unsplash.com/300x300/?random=1&user,avatar,body" variant="primary" text="BV"></b-avatar>
  </span>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    msg: String,
    authorized: Boolean
  }
}
</script>


<style>

</style>