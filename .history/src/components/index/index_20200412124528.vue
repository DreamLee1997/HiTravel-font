<template>
  <div>
    <div class="banner clearfix">
      <ul>
        <li>
          <a >
            <img :src="swpierBignum" alt />
          </a>
          <div class="li-in">
            <a >
              <p><span>9</span>/Apr.2020</p>
              <p>旅行记——带着相机和胶片来游山玩水</p>
            </a>
          </div>
        </li>
      </ul>
      <ol id="img-list">
        <li :class="{'now': isActive[0]}">
          <img src="./../../assets/img/swpier3.jpeg" alt @click="swpierImg(0)" />
        </li>
        <li :class="{'now': isActive[1]}">
          <img src="./../../assets/img/swpier2.jpeg" alt @click="swpierImg(1)" />
        </li>
        <li :class="{'now': isActive[2]}">
          <img src="./../../assets/img/swpier1.jpeg" alt @click="swpierImg(2)" />
        </li>
        <li :class="{'now': isActive[3]}">
          <img src="./../../assets/img/swpier4.jpeg" alt @click="swpierImg(3)" />
        </li>
        <li :class="{'now': isActive[4]}">
          <img src="./../../assets/img/swpier5.jpeg" alt @click="swpierImg(4)" />
        </li>
      </ol>
      <!-- 搜索 -->
      <div class="choose">
        <!-- <el-radio-group v-model="typeRadio" fill="#f69d22"> -->
          <!-- <el-radio :label="1">全部</el-radio> -->
          <!-- <el-radio :label="3">去旅行</el-radio>
          <el-radio :label="6">目的地</el-radio>
          <el-radio :label="9">酒店</el-radio> -->
        <!-- </el-radio-group> -->
        <div class="sousuo">
          <!-- <el-cascader 
              v-if="typeRadio == 9"
              ref="cascaderAddr" 
              :props="props" 
              v-model="cascaderValue" 
              placeholder="选择酒店所在地区"
              style="width:40%">
          </el-cascader> -->
          <!-- <el-input v-if="typeRadio == 9" v-model="searchContent.hotelName" placeholder="酒店名称" style="width:40%"></el-input> -->
          <el-input placeholder="关键字搜索攻略" :v-model="searchContent.other"></el-input>
          <el-button icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
    <div class="main">
      <div class="main-in">
        <div class="main-top">
          <div class="main-in-left">
            <div class="haihang">
              <img src="@/assets/img/wKgBs1dOvWKAFLsGAACZ1ruM84086.jpeg" alt />
            </div>
            <div class="lxjzl">
              <div class="lxjzl-shang">
                <h3><a >旅行家专栏</a></h3>
                <span><a >专栏首页</a></span>
              </div>
              <div class="lxjzl-zhong">
                <img src="@/assets/img/home-left1.jpeg" alt />
              </div>
              <div class="lxjzl-xia">
                <h4><a >芽庄与顺滑隔了多远</a></h4>
                <p>在旅途中，最艰难的莫过于学会告别。因为真的可能，字面上的一眼万年。</p>
              </div>
            </div>
            <div class="lygltj">
              <div class="lygltj-shang">
                <h3><a >旅游攻略推荐</a></h3>
                <span><a >更多</a></span>
              </div>
              <div class="lygltj-zhong">
                <div class="bldt">
                  <a ><img src="@/assets/img/wKgBs1dhWoiANjLdAARzAy6P5ok22.jpeg" width="110" alt /></a>
                </div>
                <div class="bldw">
                  <h4><a >北领地</a></h4>
                  <p>详细的吃，住，行，景点，路线，使用信息。</p>
                </div>
              </div>
              <div class="lygltj-xia">
                <ul>
                  <li>
                    <a >夜雨</a> 点评了 外伶仃岛的
                    <a >伶仃峰</a>
                  </li>
                  <li>
                    <a >LORI</a> 点评了 昌平的
                    <a >北京后花园旅</a>
                  </li>
                  <li>
                    <a >34744558</a> 点评了 宏村的
                    <a >弘茗轩茶行</a>
                  </li>
                  <li>
                    <a >米粥</a> 点评了 青城山的
                    <a >青城山前山</a>
                  </li>
                  <li>
                    <a >dandan52</a> 点评了 深圳的
                    <a >小梅沙</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="shanghai">
              <a >
                <img src="@/assets/img/wKgBs1dWbECAB47zAAFJICE7nN005.jpeg" alt />
              </a>
            </div>
          </div>
          <div class="main-in-right">
            <div class="sanya">
              <img src="@/assets/img/wKgBs1dicXWAJbbuAAF1AeBFGLo22.jpeg" alt />
            </div>
            <div class="yiyuan">
              <div class="yiyuan-shang">
                <h3>意愿自由行</h3>
                <span>厦门<i></i><em>14%</em></span>
              </div>
              <div style="clear:both"></div>
              <div class="yiyuan-xia">
                <div class="yiyuan-xia-zuo">
                  <div id="box">
                    <div class="box-in">
                      <div id="boxin">
                        <div id="left">
                          <ul>
                            <li><span>Hi Travel用户</span>1分钟前 购买了一元自由行</li>
                            <li><span>Hi Travl用户</span>1分钟前 购买了一元自由行</li>
                          </ul>
                        </div>
                        <div id="right"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="yiyuan-xia-you">
                  <h3>往返厦门三或四天双人自由行</h3>
                  <span>(首次参与赠450元代金券)</span>
                  <div style="clear:both"></div>
                  <div class="qian">
                    <div class="qian-zuo">
                      <span>
                        <span></span>
                        <span>目标：</span>
                        <span>¥</span>
                        <span><strong>5000</strong></span>
                      </span>
                    </div>
                    <div class="qian-you">
                      <a><span>一元试试</span></a>
                    </div>
                  </div>
                  <div style="clear:both"></div>
                  <div class="jdt">
                    <div class="jdt-shang">
                      <span>已支持<em>¥692</em></span>
                      <span>完成进度<em>14%</em></span>
                    </div>
                    <div class="jdt-xia">
                      <div class="jdt-xia-in"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="clear:both;"></div>
            <div class="xieyouji">
              <div class="xieyouji-top">
                <div class="nav-youji">
                  <ul>
                    <li><span></span><a >姑娘漂亮</a></li>
                    <li><a >带娃去耍</a></li>
                    <li><a >毕业旅行</a></li>
                  </ul>
                </div>
                <div class="wen">
                  <span></span><a >我要上首页</a>
                </div>
                <div class="xie">
                  <el-button
                    style="width:140px;"
                    type="primary"
                    icon="el-icon-edit-outline"
                    @click="toWriteStrategy"
                  >写游记</el-button>
                </div>
              </div>
              <div class="xieyouji-main">
                <span style="font-size: 22px;
                            color: rgb(51, 51, 51);
                            display: inline-block;
                            margin: 15px 0 0 5px;
                            line-height: 0.8;">热门攻略推荐</span>
                <article-date :ramdom="Math.random()"></article-date>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/strategy'
