<template>
<div id="uploader-album-container">
<div id="album-container"></div>
<footer>

  <button id="confirm-button" class="confirm-btn"
   v-on:click="onConfirmAlbum">选好啦</button>
    
</footer>
</div>
</template>

<script>
import $ from "jquery";
export default {
    methods:{ 
        onConfirmAlbum(){
            this.$router.push({path:'/upload/info'});
        }
    }
};
</script>

<style scoped>
div,
li {
  border: 1px dashed lightgray;
}
#uploader-album-container {
    height:100%;
    width: 100%;
  display: flex;
  flex-direction: column;
} 
#album-container{
  flex: 12;
}
footer{
  flex: 1;
  display: flex;
  padding:10px;

}
.confirm-btn{
    margin:auto;
    background-color: chocolate;
    color:white;
    border-radius:80px;
    width:50%;
    height:50%;
}
</style>