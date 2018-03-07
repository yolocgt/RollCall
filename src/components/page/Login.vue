<template>
  <div class="login-wrap">
    <div class="ms-title">学生点名管理系统</div>
    <div class="ms-login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select v-model="loginForm.role" placeholder="请选择角色" @change="roleChange()">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 如登录失败请尝试切换用户角色</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import ApiLogin from "../../service/api_login";
import crypto from "crypto-js";
export default {
  data: function () {
    return {
      isLogin: false,
      role: "",
      submitUrl: "",
      loginForm: {
        // username: "cgt",
        // password: "adminn",
        // role: "admin"
        username: "",
        password: "",
        role: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择用户角色", trigger: "change" }]
      },
      options: [
        // {
        //   value: "student",
        //   label: "学生"
        // },
        {
          value: "teacher",
          label: "教师"
        },
        // {
        //   value: "headteacher",
        //   label: "辅导员"
        // },
        {
          value: "admin",
          label: "管理员"
        }
      ]
    };
  },
  created: function () {
    this.isLogin = this.$cookie.get("username") != null ? true : false;
    console.log(this.isLogin);
    // 已登录
    if (this.isLogin) {
      this.$router.push("/readme");
    }
  },
  computed: {},
  methods: {
    roleChange() {
      console.log(this.loginForm.role);
    },
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          // 登录
          // md5加密
          this.loginForm.password = crypto.MD5(this.loginForm.password).toString();
          ApiLogin.login(this.loginForm, this.loginForm.role, res => {
            console.log(res);
            // 登录成功
            if (res.status == "y") {
              localStorage.setItem("name", res.name);
              this.$cookie.set("username", this.loginForm.username, 1);
              this.$cookie.set("userrole", this.loginForm.role, 1);
              this.$message({
                showClose: true,
                message: res.msg,
                type: "success"
              });
              self.$router.push("/readme");
            } else {
              //登录失败
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.ms-login .el-input {
  width: 100%;
}
.el-select {
  width: 100%;
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