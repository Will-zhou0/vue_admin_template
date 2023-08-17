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
      :visible.sync="drawer"
      direction="rtl"
      :show-close="false"
      :before-close="handleClose"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="(item, index) in skuInfo.skuAttrValueList"
            :key="index"
            type="sucess"
            style="margin-right: 10px"
            >{{ item.attrName }}:{{ item.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="350px">
            <el-carousel-item v-for="(item,index) in skuInfo.skuImageList" :key="index">
              <img :src="item.imgUrl" style="width: 100%; height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
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

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}
/* 样式穿透（父组件中的样式影响到子组件）
  原生css >>>
  scss ::v-deep
  less /deep/
  */
>>>.el-carousel__button {
  background: #000;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
