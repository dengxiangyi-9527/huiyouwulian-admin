<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="" prop="storeId">
        <el-input v-model="dataForm.storeId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="是否绑定机主(0-否，1-是)" prop="bindMasterFlg">
        <el-input v-model="dataForm.bindMasterFlg" placeholder="是否绑定机主(0-否，1-是)"></el-input>
      </el-form-item>
      <el-form-item label="设备标识,用于绑定机主" prop="deviceSign">
        <el-input v-model="dataForm.deviceSign" placeholder="设备标识,用于绑定机主"></el-input>
      </el-form-item>
      <el-form-item label="" prop="deviceId">
        <el-input v-model="dataForm.deviceId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="serviceId">
        <el-input v-model="dataForm.serviceId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="deliveryId">
        <el-input v-model="dataForm.deliveryId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="customerId">
        <el-input v-model="dataForm.customerId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="title">
        <el-input v-model="dataForm.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="deviceName">
        <el-input v-model="dataForm.deviceName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input v-model="dataForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="phone">
        <el-input v-model="dataForm.phone" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="zoneId">
        <el-input v-model="dataForm.zoneId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="cityId">
        <el-input v-model="dataForm.cityId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="districtId">
        <el-input v-model="dataForm.districtId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="streetId">
        <el-input v-model="dataForm.streetId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="area">
        <el-input v-model="dataForm.area" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="address">
        <el-input v-model="dataForm.address" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="userFloor">
        <el-input v-model="dataForm.userFloor" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="userLift">
        <el-input v-model="dataForm.userLift" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="userQuantity">
        <el-input v-model="dataForm.userQuantity" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="deviceIccidId">
        <el-input v-model="dataForm.deviceIccidId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="deviceModel">
        <el-input v-model="dataForm.deviceModel" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="deviceType">
        <el-input v-model="dataForm.deviceType" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="modeType">
        <el-input v-model="dataForm.modeType" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="flowUnit">
        <el-input v-model="dataForm.flowUnit" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="flowTime">
        <el-input v-model="dataForm.flowTime" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="flowRemain">
        <el-input v-model="dataForm.flowRemain" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="flowUsed">
        <el-input v-model="dataForm.flowUsed" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="dayRemain">
        <el-input v-model="dataForm.dayRemain" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="dateRemain">
        <el-input v-model="dataForm.dateRemain" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="tdsY">
        <el-input v-model="dataForm.tdsY" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="tdsJ">
        <el-input v-model="dataForm.tdsJ" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="status">
        <el-input v-model="dataForm.status" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="statusCode">
        <el-input v-model="dataForm.statusCode" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="online">
        <el-input v-model="dataForm.online" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="signal">
        <el-input v-model="dataForm.signal" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="shareCode">
        <el-input v-model="dataForm.shareCode" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="dateBind">
        <el-input v-model="dataForm.dateBind" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="dateAdded">
        <el-input v-model="dataForm.dateAdded" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="dateModified">
        <el-input v-model="dataForm.dateModified" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="dateSynchro">
        <el-input v-model="dataForm.dateSynchro" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filterMode">
        <el-input v-model="dataForm.filterMode" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter1Name">
        <el-input v-model="dataForm.filter1Name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter1Now">
        <el-input v-model="dataForm.filter1Now" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter1Max">
        <el-input v-model="dataForm.filter1Max" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter1Date">
        <el-input v-model="dataForm.filter1Date" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter2Name">
        <el-input v-model="dataForm.filter2Name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter2Now">
        <el-input v-model="dataForm.filter2Now" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter2Max">
        <el-input v-model="dataForm.filter2Max" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter2Date">
        <el-input v-model="dataForm.filter2Date" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter3Name">
        <el-input v-model="dataForm.filter3Name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter3Now">
        <el-input v-model="dataForm.filter3Now" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter3Max">
        <el-input v-model="dataForm.filter3Max" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter3Date">
        <el-input v-model="dataForm.filter3Date" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter4Name">
        <el-input v-model="dataForm.filter4Name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter4Now">
        <el-input v-model="dataForm.filter4Now" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter4Max">
        <el-input v-model="dataForm.filter4Max" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter4Date">
        <el-input v-model="dataForm.filter4Date" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter5Name">
        <el-input v-model="dataForm.filter5Name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter5Now">
        <el-input v-model="dataForm.filter5Now" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter5Max">
        <el-input v-model="dataForm.filter5Max" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="filter5Date">
        <el-input v-model="dataForm.filter5Date" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="认领状态，0 未认领 1 已认领" prop="claimStatus">
        <el-input v-model="dataForm.claimStatus" placeholder="认领状态，0 未认领 1 已认领"></el-input>
      </el-form-item>
      <el-form-item label="" prop="longitude">
        <el-input v-model="dataForm.longitude" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="latitude">
        <el-input v-model="dataForm.latitude" placeholder=""></el-input>
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
import { getObj, addObj, putObj } from '@/api/device/jzdevice'

