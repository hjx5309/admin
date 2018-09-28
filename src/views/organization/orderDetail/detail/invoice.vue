<template>
  <div>
    <el-button plain type="primary" v-if="orderStatus=='2'&&invoiceStatus=='1'" style="margin-bottom:10px;" @click="open">开发票</el-button>
    <table class="gridtable" width="800px" border="1" cellspacing="0" cellpadding="0" v-if="obj">
      <tr>
        <td>发票抬头</td>
        <td>{{obj.invoice.invoiceCompanyName}}</td>
        <td>纳税人识别号</td>
        <td>{{obj.invoice.invoiceTaxpayerNo}}</td>
      </tr>
      <tr v-if="obj.invoice.invoiceType != '1'">
        <td>地址</td>
        <td>{{obj.invoice.invoiceType == "1" ? "" : obj.invoice.invoiceAddress}}</td>
        <td>联系电话</td>
        <td>{{obj.invoice.invoiceType == "1" ? "" :obj.invoice.invoicePhone}}</td>
      </tr>
      <tr v-if="obj.invoice.invoiceType != '1'">
        <td>开户行</td>
        <td>{{obj.invoice.invoiceType == "1" ? "" :obj.invoice.invoiceBank}}</td>
        <td>银行账号</td>
        <td>{{obj.invoice.invoiceType == "1" ? "" :obj.invoice.invoiceBankNo}}</td>
      </tr>
      <tr>
        <td>发票类型</td>
        <td>{{obj.invoice.invoiceType == "1" ? "普通发票" : "专用发票"}}</td>
        <td>开票金额</td>
        <td>{{obj.factPrice}}</td>
      </tr>
      <tr>
        <td>票据内容</td>
        <td>{{obj.productName}}</td>
        <td>发票形式</td>
        <td>纸质</td>
      </tr>
      <tr>
        <td>发票状态</td>
        <td>{{obj.invoiceStatusName}}</td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <div style="margin-top:20px;">
      <table v-if="invoiceStatus!=1" class="gridtable" width="800" border="1" cellspacing="0" cellpadding="0">
        <tr>
          <th colspan="4">开票信息</th>
        </tr>
        <tr >
          <td>
            发票号码
          </td>
          <td>{{invoiceDetail.invoiceNo}}</td>
          <td>开票时间</td>
          <td>{{invoiceDetail.showCreateTime}}</td>
        </tr>
        <tr >
          <td>PDF文件</td>
          <td>
            <a style="color: blue" download :href="invoiceDetail.invoiceUrl">下载</a>
          </td>
          <td>备注</td>
          <td>{{invoiceDetail.description}}</td>
        </tr>
      </table>
    </div>
    <add  @abort="getDetail" ref="create" :data="formdata"></add>
  </div>
</template>
<script>
import { orderDetail } from '@/api/order'
import add from './add/addInvoice'
export default {
  components: { add },
  data() {
    return {
      id: '',
      obj: {
        invoice: {
          invoiceCompanyName: ''
        }
      },
      invoiceStatus: '',
      orderStatus: 1,
      invoiceDetail: {},
      formdata: {
        invoiceNo: '',
        invoiceUrl: '',
        description: '',
        orderId: ''
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.formdata.orderId = this.id
    this.getDetail()
  },
  methods: {
    open() {
      this.$refs.create.open()
    },
    getDetail() {
      orderDetail(this.id).then(res => {
        this.obj = res.data
        this.orderStatus = res.data.orderStatus
        this.invoiceStatus = res.data.invoiceStatus
        this.invoiceDetail = res.data.invoiceDetail
      })
    }
  }
}
</script>
