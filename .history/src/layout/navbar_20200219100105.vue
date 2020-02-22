<template>
    <div id="navbar">
        <div class="header">
            <div class="header-in">
                <div class="logo" >
                    <h1><a href="http://localhost:8080/#/index" title="蚂蜂窝自由行">
                        <img src="./../assets/img/header-logo1.png" width="120" height="50" alt="" />
                    </a></h1>
                </div>
                <div class="nav">
                    <ul class="kone">
                        <li><router-link to="/index" active-class="active">首页</router-link></li>
                        <li><router-link to="/destination" active-class="active">目的地</router-link></li>
                        <li><router-link to="/strategy" active-class="active">
                            <!-- <strong>NEW</strong> -->
                        旅游攻略</router-link></li>
                        <li><router-link to="/hotel" active-class="active">酒店</router-link></li>
                        <li class="free"><router-link to="/shop" active-class="active">自由行商城</router-link></li>
                    </ul>
                </div>
                <div class="activity"><a href=""><img src="./../assets/img/header-walk.gif" width="115" height="57" alt="" /></a></div>
                <div v-if="!isLogin" class="lar" >
                    <a ></a>
                    <a ></a>
                    <a ></a>
                    <a @click="toLogin">登录</a>
                    <a >|</a>
                    <a @click="toRegister">注册</a>
                </div>
                <div v-else class="lar" >
                    <span>欢迎</span>
                    <span >{{userName}}</span>
                    <span>登陆</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Navbar',
    data(){
        return {
            userName:'',
            isLogin:false,
            // logoImg:require('./../assets/img/header-logo2.png'),
        }
        
    },
    computed: {
        ...mapGetters(['name'])
    },
    mounted(){
        this.$nextTick(function(){
            this.userName = this.name;
            if(this.userName){
                this.isLogin = true;
            }
        });
    },
    methods:{
        toLogin(){
            console.log('登陆');
            this.$router.push({path:'/login'});
            // let routes = this.$router.resolve({ path: '/login'  });
            // window.open(routes.href, '_blank');

        },
        toRegister(){
            console.log('注册');
            this.$router.push({path:'/register'});
        },
    }
    
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
fieldset,img {
    border:0;
}
ol,ul {
    list-style:none;
}
h1,h2,h3,h4,h5,h6 {
    font-size:100%;
}
.kone{
    font-size: 15px;

}
em {
    font-style:normal;
}
button,select,textarea {
    outline:none;
}
input {
    border:0;
}
textarea {
    resize:none;
}
a {
    color:#333333;
    text-decoration:none;
}
a:hover {
    color:#ff9d00;
    text-decoration:none;
}
img {
    display:block;
    border:none;
}
.hot {
    color:#ff9d00 !important;
}
.header{
    height:59px;
    border-bottom:1px solid #d6d6d6;
    box-sizing:border-box;
}
.header-in{
    width:1000px;
    height:58px;
    margin:0 auto;
    /* padding-top:13px; */
    box-sizing:border-box;
}
/*logo*/
.logo{
    float:left;
    width:118px;
    height:32px;
    padding-top: 10px;
}
/*nav*/
.nav{
    float:left;
    height:58px;
    margin-left:43px;
    /* margin-top:-13px; */
}
.nav>ul{
    height:56px;
    line-height:56px;
}
.nav>ul>li{
    float:left;
    height:56px;
}
.nav>ul>li>a{
    height:56px;
    display:inline-block;
    padding:0 14px;
}
.nav strong{
    color:#ef523d;
    margin-right:4px;
}
.nav span{
    width:0;
    height:0;
    display:inline-block;
    border-width:4px;
    border-color:#666666 transparent transparent transparent;
    border-style:solid dashed dashed dashed;
    overflow:hidden;
    margin-left:3px;
    vertical-align:middle;
}
.nav>ul>li>a{
    height:59px;
    line-height:56px;
}
.xl{
    width:110px;
    border:1px solid #c9c9c9;
    border-top:0px;
    background-color:rgba(255,255,255,0.95);
    line-height:40px;
    position:absolute;
    z-index:999;
    display:none;
    margin-top:1px;
}
.xl li:hover{
    background:#efefef;
}
.xl li a:hover{
    color:#333333;
}
.xl li a{
    margin-left:16px;
}
.xlt{
    width:220px;
    border:1px solid #c9c9c9;
    border-top:0;
    background-color:rgba(255,255,255,0.95);
    line-height:40px;
    margin-top:-1px;
    position:absolute;
    z-index:999;
    display:none;
}
.xlt li a{
    margin-left:16px;
    margin-right:16px;
}
.zxlo{
    float:left;
    font-size:14px;
    line-height:65px;
}
.zxlt{
    float:right;}
.activity{
    float:left;
    margin-left:45px;
}
.lar{
    float:right;
    padding-top: 17px;
    
}
.lar span::nth-of-type(1){
    font-size: 16px;
}
.lar span::nth-of-type(2){
    font-size: 20px;
    padding: 0 10px;
    color: #fd9e00;
}
.lar span::nth-of-type(3){
    font-size: 16px;
}
.lar a{
    float:left;
    margin-left:9px;
    font-size:14px;
    color:#ff9d00;
    line-height:26px;
    text-decoration : none;
}
.lar a:nth-of-type(1){
    width:26px;
    height:26px;
    display:block;
    background:url(./../assets/img/header-sprites11.png) 0 -50px no-repeat;
}
.lar a:nth-of-type(1):hover{
    background-position:0 -80px;
}
.lar a:nth-of-type(2){
    width:26px;
    height:26px;
    display:block;
    background:url(./../assets/img/header-sprites11.png) -30px -50px no-repeat;
}
.lar a:nth-of-type(2):hover{
    background-position:-30px -80px;
}
.lar a:nth-of-type(3){
    width:26px;
    height:26px;
    display:block;
    background:url(./../assets/img/header-sprites11.png) 0 -165px no-repeat;
}
.lar a:nth-of-type(3):hover{
    background-position:-30px -165px;
}
.lar a:nth-of-type(4):hover,.lar a:nth-of-type(6):hover{
    text-decoration:underline;
}
.lar a:nth-of-type(5){
    color:#c9c9c9;
}
</style>
