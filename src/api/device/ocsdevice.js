

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/yry/assets/ocsdevice/query',
    method: 'get',
    params: query
  })
}
export function memberList () {
  return request({
    url: '/yry/assets/ocsdevice/readMemberList',
    method: 'post'
  })
}
export function addObj (obj) {
  return request({
    url: '/yry/app/deviceMsg/sendInstruct',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/yry/device/ocsdevice/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/yry/assets/ocsdevice/delete' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/yry/device/ocsdevice',
    method: 'put',
    data: obj
  })
}
//解绑
export function adornUrl (obj) {
  return request({
    url: '/yry/assets/ocsdevice/sendInstruct',
    method: 'post',
    data: obj
  })
}

export function edornUrl (obj) {
  return request({
    url: '/yry/app/deviceMsg/sendInstruct',
    method: 'post',
    data: obj
  })
}

export function validOnLine (obj) {
  return request({
    url: '/yry/assets/ocsdevice/validOnLine/'+obj,
    method: 'post',
  })
}


export function queryRechargeRecordList (obj) {
  return request({
    url: '/yry/assets/ocsdevice/queryRechargeRecordList',
    method: 'get',
    params: obj
  })
}
