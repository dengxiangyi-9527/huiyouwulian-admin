

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/yry/mall/brand/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/yry/mall/brand',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/yry/mall/brand/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/yry/mall/brand/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/yry/mall/brand',
    method: 'put',
    data: obj
  })
}
