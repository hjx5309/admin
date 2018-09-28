<template>
  <div>
    <create ref="create" @abort="keyInquire"></create>
    <edit ref="isedit"  @abort="fetchData"></edit>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="listQuery.keyword" placeholder="可按线下培训名称查找"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 80px;" @click="keyInquire">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加监管</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading="listLoading">

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="所属行业类型：">
              <span>{{ props.row.industryNames }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          {{scope.$index+1+(listQuery.curPage-1)*listQuery.pageSize}}
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="监管名称">
      </el-table-column>
      <el-table-column prop="leader" align="center" label="联系人">
      </el-table-column>
      <el-table-column prop="account" align="center" label="登录账号">
      </el-table-column>
      <el-table-column prop="mobile" align="center" label="手机账号">
      </el-table-column>
      <el-table-column align="center" label="是否启用">
        <template slot-scope="scope">
          {{showStatus(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          {{showTime(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="editOpen(scope.$index)">编辑</el-button>
          <el-button type="danger" plain size="mini" @click="del(scope.row.id)">删除</el-button>
          <el-button type="success" plain size="mini" v-if="scope.row.status=='-1'" @click="start(scope.row.id,scope.row.status)">启用</el-button>
          <el-button type="warning" plain size="mini" v-if="scope.row.status=='1'" @click="start(scope.row.id,scope.row.status)">禁用</el-button>
          <el-button type="info" plain size="mini" @click="resetPassword(scope.row.id)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, prev, pager, next" :current-page="listQuery.curPage" :total="total" :page-count="totalPage" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import { getOrgan, deleOrgan, startOrgan, resetPass } from '@/api/opration'
import create from './create'
import edit from './edit'
export default {
  components: { create, edit },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        curPage: 1,
        pageSize: 10,
        organType: `SYS_ORGAN_TYPE_SUPERVISE`,
        keyword: ``
      },
      total: 0,
      totalPage: 0,
      obj: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getOrgan(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.totalRecord
        this.totalPage = response.data.totalPage
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
    // 新增页面
    add() {
      this.$refs.create.open()
    },
    // 编辑页面
    editOpen(index) {
      var obj = this.list[index]
      this.$refs.isedit.open(obj)
    },
    // 删除监管
    del(id) {
      this.$confirm(`确认删除吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleOrgan(id)
      }).then(() => {
        this.keyInquire()
      })
    },
    // 启用和禁用
    start(id, status) {
      let _status = ''
      let tip
      if (status === 1) {
        tip = '禁用'
        _status = '-1'
      } else {
        tip = '启用'
        _status = '1'
      }
      this.$confirm(`确认${tip}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return startOrgan(id, _status)
        })
        .then(() => {
          this.fetchData()
        })
    },
    // 重置密码
    resetPassword(id) {
      this.$confirm(`确认重置密码吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return resetPass(id)
        })
        .then(() => {
          this.fetchData()
        })
    }
  }
}
</script>

