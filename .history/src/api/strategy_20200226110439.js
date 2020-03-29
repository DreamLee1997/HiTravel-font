/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 10:53:01
 * @LastEditors: lixiang
 * @LastEditTime: 2020-02-26 11:04:39
 */
import request from '@/utils/request'

export function addStrategy(params) {
  return request({
    url: '/article/add',
    method: 'post',
    data: params
  })
}

export function updateStrategy(params) {
  return request({
    url: '/article/update',
    method: 'post',
    data: params
  })
} 

export function deleteStrategy(articleId) {
  return request({ 
    url: '/article/deleteById?articleId=' + articleId,
    method: 'get',
  })
}
export function queryMyStrategy(status, pageNo, pageSize) {
  if (status) {
    return request({
      url: '/article/queryMyArticle?status=' + status + '&pageNo=' + pageNo + '&pageSize=' + pageSize,
      method: 'get',
    })
  } else {
    return request({
      url: '/article/queryMyArticle?pageNo=' + pageNo + '&pageSize=' + pageSize,
      method: 'get',
    })
  }
}
export function fetchList(pageNo, pageSize, type,  status, cityName) {
  if (cityName != 'undefined') {
      return request({
          url: status != 'undefined' ? ('/article/queryArticleByPage?cityName=' + cityName + '&type=' + type
           + '&status=' + status + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
              : ('/article/queryArticleByPage?cityName=' + cityName +'&type=' + type + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
          method: 'get',
      })
  } else {
      return request({
          url: status !='undefined' ? ('/article/queryArticleByPage?type=' + type
           + '&status=' + status + '&pageNo=' + pageNo + '&pageSize=' + pageSize)
              : ('/article/queryArticleByPage?type=' + type + '&pageNo=' + pageNo + '&pageSize=' + pageSize),
          method: 'get',
      })
  }
}

export function queryArticleById(articleId) {
  return request({
    url: '/article/queryArticleById?articleId=' + articleId,
    method: 'get',
  })
}

export function praiseArticleById(articleId) {
  return request({
    url: '/article/praise?articleId=' + articleId,
    method: 'get',
  })
}

export function collectArticleById(articleId) {
  return request({
    url: '/article/collection?articleId=' + articleId,
    method: 'get',
  })
}

export function commitArticleById(articleId, content) {
  return request({
    url: '/article/comment?articleId=' + articleId + '&content=' + content,
    method: 'get',
  })
}

export function queryCommentList(articleId, pageNo, pageSize) {
  return request({
    url: '/article/queryCommentByArticleId?articleId=' + articleId + '&pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'get',
  })
}

export function queryMyCollection(articleId) {
  return request({
    url: '/article/myCollection' ,
    method: 'get',
  })
}