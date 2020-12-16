<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="订单编号" prop="orderNo">
        <el-input v-model="dataForm.orderNo" placeholder="订单编号"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="订单总金额" prop="amountTotal">
        <el-input v-model="dataForm.amountTotal" placeholder="订单总金额"></el-input>
      </el-form-item>
      <el-form-item label="订单货款" prop="amountGoods">
        <el-input v-model="dataForm.amountGoods" placeholder="订单货款"></el-input>
      </el-form-item>
      <el-form-item label="订单手续费" prop="amountPoundage">
        <el-input v-model="dataForm.amountPoundage" placeholder="订单手续费"></el-input>
      </el-form-item>
      <el-form-item label="订单分润金额" prop="amountProfits">
        <el-input v-model="dataForm.amountProfits" placeholder="订单分润金额"></el-input>
      </el-form-item>
      <el-form-item label="订单分润类型(1-设备认领分润,2-推广分润)" prop="profitsType">
        <el-input v-model="dataForm.profitsType" placeholder="订单分润类型(1-设备认领分润,2-推广分润)"></el-input>
      </el-form-item>
      <el-form-item label="订单分润会员id" prop="profitsRefMemberid">
        <el-input v-model="dataForm.profitsRefMemberid" placeholder="订单分润会员id"></el-input>
      </el-form-item>
      <el-form-item label="分润比例%" prop="profitsRatio">
        <el-input v-model="dataForm.profitsRatio" placeholder="分润比例%"></el-input>
      </el-form-item>
      <el-form-item label="状态，0 驻留平台，1 微信零钱/微信商户账号，2，已提现" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态，0 驻留平台，1 微信零钱/微信商户账号，2，已提现"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="dsc">
        <el-input v-model="dataForm.dsc" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
      </el-form-item>
      <el-form-item label="设备id" prop="deviceId">
        <el-input v-model="dataForm.deviceId" placeholder="设备id"></el-input>
      </el-form-item>
      <el-form-item label="租户id" prop="tenantId">
        <el-input v-model="dataForm.tenantId" placeholder="租户id"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putObj } from '@/api/profits/payprofitsrecord'

export default {
  data () {
    return {
      visible: false,
      dataForm: {
        payProfitsRecordId: 0,
        orderNo: '',
        createTime: '',
        amountTotal: '',
        amountGoods: '',
        amountPoundage: '',
        amountProfits: '',
        profitsType: '',
        profitsRefMemberid: '',
        profitsRatio: '',
        status: '',
        dsc: '',
        updateTime: '',
        deviceId: '',
        tenantId: ''
      },
      dataRule: {
        orderNo: [
          { required: true, message: '订单编号不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        amountTotal: [
          { required: true, message: '订单总金额不能为空', trigger: 'blur' }
        ],
        amountGoods: [
          { required: true, message: '订单货款不能为空', trigger: 'blur' }
        ],
        amountPoundage: [
          { required: true, message: '订单手续费不能为空', trigger: 'blur' }
        ],
        amountProfits: [
          { required: true, message: '订单分润金额不能为空', trigger: 'blur' }
        ],
        profitsType: [
          { required: true, message: '订单分润类型(1-设备认领分润,2-推广分润)不能为空', trigger: 'blur' }
        ],
        profitsRefMemberid: [
          { required: true, message: '订单分润会员id不能为空', trigger: 'blur' }
        ],
        profitsRatio: [
          { required: true, message: '分润比例%不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态，0 驻留平台，1 微信零钱/微信商户账号，2，已提现不能为空', trigger: 'blur' }
        ],
        dsc: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '更新时间不能为空', trigger: 'blur' }
        ],
        deviceId: [
          { required: true, message: '设备id不能为空', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '租户id不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.payProfitsRecordId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.payProfitsRecordId) {
          getObj(this.dataForm.payProfitsRecordId).then(response => {
            this.dataForm = response.data.data
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.payProfitsRecordId) {
            putObj(this.dataForm).then(data => {
              this.$message.success('修改成功')
              this.visible = false
              this.$emit('refreshDataList')
            });
          } else {
            addObj(this.dataForm).then(data => {
              this.$message.success('添加成功')
              this.visible = false
              this.$emit('refreshDataList')
            })
          }
        }
      })
    }
  }
}
</script>
