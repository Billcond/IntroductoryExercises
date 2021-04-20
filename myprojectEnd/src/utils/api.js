import axios from 'axios'
import router from "../router"

//请求拦截器
axios.interceptors.request.use(
    config=>{
        let token = window.sessionStorage.getItem("token");
        if(token){
            config.headers.authorization = token;
        }
        return config;
    },
    error=>{
        alert(error)
    }

)

//响应拦截器
axios.interceptors.response.use(
    success=>{
        //业务逻辑错误  也就是虽然访问成功访问了 但是后端返回说你这个操作不能执行
        if(success.status&&success.status===200){
            console.log('相应拦截器',success)
            let dataCode = success.data.code;
            if(dataCode==500||dataCode==401||dataCode==403||dataCode==404){
                alert(success.data.message);
                return;
            }
            //上面的拦截器意味着不返回resp给前端

            //判断有没有这个信息
            if(success.data.message){
                alert(success.data.message);
            }
        }
        return success;//返回这个消息
    },error=>{
        if(error.response.status==504||error.response.status==404){
            alert("页面找不到")
        }else if(error.response.status==403){
            alert("权限不足")
        }else if(error.response.status==401){
            alert("未登录")
            router.replace('/');//这里就是返回要求登录
        }else if(error.response.status===500){
            alert("服务器访问不到")
        }else{
            if(error.response.status.message){
                alert(error.response.status.message)
            }else{
                alert()
                alert("未知错误",error.response.status)
            }
        }
        return ;
})

//传送json格式的post请求
let base = '';//防止以后加不必要的开头标签所以这里预留了一下

export const postRequest = (url,params)=>{
    return axios({
        method:"post",
        url:`${base}${url}`,
        data:params
    })
}

export const putRequest = (url,params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params
    })
}

export const getRequest = (url,params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params
    })
}

export const deleteRequest = (url,params)=>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params
    })
}