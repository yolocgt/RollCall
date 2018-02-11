<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 专业信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{status}}专业</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px" @keydown.13.native="onSubmit('form')">
                <el-form-item label="专业名称" prop="majorName">
                    <el-input v-model="form.majorName" autofocus ref="inputRef"></el-input>
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
import { ApiMajor } from "../../service/apis";
export default {
  data: function() {
    // 验证是否存在
    var isExist = (rule, value, callback) => {
      if (this.form.majorName != "" && this.form.majorName != this.o_majorName) {
        ApiMajor.isExist(this.form.majorName, res => {
          console.log(res);
          if (res.data && res.data.length > 0) {
            callback(new Error("该专业已存在，请重新输入"));
          } else callback();
        });
      } else callback();
    };
    return {
      status: "添加",
      form: {
        majorName: ""
      },
      rules: {
        majorName: [
          { required: true, message: "请输入专业名称", trigger: "blur" },
          {
            validator: isExist,
            trigger: "blur"
          }
        ]
      }
    };
  },

  created: function() {
    console.log(this.$route.params);
    this.id = this.$route.params.id;
    console.log(this.id);
    if (this.id) {
      this.status = "修改";
      ApiMajor.getDataById(this.id, res => {
        console.log(res);
        this.o_majorName = res.data.majorName;
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
            ApiMajor.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else {
                this.$message.error("修改失败！");
              }
            });
          } else {
            // 新增
            ApiMajor.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else {
                this.$message.error("添加失败！");
              }
              // 聚焦到第一个输入框
              // this.$refs.inputRef.$el.children[0].focus();
              // //   清空表单输入框
              // this.$refs[formName].resetFields();
            });
          }
          //   跳转管理员管理路由
          this.$router.push({ name: "managemajor" });
        }
      });
    },
    resetSubmit(form) {
      this.form.majorName = "";
      this.$refs.inputRef.$el.children[0].focus();
    }
  }
};
</script>