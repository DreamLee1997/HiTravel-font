<template> 
  <div class="app-container">
    酒店审核
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

  const defaultListQuery = {
    end_price: null,
    one_category_id: '',
    page: 1,
    size: 10,
    product_name: '',
    start_price: null,
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
          row.three_category_id]
        this.editPtDialogVisible = true
      },
    }
  }
</script>
<style>

</style>


