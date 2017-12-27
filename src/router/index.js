import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
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
                
                {
                    path: '/addadmin',
                    component: resolve => require(['../components/page/AddAdmin.vue'], resolve)    // 添加管理员
                },
                {
                    path: '/manageadmin',
                    component: resolve => require(['../components/page/ManageAdmin.vue'], resolve)    // 添加管理员
                },
                {
                    path: '/modifypsw',
                    component: resolve => require(['../components/page/ModifyPsw.vue'], resolve)    // 添加管理员
                }
                ,{
                    path: '/addfaculty',
                    component: resolve => require(['../components/page/AddFaculty.vue'], resolve)    // 添加院系信息
                }
                ,{
                    path: '/managefaculty',
                    component: resolve => require(['../components/page/ManageFaculty.vue'], resolve)    // 添加院系信息
                }
                ,{
                    path: '/addclass',
                    component: resolve => require(['../components/page/AddClass.vue'], resolve)    // 添加院系信息
                }
                ,{
                    path: '/manageclass',
                    component: resolve => require(['../components/page/ManageClass.vue'], resolve)    // 添加院系信息
                }
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
