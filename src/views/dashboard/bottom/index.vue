<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Left></Left>
      </el-col>
      <el-col :span="12">
        <Right></Right>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Left from "./left";
import Right from "./right";
export default {
  name: "bottom",
  components: {
    Left,
    Right,
  },
};
</script>

<style></style>
