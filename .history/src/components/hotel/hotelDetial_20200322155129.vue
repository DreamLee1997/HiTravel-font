<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-20 17:14:17
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-22 15:51:29
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
            <div class="main-in-bottom" >
              <div class="left">
                <img class="img" :src="'http://101.132.138.185:8080'+hotelInfo.img" alt="">
              </div>
              <div class="right">
                <span class="hotelName">{{hotelInfo.hotelName}}</span>
                <span class="hotelName">{{hotelInfo.hotelName}}</span>
                <span class="hotelName">{{hotelInfo.hotelName}}</span>
                
              </div>
            </div>
            <div class="main-in-bottom" >
              {{hotelInfo}}
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
      queryRoom(
          self.hotelId
      ).then(res => {
          self.roomList = res.data.records;
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
            .main-in-bottom{
                display: flex;
                margin-top: 30px !important;
                .left{
                  width: 500px;
                  .img{
                    width: 500px;
                    height: 350px;
                  }
                }
                .right{
                  width: 500px;
                }
            }
        }
    }
}

</style>
