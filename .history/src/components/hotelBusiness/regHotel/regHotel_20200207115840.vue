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
                        :show-all-levels="false"
                        :props="props"
                        v-model="regHotelInfo.streetCode">
                    </el-cascader>
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
            props: {
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level } = node;
                    console.log(level);
                    // setTimeout(() => {
                    // const nodes = Array.from({ length: level + 1 })
                    //     .map(item => ({
                    //     value: ++id,
                    //     label: `选项${id}`,
                    //     leaf: level >= 2
                    //     }));
                    // // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                    // resolve(nodes);
                    // }, 1000);
                    // buckleTemplateNext({pid:value || 0}).then(res=>{
                    //     console.log(res)
                    //     const nodes = res.map(x=>({
                    //         value: x.id,
                    //         label: x.name,
                    //         leaf: level >= 2
                    //     }))
                    //     resolve(nodes)
                    // })
                }
            },
            streetCodeOptions:[],
            imageUrl:'',
        }
    },
    mounted(){
        let self = this;
        self.getAllProvince();
    },
    methods: {
        //获取所有省
        getAllProvince(){
            let self = this;
            queryProvince(1, 1000).then(response => {
                let list = response.data.records;
                let item = {};
                list.forEach(ele => {
                    item = {};
                    item.label = ele.shortName;
                    item.value = ele.provinceCode;
                    item.items = [];
                    self.streetCodeOptions.push(item);
                });
            });
        },

        //动态加载次级选项
        handleItemChange(val,index){
            let self = this;
            console.log('active item:', val);
            console.log('active item:', index);
            // if(val.length === 1){
            //     queryCity(val[0], 1, 1000).then(response => {
            //         let list = response.data.records;
            //         let item = {};
            //         list.forEach(ele => {
            //             item = {};
            //             item.label = ele.shortName;
            //             item.value = ele.provinceCode;
            //             item.items = [];
            //             self.streetCodeOptions.push(item);
            //         });
            //     });
            // }else if(val.length === 2){
            //     queryCity(val[1], 1, 1000).then(response => {
            //         let list = response.data.records;
            //         let item = {};
            //         list.forEach(ele => {
            //             item = {};
            //             item.label = ele.shortName;
            //             item.value = ele.provinceCode;
            //             item.items = [];
            //             self.streetCodeOptions.push(item);
            //         });
            //     });
            // }else{
            //     queryCity(val[2], 1, 1000).then(response => {
            //         let list = response.data.records;
            //         let item = {};
            //         list.forEach(ele => {
            //             item = {};
            //             item.label = ele.shortName;
            //             item.value = ele.provinceCode;
            //             item.items = [];
            //             self.streetCodeOptions.push(item);
            //         });
            //     });
            // }
            
        },
        //提交表单信息
        handleAddHotel(){
            let self = this;
            let params = self.regHotelInfo;
            // params.streetCode = ''
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
                width: 70%;
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
