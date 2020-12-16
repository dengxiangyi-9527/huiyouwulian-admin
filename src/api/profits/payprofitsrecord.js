

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/yry/pay/payprofitsrecord/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/yry/pay/payprofitsrecord',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/yry/pay/payprofitsrecord/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/yry/pay/payprofitsrecord/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/yry/pay/payprofitsrecord',
    method: 'put',
    data: obj
  })
}

export function getMemberList () {
  return request({
    url: '/yry/pay/payprofitsrecord/readMemberList',
    method: 'post',
  })
}

export function wxTrans (obj) {
  return request({
    url: '/yry/pay/payprofitsrecord/wxTransList',
    method: 'post',
    data: obj
  })
}

export function createWithdrawal (obj) {
  return request({
    url: '/yry/pay/payprofitsrecord/createWithdrawal',
    method: 'post',
    data: obj
  })
}
