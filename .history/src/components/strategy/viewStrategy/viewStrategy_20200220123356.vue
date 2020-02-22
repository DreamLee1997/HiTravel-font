<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-20 09:38:03
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-20 12:33:55
 -->
<template>
    <div class="srategy-container">
        <div style="margin: 20px 160px 0 160px;">
            <div class="title"><h1>{{strategyInfo.title}}</h1></div>
            <div class="bottom clearfix"></div>
            <div>
                <span>{{userName}}</span>
                <span>{{strategyInfo.createTime}}</span>
                <span>{{strategyInfo.cityName}}</span>
            </div>
            <div v-html="strategyInfo.content"></div>
           
                
        </div>
    </div>
</template>

<script>
import { queryArticleById } from "@/api/strategy";
import { mapGetters } from "vuex";

export default {
    name: "wirteStrategy",
    data() {
        return {
            strategyId:'',
            strategyInfo: {
                content:''
                // content:
                //   '<p>sddsdadsa</p><p><br></p><p>dssdaa</p><p><br></p><p><br></p><p><img src="http://101.132.138.185:8080//img/adb07f25-f57b-4c2c-8111-e26819b80272.jpeg"></p><p><br></p><h3>Sddas的</h3>'
            },
            cityCode: [],
            userName: "",
        };
    },
    computed: {
        ...mapGetters(["name"])
    },
    mounted() {
        let self = this;
        this.$nextTick(function() {
            this.userName = this.name;
        });
        self.strategyId = self.$route.query.id;
        queryArticleById(self.strategyId).then(res => {
            self.strategyInfo = res.data
        });
    },
    methods: {
    
        
    }
};
</script>

<style lang="scss" scoped>
@charset "utf-8";
.srategy-container {
    padding: 20px 40px;
    .title{
        float: left;
        width: 580px;
        line-height: 35px;
        overflow: hidden;
        font-size: 24px;
        color: #a6551f;
        font-weight: normal;
    }
}

</style>
