<template>
    <div class="outer">
        <header :class="{'activeHeader':activeShow}">
            <div class="headleft"><i class="fa fa-bell-o" aria-hidden="true">Let's Go</i></div>
            <div class="headrightPC">
                <router-link to="/home" class="headerFont">关于我</router-link>
                <router-link to="/message" class="headerFont">用户信息</router-link>
                <router-link to="/challengejs30" class="headerFont">JS30</router-link>
                <div class="rightup blog" @click="clickblog()">前端信息</div>
            </div>
            <div class="mobile">
                <li>其他</li>
                <li><router-link to="/home" class="headerFont">关于我</router-link></li>
                <li><router-link to="/message" class="headerFont">用户信息</router-link></li>
                <li><router-link to="/challengejs30" class="headerFont">JS30</router-link></li>
                <li><div class="rightup blog" @click="clickblog()">前端信息</div></li>
            </div>
            <div class="user">
                <li>{{username}}</li>
                <!-- <li @click="modifypassword()">修改密码</li>
                <li @click="deleteuser()">清除账户</li> -->
                <li @click="log()" @onmousemove="mouseon()">{{flagname}}</li>
            </div>
            
        </header>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:"Home",
    data(){
        return{
            activeShow :true,
            lastScrollValue:0,
            username:"未登录",
            flagname:"",//用来右上角 退出登录和登录的切换
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
        },
        clickblog(){
            this.$router.push('/frontend');
        },
        modifypassword(){

        },
        log(){
            let name = sessionStorage.getItem('username');
            if(name!=null){
                sessionStorage.clear();
                this.username = "用户:null";
                this.flagname = "登录";
                this.$router.replace('/home')
            }else{
                this.$router.replace('/')
            }
        },
        deleteuser(){

        }
    },
    mounted(){
        // 注册滚动事件
        console.log('2')
        let name = sessionStorage.getItem("username");
        let privilege = sessionStorage.getItem(name);
        this.username ="用户:"+name;
        if(name!=null){
            this.flagname="退出"
        }else{
            this.flagname="登录"
        }
        console.log("Home.vue的mounted",name,privilege)//已经拿到了  每次判断都要这样取一下
        window.addEventListener('scroll', this.fangdou(this.scrollHandler,200),true)
    },
    // 离开这个页面销毁滚动条事件，不然会给每一个页面都触发
    beforeDestroy() {
        window.removeEventListener('scroll', this.fangdou(this.scrollHandler,100),false)
    },
    components:{

    }
}
</script>
<style scoped>
    .outer,header,div,headleft,headrightPC{
        margin:0;
        padding:0;
        user-select: none;;
    }
    .outer{
        margin:0;
    }
    .outer .headleft:hover{
        color:thistle
    }
    .outer .headrightPC{
        margin-left: 30vw;
    }
    .outer .mobile,.user{
        list-style: none;;
        height: 6.5vw;/*高度和头栏的高度相等 */
        background-color: rgb(16, 135, 214);;
        overflow: hidden;
        font-size: 1.4rem;
        color: white;
        transition:all 0.5s;
    }
    .outer .user li{
        height:6.5vw;
        cursor: pointer;
    }
    .user:hover{
        height:13vw;/*user下面有几个菜单  这里需要6.5*n */
    }
    .mobile:hover{
        height:32.5vw;
    }
    .outer li{
        background-color: rgb(16, 135, 214);
    }
    /*右侧 下拉框和用户名的格式 */
    .outer .headrightPC .rightup{
        margin-left: 3vw;
        width:  7vw;
        height: 5vw;
        font-size: 1.4vw;
        color:white;
        display: inline-block;/*当前盒子里的块级元素行级显示  在行级里还是块级的 */
    }

    .outer .user{
        position: absolute;
        right:7vw;
        top:0;
    }
    .outer .mobile{
        position: absolute;
        top:0;
        right:22vw;
    }

    .outer .headrightPC .headerFont{
        margin-left: 5vw;
        color: white;
        user-select: none;
        text-decoration: none;
        font-size: 1.4vw;
    }
    .outer .mobile .headerFont{
        color: white;
        user-select: none;
        text-decoration: none;
        font-size: 1.4vw;
    }

    .outer .headrightPC .headerFont:hover{
        color:thistle
    }
    .outer .headleft{
        font-size:2vw;
        position:absolute;
        left:8%;
        color:white;
    }
    .outer .headrightPC .blog:hover{
        color:thistle
    }
    .outer .headrightPC .blog{
        cursor: pointer;
    }
   
    header{
        position: fixed;
        top:-10vw;/*隐藏 */
        width:100vw;
        height:6.5vw;
        background-color: rgb(16, 135, 214);;
        line-height: 6.5vw;
        transition: top 0.2s;
        z-index:999;
    }
    .activeHeader{
        top:0px;
        text-align: center;
        background-color: rgb(16, 135, 214);
        z-index:999;
    }   
    .height{
        height:1000px;
    }
    /*小于500执行下面样式 */
    .mobile{
            display: none;
    }  
    @media screen and (max-width:741px) {
        .headrightPC{
            display: none;
        }
        .mobile{
            display:unset;/*还原 */
        }
    }
    
</style>