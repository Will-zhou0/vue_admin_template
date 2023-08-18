<template>
  <div class="echarts" ref="progressBar">柱状图吧</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ProgressBar",
  mounted() {
    const barChart = echarts.init(this.$refs.progressBar);
    barChart.setOption({
      xAxis: {
        show: false,
        min:0,
        max:100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      },
      series: [
        {
          data: [80],
          type: "bar",
          color: "yellowgreen",
          label:{
            show:true,
            // offset: [70,0],
            position: "right",
            formatter: '|'
          },
          barWidth: 10,
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          }
        },
      ],
    });
  },
};
</script>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
