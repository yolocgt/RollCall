<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{status}}系统账号</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px" @keydown.13.native="onSubmit('form')">
                <el-form-item label="账号" prop="id">
                    <el-input v-model="form.id" autofocus ref="inputRef"></el-input>
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
import { ApiAdmin } from "../../service/apis";
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
      id: "",
      status: "添加",
      form: {
        id: "",
        name: "",
        password: "",
        rePsw: ""
      },
      rules: {
        id: [{ required: true, message: "请输入用户账号", trigger: "blur" }],
        name: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: "用户名只能为中文"
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

  created: function() {
    // window.onkeydown = function(event) {
    //   console.log(event);
    //   if (event.keyCode == "13") {
    //     console.log('按下Enter');
    //   }
    // };
    console.log(this.$route.params);
    this.id = this.$route.params.id;
    console.log(this.id);
    if (this.id) {
      this.status = "修改";
      ApiAdmin.getDataById(this.id, res => {
        console.log(res);
        this.form = res.data;
      });
    }
  },
  mounted: function() {
    // 聚焦到第一个输入框
    this.$refs.inputRef.$el.children[0].focus();
  },
  methods: {
    // 提交表单
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改
          if (this.id) {
            console.log("修改");
            ApiAdmin.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else {
                this.$message.error("修改失败！");
              }
            });
          } else {
            // 新增
            ApiAdmin.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else {
                this.$message.error("添加失败！");
              }
              // 聚焦到第一个输入框
              // this.$refs.inputRef.$el.children[0].focus();
              // 清空表单输入框
              // this.$refs[formName].resetFields();
              // 跳转管理员管理路由
            });
          }
          this.$router.push({ name: "manageadmin" });
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
