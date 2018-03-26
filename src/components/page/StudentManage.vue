<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 学生信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理学生信息
          <i class="el-icon-upload" @click="loadData"></i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleDeleteAll">批量删除</el-button>
      <el-select v-model="select_cate" placeholder="筛选学院信息" class="handle-select" @change="facultyChange" clearable>
        <el-option v-for="f in faculty" :key="f._id" :label="f.facultyName" :value="f._id"></el-option>
      </el-select>
      <el-input v-model="select_word" placeholder="查询关键词" class="handle-input mr10" @change="getDataByPage"></el-input>
      <!-- <el-input v-model="select_word" placeholder="查询关键词" class="handle-input mr10" ></el-input> -->
      <el-button type="primary" icon="search" @click="getDataByPage">搜索</el-button>
    </div>
    <el-table :data="data" stripe border height="390" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed type="index" width="60"></el-table-column>
      <el-table-column fixed prop="name" label="姓名" width="80"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="65"> </el-table-column>
      <el-table-column prop="id" label="学号" width="120"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="125"> </el-table-column>
      <el-table-column prop="address" label="住址" width="138"> </el-table-column>
      <el-table-column prop="birth" :formatter="dateFormat" label="生日" width="120"> </el-table-column>
      <!-- <el-table-column prop="password" label="密码" > </el-table-column> -->
      <el-table-column prop="classInfo.faculty.facultyName" label="学院" width="105"> </el-table-column>
      <el-table-column prop="classInfo.className" label="班级" width="138"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row,scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <!--page-count 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；
              page-size	每页显示条目个数 -->
      <el-pagination @current-change="handlePageChange" layout="prev, pager, next" :page-count="pageCount||1">
      </el-pagination>
    </div>
    <!-- 确认删除对话框 -->
    <el-dialog title="请确认删除信息" :visible.sync="dialogVisible" width="30%">
      <span>{{dialogMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 确认批量删除对话框2 -->
    <el-dialog title="请确认批量删除信息" :visible.sync="dialogVisible3" width="30%">
      <span>确认批量删除选中学生？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3=false">取 消</el-button>
        <el-button type="primary" @click="delAll">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style>
.el-dialog {
  width: 30%;
}
</style>

<script>
// import {moment} from 'vue-moment';
import {
  ApiStudent,
  ApiFaculty,
  ApiAbsence,
  ApiClassInfo
} from "../../service/apis";
// import moment from 'moment'
export default {
  data() {
    return {
      faculty: "",

      tableData: [],
      allData: [],
      multipleSelection: [],
      select_cate: "",
      select_word: "", //搜索内容
      del_list: [],

      dialogVisible: false,
      dialogVisible3: false,
      temDelRow: {},
      dialogMsg: "",
      cur_page: 1, //当前页码
      pageCount: 1 //总页数
    };
  },
  created() {

    ApiFaculty.getData({}, res => {
      this.faculty = res.data;
    });
    this.getDataByPage();
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    // 分页
    getDataByPage() {
      console.log("开始分页");
      console.log(this.select_cate);
      ApiStudent.getDataByPage(
        { page: this.cur_page, word: this.select_word, cids: this.cids },
        res => {
          console.log(res);
          this.tableData = res.data.res; //获取分页数据
          this.pageCount = res.data.pageCount; //获取总页数
        }
      );
    },
    // 所有数据
    getData() {
      ApiStudent.getData({}, res => {
        this.allData = res.data.res; //获取所有数据
      });
    },
    // 当前页码改变事件
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    //时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD");
    },

    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "studentEdit", query: { id: row._id } });
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除学生：${row.name}`;
      this.temDelRow = row;
    },
    // 确认批量删除提示框
    handleDeleteAll(index, row) {
      this.dialogVisible3 = true;
      this.temDelRow = row;
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiAbsence.getData({ student: this.temDelRow._id }, res => {
        console.log(res);
        if (res.data.length > 0) {
          this.$message.error(`删除失败，该学生正在【考勤表】中使用。`);
        } else {
          ApiStudent.deleteById(this.temDelRow._id, res => {
            console.log(res);
            if (res.status == "y") {
              this.$message.success("学生删除成功~");
            } else {
              this.$message.success("学生删除失败！");
            }
            this.getDataByPage();
          });
        }
      });
    },
    facultyChange() {
      console.log(this.select_cate);
      // 首先查找属于该学院的班级。再查找属于这些班级中的学生
      ApiClassInfo.getData({ faculty: this.select_cate }, res => {
        console.log(res.data);
        this.cids = [];
        for (let i = 0; i < res.data.length; i++) {
          this.cids.push(res.data[i]._id);
        }
        console.log(this.cids);
        ApiStudent.getDataByPage(
          { page: this.cur_page, cids: this.cids },
          res => {
            console.log(res);
            this.tableData = res.data.res; //获取分页数据
            this.pageCount = res.data.pageCount; //获取总页数
          }
        );
      });
    },
    delAll() {
      this.dialogVisible3 = false;
      length = this.multipleSelection.length;
      var str = "";
      var isUsed = false;
      this.del_list = this.del_list.concat(this.multipleSelection);
      var _this = this;
      // 批量删除操作
      function fn1(resolve, reject) {
        for (let i = 0; i < length; i++) {
          let id = _this.multipleSelection[i]._id;
          let name = _this.multipleSelection[i].name;

          ApiAbsence.getData({ student: id }, res => {
            // console.log(res);
            if (res.data.length > 0) {
              str += name + " ";
              isUsed = true;
              // this.$message.error(`删除失败，该学生正在【考勤表】中使用。`);
            } else {
              ApiStudent.deleteById(id, res => {
                if (res.status == "y") {
                  console.log(res);
                  resolve();
                } else reject();
              });
            }
          });
        }
      }
      new Promise(fn1)
        .then(function (val) {
          _this.getDataByPage();
          _this.multipleSelection = [];
          if (isUsed) {
            _this.$message.error(
              "【" + str + "】删除失败，该学生正在【考勤表】中使用。"
            );
          } else {
            _this.$message.success("批量删除学生成功~");
          }
        })
        .catch(() => {
          _this.$message.success("批量删除学生失败！");
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    loadData() {
      new Promise(resolve => {
        this.$axios
          .get("rc/student")
          .then(res => {
            var users = res.data.data.users;
            console.log(users);
            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              ApiStudent.save(user, res => {
                if (res.status == "y") {
                  resolve();
                }
              });
            }
          });
      }).then(() => {
        this.$message.success("Students Mock Successful~");
        this.getDataByPage();
      });
    },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  /* width: 120px; */
}
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>