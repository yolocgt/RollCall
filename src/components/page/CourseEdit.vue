<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 课程信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{status}}课程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px" @keydown.13.native="onSubmit('form')">
                <el-form-item label="课程名称" prop="courseName">
                    <el-input v-model.trim="form.courseName" autofocus ref="inputRef"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">{{status}}</el-button>
                    <el-button @click="resetSubmit('form')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<style scoped>
.el-input {
  width: 220px;
}
</style>
<script>
import { ApiCourse } from "../../service/apis";
export default {
  data: function() {
    // 验证是否存在
    var isExist = (rule, value, callback) => {
      if (
        this.form.courseName != "" &&
        this.form.courseName != this.o_courseName
      ) {
        ApiCourse.isExist(this.form.courseName, res => {
          console.log(res);
          if (res.data && res.data.length > 0) {
            callback(new Error("该课程已存在，请重新输入"));
          } else callback();
        });
      } else callback();
    };
    return {
      status: "添加",
      form: {
        courseName: ""
      },
      rules: {
        courseName: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          {
            validator: isExist,
            trigger: "blur"
          }
        ]
      }
    };
  },

  created: function() {
    console.log(this.$route.query);
    this.id = this.$route.query.id;
    console.log(this.id);
    if (this.id) {
      this.status = "修改";
      ApiCourse.getDataById(this.id, res => {
        console.log(res);
        this.o_courseName = res.data.courseName;
        this.form = res.data;
      });
    }
  },

  mounted: function() {
    this.$refs.inputRef.$el.children[0].focus();
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改
          if (this.id) {
            console.log("修改");
            ApiCourse.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else {
                this.$message.error("修改失败！");
              }
            });
          } else {
            // 新增
            ApiCourse.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else {
                this.$message.error("添加失败！");
              }
            });
          }
          this.$router.push({ name: "courseManage" });
        }
      });
    },
    resetSubmit(form) {
      this.form.courseName = "";
      this.$refs.inputRef.$el.children[0].focus();
    }
  }
};
</script>