<template>
  <el-dialog :title="!dataForm.id ? '详情' : '详情'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
      label-width="125px">
      <el-form-item label="配送员名称" prop="deliveryUserNm">
        <el-input readonly :value="dataForm.deliveryUserNm" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="配送员联系方式">
        <el-input readonly v-model="dataForm.deliveryUserPhone" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="配送状态">
        <el-input :value="dataForm.deliveryStatus" readonly placeholder="无">
        </el-input>
      </el-form-item>
      <el-form-item label="生成时间" prop="createTm">
        <el-input readonly v-model="dataForm.createTm" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="领单时间" prop="deliveryStartTm">
        <el-input readonly v-model="dataForm.deliveryStartTm" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="配送完成时间" prop="deliveryEndTm">
        <el-input readonly v-model="dataForm.deliveryEndTm" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="配送地址" prop="deliveryAddress">
        <el-input readonly v-model="dataForm.deliveryAddress" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="配送详细地址" prop="addressDetail">
        <el-input readonly v-model="dataForm.addressDetail" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="配送数量(袋)" prop="deliveryNum">
        <el-input readonly v-model="dataForm.deliveryNum" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input readonly v-model="dataForm.goodsName" placeholder="无"></el-input>
      </el-form-item>

      <el-form-item label="商品图片地址" prop="goodsPicUrl">
        <el-upload :action="uploadPath" :show-file-list="false" :on-success="uploadPicUrl"
          class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif">
          <img v-if="dataForm.goodsPicUrl" :src="dataForm.goodsPicUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input readonly v-model="dataForm.remarks" placeholder="无"></el-input>
      </el-form-item>
      <el-form-item label="问题描述" prop="deliveryDesc">
        <el-input type="textarea" readonly v-model="dataForm.deliveryDesc" placeholder="无">
        </el-input>
      </el-form-item>
      <el-form-item label="充值信息" prop="remarks">
        <el-table :data="lists" border style="width: 100%" v-if="lists">
          <el-table-column prop="deviceId" label="设备号">
          </el-table-column>
          <el-table-column prop="rechargeFlow" label="充值袋数">
          </el-table-column>
          <el-table-column prop="adjustValue" label="调整值(L)">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <!--  showDeptName <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span> -->
  </el-dialog>
</template>
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
<script>
import { getObj, addObj, putObj, getMemberList } from '@/api/logistic/deliveryrecord'
import { uploadPath } from '@/api/admin/storage'
export default {
  data () {
    return {
      uploadPath,
      visible: false,
      readonly: true,
      dataForm: {
        deliveryId: 0,
        deliveryUserNm: '',
        deliveryUserPhone: '',
        deliveryStatus: '',
        createTm: '',
        createId: '',
        deliveryStartTm: '',
        deliveryEndTm: '',
        deliveryDeviceId: '',
        deliveryAddress: '',
        deliveryNum: '',
        goodsName: '',
        goodsPicUrl: '',
        deliveryRefMemberidList: []
      },
      lists: [],
      formatStatus: {
        1: "待配送",
        2: "配送中",
        3: "已配送",
        4: "已有设备"
      },
      members: [],

    }
  },
  // computed: {
  //   status () {
  //     return this.formatStatus[this.dataForm.deliveryStatus];
  //   }
  // },
  activated () {
    this.getMemberList()
  },
  created () {
    this.getMemberList()
  },
  methods: {
    init (id) {
      this.dataForm.deliveryId = id || 0
      this.visible = true
      console.log("name====" + name);
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        const _this = this
        if (this.dataForm.deliveryId) {
          getObj(this.dataForm.deliveryId).then(response => {
            const resp = response.data.data
            if (_this.members.length > 0) {
              resp.deliveryUserNm = _this.members.filter(item => item.userId == resp.deliveryUserId)[0].nickname
            }
            resp.deliveryStatus = this.formatStatus[resp.deliveryStatus]
            if (undefined != resp.rechargeData && null != resp.rechargeData) {
              this.lists = JSON.parse(resp.rechargeData);
            }
            this.dataForm = resp
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.deliveryId) {
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
      this.dataForm.goodsPicUrl = response.data.url
    },
    getMemberList () {
      getMemberList({
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.members = data.data;

        } else {
          this.members = []
        }
      })
    }
  }
}
</script>
