<template>
<div id="uploader-info-container">
    <header>
        <button v-on:click="onCancel()" class = "btn">还是不发了</button>
 
        <button v-on:click="onSubmit()" class = "btn">提交</button>
    </header>
 
    <div id="info-container">
        <div id="left-container">
            <div id="right-control"> 
                <div v-on:click="isEditTags = false"
                v-bind:class="{active:!isEditTags }"> 
                    填写说明
                </div>
                <div v-on:click="isEditTags = true"
                v-bind:class="{active:isEditTags }"> 
                    编辑Tag
                </div>
            </div>
            <div id="photo-container">
                <div id= "photo-inner-container">



                
                <img :src="lookImgSrc" > </img>
                <a class="tag" v-for="t in itemtags" draggable="true"   
                @dragend="onDragingEnd" 
                @touchmove="onTouchMove" 
                @touchend="onTouchEnd"
                > <span  @touchmove="onTouchMove"  >{{t.Brand}} </span></a>
                <!-- <a class="tag" style = "left: 70px; top: 140px;"><span>Monts</span></a> -->
                <!-- <a class="tag" style = "left: 70px; top: 250px;"><span>Maje</span></a> -->
                

                </div>
            </div>
        </div>
       

    </div> 
     <div id="tab-container"> 
            <div v-show="isEditTags">
                <ul id="tab-head-ul">
                    <li v-for="(pick,index) in picks" 
                    v-bind:class="{active:chosenTabIndex == index }"
                    v-on:click="onClickTabHead(index)"
                    >{{pick.Category}} </li>
                    <li id="add-item" v-on:click="onAddItem()">+ 新增</li>
                </ul>
                    <div id="tab-image"> 
                    <!-- <img :src="currentPick.PicturePath" ></img>
                    <div id="upload-pick-image"
                      @click="readfile()">上传item照片
                      <input type="file"
                        id="item-img-upload"
                      ></input>
                    </div> -->
                    </div>
                <ul id="tab-body-ul">
                    <li v-for="(pick,index) in picks"
                    v-bind:class="{tabActive:chosenTabIndex == index}" 
                    v-show="index == chosenTabIndex"
                    > 
                      <div v-for="(val, key) in  pick" 
                          v-if="key !== 'TagPos' && key !== 'PicturePath' "   
                          class="field-container"
                          >  
                          <span class="field-title"
                          v-bind:class="{unfilled:val.length == 0 && false === pickFieldIsEdit[key]}"
                          >{{ EntryAlias[key]}}  </span>
                          <span 
                          @click="onEditPickField(key)"  
                          >  
                            <span v-if="false === pickFieldIsEdit[key]" >{{val}}</span> 
                            <span v-if="val.length == 0  && false === pickFieldIsEdit[key]"
                            v-bind:class="{unfilled:val.length == 0}"
                            >待填写</span>
                              <input v-if="pickFieldIsEdit[key] === true" 
                              autofocus="autofocus" 
                              @blur="onFinishEditPickField(key)"
                              @keyup.esc="onCancelEditField(key)"
                              @keyup.enter="onFinishEditPickField(key)" v-model="pickFieldBuf[key]"> </input>  
                          </span>
                      </div>
                      
                    </li>
                </ul>
            </div>
            <div id="des-container" v-show="!isEditTags">
                
                <div id="text-container">
                  <textarea 
                  v-bind:placeholder="hint" v-model="description"> BLACKPINK IN YOUR AREA! </textarea>
                </div>
                <div id="tag-container">
                  <ul id="tag-list" @click="onAddCustomTag()">
                    <li v-for="i in idolNames">#{{i}}</li> 
                    <li v-for="t in tags">#{{t}}</li> 
                    <li> + </li>
                  </ul>

                </div>
            </div>
        </div>

