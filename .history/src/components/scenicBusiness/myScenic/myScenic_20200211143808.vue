<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">景区列表</span>
        </el-card>
        <el-card class="content-container">
            <div class="table-container">
                <el-table ref="scenicTable"
                            :header-cell-style="{fontSize:'15px'}"
                            :data="list"
                            style="width: 100%; height: 550px; overflow: auto;"
                            >
                    <el-table-column label="景区编号" align="center">
                    <template slot-scope="scope">{{scope.row.scenicId}}</template>
                    </el-table-column>
                    <el-table-column label="景区图片" width="120" align="center">
                    <template slot-scope="scope">
                        <img style="height: 80px; width:90px" :src="'http://101.132.138.185:8080'+scope.row.img"></template>
                    </el-table-column>
                    <el-table-column label="景区名称" prop="scenicName" :show-overflow-tooltip='istooltip' align="center">
                    </el-table-column>
                     <el-table-column label="法人姓名" prop="realname" align="center">
                    </el-table-column>
                    <el-table-column label="身份证号" :show-overflow-tooltip='istooltip' prop="scenicCardId" align="center">
                    </el-table-column>
                    <el-table-column label="法人电话" :show-overflow-tooltip='istooltip' prop="phone" align="center">
                    </el-table-column>
                    <el-table-column label="法人邮箱" :show-overflow-tooltip='istooltip' prop="email" align="center">
                    </el-table-column>
                    <el-table-column label="创建时间" :show-overflow-tooltip='istooltip' prop="createTime" align="center">
                    </el-table-column>
                    <el-table-column label="所属城市" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row.provinceName + '省' + scope.row.cityName + '市'}}</template>
                    </el-table-column>
                    <el-table-column label="状态" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row | formatScenicStatus}}</template>
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
                            @click="handleUpdateScenic(scope.$index, scope.row)">编辑
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
                :model="editScenic"
                v-loading="isloading" 
                size="small" 
                label-width="120px">
                <el-form-item label="法人姓名：" prop="realname" >
                    <el-input class="form-input" v-model="editScenic.realname" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="法人电话：" prop="phone">
                    <el-input class="form-input" v-model="editScenic.phone" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="cardId">
                    <el-input class="form-input" v-model="editScenic.cardId" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="法人邮箱：" prop="email">
                    <el-input class="form-input" v-model="editScenic.email" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="酒店名称：" prop="scenicName">
                    <el-input class="form-input" v-model="editScenic.sceincName" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码：" prop="scenicCardId">
                    <el-input class="form-input" v-model="editScenic.scenicCardId" :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="所属城市：" prop="areaCode" class="select-item">
                    <div style=" width:440px">
                        <el-select 
                            :disabled="isEdit"
                            v-model="editScenic.provinceCode" 
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
                            v-model="editScenic.cityCode" 
                            @focus="queryData(1)"
                            placeholder="请选择">
                                <el-option
                                    v-for="item in cityCodeOptions"
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
                            <img v-if="editScenic.img" 
                                :src="'http://101.132.138.185:8080'+editScenic.img" class="avatar">
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
import {queryMyScenic, searchScenic} from '@/api/scenicBusiness'
import {queryProvince, queryCity, queryArea, queryStreet} from '@/api/area'
import { formatDate } from '@/utils/date'

export default {
    data () {
        let self = this;
        return {
            list:[],
            total:10,
            editScenic:{},
            areaCode:[],
            isEdit:false,
            isloading:false,
            provinceCodeOptions:[],
            cityCodeOptions:[],
            istooltip:true,
            isDisabled:false,
            editDialogVisible:false,
        }
    },
    filters:{
        formatScenicStatus(row){
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
        //查看酒店信息
        handleSearch(index, row){
            let self = this;
            self.isloading = true;
            searchScenic(row.scenicId).then(res => {
                self.editScenic = res.data;
            });
            self.isEdit = true;
            self.getCityOptions(row);
            self.isDisabled = true;
            self.editDialogVisible = true;
        },
        //编辑酒店信息
        handleUpdateScenic(idnex, row){
            let self = this;
            self.editScenic = row;
            self.isloading = true;
            self.getCityOptions(row);
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
                // updateHotel(self.editHotel).then(response => {
                //     this.$message({
                //         message: '修改成功',
                //         type: 'success',
                //         duration: 1000
                //     });
                //     this.getList();
                //     this.editDialogVisible=false;
                // });
            });
        },

        handleAvatarSuccess(imgUrl){
            let self = this;
            self.editScenic.img = imgUrl;
        },
        //获取我的酒店列表
        getList(){
            let self = this;
            queryMyScenic().then(response => {
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
                this.isloading = false;
                this.cityCodeOptions = nodes;
            });
            
        },
        
        queryData(flag){
            let self = this;
            if(flag === 1){
                queryCity(self.editScenic.provinceCode, 1, 1000).then(response => {
                    let list = response.data.records;
                    const nodes = list.map(x=>({
                        value: x.cityCode,
                        label: x.shortName,
                    }))
                    self.cityCodeOptions = nodes;
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
