<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 12:32:48
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-05 13:20:51
 -->
<template>
  <div>
    
    <el-menu
        default-active="2"
        class="el-menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#fff"
        text-color="#000000"
        active-text-color="#ffd04b">
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
            </template>
            <el-menu-item-group>
            
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            
            <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
    </el-menu>
    
    酒店商户
  </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu{
    width: 200px
    
}
.is-active .el-menu-item .el-menu{
   background-color: #fd9e00 !important; 
   color: #fbfbfb;
} 
</style>
