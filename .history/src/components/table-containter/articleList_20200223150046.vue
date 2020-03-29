<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-23 13:57:00
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-23 15:00:46
 -->
 <template>
  <div class="articlList" >
        <div>
            <el-table
                :data="tableData"
                :show-header="false"
                style="width: 100%; margin-top: 20px">
                <el-table-column prop="img" width="180" height="150">
                <template slot-scope="scope">
                    <img :src="scope.row.imgUrl" alt />
                </template>
                </el-table-column>
                <el-table-column label="姓名">
                <template slot-scope="scope">
                    <div>
                    <div class="table-title">{{scope.row.title}}</div>
                    <p >{{scope.row.filterStr}}</p>
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

    mounted() {
        this.getList();
        // this.goTo('/hotelBusiness/myHotel');
    },
    methods: {
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
                    // let reg = /<\/?.+?\/?>/g;
                    // let filterStr = ele.content.replace(reg,'')
                    let filterStr =  ele.content.replace(/<\s?img[^>]*>/gi,'')
                    filterStr = filterStr.replace(/<\s?br[^>]*>/gi,'')
                    // console.log(filterStr)
                    Object.assign(ele, {['imgUrl']: imgUrl});  
                    Object.assign(ele, {['filterStr']: filterStr});  
                });
            });
        },
        handleSizeChange(val) {
            this.listQuery.size = val;
            // this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            // this.getList();
        },
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>