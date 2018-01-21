<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 院系班级管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加班级信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="年级" prop="cyear">
					<el-select v-model.number="form.cyear"  class="handle-select mr10">
		                <el-option
			                v-for="t in cyears"
			                :key="t.val"
			                :label="t.val"
			                :value="t.val">
			            </el-option>
		            </el-select>
                </el-form-item>
                <el-form-item label="专业" prop="major">
					<el-select v-model="form.major"  class="handle-select mr10" loading-text="加载中" no-match-text>
		                <!-- <el-option key="1" label="广东省" value="广东省"></el-option> -->
						<el-option
			                v-for="t in majors"
			                :key="t._id"
			                :label="t.majorName"
			                :value="t._id">
			            </el-option>
		            </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="cno">
					<el-select v-model.number="form.cno" class="handle-select mr10">
		                <el-option
			                v-for="t in cnos"
			                :key="t.val"
			                :label="t.val"
			                :value="t.val">
			            </el-option>
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
import { ApiClassInfo, ApiMajor } from "../../service/apis";
export default {
  data: function() {
    return {
      cyears: [],
      majors: [],
      cnos: [],
      status: "添加",
      form: {
        cyear: "",
        major: "",
        cno: ""
      },
      rules: {
        cyear: { required: true, type: "number", message: "请选择年级" },
        major: { required: true, message: "请选择专业" },
        cno: { required: true, type: "number", message: "请选择班级" }
        // cno: [{ required: true, message: "请选择班级", trigger: "change" },  { type: 'number', message: '年龄必须为数字值'}]
      }
    };
  },
  created: function() {
    ApiMajor.getData(res => {
      this.majors = res.data;
    });
    // 年级
    var year = new Date().getFullYear();
    for (let i = year; i > year - 6; i--) {
      var obj = {};
      obj.val = i;
      this.cyears.push(obj);
    }
    // 班级
    for (let i = 1; i < 7; i++) {
      var obj = {};
      obj.val = i.toString();
      this.cnos.push(obj);
    }

    this.id = this.$route.params.id;
    console.log(this.id);
    if (this.id) {
      this.status = "修改";
      ApiClassInfo.getDataById(this.id, res => {
        console.log(res);
        this.form = res.data;
      });
    }
  },
  mounted: function() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改
          if (this.id) {
            console.log("修改");
            ApiClassInfo.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else {
                this.$message.error("修改失败！");
              }
            });
          } else {
            // 新增
            ApiClassInfo.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else {
                this.$message.error("添加失败！");
              }
            });
          }
          this.$router.push({ name: "manageclass" });
        }
      });
    },
    resetSubmit(formName) {
      //   this.$refs[formName].resetFields();
      //   this.$refs.inputRef.$el.children[0].focus();
    }
  }
};
</script>
