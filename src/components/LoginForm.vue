<template>
    <div id="auth--body">
      <span class="txt" id="auth--header">Sign In With</span>

      <div class="input-title">
        <span class="txt">Username</span>
      </div>
      <div class="input-bar">
        <input class="input" type="text" name="username" tabindex="1">
        <span></span>
      </div>

      <div class="input-title">
				<span class="txt">Password</span>
        <a href="#" class="txt2" id="forgot-pass" tabindex="5">Forgot?</a>
      </div>
      <div class="input-bar">
        <input class="input" type="password" name="pass" tabindex="2">
        <span></span>
      </div>

      <div id="container--button">
        <button class="form-btn" tabindex="3" @click="signIn">Sign In</button>
      </div>

      <div class="form-footer">
				<span class="txt2">Not a member?</span>
        <a class="txt2" id="form-sign" tabindex="4">Sign up now</a>
      </div>
    </div>
</template>

<script>
export default {
  name: "LoginForm",
  data(){
    return {

    }
  },
  methods: {
    signIn(){

    }
  }
}
</script>

<style scoped>
.txt{
  color:#555555;
  font-family: Roboto, ROBO,Serif,sens-serif,serif;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 400;
}
.txt2{
  font-family: Poppins-Regular,serif;
  font-size: 18px;
  color: #999999;
  line-height: 1.5;
}
.input{
  font-family: Poppins-Regular,serif;
  color: #333333;
  line-height: 1.2;
  font-size: 23px;
  display: block;
  width: 100%;
  background: transparent;
  height: 60px;
  padding: 0 20px;
  outline: none;
  border: none;
}
.input-bar{
  background: #f7f7f7;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
}
.input-title{
  padding-bottom: 9px;
  padding-top: 31px;
  display: flex;
  align-items: flex-start;
}
.form-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  background-color: #333333;
  border-radius: 10px;
  font-size: 18px;
  color: #fff;
  line-height: 1.2;
  transition: all 0.4s;
  position: relative;
  z-index: 1;
}
.form-footer{
  padding-top: 55px;
  text-align: center!important;
  color: #212529;
}

#container--button{
  margin-top: 17px;
  display: flex;
  flex-wrap: wrap;
}

#auth--header{
  font-size: 39px;
  height: 70px;
}
#auth--body {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
}
#forgot-pass{
  margin-left: 5px;
  font-size: 18px;
  line-height: 1.7;
  color: #666666;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #999999;
}
#form-sign{
  margin-left: 10px;
  cursor: pointer;
}
</style>