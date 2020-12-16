

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/yry/mall/feedback/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/yry/mall/feedback',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/yry/mall/feedback/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/yry/mall/feedback/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/mall/feedback',
    method: 'put',
    data: obj
  })
}
