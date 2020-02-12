<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 12:32:48
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-05 15:19:30
 -->
<template>
    <div class="app-wapper">
        <el-row >
            <el-col  >
                <div class="userInfo">
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
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="goTo('/hotelBusiness/myHotel')">我的酒店</el-menu-item>
                            <el-menu-item index="1-2" @click="goTo('/hotelBusiness/regHotel')">注册酒店</el-menu-item>
                        </el-menu-item-group>
                        <!-- <el-submenu index="1-3">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-3-1">选项1</el-menu-item>
                        </el-submenu> -->
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title1">房间管理</span>
                        </template>
                         <el-menu-item-group>
                            <el-menu-item index="2-1" @click="goTo('/roomList')">房间列表</el-menu-item>
                            <el-menu-item index="2-2" @click="goTo('/roomMgt')">房间管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row> 
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data () {
        return {
            defaultOpends:['1','2'],
        }
    },
    mounted(){
        this.goTo('/hotelBusiness/myHotel');
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        goTo(toPath) {
            this.$router.push({path:toPath});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-wapper{
    position: relative;
    height: 100%;
    width: 100%;
}
.el-menu{
    width: 200px;
}
.el-menu-item.is-active{
   background-color: #fd9e00 !important; 
   color: #fbfbfb !important;
} 
.el-submenu .el-menu-item{
    min-width: 199px !important;
}
.userInfo{
    width: 200px;
    height: 200px;
    background-color: #fbfbfb;
}
.el-aside {
    display: block;
    position: relative;
    overflow-y: scroll;
    background-color: #324157 !important;
}
/* .el-col-12{
  width: 15%;
} */
</style>
