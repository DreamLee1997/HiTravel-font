<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-20 09:38:03
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-20 12:14:30
 -->
<template>
  <div class="srategy-container">
    <div style="margin: 20px 160px 0 160px;">
        <div>{{strategyInfo.title}}</div>

                我的但是看见了
    </div>
  </div>
</template>

<script>
import { Quill, quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "../../../assets/css/font.css"; //引入font.css
import { queryProvince, queryCity } from "@/api/area";
import { addStrategy } from "@/api/strategy";


export default {
    name: "wirteStrategy",
    data() {
        return {
            strategyId:'',
            strategyInfo: {
                content:''
                // content:
                //   '<p>sddsdadsa</p><p><br></p><p>dssdaa</p><p><br></p><p><br></p><p><img src="http://101.132.138.185:8080//img/adb07f25-f57b-4c2c-8111-e26819b80272.jpeg"></p><p><br></p><h3>Sddas的</h3>'
            },
            cityCode: [],
        };
    },
    mounted() {
        let self = this;
        self.strategyId = self.$route.query.id;
        queryArticleById(self.strategyId).then(res => {
            // self.strategyInfo = res.data
            
        });
    },
    methods: {
    
        
    }
};
</script>

<style lang="scss" scoped>
@charset "utf-8";
.srategy-container {
  padding: 20px 40px;
}

</style>
