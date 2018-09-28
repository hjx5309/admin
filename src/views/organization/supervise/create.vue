<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="70%" @close="handleClose">
    <forms :obj="formData" @abort="addoredit" :isEdit="false" v-if="dialogVisible"></forms>
  </el-dialog>
</template>
<script>
import forms from './detail/detail'
import { addOrgan } from '@/api/opration'
export default {
  name: `create`,
  components: { forms },
  data() {
    return {
      dialogVisible: false,
      formData: {
        industry: ``,
        areaIds: ``,
        name: ``,
        account: ``,
        organType: `SYS_ORGAN_TYPE_SUPERVISE`,
        password: ``,
        leader: ``,
        mobile: ``,
        endTime: ``,
        status: ``
      }
    }
  },
  methods: {
    addoredit() {
      addOrgan(this.formData).then(res => {
        this.$emit('abort')
        this.dialogVisible = false
      })
    },
    open() {
      this.dialogVisible = true
    },
    handleClose() {
      this.formData = {
        industry: ``,
        areaIds: ``,
        name: ``,
        account: ``,
        organType: `SYS_ORGAN_TYPE_SUPERVISE`,
        password: ``,
        leader: ``,
        mobile: ``,
        endTime: ``,
        status: ``
      }
    }
  }
}
</script>

