<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{status}}辅导员信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">

                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"  ref="inputRef"></el-input>
                </el-form-item>
				       <el-form-item label="性别" prop="sex">
    				      <el-select v-model="form.sex" placeholder="请选择" class="handle-select mr10">
    	                <el-option key="1" label="男" value="男"></el-option>
    	                <el-option key="2" label="女" value="女"></el-option>
    	            </el-select>
                </el-form-item>
                <el-form-item label="工号" prop="id">
                    <el-input v-model.number="form.id"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <!-- <el-form-item label="家庭住址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item> -->
				 <el-form-item label="所在院系" prop="faculty">
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
import { ApiFaculty, ApiClassInfo, ApiCounselor } from "../../service/apis";
import login from "../../service/api_login";

export default {
  data: function() {
    // 验证是否存在
    var isExist = (rule, value, callback) => {
      if (this.form.id != "" && this.form.id != this.o_id) {
        login.exists(this.form.id, "counselor", res => {
          console.log(res);
          if (res.data && res.data.length > 0) {
            callback(new Error("该工号已存在，请重新输入"));
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
          { required: true, message: "请输入姓名" },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
            message: "请输入正确的名字"
          }
        ],
        sex: [{ required: true, message: "请选择性别" }],
        id: [
          { required: true, type: "number", message: "请输入工号" },
          { validator: isExist }
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
      ApiCounselor.getDataById(this.id, res => {
        console.log(res);
        this.o_id = res.data.id;
        this.form = res.data;
      });
    }
    // 学院下拉框数据
    ApiFaculty.getData({}, res => {
      this.facultys = res.data;
    });
    // 班级下拉框数据
    ApiClassInfo.getData({}, res => {
      this.className = res.data;
    });
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.form.faculty) {
            // delete this.form.faculty;
          }
          // 修改
          if (this.id) {
            console.log("修改");
            ApiCounselor.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("辅导员修改成功~");
              } else {
                this.$message.error("辅导员修改失败！");
              }
            });
          } else {
            // 新增
            ApiCounselor.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("辅导员添加成功~");
              } else {
                this.$message.error("辅导员添加失败！");
              }
            });
          }
          this.$router.push({ name: "counselorManage" });
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
