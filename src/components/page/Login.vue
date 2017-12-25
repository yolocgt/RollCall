<template>
    <div class="login-wrap">
        <div class="ms-title">学生点名管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="role">
                  <el-select v-model="ruleForm.role" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                  
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: "",
        role: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择用户角色", trigger: "change" }]
      },
      options: [
        {
          value: "选项1",
          label: "学生"
        },
        {
          value: "选项2",
          label: "教师"
        },
        {
          value: "选项3",
          label: "辅导员"
        },
        {
          value: "选项4",
          label: "管理员"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          // 登录
          self.$axios
            .post(global.ApiUrl + "/login", this.ruleForm)
            .then(function(res) {
              if (res.status == "y") {
                // this.$message({
                //   showClose: true,
                //   message: res.msg,
                //   type: "success"
                // });
                localStorage.setItem("ms_username", self.ruleForm.username);
                self.$router.push("/readme");
              } else {
                alert("登录失败");
                return;
              }
            });
          // if (self.ruleForm.username == 1 && self.ruleForm.password == 1) {
          //   localStorage.setItem("ms_username", self.ruleForm.username);
          //   self.$router.push("/readme");
          // } else {
          //   alert("登录失败");
          //   return;
          // }
        } else {
          alert("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
/* .el-form-item:nth-of-type(3){
    margin-bottom: 10px;
} */
/* input{
    width: 100%!important;    
} */
.el-select {
  width: 100% !important;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 220px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>