<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 学生信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{status}}学生信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">

                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" ref="inputRef"></el-input>
                </el-form-item>
				       <el-form-item label="性别" prop="sex">
    				      <el-select v-model="form.sex" placeholder="请选择" class="handle-select mr10">
    	                <el-option key="1" label="男" value="男"></el-option>
    	                <el-option key="2" label="女" value="女"></el-option>
    	            </el-select>
                </el-form-item>
                <el-form-item label="学号" prop="id">
                    <el-input v-model.number="form.id"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
				 <!-- <el-form-item label="院系名称" prop="faculty">
    				      <el-select v-model="form.faculty" placeholder="选择院系" class="handle-select mr10">
    	                <el-option
                        v-for="f in faculties"
                        :key="f._id"
                        :label="f.facultyName"
                        :value="f._id"></el-option>
    	            </el-select>
                </el-form-item> -->
				 <el-form-item label="班级名称" prop="classInfo">
    				      <el-select v-model="form.classInfo" placeholder="选择班级" class="handle-select mr10">
    	                <el-option
                        v-for="c in classInfos"
                        :key="c._id"
                        :label="c.className"
                        :value="c._id"></el-option>
    	            </el-select>
                </el-form-item>

                <el-form-item label="出生年月" prop="birth">
                    <el-date-picker
                    v-model="form.birth"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
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

<script>
import { ApiClassInfo, ApiStudent } from "../../service/apis";
import login from "../../service/api_login";

export default {
  data: function() {
    // 验证是否存在
    var isExist = (rule, value, callback) => {
      if (this.form.id != "" && this.form.id != this.o_id) {
        login.exists(this.form.id, "student", res => {
          console.log(res);
          if (res.data && res.data.count > 0) {
            callback(new Error("该学号已存在，请重新输入"));
          } else callback();
        });
      } else callback();
    };
    return {
      imageUrl: "",
      faculties: "",
      classInfos: "",
      status: "添加",
      form: {
        name: "",
        sex: "",
        id: "",
        address: "",
        phone: "",
        // faculty: "",
        classInfo: null,
        birth: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入学生姓名" },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
            message: "请输入正确的名字"
          }
        ],
        sex: [{ required: true, message: "请选择性别" }],
        id: [
          { required: true, message: "请输入学号" },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "请输入正确的手机号"
          },
          {
            validator: isExist,
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号" },
          {
            pattern: /^[1][3578][0-9]{9}$/,
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
      ApiStudent.getDataById(this.id, res => {
        console.log(res);
        this.o_id = res.data.id;
        this.form = res.data;
      });
    }
    // 学院下拉框数据
    // ApiFaculty.getData({},res => {
    //   this.faculties = res.data;
    // });
    // 班级下拉框数据
    ApiClassInfo.getData({}, res => {
      // console.log(res);
      this.classInfos = res.data;
    });
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.form.classInfo) {
            delete this.form.classInfo;
          }
          console.log(this.form);
          // return;
          // 修改
          if (this.id) {
            console.log("修改");
            ApiStudent.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("学生修改成功~");
              } else {
                this.$message.error("学生修改失败！");
              }
            });
          } else {
            // 新增
            ApiStudent.save(this.form, res => {
              console.log(res);
              if (res.status == "y") {
                this.$message.success("学生添加成功~");
              } else {
                this.$message.error("学生添加失败！");
              }
            });
          }
          this.$router.push({ name: "studentManage" });
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