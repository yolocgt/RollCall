<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 关于</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <h1>rollcall-system</h1>
                <p>基于Vue.js 2.x系列 + Element UI 的学生点名后台管理系统</p>
                <h2>前言</h2>
                <p>随着社会的发展和信息技术的进步，全球信息化的趋势越来越明显。几乎没有一个学校不在走信息化的路子，都在用自己的智慧将工作效率一步一步的提升。在现在的高校中，由于学生的分布式教学，造成了教学管理的不严谨性，使得一些学生产生了逃课旷课的侥幸心理。所以教师的任务不仅仅是教学，还要同时负担考勤等烦杂的日常事务，这样就会严重影响到教师的授课时间，同时也影响了学生的听课时间。因此，信息化给这样的一个状况带来了一个契机，基于信息化的考勤系统就在这种情况下变的越来越受欢迎，它给教师带来了更加高效的处理考勤的方法，使得教学能够比较顺利的进行下去，不会再因为考勤等烦杂事务影响教学</p>
                <p>对于大学生的考勤方面，现在越来越显示出重要性。虽然大学生都已经步入成年，但是有些时候会出现小小的偷懒也情有可原。很多方面还需要代课老师和学校的监督，当然对于上课点名很占用时间，而且效果不好，老师也不能对学生每次点名情况都有明确的了解，所以一个可视化的点名系统成为必须。</p>
                <p>此外，对于学生上课表现情况，老师可以对问题的次数以及质量来进行打分。所以在上课时有一个能够面向学生的点名系统对学生的进行的提问也成为老师们十分想要的一个系统。</p>
                <h2>功能</h2>
                <el-checkbox disabled checked>Vue 2.x</el-checkbox>
                <br>
                <el-checkbox disabled checked>Element UI</el-checkbox>
                <br>
                <el-checkbox disabled checked>LocalStorage</el-checkbox>
                <br>
                <el-checkbox disabled checked>Express框架</el-checkbox>
                <br>
                <el-checkbox disabled checked>Webpack打包</el-checkbox>
                <br>
                <el-checkbox disabled checked>ES6 Babel</el-checkbox>
                <br>
                <el-checkbox disabled checked>Cookie</el-checkbox>
                <br>
                <el-checkbox disabled checked>登录/注销</el-checkbox>
                <br>
                <el-checkbox disabled checked>表格</el-checkbox>
                <br>
                <el-checkbox disabled checked>表单</el-checkbox>
                <br>
                <!-- <el-checkbox disabled checked>图表</el-checkbox>
                <br>
                <el-checkbox disabled checked>富文本编辑器</el-checkbox>
                <br>
                <el-checkbox disabled checked>markdown编辑器</el-checkbox>
                <br>
                <el-checkbox disabled checked>图片拖拽/裁剪上传</el-checkbox>
                <br>
                <el-checkbox disabled checked>列表拖拽排序</el-checkbox>
                <br> -->
                <el-checkbox disabled checked>支持切换主题色</el-checkbox>
                <br>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>