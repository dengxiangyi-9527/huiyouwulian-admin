import request from '@/router/axios'

export function listBrand (query) {
  return request({
    url: '/yry/mall/brand/page',
    method: 'get',
    params: query
  })
}

export function createBrand (data) {
  return request({
    url: '/yry/mall/brand/save',
    method: 'post',
    data
  })
}

export function readBrand (data) {
  return request({
    url: '/yry/mall/brand/info',
    method: 'get',
    data
  })
}

export function updateBrand (data) {
  return request({
    url: '/yry/mall/brand/update',
    method: 'post',
    data
  })
}

export function deleteBrand (data) {
  return request({
    url: '/yry/mall/brand/delete',
    method: 'post',
    data
  })
}
