<template>
  <div>
    <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='100px' class='demo-ruleForm'>
      <el-form-item label='行业类型' prop='industry'>
        <el-select v-model='reversedMessage' multiple placeholder='请选择行业' @change="handleIndustryChange" style="width:100%">
          <el-option v-for='item in industryList' :key='item.id' :label='item.name' :value='item.code'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='所属区域' prop='areaIds'>
        <el-cascader placeholder='请选择' :value='handcity(ruleForm.areaIds)' :options='cityList' :props='prop' filterable change-on-select @change='handleItemChange'></el-cascader>
      </el-form-item>
      <el-form-item label='监管名称' prop='name'>
        <el-input v-model='ruleForm.name' :maxlength='30'></el-input>
      </el-form-item>
      <el-form-item label='登录账号' prop='account'>
        <el-input v-model='ruleForm.account' :maxlength='10'></el-input>
      </el-form-item>
      <el-form-item label='登录密码' prop='password' v-if="!isEdit">
        <el-input type='password' v-model='ruleForm.password' :maxlength='10'></el-input>
      </el-form-item>
      <el-form-item label='联系人' prop='leader'>
        <el-input v-model='ruleForm.leader' :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label='手机号码' prop='mobile'>
        <el-input v-model='ruleForm.mobile' :maxlength='11' @keyup.native="proving"></el-input>
      </el-form-item>
      <el-form-item label='到期时间' prop='endTime'>
        <el-date-picker v-model='ruleForm.endTime' type='datetime' format='yyyy-MM-dd HH:mm:ss' value-format='yyyy-MM-dd HH:mm:ss' placeholder='选择日期时间'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label='是否启用' prop='status'>
        <el-select v-model='ruleForm.status' placeholder='请选择'>
          <el-option v-for='item in StatusOptions' :key='item.value' :label='item.label' :value='item.value'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getIndustry, getAllCity } from '@/api/base'
export default {
  props: ['obj', 'edit'],
  data() {
    return {
      ruleForm: this.obj,
      isEdit: this.edit,
      rules: {
        name: [{ required: true, message: `设置监管名称`, trigger: `blur` }],
        areaIds: [{ required: true, message: `请是否启用`, trigger: `blur` }],
        status: [{ required: true, message: `请是否启用`, trigger: `change` }],
        password: [{ required: true, message: `设置密码`, trigger: `blur` }],
        industry: [
          { required: true, message: `请是否行业`, trigger: `change` }
        ],
        account: [{ required: true, message: `设置监管帐号`, trigger: `blur` }]
      },
      StatusOptions: [{ value: 0, label: `禁用` }, { value: 1, label: `启用` }],
      industryList: [],
      cityList: [],
      prop: {
        value: `id`,
        label: `name`,
        children: `children`
      }
    }
  },
  created() {
    getIndustry().then(res => {
      this.industryList = res.data.list[0].children
    })
    getAllCity().then(res => {
      this.cityList = res.data.list
    })
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: {
      get: function() {
        // `this` 指向 vm 实例
        var industry = this.ruleForm.industry
        if (industry === `` || industry === null) {
          return []
        } else {
          return industry.split(',')
        }
      },
      set: function() {
        var industry = this.ruleForm.industry
        if (industry === `` || industry === null) {
          return []
        } else {
          return industry.split(',')
        }
      }
    }
  },
  methods: {
    // 处理省市区
    handcity(city) {
      if (city === `` || city === null) {
        return []
      } else {
        city = city.toString()
        if (city.substr(2, 2) === `00`) {
          return [parseInt(city)]
        } else if (city.substr(4, 2) === `00`) {
          return [parseInt(city.substr(0, 2) + `0000`), parseInt(city)]
        } else {
          return [
            parseInt(city.substr(0, 2) + `0000`),
            parseInt(city.substr(0, 4) + `00`),
            parseInt(city)
          ]
        }
      }
    },
    // 选择的行业
    handIndustry(industry) {
      if (industry === `` || industry === null) {
        return []
      } else {
        return industry.split(',')
      }
    },
    // 处理城市
    handleItemChange(val) {
      var len = val.length
      this.ruleForm.areaIds = val[len - 1]
    },
    // 处理行业
    handleIndustryChange(val) {
      console.log(val, val)
      this.ruleForm.industry = val.join(',')
    },
    proving() {
      this.ruleForm.mobile = this.ruleForm.mobile.replace(/[^\.\d]/g, '')
      this.ruleForm.mobile = this.ruleForm.mobile.replace('.', '')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, object) => {
        if (valid) {
          this.$emit(`abort`)
        } else {
          return false
        }
      })
    }
  }
}
</script>

