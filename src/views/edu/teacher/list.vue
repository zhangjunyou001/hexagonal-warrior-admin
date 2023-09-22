<template>
  <div class="app-container">
          <!--Search表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teachQuery.name" placeholder="Teacher Name"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teachQuery.level" clearable placeholder="Teacher Level">
          <el-option :value="1" label="Junior"/>
          <el-option :value="2" label="Senior"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Onboard Time">
        <el-date-picker
          v-model="teachQuery.begin"
          type="datetime"
          placeholder="Start Time"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teachQuery.end"
          type="datetime"
          placeholder="End Time"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">Search</el-button>
      <el-button type="default" @click="resetData()">Reset</el-button>
    </el-form>


      <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="Sequense No"
        width="150"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="Name" width="80" />

      <el-table-column label="Level" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'Junior':'Senior' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="Introduction" />

      <el-table-column prop="gmtCreate" label="Onboard Time" width="160"/>

      <el-table-column prop="sort" label="Sort" width="60" />

      <el-table-column label="Action" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">Edit</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

       <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
  </template>

<script>
import teacher from '@/api/edu/teacher'

export default {
  //代码核心方法

  data(){   //定义变量和函数值
    return{
      list: null,//Search之后接口放回的集合
      page: 1,//开始页
      limit: 10,//每页记录数
      total: 10,//总记录数
      teachQuery: {},//Search条件    
    }
  },

  created() {  //页面渲染之前执行，一般调用methods中的方法
    this.getList()
  },
  methods: {  //创建具体的方法，调用teacher.js定义的方法
    getList(page=1){
      this.page=page
      teacher.getTeacherListPage(this.page,this.limit,this.teachQuery)
          .then(response => {
            //请求成功，response接口返回的数据
            this.list=response.data.rows
            console.log(this.list)    //返回数据集合
            this.total=response.data.total
            console.log(this.total)   //总记录数
          })
          .catch(error => {
            console.log(error)
          })//请求失败
    },
    resetData(){//Reset的方法
      //双向绑定输入框的数据Reset
      this.teachQuery = {}
      this.getList()
    },
removeDataById(id) {
            this.$confirm('Persist the change?', 'Alert', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {  //点击Yes，执行then方法
                //调用删除的方法
                teacher.deleteTeacherId(id)
                    .then(response =>{//删除成功
                    //Alert信息
                    this.$message({
                        type: 'success',
                        message: 'Success'
                    });
                    //回到列表页面
                    this.getList()
                })
            }) //点击取消，执行catch方法
        }
  }
}
</script>