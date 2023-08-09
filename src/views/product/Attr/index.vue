<template>
  <div>
    <el-card style="margin: 10px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 5px"
          :disabled="!category3Id"
          @click="addAttr"
          >添加</el-button
        >
        <el-table border :data="attrList" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
          ></el-table-column>
          <el-table-column prop="attrValuelist" label="属性值列表">
            <template slot-scope="scope">
              <el-tag
                v-for="(item, index) in scope.row.attrValueList"
                :key="index"
                type="sucess"
                style="margin: 0 10px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="small"
                icon="el-icon-edit"
                @click="updateAttr(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" :model="attrInfo" class="demo-form-inline">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
        >
          添加属性值</el-button
        >
        <el-button @click="isShowTable = 'true'">取消</el-button>
        <el-table
          :data="attrInfo.attrValueList"
          border
          style="width: 100%; margin: 10px 0"
        >
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="prop" width="width">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = 'true'">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的 深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "attr",
  data() {
    return {
      category3Id: "",
      // 商品属性
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [
          // 属性值列表
          // {
          //   attrId: 0, // 属性名id
          //   valueName: "", // 属性名
          // },
        ],
        categoryId: 0, // 三级分类id
        categoryLevel: 3, // 服务器用到的分类级别
      },
    };
  },
  methods: {
    getCategoryId({ category1Id, category2Id, category3Id }) {
      this.category3Id = category3Id;
      if (category3Id !== "") {
        this.$API.attr
          .reqAttrInfoList(category1Id, category2Id, category3Id)
          .then((res) => {
            if (res.code === 200) {
              this.attrList = res.data;
            }
          });
      }
    },
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "", // 属性名
        attrValueList: [],
        categoryId: this.category3Id, // 三级分类id
        categoryLevel: 3, // 服务器用到的分类级别
      };
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: undefined,
        valueName: "",
      });
    },
    updateAttr(row){
      this.isShowTable = false
      this.attrInfo = cloneDeep(row)
    },
  },
};
</script>

<style></style>
