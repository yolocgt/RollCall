<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加学生信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
				       <el-form-item label="性别" prop="sex">
    				      <el-select v-model="form.sex" placeholder="请选择" class="handle-select mr10">
    	                <el-option key="1" label="男" value="man"></el-option>
    	                <el-option key="2" label="女" value="woman"></el-option>
    	            </el-select>
                </el-form-item>
                <el-form-item label="学号" prop="sno">
                    <el-input v-model="form.sno"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
				 <el-form-item label="院系名称" prop="facultyName">
    				      <el-select v-model="form.facultyName" placeholder="选择院系" class="handle-select mr10">
    	                <el-option key="1" label="软件学院" value="rj"></el-option>
    	                <el-option key="2" label="国际学院" value="gj"></el-option>
    	            </el-select>
                </el-form-item>
				 <el-form-item label="班级名称" prop="className">
    				      <el-select v-model="form.className" placeholder="选择班级" class="handle-select mr10">
    	                <el-option key="1" label="广东省" value="广东省"></el-option>
    	                <el-option key="2" label="湖南省" value="湖南省"></el-option>
    	            </el-select>
                </el-form-item>
                
                <el-form-item label="出生年月" prop="birth">
                    <el-date-picker
                    v-model="form.birth"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="登录账号" prop="account">
                    <el-input v-model.number="form.account"></el-input>
                </el-form-item>
                <el-form-item label="用户头像" prop="avatar">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>
export default {
  data: function() {
    return {
      imageUrl: "",
      form: {
        name: "",
        sex: "",
        sno: "",
        address: "",
        phone: "",
        facultyName: "",
        className: "",
        birth: "",
        account: ""
      },
      rules: {
        name: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        sno: [{ required: true, message: "请输入学号", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    };
  },
  
  methods: {
    onSubmit(formName) {
      const _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post(global.ApiUrl + "/admin", this.form)
            .then(function(res) {
              console.log(res);
              if (res.data.code == "y") {
                console.log("添加成功");
                _this.$message.success("管理员添加成功~");
              } else {
                console.log("添加失败。");
                _this.$message.success("管理员添加失败！");
              }
              _this.$refs[formName].resetFields();
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
