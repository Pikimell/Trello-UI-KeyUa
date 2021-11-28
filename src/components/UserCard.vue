<template>
  <span>
    <b-avatar class="m-1" src="https://placekitten.com/300/300" variant="primary" text="BV" size="6rem"></b-avatar>
    <h3 >{{msg}}</h3>
  </span>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    msg: String
  }
}
</script>


<style>

</style>