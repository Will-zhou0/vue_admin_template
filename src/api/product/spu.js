import request from '@/utils/request'

// 获取spu列表
// GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {
      category3Id
    }
  })
}

// 获取spu详细信息
// GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}

// 获取品牌列表
// GET /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => {
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'get'
  })
}

// 获取spu图片的接口
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

// 获取平台全部销售属性 销售属性最多三个
// GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => {
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'get'
  })
}

/* {
  "category3Id": 0,
  "description": "string",
  "id": 0,
  "spuImageList": [
    {
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "spuId": 0
    }
  ],
  "spuName": "string",
  "spuSaleAttrList": [
    {
      "baseSaleAttrId": 0,
      "id": 0,
      "saleAttrName": "string",
      "spuId": 0,
      "spuSaleAttrValueList": [
        {
          "baseSaleAttrId": 0,
          "id": 0,
          "isChecked": "string",
          "saleAttrName": "string",
          "saleAttrValueName": "string",
          "spuId": 0
        }
      ]
    }
  ],
  "tmId": 0
} */
// 保存spu
// POST /admin/product/saveSpuInfo
export const reqSaveSpuInfo = (spu) => {
  return request({
    url: `/admin/product/saveSpuInfo`,
    method: 'post',
    data: spu
  })
}