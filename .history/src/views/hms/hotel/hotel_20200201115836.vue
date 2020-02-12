<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="height:30px;">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="商品名称：">
            <el-input style="width: 203px" v-model="listQuery.product_name" placeholder="商品名称"></el-input>
          </el-form-item>
         
          <el-form-item label="商品状态：">
            <el-select v-model="listQuery.status" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
              v-model="selectProductCateValue"
              :options="productCateOptions"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        type="primary"
        @click="handleAddProduct()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.hotelId}}</template>
        </el-table-column>
        <el-table-column label="酒店图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="'http://101.132.138.185:8080/'+scope.row.img"></template>
        </el-table-column>
        <el-table-column label="酒店名称" prop="hotelName" :show-overflow-tooltip='istooltip' align="center">
        </el-table-column>
        <el-table-column label="酒店编码" prop="hotelCardId" :show-overflow-tooltip='istooltip' align="center">
        </el-table-column>
        <el-table-column label="街道编码" prop="streetCode" width="120" align="center">
        </el-table-column>
        <el-table-column label="注册人姓名" prop="realname" width="100" align="center">
        </el-table-column>
        <el-table-column label="ID" prop="cardId" width="100" align="center">
        </el-table-column>
        <el-table-column label="描述" :show-overflow-tooltip='istooltip' align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
         <el-table-column label="商品状态" :show-overflow-tooltip='istooltip' align="center">
          <template slot-scope="scope">{{productStatus[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="操作" :show-overflow-tooltip='istooltip' width="160"   align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.size"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    
    
  </div>
</template>
<script>
  import {
    fetchList,
    // fetchParamsList,
    // updateDeleteStatus,
    // updateNewStatus,
    // updateRecommendStatus,
    // updatePublishStatus,
    // AddProduct,
    // updateProductInfo
  } from '@/api/hotel'
  // import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
  // import {fetchList as fetchProductAttrList} from '@/api/productAttr'
  // import {fetchList as fetchBrandList} from '@/api/brand'
  // import {fetchListWithChildren} from '@/api/productCate'

  const defaultListQuery = {
    one_category_id: '',
    streetCode:'',
    page: 1,
    size: 10,
    product_name: '',
    status: '',
    three_category_id: '',
    two_category_id: '',
    productImgfile:{name:'21'}
  };
  export default {
    name: "productList",
    data() {
      return {
        addProduct:{
          one_category_id: 1,
          three_category_id: 9,
          two_category_id: 5,
          base64_image: "string",
        },
        addProductCateVal:[],
        productImgList:[],
        editProduct:{},
        productStatus:['下架','正常上架','无货','秒杀商品'],
        imageUrl:'',
        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        istooltip:true,
        addPtDialogVisible:false,
        editPtDialogVisible:false,
        selectProductCateValue: null,
        multiple:true,
        formDate:"",
        multipleSelection: [],
        productCateOptions: [],
        statusOptions:[{
          label: '下架', 
          value: 0
        },{
          label: '正常上架', 
          value: 1
        },{
          label: '无货', 
          value: 2
        },{
          label: '秒杀商品', 
          value: 3
        }],
        brandOptions: [],
      }
    },
    created() {
      this.getList();
      // this.getProductCateList();  //商品分类
    },
    filters: {
      verifyStatusFilter(value) {
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      }
    },
    methods: {
      getProductSkuSp(row, index) {
        if (index === 0) {
          return row.sp1;
        } else if (index === 1) {
          return row.sp2;
        } else {
          return row.sp3;
        }
      },
      //商品列表
      getList() {
        this.listLoading = true;
        //请求数据
        fetchList(this.listQuery.page, this.listQuery.size, this.listQuery.streetCode).then(response => {
          this.listLoading = false;
          this.list = response.data.records;
          this.total = response.data.records.length;
        });
      },
      
      handleSizeChange(val) {
        this.getList();
      },
      handleCurrentChange(val) {
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      
    }
  }
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>


