<template>
  <div class="table" style="width:699px">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 院系信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理院系信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="facultyName" label="院系名称" sortable width="150">
      </el-table-column>
      <el-table-column prop="director" label="系主任" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
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

<script>
import { ApiFaculty, ApiCounselor, ApiTeacher, ApiClassInfo } from "../../service/apis";
export default {
  data() {
    return {

      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,

      dialogVisible: false,
      temDelRow: {},
      dialogMsg: "",
      cur_page: 1, //当前页码
      pageCount: 3, //总页数
      pageSize: 5 //页大小
    };
  },
  created() {
    this.getDataByPage();
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    // 分页
    getDataByPage() {
      console.log("开始分页");
      ApiFaculty.getDataByPage(
        { page: this.cur_page, word: this.select_word },
        res => {
          this.tableData = res.data.res; //获取分页数据
          this.pageCount = res.data.pageCount; //获取总页数
        }
      );
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除学院：${row.facultyName}`;
      this.temDelRow = row;
    },
    // 编辑
    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "facultyEdit", query: { id: row._id } });
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      var _this = this;
      var isExist = false;
      var tables = "";
      function c_Promise() {
        // function fn1(resolve, reject) {
        //   console.log('步骤一：执行');
        //   resolve('1');
        // }
        // function fn2(resolve, reject) {
        //   console.log('步骤二：执行');
        //   resolve('2');
        // }
        // new Promise(fn1).then(function (val) {
        //   console.log(val);
        //   return new Promise(fn2);
        // }).then(function (val) {
        //   console.log(val);
        //   return 33;
        // }).then(function (val) {
        //   console.log(val);
        //   console.log('结束Promise ~~~');
        // });
      }

      // 是否关联其他数据表
      function fn1(resolve) {
        ApiCounselor.getData({ faculty: _this.temDelRow._id }, (res) => {
          console.log('关联的辅导员表；'); console.log(res);
          if (res.data.length) { isExist = true; tables += "辅导员" }
          resolve();
        })
      }
      function fn2(resolve) {
        ApiTeacher.getData({ faculty: _this.temDelRow._id }, (res) => {
          console.log('关联的教师表；'); console.log(res);
          if (res.data.length) { isExist = true; tables += " 教师" }
          resolve();
        })
      }
      function fn3(resolve) {
        ApiClassInfo.getData({ faculty: _this.temDelRow._id }, (res) => {
          console.log('关联的班级表；'); console.log(res);
          if (res.data.length) { isExist = true; tables += " 班级" }
          resolve();
        })
      }

      new Promise(fn1).then(function (val) {
        return new Promise(fn2);
      }).then(function (val) {
        return new Promise(fn3)
      }).then(function (val) {
        if (isExist) {
          _this.$message.error(`删除失败，该院系正在【${tables}表】使用中。`);
          return
        }
        console.log('d e l e t e');
        ApiFaculty.deleteById(_this.temDelRow._id, res => {
          console.log(res);
          if (res.status == "y") {
            _this.$message.success("删除成功~");
          } else {
            _this.$message.success("删除失败！");
          }
          //刷新页面
          _this.getDataByPage();
        });
      })



      // ApiTeacher.getData({ faculty: this.temDelRow._id }, (res) => {
      //   console.log('关联的教师表；');
      //   console.log(res);
      //   if (res.data.length) this.isExist = true
      // })
      // if (!this.isExist) {
      //   console.log('d e l e t e');
      //   ApiFaculty.deleteById(this.temDelRow._id, res => {
      //     console.log(res);
      //     if (res.status == "y") {
      //       this.$message.success("删除成功~");
      //     } else {
      //       this.$message.success("删除失败！");
      //     }
      //     //刷新页面
      //     this.getDataByPage();
      //   });
      // }


      // ApiCounselor.getData({ faculty: this.temDelRow._id }, (res) => {
      //   console.log('关联的辅导员表：');
      //   if (res.data.length) this.isExist = true
      //   ApiTeacher.getData({ faculty: this.temDelRow._id }, (res) => {
      //     console.log('关联的教师表；');
      //     if (res.data.length) this.isExist = true;

      //     if (this.isExist) {
      //       this.$message.error('删除失败，该院系正在使用中。')
      //       return;
      //     } else {
      //       console.log('d e l e t e');
      //       ApiFaculty.deleteById(this.temDelRow._id, res => {
      //         console.log(res);
      //         if (res.status == "y") {
      //           this.$message.success("删除成功~");
      //         } else {
      //           this.$message.success("删除失败！");
      //         }
      //         //刷新页面
      //         this.getDataByPage();
      //       });
      //     }
      //   })
      // })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
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