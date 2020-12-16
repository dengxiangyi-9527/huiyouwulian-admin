<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" @keyup.enter.native="getDataList()">
        <el-form-item label="真实姓名">
          <el-input placeholder="请输入姓名" suffix-icon="el-icon-search" v-model="dataForm.realName"
            style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input placeholder="请输入昵称" suffix-icon="el-icon-search" v-model="dataForm.nickname"
            style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话" suffix-icon="el-icon-phone"
            v-model="dataForm.deliveryUserPhone" style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="直接推荐人手机号">
          <el-input placeholder="请输入电话" suffix-icon="el-icon-phone" v-model="dataForm.referrerPhone"
            style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOnePageDataList()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading">
          <el-table-column :formatter="genderStatusFormatter" prop="gender" header-align="center"
            align="center" label="性别">
          </el-table-column>
          <el-table-column prop="lastLoginTime" header-align="center" width="180" align="center"
            label="登录时间">
          </el-table-column>
          <el-table-column prop="nickname" header-align="center" width="150" align="center"
            label="昵称">
          </el-table-column>
          <el-table-column prop="mobile" header-align="center" width="120px" align="center"
            label="手机号码">
          </el-table-column>
          <el-table-column prop="avatar" header-align="center" align="center" label="用户头像">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" style="width:40px; height:40px;">
            </template>
          </el-table-column>
          <el-table-column prop="memberMaxPower" :formatter="memberPowerFormatter" width="200rpx"
            header-align="center" align="center" label="会员身份">
            <!-- <template slot-scope="scope">
              <el-select v-model="scope.row.memberMaxPower" @change="changeStatus(scope.row)">
                <el-option v-for="item in productPower" :key="item.id" :label="item.name"
                  :value="item.id" />
              </el-select>
            </template> -->
          </el-table-column>
          <el-table-column :formatter="statusFormatter" prop="status" header-align="center"
            align="center" label="状态">
          </el-table-column>
          <el-table-column prop="addTime" header-align="center" width="180" align="center"
            label="注册时间">
          </el-table-column>
          <el-table-column prop="devNum" header-align="center" align="center" label="认领的设备数量">
          </el-table-column>
          <el-table-column prop="totalFlow" header-align="center" align="center" label="总流量">
          </el-table-column>
          <el-table-column prop="residualFlow" header-align="center" align="center" label="剩余流量">
          </el-table-column>
          <el-table-column :formatter="isDeliveryStatusFormatter" prop="isDelivery"
            header-align="center" align="center" label="是否是配送人员">
          </el-table-column>
          <el-table-column prop="realName" header-align="center" align="center" label="真实姓名">
          </el-table-column>
          <el-table-column :formatter="isRealSttusFormatter" prop="isReal" header-align="center"
            align="center" label="是否实名认证">
          </el-table-column>
          <el-table-column fixed="right" header-align="center" align="center" width="250"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit"
                @click="addOrUpdateHandle(scope.row.userId)" v-db-click>修改身份</el-button>
              <el-button type="success" size="small" @click="handleRefund(scope.row)">推荐人查询
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <!-- 查询推荐人弹框 -->
      <el-dialog :visible.sync="refundDialogVisible" title="推荐人查询">
        <el-form ref="refundForm" :model="refundForm" status-icon label-position="left"
          label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="推荐人昵称:" prop="referrerNickName">
            <span v-if="!refundForm.referrerNickName"> 无 </span>
            <span v-if="refundForm.referrerNickName"> {{refundForm.referrerNickName}} </span>
          </el-form-item>

          <el-form-item label="推荐人电话:" prop="referrerPhone">
            <span v-if="!refundForm.referrerPhone"> 无 </span>
            <span v-if="refundForm.referrerPhone"> {{refundForm.referrerPhone}} </span>
          </el-form-item>

          <el-form-item label="推荐人名称:" prop="referrerRealName">
            <span v-if="!refundForm.referrerRealName"> 无 </span>
            <span v-if="refundForm.referrerRealName"> {{refundForm.referrerRealName}} </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="refundDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="refundDialogVisible = false" v-db-click>确定</el-button>
        </div>
      </el-dialog>

      <div class="avue-crud__pagination">

        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
          :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
          :total="totalCount" background layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList">
      </table-form>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, delObj, getObj } from '@/api/member/member'
