

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/orgacount/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/orgacount',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/orgacount/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/orgacount/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/orgacount',
    method: 'put',
    data: obj
  })
}


export function createWithdrawalHandle(data){
  return request({
    url: '/yry/pay/paywithdrawalrecord/createAreaWithdrawal',
    method: 'post',
    data: data
  })
}


export function clearAreaAccount(data){
  return request({
    url: '/yry/pay/paywithdrawalrecord/clearAreaAccount',
    method: 'post',
    data: data
  })
}

