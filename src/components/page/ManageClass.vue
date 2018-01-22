<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 院系班级管理</el-breadcrumb-item>
                <el-breadcrumb-item>班级信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <el-select v-model="select_cate" placeholder="筛选啥" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="cyear" label="年级" sortable width="150">
            </el-table-column>
            <el-table-column prop="major.majorName" label="专业" width="120">
            </el-table-column>
            <el-table-column prop="cno" label="班级" >
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
import { ApiClassInfo } from "../../service/apis";
export default {
  data() {
    return {
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
      ApiClassInfo.getDataByPage(this.cur_page, this.select_word, res => {
        this.tableData = res.data.res; //获取分页数据
        this.pageCount = res.data.pageCount; //获取总页数
      });
    },
    search() {
      this.is_search = true;
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除：${row.ClassInfoName}`;
      this.temDelRow = row;
    },
    // 编辑
    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "addclass", params: { id: row._id } });
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiClassInfo.deleteById(this.temDelRow._id, res => {
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
</style>