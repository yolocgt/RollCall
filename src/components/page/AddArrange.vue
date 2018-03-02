<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 课程信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑排课信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
          <el-form :model="form" :rules="rules" ref="form" label-width="80px">
            <el-form-item label="所属班级" prop="classInfo">
		        	<el-select v-model="form.classInfo" @visible-change="classChange"  class="handle-select mr10" loading-text="加载中" no-match-text>
				      	<el-option
	                v-for="t in classInfos"
	                :key="t._id"
	                :label="t.className"
	                :value="t._id">
		            </el-option>
              </el-select>
            </el-form-item> 
                
            <el-form-item label="所属学年" prop="learnYear">
				    	<el-select v-model="form.learnYear"  class="handle-select mr10">
                 <el-option
		                v-for="t in learnYears"
		                :key="t.val"  
		                :label="t.val"
		                :value="t.val">
			            </el-option>
	            </el-select>
            </el-form-item>
            
            <el-form-item label="所属学期" prop="learnTerm">
					    <el-select v-model="form.learnTerm"  class="handle-select mr10">
                <el-option key="1" label="第一学期" value="第一学期"></el-option>
                <el-option key="2" label="第二学期" value="第二学期"></el-option>
	            </el-select>
            </el-form-item>
               
           <el-form-item label="课程名称" prop="course">
				  	<el-select v-model="form.course" class="handle-select mr10">
              <el-option
                v-for="t in courses"
                :key="t._id"
                :label="t.courseName"
                :value="t._id">
	            </el-option>
            </el-select>
            </el-form-item>
                
            <el-form-item label="任课教师" prop="teacher">
				    	<el-select v-model="form.teacher" class="handle-select mr10">
                <el-option
	                v-for="t in teachers"
	                :key="t._id"
	                :label="t.name"
	                :value="t._id">
		            </el-option>
	            </el-select>
            </el-form-item>
                
            <el-form-item label="上课时间" prop="section" >
		          <!-- <el-autocomplete v-model="week" placeholder="请输入星期" :fetch-suggestions="querySearchWeek"></el-autocomplete> -->
		          <el-autocomplete v-model="form.section" placeholder="请输入节次" :fetch-suggestions="querySearchWeek"></el-autocomplete>
            </el-form-item>
            
            <el-form-item label="上课地点" prop="classroom">
              <el-input v-model="form.classroom" placeholder="请输入教室号" ></el-input>
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
.el-select {
  width: 242px;
}
.el-autocomplete {
  width: 242px;
}
.el-input {
  width: 242px;
}
.el-dropdown-menu {
  font-size: 14px;
}
.el-autocomplete {
  /* width: 217px; */
}
</style>

