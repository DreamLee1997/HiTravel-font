<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 11:13:51
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-19 19:44:33
 -->
<template>
  <div class="myStrategy">
        <el-row>
            <el-col :span="24" v-for="(item, index) in strategyList" :key="index" >
                <el-card :body-style="{ padding: '0px' , display: 'flex'}">
                    <img :src="item.imgUrl" class="image">
                    <div class="content-r" >
                        <a class="title">{{item.title}}</a>
                        <div v-html="item.filterContent">
                        </div>
                        <div class="bottom clearfix">
                            <span>
                                <i class="el-icon-location-information" style="color:#909399"></i>
                            {{item.cityName}}</span>
                            <time class="time" >{{ item.createTime }}</time>
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
                let filterStr =  ele.content.replace(/<\s?img[^>]*>/gi,'').replace(/[ ]|[\r\n]/gi,'')
                console.log(filterStr)
                Object.assign(ele, {['imgUrl']: imgUrl});  
                Object.assign(ele, {['filterStr']: filterStr});  
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
    position: relative;
    .title{
        font-size: 22px;
        color: #fd9e00;
        font-weight: bold;
    }
    .bottom{
        position: absolute;
        width: 300px;
        bottom: 20px;
        font-size: 16px;
        color: #818386;
        .el-icon-location-information{
            margin: 0 2px;
        }
        .time{
            margin: 0 8px;
        }
    }
}

</style>