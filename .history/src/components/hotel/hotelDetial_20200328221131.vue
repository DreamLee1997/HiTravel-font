<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-20 17:14:17
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-28 22:11:31
 -->
<template>
  <div class="hotelDetial">
    <div class="main">
      <div class="main-in">
        <div class="main-in-top">
          <div class="content">
            <a class="order" @click="handleBack">订酒店</a>>
            <a class="order">订房间</a>
          </div>
        </div>
        <div class="main-in-center" v-loading="hotelLoading">
          <div class="left">
            <img class="img" :src="'http://101.132.138.185:8080'+hotelInfo.img" alt />
          </div>
          <div class="right">
            <div class="hotelName">{{hotelInfo.hotelName}}</div>
            <span class="createTime">{{hotelInfo.createTime}}</span>
            <span class="addr">
              <svg-icon class="svg-icon" icon-class="location-1" />
              {{hotelInfo.provinceName}}·{{hotelInfo.cityName}}
            </span>
            <el-autocomplete
              v-model="mapLocation.address"
              :fetch-suggestions="querySearch"
              placeholder="请输入详细地址"
              style="width: 100%; display:none;"
              :trigger-on-focus="false"
              @select="handleSelect"
            />
            <div style="margin: 5px;
              border: 1px solid #99999996;
              border-radius: 2px;">
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
            <div class="addrDetial">
              详细地址：
              <span>{{hotelInfo.provinceName}}省{{hotelInfo.cityName}}市{{hotelInfo.areaName}}区{{hotelInfo.streetName}}</span>
            </div>
          </div>
        </div>
        <div class="main-in-bottom">
          <div>
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
          </div>
          <div class="table-container">
            <el-table ref="roomTable" :data="roomList" style="width: 100%" v-loading="listLoading">
              <el-table-column label="房间类型" prop="roomName" align="center"></el-table-column>
              <el-table-column label="房间数量" prop="roomNumber" align="center"></el-table-column>
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
          >></el-date-picker>
        </el-form-item>
        <el-form-item label="房间名称：">
          <span style>{{orderInfo.roomName}}</span>
        </el-form-item>
        <el-form-item label="房间单价：">
          <span style="font-size: 18px; color: red;">{{orderInfo.sellPrice}}¥/晚</span>
          <span style="text-decoration: line-through;">(原价{{orderInfo.normalPrice}}¥/晚)</span>
        </el-form-item>
        <el-form-item label="房间数量：">
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
import { searchHotel } from "@/api/hotel";
import { queryRoom, queryRoomByTime } from "@/api/hotel";
import { formatDate, generateFun } from "../../utils/date";
import { addOrder } from "@/api/order";
import BaiduMap from "vue-baidu-map/components/map/Map.vue";

export default {
  data() {
    return {
      hotelId: "",
      roomDaterange: [],
      listLoading: false,
      hotelLoading:false,
      editDialogVisible: false,
      isloading: false,
      hotelInfo: {},
      arrlength: 1,
      orderInfo: {
        daterange: [],
        num: 1,
        total: 0
      },
      mapZoom: 15,
      mapCenter: { lng: 0, lat: 0 },
      mapLocation: {
        address: undefined,
        coordinate: undefined
      },
      roomList: [],
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
  components: {},
  mounted() {
    let self = this;
    document.documentElement.scrollTop = 0 
    self.hotelLoading = true;
    self.hotelId = self.$route.query.id;
    self.getHotelInfo();
    self.handleSearch();
    // self.map();
  },
  watch: {
    $route(to, from) {
      let self = this;
      if (self.$route.path === "/hotelDetial") {
        document.documentElement.scrollTop = 0 
        self.hotelId = self.$route.query.id;
        self.getHotelInfo();
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
    changeDateOne(e) {
      if (e == null) {
        return false;
      }
      let start = new Date(this.roomDaterange[0]);
      let end = new Date(this.roomDaterange[1]);
      let day = (end - start) / (24 * 60 * 60 * 1000);
      self.arrlength = day;
    },
    //改变入住时间，计算总价
    changeDate(e) {
      let total = 0;
      if (e == null) {
        return false;
      }
      let start = new Date(this.orderInfo.daterange[0]);
      let end = new Date(this.orderInfo.daterange[1]);
      let day = (end - start) / (24 * 60 * 60 * 1000);
      self.arrlength = day;
      total = day * this.orderInfo.sellPrice * this.orderInfo.num;
      this.orderInfo.total = total;
      this.$forceUpdate();
    },
    //更新房间数量的select视图，计算总价
    changeNum() {
      this.$forceUpdate();
      if(this.orderInfo.daterange){
        let start = new Date(this.orderInfo.daterange[0]);
        let end = new Date(this.orderInfo.daterange[1]);
        let day = (end - start) / (24 * 60 * 60 * 1000);
        this.orderInfo.total =
          day * this.orderInfo.sellPrice * this.orderInfo.num;
      }
      
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
    //预定酒店
    handleOrder(row) {
      let self = this;
      self.orderInfo = row;
      if (self.roomDaterange.length) {
        self.isloading = true;
        self.$set(self.orderInfo, "daterange", self.roomDaterange);
        setTimeout(() => {
          self.changeDate(1);
        }, 300);
        setTimeout(() => {
          this.isloading = false;
        }, 1000);
      }
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
    //获取酒店信息
    getHotelInfo() {
      let self = this;
      searchHotel(self.hotelId).then(res => {
        self.hotelInfo = res.data;
        self.hotelLoading = false;
        self.mapLocation.address =
          self.hotelInfo.provinceName +
          "省" +
          self.hotelInfo.cityName +
          "市" +
          self.hotelInfo.areaName +
          "区" +
          self.hotelInfo.streetName;
          // self.querySearch()
          var myGeo = new this.BMap.Geocoder();
          console.log(self.mapLocation.address)
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
      });
    },
    //获取酒店下的房间信息
    handleSearch() {
      let self = this;
      let inDate = "";
      self.listLoading = true;
      if (!self.roomDaterange.length) {
        self.inDate = formatDate(new Date(), "yyyy-MM-dd");
      } else {
        self.inDate = self.roomDaterange[0];
      }
      queryRoomByTime(self.hotelId, self.inDate).then(res => {
        self.roomList = res.data;
        self.listLoading = false;
        self.total = res.data.length;
      });
    },
    //返回上一页
    handleBack() {
      this.$router.push({ path: "/hotel" });
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
