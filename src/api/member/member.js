

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: 'yry/member/member/list',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: 'yry/member/member/save',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: 'yry/member/member/info/' + id,
    method: 'get'
  })
}
//删除
export function delObj (id) {
  return request({
    url: 'yry/member/member/delete/' + id,
    method: 'post'
  })
}
//修改
export function putObj (obj) {
  return request({
    url: 'yry/member/member/update',
    method: 'post',
    data: obj
  })
}

//修改身份
export function putUserObj (obj) {
  return request({
    url: 'yry/member/member/editMemPower',
    method: 'post',
    data: obj
  })
}

//会员身份列表
export function getUserList (query) {
  return request({
    url: '/yry/member/member/getMemPowerList',
    method: 'get',
    params: query

  })
}