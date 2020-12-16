

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/yry/applymachine/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/yry/applymachine',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/yry/applymachine/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/yry/applymachine/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/yry/applymachine',
    method: 'put',
    data: obj
  })
}
