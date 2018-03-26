<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
              <template v-for="item in items">
                  <template v-if="item.subs">
                      <el-submenu :index="item.index" :key="item.index">
                          <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                          <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                          </el-menu-item>
                      </el-submenu>
                  </template>
                  <template v-else>
                      <el-menu-item :index="item.index" :key="item.index">
                          <i :class="item.icon"></i>{{ item.title }}
                      </el-menu-item>
                  </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created: function() {
    var role = this.$cookie.get("userrole");
    // 管理员
    if (role == "admin") {
      this.items.push(
        {
          icon: "el-icon-setting",
          index: "system",
          title: "系统管理",
          subs: [
            {
              index: "readme",
              title: "关于系统"
            },
            {
              index: "adminEdit",
              title: "编辑管理员"
            },
            {
              index: "adminManage",
              title: "管理员管理"
            }
            // ,{
            //   index: "modifypsw",
            //   title: "修改登录密码  "
            // }
          ]
        },
        {
          icon: "el-icon-setting",
          index: "faculty",
          title: "院系信息管理",
          subs: [
            {
              index: "facultyEdit",
              title: "编辑院系信息"
            },
            {
              index: "facultyManage",
              title: "管理院系信息"
            }
          ]
        },
        {
          icon: "el-icon-star-on",
          index: "user",
          title: "用户信息管理",
          subs: [
            {
              index: "counselorEdit",
              title: "编辑辅导员信息"
            },
            {
              index: "counselorManage",
              title: "管理辅导员信息"
            },
            {
              index: "teacherEdit",
              title: "编辑任课教师"
            },
            {
              index: "teacherManage",
              title: "管理任课教师"
            }
          ]
        },
        {
          icon: "el-icon-menu",
          index: "rollcall",
          title: "课程信息管理",
          subs: [
            {
              index: "courseEdit",
              title: "编辑课程信息"
            },
            {
              index: "courseManage",
              title: "管理课程信息"
            }
          ]
        },
        {
          icon: "el-icon-menu",
          index: "rollcall2",
          title: "专业信息管理",
          subs: [
            {
              index: "majorEdit",
              title: "编辑专业信息"
            },
            {
              index: "majorManage",
              title: "管理专业信息"
            }
          ]
        },
        {
          icon: "el-icon-star-on",
          index: "classs",
          title: "班级信息管理",
          subs: [
            {
              index: "classEdit",
              title: "编辑班级信息"
            },
            {
              index: "classManage",
              title: "管理班级信息"
            }
          ]
        },
        {
          icon: "el-icon-star-on",
          index: "user2",
          title: "学生信息管理",
          subs: [
            {
              index: "studentEdit",
              title: "编辑学生信息"
            },
            {
              index: "studentManage",
              title: "管理学生信息"
            }
          ]
        },
        {
          icon: "el-icon-date",
          index: "course",
          title: "排课点名管理",
          subs: [
            {
              index: "arrangeEdit",
              title: "编辑排课信息"
            },
            {
              index: "arrangeManage",
              title: "管理排课信息"
            },
            // {
            //   index: "rollcallEdit",
            //   title: "编辑点名信息"
            // },
            {
              index: "rollcallManage",
              title: "管理点名信息"
            }
            // ,{
            //   index: "absenceManage",
            //   title: "管理考勤信息"
            // }
              ,{
              index: "chart",
              title: "出勤率报表"
            },
          ]
        },
        {
          icon: "el-icon-date",
          index: "course2",
          title: "考勤信息管理",
          subs: [
            {
              index: "absenceManage",
              title: "管理考勤信息"
              // , subs:
              // [{
              //   index: "absenceEdit",
              //   title: "编辑考勤信息"
              // }]
            }
            // , {
            //   index: "absenceEdit",
            //   title: "编辑考勤信息"
            // }
          ]
        },

        // {
        //   icon: "el-icon-menu",
        //   index: "7",
        //   title: "表格",
        //   subs: [
        //     {
        //       index: "basetable",
        //       title: "基础表格"
        //     },
        //     {
        //       index: "vuetable",
        //       title: "Vue表格组件"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-date",
        //   index: "4",
        //   title: "表单",
        //   subs: [
        //     {
        //       index: "baseform",
        //       title: "基本表单"
        //     },
        //     {
        //       index: "vueeditor",
        //       title: "编辑器"
        //     },
        //     {
        //       index: "markdown",
        //       title: "markdown"
        //     },
        //     {
        //       index: "upload",
        //       title: "文件上传"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-star-on",
        //   index: "basecharts",
        //   title: "图表"
        // },
        // {
        //   icon: "el-icon-upload2",
        //   index: "drag",
        //   title: "拖拽"
        // }
      );
    } else if (role == "student") {
      //学生
      this.items.push({
        icon: "el-icon-setting",
        index: "system",
        title: "系统管理",
        subs: [
          {
            index: "adminEdit",
            title: "编辑管理员"
          },
          {
            index: "adminManage",
            title: "管理员管理"
          },
          {
            index: "modifypsw",
            title: "修改登录密码  "
          }
        ]
      });
    } else if (role == "teacher") {
      //教师
      this.items.push(
        {
          icon: "el-icon-menu",
          index: "rollcall",
          title: "课程信息管理",
          subs: [
            {
              index: "courseEdit",
              title: "编辑课程信息"
            },
            {
              index: "courseManage",
              title: "管理课程信息"
            },
            {
              index: "arrangeEdit",
              title: "编辑排课信息"
            },
            {
              index: "arrangeManage",
              title: "管理排课信息"
            }
          ]
        },
        {
          icon: "el-icon-star-on",
          index: "user",
          title: "学生信息管理",
          subs: [
            {
              index: "studentEdit",
              title: "编辑学生信息"
            },
            {
              index: "studentManage",
              title: "管理学生信息"
            }
          ]
        },
        {
          icon: "el-icon-date",
          index: "course",
          title: "点名信息管理",
          subs: [
            {
              index: "rollcallEdit",
              title: "编辑点名信息"
            },
            {
              index: "rollcallManage",
              title: "管理点名信息"
            }
          ]
        },
        {
          icon: "el-icon-date",
          index: "course2",
          title: "考勤信息管理",
          subs: [
            {
              index: "absenceManage",
              title: "管理考勤信息"
            }
          ] 
        },
      );
    } else if (role == "counselor") {
      //辅导员
      this.items.push({
        icon: "el-icon-menu",
        index: "rollcall",
        title: "课程信息管理",
        subs: [
          {
            index: "courseEdit",
            title: "编辑课程信息"
          },
          {
            index: "courseManage",
            title: "管理课程信息"
          }
        ]
      });
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", ""); //amdEditin
    }
  },
  methods: {}
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
  overflow-y: auto;
}
/* 实现隐藏滚动条同时又可以滚动 */
/*  如果要兼容 PC 其他浏览器（IE、Firefox 等），国外一位才人 John Kurlak 也研究出了一种办法。
    在容器外面再嵌套一层 overflow:hidden 内部内容再限制尺寸和外部嵌套层一样，就变相隐藏了。
    参考 https://www.cnblogs.com/alice626/p/6206760.html  */
.sidebar::-webkit-scrollbar {
  display: none;
}
.sidebar > ul {
  height: 100%;
}
</style>
