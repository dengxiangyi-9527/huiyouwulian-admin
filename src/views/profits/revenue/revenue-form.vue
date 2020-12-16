<template  >
  <el-dialog :title="dataForm.status==1||2 ? '分润记录' : '分润记录'" :close-on-click-modal="false"
    :visible.sync="visible" class="wrap1">
    <el-form :rules="dataRule" ref="dataList" @keyup.enter.native="dataFormSubmit()"
      label-width="80px" class="wrap">
      <el-form-item prop="profitsRecordList">
        <el-table :data="dataList" border style="width: 100%;">

          <el-table-column prop="payProfitsRecordId" header-align="center" align="center"
            label="编号">
          </el-table-column>
          <el-table-column prop="orderNo" header-align="center" align="center" label="订单编号">
          </el-table-column>
          <el-table-column prop="createTime" header-align="center" align="center" label="创建时间">
          </el-table-column>
          <el-table-column prop="amountTotal" header-align="center" align="center" label="订单总金额">
          </el-table-column>
          <el-table-column prop="amountGoods" header-align="center" align="center" label="订单货款">
          </el-table-column>
          <el-table-column prop="amountPoundage" header-align="center" align="center" label="订单手续费">
          </el-table-column>
          <el-table-column prop="amountProfits" header-align="center" align="center" label="订单分润金额">
          </el-table-column>
          <el-table-column :formatter="profitsTypeFormatter" prop="profitsType"
            header-align="center" align="center" label="订单分润类型">
          </el-table-column>
          <el-table-column width="150" prop="deviceId" header-align="center" align="center"
            label="设备编号栏">
          </el-table-column>
          <el-table-column :formatter="statusFormatter" prop="status" header-align="center"
            align="center" label="状态">
          </el-table-column>

        </el-table>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<style >
.wrap1 .wrap .el-input__inner {
  border: 0px;
}
</style>

<script>
import { getObj, addObj, putObj } from '@/api/profits/revenue'

export default {
  data () {
    return {
      visible: false,
      status: '',
      isAble: false,
      dataList: [],
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

      },
      changeProfitsTypeList: [{ lable: '所有', value: null }, { lable: '设备认领分润', value: 1 }, { lable: '推广分润', value: 2 }, { lable: '运营管理奖', value: 3 }, { lable: '区域分润', value: 4 }, { lable: '加权分红', value: 5 }],
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
    init (memberId, deviceId) {
      this.dataListLoading = true
      this.visible = true
      getObj(Object.assign({
        profitsRefMemberid: memberId,
        deviceId: deviceId,
      })).then(response => {

        this.dataList = response.data.data

      })
      this.dataListLoading = false

    },

    profitsTypeFormatter (row, column) {
      let profitsType = row.profitsType;
      let profitsTypeArr = this.changeProfitsTypeList.map(item => {
        if (profitsType == item.value) {
          return item.lable;
        }
      });
      return profitsTypeArr;
    },
    statusFormatter (row, column) {
      let status = row.status
      if (status === 0) {
        return '驻留平台'
      } else if (status === 1) {
        return '微信零钱'
      } else if (status === 2) {
        return '已提现'
      } else if (status === 3) {
        return '提现转账中'
      } else if (status === 4) {
        return '支付宝余额'
      } else {
        return '未知'
      }
    },
    // 表单提交
    //   dataFormSubmit () {
    //     this.$refs['dataForm'].validate((valid) => {
    //       this.isAble = true
    //       if (valid) {
    //         if (this.dataForm.id) {
    //           putObj(this.dataForm).then(data => {
    //             console.log(data)
    //             if (data.data.code == 0) {
    //               this.$message.success('修改成功')
    //               this.isAble = false
    //               this.visible = false
    //               this.$emit('refreshDataList')
    //             } else {
    //               this.$message.false('修改失败')
    //               this.isAble = false
    //             }

    //           });
    //         }
    //       }
    //     })
    //   }
  }
}
</script>
