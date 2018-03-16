<template>
  <div class="table" style="width:640px">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理系统账号
          <i class="el-icon-upload" @click="loadData"></i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="handle-box">
      <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleDeleteAll">批量删除</el-button>
      <el-input v-model="select_word" placeholder="查询关键词" class="handle-input mr10" @change="getDataByPage" clearable></el-input>
      <el-button type="primary" icon="search" @click="getDataByPage">搜索</el-button>
    </div>

    <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="id" label="账号" sortable width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row,scope.row._id)">删除</el-button>
          <el-button size="small" type="success" @click="handleResetPsw(scope.$index, scope.row,scope.row._id)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页按钮 -->
    <div class="pagination">
      <!--page-count 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；
          page-size	每页显示条目个数 -->
      <el-pagination @current-change="handlePageChange" layout="prev, pager, next" :page-count="pageCount||1" :page-size="pageSize">
      </el-pagination>
    </div>

    <!-- 确认删除对话框 -->
    <el-dialog title="请确认删除信息" :visible.sync="dialogVisible1" width="30%">
      <span>{{dialogMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1=false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 确认批量删除对话框2 -->
    <el-dialog title="请确认批量删除信息" :visible.sync="dialogVisible3" width="30%">
      <span>确认批量删除选中管理员？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3=false">取 消</el-button>
        <el-button type="primary" @click="delAll">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 确认重置对话框 -->
    <el-dialog title="请确认重置信息" :visible.sync="dialogVisible2" width="30%">
      <span>{{dialogMsg2}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2=false">取 消</el-button>
        <el-button type="primary" @click="doReset">确 定</el-button>
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
import { ApiAdmin } from "../../service/apis";

export default {
  data() {
    return {
      tableData: [],
      allData: [],
      multipleSelection: [],
      select_word: "", //搜索内容
      del_list: [],


      dialogVisible1: false,
      dialogVisible3: false,
      dialogVisible2: false,
      temDelRow: {},
      dialogMsg: "",
      dialogMsg2: "",

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
    // 分页
    getDataByPage() {
      console.log("开始分页");
      ApiAdmin.getDataByPage(
        { page: this.cur_page, word: this.select_word },
        res => {
          this.tableData = res.data.res; //获取分页数据
          this.pageCount = res.data.pageCount; //获取总页数
        }
      );
    },
    // 所有数据
    getData() {
      ApiAdmin.getData({}, res => {
        this.allData = res.data.res; //获取所有数据
      });
    },
    // 当前页码改变事件
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    loadData() {
      // this.is_search = true;
      // let self = this;
      // if (process.env.NODE_ENV === "development") {
      //   self.url = "/ms/table/list";
      // }
      // self.$axios.post(self.url).then(res => {
      //   console.log(res);
      // });
      new Promise(resolve => {
        this.$axios
          .get("rc/admin")
          .then(res => {
            var users = res.data.data.users;
            console.log(users);
            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              ApiAdmin.save(user, res => {
                if (res.status == "y") {
                  resolve(1)
                }
              });
            }
          });
      }).then(() => {
        this.$message.success("Admins Mock Successful~");
        this.getDataByPage();
      })
    },
    search2() { },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "adminEdit", query: { aid: row._id } });
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible1 = true;
      this.dialogMsg = `确认删除管理员：${row.name}`;
      this.temDelRow = row;
    },
    // 确认批量删除提示框
    handleDeleteAll(index, row) {
      this.dialogVisible3 = true;
      this.temDelRow = row;
    },
    // 重置密码
    handleResetPsw(index, row) {
      this.dialogVisible2 = true;
      this.dialogMsg2 = `确认重置该管理员密码：${row.name}`;
      this.temDelRow = row;
    },
    doReset() {
      this.dialogVisible2 = false;

      var id = this.temDelRow._id;
      this.temDelRow.password = "e10adc3949ba59abbe56e057f20f883e";
      ApiAdmin.update(id, this.temDelRow, res => {
        if (res.status == "y") {
          this.$message.success("重置密码成功~");
        }
      });
    },
    // 删除
    doDel() {
      this.dialogVisible1 = false;
      ApiAdmin.deleteById(this.temDelRow._id, res => {
        console.log(res);
        if (res.status == "y") {
          this.$message.success("删除成功~");
          this.getDataByPage();
        } else {
          this.$message.success("删除失败！");
        }
        //刷新页面
        // this.$router.go(0);
        // this.$root.reload();
        // this.$router.push({
        //   name: "manageadmin",
        //   query: { random: Math.random() }
        // });
      });
    },
    delAll() {
      this.dialogVisible3 = false;

      length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      var delStatus = false;

      var _this = this;
      // 批量删除操作
      function fn1(resolve) {
        for (let i = 0; i < length; i++) {
          str += _this.multipleSelection[i].name + ",";
          var id = _this.multipleSelection[i]._id;
          ApiAdmin.deleteById(id, res => {
            if (res.status == "y") {
              console.log(res);
              resolve();
            }
          });
        }
      }
      new Promise(fn1).then(function (val) {
        _this.getDataByPage();
        _this.multipleSelection = [];
        _this.$message.success("批量删除成功~");
      });
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