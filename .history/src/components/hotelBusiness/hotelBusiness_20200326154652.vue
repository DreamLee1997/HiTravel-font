<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 12:32:48
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-26 15:46:52
 -->
<template>
    <div class="app-wapper">
        <el-row >
            <el-col >
                <div class="userInfo">
                    <el-card :body-style="{ padding: '0px',}">
                        <img src="./../../assets/img/wKgB4lNnkPCAX0-3AAI_PDTg8TQ20.jpeg" class="image">
                    </el-card>
                    <p class="userName">{{userName}}</p>
                </div>
                <el-menu
                    default-active="1-1"
                    class="el-menu"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#fbfbfb"
                    text-color="#000000"
                    :default-openeds="defaultOpends"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>酒店管理</span>
                        </template>
                            <el-menu-item index="1-1" @click="goTo('/hotelBusiness/myHotel')">我的酒店</el-menu-item>
                            <el-menu-item index="1-2" @click="goTo('/hotelBusiness/regHotel')">注册酒店</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title1">房间管理</span>
                        </template>
                            <!-- <el-menu-item index="2-1" @click="goTo('/hotelBusiness/roomMgt')">房间列表</el-menu-item> -->
                            <el-menu-item index="2-2" @click="goTo('/hotelBusiness/roomMgt')">房间列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3" >
                        <template slot="title">
                            <i class="el-icon-switch-button"></i>
                            <span slot="title">设置</span>
                        </template>
                            <el-menu-item index="3-1" @click="toLogin">退出登录</el-menu-item>

                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row> 
        <div class="main-container"><router-view></router-view></div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            defaultOpends:['1','2'],
            userName:'',
        }
    },
    computed: {
        ...mapGetters(['name'])
    },
    created(){
    },
    mounted(){
        this.$nextTick(function(){
            this.userName = this.name;
        });
        this.goTo('/hotelBusiness/myHotel');
    },
    methods: {
        toLogin(){
            let self = this;
            this.$router.push({path:'/login'});
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        goTo(toPath) {
            this.$router.push({path:toPath});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-wapper{
    position: relative;
    height: 100%;
    width: 100%;
    .el-row{
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
        .el-menu{
            width: 200px;
            border-right: solid 0px #e6e6e6 !important;
        }
        .el-menu-item{
            padding-left: 53px !important;
        }
        .el-menu-item.is-active{
            background-color: #fd9e00 !important; 
            color: #fbfbfb !important;
        } 
        .userInfo{
            width: 200px;
            height: 175px;
            text-align: center;
            font-size: 18px;
            padding-top: 5px;
            background-color: #fbfbfb !important;
            .el-card{
                width: 120px;
                height: 120px;
                position: absolute;
                left:50%;
                margin-top: 5px;
                margin-left:-60px;
                border-radius: 60px;
                border: 2px solid #f5f7fa;
                .image{
                    width: 120px;
                    height: 120px;
                }
            }
            .el-card.is-always-shadow {
                -webkit-box-shadow: 0 2px 12px 0 rgba(82, 81, 81, 0.4);
                box-shadow: 0 2px 12px 0 rgba(82, 81, 81, 0.4);
            }
           
        }
        .userName{
            width: 200px;
            height: 33px;
            padding: 140px 0 5px 0px;
        }
    }
    .main-container{
       padding: 10px 20px;
    }
}


</style>
