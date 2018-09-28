<template>
  <el-dialog title="编辑" :visible.sync="visible" width="70%" @close="handleClose">
    <forms :obj="formData" @abort="addoredit" :edit="true" v-if="visible"></forms>
  </el-dialog>
</template>
<script>
import forms from './detail/detail'
import { editOrgan } from '@/api/opration'
export default {
  name: `isedit`,
  components: { forms },
  data() {
    return {
      visible: false,
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
      editOrgan(this.formData).then(res => {
        this.$emit('abort')
        this.visible = false
      })
    },
    open(obj) {
      console.log(this.visible)
      this.formData = {
        id: obj.id,
        industry: obj.industry,
        areaIds: obj.manageAreaIds,
        name: obj.name,
        account: obj.account,
        organType: `SYS_ORGAN_TYPE_SUPERVISE`,
        leader: obj.leader,
        mobile: obj.mobile,
        endTime: this.fmtTime(obj.endTime),
        status: obj.status
      }
      this.visible = true
      console.log(this.visible)
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

