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
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="'http://wuweijie.net:8090/'+scope.row.image_url"></template>
        </el-table-column>
        <el-table-column label="商品名称" prop="hotelName" :show-overflow-tooltip='istooltip' align="center">
        </el-table-column>
        <el-table-column label="街道编码" prop="streetCode" width="120" align="center">
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
  import {
    fetchList,
    fetchParamsList,
    updateDeleteStatus,
    updateNewStatus,
    updateRecommendStatus,
    updatePublishStatus,
    AddProduct,
    updateProductInfo
  } from '@/api/product'
  import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
  import {fetchList as fetchProductAttrList} from '@/api/productAttr'
  import {fetchList as fetchBrandList} from '@/api/brand'
  import {fetchListWithChildren} from '@/api/productCate'

  const defaultListQuery = {
    one_category_id: '',
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
      this.getProductCateList();  //商品分类
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
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.length;
        });
      },
      //过滤三层树层数据
      getfilterPtCateList(data,arr){
        if(data.length <= 0){
          return false;
        }
        let children = [];
        data.forEach(element => {
          let children = [];
          if(element.children && element.children.length > 0){
            this.getfilterPtCateList(element.children, children)
          }
          if(element.children.length){
            arr.push({
              label: element.category_name, 
              value: element.category_id, 
              children: children
            });
          }else{
            arr.push({
              label: element.category_name, 
              value: element.category_id
            });
          }
        });
      },
      //商品分类
      getProductCateList() {
        fetchListWithChildren().then(response => {
          this.productCateOptions = [];
          let list = response.data.children;
          this.getfilterPtCateList(list, this.productCateOptions);
        });
      },
      //确认编辑商品信息
      handleEditProductConfirm(){
        let params = {
          "amount": this.editProduct.amount,
          "base64_image":this.editProduct.image_url,
          "description": this.editProduct.description,
          "one_category_id": this.editProduct.productCateVal[0],
          "price": this.editProduct.price,
          "product_name": this.editProduct.product_name,
          "three_category_id": this.editProduct.productCateVal[2],
          "two_category_id": this.editProduct.productCateVal[1]
        }
        this.$confirm('是否要进行修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          updateProductInfo(this.editProduct.product_id, params).then(response=>{
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
            this.editPtDialogVisible=false;
          });
        });
      },
      //按条件搜索商品
      handleSearchList() { 
        // this.listQuery.one_category_id = this.selectProductCateValue[0];
        // this.listQuery.two_category_id = this.selectProductCateValue[1];
        // this.listQuery.three_category_id = this.selectProductCateValue[2];
        fetchParamsList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.length;
        });
      },
      uploadMainImgFile(file){
        this.formDate.append('mainImage', file.file);
      },
      uploadDescImgFile(file){
        this.formDate.append('subImages', file.file);
      },
      handleMainImgExceed(){
        this.$message.warning(`当前限制选择 1 张图片!`);
      },
      handleDescImgExceed(){
        this.$message.warning(`当前限制选择 3 张图片!`);
      },
      handleAddProduct() {
        this.addPtDialogVisible = true;
      },
      handleAddProductConfirm(){
        this.formDate = new FormData()
        this.$refs.upload1.submit();
        this.$refs.upload2.submit();
        this.formDate.append('productName', this.addProduct.product_name);
        this.formDate.append('price', this.addProduct.price);
        this.formDate.append('amount', this.addProduct.amount);
        this.formDate.append('description', this.addProduct.description);
        this.formDate.append('oneCategoryId', this.addProductCateVal[0]);
        this.formDate.append('twoCategoryId', this.addProductCateVal[1]);
        this.formDate.append('threeCategoryId', this.addProductCateVal[2]);
        let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
        AddProduct(this.formDate,config).then(response => {
          this.$message({
            message: '添加成功！',
            type: 'success',
            duration: 1000
          });
          this.getList();
          this.addPtDialogVisible = false;
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
      handleDelete(index, row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateDeleteStatus(row.product_id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleUpdateProduct(index,row){
        this.editProduct = row
        this.editProduct.productCateVal = [
          row.one_category_id, 
          row.two_category_id, 
          row.three_category_id
          ]
        this.editPtDialogVisible = true
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


