<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-05 14:19:43
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-07 17:49:58
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
            
        </el-card>
       
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

</style>
