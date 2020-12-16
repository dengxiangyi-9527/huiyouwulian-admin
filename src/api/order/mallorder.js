

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/yry/order/mallorder/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/yry/order/mallorder',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/yry/order/mallorder/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/yry/order/mallorder/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/yry/order/mallorder',
    method: 'put',
    data: obj
  })
}

export function shipOrder(data) {
  return request({
    url: '/yry/mall/order/ship',
    method: 'post',
    data
  })
}


export function refundOrder(data) {
  return request({
    url: '/yry/order/mallorder/orderRefund',
    method: 'post',
    data
  })
}

export function readOfflinePaymentList(data) {
  return request({
    url: '/yry/order/mallorder/readOfflinePaymentList',
    method: 'get',
    params: data
  })
}

export function dealOrderPaymentOffline(data) {
  return request({
    url: '/yry/order/mallorder/dealOrderPaymentOffline/'+data,
    method: 'get'
  })
}

export function fetchPageList(query) {
  return request({
    url: '/yry/order/mallorder/pageList',
    method: 'get',
    params: query
  })
}