<script>
import {
  ApiClassInfo,
  ApiMajor,
  ApiArrange,
  ApiTeacher,
  ApiCourse
} from "../../service/apis";
export default {
  data: function() {
    return {
      learnYears: [],
      classInfos: [],
      teachers: [],
      week: "",
      teachers: [],
      courses: [],
      status: "添加",
      form: {
        learnYear:
          (new Date().getFullYear() - 1).toString() +
          "-" +
          new Date().getFullYear().toString(),
        learnTerm: "",
        classInfo: "",
        teacher: "",
        course: "",
        section: "",
        classroom: ""
      },
      rules: {
        learnYear: { required: true, message: "请选择学年" },
        learnTerm: { required: true, message: "请选择学期" },
        classInfo: { required: true, message: "请选择班级" },
        teacher: { required: true, message: "请选择教师" },
        course: { required: true, message: "请选择课程" },
        section: { required: true, message: "请选择时间" },
        classroom: { required: true, message: "请输入教室" }
      },
      weeks: [
        { value: "周一" },
        { value: "周二" },
        { value: "周三" },
        { value: "周四" },
        { value: "周五" }
      ],
      sections: [
        { value: "1-2节" },
        { value: "3-4节" },
        { value: "5-6节" },
        { value: "7-8节" }
      ]
    };
  },
  computed: {
    thisLearnYear: function() {
      return (
        (new Date().getFullYear() - 1).toString() +
        "-" +
        new Date().getFullYear().toString()
      );
    }
  },
  created: function() {
    console.log(this.$route);

    // 判断当前学期
    if (1 < new Date().getMonth() && new Date().getMonth() < 8) {
      this.form.learnTerm = "第二学期";
    } else this.form.learnTerm = "第一学期";
    // console.log(this.thisLearnYear);
    // 班级
    ApiClassInfo.getData({},res => {
      // const cs = [];
      // console.log(res.data);
      // 筛选班级，除去已毕业的班级
      for (const k in res.data) {
        if (new Date().getFullYear() - res.data[k].cyear > 4) {
          res.data.splice(k, 1);
          // delete res.data[k];
        }
        // const c = res.data[k];
        // console.log(c);
        // c.className = c.cyear + "级" + c.major.majorName + c.cno + "班";
        // res.data.push(c);
      }
      console.log(res.data);
      this.classInfos = res.data;
      // console.log(this.classInfos);
    });
    // 课程
    ApiCourse.getData({},res => {
      this.courses = res.data;
    });
    // 教师
    ApiTeacher.getData({},res => {
      this.teachers = res.data;
    });
    // 学年
    var year = new Date().getFullYear();

    // var rYear=0;
    for (let i = year; i > year - 4; i--) {
      var obj = {
        val: i - 1 + "-" + i
      };
      this.learnYears.push(obj);
    }

    this.id = this.$route.params.id;
    console.log(this.id);
    if (this.id) {
      this.status = "修改";
      ApiArrange.getDataById(this.id, res => {
        console.log(res);
        this.form = res.data;
        this.form.classInfo = res.data.classInfo._id;
        this.form.course = res.data.course._id;
        console.log(res.data);
      });
    }
  },
  mounted: function() {
    // console.log(this.form.learnYear);
  },
  methods: {
    classChange(value) {
      // this.form.learnYear = "";
      console.clear();
      console.log(this.$route.params.id);

      this.learnYears = [];
      // 修改
      if (this.$route.params.id) {
        // 获取班级中的学年
        var obj = this.classInfos.find(item => {
          return item._id == this.form.classInfo;
        });
        for (let i = 2018; i > obj.cyear; i--) {
          var cyears = {};
          cyears.val = i - 1 + "-" + i;
          this.learnYears.push(cyears);
        }
        // 重置学期为该班级的第一个学期，否则会出现17级可选择2014-2015学年的bug
        // this.form.learnYear = this.learnYears[this.learnYears.length - 1].val;
        this.form.learnYear = this.learnYears[0].val;
      } else if (this.form.classInfo) {
        var obj = this.classInfos.find(item => {
          return item._id == this.form.classInfo;
        });

        for (let i = 2018; i > obj.cyear; i--) {
          var cyears = {};
          cyears.val = i - 1 + "-" + i;
          this.learnYears.push(cyears);
        }
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改
          if (this.id) {
            console.log("修改");
            this.form.section = this.week + this.form.section;
            ApiArrange.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else {
                this.$message.error("修改失败！");
              }
            });
          } else {
            // 新增
            this.form.section = this.week + this.form.section;
            console.log(this.form);
            ApiArrange.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else {
                this.$message.error("添加失败！");
              }
            });
          }
          this.$router.push({ name: "managearrange" });
        }
      });
    },
    resetSubmit(formName) {
      this.$refs[formName].resetFields();
    },
    querySearchWeek: function(queryStr, callback) {
      if (queryStr) {
        var results = this.weeks.filter(item => {
          return item.value.toLowerCase().indexOf(queryStr) > -1;
        });
        callback(results);
      } else {
        callback(this.weeks);
      }
    },
    querySearchSection: function(queryStr, callback) {
      if (queryStr) {
        var results = this.sections.filter(item => {
          return item.value.toLowerCase().indexOf(queryStr) > -1;
        });
        callback(results);
      } else {
        callback(this.sections);
      }
    }
  }
};
</script>
