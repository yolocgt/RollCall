<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加登录密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="原密码" prop="oldPsw">
                    <el-input type="password" v-model="form.oldPsw"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPsw">
                    <el-input type="password" v-model="form.newPsw"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">修改</el-button>
                    <el-button @click="resetForm('form')">取消</el-button>
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
        oldPsw: "",
        newPsw: ""
      },
      rules: {
        oldPsw: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPsw: [{ required: true, message: "请输入旧密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      const self = this;
      self.$refs[form].validate(valid => {
        if (valid) {
          this.$message.success(`密码已成功修改为[${this.form.newPsw}]！请妥善保管`);
          this.$refs[form].resetFields();
        }
      });
    },
    resetForm(form){
        this.$refs[form].resetFields();
    }
  }
};
</script>
