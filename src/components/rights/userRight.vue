<template>
  <el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-button class="addUser" type="success" round @click="dialogVisible = true">添加角色</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row class="div1" v-for="(item,index) in scope.row.children" :key="index">
            <el-col :span="4">
              <el-tag
                @close="deleteRoles(scope.row,item.id)"
                closable
                type="success"
              >{{item.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item1,index) in item.children" :key="index">
                <el-col :span="4">
                  <el-tag
                    @close="deleteRoles(scope.row,item1.id)"
                    closable
                    type="info"
                  >{{item1.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    v-for="(item2,index) in item1.children"
                    :key="index"
                    closable
                    type="warning"
                    @close="deleteRoles(scope.row,item2.id)"
                  >{{item2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="角色" prop="roleName" width="300"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
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
            @click="deleteRole(scope.row.id)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="format" ref="addUserFormRef" :rules="addUserFormRules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="format.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="format.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改用户"
      :visible.sync="updateDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="updata" ref="addUserFormRef" :rules="addUserFormRules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="updata.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="updata.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="增加权限"
      :visible.sync="eitdDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-tree
        ref="tree"
        :data="eitdData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="arrtemp1"
        :default-checked-keys="arrtemp"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eitdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="eitdRole()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      eitdData: [],
      arrtemp: [],
      arrtemp1: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      format: {
        roleName: "",
        roleDesc: ""
      },
      updata: {},
      //当前角色id
      roleId: 1,
      dialogVisible: false,
      updateDialogVisible: false,
      eitdDialogVisible: false,
      addUserFormRules: {
        roleName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        roleDesc: [{ required: false, message: "请输入邮箱", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getRole();
  },
  methods: {
    async getRole() {
      const res = await this.$http.get("roles");
      if (res.data.meta.status != 200) {
        return this.$message.warning(res.data.meta.msg);
      }
      this.tableData = res.data.data;
    },
    async addRole() {
      if (this.format.roleName == "") {
        return this.$message.error("角色名称不能为空");
      }
      const res = await this.$http.post("roles", this.format);
      if (res.data.meta.status == 200) {
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(res.data.meta.msg);
      }
      this.dialogVisible = false;
      this.getRole();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    async deleteRole(id) {
      const res = await this.$http.delete("roles/" + id);
      console.log(res);
      if (res.data.meta.msg == 200) {
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(res.data.meta.msg);
      }
      this.getRole();
    },
    async openUser(id) {
      this.updateDialogVisible = true;
      const res = await this.$http.get("roles/" + id);
      this.updata = res.data.data;
      console.log(this.updata);
    },
    async updateRole() {
      const res = await this.$http.put("roles/" + this.updata.roleId, {
        roleName: this.updata.roleName,
        roleDesc: this.updata.roleDesc
      });
      if (res.data.meta.status == 200) {
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(res.data.meta.msg);
      }
      this.updateDialogVisible = false;
      this.getRole();
    },
    async deleteRoles(role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      if (res.data.meta.status == 200) {
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(rea.data.meta.msg);
      }
      //结果反馈的data显示该对象剩余的权限
      //进行优化，闯入对象，重新把结果剩余权限重新赋值给对象
      role.children = res.data.data;
      //封装页面刷新
      //this.reload();
    },
    async eitdUsers(role) {
      this.eitdDialogVisible = true;
      this.roleId = role.id;
      const res = await this.$http.get("rights/tree");
      this.eitdData = res.data.data;
      //展开列表
      var arr1 = [];
      arr1.push(role.id);
      role.children.forEach(data => {
        data.children.forEach(data1 => {
          arr1.push(data1.id);
        });
      });
      this.arrtemp1 = arr1;
      //查看已选择的权限
      var arr = [];
      role.children.forEach(item => {
        item.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            arr.push(item2.id);
          });
        });
      });
      this.arrtemp = arr;
    },
    async eitdRole() {
      let arr1 = this.$refs.tree.getCheckedKeys();
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      let arr = [...arr1, ...arr2];
      const res = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: arr.join(",")
      });
      console.log(res);
      if (res.data.meta.status == 200) {
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(res.data.meta.msg);
      }
      //刷新视图
      this.reload();
      this.eitdDialogVisible = false;
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.addUser {
  margin-top: 10px;
}
.div1 {
  margin-top: 5px;
}
</style>