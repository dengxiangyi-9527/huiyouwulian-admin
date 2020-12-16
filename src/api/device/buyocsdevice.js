

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/yry/buyocsdevice/page',
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

export function confirmEqui (query) {
  return request({
    url: 'yry/buyocsdevice/checkDevice',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/yry/buyocsdevice',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/yry/buyocsdevice/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/yry/buyocsdevice/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/yry/buyocsdevice',
    method: 'put',
    data: obj
  })
}
