<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-07 17:50:55
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店列表</span>
        </el-card>
        <el-card class="content-container">
            
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

        }    
    },
    mounted(){
        this.getList();
    },
    methods: {
        
        
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
    }
}

</style>
