import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/yry/assets/deviceInvest/query',
    method: 'get',
    params: query
  })
}

export function getObj (query) {
  return request({
    url: '/yry/assets/deviceInvest/memDevInvestList',
    method: 'get',
    params: query
  })
}
export function getMemberList () {
  return request({
    url: '/yry/assets/deviceInvest/readMemberList',
    method: 'post',
  })
}

export function getDeviceData (data) {
  return request({
    url: '/yry/assets/deviceInvest/changeAutomaticDev',
    method: 'post',
    data: data,
  })
}
