<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-12 10:14:24
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-26 11:27:53
 -->
<template>
     <div class="footer">
            <div class="footer-in">
                    <div class="footer-yi">
                        <dl>
                            <dt>关于我们</dt>
                            <dd><a href="">关于HiTravel</a></dd>
                            <dd><a href="">网络信息侵权通知指引</a></dd>   
                            <dd><a href="">隐私政策</a> <a href="">服务协议</a></dd>
                            <dd><a href="">联系我们</a> <a href=""><strong>加入HiTravel</strong></a></dd>
                        </dl>
                        <dl>
                            <dt>旅行服务</dt>
                                <a href="">旅游攻略</a>
                                <a href="">酒店预定</a>
                                <a href="">游记发表</a>
                                <a href="">预定攻略</a>
                            </dl>
                        <div class="erweima">
                            <div class="first">
                                <span></span>
                                <span>HiTravel官方微信</span>
                            </div>
                            <div class="second">
                                <span></span>
                                <span>HiTravel公众号</span>
                            </div>
                        </div>
                    </div>
                    <div class="footer-er">
                        <span>关注我们</span>
                        <div class="xh">
                            <a href=""><span></span></a>
                            <a href=""><span></span></a>
                            <a href=""><span></span></a>
                        </div>
                    </div>
                    <div class="footer-san">
                        <a href="">马可波罗</a>
                        <a href="">Onlylady女人志</a>
                        <a href="">艺龙旅游指南</a>
                        <a href="">欣欣旅游网</a>
                        <a href="">户外运动</a>
                        <a href="">365音乐网</a>
                        <a href="">百酷特色住宿</a>
                        <a href="">悠哉旅游网</a>
                        <a href="">小说网</a>
                        <a href="">来订吧酒店网</a>
                        <a href="">游多多自助游</a>
                        <a href="">教育</a>
                        <a href="">火车时刻表</a>
                        <a href="">驴妈妈旅游网</a>
                        <a href="">好豆美食网</a>
                        <a href="">二手车</a>
                        <a href="">绿野户外</a>
                        <a href="">途牛旅游网</a>
                        <a href="">图吧</a>
                        <a href="">SUV联合越野</a>
                        <a href="">手机浏览器</a>
                        <a href="">上海地图</a>
                        <a href="">天气预报查询</a>
                        <a href="">同程旅游</a>
                        <a href="">火车票</a>
                        <a href="">携程旅游</a>
                        <a href="">锦江旅游</a>
                        <a href="">火车时刻表</a>
                        <a href="">TripAdvisor</a>
                        <a href="">天巡网</a>
                        <a href="">自在客</a>
                        <a href="">租租车</a>
                        <a href="">五分旅游网</a>
                        <a href="">酒店预订</a>
                        <a href="">爱旅行网</a>
                        <a href="">旅游</a>
                        <a href="">旅游网</a>
                        <a href="">wed114结婚网</a>
                        <a href="">车讯网</a>
                        <a href="">遨游旅游网</a>
                        <a href="">手机</a>
                        <a href="">客运站</a>
                        <a href="">更多友情链接>></a>
                    </div> 
            </div>
        </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style >
