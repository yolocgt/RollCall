<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 点名信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑点名信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="班级" prop="classInfo">
					<el-select v-model="form.classInfo"  class="handle-select mr10" loading-text="加载中" no-match-text>
						<el-option
			                v-for="t in classInfos"
			                :key="t._id"
			                :label="t.className"
			                :value="t._id">
			            </el-option>
		            </el-select>
                </el-form-item>
                
                
                <el-form-item label="课程" prop="arrange">
					<el-select v-model="form.arrange" class="handle-select mr10">
		                <el-option
			                v-for="t in arranges"
			                :key="t._id"
			                :label="t.course.courseName"
			                :value="t._id">
			            </el-option>
		            </el-select>
                </el-form-item>
                
                   <el-form-item label="点名时间" prop="rollcallTime">
                      <div class="block">
                        <el-date-picker
                          v-model="form.rollcallTime"
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </div>
                </el-form-item>
                   <el-form-item label="实际人数" prop="actual">
                    <el-input v-model.number="form.actual" ></el-input>
                </el-form-item>
                <el-form-item label="实到人数" prop="fact">
                    <el-input v-model.number="form.fact" ></el-input>
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
import {
  ApiClassInfo,
  ApiMajor,
  ApiArrange,
  ApiTeacher,
  ApiCourse,
  ApiRollcall
} from "../../service/apis";
export default {
  data: function() {
    return {
      classInfos: [],
      arranges: [],
      status: "添加",
      form: {
        rollcallTime: "",
        actual: "",
        fact: "",
        classInfo: "",
        teacher: "",
        arrange: ""
      },
      rules: {
        classInfo: { required: true, message: "请选择班级" },
        arrange: { required: true, message: "请选择排课" },
        rollcallTime: { required: true, message: "请选择时间" },
        actual: [
          { required: true, message: "请输入人数" },
          { type: "number", message: "人数必须为数字值" }
        ],
        fact: [
          { required: true, message: "请输入人数" },
          { type: "number", message: "人数必须为数字值" }
        ]
      }
    };
  },
  created: function() {
    // 班级
    ApiClassInfo.getData(res => {
      const cs = [];
      for (const k in res.data) {
        const c = res.data[k];
        // console.log(c);
        c.className = c.cyear + "级" + c.major.majorName + c.cno + "班";
        cs.push(c);
      }
      this.classInfos = cs;
    });
    // 课程
    ApiArrange.getData(res => {
      this.arranges = res.data;
      console.log('返回');
      console.log(this.arranges);
    });

    this.id = this.$route.params.id;
    console.log(this.id);
    if (this.id) {
      this.status = "修改";
      ApiRollcall.getDataById(this.id, res => {
        // console.log(res);
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
            ApiRollcall.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else {
                this.$message.error("修改失败！");
              }
            });
          } else {
            // 新增
            // console.log(this.form);
            ApiRollcall.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else {
                this.$message.error("添加失败！");
              }
            });
          }
          this.$router.push({ name: "managerollcall" });
        }
      });
    },
    resetSubmit(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
