import request from "@/utils/request";

// GET /admin/product/baseTrademark/{page}/{limit}
// 分别暴露
export const reqTrademarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit} `,
    method: 'get'
  })
