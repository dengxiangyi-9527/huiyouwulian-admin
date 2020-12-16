

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/yry/goodsGive/mallgoodsgive/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/yry/goodsGive/mallgoodsgive/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/yry/goodsGive/mallgoodsgive/info/' + id,
    method: 'get'
  })
}

export function delObj(data) {
  return request({
    url: '/yry/goodsGive/mallgoodsgive/delete' ,
    method: 'post',
    data:data
  })
}

export function putObj(obj) {
  return request({
    url: '/yry/goodsGive/mallgoodsgive/update',
    method: 'put',
    data: obj
  })
}
