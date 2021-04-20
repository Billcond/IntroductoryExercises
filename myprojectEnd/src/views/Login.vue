<template>
    <div class="background">
        <div class="login">
            <div class = "profile">
                <img src="../image/profile.jpeg" alt="头像">
            </div>
            <h5>小项目锦集</h5>
            <div class="loginform">
                <div class="inputstyle">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <input type="text" placeholder="输入用户名"  v-model="form.username" :name="form.username">
                </div>
                <div class = "inputstyle">
                    <i class="fa fa-lock" aria-hidden="true" ></i>
                    <input type="password" placeholder="输入密码"  v-model="form.password" :name="form.password" @keyup.enter="submit()">
                </div>
                <div class= "register">
                    <div class="style">
                        <div class="stylein">
                            <input type="checkbox" :checked="remeberme" v-model="remeberme" id="item" ><label for="item">记住我</label>
                        </div>   
                    </div>
                    <div class="registerButton">
                        <span @click="submitRegister()">注册</span>
                    </div>
                </div>
                <div class = "submit">
                    <button @click="submit()" >登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import proxy from "../../vue.config"
export default {
    name:"Login",
    data(){
        return{
            form:{
                username:"",
                password:"",
            },
            remeberme:true,
        } 
    },
    methods:{
        submit(){
            // console.log(this.form.username,this.form.password);
            if(this.form.username&&this.form.password){
                this.postRequest('/login',this.form).then(resp=>{
                    if(resp){
                        if(this.remeberme){
                            let key = proxy.devServer.proxy['/'].target.toString();
                            console.log("存入的键",key);
                            localStorage.setItem(key,this.form.username);
                            localStorage.setItem(this.form.username,this.form.password)
                        }else{
                            localStorage.clear();
                        }
                        console.log(resp.data,this.form.username,'aaaaaaaaaaaaaaaaaaa')
                        if(resp.data.code==200){//这里是后端发回来的数据的验证消息 可以判断跳转  //404代表没有访问到 //888代表是管理员
                            sessionStorage.setItem('username',this.form.username);
                            sessionStorage.setItem(this.form.username,resp.data.privilege);
                            //将登录信息存储在sessionStorage中
                            this.$router.replace('/home')
                        }else if(resp.data.code==888){
                            sessionStorage.setItem('username',this.form.username);
                            sessionStorage.setItem(this.form.username,resp.data.privilege);
                            this.$router.replace('/message')
                        }else{
                            //说明用户名啥的不正确  清空输入的内容  
                            //就算正确请求 服务器有响应  但是内容不正确 也会被前端的拦截器拦截  导致这里没有消息
                        }
                    }else{
                        //其他的都在这里  即使有响应了  拦截器页会拦截在这里
                        this.form.username = "";
                        this.form.password = "";
                        return false;
                    }
                })
            }
            else{
                alert("请输入用户名或密码")
            }
        },
        submitRegister(){
            this.$router.push('/register')
        },
    },
    mounted(){
        // console.log(proxy.devServer.proxy['/'].target)  得到请求代理的地址  将 它存入LocalStorge中
        let key = localStorage.getItem(proxy.devServer.proxy['/'].target.toString())
        console.log("登录页面的mounted",key)
        if(key){
            this.form.username = localStorage.getItem(key);
            this.form.password = localStorage.getItem(this.form.username)
        }
    }
}
</script>

<style scoped>
    .background{
        margin:0;
        padding:0;
        height:100vh;
        font-size: 100%;
        background: linear-gradient(#14c7c7,#e6edf3);
        background-image: url("../image/LogIn.jpg");
        background-size:cover;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .login{
        width:450px;
        height:450px;
        margin:0;/*这里设置有空白的时候  上面背景颜色会跟着走  这里使用定位是心啊居中吧*/
        background-color: rgba(255, 255, 255, 0.315);
        border-radius: 10%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .profile {
        margin:0;
        box-shadow:0 0 0 6px rgba(0, 0, 0, 0.24);
        height:100px;
        width:100px;
        border-radius: 50%;
        overflow: hidden;
    }
    .profile img{
        max-width: 100%;
        max-height: 100%;
        height:100%;
        width:100%;
        background-position: center;
    }
    h5{
        color:rgb(0, 0, 0);
        font-size: 20px
    }
    .loginform {
        box-shadow:0 0 0 2px rgba(0, 0, 0, 0.24),
        inset 0 0 0 2px rgba(0, 0, 0, 0.24);
        margin-top:2%;
        width:320px;
        height:180px;
        border:3px solid rgba(252, 249, 249, 0.534);
        background-color: rgba(255, 255, 255, 0.096);
        border-radius: 5%;
        opacity:80%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .inputstyle{/*盒子的样式 */
        margin-top:5%;
        width:200px;
        border:1px white solid;
    }
    input{
        background-color: transparent;
        border:none;/*显示时候的边框 */
        outline:none;/*点击时的边框 */
        height:25px;
    }
    input::-webkit-input-placeholder{
        color:rgb(0, 0, 0);
     }
    .submit{
        flex:1;
        width:60%;
        height:10px;
        display: flex;
    }
    .register{
        width: 100%;
        display: flex;
        height: 17%;
        margin-top:8px;
    }
    .register .registerButton{
        flex:1;
        text-align: center;
        margin-top:5px;
        font-size: 10px;
    }
    .register .registerButton span{
        cursor: pointer;
    }
    .register .registerButton span:hover{
        color: rgb(219, 200, 200);
    }
    .register .style{/*盒子 */
         flex:1;
         text-align: center;
         margin-top:5px;
         margin-left:10px;
         font-size: 10px;
    }
    .register input{
        height:10px;
    }
    .stylein{
        margin:0;
        padding:0;
        margin-left:35px;
        margin-bottom: -10px;
        width:70%;
        cursor: pointer;
    }
    .stylein input,label{
        cursor:pointer;
    }
    button{
        width:100%;/*受限于上面的宽度 */
        height:30px;
        border:none;
        outline:none;
        border:1px solid white;
        background-color: rgb(0, 0, 0);
        background-color: transparent;
        color:rgb(0, 0, 0);
        margin:0;
        padding:0;
    }
    button:hover{
        border:2px solid white;
        background-color: rgba(255, 255, 255, 0.514);
    }

</style>