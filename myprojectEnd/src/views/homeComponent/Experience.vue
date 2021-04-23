<template>
    <div class="outer">
        <h2>个人经历</h2>
        <div class="box1">
            <div class="showbox">
                <div class="showlist" :style="styleImg" @mousedown="mousedown($event)" @mousemove="mousemove($event)" @mouseup="mouseup()">
                    <div class="item" v-for="(item,index) in count" :key="index">
                        <div class="left"><img :src="imgs[index]" @load="isload(index)" alt=""></div>
                        <div class="right">
                            <div class="content">
                                <div class="title">
                                    <h2>{{dataTime[index]}}</h2>
                                </div>
                                <div class="paragraph">
                                    <p>{{dataDsb[index]}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box2">
            <div class="icons" :style="styleIcon">
                <div class="icon" v-for="(item,index) in count" :key=index @click="clickIcon(index)" :class="{'activeIcon':curIndex==index}" >
                    <div class="time">
                        <div>{{time[index]}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import img1 from "../../image/experience/1.jpg"
import img2 from "../../image/experience/2.jpg"
import img3 from "../../image/experience/3.jpg"
import img4 from "../../image/experience/4.jpg"
import img5 from "../../image/experience/5.jpg"
import img6 from "../../image/experience/6.jpg"
import img7 from "../../image/experience/7.jpg"
import img8 from "../../image/experience/8.jpg"
import img9 from "../../image/experience/9.jpg"
import img10 from "../../image/experience/10.jpg"
import img11 from "../../image/experience/11.jpg"
import img12 from "../../image/experience/12.jpg"
export default {
    name:"Experience",
    data(){
        return{
            count:[0,1,2,3,4,5,6,7,8,9,10,11],//五个图片
            time:['2016','2017','2017','2017','2017','2018','2018','2018','2019','2019','2020','2020'],
            dataTime:["2016年","2017年","2017年","2017年","2017年","2017年","2018年","2018年","2018年","2019年","2020年","2020秋"],
            dataDsb:["通过英语4-6级","普通话二级","C语言二级(优秀)","网络技术三级(优秀)",
            "数学竞赛三等奖","电赛省级三等奖","蓝桥杯省级二等奖","数学建模校级一等奖","推免申请的成绩证明","推免至北邮","撰写3篇专利","于清华实习"],
            moveUpData:[0,-45,-45*2,-45*3,-45*4,-45*5,-45*6,-45*7,-45*8,-45*9,-45*10,-45*11],//上面图片移动的坐标
            moveDown:[28,-8+28,-8*2+28,-8*3+28,-8*4+28,-8*5+28,-8*6+28,-8*7+28,-8*8+28,-8*9+28,-8*10+28,-8*11+28],//下面图标移动的坐标
            //初始值是36的时候就自动在中间了  单位vw
            imgsload:[img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12],
            imgs:[img1,null,null,null,null,null,null,null,null,null,null,null],
            curIndex:0,//当前的位置索引 这个索引和图片于下面的节点公用
            movepix:0,//移动的像素  正表示右方向  负表示左方向
            pointofdown:0,//鼠标点击按下的时候记录的坐标
            downFlag : false,
            styleIcon:{
                transform:'translate3d(28vw,0,0)'
            },
            styleImg:{
                transform:'translate3d(0,0,0)'
            }
        }
    },
    methods:{
        clickIcon(index){
            console.log(index)
            this.styleIcon.transform = `translate3d(${this.moveDown[index]}vw,0,0)`;
            this.styleImg.transform = `translate3d(${this.moveUpData[index]}vw,0,0)`;
            console.log(this.moveUpData[index])
            this.curIndex = index;
        },
        mousedown(e){
            this.downFlag = true;
            this.pointofdown = e.screenX;
            console.log('this.pointofdown',this.pointofdown)
        },
        mousemove(e){
            if(this.downFlag){
                console.log()
                this.movepix = e.screenX - this.pointofdown;//偏移的像素大小
                console.log('-----------------',this.movepix)
                //得到当前像素对应的位置  下边不联动
                //上边移动
                let nowPix = this.moveUpData[this.curIndex]*0.01*document.body.scrollWidth;//当前像素的位置
                let moveTo = nowPix + this.movepix;//需要移动的像素值的大小
                //判断边界条件  更新移动改的值
                if(moveTo<this.moveUpData[this.moveUpData.length-1]*0.01*document.body.scrollWidth){
                    //当前需要移动的像素  小于最小的了就不进行移动了
                    moveTo = this.moveUpData[this.moveUpData.length-1]*0.01*document.body.scrollWidth;
                }
                this.styleImg.transform=`translate3d(${moveTo}px,0,0)`;
                if(Math.abs(this.movepix)>8*0.01*document.body.scrollWidth){//判断移动量的大小 直接跳转
                    this.downFlag = false;
                    this.mouseup();
                }
            }
        },
        mouseup(){
            console.log('moveseup',this.movepix)
            if(this.movepix>0){
                if(this.curIndex>0){
                    this.curIndex-=1;
                }
            }else if(this.movepix<0){
                if(this.curIndex<this.moveUpData.length){
                    this.curIndex+=1;
                }
            }else{
                ;//等于0  不执行
            }

            this.clickIcon(this.curIndex);
            this.movepix = 0;
            this.downFlag = false;
        },
        isload(index){
            console.log("experienceVue load",index)
            if(index<this.imgs.length){
                this.imgs[index+1] = this.imgsload[index+1]; 
            }
        }
    }
}
</script>
<style scoped>
    *{
        margin:0;
        padding:0;
    }
    .outer{
        background-color: white;
    }
    .box1{
        width:100%;/*外面定义了80vw */
        height: 20vw;
        /* background-color: azure; */
    }
    .box2{
        width:80%;/*外面定义了80vw */
        margin:0 auto;
        height:11vh;
    }
    .box1{
        display: flex;
    }
    .box2{
        /* background-color: bisque; */
    }
    .box1 .showbox{/*上面滑动的盒子 最外面展示的*/
        width:45vw;
        height:20vw;
        /* background-color: rgb(190, 133, 26); */
        margin: auto;
        overflow: hidden;
    }
    .box1 .showbox .showlist{
        width:50000px;/*足够长的地方 */
        height:100%;
        /* background-color:rgba(165, 42, 42, 0.527); */
        display: flex;
        transition:all 1s;
        overflow:visible
    }
    .box1 .showbox .showlist .item{
        /* float:left; */
        width:45vw;
        height:100%;
        /* background-color: cornflowerblue; */
        display: flex;
    }
    .box1 .showbox .showlist .item .left{/**左边放置图片 */
        width:50%;
        height:100%;
        border-top-left-radius: 10%;
        border-bottom-left-radius: 10%;
        box-shadow: 0 0 5px  black;
        /* background-color: crimson; */
    }
    .box1 .showbox .showlist .item .left img{/**左边放置图片 */
        width:100%;
        height:100%;
        border-top-left-radius: 10%;
        border-bottom-left-radius: 10%;
        -webkit-user-drag: none;

    }
    .box1 .showbox .showlist .item .right{/**右边放置文字 */
        width:50%;
        height:100%;
        user-select: none;
    }
    .box1 .showbox .showlist .item .right .content{
        width:100%;
        height:100%;
        margin: auto;
        display:flex;
        flex-direction: column;
        /* background:chartreuse; */
        border-top-right-radius: 10%;
        border-bottom-right-radius: 10%;
        
        box-shadow:inset 0 0 3px  black;
    }
    .box1 .showbox .showlist .item .right .content .title,.paragraph{
        width:60%;
        height:20%;
        margin:0 auto;
        margin-top:5%;
        text-align: center;
        user-select: none;
        /* background-color: chocolate; */
    }
    .box2{
        overflow: hidden;
        /* background-color: chocolate; */
    }
    .box2 .icons{/**一条横线 */
        display:flex;
        align-items:center;
        margin-top:2.5vw;/*距离上面的高度 */
        width:96vw;
        height:3%;/*是父亲的30% */
        background-color: rgb(0, 0, 0);
        transition: all 1s;
    }

    /*点 */
    .box2 .icons .icon{
        margin-top: 0;/*和线同步 */
        margin-left:3.25vw;
        margin-right:3.25vw;
        width:1.5vw;
        height:1.5vw;
        border-radius: 50%;
        background-color: rgb(18, 161, 114);
        cursor: pointer;
        transition: all 1s;
    }
    .box2 .icons .icon .time{
        width:100%;
        height:100%;
        /* background-color: brown; */
        margin-top:60%;
    }
    .box2 .icons .icon .time div{
        width:100%;
        height: 100%;
        margin:0 auto;
        transform: translate3d(0,1vw,0);
        /* background-color: chartreuse; */
        text-align: center;
        font-size: 100%;
    }
    .box2 .icons .activeIcon{/*优先级  如果没有前面的就凉了 */
        width:2vw;
        height:2vw;
        background-color: rgb(24, 61, 49);
    }
  
    @media screen and (max-width:500px){
        .box2 .icons .icon .time{
        display: none;
    }
    }
    
</style>