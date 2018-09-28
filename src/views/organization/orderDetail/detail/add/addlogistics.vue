<template>
  <el-dialog :title="ruleForm.id?'编辑':'新增'" :visible.sync="visible" width="70%">
    <el-form v-if="visible" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="快递单号" prop="expressNo">
        <el-input v-model="ruleForm.expressNo"></el-input>
      </el-form-item>
      <el-form-item label="快递公司名称" prop="expressCompanyName">
        <el-input v-model="ruleForm.expressCompanyName"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.remark" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { orderDetail, addLogistics } from '@/api/order'
export default {
  data() {
    return {
      visible: false,
      ruleForm: {
        expressNo: '',
        expressCompanyName: '',
        remark: '',
        id: ''
      },
      rules: {
        expressNo: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ],
        expressCompanyName: [
          { required: true, message: '请输入快递公司名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.ruleForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        if (id) {
          orderDetail(id).then(res => {
            if (res.data.express) {
              this.ruleForm = res.data.express
            }
            this.ruleForm.id = id
          })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, object) => {
        if (valid) {
          addLogistics(this.ruleForm).then(res => {
            this.$emit('abort')
            this.visible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

