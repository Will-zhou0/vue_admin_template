import request from '@/utils/request'

// 获取sku列表
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