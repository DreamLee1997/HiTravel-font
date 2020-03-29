<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-04 11:49:35
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-04 12:25:55
 -->
<template>
  <div class="scenicRmd">
    <!-- <div class="main">
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
                    <el-button 
                        icon="el-icon-search" 
                        @click="handleSearch"
                        type="primary" 
                        size="mini"></el-button>
                </div>
            </div>
            <div class="main-in-bottom">
            </div>
        </div>
    </div> -->
    niasfnkdks
  </div>
</template>

<script>
import { queryProvince, queryCity } from "@/api/area";
import { fetchList } from "@/api/hotel";

export default {
  data () {
    return {
        activeName: 'second',
        listQuery:{
            page:1,
            size:10,
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
            fetchList(
                self.listQuery.page,
                self.listQuery.size,
                self.listQuery.hotelName,
                self.listQuery.cityCode
            ).then(response => {
                self.tableData = response.data.records;
                self.total = response.data.total;
                self.tableData.forEach(ele => {
                        let imgUrl = ''
                        ele.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                        imgUrl =  capture;
                        });
                        let reg = /<\/?.+?\/?>/g;
                        let filterStr = ele.content.replace(reg,'')
                        // let filterStr =  ele.content.replace(/<\s?img[^>]*>/gi,'')
                        // filterStr = filterStr.replace(/<\s?br[^>]*>/gi,'')
                        Object.assign(ele, {['imgUrl']: imgUrl});  
                        Object.assign(ele, {['filterStr']: filterStr});  
                });
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
