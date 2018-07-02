<template>
    <div id="TagSearch">
        <header>  
            <ul>
                <li id="logo-img-container"> 
                    <img id="logo-img" src="/static/logo.png" @click="toHome()"></img> 
                </li>
                <li id="search-bar">
                    <input v-model="searchtag" placeholder="发现新的Pick..." ></input>
                    <img src='/static/search.png' @click="TagSearch($store.state.id)"  :value="searchtag"></img>
 
                </li>
                <li>
                    <div style="margin:auto;">
                        <i id="upload-button" v-on:click="onUploadClick" class="el-icon-plus icon"></i> 
                    </div>
                </li>
                <li>
                    <div id="username-label">{{$store.state.username }}</div> 
                </li>
                <li  @click="toMeInfo()" >
                    <img id="me-icon" src="/static/me.png"></img>
                </li>
                <li>
                    <img id="logout-icon" @click="onLogOut()" src="/static/exit.png"></img>
                </li>
            </ul>
        </header>
        <div id="body-contrainer">
          <el-row v-for="(entry, index) in entries" :key="entry.id">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="entry.picture" class="image">
                <div style="padding: 14px;">
                  <span style="font-weight: bold;" @click="onClickUserName( entry.user.id )">
                      {{entry.user.username}}
                 </span>
                  <span>{{entry.description}}</span>
                  <span v-for="tag in entry.hashTags" class="tag-span" @click="searchTag(tag)">#{{tag}}</span>
                  <div class="bottom clearfix">
                    <time class="time"> </time> 
                  </div>
                </div>
              </el-card>
          </el-row>
        </div>
    </div>
</template>



<script>
    import $ from "jquery";

    export default {
        name: "TagSearch",
        data() {
            return {
                searchtag: "",
                //getUserAPI:"http://127.0.0.1:8000/starpick/get_user",
                getEntrybyHashname:"http://127.0.0.1:8000/starpick/get_entrys_by_hash",
                entryAPI:"http://127.0.0.1:8000/starpick/get_entry",
                getPick:"27.0.0.1:8000/starpick/get_pick",
                entries: [
                ]

            }
        }, 
        
        watch: {
            $route(to, from) {
            
            // 对路由变化作出响应...
            }
        },
        mounted(){
          console.log("> tagsearch: ", this.$route.query.tag);
          this.updatePage(this.$route.query.tag);
          
        },
        computed:{
            
        },
        methods: {
            async updatePage(tag){
                this.searchtag = this.$route.query.tag;
                const self = this;
                    //   console.log(this.$route);

                await this.$http.get(this.getEntrybyHashname, { 
                    params: {
                    hashName:  tag
                    }
                }).then(
                    (res) => {
                    //console.log(self.entries)
                    self.entries = res.data.entries;
                    //console.log(self.entries)

                    for (var i = 0; i < res.data.entries.length; i++) {
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
                            console.log("> SEARCH: entry = ", res.data.entry);
                            //self.entries[i].username = res.data.entry.user.username;
                            self.entries[i].picture = res.data.entry.picture;
                            };
                        })(i)
                        );
                    }
                    }
                );
            },
            onClickUserName(id) {
                this.$router.push({
                    path: "/me/",
                    query: {
                        userId: id
                    }
                });
            },
            searchTag(tag){
                this.updatePage(tag);

            },
            onClickTag(pickentry) {
                // console.log(pickentry);
                this.$router.push({
                    path: "/pickentry/",
                    query: {
                    PickEntryID: pickentry.pickId
                    }
                });
            },
            toHome() {
                this.$router.push({ 
                  path: "/home",
                  query: {
                     userId: this.$store.state.id
                  } 
                });
            },
            Detail() {
              //console.log(pickentry);
              this.$router.push({ 
                  path: "/pickentry/",
                  query: {
                     PickEntryID: 22
                  } 
                });
            },
            onUploadClick() {
                this.$store.state.uploadedImageSrc = null;
                this.$router.push({ 
                  path: "/upload",
                  query: {
                     userId: this.$store.state.id
                  } 
                });
            },
            onLogOut() {
                this.$store.commit("userLogout");
                this.$router.push({ path: "/" });
            },
            toMeInfo() {     
                this.$router.push({
                    path: "/me/",
                    query: {
                     userId: this.$store.state.id
                    }
                });
            },
            TagSearch(id) {
              console.log(this.searchtag);
              this.$router.push({ 
                path: "/tagsearch" , 
                query: {
                  userId: id,
                  tagname: this.searchtag
                }
              });
            },

            onClickUserName(id) {
              this.$router.push({
                path: "/me/",
                query: {
                  userId: id
                }
              });

            },
        },

        async beforeMount() {
          if (localStorage.username !== undefined) {
            this.$store.commit("userLogin", {
              token: localStorage.token,
              id: localStorage.id,
              email: localStorage.email,
              username: localStorage.username
            });
          }
        }

    }

    

