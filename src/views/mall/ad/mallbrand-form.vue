<template>
<div>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="110px">
      <el-form-item label="广告图名称" prop="name">
        <el-col :span="16">
          <el-input v-model="dataForm.name" placeholder="广告图名称"></el-input>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="7">
          <el-button @click="getGoodList" type="primary">选择商品</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="广告图简介" prop="content">
        <el-input v-model="dataForm.content" placeholder="广告图简介"></el-input>
      </el-form-item>
      <el-form-item label="广告图图片" prop="url">
        <el-col :span="4">
          <el-upload :action="uploadPath" :show-file-list="false" :on-success="uploadPicUrl"
            class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif">
            <img v-if="dataForm.url" :src="dataForm.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-col>
        <el-col :span="20" class="mark">
          <span style="color: #e00;font-size: 12px">注：图片尺寸710 X 269（单位：px）</span>
        </el-col>
      </el-form-item>
        <!--  <el-form-item label="排序码" prop="sortOrder">
        <el-input v-model="dataForm.sortOrder" placeholder="排序码"></el-input>
      </el-form-item>
      <el-form-item label="商品低价，仅用于页面展示" prop="floorPrice">
        <el-input v-model="dataForm.floorPrice" placeholder="品牌商的商品低价，仅用于页面展示"></el-input>
      </el-form-item>-->

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
    </span>
  </el-dialog>
  <el-dialog :visible.sync="goodDialogVisible" title="商品选择">
    <div class="avue-crud">
      <el-table border style="width: 100%;" :data="goodsList">
        <el-table-column prop="name" header-align="center" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="picUrl" header-align="center" align="center" label="图片">
          <template slot-scope="scope">
            <img v-if="scope.row.picUrl" :src="scope.row.picUrl" width="40">
          </template>
        </el-table-column>

        <el-table-column prop="retailPrice" header-align="center" align="center" label="价格">
        </el-table-column>
        <el-table-column align="center" label="操作" width="100"
          class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="addGoods(scope.row)" v-db-click>添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="goodDialogVisible = false" type="primary">关闭</el-button>
    </div>
    <div class="avue-crud__pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page.page" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="page.limit"
        :total="page.totalPage" background layout="total, sizes, prev, pager, next, jumper" :hide-on-single-page="page.value">
      </el-pagination>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { getObj, addObj, putObj } from '@/api/mall/ad'
import { uploadPath } from '@/api/admin/storage'
import SingleUpload from '@/components/Upload/singleUpload'
import { goodsList } from '@/api/device/manualorder'
export default {
  components: { SingleUpload },
  data () {
    return {
      uploadPath,
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        content: '',
        url: '',
        sortOrder: '',
        floorPrice: '',
        addTime: '',
        updateTime: '',
        deleted: '',
        tenantId: '',
        link: ''
      },
      dataRule: {
        name: [
          { required: true, message: '广告图名称不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '广告图图片不能为空', trigger: 'blur' }
        ]
      },
      page: {
        limit: 10,
        page: 1,
        totalPage: 0
      },
      goodDialogVisible: false,
      goodsList: []
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          getObj(this.dataForm.id).then(res => {
            const { name, content, url } = res.data.ad
            this.dataForm.name = name
            this.dataForm.content = content
            this.dataForm.url = url
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
       this.dataForm = { ...this.dataForm, url: response.data.url }
    },
    getGoodList() {
      goodsList({
        limit: this.page.limit,
        page: this.page.page
      }).then( res => {
        this.goodDialogVisible = true
        const { list, totalCount } = res.data.page
        this.goodsList = list
        this.page.totalPage = totalCount
      })
    },
    handleSizeChange (val) {
      this.page.limit = val
      this.page.page = 1
      this.getGoodList(this.page)
    },
    handleCurrentChange (val) {
      this.page.page = val
      this.getGoodList(this.page)
    },
    addGoods(row) {
      this.dataForm.link = row.id
      this.dataForm.name = row.name
      this.goodDialogVisible = false
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
.mark{
  margin-top: 90px;
}
</style>
