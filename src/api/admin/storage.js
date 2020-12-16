import request from '@/router/axios'

export function listStorage(query) {
  return request({
    url: '/yry/storage/list',
    method: 'get',
    params: query
  })
}

export function createStorage(data) {
  return request({
    url: '/yry/oss/ossstorage/create',
    method: 'post',
    data
  })
}

export function readStorage(data) {
  return request({
    url: '/yry/oss/ossstorage/read',
    method: 'get',
    data
  })
}

export function updateStorage(data) {
  return request({
    url: '/yry/oss/ossstorage/update',
    method: 'post',
    data
  })
}

export function deleteStorage(data) {
  return request({
    url: '/yry/oss/ossstorage/delete',
    method: 'post',
    data
  })
}

const uploadPath = process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' :  '/yry/oss/ossstorage/create'
export { uploadPath }
