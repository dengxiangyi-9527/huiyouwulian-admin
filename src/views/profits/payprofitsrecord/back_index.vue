<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item label="会员名称">
          <el-input placeholder="请输入会员名称" v-model="dataForm.nickname" style="width:150px;">
          </el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="dataForm.status" placeholder="选择状态" @change="getDataList()">
            <el-option v-for="item in changeStatusList" :key="item.value" :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分润类型">
          <el-select v-model="dataForm.profitsType" placeholder="选择状态" @change="getDataList()">
            <el-option v-for="item in changeProfitsTypeList" :key="item.value" :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input placeholder="请输入订单编号" v-model="dataForm.orderNo" style="width:150px;">
          </el-input>
        </el-form-item>
        <el-form-item label="会员手机号">
          <el-input placeholder="请输入会员手机号" v-model="dataForm.memberPhone" style="width:150px;">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()" type="primary">查询</el-button> 
        </el-form-item>

        <el-form-item style="float:right;">
          总金额: {{pageTotalAmount}}
        </el-form-item>
      </el-form>
      <div class="avue-crud">
        <el-table :data="dataList" @selection-change="selectionChangeHandle" border
          v-loading="dataListLoading" style="width: 100%;">
          <el-table-column type="selection" header-align="center" align="center" width="50">
          </el-table-column>
          <el-table-column prop="payProfitsRecordId" header-align="center" align="center"
            label="编号">
          </el-table-column>
          <el-table-column prop="orderNo" header-align="center" align="center" label="订单编号">
          </el-table-column>
          <el-table-column prop="createTime" header-align="center" align="center" label="创建时间">
          </el-table-column>
          <el-table-column prop="amountTotal" header-align="center" align="center" label="订单总金额">
          </el-table-column>
          <el-table-column prop="amountGoods" header-align="center" align="center" label="订单货款">
          </el-table-column>
          <el-table-column prop="amountPoundage" header-align="center" align="center" label="订单手续费">
          </el-table-column>
          <el-table-column prop="amountProfits" header-align="center" align="center" label="订单分润金额">
          </el-table-column>
          <el-table-column prop="dsc" header-align="center" align="center" label="描述">
          </el-table-column>
          <el-table-column :formatter="profitsTypeFormatter" prop="profitsType"
            header-align="center" align="center" label="订单分润类型">
          </el-table-column>
          <!--<el-table-column :formatter="profitsRefMemberidFormatter" width="150"-->
          <!--prop="profitsRefMemberid" header-align="center" align="center" label="会员">-->
          <!--</el-table-column>-->
          <el-table-column align="center" label="会员名称" prop="nickname" header-align="center" /> 
          <el-table-column :formatter="statusFormatter" prop="status" header-align="center"
            align="center" label="状态">
          </el-table-column>
          <!-- <el-table-column fixed="right" header-align="center" align="center" width="180"
            label="操作">
            <template slot-scope="scope">
              <el-button type="success" :disabled="isDisabled" size="small"
                @click="wxTrans(scope.row.payProfitsRecordId)">
                微信零钱转账</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>

      <div class="avue-crud__pagination">
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
          :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
          :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList">
      </table-form>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, delObj, getMemberList, wxTrans, createWithdrawal } from '@/api/profits/payprofitsrecord'
