<template>
  <div id="main-container">
    <div id="img-container">
      <img src="/static/logo.png"> </img>
    </div>
    <h1>{{ msg }}</h1>
<!-- v-show = "isShowRegisterForm || isShowLoginForm" -->
      <div  class="cover">       </div>
      <div v-show = "isShowRegisterForm" id="registerFormContainer" class="pop-form">
        <div id ="form-head">注册表单</div>
        <div class="form-body" id="register-form"   > 
          <div> 
              <label>用户名  </label>
              <input type="text"   v-model="user"> </input>
          </div>
          <div>
              <label>密码  </label> 
              <input type="password"   v-model="password"> </input>
          </div>
          <button v-on:click="onSubmitRegister" id="submit-register-btn" > 提交 </button>
        </div> 
        <div v-if="isRegisterFail" class="fail-hint"> 注册失败！ </div>
      </div>

      <div v-show = "isShowLoginForm" id="login-form-container" class="pop-form">
        <div id ="login-form-head" >登录</div>
        <form class="form-body" id="login-form"> 
          <div> 
              <label>用户名  </label>
              <input type="text"   v-model="user"> </input>
          </div>
          <div>
              <label>密码  </label> 
              <input type="password"   v-model="password"> </input>
          </div>
          <button id="submit-login-btn" v-on:click="onLogin"> 登录 </button>
        </form> 
        <div v-if="isLoginFail" class="fail-hint"> 登录失败！ </div>
      </div>

    <div id="login-button-container">
      <div>
      <button id="register-btn" v-on:click="onRegister"> 注册 </button>
        
      </div>
      <div>
      <button id="login-btn" v-on:click="onLoginClick"> 登录 </button>


      </div>
      
     
     </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "LoginPage",
  data() {
    return {
      msg: "StarPick",
      isShowRegisterForm: false,
      isShowLoginForm: false,
      isRegisterFail: false,
      isLoginFail: false,
      user: "",
      password: "123",
      registerAPI: "http://localhost:8000/starpick/register",
      loginAPI: "http://localhost:8000/starpick/login"
    };
  },
  methods: {
    onRegister(event) {
      this.isShowRegisterForm = true;
      var self = this;
      $(".cover").attr("class", "cover-show");
      document.onmouseup = function(e) {
        var _con = $("#registerFormContainer"); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
          // Mark 1
          self.isShowRegisterForm = false;
          $(".cover-show").attr("class", "cover");        
          self.user = "";

        }
      };
      // console.log($('#cover').text());
    },
    onLoginClick(event) {
      this.isShowLoginForm = true;
      var self = this;
      $(".cover").attr("class", "cover-show");
      document.onmouseup = function(e) {
        var _con = $("#login-form-container"); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
          // Mark 1
          self.isShowLoginForm = false;
          $(".cover-show").attr("class", "cover");        
          self.user = "";

        }
      };
      // let res =   makeLoginRequest();
      // var success = false;
      // if (success) {
      //   this.$router.push("HomePage");
      // } else {
      // }
    },
    onLogin() {
     
    },
    onSubmitRegister() {
      const self = this;
      var regform = new FormData();
      regform.append("user", this.user);
      regform.append("password", this.password);
      console.log("on submit");
      // req.open("POST",);
      // req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      $.ajax({
        type: "POST",
        url: this.registerAPI,
        data: regform,
        contentType: false,
        processData: false,
        cache: false,
        success: res => {
          console.log("> Register Req Success:", res);
          if (res != "register") {
            self.isRegisterFail = true;
            return ;
          }
          self.$router.push({path:'/home'})
          
        },
        error: err => {
          console.log("> Register Req Error:", err);
        }
      });
      return false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#main-container {
  margin: 0;
  padding-top: 15%;
  width: 100%;
  height: 100%;
}
#login-button-container {
  display: flex;
  /* border:1px solid #ddd; */
  flex-flow: column wrap;
  width: 100%;
}
#login-button-container div {
  /* border:1px solid #aaa; */
  width: 100%;
  margin: 5px;
}
button {
  width: 38%;
  text-align: justify;
  text-justify: inter-word;
  border: none;
  /* letter-spacing: 10px; */
  text-align: center;
  border-radius: 8px;
  padding: 15px;
  margin: 5px;
  color: white;
  background: dodgerblue;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 0 #9cb8d8, 0 3px 20px rgba(0, 0, 0, 0.3);
}
button:active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset;
}
#login-btn {
  flex: 1;
  background-color: cornflowerblue;
}
#register-btn {
  flex: 1;
  background-color: rgb(16, 196, 196);
  margin-bottom: 2%;
}
.pop-form {
  opacity: 0.9;
  border-radius: 20px;
  font-size: 16px;
  position: absolute;
  left: 50%;
  top: 35%;
  margin-top: 0px;
  width: 250px;
  padding: 25px;
  margin-left: -155px;
  background: #fff;
  height: auto;
  text-align: center;
  z-index: 11;
}
.pop-form div {
  padding: 5px;
}

.form-body {
  margin: 10px;
}
.form-body div {
  width: auto;
  display: flex;
  flex-flow: row wrap;
  margin: 5px;
}
.form-body label {
  flex: 2;
}
.form-body input {
  flex: 1;
  max-width: 70%;
  margin-top: 2px;
}
#submit-btn {
  background: rgb(16, 196, 196);
  margin-top: 15px;
  margin-bottom: -40px;
}
.cover {
  margin: auto;
  transition: all 0.2s ease;
  background: #000;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  /*  height: 100%;*/
  z-index: 10;
}
.cover-show {
  /*  padding:8px;*/
  transition: all 0.2s ease;
  background: #000;
  opacity: 0.5;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
}
#login-form-head,
#form-head {
  font-size: 20px;
  color: white;
  padding: 10px;
  width: auto;
  margin: auto;
}
#login-form-head,
#login-form-container button {
  background-color: cornflowerblue;
}
#form-head,
#submit-register-btn {
  background-color: rgb(16, 196, 196);
}
#img-container img {
  width: 70%;
  margin: auto;
  border: 1px lightgray dashed;
}
.fail-hint {
  text-align: center;
  color: brown;
  font-size: 14px;
  letter-spacing: 5px;
  margin-bottom: -10px;
}
</style>
