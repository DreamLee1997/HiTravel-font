<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-28 17:34:03
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-28 18:20:53
 -->
<template>
    <div class="orderList" >
        {{tabType}}
        <el-table
            :data="tableData"
            v-loading="isloading"
            style="width: 900px; margin: 20px 60px" >
            <el-table-column label="订单编号" prop="img" width="350"  >
            </el-table-column>
            <el-table-column label="姓名">
            </el-table-column>
        </el-table>
        <div class="pagination-container" style="margin-right: 300px;">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="queryInfo.size"
                :page-sizes="[5,10,15]"
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
import { searchMyOrder } from "@/api/order";
export default {
    props:{
        tabType:{
            type:Array,
            required:true
        }
    },
    data() {
        return {
            tableData:[],
            strategyList:[],
            queryInfo: {
                page: 1,
                Size: 10
            },
            total:null,
            articleId:'',
            isShow:10000000,
            isloading:false,
            editDialogVisible:false,
        };
    },
    watch: {
        tabType (newName, oldName) {
            console.log(newName,oldName,111)
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        
        //获取热门攻略列表
        getList(){
            let self = this;
            self.isloading = true;
            console.log(self.tabType);
            // self.tabType
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
.myStrategy{
    .table-title{
        font-size: 24px;
        color: #fd9e00;
        padding: 10px 3px 2px 0;
    }
    .table-content{
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        padding: 5px 5px 0px 2px;
        width: 430px;
        font-size: 15px;
    }
    .table-second{
        color: #959897;
        margin-left: 5px;
        .bottom-span {
            font-size: 12px;
            margin-right: 17px;
            .svg-icon {
                width: 14px;
                height: 22px;
                padding-top: 10px;
                margin-right: 2px;
            }
        }
    }
    .table-bottom {
        color: #959897;
        position: absolute;
        bottom: 15px;
        .bottom-span {
            font-size: 12px;
            margin-right: 17px;
            .svg-icon {
                width: 14px;
                height: 22px;
                padding-top: 10px;
                margin-right: 2px;
            }
        }
    }
}

.el-dialog{
    margin-top: 5vh;
}
.el-dialog__body{
    padding: 17px 20px;
}
.delete-img {
    width: 340px;
    height: 38px;
    line-height: 39px;
    background: rgba(59, 60, 61, 0.82);
    position: absolute;
    display: block;
    left: 10px;
    top: 174px;
    z-index: 999;
    cursor: pointer;
    text-align: right;
    i {
        margin: 8px 10px 0 0;
        font-size: 24px;
        color: white;
    }
}

</style>