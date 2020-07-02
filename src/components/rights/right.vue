<template>
  <el-card>
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="authName" label="姓名" width="300"></el-table-column>
      <el-table-column prop="level" label="级别"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
      //   const token = localStorage.getItem("token");
      //   this.$http.defaults.headers.common["Authorization"] = token;
      const res = await this.$http.get("rights/list");
      this.tableData = res.data.data;
    }
  }
};
</script>

<style>
</style>