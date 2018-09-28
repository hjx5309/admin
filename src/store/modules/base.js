const base = {
  state: {
    // 启用或禁用
    statusType: [
      { name: '启用', code: 1 },
      { name: '禁用', code: -1 }
    ],
    // 订单列表的订单状态下拉
    orderStatusOptions: [
      { name: '待支付', code: 1 },
      { name: '已支付', code: 2 },
      { name: '已取消', code: 3 },
      { name: '超时取消', code: 4 }
    ],
    // 订单列表的发票状态
    billStatusOptions: [
      { name: '待开票', code: 1 },
      { name: '已开票', code: 2 }
    ],
    // 订单列表的订单来源
    billSouresOptions: [
      { name: '职员缴费', code: 1 },
      { name: '企业缴费', code: 3 }
    ]
  }
}
export default base
