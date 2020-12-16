<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="会员" prop="memberNm">
      <el-input v-model="dataForm.memberNm" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="金额(¥)" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="提现金额"></el-input>
    </el-form-item>
    <!-- <el-form-item label="提现手续费" prop="poundage">
      <el-input v-model="dataForm.poundage" placeholder="提现手续费"></el-input>
    </el-form-item>
    <el-form-item label="最终转账金额" prop="transferAmount">
      <el-input v-model="dataForm.transferAmount" placeholder="最终转账金额"></el-input>
    </el-form-item> -->
    <el-form-item label="状态" prop="state">
      <el-select v-model="dataForm.state"  placeholder="请选择状态">
        <el-option
          v-for="item in stateList"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类别" prop="type">
     <el-select v-model="dataForm.type"  placeholder="请选择类别">
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="方式" prop="withdrawalWay">
      <el-select v-model="dataForm.withdrawalWay"  placeholder="请选择方式">
        <el-option
          v-for="item in withdrawalWayList"
          :key="item.value"
          :label="item.lable"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="dataForm.realName" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="账户" prop="account">
      <el-input v-model="dataForm.account" placeholder="微信/支付宝/银行卡号"></el-input>
    </el-form-item>
    <el-form-item label="银行名称" prop="bankName">
      <el-input v-model="dataForm.bankName" placeholder="银行名称"></el-input>
    </el-form-item>
    <el-form-item label="开户行" prop="bankAddress">
      <el-input v-model="dataForm.bankAddress" placeholder="开户行"></el-input>
    </el-form-item>
    <el-form-item label="申请时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="申请时间"></el-input>
    </el-form-item>
    <el-form-item label="申请人" prop="addUserNm">
      <el-input v-model="dataForm.addUserNm" placeholder="申请人"></el-input>
    </el-form-item>
    <el-form-item label="转账时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="转账时间"></el-input>
    </el-form-item>
    <el-form-item label="转账人" prop="updateUserNm">
      <el-input v-model="dataForm.updateUserNm" placeholder="转账人"></el-input>
    </el-form-item>
    <el-form-item label="分润记录" prop="profitsRecordList">
      <el-table
      :data="dataForm.profitsRecordList"
      border
      style="width: 100%;">
      <el-table-column
        prop="payProfitsRecordId"
        header-align="center"
        align="center"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="orderNo"
        header-align="center"
        align="center"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="amountTotal"
        header-align="center"
        align="center"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="amountGoods"
        header-align="center"
        align="center"
        label="货款">
      </el-table-column>
      <el-table-column
        prop="amountPoundage"
        header-align="center"
        align="center"
        label="手续费">
      </el-table-column>
      <el-table-column
        prop="amountProfits"
        header-align="center"
        align="center"
        label="分润金额">
      </el-table-column>
      <el-table-column
       :formatter="profitsTypeFormatter"
        prop="profitsType"
        header-align="center"
        align="center"
        label="分润类型">
      </el-table-column>
    </el-table>
    </el-form-item>
    </el-form>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
    import {getObj, addObj, putObj} from '@/api/profits/paywithdrawalrecord'

    export default {
    data () {
      return {
        visible: false,
        dataForm: {
          payWithdrawalRecordId: 0,
          memberId: '',
          amount: '',
          poundage: '',
          transferAmount: '',
          type: '',
          withdrawalWay: '',
          realName: '',
          account: '',
          bankName: '',
          bankAddress: '',
          createTime: '',
          updateTime: '',
          addUserId: '',
          updateUserId: '',
          payProfitsRecordIdList: '',
          version: '',
          state: '',
          tenantId: ''
        },
        typeList:[{lable:"线下转款",value:1},{lable:'微信零钱分账',value:2},{lable:'支付宝零钱分账',value:3},{lable: '会员申请提现', value: 4},{ lable: '区域分润提现', value: 5 },],
        withdrawalWayList:[{lable:"微信",value:1},{lable:'支付宝',value:2},{lable:'银行卡',value:3},],
        stateList:[{lable:'待审核',value:1},{lable:'待转账',value:2},{lable:'审核拒绝',value:3},{lable:'转账完成',value:4},],
        dataRule: {
          memberId: [
            { required: false, message: '不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: false, message: '现金额不能为空', trigger: 'blur' }
          ],
          poundage: [
            { required: false, message: '提现手续费不能为空', trigger: 'blur' }
          ],
          transferAmount: [
            { required: false, message: '最终转账金额不能为空', trigger: 'blur' }
          ],
          type: [
            { required: false, message: '类别:1线下财务转款，2 微信零钱分账 3, 支付宝零钱分账不能为空', trigger: 'blur' }
          ],
          withdrawalWay: [
            { required: false, message: '提现方式:1微信2支付宝3:银行卡不能为空', trigger: 'blur' }
          ],
          realName: [
            { required: false, message: '真实姓名不能为空', trigger: 'blur' }
          ],
          account: [
            { required: false, message: '微信/支付宝/银行卡号不能为空', trigger: 'blur' }
          ],
          bankName: [
            { required: false, message: '银行名称不能为空', trigger: 'blur' }
          ],
          bankAddress: [
            { required: false, message: '开户行全称不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: false, message: '申请时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: false, message: '处理时间不能为空', trigger: 'blur' }
          ],
          addUserId: [
            { required: false, message: '不能为空', trigger: 'blur' }
          ],
          updateUserId: [
            { required: false, message: '不能为空', trigger: 'blur' }
          ],
          payProfitsRecordIdList: [
            { required: false, message: '不能为空', trigger: 'blur' }
          ],
          version: [
            { required: false, message: '不能为空', trigger: 'blur' }
          ],
          state: [
            { required: false, message: '不能为空', trigger: 'blur' }
          ],
          tenantId: [
            { required: false, message: '租户id不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.payWithdrawalRecordId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.payWithdrawalRecordId) {
            getObj(this.dataForm.payWithdrawalRecordId).then(response => {
                this.dataForm = response.data.data
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.payWithdrawalRecordId) {
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
      ,withdrawalWayFormatter(row,column){
        let withdrawalWay = row.withdrawalWay;
        if (withdrawalWay === 1) {
          return '微信'
        } else if(withdrawalWay === 2){
          return '支付宝'
        }else if(withdrawalWay === 3){
          return '银行卡'
        }else{
           return '未知'
        }
      }
      ,profitsTypeFormatter(row,column){
        let profitsType = row.profitsType
        if (profitsType === 1) {
          return '设备认领分润'
        } else if(profitsType === 2){
          return '推广分润'
        } else if(profitsType === 3){
          return '管理奖'
        }else if(profitsType === 4){
          return '区域分润'
        }else if(profitsType === 5){
          return '加权分红'
        }else{
           return '未知'
        }
      }
    }
  }
</script>
