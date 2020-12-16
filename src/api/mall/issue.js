import request from '@/router/axios'

export function listIssue(query) {
  return request({
    url: '/yry/mall/issue/list',
    method: 'get',
    params: query
  })
}

export function createIssue(data) {
  return request({
    url: '/yry/mall/issue/save',
    method: 'post',
    data
  })
}

export function readIssue(data) {
  return request({
    url: '/yry/mall/issue/info',
    method: 'get',
    data
  })
}

export function updateIssue(data) {
  return request({
    url: '/yry/mall/issue/update',
    method: 'post',
    data
  })
}

export function deleteIssue(data) {
  return request({
    url: '/yry/mall/issue/delete',
    method: 'post',
    data
  })
}
