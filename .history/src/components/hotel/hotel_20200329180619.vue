<template>
  <div class="hotel">
    <div class="main">
        <div class="main-in">
            <div class="main-in-top">
                <h4>订酒店</h4>
                <div class="sousuo">
                    <el-cascader 
                        ref="cascaderAddr" 
                        :props="props" 
                        v-model="listQuery.destination" 
                        placeholder="出行目的地">
                    </el-cascader>
                    <el-input v-model="listQuery.hotelName" placeholder="酒店名称"></el-input>
                    <el-button 
                        icon="el-icon-search" 
                        @click="handleSearch"
                        type="primary" 
                        size="mini"></el-button>
                </div>
            </div>
            <div class="main-in-bottom" >
                <div class="hotelRmd" v-loading="isloading">
                    <div v-if="isShow">
                        <div class="bigTitle">{{hotelList[0]?hotelList[0].cityName:''}}市</div>
                        <div class="title">热门酒店推荐</div>
                        <el-row class="content">
                            <el-col 
                                style="width: 235px; height:235px; margin-right: 15px;margin-top: 30px;" 
                                v-for="(hotelInfo, index) in hotelList" :key="index" >
                                <el-card :body-style="{ padding: '0px' }" @click.native="toDetail(hotelInfo.hotelId)">
                                    <img style="width: 235px; height:235px;" :src="'http://101.132.138.185:8080'+hotelInfo.img" class="image">
                                </el-card>
                                <div class="hotelName" @click="toDetail(hotelInfo.hotelId)">{{hotelInfo.hotelName}}</div>
                            </el-col>
                        </el-row>
                        <div class="pagination-container" style="margin-right: 15px;">
                            <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                layout="total, sizes,prev, pager, next,jumper"
                                :page-size="listQuery.size"
                                :page-sizes="[8]"
                                :total="total"
                            ></el-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-in-bottom">
                <div class="zhuti">
                    <h4>热门景区酒店</h4>
                    <div class="x-nav">
                        <el-tabs 
                            v-model="activeName" 
                            @tab-click="handleClick"
                            :stretch="true">
                            <el-tab-pane label="北京" name="first" ></el-tab-pane>
                            <el-tab-pane label="上海" name="second"></el-tab-pane>
                            <el-tab-pane label="广州" name="third"></el-tab-pane>
                            <el-tab-pane label="杭州" name="fourth"></el-tab-pane>
                            <el-tab-pane label="成都" name="fifth"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div style="clear:both;"></div>
                    <div class="youtu">
                        <ul >
                            <li v-for="(item,index) in cityList" :key="index"> 
                                <div class="nali" >
                                    <span>{{item.city}}</span>
                                    <span>{{item.country}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { queryProvince, queryCity } from "@/api/area";
import { fetchList } from "@/api/hotel";

export default {
  data () {
    return {
        activeName: 'second',
        hotelList:[],
        isShow:false,
        isloading:false,
        total:0,
        listQuery:{
            page:1,
            size:8,
            hotelName:'',
            cityCode:''
        },
        cityList:[{
                country:'英国',
                city:'伦敦'
            },{
                country:'法国',
                city:'巴黎'
            },{
                country:'新加坡',
                city:'新加坡'
            },{
                country:'法国',
                city:'巴黎'
            },{
                country:'英国',
                city:'伦敦'
            },{
                country:'新加坡',
                city:'新加坡'
            },],
        props: {
            lazy: true,
            lazyLoad(node, resolve) {
                const { level } = node;
                if (level === 0) {
                    queryProvince(1, 1000).then(response => {
                        let list = response.data.records;
                        const nodes = list.map(x => ({
                            value: x.provinceCode,
                            label: x.shortName,
                            leaf: level >= 1
                        }));
                        resolve(nodes);
                    });
                } else if (level === 1) {
                    queryCity(node.data.value, 1, 1000).then(response => {
                        let list = response.data.records;
                        const nodes = list.map(x => ({
                            value: x.cityCode,
                            label: x.shortName,
                            leaf: level >= 1
                        }));
                        resolve(nodes);
                    });
                }
            }
      },
    }
  },
    methods:{
        
        //搜索目的地酒店
        handleSearch(){
            let self = this;
            self.isloading = true;
            fetchList(
                self.listQuery.page,
                self.listQuery.size,
                self.listQuery.hotelName,
                self.listQuery.destination[1]
            ).then(res => {
                self.hotelList = res.data.records;
                if(self.hotelList.length){
                    self.isShow = true;
                }
                self.isloading = false;
                self.total = res.data.total;
            });
            
        },
        //跳转到详情页面
        toDetail(hotelId){
            let self = this;
            this.$router.push({ path: "/hotelDetial", query:{id:hotelId}});
        },
        //点击切换tab
        handleClick(tab, event) {
            if(tab.label === "广州"){
                this.cityList = [{
                    country:'新加坡',
                    city:'新加坡'
                },{
                    country:'新加坡',
                    city:'新加坡'
                },{
                    country:'新加坡',
                    city:'新加坡'
                },{
                    country:'法国',
                    city:'巴黎'
                },{
                    country:'英国',
                    city:'伦敦'
                },{
                    country:'新加坡',
                    city:'新加坡'
                },]
            }
        },
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.handleSearch();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.handleSearch();
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hotel{
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

.sousuo {
    width:1000px;
    height:50px;
    display: inline-block;
    .el-input{
        margin-right: 12px;
        width: 300px !important;
    }
    .el-input__inner{
        height: 48px !important;
        font-size: 16px;
    }
    .el-range-editor.el-input__inner{
        width: 400px !important;
        margin-right: 10px;
    }
    .el-date-editor .el-range-separator{
        line-height: 40px;
        font-size: 15px;
    }
    .el-range-editor .el-range-input{
        font-size: 16px;
    }
    .el-date-editor .el-range__icon{
        font-size: 18px;
    }
    .el-button--mini{
        font-size: 20px;
        height: 44px;
        .el-icon-search{
            font-weight: bolder !important;
        }
    }
}
//主题酒店
.main-in-bottom{
    margin-top:60px;
    .el-tabs__item{
        color: #666;
        font-size: 18px;
    }
    .hotelRmd{
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
            .hotelName{
                margin-top: 5px;
                color: #333;
                font-weight: 700;
                font-size: 14px;
                text-align: center;
            }
            .hotelName:hover{
                cursor:pointer;
                text-decoration:underline;
            }
    
        }
    }
}
.zhuti {
    width:1000px;
    text-align:center;
}
.zhuti h4 {
    height:80px;
    font-size:24px;
    line-height:80px;
}

.youtu {
    height:503px;
    overflow:hidden;
}
.youtu ul li {
    float:left;
    width:318px;
    height:240px;
    background:url(../../assets/img/wKgBs1dL9IuAGK6JAANBrENLW2052.jpeg) no-repeat;
    background-size:100% 100%;
    float:left;
    margin-top:19px;
}
.youtu ul li:nth-of-type(2) li {
    background:url(../../assets/img/yiyiyi.jpeg) no-repeat;
    background-size:100% 100%;
}
.youtu ul:nth-of-type(3) li {
    background:url(../../assets/img/wKgBs1dL9IuAV8rXAFrJyv-1p4c46.jpeg) no-repeat;
    background-size:100% 100%;
}
.youtu ul:nth-of-type(4) li {
    background:url(../../assets/img/wKgBs1dL-H6AOmv4AAIvGmxUHPw48.jpeg) no-repeat;
    background-size:100% 100%;
}
.youtu ul:nth-of-type(5) li {
    background:url(../../assets/img/wKgBs1dL-H6AdJU1AAT5Wd6Lvds54.jpeg) no-repeat;
    background-size:100% 100%;
}
.youtu ul:nth-of-type(6) li {
    background:url(../../assets/img/wKgBs1dL9MGAW6v3ABiEmHUWRLU33.jpeg) no-repeat;
    background-size:100% 100%;
}
.youtu ul li:nth-of-type(2),.youtu ul li:nth-of-type(3),.youtu ul li:nth-of-type(5),.youtu ul li:nth-of-type(6) {
    margin-left:23px;
}
.nali {
    width:318px;
    height:240px;
    background:rgba(0,0,0,0.3);
    font-size:24px;
    color:#fff;
    font-family:å¾®è½¯é›…é»‘;
    padding-top:100px;
    text-align:center;
    box-sizing:border-box;
}
.nali span:nth-of-type(1) {
    display:block;
}
.nali span:nth-of-type(2) {
    display:block;
    font-size:14px;
}
.zhuti:nth-of-type(2) {
    margin-top:50px;
}
</style>
