<template>
  <div class="mod-config">
    <basic-container>
      <!-- 查询和其他操作 -->
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item label="用户名">
          <el-input v-model="dataForm.memNm" clearable class="filter-item" style="width: 200px;"
            placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="dataForm.memPhone" clearable class="filter-item" style="width: 200px;"
            placeholder="请输入用户手机号" />
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="dataForm.orderSn" clearable class="filter-item" style="width: 200px;"
            placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="dataForm.orderStatusArray" multiple style="width: 200px"
            class="filter-item" placeholder="请选择订单状态">
            <el-option v-for="(key, value) in statusMap" :key="key" :label="key" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付起始日期">
          <el-date-picker v-model="dataForm.startDate" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择起始日期" style="width:150px">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付结束日期">
          <el-date-picker v-model="dataForm.endDate" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择结束日期" style="width:150px">
          </el-date-picker>
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getOnePageDataList">查找
        </el-button>
        <el-button :loading="downloadLoading" class="filter-item" type="success"
          icon="el-icon-download" @click="handleDownload">导出</el-button>
      </el-form>

      <div class="avue-crud">
        <!-- 查询结果 -->
        <el-table v-loading="dataListLoading" :data="dataList" element-loading-text="正在查询中。。。"
          border fit highlight-current-row>

          <el-table-column align="center" width="140" label="订单编号" prop="orderSn" />

          <!--<el-table-column align="center" label="用户ID" prop="userId" />-->
          <el-table-column align="center" label="用户名称" width="160" prop="memNm" />
          <el-table-column align="center" label="用户手机号" width="120" prop="memPhone" />

          <el-table-column align="center" label="订单状态" width="120" prop="orderStatus">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.orderStatus | orderStatusFilter }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="收货人名称" width="120" prop="consignee" />

          <el-table-column align="center" label="收货人手机号" width="120" prop="mobile" />

          <el-table-column align="center" label="订单金额" prop="orderPrice" />

          <el-table-column align="center" label="支付金额" prop="actualPrice" />

          <el-table-column align="center" width="160" label="支付时间" prop="payTime" />

          <el-table-column align="center" label="物流单号" width="150" prop="shipSn" />

          <el-table-column align="center" label="物流渠道" prop="shipChannel" />

          <el-table-column align="left" label="操作" width="200" class="handel">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="getObjDetail(scope.row)">详情</el-button>
              <el-button v-if="scope.row.orderStatus==201 && permissions.order_mallorder_deliver" type="danger" size="mini"
                @click="handleShip(scope.row)">发货</el-button>
              <el-button v-if="scope.row.orderStatus==202||scope.row.orderStatus==204&& permissions.order_mallorder_wxrefund"
                type="success" size="mini" @click="handleRefund(scope.row)" v-db-click>退款
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
      <!--&lt;!&ndash; 弹窗, 新增 / 修改 &ndash;&gt;-->
      <!--<table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></table-form>-->

      <!-- 订单详情对话框 -->
      <el-dialog :visible.sync="orderDialogVisible" title="订单详情" width="800">
        <section ref="print">
          <el-form :data="orderDetail" label-position="left">
            <el-form-item label="订单编号">
              <span>{{ orderDetail.order.orderSn }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-tag>{{ orderDetail.order.orderStatus | orderStatusFilter }}</el-tag>
            </el-form-item>
            <el-form-item label="订单用户">
              <span>{{ orderDetail.user.nickname }}</span>
            </el-form-item>
            <el-form-item label="用户留言">
              <span>{{ orderDetail.order.message }}</span>
            </el-form-item>
            <el-form-item label="收货信息">
              <span>（收货人）{{ orderDetail.order.consignee }}</span>
              <span>（手机号）{{ orderDetail.order.mobile }}</span>
              <span>（地址）{{ orderDetail.order.address }}</span>
            </el-form-item>
            <el-form-item label="商品信息">
              <el-table :data="orderDetail.orderGoods" border fit highlight-current-row>
                <el-table-column align="center" label="商品名称" prop="goodsName" />
                <el-table-column align="center" label="商品编号" prop="goodsSn" />
                <el-table-column align="center" label="货品规格" prop="specifications" />
                <el-table-column align="center" label="货品价格" prop="price" />
                <el-table-column align="center" label="货品数量" prop="number" />
                <el-table-column align="center" label="货品图片" prop="picUrl">
                  <template slot-scope="scope">
                    <img :src="scope.row.picUrl" width="40">
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="费用信息">
              <span>
                (实际费用){{ orderDetail.order.actualPrice }}元 =
                (商品总价){{ orderDetail.order.goodsPrice }}元 +
                (快递费用){{ orderDetail.order.freightPrice }}元 -
                (优惠减免){{ orderDetail.order.couponPrice }}元 -
                (积分减免){{ orderDetail.order.integralPrice }}元
              </span>
            </el-form-item>
            <el-form-item label="支付信息">
              <span>（支付渠道）微信支付</span>
              <span>（支付时间）{{ orderDetail.order.payTime }}</span>
            </el-form-item>
            <el-form-item label="快递信息">
              <span>（快递公司）{{ orderDetail.order.shipChannel }}</span>
              <span>（快递单号）{{ orderDetail.order.shipSn }}</span>
              <span>（发货时间）{{ orderDetail.order.shipTime }}</span>
            </el-form-item>
            <el-form-item label="收货信息">
              <span>（确认收货时间）{{ orderDetail.order.confirmTime }}</span>
            </el-form-item>
          </el-form>
        </section>
        <span slot="footer" class="dialog-footer">
          <el-button @click="orderDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="printOrder">打 印</el-button>
        </span>
      </el-dialog>

      <!-- 发货对话框 -->
      <el-dialog :visible.sync="shipDialogVisible" title="发货">
        <el-form ref="shipForm" :model="shipForm" status-icon label-position="left"
          label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="快递公司" prop="shipChannel">
            <el-input v-model="shipForm.shipChannel" />
          </el-form-item>
          <el-form-item label="快递编号" prop="shipSn">
            <el-input v-model="shipForm.shipSn" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="shipDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmShip" v-db-click>确定</el-button>
        </div>
      </el-dialog>

      <!-- 退款对话框 -->
      <el-dialog :visible.sync="refundDialogVisible" title="退款">
        <el-form ref="refundForm" :model="refundForm" status-icon label-position="left"
          label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="退款金额" prop="refundMoney">
            <el-input v-model="refundForm.refundMoney" :disabled="true" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="refundDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmRefund" :disabled="isDis" v-db-click>确定
          </el-button>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<style >
.handel {
  text-align: left;
}
</style>

<script>
import { fetchList, delObj, getObj, refundOrder, shipOrder } from '@/api/order/mallorder';
import TableForm from './order-form'
import { mapGetters } from 'vuex'
const statusMap = {
  101: '未付款',
  102: '用户取消',
  103: '系统取消',
  200: '已付款团购',
  201: '已付款',
  202: '申请退款',
  203: '已退款',
  204: '已超时团购',
  301: '已发货',
  401: '用户收货',
  402: '系统收货'
}
export default {
  filters: {
    orderStatusFilter (status) {
      return statusMap[status]
    }
  },
  data () {
    return {
      dataForm: {
        key: null,
        orderSn: null,
        userId: null,
        orderStatusArray: null,
        startDate: null,
        endDate: null,
        memPhone: null,
        memNm: null,
      },
      dataList: [],
      isDis: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      statusMap,
      downloadLoading: false,
      orderDialogVisible: false,
      orderDetail: {
        order: {},
        user: {},
        orderGoods: []
      },
      shipForm: {
        orderId: undefined,
        shipChannel: undefined,
        shipSn: undefined
      },
      shipDialogVisible: false,
      refundForm: {
        orderId: undefined,
        refundMoney: undefined
      },
      refundDialogVisible: false,
    }
  },
  components: {
    TableForm
  },
  created () {
    this.getDataList()
  },
  activated () {
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
        userId: this.dataForm.userId,
        orderSn: this.dataForm.orderSn,
        orderStatus: this.dataForm.orderStatusArray,
        startDate: this.dataForm.startDate,
        endDate: this.dataForm.endDate,
        memNm: this.dataForm.memNm,
        memPhone: this.dataForm.memPhone,
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
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['订单ID', '订单编号', '用户ID', '订单状态', '是否删除', '收货人', '收货联系电话', '收货地址']
        const filterVal = ['id', 'orderSn', 'userId', 'orderStatus', 'isDelete', 'consignee', 'mobile', 'address']
        excel.export_json_to_excel2(tHeader, this.dataList, filterVal, '订单信息')
        this.downloadLoading = false
      })
    },
    getObjDetail (row) {
      getObj(row.id).then(response => {
        this.orderDetail = response.data.data
        console.log(this.orderDetail);
      })
      this.orderDialogVisible = true
    },
    printOrder () {
      this.$print(this.$refs.print)
      this.orderDialogVisible = false
    },
    // confirmShip () {
    //   this.$refs['shipForm'].validate((valid) => {
    //     if (valid) {
    //       shipOrder(this.shipForm).then(response => {
    //         this.shipDialogVisible = false
    //         this.$notify.success({
    //           title: '成功',
    //           message: '确认发货成功'
    //         })
    //         this.getDataList()
    //       }).catch(response => {
    //         this.$notify.error({
    //           title: '失败',
    //           message: response.data.errmsg
    //         })
    //       })
    //     }
    //   })
    // },
    confirmRefund () {
      this.isDis = true
      this.$refs['refundForm'].validate((valid) => {
        if (valid) {
          refundOrder(this.refundForm).then(response => {
            if (response.data.code == 0) {
              this.refundDialogVisible = false
              this.$notify.success({
                title: '成功',
                message: '确认退款成功',
              })
              console.log(this.isDis)
              // location.reload()
              this.getDataList()
              this.isDis = false
            } else {
              this.refundDialogVisible = false
              this.$notify.error({
                title: '失败',
                message: response.data.msg
              })
              this.isDis = false
            }
          })

        }
      })
    },
    // printOrder () {
    //   this.$print(this.$refs.print)
    //   this.orderDialogVisible = false
    // },
    handleShip (row) {
      this.shipForm.orderId = row.id
      this.shipForm.shipChannel = row.shipChannel
      this.shipForm.shipSn = row.shipSn

      this.shipDialogVisible = true
      this.$nextTick(() => {
        this.$refs['shipForm'].clearValidate()
      })
    },
    confirmShip () {
      this.$refs['shipForm'].validate((valid) => {
        if (valid) {
          shipOrder(this.shipForm).then(response => {
            if (response.data && response.data.code === 0) {
              this.shipDialogVisible = false
              this.$notify.success({
                title: '成功',
                message: '确认发货成功'
              })
              this.getDataList()
            } else {
              this.shipDialogVisible = false
              this.$notify.error({
                title: '失败',
                message: response.data.msg
              })
            }

          })
        }
      })
    },
    //退款
    handleRefund (row) {
      this.refundForm.orderId = row.id
      this.refundForm.refundMoney = row.actualPrice

      this.refundDialogVisible = true
      this.$nextTick(() => {
        this.$refs['refundForm'].clearValidate()
      })
    }
    ,getOnePageDataList () {
      this.pageIndex = 1;
      this.getDataList();
    }
    // ,confirmRefund () {
    //   this.$refs['refundForm'].validate((valid) => {
    //     if (valid) {
    //       refundOrder(this.refundForm).then(response => {
    //         this.refundDialogVisible = false
    //         this.$notify.success({
    //           title: '成功',
    //           message: '确认退款成功'
    //         })
    //         // location.reload()
    //         this.getList()
    //       }).catch(response => {
    //         this.$notify.error({
    //           title: '失败',
    //           message: response.data.errmsg
    //         })
    //       })
    //     }
    //   })
    // },

  }
}
</script>
