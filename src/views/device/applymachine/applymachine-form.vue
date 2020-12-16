<template>
  <el-dialog :title="dataForm.status==1||2 ? '查看' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible" class="wrap1">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="80px" class="wrap">
      <el-form-item label="申请人" prop="applyName" label-width="100px">
        <el-input v-model="dataForm.applyName" placeholder="无" readonly style="border:0px;">
        </el-input>
      </el-form-item>

      <el-form-item label="申请电话" prop="applyMobile" label-width="100px">
        <el-input v-model="dataForm.applyMobile" placeholder="无" readonly style="border:0px;">
        </el-input>
      </el-form-item>
      <el-form-item label="申请时间" prop="addTime" label-width="100px">
        <el-input v-model="dataForm.addTime" placeholder="无" readonly></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime" label-width="100px">
        <el-input v-model="dataForm.updateTime" placeholder="无" readonly></el-input>
      </el-form-item>
      <el-form-item label="状态(*必填)" prop="status" v-if="status ==0" label-width="100px">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="2">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status" v-if="status ==1" label-width="100px">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status" v-if="status ==2" label-width="100px">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="2">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审批理由" prop="reason" v-if="status ==0&&dataForm.atatus==1"
        label-width="100px">
        <el-input v-model="dataForm.reason" placeholder="请输入审批理由（选填）" type="textarea" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="审批理由" prop="reason" v-if="status ==0&&dataForm.status ==2"
        label-width="100px">
        <el-input v-model="dataForm.reason" placeholder="请输入审批理由（必填）" type="textarea" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="审批理由" prop="reason" v-if="status!==0" label-width="100px">
        <el-input v-model="dataForm.reason" placeholder="审批理由" type="textarea" clearable readonly>
        </el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark"  label-width="100px">
        <el-input v-model="dataForm.remark" placeholder="备注" type="textarea" clearable >
        </el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address" label-width="100px">
        <el-input v-model="dataForm.address" placeholder="无" readonly></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="area" label-width="100px">
        <el-input v-model="dataForm.area" placeholder="无" readonly></el-input>
      </el-form-item>
      <el-form-item label=" 收货人手机号" prop="rePhone" label-width="100px">
        <el-input v-model="dataForm.rePhone" placeholder=" 无" readonly></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名" prop="reName" label-width="100px">
        <el-input v-model="dataForm.reName" placeholder="无" readonly></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :disabled="isAble" v-if="status==0" @click="dataFormSubmit()">确定
      </el-button>
      <el-button type="primary" @click="visible = false" v-if="status!==0">关闭</el-button>
    </span>
  </el-dialog>
</template>

<style >
.wrap1 .wrap .el-input__inner {
  border: 0px;
}
</style>

<script>
import { getObj, addObj, putObj } from '@/api/device/applymachine'

export default {
  data () {
    return {
      visible: false,
      status: '',
      isAble: false,
      dataForm: {
        id: 0,
        applyName: '',
        applyId: '',
        applyMobile: '',
        addTime: '',
        updateTime: '',
        status: '',
        approveId: '',
        approveName: '',
        reason: '',
        address: '',
        longitude: '',
        latitude: '',
        areaCode: '',
        area: '',
        rePhone: '',
        reName: '',
        remark:''
      },
      dataRule: {
        status: [
          { required: true, message: '状态,请选择', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '审核拒绝请输入理由', trigger: 'blur' }
        ],
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
            // console.log(response)
            this.dataForm = response.data.data
            this.status = response.data.data.status
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        this.isAble = true
        if (valid) {
          if (this.dataForm.id) {
            putObj(this.dataForm).then(data => {
              console.log(data)
              if (data.data.code == 0) {
                this.$message.success('修改成功')
                this.isAble = false
                this.visible = false
                this.$emit('refreshDataList')
              } else {
                this.$message.false('修改失败')
                this.isAble = false
              }

            });
          }
          // else {
          //   addObj(this.dataForm).then(data => {
          //     this.$message.success('添加成功')
          //     this.visible = false
          //     this.$emit('refreshDataList')
          //   })
          // }
        }
      })
    }
  }
}
</script>
