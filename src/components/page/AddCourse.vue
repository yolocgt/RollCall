<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 课程信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{status}}课程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px" @keydown.13.native="onSubmit('form')">
                <el-form-item label="课程名称" prop="account">
                    <el-input v-model="form.courseName" autofocus ref="inputRef"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">{{status}}</el-button>
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
import ApiCourse from "../../service/api_course";
export default {
  data: function() {
    return {
      status: "添加",
      form: {
		  courseName:""
	  },
	  rules:{
		  courseName:[{required:true,message:"请输入课程名称",trigger:"blur"}]
	  }
    };
  },
  
  created:function(){
	  
  },
  
  mounted:function(){
	  this.$refs.inputRef.$el.children[0].focus();
  },
  
  methods:{
	  onSubmit(formName){
		  ApiCourse.save(this.form,(res) => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else {
                this.$message.error("添加失败！");
              }
              
          })	
	  }
  }
};
</script>