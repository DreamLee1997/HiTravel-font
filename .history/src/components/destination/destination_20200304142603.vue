<template>
  <div>
    <div class="banner">
            <div class="banner-in">
            <div class="pian">
                <div class="pian-n">
                    <span>
                        <div>DAY</div>
                        <div class="four">1</div>
                    </span>
                    <h4><a href="">丽江古城一日玩法</a></h4>
                </div>
                <div style="clear:both;"></div>
                <div class="luxian">该线路基于<span>43</span>位蜂蜂游记生成，<span>22%</span>的蜂蜂都会选择此路线
                </div>
                <div class="jiantou"><a href="">丽江古城</a>→<a href="">丽江四方街</a></div>
            </div>
            <div class="search">
                <div class="unkown">Don't fear the unknown</div>
                <div class="go">
                    <el-cascader ref="cascaderAddr" :props="props" v-model="areaCode"></el-cascader>
                    <!-- <el-input v-model="destination" placeholder="我想去..." style="width: 250px; height:45px"></el-input> -->
                    <el-button 
                        icon="el-icon-search" 
                        @click="handleSearch"
                        type="primary" 
                        size="mini"></el-button>
                </div>
                <div class="location">
                    <a> 三亚 </a><a>苏州 </a><a>长沙 </a><a>南京</a>
                </div>
            </div>
            <div class="xyj">
                <a href="" class="gth"></a>
                <a href="" class="xz"></a>
                <a href="" class="rq"></a>
            </div>
            </div>
    </div>
    <div class="main">
        <div class="main-in">
            <div class="main-in-top">
                <div class="main-in-top-in" v-if="isShow">
                    <div class="main-in-yi">
                    <a href=""><img src="../../assets/img/wKgBs1c8A8-AQczpAAECxvKp5M438.jpeg" alt=""></a>
                    </div>
                    <div class="main-in-er">
                        <h3>国内推荐</h3>
                        <div class="wflx">玩法路线在手，景点、美食、交通、住宿全搞定！</div>
                        <div class="tjwf-er">
                            <ul>
                            <li @click="toDestination(0)">
                                <div class="sh-y">
                                    <div class="riqi"><span>DAY</span><br/><span>5</span></div>
                                    <h4>厦门鼓浪屿五日玩法</h4>
                                    <div style="clear:both;"></div>
                                </div>
                            </li>
                            <li @click="toDestination(1)"> 
                                <div class="sz-y">
                                    <div class="riqi"><span>DAY</span><br/><span>3</span></div>
                                    <h4>上海三日玩法</h4>
                                    <div style="clear:both;"></div>
                                </div>
                            </li>
                            <li @click="toDestination(2)">
                                <div class="sz-y">
                                        <div class="riqi"><span>DAY</span><br/><span>5</span></div>
                                        <h4>舟山东极岛五日玩法</h4>
                                        <div style="clear:both;"></div>
                                </div>
                            </li>
                            <li @click="toDestination(3)">
                                <div class="sz-y">
                                        <div class="riqi"><span>DAY</span><br/><span>3</span></div>
                                        <h4>苏州古巷三日玩法</h4>
                                        <div style="clear:both;"></div>
                                </div>
                            </li>
                            <li @click="toDestination(4)">
                                <div class="sz-y">
                                        <div class="riqi"><span>DAY</span><br/><span>5</span></div>
                                        <h4>深圳五日玩法</h4>
                                        <div style="clear:both;"></div>
                                </div>
                            </li>
                            <div style="clear:both;"></div>
                            </ul>
                        </div>
                    </div>
                    <div class="main-in-wu">
                    <a href=""><img src="../../assets/img/wKgBs1c8A8-AQczpAAECxvKp5M438.jpeg" alt="" /></a>
                    </div>
                </div>
                <div class="main-in-top-in" v-else>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { queryProvince, queryCity } from "@/api/area";


