<template>
<!-- 更改后的程序 比较优雅 -->
    <div class="outer">
        <h2>教育背景</h2>
        <div class="box">
            <div class="leftbutton" @click="leftClick()" :class="{'displayleft':this.index==0}"><i class="fa fa-angle-left fa-4x" aria-hidden="true"></i></div>
            <div class="rightbutton" @click="rightClick()" :class="{'displayright':this.index==this.coordinate.length-1}"><i class="fa fa-angle-right fa-4x " aria-hidden="true"></i></div>
            <!-- <button style="display:blick">left</button> -->
            <div class="showlist">
                <div class="allLength"  :style="style" @mousedown="mousedown($event)" @mousemove="mousemove($event)" @mouseup="mouseup()" > 
                    <div class="index1" v-for="(item,index) in list" :key="index">
                        <img :src="imgs[index]" alt="" @load="isload(index)">    
                        <div class="text"><!--对应button-->
                            <h2 class="honor">{{title[index]}}</h2>
                            <ul>
                                <li>{{message[index]}}</li>
                            </ul>
                        </div> 
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import img1 from "../../image/education/1.png"
import img2 from "../../image/education/2.png"
import img3 from "../../image/education/3.jpg"
import img4 from "../../image/education/4.jpg"
import img5 from "../../image/education/5.jpg"
import img6 from "../../image/education/6.jpg"
import img7 from "../../image/education/7.jpg"
import img8 from "../../image/education/8.jpg"
import img9 from "../../image/education/9.jpg"
export default {
    name:"Surper",
    data(){
        return{
            list:[1,2,3,4,5,6,7,8,9],//用来遍历的次数,
            title:['2019-2022','2015-2019','2019-2020','2015-2016','2015-2016','2016-2017','2017-2018','2018-2019','2019'],
            message:["在读研究生，电子通信类","本科毕业,通信工程","优秀研究生","国家励志奖学金","河南大学优秀学生","河南大学三好学生",'河南大学优秀学生干部','河南省三好学生','河南大学2019届优秀毕业生'],//荣誉内容
            index:0,//一开始时候index是0
            pointofdown:0,
            movepix:0,//移动的像素  正就是向右  负向左
            downFlag:false,
            style:{
                transform:'translate3d(0,0,0)'
            },
            imgsload:[img1,img2,img3,img4,img5,img6,img7,img8,img9],
            imgs:[img1,null,null,null,null,null,null,null,null],//存放图片的数组
            coordinate:[0,-45,-45*1,-45*2,-45*3,-45*4,-45*5,-45*6,-45*7,-45*8]
        }
    },
    methods:{
        leftClick(){
            if(this.index>0){
                this.index-=1;
            }
            this.style.transform = `translate3d(${this.coordinate[this.index]}vw,0,0)`;
        },
        rightClick(){
            if(this.index<this.coordinate.length-1){
                this.index+=1;
            }
            this.style.transform = `translate3d(${this.coordinate[this.index]}vw,0,0)`;
        },
        mousemove(e){
            if(this.downFlag){
                this.movepix = e.screenX - this.pointofdown;//偏移的像素的大小
                let nowPix = this.coordinate[this.index]*0.01*document.body.scrollWidth;//当前的像素位置
                let moveTo = nowPix + this.movepix;//需要移动的像素值的大小

                if(moveTo<this.coordinate[this.coordinate.length-1]*0.01*document.body.scrollWidth){
                    //当前需要移动的像素  小于最小的了就不进行移动了
                    moveTo = this.coordinate[this.coordinate.length-1]*0.01*document.body.scrollWidth;
                }
                this.style.transform = `translate3d(${moveTo}px,0,0)`;
                if(Math.abs(this.movepix)>10*0.01*document.body.scrollWidth){
                    this.mouseup();
                }
            }
            
        },
        isload(index){
            if(index<this.imgs.length){
                this.imgs[index+1] = this.imgsload[index+1];
            }
        },
        mousedown(e){
            console.log("1按下1",e.screenX)
            this.downFlag = true;
            this.pointofdown=e.screenX;
        },
        mouseup(){
            console.log("3弹起来")
            this.downFlag = false;
            if(this.movepix<0){
                this.rightClick();
                this.movepix=0;
            }else if(this.movepix>0){
                this.leftClick();
                this.movepix=0;//不清0会导致错误移动
            }else{
                ;
            }
        }
    }
}
</script>
<style scoped>
.outer,h2,box,showlist,allLength,ul,li{
    margin:0;
    padding:0;
    background-color: white;
}
.box{/*外面的大盒子 */
    margin:auto;
    width:45vw;
    height:35vw;/*展示的样式 */
    /* background-color: rgba(187, 171, 29, 0.466); */
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 0;
}
.displayleft{
    display:none;
}
.displayright{
    display:none;
}

.showlist{
    /* position: relative; */

    width:100%;
    height: 100%;
    overflow: hidden;
}
.allLength{
    width:9000px;
    height: 30vw;
    /* display:flex; */
    opacity: 1;
    transform:translate3d(0,0,0);
    transition: transform 1s;
}
.index1{
    width:45vw;
    height: 22vw;
    display:inline-block;
}
img{
    width:100%;
    height:100%;
    -webkit-user-drag: none;
    border-radius: 10%;
}

ul{
    list-style: none;;
}
.honor,li{
    margin:1vw;
    text-align: center;
    line-height: 3vw;
    user-select:none;
}
h2,h4{
    user-select:none;
}

.leftbutton{
    position: absolute;
    bottom: 10%;
    left:3%;
    cursor:pointer;
    z-index: 1;
}
.rightbutton{
    position:absolute;
    bottom: 10%;
    right:3%;
    cursor:pointer;
    z-index: 1;
}

</style>