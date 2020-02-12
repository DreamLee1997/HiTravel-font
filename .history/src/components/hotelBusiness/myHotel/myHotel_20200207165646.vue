<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-07 16:56:46
 -->
<template>
    <div class="app-container">
        <el-card class="operate-container" >
            <i class="el-icon-tickets"></i>
            <span style="margin-top: 5px; font-size:18px">酒店列表</span>
            <!-- <el-button
                class="btn-add"
                type="primary"
                @click="handleAddHotel"
                size="mini">
                提交
            </el-button> -->
        </el-card>
        <el-card class="content-container">
            <div class="table-container">
                <el-table ref="productTable"
                            :header-cell-style="{fontSize:'15px'}"
                            :data="list"
                            style="width: 100%"
                            >
                    <el-table-column label="酒店" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.hotelId}}</template>
                    </el-table-column>
                    <el-table-column label="酒店图片" width="120" align="center">
                    <template slot-scope="scope"><img style="height: 80px" :src="scope.row.img"></template>
                    <!-- <template slot-scope="scope"><img style="height: 80px" :src="'http://101.132.138.185/:8080/'+scope.row.img"></template> -->
                    </el-table-column>
                    <el-table-column label="酒店名称" prop="hotelName" :show-overflow-tooltip='istooltip' align="center">
                    </el-table-column>
                    <el-table-column label="酒店ID" prop="hotelCardId" align="center">
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
                    <el-table-column label="街道编码" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row.streetCode}}</template>
                    </el-table-column>
                    <el-table-column label="酒店状态" :show-overflow-tooltip='istooltip' align="center">
                        <template slot-scope="scope">{{scope.row.userStatus}}</template>
                    </el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip='istooltip' width="160"   align="center">
                    <template slot-scope="scope">
                        <p>
                        <el-button
                            size="mini"
                            @click="handleUpdateProduct(scope.$index, scope.row)">编辑
                        </el-button>
                         <el-button
                            size="mini"
                            type="primary"
                            @click="handleSearch(scope.$index, scope.row)">查看
                        </el-button>
                        <!-- <el-button
                            size="mini"
                            type="danger"
                            @click="handleCancle(scope.$index, scope.row)">删除
                        </el-button> -->
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
            width="40%">
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
            <el-form-item label="所属街道：" prop="streetCode">
                <el-cascader
                    :props="props"
                    v-model="areaCode"
                    :disabled="isEdit">
                </el-cascader>
                <el-select 
                    :disabled="isEdit"
                    v-model="editHotel.streetCode" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in streetCodeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>
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
import { queryMyHotel, updateHotel } from '@/api/hotelBusiness'
import { formatDate } from '@/utils/date'

export default {
    data () {
        return {
            list:[],
            total:10,
            editHotel:{},
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
            isEdit:false,
            isloading:false,
            streetCodeOptions:[],
            istooltip:true,
            editDialogVisible:false,
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        
        //查看酒店信息
        handleSearch(index, row){
            let self = this;
            self.filterStreetCode(row.streetCode);
            self.editHotel = row;
            self.isEdit = true;
            self.isloading = true;
            self.editDialogVisible = true;
        },
        //编辑酒店信息
        handleUpdateProduct(idnex, row){
            let self = this;
            self.filterStreetCode(row.streetCode);
            self.editHotel = row;
            self.isloading = true;
            self.isEdit = false;
            self.editDialogVisible = true;
        },
        //确认并提交
        handleEditConfirm(){
            let self = this;
            console.log(self.editHotel);
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
        //过滤省市区编码
        filterStreetCode(code){
            let self = this;
            // let str = code;
            if(code){
                self.areaCode = [
                    code.slice(0,2)+'0000',
                    code.slice(0,4)+'00',
                    code.slice(0,6)]
            }
            queryStreet(self.areaCode[2], 1, 1000).then(response => {
                let list = response.data.records;
                const nodes = list.map(x=>({
                    value: x.streetCode,
                    label: x.shortName,
                }))
                this.streetCodeOptions = nodes;
                setTimeout(() => {
                    self.isloading = false;
                }, 1000);
            });
        },
        //获取我的酒店列表
        getList(){
            let self = this;
            queryMyHotel().then(response => {
                this.list = response.data;
                this.total = response.data.length;
            });
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

</style>
