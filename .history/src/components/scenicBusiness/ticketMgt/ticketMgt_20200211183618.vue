<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-11 18:36:17
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">景区-门票列表</span>
            <el-button
                v-if="!isShowScenic"
                class="btn-add"
                type="primary"
                @click="handleAddTicket"
                size="mini">
                添加
            </el-button>
        </el-card>
        <el-card class="content-container">
            <el-row v-if="isShowScenic">
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
                    ref="ticketTable"
                    :header-cell-style="{fontSize:'15px'}"
                    :data="ticketList"
                    style="width: 100%">
                    <el-table-column label="酒店编号" align="center" prop="scenicId" >
                    </el-table-column>
                    <el-table-column label="房间编号" prop="ticketId"  align="center">
                    </el-table-column>
                        <el-table-column label="房间种类" prop="ticketName" :show-overflow-tooltip='istooltip'  align="center">
                    </el-table-column>
                    <el-table-column label="房间数量" prop="ticketNumber" align="center">
                    </el-table-column>
                    <el-table-column label="原价" prop="normalPrice" align="center">
                    </el-table-column>
                    <el-table-column label="现价" prop="sellPrice" align="center">
                    </el-table-column>
                    <el-table-column label="房间状态" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row | formatTicketStatus}}</template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right"  :show-overflow-tooltip='istooltip' width="140"   align="center">
                        <template slot-scope="scope">
                            <p>
                            <el-button
                                size="mini"
                                @click="handleUpdateTicket(scope.$index, scope.row)">编辑
                            </el-button>
                                <el-button
                                size="mini"
                                type="primary"
                                @click="handleSearch(scope.$index, scope.row)">查看
                            </el-button>
                            </p>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog
            :title="title+'酒店信息'"
            :visible.sync="updateDialogVisible"
            width="616px">
            <el-form 
                :inline="true" 
                :model="updateTicket"
                size="small" 
                label-width="120px">
                <el-form-item label="门票名称：" prop="ticketName" >
                    <el-input class="form-input" v-model="updateTicket.ticketName" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="门票原价：" prop="normalPrice">
                    <el-input class="form-input" v-model="updateTicket.normalPrice" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="门票现价：" prop="sellPrice">
                    <el-input class="form-input" v-model="updateTicket.sellPrice" :disabled="isEdit"></el-input>
                </el-form-item>
                <!-- <el-form-item label="门票数量：" prop="ticketNumber">
                    <el-input class="form-input" v-model="updateTicket.ticketNumber" :disabled="isEdit"></el-input>
                </el-form-item> -->
                <el-form-item label="门票状态：" prop="status">
                    <el-radio-group v-model="updateTicket.status">
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
import { queryMyScenic, queryTicket, addTicket, updateTicket } from '@/api/scenicBusiness'
import { formatDate } from '@/utils/date'

export default {
    data () {
        return {
            currentDate: new Date(),
            list:[],
            total:10,
            ticketList:[],
            updateTicket:{
                status:1,
            },
            scenicName:'',
            scenicId:'',
            isEdit:false,
            isShowScenic:true,
            istooltip:true,
            title:'添加',
            updateDialogVisible:false,
        }    
    },
    filters:{
        formatTicketStatus(row){
            if (row.status === 0) {
                return '未激活';
            } else if (row.status === 1) {
                return '已激活';
            } else {
                return '已删除';    
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
            queryMyScenic().then(response => {
                this.list = response.data;
                this.total = response.data.length;
            });
        },
        //跳转到房间列表 
        toTicket(scenicId, scenicName){
            let self = this;
            self.scenicName = scenicName;
            self.scenicId = scenicId;
            self.isShowScenic = false;
            queryTicket(scenicId, 1, 10).then(res => {
                self.ticketList = res.data.records;
            });
        },
        //返回到景区列表 
        toScenic(){
            let self = this;
            self.isShowScenicl = true;
        },
        //添加门票
        handleAddTicket(){
            let self = this;
            self.updateTicket = {};
            self.title = '添加';
            self.isEdit = false;
            self.updateDialogVisible = true;
        },
        //修改ticket信息
        handleUpdateTicket(index, ticket){
            let self = this;
            self.updateTicket = ticket;
            self.title = '修改';
            self.isEdit = false;
            self.updateDialogVisible = true;
        },
        //查看ticket信息
        handleSearch(index, ticket){
            let self = this;
            searchTicket(ticket.rticketId).then(res => {
                self.updateTicket = res.data;
            });
            self.title = '查看';
            self.isEdit = true;
            self.updateDialogVisible = true;
        },
        //确认处理
        handleUpdateConfirm(){
            let self = this;
            this.$confirm('是否确认修改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                if(self.title == "添加"){
                    self.updateTicket.scenicId = self.scenicId;
                    addTicket(self.updateTicket).then(res => {
                        self.$message({
                            message: '添加成功',
                            type: 'success',
                            duration: 1000
                        });
                        self.toTicket(self.scenicId, self.scenicName);
                        self.updateDialogVisible = false;
                    });
                }else{
                    self.updateTicket.ticketNumber = parseInt(self.updateTicket.ticketNumber);
                    updateTicket(self.updateTicket).then(res => {
                        self.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1000
                        });
                        self.toTicket(self.scenicId, self.scenicName);
                        self.updateDialogVisible = false;
                    });
                }
            });
            
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
