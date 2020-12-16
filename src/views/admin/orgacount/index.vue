<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item label="机构名称：">
          <el-input placeholder="请输入机构名称" v-model="dataForm.orgName" style="width:150px;">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="getDataList()">查询</el-button>         
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading">
          <el-table-column prop="id" header-align="center" align="center" label="编号">
          </el-table-column>
          <!-- <el-table-column prop="memberId" header-align="center" align="center" label="会员ID">
          </el-table-column> -->
          <el-table-column prop="orgName" header-align="center" align="center" label="机构名称">
          </el-table-column>
          <!-- <el-table-column prop="userId" header-align="center" align="center" label="后台用户ID">
          </el-table-column> -->
          <el-table-column prop="state" :formatter="stateFormatter" header-align="center"
            align="center" label="状态">
          </el-table-column>
          <!-- <el-table-column prop="payPassWord" header-align="center" align="center" label="支付密码">
          </el-table-column> -->
          <el-table-column prop="integral" header-align="center" align="center" label="积分">
          </el-table-column>
          <el-table-column prop="amount" header-align="center" align="center" label="账号金额">
          </el-table-column>
          <el-table-column prop="amountHis" header-align="center" align="center" label="历史金额">
          </el-table-column>
          <!-- <el-table-column prop="openId" header-align="center" align="center" label="微信ID">
          </el-table-column>
          <el-table-column prop="buyerId" header-align="center" align="center" label="支付宝ID">
          </el-table-column>
          <el-table-column prop="tenantId" header-align="center" align="center" label="租户ID">
          </el-table-column> -->
          <el-table-column prop="addTime" header-align="center" align="center" width="200rpx"
            label="创建时间">
          </el-table-column>
          <el-table-column prop="updateTime" header-align="center" align="center" width="180rpx"
            label="更新时间">
          </el-table-column>
          <el-table-column prop="arerCode" header-align="center" align="center" label="区域编码">
          </el-table-column>
          <el-table-column header-align="center" width="200rpx" align="center" label="操作">
            <template slot-scope="scope">
              <el-button v-if="permissions.profits_payprofitsrecord_trans_area" type="warning"
                size="small"
                @click="createWithdrawalHandle(scope.row.arerCode,scope.row.orgName)">新建提现
              </el-button>
              <el-button v-if="permissions.profits_payprofitsrecord_trans_area" type="success"
                         size="small"
                         @click="clearAreaAccount(scope.row.arerCode)">清空收益
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="avue-crud__pagination">
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
          :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
          :total="totalPage" background layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList">
      </table-form>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, delObj, createWithdrawalHandle ,clearAreaAccount} from '@/api/admin/orgacount'
import TableForm from './orgacount-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: '',
        orgName: '',
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  components: {
    TableForm
  },
  created () {
    this.getDataList()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      fetchList(Object.assign({
        current: this.pageIndex,
        size: this.pageSize,
        orgName: this.dataForm.orgName,
      })).then(response => {
        this.dataList = response.data.data.records
        this.totalPage = response.data.data.total
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
    // 删除
    deleteHandle (id) {
      this.$confirm('是否确认删除ID为' + id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(id)
      }).then(data => {
        this.$message.success('删除成功')
        this.getDataList()
      })
    },
    stateFormatter (row) {
      let status = row.state
      if (status === 0) {
        return '启用'
      } else if (status === 1) {
        return '停用'
      }
    },
    createWithdrawalHandle (code,orgName) {
      createWithdrawalHandle({
        'memberId': code,
        'realName':orgName
      }).then(({ data }) => {
        console.log(data)
        if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    }
    ,clearAreaAccount(code){
      clearAreaAccount({
        'memberId': code,
      }).then(({ data }) => {
        console.log(data)
        if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>
