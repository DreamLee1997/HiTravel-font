<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddUser()"
        size="mini"
        type="primary">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column prop="userId" label="ID"></el-table-column>
            <el-table-column prop="username" label="用户名" :show-overflow-tooltip='istooltip' ></el-table-column>
            <el-table-column prop="realname" label="真实姓名" :show-overflow-tooltip='istooltip' ></el-table-column>
            <el-table-column prop="phone" label="电话" :show-overflow-tooltip='istooltip' ></el-table-column>
            <el-table-column prop="cardId" label="身份证号" :show-overflow-tooltip='istooltip' ></el-table-column>
            <el-table-column prop="email" label="Email" :show-overflow-tooltip='istooltip' ></el-table-column>
            <el-table-column prop="userType" label="角色">
                <!-- <template slot-scope="scope" ><p v-if="scope.row.userType === 0">管理员</p></template>
                <template slot-scope="scope" ><p v-if="scope.row.userType === 0">管理员</p></template> -->
            </el-table-column>
            <el-table-column prop="userStatus" label="状态">
                <!-- <template slot-scope="scope" ><p v-if="scope.row.userType === 0">管理员</p></template>
                <template slot-scope="scope" ><p v-if="scope.row.userType === 0">管理员</p></template> -->
            </el-table-column>
            <el-table-column label="操作" :show-overflow-tooltip='istooltip' width="160"   align="center">
              <template slot-scope="scope">
                <p>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleUpdateUser(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">禁用
                  </el-button>
                </p>
              </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>

     <el-dialog
      :title="changeTitle"
      :visible.sync="userDialogVisible"
      width="40%">
     <el-form :inline="true" :model="userInfo" size="small" label-width="100px">
          <el-form-item label="用户名称：">
            <el-input style="width: 203px" v-model="userInfo.username" ></el-input>
          </el-form-item>
          <el-form-item label="用户密码：">
            <el-input style="width: 203px" v-model="userInfo.password"></el-input> 
          </el-form-item>
          <el-form-item label="用户邮箱：">
            <el-input style="width: 203px" v-model="userInfo.email" ></el-input> 
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input style="width: 203px" v-model="userInfo.phone" ></el-input> 
          </el-form-item>
           <el-form-item label="真实姓名">
            <el-input style="width: 203px" v-model="userInfo.realname" ></el-input> 
          </el-form-item>
           <el-form-item label="身份证号：">
            <el-input style="width: 203px" v-model="userInfo.cardId" ></el-input> 
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-select v-model="userInfo.userType" placeholder="请选择">
              <el-option
                v-for="item in userTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateUserConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchList} from '@/api/user'

  export default {
    name: "productCateList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        istooltip:true,
        changeTitle:'新增用户',
        userInfo:{},
        listQuery: {
            nickname: "",
            page: 1,
            phone: "",
            sex: "",
            size: 10,
            user_id: ""
        },
        userTypeOptions:[{
          value: 0,
          label: '管理员'
        }, {
          value: 1,
          label: '普通用户'
        }, {
          value: 2,
          label: '酒店商户'
        }, {
          value: 3,
          label: '景区商户'
        }],
        parentId: 0,
        userDialogVisible:false,
      }
    },
    created() {
      this.getList();
    },
    watch: {
      $route(route) {
        
        
      }
    },
    methods: {
      //获取用户列表
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery.page, this.listQuery.size).then(response => {
          this.listLoading = false;
          this.list = response.data.records;
          this.total = response.data.records.length;
        });
      },
      
      //修改用户信息
      handleUpdateUser(index, row){
        let self = this;
        self.changeTitle = '修改用户 — ——' + row.username;
        self.userInfo = row;
        self.userDialogVisible = true;
      },

      //禁用用户
      handleDelete(){
        let self = this;
      },

      //新增用户
      handleAddUser(){
        let self = this;
        self.changeTitle = '新增用户';
        self.userInfo = {};
        self.userDialogVisible = true;
      },

      handleUpdateUserConfirm(){
        let self = this;
      },
      
      handleSizeChange(val) {
        this.listQuery.page = 1;
        this.listQuery.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
    }
  }
</script>

<style scoped>

</style>
