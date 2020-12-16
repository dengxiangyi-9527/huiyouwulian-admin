<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户表的用户ID" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户表的用户ID"></el-input>
      </el-form-item>
      <el-form-item label="订单编号" prop="orderSn">
        <el-input v-model="dataForm.orderSn" placeholder="订单编号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-input v-model="dataForm.orderStatus" placeholder="订单状态"></el-input>
      </el-form-item>
      <el-form-item label="收货人名称" prop="consignee">
        <el-input v-model="dataForm.consignee" placeholder="收货人名称"></el-input>
      </el-form-item>
      <el-form-item label="收货人手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="收货人手机号"></el-input>
      </el-form-item>
      <el-form-item label="收货具体地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="收货具体地址"></el-input>
      </el-form-item>
      <el-form-item label="用户订单留言" prop="message">
        <el-input v-model="dataForm.message" placeholder="用户订单留言"></el-input>
      </el-form-item>
      <el-form-item label="商品总费用" prop="goodsPrice">
        <el-input v-model="dataForm.goodsPrice" placeholder="商品总费用"></el-input>
      </el-form-item>
      <el-form-item label="配送费用" prop="freightPrice">
        <el-input v-model="dataForm.freightPrice" placeholder="配送费用"></el-input>
      </el-form-item>
      <el-form-item label="优惠券减免" prop="couponPrice">
        <el-input v-model="dataForm.couponPrice" placeholder="优惠券减免"></el-input>
      </el-form-item>
      <el-form-item label="用户积分减免" prop="integralPrice">
        <el-input v-model="dataForm.integralPrice" placeholder="用户积分减免"></el-input>
      </el-form-item>
      <el-form-item label="团购优惠价减免" prop="grouponPrice">
        <el-input v-model="dataForm.grouponPrice" placeholder="团购优惠价减免"></el-input>
      </el-form-item>
      <el-form-item label="订单费用， = goods_price + freight_price - coupon_price" prop="orderPrice">
        <el-input v-model="dataForm.orderPrice"
          placeholder="订单费用， = goods_price + freight_price - coupon_price"></el-input>
      </el-form-item>
      <el-form-item label="实付费用， = order_price - integral_price" prop="actualPrice">
        <el-input v-model="dataForm.actualPrice" placeholder="实付费用， = order_price - integral_price">
        </el-input>
      </el-form-item>
      <el-form-item label="微信付款编号" prop="payId">
        <el-input v-model="dataForm.payId" placeholder="微信付款编号"></el-input>
      </el-form-item>
      <el-form-item label="微信付款时间" prop="payTime">
        <el-input v-model="dataForm.payTime" placeholder="微信付款时间"></el-input>
      </el-form-item>
      <el-form-item label="发货编号" prop="shipSn">
        <el-input v-model="dataForm.shipSn" placeholder="发货编号"></el-input>
      </el-form-item>
      <el-form-item label="发货快递公司" prop="shipChannel">
        <el-input v-model="dataForm.shipChannel" placeholder="发货快递公司"></el-input>
      </el-form-item>
      <el-form-item label="发货开始时间" prop="shipTime">
        <el-input v-model="dataForm.shipTime" placeholder="发货开始时间"></el-input>
      </el-form-item>
      <el-form-item label="用户确认收货时间" prop="confirmTime">
        <el-input v-model="dataForm.confirmTime" placeholder="用户确认收货时间"></el-input>
      </el-form-item>
      <el-form-item label="待评价订单商品数量" prop="comments">
        <el-input v-model="dataForm.comments" placeholder="待评价订单商品数量"></el-input>
      </el-form-item>
      <el-form-item label="订单关闭时间" prop="endTime">
        <el-input v-model="dataForm.endTime" placeholder="订单关闭时间"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="addTime">
        <el-input v-model="dataForm.addTime" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
      </el-form-item>
      <el-form-item label="逻辑删除" prop="deleted">
        <el-input v-model="dataForm.deleted" placeholder="逻辑删除"></el-input>
      </el-form-item>
      <el-form-item label="" prop="longitude">
        <el-input v-model="dataForm.longitude" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="latitude">
        <el-input v-model="dataForm.latitude" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="区域编码" prop="areaCode">
        <el-input v-model="dataForm.areaCode" placeholder="区域编码"></el-input>
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
import { getObj, addObj, putObj } from '@/api/order/mallorder'

export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        userId: '',
        orderSn: '',
        orderStatus: '',
        consignee: '',
        mobile: '',
        address: '',
        message: '',
        goodsPrice: '',
        freightPrice: '',
        couponPrice: '',
        integralPrice: '',
        grouponPrice: '',
        orderPrice: '',
        actualPrice: '',
        payId: '',
        payTime: '',
        shipSn: '',
        shipChannel: '',
        shipTime: '',
        confirmTime: '',
        comments: '',
        endTime: '',
        addTime: '',
        updateTime: '',
        deleted: '',
        longitude: '',
        latitude: '',
        areaCode: '',
        tenantId: ''
      },
      dataRule: {
        userId: [
          { required: true, message: '用户表的用户ID不能为空', trigger: 'blur' }
        ],
        orderSn: [
          { required: true, message: '订单编号不能为空', trigger: 'blur' }
        ],
        orderStatus: [
          { required: true, message: '订单状态不能为空', trigger: 'blur' }
        ],
        consignee: [
          { required: true, message: '收货人名称不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '收货人手机号不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '收货具体地址不能为空', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '用户订单留言不能为空', trigger: 'blur' }
        ],
        goodsPrice: [
          { required: true, message: '商品总费用不能为空', trigger: 'blur' }
        ],
        freightPrice: [
          { required: true, message: '配送费用不能为空', trigger: 'blur' }
        ],
        couponPrice: [
          { required: true, message: '优惠券减免不能为空', trigger: 'blur' }
        ],
        integralPrice: [
          { required: true, message: '用户积分减免不能为空', trigger: 'blur' }
        ],
        grouponPrice: [
          { required: true, message: '团购优惠价减免不能为空', trigger: 'blur' }
        ],
        orderPrice: [
          { required: true, message: '订单费用， = goods_price + freight_price - coupon_price不能为空', trigger: 'blur' }
        ],
        actualPrice: [
          { required: true, message: '实付费用， = order_price - integral_price不能为空', trigger: 'blur' }
        ],
        payId: [
          { required: true, message: '微信付款编号不能为空', trigger: 'blur' }
        ],
        payTime: [
          { required: true, message: '微信付款时间不能为空', trigger: 'blur' }
        ],
        shipSn: [
          { required: true, message: '发货编号不能为空', trigger: 'blur' }
        ],
        shipChannel: [
          { required: true, message: '发货快递公司不能为空', trigger: 'blur' }
        ],
        shipTime: [
          { required: true, message: '发货开始时间不能为空', trigger: 'blur' }
        ],
        confirmTime: [
          { required: true, message: '用户确认收货时间不能为空', trigger: 'blur' }
        ],
        comments: [
          { required: true, message: '待评价订单商品数量不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '订单关闭时间不能为空', trigger: 'blur' }
        ],
        addTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '更新时间不能为空', trigger: 'blur' }
        ],
        deleted: [
          { required: true, message: '逻辑删除不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        areaCode: [
          { required: true, message: '区域编码不能为空', trigger: 'blur' }
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
