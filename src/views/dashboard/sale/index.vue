<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
          <el-tab-pane label="访问量" name="visit"> </el-tab-pane>
        </el-tabs>
        <div>
          <div style="display: flex;">
            <div class="tabRight">
              <span @click="setDay">今日</span>
              <span @click="setWeek" >本周</span>
              <span @click="setMonth" >本月</span>
              <span @click="setYear">本年</span>
            </div>
            <el-date-picker
            class="date"
              v-model="date"
              type="daterange"
              range-separator="-"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div>
        <el-row>
          <el-col :span="18">
            <div class="echarts" ref="bar"></div>
          </el-col>
          <el-col :span="6" class="right">
            <h3>{{ title }}</h3>
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
import dayjs from "dayjs";
export default {
  name: "sale",
  data() {
    return {
      activeName: "sale",
      date: "",
      myChart: null,
    };
  },
  computed: {
    title: function () {
      return this.activeName === "sale" ? "销售额" : "访问量";
    },
  },
  watch: {
    title() {
      this.myChart.setOption({
        title: {
          text: this.title + "趋势",
        },
      });
    },
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.bar);
    this.myChart.setOption({
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
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      // console.log(day);
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.data = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.data = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.data = [start, end];
    },
  },
};
</script>

<style scoped>
>>> .el-card__header {
  border-bottom: none;
  padding: 10px 20px 0px 20px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.tabRight{
  width: 100%;
  padding: 10px 0;
}
.tabRight span{
  padding: 0 5px;
}
.echarts {
  width: 100%;
  height: 300px;
}
.right {
  position: absolute;
  right: 0;
}
ul {
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
