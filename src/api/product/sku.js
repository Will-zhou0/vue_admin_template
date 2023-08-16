import request from '@/utils/request'

// 获取spu图片列表
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (skuId) => {
  return request({
    url: `/admin/product/spuImageList/${skuId}`,
    method: 'get'
  })
}

// 获取spu销售属性列表
// GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}

// 获取商品属性列表
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

// 获取sku销售属性列表
// POST /admin/product/inner/findSkuInfoBySkuIdList
/* [
  {
    "category3Id": 0,
    "createTime": "2023-08-14T01:31:37.881Z",
    "id": 0,
    "isSale": 0,
    "price": 0,
    "skuAttrValueList": [
      {
        "attrId": 0,
        "attrName": "string",
        "id": 0,
        "skuId": 0,
        "valueId": 0,
        "valueName": "string"
      }
    ],
    "skuDefaultImg": "string",
    "skuDesc": "string",
    "skuImageList": [
      {
        "id": 0,
        "imgName": "string",
        "imgUrl": "string",
        "isDefault": "string",
        "skuId": 0,
        "spuImgId": 0
      }
    ],
    "skuName": "string",
    "skuSaleAttrValueList": [
      {
        "id": 0,
        "saleAttrId": 0,
        "saleAttrName": "string",
        "saleAttrValueId": 0,
        "saleAttrValueName": "string",
        "skuId": 0,
        "spuId": 0
      }
    ],
    "spuId": 0,
    "tmId": 0,
    "weight": "string"
  }
] */
export const reqSkuInfo = (skuIdList) => {
  return request({
    url: `/admin/product/inner/findSkuInfoBySkuIdList`,
    method: 'post',
    data: skuIdList
  })
}

// 保存sku信息
// POST /admin/product/saveSkuInfo
export const reqSaveSkuInfo = (skuInfo) => {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: 'post',
    data: skuInfo
  })
}

// 获取sku信息
// GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}

// 获取sku列表
// GET /admin/product/list/{page}/{limit}
export const reqSkuListPage = (page, limit) => {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
}

// 商品下架
// GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
}
// 商品上架
// GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}
// 获取sku信息
// GET /admin/product/getSkuById/{skuId}
export const reqSkuInfos = (skuId) => { 
  return request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
  })
}