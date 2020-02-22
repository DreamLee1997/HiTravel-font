<template>
    <div>
        <div class="banner clearfix">   
            <ul>
                <li><a href=""><img :src='swpierBignum' alt="" /></a>
                    <div class="li-in">
                        <a href="">
                            <p><span>15</span>/Jan.2020</p>
                            <p>旅行记——带着相机和胶片来游山玩水</p>
                        </a>
                    </div>
                </li>
            </ul>
            <ol id="img-list">
                <li :class="{'now': isActive[0]}">
                    <img src="./../../assets/img/swpier3.jpeg" alt="" @click="swpierImg(0)" /></li>
                <li :class="{'now': isActive[1]}">
                    <img src="./../../assets/img/swpier2.jpeg" alt="" @click="swpierImg(1)"/></li>
                <li :class="{'now': isActive[2]}">
                    <img src="./../../assets/img/swpier1.jpeg" alt="" @click="swpierImg(2)"/></li>
                <li :class="{'now': isActive[3]}">
                    <img src="./../../assets/img/swpier4.jpeg" alt="" @click="swpierImg(3)"/></li>
                <li :class="{'now': isActive[4]}">
                    <img src="./../../assets/img/swpier5.jpeg" alt="" @click="swpierImg(4)"/></li>
            </ol>
            <!-- 搜索 -->
            <div class="choose">
                <el-radio-group v-model="typeRadio" fill='#f69d22'>
                    <el-radio :label="1">全部</el-radio>
                    <el-radio :label="3">去旅行</el-radio>
                    <el-radio :label="6">目的地</el-radio>
                    <el-radio :label="9">酒店</el-radio>
                </el-radio-group>
                <div class="sousuo">
                    <el-input placeholder="搜索目的地/攻略/酒店/去旅行" :v-model="searchContent"></el-input>
                    <el-button icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
                </div>
            </div>
        </div>
        <div style="clear:both"></div>
        <div class="main">
            <div class="main-in">
                <div class="main-top">
                    <div class="main-in-left">
                        <div class="haihang"><img src="@/assets/img/wKgBs1dOvWKAFLsGAACZ1ruM84086.jpeg" alt="" /></div>
                        <div class="lxjzl">
                            <div class="lxjzl-shang">
                                <h3><a href="">旅行家专栏</a></h3>
                                <span><a href="">专栏首页</a></span>
                            </div>
                            <div class="lxjzl-zhong"><img src="@/assets/img/home-left1.jpeg" alt="" /></div>
                            <div class="lxjzl-xia">
                                <h4><a href="">芽庄与顺滑隔了多远</a></h4>
                                <p>在旅途中，最艰难的莫过于学会告别。因为真的可能，字面上的一眼万年。</p>
                            </div>
                        </div>
                        <div class="lygltj">
                            <div class="lygltj-shang">
                                <h3><a href="">旅游攻略推荐</a></h3>
                                <span><a href="">更多</a></span>
                            </div>
                            <div class="lygltj-zhong">
                                <div class="bldt"><a href=""><img src="@/assets/img/wKgBs1dhWoiANjLdAARzAy6P5ok22.jpeg" width="110" alt="" /></a></div>
                                <div class="bldw">
                                    <h4><a href="">北领地</a></h4>
                                    <p>详细的吃，住，行，景点，路线，使用信息。</p>
                                </div>
                            </div>
                            <div class="lygltj-xia">
                                <ul>
                                    <li><a href="">夜雨</a> 点评了  外伶仃岛的 <a href="">伶仃峰</a></li>
                                    <li><a href="">LORI</a> 点评了  昌平的 <a href="">北京后花园旅</a></li>
                                    <li><a href="">34744558</a> 点评了  宏村的 <a href="">弘茗轩茶行</a></li>
                                    <li><a href="">米粥</a> 点评了  青城山的 <a href="">青城山前山</a></li>
                                    <li><a href="">dandan52</a> 点评了  深圳的 <a href="">小梅沙</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="shanghai"><a href=""><img src="@/assets/img/wKgBs1dWbECAB47zAAFJICE7nN005.jpeg" alt="" /></a></div>
                        <div class="wohd">
                            <div class="wohd-shang">
                                <h3><a href="">我的活动</a></h3>
                                <span><a href="">正在进行</a></span>
                            </div>
                            <div class="wohd-xia">
                                <ul>
                                    <li>
                                        <a href="">
                                        <span></span>
                                        <div class="wohd-xia-w">
                                        <h4>卡罗拉双擎，伴你“尽擎”度假</h4>
                                        <p>路遇欢喜，约你看大片！</p>
                                        </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                        <span></span>
                                        <div class="wohd-xia-w">
                                        <h4>卡罗拉双擎，伴你“尽擎”度假</h4>
                                        <p>路遇欢喜，约你看大片！</p>
                                        </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                        <span></span>
                                        <div class="wohd-xia-w">
                                        <h4>卡罗拉双擎，伴你“尽擎”度假</h4>
                                        <p>路遇欢喜，约你看大片！</p>
                                        </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                        <span></span>
                                        <div class="wohd-xia-w">
                                        <h4>卡罗拉双擎，伴你“尽擎”度假</h4>
                                        <p>路遇欢喜，约你看大片！</p>
                                        </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                        <span></span>
                                        <div class="wohd-xia-w">
                                        <h4>卡罗拉双擎，伴你“尽擎”度假</h4>
                                        <p>路遇欢喜，约你看大片！</p>
                                        </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                        <span></span>
                                        <div class="wohd-xia-w">
                                        <h4>卡罗拉双擎，伴你“尽擎”度假</h4>
                                        <p>路遇欢喜，约你看大片！</p>
                                        </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>

                    <div class="main-in-right">
                        <div class="sanya"><img src="@/assets/img/wKgBs1dicXWAJbbuAAF1AeBFGLo22.jpeg" alt="" /></div>
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
                                                <span></span><span>目标：</span><span>¥</span><span><strong>5000</strong></span>
                                            </span>
                                        </div>
                                        <div class="qian-you">
                                            <a >
                                            <span>一元试试</span>
                                            </a>
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
                                        <li><span></span><a href="">姑娘漂亮</a></li>
                                        <li><a href="">带娃去耍</a></li>
                                        <li><a href="">毕业旅行</a></li>
                                    </ul>
                                </div>
                                <div class="wen"><span></span><a href="">我要上首页</a></div>
                                <div class="xie">
                                    <el-button 
                                        style="width:140px;" 
                                        type="primary"
                                        icon="el-icon-edit-outline">写游记</el-button>
                                </div>
                            </div>
                            <div class="xieyouji-main">
                                <div>
                                    <el-table
                                        :data="tableData"
                                        :show-header='false'
                                        style="width: 100%; margin-top: 20px">
                                        <el-table-column
                                            prop="img"
                                            width="180">
                                            <template slot-scope="scope">
                                                <img :src="scope.row.img" alt="">
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            label="姓名">
                                            <template slot-scope="scope">
                                                <div> 
                                                    <div class="table-title">{{scope.row.title}}</div>  
                                                    <p>{{scope.row.name}}</p>
                                                </div>
                                             </template>
                                        </el-table-column>
                                    </el-table>
                                    </div> 
                                <div style="clear:both;"></div>
                                <div class="fanye">
                                    <div class="yeshu">共50页/600条</div>
                                    <div class="yema">
                                        <a href="" class="dqy">1</a>
                                        <a href="">2</a>
                                        <a href="">3</a>
                                        <a href="">4</a>
                                        <a href="">5</a>
                                        <a href="">6</a>
                                        <a href="">7</a>
                                        <a href="">8</a>
                                        <a href="">9</a>
                                        <a href="">下一页>></a>
                                    </div>
                                </div>
                            </div>
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
            slideImg: [
                'swpierBig3', 
                'swpierBig2',
                'swpierBig1',
                'swpierBig4',
                'swpierBig5'],
            swpiernum:0,
            swpierBignum:require('./../../assets/img/swpierBig3.jpeg'),
            isActive:[1,0,0,0,0],
            timer: '',
            searchContent:'',
            typeRadio:1,
            flag:false,
            notFirst:false,
            tableData: [{
                id: '12987122',
                img:require('./../../assets/img/hah.jpeg'),
                name: '是不是对生活不太满意, 很久没有笑过又不知为何？所以，既然不快乐又不喜欢这里, 不如一路向西去大理。我在苍山洱海边，你在哪里？在这一年，我们29岁，孩子3岁。旅行，就是从一个你呆腻了的地方走到别人呆的地方...',
                title:'花样游记大赛#一路向西去大理（图文并茂，海量照片附视频）'
                }, {
                id: '12987123',
                img:require('./../../assets/img/hah.jpeg'),
                name: '王小虎',
                title:'花样游记大赛#一路向西去大理（图文并茂，海量照片附视频）'
                }, {
                id: '12987124',
                img:require('./../../assets/img/hah.jpeg'),
                name: '王小虎',
                title:'花样游记大赛#一路向西去大理（图文并茂，海量照片附视频）'
                }, {
                id: '12987125',
                img:require('./../../assets/img/hah.jpeg'),
                name: '王小虎',
                title:'花样游记大赛#一路向西去大理（图文并茂，海量照片附视频）'
                }, {
                id: '12987126',
                img:require('./../../assets/img/hah.jpeg'),
                name: '王小虎',
                title:'花样游记大赛#一路向西去大理（图文并茂，海量照片附视频）'
            }]
        }
    },
    mounted() {
        this.beginInterval();
        //监听滚动条，开启或关闭定时器
        window.addEventListener('scroll',this.handleScroll,true);
    },
    methods:{

        //处理定时器
        handleScroll(e){
            let  self = this
            this.$nextTick(()=>{
                var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset;
                if (top >= 700) {
                    clearInterval(self.timer);
                    self.notFirst = true;
                    self.flag = false;
                    self.timer = null;
                } else if(top <= 35 && self.notFirst){
                    if(!self.flag){
                        self.beginInterval()
                        self.flag = true;
                    }
                }
            })
        },
        //开起轮播图定时器
        beginInterval(){
            let self = this
            this.timer = setInterval(self.autoplay,3000)
        },
        //自动播放轮播图
        autoplay(){
            if(this.swpiernum > 4){
                this.swpiernum = 0;
            }
            this.swpierImg(this.swpiernum);
            this.swpiernum++;
        },
        //轮播图切换
        swpierImg(num){ 
            this.swpiernum = num;
            switch(num){
                case 1:
                    this.isActive=[0,1,0,0,0];
                    break;
                case 2:
                    this.isActive=[0,0,1,0,0];
                    break;
                case 3:
                    this.isActive=[0,0,0,1,0];
                    break;
                case 4:
                    this.isActive=[0,0,0,0,1];
                    break;
                default:
                    this.isActive=[1,0,0,0,0];
                    break;
            }
            //vue 设置动态src，要用require()函数
            this.swpierBignum = require('./../../assets/img/'+this.slideImg[num]+'.jpeg');
        },
        handleSearch(){
            
        }
    },
    destroyed() {
        //清除定时器
        clearInterval(this.timer);
        this.timer = null;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*banner*/
.banner{
    height:500px;
    position:relative;
}
.banner ul{
    height:500px;
    overflow:hidden;
}
.banner ul li{
    height:500px;
    overflow:hidden;
    position:relative;
}
.banner ul li img{
    width:100%;
}
.li-in{
    width:600px;
    height:86px;
    margin:0 auto;
    position:absolute;
    top:0;
    left:50%;
    margin-left:-500px;
    margin-top:14px;
}
.li-in p{
    line-height:36px;
    font-size:20px;
    color:#ffffff;
    font-weight:bold;
}
.li-in span{
    font-size:32px;
}
.banner ol{
    position:absolute;
    top:39px;
    right:50px;
}
.banner ol li{
    width:108px;
    height:67px;
    margin-bottom:6px;
    cursor:pointer;
}
.banner ol li img{
    width:100%;
    height:100%;
}
.now{
    width:108px;
    height:67px;
    border:1px solid #ff9d00;
    box-sizing:border-box;
}
/*search*/
.el-radio-group{
    padding: 5px 5px 10px 5px;
    .el-radio{
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
.choose{
    width:632px;
    height:109px;
    border-radius:3px;
    background:#141416;
    opacity:0.8;
    padding:8px 15px 15px 15px;
    box-sizing:border-box;
    position:absolute;
    bottom:44px;
    left:50%;
    margin-left:-316px;
}
.sousuo{
    width:602px;
    height:46px;
    display: inline-block;
    .el-input{
        width: 80%;
    }
}
.fanfdajing{
    float:right;
    width:50px;
    height:46px;
    border-radius:3px;
    border:0; display:block;
    background:#ff9d00;
    position:relative;
}
.fanfdajing span{
    width:23px;
    height:24px;
    display:block;
    background:url(../../assets/img/header-sprites11.png) no-repeat 0px -109px;
    position:absolute;
    left:13px;
    top:11px;
}
.fanfdajing:hover{
    background:#ff8400;
}
/*main*/
.main{
    margin-top:20px;
}
.main-in{
    width:1000px;
    margin:0 auto;
}
/*left*/
.main-in-left{
    float:left;
    width:260px;
}
.haihang{
    width:260px;
    height:260px;
}

.lxjzl{
    width:260px;
    height:321px;
}
.lxjzl-shang{
    height:59px;
    line-height:59px;
}
.lxjzl-shang h3{
    float:left;
    font-size:18px;
    color:#333333;
    font-weight:normal;
}
.lxjzl-shang h3 a:hover{
    color:#333333;
}
.lxjzl-shang span{
    float:right;
    font-size:12px;
    color:#999999;
}
.lxjzl-shang span a{
    color:#999999;
}
.lxjzl-shang span a:hover{
    color:#999999;
    text-decoration:underline;
}

.lxjzl-xia{
    padding-top:5px;
}
.lxjzl-xia h4 a{
    font-size:16px;
    font-weight:normal;
    color:#333333;
    line-height:36px;
}
.lxjzl-xia h4 a:hover{
    color:#333333;
    text-decoration:underline;
}
.lxjzl-xia p{
    line-height:20px;
    font-size:12px;
    color:#666666;
}

.lygltj{
    width:260px;
    height:368px;
}
.lygltj-shang{
    width:260px;
    height:61px;
}
.lygltj-shang h3{
    float:left;
    font-size:18px;
    font-weight:normal;
    color:#333333;
    line-height:61px;
}
.lygltj-shang h3 a:hover{
    color:#333333;
}
.lygltj-shang span{
    float:right;
    font-size:12px;
    color:#999999;
    line-height:61px;
}
.lygltj-shang span a{
    color:#999999;
}
.lygltj-shang span a:hover{
    color:#999999;
    text-decoration:underline;
}
.lygltj-zhong{
    width:260px;
    height:167px;
}
.bldt{
    float:left;
}
.bldw{
    float:right;
    width:129px;
}
.bldw h4 a{
    font-size:24px;
    color:#333333;
    font-weight:normal;
    line-height:47px;
}
.bldw h4 a:hover{
    color:#333333;
    text-decoration:underline;}
.bldw p{
    font-size:12px;
    font-weight:normal;
    color:#333333;
    line-height:20px;}
.lygltj-xia{
    width:260px;
    height:140px;
    line-height:28px;
    font-size:14px;
}
.lygltj-xia li a{
    color:#ff9d00;
}
.lygltj-xia li a:hover{
    text-decoration:underline;
}

.shanghai{margin-top:30px;}

.wohd{width:260px; margin-top:13px;}
.wohd-shang{width:260px; height:69px;}
.wohd-shang h3{
    float:left;
    font-size:18px;
    font-weight:normal;
    color:#333333;
    line-height:69px;
}
.wohd-shang h3 a:hover{
    color:#333333;
}
.wohd-shang span{
    float:right;
    font-size:12px;
    color:#999999;
    line-height:69px;
}
.wohd-shang span a{
    color:#999999;
}
.wohd-shang span a:hover{
    color:#999999;
    text-decoration:underline;
}
.wohd-xia{
    width:260px;
    padding-left:5px;
    box-sizing:border-box;
}
.wohd-xia ul{
    width:270px;
    height:370px;
    overflow:auto;
}
.wohd-xia ul li{
    height:40px;
    margin-top:16px;
    background:#fff;
}
.wohd-xia ul li:hover{
    background:#f8f8f8;
}

.wohd-xia ul li:nth-of-type(1){
    margin-top:0;
}
.wohd-xia ul li span{
    float:left;
    width:40px;
    height:40px;
    display:block;
    background:url(../../assets/img/wKgBs1dfvyyAJzKqAAAKkK_iG5Y815.png) no-repeat;
}
.wohd-xia-w{
    float:left;
    line-height:20px;
    margin-left:8px;
}
.wohd-xia-w h4{
    font-size:14px;
    font-weight:normal;
    color:#ff9d00;
}
.wohd-xia-w p{
    font-size:12px;
    color:#666666;
}
/*right*/
.main-in-right{
    float:right;
}

.sanya{
    width:700px;
    height:120px;
}

.yiyuan{
    width:700px;
    height:235px;
}
.yiyuan-shang{
    height:54px;
    line-height:54px;
}
.yiyuan-shang h3{
    float:left;
    font-size:18px;
    color:#333333;
    font-weight:normal;
}
.yiyuan-shang span{
    float:right;
    font-size:18px;
    color:#333333;
    font-weight:normal;
    position:relative;
}
.yiyuan-shang span em{
    font-size:12px;}
.yiyuan-shang span i{
        width:0;
        height:0;
        border-width:3px;
        border-color:red transparent transparent transparent;
        border-style:solid dashed dashed dashed;
        overflow:hidden;
        position:absolute;
        top:39px;
        left:19px;
        }

.yiyuan-xia{
    width:700px;
    height:180px;
    border:1px solid #e9e9e9;
    box-sizing:border-box;
    position:relative;
}
.jiao{
    width:15px;
    height:15px;
    border-top:2px solid #fa635a;
    border-right:2px solid #fa635a;
    position:absolute;
    top:0;
    right:0;
    margin-top:-1px;
    margin-right:-1px;
}
.yiyuan-xia-zuo{
    width: 280px;
    height: 180px;
    background: url(../../assets/img/wKgBs1cxrsiADAFmAO6rVbNx40s17.jpeg);
    background-size:100% auto;
    position:relative;overflow:
    hidden;float:left;
}
.yiyuan-xia-zuo #box{
    width: 280px;
    height: 180px;
    overflow: hidden;
    position:absolute;
    bottom:-134px;
    }
.yiyuan-xia-zuo #box .box-in{
    background-color:rgba(0,0,0,0.3);
}
.yiyuan-xia-zuo #box .box-in #boxin{
    height: 500%;
}
.yiyuan-xia-zuo #box .box-in #boxin ul{
    color:#000;
    font-size:12px;
    color:#fff;}
