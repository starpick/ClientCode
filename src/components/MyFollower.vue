 <template>
    <div id="my-follower-container">
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

        <div id="follower-container">
            <div class="hint_text">
                全部粉丝
            </div>
            
            <hr>

            <div class="follower-list" v-for="(follower, index) in followers">
                <div class="follower-info">
                    <div class="follower-avatar">
                        <img class="avatar-img" :src="follower.header">
                    </div>
                    <div class="follower-username" @click="toFollowerUser( follower.id )">
                        {{follower.username}}
                    </div>
                    <div class="follow-state" v-if="follower.id != $store.state.id">
                        <el-button type="danger" v-if="follow_state[index]" @click="onUnFollow(follower.id,index)">UnFollow</el-button>
                        <el-button type="primary" v-if="!follow_state[index]" @click="onFollow(follower.id,index)">Follow</el-button>
                        <!-- <el-button type="primary" v-if="!debug" @click="onFollow(follower.id,index)">Follow</el-button>
                        <el-button type="danger" v-if="debug" @click="onUnFollow(follower.id,index)">UnFollow</el-button> -->
                    </div>
                   
                </div>
                <hr>
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
                // followers: []
                followers: [
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
                follows: [],
                debug: false
            }
        },
        mounted(){
            this.requestForUserInfo(this.$route.query.userId);

            // const self = this;
            // this.$http.get(this.getFollowersAPI, {
            //     params:{
            //         id:this.$store.state.id
            //     }
            // }).then(res=>{
            //     self.followers = res.data.followers;
            // });
            
            // for (var i = 0; i < this.followers.length; i++) {
            //     this.follow_state[i] = false;
            //     for (var j = 0; j < this.follows.length; j++) {
            //         if (this.followers[i].id == this.follows[j].id) {
            //             this.follow_state[i] = true;
            //         }
            //     }
            // }
            // console.log("followers:", this.followers);
            // console.log("follower_state:", this.follow_state);
        },
        methods: {
            async requestForUserInfo(id){
                // console.log(">Myfollower ID=",id)
                const self = this;
                await this.$http.get(this.getUserAPI, {
                    params: {
                        userId: id
                    }
                }).then(res => {
                    // console.log("> userFollower: res.data", res.data);
                    self.user = res.data;
                    return this.$http.get(this.getFollowersAPI, {
                        params: {
                            id: self.user.id,
                            // email: self.user.email
                        }
                    });
                }).then(results => {
                    // self.followers = results.data.followers;
                    if (results.data.success) {
                        self.followers = results.data.followers;
                        // self.followers.forEach((e, index) => {
                        //     if (e.id == this.$store.state.id) {
                        //         self.follow_state[index] = true;
                        //     } else {
                        //         self.follow_state[index] = false;
                        //     }
                        // });
                    }
                });

                await this.$http.get(this.getfollowings, {
                    params: {
                        id: this.$store.state.id
                    }
                }).then(results => {
                    self.follows = results.data.follows;
                    // console.log("this.follows", self.follows);
                    for (var i = 0; i < this.followers.length; i++) {
                        var flag = false;
                        for (var j = 0; j < this.follows.length; j++) {
                            if (this.followers[i].id == this.follows[j].id) {
                                flag = true;
                            }
                        }
                        
                        this.follow_state.push(flag);
                    }
                });
                
                
                // console.log("followers:", this.followers);
                // console.log("follows:", this.follows);
                // console.log("follower_state:", this.follow_state);
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
            toFollowerUser(id) {
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
                this.follows.push(id);
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
                this.follows.splice(this.follows.indexOf(id), 1);

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
    #my-follower-container {
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
    .follower-info {
        display: inline-flex;
        position: relative;
        width: 100%;
        height: 60px;
    }
    .follower-avatar {
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
    .follower-username {
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
    .followed-button {
        border: none;
        position: absolute;
        right: 10px;
        margin-top: 20px;
        background-color: darkturquoise;
        color: white;
        border-radius: 30px;
    }
/*    .followed-button:hover {
        background-color: #5EC8CB;
    }
*/    .followed-button:active {
        background-color: #B3D5DB;
        color: #6E7286;
    }

</style>