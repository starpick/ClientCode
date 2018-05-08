<template>
<div id="uploader-container">
<div id="option-container">

<div id="camera" v-on:click="onCameraOption" class="option"><span>拍摄</span></div>
<div id="album" v-on:click="onAlbumOption" class="option"><span>相册</span></div>


</div>

</div>
</template>

<script>
import $ from "jquery";
export default {
    methods:{
        onCameraOption(){
            this.$router.push({path:'/upload/cam'})

        },
        onAlbumOption(){
            this.$router.push({path:'/upload/album'})
        }
    }
};
</script>

<style scoped>
div,
li {
  border: 1px dashed lightgray;
}
#uploader-container {
    height:100%;
    width: 100%;
}
#option-container {
    display:flex;
    color:white;
    height:20%;
    margin:auto;
    margin-top:100%;
}
#camera{
    background-color:purple;

}
#album {
    background-color: darkcyan;
}
.option {
    position: relative;
  margin:auto;
  
  width: 70px;
  height: 70px;
  border-radius: 100px;
}
.option span{
    position: absolute;
    top:33%;
    left:27%;
}
</style>