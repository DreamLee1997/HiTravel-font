<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-11 14:29:35
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店列表</span>
        </el-card>
        <el-card class="content-container">
            <div class="table-container">
                <el-table ref="hotelTable"
                            :header-cell-style="{fontSize:'15px'}"
                            :data="list"
                            style="width: 100%; height: 550px; overflow: auto;"
                            >
                    <el-table-column label="酒店编号" align="center">
                    <template slot-scope="scope">{{scope.row.hotelId}}</template>
                    </el-table-column>
                    <el-table-column label="酒店图片" width="120" align="center">
                    <template slot-scope="scope">
                        <img style="height: 80px; width:90px" :src="'http://101.132.138.185:8080'+scope.row.img"></template>
                    </el-table-column>
                    <el-table-column label="酒店名称" prop="hotelName" :show-overflow-tooltip='istooltip' align="center">
                    </el-table-column>
                     <el-table-column label="法人姓名" prop="realname" align="center">
                    </el-table-column>
                    <el-table-column label="身份证号" :show-overflow-tooltip='istooltip' prop="hotelCardId" align="center">
                    </el-table-column>
                    <el-table-column label="法人电话" :show-overflow-tooltip='istooltip' prop="phone" align="center">
                    </el-table-column>
                    <el-table-column label="法人邮箱" :show-overflow-tooltip='istooltip' prop="email" align="center">
                    </el-table-column>
                    <el-table-column label="创建时间" :show-overflow-tooltip='istooltip' prop="createTime" align="center">
                    </el-table-column>
                    <el-table-column label="详细地址" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">
                            {{scope.row.provinceName + '省' + scope.row.cityName + '市' 
                            + scope.row.areaName + '区' + scope.row.streetName + '街道'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row | formatHotelStatus}}</template>
                    </el-table-column>
                    <el-table-column 
                        label="操作" 
                        fixed="right" 
                        :show-overflow-tooltip='istooltip' 
                        width="140" align="center">
                    <template slot-scope="scope">
                        <p>
                        <el-button
                            size="mini"
                            @click="handleUpdateHotel(scope.$index, scope.row)">编辑
                        </el-button>
                         <el-button
                            size="mini"
                            type="primary"
                            @click="handleSearch(scope.$index, scope.row)">查看
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
                    :page-size="10"
                    :page-sizes="[5,10,15]"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog
            title="编辑酒店信息"
            :visible.sync="editDialogVisible"
            width="616px">
            <el-form 
                :inline="true" 
                :model="editHotel"
                v-loading="isloading" 
                size="small" 
                label-width="120px">
                <el-form-item label="法人姓名：" prop="realname" >
                    <el-input class="form-input" v-model="editHotel.realname" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="法人电话：" prop="phone">
                    <el-input class="form-input" v-model="editHotel.phone" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="cardId">
                    <el-input class="form-input" v-model="editHotel.cardId" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="法人邮箱：" prop="email">
                    <el-input class="form-input" v-model="editHotel.email" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="酒店名称：" prop="hotelName">
                    <el-input class="form-input" v-model="editHotel.hotelName" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码：" prop="hotelCardId">
                    <el-input class="form-input" v-model="editHotel.hotelCardId" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="所属街道：" prop="areaCode" class="select-item">
                    <div style=" width:440px">
                        <el-select 
                            :disabled="isEdit"
                            v-model="editHotel.provinceCode" 
                            placeholder="请选择">
                                <el-option
                                    v-for="item in provinceCodeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                        <el-select 
                            :disabled="isEdit"
                            v-model="editHotel.cityCode" 
                            @focus="queryData(1)"
                            placeholder="请选择">
                                <el-option
                                    v-for="item in cityCodeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                        <el-select 
                            :disabled="isEdit"
                            v-model="editHotel.areaCode" 
                            @focus="queryData(2)"
                            placeholder="请选择">
                                <el-option
                                    v-for="item in areaCodeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                        <el-select 
                            :disabled="isEdit"
                            v-model="editHotel.streetCode" 
                            @focus="queryData(3)"
                            placeholder="请选择">
                                <el-option
                                    v-for="item in streetCodeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="酒店图片：" prop="img">
                        <el-upload
                            :disabled="isDisabled"
                            class="avatar-uploader"
                            action="http://localhost:8080/apis/file/fileUpload/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="editHotel.img" 
                                :src="'http://101.132.138.185:8080'+editHotel.img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" v-show="!isEdit" >
                <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleEditConfirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {queryProvince, queryCity, queryArea, queryStreet} from '@/api/area'
import { queryMyHotel, updateHotel, searchHotel } from '@/api/hotelBusiness'
import { formatDate } from '@/utils/date'

