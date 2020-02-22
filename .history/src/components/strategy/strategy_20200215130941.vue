<template>
     <div>
          <div class="main">
               <div class="main-in">
                    <div class="main-in-top clearfix">
                         <div class="main-in-top-l">
                              <div class="nav-xuan">
                                   <div class="xuan">
                                        <ul>
                                             <li><a >热门旅游攻略排行榜<span></span></a></li>
                                             <li><a >初夏目的地精选<span></span></a></li>
                                             <li><a >热门旅游地推荐<span></span></a></li>
                                             <li><a >漫游桃花源<span></span></a></li>
                                             <li><a >奔向海岛<span></span></a></li>
                                             <li><a >主题推荐<span></span></a></li>
                                        </ul>
                                   </div>
                              </div>
                              <div class="sou clearfix">
                                   <input type="text" placeholder="请输入你想去的地方，例如厦门" />
                                   <span></span>
                              </div>
                         </div>
                         <div class="main-in-top-r">
                             <el-carousel trigger="click" height="340px" width="701px">
                                   <el-carousel-item v-for="(item, index) in carouselImg" :key="index">
                                        <img :src="item" alt="">
                                   </el-carousel-item>
                              </el-carousel>
                         </div>
                    </div>
                    <div class="main-in-buttom">
                         <div class="main-in-buttom-l">
                              <div class="daohang">
                                   <h4>旅游攻略导航</h4>
                              </div>
                              <div class="xzw">
                                   <ul>
                                        <div >热门城市攻略推荐</div>
                                        <li v-for="(item, index) in hotCity" :key="index">
                                             <span>{{index + 1}}</span><a >{{item}}</a>
                                        </li>
                                   </ul>
                              </div>
                         </div>
                         <div class="main-in-buttom-r">
                              <h4>推荐攻略</h4>
                              <ul class="tuijian-all">
                                   <li class="gonglue">
                                        <div class="gonglue-top">
                                        <div class="gonglue-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>自由行攻略</span></a>
                                        </div>
                                        <div class="gonglue-top-r">
                                             <a href=""><span>639</span>&nbsp;蜂蜂体验过<i></i></a>
                                        </div>
                                        </div>
                                        <div class="gonglue-neirong">
                                        <a href="">
                                        <h3><a href="">芽庄旅行不可不做的几件事！（附必游景点、住宿指南、行程推荐）</a></h3>
                                        <p>越南不止有河内和胡志明，还有绵长的海岸线，芽庄是一座可以让你停下脚步晒太阳的小城。芽庄的蓝天碧海与老街小巷形成了特殊的度假感受，你可以参加出海的一日游，感受大海与岛屿带来的乐趣，也可以走街串巷，参观沧桑的教堂和洁白的佛像。早起在路边吃一份法棍，中午去找一家小餐厅，或品味越南当地的美味，或尝试各国风情美食，傍晚来到沙滩，这时候越南女人们挑着新鲜的海鲜叫卖...</p>
                                        <div class="tupian">
                                             <ul class="chuntu">
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                             </ul>
                                             <div class="liulan">68248浏览</div>
                                        </div>
                                        <div style="clear:both;"></div>
                                        </a>
                                        </div>

                                   </li>
                                   <li class="mudi">
                                        <div class="mudi-top">
                                        <div class="mudi-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>目的地专家</span></a>
                                        </div>
                                        <div class="mudi-top-r">
                                             <a href=""><span>234</span>&nbsp;蜂蜂会选择这条路线</a>
                                        </div>
                                        </div>
                                        <div class="mudi-neirong">
                                        <h3><a href="">芽庄旅行不可不做的几件事！（附必游景点、住宿指南、行程推荐</a></h3>
                                        <div class="taw">
                                             <div class="chuntut">
                                                  <img src="../../assets/img/wKgBs1brgFWANGe7AACki8kJzIY140.png" alt="" />
                                             </div>
                                             <div class="znr">
                                                  <p>路线按景点热度及位置来安排，三天可以游玩最热的11处景点。花莲既可以让你感受无边风光，也可以在夜市小摊与朋友吃到流连忘返...<br />
                                                  大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫...
                                                  </p>
                                                  <div class="mudi-buttom">
                                                       <div class="mudi-buttom-l">最佳季节：11月-次年4月</div>
                                                       <div class="mudi-buttom-r">23646浏览，1评论</div>
                                                  </div>
                                             </div>
                                        </div>
                                        </div>
                                        <div style="clear:both;"></div>
                                   </li>
                                   <li class="huida">
                                        <div class="huida-top">
                                        <div class="huida-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>问答</span></a>
                                        </div>
                                        <div class="huida-top-r">
                                             <a href=""><span>639</span>&nbsp;蜂蜂体验过<i></i></a>
                                        </div>
                                        </div>
                                        <div class="huida-neirong">
                                        <h3><a href="">盘点美国那些【堪称经典】的自驾路线</a></h3>
                                        <div class="tawt">
                                             <div class="chuntus">
                                                  <img src="../../assets/img/wKgBs1dyYFCAD7M5AAEdcn65VmI85.jpeg" alt="" />
                                             </div>
                                             <div class="znrt">
                                                  <p>我几乎每年都会去一次美国，东西都待过，最喜欢的还是在洛杉矶，每次可以从洛杉矶租车一直往拉斯维加斯开，感觉美国最美最集中的国家公园都在西边，这一片。美国人把风景最美的地方分为几个大类：
                                                  1、风景最美的地方绝对划归国家公园，2、然后是national monument（可以翻译为国家级风景名胜），3、然后是州立公园。大家可以先看一个图，美国的国家公园、国家名胜区的分布：
                                                  </p>
                                                  <div class="huida-buttom">
                                                       <div class="huida-buttom-l">装备</div>
                                                       <div class="huida-buttom-z">使用指南</div>
                                                       <div class="huida-buttom-r">43616浏览，703回答</div>
                                                  </div>
                                             </div>
                                        </div>
                                        </div>
                                        <div style="clear:both;"></div>
                                   </li>
                                   <li class="guanfang">
                                        <div class="guanfang-top">
                                        <div class="guanfang-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>官方账号</span></a>
                                        </div>
                                        <div class="guanfang-top-r">
                                             <a href=""><span>458</span>&nbsp;蜂蜂喜欢<i></i></a>
                                        </div>
                                        </div>
                                        <div class="guanfang-neirong">
                                        <h3><a href="">2016下半年最佳旅行地大盘点</a></h3>
                                        <p>2016年转眼就过半，还没有出去玩的你，需要在剩下的16年里，用对的时间去对的地方！</p>
                                        <div class="tupiant">
                                             <ul class="chuntut">
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                             </ul>
                                             <div class="liulant">367248浏览</div>
                                        </div>
                                        </div>
                                   </li>
                                   <li class="gonglue">
                                        <div class="gonglue-top">
                                        <div class="gonglue-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>自由行攻略</span></a>
                                        </div>
                                        <div class="gonglue-top-r">
                                             <a href=""><span>639</span>&nbsp;蜂蜂体验过<i></i></a>
                                        </div>
                                        </div>
                                        <div class="gonglue-neirong">
                                        <a href="">
                                        <h3><a href="">芽庄旅行不可不做的几件事！（附必游景点、住宿指南、行程推荐）</a></h3>
                                        <p>越南不止有河内和胡志明，还有绵长的海岸线，芽庄是一座可以让你停下脚步晒太阳的小城。芽庄的蓝天碧海与老街小巷形成了特殊的度假感受，你可以参加出海的一日游，感受大海与岛屿带来的乐趣，也可以走街串巷，参观沧桑的教堂和洁白的佛像。早起在路边吃一份法棍，中午去找一家小餐厅，或品味越南当地的美味，或尝试各国风情美食，傍晚来到沙滩，这时候越南女人们挑着新鲜的海鲜叫卖...</p>
                                        <div class="tupian">
                                             <ul class="chuntu">
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                             </ul>
                                             <div class="liulan">68248浏览</div>
                                        </div>
                                        <div style="clear:both;"></div>
                                        </a>
                                        </div>

                                   </li>
                                   <li class="mudi">
                                        <div class="mudi-top">
                                        <div class="mudi-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>目的地专家</span></a>
                                        </div>
                                        <div class="mudi-top-r">
                                             <a href=""><span>234</span>&nbsp;蜂蜂会选择这条路线</a>
                                        </div>
                                        </div>
                                        <div class="mudi-neirong">
                                        <h3><a href="">芽庄旅行不可不做的几件事！（附必游景点、住宿指南、行程推荐</a></h3>
                                        <div class="taw">
                                             <div class="chuntut">
                                                  <img src="../../assets/img/wKgBs1brgFWANGe7AACki8kJzIY140.png" alt="" />
                                             </div>
                                             <div class="znr">
                                                  <p>路线按景点热度及位置来安排，三天可以游玩最热的11处景点。花莲既可以让你感受无边风光，也可以在夜市小摊与朋友吃到流连忘返...<br />
                                                  大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫...
                                                  </p>
                                                  <div class="mudi-buttom">
                                                       <div class="mudi-buttom-l">最佳季节：11月-次年4月</div>
                                                       <div class="mudi-buttom-r">23646浏览，1评论</div>
                                                  </div>
                                             </div>
                                        </div>
                                        </div>
                                        <div style="clear:both;"></div>
                                   </li>
                                   <li class="huida">
                                        <div class="huida-top">
                                        <div class="huida-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>问答</span></a>
                                        </div>
                                        <div class="huida-top-r">
                                             <a href=""><span>639</span>&nbsp;蜂蜂体验过<i></i></a>
                                        </div>
                                        </div>
                                        <div class="huida-neirong">
                                        <h3><a href="">盘点美国那些【堪称经典】的自驾路线</a></h3>
                                        <div class="tawt">
                                             <div class="chuntus">
                                                  <img src="../../assets/img/wKgBs1dyYFCAD7M5AAEdcn65VmI85.jpeg" alt="" />
                                             </div>
                                             <div class="znrt">
                                                  <p>我几乎每年都会去一次美国，东西都待过，最喜欢的还是在洛杉矶，每次可以从洛杉矶租车一直往拉斯维加斯开，感觉美国最美最集中的国家公园都在西边，这一片。美国人把风景最美的地方分为几个大类：
                                                  1、风景最美的地方绝对划归国家公园，2、然后是national monument（可以翻译为国家级风景名胜），3、然后是州立公园。大家可以先看一个图，美国的国家公园、国家名胜区的分布：
                                                  </p>
                                                  <div class="huida-buttom">
                                                       <div class="huida-buttom-l">装备</div>
                                                       <div class="huida-buttom-z">使用指南</div>
                                                       <div class="huida-buttom-r">43616浏览，703回答</div>
                                                  </div>
                                             </div>
                                        </div>
                                        </div>
                                        <div style="clear:both;"></div>
                                   </li>
                                   <li class="guanfang">
                                        <div class="guanfang-top">
                                        <div class="guanfang-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>官方账号</span></a>
                                        </div>
                                        <div class="guanfang-top-r">
                                             <a href=""><span>458</span>&nbsp;蜂蜂喜欢<i></i></a>
                                        </div>
                                        </div>
                                        <div class="guanfang-neirong">
                                        <h3><a href="">2016下半年最佳旅行地大盘点</a></h3>
                                        <p>2016年转眼就过半，还没有出去玩的你，需要在剩下的16年里，用对的时间去对的地方！</p>
                                        <div class="tupiant">
                                             <ul class="chuntut">
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                             </ul>
                                             <div class="liulant">367248浏览</div>
                                        </div>
                                        </div>
                                   </li>
                                   <li class="gonglue">
                                        <div class="gonglue-top">
                                        <div class="gonglue-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>自由行攻略</span></a>
                                        </div>
                                        <div class="gonglue-top-r">
                                             <a href=""><span>639</span>&nbsp;蜂蜂体验过<i></i></a>
                                        </div>
                                        </div>
                                        <div class="gonglue-neirong">
                                        <a href="">
                                        <h3><a href="">芽庄旅行不可不做的几件事！（附必游景点、住宿指南、行程推荐）</a></h3>
                                        <p>越南不止有河内和胡志明，还有绵长的海岸线，芽庄是一座可以让你停下脚步晒太阳的小城。芽庄的蓝天碧海与老街小巷形成了特殊的度假感受，你可以参加出海的一日游，感受大海与岛屿带来的乐趣，也可以走街串巷，参观沧桑的教堂和洁白的佛像。早起在路边吃一份法棍，中午去找一家小餐厅，或品味越南当地的美味，或尝试各国风情美食，傍晚来到沙滩，这时候越南女人们挑着新鲜的海鲜叫卖...</p>
                                        <div class="tupian">
                                             <ul class="chuntu">
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                             </ul>
                                             <div class="liulan">68248浏览</div>
                                        </div>
                                        <div style="clear:both;"></div>
                                        </a>
                                        </div>
                                   </li>
                                   <li class="mudi">
                                        <div class="mudi-top">
                                        <div class="mudi-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>目的地专家</span></a>
                                        </div>
                                        <div class="mudi-top-r">
                                             <a href=""><span>234</span>&nbsp;蜂蜂会选择这条路线</a>
                                        </div>
                                        </div>
                                        <div class="mudi-neirong">
                                        <h3><a href="">芽庄旅行不可不做的几件事！（附必游景点、住宿指南、行程推荐</a></h3>
                                        <div class="taw">
                                             <div class="chuntut">
                                                  <img src="../../assets/img/wKgBs1brgFWANGe7AACki8kJzIY140.png" alt="" />
                                             </div>
                                             <div class="znr">
                                                  <p>路线按景点热度及位置来安排，三天可以游玩最热的11处景点。花莲既可以让你感受无边风光，也可以在夜市小摊与朋友吃到流连忘返...<br />
                                                  大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫→大皇宫...
                                                  </p>
                                                  <div class="mudi-buttom">
                                                       <div class="mudi-buttom-l">最佳季节：11月-次年4月</div>
                                                       <div class="mudi-buttom-r">23646浏览，1评论</div>
                                                  </div>
                                             </div>
                                        </div>
                                        </div>
                                        <div style="clear:both;"></div>
                                   </li>
                                   <li class="huida">
                                        <div class="huida-top">
                                        <div class="huida-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>问答</span></a>
                                        </div>
                                        <div class="huida-top-r">
                                             <a href=""><span>639</span>&nbsp;蜂蜂体验过<i></i></a>
                                        </div>
                                        </div>
                                        <div class="huida-neirong">
                                        <h3><a href="">盘点美国那些【堪称经典】的自驾路线</a></h3>
                                        <div class="tawt">
                                             <div class="chuntus">
                                                  <img src="../../assets/img/wKgBs1dyYFCAD7M5AAEdcn65VmI85.jpeg" alt="" />
                                             </div>
                                             <div class="znrt">
                                                  <p>我几乎每年都会去一次美国，东西都待过，最喜欢的还是在洛杉矶，每次可以从洛杉矶租车一直往拉斯维加斯开，感觉美国最美最集中的国家公园都在西边，这一片。美国人把风景最美的地方分为几个大类：
                                                  1、风景最美的地方绝对划归国家公园，2、然后是national monument（可以翻译为国家级风景名胜），3、然后是州立公园。大家可以先看一个图，美国的国家公园、国家名胜区的分布：
                                                  </p>
                                                  <div class="huida-buttom">
                                                       <div class="huida-buttom-l">装备</div>
                                                       <div class="huida-buttom-z">使用指南</div>
                                                       <div class="huida-buttom-r">43616浏览，703回答</div>
                                                  </div>
                                             </div>
                                        </div>
                                        </div>
                                        <div style="clear:both;"></div>
                                   </li>
                                   <li class="guanfang">
                                        <div class="guanfang-top">
                                        <div class="guanfang-top-l">
                                             <a href=""><i></i>来自&nbsp;<span>官方账号</span></a>
                                        </div>
                                        <div class="guanfang-top-r">
                                             <a href=""><span>458</span>&nbsp;蜂蜂喜欢<i></i></a>
                                        </div>
                                        </div>
                                        <div class="guanfang-neirong">
                                        <h3><a href="">2016下半年最佳旅行地大盘点</a></h3>
                                        <p>2016年转眼就过半，还没有出去玩的你，需要在剩下的16年里，用对的时间去对的地方！</p>
                                        <div class="tupiant">
                                             <ul class="chuntut">
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                                  <li><img src="../../assets/img/wKgBs1c9b3-AJBhnAAGZkfqqiHA08.jpeg" alt="" /></li>
                                             </ul>
                                             <div class="liulant">367248浏览</div>
                                        </div>
                                        </div>
                                   </li>
                                   <li class="moremore"><a href=""><span>查看更多</span><strong>>></strong></a></li>
                              </ul>
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
         carouselImg:[
              require('./../../assets/img/01.jpeg'),
              require('./../../assets/img/02.jpeg'),
              require('./../../assets/img/03.jpeg'),
              require('./../../assets/img/04.jpeg'),
          ],
          hotCity:['浙江', '上海', '广州', '北京', '四川',
          '重庆', '福建', '江苏', '海南', '贵州', ]
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*main*/
.main {
     padding-top:15px;
     border-top:2px solid #f0f0f0;
     box-sizing:border-box;
}
.main-in {
     width:1000px;
     margin:0 auto;
}
/*main-shang*/
.main-in-top {
     width:1000px;
     height:340px;
}
/*left*/
.main-in-top-l {
     float:left;
     width:260px;
     height:340px;
     box-sizing:border-box;
}
.nav-xuan {
     position:relative;
}
.xuan ul li {
     width:260px;
     height:42px;
     background:#fff;
     border:1px solid #dddddd;
     padding-left:16px;
     box-sizing:border-box;
     line-height:40px;
     margin-bottom:-1px;
     position:relative;
}
.xuan ul li a {
     width:260px;
     height:42px;
     display:block;
     font-size:14px;
     color:#666666;
}
.xuan ul li a:hover {
     color:#ff9d00;
}
.xuan ul li a:hover span {
     background-position:-30px -40px;
}
.xuan ul li span {
     width:6px;
     height:10px;
     display:inline-block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat -20px -40px;
     position:absolute;
     right:15px;
     top:15px;
}
.sou {
     width:260px;
     height:44px;
     position:relative;
}
.main-in-top-l input {
     outline:0;
     border:0;
     width:260px;
     height:44px;
     border:2px solid #ffa800;
     padding-left:45px;
     box-sizing:border-box;
     color:#bfbfbf;
     margin-top:10px;
}
.sou span {
     width:24px;
     height:23px;
     display:block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat -20px -60px;
     position:absolute;
     left:9px;
     top:10px;
     vertical-align:middle;
     margin-top:10px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

.el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
}
.xia {
     width:260px;
     height:50px;
     margin-top:15px;
}
.xiazai-tu {
     float:left;
}
.xiazai-wen {
     float:left;
     margin-left:18px;
}
.xiazai-wen p:nth-of-type(1) {
     line-height:28px;
}
.xiazai-wen p:nth-of-type(1) a {
     font-size:16px;
     color:#ff9d00;
}
.xiazai-wen p:nth-of-type(1) a:hover {
     text-decoration:underline;
}
.xiazai-wen p:nth-of-type(2) {
     line-height:19px;
     color:#666666;
}
/*right*/
.main-in-top-r {
     float:right;
     width:701px;
     height:340px;
}
/*main-xia*/
.main-in-buttom {
     width:1000px;
     margin-top:13px;
}
/*main-xia-zuo*/
.main-in-buttom-l {
     float:left;
     width:160px;
     height:400px;
     padding-left: 10px;
}
.daohang h4 {
     height:54px;
     font-size: 20px;
     line-height:54px;
}
;.xzw {
     width:160px;
     padding-top:15px;
}
.xzw ul li {
     line-height:42px;
     color:#333333;
}
.xzw ul div {
     padding: 10px 0;
     font-size: 18px;
     font-weight: bold;
     color: #ff9d00;
}
.xzw ul li span {
     font-size:16px;
     color:#ff9d00;
     margin-right:11px;
     font-weight:bold;
     display:inline-block;
}
.xzw ul li a {
     font-size:14px;
     color:#ff9d00;
     margin-right:11px;
}
.xzw ul li a:hover {
     text-decoration:underline;
}
/*main-xia-you*/
.main-in-buttom-r {
     float:right;
     width:790px;
}
.main-in-buttom-r h4 {
     height:55px;
     line-height:54px;
     font-size: 20px;
     border-bottom:1px solid #eeeeee;
     box-sizing:border-box;
}
.tuijian-all>li {
     cursor:pointer;
     padding-top:20px;
     padding-bottom:20px;
}
.tuijian-all>li:hover {
     background:#f8f8f8;
}
/*gonglue*/
.gonglue {
     border-bottom:1px solid #e5e5e5;
}
.gonglue-top {
     height:32px;
}
.gonglue-top-l {
     float:left;
}
.gonglue-top-l a {
     color:#666666;
}
.gonglue-top-l a:hover {
     color:#666666;
}
.gonglue-top-l a span {
     color:#ff9d00;
}
.gonglue-top-l a:hover span {
     color:#ff9d00;
}
.gonglue-top-l a i {
     width:20px;
     height:20px;
     display:inline-block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat 0 -20px;
     margin-right:10px;
     vertical-align:middle;
}
.gonglue-top-r {
     float:right;
     width:155px;
     height:32px;
     border:1px solid #ff9d00;
     border-radius:103px;
     box-sizing:border-box;
     line-height:32px;
     text-align:center;
     font-size:14px;
}
.gonglue-top-r a span {
     color:#ff9d00;
}
.gonglue-top-r a i {
     width:14px;
     height:14px;
     display:inline-block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat -40px -40px;
     margin-left:10px;
     vertical-align:middle;
     margin-top:-4px;
}
.gonglue-neirong h3 {
     font-family:微软雅黑;
     font-size:20px;
}
.gonglue-neirong p {
     line-height:24px;
     color:#666666;
     margin-top:18px;
}
.tupian {
     height:130px;
     margin-top:15px;
}
.tupian ul li {
     float:left;
     margin-right:15px;
}
.chuantu {
     float:left;
}
.liulan {
     float:right;
     line-height:130px;
     color:#999999;
}
/*zhuanjia*/
.mudi {
     border-bottom:1px solid #e5e5e5;
     margin-top:20px;
}
.mudi-top {
     height:32px;
}
.mudi-top-l {
     float:left;
}
.mudi-top-l a {
     color:#666666;
}
.mudi-top-l a:hover {
     color:#666666;
}
.mudi-top-l a span {
     color:#ff9d00;
}
.mudi-top-l a:hover span {
     color:#ff9d00;
}
.mudi-top-l a i {
     width:20px;
     height:20px;
     display:inline-block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat 0 -20px;
     margin-right:10px;
     vertical-align:middle;
}
.mudi-top-r {
     float:right;
     width:206px;
     height:32px;
     border:1px solid #ff9d00;
     box-sizing:border-box;
     border-radius:103px;
     line-height:32px;
     text-align:center;
     font-size:14px;
}
.mudi-top-r a span {
     width:40px;
     height:20px;
     background:#ff9d00;
     display:inline-block;
     line-height:20px;
     text-align:center;
     margin-right:9px;
}
.mudi-neirong h3 {
     font-family:微软雅黑;
     font-size:20px;
}
.taw {
     margin-top:18px;
}
.chuntut {
     float:left;
}
.znr {
     float:right;
     width:555px;
     height:150px;
     position:relative;
}
.mudi-neirong p {
     line-height:24px;
     color:#666666;
}
.mudi-buttom {
     width:555px;
     height:21px;
     position:absolute;
     left:0;
     bottom:0px;
}
.mudi-buttom-l {
     float:left;
     width:165px;
     height:21px;
     background:#f6f6f6;
     border:1px solid #e5e5e5;
     box-sizing:border-box;
     border-radius:82px;
     line-height:21px;
     text-align:center;
     color:#666666;
}
.mudi-buttom-r {
     float:right;
     color:#999999;
}
/*huida*/
.huida {
     border-bottom:1px solid #e5e5e5;
     margin-top:20px;
}
.huida-top {
     height:32px;
}
.huida-top-l {
     float:left;
}
.huida-top-l a {
     color:#666666;
}
.huida-top-l a:hover {
     color:#666666;
}
.huida-top-l a span {
     color:#ff9d00;
}
.huida-top-l a:hover span {
     color:#ff9d00;
}
.huida-top-l a i {
     width:20px;
     height:20px;
     display:inline-block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat 0 -20px;
     margin-right:10px;
     vertical-align:middle;
}
.huida-top-r {
     float:right;
     width:155px;
     height:32px;
     border:1px solid #ff9d00;
     box-sizing:border-box;
     border-radius:103px;
     line-height:32px;
     text-align:center;
     font-size:14px;
}
.huida-top-r a span {
     color:#ff9d00;
}
.huida-top-r a i {
     width:14px;
     height:14px;
     display:inline-block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat -40px -40px;
     margin-left:10px;
     vertical-align:middle;
     margin-top:-4px;
}
.huida-neirong h3 {
     font-family:微软雅黑;
     font-size:20px;
}
.tawt {
     margin-top:18px;
}
.chuntus {
     float:left;
}
.znrt {
     float:right;
     width:555px;
     height:150px;
     position:relative;
}
.huida-neirong p {
     line-height:24px;
     color:#666666;
}
.huida-buttom {
     width:555px;
     height:21px;
     position:absolute;
     left:0;
     bottom:0px;
}
.huida-buttom-l {
     float:left;
     width:56px;
     height:21px;
     background:#f6f6f6;
     border:1px solid #e5e5e5;
     box-sizing:border-box;
     border-radius:82px;
     line-height:21px;
     text-align:center;
     color:#666666;
}
.huida-buttom-z {
     float:left;
     width:80px;
     height:21px;
     background:#f6f6f6;
     border:1px solid #e5e5e5;
     box-sizing:border-box;
     border-radius:82px;
     line-height:21px;
     text-align:center;
     color:#666666;
     margin-left:10px;
}
.huida-buttom-r {
     float:right;
     color:#999999;
}
/*zhanghao*/
.guanfang {
     border-bottom:1px solid #e5e5e5;
     margin-top:20px;
}
.guanfang-top {
     height:32px;
}
.guanfang-top-l {
     float:left;
}
.guanfang-top-l a {
     color:#666666;
}
.guanfang-top-l a:hover {
     color:#666666;
}
.guanfang-top-l a span {
     color:#ff9d00;
}
.guanfang-top-l a:hover span {
     color:#ff9d00;
}
.guanfang-top-l a i {
     width:20px;
     height:20px;
     display:inline-block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat 0 -20px;
     margin-right:10px;
     vertical-align:middle;
}
.guanfang-top-r {
     float:right;
     width:155px;
     height:32px;
     border:1px solid #ff9d00;
     box-sizing:border-box;
     border-radius:103px;
     line-height:32px;
     text-align:center;
     font-size:14px;
}
.guanfang-top-r a span {
     color:#ff9d00;
}
.guanfang-top-r a i {
     width:14px;
     height:14px;
     display:inline-block;
     background:url(../../assets/img/new-gl-icon4.png) no-repeat -40px -40px;
     margin-left:10px;
     vertical-align:middle;
     margin-top:-4px;
}
.guanfang-neirong h3 {
     font-family:微软雅黑;
     font-size:20px;
}
.guanfang-neirong p {
     line-height:24px;
     color:#666666;
     margin-top:18px;
}
.tupiant {
     height:130px;
     margin-top:15px;
}
.tupiant ul li {
     float:left;
     margin-right:15px;
}
.chuantut {
     float:left;
}
.liulant {
     float:right;
     line-height:130px;
     color:#999999;
}
/*gengduo*/
.tuijian-all>li.moremore {
     line-height:40px;
     text-align:center;
     background:#fff5e5;
     padding:0;
     margin-top:10px;
}
.tuijian-all>li.moremore a {
     color:#666666;
}
.tuijian-all>li.moremore a strong {
     color:#999999;
}
.tuijian-all>li.moremore a:hover span {
     color:#666666;
}
.tuijian-all>li.moremore a:hover strong {
     color:#ff9d00;
}
/*footer*/
</style>
