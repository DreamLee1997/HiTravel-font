<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-04 11:49:35
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-04 13:00:00
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
            
        }
    },
    mounted(){
        let self = this;
        self.getList();
        
    },
    watch: {
        '$route.query': function (newVal, oldVal) {
            console.log(newVal)
            // if (newVal === '/login') {
            //     console.log('欢迎进入登录页面');
            // }
        }
    },
    methods:{
        //获取列表
        getList(){
            let self = this;
            console.log(self.$route.query.cityCode)
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
