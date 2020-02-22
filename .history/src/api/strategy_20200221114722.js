/*
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-19 10:53:01
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-21 11:47:22
 */
import request from '@/utils/request'

export function addStrategy(params) {
  return request({
    url: '/article/add',
    method: 'post',
    data: params
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