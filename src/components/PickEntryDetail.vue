<template>
<div id="pickentry-container">
    <div id="icon-container">
       <a> <router-link to="/home">←</router-link></a>
       <span id="pickname">{{PickEntry.EntryName}}</span>
    </div>
    <div id="img-container">
        <img :src="PickEntry.PicturePath"></img>
    </div>
    <div id="info-container">
        <div v-for="(val, key) in  PickEntry" 
        v-if="EntryAlias[key] && val.length != 0">  
            <span class="field-title">{{ EntryAlias[key]}}  </span>
            {{val}}
        </div>
        </div> 

</div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      getPickAPI: "http://127.0.0.1:8000/starpick/get_pick",
      
      PickEntry: {},
      EntryAlias: {
        Brand: "品牌",
        IdolName: "爱豆",
        Price: "价格",
        OfficialLink: "官网链接",
        EntryName: "Item名称",
        Size: "尺寸",
        Category: "类别"
      }
    };
  },
  methods: {
    requestForEntry(pickid) {
      var res  = {
        PickEntryID: "wendy02",
        PicturePath:"/static/skirt_1.png",
        Brand: "Maje",
        IdolName: "Wendy",
        Price: "$225",
        OfficialLink: "",
        EntryName: "embroidered skirt",
        Size: "",
        Category: "下装",
        TagPos: {
          top: 60,
          left: 40
        }
      };
      this.$http.get(this.getPickAPI, {
        params: {
          tagId: pickid
        }
      })
      return res;
    }
  },
  watch: {
    $route(to, from) {
      this.PickEntry = this.requestForEntry(this.$route.query.PickEntryID);
      
      // 对路由变化作出响应...
    }
  },
  mounted() {
    this.PickEntry = this.requestForEntry(this.$route.query.PickEntryID);
  }
};
</script>

<style scoped>
div,
li {
  /* border: 1px dashed lightgray; */
}
#pickentry-container {
  height: 100%;
  width: 100%;
}
#img-container, #info-container, #icon-container{
    padding:4%;
}
#info-container div {
    margin:4% 10%;
}
#info-container{
    background-color:lightcyan;
    text-align: left;
}
#pickname{
    margin-left: 5%;
}
.field-title{
    font-weight: bold;
    
    color: lightseagreen;
}
#icon-container{
    text-align: left;
    background-color: darkturquoise;
    color:white;
    
}
#icon-container a {
    color:white;
    text-decoration: none;
    font-weight: bold;
}
</style>