<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 班级信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{status}}班级信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-box">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="年级" prop="cyear">
          <el-select v-model.number="form.cyear" class="handle-select mr10" @change="isClassNameExist">
            <el-option v-for="t in cyears" :key="t.val" :label="t.val" :value="t.val">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业" prop="major">
          <el-select v-model="form.major" class="handle-select mr10" loading-text="加载中" no-match-text @change="isClassNameExist">
            <el-option v-for="t in majors" :key="t._id" :label="t.majorName" :value="t._id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" prop="cno">
          <el-select v-model.number="form.cno" class="handle-select mr10" @change="isClassNameExist">
            <el-option v-for="t in cnos" :key="t.val" :label="t.val" :value="t.val">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="院系" prop="faculty">
          <el-select v-model="form.faculty" class="handle-select mr10" @change="getCounselors" loading-text="加载中" no-match-text>
            <el-option v-for="t in facultys" :key="t._id" :label="t.facultyName" :value="t._id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="辅导员" prop="counselor">
          <el-select v-model="form.counselor" class="handle-select mr10" loading-text="加载中" no-match-text>
            <el-option v-for="t in counselors" :key="t._id" :label="t.name" :value="t._id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">{{status}}</el-button>
          <el-button @click="resetSubmit('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 确认删除对话框 -->
    <el-dialog title="班级名重复" :visible.sync="dialogVisible" width="30%">
      <span>该班级已存在，请重新操作</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button type="primary" @click="clearSelected">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import {
  ApiClassInfo,
  ApiMajor,
  ApiFaculty,
  ApiCounselor
} from "../../service/apis";
export default {
  data: function () {
    return {
      isExist: false,
      dialogVisible: false,
      dialogMsg: "",
      cyears: [],
      majors: [],
      cnos: [],

      counselors: [],
      facultys: [],
      status: "添加",
      form: {
        cyear: "",
        major: "",
        cno: "",
        faculty: "",
        counselor: ""
      },
      rules: {
        cyear: [{ required: true, type: "number", message: "请选择年级" }],
        major: [{ required: true, message: "请选择专业" }],
        cno: [{ required: true, type: "number", message: "请选择班级" }],
        faculty: [{ required: true, message: "请选择院系" }],
        counselor: [{ required: true, message: "请选择辅导员" }]
        // cno: [{ required: true, message: "请选择班级", trigger: "change" },  { type: 'number', message: '年龄必须为数字值'}]
      }
    };
  },
  created: function () {
    // 专业
    ApiMajor.getData({}, res => {
      this.majors = res.data;
    });
    // 院系
    ApiFaculty.getData({}, res => {
      this.facultys = res.data;
    });

    // 年级
    var year = new Date().getFullYear();
    for (let i = year; i > year - 6; i--) {
      var obj = { val: i };
      this.cyears.push(obj);
    }
    // 班级
    for (let i = 1; i < 7; i++) {
      var obj = { val: i.toString() };
      this.cnos.push(obj);
    }

    this.id = this.$route.query.id;
    console.log(this.id);
    if (this.id) {
      this.status = "修改";
      ApiClassInfo.getDataById(this.id, res => {
        console.log(res);
        this.o_className = res.data.className;
        this.form = res.data;
      });
    }
  },
  computed: {
    // 生成班级名
    className: function () {
      console.log('生成班级名');
      if (
        this.form.major != "" &&
        this.form.cyear != "" &&
        this.form.cno != "" && this.majors.length > 0
      ) {
        var major = this.majors.find(item => {
          return item._id == this.form.major;
        });
        return this.form.cyear + "级" + major.majorName + this.form.cno + "班";
      }
    }
  },
  methods: {
    getCounselors() {
      // 辅导员
      console.log('执行 getCounselors（）');
      ApiCounselor.getData({ faculty: this.form.faculty }, res => {
        console.log(res.data);
        this.counselors = res.data;
      });
      this.getCounselors = _ => {
        console.log('重写自己函数');
        ApiCounselor.getData({ faculty: this.form.faculty }, res => {
          console.log(res.data);
          this.counselors = res.data;
        });
        this.form.counselor = null;
      }
    },
    clearSelected() {
      this.dialogVisible = false;
      this.resetSubmit("form");
    },
    isClassNameExist() {
      console.log('>>>>>>>');
      console.log(this.className);
      if (this.className && this.className != this.o_className) {
        ApiClassInfo.isExist(this.className, res => {
          if (res.data && res.data.length > 0) {
            this.dialogVisible = true; // this.$message.error("该班级已存在，请重新操作");
            this.isExist = true; // console.log(this.className + "存在了。。。。。。。");
          } else this.isExist = false; // console.log("不存在~~~");
        });
      } else this.isExist = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && !this.isClassNameExist() && !this.isExist) {
          this.form.className = this.className;
          // console.log("提交前的班级名：" + this.form.className);
          // 修改
          if (this.id) {
            console.log("修改");
            ApiClassInfo.update(this.id, this.form, res => {
              if (res.status == "y") {
                this.$message.success("修改成功~");
              } else this.$message.error("修改失败！");
            });
          } else {
            // 新增
            console.log("添加");
            ApiClassInfo.save(this.form, res => {
              if (res.status == "y") {
                this.$message.success("添加成功~");
              } else this.$message.error("添加失败！");
            });
          }
          this.$router.push({ name: "classManage" });
        }
      });
    },
    resetSubmit(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
