<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-19 10:06:56
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-04 10:50:42
 -->
<template>
    <div id="login" :style="{backgroundImage:'url('+require('./../../assets/img/login-background.jpg')+')'}">
        <el-card class="login-card">
            <div class="logo-img" style="align: center">
                <img src="./../../assets/img/header-logo1.png" width="120" height="50" alt="" />
                <!-- <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #fd9e00b3"></svg-icon> -->
            </div>
            <div class="input-text">
                <el-form 
                    autoComplete="on"
                    :model="userInfo"
                    ref="loginForm"
                    label-position="left">
                    <el-form-item prop="userType" style="text-align: center;">
                        <el-radio-group 
                            v-model="userInfo.userType" 
                            class="userInfo"
                            >
                            <el-radio :label="1">游客</el-radio>
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
                            @keyup.enter.native="handleLogin"
                            v-model="userInfo.password" 
                            autoComplete="on"
                            show-password
                            prefix-icon="el-icon-lock"
                        ></el-input>
                    </el-form-item>
                    <span class="login" >新用户，去
                        <a class="login-a"  @click="handleRegister" >注册</a>
                    </span>
                    <el-form-item style="margin-top: 53px;text-align: center">
                        <el-button 
                            style="width: 35%" 
                            type="primary" 
                            @click.native.prevent="handleLogin">登陆
                        </el-button>                   
                    </el-form-item>
                    
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {isvalidUsername} from '@/utils/validate';
import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';

export default {
    name: 'login',
    data(){
        return {
            userInfo:{
                username:'',
                password:'',
                userType:1,
            },
            loading: false,
        }
        
    },
    methods:{
        //登陆处理
        handleLogin(){
            let self = this;
            console.log(this.userInfo);
            this.$store.dispatch('Login', this.userInfo).then(() => {
              setCookie("username",this.userInfo.username,15);
              setCookie("password",this.userInfo.password,15);
            
            }).catch(() => {
            })
        },
        //跳转至注册页面
        handleRegister(){
            console.log('register');
            this.$router.push({path:'/register'});
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

#login{
    width: 100%;
    height: 789px;
    .login-card{
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
            height: 50px;
            padding: 13px 0 0 0px;
            position: relative;
            img {
                position: absolute;
                left: 50%;
                margin-left: -50px;
            }
        }
        .input-text{
            width: 387px;
            .userInfo {
                margin: 30px 20px 0 10px;
            }
            .login{
                padding: 12px 0;
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
