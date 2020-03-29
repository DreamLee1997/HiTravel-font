<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-25 17:41:55
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-28 11:20:54
 -->
<template>
  <div class="hotelDetial">
    <div class="main">
      <div class="main-in">
        <div class="main-in-top">
          <div class="content">
            <a class="order" @click="handleBack">景区</a>>
            <a class="order">订门票</a>
          </div>
        </div>
        <div class="main-in-center" v-loading="scenicLoading">
          <div class="left">
            <img class="img" :src="'http://101.132.138.185:8080'+scenicInfo.img" alt />
          </div>
          <div class="right">
            <div class="hotelName">{{scenicInfo.scenicName}}</div>
            <span class="createTime">{{scenicInfo.createTime}}</span>
            <span class="addr">
              <svg-icon class="svg-icon" icon-class="location-1" />
              {{scenicInfo.provinceName}}·{{scenicInfo.cityName}}
            </span>
            <el-autocomplete
              v-model="mapLocation.address"
              :fetch-suggestions="querySearch"
              placeholder="请输入详细地址"
              style="width: 100%; display:none;"
              :trigger-on-focus="false"
              @select="handleSelect"
            />
            <div
              style="margin: 5px;
              border: 1px solid #99999996;
              border-radius: 2px;"
            >
              <baidu-map
                class="bm-view"
                :center="mapCenter"
                :zoom="mapZoom"
                :scroll-wheel-zoom="true"
                ak="baidu-ak"
                @ready="handlerBMap"
              />
            </div>
            <!-- <div id="allmap" ref="allmap" class="allmap" ></div> -->
            <!-- <div class="addrDetial">
              详细地址：
              <span>{{scenicInfo.provinceName}}省{{scenicInfo.cityName}}市{{scenicInfo.areaName}}区{{scenicInfo.streetName}}</span>
            </div>-->
          </div>
        </div>
        <div class="main-in-bottom">
          <!-- <div>
            <el-date-picker
              v-model="roomDaterange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              @change="changeDateOne"
              :picker-options="pickerBeginDateBefore"
              :default-time="['12:00:00', '13:00:00']"
            >></el-date-picker>
            <el-button type="primary" size @click="handleSearch">搜索</el-button>
          </div>-->
          <div class="table-container">
            <el-table
              ref="ticketTable"
              :data="ticketList"
              style="width: 100%"
              v-loading="listLoading"
            >
              <el-table-column label="门票名称" prop="ticketName" align="center"></el-table-column>
              <el-table-column label="原价格" prop="normalPrice" align="center"></el-table-column>
              <el-table-column label="折后价格" prop="sellPrice" align="center"></el-table-column>
              <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                  <p>
                    <el-button size="mini" type="primary" @click="handleOrder(scope.row)">预定</el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="确认订单信息" :visible.sync="editDialogVisible" width="616px">
      <el-form v-loading="isloading" :model="orderInfo" size="small" label-width="120px">
        <el-form-item label="预定时间：">
          <el-date-picker
            v-model="orderInfo.ticketTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            @change="changeDate"
            :picker-options="pickerBeginDateBefore"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-date-picker
            v-model="orderInfo.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            @input="changeClick"
            @change="changeDate"
            :picker-options="pickerBeginDateBefore"
            :default-time="['12:00:00', '13:00:00']"
          >></el-date-picker>-->
        </el-form-item>
        <el-form-item label="门票名称：">
          <span style>{{orderInfo.roomName}}</span>
        </el-form-item>
        <el-form-item label="门票单价：">
          <span style="font-size: 18px; color: red;">{{orderInfo.sellPrice}}¥/晚</span>
          <span style="text-decoration: line-through;">(原价{{orderInfo.normalPrice}}¥/晚)</span>
        </el-form-item>
        <el-form-item label="门票数量：">
          <el-select v-model="orderInfo.num" placeholder="请选择" @change="changeNum">
            <el-option
              v-for="item in numOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单总价：">
          <span style="font-size: 22px; color: red;">{{orderInfo.total}}¥</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleEditConfirm" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchScenic, queryTicket } from "@/api/scenic";
import { queryRoom, queryRoomByTime } from "@/api/hotel";
import { formatDate, generateFun } from "../../utils/date";
import { addOrder } from "@/api/order";
import BaiduMap from "vue-baidu-map/components/map/Map.vue";

