<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-05 18:16:01
 -->
<template>
    <div>
        <el-card class="operate-container" shadow="never">
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
        <el-card>
                <el-form :model="regHotelInfo" :rules="rules" ref="regHotelForm" label-width="100px" class="regHotelForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="regHotelInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="regHotelInfo.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间" required>
                    <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="regHotelInfo.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="regHotelInfo.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="regHotelInfo.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="regHotelInfo.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="regHotelInfo.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="regHotelInfo.desc"></el-input>
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
        }
    },
    methods: {
        handleAddHotel(){
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operate-container{
    margin: 20px 0;
}

</style>
