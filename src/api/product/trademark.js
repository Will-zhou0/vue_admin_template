import request from "@/utils/request";

// GET /admin/product/baseTrademark/{page}/{limit}
// 分别暴露
// 请求品牌的接口
export const reqTrademarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit} `,
    method: "get",
  });

// /admin/product/baseTrademark/save 添加 请求数据不带id post
// /admin/product/baseTrademark/update 修改 请求数据带id put
export const reqAddOrUpdateTrademark = (data) => {
  if (data.id)
    return request({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data,
    });
  return request({
    url: "/admin/product/baseTrademark/save",
    method: "post",
    data,
  });
};

// /admin/product/baseTrademark/remove/{id}
// 删除品牌的接口
export const reqDeleteTrademark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
};
