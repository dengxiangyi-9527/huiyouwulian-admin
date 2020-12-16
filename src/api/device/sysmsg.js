

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/sysmsg/deviceMsgPage',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/sysmsg',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/sysmsg/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/sysmsg/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/sysmsg',
    method: 'put',
    data: obj
  })
}
