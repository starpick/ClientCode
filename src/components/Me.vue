<template>
    <div id="me-container">
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

        <div id="my-info-container">
            <ul>
                <li>
                    <div id="avatar-box">
                        <img id="me-avatar" src="/static/light.png" @click="modifyAvatar()"></img>
                    </div>
                    
                </li>
                <li>
                    <div class="username"> Light </div>
                    <!-- <div class="username"> {{$store.state.username}} </div> -->
                </li>
                <li>
                    <!-- <div id="userIntro"> {{$store.state.intro}} </div> -->
                    <div id="userIntro"> Intro:Pick plmm </div>
                </li>
            </ul>

            <hr color="#EEEEEE">

            <ul id="my-count">
                <li>
                    <div id="my-entry" class="count">
                        <!-- <p> {{$store.state.username}} </p> -->
                        <div> 628 </div>
                        <div>StarPick</div>
                    </div>
                </li>
                <li>
                    <div id="my-follow">
                        <!-- <p> {{$store.state.username}} </p> -->
                        <div> 123 </div>
                        <div>Follow</div>
                    </div>
                </li>
                <li>
                    <div id="my-follower">
                        <!-- <p> {{$store.state.username}} </p> -->
                        <div> 3455 </div>
                        <div>Follower</div>
                    </div>
                </li>
            </ul>
            
        </div>

        <div class="null-line">
        </div>

        <div id="others">
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
            },modifyAvatar() {
                console.log("test modify avatar!");
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
    background-color: #CDDEDC;
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