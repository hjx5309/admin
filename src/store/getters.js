const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  path: state => state.user.path,
  loading: state => state.app.loading,
  redict: state => state.app.redict,
  /**
 * @method
 * @property  {Type} data 订单页面的下拉参数
 */
  // 1 为启用 2 为禁用
  statusType: state => state.base.statusType,
  /**
 * @method
 * @property  {Type} data 订单页面的下拉参数
 * @returns {Type} 运营商名称
 * @desc 根据目标对象获取运营商
 */
  // 缴费方式
  paymentSourceOptions: state => state.base.paymentSourceOptions,
  // 订单状态下拉
  orderStatusOptions: state => state.base.orderStatusOptions,
  // 发票状态
  billStatusOptions: state => state.base.billStatusOptions,
  // 订单来源
  billSouresOptions: state => state.base.billSouresOptions

}
export default getters
