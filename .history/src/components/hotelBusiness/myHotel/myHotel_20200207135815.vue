<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-07 13:56:45
 -->
<template>
    <div class="app-container">
       <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店列表</span>
            <!-- <el-button
                class="btn-add"
                type="primary"
                @click="handleAddHotel"
                size="mini">
                提交
            </el-button> -->
        </el-card>
        <el-card class="content-container">
            <div class="table-container">
                <el-table ref="productTable"
                            :data="list"
                            style="width: 100%"
                            >
                    <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.hotelId}}</template>
                    </el-table-column>
                    <el-table-column label="酒店图片" width="120" align="center">
                    <template slot-scope="scope"><img style="height: 80px" :src="scope.row.img"></template>
                    <!-- <template slot-scope="scope"><img style="height: 80px" :src="'http://101.132.138.185/:8080/'+scope.row.img"></template> -->
                    </el-table-column>
                    <el-table-column label="酒店名称" prop="hotelName" :show-overflow-tooltip='istooltip' align="center">
                    </el-table-column>
                    <el-table-column label="酒店ID" prop="hotelCardId" align="center">
                    </el-table-column>
                     <el-table-column label="法人姓名" prop="realname" align="center">
                    </el-table-column>
                     <el-table-column label="法人身份证号" prop="hotelCardId" align="center">
                    </el-table-column>
                     <el-table-column label="法人电话" prop="phone" align="center">
                    </el-table-column>
                     <el-table-column label="创建时间" prop="createTime" align="center">
                    </el-table-column>
                    <el-table-column label="街道编码" :show-overflow-tooltip='istooltip' align="center">
                    <template slot-scope="scope">{{scope.row.streetCode}}</template>
                    </el-table-column>
                    <el-table-column label="酒店状态" :show-overflow-tooltip='istooltip' align="center">
                    <template slot-scope="scope">{{scope.row.userStatus}}</template>
                    </el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip='istooltip' width="160"   align="center">
                    <template slot-scope="scope">
                        <p>
                        <el-button
                            size="mini"
                            @click="handleUpdateProduct(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleCancle(scope.$index, scope.row)">删除
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
                :page-size="10"
                :page-sizes="[5,10,15]"
                :total="total">
            </el-pagination>
    </div>
        </el-card>
    </div>
</template>

<script>
import { queryMyHotel } from '@/api/hotelBusiness'
import { formatDate } from '@/utils/date'

export default {
    data () {
        return {
            list:[],
            istooltip:true,
            total:10
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        //编辑酒店信息
        handleUpdateProduct(){

        },
        
        //获取我的酒店列表
        getList(){
            let self = this;
            
            queryMyHotel().then(response => {
                this.list = response.data;
                this.total = response.data.length;
            });
        },
        handleCancle(){

        },
        handleSizeChange(val) {
            // this.getList();
        },
        handleCurrentChange(val) {
            // this.getList();
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
        
    }
}
</style>
