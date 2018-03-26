import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/adminManage'
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
                    component: resolve => require(['../components/page/original/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/original/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/original/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/original/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/original/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/original/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/original/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/original/DragList.vue'], resolve)    // 拖拽列表组件
                },
                /////
                {
                    path: '/adminEdit',
                    name: 'adminEdit',
                    component: resolve => require(['../components/page/AdminEdit.vue'], resolve)    // 添加管理员
                },
                {
                    path: '/adminManage',
                    name: 'adminManage',
                    component: resolve => require(['../components/page/AdminManage.vue'], resolve)    // 管理管理员
                },
                {
                    path: '/modifypsw',
                    component: resolve => require(['../components/page/ModifyPsw.vue'], resolve)    // 修改密码
                    // component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                }
                , {
                    path: '/facultyEdit',
                    name: 'facultyEdit',
                    component: resolve => require(['../components/page/FacultyEdit.vue'], resolve)    // 添加院系信息
                }
                , {
                    path: '/facultyManage',
                    name: 'facultyManage',
                    component: resolve => require(['../components/page/FacultyManage.vue'], resolve)    // 管理院系信息
                }
                , {
                    path: '/majorEdit',
                    name: 'majorEdit',
                    component: resolve => require(['../components/page/MajorEdit.vue'], resolve)    // 添加院系信息
                }
                , {
                    path: '/majorManage',
                    name: 'majorManage',
                    component: resolve => require(['../components/page/MajorManage.vue'], resolve)    // 管理院系信息
                }
                , {
                    path: '/classEdit',
                    name: 'classEdit',
                    component: resolve => require(['../components/page/ClassEdit.vue'], resolve)    // 添加班级
                }
                , {
                    path: '/classManage',
                    name: 'classManage',
                    component: resolve => require(['../components/page/ClassManage.vue'], resolve)    // 管理班级
                }
                , {
                    path: '/rollcallManage',
                    component: resolve => require(['../components/page/RollcallManage.vue'], resolve)    // 管理点名
                }
                , {
                    path: '/courseEdit',
                    name:'courseEdit',
                    component: resolve => require(['../components/page/CourseEdit.vue'], resolve)    // 添加课程
                }
                , {
                    path: '/courseManage',
                    name:'courseManage',
                    component: resolve => require(['../components/page/CourseManage.vue'], resolve)    // 管理课程
                }
                , {
                    path: '/studentEdit',
                    name: 'studentEdit',
                    component: resolve => require(['../components/page/StudentEdit.vue'], resolve)    // 添加学生
                }
                , {
                    path: '/studentManage',
                    name: 'studentManage',
                    component: resolve => require(['../components/page/StudentManage.vue'], resolve)    // 管理学生
                }
                , {
                    path: '/teacherEdit',
                    name: 'teacherEdit',
                    component: resolve => require(['../components/page/TeacherEdit.vue'], resolve)    // 添加教师
                }
                , {
                    path: '/teacherManage',
                    name: 'teacherManage',
                    component: resolve => require(['../components/page/TeacherManage.vue'], resolve)    // 管理教师
                }
                , {
                    path: '/counselorEdit',
                    name: 'counselorEdit',
                    component: resolve => require(['../components/page/CounselorEdit.vue'], resolve)    // 添加辅导员
                }
                , {
                    path: '/counselorManage',
                    name: 'counselorManage',
                    component: resolve => require(['../components/page/CounselorManage.vue'], resolve)    // 管理辅导员
                }
                , {
                    path: '/arrangeEdit',
                    name: 'arrangeEdit',
                    component: resolve => require(['../components/page/ArrangeEdit.vue'], resolve)    // 添加排课
                }
                , {
                    path: '/arrangeManage',
                    name: 'arrangeManage',
                    component: resolve => require(['../components/page/ArrangeManage.vue'], resolve)    // 管理排课
                }
                , {
                    path: '/rollcallEdit',
                    name: 'rollcallEdit',
                    component: resolve => require(['../components/page/RollcallEdit.vue'], resolve)    // 添加点名信息
                }
                , {
                    path: '/rollcallManage',
                    name: 'rollcallManage',
                    component: resolve => require(['../components/page/RollcallManage.vue'], resolve)    // 管理点名信息
                }
                , {
                    path: '/absenceEdit',
                    name: 'absenceEdit',
                    component: resolve => require(['../components/page/AbsenceEdit.vue'], resolve)    // 添加点名信息
                }
                , {
                    path: '/absenceManage',
                    name: 'absenceManage',
                    component: resolve => require(['../components/page/AbsenceManage.vue'], resolve)    // 管理点名信息
                }
                , {
                    path: '/chart',
                    name: 'chart',
                    component: resolve => require(['../components/page/chart.vue'], resolve)    // 管理点名信息
                }
                , {
                    path: '/eat',
                    name: 'eat',
                    component: resolve => require(['../components/page/eat.vue'], resolve)    // 管理点名信息
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
