<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 点名信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理点名信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="data" :class="'rollcall'" border ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="arrange.learnYear" label="学年" min-width="90"> </el-table-column>
      <el-table-column prop="arrange.learnTerm" label="学期"> </el-table-column>
      <el-table-column prop="arrange.classInfo.className" label="班级"> </el-table-column>
      <el-table-column prop="arrange.course.courseName" label="课程"> </el-table-column>
      <el-table-column prop="arrange.teacher.name" label="教师"> </el-table-column>
      <el-table-column prop="rollcallTime" label="时间" :formatter="dateFormat" min-width="100"> </el-table-column>
      <el-table-column prop="arrange.section" label="节次"> </el-table-column>
      <el-table-column prop="actual" label="总数"> </el-table-column>
      <el-table-column label="缺勤">
        <template slot-scope="scope">
          <template v-if="scope.row.fact==0"> \ </template>
          <template v-else>
            <router-link class="c_danger" :to="{path:'/absenceManage',query:{aid:scope.row._id}}">
              <el-tag type="danger">{{scope.row.fact}}人</el-tag>
            </router-link>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
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
<style >
.el-dialog {
  /* width: 30%; */
}
a {
  color: #000;
  cursor: default;
  text-decoration: none;
}
/* 缺勤人数样式 */
.c_danger {
  color: red;
  cursor: pointer;
  text-decoration: underline;
}
/* .c_danger::after {
  content: "人";
} */
/* 单元格居中 */
.rollcall .cell {
  text-align: center;
}
</style>

<script>
import { ApiRollcall } from "../../service/apis";

export default {
  data() {
    return {
      url: "./static/vuetable.json",
      tableData: [],
      allData: [],
      multipleSelection: [],
      // select_cate: "",
      select_word: "", //搜索内容
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
    // 分页
    getDataByPage() {
      console.log("开始分页");
      ApiRollcall.getDataByPage(
        { page: this.cur_page, word: this.select_word },
        res => {
          this.tableData = res.data.res; //获取分页数据
          console.log(this.tableData);
          this.pageCount = res.data.pageCount; //获取总页数
        }
      );
    },
    // 所有数据
    getData() {
      ApiRollcall.getData({}, res => {
        this.allData = res.data.res; //获取所有数据
      });
    },
    // 当前页码改变事件
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    handleEdit(index, row) {
      console.log(row._id);
      this.$router.push({ name: "rollcallEdit", query: { id: row._id } });
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除该次点名?`;
      this.temDelRow = row;
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiRollcall.deleteById(this.temDelRow._id, res => {
        console.log(res);
        if (res.status == "y") {
          this.$message.success("删除成功~");
          this.getDataByPage();
        } else {
          this.$message.success("删除失败！");
          this.getDataByPage();
        }
        this.getDataByPage();
      });
    },
    delAll() {
      length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      var delStatus = false;

      let promise = new Promise(function (resolve, reject) {
        console.log("Promise");
        resolve();
      });
      promise
        .then(() => {
          for (let i = 0; i < length; i++) {
            str += this.multipleSelection[i].name + ",";
            var id = this.multipleSelection[i]._id;
            ApiRollcall.deleteById(id, res => {
              if (res.status == "y") {
                delStatus = true;
                console.log(delStatus);
              }
            });
          }
        })
        .then(() => {
          console.log("处理后：" + delStatus);
          this.$message.error("删除了" + str);
          // if (delStatus) {
          // this.$message.success("删除成功~");
          // }
          this.multipleSelection = [];
          this.getDataByPage();
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD HH:mm");
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