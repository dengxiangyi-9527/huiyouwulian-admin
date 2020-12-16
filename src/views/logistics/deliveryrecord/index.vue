<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!--
        <el-form-item label="配送员">
          <el-select style="width:120px;" v-model="dataForm.deliveryUserId" @change="getOnePageDataList()"
            placeholder="选择配送人员">
            <el-option v-for="item in deliveryRefMemberidList" :key="item.userId"
              :label="item.nickname" :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        -->
        <el-form-item label="状态">
          <el-select v-model="dataForm.status" placeholder="选择状态" style="width:120px;"
            @change="getDataList()">
            <el-option v-for="item in deliveryStatusList" :key="item.value" :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配送员电话">
          <el-input placeholder="请输入电话" suffix-icon="el-icon-phone"
            v-model="dataForm.deliveryUserPhone" style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="收货人电话">
          <el-input placeholder="请输入收货人电话" suffix-icon="el-icon-phone"
            v-model="dataForm.memberPhone" style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="收货人名称">
          <el-input placeholder="请输入收货人名称" v-model="dataForm.memberName" style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input placeholder="请输入收货地址" v-model="dataForm.deliveryAddress" style="width:150px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-date-picker v-model="dataForm.startDate" type="date" value-format="yyyy-MM-dd"
            placeholder=" 选择日期" style="width:150px" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="dataForm.endData" type="date" value-format="yyyy-MM-dd"
            placeholder=" 选择日期" style="width:150px" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOnePageDataList()">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="execlList()">execl导出</el-button>
        </el-form-item>

      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;"
          :row-class-name="tableRowClassName">
          <el-table-column prop="deliveryId" header-align="center" align="center" label="编号">
          </el-table-column>
          <el-table-column prop="deliveryUserNm" header-align="center" width="80" align="center"
            label="配送员名称">
          </el-table-column>
          <el-table-column :formatter="deliveryStatusFormatter" prop="deliveryStatus"
            header-align="center" align="center" label="配送状态">
          </el-table-column>
          <el-table-column prop="createTm" width="100" header-align="center" align="center"
            label="生成时间">
          </el-table-column>
          <el-table-column prop="deliveryUserPhone" header-align="center" width="120" align="center"
            label="配送员电话">
          </el-table-column>
          <el-table-column prop="deliveryStartTm" width="100" header-align="center" align="center"
            label="领单时间">
          </el-table-column>
          <el-table-column prop="deliveryEndTm" width="100" header-align="center" align="center"
            label="配送完成时间">
          </el-table-column>
          <el-table-column width="200" prop="deliveryAddress" header-align="center" align="center"
            label="配送地址">
          </el-table-column>
          <el-table-column prop="deliveryDesc" width="150" header-align="center" align="center"
            label="问题描述">
            <template slot-scope="scope">
              <el-tooltip trigger="hover" :content="scope.row.deliveryDesc" placement="top">
                <p>{{ scope.row.deliveryDesc }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column width="200" prop="memberName" header-align="center" align="center"
            label="收货人">
          </el-table-column>
          <el-table-column width="200" prop="memberPhoneBack" header-align="center" align="center"
            label="收货人电话">
          </el-table-column>
          <el-table-column prop="addressDetail" header-align="center" width="180" align="center"
            label="配送地址详情">
          </el-table-column>
          <el-table-column prop="deliveryNum" width="50" header-align="center" align="center"
            label="配送数量">
          </el-table-column>
          <el-table-column prop="goodsName" header-align="center" width="150" align="center"
            label="配送商品名称">
          </el-table-column>
          <el-table-column header-align="center" align="center" label="配送商品图片">
            <template v-slot="scope">
              <img :src="scope.row.goodsPicUrl" style="width:80px; height:80px;">
            </template>
          </el-table-column>

          <el-table-column header-align="center" align="left" label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-select style="width:80px;" placeholder="选择操作"
                @change="SelectAction($event,scope.row)">
                <!--  -->
                <!-- <el-option v-for="item in actionList" :key="item.value" :label="item.lable"
                  :value="item.value">
                </el-option> -->
                <el-option label="详情" value='0'></el-option>
                <el-option label="分派订单" value='1' v-if="scope.row.deliveryStatus==1"></el-option>
                <el-option label="订单取消" value='2' v-if="scope.row.deliveryStatus==1"></el-option>
                <el-option label="订单改派" value='3'
                  v-if="scope.row.deliveryStatus===2"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <!-- <el-table-column header-align="center" align="left" label="操作" fixed="right" width="170">
            <template slot-scope="scope">
              <el-button v-if="permissions.logistics_deliveryrecord_edit" type="primary"
                size="small" @click="addOrUpdateHandle(scope.row.deliveryId)">详情
              </el-button>
              <el-button v-if="scope.row.deliveryStatus==1" type="danger" size="small"
                @click="dispatch(scope.row)">分派订单</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>

      <div class="avue-crud__pagination">
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
          :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
          :total="totalPage" background layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- 分派订单弹框 -->
      <el-dialog :visible.sync="shipDialogVisible" title="分派订单">
        <el-form ref="shipForm" :model="shipForm" status-icon label-position="left"
          label-width="100px" style="width: 400px; margin-left:50px;"
          @refreshDataList="getDataList">
          <el-form-item label="配送员">
            <el-select style="width:150px;" v-model="shipForm.userId" placeholder="选择配送人员">
              <el-option v-for="item in deliveryMemberidList" :key="item.userId"
                :label="item.realName" :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="addressDetail">
            <el-input v-model="shipForm.remarks" placeholder="请输入备注信息"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="shipDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmShip">确定</el-button>
        </div>
      </el-dialog>

      <!-- 订单改派弹框 -->
      <el-dialog :visible.sync="shipDialogVisible1" title="订单改派">
        <el-form ref="shipForm" :model="shipForm" status-icon label-position="left"
          label-width="100px" style="width: 400px; margin-left:50px;"
          @refreshDataList="getDataList">
          <el-form-item label="配送员">
            <el-select style="width:150px;" v-model="shipForm.userId" placeholder="选择配送人员">
              <el-option v-for="item in deliveryMemberidList" :key="item.userId"
                :label="item.realName" :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="addressDetail">
            <el-input v-model="shipForm.remarks" placeholder="请输入备注信息"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="shipDialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="confirmShip1">确定</el-button>
        </div>
      </el-dialog>

      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList">
      </table-form>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, delObj, getMemberList, dispatch, getDelieveMemberList, cancelOrder, reassignmentOrder } from '@/api/logistic/deliveryrecord'
