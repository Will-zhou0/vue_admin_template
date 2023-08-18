<template>
  <div ref="lineChart" class="echarts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  mounted() {
    let lineChart = echarts.init(this.$refs.lineChart);
    lineChart.setOption({
      xAxis: {
        show: false,
        type: "category",
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
          data: [620, 932, 701, 934, 1290, 1030, 820],
          type: "line",
          smooth: true,
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
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
                  color: "purple", // 0% 处的颜色
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
.echarts {
  width: 100%;
  height: 100%;
}
</style>
