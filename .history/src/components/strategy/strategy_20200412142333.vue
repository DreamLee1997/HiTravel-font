<template>
  <div class="strategy">
    <div class="main">
      <div class="main-in">
        <div class="main-in-top clearfix">
          <div class="main-in-top-l">
            <div class="nav-xuan">
              <div class="xuan">
                <ul>
                  <li v-for="(item,index) in typeItem" :key="index">
                    <a>
                      {{item}}
                      <span></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="main-in-top-r">
            <el-carousel trigger="click" height="340px" width="701px">
              <el-carousel-item v-for="(item, index) in carouselImg" :key="index">
                <img :src="item" alt />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="main-in-buttom">
          <div class="main-in-buttom-l">
            <div class="daohang">
              <h4>旅游攻略导航</h4>
              <div class="sou clearfix">
                    <el-input
                         style="width: 95%;"
                         type="text"
                         v-model="searchCtiy"
                         placeholder="关键字搜索">
                         <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch(1)"></i>
                    </el-input>
               </div>
            </div>
            <div class="xzw">
              <ul>
                <div>热门城市攻略推荐</div>
                <li v-for="(item, index) in hotCity" :key="index">
                  <span>{{index + 1}}</span>
                  <a @click="handleSearch(2, item)">{{item}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="main-in-buttom-r">
               <h4>推荐攻略 -> {{itemCity}}</h4>
               <el-table
                    :data="tableData"
                    :show-header="false"
                    v-loading="isloading"
                    style="width: 100%; margin-top: 20px" 
                    @row-click='handleRowClick'  >
                    <el-table-column prop="img" width="250">
                         <template slot-scope="scope">
                         <img :src="scope.row.imgUrl" alt  width="250" height="180" />
                         </template>
                    </el-table-column>
                    <el-table-column label="姓名">
                    <template slot-scope="scope">
                         <div style="height: 195px;">
                         <div class="table-title">{{scope.row.title}}</div>
                         <div class="table-second">
                              <span class="bottom-span" >
                                   <span>作者：{{scope.row.username}}</span>
                              </span>
                              <span class="bottom-span" >
                                   <span>{{scope.row.createTime}}</span>
                              </span>
                              <span class="bottom-span" >
                                   <svg-icon class="svg-icon" icon-class="location" />
                                   <span>{{scope.row.cityName}}</span>
                              </span>
                         </div>
                         <div>
                              <p class="table-content" v-html="scope.row.filterStr"></p>
                         </div>
                         <div class="table-bottom" >
                              <span class="bottom-span" style="margin-left: 4px;">
                                   <svg-icon class="svg-icon" icon-class="praise"/>
                                   {{scope.row.praise}}
                              </span>
                              <span class="bottom-span" >
                                   <svg-icon class="svg-icon" icon-class="collection"  />
                                   {{scope.row.collection}}
                              </span>
                              <span class="bottom-span" >
                                   <svg-icon class="svg-icon" icon-class="view" />
                                   {{scope.row.view}}
                              </span>
                         </div>
                         </div>
                    </template>
                    </el-table-column>
               </el-table>
               <div class="pagination-container">
                    <el-pagination
                         background
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         layout="total, sizes,prev, pager, next,jumper"
                         :page-size="listQuery.size"
                         :page-sizes="[5,10,15]"
                         :total="total"
                    ></el-pagination>
               </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/strategy'

const defaultListQuery = {
  cityName: '杭州', //非必传
  page: 1,
  size: 10,
  status: 1, //0-未审核,1-已审核，不传全部攻略
  type: 1 //0-最新 1-点赞数 ,必传
};

export default {
     data() {
          return {
               isloading:false,
               carouselImg: [
                    require("./../../assets/img/01.jpeg"),
                    require("./../../assets/img/02.jpeg"),
                    require("./../../assets/img/03.jpeg"),
                    require("./../../assets/img/04.jpeg")
               ],
               itemCity:'杭州',
               searchCtiy: "",
               typeItem: [
                    "热门旅游攻略排行榜",
                    "初夏目的地精选",
                    "热门旅游地推荐",
                    "漫游桃花源",
                    "奔向海岛",
                    "主题推荐"
               ],
               hotCity: [
                    "杭州",
                    "上海",
                    "舟山",
                    "北京",
                    "成都",
                    "厦门",
               ],
               listQuery: Object.assign({}, defaultListQuery),
               total:null,
               tableData:[]
          };
     },
     mounted(){
          this.getList();
     },
     methods:{
          //搜索处理
          handleSearch(flag, item){
               let self = this;
               if( flag === 1 ){
                    self.itemCity = self.searchCtiy
                    self.listQuery.cityName = self.searchCtiy;
               } else {
                    self.itemCity  = item
                    self.listQuery.cityName = item;
               }
               self.getList();
          },
          //点击跳转到攻略详情。
          handleRowClick(row,column){
               let self = this;
               //打开新的标签页
               let routeUrl = this.$router.resolve({
                    path: "/viewStrategy",
                    query: {id: row.articleId}
               });
               window.open(routeUrl.href, '_blank')
          },
          //获取初始城市的攻略列表
          getList(){
               let self = this;
               self.isloading = true;
               //请求数据
               fetchList(
                    self.listQuery.page,
                    self.listQuery.size,
                    self.listQuery.type,
                    self.listQuery.status,
                    self.listQuery.cityName
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
                    self.isloading = false;
               });
          },
          handleSizeChange(val) {
               this.listQuery.size = val;
               this.getList();
          },
          handleCurrentChange(val) {
               this.listQuery.page = val;
               this.getList();
          },
     }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.strategy{
     .table-title{
        font-size: 24px;
        color: #fd9e00;
        padding: 10px 3px 2px 0;
    }
    .table-content{
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        padding: 5px 5px 0px 2px;
        width: 430px;
        font-size: 15px;
    }
    .table-second{
        color: #959897;
        margin-left: 5px;
        .bottom-span {
            font-size: 12px;
            margin-right: 17px;
            .svg-icon {
                width: 14px;
                height: 22px;
                padding-top: 10px;
                margin-right: 2px;
            }
        }
    }
    .table-bottom {
        color: #959897;
        position: absolute;
        bottom: 15px;
        .bottom-span {
            font-size: 12px;
            margin-right: 17px;
            .svg-icon {
                width: 14px;
                height: 22px;
                padding-top: 10px;
                margin-right: 2px;
            }
        }
    }
}
/*main*/
.main {
  padding-top: 15px;
  border-top: 2px solid #f0f0f0;
  box-sizing: border-box;
}
.main-in {
  width: 1000px;
  margin: 0 auto;
}
.el-input /deep/ .el-input__icon{
     font-size: 22px !important;
     font-weight: bolder !important;
     color: #fd9e00 !important;
}
/*main-shang*/
.main-in-top {
  width: 1000px;
  height: 340px;
}
/*left*/
.main-in-top-l {
  float: left;
  width: 260px;
  height: 340px;
  box-sizing: border-box;
}
.nav-xuan {
  position: relative;
}
.xuan ul li {
  width: 260px;
  height: 42px;
  background: #fff;
  border: 1px solid #dddddd;
  padding-left: 16px;
  box-sizing: border-box;
  line-height: 40px;
  margin-bottom: -1px;
  position: relative;
}
.xuan ul li a {
  width: 260px;
  height: 42px;
  display: block;
  font-size: 14px;
  color: #666666;
}
.xuan ul li a:hover {
  color: #ff9d00;
}
.xuan ul li a:hover span {
  background-position: -30px -40px;
}
.xuan ul li span {
  width: 6px;
  height: 10px;
  display: inline-block;
  background: url(../../assets/img/new-gl-icon4.png) no-repeat -20px -40px;
  position: absolute;
  right: 15px;
  top: 15px;
}
.main-in-top-l input {
  outline: 0;
  border: 0;
  width: 260px;
  height: 44px;
  border: 2px solid #ffa800;
  padding-left: 45px;
  box-sizing: border-box;
  color: #bfbfbf;
  margin-top: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/*right*/
.main-in-top-r {
  float: right;
  width: 701px;
  height: 340px;
}
/*main-xia*/
.main-in-buttom {
  width: 1000px;
  margin-top: 13px;
}
/*main-xia-zuo*/
.main-in-buttom-l {
  float: left;
  width: 260px;
  height: 400px;
}
.daohang h4 {
  height: 54px;
  font-size: 20px;
  line-height: 54px;
}
.xzw {
  width: 160px;
  padding-top: 15px;
}
.xzw ul {
     padding-left: 5px;
}
.xzw ul li {
  line-height: 42px;
  color: #333333;
}
.xzw ul div {
  padding: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: #ff9d00;
}
.xzw ul li span {
  font-size: 16px;
  color: #ff9d00;
  margin-right: 11px;
  font-weight: bold;
  display: inline-block;
}
.xzw ul li a {
  font-size: 14px;
  color: #ff9d00;
  margin-right: 11px;
}
.xzw ul li a:hover {
  text-decoration: underline;
}
/*main-xia-you*/
.main-in-buttom-r {
  float: right;
  width: 705px;
}
.main-in-buttom-r h4 {
  height: 55px;
  line-height: 54px;
  font-size: 20px;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
}
</style>
