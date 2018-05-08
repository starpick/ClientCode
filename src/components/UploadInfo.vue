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
                <img src="../assets/photo_1.png" > </img>
                <a class="tag" style = "left: 70px; top: 140px;"><span>Monts</span></a>
                <a class="tag" style = "left: 70px; top: 250px;"><span>Maje</span></a>
                
            </div>
        </div>
        <div id="tab-container"> 
            <div v-show="isEditTags">
                <ul id="tab-head-ul">
                    <li v-for="(pick,index) in picks" 
                    v-bind:class="{active:chosenTabIndex == index }"
                    v-on:click="onClickTabHead(index)"
                    >{{pick.Category}} </li>
                </ul>
                <ul id="tab-body-ul">
                    <li v-for="(pick,index) in picks"
                    v-bind:class="{tabActive:chosenTabIndex == index}" 
                    v-show="index == chosenTabIndex"
                    >
                        <div>
                        <span class="field-title">  爱豆</span>{{pick.IdolName}}
                        </div>
                        <div>
                        <span class="field-title" >  品牌</span>{{pick.Brand}}
                        </div>
                        <div>
                        <span class="field-title">  价格</span>{{pick.Price}}
                        </div>
                        <div>
                        <span class="field-title"
                        v-bind:class="{unfilled:pick.OfficialLink.length == 0}"
                        >  官网链接</span>{{pick.OfficialLink}}
                        </div>
                        <div>
                        <span class="field-title">  服装名</span>{{pick.EntryName}}
                        </div>
                        <div>
                        <span class="field-title"
                        v-bind:class="{unfilled:pick.Size.length == 0}"
                        
                        > 尺寸</span> {{pick.Size}}
                        </div>
                    </li>
                </ul>
            </div>
            <div v-show="!isEditTags">
                descriptions
            </div>
        </div>

    </div> 

</div>
</template>

<script>
import $ from "jquery";
export default {
    data(){
        return {
            isEditTags: true,
            chosenTabIndex: 1,
            picks:[
                {
                    Brand:"Monts",
                    IdolName:"Wendy",
                    Price:"₩78,000",
                    OfficialLink:"",
                    EntryName:"dot blouse",
                    Size:"",
                    Category:"上衣"
                },
                {
                    Brand:"Maje",
                    IdolName:"Wendy",
                    Price:"$225",
                    OfficialLink:"",
                    EntryName:"embroidered skirt",
                    Size:"",
                    Category:"下装"
                },
                {
                    Brand:"",
                    IdolName:"Wendy",
                    Price:"",
                    OfficialLink:"",
                    EntryName:"",
                    Size:"",
                    Category:"饰品"
                }
            ]
        };
    },
    methods:{ 
        onClickTabHead(i){
            this.chosenTabIndex = i;
        },
        onCancel(){
            this.$router.push({path:"/home"});
        },
        onSubmit(){ 
            
        }
    }
};
</script>

<style scoped>
div,
li{
  /* border: 1px dashed lightgray; */
}  
header, #left-container, #tab-container {
    padding:0 8px;
}

#tab-head-ul, #right-control{
    padding:0; 
    display: flex;
    margin:0;
    flex-wrap:wrap;
    width:100%;
}
#tab-body-ul{
    padding:0;  
    display: flex;
    text-align: left;
    flex-direction: column;  
}
li{ 
  border: 1px dashed lightgray;
    list-style-type: none;
    display: inline-block;
    
}
#tab-head-ul li, #right-control div{
  border: 1px dashed lightgray;
box-sizing: border-box;
    flex-basis: 50%; 
    height:50px;
    text-align: center;
    line-height:50px; 
}
#tab-body-ul li{ 
    padding: 10px;
}
#tab-body-ul li div{
    margin-bottom:8px;

}
#uploader-info-container {
    height:100%;
    width: 100%;
    display:flex;
    flex-direction: column;
} 
header,footer{flex:1;}
#info-container{
    padding-top:30px;
    display:flex;
    flex:14;
    height:auto;
    overflow:hidden;
}
#tab-container{ 
    flex:1;
    padding-bottom:8px;
}
#left-container{
    display:flex;
    flex-direction: column;
    flex:1;
}
#right-control {
    flex:1;
}
#photo-container{ 
    overflow:hidden; 
     width:100%; 
    height:60%; 
    flex:10;
    position:relative;
}
#photo-container img{ 
    margin:auto;
    width:100%;
}
.active{
    background-color:darkturquoise;
    color:white;
}
.tabActive{
    background-color:lightcyan;
    height:100%;
}
.field-title{ 
    color:lightseagreen;
    margin-right:10px;
}
.unfilled{
    color: lightgrey;
}
.tag{
    position:absolute;
    top:10px;
    left:10px;
    background-color:lightcyan;
    opacity: 0.7;
    padding:5px;
    border-radius:10px;
    border-top-right-radius: 0px;
}
.tag span{
    opacity: 1;
    font-size:10px;
    
}
header{ 
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: justify; 
    display:flex;
    background-color:mediumturquoise;
    justify-content:space-between;
}
.btn{
    color: white;
    background:none;
    border:none;
    padding:0px 10px;
    height:auto;

}
</style>