<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{status}}系统账号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="form-box">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" @keydown.13.native="onSubmit('form')">
        <el-form-item label="账号" prop="id">
          <!-- <el-input v-model="form.id" autofocus ref="inputRef" @blur="isExists"></el-input> -->
          <el-input v-model.trim="form.id" autofocus ref="inputRef"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">{{status}}</el-button>
          <el-button @click="resetSubmit('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import { ApiAdmin } from "../../service/apis";
import crypto from "crypto-js";
import login from "../../service/api_login";
export default {
  data: function () {
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
      } else callback();
    };
    // 验证是否存在
    var isExist = (rule, value, callback) => {
      if (this.form.id != "" && this.form.id != this.o_id) {
        login.exists(this.form.id, this.$cookie.get("userrole"), res => {
          // console.log(res);
          if (res.data && res.data.length > 0) {
            callback(new Error("该账号已存在，请重新输入"));
          } else callback();
        });
      } else callback();
    };

    return {
      id: "",
      status: "添加",
      form: {
        id: "",
        name: ""
      },
      rules: {
        id: [
          {
            required: true,
            message: "请输入用户账号",
            trigger: "blur"
          },
          {
            validator: isExist,
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
            message: "请输入正确的名字"
          }
        ],
        // password: [{ validator: validatePsw, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "密码长度至少6个字符" },
          {
            pattern: /^[a-zA-Z][0-9a-zA-Z_]{3,17}$/,
            message: "以字母开头，只能包含字符、数字和下划线"
          }
        ],
        rePsw: [{ required: true, validator: validatePsw2, trigger: "blur" }]
      }
    };
  },

  created: function () {
    // window.onkeydown = function(event) {
    //   console.log(event);
    //   if (event.keyCode == "13") {
    //     console.log('按下Enter');
    //   }
    // };
    console.log(this.$route);
    this.aid = this.$route.query.aid;
    console.log(this.aid);
    if (this.aid) {
      this.status = "修改";
      ApiAdmin.getDataById(this.aid, res => {
        console.log(res);
        this.o_id = res.data.id;
        this.form = res.data;
      });
    }
  },
  mounted: function () {
    // 聚焦到第一个输入框
    this.$refs.inputRef.$el.children[0].focus();
  },
  methods: {
    isExists() {
      console.log(this.form.id);
      if (this.form.id.trim() != "") {
        login.exists(this.form.id, this.$cookie.get("userrole"), res => {
          console.log(res);
          if (res.data && res.data.length > 0) {
            this.$message.error("用户已存在");
          }
        });
      }
    },
    // 提交表单
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改
          if (this.aid) {
            console.log("修改");
            ApiAdmin.update(this.aid, this.form, res => {
              if (res.status == "y") {
                this.$message.success("管理员修改成功~");
              } else {
                this.$message.error("管理员修改失败！");
              }
            });
          } else {
            // 新增
            ApiAdmin.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("管理员添加成功~");
              } else {
                this.$message.error("管理员添加失败！");
              }
              // 聚焦到第一个输入框
              // this.$refs.inputRef.$el.children[0].focus();
              // 清空表单输入框
              // this.$refs[formName].resetFields();
              // 跳转管理员管理路由
            });
          }
          this.$router.push({ name: "adminManage" });
        }
      });
    },
    // 重置表单
    resetSubmit(formName) {
      this.$refs[formName].resetFields();
      this.$refs.inputRef.$el.children[0].focus();
    }
  }
};
</script>
