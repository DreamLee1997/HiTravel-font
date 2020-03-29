<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-03-20 17:14:17
 * @LastEditors: lixiang
 * @LastEditTime: 2020-03-22 14:14:00
 -->
<template>
  <div class="hotelDetial">
    <div class="main">
        <div class="main-in">
            <div class="main-in-top">
                <a class="order">订酒店</a>><a class="order">订房间</a>
            </div>
            <div class="main-in-bottom" >
              
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {  
       
    };
  },
  components:{
    },
  mounted() {
    
  },
  methods: {
    
  },
  destroyed() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hotelDetial{
    .main {
        margin-top:20px;
        .main-in {
            width:1000px;
            margin:0 auto;
            .main-in-top {
                .order{
                  color: #f39901;
                }
                .order:hover{
                  cursor:pointer;
                  text-decoration:underline;
                }
            }
        }
    }
}

</style>
