<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div v-if="showCollapse" :class="[{ 'avue-breadcrumb--active': isCollapse }]"
        class="avue-breadcrumb">
        <i class="icon-navicon" @click="setCollapse" />
       <!-- <span class="recharge">
          <el-button size="mini" type="danger" @click="chooseRecharge">充值</el-button>
        </span>-->
      </div>

    </div>

    <div class="top-bar__title">
      <div v-if="showMenu" class="top-bar__item top-bar__item--show">
        <top-menu />
      </div>
    </div>
    <div class="top-bar__right">
      <el-tooltip v-if="userInfo.dueTime" :content="timeDiffirence?'请及时充值':'时间充足'" effect="dark"
        placement="bottom">
        <div class="top-bar__item1">
          有效期至：
          <span
            :class="timeDiffirence? 'top-bar__item2' : 'top-bar__item1'">{{userInfo.dueTime}}</span>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showColor" effect="dark" content="主题色" placement="bottom">
        <div class="top-bar__item">
          <top-color />
        </div>
      </el-tooltip>
      <el-tooltip v-if="showDebug" :content="logsFlag?'没有错误日志':`${logsLen}条错误日志`" effect="dark"
        placement="bottom">
        <div class="top-bar__item">
          <top-logs />
        </div>
      </el-tooltip>
      <el-tooltip v-if="showLock" effect="dark" content="锁屏" placement="bottom">
        <div class="top-bar__item">
          <top-lock />
        </div>
      </el-tooltip>
      <el-tooltip v-if="showTheme" effect="dark" content="特色主题" placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme />
        </div>
      </el-tooltip>
      <el-tooltip v-if="showFullScren" :content="isFullScren?'退出全屏':'全屏'" effect="dark"
        placement="bottom">
        <div class="top-bar__item">
          <i :class="isFullScren?'icon-zuixiaohua':'icon-quanpingzuidahua'" @click="handleScreen" />
        </div>
      </el-tooltip>
      <el-tooltip v-if="userInfo.avatar" effect="dark" content="用户头像" placement="bottom">
        <img id="thumbnail" class="top-bar__img">
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="$refs.seting.open()">界面设置
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="ChangePassword">修改密码
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <top-setting ref="seting" />
    </div>
    <el-dialog :visible.sync="passwordDialog" title="修改密码">

      <!-- <el-form :model="userForm" status-icon :rules="dataRule" ref="userForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="原密码" prop="rePassword">
          <el-input v-model.number="userForm.rePassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="userForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="reNewPassword">
          <el-input type="password" v-model="userForm.reNewPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form> -->

      <el-form :rules="dataRule" :model="userForm" ref="userForm">
        <el-form-item label="原始密码" label-width="100px" prop="rePassword">
          <el-input style="width:80%;" v-model="userForm.rePassword" placeholder="请输入您的原密码"
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="newPassword">
          <el-input style="width:80%;" v-model="userForm.newPassword" placeholder="请输入您的新密码"
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="100px" prop="reNewPassword">
          <el-input style="width:80%;" v-model="userForm.reNewPassword" placeholder="请重复您的新密码"
            show-password>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordDialog = false" type="primary">关闭</el-button>
        <el-button @click="confirmPassword" type="success">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showRechar" title="充值" width="50%">
      <el-radio-group class="list" v-model="chargeValue" @change="Handlechange">
        <el-row>
          <el-col>
            <el-radio :label="1" border>一个月</el-radio>
            <el-radio :label="3" border>三个月</el-radio>
            <el-radio :label="6" border>六个月</el-radio>
            <el-radio :label="12" border>一年</el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
      <div class="totValue">总金额：<span class="totValue_sp">¥ {{totalValue}}</span></div>
      <div class="orserInfo" v-if="orderInfo.orderSn">订单编号：{{orderInfo.orderSn}}</div>
      <div class="orserInfo" v-if="orderInfo.dueDate">下单时间：{{orderInfo.dueDate}}</div>
      <div class="payImg_wrap" v-if="showImg">
        <img :src="'/yry/user/wxPay/WxsmPrepay?orderId='+orderId+'&userId='+userInfo.userId"
          class="payimg">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showRechar = false" type="primary">关闭</el-button>
        <el-button @click="goRecharge" type="danger">去充值</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, handleImg, listenfullscreen } from '@/util/util'
import { confirmPass, rechargePrice, payRecord, wxPay } from '@/api/admin/user'
import topLock from './top-lock'
import topMenu from './top-menu'
import topTheme from './top-theme'
import topLogs from './top-logs'
import topCount from './top-count'
import topColor from './top-color'
import topSetting from './top-setting'

