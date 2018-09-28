import request from '@/utils/request'
// 获取机构，企业，监管
export function getOrgan(params) {
  return request({
    url: '/sys/organ',
    method: 'get',
    params
  })
}
// 添加机构，企业，监管
export function addOrgan(params) {
  return request({
    url: '/sys/organ',
    method: 'post',
    data: params
  })
}
// 编辑机构，企业，监管
export function editOrgan(params) {
  return request({
    url: '/sys/organ/' + params.id,
    method: 'put',
    data: params
  })
}
// 删除机构，企业，监管
export function deleOrgan(id) {
  return request({
    url: '/sys/organ/' + id,
    method: 'delete'
  })
}
// 禁用与启用机构，企业，监管
export function startOrgan(id, status) {
  return request({
    url: `/sys/organ/${id}/status/${status}`,
    method: 'put'
  })
}
// 重置密码
export function resetPass(id) {
  return request({
    url: `/sys/adminuser/${id}/resetpassword`,
    method: `post`
  })
}
