<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-06 13:08:38
 -->

<template>
  <div id="app">
    <div v-if="!$route.meta.keepAlive">
            <!-- nav -->
            <navbar></navbar>
            <div class="clear"></div>
            <!-- content -->
            <div class="clearfix">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
            <!-- footer -->
            <Footer></Footer>
        </div>
        <!-- 登陆注册页面不带navbar和footer -->
        <router-view v-if="$route.meta.keepAlive"></router-view>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Navbar from './layout/navbar.vue'
import Footer from './layout/footer.vue'
  export default {
    name: 'App',
    components: {
        Navbar,
        Footer,
    },
    // created () {
    //     //在页面加载时读取sessionStorage里的状态信息
    //     if (sessionStorage.getItem("store") ) {
    //         this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    //     } 

    //     //在页面刷新时将vuex里的信息保存到sessionStorage里
    //     window.addEventListener("beforeunload",()=>{
    //         sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    //     })
    // },
    mounted(){
      
    },
    methods:{
        
    }
  }
</script>

<style>
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
.clearfix:before,.clearfix:after {
    content:"";
    display:table;
}
.clearfix:after {
    clear:both;
}
.clearfix {
    *zoom:1;
}
</style>
