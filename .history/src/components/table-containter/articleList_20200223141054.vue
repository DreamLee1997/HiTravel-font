<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-23 13:57:00
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-23 14:10:54
 -->
 <template>
  <div class="articlList" >
        <div>
            <el-table
                :data="tableData"
                :show-header="false"
                style="width: 100%; margin-top: 20px">
                <el-table-column prop="img" width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt />
                </template>
                </el-table-column>
                <el-table-column label="姓名">
                <template slot-scope="scope">
                    <div>
                    <div class="table-title">{{scope.row.title}}</div>
                    <p >{{scope.row.content}}</p>
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
                this.listQuery.page,
                this.listQuery.size,
                this.listQuery.type,
                this.listQuery.status,
                this.listQuery.cityCode
            ).then(response => {
                this.tableData = response.data.records;
                this.total = response.data.total;
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