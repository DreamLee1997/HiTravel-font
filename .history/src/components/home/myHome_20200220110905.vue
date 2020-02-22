<template>
  <div class="app-wapper">
    <el-row>
      <el-col>
        <div class="userInfo">
          <el-card :body-style="{ padding: '0px',}">
            <img src="@/assets/img/wKgB4lNnkPCAX0-3AAI_PDTg8TQ20.jpeg" class="image" />
          </el-card>
          <p class="userName">{{userName}}</p>
        </div>
        <el-menu
          :default-active="defaultIndex"
          class="el-menu"
          background-color="#fbfbfb"
          text-color="#000000"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="a" @click="goTo('/writeStrategy')">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">写攻略</span>
          </el-menu-item>
          <el-menu-item index="b" @click="goTo('/myHome/myStrategy')">
            <i class="el-icon-document"></i>
            <span slot="title">我的攻略</span>
          </el-menu-item>
          <el-menu-item index="c" @click="goTo('/myHome/myFavorites')">
            <i class="el-icon-discount"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="d" @click="goTo('/myHome/myFavorites')">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="e" @click="goTo('/myHome/myFavorites')">
            <i class="el-icon-setting"></i>
            <span slot="title">修改信息</span>
          </el-menu-item>
          <el-menu-item index="f" @click="goTo('/myHome/myFavorites')">
            <i class="el-icon-switch-button"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <div v-if="!writeType" class="main-container">
      <router-view></router-view>
    </div>
    <div v-if="writeType" class="main-container">
      <el-col :span="12">
        <el-card class="card-1" :body-style="{ padding: '0px'}" @click.native="toWriteStrategy(1)">
          <span>经典攻略</span>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card-2" :body-style="{ padding: '0px'}" @click.native="toWriteStrategy(2)">
            <span>新版攻略</span>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      defaultOpends: ["1", "2"],
      userName: "",
      defaultIndex: "",
      writeType: false
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.userName = this.name;
      this.defaultIndex = type;
    });
    let type = this.$route.query.type;
    switch (type) {
      case "a":
        this.writeType = true;
        this.$router.push({ path: "/myHome" });
        break;
      case "b":
        this.$router.push({ path: "/myHome/myStrategy" });
        break;
      case "c":
        this.$router.push({ path: "/myHome/myFavorites" });
        break;
      case "d":
        this.$router.push({ path: "/myHome/myFavorites" });
        break;
      case "e":
        this.$router.push({ path: "/login" });
        break;
      case "f":
        this.$router.push({ path: "/login" });
        break;
      default:
        console.log("Sorry, we are out of " + type + ".");
    }
  },
  methods: {
    goTo(toPath) {
      if (toPath == "/writeStrategy") {
        this.writeType = true;
        this.$router.push({ path: "/myHome" });
      } else {
        this.writeType = false;
        this.$router.push({ path: toPath });
      }
    },
    toWriteStrategy(type) {
        if(type === 1){
            this.$router.push({ path: "/writeStrategy" });
        }else{
            alert('待开发...')
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-wapper {
  position: relative;
  height: 100%;
  width: 100%;
  .el-row {
    height: 100%;
    background-color: #fbfbfb !important;
    position: fixed;
    border-right: 1px solid #e6e6e6;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    .el-menu {
      width: 200px;
      border-right: solid 0px #e6e6e6 !important;
    }
    .el-menu-item {
      padding-left: 30px !important;
    }
    .el-menu-item.is-active {
      background-color: #fd9e00 !important;
      color: #fbfbfb !important;
    }
    .userInfo {
      width: 200px;
      height: 175px;
      text-align: center;
      font-size: 18px;
      padding-top: 5px;
      background-color: #fbfbfb !important;
      .el-card {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        margin-top: 5px;
        margin-left: -60px;
        border-radius: 60px;
        border: 2px solid #f5f7fa;
        .image {
          width: 120px;
          height: 120px;
        }
      }
      .el-card.is-always-shadow {
        -webkit-box-shadow: 0 2px 12px 0 rgba(82, 81, 81, 0.4);
        box-shadow: 0 2px 12px 0 rgba(82, 81, 81, 0.4);
      }
    }
    .userName {
      width: 200px;
      height: 33px;
      padding: 140px 0 5px 0px;
    }
  }
  .main-container {
    padding: 10px 20px;
    .el-col-12 {
      width: 400px;
      margin: 150px 0px 150px 80px;
    }
    .card-1 {
      background-color: #c8e6e5;
      color: #507675;
      cursor:pointer;
    }
    .card-2 {
      background-color: #fac662;
      color: #a1601b;
      cursor:pointer;
    }
    .el-card.is-always-shadow {
      width: 400px;
      height: 200px;
      display: flex;
      font-size: 42px;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
