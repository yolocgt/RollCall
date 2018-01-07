<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加系统账号</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px" @keydown.13.native="onSubmit('form')">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="form.account" autofocus ref="inputRef"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePsw">
                    <el-input type="password" v-model="form.rePsw"></el-input>
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
    // 验证输入密码
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
    // 验证再次输入密码
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
        account: "",
        name: "",
        password: "",
        rePsw: ""
      },
      rules: {
        account: [{ required: true, message: "请输入用户账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        // password: [{ validator: validatePsw, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        rePsw: [{ required: true, validator: validatePsw2, trigger: "blur" }]
      }
    };
  },

  created: function() {
    const _this = this;
    // window.onkeydown = function(event) {
    //   console.log(event);
    //   if (event.keyCode == "13") {

    //   }
    // };
  },
  mounted:function(){
    // 聚焦到第一个输入框
    this.$refs.inputRef.$el.children[0].focus();
  },
  methods: {
    // 提交表单
    onSubmit(formName) {
      const _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post(global.ApiUrl + "/admin", this.form)
            .then(function(res) {
              if (res.data.code == "y") {
                _this.$message.success("添加成功~");
              } else {
                _this.$message.success("添加失败！");
              }
              // 聚焦到第一个输入框
              _this.$refs.inputRef.$el.children[0].focus();
              // 清空表单输入框
              _this.$refs[formName].resetFields();
            });
        }
      });
    },
    // 重置表单
    resetSubmit(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
