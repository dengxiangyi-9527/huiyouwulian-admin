<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="dataForm.code" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker v-model="dataForm.startTime" align="right" type="date" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker v-model="dataForm.endTime" align="right" type="date" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio v-model="dataForm.status" label="0">启用</el-radio>
        <el-radio v-model="dataForm.status" label="1">停用</el-radio>

      </el-form-item>

      <el-form-item label="区域" prop="updateTime">

        <el-cascader size="large" :options="options" v-model="dataForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putObj } from '@/api/admin/systenant'
import { provinceAndCityData } from 'element-china-area-data'
export default {
  data () {
    return {
      visible: false,
      options: provinceAndCityData,
      dataForm: {

        selectedOptions: [],
        id: 0,
        name: '',
        code: '',
        startTime: '',
        endTime: '',
        status: ''

      },
      dataRule: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '编号不能为空', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        selectedOptions: [
          { required: true, message: '状区域不能为空', trigger: 'blur' }
        ]
      },
      // pickerOptions0: {
      //   disabledDate: (time) => {
      //     return Date.now() || time.getTime();
      //   }
      // },
      pickerOptions1: {
        disabledDate: (time) => {

          return time.getTime() < this.dataForm.startTime;


          // return this.dataForm.endTime >= this.dataForm.startTime;
        }
      },
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
        console.log(this.dataForm.startTime)
        console.log(this.dataForm.endTime)
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
