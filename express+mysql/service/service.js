const mysql = require('mysql');//配置数据库信息
const configSql = require('../dao/config')
const {findAll,insertData,findSomeMessage,updateMessageById,deleteById } = require('../dao/login')
const express = require("express");
const { json } = require('express');
//上面是导入的需要的模块
const service = express();
const port = 8081;
const db = mysql.createConnection(configSql)//开启数据库连接
const path = 'login'//对应了数据库中的表

//请求所有的数据  写好了
service.get(`/allMessage`,function(req,res){
    let sql = `select * from ${path}`;
    findAll(sql,db).then((data)=>{
        res.status(200);
        res.send(data)
    }).catch((err)=>setImmediate(()=>{throw err}))        
})

//请求的接口  数据库查询验证接口 写好了
service.post("/login",function(req,res){
    let re = {
        code: "200",
        message: "登录成功",
        privilege: "",
        obj: {
            tokenHead: "Bearer",
            token: "asdfasfasdfasdfasdfadsfasdf"
        }
    
    };
    req.on('data',function(data){//解析表单返回来的数据
        let obj = JSON.parse(data);
        let targetVal = obj.username;
        console.log('targetVal',targetVal)
        let targetCol = Object.keys(obj)[0];
        let sql = `select * from ${path} where ${targetCol}=?`;
        findSomeMessage(sql,db,targetVal).then((data)=>{
            if(data.length==0){
                re.code="404";
                re.message="用户不存在"
                res.send(re)
            }else{
                console.log(data[0].username=="root")
                if(data[0].username==obj.username&&data[0].password==obj.password&&data[0].username!="root"){
                        re.code="200";
                        re.message="登录成功"
                        re.privilege = data[0].privilege;
                        res.status(re.code)
                        res.send(re)
                    }else if(data[0].username==obj.username&&data[0].password==obj.password&&data[0].username=="root"){
                        re.code = "888";
                        re.message = "进入管理页面";
                        re.privilege= data[0].privilege;
                        res.status(200)
                        res.send(re)
                    }else{
                        re.code = "404";
                        re.message = "密码错误"
                        res.send(re)
                    }
            }
            
        }).catch((err)=>setImmediate(()=>{throw err}));
    })
})

//注册的接口  数据库的插入  写好了
service.post("/register",function(req,res){
    let successful = {
        code: "200",
        message: "注册成功",
        obj: {
            tokenHead: "Bearer",
            token: "asdfasfasdfasdfasdfadsfasdf"
        }
    };
    let failure = {
        code: "404",
        message: "该账户名已存在",
        obj: {
            tokenHead: "Bearer",
            token: "asdfasfasdfasdfasdfadsfasdf"
        }
    }
    let flag = false;
    req.on('data',function(data){//解析表单返回来的数据
        let obj = JSON.parse(data);
        let targetVal = obj.username;
        console.log('targetVal',targetVal)
        let targetCol = Object.keys(obj)[0];//name
        let sql = `select * from ${path} where ${targetCol}=?`;
        findSomeMessage(sql,db,targetVal).then((data)=>{
            if(data.length==0){//说明没有找到  可以注册
                console.log('没有账户名 ，可以注册')
                console.log(obj)
                    //这儿一下都是插入的sql  这个写道里面和外边都行  异步编程？
                    sqlParams=Object.keys(obj);
                    console.log(obj)
                    arr=Array(sqlParams.length).fill('?');
                    let insertsql = `insert into ${path}(${sqlParams}) values(${arr})`;
                    let insertTargetVal = [obj.username,obj.password,new Date(),new Date()]
                    console.log('will insert',insertsql,insertTargetVal);
                    insertData(insertsql,db,insertTargetVal).then((data)=>{
                        console.log("插入成功",data);
                        res.send(successful)
                    }).catch((err)=>setImmediate(()=>{throw err}));
            }else{//说明存在
                res.send(failure)
            }
        }).catch((err)=>setImmediate(()=>{throw err}));
    })
})

//更新的接口   数据库的更行写好
service.post(`/update`, function (req, res) {
    req.on('data',function(data){//解析表单返回来的数据
        let obj = JSON.parse(data);//解析表单数据
        // let sqlParams = Object.keys(obj); 这里如果 keys和数据库的一样就可以调用
        let sqlParams = ['username','password','privilege'];//sql中对应的列明
        let targetVal = Object.values(obj).slice(1);
        let str = sqlParams.slice(1).map((item)=>{
            return item+'='+"?";
        });
        let targetName = obj.username;
        let sql = `update ${path} set ${str} where username = '${targetName}'`;
        console.log('--------------------',sql)
        let re = {
            code: "200",
            message: "修改成功",
            obj: {
                tokenHead: "Bearer",
                token: "asdfasfasdfasdfasdfadsfasdf"
            }
        };
        updateMessageById(sql,db,targetVal).then((data)=>{
            console.log(data);
            res.send(re);
        }).catch((err)=>setImmediate(()=>{throw err}))
    })
})


//删除的接口  let sql = `delete from ${form} where ${keyWord} = ?`;
service.delete('/delete',function(req,res){
    req.on('data',function(data){
        // let obj = JSON.parse(data);//这里将来返回来的就是关键字
        let targetVal = data;//这里是删除 直接索引这个关键字就好了
        console.log('targetVal',targetVal)
        let re = {
            code: "200",
            message: "删除成功",
            obj: {
                tokenHead: "Bearer",
                token: "asdfasfasdfasdfasdfadsfasdf"
            }
        };
        //这里的username  对应数据库中的 key
        let sql = `delete from ${path} where username=?`
        console.log('当前的sql',sql)
        deleteById(sql,db,targetVal).then((data)=>{
            res.send(re);
        }).catch((err)=>setImmediate(()=>{throw err}))
    })
})


function deepCopy(re,target){
    keys = Object.keys(target);
    for(let k of keys){
        if(typeof k !="object"){
            console.log(k,typeof k)
            re[k] = target[k];//这里绝对不能使用re.k  要使用re[k]  这里写re.k  就真的是re里面的k属性了  
            //同理  这里target.k也是 target中的k属性  然而这里根本没有k属性  所以这里要使用[]
        }else{
            re[k] = deepCopy(re[k],target[k]);
        }
    }
    return re;
}

service.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
