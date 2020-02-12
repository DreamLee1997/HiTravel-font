<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-04 10:19:51
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
    mounted(){
      console.log(this.$route.meta.keepAlive);
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
