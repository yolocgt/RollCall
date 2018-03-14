<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{status}}教师信息</el-breadcrumb-item>
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

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">{{status}}</el-button>
                    <el-button @click="resetSubmit('form')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>


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
        faculty: null
      },
      rules: {
        name: [
          { required: true, message: "请输入教师姓名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
            message: "请输入正确的名字"
          }
        ],
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
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
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
      ApiTeacher.getDataById(this.id, res => {
        console.log(res);
        this.o_id = res.data.id;
        this.form = res.data;
      });
    }
    // 学院下拉框数据
    ApiFaculty.getData({}, res => {
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
                this.$message.success("教师修改成功~");
              } else {
                this.$message.error("教师修改失败！");
              }
            });
          } else {
            // 新增
            ApiTeacher.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("教师添加成功~");
              } else {
                this.$message.error("教师添加失败！");
              }
            });
          }
          this.$router.push({ name: "teacherManage" });
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