@charset "utf-8";
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,p,th,td {
    margin:0;
    padding:0;
}
body {
    font-size:12px;
    color:#3C3C3C;
}
/*footer*/
.footer {
    background:#3c3c3c;
    margin-top:60px;
}
.footer-in {
    width:1000px;
    margin:0 auto;
    background:#3c3c3c;
    color:#c2c2c2;
    overflow:hidden;
}
.footer-yi {
    width:980px;
    height:167px;
    margin:0 auto;
    margin-top:24px;
}
.footer-yi dl {
    float:left;
}
.footer-yi dl dt {
    font-size:14px;
}
.footer-yi dl:nth-of-type(1) {
    width:168px;
}
.footer-yi dl:nth-of-type(1) dd {
    line-height:24px;
}
.footer-yi dl:nth-of-type(2) {
    width:120px;
    margin-left:100px;
}
.footer-yi dl:nth-of-type(2) a {
    display:block;
}
.footer-yi dl:nth-of-type(3) {
    text-align:center;
}
.footer-yi dl:nth-of-type(3) {
    width:132px;
    margin-left:100px;
}
.footer-yi dl:nth-of-type(3) a:nth-of-type(2),.footer-yi dl:nth-of-type(3) a:nth-of-type(4),.footer-yi dl:nth-of-type(3) a:nth-of-type(6),.footer-yi dl:nth-of-type(3) a:nth-of-type(8),.footer-yi dl:nth-of-type(3) a:nth-of-type(10) {
    padding-left:30px;
}
.footer-yi dl dd strong {
    font-weight:normal;
    color:#ff9d00;
}
.footer-in a {
    color:#c2c2c2;
    font-size:12px;
    line-height:24px;
}
.footer-in dl dd a:hover {
    color:#ffffff;
}
/* .erweima {
    float:right;
    width:220px;
    height:127px;
    padding-right: 20px;
    margin-top:0;
}
.first {
    float:left;
}
.first span:nth-of-type(1),.second span:nth-of-type(1) {
    width:90px;
    height:90px;
    display:block;
}
.first span:nth-of-type(1) {
    background:url(./../assets/img/qrcode.jpg) no-repeat;
}
.second {
    float:right;
}
.second span:nth-of-type(1) {
    background:url(./../assets/img/qr_tejia3.png) no-repeat;
}
.first span:nth-of-type(2),.second span:nth-of-type(2) {
    line-height:37px;
} */
.erweima {
    float:right;
    width:220px;
    height:127px;
    margin-top:0;
    padding-right: 20px;
}
.first {
    float:left;
}
.first span:nth-of-type(1) {
    width:90px;
    height:90px;
    display:block;
    background:url(./../assets/img/qrcode.jpg) no-repeat;
}
.second {
    float:right;
}
.second span:nth-of-type(1) {
    width:90px;
    height:90px;
    display:block;
    background:url(./../assets/img/qr_tejia3.png) no-repeat;
}
.first span:nth-of-type(2),.second span:nth-of-type(2) {
    line-height:37px;
}
.footer-er {
    width:1000px;
    height:77px;
    text-align:center;
    margin-top:0;
}
.footer-er span {
    line-height:49px;
}
.xh {
    width:114px;
    margin:0 auto;
}
.xh a:nth-of-type(1) span,.xh a:nth-of-type(2) span,.xh a:nth-of-type(3) span {
    float:left;
    width:28px;
    height:28px;
    display:block;
    background:url(./../assets/img/mfw-footer-sprite4.png) no-repeat;
}
.xh a:nth-of-type(2) span,.xh a:nth-of-type(3) span {
    margin-left:15px;
}
.xh a:nth-of-type(2) span {
    background-position:-30px 0;
}
.xh a:nth-of-type(3) span {
    background-position:-60px 0;
}
.footer-san {
    width:980px;
    height:101px;
    border-top:1px solid #575a5b;
    margin:0 auto;
    margin-top:20px;
    padding:16px 0;
    box-sizing:border-box;
}
.footer-san a {
    display:inline-block;
    margin-right:0;
}
.footer-si {
    width:1000px;
    height:88px;
    border-top:1px solid #575a5b;
    padding-top:14px;
    box-sizing:border-box;
}
.z-logo {
    float:left;
    width:136px;
    height:39px;
    display:block;
    background:url(./../assets/img/mfw-footer-sprite4.png) no-repeat 0 -30px;
}
.z-shuoming {
    float:left;
    margin-left:20px;
}
.z-shuoming p span {
    color:#ff9d00;
}
.z-shuoming p a {
    color:#ff9d00;
}
.z-shuoming p a:hover {
    color:#ff9d00;
}
.z-cheng {
    float:right;
    width:190px;
    height:39px;
}
.xing {
    float:left;
    width:90px;
    height:39px;
    background:url(./../assets/img/mfw-footer-sprite4.png) no-repeat 0px -69px;
}
.ping {
    float:right;
    width:90px;
    height:39px;
    background:url(./../assets/img/mfw-footer-sprite4.png) no-repeat 0 -110px;
}
.kone li a.active{
  background: #ff9e00;
  color: #fff;
}
</style>