</div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      // lookImgSrc:"/static/photo_1.png",
      uploadEntryAPI: "http://127.0.0.1:8000/starpick/upload_entry",
      uploadPickAPI:"http://127.0.0.1:8000/starpick/upload_pick",
      description:"BLACKPINK IN YOUR AREA!",
      hint:"点评一下TA的搭配吧！",
      editingtag:"NewTag",
      isEditTags: true,
      chosenTabIndex: 1,
      customTags:[],
      EntryAlias: {
        Brand: "品牌",
        IdolName: "爱豆",
        Price: "价格",
        OfficialLink: "官网链接",
        EntryName: "Item名称",
        Size: "尺寸",
        Category: "类别"
      },
      picks: [
        {
          Brand: "Monts",
          IdolName: "Wendy",
          PicturePath:"/static/shirt_1.png",
          Price: "₩78,000",
          OfficialLink: "Default",
          EntryName: "dot blouse",
          Size: "Default",
          Category: "上衣",
          TagPos: {
            top: 30,
            left: 40
          }
        },
        {
          Brand: "Maje",
          IdolName: "Wendy",
          PicturePath:"/static/skirt_1.png",
          Price: "$225",
          OfficialLink: "Default",
          EntryName: "embroidered skirt",
          Size: "Default",
          Category: "下装",
          TagPos: {
            top: 60,
            left: 40
          }
        }
      ],
      tagorigin: {
        x: 0,
        y: 0
      },
      __defalut__pick__template__:{ // read only.
          Brand: "-",
          IdolName: "-",
          PicturePath:"-",
          Price: "-",
          OfficialLink: "-",
          EntryName: "-",
          Size: "-",
          Category: "-",
          TagPos: {
            top: -1,
            left: -1
          }
      },
      pickFieldIsEdit:{  
          Brand: false,
          IdolName: false,
          PicturePath:false,
          Price: false,
          OfficialLink: false,
          EntryName: false,
          Size: false,
          Category: false
      },
      pickFieldBuf: { // read only.
          Brand: "",
          IdolName: "",
          PicturePath:"",
          Price: "",
          OfficialLink: "",
          EntryName: "",
          Size: "",
          Category: "",
          TagPos: {
            top: -1,
            left: -1
          }
      }
    };
  },
  computed: {
    lookImgSrc: function() {
      return this.$store.state.uploadedImageSrc;
    },
    currentPick:function(){
      return this.picks[this.chosenTabIndex];
    },
    activeImageSrc: function(){
      return this.currentPick.PicturePath;
    },
    itemtags: function() {
      var t = [];
      this.picks.forEach(e => {
        t.push({
          Brand: e.Brand,
          TagPos: e.TagPos
        });
      });
      return t;
    },
    idolNames: function() {
      var t = [],
        hash = {};
      this.picks.forEach(e => {
        if (!hash[e]) {
          t.push(e.IdolName);
          hash[e] = true;
        }
      });
      return t;
    },
    tags: function(){
      var t = [];
      this.itemtags.forEach(e=>{
        t.push(e.Brand);
      })
      return t.concat(this.customTags);
    },
    pickEntryFieldsCount: function() {
      return Object.keys(this.__defalut__pick__template__).length;
    }
  },
  methods: {
    //  field edit control
    onEditPickField(key){
      // console.log("> edit pick", key)
      this.pickFieldIsEdit[key] = true;
      this.pickFieldBuf[key] = this.currentPick[key];
      // console.log(this.pickFieldIsEdit)
    },
    onFinishEditPickField(key){
      // console.log("> end edit pick", key)
      this.pickFieldIsEdit[key] = false;
      this.currentPick[key] = this.pickFieldBuf[key];

    },
    onCancelEditField(key){
      this.pickFieldIsEdit[key] = false;
      this.pickFieldBuf[key] = this.currentPick[key]; 
    },
    onAddCustomTag(){
      this.customTags.push(this.editingtag);
    },
    onClickTabHead(i) {
      this.chosenTabIndex = i;
      // manage edit buffer
      for (var k in  this.pickFieldIsEdit){
        this.pickFieldIsEdit[k] = false;
      }
      this.pickFieldBuf =  Object.assign({}, this.currentPick);
      

    },
    onCancel() {
      this.$router.push({ path: "/home" });
    },
    onSubmit() {
      // TODO: sumit upload_entry first, then
      // in its callback, POST all the picks
      const self = this;
      var entryform = new FormData();
      entryform.append("token", this.$store.state.token);
      entryform.append("picture", this.lookImgSrc);
      console.log("> UPLOAD_INFO: this.lookImgSrc = ", this.lookImgSrc);
      entryform.append("description", this.description + 
             " #" +this.tags.join(" #") + " #" + this.idolNames.join(" #")); 
      const totalPicks = this.picks.length;

      $.ajax({
        type: "POST",
        url: this.uploadEntryAPI,
        data: entryform,
        contentType: false,
        processData: false,
        cache: false,
        success: res => {
          //  if  upload_entry success
          var resjson = JSON.parse(res);
          if (resjson.success == true) { 
          console.log("> UploadEntry Success:  entryId = ", resjson.entryId);   

          var successUploadedPick = 0;

          for (var i = 0; i < self.picks.length; i++) {
            var pickform = new FormData();
            pickform.append("category", self.picks[i].Category);
            // console.log(pickform, self.picks[i].Category)
            
            pickform.append("brand", self.picks[i].Brand);
            pickform.append("idolName", self.picks[i].IdolName); 
            pickform.append("price", self.picks[i].Price); 
            pickform.append("officialLink", self.picks[i].OfficialLink); 
            pickform.append("size", self.picks[i].Size); 
            pickform.append("tagX", self.picks[i].TagPos.left); 
            pickform.append("tagY", self.picks[i].TagPos.top); 
            pickform.append("tagContent", self.picks[i].Brand); 
            
            pickform.append("token", self.$store.state.token); 
            pickform.append("entryId",  resjson.entryId); 
            
            var curptr = (function(k) { return function(){return k};
            })(i);

            let config = { 
              headers: { 
                  'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
              } 
            }; 
            this.$http.post(self.uploadPickAPI, pickform, config).then( (res) => {
              successUploadedPick++;
              if (successUploadedPick === totalPicks) {
                // end uploaded 
                this.$router.push({ path: "/upload/share" }); 
              }
            }).catch((error) =>{
              console.log("> Upload Pick failed at #[",curptr(),"]"); 
              console.log("> ERROR: ", error)
            });
          } 
          } else {
            // upload entry failed
            console.log("> UploadEntry Failed :\n", resjson );
            return ;
          }
          // -----------------------------------------
        },
        error: err => {
            // upload entry failed 
          console.log("> UploadEntry Post Error: \n", err);
        }
      });
    },
    onAddItem() {
      this.picks.push({
        Brand: "请填写品牌",
        IdolName: this.picks[this.picks.length - 1].IdolName,
        Price: "0",
        OfficialLink: "default.com",
        EntryName: "NewEntry",
        Size: "Default",
        Category: "Item",
        TagPos: {
          top: 0,
          left: 0
        }
      });
    },
    onDragingEnd(e) {
      const ptcon = document.querySelector("#photo-inner-container");
      this.tagorigin.h = ptcon.clientHeight;
      this.tagorigin.w = ptcon.clientWidth;
      const src = e.target;
      if (src.nodeName.toLowerCase() == "div") {
        return;
      }

      var diffX = src.clientWidth / 2;
      var diffY = src.clientHeight / 2;
      var x = e.clientX - this.tagorigin.x - diffX;
      var y = e.clientY - this.tagorigin.y - diffY;
      src.style.top = y * 1.0 / this.tagorigin.h * 100 + "%";
      src.style.left = x * 1.0 / this.tagorigin.w * 100 + "%";
      //   console.log(src.style.top);
      //   console.log(y, this.tagorigin.h, this.tagorigin.y);
      this.onTouchEnd(e);
    },
    onTouchMove(e) {
      const ptcon = document.querySelector("#photo-inner-container");
      this.tagorigin.h = ptcon.clientHeight;
      this.tagorigin.w = ptcon.clientWidth;
      var src = e.target;
      if (src.nodeName.toLowerCase() == "span") {
        src = src.offsetParent;
      }
      var diffX = src.clientWidth / 2;
      var diffY = src.clientHeight / 2;
      //   console.log(e.touches[0])
      var x = e.touches[0].clientX - this.tagorigin.x - diffX;
      var y = e.touches[0].clientY - this.tagorigin.y - diffY;
      src.style.top = y * 1.0 / this.tagorigin.h * 100 + "%";
      src.style.left = x * 1.0 / this.tagorigin.w * 100 + "%";
    },
    onTouchEnd(e) {
      var src = e.target;
      if (src.nodeName.toLowerCase() == "span") {
        src = src.offsetParent;
      }
      // src should be <a> element
      // how to save pos data?
      const self = this;
      var nodes = document.querySelectorAll("#photo-inner-container a");
      nodes.forEach((e, i) => {
        if (e == src) {
          // save data as px!!!
          self.picks[i].TagPos.top = src.offsetTop;
          self.picks[i].TagPos.left = src.offsetLeft;
          console.log("> UPLOAD_INFO: ", src.offsetTop);
        }
      });
    }, 
    readfile(){
      const self = this;
        //得到文件对象
      var imgFile = document.getElementById('item-img-upload').files[0];
        console.log("> read file", imgFile)
      //创建filereader对象
      var fileReader = new FileReader();
      //设置回调函数，即获取到文件路径后的操作
      fileReader.onload = function(){ 
            // document.getElementById('img-id').src=fileReader.result;
            self.currentPick.PicturePath = (fileReader.result)
            console.log(self.currentPick);
            //读取文件
            fileReader.readAsDataURL(imgFile);
      };
    }
  },
  
  mounted() { 
    const ptcon = document.querySelector("#photo-container");
    this.tagorigin.h = ptcon.clientHeight;
    this.tagorigin.w = ptcon.clientWidth;
    this.tagorigin.x = ptcon.offsetLeft;
    this.tagorigin.y = ptcon.offsetTop;
    // console.log(this.tagorigin);
    /////////////////////////////
    var pickptr = 0;
    var nodes = document.querySelectorAll("#photo-inner-container a");
    // console.log( nodes);
    const self = this;
    nodes.forEach((e, i) => {
      var strtop = self.itemtags[i].TagPos.top + "%";
      var strleft = self.itemtags[i].TagPos.left + "%";
      var str = ["top:", strtop, ";left:", strleft, ";"];
      e.setAttribute("style", str.join(""));
      // e.style.top= self.tags[i].TagPos.top + "px";
      // e.style.left = self.tags[i].TagPos.left + "px";
      // console.log(e.style);
    });


  }
};
</script>

