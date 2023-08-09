<template>
  <div>
    <el-form :inline="true" :model="cForm" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="cForm.category2Id"
          placeholder="请选择"
          @change="handler2"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="cForm.category3Id"
          placeholder="请选择"
          @change="handler3"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      // 一级分类的数据
      list1: [],
      // 二级分类的数据
      list2: [],
      // 三级分类的数据
      list3: [],
      //   相应的一二三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    getCategory1List() {
      this.$API.attr.reqCategory1List().then((res) => {
        if (res.code === 200) {
          this.list1 = res.data;
        }
      });
    },
    handler1() {
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      const { category1Id } = this.cForm;
      this.$API.attr.reqCategory2List(category1Id).then((res) => {
        if (res.code === 200) {
          this.list2 = res.data;
        }
      });
      this.$emit("getCategoryId",this.cForm);
    },
    handler2() {
      this.list3 = [];
      this.cForm.category3Id = "";
      const { category2Id } = this.cForm;
      this.$API.attr.reqCategory3List(category2Id).then((res) => {
        if (res.code === 200) {
          this.list3 = res.data;
        }
      });
      this.$emit("getCategoryId",this.cForm);
    },
    handler3() {
    //   const { category1Id, category2Id, category3Id } = this.cForm;
    //   const categoryId = {category1Id, category2Id, category3Id};
      this.$emit("getCategoryId",this.cForm);
    },
  },
};
</script>

<style></style>
