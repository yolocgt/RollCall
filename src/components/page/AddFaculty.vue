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
                    <el-input v-model="form.facultyName"></el-input>
                </el-form-item>
                <el-form-item label="系主任" prop="director">
                    <el-input v-model="form.director"></el-input>
                </el-form-item>
                <!-- <el-form-item label="" prop="">
                    <el-input v-model.number="form.phone"></el-input>
                </el-form-item> -->
                
                <el-form-item label="联系电话" prop="phone" :rules="[ { required: true, message: '请输入电话'}, { type: 'number', message: '电话必须为数字值'} ]" >
                  <el-input type="phone" v-model.number="form.phone" auto-complete="off"></el-input>
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
    return {
      form: {
        facultyName: "",
        director: "",
        phone: "",
      },
      rules: {
        facultyName: [{ required: true, message: "请输入院系名称", trigger: "blur" }],
        director: [{ required: true, message: "请输入主任名字", trigger: "blur" }],
        // phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
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
