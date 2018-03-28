<template>
  <div>
    <div id="eat"></div>
  </div>
</template>

<script>
import echarts from "echarts";
// import data from 'static/data/data2.json';
import { ApiRollcall, ApiAbsence } from "../../service/apis";
import axios from "axios";

export default {
  data() {
    return {
      chart: null,
      arr: {}
    };
  },
  methods: {
    drawBar(id) {
      var _this = this;
      new Promise(resolve => {
        ApiRollcall.getDataByPage({ page: this.cur_page }, res => {
          var rollcallData = res.data.res; //获取分页数据
          for (let i = 0; i < rollcallData.length; i++) {
            ApiAbsence.getData({ rollcall: rollcallData[i]._id }, res => {
              rollcallData[i].absentNum = res.data.length;
            });
            ApiAbsence.getData({ rollcall2: rollcallData[i]._id }, res => {
              rollcallData[i].tardinessNum = res.data.length;
            });
          }
          // console.clear();
          resolve(rollcallData);
          })
        }).then((val) => {
          var name = [];
          var value = [];
          val.forEach(item => {
            var obj = {};
            name.push(item.arrange.classInfo.className);
            value.push(item.absentNum);
          });
          _this.arr.name=name;
          _this.arr.value=value;
          // console.log(mydata);
          // return mydata;

          // alert(_this.arr);
        // _this.arr.name='cgt'
          console.log(_this.arr);
          this.chart = echarts.init(document.getElementById(id));
          this.chart.setOption({
            tooltip: {
              trigger: "axis"
            },
            toolbox: {
              feature: {
                magicType: { show: true, type: ["line", "bar"] },
                saveAsImage: { show: true },
                dataView: { show: true, readOnly: false }
              },
              top: 10,
              right: 15
            },
            calculable: true,
            grid: {
              left: "3%",
              right: "6%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: _this.arr.name
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "人数",
                max: 35
              }
            ],
            series: [
              {
                name: "缺勤人数",
                type: "bar",
                markPoint: {
                  data: [
                    { type: "max", name: "最大值" },
                    { type: "min", name: "最小值" }
                  ]
                },
                markLine: {
                  data: [{ type: "average", name: "平均值" }]
                },                itemStyle: {
                  normal: {
                    barBorderRadius: 20,

                    color: "#726dd1",
                    shadowColor: "rgba(0, 0, 0, 0.4)",
                    shadowBlur: 20
                  }
                },
                data: _this.arr.value
              }
            ]
          });
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawBar("eat");
      var that = this;
      var resizeTimer = null;
      window.onresize = function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          that.drawBar("eat");
        }, 100);
      };
    });
  }
};
</script>

<style scoped>
#eat {
  position: relative;
  left: 50%;
  width: 90%;
  height: 600px;
  margin-left: -45%;
  box-shadow: 0 0 10px #726dd1;
  border-radius: 10px;
}
</style>