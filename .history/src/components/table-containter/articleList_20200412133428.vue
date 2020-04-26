<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-23 13:57:00
 * @LastEditors: lixiang
 * @LastEditTime: 2020-04-12 13:34:28
 -->
 <template>
  <div class="articlList" >
        <div>
            <el-table
                :data="tableData"
                :show-header="false"
                style="width: 100%; margin-top: 20px" 
                @row-click='handleRowClick'  >
                <el-table-column prop="img" width="250">
                    <template slot-scope="scope">
                        <img :src="scope.row.imgUrl" alt  width="250" height="180" />
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
                            <span style="float: right" >
                                <el-button @click.stop="handleOrder" type="primary" size="mini">一键预定</el-button>
                            </span>
                        </div>
                    </div>
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
                :page-size="listQuery.size"
                :page-sizes="[5,10,15]"
                :total="total"
            ></el-pagination>
        </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/strategy'
import { queryMyStrategy, deleteStrategy } from "@/api/strategy";
const defaultListQuery = {
  cityCode: '', //非必传
  page: 1,
  size: 10,
  status: 1, //0-未审核,1-已审核，不传全部攻略
  type: 1 //0-最新 1-点赞数 ,必传
};
export default {
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            total:null,
            tableData:[]
        };
    },
    components:{
    },
    props:{
        ramdom: Number
    },
    watch:{
        // ramdom(newValue, oldValue){
        //     this.getList();
        // }
    },
    mounted() {
        this.getList();
        // this.goTo('/hotelBusiness/myHotel');
    },
    methods: {
        //一键预定
        handleOrder(){
            let self = this;
            this.$confirm('是否确认一键预定该攻略', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                
                // updateScenic(self.editScenic).then(response => {
                //     this.$message({
                //         message: '修改成功',
                //         type: 'success',
                //         duration: 1000
                //     });
                //     this.getList();
                //     this.editDialogVisible=false;
                // });
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
        //获取热门攻略列表
        getList(){
            let self = this;
            //请求数据
            fetchList(
                self.listQuery.page,
                self.listQuery.size,
                self.listQuery.type,
                self.listQuery.status,
                self.listQuery.cityCode
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
            });
        },
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.articlList{
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