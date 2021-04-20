import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Register from "../views/Register"
import Management from "../views/childRouterView/Management"
import Challengejs30 from "../views/childRouterView/Challengejs30"
import Aboutme from "../views/childRouterView/Aboutme"
import Frontend from "../views/childRouterView/Frontend"
Vue.use(VueRouter)

//关于路由的疑惑   
//突然试了一下  路由放在子路由和 非子路由都能访问到对应的页面
//放在子路由中 还会有父级的页面
//但是跳转同级的时候  就不会有父级的 页面了
const routes = [//实践说明 这下面的顺序没有关系
  {
    path:'/home',
    name:"Home",
    component:Home,
    children:[
      {
        path:'/home',
        name:'关于我',
        component:Aboutme,
      },
      {
        path:'/message',
        name:'用户信息',
        component:Management,
        beforeEnter:(to,from,next)=>{
          let name = sessionStorage.getItem("username");
          let privilege = sessionStorage.getItem(name);
          console.log("进入守卫导航",privilege)
          if(privilege>0){
            next();
          }else if(privilege==0){
            alert(name+"用户的权限等级不够")
            next('/home')
          }else{
            alert("请登录")
            next('/')
          }
        }
      },
      { 
        path:'/challengejs30',
        name:'js挑战30',
        component:Challengejs30,
      },
      {
        path:'/frontend',
        name:"Frontend",
        component:Frontend
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter:(to,from,next)=>{
      sessionStorage.clear();//相当于退出了
      next();
    }
  },
  {
    path:'/register',
    name:"Register",
    component:Register
  },
  
]

const router = new VueRouter({
  routes
})

export default router
