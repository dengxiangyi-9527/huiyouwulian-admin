<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="类目名称" prop="name">
        <el-input v-model="dataForm.name" />
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input v-model="dataForm.keywords" />
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-select v-model="dataForm.level" @change="onLevelChange">
          <el-option label="一级类目" value="L1" />
          <el-option label="二级类目" value="L2" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="dataForm.level === 'L2'" label="父类目" prop="pid">
        <el-select v-model="dataForm.pid">
          <el-option v-for="item in catL1" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="类目图标" prop="iconUrl">
        <el-upload :headers="headers" :action="uploadPath" :show-file-list="false"
          :on-success="uploadIconUrl" class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif">
          <img v-if="dataForm.iconUrl" :src="dataForm.iconUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="类目图片" prop="picUrl">
        <el-upload :headers="headers" :action="uploadPath" :show-file-list="false"
          :on-success="uploadPicUrl" class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif">
          <img v-if="dataForm.picUrl" :src="dataForm.picUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="类目简介" prop="desc">
        <el-input v-model="dataForm.desc" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putObj, catL1 } from '@/api/mall/mallcategory'
import { uploadPath } from '@/api/admin/storage'
export default {
  data () {
    return {
      uploadPath,
      visible: false,
      dataForm: {
        id: undefined,
        name: '',
        keywords: '',
        level: 'L2',
        pid: 0,
        desc: '',
        iconUrl: '',
        picUrl: ''
      },
      catL1: [],
      dataRule: {
        name: [{ required: true, message: '类目名称不能为空', trigger: 'blur' }]
      }
    }
  },
  // computed: {
  //   headers () {
  //     return {
  //       'token': getToken()
  //     }
  //   }
  // },
  created () {
    this.getCatL1()
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
    },
    uploadIconUrl: function (response) {
      console.log(response)
      this.dataForm.iconUrl = response.data.url
    },
    uploadPicUrl: function (response) {
      console.log(response)
      this.dataForm.picUrl = response.data.url
    },
    getCatL1: function () {
      catL1().then(response => {
        this.catL1 = response.data.data;
      });
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
