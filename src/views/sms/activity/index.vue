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
      <!-- <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加活动</el-button> -->
    </el-card>
    <div class="table-container">
      <el-table ref="flashTable"
                :data="list"
                style="width: 100%;"
                @expand-change="handleExpendChange"
                row-key="activity_id"
                v-loading="listLoading">
        <el-table-column type="expand" prop="children">
            <template  slot-scope="scope">
                <el-table :data="scope.row.children"  v-loading="isloading" style="width: 100%;margin-bottom: 10px;">
                    <el-table-column prop="product_name" width="320" label="商品名称" :show-overflow-tooltip='istooltip'></el-table-column>
                    <el-table-column prop="amount" width="120" label="商品库存"></el-table-column>
                    <el-table-column prop="price" width="120" label="商品价格"></el-table-column>
                    <el-table-column prop="sold_out" width="120" label="商品销量"></el-table-column>
                    <el-table-column prop="description" label="商品描述" :show-overflow-tooltip='istooltip'></el-table-column>
                </el-table>
            </template>
        </el-table-column>
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
        <el-table-column label="操作"  width="260"   align="center">
          <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="scope.row.status == 1 || scope.row.status == 2"
                @click="handleBindProduct(scope.$index, scope.row)">绑定商品
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.status == 1 || scope.row.status == 2"
                @click="handleCancelBindPt(scope.$index, scope.row)">解绑商品
              </el-button>
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
        :page-sizes="[20,30,40]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="绑定商品"
      type="primary"
      :visible.sync="dialogBindVisible"
      width="40%">
      <el-form :model="bindActivity"
               ref="bindActivityForm"
               label-width="150px" size="small">
        <el-form-item label="活动标题：">
          <el-input v-model="activity_name" disabled style="width: 65%;"></el-input>
        </el-form-item>
        <el-form-item label="选择商品：">
          <el-select 
            v-model="bindActivity.ids" 
            multiple placeholder="请选择" 
            style="width: 65%;"
            @focus="filterOptions"
            >
              <el-option
                  v-for="item in productOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBindVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="bindDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      title="解绑商品"
      type="primary"
      :visible.sync="dialogUnbindVisible"
      width="40%">
      <el-form :model="unbindActivity"
               ref="unbindActivityForm"
               label-width="150px" size="small">
        <el-form-item label="活动标题：">
          <el-input v-model="activity_name" disabled style="width: 65%;"></el-input>
        </el-form-item>
        <el-form-item label="选择商品：">
          <el-select 
            v-model="unbindActivity.ids" 
            multiple placeholder="请选择" 
            style="width: 65%;"
            >
                <div v-for="(ele,index) in activityProducts" :key="index">
                    <el-option
                        v-show="item.value == ele.product_id"
                        v-for="item in productOptionsDefaut"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
             </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUnbindVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="unbindActivityDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {fetchList, addActivityRequest, editActivityRequest, cancelActivityRequest} from '@/api/flash';
import {formatDate} from '@/utils/date';
import {bindProductRequest,unbindActivityRequest, getActivityProduct} from '@/api/activity';
import {fetchList as fetchProductList} from '@/api/product';

const defaultListQuery = {
    page: 1,
    size: 20,
    status: null,
    activity_type:'',
    end_select_time:'',
    start_select_time:'',
};
  
export default {
    name: 'flashPromotionList',
    data() {
      return {
        productOptionsDefaut:[],
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        activityProducts:[],
        activityTime:[],
        istooltip:true,
        isloading:false,
        listLoading: false,
        istooltip:true,
        dialogBindVisible: false,
        dialogUnbindVisible:false,
        activity_name:'',
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
        bindActivity:{ids:[]},
        unbindActivity:{ids:[]},
        productOptions:[],
        editActivity:{}
      }
    },
    created() {
      this.getList();
      this.getProductList();
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
        filterOptions(){
            this.productOptions = [];
            if(!this.activityProducts.length){
              this.productOptions = this.productOptionsDefaut;
              return false;
            }
            let arr1 = this.activityProducts
            let arr2 = this.productOptionsDefaut
            
            let add=arr2.filter(item=>!arr1.some(ele=>ele.product_id===item.value)) 
            this.productOptions = add;
            
        },
        handleBindProduct(index, row){
            this.activity_name = row.activity_name;
            this.bindActivity.id = row.activity_id;
            this.bindActivity.ids = [];
            // console.log(this.productOptions)
            this.dialogBindVisible = true;
            this.activityProducts = [];
            getActivityProduct(this.bindActivity.id).then(response => {
                this.activityProducts = response.data;
            })

        },
        handleCancelBindPt(index,row){
            this.activity_name = row.activity_name;
            this.unbindActivity.id = row.activity_id;
            this.unbindActivity.ids = [];
            this.dialogUnbindVisible = true;
            this.activityProducts = [];
            getActivityProduct(this.unbindActivity.id).then(response => {
                this.activityProducts = response.data;
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
        unbindActivityDialogConfirm(){
            
            this.$confirm('是否要确认解绑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                unbindActivityRequest(this.unbindActivity.id, {"ids": this.unbindActivity.ids}).then(response => {
                    this.$message({
                    message: '解绑成功！',
                    type: 'success'
                    });
                    this.dialogUnbindVisible =false;
                    this.getList();
                })
            })
        },
        async handleExpendChange(row){
            const response = await getActivityProduct(row.activity_id).then(response => {
                row.children = response.data;
                return response.data;
            })
        },
        bindDialogConfirm() {
            this.$confirm('是否要确认绑定?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                bindProductRequest(
                    this.bindActivity.id, 
                    {"ids": this.bindActivity.ids}
                ).then(response => {
                    this.$message({
                    message: '绑定成功！',
                    type: 'success'
                    });
                    this.dialogBindVisible =false;
                    this.getList();
                })
            })
        },
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery).then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].children = []
                }
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.length;
            });
        },
        getProductList(){
            let params = {
                one_category_id: '',
                page: 1,
                size: 10,
                product_name: '',
                start_price: null,
                status: '',
                three_category_id: '',
                two_category_id: '',
            }
            fetchProductList(params).then(response => {
                let list = response.data;
                list.forEach((ele)=>{
                    let item = {}
                    item.label = ele.product_name;
                    item.value = ele.product_id
                    this.productOptionsDefaut.push(item);
                })
                this.productOptions = Object.assign({}, this.productOptionsDefaut);
                this.total = response.data.length;
            });
        }
    }
  }
</script>
<style></style>


