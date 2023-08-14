<template>
  <div>
    <el-card>
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene == 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加Spu</el-button
        >
        <el-table :data="records" border style="width: 100%; margin: 20px 0">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            label="spu名称"
            prop="spuName"
            width="width"
          ></el-table-column>
          <el-table-column
            label="spu描述"
            prop="description"
            width="width"
          ></el-table-column>
          <el-table-column label="操作" prop="prop" width="width">
            <template slot-scope="scope">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                @click="addSku(scope.row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateSpu(scope.row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
              ></el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(scope.row)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                >
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          @current-change="getSpuList"
          @size-change="handlePageSizeChange"
          layout="prev, pager, next, jumper, ->, sizes, total"
        ></el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm/";
import SpuForm from "./SpuForm";
export default {
  name: "spu",
  components: { SkuForm, SpuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      isShowTable: true,
      total: 0,
      records: [],
      page: 1,
      limit: 3,
      scene: 0,
    };
  },
  methods: {
    getCategoryId({ category1Id, category2Id, category3Id }) {
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;
      if (category3Id !== "") {
        this.getSpuList();
      }
    },
    getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      this.$API.spu.reqSpuList(page, limit, category3Id).then((res) => {
        if (res.code === 200) {
          this.total = res.data.total;
          this.records = res.data.records;
        }
      });
    },
    handlePageSizeChange(limit) {
      console.log(limit);
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    addSku(row) {
      this.scene = 2;
      console.log(row);
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    deleteSpu(row) {
      console.log(row);
      this.$API.spu.reqDeleteSpu(row.id).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getSpuList(this.records.length>1?this.page:this.page-1);
        }
      });
    },
    // 自定义事件，切换场景
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag === "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
  },
};
</script>

<style></style>
