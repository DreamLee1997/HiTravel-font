<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-24 17:01:00
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-28 11:50:15
 -->
<template>
    <div class="myStrategy" >
        <el-tabs type="border-card">
            <el-tab-pane label="全部订单" name="a">全部订单</el-tab-pane>
            <el-tab-pane label="酒店订单" name="b">酒店订单</el-tab-pane>
            <el-tab-pane label="门票订单" name="c">门票订单</el-tab-pane>
            <el-tab-pane label="已预定" name="d">已预定</el-tab-pane>
            <el-tab-pane label="已取消" name="e">已取消</el-tab-pane>
        </el-tabs>
        <!-- <el-table
            :data="tableData"
            v-loading="isloading"
            :show-header="false"
            @cell-mouse-enter="mouseoverImg" @cell-mouse-leave="mouseoutImg"
            style="width: 900px; margin: 20px 60px" 
            @row-click='handleRowClick'  >
            <el-table-column prop="img" width="350"  >
                <template   
                    slot-scope="scope" 
                    @mouseenter.native="mouseoverImg(scope.$index)"
                    @mouseleave.native="mouseoutImg(scope.$index)" >
                    <img :src="scope.row.imgUrl" alt  width="350" height="200" style="z-index: -1;"/>
                    <div v-show="isShow == scope.row.articleId" ref="imgDelete" class="delete-img" @click.stop  >
                        <i class="el-icon-edit-outline"  @click="handleEdit(scope.row)"></i>
                        <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="姓名">
            <template slot-scope="scope">
                <div style="height: 195px;">
                    <div class="table-title">{{scope.row.title}}</div>
                    <div class="table-second">
                        <span class="bottom-span" >
                            <span>作者：{{scope.row.username}}</span>
                        </span>
                        <span class="bottom-span" >
                            <span>{{scope.row.createTime}}</span>
                        </span>
                        <span class="bottom-span" >
                            <svg-icon class="svg-icon" icon-class="location" />
                            <span>{{scope.row.cityName}}</span>
                        </span>
                    </div>
                    <div>
                        <p class="table-content" v-html="scope.row.filterStr"></p>
                    </div>
                    <div class="table-bottom" >
                        <span class="bottom-span" style="margin-left: 4px;">
                            <svg-icon class="svg-icon" icon-class="praise"/>
                            {{scope.row.praise}}
                        </span>
                        <span class="bottom-span" >
                            <svg-icon class="svg-icon" icon-class="collection"  />
                            {{scope.row.collection}}
                        </span>
                        <span class="bottom-span" >
                            <svg-icon class="svg-icon" icon-class="view" />
                            {{scope.row.view}}
                        </span>
                    </div>
                </div>
            </template>
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
        </div> -->
        <!-- <el-dialog
            title="编辑攻略信息"
            :visible.sync="editDialogVisible"
            width="750px">
            <edit-article :articleId="articleId" @childByValue="childByValue"> </edit-article>
        </el-dialog>  -->
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { queryMyStrategy, deleteStrategy } from "@/api/strategy";
import writeArticle from '../../../components/strategy/writeStrategy/writeStrategy'
export default {
    data() {
        return {
            tableData:[],
            strategyList:[],
            queryInfo: {
                status: "",
                pageNo: 1,
                pageSize: 10
            },
            total:null,
            articleId:'',
            isShow:10000000,
            isloading:false,
            editDialogVisible:false,
        };
    },
    components:{
        'edit-article':writeArticle
    },

    mounted() {
        this.isloading = true;
        this.getList();
        // this.goTo('/hotelBusiness/myHotel');
    },
    methods: {
        //编辑攻略后刷新数据
        childByValue(childValue){
            if(childValue){
                this.getList();
                this.editDialogVisible = false;
            }
        },
        //删除攻略
        handleDelete(item){
            let self = this;
            self.$confirm("是否确认删除", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                deleteStrategy(item.articleId).then(response => {
                    self.$message({
                        message: "删除成功",
                        type: "success",
                        duration: 1000
                    });
                    self.getList();
                });
            });
        },
        //编辑攻略
        handleEdit(item){
            let self = this;
            self.editDialogVisible = true;
            self.articleId = item.articleId;
        },  
        // 鼠标移入图片
        mouseoverImg(s) {
            this.isShow = s.articleId;
        },
        // 鼠标移出图片
        mouseoutImg() {
            this.isShow = 10000000;
        },
        //查看攻略
        handleView(id){
            // //打开新的标签页
            let routeUrl = this.$router.resolve({
                path: "/viewStrategy",
                query: {id:id}
            });
            window.open(routeUrl.href, '_blank')
        },
        //点击跳转到攻略详情。
        handleRowClick(row,column){
            let self = this;
            //打开新的标签页
            let routeUrl = this.$router.resolve({
                path: "/viewStrategy",
                query: {id: row.articleId}
            });
            window.open(routeUrl.href, '_blank')
        },
        //获取热门攻略列表
        getList(){
            let self = this;
            //请求数据
            queryMyStrategy(
                self.queryInfo.status,
                self.queryInfo.pageNo,
                self.queryInfo.pageSize
            ).then(response => {
                self.tableData = response.data.records;
                self.total = response.data.total;
                self.tableData.forEach(ele => {
                    let imgUrl = ''
                    ele.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                        imgUrl =  capture;
                    });
                    let reg = /<\/?.+?\/?>/g;
                    let filterStr = ele.content.replace(reg,'')
                    // let filterStr =  ele.content.replace(/<\s?img[^>]*>/gi,'')
                    // filterStr = filterStr.replace(/<\s?br[^>]*>/gi,'')
                    Object.assign(ele, {['imgUrl']: imgUrl});  
                    Object.assign(ele, {['filterStr']: filterStr});  
                });
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