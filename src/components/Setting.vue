<template>
  <div id="Setting-container">
    <header>
      <div id='return'>
        <router-link to="/me"><img src="/static/return.png"></img></router-link>
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
      getEntryAPI: "http://127.0.0.1:8000/starpick/get_entry",
      getTagsAPI: "http://127.0.0.1:8000/starpick/get_tags",
      getPickAPI: "http://127.0.0.1:8000/starpick/get_pick",
      getCommentsAPI: "http://127.0.0.1:8000/starpick/comment/getComments",
      getLikesAPI: "http://127.0.0.1:8000/starpick/get_likes",
      addLikeAPI: "http://127.0.0.1:8000/starpick/like",
      addUnlikeAPI: "http://127.0.0.1:8000/starpick/unlike",
      addCommentAPI: "http://127.0.0.1:8000/starpick/comment/makecomment",
      queryPickAPI:"http://127.0.0.1:8000/starpick/query_like",
      config: {
        headers: {
          "Content-Type": "multipart/form-data" //之前说的以表单传数据的格式来传递fromdata
        }
      },
    }
  },
  methods: {
    onLogOut() {
      this.$store.commit("userLogout");
      this.$router.push({ path: "/" });
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