export default {
  data() {
    return {
      scenicId: "",
      listLoading: false,
      scenicLoading: false,
      editDialogVisible: false,
      isloading: false,
      scenicInfo: {},
      arrlength: 1,
      //   defaultTimeValue:formatDate(new Date()),
      orderInfo: {
        ticketTime: '',
        // daterange: [],
        num: 1,
        total: 0
      },
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      mapZoom: 15,
      mapCenter: { lng: 0, lat: 0 },
      mapLocation: {
        address: undefined,
        coordinate: undefined
      },
      ticketList: [],
      numOptions: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        },
        {
          value: 5,
          label: "5"
        }
      ],
      pickerBeginDateBefore: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000;
        }
      }
    };
  },
  computed:{
      timeDefault() {
      var date = new Date();
      var s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
      return s1;
    }
  },
  components: {},
  created(){    
    //   this.orderInfo.ticketTime = new Date();
    //   console.log(this.orderInfo.ticketTime)
  },
  mounted() {
    let self = this;
    self.scenicLoading = true;
    // this.$nextTick(() => {
        this.$set(self.orderInfo, "ticketTime", this.timeDefault);
    //   });
    this.orderInfo.ticketTime = this.timeDefault;
    self.scenicId = self.$route.query.id;
    self.getScenicInfo();
    self.handleSearch();
    // self.map();
  },
  watch: {
    $route(to, from) {
      let self = this;
      if (self.$route.path === "/scenicDetial") {
        self.scenicId = self.$route.query.id;
        // this.$set(self.orderInfo, "ticketTime", this.timeDefault);
        this.orderInfo.ticketTime = this.timeDefault;
        self.getScenicInfo();
        self.handleSearch();
      }
    }
  },
  methods: {
    handlerBMap({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
        this.mapCenter.lng = this.mapLocation.coordinate.lng;
        this.mapCenter.lat = this.mapLocation.coordinate.lat;
        this.mapZoom = 15;
        map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate));
      } else {
        this.mapCenter.lng = 113.271429;
        this.mapCenter.lat = 23.135336;
        this.mapZoom = 10;
      }
    },
    querySearch(queryString, cb) {
      var that = this;
      var myGeo = new this.BMap.Geocoder();
      myGeo.getPoint(
        queryString,
        function(point) {
          if (point) {
            that.mapLocation.coordinate = point;
            that.makerCenter(point);
          } else {
            that.mapLocation.coordinate = null;
          }
        },
        this.locationCity
      );
      var options = {
        onSearchComplete: function(results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = [];
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i);
              var item = { value: x.address + x.title, point: x.point };
              s.push(item);
              cb(s);
            }
          } else {
            cb();
          }
        }
      };
      var local = new this.BMap.LocalSearch(this.map, options);
      local.search(queryString);
    },
    handleSelect(item) {
      var { point } = item;
      this.mapLocation.coordinate = point;
      this.makerCenter(point);
    },
    makerCenter(point) {
      if (this.map) {
        this.map.clearOverlays();
        this.map.addOverlay(new this.BMap.Marker(point));
        this.mapCenter.lng = point.lng;
        this.mapCenter.lat = point.lat;
        this.mapZoom = 15;
      }
    },
    //百度地图
    map() {
      let map = new window.BMap.Map(this.$refs.allmap); // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(
        new window.BMap.MapTypeControl({
          // 添加地图类型控件
          mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP]
        })
      );
      map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    },
    //改变总时间范围函数
    // changeDateOne(e) {
    //   if (e == null) {
    //     return false;
    //   }
    //   let start = new Date(this.roomDaterange[0]);
    //   let end = new Date(this.roomDaterange[1]);
    //   let day = (end - start) / (24 * 60 * 60 * 1000);
    //   self.arrlength = day;
    // },
    //改变入住时间，计算总价
    changeDate(e) {
      let total = 0;
      if (e == null) {
        return false;
      }
    //   let start = new Date(this.orderInfo.daterange[0]);
    //   let end = new Date(this.orderInfo.daterange[1]);
    //   let day = (end - start) / (24 * 60 * 60 * 1000);
    //   self.arrlength = day;
      total = this.orderInfo.sellPrice * this.orderInfo.num;
      this.orderInfo.total = total;
      this.$forceUpdate();
    },
    //更新房间数量的select视图，计算总价
    changeNum() {
      this.$forceUpdate();
      let start = new Date(this.orderInfo.daterange[0]);
      let end = new Date(this.orderInfo.daterange[1]);
      let day = (end - start) / (24 * 60 * 60 * 1000);
      this.orderInfo.total =
        day * this.orderInfo.sellPrice * this.orderInfo.num;
    },
    //修改时间戳
    changeClick(e) {
      let self = this;
      if (e == null) {
        return false;
      }
      this.$nextTick(() => {
        self.orderInfo.daterange = null;
        this.$set(self.orderInfo, "daterange", [e[0], e[1]]);
      });
    },
    //预定门票
    handleOrder(row) {
      let self = this;
      self.orderInfo = row;
      self.$set(self.orderInfo, "ticketTime", self.timeDefault);
      setTimeout(() => {
        self.changeDate(1);
      }, 300);
    //   self.$set(self.orderInfo, "daterange", self.roomDaterange);
    //   if (self.roomDaterange.length) {
    //     self.isloading = true;
    //     self.$set(self.orderInfo, "daterange", self.roomDaterange);
    //     setTimeout(() => {
    //       self.changeDate(1);
    //     }, 300);
    //     setTimeout(() => {
    //       this.isloading = false;
    //     }, 1000);
    //   }
      self.orderInfo.num = 1;
      self.editDialogVisible = true;
    },
    //确定完成订单
    handleEditConfirm() {
      let self = this;
      let dates = [];
      let ids = [];
      let nums = [];
      let types = [];
      for (let i = 0; i < arrlength; i++) {
        ids.push(self.orderInfo.roomId);
        nums.push(self.orderInfo.num);
        types.push(0);
      }
      dates = generateFun(
        new Date(self.orderInfo.daterange[0]),
        new Date(self.orderInfo.daterange[1])
      );
      let params = {
        dates: dates,
        ids: ids,
        nums: nums,
        types: types
      };
      this.$confirm("是否确认修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        addOrder(params).then(res => {
          this.$message({
            message: "预定成功",
            type: "success",
            duration: 1000
          });
          self.editDialogVisible = false;
          self.$router.push({ path: "/myHome/myOrder" });
        });
      });
    },
    //获取景区信息
    getScenicInfo() {
      let self = this;
      searchScenic(self.scenicId).then(res => {
        self.scenicInfo = res.data;
        self.scenicLoading = false;
        self.mapLocation.address =
          self.scenicInfo.provinceName + "省" + self.scenicInfo.cityName + "市";
        var myGeo = new this.BMap.Geocoder();
        myGeo.getPoint(
          self.mapLocation.address,
          function(point) {
            if (point) {
              self.mapLocation.coordinate = point;
              self.makerCenter(point);
            } else {
              self.mapLocation.coordinate = null;
            }
          },
          this.locationCity
        );
        this.$forceUpdate();
      });
    },
    //获取景区下的门票信息
    handleSearch() {
      let self = this;
      self.listLoading = true;
      queryTicket(
        self.scenicId,
        self.listQuery.pageNo,
        self.listQuery.pageSize
      ).then(res => {
        self.ticketList = res.data.records;
        self.listLoading = false;
        self.total = res.data.total;
      });
    },
    //返回上一页
    handleBack() {
      this.$router.push({ path: "/destination" });
    }
  },
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hotelDetial {
  .main {
    margin-top: 20px;
    .main-in {
      width: 1000px;
      margin: 0 auto;
      .main-in-top {
        .content {
          font-size: 18px;
          color: #f39901;
          .order {
            color: #f39901;
          }
          .order:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
      .main-in-center {
        display: flex;
        margin-top: 30px !important;
        .left {
          width: 500px;
          .img {
            width: 500px;
            height: 350px;
          }
        }
        .right {
          width: 500px;
          padding: 0px 20px;
          .hotelName {
            font-size: 24px;
            padding: 5px 0;
          }
          #allmap {
            height: 280px;
            overflow: hidden;
          }
          .addrDetial {
            padding: 5px 0;
          }
        }
      }
      .main-in-bottom {
        padding-top: 15px;
        .table-container {
          width: 800px;
        }
      }
    }
  }
}
#allmap /deep/ .BMap_cpyCtrl {
  display: none !important;
}
#allmap /deep/ .anchorBL {
  display: none !important;
}
.bm-view {
  // width: 100%;
  height: 265px;
}
.bm-view /deep/ .BMap_cpyCtrl {
  display: none !important;
}
.bm-view /deep/ .anchorBL {
  display: none !important;
}
</style>
