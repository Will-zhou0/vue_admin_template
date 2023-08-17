<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.44%&nbsp;
                <svg
                  t="1692266860491"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4829"
                  width="16"
                  height="16"
                >
                  <path
                    d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z"
                    fill="#d81e06"
                    p-id="4830"
                  ></path>
                </svg>
              </span>
              <span
                >&nbsp;日同比&nbsp;&nbsp;19.21%&nbsp;
                <svg
                  t="1692266923277"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6196"
                  data-spm-anchor-id="a313x.search_index.0.i9.468c3a81I2eCws"
                  width="16"
                  height="16"
                >
                  <path
                    d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z"
                    fill="#1afa29"
                    p-id="6197"
                  ></path>
                </svg>
              </span>
            </template>
            <template slot="footer">
                <span>日销售额 ￥12345</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
                
            </template>
            <template slot="footer">
                <span>日访问量 12345</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="footer">
                <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="79%">
            <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;56.44%&nbsp;
                <svg
                  t="1692266860491"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4829"
                  width="16"
                  height="16"
                >
                  <path
                    d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z"
                    fill="#d81e06"
                    p-id="4830"
                  ></path>
                </svg>
              </span>
              <span
                >&nbsp;日同比&nbsp;&nbsp;19.21%&nbsp;
                <svg
                  t="1692266923277"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6196"
                  data-spm-anchor-id="a313x.search_index.0.i9.468c3a81I2eCws"
                  width="16"
                  height="16"
                >
                  <path
                    d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z"
                    fill="#1afa29"
                    p-id="6197"
                  ></path>
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./detail";
export default {
  name: "card",
  components: {
    Detail,
  },
};
</script>

<style></style>