export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        storeId: '',
        bindMasterFlg: '',
        deviceSign: '',
        deviceId: '',
        serviceId: '',
        deliveryId: '',
        customerId: '',
        title: '',
        deviceName: '',
        name: '',
        phone: '',
        zoneId: '',
        cityId: '',
        districtId: '',
        streetId: '',
        area: '',
        address: '',
        userFloor: '',
        userLift: '',
        userQuantity: '',
        deviceIccidId: '',
        deviceModel: '',
        deviceType: '',
        modeType: '',
        flowUnit: '',
        flowTime: '',
        flowRemain: '',
        flowUsed: '',
        dayRemain: '',
        dateRemain: '',
        tdsY: '',
        tdsJ: '',
        status: '',
        statusCode: '',
        online: '',
        signal: '',
        shareCode: '',
        dateBind: '',
        dateAdded: '',
        dateModified: '',
        dateSynchro: '',
        filterMode: '',
        filter1Name: '',
        filter1Now: '',
        filter1Max: '',
        filter1Date: '',
        filter2Name: '',
        filter2Now: '',
        filter2Max: '',
        filter2Date: '',
        filter3Name: '',
        filter3Now: '',
        filter3Max: '',
        filter3Date: '',
        filter4Name: '',
        filter4Now: '',
        filter4Max: '',
        filter4Date: '',
        filter5Name: '',
        filter5Now: '',
        filter5Max: '',
        filter5Date: '',
        claimStatus: '',
        longitude: '',
        latitude: '',
        tenantId: ''
      },
      dataRule: {
        storeId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        bindMasterFlg: [
          { required: true, message: '是否绑定机主(0-否，1-是)不能为空', trigger: 'blur' }
        ],
        deviceSign: [
          { required: true, message: '设备标识,用于绑定机主不能为空', trigger: 'blur' }
        ],
        deviceId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        serviceId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deliveryId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        zoneId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        cityId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        districtId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        streetId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        userFloor: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        userLift: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        userQuantity: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deviceIccidId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deviceModel: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        modeType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        flowUnit: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        flowTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        flowRemain: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        flowUsed: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        dayRemain: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        dateRemain: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        tdsY: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        tdsJ: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        statusCode: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        online: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        signal: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        shareCode: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        dateBind: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        dateAdded: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        dateModified: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        dateSynchro: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filterMode: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter1Name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter1Now: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter1Max: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter1Date: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter2Name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter2Now: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter2Max: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter2Date: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter3Name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter3Now: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter3Max: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter3Date: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter4Name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter4Now: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter4Max: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter4Date: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter5Name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter5Now: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter5Max: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        filter5Date: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        claimStatus: [
          { required: true, message: '认领状态，0 未认领 1 已认领不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '租户id不能为空', trigger: 'blur' }
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
