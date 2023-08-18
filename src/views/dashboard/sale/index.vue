<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" style="display: inline-block">
          <el-tab-pane label="销售额" name="first"> </el-tab-pane>
          <el-tab-pane label="访问量" name="second"> </el-tab-pane>
        </el-tabs>
        <div style="float: right; padding: 3px 0">
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row>
          <el-col :span="18">
            <div class="echarts" ref="bar"></div>
          </el-col>
          <el-col :span="6" class="right">
            <h3>门店销售额排名</h3>
            <ul>
              <li>
                <span class="index">1</span>
                <span>肯德基</span>
                <span class="num">223,123</span>
              </li>
              <li>
                <span class="index">3</span>
                <span>肯德基</span>
                <span class="num">223,123</span>
              </li>
              <li>
                <span class="index">3</span>
                <span>肯德基</span>
                <span class="num">223,123</span>
              </li>
              <li>
                <span>4</span>
                <span>肯德基</span>
                <span class="num">223,123</span>
              </li>
              <li>
                <span>5</span>
                <span>肯德基</span>
                <span class="num">223,123</span>
              </li>
              <li>
                <span>6</span>
                <span>肯德基</span>
                <span class="num">223,123</span>
              </li>
              <li>
                <span>7</span>
                <span>肯德基</span>
                <span class="num">223,123</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "sale",
  data() {
    return {
      activeName: "first",
      value1: "",
    };
  },
  mounted() {
    const myChart = echarts.init(this.$refs.bar);
    myChart.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    });
  },
};
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.echarts {
  width: 100%;
  height: 300px;
}
.right{
  padding: 0px;
}
ul{
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 15px 0;
}
.index {
  width: 20px;
  height: 20px;
  float: left;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  text-align: center;
}
.num {
  float: right;
}
</style>
