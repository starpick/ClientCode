<template>
<div id="upload-share-container"> 
 <div id="hint">
     <div>你的 Pick 已经上传成功！١١(❛ᴗ❛)</div>
    <img :src ="this.$store.state.uploadedImageSrc"  ></img>
     <div>分享到...</div>
     </div>
 <div id="option-container">

<div id="frencircle"  class="option"><span>朋友圈</span></div>
<div id="weibo"   class="option"><span>微博</span></div>


</div>
<div id="home" class="option"><router-link to="/home"     >
    回首页
    </router-link></div>
</div>
</template>

<script>
import $ from "jquery";
export default {
    methods:{
        
    }
};
</script>

<style scoped>
div,
li {
  /* border: 1px dashed lightgray; */
}
img {
    max-height:200px;
}
#upload-share-container {
    height:100%;
    width: 100%;
} 
#option-container {
    display:flex;
    color:white;
    height:20%;
    margin:auto;
    /* margin-top:100%; */
}
#frencircle{
    background-color: green;

}
#weibo{
    background-color:goldenrod;
}
#frencircle span {
    left: 16%;
}
#hint {
    padding-top: 100px;
}
#home{
    color:white;
    background-color:dodgerblue;
}
#home a{
    text-decoration:none;
    left: 12%;
    
}
#home a:visited{
    color:white;
}
.option {
    position: relative;
  margin:auto;
  
  width: 70px;
  height: 70px;
  border-radius: 100px;
}
.option span, .option  a{
    position: absolute;
    top:33%;
    left:27%;
}
</style>