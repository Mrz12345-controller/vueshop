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
      <el-aside class="aside" width="200px">
        <el-menu :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">数据报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
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
  beforeCreate: function() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    exit: function() {
      this.$router.push({ name: "login" });
      this.$message({
        message: "注销成功",
        type: "success"
      });
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