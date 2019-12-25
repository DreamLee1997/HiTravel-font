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
          <el-form-item label="订单编号：">
            <el-input v-model="listQuery.order_num" class="input-width" placeholder="请输入订单编号"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="listQuery.nickname" class="input-width" placeholder="请输入收货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="支付方式：">
            <el-select v-model="listQuery.pay_method" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in orderPayOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="订单编号" :show-overflow-tooltip='istooltip' width="180" align="center">
          <template slot-scope="scope">{{scope.row.order_num}}</template>
        </el-table-column>
        <el-table-column label="提交时间" :show-overflow-tooltip='istooltip' width="180" align="center">
          <template slot-scope="scope">{{scope.row.create_time | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">￥{{scope.row.total_price}}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{scope.row.pay_method | formatPayType}}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.order_status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >查看订单</el-button>
            <!-- <el-button
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status===0">关闭订单</el-button>
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status===1">订单发货</el-button>
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status===2||scope.row.status===3">订单跟踪</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status===4">删除订单</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.size"
        :page-sizes="[20,30,40]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="订单详情"
      :visible.sync="viewOrderDialogVisible" width="40%">
      <el-form :model="orderDetail"
               ref="addActivityForm"
               label-width="150px" 
               size="small" disabled>
        <el-form-item label="订单ID：">
          <el-input v-model="orderDetail.order_id" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="订单编号：">
          <el-input v-model="orderDetail.order_num" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="下单时间：">
          <el-input v-model="orderDetail.create_time" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="支付方式：">
          <el-select v-model="orderDetail.order_status" placeholder="请选择">
            <el-option
              v-for="item in orderPayOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="订单状态：">
          <el-select v-model="orderDetail.pay_method" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户ID：">
          <el-input v-model="orderDetail.user_id" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称：">
          <el-input v-model="orderDetail.nickname" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="订单总价：">
          <el-input v-model="orderDetail.total_price" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="收获地址：">
          <el-input 
            v-model="orderDetail.address" 
            type="textarea" :rows="3"  
            style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewOrderDialogVisible = false" type="primary">取 消</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog
      title="关闭订单"
      :visible.sync="closeOrder.dialogVisible" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="closeOrder.content">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog> -->
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
  import {fetchList,closeOrder,deleteOrder} from '@/api/order'
  import {formatDate} from '@/utils/date';
  import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
  const defaultListQuery = {
    page: 1,
    size: 20,
    nickname: null,
    order_id: null,
    order_num: null,
    pay_method: null,
    user_id: null,
  };
  export default {
    name: "orderList",
    components:{LogisticsDialog},
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        operateType: null,
        istooltip:true,
        multipleSelection: [],
        orderDetail:{},
        closeOrder:{
          dialogVisible:false,
          content:null,
          orderIds:[]
        },
        statusOptions:[
          {
            label: "已下单",
            value: 1
          },
          {
            label: "送货中",
            value: 2
          },
          {
            label: "已完成",
            value: 3
          },
          {
            label: "退货中",
            value: 4
          }
        ],
        orderPayOptions:[
          {
            label: "余额",
            value: 1
          },
          {
            label: "微信",
            value: 2
          },
          {
            label: "支付宝",
            value: 3
          }
        ],
        operateOptions: [
          {
            label: "批量发货",
            value: 1
          },
          {
            label: "关闭订单",
            value: 2
          },
          {
            label: "删除订单",
            value: 3
          }
        ],
        viewOrderDialogVisible:false,
        logisticsDialogVisible:false
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatPayType(value) {
        if (value === 1) {
          return '余额';
        } else if (value === 2) {
          return '微信';
        } else {
          return '支付宝';
        }
      },
      formatStatus(value) {
        if (value === 1) {
          return '已下单';
        } else if (value === 2) {
          return '送货中';
        } else if (value === 3) {
          return '已完成';
        } else {
          return '退货';
        }
      },
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.page = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleViewOrder(index, row){
        this.viewOrderDialogVisible = true;
        this.orderDetail = row;
        console.log(this.orderDetail);
        // this.$router.push({path:'/oms/orderDetail',query:{id:row.id}})
      },
      handleCloseOrder(index, row){
        this.closeOrder.dialogVisible=true;
        this.closeOrder.orderIds=[row.id];
      },
      handleDeliveryOrder(index, row){
        let listItem = this.covertOrder(row);
        this.$router.push({path:'/oms/deliverOrderList',query:{list:[listItem]}})
      },
      handleViewLogistics(index, row){
        this.logisticsDialogVisible=true;
      },
      handleDeleteOrder(index, row){
        let ids=[];
        ids.push(row.id);
        this.deleteOrder(ids);
      },
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的订单',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        // if(this.operateType===1){
        //   //批量发货
        //   let list=[];
        //   for(let i=0;i<this.multipleSelection.length;i++){
        //     if(this.multipleSelection[i].status===1){
        //       list.push(this.covertOrder(this.multipleSelection[i]));
        //     }
        //   }
        //   if(list.length===0){
        //     this.$message({
        //       message: '选中订单中没有可以发货的订单',
        //       type: 'warning',
        //       duration: 1000
        //     });
        //     return;
        //   }
        //   this.$router.push({path:'/oms/deliverOrderList',query:{list:list}})
        // }else if(this.operateType===2){
        //   //关闭订单
        //   this.closeOrder.orderIds=[];
        //   for(let i=0;i<this.multipleSelection.length;i++){
        //     this.closeOrder.orderIds.push(this.multipleSelection[i].id);
        //   }
        //   this.closeOrder.dialogVisible=true;
        // }else if(this.operateType===3){
        //   //删除订单
        //   let ids=[];
        //   for(let i=0;i<this.multipleSelection.length;i++){
        //     ids.push(this.multipleSelection[i].id);
        //   }
        //   this.deleteOrder(ids);
        // }
      },
      handleSizeChange(val){
        this.listQuery.page = 1;
        this.listQuery.size = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.getList();
      },
      handleCloseOrderConfirm() {
        if (this.closeOrder.content == null || this.closeOrder.content === '') {
          this.$message({
            message: '操作备注不能为空',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let params = new URLSearchParams();
        params.append('ids', this.closeOrder.orderIds);
        params.append('note', this.closeOrder.content);
        closeOrder(params).then(response=>{
          this.closeOrder.orderIds=[];
          this.closeOrder.dialogVisible=false;
          this.getList();
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.length;
        });
      },
      deleteOrder(ids){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",ids);
          deleteOrder(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        })
      },
      covertOrder(order){
        let address=order.receiverProvince+order.receiverCity+order.receiverRegion+order.receiverDetailAddress;
        let listItem={
          orderId:order.id,
          orderSn:order.orderSn,
          receiverName:order.receiverName,
          receiverPhone:order.receiverPhone,
          receiverPostCode:order.receiverPostCode,
          address:address,
          deliveryCompany:null,
          deliverySn:null
        };
        return listItem;
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
  .el-input.is-disabled .el-input__inner{ 
    color: #606266 !important; 
  }
</style>