export default {
  name: 'Top',
  components: {
    topLock,
    topMenu,
    topCount,
    topTheme,
    topLogs,
    topColor,
    topSetting
  },
  filters: {},
  data () {
    return {
      passwordDialog: false,
      showRechar: false,
      timeDiffirence: false,
      showImg: false,
      chargeValue: 1,
      totalValue: null,
      paramValue: null,
      payimg: '',
      orderId: '',
      orderInfo: {},
      // data: new Data(),
      userForm: {
        rePassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      dataRule: {
        rePassword: [{
          required: true, message: '原密码不能为空', trigger: 'blur'
        }
        ],
        newPassword: [{
          required: true, message: '原密码不能为空', trigger: 'blur'
        }],
        reNewPassword: [{
          required: true, message: '原密码不能为空', trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showMenu: state => state.common.showMenu,
      showColor: state => state.common.showColor
    }),
    ...mapGetters([
      'userInfo',
      'isFullScren',
      'tagWel',
      'tagList',
      'isCollapse',
      'tag',
      'logsLen',
      'logsFlag'
    ])
  },
  created () {
    handleImg(this.userInfo.avatar, 'thumbnail')
    this.getRechargePrice()
    let data = new Date().getTime()   //当前时间戳
    let dueTime = new Date(this.userInfo.dueTime).getTime()//到期时间戳
    let timediff = 5 * 24 * 60 * 60 * 1000//时间差 5天
    if (dueTime - data <= timediff) {
      this.timeDiffirence = true
    } else {
      this.timeDiffirence = false
    }
  },
  mounted () {
    listenfullscreen(this.setScreen)
  },
  methods: {
    handleScreen () {
      fullscreenToggel()
    },
    getRechargePrice () {
      rechargePrice({}).then(res => {
        if (res.data.code == 0) {
          this.paramValue = res.data.data.paramValue
          this.totalValue = this.chargeValue * this.paramValue
        }
      })
    },
    //监听充值变化
    Handlechange () {
      this.totalValue = this.chargeValue * this.paramValue
    },
    //充值点击
    chooseRecharge () {
      this.showRechar = true
    },
    setCollapse () {
      this.$store.commit('SET_COLLAPSE')
    },
    setScreen () {
      this.$store.commit('SET_FULLSCREN')
    },
    //修改密码
    ChangePassword () {
      this.passwordDialog = true
    },
    //确认充值
    goRecharge () {
      payRecord({
        phone: this.userInfo.phone,
        number: this.chargeValue,
        price: this.paramValue,
        paymentAmount: this.totalValue,
        userId: this.userInfo.userId
      }).then(res => {
        if (res.data.code == 0) {
          this.orderInfo = res.data.data
          this.orderId = res.data.data.id
          this.showImg = true
          console.log(res.data.data.id)
          // wxPay({
          //   orderId: res.data.data.id
          // }).then(res => {
          //   this.payimg = res.data;
          //   console.log(this.payimg)
          // })
        } else {
          this.$notify.error({
            title: '错误',
            message: '异常，请联系管理员'
          });
        }
      })
    }
    ,
    //确认密码
    confirmPassword () {
      let pass = this.userForm.newPassword
      let pass1 = this.userForm.reNewPassword
      if (pass !== pass1) {
        this.$notify({
          type: 'warning',
          title: '警告',
          message: '两次输入密码不一致!',
        })
      } else {
        confirmPass({
          password: this.userForm.rePassword,
          newpassword1: this.userForm.reNewPassword
        }).then(res => {
          if (res.data.code == 0) {
            console.log(res)
            this.$store.dispatch('LogOut').then(() => {
              this.$router.push({ path: '/login' })
            })
          } else {
            this.$notify({
              type: 'error',
              title: '失败',
              message: res.data.msg
            })
          }
        })
      }

    },
    logout () {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar__item1 {
  color: #fff;
  font-size: 20px;
  padding-right: 5px;
}
.top-bar__item2 {
  color: red;
  font-size: 24px;
  padding-right: 5px;
}
.recharge {
  // line-height: 60px;
  margin-left: 10px;
}
.totValue {
  margin: 20px 0 20px 20px;
  color: #333;
  font-size: 20px;
}
.totValue_sp {
  color: #e63213;
  font-size: 30px;
}
.orserInfo {
  color: #111;
  font-size: 14px;
  line-height: 20px;
}
.payimg {
  width: 300px;
  height: 300px;
  // margin: 0 auto;
  text-align: center;
}
.payImg_wrap {
  width: 100%;
  margin: 20px 200px;
}
</style>
