<template>
<div id="uploader-album-container">
<header>  
  把搭配图传上来吧~
  <input type="file" id="upload-btn" @change="readfile()"></input> 
</header>
<div id="album-container">
  <ul>
    <li    >
      <img :src="src"></img>
  </li>
  </ul>
</div>
<footer>

  <button id="confirm-button" class="confirm-btn"
   v-on:click="onConfirmAlbum">选好啦</button>
    
</footer>
</div>
</template>

<script>
import $ from "jquery";
export default {
  data(){
    return {
      src:null
    }
  },
    methods:{ 
        onConfirmAlbum(){
          this.$store.commit('addUploadImageSrcs', this.src);
            this.$router.push({path:'/upload/info'});
        },
        readfile(){
          const self = this;
           //得到文件对象
          var imgFile=document.getElementById('upload-btn').files[0];
          //创建filereader对象
          var fileReader = new FileReader();
          //设置回调函数，即获取到文件路径后的操作
          fileReader.onload = function(){ 
                // document.getElementById('img-id').src=fileReader.result;
                self.src = (fileReader.result)
          };
          //读取文件
          fileReader.readAsDataURL(imgFile);
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
ul{
  padding: 5%;
}
li{
  border: 1px dashed lightgray;
  
  display: inline-block;
  list-style: none;
  height:100px;
  width:100px;
  overflow: hidden;
}
li img{
  height:100%;
}
header{
  flex:1;
  
  padding:5%;
}
#upload-btn{
  font-size:10px;
  padding:10%;
  margin:10% auto;
  width:auto; 
  border-radius: 100px;
  color:white;
  background-color: dodgerblue;
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
    height:auto;
}
</style>