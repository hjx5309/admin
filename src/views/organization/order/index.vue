<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="下单时间">
        <el-date-picker :clearable="true" v-model="time" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="订单类型">
        <el-select v-model="listQuery.orderType" :clearable="true" placeholder="请选择">
          <el-option v-for="item in orderTypeOptions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-select v-model="listQuery.paymentMethod" :clearable="true" placeholder="请选择">
          <el-option v-for="item in payTypeOptions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单来源">
        <el-select v-model="listQuery.paymentSource" :clearable="true" placeholder="请选择">
          <el-option v-for="item in billSouresOptions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="listQuery.orderStatus" :clearable="true" placeholder="请选择">
          <el-option v-for="item in orderStatusOptions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票状态">
        <el-select v-model="listQuery.invoiceStatus" :clearable="true" placeholder="请选择">
          <el-option v-for="item in billStatusOptions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="listQuery.searchContent" placeholder="订单编号/客户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" style="width: 80px;" @click="keyInquire">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <!-- <el-table-column prop="transactionNo" align="center" label="订单号">
      </el-table-column> -->
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          {{scope.$index+1+(listQuery.curPage-1)*listQuery.pageSize}}
        </template>
      </el-table-column>
      <el-table-column prop="orderTypeName" align="center" label="订单类型">
      </el-table-column>
      <!-- <el-table-column prop="productName" align="center" label="产品名称">
      </el-table-column> -->
      <el-table-column prop="customerName" align="center" label="客户名称">
      </el-table-column>
      <el-table-column prop="totalPrice" align="center" label="应付金额">
      </el-table-column>
      <el-table-column prop="factPrice" align="center" label="实付金额">
      </el-table-column>
      <el-table-column prop="paymentMethodName" align="center" label="支付方式">
      </el-table-column>
      <el-table-column prop="orderStatusName" align="center" label="订单状态">
      </el-table-column>
      <el-table-column prop="paymentSourceName" align="center" label="订单来源">
      </el-table-column>
      <el-table-column prop="invoiceStatusName" align="center" label="发票状态">
      </el-table-column>
      <!-- <el-table-column prop="createTime" align="center" label="下单时间">
      </el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="toDetail(scope.row.id)">订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, prev, pager, next" :current-page="listQuery.curPage" :total="total" :page-count="totalPage" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import { orderList } from '@/api/order'
import { mapGetters } from 'vuex'
import { getOrderType, getPayType } from '@/api/base'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      time: [],
      listQuery: {
        curPage: 1,
        pageSize: 10,
        paymentMethod: ``,
        paymentSource: ``,
        invoiceStatus: ``,
        orderStatus: ``,
        orderType: ``,
        searchContent: ``,
        beginDate: ``,
        endDate: ``
      },
      orderTypeOptions: [],
      payTypeOptions: [],
      total: 0,
      totalPage: 0
    }
  },
  created() {
    this.fetchData()
    getOrderType().then(res => {
      this.orderTypeOptions = res.data.list
    })
    getPayType().then(res => {
      this.payTypeOptions = res.data.list
    })
  },
  computed: {
    ...mapGetters([
      'orderStatusOptions',
      'billStatusOptions',
      'billSouresOptions'
    ])
  },
  methods: {
    fetchData() {
      this.listLoading = true
      if (this.time.length === 2) {
        this.listQuery.beginDate = this.time[0]
        this.listQuery.endDate = this.time[1]
      } else {
        this.listQuery.beginDate = ``
        this.listQuery.endDate = ``
      }
      orderList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.totalPage = response.data.pages
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.listQuery.curPage = val
      this.fetchData()
    },
    showStatus(status) {
      return this.handStatus(status)
    },
    showTime(time) {
      return this.fmtTime(time)
    },
    keyInquire() {
      this.listQuery.curPage = 1
      this.fetchData()
    },
    toDetail(id) {
      this.$router.push(`/orderDetail/index/${id}`)
    }
  }
}
</script>
