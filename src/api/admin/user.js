

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: obj
  })
}

export function confirmPass (obj) {
  return request({
    url: '/admin/user/editUserPassword',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}

export function getDetails (obj) {
  return request({
    url: '/admin/user/details/' + obj,
    method: 'get'
  })
}

export function rechargePrice (obj) {
  return request({
    url: 'yry/member/yys_member/findConfig',
    method: 'get',
    data: obj
  })
}

export function payRecord (obj) {
  return request({
    url: 'yry/user/wxPay/addPayRecord',
    method: 'Post',
    data: obj
  })
}

export function wxPay (query) {
  return request({
    url: 'yry/user/wxPay/WxsmPrepay',
    method: 'get',
    params: query,
    header: ('Content-type:image/png')

  })
}