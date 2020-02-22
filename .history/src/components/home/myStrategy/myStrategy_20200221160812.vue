<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 11:13:51
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-21 16:08:12
 -->
<template>
  <div class="myStrategy">
        <el-row>
            <el-col :span="24" v-for="(item, index) in strategyList" :key="index" >
                <el-card :body-style="{ padding: '0px', display: 'flex'}">
                    <div 
                        @mouseenter="mouseoverImg(index)"
                        @mouseleave="mouseoutImg(index)" 
                        style="position: relative; z-index: 0;">
                        <img ref="img" :src="item.imgUrl" style="z-index: -1;" class="image" @click="handleView(item.articleId)">
                        <div v-show="isShow == index" ref="imgDelete" class="delete-img" >
                            <i class="el-icon-delete" ></i>
                            <i class="el-icon-edit" @click="handleEdit(item)"></i>
                        </div>
                    </div> 
                    <div class="content-r" >
                        <a class="title" @click="handleView(item.articleId)">{{item.title}}</a>
                        <div v-html="item.filterStr" class="filterContent">
                            {{item.filterStr}}
                        </div>
                        <div class="bottom clearfix">
                            <span>
                                <i class="el-icon-location-information" style="color:#909399"></i>
                            {{item.cityName}}</span>
                            <time class="time" >{{ item.createTime }}</time>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
         <el-dialog
            title="编辑酒店信息"
            :visible.sync="editDialogVisible"
            width="616px">
            <edit-article></edit-article>
            <span slot="footer" class="dialog-footer"  >
                <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleEditConfirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { queryMyStrategy } from "@/api/strategy";
import writeArticle from '../../../components/strategy/writeStrategy/writeStrategy'
export default {
    data() {
        return {
            strategyList:[],
            queryInfo: {
                status: "",
                pageNo: 1,
                pageSize: 10
            },
            isShow:10000000,
            editDialogVisible:false,
        };
    },
    components:{
        'edit-article':writeArticle
    },

    mounted() {
        this.getList();
        // this.goTo('/hotelBusiness/myHotel');
    },
    methods: {
        //确认编辑
        handleEditConfirm(){

        },
        //编辑攻略
        handleEdit(){
            this.editDialogVisible = true;
        },  
        // 鼠标移入图片
        mouseoverImg(s) {
           this.isShow = s;
        },
        // 鼠标移出图片
        mouseoutImg() {
            this.isShow = 10000000;
        },
        //获取攻略列表
        getList() {
            let self = this;
            queryMyStrategy(
                self.queryInfo.status,
                self.queryInfo.pageNo,
                self.queryInfo.pageSize
            ).then(res => {
                    self.strategyList = res.data.records
                    self.strategyList.forEach(ele => {
                        let imgUrl = ''
                        ele.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                            imgUrl =  capture;
                        });
                        // let reg = /<\/?.+?\/?>/g;
                        // let filterStr = ele.content.replace(reg,'')
                        let filterStr =  ele.content.replace(/<\s?img[^>]*>/gi,'')
                        filterStr = filterStr.replace(/<\s?br[^>]*>/gi,'')
                        // console.log(filterStr)
                        Object.assign(ele, {['imgUrl']: imgUrl});  
                        Object.assign(ele, {['filterStr']: filterStr});  
                    });
            });
        },
        //查看攻略
        handleView(id){
            // //打开新的标签页
            let routeUrl = this.$router.resolve({
                path: "/viewStrategy",
                query: {id:id}
            });
            window.open(routeUrl.href, '_blank')
        },
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-card.is-always-shadow{
    width: 880px;
    margin: 20px 0 0 40px;
}
.image{
    width: 580px;
    height: 300px;
    position: relative;
    cursor:pointer;
    z-index:-1;
    &:hover {
        border: 1px dashed #409eff;
    }
    
}
.delete-img {
    width: 580px;
    height: 40px;
    line-height: 40px;
    background: rgba(59, 60, 61, 0.5);
    position: absolute;
    display: block;
    left: 0px;
    top: 260px;
    z-index: 999;
    cursor: pointer;
    text-align: right;
    i {
        margin: 8px 10px 0 0;
        display: block;
        font-size: 24px;
        color: white;
    }
}
.content-r{
    padding: 14px;
    width: 290px;
    height: 300px;
    position: relative;
    .title{
        font-size: 22px;
        color: #fd9e00;
        font-weight: bold;
    }
    a:hover{text-decoration:underline;}
    .filterContent{
        padding: 15px 0;
        font-size: 14px;
    }
    .bottom{
        position: absolute;
        width: 300px;
        bottom: 20px;
        font-size: 16px;
        color: #818386;
        .el-icon-location-information{
            margin: 0 2px;
        }
        .time{
            margin: 0 8px;
        }
    }
}

</style>