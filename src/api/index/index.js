import request from '@/router/axios'
export function chartList(query) {
    return request({
      url: '/yry/home/getTodayMember',
      method: 'get',  
      params: query  
    })
  }
  