 <template>
    <div id="my-follow-container">
        <header>  
            <ul>
                <li  @click="toLastPage($store.state.id)">
                    <img id="return-icon" src="/static/return_2.png"></img>
                    <!-- <div>Me</div> -->
                </li>
                
            </ul>
        </header>
    
        <div class="null-line">
        </div>

        <div id="follow-container">
            <div class="hint_text">
                全部关注
            </div>
            
            <hr>

            <div class="follow-list" v-for="(follow, index) in follows">
                <div class="follow-info">
                    <div class="follow-avatar">
                        <img class="avatar-img" :src="follow.header">
                    </div>
                    <div class="follow-username" @click="toFollowUser( follow.id )">
                        {{follow.username}}
                    </div>
                    <div class="follow-state" v-if="follow.id != $store.state.id">
                        <!-- <input type="button" value="Followed" class="followed-button" @click="changeFollowState( follow.id )"></input> -->
                        <el-button type="danger" v-if="follow_state[index]" @click="onUnFollow(follow.id,index)">UnFollow</el-button>
                        <el-button type="primary" v-if="!follow_state[index]" @click="onFollow(follow.id,index)">Follow</el-button>
                    </div>
                   
                </div>
                <hr>
                <!-- <button>test</button> -->
            </div>
            
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "MyFollow",
        data() {
            return {
                getFollowersAPI: "http://127.0.0.1:8000/starpick/follow/getfollowers",
                getUserAPI:"http://127.0.0.1:8000/starpick/get_user",
                getfollowings:"http://127.0.0.1:8000/starpick/follow/getfollowings",
                followAPI:"http://127.0.0.1:8000/starpick/follow/follow",
                unfollowAPI:"http://127.0.0.1:8000/starpick/follow/unfollow",

                user: {},
                // follows: []
                follows: [
                    {
                        username: "highlight",
                        email: "highlight@highlight.com"
                    },
                    {
                        username: "infinite",
                        email: "infinite@infinite.com"
                    },
                    {
                        username: "shinne",
                        email: "shinne@shinne.com"
                    }

                ],
                follow_state: [],
                followLength: 0,
                myfollows: []
            }
        },
        mounted(){
            this.requestForUserInfo(this.$route.query.userId);

            // const self = this;
            // this.$http.get(this.getfollowings, {
            //     params:{
            //         id:this.$store.state.id
            //     }
            // }).then(res=>{
            //     self.follows = res.data.follows;
            // });
            
        },
        methods: {
            async requestForUserInfo(id){
                console.log(">MyFollow ID=",id)
                const self = this;
                await this.$http.get(this.getUserAPI, {
                    params: {
                        userId: id
                    }
                }).then(res => {
                    console.log("> userFollow: res.data");
                    self.user = res.data;
                    return this.$http.get(this.getfollowings, {
                        params: {
                            id: self.user.id,
                            // email: self.user.email
                        }
                    });
                }).then(results => {
                    self.follows = results.data.follows;
                    self.followLength = self.follows.length;
                });
                await this.$http.get(this.getfollowings, {
                    params: {
                        id: this.$store.state.id
                    }
                }).then(res => {
                    self.myfollows = res.data.follows;
                    for (var i = 0; i < self.followLength; i++) {
                        var flag = false;
                        for (var j = 0; j < self.myfollows.length; j++) {
                            if (self.follows[i].id == self.myfollows[j].id) {
                                flag = true;
                            }
                        }
                        this.follow_state.push(flag);
                    }
                })
            },
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
            onUploadClick() {
                this.$store.state.uploadedImageSrc = null;
                this.$router.push({ path: "/upload" });
            },
            onLogOut() {
                this.$store.commit("userLogout");
                this.$router.push({ path: "/" });
            },
            toMeInfo() {
                this.$router.push({ path: "/me" });
            },
            toFollowUser(id) {
                console.log("test router to my follow user info page!");
                this.$router.push({
                    path: "/me/",
                    query: {
                      userId: id
                    }
                });
            },
            onFollow(id,i){
                
                this.$http.get(this.followAPI, {
                    params:{
                        token:this.$store.state.token,
                        followerId: id
                    }
                }).then(
                    res=>{
                        console.log("> Myfollower: res.data = ", res.data);
                    }
                );
                // this.follows.push(id);
                var tmp = this.follow_state;
                tmp[i] = true;
                this.follow_state = tmp;
                this.$forceUpdate();
                // console.log(this.follow_state);
            },
            onUnFollow(id,i) {
                // this.followThisUser = false;
                var tmp = this.follow_state;
                tmp[i] = false;
                this.follow_state = tmp;
                // this.follows.splice(this.follows.indexOf(id), 1);

                this.$http.get(this.unfollowAPI, {
                    params:{
                        token: this.$store.state.token,
                        followerId: id
                    }
                });
                this.$forceUpdate();
                // console.log(this.follow_state);

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
        }
    }
</script>

<style scoped>
    #my-follow-container {
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
        /*text-align: left;*/
        position: relative;
        left: -3px;
        top: 10px;
        margin: 0;
    }
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
        margin: 10px;
        
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
    .null-line {
        width: 100%;
        height: 10px;
        background-color: #EEEEEE;
    }

    .hint_text {
        margin: auto;
        margin-top: 5px;
        font: cursive;
        font-weight: bold;
    }
    .follow-info {
        display: inline-flex;
        position: relative;
        width: 100%;
        height: 60px;
    }
    .follow-avatar {
        margin:0;
        position: relative;
        right: -5px;
        top: 10px;
    }
    .avatar-img {
        width: 40px;

        overflow: hidden;
        border-radius: 150px;
    }
    .follow-list {
        position: relative;
    }
    .follow-info {
        position: relative;
    }
    .follow-username {
        text-align: left;
        position: relative;
        left: 10px;
        top: 15px;
    }
    .follow-state {
        position: absolute;
        left: 270px;
        top: 10px;
    }
    

</style>