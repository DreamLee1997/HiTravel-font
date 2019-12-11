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
        <!-- <el-table
            :data="list"
            style="width: 100%">
            <el-table-column prop="user_id" label="ID"></el-table-column>
            <el-table-column prop="nickname" label="昵称" ></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column  label="角色">
                <template slot-scope="scope" ><p v-if="scope.row.nickname">管理员</p></template>
            </el-table-column>
        </el-table> -->
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
      
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.length;
        });
      },

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
