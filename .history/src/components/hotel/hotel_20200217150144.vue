<template>
  <div class="hotel">
    <div class="main">
        <div class="main-in">
            <div class="main-in-top">
                <h4>订酒店</h4>
                <div class="sousuo">
                    <el-input v-model="queryInfo.destination" placeholder="出行目的地"></el-input>
                    <el-date-picker
                        v-model="queryInfo.duringTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="入住日期"
                        end-placeholder="离店日期">
                    </el-date-picker>
                    <el-button 
                        icon="el-icon-search" 
                        @click="handleSearch"
                        type="primary" 
                        size="mini"></el-button>
                </div>
            </div>
            <div class="main-in-bottom">
                <div class="zhuti">
                    <h4>主题酒店</h4>
                    <div class="youtu">
                        <ul >
                            <li v-for="index in 6" :key="index"> 
                                <div class="nali" >
                                    <span>奥兰多{{index}}</span>
                                    <span>新西兰</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="zhuti">
                    <h4>特价酒店</h4>
                    <div class="x-nav">
                        <ul>
                            <li class="current"><a href="">曼谷</a></li>
                            <li><a href="">台北</a></li>
                            <li><a href="">东京</a></li>
                            <li><a href="">香港</a></li>
                            <li><a href="">首尔</a></li>
                            <li><a href="">新加坡</a></li>
                        </ul>
                    </div>
                    <div style="clear:both;"></div>
                    <div class="youtu">
                        <ul >
                            <li v-for="index in 6" :key="index"> 
                                <div class="nali" >
                                    <span>奥兰多{{index}}</span>
                                    <span>新西兰</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        queryInfo:{},
    }
  },
  methods:{

      //搜索目的地酒店
      handleSearch(){

      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hotel{
    .main {
        margin-top:20px;
        .main-in {
            width:1000px;
            margin:0 auto;
            .main-in-top h4 {
                width:1000px;
                height:110px;
                font-size:24px;
                line-height:110px;
            }
        }
    }
}

.sousuo {
    width:1000px;
    height:50px;
    display: inline-block;
    .el-input{
        margin-right: 12px;
        width: 400px !important;
    }
    .el-input__inner{
        height: 48px !important;
        font-size: 16px;
    }
    .el-range-editor.el-input__inner{
        width: 400px !important;
        margin-right: 12px;
    }
    .el-button--mini{
        font-size: 20px;
        .el-icon-search{
            font-weight: bolder !important;
            // font-size: 20px;
        }
    }
}
//主题酒店
.zhuti {
    width:1000px;
    text-align:center;
}
.zhuti h4 {
    height:80px;
    font-size:24px;
    line-height:80px;
}
.x-nav ul {
    width:1000px;
    height:53px;
    border-bottom:1px solid #e4e4e4;
    box-sizing:border-box;
}
.x-nav ul li {
    float:left;
    width:166px;
    height:51px;
    line-height:51px;
}
.x-nav ul li a {
    color:#666;
    font-size:18px;
}
.current {
    border-bottom:3px solid #ff8a00;
}
.x-nav ul .current a {
    color:#ff8a00;
}
.youtu {
    height:503px;
    overflow:hidden;
}
.youtu ul li {
    float:left;
    width:318px;
    height:240px;
    background:url(../../assets/img/wKgBs1dL9IuAGK6JAANBrENLW2052.jpeg) no-repeat;
    background-size:100% 100%;
    float:left;
    margin-top:19px;
}
// .youtu ul:nth-of-type(2) li {
//     background:url(../../assets/img/yiyiyi.jpeg) no-repeat;
//     background-size:100% 100%;
// }
// .youtu ul:nth-of-type(3) li {
//     background:url(../../assets/img/wKgBs1dL9IuAV8rXAFrJyv-1p4c46.jpeg) no-repeat;
//     background-size:100% 100%;
// }
// .youtu ul:nth-of-type(4) li {
//     background:url(../../assets/img/wKgBs1dL-H6AOmv4AAIvGmxUHPw48.jpeg) no-repeat;
//     background-size:100% 100%;
// }
// .youtu ul:nth-of-type(5) li {
//     background:url(../../assets/img/wKgBs1dL-H6AdJU1AAT5Wd6Lvds54.jpeg) no-repeat;
//     background-size:100% 100%;
// }
// .youtu ul:nth-of-type(6) li {
//     background:url(../../assets/img/wKgBs1dL9MGAW6v3ABiEmHUWRLU33.jpeg) no-repeat;
//     background-size:100% 100%;
// }
// .youtu ul li:nth-of-type(2),.youtu ul li:nth-of-type(3),.youtu ul li:nth-of-type(5),.youtu ul li:nth-of-type(6) {
//     margin-left:23px;
// }
.nali {
    width:318px;
    height:240px;
    background:rgba(0,0,0,0.3);
    font-size:24px;
    color:#fff;
    font-family:å¾®è½¯é›…é»‘;
    padding-top:100px;
    text-align:center;
    box-sizing:border-box;
}
.nali span:nth-of-type(1) {
    display:block;
}
.nali span:nth-of-type(2) {
    display:block;
    font-size:14px;
}
.zhuti:nth-of-type(2) {
    margin-top:50px;
}
</style>