<style scoped>
div,
li {
  /* border: 1px dashed lightgray; */
}
header,
#left-container,
#tab-container {
  padding: 4px 8px;
}
#add-item {
  background-color: lightcyan;
}
#tab-head-ul,
#right-control {
  padding: 0;
  display: flex;
  margin: 0;
  flex-wrap: wrap;
  width: 100%;
}
#tab-body-ul {
  padding: 0;
  display: flex;
  text-align: left;
  flex-direction: column;
}
li {
  border: 1px dashed lightgray;
  list-style-type: none;
  display: inline-block;
}
#tab-head-ul li,
#right-control div {
  border: 1px dashed lightgray;
  box-sizing: border-box;
  flex-basis: 50%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
#tab-body-ul li {
  padding: 10px;
}
#tab-body-ul li div {
  margin-bottom: 8px;
}
#photo-inner-container {
  position: relative;
}
#uploader-info-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
header,
footer {
  flex: 1;
}
#info-container {
  padding-top: 8px;
  display: flex;
  flex: 14;
  height: auto;
  overflow: hidden;
}
#tab-container {
  flex: 1;
  padding-bottom: 8px;
}
#left-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width:95%;
}
#right-control {
  flex: 1;
}
#photo-container {
  overflow: hidden;
  width: 100%;
  height: 60%;
  flex: 10;
  position: relative;
  margin-top:10%;
}
#photo-inner-container {
  width: 100%;
  height:100%;
}
#photo-container img {
  margin: auto;
  height: 100%;
}
.active {
  background-color: darkturquoise;
  color: white;
}
.tabActive {
  background-color: lightcyan;
  height: 100%;
}
.field-title {
  color: lightseagreen;
  margin-right: 10px;
}
.unfilled {
  color: lightgrey;
}
.tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: lightcyan;
  opacity: 0.7;
  padding: 5px;
  border-radius: 10px;
  border-top-right-radius: 0px;
}
.tag span {
  opacity: 1;
  font-size: 10px;
}
header {
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: justify;
  display: flex;
  background-color: mediumturquoise;
  justify-content: space-between;
}
.btn {
  color: white;
  background: none;
  border: none;
  padding: 0px 10px;
  height: auto;
}
#des-container {
  height: 100%;
}
#text-container {
  height: 30%;
}
#text-container textarea {
  padding: 8px;
  height: 87%;
  width: 100%;
  vertical-align: top;
  line-height: 14px;
}
#tag-container ul {
  padding: 8px;
  margin-top: 30px;
  text-align: left;
}
#tag-container ul li {
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: lightcyan;
  padding: 5px;
}
#tab-image {
  padding: 10px 0px 0px 0px;
}
#tab-image img {
  width: 100%;
}
#upload-pick-image {
  width: 100%;
  background-color: darkturquoise;
  color: white;
  cursor: help;
  padding: 5px 0px;
}
.field-container input {
  /* max-width:70px; */
  background: none;
  border-bottom: 1px dashed darkcyan;
  border-top: none;
  border-left: none;
  border-right: none;
}

#upload-imgs-container ul {
  /* padding: 2%; */
  padding: 0;
}
#upload-imgs-container li {
  border: 1px dashed lightgray;
  display: inline-block;
  list-style: none;
  height: 100px;
  width: 100px;
  margin: 3%;
  /* overflow: hidden; */
}
#upload-imgs-container li img {
  height: 100%;
  max-width: 100px;
}

#upload-imgs-container li div {
  margin-top: 5px;
}
#upload-imgs-container li div span {
  padding: 8px;
  color: white;
  background-color: darkturquoise;
  border-radius: 100px;
  font-size: 14px;
}
#upload-imgs-container li div .first {
  background-color: lightcoral;
}

#upload-pick-image {
  position: relative;
}

#item-img-upload {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>