import { queryProvince, queryCity } from "@/api/area";
// import articleList from '../../components/table-containter/articleList'
import articleList from '@/components/table-containter/articleList'

export default {
  data() {
    return {
      cascaderValue:[],
      slideImg: [
        "swpierBig3",
        "swpierBig2",
        "swpierBig1",
        "swpierBig4",
        "swpierBig5"
      ],
      swpiernum: 0,
      swpierBignum: require("./../../assets/img/swpierBig3.jpeg"),
      isActive: [1, 0, 0, 0, 0],
      timer: "",
      searchContent: {},
      typeRadio: 1,
      flag: false,
      notFirst: false,
       props: {
          lazy: true,
          lazyLoad(node, resolve) {
              const { level } = node;
              if (level === 0) {
                  queryProvince(1, 1000).then(response => {
                      let list = response.data.records;
                      const nodes = list.map(x => ({
                          value: x.provinceCode,
                          label: x.shortName,
                          leaf: level >= 1
                      }));
                      resolve(nodes);
                  });
              } else if (level === 1) {
                  queryCity(node.data.value, 1, 1000).then(response => {
                      let list = response.data.records;
                      const nodes = list.map(x => ({
                          value: x.cityCode,
                          label: x.shortName,
                          leaf: level >= 1
                      }));
                      resolve(nodes);
                  });
              }
          }
       }
    };
  },
  components:{
        'article-date':articleList
    },
  mounted() {
    this.beginInterval();
    //监听滚动条，开启或关闭定时器
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    toWriteStrategy() {
      let self = this;
      //打开新的标签页
      let routeUrl = this.$router.resolve({
          path: "/writeStrategy",
          // query: {id: row.articleId}
      });
      window.open(routeUrl.href, '_blank');
      // this.$router.push({ path: "/writeStrategy" });
    },
    //处理定时器
    handleScroll(e) {
      let self = this;
      this.$nextTick(() => {
        var top =
          document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset;
        if (top >= 700) {
          clearInterval(self.timer);
          self.notFirst = true;
          self.flag = false;
          self.timer = null;
        } else if (top <= 35 && self.notFirst) {
          if (!self.flag) {
            self.beginInterval();
            self.flag = true;
          }
        }
      });
    },
    //开起轮播图定时器
    beginInterval() {
      let self = this;
      this.timer = setInterval(self.autoplay, 3000);
    },
    //自动播放轮播图
    autoplay() {
      if (this.swpiernum > 4) {
        this.swpiernum = 0;
      }
      this.swpierImg(this.swpiernum);
      this.swpiernum++;
    },
    //轮播图切换
    swpierImg(num) {
      this.swpiernum = num;
      switch (num) {
        case 1:
          this.isActive = [0, 1, 0, 0, 0];
          break;
        case 2:
          this.isActive = [0, 0, 1, 0, 0];
          break;
        case 3:
          this.isActive = [0, 0, 0, 1, 0];
          break;
        case 4:
          this.isActive = [0, 0, 0, 0, 1];
          break;
        default:
          this.isActive = [1, 0, 0, 0, 0];
          break;
      }
      //vue 设置动态src，要用require()函数
      this.swpierBignum = require("./../../assets/img/" +
        this.slideImg[num] +
        ".jpeg");
    },
    handleSearch() {}
  },
  destroyed() {
    //清除定时器
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*banner*/
.banner {
  height: 500px;
  position: relative;
}
.banner ul {
  height: 500px;
  overflow: hidden;
}
.banner ul li {
  height: 500px;
  overflow: hidden;
  position: relative;
}
.banner ul li img {
  width: 100%;
}
.li-in {
  width: 600px;
  height: 86px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -500px;
  margin-top: 14px;
}
.li-in p {
  line-height: 36px;
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
}
.li-in span {
  font-size: 32px;
}
.banner ol {
  position: absolute;
  top: 39px;
  right: 50px;
}
.banner ol li {
  width: 108px;
  height: 67px;
  margin-bottom: 6px;
  cursor: pointer;
}
.banner ol li img {
  width: 100%;
  height: 100%;
}
.now {
  width: 108px;
  height: 67px;
  border: 1px solid #ff9d00;
  box-sizing: border-box;
}
/*search*/
.el-radio-group {
  padding: 5px 5px 10px 5px;
  .el-radio {
    padding: 0 5px;
    font-size: 13px;
    color: #ffffff;
    .el-radio__label {
      margin: 0 5px !important;
      padding: 0 5px !important;
      // font-size: 13px;
      background-color: #ffffff;
    }
  }
}
.choose {
  width: 632px;
  height: 89px;
  border-radius: 3px;
  background: #141416;
  opacity: 0.8;
  padding: 8px 15px 15px 15px;
  box-sizing: border-box;
  position: absolute;
  bottom: 44px;
  left: 50%;
  margin-left: -316px;
}
.sousuo {
  width: 602px;
  height: 46px;
  display: inline-block;
  .el-input {
    width: 80%;
  }
}
/*main*/
.main {
  margin-top: 20px;
}
.main-in {
  width: 1000px;
  margin: 0 auto;
}
/*left*/
.main-in-left {
  float: left;
  width: 260px;
}
.haihang {
  width: 260px;
  height: 260px;
}
.lxjzl {
  width: 260px;
  height: 321px;
}
.lxjzl-shang {
  height: 59px;
  line-height: 59px;
}
.lxjzl-shang h3 {
  float: left;
  font-size: 18px;
  color: #333333;
  font-weight: normal;
}
.lxjzl-shang h3 a:hover {
  color: #333333;
}
.lxjzl-shang span {
  float: right;
  font-size: 12px;
  color: #999999;
}
.lxjzl-shang span a {
  color: #999999;
}
.lxjzl-shang span a:hover {
  color: #999999;
  text-decoration: underline;
}

.lxjzl-xia {
  padding-top: 5px;
}
.lxjzl-xia h4 a {
  font-size: 16px;
  font-weight: normal;
  color: #333333;
  line-height: 36px;
}
.lxjzl-xia h4 a:hover {
  color: #333333;
  text-decoration: underline;
}
.lxjzl-xia p {
  line-height: 20px;
  font-size: 12px;
  color: #666666;
}
.lygltj {
  width: 260px;
  height: 368px;
}
.lygltj-shang {
  width: 260px;
  height: 61px;
}
.lygltj-shang h3 {
  float: left;
  font-size: 18px;
  font-weight: normal;
  color: #333333;
  line-height: 61px;
}
.lygltj-shang h3 a:hover {
  color: #333333;
}
.lygltj-shang span {
  float: right;
  font-size: 12px;
  color: #999999;
  line-height: 61px;
}
.lygltj-shang span a {
  color: #999999;
}
.lygltj-shang span a:hover {
  color: #999999;
  text-decoration: underline;
}
.lygltj-zhong {
  width: 260px;
  height: 167px;
}
.bldt {
  float: left;
}
.bldw {
  float: right;
  width: 129px;
}
.bldw h4 a {
  font-size: 24px;
  color: #333333;
  font-weight: normal;
  line-height: 47px;
}
.bldw h4 a:hover {
  color: #333333;
  text-decoration: underline;
}
.bldw p {
  font-size: 12px;
  font-weight: normal;
  color: #333333;
  line-height: 20px;
}
.lygltj-xia {
  width: 260px;
  height: 140px;
  line-height: 28px;
  font-size: 14px;
}
.lygltj-xia li a {
  color: #ff9d00;
}
.lygltj-xia li a:hover {
  text-decoration: underline;
}
.shanghai {
  margin-top: 30px;
}
/*right*/
.main-in-right {
  float: right;
}
.sanya {
  width: 700px;
  height: 120px;
}
.yiyuan {
  width: 700px;
  height: 235px;
}
.yiyuan-shang {
  height: 54px;
  line-height: 54px;
}
.yiyuan-shang h3 {
  float: left;
  font-size: 18px;
  color: #333333;
  font-weight: normal;
}
.yiyuan-shang span {
  float: right;
  font-size: 18px;
  color: #333333;
  font-weight: normal;
  position: relative;
}
.yiyuan-shang span em {
  font-size: 12px;
}
.yiyuan-shang span i {
  width: 0;
  height: 0;
  border-width: 3px;
  border-color: red transparent transparent transparent;
  border-style: solid dashed dashed dashed;
  overflow: hidden;
  position: absolute;
  top: 39px;
  left: 19px;
}
.yiyuan-xia {
  width: 700px;
  height: 180px;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  position: relative;
}
.yiyuan-xia-zuo {
  width: 280px;
  height: 180px;
  background: url(../../assets/img/wKgBs1cxrsiADAFmAO6rVbNx40s17.jpeg);
  background-size: 100% auto;
  position: relative;
  overflow: hidden;
  float: left;
}
.yiyuan-xia-zuo #box {
  width: 280px;
  height: 180px;
  overflow: hidden;
  position: absolute;
  bottom: -134px;
}
.yiyuan-xia-zuo #box .box-in {
  background-color: rgba(0, 0, 0, 0.3);
}
.yiyuan-xia-zuo #box .box-in #boxin {
  height: 500%;
}
.yiyuan-xia-zuo #box .box-in #boxin ul {
  color: #000;
  font-size: 12px;
  color: #fff;
}
.yiyuan-xia-zuo #box .box-in #boxin ul li {
  width: 90%;
  height: 32px;
  line-height: 32px;
  border-top: 1px solid rgba(225, 225, 225, 0.5);
  margin: 0 auto;
}
.yiyuan-xia-you {
  float: right;
  width: 353px;
  height: 178px;
  padding-top: 23px;
  padding-right: 31px;
  box-sizing: border-box;
  text-align: right;
}
.yiyuan-xia-you h3 {
  line-height: 22px;
}
.yiyuan-xia-you span {
  line-height: 41px;
}
.qian {
  float: right;
  width: 276px;
  height: 38px;
  border: 1px solid #fa635a;
  box-sizing: border-box;
  border-radius: 3px;
}
.qian-zuo {
  float: left;
  width: 137px;
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.qian-zuo span {
  height: 36px;
  line-height: 36px;
  display: inline-block;
}
.qian-zuo span span:nth-of-type(1) {
  width: 18px;
  height: 18px;
  display: inline-block;
  background: url(../../assets/img/onebuy2.png) no-repeat 0px -180px;
  vertical-align: bottom;
  margin-bottom: 8px;
  margin-right: 5px;
}
.qian-zuo span span:nth-of-type(2) {
  font-size: 12px;
  color: #909090;
}
.qian-zuo span span:nth-of-type(3) {
  font-size: 12px;
  color: #fa635a;
}
.qian-zuo span span:nth-of-type(4) {
  font-size: 18px;
  color: #fa635a;
  vertical-align: top;
}
.qian-you {
  float: right;
  width: 134px;
  height: 36px;
  background-color: #fa635a;
  text-align: center;
}
.qian-you a {
  width: 134px;
  height: 36px;
  display: block;
}
.qian-you a span {
  font-size: 18px;
  color: #fff;
}
.jdt {
  width: 353px;
  height: 45px;
  margin-top: 9px;
}
.jdt-shang {
  width: 353px;
  height: 29px;
  line-height: 29px;
}
.jdt-shang span:nth-of-type(1) {
  float: left;
  font-size: 14px;
  color: #666666;
}
.jdt-shang span:nth-of-type(2) {
  float: right;
  font-size: 14px;
  color: #666666;
}
.jdt-shang span em {
  color: #ff6155;
  margin-left: 3px;
}
.jdt-xia {
  width: 353px;
  height: 6px;
  border-radius: 3px;
  background-color: #e9e9e9;
}
.jdt-xia-in {
  width: 49px;
  height: 6px;
  border-radius: 3px 0 0 3px;
  background-color: #ff6155;
}
.xieyouji {
  width: 700px;
}
.xieyouji-top {
  width: 700px;
  height: 85px;
  line-height: 85px;
}
.nav-youji {
  float: left;
  height: 85px;
}
.nav-youji ul li {
  float: left;
}
.nav-youji ul li a {
  padding-right: 28px;
  font-size: 16px;
  color: #333333;
}
.nav-youji ul li a:hover {
  color: #333333;
  text-decoration: underline;
}
.nav-youji ul li:nth-of-type(1) a {
  float: right;
  margin-left: 5px;
}
.nav-youji ul li span {
  float: left;
  width: 49px;
  height: 38px;
  display: block;
  background: url(../../assets/img/index-sprites5.png) no-repeat 0px -90px;
  margin-top: 21px;
}
.wen {
  float: left;
}
.wen a {
  float: right;
  color: #ff9d00;
  margin-left: 4px;
}
.wen a:hover {
  text-decoration: underline;
}
.wen span {
  float: left;
  width: 16px;
  height: 16px;
  display: block;
  background: url(../../assets/img/index-sprites5.png) no-repeat -100px -30px;
  margin-top: 34px;
}
.xie {
  float: right;
  width: 140px;
  height: 36px;
  line-height: 36px;
  background: #ff9d00;
  border: none;
  border-radius: 3px;
  margin-top: 22px;
  text-align: center;
}
.xie a {
  width: 140px;
  height: 36px;
  display: block;
}
.xieyouji-main {
  width: 700px;
}
.wenzhang {
  width: 455px;
  height: 101px;
}
.el-table td div .table-title {
  width: 420px;
  height: 26px;
  display: block;
  font-size: 20px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hudong {
  width: 455px;
  height: 33px;
  line-height: 33px;
  margin-top: 16px;
}
.zuobiao,
.ren {
  float: left;
  color: #666666;
}
.zuobiao i,
.yan i,
.ding {
  display: inline-block;
  background: url(../../assets/img/index-sprites5.png) no-repeat;
}
.zuobiao i {
  width: 14px;
  height: 16px;
  background-position: 0px -50px;
  margin-right: 6px;
  vertical-align: -5px;
}
.zuobiao a {
  color: #666666;
}
.zuobiao a:hover {
  color: #666666;
  text-decoration: underline;
}
.ren i {
  width: 14px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
  background: url(../../assets/img/wKgBs1da3BCANUSxAAH6xXIZODw12.jpeg) no-repeat;
  margin: 0 5px 0 8px;
  vertical-align: -5px;
}
.ren span a {
  color: #ff9d00;
  margin-right: 13px;
}
.ren span a:hover {
  text-decoration: underline;
}
.yan {
  float: left;
  color: #999999;
  margin-right: 14px;
}
.yan i {
  width: 18px;
  height: 14px;
  background-position: -30px -50px;
  margin: 0 5px 0 8px;
  vertical-align: -5px;
}
</style>
