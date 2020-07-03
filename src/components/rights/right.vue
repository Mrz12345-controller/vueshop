<template>
  <el-card>
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <el-table :data="tableData" class="table" height="500px" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="authName" label="姓名" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="0"></el-table-column>
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
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
.table {
  margin-top: 13px;
}
</style>