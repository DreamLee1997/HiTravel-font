<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-09 21:23:19
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店-房间列表</span>
            <el-button
                class="btn-add"
                type="primary"
                @click="handleAddRoom"
                size="mini">
                添加
            </el-button>
        </el-card>
        <el-card class="content-container">
            <el-row v-if="isShowHotel">
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
            <div class="table-container" v-else>
                <div style="margin: -10px 5px 15px 5px;">
                    <el-button icon="el-icon-back" @click="toHotel" size="mini" type="primary">返回</el-button>
                    <span style="padding: 0px 20px; font-size: 17px;">{{hotelName}}</span>
                </div>
                <el-table       
                    ref="roomTable"
                    :header-cell-style="{fontSize:'15px'}"
                    :data="roomList"
                    style="width: 100%">
                    <el-table-column label="酒店编号" align="center">
                    <template slot-scope="scope">{{scope.row.hotelId}}</template>
                    </el-table-column>
                    <el-table-column label="房间编号" prop="roomId" :show-overflow-tooltip='istooltip' align="center">
                    </el-table-column>
                        <el-table-column label="房间种类" prop="roomName" :show-overflow-tooltip='istooltip'  align="center">
                    </el-table-column>
                    <el-table-column label="房间数量" prop="roomNumber" align="center">
                    </el-table-column>
                    <el-table-column label="原价" prop="normalPrice" align="center">
                    </el-table-column>
                    <el-table-column label="现价" prop="sellPrice" align="center">
                    </el-table-column>
                    <el-table-column label="房间状态" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row.status}}</template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right"  :show-overflow-tooltip='istooltip' width="140"   align="center">
                        <template slot-scope="scope">
                            <p>
                            <el-button
                                size="mini"
                                @click="handleUpdateRoom(scope.$index, scope.row)">编辑
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
                    <el-radio-group v-model="updateRoom.status">
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
import { queryMyHotel, updateHotel, queryRoom, addRoom, updateRoom, searchRoom} from '@/api/hotelBusiness'
import { formatDate } from '@/utils/date'

export default {
    data () {
        return {
            currentDate: new Date(),
            list:[],
            total:10,
            roomList:[],
            updateRoom:{
                status:1,
            },
            hotelName:'',
            hotelId:'',
            isEdit:false,
            isShowHotel:true,
            istooltip:true,
            title:'添加',
            updateDialogVisible:false,
        }    
    },
    mounted(){
        this.getList();
        // let params = {
        //     "hotelId": "17",
        //     "normalPrice": "399",
        //     "roomName": "三床房",
        //     "roomNumber": "5",
        //     "sellPrice": "299",
        // }
        // addRoom(params).then(res => {
        //     console.log(res)
        // });
    },
    methods: {

       //获取我的酒店列表
        getList(){
            let self = this;
            queryMyHotel().then(response => {
                this.list = response.data;
                this.total = response.data.length;
            });
        },
        //跳转到房间列表 
        toRoom(hotelId, hotelName){
            let self = this;
            self.hotelName = hotelName;
            self.hotelId = hotelId;
            self.isShowHotel = false;
            queryRoom(hotelId).then(res => {
                self.roomList = res.data.records;
            });
        },
        //返回到酒店列表 
        toHotel(){
            let self = this;
            self.isShowHotel = true;
        },
        //添加房间
        handleAddRoom(){
            let self = this;
            self.updateRoom = {};
            self.title = '添加';
            self.isEdit = false;
            self.updateDialogVisible = true;
        },
        //修改room信息
        handleUpdateRoom(index, room){
            let self = this;
            self.updateRoom = room;
            self.title = '修改';
            self.isEdit = false;
            self.updateDialogVisible = true;
        },
        //查看room信息
        handleSearch(index, room){
            let self = this;
            searchRoom(room.roomId).then(res => {
                self.updateRoom = res.data;
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
                    self.updateRoom.hotelId = self.hotelId;
                    addRoom(self.updateRoom).then(res => {
                        self.$message({
                            message: '添加成功',
                            type: 'success',
                            duration: 1000
                        });
                        self.toRoom(self.hotelId, self.hotelName);
                        self.updateDialogVisible = false;
                    });
                }else{
                    updateRoom(self.updateRoom).then(res => {
                        self.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1000
                        });
                        self.toRoom(self.hotelId, self.hotelName);
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
