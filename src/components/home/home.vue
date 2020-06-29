<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="div1">
            <img class="img" src="../../assets/img/3.jpg" alt="图片无法显示" />
          </div>
        </el-col>
        <el-col :span="16">
          <h3 class="div2">后台管理系统</h3>
        </el-col>
        <el-col :span="4">
          <div class="div3">
            <h3 style="display:inline;">{{username}}</h3>&nbsp&nbsp&nbsp&nbsp
            <el-button style="display:inline;float:right" @click="exit()" type="primary" plain>注销</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: {}
    };
  },
  mounted: function() {
    this.username = localStorage.getItem("username");
    console.log(this.username);
  },
  methods: {
    exit: function() {
      this.$router.push({ name: "login" });
      localStorage.clear();
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}
.img {
  height: 60px;
}
.div2 {
  text-align: center;
}
.div3 {
  margin-top: 0.5cm;
  text-align: center;
}
</style>