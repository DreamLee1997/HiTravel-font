<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-29 16:25:31
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-29 16:59:33
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店-订单列表</span>
            <el-button
                v-if="!isShowHotel"
                class="btn-add"
                type="primary"
                @click="handleSearch"
                size="mini">
                搜索
            </el-button>
        </el-card>
        <el-card class="content-container" v-loading="isloading">
            <el-row v-if="isShowHotel" >
                <el-col 
                    class="hotel-card" v-for="(item) in list" 
                    :key="item.hotelId" 
                    @click.native="toRoom(item.hotelId, item.hotelName)">
                        <el-card  :body-style="{ padding: '0px' }" >
                            <img style="height: 155px; width:178px" :src="'http://101.132.138.185:8080'+item.img"  class="image">
                            <div style="padding: 10px; text-align: center;">
                                <span>{{item.hotelName}}</span>
                            </div>
                        </el-card>
                </el-col>
            </el-row>
            <div class="table-container" v-if="!isShowHotel">
                <div style="margin: -10px 5px 15px 5px;">
                    <el-button icon="el-icon-back" @click="toHotel" size="mini" type="primary">返回</el-button>
                    <span style="padding: 0px 20px; font-size: 17px;">{{hotelName}}</span>
                </div>
                <el-table       
                    ref="roomTable"
                    v-loading="listloading"
                    :header-cell-style="{fontSize:'15px'}"
                    :data="orderList"
                    style="width: 100%">
                    <el-table-column label="订单编号" prop="orderDetailId" align="center"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" align="center" width="200"></el-table-column>
                    <el-table-column label="预定时间" prop="bookTime" align="center" width="100"></el-table-column>
                    <el-table-column label="订单状态" prop="status" align="center"  :show-overflow-tooltip='istooltip'>
                        <template slot-scope="scope">{{scope.row | formatStatus}}</template>
                    </el-table-column>
                    <el-table-column label="用户ID" prop="userId" align="center" width="80"></el-table-column>
                    <el-table-column label="酒店名称" prop="hotelOrScenicName" :show-overflow-tooltip='istooltip' align="center"></el-table-column>
                    <el-table-column label="房间名称" prop="roomOrTicketName" align="center"></el-table-column>
                    <el-table-column label="数量" prop="number" align="center" width="70"></el-table-column>
                    <el-table-column label="总价" prop="amount" align="center"></el-table-column>
                    
                    <!-- <el-table-column label="操作" fixed="right"  :show-overflow-tooltip='istooltip' width="140"   align="center">
                        <template slot-scope="scope">
                            <p>
                                <el-button
                                size="mini"
                                type="primary"
                                @click="handleSearch(scope.$index, scope.row)">
                            </el-button>
                            </p>
                        </template>
                    </el-table-column> -->
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
        <el-dialog
            :title="title+'酒店信息'"
            :visible.sync="updateDialogVisible"
            width="616px">
            <el-form 
                :inline="true" 
                :model="updateRoom"
                size="small" 
                label-width="120px">
                <el-form-item label="房间类型：" prop="roomName" >
                    <el-input class="form-input" v-model="updateRoom.roomName" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="房间原价：" prop="normalPrice">
                    <el-input class="form-input" v-model="updateRoom.normalPrice" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="房间现价：" prop="sellPrice">
                    <el-input class="form-input" v-model="updateRoom.sellPrice" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="房间数量：" prop="roomNumber">
                    <el-input class="form-input" v-model="updateRoom.roomNumber" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="房间状态：" prop="status">
                    <el-radio-group v-model="updateRoom.status" :disabled="isEdit">
                        <el-radio :label=1>在售</el-radio>
                        <el-radio :label=0>不在售</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" v-show="!isEdit" >
                <el-button @click="updateDialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleUpdateConfirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {queryProvince, queryCity, queryArea, queryStreet} from '@/api/area'
import { queryMyHotel, updateHotel, queryRoom, addRoom, updateRoom, searchRoom, queryOrderForStore} from '@/api/hotelBusiness'
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
            hotelName:'',
            hotelId:'',
            isEdit:false,
            isloading:false,
            listloading:false,
            isShowHotel:true,
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

       //获取我的酒店列表
        getList(){
            let self = this;
            self.isloading = true;
            queryMyHotel().then(response => {
                this.list = response.data;
                self.isloading = false;
            });
        },
        //跳转到订单列表 
        toRoom(hotelId, hotelName){
            let self = this;
            self.hotelName = hotelName;
            self.hotelId = hotelId;
            self.isShowHotel = false;
            self.listloading = true;
            queryOrderForStore(hotelId, self.listQuery.status, self.listQuery.page, self.listQuery.size ).then(res => {
                self.orderList = res.data.records;
                console.log(self.orderList)
                self.listloading = false;
            });
        },
        //返回到酒店列表 
        toHotel(){
            let self = this;
            self.isShowHotel = true;
        },
        //按条件搜索订单列表
        handleSearch(){
            let self = this;
            
        },
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.toRoom();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.toRoom();
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
        .el-button--mini{
            width: 70px !important;
            font-size: larger !important;
        }
    }
    .content-container{
        height: 660px;
        .hotel-card{
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
