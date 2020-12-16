<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item label="类别">
          <el-select v-model="dataForm.type" @change="getDataList()" placeholder="选择类别">
            <el-option v-for="item in typeList" :key="item.value" :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="dataForm.state" @change="getDataList()" placeholder="选择状态">
            <el-option v-for="item in stateList" :key="item.value" :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员名称">
          <el-input placeholder="请输入会员名称" v-model="dataForm.memNm" style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="会员手机号">
          <el-input placeholder="请输入会员手机号" v-model="dataForm.memberPhone" style="width:150px;" clearable>
          </el-input>
        </el-form-item>

        <el-button @click="getOnePageDataList()" type="primary">查询</el-button>
      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
          <el-table-column prop="payWithdrawalRecordId" header-align="center" align="center"
            label="编号">
          </el-table-column>
          <!--<el-table-column :formatter="profitsRefMemberidFormatter" prop="userId"-->
          <!--header-align="center" align="center" label="会员">-->
          <!--</el-table-column>-->
          <el-table-column align="center" label="会员名称" prop="memNm" header-align="center" />
          <el-table-column align="center" label="会员手机号" prop="memPhone" header-align="center" />
          <el-table-column prop="realName" header-align="center" align="center" label="真实姓名">
          </el-table-column>
          <el-table-column prop="amount" header-align="center" width="150" align="center"
            label="提现申请金额(¥)">
          </el-table-column>
          <el-table-column prop="poundage" header-align="center" width="150" align="center"
            label="扣税金额(¥)">
          </el-table-column>
          <el-table-column prop="transferAmount" width="150" header-align="center" align="center"
            label="实提现金额(¥)">
          </el-table-column>
          <el-table-column :formatter="stateFormatter" width="100" prop="state"
            header-align="center" align="center" label="状态">
          </el-table-column>
          <el-table-column :formatter="typeFormatter" prop="type" header-align="center"
            align="center" label="提现类别">
          </el-table-column>
          <el-table-column :formatter="withdrawalWayFormatter" prop="withdrawalWay"
            header-align="center" align="center" label="提现方式">
          </el-table-column>
          <el-table-column prop="account" header-align="center" align="center" label="账户">
          </el-table-column>
          <el-table-column prop="bankName" header-align="center" align="center" label="银行名称">
          </el-table-column>
          <el-table-column prop="bankAddress" header-align="center" align="center" width="150"
            label="开户行全称">
          </el-table-column>
          <el-table-column prop="createTime" header-align="center" width="200" align="center"
            label="申请时间">
          </el-table-column>
          <el-table-column prop="addUserNm" header-align="center" align="center" label="申请人">
          </el-table-column>
          <el-table-column prop="updateTime" header-align="center" width="200" align="center"
            label="转账时间">
          </el-table-column>
          <el-table-column prop="updateUserNm" header-align="center" align="center" label="转账人">
          </el-table-column>
          <el-table-column fixed="right" header-align="center" align="center" width="250"
            label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="small" v-if="scope.row.state==2"
                @click="withdrawalComplete(scope.row.payWithdrawalRecordId)" v-db-click>转账完成
              </el-button>
              <el-button type="primary" size="small"
                @click="addOrUpdateHandle(scope.row.payWithdrawalRecordId)" v-db-click>详情
              </el-button>
              <el-button type="primary" size="small" v-if="scope.row.type==4 && scope.row.state==1"
                @click="agreeApproval(scope.row.payWithdrawalRecordId)" v-db-click>同意</el-button>
              <el-button type="primary" size="small" v-if="scope.row.type==4 && scope.row.state==1"
                @click="rejectApproval(scope.row.payWithdrawalRecordId)" v-db-click>驳回</el-button>
              <el-button type="primary" size="small" v-if="(scope.row.type==1|| scope.row.type==5) && (scope.row.state==1 || scope.row.state==2)"
                @click="withdrawalCancel1(scope.row.payWithdrawalRecordId)" v-db-click>取消</el-button>
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
import { fetchList, delObj, readMemberList, withdrawalCompleteRecord, withdrawalApproval,withdrawalCancel } from '@/api/profits/paywithdrawalrecord'
import TableForm from './paywithdrawalrecord-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: '',
        state: null,
        profitsRefMemberid: null,
        type: null,
        memberPhone: null,
        memNm: '',
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      profitsRefMemberidList: [],
      stateList: [{ lable: '所有', value: null }, { lable: '待审核', value: 1 }, { lable: '待转账', value: 2 }, { lable: '取消/审核拒绝', value: 3 }, { lable: '转账完成', value: 4 },],
      typeList: [{ lable: '所有', value: null }, { lable: "线下转款", value: 1 }, { lable: '微信零钱分账', value: 2 }, { lable: '支付宝零钱分账', value: 3 }, { lable: '会员申请提现', value: 4 },{ lable: '区域分润提现', value: 5 },],
    }
  },
  components: {
    TableForm
  },
  created () {
    this.getDataList()
    //    this.getMemberList()
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
        state: this.dataForm.state,
        type: this.dataForm.type,
        userId: this.dataForm.profitsRefMemberid,
        memberPhone: this.dataForm.memberPhone,
        memNm: this.dataForm.memNm,
      })).then(response => {
        console.log(response)
        this.dataList = response.data.data.records
        console.log(this.dataList)
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
    }
    , typeFormatter (row, column) {
      let type = row.type;
      if (type === 1) {
        return '线下转款'
      } else if (type === 2) {
        return '微信零钱分账'
      } else if (type === 3) {
        return '支付宝零钱分账'
      } else if (type === 4) {
        return '会员申请提现'
      } else if (type === 5) {
        return '区域分润提现'
      } else {
        return '未知'
      }
    }
    , withdrawalWayFormatter (row, column) {
      let withdrawalWay = row.withdrawalWay;
      if (withdrawalWay === 1) {
        return '微信'
      } else if (withdrawalWay === 2) {
        return '支付宝'
      } else if (withdrawalWay === 3) {
        return '银行卡'
      } else {
        return '未知'
      }
    }
    , stateFormatter (row, column) {
      let state = row.state;
      if (state === 1) {
        return '待审核'
      } else if (state === 2) {
        return '待转账'
      } else if (state === 3) {
        return '取消/审核拒绝'
      } else if (state === 4) {
        return '转账成功'
      } else {
        return '未知'
      }
    }
    , profitsRefMemberidFormatter (row, column) {
      let profitsRefMemberid = row.userId;
      let nicknameArr = this.profitsRefMemberidList.map(item => {
        if (profitsRefMemberid == item.userId) {
          return item.nickname;
        }
      });
      return nicknameArr;
    }
    , getMemberList () {
      readMemberList().then(response => {
        this.profitsRefMemberidList = response.data.data
      })
    }
    , withdrawalComplete (id) {
      this.$confirm(`是否确认提现已转账完成?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        withdrawalCompleteRecord(id, this.$store.state.user.userInfo.userId).then(response => {
          if (response.data && response.data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(response.data.msg)
          }
        })
      })
    }
    , agreeApproval (id) {
      this.$prompt('请输入审批结果描述', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        maxlength: 40,
        inputErrorMessage: '内容长度过长'
      }).then(({ value }) => {
        if (value == null || value == "") {
          value = "同意";
        }
        //确定
        withdrawalApproval({ "id": id, "result": 1, "desc": value }).then(response => {
          if (response.data && response.data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(response.data.msg)
          }
        });
      }).catch(() => {
        //取消
      });
    }
    , rejectApproval (id) {
      this.$prompt('请输入审批结果描述', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        maxlength: 40,
        inputErrorMessage: '内容长度过长'
      }).then(({ value }) => {
        if (value == null || value == "") {
          value = "驳回";
        }
        //确定
        withdrawalApproval({ "id": id, "result": 2, "desc": value }).then(response => {
          if (response.data && response.data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(response.data.msg)
          }
        });
      }).catch(() => {
        //取消
      });
    }
    ,withdrawalCancel1(id){
        console.log("进入取消")
      this.$prompt('请输入取消原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        maxlength: 40,
        inputErrorMessage: '内容长度过长'
      }).then(({ value }) => {
        if (value == null || value == "") {
          value = "取消";
        }
        withdrawalCancel({ "id": id, "result": 2, "desc": value }).then(response => {
          if (response.data && response.data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(response.data.msg)
          }
        });
      }).catch(() => {
        //取消
      });
    }
    ,getOnePageDataList () {
      this.pageIndex = 1;
      this.getDataList();
    }
  }
}
</script>
