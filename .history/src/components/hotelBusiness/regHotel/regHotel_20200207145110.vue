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
                        :props="props"
                        v-model="areaCode">
                    </el-cascader>
                    <el-select 
                        v-model="regHotelInfo.streetCode" 
                        @focus="getStreetList" 
                        placeholder="请选择">
                            <el-option
                            v-for="item in streetCodeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="酒店图片：" prop="img">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
                                leaf: level >= 2
                            }))
                            resolve(nodes)
                        });
                    } else if(level === 1){
                        queryCity(node.data.value, 1, 1000).then(response => {
                            let list = response.data.records;
                            const nodes = list.map(x=>({
                                value: x.cityCode,
                                label: x.shortName,
                                leaf: level >= 2
                            }))
                            resolve(nodes)
                        });
                    } else if(level === 2){
                        queryArea(node.data.value, 1, 1000).then(response => {
                            let list = response.data.records;
                            const nodes = list.map(x=>({
                                value: x.areaCode,
                                label: x.shortName,
                                leaf: level >= 2
                            }))
                            resolve(nodes)
                        });
                    }
                }
            },
            streetCodeOptions:[],
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

        //获取街道
        getStreetList(){
            let self = this;
            let areaCode = self.areaCode[2]
            if(areaCode){
                queryStreet(areaCode, 1, 1000).then(response => {
                    let list = response.data.records;
                    const nodes = list.map(x=>({
                        value: x.streetCode,
                        label: x.shortName,
                    }))
                    this.streetCodeOptions = nodes;
                });
            }else {
                this.streetCodeOptions = [];
            }
        },

        handleAvatarSuccess(){

        },
        beforeAvatarUpload(){

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-container{
    padding: 0 50px;
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
        // overflow:scroll;
        .el-form{
            padding-left: 85px;
            padding-top: 5px;
            .el-input{
                width: 65% ;
            }
            .el-cascader{
                width: 30%;
            }
            .el-select{
                width: 30%;
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