.yiyuan-xia-zuo #box .box-in #boxin ul li{
    width:90%;
    height:32px;
    line-height:32px;
    border-top:1px solid rgba(225,225, 225, 0.5);
    margin:0 auto;
}
.yiyuan-xia-you{
    float:right;
    width:353px;
    height:178px;
    padding-top:23px;
    padding-right:31px;
    box-sizing:border-box;
    text-align:right;}
.yiyuan-xia-you h3{
    line-height:22px;
}
.yiyuan-xia-you span{
    line-height:41px;
}
.qian{
    float:right;
    width:276px;
    height:38px;
    border:1px solid #fa635a;
    box-sizing:border-box;
    border-radius:3px;
}
.qian-zuo{
    float:left;
    width:137px;
    height:36px;
    line-height:36px;
    text-align:center;
}
.qian-zuo span{
    height:36px;
    line-height:36px;
    display:inline-block;
}
.qian-zuo span span:nth-of-type(1){
    width:18px;
    height:18px;
    display:inline-block;
    background:url(../../assets/img/onebuy2.png) no-repeat 0px -180px;
    vertical-align:bottom;
    margin-bottom:8px;
    margin-right:5px;
}
.qian-zuo span span:nth-of-type(2){
    font-size:12px;
    color:#909090;
}
.qian-zuo span span:nth-of-type(3){
    font-size:12px;
    color:#fa635a;
}
.qian-zuo span span:nth-of-type(4) {
    font-size:18px;
    color:#fa635a;
    vertical-align:top;
}
.qian-you{
    float:right;
    width:134px;
    height:36px;
    background-color:#fa635a;
    text-align:center;
}
.qian-you a{
    width:134px;
    height:36px;
    display:block;}
