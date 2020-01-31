<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddUser()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column prop="userId" label="ID"></el-table-column>
            <el-table-column prop="username" label="用户名" ></el-table-column>
            <el-table-column prop="realname" label="真实姓名" ></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="cardId" label="身份证号"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
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
                @click="handleModify(scope.$index, scope.row)">编辑
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
        listQuery: {
            nickname: "",
            page: 1,
            phone: "",
            sex: "",
            size: 10,
            user_id: ""
        },
        parentId: 0
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
      
      handleModify（
      //禁用用户
      handleDelete(){

      },

      //新增用户
      handleAddUser(){

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
