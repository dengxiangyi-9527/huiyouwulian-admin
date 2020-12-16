<template>
  <el-dialog :title="!dataForm.id ? '修改' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="会员身份" prop="memberMaxPower" label-width="120px">
        <el-radio-group v-model="dataForm.memberMaxPower">
          <el-radio :label="0">普通会员</el-radio>
          <el-radio :label="2">高级会员</el-radio>
          <el-radio :label="3">高级VIP</el-radio>
          <el-radio :label="4">线上运营商</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否是配送员" label-width="120px" prop="isDelivery">
        <el-radio-group v-model="dataForm.isDelivery">
          <el-radio :label="0">不是</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否拥有铺送权" label-width="120px" prop="isYyValid">
        <el-radio-group v-model="dataForm.isYyValid">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">不是</el-radio>
        </el-radio-group>
      </el-form-item>
          <el-form-item label="是否存入黑名单"  v-if="permissions.member_memberList_editMemPower"  label-width="120px" prop="isBack"  >
        <el-radio-group v-model="dataForm.isBack">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">异常</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putUserObj } from '@/api/member/member'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      visible: false,
      productPower: [{ id: 0, name: '普通会员' }, { id: 2, name: '高级会员' }, { id: 3, name: '高级VIP' }, { id: 4, name: '线上运营商' }],
      dataForm: {
        userId: '',
        memberName: '',
        password: '',
        gender: '',
        memberType: '',
        birthday: '',
        lastLoginTime: '',
        lastLoginIp: '',
        memberLevel: '',
        nickname: '',
        memberMaxPower: 0,
        mobile: '',
        avatar: '',
        weixinOpenid: '',
        sessionKey: '',
        status: '',
        addTime: '',
        updateTime: '',
        deleted: '',
        tenantId: '',
        devNum: '',
        aliUserId: '',
        totalFlow: '',
        residualFlow: '',
        inviteCode: '',
        isDelivery: '',
        customerId: '',
        isSynchroCustomer: '',
        memberPower: '',
        bonusWhere1: '',
        bonusWhere2: '',
        realName: '',
        isReal: '',
        isSynchro32m: '',
        isBack:0

      },
      dataRule: {
        memberName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '性别：0 未知， 1男， 1 女不能为空', trigger: 'blur' }
        ],
        memberType: [
          { required: true, message: '会员类型：1 普通会员， 2购水会员， 3 认领主机会员 4，用水+主机会员不能为空', trigger: 'blur' }
        ],
        memberMaxPower: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        lastLoginTime: [
          { required: true, message: '最近一次登录时间不能为空', trigger: 'blur' }
        ],
        lastLoginIp: [
          { required: true, message: '最近一次登录IP地址不能为空', trigger: 'blur' }
        ],
        memberLevel: [
          { required: true, message: '0 普通用户，1 VIP用户，2 高级VIP用户不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '用户昵称或网络名称不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '用户手机号码不能为空', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '用户头像图片不能为空', trigger: 'blur' }
        ],
        weixinOpenid: [
          { required: true, message: '微信登录openid不能为空', trigger: 'blur' }
        ],
        sessionKey: [
          { required: true, message: '微信登录会话KEY不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '0 可用, 1 禁用, 2 注销不能为空', trigger: 'blur' }
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
        tenantId: [
          { required: true, message: '所属租户不能为空', trigger: 'blur' }
        ],
        devNum: [
          { required: true, message: '认领的设备数量不能为空', trigger: 'blur' }
        ],
        aliUserId: [
          { required: true, message: '支付宝会员ID不能为空', trigger: 'blur' }
        ],
        totalFlow: [
          { required: true, message: '总流量不能为空', trigger: 'blur' }
        ],
        residualFlow: [
          { required: true, message: '配送流量不能为空', trigger: 'blur' }
        ],
        inviteCode: [
          { required: true, message: '分享码不能为空', trigger: 'blur' }
        ],
        isDelivery: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: 'db_yly会员id不能为空', trigger: 'blur' }
        ],
        isSynchroCustomer: [
          { required: true, message: '0-未同步,1-已同步不能为空', trigger: 'blur' }
        ],
        memberPower: [
          { required: true, message: '会员权限 0-普通会员不能为空', trigger: 'blur' }
        ],
        bonusWhere1: [
          { required: true, message: '(9个999)0-不满足,1-满足不能为空', trigger: 'blur' }
        ],
        bonusWhere2: [
          { required: true, message: '(当月新增一个999)0-不满足,1-满足不能为空', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' }
        ],
        isReal: [
          { required: true, message: '是否实名认证,0否 1是不能为空', trigger: 'blur' }
        ],
        isSynchro32m: [
          { required: true, message: '0-未同步,1-已同步不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
      ...mapGetters(['permissions'])
      },
  methods: {
    init (id) {
      this.dataForm.userId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.userId) {
          getObj(this.dataForm.userId).then(response => {
            console.log(response)
            this.dataForm = response.data.member
          })
        }
      })

    },
    changeStatus (row) {
      console.log(row)
      this.dataForm.memberMaxPower = row
      console.log(this.dataForm.memberMaxPower)
    },
    // 表单提交
    dataFormSubmit () { 
      putUserObj({
        userId: this.dataForm.userId,
        isDelivery: this.dataForm.isDelivery,
        isYyValid: this.dataForm.isYyValid,
        memberPower: this.dataForm.memberMaxPower,
        isBack: this.dataForm.isBack
      }).then(data => {
        this.visible = false
        this.$message.success('修改成功')
        this.$emit('refreshDataList')
      })
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     console.log(this.dataForm.memberMaxPower)
      //     if (this.dataForm.userId) {
      //       putUserObj(this.dataForm).then(data => {
      //         this.$message.success('修改成功')
      //         this.visible = false
      //         this.$emit('refreshDataList')
      //       });
      //     } 
      //   }
      // })
    }
  }
}
</script>
