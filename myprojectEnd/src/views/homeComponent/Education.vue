

<template>
<!-- // 一开始写的程序  很不优雅 -->
    <div class="outer">
        <h2>教育经历</h2>
        <div class="boxRight">
            <div class="leftbutton" @click="leftClick()" :class="{'displayleft':this.numVW==0}"><i class="fa fa-angle-left fa-4x" aria-hidden="true"></i></div>
            <div class="rightbutton" @click="rightClick()" :class="{'displayright':this.numVW==-45*8}"><i class="fa fa-angle-right fa-4x" aria-hidden="true"></i></div>
            <!-- <button style="display:blick">left</button> -->
            <div class="showlist">
                <div class="allLength"  :style="style" @mousedown="mousedown($event)" @mousemove="mousemove($event)" @mouseup="mouseup()" > 
                    <div class="index1" v-for="(item,index) in list" :key="index">
                        <img :src="imgs[index]" alt="" >    
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
            numVW:0,//按照 viewWidth来实现的
            numPix:0*0.01*document.body.scrollWidth,//viweWidth与实际像素的关系
            numMin:-8*45,//9张图这里要改成8
            pointofdown:0,
            movepix:0,//移动的像素  正就是向右  负向左
            downFlag:false,
            style:{
                transform:'translate3d(0,0,0)'
            },
            imgs:[img1,img2,img3,img4,img5,img6,img7,img8,img9],//存放图片的数组
            coordinate:[0,-45,-45*1,-45*2,-45*3,-45*4,-45*5,-45*6,-45*7,-45*8]
        }
    },
    methods:{
        leftClick(){
            this.numVW+=45;
            if(this.numVW>0){
                this.numVW=0;
            }
            this.numPix = this.numVW*0.01*document.body.scrollWidth;
            this.style.transform = 'translate3d('+this.numVW+'vw,0,0)';
            console.log('clickk',this.style.transform = 'translate3d('+this.numVW+'vw,0,0)')
        },
        rightClick(){
            this.numVW-=45;
            if(this.numVW<this.numMin){
                this.numVW=this.numMin;
            }
            this.numPix = this.numVW*0.01*document.body.scrollWidth;
            this.style.transform = 'translate3d('+this.numVW+'vw,0,0)';
            console.log('clickkk',this.style.transform = 'translate3d('+this.numVW+'vw,0,0)')
        },
        mousemove(e){
            if(this.downFlag){
                this.movepix = e.screenX - this.pointofdown;
                let temp = this.numPix +  this.movepix;
                if(temp>0){
                    temp = 0;
                }
                if(temp<-45*8*0.01*document.body.scrollWidth)//6张图片  所以这里是5{  9图 这里是8
                    temp = -45*8*0.01*document.body.scrollWidth;
                console.log('e.screenX',e.screenX)
                // let temp1 = temp + this.movepix;
                this.style.transform = `translate3d(${temp}px,0,0)`;
                if(Math.abs(this.movepix)>100*0.01*document.body.scrollWidth){
                    this.mouseup();
                }
            }
            
        },
        mousedown(e){
            console.log("1按下1")
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
                this.movepix=0;
            }else{
                ;
            }
        }
    }
}
</script>
<style scoped>
.outer,h2,boxRight,boxRight,showlist,allLength,ul,li{
    margin:0;
    padding:0;
    background-color: white;
}
.boxRight{
    margin:auto;
    width:45vw;
    height:30vw;
    /* background-color: rgba(187, 171, 29, 0.466); */
    display: flex;
    flex-direction: column;
    position: relative;
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
    text-align: center;
    line-height: 60px;
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
    z-index: 999;
}
.rightbutton{
    position:absolute;
    bottom: 10%;
    right:3%;
    cursor:pointer;
    z-index: 999;
}

</style>