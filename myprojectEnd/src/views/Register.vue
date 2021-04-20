<template>
    <div class="outer">
        <div class="message">
            <div class="input">
                <h2>注册中心</h2>
                <div class="in">用户账号:<input type="text" v-model="form.username" placeholder="注册用户名"></div>
                <div class="in">用户密码:<input type="password" v-model="form.password" placeholder="密码"></div>
                <div class="in">确认密码:<input type="password" v-model="confirmpassword" placeholder="确认密码"></div>
            </div>
            <div class="submit">
                <button @click="submit()">提交</button>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:"Surper",
    data(){
        return{
            form:{
                username:"adsf",
                password:"asdf",
                createtime:"",//前端没做处理 后端直接插入数据了
                lastviewtime:""//前端没做处理 后端直接插入数据了
            },
            confirmpassword:"asdf"
        }
    },
    methods:{
        submit(){
            if(this.form.password===this.confirmpassword){
                this.postRequest('/register',this.form).then(resp=>{
                    if(resp){
                        console.log(resp.data)
                        if(resp.data.code==200){//这里是后端发回来的数据的验证消息 可以判断跳转  //404代表没有访问到 //888代表是管理员
                            this.$router.replace('/')
                        }
                    }else{
                        return false;
                    }
                })
            }else{
                alert("两次密码输入不正确")
                // this.form.username="";
                this.form.password="";
                this.confirmpassword="";
            }
        }
        //现查询有没有这个用户名
        //再对数据库进行insert
    }
}
</script>
<style scoped>
    .outer{
        width:100%;
        height: 100vh;
        position: relative;
    }
    .message{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate3d(-50%,-50%,0);
        width:300px;
        height:400px;
        background-color: burlywood;
        border-radius: 10%;
    }
    .input{
        width:58%;
        height:50%;
        /* background-color: cadetblue; */
        margin:auto;
        margin-top:23%;
    }
    .input .in{
        /* background-color: chocolate; */
    }
    .input input{
        width:100%
    }
    .submit{
        margin:auto;
        margin-top:10%;
        width:40%;
        height:10%; 
    }
    .submit button{
        width:100%;
    }
</style>