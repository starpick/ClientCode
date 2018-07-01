<template>
<div id="uploader-album-container">
<header>  
  把搭配图传上来吧~
  <!-- <input type="file" id="upload-btn" @change="readfile()"></input>  -->
</header>
<div id="album-container"> 
    <div>
      <img :src="src"></img>  
      <el-input v-model="src" placeholder="输入图片网址"></el-input>

    </div>
    
  </ul>
</div>
<footer>

  <button id="confirm-button" class="confirm-btn"
   v-on:click="onConfirmAlbum">填好啦</button>
    
</footer>
</div>
</template>

<script>
import $ from "jquery";
export default {
  data(){
    return {
      // src:"http://img.idol001.com/origin/2017/06/19/42b91d717987d5401e9b4b383d44eb001497870395.jpg"
      // src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529071582341&di=6085c990c41ab805831d603e97000b18&imgtype=0&src=http%3A%2F%2Fimg.idol001.com%2Forigin%2F2017%2F06%2F19%2F2c08a7e2cfaca2a88fadf28a27a7c03b1497870394.jpg"
      // src:"http://img.idol001.com/origin/2017/06/19/ac1e5bff1bb9d91f143ea19f3ad65e2b1497870394.jpg" 
      
      
      src:"http://img.idol001.com/origin/2017/06/19/97a5eff42e1c32ac227e52d7cdcf0acf1497870393.jpg"
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
                console.log("> UPLOAD_FROM_ALBUM: ", document.getElementById('upload-btn').value)
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
#album-container div{
  padding: 5%;
} 
#album-container div img{
  width:100%;
}
header{
  flex:1;
  
  padding-top:15%;
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
#album-container > div{
margin:5%;
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
    font-size: 18px;
}
</style>