<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-07 12:54:55
 -->
<template>
    <div class="app-container">
       <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店注册</span>
            <!-- <el-button
                class="btn-add"
                type="primary"
                @click="handleAddHotel"
                size="mini">
                提交
            </el-button> -->
        </el-card>
        <el-card class="main-container">
           
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            defaultOpends:['1','2'],
        }
    },
    methods: {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-container{
    padding: 0 10px;
    .operate-container{
        margin: 15px 0;
        .el-icon-tickets{
            font-size: large;
        }
        .el-button--mini{
            width: 70px !important;
            font-size: larger !important;
        }
    
    }
    .main-container{
        height: 660px;
        
    }
}
</style>
