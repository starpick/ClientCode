<template>
  <div id="home-container">
    <header>
      
       <ul>
            <li id="logo-img-container"> 
                  <img id="logo-img" src="/static/logo.png"></img> 
           </li>
           <li> 
                  <img id="search-icon" src="/static/search.png"></img>               
                    
           </li>
             <li id="search-bar">
                <input > </input>
            </li>
            <li><div style="margin:auto;"><button id="upload-button" v-on:click="onUploadClick"> + </button></div> </li>
            <li><div>{{$store.state.username}}</div> </li>
            <li> <img id="logout-icon" @click="onLogOut()" src="/static/exit.png"></img>   </li>

        </ul>
      </header>
      <div class="feed-container" v-for="(feed, index) in feeds">
        <div class="info-container">
          <div class="avatar"></div>
            <div class="username">{{feed.Username}}</div>
          </div>
          <div class="img-container">
            <!-- tag here -->
              <img :src="feed.PicturePath"></img>
              <a class="tag" v-for="t in feed.PickEntries" 
              :style="{top: t.TagY + 'px', left: t.TagX + 'px'}"
              @click="onClickTag(t)"
                > <span >{{t.Content}} </span></a>
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
                        <li v-for="(cmt, index) in feed.Comments" v-if="index<3" class="cmts">
                       <span>{{cmt.username}}</span> {{cmt.content}} 
                       <!-- <span class="timestamp">{{cmt.TimeStamp}}</span> -->
                        </li>
                         <li v-for="(cmt, index) in feed.SelfComments" class="cmts">
                       <span>{{cmt.User}}</span> {{cmt.Content}} 
                        </li>
                        <span v-if="feed.Comments.length >= 3"> more ... </span>

                        <li class="user-send-comment"> 
                          <input placeholder="发表评论！" v-model="comments[index]"
                          @keyup.enter="addComment(feed.UploadEntryID, index)"> </input> </li>

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
      getEntryAPI: "http://127.0.0.1:8000/starpick/get_entry",
      getTagsAPI: "http://127.0.0.1:8000/starpick/get_tags",
      getPickAPI: "http://127.0.0.1:8000/starpick/get_pick",
      getCommentsAPI: "http://127.0.0.1:8000/starpick/comment/getComments",
      getLikesAPI: "http://127.0.0.1:8000/starpick/get_likes",
      addLikeAPI: "http://127.0.0.1:8000/starpick/like",
      addUnlikeAPI: "http://127.0.0.1:8000/starpick/unlike",
      addCommentAPI: "http://127.0.0.1:8000/starpick/comment/makecomment",
      config: {
        headers: {
          "Content-Type": "multipart/form-data" //之前说的以表单传数据的格式来传递fromdata
        }
      },
      comments: [],
      feeds: [],
      fakeFeed: [
        {
          UploadEntryID: "1",
          Username: "ilovewendy",
          PicturePath: "/static/photo_1.png",
          PickEntries: [
            {
              PickEntryID: "wendy01",
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
              PickEntryID: "wendy02",
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
              PickEntryID: "starpick01",
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
      },
      emptyFeed: {
        UploadEntryID: "",
        Username: "",
        PicturePath: "",
        PickEntries: [],
        Pick: -1,
        Description: "",
        Tags: [],
        Comments: [],
        isBookmark: false,
        SelfComments:[]

      }
    };
  },
  methods: {
    onClickTag(pickentry) {
      console.log(pickentry);
      this.$router.push({
        path: "/pickentry/",
        query: {
          PickEntryID: pickentry.pickId
        }
      });
    },
    onUploadClick() {
      this.$store.state.uploadedImageSrc = null;
      this.$router.push({ path: "/upload" });
    },
    onLogOut() {
      this.$store.commit("userLogout");
      this.$router.push({ path: "/" });
    },
    onPick(id) {
      // console.log(id)
      var inpick = this.UserInfo.UserDiss.indexOf(id);
      this.$http.get(this.addLikeAPI, {
        params: {
          token: this.$store.state.token,
          entryId: id
        }
      });
      if (inpick != -1) {
        this.UserInfo.UserDiss.splice(inpick, 1);
      }
      if (this.UserInfo.UserPick.indexOf(id) == -1) {
        this.UserInfo.UserPick.push(id);
      }
    },
    onDiss(id) {
      var inpick = this.UserInfo.UserPick.indexOf(id);
      this.$http.get(this.addUnlikeAPI, {
        params: {
          token: this.$store.state.token,
          entryId: id
        }
      });
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
    },
    addComment(pickentryid, i) {
      var dt = new Date();
      var newcontent = this.comments[i];

      // post to server
      var form = new FormData();
      form.append("token", this.$store.state.token);
      form.append("entryId", pickentryid);
      form.append("content", newcontent);
      this.$http
        .post(this.addCommentAPI, form, this.config)
        .then(res => {
          if (res.data.success) { 
          } else {
            alert("(。・＿・。)ﾉI’m sorry~发送评论失败！");
          }
        })
        .catch(err => {
          console.log("> HOMEPAGE: Fail send comments\n", err)
        });

      // update view immediately
      this.feeds[i].SelfComments.push({
        User: "current user",
        Content: newcontent,
        TimeStamp: dt.getYear() + "-" + dt.getMonth() + dt.getDay()
      });
      this.comments[i] = "";
    }
  },
  beforeMount() {
    if (localStorage.username !== undefined) {
          this.$store.commit("userLogin", {
            token: localStorage.token,
            id: localStorage.id,
            email: localStorage.email,
            username: localStorage.username
          });
          // this.$router.push({ path: "/home" });
    }
  },
  async mounted() {
    const debug = !false;
    console.log(this.$store.state);
    for (var i = 0; i < this.feeds.length; i++) {
      this.comments.push("");
    }

    var entries = ["19", "18","17", "14", "15"];
    const self = this;

    for (var i = 0; i < entries.length; i++) {
      var feedEntry = JSON.parse(JSON.stringify(self.emptyFeed));

      var curptr = (function(t) {
        return function() {
          return t;
        };
      })(i);

      await this.$http
        .get(this.getEntryAPI, {
          params: {
            entryId: entries[i]
          }
        })
        .then(res => {
          if (debug) console.log("> HOMEPAGE: Get Upload Entry: ", res.data);
          if (res.data.success && res.data.entry != null) {
            feedEntry.Description = res.data.entry.description;
            feedEntry.PicturePath = res.data.entry.picture;
            feedEntry.UploadEntryID = res.data.entry.entryId;
            feedEntry.Pick = res.data.entry.likenumber;
            // get tags
            if (debug) console.log("> HOMEPAGE : GETTING TAGS OF ", curptr());
            return self.$http.get(self.getTagsAPI, {
              params: {
                entryId: entries[curptr()]
              }
            });
          }
        })
        .catch(err => {
          if (debug) console.log("> HOMEPAGE: Get Upload Entry", " ERROR : \n", err);
        })
        .then(res => {
          feedEntry.PickEntries = res.data.tags;
          if (debug) console.log("> HOMEPAGE: Get Tags: ", res.data);

          return self.$http.get(self.getCommentsAPI, {
            params: {
              entryId: entries[curptr()]
            }
          });
        })
        .catch(err => {
          if (debug) console.log(
            "> HOMEPAGE: Get Tags of entry #[",
            curptr(),
            "] ERROR : \n",
            err
          );
        })
        .then(res => {
          if (debug) console.log(
            "> HOMEPAGE: Get Comments of entry #[",
            curptr(),
            "]\n",
            res.data
          );
          feedEntry.Comments = res.data.comments;
          self.feeds.push(feedEntry);
          if (debug) console.log("> HOMEPAGE: Add feed: ", feedEntry);
        })
        .catch(err => {
          if (debug) console.log(
            "> HOMEPAGE: Get Picks of entry #[",
            curptr(),
            "] ERROR : \n",
            err
          );
        });
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
input:focus {
  outline: none;
}
.icon-container ul,
.social-counter,
.info-container,
header {
  /* to control the same padding-left. */
  padding-left: 2%;
  padding-right: 1%;
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
#search-bar {
  flex: 2;
  display: flex;
  text-align: center;
  margin-left: -8px;
  /* padding:0 5%; */
}
#search-icon {
  /* flex: 0.5; */
  max-height: 50px;
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
  padding-left: 8%;
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
  width: 20px;
  background-image: url(/static/pick.png);
  background-size: 28px 28px;
  background-repeat: no-repeat;
  background-position: -3px -5px;
}
.comment-icon {
  width: 20px;
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
.social-counter div {
  margin-left: 10px;
}
.timestamp {
  color: lightgray;
  margin-left: 10px;
  font-style: italic;
}
#upload-button {
  position: relative;
  vertical-align: middle;
  background: lightcyan;
  color: darkcyan;
  border: none;
  cursor: pointer;
  border-radius: 100px;
  padding: 12% 30%;
  overflow: hidden;
  font-size: 22px;
}

#upload-button:after {
  /* 点击后的状态 */
  content: "";
  background: rgb(1, 252, 239);
  display: block;
  position: absolute;
  padding: 100px;
  /* padding：调大小的 */
  margin: -18px -10px;
  /* margin: 调位置的 */
  width: 3px;
  opacity: 0;

  transition: all 0.8s;
}

#upload-button:active:after {
  /* 点击时的状态 */
  padding: 0;
  margin: 0;
  opacity: 1;
  width: 50px;
  transition: 0s;
}

#logo-img {
  flex: 1;
  height: 80%;
  width: 100%;
  max-width: 80%;
  border-radius: 100px;
}
#logo-img-container {
  /* overflow: hidden; */
  height: 80%;
  margin: auto;
}
#logout-icon {
  height: 40px;
  margin: auto;
}
</style>
