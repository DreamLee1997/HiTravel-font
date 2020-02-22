<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 11:13:51
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-19 17:22:38
 -->
<template>
  <div class="myStrategy">我的攻略</div>
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
        queryInfo.status,
        queryInfo.pageNo,
        queryInfo.pageSize
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