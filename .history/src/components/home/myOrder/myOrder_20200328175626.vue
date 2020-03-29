<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-24 17:01:00
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-28 17:56:26
 -->
<template>
    <div class="myOrder" >
        <el-tabs type="border-card">
            <el-tab-pane label="全部订单" name="a">
                <order-list :tabType="[null,null]"></order-list>
            </el-tab-pane>
            <el-tab-pane label="酒店订单" name="b">
                <order-list :tabType="[null,0]"></order-list>
            </el-tab-pane>
            <el-tab-pane label="门票订单" name="c">
                <order-list :tabType="[null,1]"></order-list>
            </el-tab-pane>
            <el-tab-pane label="已预定" name="d">
                <order-list :tabType="[0,null]"></order-list>
            </el-tab-pane>
            <el-tab-pane label="已取消" name="e">
                <order-list :tabType="[1,null]"></order-list>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { queryMyStrategy, deleteStrategy } from "@/api/strategy";
import orderList from '../../../components/table-containter/orderList'
export default {
    data() {
        return {
        };
    },
    components:{
        'order-list':orderList
    },

    mounted() {
    },
    methods: {
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.myOrder{
}
</style>