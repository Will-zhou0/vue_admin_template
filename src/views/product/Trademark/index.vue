<template>
  <div>
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <el-table border style="width: 100%">
      <el-table-column prop="id" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="品牌名称"> </el-table-column>
      <el-table-column prop="logo" label="品牌Logo"> </el-table-column>
      <el-table-column prop="operation" label="操作"> </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :total="66"
      :current-page="3"
      :page-size="3"
      :page-sizes="[3, 5, 10]"
      :pager-count="7"
      layout="prev, pager, next, jumper, ->, sizes, total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "trademark",
  data() {
    return {
      page: 1,
      limit: 3
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList() {
      const { page, limit } = this;
      // 获取品牌列表的接口
      const res = await this.$API.trademark.reqTrademarkList(page, limit);
      // this.$API.trademark.reqTrademarkList(page,limit).then((res) => {
      //   console.log(res);
      // });
      console.log(res);
    },
  },
};
</script>

<style></style>
