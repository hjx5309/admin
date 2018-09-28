<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane v-for="item in tab" :name="item.name" :label="item.label" :key="item.name"></el-tab-pane>
    </el-tabs>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'base',
      id: '',
      path: '/orderDetail/index/',
      tab: [
        { name: 'base', label: '基本信息' },
        { name: 'invoice', label: '发票管理' },
        { name: 'logistics', label: '运单信息' }
      ]
    }
  },
  created() {
    this.id = this.$route.params.id
    this.$router.replace(this.path + this.id + '/base')
  },
  methods: {
    handleClick() {
      this.$router.push(this.path + this.id + '/' + this.activeName)
    }
  }
}
</script>

