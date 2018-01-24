<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>管理辅导员信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
              <el-select v-model="select_cate" placeholder="筛选" class="handle-select mr10">
                  <el-option 
                        v-for="f in faculty" 
                        :key="f._id" 
                        :label="f.facultyName" 
                        :value="f._id"></el-option>
              </el-select>
            <el-input v-model="select_word" placeholder="查询关键词" class="handle-input mr10" @change="getDataByPage"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div> -->
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" ></el-table-column>
            <el-table-column prop="name" label="姓名" sortable > </el-table-column>
            <el-table-column prop="sex" label="性别" sortable > </el-table-column>
            <el-table-column prop="id" label="工号" sortable > </el-table-column>
            <el-table-column prop="phone" label="电话"> </el-table-column>
            <!-- <el-table-column prop="password" label="密码" > </el-table-column> -->
            <el-table-column prop="facultyName.facultyName" label="学院" > </el-table-column>
            <el-table-column prop="className.major.majorName" label="班级" > </el-table-column>
            <el-table-column label="操作" width="150">
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
import { ApiHeadteacher, ApiFaculty } from "../../service/apis";

export default {
  data() {
    return {
		faculty:"",
      url: "./static/vuetable.json",
      tableData: [],
      allData: [],
      multipleSelection: [],
      select_cate: "",
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
    ApiFaculty.getData(res => {
      this.faculty = res.data;
    });
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
      ApiHeadteacher.getDataByPage(this.cur_page, this.select_word, res => {
        this.tableData = res.data.res; //获取分页数据
        this.pageCount = res.data.pageCount; //获取总页数
      });
    },
    // 所有数据
    getData() {
      ApiHeadteacher.getData(res => {
        this.allData = res.data.res; //获取所有数据
      });
    },
    // 当前页码改变事件
    handlePageChange(val) {
      this.cur_page = val;
      this.getDataByPage();
    },
    search() {
      this.is_search = true;
      this.$axios
        // .get("/users")
        .get("https://www.easy-mock.com/mock/5a5f683e0432ec5372566b80")
        .then(data => {
          console.log(data.data.data.users);
          var users = data.data.data.users;
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            ApiHeadteacher.save(user, res => {
              if (res.status == "y") {
                this.$message.success("数据加载成功");
                this.getDataByPage();
              }
            });
          }
        });
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      // this.$message("编辑第" + (index + 1) + "行");
      console.log(row._id);
      this.$router.push({ name: "addheadteacher", params: { id: row._id } });
    },
    // 确认删除提示框
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.dialogMsg = `确认删除辅导员：${row.name}`;
      this.temDelRow = row;
    },
    // 删除
    doDel() {
      this.dialogVisible = false;
      ApiHeadteacher.deleteById(this.temDelRow._id, res => {
        console.log(res);
        if (res.status == "y") {
          this.$message.success("删除成功~");
        } else {
          this.$message.success("删除失败！");
        }
        //刷新页面
        // this.$router.go(0);
        // this.$root.reload();
        // this.$router.push({
        //   name: "manageheadteacher",
        //   query: { random: Math.random() }
        // });
        this.getDataByPage();
      });
    },
    delAll() {
      length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      var delStatus = false;

      let promise = new Promise(function(resolve, reject) {
        console.log("Promise");
        resolve();
      });
      promise
        .then(() => {
          for (let i = 0; i < length; i++) {
            str += this.multipleSelection[i].name + ",";
            var id = this.multipleSelection[i]._id;
            ApiHeadteacher.deleteById(id, res => {
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