<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-09 10:28:04
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店-房间列表</span>
        </el-card>
        <el-card class="content-container">
            <el-row>
                <el-col :span="4" v-for="(item, index) in list" :key="item.hotelId" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                    <img style="height: 80px; width:90px" :src="'http://101.132.138.185:8080'+item.img"  class="image">
                    <div style="padding: 14px;">
                        <span>{{item.hotelName}}</span>
                        <!-- <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div> -->
                    </div>
                    </el-card>
                </el-col>
            </el-row>
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
