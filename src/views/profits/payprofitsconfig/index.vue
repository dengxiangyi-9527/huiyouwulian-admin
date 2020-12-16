<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">

        <el-form-item>
          <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading"
          @selection-change="selectionChangeHandle" style="width: 100%;">
          <el-table-column type="selection" header-align="center" align="center" width="50">
          </el-table-column>
          <el-table-column prop="payProfitsConfigId" header-align="center" align="center"
            label="编号">
          </el-table-column>
          <!-- <el-table-column
            prop="payProfitsTypeCd"
            header-align="center"
            align="center"
            label="类型id">
          </el-table-column> -->
          <el-table-column prop="payProfitsTypeName" header-align="center" align="center"
            label="分润类型">
          </el-table-column>
          <el-table-column :formatter="configTypeFormatter" prop="configType" header-align="center"
            align="center" label="配置类型">
          </el-table-column>
          <el-table-column :formatter="payProfitsWayFormatter" prop="payProfitsWay"
            header-align="center" align="center" label="方式">
          </el-table-column>
          <el-table-column prop="platformProfitsRatio" header-align="center" align="center"
            label="平台补助">
          </el-table-column>
          <el-table-column prop="fixedProfitsRatio" header-align="center" align="center"
            label="固定值">
          </el-table-column>
          <el-table-column :formatter="configValidFlgFormatter" prop="configValidFlg"
            header-align="center" align="center" label="状态">
          </el-table-column>
          <el-table-column prop="payProfitsAddBaseNum" header-align="center" align="center"
            label="累加数量">
          </el-table-column>
          <el-table-column prop="payProfitsAddBaseRatio" header-align="center" align="center"
            label="累加比例">
          </el-table-column>
          <el-table-column prop="payProfitsAddMaxNum" header-align="center" align="center"
            label="最大数量">
          </el-table-column>
          <el-table-column prop="payProfitsAddMinNum" header-align="center" align="center"
            label="累增初始数量">
          </el-table-column>
          <el-table-column prop="payProfitsDesc" header-align="center" align="center" label="规则说明">
          </el-table-column>
          <el-table-column fixed="right" header-align="center" align="center" width="210"
            label="操作">

            <template slot-scope="scope">
              <el-button type="primary" size="small"
                @click="addOrUpdateHandle(scope.row.payProfitsConfigId)">修改</el-button>
              <el-button type="success" size="small" @click="forbid(scope.row.payProfitsConfigId)">
                禁用
              </el-button>
              <el-button type="danger" size="small"
                @click="enableHandle(scope.row.payProfitsConfigId)" v-db-click>启用</el-button>
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
import { fetchList, delObj, forbidden, updateVliFlg } from '@/api/profits/payprofitsconfig'
import TableForm from './payprofitsconfig-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
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
        size: this.pageSize
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
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 禁用
    forbid (id) {
      this.$confirm('是否确认禁用编号为' + id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return forbidden(id)
      }).then(data => {
        this.$message.success('操作成功')
        this.getDataList()
      })
    }
    , configTypeFormatter (row, column) {
      let configType = row.configType
      if (configType === 1) {
        return '分润项'
      } else {
        return '扣除项'
      }
    },
    configValidFlgFormatter (row, column) {
      let configValidFlg = row.configValidFlg
      if (configValidFlg === 1) {
        return '启用'
      } else {
        return '禁用'
      }
    }, payProfitsWayFormatter (row, column) {
      let payProfitsWay = row.payProfitsWay
      if (payProfitsWay === 1) {
        return '固定比例(%)'
      } else if (payProfitsWay === 2) {
        return '固定金额(￥)'
      } else {
        return '累加比例(%)'
      }
    }, enableHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.payProfitsConfigId
      })
      this.$confirm(`确定对[编号=${ids.join(',')}]进行[${id ? '启用' : '批量启用'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return updateVliFlg(id)
      }).then(data => {
        this.$message.success('操作成功')
        this.getDataList()
      })
    }
  }
}
</script>
