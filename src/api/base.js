import request from '@/utils/request'
// 获取行业类型
export function getIndustry() {
  return request({
    url: '/public/sys/dict/type/SYS_INDUSTRY',
    method: 'get'
  })
}
// 获取所有城市
export function getAllCity() {
  return request({
    url: '/public/sys/area/all',
    method: 'get'
  })
}
// 获取订单类型
export function getOrderType() {
  return getDict('EDUCATION_ORDER_TYPE')
}
// 获取支付类型
export function getPayType() {
  return getDict('FINANCE_PAYMENT_METHOD')
}
function getDict(name) {
  return request({
    url: `/public/sys/dict/type/${name}`,
    method: 'get'
  })
}
