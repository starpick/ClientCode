 <template>
    <div id="my-starpick-container">
        <header>  
            <ul>
                <li @click="toLastPage($store.state.id)">
                    <img id="return-icon" src="/static/return_2.png" ></img>
                    <!-- <div>Me</div> -->
                </li>
            </ul>
        </header>
    
        <div class="null-line">
        </div>

        <div id="starpick-container">
            <div class="hint_text">
                My Star Pick
            </div>

            <hr color="#EEEEEE" style="height: 0.2px;">

            <div class="starpick-list" v-for="(starpick, index) in starpickList">
                <div class="info-container">
                    <div class="avatar-container">
                        <div class="avatar">
                            <img class="avatar-img" :src="starpick.user.header"></img>
                        </div>
                    </div>
                    <div class="username" @click="onClickUserName(starpick.user.id)">
                        {{starpick.user.username}}
                    </div>
                </div>

                <div class="img-container">
                    <img :src="starpick.PicturePath"></img>
                    <a class="tag" v-for="t in starpick.PickEntries" 
                    :style="{top: t.tagY + 'px', left: t.tagX + 'px'}"
                    @click="onClickTag(t)">
                        <span>{{t.tagContent}}</span>
                    </a>
                </div>

                <div class="icon-container">
                    <ul>
                        <li class="left-li  " @click="onPick(starpick.UploadEntryID)"> 
                            <span  :class="{judge:true,pick:true, ispick:isPicked(starpick.UploadEntryID)}"><span style="visibility: hidden;">_</span></span><span>{{starpick.Pick}}</span>
                          </li>
                        <li class="left-li  " @click="onDiss(starpick.UploadEntryID)">  
                            <span   :class="{judge:true,diss:true, isdiss:isDissed(starpick.UploadEntryID)}"></span>
                            <span style="visibility: hidden;">_</span>
                            <span>{{starpick.Comments.length}}</span>
                        </li> 
                        
                        <li>
                            <span class="comment-icon"> <span style="visibility: hidden;">___</span> </span>
                            <span class="cnt">{{starpick.Comments.length}}</span>
                        </li> 
                        <li class="empty-li"></li>
                    </ul>
                </div>

                <div class="social-container">
                    <div class="description-container">
                        <span class="description-user">{{starpick.Username}}</span>{{starpick.Description}}
                        <span v-for="tag in starpick.hashTags" class="tag-span"><a>#{{tag}}</a></span>
                    </div>

                    <div class="social-counter">
                       <!--  <div>
                            <span class="pick-icon"> <span style="visibility: hidden;"> ___</span></span>
                            <span class="cnt">{{starpick.Pick}}</span>
                        </div>

                        <div>
                            <span class="comment-icon"> <span style="visibility: hidden;">___</span> </span>
                            <span class="cnt">{{starpick.Comments.length}}</span>
                        </div> -->

                        <div class="comments-container">
                            <ul>
                                <li v-for="(cmt, index) in starpick.Comments" class="cmts">
                                <span>{{cmt.username}}</span> {{cmt.content}} 
                                
                                </li>

                                <li v-for="(cmt, index) in starpick.SelfComments" class="cmts">
                                <span>{{cmt.User}}</span> {{cmt.Content}} 
                                </li>
                                

                                <li class="user-send-comment"> 
                                    <input placeholder="发表评论！" v-model="comments[index]"
                                    @keyup.enter="addComment(starpick.UploadEntryID, index)"> </input>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> 
                <div class="null-line">
                </div>               
            </div>
            
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "MyStarpick",
        data() {
            return {
                getEntryAPI: "http://127.0.0.1:8000/starpick/get_entry",
                addCommentAPI: "http://127.0.0.1:8000/starpick/comment/makecomment",
                getUserFeedAPI: "http://127.0.0.1:8000/starpick/get_user_entries",
                getCommentsAPI: "http://127.0.0.1:8000/starpick/comment/getComments",
                queryPickAPI: "http://127.0.0.1:8000/starpick/query_like",
                queryDissAPI: "http://127.0.0.1:8000/starpick/query_diss",
                getUserAPI:"http://127.0.0.1:8000/starpick/get_user",

                starpickList: [],
                comments: [],
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
                    SelfComments: [],
                    hashTags: []
                },
                user: {}
            };
        },
        // mounted(){
        //     const self = this;
            
        // },
        methods: {
            // async requestForUserInfo(id){
            //     console.log(">user ID=",id)
            //     const self = this;
            //     await this.$http.get(this.getUserAPI, {
            //         params: {
            //             userId: id
            //         }
            //     }).then(res => {
            //         // console.log("> userFollower: res.data", res.data);
            //         self.user = res.data;
            //     });
            // },
            toHome() {
                this.$router.push({ path: "/home" });
            },
            toLastPage(id) {
                // this.$router.push({
                //     path: "/me/",
                //     query: {
                //       userId: id
                //     }
                // });
                this.$router.back(-1);
            },
            onClickUserName(id) {
                this.$router.push({
                    path: "/me/",
                    query: {
                        userId: id
                    }
                });
            },
            onClickTag(pickentry) {
                console.log(pickentry);
                this.$router.push({
                    path: "/pickentry/",
                    query: {
                        PickEntryID: pickentry.pickId
                    }
                });
            },
            onPick(id) {
                var inpick = -1;
                    if (this.UserInfo.UserPick.length > 0) {
                        inpick = this.UserInfo.UserPick.indexOf(id);
                    }

                    if (inpick == -1) {
                        this.$http.get(this.addLikeAPI, {
                            params: {
                                token: this.$store.state.token,
                                entryId: id
                            }
                        });
                        this.UserInfo.UserPick.push(id);
                    } else {
                        this.$http.get(this.addUnLikeAPI, {
                            params: {
                                token: this.$store.state.token,
                                entryId: id
                            }
                        });
                        console.log("> MyStarpick: ", this.UserInfo.UserPick);
                        this.UserInfo.UserPick[inpick] = -1;
                    }
            },
            onDiss(id) {
                var inpick = -1;
                if (this.UserInfo.UserDiss.length > 0) {
                    inpick = this.UserInfo.UserDiss.indexOf(id);
                }

                if (inpick != -1) {
                    this.UserInfo.UserDiss.splice(inpick, 1);

                    this.$http.get(this.addUnDissAPI, {
                        params: {
                            token: this.$store.state.token,
                            entryId: id
                        }
                    });
                } else {
                    this.UserInfo.UserDiss.push(id);

                    this.$http.get(this.addDissAPI, {
                        params: {
                            token: this.$store.state.token,
                            entryId: id
                        }
                    });
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
                        console.log("> MyStarpick: Fail send comments\n", err);
                    });

                // update view immediately
                this.starpickList[i].SelfComments.push({
                    User: this.$store.state.username,
                    Content: newcontent,
                    TimeStamp: dt.getYear() + "-" + dt.getMonth() + dt.getDay()
                });
                this.comments[i] = "";
            }
        },
        async beforeMount() {
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
            var id = this.$route.query.userId;
            console.log(">user ID=",id)
            const self = this;
            await this.$http.get(this.getUserAPI, {
                params: {
                    userId: id
                }
            }).then(res => {
                console.log("> userFollower: res.data", res.data);
                self.user = res.data;
            });
            console.log("this user", this.user);
            
            var entriesId = [];
            console.log(this.user.email);

            this.$http
                .get(this.getUserFeedAPI, {
                    params: {
                        email: this.user.email
                    }

                })
                .then(results => {
                    console.log("user feed",results.data);
                    var entry_len = results.data.entry.length;
                    var entries = [];
                    
                    for (var i = 0; i < entry_len; i++) {
                        entries.push(results.data.entry[i]);
                    }
                    // console.log(entries.length);
                    results.data.entry.forEach(e => {
                        entriesId.push(e.entryId);
                        var feedEntry = JSON.parse(JSON.stringify(this.emptyFeed));
                        feedEntry.Description = e.description;
                        feedEntry.PicturePath = e.picture;
                        feedEntry.UploadEntryID = e.entryId;
                        feedEntry.Pick = e.likenumber;
                        feedEntry.hashTags = e.hashTags;
                        feedEntry.user = e.user;
                        feedEntry.PickEntries = e.tags;
                        self.starpickList.push(feedEntry);
                    });
                })
                .then(res => {
                    var cmtsPromises = [];
                    var pickPromises = [];
                    var dissPromises = [];

                    for (var i = 0; i < entriesId.length; i++) {

                        cmtsPromises.push(this.$http.get(this.getCommentsAPI, {
                            params: {
                                entryId: entriesId[i]
                            }
                        }));

                        pickPromises.push(this.$http.get(this.queryPickAPI, {
                            params: {
                                email: this.$store.state.email,
                                entryId: entriesId[i]
                            }
                        }));

                        dissPromises.push(this.$http.get(this.queryDissAPI, {
                            params: {
                                email: this.$store.state.email,
                                entryId: entriesId[i]
                            }
                        }));



                        Promise.all(cmtsPromises).then(results => {
                            results.forEach((res, i) => {
                                if (res.data.success) {
                                    // console.log(this);
                                    self.starpickList[i].Comments = res.data.comments;
                                }
                            });
                        });

                        Promise.all(pickPromises).then(results => {
                            results.forEach((res, i) => {
                                if (res.data.success) {
                                    this.UserInfo.UserPick.push(parseInt(entriesId[i]));
                                }
                            });
                        });

                        Promise.all(dissPromises).then(results => {
                            results.forEach((res, i) => {
                                if (res.data.success) {
                                    this.UserInfo.UserDiss.push(parseInt(entriesId[i]));
                                }
                            });
                        });
                    }
                });
                console.log(this.UserInfo);

            


        }
    }
