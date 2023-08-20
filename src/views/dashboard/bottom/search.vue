<template>
  <div>
    <div class="header">
      <span>{{ title }}</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="num">
      <span style="font-size: 25px;">{{ num }}</span>
      <span style="font-size: 10px; padding-left: 30px;">{{ rate }}</span>
      <i :class="rate > 0 ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
    </div>
    <div class="chart" ref="smoothLine"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "search",
  props: ["title", "num", "rate"],
  mounted() {
    const myChart = echarts.init(this.$refs.smoothLine);
    myChart.setOption({
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        show: false,
      },
      grid: {
        left:0,
        right:0,
        bottom:0,
        top:0,
      },
      series: [
        {
          smooth: true,
          type: "line",
          data: [
            11, 12, 10,13, 14, 16, 7, 5,11, 8, 9, 10
          ],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "blue",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
.el-icon-caret-top {
  color: red;
}
.el-icon-caret-bottom {
  color: green;
}
.chart{
  width: 100%;
  height: 100px;
}
</style>
