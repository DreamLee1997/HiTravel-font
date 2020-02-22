<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-20 09:38:03
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-21 13:02:53
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
        作者：
        <span class="userName">{{userName}}</span>
        创建日期：
        <span class="createTime">{{strategyInfo.createTime}}</span>
        <i class="el-icon-location-outline"></i>
        <span class="cityName">{{strategyInfo.cityName}}</span>
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
        <div class="commentList">
          <div v-for="(item,index) in commentList" :key="index">
            <div>
              <svg-icon class="svg-icon" icon-class="userImg" />
              <span
                style="font-size:14px; padding: 0 10px 0px 10px; color: #fd9e00;"
              >{{item.username}}</span>
              <span style="font-size:12px;">{{item.createTime}}</span>
            </div>
            <div>
              <span class="content">{{item.content}}</span>
            </div>
          </div>
        </div>
        <div class="commentItem">
          <svg-icon class="svg-icon" icon-class="userImg" />
          <el-input
            v-model="commentInfo"
            class="comment-input"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          ></el-input>
          <el-button @click="handleComment" type="primary">发表评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryArticleById,
  praiseArticleById,
  collectArticleById,
  commitArticleById,
  queryCommentList
} from "@/api/strategy";
import { mapGetters } from "vuex";

export default {
  name: "wirteStrategy",
  data() {
    return {
      strategyId: "",
      strategyInfo: {
        content: ""
      },
      commentList: [],
      commentInfo: "",
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
    self.getCommentList();
  },
  methods: {
    //点赞
    handlePraise() {
      let self = this;
      praiseArticleById(self.strategyId).then(res => {
        self.strategyInfo.praise = res.data.replace(/[^0-9]/gi, "");
        this.$message({
          message: "点赞成功",
          type: "success",
          duration: 1000
        });
      });
    },
    //收藏
    handleCollect() {
      let self = this;
      collectArticleById(self.strategyId).then(res => {
        this.$message({
          message: "收藏成功",
          type: "success",
          duration: 1000
        });
      });
    },
    //评论
    handleComment() {
      let self = this;
      commitArticleById(self.strategyId, self.commentInfo).then(res => {
        this.$message({
          message: "评论成功",
          type: "success",
          duration: 1000
        });
        self.commentInfo = "";
      });
    },
    //获取评论列表
    getCommentList() {
      let self = this;
      queryCommentList(self.strategyId, 1, 10).then(res => {
        self.commentList = res.data.records;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@charset "utf-8";
.srategy-container {
  padding: 0 45px;
  height: 100%;
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
  .comment {
    .commentList {
      .svg-icon {
        width: 20px;
        height: 30px;
        margin-right: 10px;
        padding-top: 10px;
      }
      .content{
        padding: 20px 0 10px 40px;
        font-size: 16px;
        border-bottom: 1px dashed #eae4e4;
      }
    }
    .commentItem {
      display: inline-flex;
      width: 100%;
      .svg-icon {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        margin-top: 2px;
      }
    }
    .comment-input {
    }
  }
  .content /deep/ img {
    width: 600px;
    height: 500px;
  }
}
</style>
