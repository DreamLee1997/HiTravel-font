<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-07 13:33:24
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
                            @selection-change="handleSelectionChange"
                            v-loading="listLoading"
                            >
                    <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.product_id}}</template>
                    </el-table-column>
                    <el-table-column label="商品图片" width="120" align="center">
                    <template slot-scope="scope"><img style="height: 80px" :src="'http://wuweijie.net:8090/'+scope.row.image_url"></template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="product_name" :show-overflow-tooltip='istooltip' align="center">
                    </el-table-column>
                    <el-table-column label="价格" prop="price" width="120" align="center">
                    </el-table-column>
                    <el-table-column label="SKU库存" width="100" align="center">
                    <template slot-scope="scope">
                        {{scope.row.amount}}
                    </template>
                    </el-table-column>
                    <el-table-column label="销量" prop="sold_out" width="100" align="center">
                    </el-table-column>
                    <el-table-column label="描述" :show-overflow-tooltip='istooltip' align="center">
                    <template slot-scope="scope">{{scope.row.description}}</template>
                    </el-table-column>
                    <el-table-column label="商品状态" :show-overflow-tooltip='istooltip' align="center">
                    <template slot-scope="scope">{{productStatus[scope.row.status]}}</template>
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
export default {
    data () {
        return {
            list:[],
            istooltip:true,
            total:''
        }
    },
    methods: {
        //编辑酒店信息
        handleUpdateProduct(){

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
