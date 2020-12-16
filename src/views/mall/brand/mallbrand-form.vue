<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="110px">
      <el-form-item label="品牌商名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="品牌商名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌商简介" prop="dsc">
        <el-input v-model="dataForm.dsc" placeholder="品牌商简介"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="picUrl">
        <el-upload :action="uploadPath" :show-file-list="false" :on-success="uploadPicUrl"
          class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif">
          <img v-if="dataForm.picUrl" :src="dataForm.picUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="排序码" prop="sortOrder">
        <el-input v-model="dataForm.sortOrder" placeholder="排序码"></el-input>
      </el-form-item>
      <el-form-item label="商品低价，仅用于页面展示" prop="floorPrice">
        <el-input v-model="dataForm.floorPrice" placeholder="品牌商的商品低价，仅用于页面展示"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putObj } from '@/api/mall/mallbrand'
import { uploadPath } from '@/api/admin/storage'
import SingleUpload from '@/components/Upload/singleUpload'
export default {
  components: { SingleUpload },
  data () {
    return {
      uploadPath,
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        dsc: '',
        picUrl: '',
        sortOrder: '',
        floorPrice: '',
        addTime: '',
        updateTime: '',
        deleted: '',
        tenantId: ''
      },
      dataRule: {
        name: [
          { required: true, message: '品牌商名称不能为空', trigger: 'blur' }
        ],

        picUrl: [
          { required: true, message: '品牌商图片不能为空', trigger: 'blur' }
        ],

        floorPrice: [
          { required: true, message: '低价不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.init()
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
            console.log(this.dataForm.picUrl)
          })
        } else {
          this.dataForm = {}
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
    },
    uploadPicUrl: function (response) {
      // this.dataForm.picUrl = response.data.url
      this.dataForm = { ...this.dataForm, picUrl: response.data.url }
    }
  }
}
</script>
<style  scoped>
.filter-item {
  margin-left: 100px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 120px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
</style>
