// 将4个请求模块的请求合并在一起 统一暴露
import * as trademark from "./product/trademark";
import * as attr from "./product/attr";
import * as spu from "./product/spu";
import * as sku from "./product/sku";

export default {
  trademark,
  attr,
  spu,
  sku
};
