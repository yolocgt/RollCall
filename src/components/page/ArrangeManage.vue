<template>
  <div class="table arrangeTable">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 排课点名管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理排课信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-button type="success" icon="document" class="handle-del mr10">学年学期</el-button>
      <!-- <el-select v-model="select_learnYear" placeholder="筛选学年" class="handle-select mr10">
                <el-option
                  v-for="f in learnYears"
                  :key="f._id"
                  :label="f._id"
                  :value="f._id"></el-option>
            </el-select>
			      <el-select v-model="select_learnTerm" placeholder="请选择" class="handle-select mr10">
                <el-option key="1" label="第一学期" value="第一学期"></el-option>
                <el-option key="2" label="第二学期" value="第二学期"></el-option>
            </el-select> -->

      <!-- <div class="block">
              <span class="demonstration">可选择任意一级菜单的选项</span> -->
      <el-cascader width="100" placeholder="试试搜索：2018" :options="learnYears" @change="select_yearChange" expand-trigger="click" filterable change-on-select clearable v-model="casYears"></el-cascader>
      <!-- </div> -->

      <el-input v-model="select_word" placeholder="筛选关键词" @keyup.native.enter="search" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>

    </div>
    <el-table :data="data" stripe border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <!-- <template v-if="!select_learnYear"> -->
      <el-table-column prop="learnYear" label="学年" sortable min-width="90"> </el-table-column>
      <!-- </template> -->
      <!-- <template v-if="!select_learnTerm"> -->
      <el-table-column prop="learnTerm" label="学期" sortable width="95"> </el-table-column>
      <!-- </template> -->
      <el-table-column prop="classInfo.className" label="班级" sortable>
      </el-table-column>
      <el-table-column prop="teacher.name" label="教师">
      </el-table-column>
      <el-table-column prop="course.courseName" label="课程">
      </el-table-column>
      <el-table-column prop="section" label="周次/星期/课节" width="133">
      </el-table-column>
      <el-table-column prop="classroom" label="教室" width="66">
      </el-table-column>
      <el-table-column label="点名" width="155">
        <template slot-scope="scope">
          <el-button size="small" type="success">
            <router-link :to="{path:'/rollcallEdit',query: {aid: scope.row._id}}">点名</router-link>
          </el-button>
          <el-button size="small" type="info">
            <router-link :to="{path:'/rollcallManage'}">查看</router-link>
            <i class="el-icon-arrow-right"> </i>
          </el-button>

        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
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
<style >
.el-button--success span a {
  color: white;
}
.el-button--info span a {
  color: white;
}
.arrangeTable .el-table,
.arrangeTable .el-table__header-wrapper table tr th {
  text-align: center;
}
</style>

<script>
import { ApiArrange, ApiClassInfo, ApiRollcall } from "../../service/apis";
export default {
  data() {
    return {
      casYears: [],
      learnYears: [],
      select_learnYear: "",
      select_learnTerm: "",

      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_word: "",


      dialogVisible: false,
      temDelRow: {},
      dialogMsg: "",

      cur_page: 1, //当前页码
      pageCount: 3, //总页数
      pageSize: 5 //页大小
    };
  },
  created() {
    // this.getDataByPage();
    this.getDataByPage();

    // 获取当前学年学期排课数据
    this.casYears[0] =
      (new Date().getFullYear() - 1).toString() +
      "-" +
      new Date().getFullYear().toString();
    if (1 < new Date().getMonth() && new Date().getMonth() < 8) {
      this.casYears[1] = "第二学期";
    } else this.casYears[1] = "第一学期";
    this.select_yearChange(this.casYears);
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    search() {
      ApiClassInfo.getData({ className: this.select_word }, res => {
        console.log("模糊查询的班级数据：");
        console.log(res.data);

        this.cids = [];
        for (const key of res.data) {
          // console.log(typeof res.data[key]._id);
          this.cids.push(key._id);
        }
        console.log(this.cids);

        ApiArrange.getDataByPage(
          {
            page: this.cur_page,
            word: this.select_learnYear,
            word2: this.select_learnTerm,
            word3: this.cids
          },
          res => {
            this.tableData = res.data.res;
            this.pageCount = res.data.pageCount;
          }
        );
      });
    },
    select_yearChange(val) {
      // console.log(val[1]);
      // console.log(this.casYears);
      this.select_learnYear = val[0];
      this.select_learnTerm = val[1];
      // console.log(this.select_learnTerm);
      // val
      ApiArrange.getDataByPage(
        { page: this.cur_page, word: val[0], word2: val[1] },
        res => {
          this.tableData = res.data.res;
          this.pageCount = res.data.pageCount;
        }
      );
    },

    // 当前页码改变事件
    handlePageChange(val) {
      this.cur_page = val;
      // this.cur_page = 1;
      console.log("是否赛选：" + this.casYears.length);
      if (this.casYears.length > 0) {
        this.select_yearChange(this.casYears);
      } else {
        this.getDataByPage();
      }
    },
    // 分页
    getDataByPage() {
      console.log("开始分页");
      ApiArrange.getDataByPage(
        { page: this.cur_page, word: this.select_word },
        res => {
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
        }
      );
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
      this.$router.push({ name: "arrangeEdit", query: { id: row._id } });
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiRollcall.getData({ arrange: this.temDelRow._id }, res => {
        console.log(res);
        if (res.data.length > 0) {
          this.$message.error(`删除失败，该排课信息正在【点名记录表】中使用。`);
        } else {
          ApiArrange.deleteById(this.temDelRow._id, res => {
            console.log(res);
            if (res.status == "y") {
              this.$message.success("排课记录删除成功~");
            } else {
              this.$message.success("排课记录删除失败！");
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