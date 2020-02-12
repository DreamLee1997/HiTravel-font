<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">景区注册</span>
            <el-button
                class="btn-add"
                type="primary"
                @click="handleAddScenic"
                size="mini">
                提交
            </el-button>
        </el-card>
        <el-card class="register-container">
            <!-- <div>待审核</div> -->
            <el-form 
                v-if="!isVerify"
                :model="regScenicInfo" 
                :rules="rules" 
                ref="regHotelForm" 
                label-width="150px" 
                class="regHotelForm">
                <el-form-item label="法人姓名：" prop="realname">
                    <el-input v-model="regScenicInfo.realname"></el-input>
                </el-form-item>
                <el-form-item label="法人电话：" prop="phone">
                    <el-input v-model="regScenicInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="cardId">
                    <el-input v-model="regScenicInfo.cardId"></el-input>
                </el-form-item>
                <el-form-item label="法人邮箱：" prop="email">
                    <el-input v-model="regScenicInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="景区名称：" prop="scenicName">
                    <el-input v-model="regScenicInfo.scenicName"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码：" prop="scenicCardId">
                    <el-input v-model="regScenicInfo.scenicCardId"></el-input>
                </el-form-item>
                <el-form-item label="所属城市：" prop="cityCode">
                    <el-cascader
                        ref="cascaderAddr"
                        :props="props"
                        v-model="areaCode">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="景区图片：" prop="img">
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
            <div v-else style="text-align: center; margin-top: 85px;">
                <svg-icon 
                    icon-class="waitVerify" 
                    style="width: 216px; height: 216px;"></svg-icon>
            </div>
        </el-card>
    </div>
</template>

<script>
import {registerScence, queryMyScenic} from '@/api/scenicBusiness'
import {queryProvince, queryCity, queryArea, queryStreet} from '@/api/area'

export default {
    data () {
        return {
            regScenicInfo:{
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
                                leaf: level >= 1
                            }))
                            resolve(nodes)
                        });
                    } else if(level === 1){
                        queryCity(node.data.value, 1, 1000).then(response => {
                            let list = response.data.records;
                            const nodes = list.map(x=>({
                                value: x.cityCode,
                                label: x.shortName,
                                leaf: level >= 1
                            }))
                            resolve(nodes)
                        });
                    }
                }
            },
            streetCodeOptions:[],
            imageUrl:'',
            isVerify:false
        }
    },

    mounted(){
        let self = this;
        self.isVerify = false;
    },
    methods: {
        //提交表单信息
        handleAddScenic(){
            let self = this;
            var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0];
            let params = self.regScenicInfo;
            params.img = self.imageUrl;
            params.provinceCode = pathvalue.path[0];
            params.provinceName = pathvalue.pathLabels[0];
            params.cityCode = pathvalue.path[1];
            params.cityName = pathvalue.pathLabels[1];
            self.$confirm('是否确认提交', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                registerScence(params).then(response => {
                    self.isVerify = true;
                    this.$message({
                        message: '新增成功',
                        type: 'success',
                        duration: 1000
                    });
                });
            });
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
                width: 34%;
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
