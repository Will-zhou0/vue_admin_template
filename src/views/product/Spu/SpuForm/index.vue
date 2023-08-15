<template>
  <div>
    <el-form :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请输入品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in trademarkList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unselectSaleAttr.length}未选择`"
          v-model="saleAttrIdAndName"
        >
          <el-option
            :label="saleAttr.name"
            :value="`${saleAttr.id}:${saleAttr.name}`"
            v-for="(saleAttr, index) in unselectSaleAttr"
            :key="index"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!saleAttrIdAndName"
          @click="addSaleAttr"
          >添加的销售属性</el-button
        >
        <el-table border style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名"
            width="width"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column
            label="属性值名称列表"
            width="width"
            prop="spuSaleAttrValueList"
          >
            <template slot-scope="scope">
              <el-tag
                v-for="(saleAttrValue, index) in scope.row.spuSaleAttrValueList"
                :key="index"
                closable
                :disable-transitions="false"
                @close="scope.row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ saleAttrValue.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="inputConfirm(scope.row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(scope.row)"
              >
                添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="spu.spuSaleAttrList.splice(scope.$index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button type="warning" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuform",
  data() {
    return {
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [
          {
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
      },
      trademarkList: [],
      spuImageList: [],
      baseSaleAttrList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      //   收集未选中的销售属性的id
      saleAttrIdAndName: "",
      inputVisible: false,
      saleAttrValueName: "",
    };
  },
  computed: {
    unselectSaleAttr() {
      let result = this.baseSaleAttrList.filter((item) => {
        return !this.spu.spuSaleAttrList.some(
          (saleAttr) => saleAttr.saleAttrName === item.name
        );
      });
      return result;
    },
  },
  methods: {
    initSpuData(row) {
      this.$API.spu.reqSpu(row.id).then((res) => {
        if (res.code === 200) {
          this.spu = res.data;
        }
      });
      this.$API.spu.reqTrademarkList().then((res) => {
        if (res.code === 200) {
          this.trademarkList = res.data;
        }
      });
      this.$API.spu.reqSpuImageList(row.id).then((res) => {
        if (res.code === 200) {
          //   照片墙用到的数组中的对象格式是 {name:'',url:''}
          this.spuImageList = res.data;
          this.spuImageList.forEach((item) => {
            item.name = item.imgName;
            item.url = item.imgUrl;
          });
        }
      });
      this.$API.spu.reqBaseSaleAttrList().then((res) => {
        if (res.code === 200) {
          this.baseSaleAttrList = res.data;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.spuImageList = fileList;
    },
    addSaleAttr() {
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId: this.saleAttrIdAndName.split(":")[0],
        saleAttrName: this.saleAttrIdAndName.split(":")[1],
      });
    },
    addSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    inputConfirm(row) {
      if (row.inputValue.trim() == "") {
        this.$message({
          message: "销售属性值不能为空",
          type: "warning",
        });
        return;
      }
      if (
        row.spuSaleAttrValueList.some((item) => {
          return item.saleAttrValueName === row.inputValue.trim();
        })
      ) {
        this.$message({
          message: "销售属性值不能重复",
          type: "warning",
        });
        return;
      }
      const { baseSaleAttrId, inputValue } = row;
      const newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    // 删除销售属性值
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    // 删除销售属性
    deleteSaleAttr(row) {
      //   console.log(row.baseSaleAttrId);
      //   console.log(row.baseSaleAttrId);
      this.spu.spuSaleAttrList.forEach((item) => {
        if (item.baseSaleAttrId === row.baseSaleAttrId) {
          this.spu.spuSaleAttrList.splice(
            this.spu.spuSaleAttrList.indexOf(item),
            1
          );
        }
      });
    },
    addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.imgUrl,
        };
      });
      this.$API.spu.reqAddOrUpdateSpu(this.spu).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.$emit("changeScene", {
            scene: 0,
            flag: this.spu.id ? "修改" : "添加",
          });
        }
      });
      // 清空数据
      Object.assign(this._data, this.$options.data());
    },
    addSpuData(category3Id) {
      this.spu.category3Id = category3Id;
      this.$API.spu.reqTrademarkList().then((res) => {
        if (res.code === 200) {
          this.trademarkList = res.data;
        }
      });
      this.$API.spu.reqBaseSaleAttrList().then((res) => {
        if (res.code === 200) {
          this.baseSaleAttrList = res.data;
        }
      });
    },
    cancel() {
      this.$emit("changeScene", { scene: 0, flag: "" });
      // 清空数据
      // Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