export default {
    data () {
        return {
            destination:"",
            areaCode:'',
            cityCodeArray:[
                {cityCode: '350200',cityName:'厦门'},
                {cityCode: '310100',cityName:'上海'},
                {cityCode: '330900',cityName:'舟山'},
                {cityCode: '320500',cityName:'苏州'},
                {cityCode: '440300',cityName:'深圳'}],
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
            },
            isShow:true,
            listQuery:{
                page:1,
                size:10,
                cityCode:''
            },
        }
    },
    methods:{
        //跳转到热门景区
        toDestination(val){
            let self = this;
            self.$router.push({ path: "/destination/scenicRmd", query: { cityCode: self.cityCodeArray[val] }});
            self.isShow = false;
        },
        //搜索
        handleSearch(){
            let self = this;
            var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0];
            self.$router.push({ path: "/destination/scenicRmd", query: { cityCode: pathvalue.path[1] }});
            self.isShow = false;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*banner*/
.banner{
    height: 495px;
    background: url(../../assets/img/wKgBs1dyRyKALKwdAA7k-dbxdfc14.jpeg) no-repeat;
    background-size: 100% 100%;
}
.banner-in {
    width:1000px;
    height:477px;
    margin:0 auto;
    padding:110px 12px 23px 0;
    box-sizing:border-box;
    position:relative;
}
.el-button--mini{
    font-size: 20px;
    height: 40px;
    padding: 2px 10px;
    font-weight: bolder !important;
    border-radius: 5px;
    position: absolute;
    margin: 0 5px;
    .el-icon-search{
        font-weight: bolder !important;
    }
}
.pian {
    float:right;
    text-align:right;
}
.pian-n {
    height:60px;
    line-height:60px;
}
.pian-n span {
    width:60px;
    height:60px;
    display:inline-block;
    border-radius:3px;
    background:#fff;
    line-height:20px;
    text-align:center;
    font-size:20px;
    color:#666;
    font-weight:bold;
    padding-top:5px;
    box-sizing:border-box;
}
.four {
    font-size:34px;
    font-family:微软雅黑;
    line-height:30px;
}
.pian-n h4 {
    height:60px;
    display:inline-block;
    vertical-align:middle;
    margin-top:-46px;
}
.pian-n h4 a {
    font-size:30px;
    font-weight:bold;
    font-family:微软雅黑;
    color:#fff;
}
.pian-n h4 a:hover {
    color:#ff9d00;
}
.luxian {
    line-height:40px;
    font-size:18px;
    color:#fff;
}
.luxian span {
    color:#ff9e00;
}
.jiantou {
    line-height:56px;
    color:#fff;
}
.jiantou a {
    font-size:20px;
    color:#fff;
}
/*search*/
.search {
    width:400px;
    height:140px;
    border-radius:4px;
    background:#00000094;
    opacity:0.8;
    padding-left:15px;
    box-sizing:border-box;
}
.unkown {
    height:50px;
    font-family:"Microsoft Yahei";
    font-size:20px;
    color:#fff;
    padding: 10px 1px;
}
.location a {
    line-height:46px;
    color:#fff;
}
.location a:hover {
    color:#fff;
    text-decoration:underline;
}
.xyj {
    width:105px;
    height:25px;
    position:absolute;
    left:50%;
    margin-left:500px;
    bottom:24px;
}
.gth,.xz,.rq {
    background:url(../../assets/img/place-sprites3.png) no-repeat;
    display:block;
}
.gth {
    float:left;
    width:24px;
    height:25px;
}
.xz {
    float:left;
    width:24px;
    height:25px;
    background-position:-30px 0;
    margin-left:16px;
}
.rq {
    float:right;
    width:25px;
    height:25px;
    background-position:-60px 0;
}
/*main*/
.main {
    padding-top:20px;
}
/*shang*/
.main-in-top-in {
    width:1000px;
    margin:0 auto;
}
.main-in-er {
    width:1000px;
    margin-top:61px;
    text-align:center;
}
.main-in-er h3 {
    font-weight:normal;
    line-height:26px;
    font-family:微软雅黑;
    font-size:26px;
    color:#333;
}
.wflx {
    font-size:18px;
    color:#666666;
    line-height:41px;
}
.tjdf {
    width:540px;
    margin:0 auto;
}
.tjdf ul {
    height:53px;
    border-bottom:1px solid #e4e4e4;
    box-sizing:border-box;
}
.tjdf ul li {
    float:left;
    width:180px;
    line-height:52px;
}
.tjdf ul li a {
    font-size:22px;
    color:#333333;
}
.dangxia {
    border-bottom:3px solid #ff9d00;
    margin-top:-5px;
}

.tjwf-er {
    width:1000px;
    margin-top:29px;
    height:595px;
    overflow:hidden;
}
.tjwf-er ul li {
    float:left;
}
.tjwf-er {
    width:1000px;
    margin-top:29px;
    height:595px;
    overflow:hidden;
}
.tjwf-er ul li {
    float:left;
}
.tjwf-er ul li:nth-of-type(1) {
    float:left;
    width:615px;
    height:290px;
    background:url(../../assets/img/wKgB6lPjXDWALj_xAAHrnf1K_Jk33.jpeg) no-repeat;
    position:relative;
    overflow:hidden;
}
.tjwf-er ul li:nth-of-type(1) .sh-y {
    position:absolute;
    left:0;
    bottom:-244px;
    width:615px;
    height:290px;
    background:rgba(0,0,0,0.3);
    color:#fff;
    text-align:left;
    padding-left:21px;
    box-sizing:border-box;
}
.tjwf-er ul li:nth-of-type(1) .sh-y .riqi {
    float:left;
    width:46px;
    height:46px;
    border-right:2px solid #fff;
    padding:2px 0;
    box-sizing:border-box;
}
.tjwf-er ul li:nth-of-type(1) .sh-y .riqi span:nth-of-type(1) {
    font-size:14px;
}
.tjwf-er ul li:nth-of-type(1) .sh-y .riqi span:nth-of-type(2) {
    font-size:34px;
    line-height:22px;
    font-weight:bold;
}
.tjwf-er ul li:nth-of-type(1) .sh-y h4 {
    float:left;
    margin-left:8px;
    font-size:22px;
    font-weight:normal;
    font-family:微软雅黑;
    line-height:46px;
}
.tjwf-er ul li:nth-of-type(2) {
    width:370px;
    height:290px;
    background:url(../../assets/img/wKgB3FGkNnWAHZ9UAArvBfA7LL895.jpeg) no-repeat;
    position:relative;
    overflow:hidden;
    margin-left:15px;
}
.tjwf-er ul li:nth-of-type(2) .sz-y {
    width:370px;
    height:290px;
    background:rgba(0,0,0,0.3);
    padding-left:21px;
    box-sizing:border-box;
    color:#fff;
    text-align:left;
    position:absolute;
    left:0;
    bottom:-244px;
}
.tjwf-er ul li:nth-of-type(2) .sz-y .riqi {
    float:left;
    width:46px;
    height:46px;
    border-right:2px solid #fff;
    padding:2px 0;
    box-sizing:border-box;
}
.tjwf-er ul li:nth-of-type(2) .sz-y .riqi span:nth-of-type(1) {
    font-size:14px;
}
.tjwf-er ul li:nth-of-type(2) .sz-y .riqi span:nth-of-type(2) {
    font-size:34px;
    font-weight:bold;
    line-height:22px;
}
.tjwf-er ul li:nth-of-type(2) .sz-y h4 {
    float:left;
    margin-left:8px;
    font-size:22px;
    font-weight:normal;
    font-family:微软雅黑;
    line-height:46px;
}
.tjwf-er ul li:nth-of-type(3) {
    width:300px;
    height:290px;
    margin-top:15px;
    background:url(../../assets/img/wKgB6lTV6hqAW5qjAA_WyZ2WId400.jpeg) no-repeat;
    position:relative;
    overflow:hidden;
}
.tjwf-er ul li:nth-of-type(3) .sz-y {
    width:300px;
    height:290px;
    background:rgba(0,0,0,0.3);
    padding-left:21px;
    box-sizing:border-box;
    color:#fff;
    text-align:left;
    position:absolute;
    left:0;
    bottom:-244px;
}
.tjwf-er ul li:nth-of-type(3) .sz-y .riqi {
    float:left;
    width:46px;
    height:46px;
    border-right:2px solid #fff;
    padding:2px 0;
    box-sizing:border-box;
}
.tjwf-er ul li:nth-of-type(3) .sz-y .riqi span:nth-of-type(1) {
    font-size:14px;
}
.tjwf-er ul li:nth-of-type(3) .sz-y .riqi span:nth-of-type(2) {
    font-size:34px;
    font-weight:bold;
    line-height:22px;
}
.tjwf-er ul li:nth-of-type(3) .sz-y h4 {
    float:left;
    margin-left:8px;
    font-size:22px;
    font-weight:normal;
    font-family:微软雅黑;
    line-height:46px;
}
.tjwf-er ul li:nth-of-type(4) {
    width:300px;
    height:290px;
    margin-left:15px;
    margin-top:15px;
    background:url(../../assets/img/wKgB4lNnkPCAX0-3AAI_PDTg8TQ20.jpeg) no-repeat;
    position:relative;
    overflow:hidden;
}
.tjwf-er ul li:nth-of-type(4) .sz-y {
    width:300px;
    height:290px;
    background:rgba(0,0,0,0.3);
    padding-left:21px;
    box-sizing:border-box;
    color:#fff;
    text-align:left;
    position:absolute;
    left:0;
    bottom:-244px;
}
.tjwf-er ul li:nth-of-type(4) .sz-y .riqi {
    float:left;
    width:46px;
    height:46px;
    border-right:2px solid #fff;
    padding:2px 0;
    box-sizing:border-box;
}
.tjwf-er ul li:nth-of-type(4) .sz-y .riqi span:nth-of-type(1) {
    font-size:14px;
}
.tjwf-er ul li:nth-of-type(4) .sz-y .riqi span:nth-of-type(2) {
    font-size:34px;
    font-weight:bold;
    line-height:22px;
}
.tjwf-er ul li:nth-of-type(4) .sz-y h4 {
    float:left;
    margin-left:8px;
    font-size:22px;
    font-weight:normal;
    font-family:微软雅黑;
    line-height:46px;
}
.tjwf-er ul li:nth-of-type(5) {
    width:370px;
    height:290px;
    margin-left:15px;
    margin-top:15px;
    background:url(../../assets/img/wKgBs1bf5XiAGGrKAAVfPe3kaco280.png) no-repeat;
    position:relative;
    overflow:hidden;
}
.tjwf-er ul li:nth-of-type(5) .sz-y {
    width:370px;
    height:290px;
    background:rgba(0,0,0,0.3);
    padding-left:21px;
    box-sizing:border-box;
    color:#fff;
    text-align:left;
    position:absolute;
    left:0;
    bottom:-244px;
}
.tjwf-er ul li:nth-of-type(5) .sz-y .riqi {
    float:left;
    width:46px;
    height:46px;
    border-right:2px solid #fff;
    padding:2px 0;
    box-sizing:border-box;
}
.tjwf-er ul li:nth-of-type(5) .sz-y .riqi span:nth-of-type(1) {
    font-size:14px;
}
.tjwf-er ul li:nth-of-type(5) .sz-y .riqi span:nth-of-type(2) {
    font-size:34px;
    line-height:22px;
    font-weight:bold;
}
.tjwf-er ul li:nth-of-type(5) .sz-y h4 {
    float:left;
    margin-left:8px;
    font-size:22px;
    font-weight:normal;
    font-family:微软雅黑;
    line-height:46px;
}
.main-in-wu {
    margin-top:15px;
}
/*xia*/
.main-in-buttom {
    background:#fafafa;
    border-top:1px solid #e4e4e4;
    margin-top:40px;
    padding-top:23px;
    padding-bottom:100px;
    color:#666666;
}
.main-in-buttom-in {
    width:1000px;
    margin:0 auto;
}
.main-in-buttom a {
    color:#666666;
}
.main-in-buttom a:hover {
    color:#666666;
    text-decoration:underline;
}
.main-in-buttom span {
    color:#a8a8a8;
}
.main-in-buttom-top h3 {
    font-weight:normal;
    line-height:63px;
    font-size:32px;
}
.main-in-buttom-top h3 span {
    font-size:14px;
    font-family:Arial;
}
.main-in-buttom-top dl {
    width:1000px;
}
.main-in-buttom-top dl dt {
    height:52px;
    line-height:52px;
    font-size:20px;
}
.main-in-buttom-top dl dd {
    line-height:30px;
    margin-left:30px;
}
.main-in-buttom-top dl dd ul li:nth-of-type(1) {
    float:left;
    margin-left:-30px;
    font-family:Centaur,Times New Roman;
    font-weight:bold;
}
.yazhou-all {
    height:480px;
}
.xuan-zuo {
    float:left;
    width:333px;
}
.xuan-zhong {
    float:left;
    width:333px;
}
.xuan-you {
    float:right;
    width:333px;
}
.quanqiut {
    margin-top:35px;
}
.bmzhou-all {
    height:241px;
}
.quanqius,.quanqiuf,.quanqiuw {
    margin-top:35px;
}
.main-in-buttom-buttom {
    width:1000px;
    background:#fafafa;
    margin:0 auto;
    margin-top:40px;
    color:#666666;
}
.main-in-buttom-buttom a {
    color:#666666;
}
.main-in-buttom-buttom a:hover {
    color:#666666;
    text-decoration:underline;
}
.main-in-buttom-buttom h3 {
    font-weight:normal;
    line-height:63px;
    font-size:32px;
}
.main-in-buttom-buttom dl dt {
    float:left;
    width:100px;
    font-size:22px;
    line-height:41px;
    display:inline;
}
.main-in-buttom-buttom dl dd {
    line-height:41px;
    font-size:14px;
}
.main-in-buttom-buttom dl dd li {
    float:left;
}
.main-in-buttom-buttom dl dd li a {
    padding-right:83px;
}
.main-in-buttom-buttom dl dd li a span {
    color:#ff3600;
}
.ds {
    width:1000px;
}
.ai {
    height:82px;
}
</style>
