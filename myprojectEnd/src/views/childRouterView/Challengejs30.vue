<template>
    <div class = "outer" >
        <h2 class = "title" @keydown="keydown">JS30挑战之一,输入下面字符试试</h2>
        <div class="box">
            <div class="letters">
                <div class="letter" v-for="(item,index) in letters" :key="index" :class="{active:item===letters[cur]}" @transitionend="moveout">
                    <h2>{{letters[index]}}</h2>
                    <h4>{{instrument[index]}}</h4>
                </div>
            </div>
        </div>
        <!-- <div ref="asdfasf"></div>  -->
        <!-- 从这个例子可以看出 最后在this.$ref中的是div 不是asdf -->
        <audio v-for="(item,index) in sounds" :key = "index" :src="item" :ref="item" :currentTime="time"></audio>
        <!-- <audio :src="sounds[1]" ref="audio" :currentTime="time">aaa</audio> -->
    </div>
    
</template>
<script>
import sound1 from "../../sounds/boom.wav"
import sound2 from "../../sounds/clap.wav"
import sound3 from "../../sounds/hihat.wav"
import sound4 from "../../sounds/kick.wav"
import sound5 from "../../sounds/openhat.wav"
import sound6 from "../../sounds/ride.wav"
import sound7 from "../../sounds/snare.wav"
import sound8 from "../../sounds/tink.wav"
import sound9 from "../../sounds/tom.wav"
export default {
    name:"Project2",
    data(){
        return{
            sounds:[sound1,sound2,sound3,sound4,sound5,sound6,sound7,sound8,sound9],
            letters:['A','S','D','F','G','H','J','K','L'],
            instrument:['clap','hihat','kick','openhat','boom','ride','snare','tom','tink'],
            key_code:[],//在mounted中初始化了
            audios:['audio1','audio2','audio3','audio4','audio5','audio6','audio7','audio8','audio9'],
            time:0,//播放组件中的当前事件置为0  每次按键播放完置0,
            cur:999,//当前的索引 第几个  用于激活样式
        }
    },
    methods:{
        keydown(e){
            this.time = 0;
            console.log(e.code);
            console.log('索引',this.key_code.indexOf(e.code))
            this.cur = this.key_code.indexOf(e.code)
            console.log("js30中的this.$refs",Object.values(this.$refs))
            let a = Object.values(this.$refs)[this.cur][0];
            a.play();
            this.time = 0;
        },
        playSound(){
            console.log('ads')
        },
        moveout(){
            console.log("可以捕获到嘛")
            this.cur = 999;
        }
    },
    mounted(){
        //keydown 只可以是函数名，写成函数() 就不对了
        window.addEventListener("keydown",this.keydown)
        this.key_code = this.letters.map((item)=>"Key".concat(item))//初始化按键的值
        console.log('mounted',this.$refs)
    },
    destroyed(){
        window.removeEventListener("keyup",this.keydown)
    }
}
</script>
<style scoped>
    .outer{
        margin:0;
        margin-top:6.5vw;/**相当于搭好外面的架子 */
        font-size: 1wv;
        width:100%;
        height:100vh;
    }
    .title{/*这个设置了js30的样式了 */
        line-height: 6vw;
        margin:0;
        /* transform: translate3d(0,100%,0); */
       /**说明translate3d   transform: translate3d(0,100%,0); 也会脱离文档流 */
        width:60vw;
        height:6vw;
        margin:0 auto;
        margin-top: 10vw;
        font-size: 2rem;
        text-align: center;
    }
    .box{
        width:100%;
        height: 50vh;
        background-color: wheat;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .letters{
        margin:0;
        width:100%;
        height: 9.5vw;
        display: inline-block;
        text-align: center;
        font-size: 1.5rem;
        display:flex;
    }
    .letter{
        margin:auto;
        width: 8.5vw;
        height: 8.5vw;
        background-color: burlywood;
        border-radius: 10%;
        border: 3px solid black;
        transition: all 0.1s;
    }
    .letter h2{
        color: white;
        text-shadow: 0 0 5rem black;
    }
    h4{
        margin-top:-2.7vw;
    }
    .active{
        transform: scale(1.1);
        border-color: rgb(46, 158, 147);
        box-shadow: 0 0 45px rgb(20, 20, 19);
    }

    

</style>