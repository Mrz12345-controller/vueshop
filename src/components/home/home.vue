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
            <el-button
              class="div4"
              style="display:inline;float:right"
              @click="exit()"
              type="primary"
              plain
            >注销</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu :router="true" :unique-opened="true">
          <!--:index="''+item.order"作用于将item.order的数字转化成字符转-->
          <el-submenu :index="''+item.order" v-for="(item,index) in dataList" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{item.authName}}</span>
            </template>
            <el-menu-item :index="item1.path" v-for="(item1,index) in item.children" :key="index">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: {},
      dataList: []
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
  created() {
    this.menus();
  },
  methods: {
    exit: function() {
      this.$router.push({ name: "login" });
      this.$message({
        message: "注销成功",
        type: "success"
      });
      localStorage.clear();
    },
    async menus() {
      const res = await this.$http.get("menus");
      this.dataList = res.data.data;
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
.div3 .div4 {
  margin-top: -0.2cm;
}
</style>