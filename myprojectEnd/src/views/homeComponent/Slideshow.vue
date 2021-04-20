<template>
<!-- index  indexOfImg-->
<!-- 0 2 4 6 8-- 0 1 2 3 4

-->
<div class="outer">
    <img class = "img" :src="imgUrl" alt="">
    <ul>
        <li :class="{active:index==indexOfImg*2}" v-for="(item,index) in list" :key="index" @click="item%2!=0&&clickli(item) ">
        </li>
    </ul>
    <div class="leftButton button" @click=left()><i class="fa fa-arrow-circle-left fa-4x" aria-hidden="true" ></i></div>
    <div class="rightButton button" @click=right()><i class="fa fa-arrow-circle-right fa-4x" aria-hidden="true" ></i></div>
</div>
    
</template>
<script>
import img1 from "../../image/slideshow/1.jpg"
import img2 from "../../image/slideshow/2.jpg"
import img3 from "../../image/slideshow/3.jpg"
import img4 from "../../image/slideshow/4.jpg"
import img5 from "../../image/slideshow/5.jpg"
export default {
    name:"Slideshow",
    data(){
        return{
            imgs:[img1,img2,img3,img4,img5],
            imgUrl:img5,
            list:[1,2,3,4,5,6,7,8,9,10],
            indexOfImg:0,//在钩子函数中计数轮播的效果
        }
    },
    methods:{
        clickli(index){
            index = Math.floor(index/2);
            console.log(index)
            this.indexOfImg = index;
            this.imgUrl = this.imgs[index]
        },
        left(){
            this.indexOfImg--;
            console.log('left',this.indexOfImg)
            console.log('left',)
            if(this.indexOfImg<0){
                this.indexOfImg = 4;
                this.imgUrl = this.imgs[this.indexOfImg];
            }else{
                this.imgUrl = this.imgs[this.indexOfImg];
            }
        },
        right(){
            this.indexOfImg++;
            console.log('right',this.indexOfImg)
            if(this.indexOfImg>4){
                this.indexOfImg = 0;
                this.imgUrl = this.imgs[this.indexOfImg];
            }else{
                this.imgUrl = this.imgs[this.indexOfImg];
            }
        },
        runInv() {
            this.timer = setInterval(() => {
                // console.log("?",this.indexOfImg)
                this.indexOfImg++;
                if(this.indexOfImg>=5){
                    this.indexOfImg=0;
                }
                this.imgUrl = this.imgs[this.indexOfImg];
            }, 2000)
        }
    }
    
}
</script>
<style scoped>
    .outer{
        width:100%;
        height:100%;
        position:relative;
    }
    .outer,img{
        margin:0;
        padding:0;
    }
    img{
        width:100%;
        height: 100%;
        z-index: -999;
        -webkit-user-drag: none;
    }

    @media screen and (max-width: 500px) {
        img{
        width:500px;
        height:100%;
        background-color: blanchedalmond;
        }
    }
    ul{
        padding:0;
        position:absolute;
        top:85%;
        left:50%;
        transform:translateX(-50%);
        /* width:200px;
        height:10px; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ul li{
        list-style: none;
        width:6px;
        background-color:rgba(255, 254, 254, 0.747) ;
        /* 这个元素到了 ui li:nth-child 然后下main.active就不起作用了 */
    }
    ul li:nth-child(odd){
        list-style: none;
        width:2vw;
        height: 2vw;
        cursor:pointer;
        border-radius: 50%;
    }
    .active{
        background-color:rgb(175, 20, 20)
    }
    @media screen and (max-width: 500px){
        ul li:nth-child(odd){
        list-style: none;
        width:1.5vh;
        height: 1.5vh;
        cursor:pointer;
        background-color:rgba(255, 255, 255, 0.747) ;
        border-radius: 50%;
        }
    }
    .fa{
        color:white;
    }
    .leftButton{
        position:absolute;
        top:75%;
        left:10%;
        z-index:1;
    }
    .rightButton{
        position:absolute;
        top:75%;
        right:10%;
        z-index:1;
    }
    .button{
        z-index:1;
    }
    .fa:hover{
        color: rgb(4, 165, 165);
    }
    
</style>