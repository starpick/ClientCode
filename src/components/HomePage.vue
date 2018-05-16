<template>
  <div id="home-container">
    <header>
      
       <ul>
            <li>
                <img id="logo-img" src="/static/logo.png"></img>
           </li>
           <li>
               <div>
            <img  id="search-icon" src="/static/search.png"></img>               
                   
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
      <div class="feed-container" v-for="(feed, index) in feeds">
        <div class="info-container">
          <div class="avatar"></div>
            <div class="username">{{feed.Username}}</div>
          </div>
          <div class="img-container">
              <img :src="feed.PicturePath"></img>
              <a class="tag" v-for="t in feed.PickEntries" 
              :style="{top: t.TagPos.top + '%', left: t.TagPos.left + '%'}"
              @click="onClickTag(t)"
                > <span >{{t.Brand}} </span></a>
            <div class="icon-container">
              <ul>
                <li class="left-li  " @click="onPick(feed.UploadEntryID)"> 
                  <span  :class="{pick:true, ispick:isPicked(feed.UploadEntryID)}">  </span> 
                  </li>
                <li class="left-li  " @click="onDiss(feed.UploadEntryID)">  
                  <span   :class="{diss:true, isdiss:isDissed(feed.UploadEntryID)}"> </span> 
                  </li> 
                <li class="empty-li">  </li> 
                <li class="right-li">{{feed.isBookmark}} </li> 
                </ul>
              </div>
          </div>
          <div class="social-container">
            <div class="description-container">
              <span class="description-user">{{feed.Username}}</span>{{feed.Description}}
              <span v-for="tag in feed.Tags" class="tag-span">#{{tag}}</span>
            </div>
            <div class="social-counter">
              <div>
                <span class="pick-icon"> <span style="visibility: hidden;"> ___</span></span>
              <span class="cnt">{{feed.Pick}}</span>
              </div>
              <div>
                <span class="comment-icon"> <span style="visibility: hidden;">___</span> </span>
                  <span class="cnt">{{feed.Comments.length}}</span>
              </div>
              </div>
                <div class="comments-container">
                    <ul>
                        <li v-for="cmt in feed.Comments" class="cmts">
                       <span>{{cmt.User}}</span> {{cmt.Content}} 
                       <span class="timestamp">{{cmt.TimeStamp}}</span>
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
      feeds: [
        {
          UploadEntryID: "1",
          Username: "ilovewendy",
          PicturePath: "/static/photo_1.png",
          PickEntries: [
            {
              PickEntryID:"wendy01",
              Brand: "Monts",
              IdolName: "Wendy",
              Price: "₩78,000",
              OfficialLink: "",
              EntryName: "dot blouse",
              Size: "",
              Category: "上衣",
              TagPos: {
                top: 30,
                left: 40
              }
            },
            {
              PickEntryID:"wendy02",
              Brand: "Maje",
              IdolName: "Wendy",
              Price: "$225",
              OfficialLink: "",
              EntryName: "embroidered skirt",
              Size: "",
              Category: "下装",
              TagPos: {
                top: 60,
                left: 40
              }
            }
          ],
          Pick: 43103,
          Description: "Wendy's look is gooooooooood",
          Tags: ["Wendy", "Monts", "Maje"],
          Comments: [
            {
              User: "redvelvetfoever",
              Content: "she's beautiful!!!",
              TimeStamp: "2018-05-14"
            },
            {
              User: "cutewendy",
              Content: "日常画报Wendy",
              TimeStamp: "2018-05-11"
            }
          ],
          isBookmark: true
        },
        {
          UploadEntryID: "0",
          Username: "StarPick CEO",
          PicturePath: "/static/ceo.png",
          PickEntries: [
            {
              PickEntryID:"starpick01",
              Brand: "Original",
              IdolName: "StarPick CEO",
              Price: "$199",
              OfficialLink: "",
              EntryName: "T-shirt",
              Size: "",
              Category: "上衣",
              TagPos: {
                top: 30,
                left: 40
              }
            }
          ],
          Pick: 103,
          Description: "StarPick: Let's pick your star!",
          Tags: ["CEO", "Original", "T-shirt"],
          Comments: [
            {
              User: "水军1",
              Content: "CEO你真棒！",
              TimeStamp: "2018-05-14"
            },
            {
              User: "水军2",
              Content: "永远支持starpick！",
              TimeStamp: "2018-05-14"
            }
          ],
          isBookmark: true
        }
      ],
      UserInfo: {
        UserPick: [],
        UserDiss: []
      }
    };
  },
  methods: {
    onClickTag(pickentry){
      this.$router.push({ path: "/pickentry/:pickentry", 
      params:{pickentryid: pickentry.PickEntryID}});
    },
    onUploadClick() {
      this.$router.push({ path: "/upload" });
    },
    onPick(id) {
      // console.log(id)
      var inpick = this.UserInfo.UserDiss.indexOf(id);
      if (inpick != -1) {
        this.UserInfo.UserDiss.splice(inpick, 1);
      }
      if (this.UserInfo.UserPick.indexOf(id) == -1) {
        this.UserInfo.UserPick.push(id);
      }
    },
    onDiss(id) {
      var inpick = this.UserInfo.UserPick.indexOf(id);
      if (inpick != -1) {
        this.UserInfo.UserPick.splice(inpick, 1);
      }
      if (this.UserInfo.UserDiss.indexOf(id) == -1) {
        this.UserInfo.UserDiss.push(id);
      }
    },
    isPicked(id) {
      return this.UserInfo.UserPick.indexOf(id) != -1;
    },
    isDissed(id) {
      return this.UserInfo.UserDiss.indexOf(id) != -1;
    }
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
}
header {
  background-color: darkturquoise;
}
.icon-container ul,
.social-counter,
.info-container,
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
header li {
  display: flex;
  width: 100%;
}
header li div {
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
  width: 100%;
}
#search-icon img {
  height: 30%;
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
.info-container div {
  display: inline;
}
.info-container {
  text-align: left;
  padding-top: 20px;
  padding-bottom: 20px;
}
.avatar {
  width: 0px;
  height: 0px;
  padding: 10px 18px;
  border-radius: 50px;
  background-color: lightcyan;
}
.username {
  padding: 5px;
  margin-left: 8px;
}
.description-container {
  padding: 10px 20px;
  text-align: left;
}
.description-user {
  font-weight: bold;
  margin-right: 8px;
}
.tag-span {
  margin-left: 3px;
}
.tag-span:hover {
  text-decoration: underline;
}
.icon-container ul {
  margin: 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.pick {
  border: 1px solid lightgrey;
  background-color: white;
  padding: 0px 8px;
  border-radius: 10px;
}
.ispick {
  border: none;
  background-color: rgb(255, 0, 128);
}
.diss {
  background-color: lightgrey;
  border-radius: 10px;
  padding: 0px 8px;
}
.isdiss {
  border: none;
  background-color: grey;
}
.icon-container ul li {
  padding: 4px;
}
.empty-li {
  flex: 4;
}
.left-li {
  flex: 1;
}
.social-counter {
  text-align: left;
}
.social-counter div {
  display: inline;
  margin-left: 0;
}
.comments-container ul {
  padding-left:8%;
  text-align: left;
  font-size: 12px;
}
.comments-container ul span {
  font-weight: bold;
}
.comments-container li {
  display: block;
}
.img-container {
  overflow: hidden;
  position: relative;
}
.img-container img {
  height: 100%;
  max-height: 400px;
}
.cnt {
  /* padding: 5px; */
  width: 20px;
  height: 20px;
}
.pick-icon {
  width:20px;
  background-image: url(/static/pick.png);
  background-size: 28px 28px;
  background-repeat: no-repeat;
  background-position: -3px -5px;
}
.comment-icon {
  width:20px;
  background-image: url(/static/comment.png);
  background-size: 20px 20px;
  background-repeat: no-repeat;
} 

.tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: lightcyan;
  opacity: 0.7;
  padding: 5px;
  border-radius: 10px;
  border-top-right-radius: 0px;
}
.tag span {
  opacity: 1;
  font-size: 10px;
}
.social-counter div{
  margin-left: 10px;
}
.timestamp{
  color:lightgray;
  margin-left:10px;
  font-style: italic;
}
</style>
