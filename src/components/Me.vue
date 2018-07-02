<template>
    <div id="me-container">
        <header>  
            <ul>
                <li>
                    <img id="return-icon" src="/static/return_2.png" @click="toLastPage()"></img>
                </li>
                <li id="search-bar">
                   <i id="search-icon" class="el-icon-search  "></i>
                    <input placeholder="发现新的Pick..." > </input>
                </li>
                <li>
                    <div style="margin:auto;">
                        <i id="upload-button" v-on:click="onUploadClick" class="el-icon-plus icon"></i> 
                    </div>
                </li>
                <li>
                    <div id="username-label">{{$store.state.username }}</div> 
                </li>
                <li>
                    <img id="logout-icon" @click="onLogOut()" src="/static/logout.png"></img>
                </li>
            </ul>
        </header>

        <div class="null-line">
        </div>

        <div id="my-info-container">
            <ul>
                <li>
                    <div id="avatar-box">
                        <img id="me-avatar" :src="user.header" @click="modifyAvatar()"></img>
                    </div>
                    
                </li>
                <li>
                    <!-- <div class="username"> Light </div> -->
                    <div class="username" @click="modifyUserName()">   {{user.username}} </div>
                    <div class="email" > {{user.email}} </div>
                </li>
                <li>
                    <!-- <div id="userIntro"> {{$store.state.intro}} </div> -->
                    <!-- <div id="userIntro"> Intro:Pick plmm </div> -->
                    <div v-if="$store.state.username != user.username">
                         <el-button type="primary" 
                            v-if="!followThisUser "
                         @click="onFollow(user.id)" >Follow</el-button>
                         <el-button type="danger" 
                         v-if=" followThisUser"

                         @click="onUnFollow(user.id)" >UnFollow</el-button>
                         <!-- <el-button type="primary" v-if>Follow</el-button> -->

                    </div>
                </li>
            </ul>

            <hr color="#EEEEEE">

            <ul id="my-count">
                <li>
                    <div id="my-entry" class="count"  @click="toPick( user.id )">
                        <div> {{starpickLength}} </div>
                        <!-- <div> 8 </div> -->
                        <div>StarPick</div>
                    </div>
                </li>
                <li>
                    <div id="my-follow" @click="toMyFollow( user.id )">
                        <div> {{followLength}} </div>
                        <div>Follow</div>
                    </div>
                </li>
                <li>
                    <div id="my-follower" @click="toMyFollower( user.id )">
                        <div> {{followerLength}} </div>
                        <!-- <div> 5 </div> -->
                        <div>Follower</div>
                    </div>
                </li>
            </ul>
            
        </div>

        <div class="null-line">
        </div>

        <div id="others" v-if="$store.state.username == user.username">
            <div id="myAlbums" class="someProfile" @click="toAlbums()">
                <img src="/static/album.png" class="icon"></img>
                <div>Albums</div>
                <img src="/static/next.png" class="next_icon"></img>
            </div>

            <hr color="#EEEEEE">

            <div id="myFavorite" class="someProfile" @click="toFavorites()">
                <!-- 收藏 -->
                <img src="/static/favorites.png" class="icon"></img>
                <div>Favorites</div>
                <img src="/static/next.png" class="next_icon"></img>
            </div>

            <hr color="#EEEEEE">

            <div id="settings" @click="toSettings()" class="someProfile">
                <img src="/static/setting.png" class="icon"></img>
                <div>Settings</div>
                <img src="/static/next.png" class="next_icon"></img>
            </div>
            <hr color="#EEEEEE">
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "Me",
        data() {
            return {
                followLength:0, 
                followThisUser:false,
                user:{},
                follows:[],
                starpickLength:0,
                followers:[],
                followerLength: 0,
                getfollowings:"http://127.0.0.1:8000/starpick/follow/getfollowings",
                followAPI:"http://127.0.0.1:8000/starpick/follow/follow",
                unfollowAPI:"http://127.0.0.1:8000/starpick/follow/unfollow",
                getUserFeedAPI: "http://127.0.0.1:8000/starpick/get_user_entries",
                getUserAPI:"http://127.0.0.1:8000/starpick/get_user",
                edit_user_infoAPI: "http://127.0.0.1:8000/starpick/edit_user_info",
                getFollowersAPI: "http://127.0.0.1:8000/starpick/follow/getfollowers"
            }
        }, 
        
        watch: {
            $route(to, from) {
            
            // 对路由变化作出响应...
            }
        },
        mounted(){
            this.requestForUserInfo(this.$route.query.userId);

            const self = this;
            this.$http.get(this.getfollowings, {
                params:{
                    id: this.$store.state.id
                }
            }).then(res => {
                if (res.data.success) {
                    self.follows = res.data.follows;
                    console.log("> ME: ", self.$store.state.id, " follow", self.follows);
                    self.follows.forEach(e=>{
                        if (e.username == self.user.username){
                            self.followThisUser = true;
                        }
                    });

                }
            })
        },
        computed:{
            
        },
        methods: {
            async requestForUserInfo(id){
                console.log(">ME ID=",id)
                const self = this;
                await this.$http.get(this.getUserAPI, {
                    params: {
                        userId: id
                    }
                }).then(
                    res=>{
                        // console.log("> ME: res.data = ",res.data);
                        self.user = res.data;
                        return this.$http.get(this.getfollowings, {
                            params:{
                                id: self.user.id,
                                // email: self.user.email
                            }
                        });
                    }
                ).then(res=>{
                    self.user.follows = res.data.follows;
                    self.followLength = res.data.follows.length;
                    // console.log(self.user)
                    }
                ).then(res=>{
                    // console.log("this user", self.user);
                    this.$http.get(this.getUserFeedAPI, {
                        params: {
                            email: self.user.email
                        }
                    }).then(results => {
                        self.user.feeds = results.data.entry;
                        self.starpickLength = results.data.entry.length;
                    })
                    }
                ).then(res => {
                    this.$http.get(this.getFollowersAPI, {
                        params: {
                            id: self.user.id
                        }
                    }).then(results => {
                        self.user.followers = results.data.followers;
                        self.followerLength = results.data.followers.length;
                    })
                });
            },
            toPick(id){
                this.$router.push({
                    path: "/starpick/",
                    query: {
                        userId: id
                    }
                });
            },
            toHome() {
                this.$router.push({ path: "/home" });
            },
            toLastPage() {
                // this.$router.push({ path: "/home" });
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
            modifyAvatar() {
                console.log("test modify avatar!");
            },
            modifyUserName() {
                console.log("test modify username!");
            },
            toMyFollow(id) {
                console.log("test router myfollow!");
                this.$router.push({
                    path: "/follow/",
                    query: {
                        userId: id
                    }
                });
            },
            toMyFollower( id ) {
                console.log("test router myfollower!");
                this.$router.push({
                    path: "/follower/",
                    query: {
                        userId: id
                    }
                });
            },
            toAlbums() {
                // this.$router.push({ path: "/albums" });
                console.log("test router to albums!");
            },
            toFavorites() {
                // this.$router.push({ path: "/favorites" });
                console.log("test router to favorites!");
            },
            toSettings() {
                this.$router.push({ path: "/setting" });
            },
            onFollow(id){
                this.$http.get(this.followAPI, {
                    params:{
                        token:this.$store.state.token,
                        followerId: this.user.id
                    }
                }).then(
                    res=>{
                        console.log("> ME: res.data = ", res.data);
                    }
                );
                this.follows.push(id);
                this.followThisUser = true;
            }
            ,
            onUnFollow(id){
                this.followThisUser = false;

                this.follows.splice(this.follows.indexOf(id), 1);

                this.$http.get(this.unfollowAPI, {
                    params:{
                        token: this.$store.state.token,
                        followerId: this.user.id
                    }
                });
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
        /*background: lightcyan;*/
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
        height: 30px;
        margin: auto;
        margin-left: 0px;
    }
    .null-line {
        width: 100%;
        height: 10px;
        background-color: #EEEEEE;
    }

    #my-info-container ul {
        padding: 0;
    }
    #my-info-container li {
        height: 10px;
        margin: 0;
        padding: 0;
    }
    #avatar-box {
        border-radius: 100px;
    }
    #me-avatar {
        /*width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 1px;*/
        flex: 1;
        height: 100px;
        width: 100px;
        max-width: 80%;
        border-radius: 100px;
    }
    #my-count {
        height: 40px;
    }
    #my-count li {
        display: inline-flex;
        width: 80px;
        margin-left: 20px;
        margin-right: 10px;
    }
    .someProfile div  {
        /*display: inline-flex;*/
        width: 100px;
        margin: 0;
        margin-top: 15px;
        /*margin-left: 10px;*/
        /*margin-right: 10px;*/
        position: absolute;
        left: 60px;
        /*top: 15px;*/
    }
    .someProfile img {
        /*display: inline-flex;*/
        margin: 5px;
        width: 30px;
    }
    .someProfile .icon {
        display: inline-flex;
        position: absolute;
        left: 15px;
        margin-top: 10px
    }
    .someProfile .next_icon {
        height: 25px;
        display: inline-flex;
        margin-top: 15px;
        margin-left: 320px;
    }

</style>