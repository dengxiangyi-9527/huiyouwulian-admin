import request from '@/router/axios'

export function listKeyword(query) {
  return request({
    url: '/yry/mall/keyword/list',
    method: 'get',
    params: query
  })
}

export function createKeyword(data) {
  return request({
    url: '/yry/mall/keyword/save',
    method: 'post',
    data
  })
}

export function readKeyword(data) {
  return request({
    url: '/yry/mall/keyword/info',
    method: 'get',
    data
  })
}

export function updateKeyword(data) {
  return request({
    url: '/yry/mall/keyword/update',
    method: 'post',
    data
  })
}

export function deleteKeyword(data) {
  return request({
    url: '/yry/mall/keyword/delete',
    method: 'post',
    data
  })
}
