<template>
    <div class="header">
        <div class="logo"><img class="user-logo" src="../../../static/img/LOGO.png">学生点名管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{name}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  computed: {
    name() {
      // this.username = this.$cookie.get("username");
      // return this.username ? this.username : "匿名用户";
      let name = localStorage.getItem("name");
      return name ? name : "匿名用户";
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        // localStorage.removeItem("ms_username");
        this.$cookie.delete("username");
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
}
.header .logo {
  float: left;
  width: 380px;
  text-align: center;
}
.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}
.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.logo .user-logo {
  position: absolute;
  left: 20px;
  top: 5px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
