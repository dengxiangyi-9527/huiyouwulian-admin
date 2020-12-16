import request from '@/router/axios'
import Qs from 'qs'

export function listOrder(query) {
  return request({
    url: '/yry/mall/order/list',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

export function detailOrder(id) {
  return request({
    url: '/yry/mall/order/detail',
    method: 'get',
    params: { id }
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
    url: '/yry/mall/order/refund',
    method: 'post',
    data
  })
}

export function replyComment(data) {
  return request({
    url: '/yry/mall/order/reply',
    method: 'post',
    data
  })
}
