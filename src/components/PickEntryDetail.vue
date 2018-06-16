<template>
<div id="pickentry-container">
    <div id="icon-container">
       <a> <router-link to="/home">←</router-link></a>
       <span id="pickname">{{PickEntry.EntryName}}</span>
    </div>
    <div id="img-container">
        <img :src="PickEntry.pic"></img>
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
        brand: "品牌",
        idolName: "爱豆",
        price: "价格",
        officialLink: "官网链接",
        entryName: "Item名称",
        size: "尺寸",
        category: "类别"
      }
    };
  },
  methods: {
    async requestForEntry(pickid) {
      var result  = {
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
      var res = await this.$http.get(this.getPickAPI, {
        params: {
          pickId: pickid
        }
      }).then(res => {
        this.PickEntry = res.data.pick; 
      }).catch(err=>{
        console.log("> PICK_ENTRY_DETAIL ERROR:  ", err);
      });
    }
  },
  watch: {
    $route(to, from) {
      this.requestForEntry(this.$route.query.PickEntryID);
      
      // 对路由变化作出响应...
    }
  },
  mounted() {
     this.requestForEntry(this.$route.query.PickEntryID);
    console.log(this.PickEntry)
    
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