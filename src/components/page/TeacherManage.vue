<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 用户信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理教师信息
          <i class="el-icon-upload" @click="loadData"></i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="data" stripe border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column prop="name" label="姓名" sortable> </el-table-column>
      <el-table-column prop="sex" label="性别" sortable> </el-table-column>
      <el-table-column prop="id" label="教师号" sortable> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="faculty.facultyName" label="所属院系"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row,scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <!--page-count 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；
              page-size	每页显示条目个数 -->
      <el-pagination @current-change="handlePageChange" layout="prev, pager, next" :page-count="pageCount||1" :page-size="pageSize">
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

  </div>
</template>
<style>
.el-dialog {
  width: 30%;
}
</style>

<script>
import { ApiTeacher, ApiFaculty, ApiArrange } from "../../service/apis";

export default {
  data() {
    return {
      faculty: "",

      tableData: [],
      allData: [],
      multipleSelection: [],
      select_word: "", //搜索内容

      dialogVisible: false,
      temDelRow: {},
      dialogMsg: "",

      cur_page: 1, //当前页码
      pageCount: 3, //总页数
      pageSize: 5 //页大小
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
      ApiTeacher.getDataByPage(
        { page: this.cur_page, word: this.select_word },
        res => {
          this.tableData = res.data.res; //获取分页数据
          this.pageCount = res.data.pageCount; //获取总页数
        }
      );
    },
    // 所有数据
    getData() {
      ApiTeacher.getData({}, res => {
        this.allData = res.data.res; //获取所有数据
      });
    },
    // 当前页码改变事件
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "teacherEdit", query: { id: row._id } });
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除教师：${row.name}`;
      this.temDelRow = row;
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiArrange.getData({ teacher: this.temDelRow._id }, res => {
        console.log(res);
        if (res.data.length > 0) {
          this.$message.error(`删除失败，该教师正在【排课表】中使用。`);
        } else {
          ApiTeacher.deleteById(this.temDelRow._id, res => {
            console.log(res);
            if (res.status == "y") {
              this.$message.success("教师删除成功~");
            } else {
              this.$message.success("教师删除失败！");
            }
            this.getDataByPage();
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    loadData() {
      new Promise(resolve => {
        this.$axios
          .get("rc/teacher")
          .then(res => {
            var users = res.data.data.users;
            console.log(users);
            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              // user.phone = user.phone.replace("|", "3");
              ApiTeacher.save(user, res => {
                if (res.status == "y") {
                  resolve();
                }
              });
            }
          });
      }).then(() => {
        this.$message.success("Teachers Mock Successful~");
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
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>