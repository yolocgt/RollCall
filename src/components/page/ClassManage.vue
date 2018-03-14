<template>
      <div class="table" style="width: 681px">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 班级信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>管理班级信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="data" border style="width: 100%"  ref="multipleTable" @selection-change="handleSelectionChange">
            <!-- <el-table-column prop="cyear" label="年级" sortable width="150">
            </el-table-column>
            <el-table-column prop="major.majorName" label="专业" width="120">
            </el-table-column> -->
            <el-table-column prop="faculty.facultyName" label="院系" sortable > </el-table-column>
            <el-table-column prop="className" label="班级"  width="240" sortable> </el-table-column>
            <el-table-column prop="counselor.name" label="辅导员" sortable> </el-table-column>
            <el-table-column label="操作" >
                <template  slot-scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                     @current-change ="handlePageChange"
                    layout="prev, pager, next"
                    :page-count="pageCount||1" :page-size="pageSize">
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
import { ApiClassInfo, ApiStudent, ApiArrange } from "../../service/apis";
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
    // 当前页码改变事件
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    // 分页
    getDataByPage() {
      console.log("开始分页");
      ApiClassInfo.getDataByPage(
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
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除：${row.cyear +
        "级" +
        row.major.majorName +
        row.cno +
        "班"}`;
      this.temDelRow = row;
    },
    // 编辑
    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "classEdit", query: { id: row._id } });
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      var cid = this.temDelRow._id;
      var isUsed = false;
      var tables = "";
      // 关联的学生表
      function f1(resolve) {
        ApiStudent.getData({ classInfo: cid }, res => {
          console.log(res);
          if (res.data.count > 0) {
            isUsed = true;
            tables += "学生";
            resolve();
          }
        });
      }
      function f2(resolve) {
        ApiArrange.getData({ classInfo: cid }, res => {
          console.log(res);
          if (res.data.length > 0) {
            isUsed = true;
            tables += " 排课";
            resolve();
          }
        });
      }
      new Promise(f1)
        .then(params => {
          return new Promise(f2);
        })
        .then(params => {
          if (isUsed) {
            this.$message.error(`删除失败，该班级正在【${tables}表】中使用。`);
          } else {
            ApiClassInfo.deleteById(cid, res => {
              console.log(res);
              if (res.status == "y") {
                this.$message.success("删除成功~");
              } else {
                this.$message.success("删除失败！");
              }
              //刷新页面
              this.getDataByPage();
            });
          }
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