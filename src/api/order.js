import request from '@/utils/request'
export function orderList(data) {
  return request({
    url: '/sale/order/admin/list',
    method: 'post',
    data: data
  })
}
export function orderDetail(id) {
  return request({
    url: `/sale/order/admin/detail/${id}`,
    method: 'get'
  })
}
// 添加发票
export function addInvoice(data) {
  return request({
    url: `/finance/invoice`,
    method: 'post',
    data: data
  })
}
// 新增和编辑运单
export function addLogistics(data) {
  return request({
    url: `/sale/order/admin/express`,
    method: `put`,
    data: data
  })
}
// 删除运单
export function delLogistics(id) {
  return request({
    url: `/sale/order/admin/express/${id}`,
    method: `delete`
  })
}
