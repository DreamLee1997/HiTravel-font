<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 11:13:51
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-25 13:57:14
 -->
<template>
  <div class="myFavorite">
        <el-table
            :data="tableData"
            :show-header="false"
            style="width: 900px; margin: 20px 60px" 
            @row-click='handleRowClick'  >
            <el-table-column prop="img" width="350"  >
                <template slot-scope="scope" >
                    <img :src="scope.row.imgUrl" alt  width="350" height="200" style="z-index: -1;"/>
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
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { queryMyCollection } from "@/api/strategy";

export default {
    data() {
        return {
            tableData:[],
            queryInfo: {
                status: "",
                pageNo: 1,
                pageSize: 10
            },
            total:null,
        };
    },

    mounted() {
        this.getList();
    },
    methods: {
        
        //获取攻略列表
        getList() {
            let self = this;
            queryMyCollection().then(res => {
                self.tableData = res.data
                self.tableData.forEach(ele => {
                    let imgUrl = ''
                    ele.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                        imgUrl =  capture;
                    });
                    let reg = /<\/?.+?\/?>/g;
                    let filterStr = ele.content.replace(reg,'')
                    Object.assign(ele, {['imgUrl']: imgUrl});  
                    Object.assign(ele, {['filterStr']: filterStr});  
                });
            });
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
.myFavorite{
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


</style>