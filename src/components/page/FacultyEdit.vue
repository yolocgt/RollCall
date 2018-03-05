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
                <el-form-item label="院系名称" prop="facultyName">
                    <el-input v-model.trim="form.facultyName" autofocus ref="inputRef"></el-input>
                </el-form-item>
                <el-form-item label="系主任" prop="director">
                    <el-input v-model="form.director"></el-input>
                </el-form-item>

                <!-- <el-form-item label="联系电话" prop="phone" :rules="[ { required: true, message: '请输入电话'}, { type: 'number', message: '电话必须为数字值'} ]" > -->
                <el-form-item label="联系电话" prop="phone" >
                  <el-input type="phone" v-model="form.phone" auto-complete="off"></el-input>
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
import { ApiFaculty } from "../../service/apis";
// import ApiCommon from "../../service/api_common";
export default {
  data: function() {
    // 验证是否存在
    var isExist = (rule, value, callback) => {
      if (
        this.form.facultyName.trim() != "" &&
        this.form.facultyName != this.o_facultyName
      ) {
        ApiFaculty.isExist(this.form.facultyName, res => {
          console.log(res);
          if (res.data && res.data.length > 0) {
            callback(new Error("该院系已存在，请重新输入"));
          } else callback();
        });
      } else callback();
    };
    return {
      status: "添加",
      form: {
        facultyName: "",
        director: "",
        phone: ""
      },
      rules: {
        facultyName: [
          { required: true, message: "请输入院系名称", trigger: "blur" },
          { validator: isExist, trigger: "blur" }
        ],
        director: [
          { required: true, message: "请输入主任名字", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: "请输入正确的姓名"
          }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请输入正确的手机号"
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
      ApiFaculty.getDataById(this.id, res => {
        console.log(res);
        this.o_facultyName = res.data.facultyName;
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
            ApiFaculty.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else {
                this.$message.error("修改失败！");
              }
            });
          } else {
            // 新增
            ApiFaculty.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else {
                this.$message.error("添加失败！");
              }
            });
          }
          this.$router.push({ name: "facultyManage" });
        }
      });
    },
    resetSubmit(formName) {
      this.$refs[formName].resetFields();
      this.$refs.inputRef.$el.children[0].focus();
    }
  }
};
</script>