export default {
    data () {
        let self = this;
        return {
            list:[],
            total:10,
            editHotel:{},
            areaCode:[],
            isEdit:false,
            isloading:false,
            streetCodeOptions:[],
            provinceCodeOptions:[],
            cityCodeOptions:[],
            areaCodeOptions:[],
            istooltip:true,
            isDisabled:false,
            editDialogVisible:false,
        }
    },
    filters:{
        formatHotelStatus(row){
            if (row.status === 0) {
                return '未激活';
            } else if (row.status === 1) {
                return '已激活';
            } else {
                return '已删除';    
            }
        }
    },
    mounted(){
        this.getList();
        this.getProvinceOptions();
    },
    methods: {
        getOptions(row){
            let self = this;
            this.getStreetOptions(row);
        },
        //查看酒店信息
        handleSearch(index, row){
            let self = this;
            self.isloading = true;
            searchHotel(row.hotelId).then(res => {
                self.editHotel = res.data;
            });
            self.isEdit = true;
            self.getOptions(row);
            self.isDisabled = true;
            self.editDialogVisible = true;
        },
        //编辑酒店信息
        handleUpdateHotel(idnex, row){
            let self = this;
            self.editHotel = row;
            self.isloading = true;
            self.getOptions(row);
            self.isEdit = false;
            self.isDisabled = false;
            self.editDialogVisible = true;
        },
        //确认并提交
        handleEditConfirm(){
            let self = this;
            this.$confirm('是否确认修改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                updateHotel(self.editHotel).then(response => {
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                    this.editDialogVisible=false;
                });
            });
        },

        handleAvatarSuccess(imgUrl){
            let self = this;
            self.editHotel.img = imgUrl;
        },
        //获取我的酒店列表
        getList(){
            let self = this;
            queryMyHotel().then(response => {
                this.list = response.data;
                this.total = response.data.length;
            });
        },
        //获取所有省
        getProvinceOptions(){
            let self = this;
            queryProvince(1, 1000).then(response => {
                let list = response.data.records;
                const nodes = list.map(x=>({
                    value: x.provinceCode,
                    label: x.shortName,
                }))
                this.provinceCodeOptions = nodes;
            });
        },
        //获取所有市
        getCityOptions(row){
            let self = this;
            queryCity(row.provinceCode, 1, 1000).then(response => {
                let list = response.data.records;
                const nodes = list.map(x=>({
                    value: x.cityCode,
                    label: x.shortName,
                }))
                this.cityCodeOptions = nodes;
            });
            
        },
        //获取所有区
        async getAreaOptions(row){
            let self = this;
            await this.getCityOptions(row);
            queryArea(row.cityCode, 1, 1000).then(response => {
                let list = response.data.records;
                const nodes = list.map(x=>({
                    value: x.areaCode,
                    label: x.shortName,
                }))
                this.areaCodeOptions = nodes;
            });
            
        },
        //获取所有街道
        async getStreetOptions(row){
            let self = this;
            await this.getAreaOptions(row);
            queryStreet(row.areaCode, 1, 1000).then(response => {
                let list = response.data.records;
                const nodes = list.map(x=>({
                    value: x.streetCode,
                    label: x.shortName,
                }))
                this.streetCodeOptions = nodes;
                setTimeout(()=>{
                    self.isloading = false;
                },800)
                
            });
        },
        queryData(flag){
            let self = this;
            if(flag === 1){
                queryCity(self.editHotel.provinceCode, 1, 1000).then(response => {
                    let list = response.data.records;
                    const nodes = list.map(x=>({
                        value: x.cityCode,
                        label: x.shortName,
                    }))
                    self.cityCodeOptions = nodes;
                });
            }else if(flag === 2){
                queryArea(self.editHotel.cityCode, 1, 1000).then(response => {
                    let list = response.data.records;
                    const nodes = list.map(x=>({
                        value: x.areaCode,
                        label: x.shortName,
                    }))
                    self.areaCodeOptions = nodes;
                });
            }else{
                queryStreet(self.editHotel.areaCode, 1, 1000).then(response => {
                    let list = response.data.records;
                    const nodes = list.map(x=>({
                        value: x.streetCode,
                        label: x.shortName,
                    }))
                    self.streetCodeOptions = nodes;
                });
            }
        },
        handleCancle(){
            let self = this;
        },
        handleSizeChange(val) {
            // this.getList();
        },
        handleCurrentChange(val) {
            // this.getList();
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-container{
    padding: 0 10px;
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
    .content-container{
        height: 660px;
    }
}
.form-input{
    width: 250px !important;
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
.el-input.is-disabled /deep/ .el-input__inner{
    color: #6b6b6d !important;
}
.el-cascader{
    .el-input.is-disabled /deep/ .el-input__inner{
        color: #6b6b6d !important;
    }
}
.tableHead{
    font-size: 16px;
    color: aqua;
}
.el-select > .el-input{
    width: 102px;
}
</style>
