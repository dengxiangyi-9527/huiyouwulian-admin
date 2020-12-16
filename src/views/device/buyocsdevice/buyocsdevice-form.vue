<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-form-item label="购买者信息" prop="buyRealName">
        <el-input v-model="buyName" style="width:150px" placeholder="输入电话或者姓名">
        </el-input>
        <el-button class="btn" type="success" size="mini" @click="getMemberList">查询</el-button>
        <div class="equiId" v-if="memberList.length>0">
          <span>请选择：</span>
          <span class="member_item" @click="getInfo(item,index)" v-for="(item,index) in memberList"
            :key="index">{{item.realName}}</span>
        </div>
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceId">
        <el-input v-model="equiId" style="width:150px" type="Number" placeholder="设备编号"></el-input>
        <el-button class="btn" type="danger" size="mini" @click="addEquiId" v-db-click>添加
        </el-button>
      </el-form-item>
      <div class="equiId">
        <span class="equiId_item" @click="del(index)" v-for="(item,index) in dataForm.deviceId"
          :key="item.index" track-by="$index">{{item}}</span>
      </div>

      <el-form-item label="购买人手机" prop="buyMobile">
        <el-input v-model="dataForm.buyMobile" placeholder="购买人手机" readonly></el-input>
      </el-form-item>
      <el-form-item label="购买数量" prop="buyNum">
        <el-input v-model="dataForm.deviceId.length" placeholder="购买数量必须大于0">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
    </span>
  </el-dialog>
</template>


<style  scoped>
.btn {
  margin-left: 20px;
}
.equiId {
  margin: 10px 20px;
}
.equiId_item {
  display: inline-table;
  /* width: 130px; */
  /* height: 30px; */
  padding: 5px 10px;
  margin: 5px 5px;
  border: 1px solid rgba(0, 140, 255, 0.582);
  border-radius: 5px;
}
.member_item {
  /* display: inline-table; */
  padding: 5px 10px;
  margin: 5px 5px;
  border: 1px solid rgba(0, 140, 255, 0.582);
  border-radius: 5px;
}
</style>

<script>
import { getObj, addObj, putObj, memberList, confirmEqui } from '@/api/device/buyocsdevice'

export default {
  data () {
    return {
      visible: false,
      equiId: '',
      buyName: '',
      memberList: [
      ],
      list: [],
      dataForm: {
        deviceId: [],

        buyId: '',
        buyMobile: '',
        buyNum: '',
        buyRealName: ''

      },
      dataRule: {
        deviceId: [
          { required: true, message: '', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态,0成功,1失败,不能为空', trigger: 'blur' }
        ],
        addTime: [
          { required: true, message: '购买时间不能为空', trigger: 'blur' }
        ],
        buyId: [
          { required: true, message: '购买人不能为空', trigger: 'blur' }
        ],
        buyRealName: [
          { required: true, message: '购买者真实姓名不能为空', trigger: 'blur' }
        ],
        buyMobile: [
          { required: true, message: '购买人手机不能为空', trigger: 'blur' }
        ],
        // buyNum: [
        //   { required: true, message: '购买数量不能小于0', trigger: 'blur' }
        // ],
        reason: [
          { required: true, message: '原因不能为空', trigger: 'blur' }
        ],
        addUser: [
          { required: true, message: '添加人ID不能为空', trigger: 'blur' }
        ],
        addUserName: [
          { required: true, message: '添加人账号不能为空', trigger: 'blur' }
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
    getInfo (item, index) {
      console.log(item, index)
      this.dataForm.buyMobile = item.mobile
      this.dataForm.buyId = item.userId
      this.dataForm.buyRealName = item.realName
    },
    getMemberList () {
      if (this.buyName == '') {
        this.$notify({
          type: 'warning',
          title: '警告',
          message: '请输入用户姓名或电话'
        })
      } else {
        memberList({
          param: this.buyName
        }).then(res => {
          if (res.data.code == 0) {
            this.memberList = res.data.data
            if (res.data.data.length <= 0) {
              this.$message({
                message: '没有查询到该用户',
                type: 'warning'
              })
              this.buyName = ''
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
      }
    },
    addEquiId () {
      if (this.equiId == '') {
        this.$message({
          message: '设备编号不能为空哦～',
          type: 'warning'
        })
      } else {
        confirmEqui(Object.assign({
          deviceId: this.equiId
        })).then(res => {
          if (res.data.code === 0) {
            if (this.dataForm.deviceId.includes(this.equiId)) {
              this.$notify({
                type: 'warning',
                title: '警告',
                message: '设备编号重复'
              })
            } else {
              console.log('111')
              console.log(this.dataForm.deviceId)
              console.log(this.equiId)
              this.dataForm.deviceId.push(this.equiId)
              this.dataForm.buyNum = this.dataForm.deviceId.length
              this.equiId = ''
            }
          } else {
            this.equiId = ''
            this.$notify({
              type: 'warning',
              title: '警告',
              message: res.data.msg
            })

          }
        })

      }

    },
    del (index) {
      console.log(index)
      // console.log(this.dataForm.deviceId)
      this.dataForm.deviceId.splice(index, 1)
    },
    // propsbuyNUm () {
    //   console.log(this.dataForm.buyNum)
    //   if (this.dataForm.buyNum < 0) {
    //     this.$message({
    //       message: '购买数量不能小于0噢～',
    //       type: 'warning'
    //     });
    //     this.dataForm.buyNum = ''
    //   }
    // },
    // 表单提交
    dataFormSubmit () {
      this.dataForm.deviceId = this.dataForm.deviceId.map(Number)
      console.log(this.dataForm)
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
