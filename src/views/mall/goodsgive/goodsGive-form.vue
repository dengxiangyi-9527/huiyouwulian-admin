<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="赠送商品id" prop="giveGoodsId">
      <el-input v-model="dataForm.giveGoodsId" placeholder="赠送商品id"></el-input>
    </el-form-item>
    <el-form-item label="赠送商品数量" prop="giveGoodsNumber">
      <el-input v-model="dataForm.giveGoodsNumber" placeholder="赠送商品数量"></el-input>
    </el-form-item>
    <el-form-item label="商品id" prop="goodsId">
      <el-input v-model="dataForm.goodsId" placeholder="商品id"></el-input>
    </el-form-item>
    <el-form-item label="商品名称" prop="goodsName">
      <el-input v-model="dataForm.goodsName" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="赠送商品名称" prop="giveGoodsName">
      <el-input v-model="dataForm.giveGoodsName" placeholder="赠送商品名称"></el-input>
    </el-form-item>
    <el-form-item label="商品-货品id" prop="goodsProductId">
      <el-input v-model="dataForm.goodsProductId" placeholder="商品-货品id"></el-input>
    </el-form-item>
    <el-form-item label="赠送的货品id" prop="giveGoodsProductId">
      <el-input v-model="dataForm.giveGoodsProductId" placeholder="赠送的货品id"></el-input>
    </el-form-item>
    <el-form-item label="" prop="goodsPicUrl">
      <el-input v-model="dataForm.goodsPicUrl" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="赠送货品图片地址" prop="giveGoodsPicUrl">
      <el-input v-model="dataForm.giveGoodsPicUrl" placeholder="赠送货品图片地址"></el-input>
    </el-form-item>
    <el-form-item label="添加人员id" prop="createrId">
      <el-input v-model="dataForm.createrId" placeholder="添加人员id"></el-input>
    </el-form-item>
    <el-form-item label="添加时间" prop="createTm">
      <el-input v-model="dataForm.createTm" placeholder="添加时间"></el-input>
    </el-form-item>
    <el-form-item label="有效截止时间" prop="validEndTime">
      <el-input v-model="dataForm.validEndTime" placeholder="有效截止时间"></el-input>
    </el-form-item>
    <el-form-item label="租户id" prop="tenantId">
      <el-input v-model="dataForm.tenantId" placeholder="租户id"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
    import {getObj, addObj, putObj} from '@/api/mall/mallgoodsgive'

    export default {
    data () {
      return {
        visible: false,
        dataForm: {
          goodsGiveId: 0,
          giveGoodsId: '',
          giveGoodsNumber: '',
          goodsId: '',
          goodsName: '',
          giveGoodsName: '',
          goodsProductId: '',
          giveGoodsProductId: '',
          goodsPicUrl: '',
          giveGoodsPicUrl: '',
          createrId: '',
          createTm: '',
          validEndTime: '',
          tenantId: ''
        },
        dataRule: {
          giveGoodsId: [
            { required: true, message: '赠送商品id不能为空', trigger: 'blur' }
          ],
          giveGoodsNumber: [
            { required: true, message: '赠送商品数量不能为空', trigger: 'blur' }
          ],
          goodsId: [
            { required: true, message: '商品id不能为空', trigger: 'blur' }
          ],
          goodsName: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          giveGoodsName: [
            { required: true, message: '赠送商品名称不能为空', trigger: 'blur' }
          ],
          goodsProductId: [
            { required: true, message: '商品-货品id不能为空', trigger: 'blur' }
          ],
          giveGoodsProductId: [
            { required: true, message: '赠送的货品id不能为空', trigger: 'blur' }
          ],
          goodsPicUrl: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          giveGoodsPicUrl: [
            { required: true, message: '赠送货品图片地址不能为空', trigger: 'blur' }
          ],
          createrId: [
            { required: true, message: '添加人员id不能为空', trigger: 'blur' }
          ],
          createTm: [
            { required: true, message: '添加时间不能为空', trigger: 'blur' }
          ],
          validEndTime: [
            { required: true, message: '有效截止时间不能为空', trigger: 'blur' }
          ],
          tenantId: [
            { required: true, message: '租户id不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.goodsGiveId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.goodsGiveId) {
            getObj(this.dataForm.goodsGiveId).then(response => {
                this.dataForm = response.data.data
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.goodsGiveId) {
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