import TableForm from './payprofitsrecord-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: '',
        status: null,
        profitsRefMemberid: '',
        orderNo: null,
        memberPhone: null,
        nickname: '',
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      changeStatusList: [{ lable: '所有', value: null }, { lable: '驻留平台', value: 0 }, { lable: '微信零钱', value: 1 }, { lable: '已提现', value: 2 }, { lable: '提现转账中', value: 3 }, { lable: '支付宝余额', value: 4 }, { lable: '提现审批中', value: 5 }],
      changeProfitsTypeList: [{ lable: '所有', value: null }, { lable: '设备认领分润', value: 1 }, { lable: '推广分润', value: 2 }, { lable: '运营管理奖', value: 3 }, { lable: '区域分润', value: 4 }, { lable: '加权分红', value: 5 }],
      profitsRefMemberidList: [],
      totalAmountSelections: 0.0,
      pageTotalAmount: 0.0,
      isDisabled: false
    }
  },
  components: {
    TableForm
  },
  created () {
    this.getDataList()
  },
  activated () {
    //    this.getMemberList();
    this.getDataList();
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
        'key': this.dataForm.key,
        'status': this.dataForm.status,
        'profitsRefMemberid': this.$store.state.user.userInfo.memberId,
        'profitsType': this.dataForm.profitsType,
        'orderNo': this.dataForm.orderNo,
        'memberPhone': this.dataForm.memberPhone,
        'memNm': this.dataForm.nickname,
      })).then(response => {
        // console.log(response)
        this.dataList = response.data.data.page.records
        this.totalPage = response.data.data.page.total
        this.pageTotalAmount = response.data.data.pageTotalAmount
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
    //多选
    selectionChangeHandle (val) {

      this.dataListSelections = val; // 对象数组
      this.totalAmountSelections = 0.0;
      var Decimal = require('decimal.js');
      this.dataListSelections.forEach((item) => {
        //遍历prodAllPrice这个字段，并累加
        // this.totalAmountSelections += item.amountProfits;
        this.totalAmountSelections = new Decimal(this.totalAmountSelections).add(new Decimal(item.amountProfits)).toNumber();
      });
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
    profitsTypeFormatter (row, column) {
      let profitsType = row.profitsType;
      let profitsTypeArr = this.changeProfitsTypeList.map(item => {
        if (profitsType == item.value) {
          return item.lable;
        }
      });
      return profitsTypeArr;
    },
    //新建提现
    createWithdrawalHandle (id) {
      if (this.dataForm.profitsRefMemberid == null && (this.dataForm.memberPhone == null || this.dataForm.memberPhone == "")) {
        this.$message.error("请填写完整的会员手机号")
      } else {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.payProfitsRecordId
        })
        this.$confirm(`确定将[编号=${ids.join(',')}]总共【${this.totalAmountSelections}元】进行[${id ? '提现转账' : '提现转账'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          createWithdrawal({
            'memberId': this.dataForm.profitsRefMemberid,
            'userId': this.$store.state.user.userInfo.userId,
            'payProfitsRecordIdList': ids,
            'memberPhone': this.dataForm.memberPhone,
          }).then(({ data }) => {
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
        })
      }

    },
    statusFormatter (row, column) {
      let status = row.status
      if (status === 0) {
        return '驻留平台'
      } else if (status === 1) {
        return '微信零钱'
      } else if (status === 2) {
        return '已提现'
      } else if (status === 3) {
        return '提现转账中'
      } else if (status === 4) {
        return '支付宝余额'
      } else if (status === 5) {
        return '提现审批中'
      } else {
        return '未知'
      }
    },
    getMemberList () {
      getMemberList({
      }).then(({ data }) => {
        // console.log(data)
        if (data && data.code === 0) { 
          this.profitsRefMemberidList = data.data; 
          // this.dataForm.profitsRefMemberid = this.profitsRefMemberidList[0];
        } else {
          this.profitsRefMemberidList = []
        }
      })
    },
    profitsRefMemberidFormatter (row, column) {
      let profitsRefMemberid = row.profitsRefMemberid;
      let nicknameArr = this.profitsRefMemberidList.map(item => {
        if (profitsRefMemberid == item.userId) {
          return item.nickname;
        }
      });
      return nicknameArr;
    },
    //微信转账
    wxTransList (id) {
      if (this.dataForm.profitsRefMemberid == null && (this.dataForm.memberPhone == null || this.dataForm.memberPhone == "")) {
        this.$message.error("请填写完整的会员手机号")
      } else {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.payProfitsRecordId
        })
        this.$confirm(`确定将[编号=${ids.join(',')}]总共【${this.totalAmountSelections}元】进行[${id ? '转账到微信' : '转账到微信'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          wxTrans(Object.assign({
            'memberId': this.dataForm.profitsRefMemberid,
            'userId': this.$store.state.user.userInfo.userId,
            'payProfitsRecordIdList': ids,
            'profitsType': this.dataForm.profitsType,
            'memberPhone': this.dataForm.memberPhone
          })).then(({ data }) => { 
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
          //   console.log(_this.wxTrans)
          //   this.$http({
          //     url: this.$http.adornUrl('/pay/payprofitsrecord/wxTransList'),
          //     method: 'post',
          //     data: this.$http.adornData({
          //       'memberId': this.dataForm.profitsRefMemberid,
          //       'userId': this.$store.state.user.id,
          //       'payProfitsRecordIdList': ids,
          //       'profitsType': this.dataForm.profitsType
          //     })
          //   }).then(({ data }) => {
          //     console.log(data)
          //     if (data && data.code === 0) {
          //       this.$message({
          //         message: '操作成功',
          //         type: 'success',
          //         duration: 1500,
          //         onClose: () => {
          //           this.getDataList()
          //         }
          //       })
          //     } else {
          //       this.$message.error(data.msg)
          //     }
          //   })
        })
      }
    }
  }
}
</script>
