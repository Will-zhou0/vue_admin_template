<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <i class="el-icon-info" style="color: #cdcdcd"></i>
    </div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: ['title', 'count'],
  mounted() {
  },
};
</script>

<style scoped>
.card-header{
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
}
.card-content{
    font-size: 30px;
    padding: 10px 0;
}
.card-charts{
    height: 50px;
}
.card-footer{
    border-top: #eee 1px solid;
    padding-top: 10px;
}
</style>
