import request from '@/router/axios'

export function listCategory(query) {
  return request({
    url: '/yry/mall/category/list',
    method: 'get',
    params: query
  })
}

export function listCatL1() {
  return request({
    url: '/yry/mall/category/l1',
    method: 'get'
  })
}

export function createCategory(data) {
  return request({
    url: '/yry/mall/category/save',
    method: 'post',
    data
  })
}

export function readCategory(data) {
  return request({
    url: '/yry/mall/category/read',
    method: 'get',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/yry/mall/category/update',
    method: 'post',
    data
  })
}

export function deleteCategory(data) {
  return request({
    url: '/yry/mall/category/delete',
    method: 'post',
    data
  })
}
