<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-31 12:37:44
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-01-31 12:53:49
 -->
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
          <el-form-item label="商品价格：">
            <el-input 
              style="width: 100px" 
              v-model="listQuery.start_price" 
              placeholder="最低价格"
            ></el-input> - 
            <el-input style="width: 100px" v-model="listQuery.end_price" placeholder="最高价格"></el-input>
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
          <template slot-scope="scope">{{scope.row.product_id}}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="'http://wuweijie.net:8090/'+scope.row.image_url"></template>
        </el-table-column>
        <el-table-column label="商品名称" prop="product_name" :show-overflow-tooltip='istooltip' align="center">
        </el-table-column>
        <el-table-column label="价格" prop="price" width="120" align="center">
        </el-table-column>
        <el-table-column label="SKU库存" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.amount}}
          </template>
        </el-table-column>
        <el-table-column label="销量" prop="sold_out" width="100" align="center">
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
    <el-dialog
      title="添加商品"
      :visible.sync="addPtDialogVisible"
      width="50%">
       <el-form  :model="addProduct" size="small" label-width="140px">
          <el-form-item label="商品名称：">
            <el-input style="width: 203px" v-model="addProduct.product_name" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品价格：">
            <el-input style="width: 203px" v-model="addProduct.price" placeholder="商品价格"></el-input> 
          </el-form-item>
          <el-form-item label="商品数量：">
            <el-input style="width: 203px" v-model="addProduct.amount" placeholder="商品数量"></el-input> 
          </el-form-item>
          <el-form-item label="商品描述：">
            <el-input style="width: 403px" 
              type="textarea" :rows="3" 
              v-model="addProduct.description" 
              placeholder="商品描述"
            ></el-input> 
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
              v-model="addProductCateVal"
              :options="productCateOptions"
            ></el-cascader>
          </el-form-item>
           <el-form-item label="商品封面图片：">
            <el-upload
              action="${pageContext.request.contextPath}/lookup/editEvidence/123"
              list-type="picture-card"
              :auto-upload="false"
              :limit="1"
              :on-exceed="handleMainImgExceed"
              :http-request="uploadMainImgFile"
              ref="upload1"
              >
            <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述图片：">
            <el-upload
              :multiple="multiple"
              action="${pageContext.request.contextPath}/lookup/editEvidence/123"
              list-type="picture-card"
              :auto-upload="false"
              :limit="3"
              :on-exceed="handleDescImgExceed"
              :http-request="uploadDescImgFile"
              ref="upload2"
              >
            <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPtDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddProductConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑商品信息"
      :visible.sync="editPtDialogVisible"
      width="40%">
     <el-form :inline="true" :model="editProduct" size="small" label-width="100px">
          <el-form-item label="商品名称：">
            <el-input style="width: 203px" v-model="editProduct.product_name" ></el-input>
          </el-form-item>
          <el-form-item label="商品价格：">
            <el-input style="width: 203px" v-model="editProduct.price"></el-input> 
          </el-form-item>
          <el-form-item label="商品数量：">
            <el-input style="width: 203px" v-model="editProduct.amount" ></el-input> 
          </el-form-item>
          <el-form-item label="商品描述：">
            <el-input style="width: 403px" 
              type="textarea" :rows="3" 
              v-model="editProduct.description" 
              placeholder="商品描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
              v-model="editProduct.productCateVal"
              :options="productCateOptions"
            ></el-cascader>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPtDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditProductConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
//   import {
//     fetchList,
//     fetchParamsList,
//     updateDeleteStatus,
//     updateNewStatus,
//     updateRecommendStatus,
//     updatePublishStatus,
//     AddProduct,
//     updateProductInfo
//   } from '@/api/product'
//   import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
//   import {fetchList as fetchProductAttrList} from '@/api/productAttr'
//   import {fetchList as fetchBrandList} from '@/api/brand'
//   import {fetchListWithChildren} from '@/api/productCate'

  
  export default {
    name: "hotel",
    data() {
      return {
       
        
      }
    },
    created() {
      
    },
    filters: {
      
    },
    methods: {
      
    
      
    }
  }
</script>
<style>

</style>


