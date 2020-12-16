

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/yry/pay/paywithdrawalrecord/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/yry/pay/paywithdrawalrecord',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/yry/pay/paywithdrawalrecord/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/yry/pay/paywithdrawalrecord/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/yry/pay/paywithdrawalrecord',
    method: 'put',
    data: obj
  })
}


export function readMemberList() {
  return request({
    url: '/yry/pay/paywithdrawalrecord/readMemberList',
    method: 'post',
  })
}


export function withdrawalCompleteRecord(id,obj) {
  return request({
    url: '/yry/pay/paywithdrawalrecord/withdrawalComplete/' + id+'?userId='+obj,
    method: 'put',
  })
}

export function withdrawalApproval(obj) {
  return request({
    url: '/yry/pay/paywithdrawalrecord/withdrawalApproval',
    method: 'post',
    data: obj
  })
}

export function withdrawalCancel(obj) {
  return request({
    url: '/yry/pay/paywithdrawalrecord/withdrawalCancel',
    method: 'post',
    data: obj
  })
}