import TableForm from './member-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: '',
        deliveryUserPhone: '',
        realName: '',
        nickname: '',
        referrerPhone: null
      },
      dataList: [],
      pageIndex: 1,
      refundForm: {
        referrerNickName: '111',
        referrerPhone: '222',
        referrerRealName: '333'
      },
      refundDialogVisible: false,

      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      productPower: [{ id: 0, name: '普通会员' }, { id: 2, name: '高级会员' }, { id: 3, name: '高级VIP' }, { id: 4, name: '线上运营商' }],

    }
  },
  components: {
    TableForm
  },
  created () {
    this.getDataList()
    // this.changeStatus()
  },
  activated () {
    this.getDataList()
    // this.changeStatus()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      fetchList(Object.assign({
        'page': this.pageIndex,
        'limit': this.pageSize,
        'mobile': this.dataForm.deliveryUserPhone,
        'nickname': this.dataForm.nickname,
        'realName': this.dataForm.realName,
        'referrerPhone': this.dataForm.referrerPhone,
      })).then(response => {
        console.log(response)
        this.dataList = response.data.page.list
        this.totalPage = response.data.page.totalPage
        this.totalCount = response.data.page.totalCount
      })
      this.dataListLoading = false
    },

    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    isRealSttusFormatter (row, column) {
      let status = row.isReal
      if (status === 0) {
        return '未认证'
      } else if (status === 1) {
        return '已认证'
      }
    },
    changeStatus (row) {
      console.log(row)
      if (row.memberMaxPower == 0) {
        this.dataList(row.userId).memberPowerName = '普通会员'
      } else if (row.memberMaxPower == 2) {
        row.memberPowerName = '高级会员'
      } else if (row.memberMaxPower == 3) {
        row.memberPowerName = '高级VIP'
      } else if (row.memberMaxPower == 4) {
        row.memberPowerName = '线上运营商'
      }
      let list = JSON.parse(JSON.stringify(this.dataList))
      this.dataList = list
      console.log(this.dataList)
    },
    isDeliveryStatusFormatter (row, column) {
      let status = row.isDelivery
      if (status === 0) {
        return '不是'
      } else if (status === 1) {
        return '是'
      }
    },
    statusFormatter (row, column) {
      let status = row.status
      if (status === 0) {
        return '可用'
      } else if (status === 1) {
        return '禁用'
      } else if (status === 2) {
        return '注销'
      }
    },
    genderStatusFormatter (row, column) {
      let status = row.gender
      if (status === 0) {
        return '未知'
      } else if (status === 1) {
        return '男'
      } else if (status === 2) {
        return '女'
      }
    },
    memberPowerFormatter (row, column) {
      let status = row.memberMaxPower
      if (status === 0) {
        return '普通会员'
      } else if (status === 2) {
        return '高级会员'
      } else if (status === 3) {
        return '高级VIP'
      } else if (status === 4) {
        return '线上运营商'
      }
    },
    handleRefund (row) {
      getObj(row.userId).then(response => {
        console.log(response)
        this.refundForm.referrerNickName = response.data.member.referrerNickName,
          this.refundForm.referrerPhone = response.data.member.referrerPhone,
          this.refundForm.referrerRealName = response.data.member.referrerRealName
      })

      this.refundDialogVisible = true
      this.$nextTick(() => {
        this.$refs['refundForm'].clearValidate()
      })
    }
    ,getOnePageDataList () {
        this.pageIndex = 1;
      this.getDataList();
    }
  }
}
</script>
