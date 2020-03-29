<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-04 11:49:35
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-04 14:35:24
 -->
<template>
  <div class="scenicRmd">
    <div >
        <div class="title">{{cityName}}热门景点</div>
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
        
        // self.cityCode = self.$route.query.cityCode;
        // self.cityName = self.$route.query.cityName;
    },
    watch: {
        // $route(){
        //     this.cityCode= this.$route.query.cityCode;
        // },
        // cityCode() {
        //     this.getList();
        // },
    },
    methods:{
        //获取列表
        getList(){
            let self = this;
            fetchList(
                self.listQuery.page,
                self.listQuery.size,
                self.cityCode
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
    .title{

    }
    .content{
        .cityName{
            text-align: center;
            font-size: 16px;
        }
    }
}


</style>
