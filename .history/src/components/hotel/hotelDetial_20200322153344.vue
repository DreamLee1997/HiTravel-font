<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-20 17:14:17
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-22 15:33:44
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
    hotelId: function(newV, oldV) {
      let self = this;
      console.log(self.$route.path)
      // if(){

      // }
      
    },
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
        }
    }
}

</style>
