<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-06 10:48:22
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店注册</span>
            <el-button
                class="btn-add"
                type="primary"
                @click="handleAddHotel()"
                size="mini">
                添加
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
                        expand-trigger="hover"
                        :options="streetCodeOptions"
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
                    <el-input v-model="regHotelInfo.img"></el-input>
                </el-form-item>
                
                <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('regHotelInfo')">立即创建</el-button>
                    <el-button @click="resetForm('regHotelInfo')">重置</el-button>
                </el-form-item> -->
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            regHotelInfo:{

            },
            rules: {

            },
            streetCodeOptions:[],
            imageUrl:'',
        }
    },
    methods: {
        handleAddHotel(){
            
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
        margin: 20px 0;
        .el-icon-tickets{
            font-size: large;
        }
    
    }
    .register-container{
        height: 600px;
        overflow:scroll;
        .el-form{
            padding-left: 85px;
            // width: 600px;
            // position: absolute;
            // left:50%;
            // margin-top: 5px;
            // margin-left:-300px;
            .el-input{
                width: 65% ;
            }
        }
        
    }
}
    
</style>
