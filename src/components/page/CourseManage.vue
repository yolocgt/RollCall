<template>
    <div class="table" style="width: 401px">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 课程信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>管理课程信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="data" border  ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="courseName" label="课程名称" sortable width="220">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template  slot-scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row,scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
          <!--page-count 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；
              page-size	每页显示条目个数 -->
            <el-pagination
                    @current-change ="handlePageChange"
                    layout="prev, pager, next"
                    :page-count="pageCount||1" :page-size="pageSize"
                    >
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
import { ApiCourse, ApiArrange } from "../../service/apis";

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
      ApiCourse.getDataByPage(
        { page: this.cur_page, word: this.select_word },
        res => {
          this.tableData = res.data.res; //获取分页数据
          this.pageCount = res.data.pageCount; //获取总页数
        }
      );
    },
    // 所有数据
    getData() {
      ApiCourse.getData({}, res => {
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
      this.$router.push({ name: "courseEdit", query: { id: row._id } });
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除课程：${row.courseName}`;
      this.temDelRow = row;
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiArrange.getData({ course: this.temDelRow._id }, res => {
        console.log(res);
        if (res.data.length > 0) {
          this.$message.error(`删除失败，该课程正在【排课表】中使用。`);
        } else {
          ApiCourse.deleteById(this.temDelRow._id, res => {
            console.log(res);
            if (res.status == "y") {
              this.$message.success("课程删除成功~");
            } else {
              this.$message.success("课程删除失败！");
            }
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