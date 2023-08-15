<template>
  <div>
    <el-form>
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          placeholder="规格描述"
          type="textarea"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrInfoList"
            :key="index"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="index"
          >
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          style="width: 100%"
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img
                :src="scope.row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="changeDefault(scope.row)"
                v-if="scope.row.isDefault === 0"
                >设置默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skuform",
  data() {
    return {
      // 存储图片的信息
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrList: [],
      // 存储平台属性信息
      attrInfoList: [],
      // 收集sku信息的字段
      skuInfo: {
        // 第一类 收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类 需要通过数据双向绑定v-model收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        // 第三类 需要自己书写代码
        // 默认图片
        skuDefaultImg: "",
        // 收集的图片
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 平台属性列表
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: "",
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: "",
          // },
        ],

        // 收集销售属性列表
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: {},
      // 收集图片的信息，需要添加isdefault字段
      imageList: [],
    };
  },
  methods: {
    getData(category1Id, category2Id, spu) {
      // 收集父组件给的数据
      this.spu = spu;
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.$API.sku.reqSpuImageList(spu.id).then((res) => {
        if (res.code === 200) {
          const list = res.data;
          list.forEach((item) => {
            item.isDefault = 0;
          });
          this.spuImageList = list;
        }
      });
      this.$API.sku.reqSpuSaleAttrList(spu.id).then((res) => {
        if (res.code === 200) {
          this.spuSaleAttrList = res.data;
        }
      });
      this.$API.sku
        .reqAttrInfoList(category1Id, category2Id, spu.category3Id)
        .then((res) => {
          if (res.code === 200) {
            this.attrInfoList = res.data;
          }
        });
    },
    // 勾选图片
    handleSelectionChange(selection) {
      console.log("aaa", selection);
      this.imageList = selection;
    },
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    save() {
      const { skuInfo, imageList, spuSaleAttrList, attrInfoList } = this;
      skuInfo.skuAttrValueList = attrInfoList.reduce((acc, cur) => {
        if (cur.attrIdAndValueId) {
          const [attrId, valueId] = cur.attrIdAndValueId.split(":");
          acc.push({ attrId, valueId });
        }
        return acc;
      }, []);
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((acc, cur) => {
        if (cur.saleAttrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            cur.saleAttrIdAndValueId.split(":");
          acc.push({ saleAttrId, saleAttrValueId });
        }
        return acc;
      }, []);
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
        };
      });
      this.$API.sku.reqSaveSkuInfo(skuInfo).then((res) => {
        if (res.code === 200) {
          this.$emit("changeScenes", 0);
          // 清空数据
          Object.assign(this._data, this.$options.data());
          this.$message.success("保存成功");
        }
      });
    },
    cancel() {
      this.$emit("changeScenes", 0);
      // 清空数据
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style></style>
