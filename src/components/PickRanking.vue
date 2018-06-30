<template>
  <div id="home-container">
    <header>
      <div id='return'>
        <router-link to="/home"><img src="/static/return.png"></img></router-link>
      </div>
      <div id='rankingtitle'>PICK RANKING</div>
    </header>
    <section id="ranking"> 
      <span id="ranking_title">TOP10</span>
      <section id="ranking_list">
        <li v-for="(entry, index) in entries">
          <section class="box">
            <section class="col_1" :title="index">{{index+1}}</section>
            <ul class="col_2"> 
              <li>
              <img class="avatar-img" :src="entry.picture"></img>  

              </li>
              <!-- <li style="flex:3;" >
                <span v-for="t in entry.hashTags" > {{t}}  </span>
              </li> -->
              <li>
                <a> {{entry.Username}}  </a>

              </li>
              <li style="flex:5;">
                  {{entry.description}}  

              </li>
              <li>
                <span class="likenumber-label"> Picks: </span> {{ entry.likenumber}}</a> 

              </li>
            </ul>
          </section>
        </li>
      </section>
    </section>
  </div>
</template>


<script>
import $ from "jquery";
export default {
  data() {
    return {
      entriesAPI:"http://127.0.0.1:8000/starpick/get_entry_by_likeN",
      entryAPI:"http://127.0.0.1:8000/starpick/get_entry",
//       {
//     "success": true,
//     "entries": [
//         {
//             "entryId": 9,
//             "picture": "http://127.0.0.1:8000/admin/starpick/entry/",
//             "description": "da1hkd@1.cosm",
//             "likenumber": 2,
//             "dissnumber": 1,
//             "hashTags": [],
//             "userId": 10
//         }
//     ]
// }
      entries: [
        
      ]
    }
  },
  async mounted() {
    const self = this;
    await this.$http.get(this.entriesAPI, {
      params:{
        numLimit: 10
      }
    }).then(
      (res) => {
        self.entries = res.data.entries;

        for (var i = 0; i < res.data.entries.length; i++ ) {
          var e = res.data.entries[i];
           this.$http.get(
            this.entryAPI, {
              params: {
                entryId: e.entryId
              }
            }
          ).then(

            (function(i){
              return (res) => {
                // console.log("> RANK: entry = ", res.data.entry);
                self.entries[i].description = res.data.entry.description;
                };
            })(i)
          );
        }
      }
    );


  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
  width: 100%;
  height: 100%;
}
div,
li {
  /* border: 1px dashed lightgray; */
  vertical-align: bottom;
}
header {
  background-color: darkturquoise;
  /* to control the same padding-left. */
  padding-left: 2%;
  padding-right: 1%;
}
input:focus {
  outline: none;
}
#rankingtitle {
  font-style:italic;
  font-size:200%;
  font-weight: 800;
}
#return {
  position:absolute;
  top:6px;
  left:5px;
}

header ul {
  display: flex;
  /*     justify-content:space-between;    */
  margin: auto;
  width: 100%;
  padding: 5px 0px;
  vertical-align: bottom;
}
header li {
  display: flex;
  width: 100%;
}
header li div {
  margin: auto;
}

header li {
  flex: 1;
}
li {
  display: inline;
  list-style: none;
}
#ranking {
  display: block;
  width: 80%;
  height: 80%;
  position: absolute;
  left: 5%;
  top: 10%;
  border: 2px #f9820d solid;
  background-color: #fff;
  border-radius: 20px;
  padding: 15px 15px;
}
#ranking_list {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y:auto;
}
#ranking_list::-webkit-scrollbar-track {
 -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
 background-color: #F5F5F5;
 border-radius: 10px;
}
 #ranking_list::-webkit-scrollbar {
 width: 5px;
 background-color: #F5F5F5;
}
 #ranking_list::-webkit-scrollbar-thumb {
 border-radius: 10px;
 background-image: -webkit-gradient(linear,  left bottom,  left top,  color-stop(0.44, rgb(122,153,217)),  color-stop(0.72, rgb(73,125,189)),  color-stop(0.86, rgb(28,58,148)));
}
#ranking_title{
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
  position: absolute;
  width: 50%;
  left: 25%;
  top: -20px;
  background-color: #f9820d;
  z-index: 1;
}
.box {
  width: 100%;
  background-color: #00ced1;
  height: 50px;
  line-height: 50px;
  display: -webkit-box;
  display: -moz-box;
  display: box;
  border-radius: 10px;
  margin:15px auto 5px;
  color: #ffffff;
}

.col_1 {
  width: 50px;
  text-align: center;
  font-size:20px;
  color: #ffffff;;
  background-repeat:no-repeat; 
  background-position:center center; 
  background-size:40px 40px;
}
.col_2 {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  padding: 5px 5px;
  text-align:center;
  margin:0;
  display: flex;
}
.col_1[title="0"]{ 
  color:#fff; 
  background-image:url(/static/r1.png); 
  line-height:43px;
}
.col_1[title="1"]{ 
  color:#fff; 
  background-image:url(/static/r2.png); 
  line-height:43px;
}
.col_1[title="2"]{ 
  color:#fff; 
  background-image:url(/static/r3.png); 
  line-height:43px;
}
.avatar {
  position: absolute;
  top:0px;
  left:0px;
}
.avatar-img {
  /* position: absolute; */
  overflow: hidden;
  max-width:50px;
  margin:auto;
  /* max-height:30px; */
}
ul{
  display: flex;
  height: 100%;

}
ul li{
  margin:auto;

  flex:1;
} 
.likenumber-label{
  color: lightcyan;
  font-weight: bold;

}
</style>