.qian-you a span{
    font-size:18px;
    color:#fff;
}
.renshu{
    width:72px;
    height:82px;
    background:url(../../assets/img/onebuy2.png) no-repeat -104px -42px;
    display:block;
    position:absolute;
    top:37px;
    left:50%;
    margin-left:-36px;
    font-weight:bold;
    font-size:30px;
    color:#fff;
}
.shuzi{
    display:inline-block;
    text-align:center;
    line-height:84px;
}
.jdt{
    width:353px;
    height:45px;
    margin-top:9px;
}
.jdt-shang{
    width:353px;
    height:29px;
    line-height:29px;
}
.jdt-shang span:nth-of-type(1){
    float:left;
    font-size:14px;
    color:#666666;
}
.jdt-shang span:nth-of-type(2){
    float:right;
    font-size:14px;
    color:#666666;
}
.jdt-shang span em{
    color:#ff6155;
    margin-left:3px;
}
.jdt-xia{
    width:353px;
    height:6px;
    border-radius:3px;
    background-color:#e9e9e9;
}
.jdt-xia-in{
    width:49px;
    height:6px;
    border-radius:3px 0 0 3px;
    background-color:#ff6155;}
.xieyouji{
    width:700px;
}
.xieyouji-top{
    width:700px;
    height:85px;
    line-height:85px;
}
.nav-youji{
    float:left;
    height:85px;
}
.nav-youji ul li{
    float:left;
}
.nav-youji ul li a{
    padding-right:28px;
    font-size:16px;
    color:#333333;
}
.nav-youji ul li a:hover{
    color:#333333;
    text-decoration:underline;
}
.nav-youji ul li:nth-of-type(1) a{
    float:right;
    margin-left:5px;
}
.nav-youji ul li span{
    float:left;
    width:49px;
    height:38px;
    display:block;
    background:url(../../assets/img/index-sprites5.png) no-repeat 0px -90px;
    margin-top:21px;
}

.wen{
    float:left;
}
.wen a{
    float:right;
    color:#ff9d00;
    margin-left:4px;
}
.wen a:hover{
    text-decoration:underline;
}
.wen span{
    float:left;
    width:16px;
    height:16px;
    display:block;
    background:url(../../assets/img/index-sprites5.png) no-repeat -100px -30px;
    margin-top:34px;}

.xie{
    float:right;
    width:140px;
    height:36px;
    line-height:36px;
    background:#ff9d00;
    border:none;
    border-radius:3px;
    margin-top:22px;
    text-align:center;
}
.xie a{
    width:140px;
    height:36px;
    display:block;
}
.xieyouji-main{
    width:700px;
}
.riji{
    width:700px;
    height:150px;
    padding:15px 0;
    background-color:#fff;
}
.riji:hover{
    background-color:#f8f8f8;
}
.riji:nth-of-type(1){
    margin-top:0;
}
.riji-zuo{
    float:left;
    width:220px;
    height:150px;
    background:url(../../assets/img/hah.jpeg) no-repeat;
    background-size:100% 100%;
}
.riji-you{
    float:right;
    width:455px;
    height:150px;
}
.wenzhang{
    width:455px;
    height:101px;
}
.riji-you dl dt{
    width:455px;
    height:27px;
    line-height:27px;
}
.el-table td div .table-title{
    width: 420px;
    height: 26px;
    display: block;
    font-size:20px;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.riji-you dl dt a{
    width:420px;
    height:27px;
    display:block;
    font-size:20px;
    font-weight:bold;
    color:#333;
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}
.riji-you dl dd{
    width:455px;
    height:66px;
    line-height:22px;
}
.riji-you dl dd a{
    width:455px;
    height:66px;
    display:block;
    font-size:14px;
    color:#666666;
     overflow:hidden;
 }

.hudong{
    width:455px;
    height:33px;
    line-height:33px;
    margin-top:16px;
}
.zuobiao,.ren{
    float:left;
    color:#666666;
}
.zuobiao i,.yan i,.ding{
    display:inline-block;
    background:url(../../assets/img/index-sprites5.png) no-repeat;
}
.zuobiao i{
    width:14px;
    height:16px;
    background-position:0px -50px;
    margin-right:6px;
    vertical-align:-5px;
}
.zuobiao a{
    color:#666666;
}
.zuobiao a:hover{
    color:#666666;
    text-decoration:underline;
}
.ren i{
    width:14px;
    height:16px;
    border-radius:50%;
    display:inline-block;
    background:url(../../assets/img/wKgBs1da3BCANUSxAAH6xXIZODw12.jpeg) no-repeat;
    margin:0 5px 0 8px;
    vertical-align:-5px;
}
.ren span a{
    color:#ff9d00;
    margin-right:13px;
}
.ren span a:hover{
    text-decoration:underline;
}
.yan{
    float:left;
    color:#999999;
    margin-right:14px;
}
.yan i{
    width:18px;
    height:14px;
    background-position:-30px -50px;
    margin:0 5px 0 8px;
    vertical-align:-5px;
}
.ding i{
    font-style:normal;
    color:#ff9d00;
    margin-left:-24px;
}
.ding{
    float:right;
    width:37px;
    height:33px;
    background-position:-60px 0px;
    margin-left:9px;
}
/*yema*/
.fanye{
    width:400px;
    height:24px;
    padding:36px 0 20px 300px;
}
.yeshu{
    float:left;
    line-height:24px;
    color:#999999;
}
.yema{
    float:right;
    margin-left:15px;
    line-height:24px;
    text-align:center;
}
.yema a{
    float:left;
    width:21px;
    height:24px;
    margin-right:6px;
    color:#666666;
}
.yema a:hover{
    background:#efefef;
    color:#666666;
}
.yema a:nth-of-type(10){
    width:63px;
    margin-right:0;
    background:#ff9d00;
    color:#ffffff;
}
.yema a.dqy{
    background:#ff9d00;
    color:#ffffff;
}
.ggg-in{
    width:1000px;
    height:100px;
    margin:0 auto;
    background:url(../../assets/img/dong.gif) no-repeat;
}
</style>
