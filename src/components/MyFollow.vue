 <template>
    <div id="my-follow-container">
        <header>  
            <ul>
                <li id="logo-img-container"> 
                    <img id="logo-img" src="/static/logo.png" @click="toHome()"></img> 
                </li>
                <li id="search-bar">
                   <!-- <i id="search-icon" class="el-icon-search  "></i> -->
                    <input placeholder="发现新的Pick..." > </input>
                </li>
                <li>
                    <div style="margin:auto;">
                        <i id="upload-button" v-on:click="onUploadClick" class="el-icon-plus icon"></i> 
                    </div>
                </li>
                <li>
                    <div id="username-label">{{$store.state.username}}</div> 
                </li>
                <li>
                    <img id="me-icon" @click="toMeInfo()" src="/static/me.png"></img>
                </li>
                <li>
                    <img id="logout-icon" @click="onLogOut()" src="/static/exit.png"></img>
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
                        <img class="avatar-img" src="/static/light.png">
                    </div>
                    <div class="follow-username" @click="toFollowUser()">
                        {{follow.username}}
                    </div>
                    <div class="follow-state">
                        <input type="button" value="Followed" class="followed-button" @click="changeFollowState()"></input>
                        <!-- <button>Followed</button> -->
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

                ]
            }
        },
        methods: {
            toHome() {
                this.$router.push({ path: "/home" });
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
            toFollowUser() {
                console.log("test router to my follow user info page!");
            },
            changeFollowState() {
                console.log("test changeFollowState!");
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
    .follow-username {
        text-align: left;
        position: relative;
        left: 10px;
        top: 15px;
    }
    .follow-state {
        /*border: 1px;*/
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