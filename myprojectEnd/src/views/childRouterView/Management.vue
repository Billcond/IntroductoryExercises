<template>
  <div class="outerManagement">
    <div class="elementTable">
      <h2>用户信息管理</h2>
      <el-table :data="data" style="width: 100%;height:70vh">
        <el-table-column label="创建日期" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.createtime.slice(0,19).replace('T',' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.username }}</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="密码" width="100">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.password }}</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="权限等级" width="80">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.privilege }}</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="最后访问时间" width="200">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.lastviewtime.slice(0,19).replace('T',' ') }}</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
              <div slot="reference">
                <el-button type="info" size="mini" @click="dialogClick(scope.row.username)">编 辑</el-button>
                <el-button type="danger" size="mini" @click="deleteInfo(scope.row.username)">删 除</el-button>
                <el-dialog 
               
                  title="修改"
                  :visible="dialogVisible"
                  width="50%"
                  :append-to-body="true">
                  <!--在这里插入内容 也就是dialog中的内容  然后下面的确认就会到对应的函数中去执行对应的数据-->
                    <el-input  v-model="updatemsg.password"  placeholder="修改的密码"></el-input>
                    <el-input  v-model="updatemsg.privilege"  placeholder="修改的权限"></el-input>
                  <span slot="footer" class="dialog-footer">
                    <el-button class="modify" @click="dialogVisible = false">取 消</el-button>
                    <el-button class="modify" type="primary" @click="updateMsg()">确 定</el-button>
                  </span>
                </el-dialog> 
              </div>
          </template>
            
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :current-page="currentPage"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "Management",
  data() {
    return {
      originalData:[],//原始传回来的数据
      data:[],//将来在上面表中显示的数据
      total:11,
      dialogVisible:false,
      currentPage:1,
      pagesize:8,
      keyName:"",
      updatemsg:{
        username:"",
        password:"",
        privilege:""
      }
    };
  },
  methods: {
    handleCurrentChange(val){
      //val是页数  从1开始
      this.data = this.originalData.slice(val*8-8,val*8)
    },
    dialogClick(val){
      this.dialogVisible=true;
      this.keyName = val;
    },
    updateMsg(){
      //可以访问到
      this.updatemsg.username = this.keyName;//将获取到的当前的名字赋值
      console.log('更行的值',this.updatemsg)
      
      //在这里进行更新
      this.postRequest('/update',this.updatemsg).then(resp=>{
                    if(resp){
                        console.log(resp.data)
                        this.$router.go(0)
                    }else{
                        return false;
                    }
        })
      this.dialogVisible = false;
            //更行完之后请求数据   这样是解决办法之一 但是又页面刷新的东西  用户体验不好
      //this.$router.go(0)//更新完之后再刷新一下  但是这里实际上修改成功后再刷新页面  部署的时候更新不成功  问题就再这里
      // 将这个代码放入if(resp) 下面就没问题了
    },
    deleteInfo(val){//这个val是当前的  键值  
      alert("是否删除")
      this.deleteRequest("/delete",val);//删除当前对应的数据  删除之后  更新页面
      this.$router.go(0)
      //删除请求  先删除本地的数据  再删除数据库的内容
    }
  },
  mounted(){
        console.log('adfasdf不起作用 management中的')
        this.getRequest('/allMessage').then((resp)=>{
          if(resp){
              this.originalData = resp.data;
              this.data=this.originalData.slice(0,this.pagesize);//获取前10个用于显示
          }else{
              return false;
          }
        })
    }
};
</script>
<style scoped>
.outerManagement {
  margin: 0;
  padding: 0;
  margin-top: 25vh;
  width: 80vw;
  height: 40vw;
  margin-left: 10%;
  /* background-color: rgb(223, 206, 206); */
  
}
.elementTable {
  margin:0 auto;
  width: 100%;
  height: 80%;
  margin-top:-100px;

  /* background-color: blanchedalmond; */
}
el-table{
    margin-top:0%;
    /* background-color: blanchedalmond; */
}


</style>