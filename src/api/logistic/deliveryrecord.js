

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/yry/logistics/deliveryRecord/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/yry/logistics/deliveryRecord',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/yry/logistics/deliveryRecord/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/yry/logistics/deliveryRecord/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/yry/logistics/deliveryRecord',
    method: 'put',
    data: obj
  })
}

export function getMemberList () {
  return request({
    url: '/yry/logistics/deliveryRecord/readMemberList',
    method: 'post',
  })
}

export function getDelieveMemberList () {
  return request({
    url: '/yry/logistics/deliveryRecord/readDeliverMemberList',
    method: 'post',
  })
}

export function dispatch (obj) {
  return request({
    url: 'yry/logistics/deliveryRecord/singleOrder',
    method: 'post',
    data: obj
  })
}

export function reassignmentOrder (obj) {
  return request({
    url: '/yry/logistics/deliveryRecord/reassignmentOrder',
    method: 'post',
    data: obj
  })
}


export function cancelOrder (obj) {
  return request({
    url: '/yry/logistics/deliveryRecord/cancelOrder',
    method: 'post',
    data: obj
  })
}
