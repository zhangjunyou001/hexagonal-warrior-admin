<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
      <el-form-item label="Username" prop="username">
        <el-input v-model="user.username"/>
      </el-form-item>
      <el-form-item label="User Nickname">
        <el-input v-model="user.nickName"/>
      </el-form-item>
     
      <el-form-item v-if="!user.id" label="Password" prop="password">
        <el-input v-model="user.password"/>
      </el-form-item>


      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import userApi from '@/api/acl/user'

const defaultForm = {
  username: '',
  nickName: '',
  password: ''
}

const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('Password has to be more than 6 digits'))
  } else {
    callback()
  }
}

export default {
  data() {
    return {
      user: defaultForm,
      saveBtnDisabled: false, // Save按钮是否禁用,
      validateRules: {
        username: [{ required: true, trigger: 'blur', message: 'Username cannot be empty' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },

  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.init()
  },

  methods: {

    // 表单初始化
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.user = { ...defaultForm }
      }
    },

    saveOrUpdate() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          if (!this.user.id) {
            this.saveData()
          } else {
            this.updateData()
          }
        }
      })
    },

    // 新增讲师
    saveData() {
      userApi.save(this.user).then(response => {
        // debugger
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/user/list' })
        }
      })
    },

    // 根据id更新记录
    updateData() {
      // teacher数据的获取
      userApi.updateById(this.user).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/user/list' })
        }
      })
    },

    // 根据idSearch记录
    fetchDataById(id) {
      userApi.getById(id).then(response => {
        this.user = response.data.item
      })
    }

  }
}
</script>
