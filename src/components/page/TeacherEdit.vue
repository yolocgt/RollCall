<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加教师信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">

                <el-form-item label="姓名" prop="name">
                    <el-input v-model.trim="form.name" ref="inputRef"></el-input>
                </el-form-item>
				       <el-form-item label="性别" prop="sex">
    				      <el-select v-model="form.sex" placeholder="请选择" class="handle-select mr10">
    	                <el-option key="1" label="男" value="男"></el-option>
    	                <el-option key="2" label="女" value="女"></el-option>
    	            </el-select>
                </el-form-item>
                <el-form-item label="教师号" prop="id">
                    <el-input v-model.number="form.id"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
				 <el-form-item label="院系名称" prop="faculty">
    				      <el-select v-model="form.faculty" placeholder="选择院系" class="handle-select mr10">
    	                <el-option
                        v-for="f in facultys"
                        :key="f._id"
                        :label="f.facultyName"
                        :value="f._id"></el-option>
    	            </el-select>
                </el-form-item>
                <!-- <el-form-item label="用户头像" prop="avatar">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item> -->


                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">{{status}}</el-button>
                    <el-button @click="resetSubmit('form')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<style scoped>
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
import { ApiFaculty, ApiClassInfo, ApiTeacher } from "../../service/apis";
import login from "../../service/api_login";

export default {
  data: function() {
    // 验证是否存在
    var isExist = (rule, value, callback) => {
      if (this.form.id != "" && this.form.id != this.o_id) {
        login.exists(this.form.id, "teacher", res => {
          console.log(res);
          if (res.data && res.data.length > 0) {
            callback(new Error("该教师号已存在，请重新输入"));
          } else callback();
        });
      } else callback();
    };
    return {
      imageUrl: "",
      facultys: "",
      className: "",
      status: "添加",
      form: {
        name: "",
        sex: "",
        id: "",
        phone: "",
        faculty: ""
      },
      rules: {
        name: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        id: [
          {
            required: true,
            type: "number",
            message: "请输入教师号",
            trigger: "blur"
          },
          {
            validator: isExist,
            trigger: "blur"
          }
        ],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    };
  },
  created: function() {
    console.log(this.$route.query);
    this.id = this.$route.query.id;
    console.log(this.id);
    if (this.id) {
      this.status = "修改";
      ApiTeacher.getDataById(this.id, res => {
        console.log(res);
        this.o_id = res.data.id;
        this.form = res.data;
      });
    }
    // 学院下拉框数据
    ApiFaculty.getData({},res => {
      this.facultys = res.data;
    });
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改
          if (this.id) {
            console.log("修改");
            ApiTeacher.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else {
                this.$message.error("修改失败！");
              }
            });
          } else {
            // 新增
            ApiTeacher.save(this.form, res => {
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
          this.$router.push({ name: "teacherManage" });
        }
      });
    },
    resetSubmit(formName) {
      this.$refs[formName].resetFields();
      this.$refs.inputRef.$el.children[0].focus();
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
