<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="category_id" 
        :expand-row-keys='expendRowKeys'
        >
        <el-table-column type="expand"  >
          <template  slot-scope="props">
             <el-table
              :data="props.row.children"
              style="width: 100%;margin-bottom: 10px;"
              row-key="category_id"
              :expand-row-keys='expendRowKeys'
              >
              <el-table-column type="expand">
                <template slot-scope="prop">
                   <el-table
                    :data="prop.row.children"
                    style="width: 100%;margin-bottom: 10px;"
                    row-key="category_id"
                    >
                    <el-table-column
                      prop="category_name"
                      label="商品类别名称">
                    </el-table-column>
                    <el-table-column
                      prop="category_level"
                      label="商品类别等级">
                    </el-table-column>
                    <el-table-column
                      prop="category_status"
                      label="商品类别状态">
                    </el-table-column>
                    <el-table-column
                      prop="parent_id"
                      label="商品父类别ID">
                    </el-table-column>
                    <el-table-column
                      prop="category_id"
                      label="商品类别ID">
                    </el-table-column>
                    <el-table-column label="操作" width="230px" align="center">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="handleLevelChange(scope.$index, scope.row, 1)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="primary"
                          @click="handleLevelChange(scope.$index, scope.row, 2)">添加</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDeleteLevel(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                prop="category_name"
                label="商品类别名称">
              </el-table-column>
              <el-table-column
                prop="category_level"
                label="商品类别等级">
              </el-table-column>
              <el-table-column
                prop="category_status"
                label="商品类别状态">
              </el-table-column>
              <el-table-column
                prop="parent_id"
                label="商品父类别ID">
              </el-table-column>
              <el-table-column
                prop="category_id"
                label="商品类别ID">
              </el-table-column>
              <el-table-column label="操作" width="230px" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleLevelChange(scope.$index, scope.row, 1)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleLevelChange(scope.$index, scope.row, 2)">添加</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeleteLevel(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="商品类别名称">
        </el-table-column>
        <el-table-column
          prop="category_level"
          label="商品类别等级">
        </el-table-column>
        <el-table-column
          prop="category_status"
          label="商品类别状态">
        </el-table-column>
        <el-table-column
          prop="parent_id"
          label="商品父类别ID">
        </el-table-column>
        <el-table-column
          prop="category_id"
          label="商品类别ID">
        </el-table-column>
        <el-table-column label="操作" width="230px" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleLevelChange(scope.$index, scope.row, 1)">编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleLevelChange(scope.$index, scope.row, 2)">添加</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteLevel(scope.$index, scope.row)">删除</el-button>
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
      :title="title"
      :visible.sync="handleLevelDialogVisible"
      width="50%">
       <el-form  :model="handleLevel" size="small" label-width="140px">
          <el-form-item label="商品类别名称：">
            <el-input 
              style="width: 203px" 
              v-model="handleLevel.category_name" 
              placeholder="请输入商品类别名称"></el-input>
          </el-form-item>
          <el-form-item label="商品类别等级：">
            <el-input 
              style="width: 203px" 
              :disabled="isdisable"
              v-model="handleLevel.category_level" 
              placeholder="请输入商品类别等级"></el-input> 
          </el-form-item>
          <el-form-item label="商品父类别ID：">
            <el-input 
              style="width: 203px" 
              :disabled="isdisable"
              v-model="handleLevel.parent_id" 
              placeholder="请输入商品父类别ID"></el-input> 
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleLevelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLevelConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchList, fetchLevelList, handleEditLevel, handleAddLevel, handleDeleteLevelRequest} from '@/api/productCate'

  export default {
    name: "productCateList",
    data() {
      return {
        list: null,
        total: null,
        list:[],
        title:'',
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
        expendRowKeys:[],
        handleLevel:{},
        parentId: 0,
        isdisable:false,
        listLoading: false,
        handleLevelDialogVisible:false,
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.parentId).then(response => {
          this.list = response.data.children;
          this.listLoading = false;
          this.expendRowKeys = [];
        });
      },
      handleLevelConfirm(){
        let params = {
          "category_level": this.handleLevel.category_level,
          "category_name": this.handleLevel.category_name,
          "parent_id": this.handleLevel.parent_id
        }
        if(this.title === '编辑商品分类'){
          handleEditLevel(this.handleLevel.category_id, params).then(response => {
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
            this.handleLevelDialogVisible = false;
          });
        }else{
          handleAddLevel(params).then(response => {
            this.$message({
              message: '添加成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
            this.handleLevelDialogVisible = false;
          });
        }
      },
      handleLevelChange(index,row,flag){
        // console.log(row,flag);
        this.handleLevel = {};
        this.isdisable = false;
        if(flag === 1){
          this.handleLevel = row;
          this.title = '编辑商品分类';
        }else{
          // this.handleLevel.category_level = row.category_level;
          // this.handleLevel.parent_id = row.parent_id;
          // this.isdisable = true;
          this.title = '添加商品分类';
        }
        this.handleLevelDialogVisible = true;
      },
      handleDeleteLevel(index, row){
        this.$confirm('是否要进行删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          handleDeleteLevelRequest(row.category_id).then(response=>{
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
    }
  }
</script>

<style scoped>

</style>
