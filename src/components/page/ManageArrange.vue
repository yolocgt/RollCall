<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 课程信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>排课信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <el-button type="primary" icon="delete" class="handle-del mr10">批量删除</el-button>
            <el-select v-model="select_learnYear" placeholder="筛选学年" class="handle-select mr10">
                <el-option 
                  v-for="f in learnYears" 
                  :key="f._id" 
                  :label="f._id" 
                  :value="f._id"></el-option>
            </el-select>
			      <el-select v-model="select_learnTerm" placeholder="请选择" class="handle-select mr10">
                <el-option key="1" label="第一学期" value="第一学期"></el-option>
                <el-option key="2" label="第二学期" value="第二学期"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <!-- <el-button type="primary" icon="search" @click="search">搜索</el-button> -->
            <el-button type="primary" icon="search" >搜索</el-button>
        </div>
        <div class="block">
          <span class="demonstration">可选择任意一级菜单的选项</span>
          <el-cascader
            placeholder="试试搜索：2018"
            :options="learnYears"
            @focus.native="select_cateChange"
            expand-trigger="click"
             filterable
             change-on-select
             clearable
          ></el-cascader>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="learnYear" label="学年" sortable min-width="90">
            </el-table-column>
            <el-table-column prop="learnTerm" label="学期" width="95">
            </el-table-column>
            <el-table-column prop="classInfo.className" label="班级"  >
            </el-table-column>
            <el-table-column prop="teacher.name" label="教师" >
            </el-table-column>
            <el-table-column prop="course.courseName" label="课程" >
            </el-table-column>
            <el-table-column prop="section" label="周次/星期/课节" width="133">22
            </el-table-column>
            <el-table-column prop="classroom" label="教室" width="66">
            </el-table-column>
            <el-table-column label="点名" width="150">
                <template  slot-scope="scope">
                    <el-button size="small" type="success">
                      <router-link :to="{path:'/addrollcall',query: {id: scope.row._id}}">点名</router-link>
                    </el-button>
                    <el-button size="small" type="info">
                      查看<i class="el-icon-arrow-right">
                    </i></el-button>
                    
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
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
<style scoped>
.el-button--success span a {
  color: white;
}
.block {
  margin-bottom: 20px;
}
</style>

<script>
import { ApiArrange } from "../../service/apis";
export default {
  data() {
    return {
      select_cate: [],
      learnYears: [],
      select_learnYear: "",
      select_learnTerm: "",
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
    select_cateChange(val) {
      alert(val);
    },

    // 当前页码改变事件
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    // 分页
    getDataByPage() {
      console.log("开始分页");
      ApiArrange.getDataByPage(this.cur_page, this.select_word, res => {
        this.tableData = res.data.res; //获取分页数据
        var learnYears = res.data.learnYears;
        // console.log(learnYears);

        var data = [];
        for (const i in learnYears) {
          data.push({
            value: learnYears[i]._id,
            label: learnYears[i]._id,
            children: [
              {
                value: "第一学期",
                label: "第一学期"
              },
              {
                value: "第二学期",
                label: "第二学期"
              }
            ]
          });
        }
        console.log(data);
        this.learnYears = data;
        this.pageCount = res.data.pageCount; //获取总页数
      });
    },
    search() {
      this.is_search = true;
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除所排课程吗`;
      this.temDelRow = row;
    },
    // 编辑
    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "addarrange", params: { id: row._id } });
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiArrange.deleteById(this.temDelRow._id, res => {
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