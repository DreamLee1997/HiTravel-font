<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-31 12:37:44
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-01-31 12:52:37
 -->
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
       se,
        editPtDialogVisible:false,
        selectProductCateValue: null,
        multiple:true, addProduct:{
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
        addPtDialogVisible:fal
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
      
    },
    filters: {
      
    },
    methods: {
      
    
      
    }
  }
</script>
<style>

</style>


