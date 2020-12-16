

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/yry/manualorder/page',
    method: 'get',
    params: query
  })
}

export function memberList (query) {
  return request({
    url: '/yry/app/member/readMemberByPhoneAndTenantId',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/yry/manualorder/saveXP',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/yry/manualorder/' + id,
    method: 'get'
  })
}

export function goodsList (query) {
  return request({
    url: '/yry/mall/goods/page',
    method: 'get',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/yry/manualorder/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/yry/manualorder',
    method: 'put',
    data: obj
  })
}

export function examine (obj) {
  return request({
    url: '/yry/manualorder/audit',
    method: 'post',
    data: obj
  })
}

export function examine1 (obj) {
  return request({
    url: '/yry/manualorder/auditSuppl',
    method: 'post',
    data: obj
  })
}