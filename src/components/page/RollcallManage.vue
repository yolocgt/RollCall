<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 排课点名管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理点名信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="data" stripe :class="'rollcall'" border ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column prop="arrange.learnYear" label="学年" min-width="90"> </el-table-column>
      <el-table-column prop="arrange.learnTerm" label="学期"> </el-table-column>
      <el-table-column prop="arrange.classInfo.className" label="班级"> </el-table-column>
      <el-table-column prop="arrange.course.courseName" label="课程"> </el-table-column>
      <el-table-column prop="arrange.teacher.name" label="教师"> </el-table-column>
      <el-table-column prop="rollcallTime" label="时间" :formatter="dateFormat" width="112"> </el-table-column>
      <el-table-column prop="arrange.section" label="节次"> </el-table-column>
      <el-table-column prop="actualNum" label="总数"> </el-table-column>
      <el-table-column prop="tardinessNum" label="迟到">
        <template slot-scope="scope">
          {{scope.row.tardinessNum}}
        </template>

      </el-table-column>
      <el-table-column prop="absentNum" label="缺勤">
        <template slot-scope="scope">
          <template v-if="scope.row.absentNum==0">
            <router-link class="c_danger" :to="{path:'/absenceManage',query:{id:scope.row._id}}">
              <el-tag type="success">/</el-tag>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{path:'/absenceManage',query:{id:scope.row._id}}">
              <el-tag type="danger">{{scope.row.absentNum}}人</el-tag>
            </router-link>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
/* .el-dialog {
  width: 30%;
} */
a {
  color: #000;
  /* cursor: default; */
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
import { ApiRollcall, ApiAbsence } from "../../service/apis";

export default {
  data() {
    return {
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
        { page: this.cur_page},
        res => {
          var rollcallData = res.data.res; //获取分页数据
          new Promise((resolve) => {
            for (let i = 0; i < rollcallData.length; i++) {
              ApiAbsence.getData({ rollcall: rollcallData[i]._id }, (res) => {
                console.log(res);
                rollcallData[i].absentNum = res.data.length;
              })
              ApiAbsence.getData({ rollcall2: rollcallData[i]._id }, (res) => {
                console.log('迟到的、、、');
                console.log(res);
                rollcallData[i].tardinessNum = res.data.length;
              })
            }
            console.clear();
            console.log(rollcallData);
            resolve();
          }).then(() => {
            this.tableData = rollcallData;
            this.pageCount = res.data.pageCount; //获取总页数
          })
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
      this.$router.push({ name: "rollcallEdit", query: { rid: row._id } });
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除该次点名?`;
      if (row.absentNum > 0) {
        this.dialogMsg = `确认删除该次点名和对应的考勤信息吗?`;
      }
      this.temDelRow = row;
      console.log(row);
    },
    // 删除
    doDel() {
      this.dialogVisible = false;

      // ApiAbsence.getData({ rollcall: this.temDelRow._id }, res => {
      //   console.log(res);
      //   if (res.data.length > 0) {
      //     this.$message.error(`删除失败，该点名记录正在【考勤表】中使用。`);
      //   } else {
      //     return;
      //   }
      // });

      // 删除点名信息
      ApiRollcall.deleteById(this.temDelRow._id, res => {
        console.log(res);
        if (res.status == "y") {
          this.$message.success("点名记录删除成功~");
          // 删除点名对应的考勤信息?
          ApiAbsence.deleteMany(this.temDelRow._id, res => {
            console.log(res);

          });
          this.getDataByPage();
        } else {
          this.$message.success("点名记录删除失败！");
          this.getDataByPage();
        }
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
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    // 缺勤人数
    absentCount(row, column) {
      // var rid = row._id;
      // console.log(rid);
      // new Promise((resolve) => {
      //   ApiAbsence.getData({ rollcall: rid }, (res) => {
      //     console.log(res);
      //     console.log(res.data.length);
      //     resolve(res.data.length);
      //   })
      // }).then((val) => {
      //   console.log('object');
      //   return 3
      // })
      // console.log('结束');
      // this.absentCount(row.column);
    }
  },
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