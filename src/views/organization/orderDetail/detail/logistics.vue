<template>
  <div>
    <add v-if="visible" ref="addLog" @abort="getDetail"></add>
    <el-button type="primary" @click="edit" v-if="orderStatus==2&&tableData.length=='0'">添加运单</el-button>
    <el-table :data="tableData" style="width: 800px">
      <el-table-column prop="expressNo" align="center" label="运单号">
      </el-table-column>
      <el-table-column prop="expressCompanyName" align="center" label="物流公司">
      </el-table-column>
      <el-table-column prop="name" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="edit">编辑</el-button>
          <el-button type="warning" plain size="mini" @click="del">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { orderDetail, delLogistics } from '@/api/order'
import add from './add/addlogistics'
export default {
  components: { add },
  data() {
    return {
      visible: false,
      id: '',
      tableData: [],
      orderStatus: 1
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    add() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.addLog.init()
      })
    },
    edit() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.addLog.init(this.id)
      })
    },
    getDetail() {
      orderDetail(this.id).then(res => {
        var obj = res.data
        this.orderStatus = obj.orderStatus
        this.tableData = []
        if (obj.express == null) {
          return
        }
        this.tableData.push(obj.express)
      })
    },
    del() {
      console
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return delLogistics(this.id)
        })
        .then(() => {
          this.tableData = []
        })
    }
  }
}
</script>