import TableForm from './deliveryrecord-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: '',
        startDate: '',
        endData: '',
        deliveryUserId: '',
        status: '',
        deliveryAddress: '',
        memberName: '',
        memberPhone: '',
        deliveryUserPhone: ''
      },
      shipForm: {
        userId: '',
        deliveryId: '',
        remarks: '',
      },
      shipDialogVisible: false,
      shipDialogVisible1: false,
      value1: '',
      dataList: [],
      value: '',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      deliveryRefMemberidList: [],
      deliveryMemberidList: [],
      actionList: [{ lable: '详情', value: 0 }, { lable: '分派订单', value: 1 }, { lable: '订单取消', value: 2 }, { lable: '订单改派', value: 3 }],
      deliveryStatusList: [{ lable: '所有', value: '' }, { lable: '待配送', value: 1 }, { lable: '配送中', value: 2 }, { lable: '已配送', value: 3 }, { lable: '已有设备', value: 4 }, { lable: '申请退款', value: 5 }, { lable: '取消铺送', value: 6 }],
    }
  },
  components: {
    TableForm
  },
  created () {
    this.getDataList()
  },
  activated () {
    this.getMemberList()
    this.getDataList()
    this.getDelieveMemberList()

  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      fetchList(Object.assign({
        "current": this.pageIndex,
        "size": this.pageSize,
        "deliveryUserId": this.dataForm.deliveryUserId,
        "deliveryUserPhone": this.dataForm.deliveryUserPhone,
        "deliveryStatus": this.dataForm.status,
        "startDate": this.dataForm.startDate,
        "endDate": this.dataForm.endData,
        "memberPhone": this.dataForm.memberPhone,
        "memberName": this.dataForm.memberName,
        "deliveryAddress": this.dataForm.deliveryAddress,
      })).then(response => {
        this.dataList = response.data.data.records
        this.totalPage = response.data.data.total
      })
      this.dataListLoading = false
    },
    dispatch (row) {
      this.shipDialogVisible = true
      this.shipForm.deliveryId = row.deliveryId
      this.shipForm.remarks = row.remarks
    },
    dispatch1 (row) {
      this.shipDialogVisible1 = true
      this.shipForm.deliveryId = row.deliveryId
      this.shipForm.remarks = row.remarks
    },
    confirmShip () {
      let userId = this.shipForm.userId
      let deliveryId = this.shipForm.deliveryId
      dispatch({
        'deliveryUserId': userId,//配送员ID
        'remarks': this.shipForm.remarks,
        deliveryIds: [`${deliveryId}`] //[配送单id数组]
      }).then(data => {
        if (data.data.code == 0) {
          this.shipDialogVisible = false
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.$emit('refreshDataList')
          this.getDataList()
          this.shipDialogVisible = false
        } else {
          this.$notify.error({
            title: '失败',
            message: data.data.msg
          })
        }

      })
    },
    confirmShip1 () {
      let userId = this.shipForm.userId
      let deliveryId = this.shipForm.deliveryId
      reassignmentOrder({
        'deliveryUserId': userId,//配送员ID
        deliveryIds: [`${deliveryId}`] //[配送单id数组]
      }).then(data => {
        if (data.data.code == 0) {
          this.shipDialogVisible = false
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.$emit('refreshDataList')
          this.getDataList()
          this.shipDialogVisible1 = false
        } else {
          this.$notify.error({
            title: '失败',
            message: data.data.msg
          })
        }

      })
    },
    //操作
    SelectAction (e, h) {
      console.log(e, h)
      if (e == 0) {
        this.addOrUpdateHandle(h.deliveryId)
      } else if (e == 1) {
        this.dispatch(h)
      } else if (e == 2) {
        this.cancelOrder(h)
      } else if (e == 3) {
        this.dispatch1(h)
      }
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
    cancelOrder (h) {
      console.log(h)
      this.$confirm('您将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deliveryId = h.deliveryId
        cancelOrder({
          deliveryIds: [`${deliveryId}`]
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.getDataList()
          } else {
            this.$notify.error({
              title: '失败',
              message: res.data.msg
            })
          }
        })
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
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    deliveryStatusFormatter (row, column) {
      let status = row.deliveryStatus
      if (status === 1) {
        return '待配送'
      } else if (status === 2) {
        return '配送中'
      } else if (status === 3) {
        return '已送达'
      } else if (status === 4) {
        return '已有设备'
      } else if (status === 5) {
        return '申请退款'
      } else if (status === 6) {
        return '取消铺送'
      } else {
        return '未知'
      }
    },
    getMemberList () {
      getMemberList({
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.deliveryRefMemberidList = data.data;
          // this.dataForm.deliveryDeviceId = this.deliveryRefMemberidList[0];
        } else {
          this.deliveryRefMemberidList = []
        }
      })
    },
    getDelieveMemberList () {
      getDelieveMemberList({}).then(({ data }) => {
        if (data && data.code === 0) {
          this.deliveryMemberidList = data.data;
          // this.dataForm.deliveryDeviceId = this.deliveryRefMemberidList[0];
        } else {
          this.deliveryMemberidList = []
        }
      })
    },
    execlList () {
      window.location.href = '/yry/app/execl/execlDeliveryRecord?deliveryUserId=' + this.dataForm.deliveryUserId
        + '&deliveryUserPhone=' + this.dataForm.deliveryUserPhone + '&deliveryStatus=' + this.dataForm.status
        + '&startDate=' + this.dataForm.startDate + '&endDate=' + this.dataForm.endData + '&memberPhone=' + this.dataForm.memberPhone
        + '&memberName=' + this.dataForm.memberName + '&deliveryAddress=' + this.dataForm.deliveryAddress
    },
    deliveryUserNmFormatter (row, column) {
      let deliveryUserId = row.deliveryUserId;
      let nicknameArr = this.deliveryRefMemberidList.map(item => {
        if (deliveryUserId == item.userId) {
          return item.nickname;
        }
      });
      return nicknameArr;
    }
    ,getOnePageDataList () {
      this.pageIndex = 1;
      this.getDataList();
    }
  }
}
</script>
<style >
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
