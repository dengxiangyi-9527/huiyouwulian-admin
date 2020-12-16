

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/yry/pay/payprofitsconfig/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/yry/pay/payprofitsconfig',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/yry/pay/payprofitsconfig/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/yry/pay/payprofitsconfig/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/yry/pay/payprofitsconfig',
    method: 'put',
    data: obj
  })
}

export function forbidden(id) {
  return request({
    url: '/yry/pay/payprofitsconfig/forbidden',
    method: 'post',
    data: "["+id+"]",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  })
}

export function updateVliFlg(id) {
  return request({
    url: '/yry/pay/payprofitsconfig/updateVliFlg',
    method: 'post',
    data: "["+id+"]",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  })
}

export function fenRunConfList() {
  return request({
    url: '/yry/pay/payprofitsconfig/fenRunConfList',
    method: 'get'
  })
}
