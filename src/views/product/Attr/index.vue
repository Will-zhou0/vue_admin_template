<template>
  <div>
    <el-card style="margin: 10px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="isShowTable" ></CategorySelect>
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
              <el-popconfirm :title="`确定删除${scope.row}`">
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
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
                v-if="scope.row.flag"
                v-model="scope.row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="toLook(scope.row)"
                @keyup.native.enter="toLook(scope.row)"
                :ref="scope.$index"
              ></el-input>
              <span v-else @click="toEdit(scope.row, scope.$index)">{{
                scope.row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="scope">
              <el-popconfirm
                :title="`确定删除${scope.row.valueName}吗？`"
                @onConfirm="deleteAttrValue(scope.$index)"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList < 1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
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
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;
      if (category3Id !== "") {
        this.getAttrInfo();
      }
    },
    getAttrInfo() {
      this.$API.attr
        .reqAttrInfoList(this.category1Id, this.category2Id, this.category3Id)
        .then((res) => {
          if (res.code === 200) {
            this.attrList = res.data;
          }
        });
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
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    toLook(row) {
      if (row.valueName.trim() === "") {
        this.$message({
          type: "warning",
          message: "请输入属性值名称",
        });
        return;
      }
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (item !== row) {
          return item.valueName === row.valueName.trim();
        }
      });
      if (isRepeat) {
        this.$message({ message: "属性值名称已存在" });
        return;
      }
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      // console.log(index);
      // console.log(this.$refs[index]);
      this.$nextTick(() => {
        // console.log(this.$refs[index]);
        this.$refs[index].focus();
      });
    },
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    // 最新版本element-ui 为2.15.13 确认事件为 confirm。当前版本 2.13.2 确认事件为 onConfirm
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存按钮 添加或修改属性
    addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName.trim() !== "") {
            delete item.flag;
            return true;
          }
        }
      );
      this.$API.attr.reqAddOrUpdateAttr(this.attrInfo).then((res) => {
        if (res.code === 200) {
          this.getAttrInfo();
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
        this.isShowTable = true;
      });
    },
  },
};
</script>

<style></style>
