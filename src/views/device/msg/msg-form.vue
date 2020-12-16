<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="" prop="msgKey">
        <el-input v-model="dataForm.msgKey" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="消息状态(0-待阅读，1-已阅读)" prop="msgStatus">
        <el-input v-model="dataForm.msgStatus" placeholder="消息状态(0-待阅读，1-已阅读)"></el-input>
      </el-form-item>
      <el-form-item label="消息类型（1-系统消息，2-客户消息）" prop="msgType">
        <el-input v-model="dataForm.msgType" placeholder="消息类型（1-系统消息，2-客户消息）"></el-input>
      </el-form-item>
      <el-form-item label="消息内容" prop="msgData">
        <el-input v-model="dataForm.msgData" placeholder="消息内容"></el-input>
      </el-form-item>
      <el-form-item label="" prop="msgUserId">
        <el-input v-model="dataForm.msgUserId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putObj } from '@/api/device/sysmsg'

export default {
  data () {
    return {
      visible: false,
      dataForm: {
        msgId: 0,
        msgKey: '',
        msgStatus: '',
        msgType: '',
        msgData: '',
        msgUserId: '',
        createTime: '',
        updateTime: ''
      },
      dataRule: {
        msgKey: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        msgStatus: [
          { required: true, message: '消息状态(0-待阅读，1-已阅读)不能为空', trigger: 'blur' }
        ],
        msgType: [
          { required: true, message: '消息类型（1-系统消息，2-客户消息）不能为空', trigger: 'blur' }
        ],
        msgData: [
          { required: true, message: '消息内容不能为空', trigger: 'blur' }
        ],
        msgUserId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.msgId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.msgId) {
          getObj(this.dataForm.msgId).then(response => {
            this.dataForm = response.data.data
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.msgId) {
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
