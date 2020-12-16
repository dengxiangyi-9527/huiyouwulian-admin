

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/yry/mall/category/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/yry/mall/category',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/yry/mall/category/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/yry/mall/category/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/yry/mall/category',
    method: 'put',
    data: obj
  })
}

export function catL1 () {
  return request({
    url: '/yry/mall/category/l1',
    method: 'get'
  })
}
