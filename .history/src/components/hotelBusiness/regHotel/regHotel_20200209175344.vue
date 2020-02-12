<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店注册</span>
            <el-button
                class="btn-add"
                type="primary"
                @click="handleAddHotel"
                size="mini">
                提交
            </el-button>
        </el-card>
        <el-card class="register-container">
            <el-form :model="regHotelInfo" :rules="rules" ref="regHotelForm" label-width="150px" class="regHotelForm">
                <el-form-item label="法人姓名：" prop="realname">
                    <el-input v-model="regHotelInfo.realname"></el-input>
                </el-form-item>
                <el-form-item label="法人电话：" prop="phone">
                    <el-input v-model="regHotelInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="cardId">
                    <el-input v-model="regHotelInfo.cardId"></el-input>
                </el-form-item>
                <el-form-item label="法人邮箱：" prop="email">
                    <el-input v-model="regHotelInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="酒店名称：" prop="hotelName">
                    <el-input v-model="regHotelInfo.hotelName"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码：" prop="hotelCardId">
                    <el-input v-model="regHotelInfo.hotelCardId"></el-input>
                </el-form-item>
                <el-form-item label="所属街道：" prop="streetCode">
                    <el-cascader
                        ref="cascaderAddr"
                       
                        @change="getOneNodes"
                        :props="props">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="酒店图片：" prop="img">
                    <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8080/apis/file/fileUpload/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="'http://101.132.138.185:8080'+imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {registerHotel} from '@/api/hotelBusiness'
import {queryProvince, queryCity, queryArea, queryStreet} from '@/api/area'

export default {
    data () {
        return {
            regHotelInfo:{
                img: '',
            },
            rules: {
            },
            areaCode:[],
            props: {
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level } = node;
                    if(level === 0){
                        queryProvince(1, 1000).then(response => {
                            let list = response.data.records;
                            const nodes = list.map(x=>({
                                value: x.provinceCode,
                                label: x.shortName,
                                leaf: level >= 3
                            }))
                            resolve(nodes)
                        });
                    } else if(level === 1){
                        queryCity(node.data.value, 1, 1000).then(response => {
                            let list = response.data.records;
                            const nodes = list.map(x=>({
                                value: x.cityCode,
                                label: x.shortName,
                                leaf: level >= 3
                            }))
                            resolve(nodes)
                        });
                    } else if(level === 2){
                        queryArea(node.data.value, 1, 1000).then(response => {
                            let list = response.data.records;
                            const nodes = list.map(x=>({
                                value: x.areaCode,
                                label: x.shortName,
                                leaf: level >= 3
                            }))
                            resolve(nodes)
                        });
                    } else if(level === 3){
                        queryStreet(node.data.value, 1, 1000).then(response => {
                            let list = response.data.records;
                            const nodes = list.map(x=>({
                                value: x.streetCode,
                                label: x.shortName,
                                leaf: level >= 3
                            }))
                            resolve(nodes)
                        });
                    }
                }
            },
            imageUrl:'',
        }
    },

    mounted(){
        let self = this;
    },
    methods: {

        //提交表单信息
        handleAddHotel(){
            let self = this;
            
            let params = self.regHotelInfo;
            self.regHotelInfo.streetCode = self.areaCode[3];

            self.$confirm('是否确认提交', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                registerHotel(params).then(response => {
                    this.$message({
                        message: '新增成功',
                        type: 'success',
                        duration: 1000
                    });
                });
            });
        },
        //获取节点
        getOneNodes(value){
            let self = this;
            console.log(value);
            var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0];
            let labels = this.$refs['cascaderAddr'].currentLabels;
            console.log(pathvalue);
        },
        //上传图片成功返回数据
        handleAvatarSuccess(imgUrl){
            let self = this;
            self.imageUrl = imgUrl;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-container{
    padding: 0 80px;
    .operate-container{
        margin: 15px 0;
        .el-icon-tickets{
            font-size: large;
        }
        .el-button--mini{
            width: 70px !important;
            font-size: larger !important;
        }
    }
    .register-container{
        height: 660px;
        .el-form{
            // padding-left: 85px;
            width: 800px;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            padding-top: 5px;
            .el-input{
                width: 65% ;
            }
            .el-cascader{
                width: 65%;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
                border: 1px dashed #d9d9d9 !important;
                border-radius: 6px !important;
                cursor: pointer !important;
                position: relative !important;
                overflow: hidden !important;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }
        
        
    }
}
  
</style>
