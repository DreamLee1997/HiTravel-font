<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-28 17:34:03
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-28 21:15:17
 -->
<template>
    <div class="orderList" >
        <el-table
            :data="tableData"
            v-loading="isloading"
            style="width: 100%"
             >
            <el-table-column label="订单编号" prop="orderDetailId" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" align="center" width="200"></el-table-column>
            <el-table-column label="预定时间" prop="bookTime" align="center"></el-table-column>
            <el-table-column label="订单状态" prop="status" align="center"  :show-overflow-tooltip='istooltip'>
                <template slot-scope="scope">{{scope.row | formatScenicStatus}}</template>
            </el-table-column>
            <el-table-column label="用户ID" prop="userId" align="center" width="80"></el-table-column>
            <el-table-column label="商家名称" prop="hotelOrScenicName" align="center"></el-table-column>
            <el-table-column label="商品名称" prop="roomOrTicketName" align="center"></el-table-column>
            <el-table-column label="数量" prop="number" align="center" width="70"></el-table-column>
            <el-table-column label="总价" prop="amount" align="center"></el-table-column>
            <el-table-column 
                label="操作" 
                fixed="right"
                align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleCancel(scope.$index, scope.row)">取消
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container" style="margin-right: 30px;">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="queryInfo.size"
                :page-sizes="[10,20,30]"
                :total="total"
            ></el-pagination>
        </div>
        <el-dialog
            title="编辑攻略信息"
            :visible.sync="editDialogVisible"
            width="750px">
           
        </el-dialog> 
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { searchMyOrder, cancelOrder } from "@/api/order";
export default {
    props:{
        tabType:{
            type:Array,
            required:true
        }
    },
    data() {
        return {
            istooltip:true,
            tableData:[],
            strategyList:[],
            queryInfo: {
                page: 1,
                size: 10
            },
            total:null,
            articleId:'',
            isShow:10000000,
            isloading:false,
            editDialogVisible:false,
        };
    },
    filters:{
        formatScenicStatus(row){
            if (row.status === 0) {
                return '已预订';
            } else {
                return '已取消';
            } 
        }
    },
    watch: {
        // tabType (newName, oldName) {
        //     let self = this;
        //     if (self.$route.path === "/scenicDetial") {
        //         // self.getList();
        //         console.log(self.$route.path);
        //     }
        //         console.log(self.$route.path);
        // }
    },
    mounted() {
        this.getList();
    },
    methods: {
        //取消订单
        handleCancel(index, row){
            let self = this;
            this.$confirm("是否确认取消订单", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                cancelOrder(row.orderId).then(res => {
                    this.$message({
                        message: "取消成功",
                        type: "success",
                        duration: 1000
                    });
                    self.getList();
                });
            });
        },
        //获取热门攻略列表
        getList(){
            let self = this;
            self.isloading = true;
            //请求数据
            searchMyOrder(
                self.tabType[0],
                self.tabType[1],
                self.queryInfo.page,
                self.queryInfo.size
            ).then(response => {
                self.tableData = response.data.records;
                self.total = response.data.total;
                self.isloading = false;
            });
        },
        handleSizeChange(val) {
            this.queryInfo.size = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.queryInfo.page = val;
            this.getList();
        },
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orderList{
    
}



</style>