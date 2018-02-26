<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 排课点名管理</el-breadcrumb-item>
                <el-breadcrumb-item>考勤信息修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px" @keydown.13.native="onSubmit('form')">
                <el-form-item label="学生" prop="student">
                    <el-input disabled v-model.trim="form.student" autofocus ref="inputRef" ></el-input>
                </el-form-item>
                <el-form-item label="缺勤原因" prop="absenceReson">
					<el-select v-model="form.absenceReson" placeholder="请选择" class="handle-select mr10">
    	                <el-option key="1" label="迟到" value="迟到"></el-option>
    	                <el-option key="2" label="请假" value="请假"></el-option>
    	                <el-option key="3" label="旷课" value="旷课"></el-option>
    	            </el-select>
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
import { ApiAbsence, ApiStudent } from "../../service/apis";
import crypto from "crypto-js";
import login from "../../service/api_login";
export default {
  data: function() {
    // 验证输入密码

    return {
      id: "",
      form: {
        student: "",
        absenceReson: ""
      },
      rules: {
        // id: [
        //   {
        //     required: true,
        //     message: "请输入用户账号",
        //     trigger: "blur"
        //   },
        //   {
        //     validator: isExist,
        //     trigger: "blur"
        //   }
        // ]
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
    console.log(this.$route);
    this.id = this.$route.query.id;
    console.log(this.id);

    if (this.id) {
      ApiAbsence.getDataById(this.id, res => {
        console.log("获取到点名记录");
        console.log(res);
        this.form.absenceReson = res.data.absenceReson;
        ApiStudent.getDataById(res.data.student, data => {
          console.log(data);
          this.form.student = data.data.name;
        });
      });
    }
  },
  mounted: function() {
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
          // md5加密密码
          // this.form.password = crypto.MD5(this.form.password).toString();
          // delete this.form.password;
          // console.log(this.form);
          // 修改
          delete this.form.student;
          console.log(this.form);
          ApiAbsence.update(this.id, this.form, res => {
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
        this.$router.push({ name: "manageabsence" });
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
