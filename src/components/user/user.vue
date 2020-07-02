<template>
  <el-card class="card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="row">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="select" clearable>
          <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="tableData">{{tableData.row.create_time | fiter}}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="eitdUser(scope.row.id,scope.row.mg_state)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="openUser(scope.row.id)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            s
            circle
          ></el-button>
          <el-button
            @click="eitdUsers(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-button
            @click="deleteUser(scope.row.id)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="format" ref="addUserFormRef" :rules="addUserFormRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="format.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="format.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="format.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="format.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改用户"
      :visible.sync="updateDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="update" ref="addUserFormRef" :rules="addUserFormRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="update.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="update.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="update.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="配置角色"
      :visible.sync="dialogVisibleOpen"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <p>当前用户：{{info.username}}</p>
        <p>当前角色：{{info.role_name}}</p>
        <p>
          分配角色：
          <el-select
            v-model="selectRoleId"
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in this.shiro"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleOpen = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的手机号码"));
    };
    return {
      query: "",
      total: -1,
      pagenum: 1,
      pagesize: 4,
      tableData: [],
      shiro: [],
      format: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      selectRoleId: "",
      update: {},
      // 用户添加表单验证规则
      addUserFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名的长度在2～10个字",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "用户密码的长度在6～18个字",
            trigger: "blur"
          }
        ],
        email: [
          { required: false, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: false, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      dialogVisible: false,
      updateDialogVisible: false,
      dialogVisibleOpen: false,
      info: {}
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const token = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = token;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      const result = res.data;
      if (result.meta.status == 200) {
        this.tableData = result.data.users;
        this.total = result.data.total;
        this.$message.success(result.meta.msg);
      } else {
        this.$message.warning(result.meta.msg);
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    async addUser() {
      const res = await this.$http.post("users", this.format);
      const result = res.data;
      if (result.meta.status == 201) {
        this.$message.success(result.meta.msg);
      } else {
        this.$message.warning(result.meta.msg);
      }
      this.dialogVisible = false;
      this.getUserList();
    },
    handleSizeChange(val) {
      this.pagenum = 1;
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    search() {
      this.getUserList();
    },
    deleteUser(userId) {
      this.$confirm("确认删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${userId}`);
          if (res.data.meta.status == 200) {
            this.$message({
              type: "success",
              message: res.data.meta.msg
            });
            this.getUserList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.meta.msg
          });
        });
    },
    async openUser(userId) {
      const res = await this.$http.get("users/" + userId);
      if (res.data.meta.status != 200) {
        return this.$message.warning(res.data.meta.msg);
      }
      this.update = res.data.data;
      this.updateDialogVisible = true;
    },
    async updateUser() {
      const res = await this.$http.put(`users/` + this.update.id, {
        email: this.update.email,
        mobile: this.update.mobile
      });
      console.log(res);
      if (res.data.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.data.meta.msg
        });
        this.getUserList();
      } else {
        this.$message.warning(res.data.meta.msg);
      }
      this.updateDialogVisible = false;
    },
    async eitdUser(id, mg_state) {
      const res = await this.$http.put(`users/${id}/state/${mg_state}`);
      console.log(res);
      if (res.data.meta.status == 200) {
        mg_state = !mg_state;
        console.log(mg_state);
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(res.data.meta.msg);
      }
    },
    async eitdUsers(role) {
      this.info = role;
      this.dialogVisibleOpen = true;
      const res = await this.$http.get("roles");
      this.shiro = res.data.data;
    },
    async addUser() {
      if (!this.info) {
        return this.$message.warning("请选择文章标签");
      }
      const res = await this.$http.put(`users/${this.info.id}/role`, {
        rid: this.selectRoleId
      });
      console.log(res);
      if (res.data.meta.status != 200) {
        return this.$message.warning(res.data.meta.msg);
      }
      this.$message.success(res.data.meta.msg);
      this.getUserList();
      this.dialogVisibleOpen = false;
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
.row {
  margin-top: 15px;
}
.select {
  width: 300px;
}
</style>