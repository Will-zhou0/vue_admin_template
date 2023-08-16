<template>
  <div>
    <el-table :data="skuList" border style="width: 100%">
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column
        label="名称"
        prop="skuName"
        width="width"
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="skuDesc"
        width="width"
      ></el-table-column>
      <el-table-column label="默认图片" prop="prop" width="width">
        <template slot-scope="scope">
          <img
            :src="scope.row.skuDefaultImg"
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(KG)"
        prop="weight"
        width="width"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        prop="price"
        width="width"
      ></el-table-column>
      <el-table-column label="操作" prop="prop" width="width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isSale == 1"
            type="success"
            size="mini"
            icon="el-icon-arrow-down"
            @click="cancelSale(scope.row)"
          ></el-button>
          <el-button
            v-else
            type="success"
            size="mini"
            icon="el-icon-arrow-up"
            @click="onSale(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="getInfo(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteSku(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="rtl"
      :show-close="false"
      :before-close="handleClose"
      size="50%"
    >
    <el-row>
  <el-col :span="5">标题</el-col>
  <el-col :span="7">标题1111</el-col>
</el-row>
    </el-drawer>
    <el-pagination
      style="text-align: center"
      :total="pageInfo.total"
      :current-page="pageInfo.page"
      :page-size="pageInfo.pageSize"
      :page-sizes="[3, 5, 10]"
      @current-change="pageChange"
      @size-change="sizeChange"
      layout="prev, pager, next, jumper, ->, sizes, total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getInfo } from "@/api/user";

export default {
  name: "sku",
  data() {
    return {
      skuList: [],
      skuInfo: {},
      drawer: false,
      pageInfo: {
        total: 0,
        page: 1,
        pageSize: 5,
      },
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    getSkuList() {
      console.log("获取sku列表");
      const { page, pageSize } = this.pageInfo;
      this.$API.sku.reqSkuListPage(page, pageSize).then((res) => {
        if (res.code == 200) {
          this.skuList = res.data.records;
          this.pageInfo.total = res.data.total;
        }
      });
    },

    // 操作相关回调
    // sku下架
    cancelSale(row) {
      this.$API.sku.reqCancelSale(row.id).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "下架成功",
          });
          this.getSkuList();
        }
      });
    },
    // sku上架
    onSale(row) {
      this.$API.sku.reqOnSale(row.id).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "上架成功",
          });
          this.getSkuList();
        }
      });
    },
    // 编辑操作
    edit(row) {
      // 正在开发中
      this.$message({
        type: "warning",
        message: "正在开发中",
      });
    },
    // 查看sku信息
    getInfo(row) {
      this.$API.sku.reqSkuInfos(row.id).then((res) => {
        if (res.code === 200) {
          this.skuInfo = res.data;
          this.drawer = true;
        }
      });
    },
    // 删除sku
    deleteSku(row) {},

    // 抽屉组件关闭回调
    handleClose() {
      this.drawer = false;
    },

    // 分页器组件事件触发函数
    pageChange(page) {
      this.pageInfo.page = page;
      this.getSkuList();
    },
    sizeChange(size) {
      this.pageInfo.pageSize = size;
      this.getSkuList();
    },
  },
};
</script>

<style></style>
