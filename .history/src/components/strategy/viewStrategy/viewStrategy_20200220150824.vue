<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-20 09:38:03
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-20 15:08:01
 -->
<template>
  <div class="srategy-container">
    <div style="margin: 20px 160px 0 160px;">
      <div class="city">
        <span style="color: #f39901;">旅游攻略 ></span>
        <span style="color: #999;">{{strategyInfo.cityName}}</span>
      </div>
      <div class="title">
        <h1>{{strategyInfo.title}}</h1>
      </div>
      <div class="clearfix"></div>
      <div class="two">
        作者：<span class="userName">{{userName}}</span>
        创建日期：<span class="createTime">{{strategyInfo.createTime}}</span>
        目的地：<span>{{strategyInfo.cityName}}</span>
      </div>
      <div class="content" v-html="strategyInfo.content"></div>
      <div class="bottom">
        <span class="bottom-span">
          <svg-icon class="svg-icon" icon-class="praise" @click.native="handlePraise" />
          {{strategyInfo.praise}}
        </span>
        <span class="bottom-span">
          <svg-icon class="svg-icon" icon-class="collection" @click.native="handleCollect" />
          {{strategyInfo.collection}}
        </span>
        <span class="bottom-span">
          <svg-icon class="svg-icon" icon-class="view" />
          {{strategyInfo.view}}
        </span>
      </div>
      <div class="comment">
        <div>评论列表</div>
        <el-input></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { queryArticleById, praiseArticleById, collectArticleById  } from "@/api/strategy";
import { mapGetters } from "vuex";

export default {
  name: "wirteStrategy",
  data() {
    return {
      strategyId: "",
      strategyInfo: {
        content: ""
      },
      cityCode: [],
      userName: ""
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  mounted() {
    let self = this;
    self.$nextTick(function() {
      self.userName = self.name;
    });
    self.strategyId = self.$route.query.id;
    queryArticleById(self.strategyId).then(res => {
      self.strategyInfo = res.data;
    });
  },
  methods: {
    handlePraise() {
        let self = this;
        praiseArticleById(self.strategyId).then(res => {
            self.strategyInfo.praise = res.data.replace(/[^0-9]/ig,"");
            this.$message({
                message: '点赞成功',
                type: 'success',
                duration: 1000
            });
        });
    },
    handleCollect() {
        let self = this;
        collectArticleById(self.strategyId).then(res => {
            this.$message({
                message: '收藏成功',
                type: 'success',
                duration: 1000
            });
        });
    },
    handleView() {

    }
  }
};
</script>

<style lang="scss" scoped>
@charset "utf-8";
.srategy-container {
  padding: 0 45px;
  .title {
    float: left;
    width: 580px;
    padding-top: 15px;
    line-height: 35px;
    overflow: hidden;
    font-size: 24px;
    color: #a6551f;
    font-weight: normal;
  }
  .two {
    border-bottom: 1px solid #f3f3f3;
    background-color: white;
    width: 600px;
    color: #777675;
    padding: 10px 0 34px 3px;
    .userName {
        font-size: 14px;
        color: #fd9e00;
        padding-right: 15px;
    }
    .createTime {
        font-size: 11px;
        padding-right: 15px;
    }
  }
  .content {
    padding: 10px 5px;
    width: 600px;
  }
  .bottom {
    margin: 20px 0;
    .bottom-span {
      font-size: 16px;
      padding-right: 15px;
      .svg-icon {
        cursor: pointer;
        width: 25px;
        height: 27px;
        padding-top: 5px;
        padding-right: 3px;
      }
    }
  }
}
</style>
