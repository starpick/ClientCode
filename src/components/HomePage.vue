<template>
  <div id="home-container">
    <header>
      
       <ul>
            <li>
                <img id="logo-img" src="../assets/logo.png"></img>
           </li>
           <li>
               <div>
            <img  id="search-icon" src="../assets/search.png"></img>               
                   
               </div>
           </li>
             <li id="search-bar">
                <input > </input>
            </li>
            <li><div><button v-on:click="onUploadClick"> + </button></div> </li>
            <li><div>icon2</div> </li>
            <li><div>icon3</div> </li>

        </ul>
      </header>
      <div id="feed-container" v-for="feed in feeds">
        <div id="info-container">
          <div id="avatar"></div>
            <div id="username">{{feed.username}}</div>
          </div>
          <div class="img-container">
              <img src="../assets/logo.png"></img>
            <div id="icon-container">
              <ul>
                <li class="left-li">heart </li>
                <li class="left-li">cmts </li> 
                <li class="empty-li">  </li> 
                <li class="right-li">bookmark </li> 
                </ul>
              </div>
          </div>
          <div id="social-container">
            <div id="social-counter">
              <div>pick:<span id="pick-cnt">{{feed.picks}}</span></div>
              <div>comments:
                  <span id="cmt-cnt">{{feed.comments.length}}</span>
              </div>
              </div>
                <div id="comments-container">
                    <ul>
                        <li v-for="cmt in feed.comments" class="cmts">
                       <span>{{cmt.user}}</span> {{cmt.text}}
                        </li>
                    </ul>
                </div>
          </div>
          
      </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "HomePage",
  data() {
    return {
        feeds: [{
            username: "StarPick CEO",
            picks:103,
            comments:[
                {
                    user:"水军1",
                    text:"系分作业"
                },{

                    user:"水军2",
                    text:"为什么这么麻烦"
                } 
            ],
            isBookmark: true
        }]
    };
  },
  methods: {
      onUploadClick(){
            this.$router.push({path:"/upload"});
                    
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home-container {
  width: 100%;
  height: 100%;
}
div,
li {
  border: 1px dashed lightgray;
}
#icon-container ul,
#social-counter,
#info-container,
header {
  /* to control the same padding-left. */
  padding-left: 2%;
}
header ul {
  display: flex;
  /*     justify-content:space-between;    */
  margin: auto;
  width: 100%;
  padding: 0px;
  vertical-align: bottom;
}
#logo-img {
  flex: 1;
  height: 100%;
  width: 100%;
  max-width: 50px;
}
header li{
  display: flex;
  width:100%;
    
}
header li div{
  margin: auto;
    
}
#search-bar {
  flex: 2;
  display: flex;
  text-align: center;
  /* padding:0 5%; */
}
#search-icon { 
  flex: 0.5; 
  margin: auto;
  width:100%;
}
#search-icon img {
  height:  30%;
  width: 30%;
}
#search-bar input {
  margin: auto;
  width: auto;
}
header li {
  flex: 1;
}
li {
  display: inline;
  list-style: none;
}
#info-container div {
  display: inline;
}
#info-container {
  text-align: left;
  padding-top: 20px;
  padding-bottom: 20px;
}
#avatar {
  width: 0px;
  height: 0px;
  padding: 10px 18px;
  border-radius: 50px;
  background-color: lightcyan;
}
#username {
  padding: 5px;
  margin-left: 8px;
}

#icon-container ul {
  margin: 0;
  display: flex;
  justify-content: space-between;
  text-align: left;
}
#icon-container ul li {
  padding-top: 4px;
  padding-bottom: 4px;
}
.empty-li {
  flex: 4;
}
.left-li {
  flex: 1;
}
#social-counter {
  text-align: left;
}
#social-counter div {
  display: inline;
  margin-left: 0;
}
#comments-container ul{
    text-align: left;
    font-size: 12px;
}
#comments-container ul span{
    font-weight: bold;
}
#comments-container li{
    display:block;
}
</style>
