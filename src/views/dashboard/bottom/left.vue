<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>线上热门搜索</span>
        <el-dropdown style="float: right; padding: 3px 0">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <Search title="搜索用户数" num="12321" rate="17.1"></Search>
          </el-col>
          <el-col :span="12">
            <Search title="人均搜索次数" num="2.1" rate="-27.1"></Search>
          </el-col>
        </el-row>
      </div>
      <div class="bottom">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column label="排名" type="index" width="50px"></el-table-column>
          <el-table-column label="搜索关键词"></el-table-column>
          <el-table-column label="用户数" icon="el-icon-d-caret">
            <template slot-scope="scope">
                {{ scope.row.userNum }}
            </template>
          </el-table-column>
          <el-table-column label="搜索次数" icon="el-icon-d-caret">
            <template slot-scope="scope">
                {{ scope.row.searchNum }}
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div>
        <el-pagination
          style="float: right;"
          :total="20"
          :current-page="1"
          :page-size="3"
          @current-change="changePage"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import Search from "./search.vue";
export default {
  components: {
    Search,
  },
  data() {
    return {
        tableData:[{},{}]
    };
  },
  methods: {
    changePage(page) {},
  },
};
</script>

<style></style>
