import request from "@/utils/request";

// 获取一级分类的列表
// /admin/product/getCategory1 get
export const reqCategory1List = () => {
  return request({
    url: `/admin/product/getCategory1`,
    method: "get",
  });
};

// 获取二级分类的列表
// /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });
};

// 获取三级分类的列表
// /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });
};

// 获取商品属性信息
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};

// 添加商品属性值
// /admin/product/saveAttrInfo post
/* {
    "attrName": "string",
    "attrValueList": [
      {
        "attrId": 0,
        "valueName": "string"
      }
    ],
    "categoryId": 0,  category3Id
    "categoryLevel": 3,
} */
export const reqAddOrUpdateAttr = (data) => {
  return request({ 
    url: `/admin/product/saveAttrInfo`,
    method: "post",
    data
  });
}
