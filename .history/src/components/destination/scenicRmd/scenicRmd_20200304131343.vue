<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-04 11:49:35
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-04 13:13:43
 -->
<template>
  <div class="scenicRmd">
    
    niasfnkdks
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
        // console.log(this.$route.query.cityCode)
        // this.cityCode= this.$route.query.cityCode;
        // self.getList();
    },
    watch: {
        $route(){
            this.cityCode= this.$route.query.cityCode;
        },
        cityCode() {
            this.getList();
            console.log("重新请求" + this.cityCode + "的数据")
        }
    },
    methods:{
        //获取列表
        getList(){
            let self = this;
            // console.log(self.$route.query.cityCode)
            // fetchList(
            //     self.listQuery.page,
            //     self.listQuery.size,
            //     self.$route.query.cityCode
            // ).then(res => {
            //     console.log(res)
            // });
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
