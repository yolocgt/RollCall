<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 院系班级管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加院系信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="院系名称" prop="account">
                    <el-input v-model="form.facultyName"></el-input>
                </el-form-item>
                <el-form-item label="系主任" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
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
export default {
  data: function() {
    var validatePsw = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else { 
        if (this.rules.password !== "") {
          this.$refs.form.validateField("rePsw");
        }
        callback();
      } 
    };
    var validatePsw2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        facultyName: "",
        name: "",
        password: "",
        rePsw: ""
      },
      rules: {
        facultyName: [{ required: true, message: "请输入院系名称", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        // password: [{ validator: validatePsw, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        rePsw: [{ required: true, validator: validatePsw2, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          self.$axios
            .post(global.ApiUrl + "/admin", this.form)
            .then(function(res) {
              console.log(res);
              if (res.data.code == "y") {
                console.log("添加成功");
                self.$message.success("管理员添加成功~");
              } else {
                console.log("添加失败。");
                self.$message.success("管理员添加失败！");
              }
              self.$refs[formName].resetFields();
            });
          //   this.form.account = "";
          //   this.form.name = "";
          //   this.form.password = "";
          //   this.form.rePsw = "";
        }
      });
    },
    resetSubmit(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