</script>

<style scoped>

#home-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
div,
li {
  /* border: 1px dashed lightgray; */
}
header {
  background-color: darkturquoise;
  /* position:fixed; */
  width: 100%;
  z-index: 100;
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
  /* height:50px; */
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
  padding: 4%;
  margin: auto;
  background: lightcyan;
  border-radius: 100px;
}

#search-bar input {
  margin: 10px;

  width: auto;
}
#me-icon {
  margin-top: 5px;
  width: 30px;
  height: 30px;
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
.username {
  padding: 5px;
  margin-left: 21px;
  font-weight: bold;
  color: darkcyan;
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
  font-style: italic;
  font-weight: bold;
}
.tag-span:hover {
  text-decoration: underline;
}
.icon-container ul {
  margin: 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding-top: 10px;
}
.judge {
  border: 1px solid lightgrey;
  padding: 2px 13px;
  border-radius: 100px;
}

.pick {
  background-color: white;
}
.ispick {
  border: none;
  /* background-color: rgb(255, 0, 128); */
  width: 20px;
  background-image: url(/static/redheart.png);
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 0px 2px;
}

.diss {
  background-color: lightgrey;
}
.isdiss {
  border: none;
  /* background-color: grey; */
  background-image: url(/static/diss.png);
  background-size: 33px 33px;
  background-repeat: no-repeat;
  background-position: -3px -5px;
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
  height: 300px;
  width: 400px;
  margin: auto;
}
.img-container img {
  max-height: 300px;
  /* width: 100%; */
  max-width: 100%;
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
  padding: 15%;
  overflow: hidden;
  font-size: 22px;
}
.icon {
  background: lightcyan;
  border-radius: 100px;
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
#username-label {
  color: lightcyan;
  font-weight: bold;
}

.avatar-container {
  width: 0px;
  height: 0px;
  padding: 10px 18px;
  border-radius: 50px;
  background-color: lightcyan;
  overflow: hidden;
  position: relative;
}
.avatar {
  position: absolute;
  top: 0px;
  left: 0px;
}
.avatar-img {
  /* position: absolute; */
  overflow: hidden;
  border-radius: 150px;

  max-width: 50px;
  /* max-height:30px; */
}
.info-container {
  border-bottom: 1px darkcyan dashed;
  /* border-top:1px darkcyan dashed; */
}
.feed-container {
  /* margin-top: 50px; */
  border-bottom: 1px darkcyan dashed;
  border-top: 1px darkcyan dashed;
}

li a {
  text-decoration: none;
  color: lightcyan;
}
#ranking-link {
  margin: auto;
  font-size: 20px;
  font-weight: bold;
}
header ul li a {
  margin-top: 10px;
}
#logo-img {
    flex: 1;
    height: 80%;
    width: 100%;
    max-width: 80%;
    border-radius: 100px;
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
    padding: 4%;
    margin:auto;
    background: lightcyan;
    border-radius: 100px;
}

#search-bar input {
    margin-left: 10px;
    width: auto;
    /*border-radius: 5px;*/
    /*box-shadow: none;*/
}
header li {
    flex: 1;
}
li {
    display: inline;
    list-style: none;
}
#me-icon {
    margin-top:5px;
    width: 30px;
    height: 30px;
}
#logout-icon {
    height: 40px;
    margin: auto;
    margin-left: 0px;
}
.time {
  font-size: 13px;
  color: #999;
}
  
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
  
.clearfix:after {
  clear: both
}
.el-row {
    width: 80%;
    margin: 15px;
    /* position: absolute; */
    left: 5%;
}

.tag-span {
  margin-left: 3px;
  font-style: italic;
  font-weight: bold;
}
</style>