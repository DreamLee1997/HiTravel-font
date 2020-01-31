/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-01-09 19:48:30
 * @LastEditors: lixiang
 * @LastEditTime: 2020-01-28 09:41:19
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://101.132.138.185:8080"'
  // BASE_API: '"http://39.98.190.128:8080"',
})

