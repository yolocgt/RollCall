<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>基础图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vue-schart：vue.js封装sChart.js的图表组件。
            访问地址：<a href="https://github.com/lin-xin/vue-schart" target="_blank">vue-schart</a>
        </div>
        <div class="schart">
            <div class="content-title">柱状图</div>
            <schart canvasId="bar" width="500" height="400" :data="data1" type="bar" :options="options1"></schart>
        </div>
        <div class="schart">
        <div class="content-title">折线图</div>
        <schart canvasId="line" width="500" height="400" :data="data1" type="line" :options="options1"></schart>
        </div>
        <div class="schart">
        <div class="content-title">饼状图</div>
        <schart canvasId="pie" width="500" height="400" :data="data2" type="pie" :options="options2"></schart>
        </div>
        <div class="schart">
        <div class="content-title">环形图</div>
        <schart canvasId="ring" width="500" height="400" :data="data2" type="ring" :options="options2"></schart>
        </div>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { ApiRollcall, ApiAbsence } from "../../service/apis";

export default {
  components: {
    Schart
  },
  data: () => ({
    data1: [],
    data2: [
      { name: "短袖", value: 1200 },
      { name: "休闲裤", value: 1222 },
      { name: "连衣裙", value: 1283 },
      { name: "外套", value: 1314 },
      { name: "羽绒服", value: 2314 }
    ],
    options1: {
      title: "某商店近年营业总额",
      bgColor: "#009688",
      titleColor: "#ffffff",
      fillColor: "#e0f2f1",
      axisColor: "#ffffff",
      contentColor: "#999"
    },
    options2: {
      title: "某商店各商品年度销量",
      bgColor: "#607d8b",
      titleColor: "#ffffff",
      legendColor: "#ffffff"
    }
  }),
  mounted() {
    this.getData();
  },
  computed: {
    getData() {
      var _this=this;
      ApiRollcall.getDataByPage({ page: this.cur_page }, res => {
        var rollcallData = res.data.res; //获取分页数据
        new Promise(resolve => {
          for (let i = 0; i < rollcallData.length; i++) {
            ApiAbsence.getData({ rollcall: rollcallData[i]._id }, res => {
              //   console.log(res);
              rollcallData[i].absentNum = res.data.length;
            });
            ApiAbsence.getData({ rollcall2: rollcallData[i]._id }, res => {
              //   console.log("迟到的、、、");
              //   console.log(res);
              rollcallData[i].tardinessNum = res.data.length;
            });
          }
          console.clear();
          //   console.log(rollcallData);
          resolve();
        }).then(() => {
          //   this.tableData = rollcallData;
          //   this.pageCount = res.data.pageCount; //获取总页数
          //   console.log(rollcallData);
          var mydata = [];
          rollcallData.forEach(item => {
            var obj = {};
            obj.name = item.arrange.classInfo.className;
            obj.value = item.absentNum;
            mydata.push(obj);
          });
          console.log(mydata);
          
          _this.data1 = mydata
          alert(2)
          console.log(_this.data1);
          // _this.data1 = [
          //   { name: "2012", value: 111141 },
          //   { name: "2013", value: 1499 },
          //   { name: "2014", value: 5260 },
          //   { name: "2015", value: 1170 },
          //   { name: "2016", value: 970 },
          //   { name: "2017", value: 1450 }
          // ];
          return _this.data1;
        });
      });
    }
  }
};
</script>

<style scoped>
.schart {
  width: 600px;
  display: inline-block;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>