<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 11:13:51
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-19 17:28:58
 -->
<template>
  <div class="myStrategy">
        <el-row>
            <el-col :span="12" v-for="(o, index) in 2" :key="index" >
                <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 14px;">
                    <span>好吃的汉堡</span>
                    <div class="bottom clearfix">
                    <!-- <time class="time">{{ currentDate }}</time> -->
                    <el-button type="text" class="button">操作按钮</el-button>
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
        console.log(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>