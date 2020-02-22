<template>
    <div class="app-wapper">
        <el-row >
            <el-col >
                <div class="userInfo">
                    <el-card :body-style="{ padding: '0px',}">
                        <img src="@/assets/img/wKgB4lNnkPCAX0-3AAI_PDTg8TQ20.jpeg" class="image">
                    </el-card>
                    <p class="userName">{{userName}}</p>
                </div>
            </el-col>
        </el-row> 
        <div class="main-container">
            2313213
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            defaultOpends:['1','2'],
            userName:'',
        }
    },
    computed: {
        ...mapGetters(['name'])
    },
    created(){
    },
    mounted(){
        this.$nextTick(function(){
            this.userName = this.name;
        });
        // this.goTo('/hotelBusiness/myHotel');
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-wapper{
    position: relative;
    height: 100%;
    width: 100%;
    .el-row{
        height: 100%;
        background-color: #fbfbfb !important;
        position: fixed;
        border-right: 1px solid #e6e6e6;
        font-size: 0px;
        top: 59px;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        .el-col-24{
            padding-top: 30px;
        }
        .userInfo{
            width: 200px;
            height: 175px;
            text-align: center;
            font-size: 18px;
            padding-top: 5px;
            background-color: #fbfbfb !important;
            .el-card{
                width: 120px;
                height: 120px;
                position: absolute;
                left:50%;
                margin-top: 5px;
                margin-left:-60px;
                border-radius: 60px;
                border: 2px solid #f5f7fa;
                .image{
                    width: 120px;
                    height: 120px;
                }
            }
            .el-card.is-always-shadow {
                -webkit-box-shadow: 0 2px 12px 0 rgba(82, 81, 81, 0.4);
                box-shadow: 0 2px 12px 0 rgba(82, 81, 81, 0.4);
            }
           
        }
        .userName{
            width: 200px;
            height: 33px;
            padding: 140px 0 5px 0px;
        }
    }
    .main-container{
       padding: 10px 20px;
    }
}


</style>