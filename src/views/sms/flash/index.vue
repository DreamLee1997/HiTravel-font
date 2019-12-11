<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="height:30px;">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="活动状态：">
            <el-select v-model="listQuery.status" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="活动类型：">
             <el-select v-model="listQuery.activity_type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间：">
            <el-date-picker
              v-model="activityTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加活动</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="flashTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.activity_id}}</template>
        </el-table-column>
        <el-table-column label="活动名称" :show-overflow-tooltip='istooltip' align="center">
          <template slot-scope="scope">{{scope.row.activity_name}}</template>
        </el-table-column>
        <el-table-column label="活动状态"  align="center">
          <template slot-scope="scope">{{scope.row |formatActiveStatus}}</template>
        </el-table-column>
        <el-table-column label="活动类型"  align="center">
          <template slot-scope="scope">{{scope.row | formatActiveType }}</template>
        </el-table-column>
        <el-table-column label="开始时间" :show-overflow-tooltip='istooltip'  align="center">
          <template slot-scope="scope">{{scope.row.start_time | formatDate}}</template>
        </el-table-column>
        <el-table-column label="结束时间" :show-overflow-tooltip='istooltip'  align="center">
          <template slot-scope="scope">{{scope.row.end_time | formatDate}}</template>
        </el-table-column>
        <el-table-column label="活动描述" :show-overflow-tooltip='istooltip' align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="操作"  width="160"   align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleEditActivity(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.status !== -1"
                @click="handleCancleActivity(scope.$index, scope.row)">取消
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
        :current-page.sync="listQuery.page"
        :page-size="listQuery.size"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="添加活动"
      type="primary"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="addActivity"
               ref="addActivityForm"
               label-width="150px" size="small">
        <el-form-item label="活动标题：">
          <el-input v-model="addActivity.activity_name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="活动类型：">
          <el-select v-model="addActivity.activity_type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动描述：">
          <el-input 
            v-model="addActivity.description" 
            type="textarea" :rows="3"  
            style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
            v-model="addActivity.start_time"
            type="date"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="addActivity.end_time"
            type="date"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      title="编辑活动"
      type="primary"
      :visible.sync="editDialogVisible"
      width="40%">
      <el-form :model="editActivity"
               ref="editActivityForm"
               label-width="150px" size="small">
        <el-form-item label="活动标题：">
          <el-input v-model="editActivity.activity_name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="活动类型：">
          <el-select v-model="editActivity.activity_type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动描述：">
          <el-input 
            v-model="editActivity.description" 
            type="textarea" :rows="3"  
            style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleEditDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList, addActivityRequest, editActivityRequest, cancelActivityRequest} from '@/api/flash';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    page: 1,
    size: 5,
    status: null,
    activity_type:'',
    end_select_time:'',
    start_select_time:'',
  };
  const defaultaddActivityForm = {
    activity_name: "",
    activity_type: "",
    description: "",
    end_time: "",
    start_time: ""
  };
  export default {
    name: 'flashPromotionList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        activityTime:[],
        istooltip:true,
        listLoading: false,
        dialogVisible: false,
        editDialogVisible:false,
        typeOptions:[{
          value: '1',
          label: '精选'
        }, {
          value: '2',
          label: '促销'
        }, {
          value: '3',
          label: '秒杀'
        }],
        statusOptions:[{
          value: '0',
          label: '已结束'
        }, {
          value: '1',
          label: '未开始'
        }, {
          value: '2',
          label: '进行中'
        }, {
          value: '-1',
          label: '失效活动'
        }],
        addActivity: Object.assign({}, defaultaddActivityForm),
        editActivity:{}
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatActiveStatus(row) {
        if (row.status === 0) {
          return '活动已结束';
        } else if (row.status === 1) {
          return '活动未开始';
        } else if(row.status === 2) {
          return '活动进行中';
        }else {
          return '活动失效';
        }
      },
      formatActiveType(row){
        if (row.activity_type === 1) {
          return '精选活动';
        } else if (row.activity_type === 2) {
          return '促销活动';
        } else {
          return '秒杀活动';
        }
      },
      formatDate(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      formatDateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      handleEditActivity(index, row){
        this.editActivity = row
        this.editActivity.activity_type = row.activity_type.toString()
        this.editDialogVisible = true;
      },
      handleCancleActivity(index,row){
        this.$confirm('是否要取消该活动?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancelActivityRequest(row.activity_id).then(response => {
            this.$message({
              message: '取消成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        })
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.page = 1;
        if(this.activityTime.length){
          this.listQuery.start_select_time = this.formatDateTime(this.activityTime[0]);
          this.listQuery.end_select_time = this.formatDateTime(this.activityTime[1]);
        }
        this.getList();
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
      handleAdd() {
        this.dialogVisible = true;
        this.addActivity = Object.assign({},defaultaddActivityForm);
      },
      handleShowSessionList() {
        this.$router.push({path: '/sms/flashSession'})
      },
      handleEditDialogConfirm(){
        let params = {
          "activity_name": this.editActivity.activity_name,
          "activity_type": this.editActivity.activity_type,
          "description": this.editActivity.description
        }
        this.$confirm('是否要确认修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          editActivityRequest(this.editActivity.activity_id, params).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.editDialogVisible =false;
            this.getList();
          })
        })
      },
      handleDialogConfirm() {
        this.addActivity.end_time = this.formatDateTime(this.addActivity.end_time)
        this.addActivity.start_time = this.formatDateTime(this.addActivity.start_time)
        this.$confirm('是否要确认添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          addActivityRequest(this.addActivity).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        })
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.length;
        });
      }
    }
  }
</script>
<style></style>


