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
              
              
                <!-- <el-form-item label="班级" prop="classInfo">
                  <el-input v-model.number="form.classInfo" ></el-input>
                </el-form-item>
                <el-form-item label="课程" prop="course">
                  <el-input v-model.number="form.course" ></el-input>
                </el-form-item> -->
              
                <el-form-item label="班级" prop="o_classInfo">
					<el-select v-model="o_classInfo"  disabled class="handle-select mr10" loading-text="加载中" no-match-text>
						<el-option
			                :key="classInfo._id"
			                :label="classInfo.className"
			                :value="classInfo._id">
			            </el-option>
		            </el-select>
                </el-form-item>
                
                
                <el-form-item label="课程" prop="o_course">
					<el-select v-model="o_course" disabled class="handle-select mr10">
		                <el-option
			                :key="course._id"
			                :label="course.courseName"
			                :value="course._id">
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
                   <el-form-item label="应到人数" prop="actual">
                    <el-input readonly  v-model.number="form.actual" ></el-input>
                </el-form-item>
                <el-form-item label="实到人数" prop="fact">
                    <!-- <el-input  v-model.number="form.fact" ></el-input> -->
                    <!-- <el-input-number v-model="form.fact" :min="1" :max="10" label="描述文字"></el-input-number> -->
                    
                  <template>
                    <el-input-number controls-position="right" v-model="form.fact" :min="0" :max="form.actual" label="描述文字"></el-input-number>
                    
                    <!-- <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number> -->
                  </template>
                    
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
.el-input,
.el-input-number {
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
  ApiRollcall,
  ApiStudent
} from "../../service/apis";
export default {
  data: function() {
    return {
      o_classInfo: "",
      o_course: "",
      classInfo: "",
      course: "",
      status: "添加",
      form: {
        arrange: "",
        actual: "",
        fact: "",
        rollcallTime: Date.now()
      },
      rules: {
        // actual: [
        //   { required: true, message: "请输入人数" },
        //   { type: "number", message: "人数必须为数字值" }
        // ],
        // fact: [
        // { required: true, message: "请输入实到人数" },
        // { type: "number", message: "人数必须为数字值" },
        // { message: "实到人数有误。应大于零并小于应到人数" }
        // ]
      }
    };
  },
  created: function() {
    // 排课表数据操作
    console.log(this.$route.query);
    var aid = this.$route.query.id; //排课记录_id
    ApiArrange.getDataById(aid, res => {
      console.log("查找到排课数据记录：");
      var arrange = res.data;
      this.form.arrange = aid;
      this.classInfo = arrange.classInfo;
      this.course = arrange.course;
      this.o_course = arrange.course._id;
      this.o_classInfo = arrange.classInfo._id;

      ApiStudent.queryStuCount({ classid: arrange.classInfo._id }, res => {
        console.log(res.data.data);
        this.form.actual = this.form.fact = res.data.data.count; //应到学生总数
      });
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
          if (this.form.rollcallTime == "") {
            delete this.form.rollcallTime; //取数据库默认时间值
          }
          // 修改
          if (this.id) {
            console.log("修改");
            ApiRollcall.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else this.$message.error("修改失败！");
            });
          } else {
            // 新增
            // console.log(this.form);
            ApiRollcall.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else this.$message.error("添加失败！");
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
