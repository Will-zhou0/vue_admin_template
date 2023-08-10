<template>
  <div>
    <el-card>
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="isShowTable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus">添加Spu</el-button>
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
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button type="info" icon="el-icon-info" size="mini"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteSpu(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center"
        :total="total"
        :current-page="page"
        :page-size="limit"
        :page-sizes="[1,3, 5, 10]"
        @current-change="getSpuList"
        @size-change="handlePageSizeChange"
        layout="prev, pager, next, jumper, ->, sizes, total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "spu",
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
      const {page, limit, category3Id} = this;
      this.$API.spu
        .reqSpuList(page, limit, category3Id)
        .then((res) => {
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
    deleteSpu(row) {},
  },
};
</script>

<style></style>
