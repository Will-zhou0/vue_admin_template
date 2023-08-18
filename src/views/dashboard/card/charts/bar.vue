<template>
  <div class="echarts" ref="bar">
    柱状图吧
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Bar',
  mounted() {
    const barChart = echarts.init(this.$refs.bar)
    barChart.setOption({
      xAxis: {
        type: 'category',
      },
      yAxis: {
        show: false,
      },
      tooltip:{
        show: true,
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      },
      series: [
        {
          data: [120, 40, 60, 180, 100, 70, 110, 160, 180, 120],
          type: 'bar',
          itemStyle: {
            color: 'cyan'
          },
        }
      ]
    })
  },
}
</script>

<style>
 .echarts {
    width: 100%;
    height: 100%;
  }
</style>