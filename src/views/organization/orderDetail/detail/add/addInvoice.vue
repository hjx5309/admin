<template>
  <el-dialog title="新增" :visible.sync="dialogVisible" width="70%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="票据号码" prop="invoiceNo">
        <el-input v-model="ruleForm.invoiceNo"></el-input>
      </el-form-item>
      <el-form-item label="上传文件" prop="invoiceUrl">
        <el-input v-model="ruleForm.invoiceUrl"></el-input>
        <el-upload class="upload-demo" action="http://img.staq360.com/upload/file" :before-upload="beforefilearUpload" :auto-upload="true" :on-success="handFile">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传MP4/PDF/PPT文件</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="ruleForm.description" :maxlength="200"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { addInvoice } from '@/api/order'
export default {
  name: `create`,
  props: ['data'],
  data() {
    console.log(this.data)
    return {
      dialogVisible: false,
      ruleForm: this.data,
      rules: {
        invoiceNo: [
          { required: true, message: '请输入票据号码', trigger: 'blur' }
        ],
        invoiceUrl: [
          { required: true, message: '请选择上传文件', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 正面上传成功后的回调
    handFile(response, file, fileList) {
      this.ruleForm.invoiceUrl = response.data[0].url
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid, object) => {
        if (valid) {
          this.addSupervise()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传前对文件的大小的判断
    beforefilearUpload(file) {
      const extension = file.name.split('.')[1] === 'pdf'
      if (!extension) {
        this.$alert('上传图片只能是pdf格式', '上传提示', {
          confirmButtonText: '确定'
        })
      }
      return extension
    },
    open() {
      this.dialogVisible = true
    },
    // 新增发票
    addSupervise() {
      var form = this.ruleForm
      addInvoice(form).then(res => {
        this.$emit('abort')
        this.dialogVisible = false
      })
    }
  }
}
</script>

