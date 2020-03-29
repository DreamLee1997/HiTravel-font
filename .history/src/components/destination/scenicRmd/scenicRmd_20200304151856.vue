<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-04 11:49:35
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-04 15:18:56
 -->
<template>
  <div class="scenicRmd">
    <div >
        <div class="bigTitle">{{cityInfo.cityName}}</div>
        <div class="title">热门景点推荐</div>
        <el-row class="content">
            <el-col style="width: 235px; margin-right: 15px;padding-bottom: 15px;" v-for="(o) in 8" :key="o" >
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                </el-card>
                <div class="cityName">namexiamen</div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import { queryProvince, queryCity } from "@/api/area";
import { fetchList } from "@/api/scenic";

export default {
    props:['cityInfo'],
    data () {
        return {
            activeName: 'second',
            listQuery:{
                page:1,
                size:10,
                cityCode:''
            },
            cityCode:'',
            cityName:''
        }
    },
    mounted: function (){
        let self = this;
        self.getList();
    },
    watch: {
    },
    methods:{
        //获取列表
        getList(){
            let self = this;
            fetchList(
                self.listQuery.page,
                self.listQuery.size,
                self.cityInfo.cityCode
            ).then(res => {
                console.log(res)
            });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.scenicRmd{
    .bigTitle{
        width: 1000px;
        margin-top: 30px;
        text-align: center;
        font-weight: normal;
        line-height: 26px;
        font-family: 微软雅黑;
        font-size: 26px;
        color: #333;
        // color: #fd9e00;
        // font-size: 30px;
        // font-weight: 500;
        // margin: 15px 0;
    }
    .title{
        color: #333;
        font-size: 18px;
        font-weight: 700;
        margin: 15px 0;
    }
    .content{
        .cityName{
            margin-top: 5px;
            color: #333;
            font-weight: 700;
            font-size: 14px;
            text-align: center;
        }
    }
}


</style>
