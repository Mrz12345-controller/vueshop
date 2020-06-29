<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>登陆</h2>
      <el-form-item label="用户">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      this.$http.post("login", this.formdata).then(res => {
        var mes = res.data.meta.msg;
        console.log(res);
        if (res.data.meta.status == 200) {
          this.$router.push({ name: "home" });
          this.$message({
            message: mes,
            type: "success"
          });
        } else {
          this.$message.error(mes);
        }
      });
    }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>