</script>

<style scoped>
    #my-starpick-container {
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
/*    header li div {
        margin: auto;
    }
*/    
    #logo-img {
        flex: 1;
        height: 80%;
        width: 100%;
        max-width: 80%;
        border-radius: 100px;
    }
    #return-icon {
        width: 30px;
        height: 30px;
        position: relative;
        top: 5px;
    }
    header li div {
        /*text-align: left;*/
        position: relative;
        left: -3px;
        top: 10px;
        margin: 0;
    }
    header li {
        flex: 1;
    }
    li {
        display: inline;
        list-style: none;
    }
    .null-line {
        width: 100%;
        height: 5px;
        background-color: #EEEEEE;
    }

    .hint_text {
        margin: auto;
        margin-top: 5px;
        font: cursive;
        /*font-weight: bold;*/
    }
    
    /*entry style*/
    .starpick-list {
        /*width: 90%;*/
        /*position: relative;*/
        margin: auto;
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
    .comments-container {
        margin: 0;
        margin-top: 0;
    }
    .comments-container ul {
        margin: 0;
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
      /*height: 300px;*/
      /*width: 400px;*/
      width: 300px;
      height: 100%;
      margin: auto;
    }
    .img-container img {
        max-height: 300px;
        /* width: 100%; */
        max-width: 100%;
        margin-top: 5px;
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
        margin-top: 5px;
        position: absolute;
        top: 15px;
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

    #username-label {
      color: lightcyan;
      font-weight: bold;
    }

    .avatar-container {
      width: 0px;
      height: 0px;
      padding: 10px 18px;
      border-radius: 50px;
      /*background-color: lightcyan;*/
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
      border-radius: 100px;

      max-width: 50px;
      /* max-height:30px; */
    }
    .info-container {
      /*border-bottom: 1px darkcyan dashed;*/
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
</style>