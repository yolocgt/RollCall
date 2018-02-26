<template>
    <div class="table" :class="isShowDatail?'bigTable':'smallTable'">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 排课点名管理</el-breadcrumb-item>
                <el-breadcrumb-item>考勤信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
			<template v-if="isShowDatail">
            <el-table-column prop="rollcall.arrange.classInfo.className" label="点名班级" sortable width="150">
            </el-table-column>
            <el-table-column  prop="rollcall.rollcallTime" :formatter="dateFormat" label="点名时间" sortable width="150">
            </el-table-column>
			</template>
            <el-table-column prop="student.name" label="学生" width="120">
            </el-table-column>
            <el-table-column prop="absenceReson" label="缺勤原因" >
            </el-table-column>
            <el-table-column label="操作" width="180">
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
import { ApiAbsence } from "../../service/apis";
export default {
  data() {
    return {
      isShowDatail: true,
      url: "./static/vuetable.json",
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
	console.log(this.$route.query.id);
    if (this.$route.query.id) {
      this.isShowDatail = false;
    }
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    //时间格式化
    dateFormat: function(row, column) {
      console.log(">>>>>");
      //   console.log(column);
      //   console.log(row);
      var date = row.rollcall.rollcallTime;
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    // 分页
    getDataByPage() {
      console.log("开始分页");
      var id = this.$route.query.id;
      if (!id) {
        id = "";
      }
      console.log(id);
      ApiAbsence.getDataByPage(this.cur_page, id, res => {
        this.tableData = res.data.res; //获取分页数据
        this.pageCount = res.data.pageCount; //获取总页数
      });
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
      this.dialogMsg = `确认删除该考勤记录？`;
      this.temDelRow = row;
    },
    // 编辑
    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "addabsence", params: { id: row._id } });
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiAbsence.deleteById(this.temDelRow._id, res => {
        console.log(res);
        if (res.status == "y") {
          this.$message.success("删除成功~");
        } else {
          this.$message.success("删除失败！");
        }
        //刷新页面
        this.getDataByPage();
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
.smallTable{
	width: 555px;
}
.bigTable{
	width: 100%;
}
</style>