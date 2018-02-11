import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/manageadmin'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                /////
                {
                    path: '/addadmin',
                    name: 'addadmin',
                    component: resolve => require(['../components/page/AddAdmin.vue'], resolve)    // 添加管理员
                },
                {
                    path: '/manageadmin',
                    name: 'manageadmin',
                    component: resolve => require(['../components/page/ManageAdmin.vue'], resolve)    // 管理管理员
                },
                {
                    path: '/modifypsw',
                    component: resolve => require(['../components/page/ModifyPsw.vue'], resolve)    // 修改密码
                    // component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                }
                , {
                    path: '/addfaculty',
                    name: 'addfaculty',
                    component: resolve => require(['../components/page/AddFaculty.vue'], resolve)    // 添加院系信息
                }
                , {
                    path: '/managefaculty',
                    name: 'managefaculty',
                    component: resolve => require(['../components/page/ManageFaculty.vue'], resolve)    // 管理院系信息
                }
                , {
                    path: '/addmajor',
                    name: 'addmajor',
                    component: resolve => require(['../components/page/AddMajor.vue'], resolve)    // 添加院系信息
                }
                , {
                    path: '/managemajor',
                    name: 'managemajor',
                    component: resolve => require(['../components/page/ManageMajor.vue'], resolve)    // 管理院系信息
                }
                , {
                    path: '/addclass',
                    name: 'addclass',
                    component: resolve => require(['../components/page/AddClass.vue'], resolve)    // 添加班级
                }
                , {
                    path: '/manageclass',
                    name: 'manageclass',
                    component: resolve => require(['../components/page/ManageClass.vue'], resolve)    // 管理班级
                }
                , {
                    path: '/managerollcall',
                    component: resolve => require(['../components/page/ManageRollcall.vue'], resolve)    // 管理点名
                }
                , {
                    path: '/addcourse',
                    name:'addcourse',
                    component: resolve => require(['../components/page/AddCourse.vue'], resolve)    // 添加课程
                }
                , {
                    path: '/managecourse',
                    name:'managecourse',
                    component: resolve => require(['../components/page/ManageCourse.vue'], resolve)    // 管理课程
                }
                , {
                    path: '/addstudent',
                    name: 'addstudent',
                    component: resolve => require(['../components/page/AddStudent.vue'], resolve)    // 添加学生
                }
                , {
                    path: '/managestudent',
                    name: 'managestudent',
                    component: resolve => require(['../components/page/ManageStudent.vue'], resolve)    // 管理学生
                }
                , {
                    path: '/addteacher',
                    name: 'addteacher',
                    component: resolve => require(['../components/page/AddTeacher.vue'], resolve)    // 添加教师
                }
                , {
                    path: '/manageteacher',
                    name: 'manageteacher',
                    component: resolve => require(['../components/page/ManageTeacher.vue'], resolve)    // 管理教师
                }
                , {
                    path: '/addcounselor',
                    name: 'addcounselor',
                    component: resolve => require(['../components/page/AddCounselor.vue'], resolve)    // 添加辅导员
                }
                , {
                    path: '/managecounselor',
                    name: 'managecounselor',
                    component: resolve => require(['../components/page/ManageCounselor.vue'], resolve)    // 管理辅导员
                }
                , {
                    path: '/addarrange',
                    name: 'addarrange',
                    component: resolve => require(['../components/page/AddArrange.vue'], resolve)    // 添加排课
                }
                , {
                    path: '/managearrange',
                    name: 'managearrange',
                    component: resolve => require(['../components/page/ManageArrange.vue'], resolve)    // 管理排课
                }
                , {
                    path: '/addrollcall',
                    name: 'addrollcall',
                    component: resolve => require(['../components/page/AddRollcall.vue'], resolve)    // 添加点名信息
                }
                , {
                    path: '/managerollcall',
                    name: 'managerollcall',
                    component: resolve => require(['../components/page/ManageRollcall.vue'], resolve)    // 管理点名信息
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
