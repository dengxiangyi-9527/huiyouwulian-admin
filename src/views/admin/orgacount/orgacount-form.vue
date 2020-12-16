<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="会员ID" prop="memberId">
      <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input>
    </el-form-item>
    <el-form-item label="后台用户ID" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="后台用户ID"></el-input>
    </el-form-item>
    <el-form-item label="0 启用 1 停用" prop="state">
      <el-input v-model="dataForm.state" placeholder="0 启用 1 停用"></el-input>
    </el-form-item>
    <el-form-item label="支付密码" prop="payPassWord">
      <el-input v-model="dataForm.payPassWord" placeholder="支付密码"></el-input>
    </el-form-item>
    <el-form-item label="积分" prop="integral">
      <el-input v-model="dataForm.integral" placeholder="积分"></el-input>
    </el-form-item>
    <el-form-item label="账号金额" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="账号金额"></el-input>
    </el-form-item>
    <el-form-item label="历史金额" prop="amountHis">
      <el-input v-model="dataForm.amountHis" placeholder="历史金额"></el-input>
    </el-form-item>
    <el-form-item label="微信ID" prop="openId">
      <el-input v-model="dataForm.openId" placeholder="微信ID"></el-input>
    </el-form-item>
    <el-form-item label="支付宝ID" prop="buyerId">
      <el-input v-model="dataForm.buyerId" placeholder="支付宝ID"></el-input>
    </el-form-item>
    <el-form-item label="租户ID" prop="tenantId">
      <el-input v-model="dataForm.tenantId" placeholder="租户ID"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="addTime">
      <el-input v-model="dataForm.addTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="区域编码" prop="arerCode">
      <el-input v-model="dataForm.arerCode" placeholder="区域编码"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
    import {getObj, addObj, putObj} from '@/api/admin/orgacount'

    export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          memberId: '',
          userId: '',
          orgName: '',
          state: '',
          payPassWord: '',
          integral: '',
          amount: '',
          amountHis: '',
          openId: '',
          buyerId: '',
          tenantId: '',
          addTime: '',
          updateTime: '',
          arerCode: ''
        },
        dataRule: {
          memberId: [
            { required: true, message: '会员ID不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '后台用户ID不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '0 启用 1 停用不能为空', trigger: 'blur' }
          ],
          payPassWord: [
            { required: true, message: '支付密码不能为空', trigger: 'blur' }
          ],
          integral: [
            { required: true, message: '积分不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '账号金额不能为空', trigger: 'blur' }
          ],
          amountHis: [
            { required: true, message: '历史金额不能为空', trigger: 'blur' }
          ],
          openId: [
            { required: true, message: '微信ID不能为空', trigger: 'blur' }
          ],
          buyerId: [
            { required: true, message: '支付宝ID不能为空', trigger: 'blur' }
          ],
          tenantId: [
            { required: true, message: '租户ID不能为空', trigger: 'blur' }
          ],
          addTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          arerCode: [
            { required: true, message: '区域编码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            getObj(this.dataForm.id).then(response => {
                this.dataForm = response.data.data
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.id) {
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
