import request from '@/router/axios'

export function listBrand (query) {
  return request({
    url: '/yry/mall/ad/list',
    method: 'get',
    params: query
  })
}

export function addObj (data) {
  return request({
    url: '/yry/mall/ad/save',
    method: 'post',
    data
  })
}

export function getObj (data) {
  return request({
    url: '/yry/mall/ad/info/'+data,
    method: 'get',
    data
  })
}

export function putObj (data) {
  return request({
    url: '/yry/mall/ad/update',
    method: 'post',
    data
  })
}

export function deleteBrand (data) {
  return request({
    url: '/yry/mall/ad/delete/'+data,
    method: 'get',
    data
  })
}

export function enabledObj (id,data) {
  return request ({
    url: '/yry/mall/ad/updateByEnabled/'+ id +'/'+ data,
    method: 'get',
    data
  })
}
