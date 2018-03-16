<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 排课点名管理</el-breadcrumb-item>
        <el-breadcrumb-item>考勤信息修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="form-box">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="学生" prop="student">
          <el-input disabled v-model.trim="form.student" autofocus ref="inputRef"></el-input>
        </el-form-item>
        <el-form-item label="缺勤原因" prop="absenceReson">
          <el-select v-model="form.absenceReson" placeholder="请选择" class="handle-select mr10">
            <el-option key="1" label="迟到早退" value="迟到早退"></el-option>
            <el-option key="2" label="请假" value="请假"></el-option>
            <el-option key="3" label="旷课" value="旷课"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
          <el-button @click="resetSubmit('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>


<script>
import { ApiAbsence, ApiStudent } from "../../service/apis";
import crypto from "crypto-js";
import login from "../../service/api_login";
export default {
  data: function () {
    // 验证输入密码

    return {
      id: "",
      form: {
        student: "",
        absenceReson: ""
      },
    };
  },

  created: function () {
    // window.onkeydown = function(event) {
    //   console.log(event);
    //   if (event.keyCode == "13") {
    //     console.log('按下Enter');
    //   }
    // };
    this.id = this.$route.query.id;
    console.log(this.id);

    if (this.id) {
      ApiAbsence.getDataById(this.id, res => {
        console.log("获取到点名记录");
        console.log(res);
        // 用于编辑页 修改成功跳转回来原来的点名信息
        this.rollcall = res.data.rollcall;
        console.log(this.rollcall);

        this.form.absenceReson = res.data.absenceReson;
        ApiStudent.getDataById(res.data.student, data => {
          console.log(data);
          this.form.student = data.data.name;
        });
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
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改
          delete this.form.student;
          console.log(this.form);
          ApiAbsence.update(this.id, this.form, res => {
            if (res.status == "y") {
              this.$message.success("考勤记录修改成功~");
            } else {
              this.$message.error("考勤记录修改失败！");
            }
          });
        }
        this.$router.push({ name: "absenceManage", query: { id: _this.rollcall } });
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
