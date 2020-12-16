import request from '@/router/axios'
export function policy() {
  return request({
    url:'/admin/aliyun/oss/policy',
    method:'get',
  })
}
