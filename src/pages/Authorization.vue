<template>
<div id="auth" >
  <div id="auth--card">
    <LoginForm/>
  </div>
</div>
</template>

<script>

import LoginForm from '../components/LoginForm'

export default {
  name: "Autorization",
  components:{
    LoginForm
  }
}
</script>

<style scoped>

#auth{
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(68,67,73,1) 0%, rgba(135,135,168,1) 46%, rgba(191,231,255,1) 100%);
}

#auth--card{
  background: rgb(250,250,250);
  border-radius: 10px;
  width: 680px;
  position: relative;
  padding: 62px 110px 33px 110px;
}

</style>