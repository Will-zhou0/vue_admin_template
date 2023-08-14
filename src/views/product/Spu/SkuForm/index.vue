<template>
  <div>
    <el-form>
      <el-form-item label="SPU名称">海绵宝宝</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value=""></el-select>
          </el-form-item>
          <el-form-item label="无线通信">
            <el-select placeholder="请选择" value=""></el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item label="颜色">
            <el-select placeholder="请选择">
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border style="width: 100%">
          <el-table-column type="slection" width="80"></el-table-column>
          <el-table-column label="图片"></el-table-column>
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skuform",
  data() {
    return {
      spuImageList:[],
      spuSaleAttrList:[],
      attrInfoList:[],
    };
  },
  methods: {
    getData(category1Id, category2Id, row) {
      this.$API.sku.reqSpuImageList(row.id).then((res) => {
        if (res.code === 200) {
          this.spuImageList = res.data;
        }
      });
      this.$API.sku.reqSpuSaleAttrList(row.id).then((res) => {
        if (res.code === 200) {
          this.spuSaleAttrList = res.data;
        }
      });
      this.$API.sku.reqAttrInfoList(category1Id, category2Id, row.category3Id).then((res) => {
        if (res.code === 200) {
          this.attrInfoList = res.data;
        }
      });
    },
  },
};
</script>

<style></style>
