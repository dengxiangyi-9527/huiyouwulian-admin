import request from '@/router/axios'

export function addressList(query) {
  return request({
    url: '/yry/home/getSysAreaAll',
    method: 'get',
    params: query
  })
}