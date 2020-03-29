<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-20 17:14:17
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-23 14:00:58
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
                  :default-value="new Date()"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '13:00:00']">>
                </el-date-picker>
                <el-button type="primary" size="" @click="handleSearch">搜索</el-button>
              </div>
                <div class="table-container">
                  <el-table ref="roomTable" :data="roomList" style="width: 100%" v-loading="listLoading" >
                    <el-table-column label="房间类型" prop="roomName" align="center"></el-table-column>
                    <!-- <el-table-column label="房间数量" prop="roomNumber" align="center"></el-table-column> -->
                    <el-table-column label="原价格"  prop="normalPrice" align="center"></el-table-column>
                    <el-table-column label="折后价格" prop="sellPrice" align="center"></el-table-column>
                    <el-table-column label="操作" width="160" align="center">
                      <template slot-scope="scope">
                        <p>
                          <el-button size="mini" type="primary" @click="handleOrder(scope.$index, scope.row)">预定</el-button>
                        </p>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {searchHotel} from '@/api/hotel'
import {queryRoom} from '@/api/hotel'
export default {
  data() {
    return {  
       hotelId:'',
       daterange:[],
       listLoading:false,
       hotelInfo:{},
       roomList:[],
       total:0,
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
    handleOrder(){
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
      self.listLoading = true;
      console.log(self.daterange)
      queryRoom(
          self.hotelId
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
