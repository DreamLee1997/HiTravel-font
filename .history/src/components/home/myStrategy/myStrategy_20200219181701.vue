<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 11:13:51
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-19 18:17:01
 -->
<template>
  <div class="myStrategy">
        <el-row>
            <el-col :span="24" v-for="(item, index) in strategyList" :key="index" >
                <el-card :body-style="{ padding: '0px' }">
                <img :src="item.imgUrl" class="image">
                <div style="padding: 14px;">
                    <span>{{item.title}}</span>
                    <div class="bottom clearfix">
                    <span>{{item.cityName}}</span>
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
</style>