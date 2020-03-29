<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-20 17:14:17
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-22 16:49:41
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
                <div class="table-container">
                  <el-table ref="roomTable" :data="roomList" style="width: 100%" v-loading="listLoading" >
                    <el-table-column label="房间类型" prop="roomName" align="center"></el-table-column>
                    <el-table-column label="房间数量" prop="roomNumber" align="center"></el-table-column>
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
                <!-- <div class="pagination-container">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes,prev, pager, next,jumper"
                    :page-size="listQuery.size"
                    page-sizes="10"
                    :total="total"
                  ></el-pagination>
                </div> -->
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
    self.getList();
  },
  watch:{
    $route(to,from){
      let self = this;
      if(self.$route.path === "/hotelDetial"){
        self.hotelId = self.$route.query.id;
        self.getHotelInfo();
        self.getList();
      }
    }
  },
  methods: {
    handleOrder(){

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
    getList(){
      let self = this;
      self.listLoading = true;
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
