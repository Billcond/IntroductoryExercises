// 查询所有的用户 写好了
const findAll = function(sql,db){
    console.log('查询所有的数据');
    return new Promise(function(resolve,reject){
        db.query(sql, function(error, results) {
        if (error ) {
            return reject(error);
        }else{
            resolve(results);
        }
    })
    })
    // db.end();//关闭数据库
}

//插入  写好了
const insertData = function(sql,db,targetVal){
    console.log('insertData------',sql,db,targetVal)
    return new Promise(function(resolve,reject){
        db.query(sql,targetVal,(err,rst)=>{
            if(err){
                return reject(err);
            }
            resolve(rst);
        })//数据库查询并判断返回
    })
    
}

//查找某个值  写好了
function findSomeMessage (sql,db,targetVal){
    return new Promise(function(resolve,reject){
            db.query(sql,targetVal,(err,rst)=>{
                if(err){
                    return reject(err);
                }
                resolve(rst);
            })//数据库查询并判断返回
        })//解析表单数据
}


//修改  
const updateMessageById = function(sql,db,targetVal){
    return new Promise(function(resolve,reject){
        db.query(sql,targetVal,(err,rst)=>{
            if(err){
                console.log(err);
                return reject(err);
            }
            resolve(rst)
        })//数据库查询并判断返回
    })
}

//删除一般不用表单的方式提交了吧，把当前的名字记下来  然后返回给后端这个url  删除对应数据库中检索到的信息
const deleteById = function(sql,db,keyWord){
    return new Promise(function(resolve,reject){
        db.query(sql,keyWord,(err,rst)=>{
            if(err){
                console.log('删除失败',err);
                return reject(err);
            }
            resolve(rst)
        })
    })
    
}
// deleteById('t_role','36')
// updateMessageById('t_role',['vvvv','wfffff',new Date(),'1'],['code','name','gmt_create','enabled'],'36')
// let message = findSomeMessage('t_role','id','1')
// console.log('-------',message)//说明请求数据库是异步的
//  findAll()
// let sqlParams = ['code','name','gmt_create','enabled'];
// let data = ['asdf','zff',new Date(),'1'];
// let form = "t_role"
// insertData(form,data,sqlParams);
// insertData(form,data,sqlParams);
// insertData(form,data,sqlParams);//方法中并没有封装 connectend反而可以这样使用

module.exports = {findAll,insertData,findSomeMessage,updateMessageById,deleteById}


