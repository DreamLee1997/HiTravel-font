<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-04 11:49:35
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-04 13:45:28
 -->
<template>
  <div class="scenicRmd">
    <div>
        {{}}热门景点
        <el-row>
            <el-col  v-for="(o) in 2" :key="o" >
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                </el-card>
                <div><span>namexiamen</span></div>
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
            cityCode:''
        }
    },
    mounted: function (){
        let self = this;
        self.cityCode= self.$route.query.cityCode;
    },
    watch: {
        $route(){
            this.cityCode= this.$route.query.cityCode;
        },
        cityCode() {
            this.getList();
        }
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
<style lang="scss">
.scenicRmd{
    .main {
        margin-top:20px;
        .main-in {
            width:1000px;
            margin:0 auto;
            .main-in-top h4 {
                width:1000px;
                height:110px;
                font-size:24px;
                line-height:110px;
            }
        }
    }
}


</style>
