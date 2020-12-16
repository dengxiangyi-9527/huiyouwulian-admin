<template>
  <div class="mod-config">
    <basic-container>
      <!-- 查询和其他操作 -->
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item label="手机号">
          <el-input v-model="dataForm.memPhone" clearable class="filter-item" style="width: 200px;"
            placeholder="请输入用户手机号/收货人手机号" />
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="dataForm.actualPrice" clearable class="filter-item" style="width: 200px;"
            placeholder="请输入订单金额" />
        </el-form-item>
        <el-form-item label="付款状态">
          <el-select v-model="dataForm.payOnline" placeholder="请选择订单付款状态" @change="getDataList()">
            <el-option v-for="item in payOnlineList" :key="item.value" :label="item.lable" :value="item.value">
          </el-option>
          </el-select>
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getOnePageDataList">查找
        </el-button>
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

          <el-table-column align="center" label="订单支付金额" width="120" prop="actualPrice" />

          <el-table-column align="center" label="收货人名称" width="160" prop="consignee" />
          <el-table-column align="center" label="收货人手机号" width="160" prop="mobile" />
          <el-table-column align="center" label="收货地址" prop="address" />

          <el-table-column align="center" label="确认收款时间" prop="dealTm" />

          <el-table-column align="left" label="操作" width="200" class="handel">
            <template slot-scope="scope">
              <el-button v-if="scope.row.orderStatus==101||scope.row.orderStatus==102||scope.row.orderStatus==103"
                type="success" size="mini" @click="dealOrderPaymentOffline(scope.row.orderSn)">确认收款</el-button>
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
    </basic-container>
  </div>
</template>

<style >
.handel {
  text-align: left;
}
</style>

<script>
import { readOfflinePaymentList, dealOrderPaymentOffline } from '@/api/order/mallorder';
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
        actualPrice:null,
        payOnline: 0,
      },
      payOnlineList: [{ lable: '待付款', value: 0 }, { lable: '线下付款', value:1}],
      dataList: [],
      isDis: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      dealOrderPaymentOfflineTag:true,
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
      readOfflinePaymentList(Object.assign({
        current: this.pageIndex,
        size: this.pageSize,
        memPhone: this.dataForm.memPhone,
        actualPrice: this.dataForm.actualPrice,
        payOnline: this.dataForm.payOnline,
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
    dealOrderPaymentOffline (val) {
      console.log("111111="+val);
      if(this.dealOrderPaymentOfflineTag){
        this.$confirm(`请先确认该笔订单是否收款`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          this.dealOrderPaymentOfflineTag = false;
          dealOrderPaymentOffline(val).then(({ data }) => {
            this.dealOrderPaymentOfflineTag = true;
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
    }
    ,getOnePageDataList () {
      this.pageIndex = 1;
      this.getDataList();
    }
  }
}
</script>
