<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 11:13:51
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-19 18:52:21
 -->
<template>
  <div class="myStrategy">
        <el-row>
            <el-col :span="24" v-for="(item, index) in strategyList" :key="index" >
                <el-card :body-style="{ padding: '0px' , display: 'flex'}">
                    <img :src="item.imgUrl" class="image">
                    <div class="content-r" >
                        <span class="title">{{item.title}}</span>
                        <div class="bottom clearfix">
                            <span >{{item.cityName}}</span>
                            <time class="time">{{ item.createTime }}</time>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { queryMyStrategy } from "@/api/strategy";

export default {
  data() {
    return {
        strategyList:[],
        queryInfo: {
            status: "",
            pageNo: 1,
            pageSize: 10
        }
    };
  },

  mounted() {
    this.getList();
    // this.goTo('/hotelBusiness/myHotel');
  },
  methods: {
    getList() {
      let self = this;
      queryMyStrategy(
        self.queryInfo.status,
        self.queryInfo.pageNo,
        self.queryInfo.pageSize
      ).then(res => {
            self.strategyList = res.data.records
            self.strategyList.forEach(ele => {
                let imgUrl = ''
                ele.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                    imgUrl =  capture;
                });
                Object.assign(ele, {['imgUrl']: imgUrl});  
            });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-card.is-always-shadow{
    width: 880px;
    margin: 20px 0 0 40px;
}
.image{
    width: 580px;
    height: 300px;
}
.content-r{
    padding: 14px;
    width: 290px;
    height: 300px;
    .title{
        font-size: 22px;
        color: #fd9e00;
        font-weight: bold;
    }
    .bottom{
        position: absolute;
        width: 200px;
    }
}

</style>