<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-19 10:09:27
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-01-28 11:22:24
 -->
<template>
    <div id="register" 
        :style="{backgroundImage:'url('+require('./../../assets/img/login-background.jpg')+')'}">
        <el-card class="register-card">
            <div class="logo-img" style="align: center">
                <img src="./../../assets/img/header-logo1.png" width="120" height="50" alt="" />
            </div>
            <div class="input-text">
                <el-form 
                    autoComplete="on"
                    :model="userInfo"
                    ref="registerForm"
                    label-position="left">
                    <el-form-item prop="userType" style="text-align: center;">
                        <el-radio-group 
                            v-model="userInfo.userType" 
                            class="userInfo"
                            >
                            <el-radio :label="1">游客2</el-radio>
                            <el-radio :label="2">酒店商户</el-radio>
                            <el-radio :label="3">景区商户</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input 
                            class="userInfo" 
                            placeholder="请输入用户名" 
                            v-model="userInfo.username"
                            autoComplete="on"
                            prefix-icon="el-icon-user"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input 
                            class="userInfo" 
                            placeholder="请输入密码" 
                            v-model="userInfo.password" 
                            show-password
                            autoComplete="on"
                            prefix-icon="el-icon-lock"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input 
                            class="userInfo" 
                            placeholder="请输入邮箱" 
                            v-model="userInfo.email" 
                            autoComplete="on"
                            prefix-icon="el-icon-message"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input 
                            class="userInfo" 
                            placeholder="请输入手机号" 
                            v-model="userInfo.phone" 
                            autoComplete="on"
                            prefix-icon="el-icon-phone"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="realname">
                        <el-input 
                            class="userInfo" 
                            placeholder="请输入真实姓名" 
                            v-model="userInfo.realname" 
                            autoComplete="on"
                            prefix-icon="el-icon-user-solid"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="cardId">
                        <el-input 
                            class="userInfo" 
                            placeholder="请输入身份证号" 
                            @keyup.enter.native="handleRegister"
                            v-model="userInfo.cardId" 
                            autoComplete="on"
                            prefix-icon="el-icon-postcard"
                        ></el-input>
                    </el-form-item>
                    <span class="login" >已有账号，去
                        <a class="login-a"  @click="handleLogin" >登录</a>
                    </span>
                    <el-form-item style="margin-top: 24px;text-align: center">
                        <el-button 
                            style="width: 35%" 
                            type="primary" 
                            @click.native.prevent="handleRegister">注册
                        </el-button>                   
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {isvalidUsername} from '@/utils/validate';
import {register} from '@/api/register'

export default {
    name: 'register',
    data(){
        return {
            userInfo:{
                username:'',
                password:'',
                userType:1,
                
            },
            RegisterForm:{
                username:'',
                password:''
            },
            typeOptions:[{
                value: 1,
                label: '游客'
            }, {
                value: 2,
                label: '酒店商户'
            }, {
                value: 3,
                label: '景区商户'
            }],
            loading: false,
            
        }
        
    },
    methods:{
        //跳转至登陆页面
        handleLogin(){
            this.$router.push({path:'/login'});
        },
        //注册处理
        handleRegister(){
            let self = this;
            // this.userInfo.createTime = new Date();
            console.log(1+this.userInfo);
            register(this.userInfo).then(response => {
               self.$message({
                    message: '成功',
                    type: 'success',
                    duration: 1000
                });
                self.$router.push({path:'/login'});
            });
            
        }
    }
    
}
</script>

<style lang="scss" scoped>
@charset "utf-8";
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,p,th,td {
    margin:0;
    padding:0;
}
body {
    font-size:12px;
    color:#3C3C3C;
}

#register{
    width: 100%;
    height: 789px;
    .register-card{
        width: 450px;
        height: 460px;
        background: #e4e7ed87;
        border-radius: 10px;
        position:absolute;
        left:0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        .logo-img{
            width: 375px;
            height: 40px;
            position: relative;
            img {
                position: absolute;
                left: 50%;
                margin-left: -50px;
            }
        }
        .input-text{
            width: 387px;
            font-size: 14px;
            .userInfo {
                margin: 8px 20px 0 10px;
            }
            .login{
                padding: 2px 0;
                font-size: 14px;
                float: right;
                .login-a{
                    color: #f59900;
                    font-size: 14px;
                    text-decoration:underline;
                    cursor:pointer;
                }
            }
        }
        
    }
}

</style>