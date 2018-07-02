<template>
    <div id="TagSearch">
        <header>  
            <ul>
                <li id="logo-img-container"> 
                    <img id="logo-img" src="/static/logo.png" @click="toHome()"></img> 
                </li>
                <li id="search-bar">
                    <input v-model="searchtag" placeholder="发现新的Pick..." ></input>
                    <img src='/static/search.png' @click="TagSearch($store.state.id)"></img>
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
                  <span>{{entry.user.username}}</span>
                  <div class="bottom clearfix">
                    <time class="time"> </time>
                    <el-button @click="Detail(entry.entryId)"type="text" class="button">详情</el-button>
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

                //getUserAPI:"http://127.0.0.1:8000/starpick/get_user",
                getEntrybyHashname:"http://127.0.0.1:8000/starpick/get_entrys_by_hash",
                entryAPI:"http://127.0.0.1:8000/starpick/get_entry",
                getPick:"27.0.0.1:8000/starpick/get_pick",
                entries: [
                ],

                searchtag: '',
            }
        }, 
        
        watch: {
            $route(to, from) {
            
            // 对路由变化作出响应...
            }
        },
        async mounted(){
          const self = this;

          await this.$http.get(this.getEntrybyHashname, { 
            params: {
              hashName:  this.$route.query.tagname
            }
          }).then(
            (res) => {
              //console.log(self.entries)
              self.entries = res.data.entries;
              console.log(self.entries)

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
                      //console.log("> SEARCH: entry = ", res.data.entry);
                      //self.entries[i].username = res.data.entry.user.username;
                      self.entries[i].picture = res.data.entry.picture;
                    };
                  })(i)
                );
              }
            }
          );
            
        },
        computed:{
            
        },
        methods: {
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
#me-container {
  width: 100%;
  height: 100%;
  overflow:auto;
}
div,
li {
  /* border: 1px dashed lightgray; */
}
header {
    /*background-color: #CDDEDC;*/
    /* position:fixed; */
    width:100%;
    z-index: 100;
    margin:0;
    height: 51px;
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
        /*      justify-content:space-between;    */
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

</style>