<template>
  <div id="Setting-container">
    <header>
      <div id='return'>
        <img src="/static/return_2.png" @click="returnme($store.state.id)" style="width: 30px;"></img>
      </div>
      <div id='settings'>Settings</div>
    </header>
    <div id='body'>
      <div id='account'> 
        <div id='item1'> Account </div>
        <div id='item1'> Account Security </div>
      </div>

      <div id='setting'> 
        <div id='item1'> Privacy</div>
        <div id='item1'> Help </div>
        <div id='item1'> About StarPick</div>
      </div>

      <div id='out' @click="onLogOut()"> Log out </div>
     
    </div>
  </div>
</template>


<script>
import $ from "jquery";
export default {
  name: "HomePage",
  data() {
    return {
      
    }
  },
  methods: {
    onLogOut() {
      this.$store.commit("userLogout");
      this.$router.push({ path: "/" });
    },

    returnme(id) {
      this.$router.back(-1);
    },

  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#home-container {
  width: 100%;
  height: 100%;
  font-family: arial;
}
#item1{
  vertical-align: bottom;
  background-color: white;
    margin-bottom: 1px;
    margin-top: 1px;
    padding: 5px;
    font-size: 25px;
    text-align: left;
}


#setting{
    margin-bottom: 30px;
    margin-top: 30px;

}

#account{
    margin-bottom: 30px;
    margin-top: 30px;

}

#out{
    background-color: white;
    padding: 5px;
    font-size: 23px;
    text-align: center;
    color: red;
    font-weight: bolder;
    position: relative;
    top: 50px;

}
header {
  background-color: #F4F4F4;
  /* to control the same padding-left. */
  padding: 2%;
}
#body {
  display: block;
  background-color: #EAEAEA;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
}
#settings {
  font-style:normal;
  font-size:150%;
  font-weight: 800;
}
#return {
  position:absolute;
  top:6px;
  left:5px;
}


</style>
