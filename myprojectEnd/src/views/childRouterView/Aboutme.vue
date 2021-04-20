<template>
    <div class="outer">
        <div class="tag">
                <!-- <h4>前言</h4> -->
                <h1 class="text">
                    <!-- 这一生<br>
                    我们终将老去<br>
                    所以不妨大胆一些<br>
                    爱一个人<br>
                    攀一座山<br>
                    追一个梦<br> -->
                    <span v-for="(item,index) in msg" :key=index>{{item}}<br></span>
                </h1>
        </div>
        <div class="slideshow">
            <Slideshow ref="slide"></Slideshow>
        </div>
        <section class="education">
            <Education></Education>
        </section>
        <section class="experience">
            <Experience></Experience>
        </section>
        <section class="footer">
        </section>
    </div> 
</template>
<script>
import Slideshow from "../homeComponent/Slideshow"
import Education from "../homeComponent/Education1"
import Experience from "../homeComponent/Experience"
export default {
    name:"Aboutme",
    data(){
        return{
            activeShow : true,
            lastScrollValue:0,
            msg:["这一生","我们终将老去","所以不妨大胆一些","爱一个人","攀一座山","追一个梦"],
            msg1:["他们特立独行。他们桀骜不驯。他们惹是生非。他们格格不入。他们用与众不同的眼光看待事物。他们不喜欢墨守成规。他们也不愿安于现状。你可以认同他们，反对他们，颂扬或是诋毁他们。但唯独不能漠视他们。因为他们改变了寻常事物。他们推动人类向前迈进。或许他们是别人眼里的疯子，但他们却是我们眼中的天才。因为只有那些疯狂到以为自己能够改变世界的人才能真正改变世界。"],
        }
    },
    methods:{
        fangdou(fn,delay){
            let timer = null;//
            return function(){
                if(timer){
                    clearTimeout(timer);
                    timer = setTimeout(fn,delay);
                }else{
                    timer = setTimeout(fn,delay);
                }
            }
        },
        scrollHandler(){
            //scrollTop当前的位置
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let scroll = scrollTop - this.lastScrollValue;//偏移量
            this.lastScrollValue = scrollTop;
            console.log(scroll)
            if(scroll<=0){//向上滚动 或者到了顶部
                this.activeShow=true;
            }else{//向下滚动
                this.activeShow=false;
            }
            console.log('asdf',this.activeShow);
        }
    },
    // beforeDestroy() {
    //     window.removeEventListener('scroll', this.fangdou(this.scrollHandler,100),false)
    // },
    mounted(){
        console.log('aboutMe中的mounted')
        console.log("aboutme中的this.$refs",this.$refs)
        this.$refs.slide.runInv();//执行ref中有slide的方法  这里是setItvol方法 事件循环 
    },
    components:{
        Slideshow,
        Education,
        Experience
    }
}
</script>
<style scoped>
.outer,div,section,h2{
        margin:0;
        padding:0;
    }
    .outer{
        margin:0;
    }

    .headleft{
        font-size:2vw;
        position:absolute;
        left:8%;
        color:white;
    }
    .activeHeader{
        top:0px;
        text-align: center;
        background-color: rgb(16, 135, 214);
        z-index:999;
    }
    .slideshow{
        width:100vw;
        height:48vw;
        background-color: blanchedalmond;
        overflow: hidden;
    }
    @media screen and (max-width: 500px) {
        .slideshow{
        width:100vw;
        height:250px;
        background-color: blanchedalmond;
        }
    }

/**侧边栏文字的样式   不妨追一个梦 */
    .tag{
        position:absolute;
        width:26vw;
        height:36vw;
        z-index: 998;
        background-color: rgb(255, 255, 255);
        left:7vw;
        border-bottom-right-radius: 25%;
        z-index: 990;
    }
    .text{
        padding-left:5vw;
        margin-top:10vw;
        font-size: 2.2rem;
    }
    .headText{
        width:100%;
        height:100%;
        text-align: center;
    }
    @media screen and (max-width:700px) {
        .tag{
        display: none;
        }
    }
    /*教育的样式 */
    .education{
        width:80vw;
        /* background-color: blanchedalmond; */
        position: relative;
        left:10%;
        top:10vh;
    }

    /*个人经历的样式 */
    .experience{
        margin-top:8%;
        width:80vw;
        /* height:25vw; */
        position: relative;/**也会脱离文档流 下边会覆盖其他的盒子 但是会保存它之前占有的位置  absolute不会 */
        top:10vh;
        left:10%;
    }

    .footer{
        position: relative;
        height:10vh;
        width:100%;
        background-color: rgb(16, 135, 214);
        margin-top:10vw;
    }
</style>