<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-20 17:14:17
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-24 10:59:12
 -->
<template>
  <div class="hotelDetial">
    <div class="main">
        <div class="main-in">
            <div class="main-in-top">
              <div class="content">
                <a class="order" @click="handleBack">订酒店</a>><a class="order">订房间</a>
              </div>
            </div>
            <div class="main-in-center" >
              <div class="left">
                <img class="img" :src="'http://101.132.138.185:8080'+hotelInfo.img" alt="">
              </div>
              <div class="right">
                <div class="hotelName">{{hotelInfo.hotelName}}</div>
                <span class="createTime">{{hotelInfo.createTime}}</span>
                <span class="addr"><svg-icon class="svg-icon" icon-class="location-1" />{{hotelInfo.provinceName}}·{{hotelInfo.cityName}}</span>
                <div class="addrDetial">详细地址：
                  <span >{{hotelInfo.provinceName}}省{{hotelInfo.cityName}}市{{hotelInfo.areaName}}区{{hotelInfo.streetName}}</span>
                </div>
              </div>
            </div>
            <div class="main-in-bottom" >
              <div>
                <el-date-picker
                  v-model="daterange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  :picker-options="pickerBeginDateBefore"
                  :default-time="['12:00:00', '13:00:00']">>
                </el-date-picker>
                <el-button type="primary" size="" @click="handleSearch">搜索</el-button>
              </div>
                <div class="table-container">
                  <el-table ref="roomTable" :data="roomList" style="width: 100%" v-loading="listLoading" >
                    <el-table-column label="房间类型" prop="roomName" align="center"></el-table-column>
                    <el-table-column label="房间数量" prop="roomNumber" align="center"></el-table-column>
                    <el-table-column label="原价格"  prop="normalPrice" align="center"></el-table-column>
                    <el-table-column label="折后价格" prop="sellPrice" align="center"></el-table-column>
                    <el-table-column label="操作" width="160" align="center">
                      <template slot-scope="scope">
                        <p>
                          <el-button size="mini" type="primary" @click="handleOrder(scope.row)">预定</el-button>
                        </p>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
            </div>
      </div>
    </div>
    <el-dialog
      title="确认订单信息"
      :visible.sync="editDialogVisible"
      width="616px">
      <el-form 
          :model="orderInfo" 
          size="small" 
          label-width="120px">
          <el-form-item label="预定时间：" >
            <el-date-picker
              v-model="orderInfo.daterange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :picker-options="pickerBeginDateBefore"
              :default-time="['12:00:00', '13:00:00']">>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="房间名称："  >
            <span style="">{{orderInfo.roomName}}</span>
          </el-form-item>
          <el-form-item label="房间单价：" >
            <span style="font-size: 18px; color: red;">{{orderInfo.sellPrice}}¥/晚 </span>
            <span style="text-decoration: line-through;"> (原价{{orderInfo.normalPrice}}¥/晚)</span>
          </el-form-item>
          <el-form-item label="房间数量：" >
            <el-select v-model="orderInfo.num" placeholder="请选择">
              <el-option
                v-for="item in numOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
          <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="handleEditConfirm" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchHotel } from '@/api/hotel'
import { queryRoom, queryRoomByTime } from '@/api/hotel'
import { formatDate } from '../../utils/date'
export default {
  data() {
    return {  
       hotelId:'',
       daterange: [],
       listLoading:false,
       editDialogVisible:false,
       hotelInfo:{},
       orderInfo:{
         daterange:[],
         num:1,
       },
       roomList:[],
       total:0,
       numOptions:[{
         value: 1,
          label: '1'
        }, {
          value: 2,
          label: '2'
        }, {
          value: 3,
          label: '3'
        }, {
          value: 4,
          label: '4'
        }, {
          value: 5,
          label: '5'
        }],
       pickerBeginDateBefore:{
        disabledDate(time) {
          return time.getTime() < Date.now()-1 * 24 * 3600 * 1000;
        }
      },
    };
  },
  components:{
    },
  mounted() {
    let self = this;
    self.hotelId = self.$route.query.id;
    self.getHotelInfo();
    self.handleSearch();
  },
  watch:{
    $route(to,from){
      let self = this;
      if(self.$route.path === "/hotelDetial"){
        self.hotelId = self.$route.query.id;
        self.getHotelInfo();
        self.handleSearch();
      }
    }
  },
  methods: {
    //预定酒店
    handleOrder(row){
      let self = this;
      self.orderInfo = row;
      if(self.daterange.length){
        self.orderInfo.daterange = self.daterange;
      }
      // if(self.daterange.length){
      //   let start = new Date(self.daterange[0]);
      //   let end = new Date(self.daterange[1]);
      //   let day = (end - start)/(24*60*60*1000) + 1;
      //   self.orderInfo.num =  day;
      // }else{
      //   self.orderInfo.num =  1;
      // }
      // let start = new Date(self.daterange[0]);
      // let end = new Date(self.daterange[1]);
      // let day = (end - start)/(24*60*60*1000) + 1;
      // self.orderInfo.num =  day;
      console.log(self.orderInfo.daterange)
      self.editDialogVisible = true;
    },
    //确定完成订单
    handleEditConfirm(){
      let self = this;
      
    },
    //获取酒店信息
    getHotelInfo(){
      let self = this;
      searchHotel(
          self.hotelId
      ).then(res => {
          self.hotelInfo = res.data;
      });
    },
    //获取酒店下的房间信息
    handleSearch(){
      let self = this;
      let inDate = ''
      self.listLoading = true;
      if(!self.daterange.length){
        self.inDate = formatDate(new Date(), 'yyyy-MM-dd');
      }else{
        self.inDate = self.daterange[0]
      }
      queryRoomByTime(
          self.hotelId,
          self.inDate
      ).then(res => {
          self.roomList = res.data.records;
          self.listLoading = false;
          self.total = res.data.total;
      });
    },
    //返回上一页
    handleBack(){
      this.$router.push({ path: "/hotel"});
    },
  },
  destroyed() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hotelDetial{
    .main {
        margin-top:20px;
        .main-in {
            width:1000px;
            margin:0 auto;
            .main-in-top {
              .content{
                font-size: 18px;
                color: #f39901;
                .order{
                  color: #f39901;
                }
                .order:hover{
                  cursor:pointer;
                  text-decoration:underline;
                }
              }
            }
            .main-in-center{
                display: flex;
                margin-top: 30px !important;
                .left{
                  width: 460px;
                  .img{
                    width: 460px;
                    height: 300px;
                  }
                }
                .right{
                  width: 500px;
                  padding: 10px 20px;
                  .hotelName{
                    font-size: 24px;
                    padding: 5px 0;
                  }
                  .addrDetial{
                    padding: 5px 0;
                  }
                }
            }
            .main-in-bottom{
              .table-container{
                width: 800px;
              }
            }
        }
    }
}

</style>
