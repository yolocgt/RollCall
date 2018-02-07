<template >
    <div class="wrapper" v-if="seen">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
  data() {
    return {
      isLogin: false
    };
  },
  created: function() {
    // if (!this.seen) {
    //   this.$message({
    //     showClose: true,
    //     message: "您可能没有权限访问，请与管理员联系",
    //     type: "error"
    //   });
    //   this.$router.push("/login");
    // }
  },
  computed: {
    seen() {
      this.isLogin = this.$cookie.get("username") != null ? true : false;
      console.log(this.isLogin);
      return this.isLogin;
    }
  },
  // watch: {
  //   firstName: function(val) {
  //     this.fullName = val + " " + this.lastName;
  //   }
  // },
  components: {
    vHead,
    vSidebar
  }
};
</script>
