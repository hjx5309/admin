<template>
  <div>
     <table class="gridtable" width="800px" border="1" cellspacing="0" cellpadding="0">
       <tr>
         <td>订单号</td>
         <td>{{obj.transactionNo}}</td>
         <td>订单类型</td>
         <td>{{obj.orderTypeName}}</td>
       </tr>
       <tr>
         <td>产品名称</td>
         <td>{{obj.productName}}</td>
         <td>支付时间</td>
         <td>{{obj.orderStatus===2?obj.orderStatusUpdateTime:'-'}}</td>
       </tr>
       <tr>
         <td>所属企业</td>
         <td>{{obj.organName}}</td>
         <td>客户名称</td>
         <td>{{obj.customerName}}</td>
       </tr>
       <tr>
         <td>应付金额</td>
         <td>{{obj.totalPrice}}</td>
         <td>实付金额</td>
         <td>{{obj.orderStatus===2?obj.factPrice:'-'}}</td>
       </tr>
         <tr>
         <td>支付方式</td>
         <td>{{obj.paymentMethodName}}</td>
         <td>订单状态</td>
         <td>{{obj.orderStatusName}}</td>
       </tr>
         <tr>
         <td>发票状态</td>
         <td>{{obj.invoiceStatusName}}</td>
         <td>物流状态</td>
         <td>{{obj.delivery?'发货':'未发货'}}</td>
       </tr>
          <tr>
         <td>下单时间</td>
         <td>{{obj.createTime}}</td>
         <td></td>
         <td></td>
       </tr>
     </table>
  </div>
</template>
<script>
import { orderDetail } from '@/api/order'
export default {
  data() {
    return {
      id: '',
      obj: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      orderDetail(this.id).then(res => {
        this.obj = res.data
      })
    }
  }
}
</script>
