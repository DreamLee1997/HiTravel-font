<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-29 17:33:30
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-29 17:41:15
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">景区-订单列表</span>
                <el-button
                    v-if="!isShowScenic"
                    class="btn-add"
                    type="primary"
                    @click="handleSearch"
                    size="mini">
                    搜索
                </el-button>
                <el-select v-if="!isShowScenic" size="small" v-model="listQuery.status" placeholder="请选择" class="select">
                    <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </el-card>
        <el-card class="content-container" v-loading="isloading">
            <el-row v-if="isShowScenic" >
                <el-col 
                    class="scenic-card" v-for="(item) in list" 
                    :key="item.scenicId" 
                    @click.native="toTicket(item.scenicId, item.scenicName)">
                        <el-card  :body-style="{ padding: '0px' }" >
                            <img style="height: 155px; width:178px" :src="'http://101.132.138.185:8080'+item.img"  class="image">
                            <div style="padding: 10px; text-align: center;">
                                <span>{{item.scenicName}}</span>
                            </div>
                        </el-card>
                </el-col>
            </el-row>
            <div class="table-container" v-if="!isShowScenic">
                <div style="margin: -10px 5px 15px 5px;">
                    <el-button icon="el-icon-back" @click="toScenic" size="mini" type="primary">返回</el-button>
                    <span style="padding: 0px 20px; font-size: 17px;">{{scenicName}}</span>
                </div>
                <el-table       
                    ref="roomTable"
                    v-loading="listloading"
                    :header-cell-style="{fontSize:'15px'}"
                    :data="orderList"
                    style="width: 100%">
                    <el-table-column label="订单编号" prop="orderDetailId" align="center"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" align="center"  :show-overflow-tooltip='istooltip'></el-table-column>
                    <el-table-column label="预定时间" prop="bookTime" align="center"  :show-overflow-tooltip='istooltip'></el-table-column>
                    <el-table-column label="订单状态" prop="status" align="center"  :show-overflow-tooltip='istooltip'>
                        <template slot-scope="scope">{{scope.row | formatStatus}}</template>
                    </el-table-column>
                    <el-table-column label="用户ID" prop="userId" align="center" width="80"></el-table-column>
                    <el-table-column label="酒店名称" prop="hotelOrScenicName" :show-overflow-tooltip='istooltip' align="center"></el-table-column>
                    <el-table-column label="房间名称" prop="roomOrTicketName" align="center" :show-overflow-tooltip='istooltip'></el-table-column>
                    <el-table-column label="数量" prop="number" align="center" width="70"></el-table-column>
                    <el-table-column label="总价" prop="amount" align="center"></el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, sizes,prev, pager, next,jumper"
                        :page-size="10"
                        :page-sizes="[5,10,15]"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import {queryProvince, queryCity, queryArea, queryStreet} from '@/api/area'
import { queryMyScenic, queryOrderForStore} from '@/api/scenicBusiness'
import { formatDate } from '@/utils/date'

export default {
    data () {
        return {
            currentDate: new Date(),
            list:[],
            total:0,
            orderList:[],
            updateRoom:{
                status:1,
            },
            listQuery:{
                status: null,
                page:1,
                size:10
            },
            statusOptions:[{
                value: null,
                label: '全部'
            }, {
                value: 0,
                label: '已预定'
            }, {
                value: 1,
                label: '已取消'
            }],
            scenicName:'',
            scenicId:'',
            isEdit:false,
            isloading:false,
            listloading:false,
            isShowScenic:true,
            istooltip:true,
            title:'添加',
            updateDialogVisible:false,
        }    
    },
    filters:{
        formatStatus(row){
            if (row.status === 0) {
                return '已预订';
            } else {
                return '已取消';
            } 
        }
    },
    mounted(){
        this.getList();
    },
    methods: {

       //获取我的景区列表
        getList(){
            let self = this;
            self.isloading = true;
            queryMyScenic().then(response => {
                self.list = response.data;
                self.isloading = false;
            });
        },
        //跳转到订单列表 
        toTicket(scenicId, scenicName){
            let self = this;
            self.scenicName = scenicName;
            self.scenicId = scenicId;
            self.isShowScenic = false;
            self.listloading = true;
            queryOrderForStore(scenicId, self.listQuery.status, self.listQuery.page, self.listQuery.size ).then(res => {
                self.orderList = res.data.records;
                self.listloading = false;
                self.total = res.data.total;
            });
        },
        //返回到景区列表 
        toScenic(){
            let self = this;
            self.isShowScenic = true;
        },
        //按条件搜索订单列表
        handleSearch(){
            let self = this;
            self.toTicket(self.scenicId, self.scenicName);
        },
        handleSizeChange(val) {
            let self = this;
            self.listQuery.size = val;
            self.toTicket(self.scenicId, self.scenicName);
        },
        handleCurrentChange(val) {
            let self = this;
            self.listQuery.page = val;
            self.toTicket(self.scenicId, self.scenicName);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-container{
    padding: 0 10px;
    .operate-container{
        margin: 15px 0;
        .el-icon-tickets{
            font-size: large;
        }
        .select{
            float: right;
            padding-right: 10px;
            width: 150px;
        }
        .el-button--mini{
            width: 70px !important;
            font-size: larger !important;
        }
    }
    .content-container{
        height: 660px;
        
        .scenic-card{
            width: 180px;
            height: 210px;
            margin: 10px 20px;
        }
        .time {
            font-size: 13px;
            color: #999;
        }
        
        .bottom {
            margin-top: 13px;
            line-height: 12px;
        }

        .button {
            padding: 0;
            float: right;
        }

        .image {
            width: 100%;
            display: block;
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
  
        .clearfix:after {
            clear: both
        }
    }
}

</style>
