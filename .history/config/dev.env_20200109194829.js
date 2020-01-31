'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://wuweijie.net:8088"'
  // BASE_API: '"http://39.98.190.128:8080"',
})
