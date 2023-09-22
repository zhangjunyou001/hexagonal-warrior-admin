<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Teacher Name">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="Teacher Order">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0" />
      </el-form-item>
      <el-form-item label="Teacher Level">
        <el-select v-model="teacher.level" clearable placeholder="Teacher Level">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="Junior" />
          <el-option :value="2" label="Senior" />
        </el-select>
      </el-form-item>
      <el-form-item label="Teacher Career">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="Teacher introduction">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="Teacher Avatar">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">Change Avatar</el-button>

        <!--
v-show：是否显示上传组件
:key：类似于id，如果一个页面多个图片上传控件，可以做区分
:url：后台上传的url地址
@close：关闭上传组件
        @crop-upload-success：上传成功后的回调-->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/edu/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: ""
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
      saveBtnDisabled: false // Save按钮是否禁用,
    };
  },

  created() {
    console.log("created");
    this.init();
  },

  watch: {
    //监听
    $route(to, from) {
      //路由变化方式，路由发生变化，方法就会执行
      this.init();
    }
  },

  methods: {
    close() {
      this.imagecropperShow=false,
      this.imagecropperKey=this.imagecropperKey+1
    },

    cropSuccess(data) {
      this.imagecropperShow=false
      //上传成功之后，关闭弹窗
      this.teacher.avatar=data.url,
      this.imagecropperKey=this.imagecropperKey+1
    },

    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getInfo(id);
      } else {
        this.teacher = {};
      }
    },
    //根据idSearch讲师的信息
    getInfo(id) {
      teacherApi.getTeacherInfo(id).then(Response => {
        this.teacher = Response.data.teacher;
      });
    },

    //判断是Add还是修改
    saveOrUpdate() {
      //根据teacher判断是否有id
      if (!this.teacher.id) {
        //没有id，Add
        this.saveTeacher();
      } else {
        this.updateTeacher();
      }
    },

    //修改讲师的方法
    updateTeacher() {
      teacherApi.updateTeacher(this.teacher).then(Response => {
        this.$message({
          type: "success",
          message: "Success"
        });
        //回到列表页面，路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },
    //Add讲师的方法
    saveTeacher() {
      teacherApi.addTeacher(this.teacher).then(Response => {
        //Add成功
        //Alert信息
        this.$message({
          type: "success",
          message: "Success!"
        });
        //回到列表页面，路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    }
  }
};
</script>