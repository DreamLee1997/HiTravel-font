<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-09 11:12:00
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店-房间列表</span>
        </el-card>
        <el-card class="content-container">
            <el-row v-if="isShowHotel">
                <el-col 
                    class="hotel-card" v-for="(item) in list" 
                    :key="item.hotelId" >
                        <el-card :body-style="{ padding: '0px' }"  @click="toRoom(item.hotelId)">
                            <img style="height: 155px; width:178px" :src="'http://101.132.138.185:8080'+item.img"  class="image">
                            <div style="padding: 10px; text-align: center;">
                                <span>{{item.hotelName}}</span>
                            </div>
                        </el-card>
                </el-col>
            </el-row>
            <div class="table-container" v-else>
                <div>
                    
                </div>
                <el-table       
                    ref="roomTable"
                    :header-cell-style="{fontSize:'15px'}"
                    :data="roomList"
                    style="width: 100%">
                    <el-table-column label="酒店编号" align="center">
                    <template slot-scope="scope">{{scope.row.hotelId}}</template>
                    </el-table-column>
                    <el-table-column label="酒店图片" width="120" align="center">
                    <template slot-scope="scope">
                        <img style="height: 80px; width:90px" :src="'http://101.132.138.185:8080'+scope.row.img"></template>
                    </el-table-column>
                    <el-table-column label="酒店名称" prop="hotelName" :show-overflow-tooltip='istooltip' align="center">
                    </el-table-column>
                    <!-- <el-table-column label="酒店ID" prop="hotelCardId" align="center">
                    </el-table-column> -->
                        <el-table-column label="法人姓名" prop="realname" align="center">
                    </el-table-column>
                    <el-table-column label="身份证号" :show-overflow-tooltip='istooltip' prop="hotelCardId" align="center">
                    </el-table-column>
                    <el-table-column label="法人电话" :show-overflow-tooltip='istooltip' prop="phone" align="center">
                    </el-table-column>
                    <el-table-column label="法人邮箱" :show-overflow-tooltip='istooltip' prop="email" align="center">
                    </el-table-column>
                    <el-table-column label="创建时间" :show-overflow-tooltip='istooltip' prop="createTime" align="center">
                    </el-table-column>
                    <el-table-column label="街道编码" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row.streetCode}}</template>
                    </el-table-column>
                    <el-table-column label="酒店状态" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row.userStatus}}</template>
                    </el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip='istooltip' width="140"   align="center">
                    <template slot-scope="scope">
                        <p>
                        <el-button
                            size="mini"
                            @click="handleUpdateProduct(scope.$index, scope.row)">编辑
                        </el-button>
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handleSearch(scope.$index, scope.row)">查看
                        </el-button>
                        <!-- <el-button
                            size="mini"
                            type="danger"
                            @click="handleCancle(scope.$index, scope.row)">删除
                        </el-button> -->
                        </p>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
import {queryProvince, queryCity, queryArea, queryStreet} from '@/api/area'
import { queryMyHotel, updateHotel } from '@/api/hotelBusiness'
import { formatDate } from '@/utils/date'

export default {
    data () {
        return {
            currentDate: new Date(),
            list:[],
            total:10,
            roomList:[],
            isShowHotel:true,
            istooltip:true,
        }    
    },
    mounted(){
        this.getList();
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
        toRoom(hotelId){
            let self = this;
            self.isShowHotel = false;
            console.log(hotelId)
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
