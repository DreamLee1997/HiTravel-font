<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 11:13:51
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-21 14:33:16
 -->
<template>
  <div class="myFavorite">
        <el-row>
            <el-col :span="24" v-for="(item, index) in strategyList" :key="index" >
                <el-card :body-style="{ padding: '0px', display: 'flex'}">
                    <img :src="item.imgUrl" class="image" @click="handleView(item.articleId)">
                    <div class="content-r" >
                        <a class="title" @click="handleView(item.articleId)">{{item.title}}</a>
                        <div v-html="item.filterStr" class="filterContent">
                            {{item.filterStr}}
                        </div>
                        <div class="bottom clearfix">
                            <span>
                                <i class="el-icon-location-information" style="color:#909399"></i>
                            {{item.cityName}}</span>
                            <time class="time" >{{ item.createTime }}</time>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { queryMyCollection } from "@/api/strategy";

export default {
    data() {
        return {
            strategyList:[],
            queryInfo: {
                status: "",
                pageNo: 1,
                pageSize: 10
            }
        };
    },

    mounted() {
        this.getList();
    },
    methods: {
        
        //获取攻略列表
        getList() {
            let self = this;
            queryMyCollection().then(res => {
                self.strategyList = res.data
                self.strategyList.forEach(ele => {
                    let imgUrl = ''
                    ele.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                        imgUrl =  capture;
                    });
                    // let reg = /<\/?.+?\/?>/g;
                    // let filterStr = ele.content.replace(reg,'')
                    let filterStr =  ele.content.replace(/<\s?img[^>]*>/gi,'')
                    filterStr = filterStr.replace(/<\s?br[^>]*>/gi,'')
                    // console.log(filterStr)
                    Object.assign(ele, {['imgUrl']: imgUrl});  
                    Object.assign(ele, {['filterStr']: filterStr});  
                });
            });
        },
        //查看攻略
        handleView(id){
            // //打开新的标签页
            let routeUrl = this.$router.resolve({
                path: "/viewStrategy",
                query: {id:id}
            });
            window.open(routeUrl.href, '_blank')
        },
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-card.is-always-shadow{
    width: 880px;
    margin: 20px 0 0 40px;
}
.image{
    width: 580px;
    height: 300px;
    cursor:pointer;
   
}
.content-r{
    padding: 14px;
    width: 290px;
    height: 300px;
    position: relative;
    .title{
        font-size: 22px;
        color: #fd9e00;
        font-weight: bold;
    }
    a:hover{text-decoration:underline;}
    .filterContent{
        padding: 15px 0;
        font-size: 14px;
    }
    .bottom{
        position: absolute;
        width: 300px;
        bottom: 20px;
        font-size: 16px;
        color: #818386;
        .el-icon-location-information{
            margin: 0 2px;
        }
        .time{
            margin: 0 8px;
        }
    }
}

</style>